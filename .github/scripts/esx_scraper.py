import asyncio, os, sys, json, datetime
import urllib.request
from playwright.async_api import async_playwright

SUPABASE_URL = os.environ["SUPABASE_URL"]
SERVICE_KEY  = os.environ["SUPABASE_SERVICE_ROLE_KEY"]
TODAY        = datetime.date.today().isoformat()

TICKERS = {
    "Awash Bank Share Company": "AB",
    "Gadaa Bank Share Company": "GB",
    "Wegagen Bank Share Company": "WB",
    "Awash Bank": "AB",
    "Gadaa Bank": "GB",
    "Wegagen Bank": "WB",
}

def sb_request(method, path, payload=None, extra_headers=None):
    url  = f"{SUPABASE_URL}/rest/v1/{path}"
    data = json.dumps(payload).encode() if payload else None
    req  = urllib.request.Request(url, data=data, method=method)
    req.add_header("apikey",         SERVICE_KEY)
    req.add_header("Authorization",  f"Bearer {SERVICE_KEY}")
    req.add_header("Content-Type",   "application/json")
    req.add_header("Accept-Profile", "birrbank")
    req.add_header("Content-Profile","birrbank")
    if extra_headers:
        for k, v in extra_headers.items():
            req.add_header(k, v)
    with urllib.request.urlopen(req, timeout=20) as r:
        return r.status, r.read().decode()

async def scrape():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page    = await browser.new_page()
        page.set_default_timeout(60000)

        print("Loading ESX listed companies page...")
        await page.goto("https://esx.et/equity-market/listed-companies/", wait_until="networkidle")

        # Dump full page text so we can see what rendered
        body_text = await page.inner_text("body")
        print("PAGE TEXT SAMPLE:")
        print(body_text[:4000])

        # Try to find any table
        results = []
        tables = await page.query_selector_all("table")
        print(f"Tables found: {len(tables)}")

        for tbl in tables:
            headers = await tbl.query_selector_all("th")
            header_texts = [await h.inner_text() for h in headers]
            print(f"Table headers: {header_texts}")

            rows = await tbl.query_selector_all("tr")
            for row in rows[1:]:
                cells = await row.query_selector_all("td")
                texts = [await c.inner_text() for c in cells]
                print(f"Row: {texts}")

                # Match company name to ticker
                ticker = None
                for name, t in TICKERS.items():
                    if any(name.lower() in cell.lower() for cell in texts):
                        ticker = t
                        break

                if not ticker:
                    continue

                # Extract price - look for numeric values
                price = change = volume = None
                for t in texts:
                    clean = t.strip().replace(",","").replace("ETB","").strip()
                    try:
                        val = float(clean)
                        if price is None and val > 0:
                            price = val
                        elif change is None:
                            change = val
                        elif volume is None:
                            volume = val
                    except ValueError:
                        continue

                if price:
                    results.append({"ticker": ticker, "price": price, "change": change, "volume": volume})
                    print(f"  Scraped: {ticker} = {price} ETB ({change}%)")

        await browser.close()
        return results

async def main():
    prices = await scrape()

    if not prices:
        print("WARNING: No prices scraped. Check page structure above.")
        sys.exit(1)

    print(f"Saving {len(prices)} prices to Supabase...")
    saved = 0
    for p in prices:
        try:
            # Update listed_securities
            update = {
                "last_price_etb":   p["price"],
                "price_change_pct": p["change"],
                "volume_today":     p["volume"],
                "last_updated":     TODAY,
            }
            status, _ = sb_request(
                "PATCH",
                f"listed_securities?ticker=eq.{p['ticker']}",
                update
            )
            # Upsert price_history
            sb_request(
                "POST",
                "price_history",
                {"ticker": p["ticker"], "trade_date": TODAY, "close_price": p["price"],
                 "volume": p["volume"], "country_code": "ET"},
                {"Prefer": "resolution=merge-duplicates"}
            )
            saved += 1
            print(f"  Saved {p['ticker']}")
        except Exception as e:
            print(f"  Error saving {p['ticker']}: {e}")

    print(f"Done: {saved}/{len(prices)} saved")
    if saved == 0:
        sys.exit(1)

asyncio.run(main())
