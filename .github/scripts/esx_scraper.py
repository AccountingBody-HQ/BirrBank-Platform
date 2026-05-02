import asyncio, os, sys, json, datetime
import urllib.request
from playwright.async_api import async_playwright

SUPABASE_URL = os.environ["SUPABASE_URL"]
SERVICE_KEY  = os.environ["SUPABASE_SERVICE_ROLE_KEY"]
TODAY        = datetime.date.today().isoformat()

# Official ESX tickers (confirmed from listed-companies page)
SYMBOL_MAP = {
    "AWAB": "AWAB",
    "GDAB": "GDAB",
    "WGBX": "WGBX",
    "Awash Bank":  "AWAB",
    "Gadaa Bank":  "GDAB",
    "Wegagen Bank":"WGBX",
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

async def try_page(page, url):
    print(f"\nTrying: {url}")
    try:
        await page.goto(url, wait_until="networkidle", timeout=60000)
        text = await page.inner_text("body")
        # Check if any ESX symbols or price keywords appear
        has_data = any(k in text for k in ["AWAB","GDAB","WGBX","Last Price","Close Price","Trade Price","ETB"])
        print(f"  Has price data: {has_data}")
        if has_data:
            print(f"  TEXT SAMPLE:\n{text[:3000]}")
        else:
            # Print a smaller sample anyway
            print(f"  TEXT SAMPLE (no prices):\n{text[:500]}")
        return text if has_data else None
    except Exception as e:
        print(f"  Error: {e}")
        return None

async def scrape():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page    = await browser.new_page()
        page.set_default_timeout(60000)

        # Try all candidate pages
        candidates = [
            "https://esx.et/market-data/",
            "https://esx.et/equity-market/",
            "https://esx.et/equity-market/main-market/",
            "https://esx.et/equity-market/growth-market/",
            "https://esx.et/trading/",
            "https://esx.et/live-market/",
        ]

        found_text = None
        for url in candidates:
            result = await try_page(page, url)
            if result:
                found_text = result
                break

        if not found_text:
            print("\nNo price data found on any page.")
            print("Dumping full market-data page for manual inspection...")
            await page.goto("https://esx.et/market-data/", wait_until="networkidle")
            full = await page.inner_text("body")
            print(full[:5000])
            await browser.close()
            return []

        # Parse prices from found text
        results = []
        lines = found_text.split("\n")
        for i, line in enumerate(lines):
            line = line.strip()
            for symbol, ticker in SYMBOL_MAP.items():
                if symbol in line:
                    # Look for numeric price in nearby lines
                    context = lines[max(0,i-3):i+6]
                    print(f"  Found {symbol} context: {context}")
                    for ctx_line in context:
                        clean = ctx_line.strip().replace(",","").replace("ETB","").strip()
                        try:
                            val = float(clean)
                            if val > 0 and val < 100000:
                                results.append({"ticker": ticker, "price": val, "change": None, "volume": None})
                                print(f"  Price: {ticker} = {val}")
                                break
                        except ValueError:
                            continue

        await browser.close()
        return results

async def main():
    prices = await scrape()

    if not prices:
        print("\nNo prices found — scraper needs adjustment based on page structure above.")
        sys.exit(1)

    print(f"\nSaving {len(prices)} prices...")
    saved = 0
    for p in prices:
        try:
            sb_request("PATCH",
                f"listed_securities?ticker=eq.{p['ticker']}",
                {"last_price_etb": p["price"], "price_change_pct": p["change"],
                 "volume_today": p["volume"], "last_updated": TODAY})
            sb_request("POST", "price_history",
                {"ticker": p["ticker"], "trade_date": TODAY,
                 "close_price": p["price"], "country_code": "ET"},
                {"Prefer": "resolution=merge-duplicates"})
            saved += 1
            print(f"  Saved {p['ticker']}")
        except Exception as e:
            print(f"  Error {p['ticker']}: {e}")

    print(f"Done: {saved}/{len(prices)} saved")
    if saved == 0:
        sys.exit(1)

asyncio.run(main())
