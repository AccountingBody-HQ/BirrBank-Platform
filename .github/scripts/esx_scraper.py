import asyncio, os, sys, json, datetime
import urllib.request
from playwright.async_api import async_playwright

SUPABASE_URL = os.environ["SUPABASE_URL"]
SERVICE_KEY  = os.environ["SUPABASE_SERVICE_ROLE_KEY"]
TODAY        = datetime.date.today().isoformat()

COMPANIES = [
    {"ticker": "AWAB", "slug": "awash-bank-share-company"},
    {"ticker": "GDAB", "slug": "gadaa-bank-share-company"},
    {"ticker": "WGBX", "slug": "wegagen-bank-share-company"},
]

def sb_patch(ticker, payload):
    url  = f"{SUPABASE_URL}/rest/v1/listed_securities?ticker=eq.{ticker}"
    data = json.dumps(payload).encode()
    req  = urllib.request.Request(url, data=data, method="PATCH")
    req.add_header("apikey",         SERVICE_KEY)
    req.add_header("Authorization",  f"Bearer {SERVICE_KEY}")
    req.add_header("Content-Type",   "application/json")
    req.add_header("Accept-Profile", "birrbank")
    req.add_header("Content-Profile","birrbank")
    with urllib.request.urlopen(req, timeout=20) as r:
        return r.status

def sb_upsert_history(ticker, price):
    url  = f"{SUPABASE_URL}/rest/v1/price_history"
    data = json.dumps({"ticker": ticker, "trade_date": TODAY,
                        "close_price": price, "country_code": "ET"}).encode()
    req  = urllib.request.Request(url, data=data, method="POST")
    req.add_header("apikey",         SERVICE_KEY)
    req.add_header("Authorization",  f"Bearer {SERVICE_KEY}")
    req.add_header("Content-Type",   "application/json")
    req.add_header("Accept-Profile", "birrbank")
    req.add_header("Content-Profile","birrbank")
    req.add_header("Prefer",         "resolution=merge-duplicates")
    with urllib.request.urlopen(req, timeout=20) as r:
        return r.status

async def scrape_company(page, ticker, slug):
    url = f"https://esx.et/directory/{slug}/"
    print(f"\nScraping {ticker}: {url}")
    await page.goto(url, wait_until="networkidle", timeout=60000)
    text = await page.inner_text("body")
    print(f"  Full text:\n{text[:2000]}")

    # Also check all tables
    tables = await page.query_selector_all("table")
    print(f"  Tables: {len(tables)}")
    for tbl in tables:
        rows = await tbl.query_selector_all("tr")
        for row in rows:
            cells = await row.query_selector_all("td, th")
            texts = [await c.inner_text() for c in cells]
            print(f"  Row: {texts}")

    # Try to extract any numeric value near price keywords
    import re
    price_patterns = [
        r"(?:Last\s*Price|Close|Trade\s*Price|Price)[:\s]+([\d,\.]+)",
        r"([\d,\.]+)\s*ETB",
        r"ETB\s*([\d,\.]+)",
    ]
    for pat in price_patterns:
        m = re.search(pat, text, re.IGNORECASE)
        if m:
            try:
                val = float(m.group(1).replace(",",""))
                if 0 < val < 100000:
                    print(f"  Found price via pattern: {val}")
                    return val
            except:
                continue
    return None

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page    = await browser.new_page()
        page.set_default_timeout(60000)

        results = []
        for co in COMPANIES:
            price = await scrape_company(page, co["ticker"], co["slug"])
            if price:
                results.append({"ticker": co["ticker"], "price": price})

        await browser.close()

    if not results:
        print("\nNo prices found. ESX may not publish prices publicly yet.")
        print("Manual price entry via admin console is required for now.")
        sys.exit(1)

    print(f"\nSaving {len(results)} prices...")
    for r in results:
        sb_patch(r["ticker"], {
            "last_price_etb": r["price"],
            "last_updated": TODAY,
        })
        sb_upsert_history(r["ticker"], r["price"])
        print(f"  Saved {r['ticker']} = {r['price']}")

asyncio.run(main())
