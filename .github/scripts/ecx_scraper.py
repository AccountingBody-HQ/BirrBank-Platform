import os, sys, re, json, datetime
import urllib.request

SUPABASE_URL = os.environ["SUPABASE_URL"]
SERVICE_KEY  = os.environ["SUPABASE_SERVICE_ROLE_KEY"]
TODAY        = datetime.date.today().isoformat()
YESTERDAY    = (datetime.date.today() - datetime.timedelta(days=1)).isoformat()

CODE_MAP = {
    "GM":  ("coffee",  "Gimbi"),
    "LU":  ("coffee",  "Limu Unwashed"),
    "LW":  ("coffee",  "Limu Washed"),
    "RW":  ("coffee",  "Rehoboth Washed"),
    "WW":  ("coffee",  "Wellega Washed"),
    "BR":  ("coffee",  "Bench"),
    "SB":  ("coffee",  "Sidama Bench"),
    "YI":  ("coffee",  "Yirgacheffe"),
    "HA":  ("coffee",  "Harar"),
    "JI":  ("coffee",  "Jimma"),
    "WS":  ("sesame",  "White Sesame"),
    "MS":  ("sesame",  "Mixed Sesame"),
    "HV":  ("sesame",  "Humera Sesame"),
    "RK":  ("bean",    "Red Kidney Bean"),
    "WP":  ("bean",    "White Pea Bean"),
    "GP":  ("bean",    "Green Mung Bean"),
    "CP":  ("bean",    "Chickpea"),
    "SY":  ("soybean", "Soybean"),
    "WH":  ("grain",   "Wheat"),
    "MZ":  ("grain",   "Maize"),
    "PT":  ("bean",    "Pinto Bean"),
    "PP":  ("bean",    "White Pigeon Pea"),
}

def get_commodity_info(code):
    for length in (3, 2):
        prefix = code[:length].upper()
        if prefix in CODE_MAP:
            ctype, cname = CODE_MAP[prefix]
            return ctype, f"{cname} ({code})"
    return "commodity", code

def sb_request(method, path, payload, extra_headers=None):
    url  = f"{SUPABASE_URL}/rest/v1/{path}"
    data = json.dumps(payload).encode()
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

def get_yesterday_prices():
    url = f"{SUPABASE_URL}/rest/v1/commodity_prices?trade_date=eq.{YESTERDAY}&select=commodity_code,price_etb"
    req = urllib.request.Request(url)
    req.add_header("apikey",         SERVICE_KEY)
    req.add_header("Authorization",  f"Bearer {SERVICE_KEY}")
    req.add_header("Accept-Profile", "birrbank")
    with urllib.request.urlopen(req, timeout=15) as r:
        data = json.loads(r.read().decode())
    return {row["commodity_code"]: float(row["price_etb"]) for row in data}

def scrape():
    req = urllib.request.Request("https://www.ecx.com.et/")
    req.add_header("User-Agent", "BirrBank/1.0")
    with urllib.request.urlopen(req, timeout=30) as r:
        body = r.read().decode("utf-8", errors="replace")
    clean = re.sub(r"<img[^>]+/?>", "", body)
    matches = re.findall(r"([A-Z][A-Z0-9]{3,7})\s+(\d+)\s*:\s*(\d+)", clean)
    results = []
    seen = set()
    for code, price_qt, volume in matches:
        key = f"{code}_{price_qt}"
        if key in seen:
            continue
        seen.add(key)
        price_etb = round(int(price_qt) / 100, 2)
        vol_kg    = int(volume) * 100
        ctype, cname = get_commodity_info(code)
        results.append({
            "commodity_code": code,
            "commodity_name": cname,
            "commodity_type": ctype,
            "price_etb":      price_etb,
            "volume_kg":      vol_kg if vol_kg > 0 else None,
        })
        print(f"  {code}: ETB {price_etb}/kg ({ctype})")
    return results

def main():
    print("Fetching yesterday prices for change calculation...")
    prev_prices = get_yesterday_prices()
    print(f"  Found {len(prev_prices)} previous prices")

    print("Scraping ECX homepage ticker...")
    prices = scrape()
    if not prices:
        print("No prices found")
        sys.exit(1)

    print(f"Saving {len(prices)} prices...")
    saved = 0
    for p in prices:
        code = p["commodity_code"]
        prev = prev_prices.get(code)
        change     = round(p["price_etb"] - prev, 2) if prev else None
        change_pct = round((change / prev) * 100, 2) if prev and prev > 0 else None

        row = {
            "commodity_code":  code,
            "commodity_name":  p["commodity_name"],
            "commodity_type":  p["commodity_type"],
            "price_etb":       p["price_etb"],
            "price_change":    change,
            "price_change_pct":change_pct,
            "volume_kg":       p["volume_kg"],
            "trade_date":      TODAY,
            "country_code":    "ET",
        }
        try:
            sb_request("POST", "commodity_prices", row,
                {"Prefer": "resolution=merge-duplicates"})
            sb_request("POST", "commodity_history", {
                "commodity_code": code,
                "trade_date":     TODAY,
                "price_etb":      p["price_etb"],
                "volume_kg":      p["volume_kg"],
                "country_code":   "ET",
            }, {"Prefer": "resolution=merge-duplicates"})
            saved += 1
        except Exception as e:
            print(f"  Error {code}: {e}")

    print(f"Done: {saved}/{len(prices)} saved")
    if saved == 0:
        sys.exit(1)

main()
