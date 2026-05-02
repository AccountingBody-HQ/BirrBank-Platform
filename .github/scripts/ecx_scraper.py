import os, sys, re, json, datetime
import urllib.request

SUPABASE_URL = os.environ["SUPABASE_URL"]
SERVICE_KEY  = os.environ["SUPABASE_SERVICE_ROLE_KEY"]
TODAY        = datetime.date.today().isoformat()

# ECX code prefix to commodity type and name
CODE_MAP = {
    "GM":   ("coffee",  "Gimbi"),
    "LU":   ("coffee",  "Limu Unwashed"),
    "LW":   ("coffee",  "Limu Washed"),
    "RW":   ("coffee",  "Rehoboth Washed"),
    "WW":   ("coffee",  "Wellega Washed"),
    "WH":   ("coffee",  "Washed Hard"),
    "BR":   ("coffee",  "Bench"),
    "SB":   ("coffee",  "Sidama/Bench"),
    "YI":   ("coffee",  "Yirgacheffe"),
    "HA":   ("coffee",  "Harar"),
    "JI":   ("coffee",  "Jimma"),
    "WS":   ("sesame",  "White Sesame"),
    "MS":   ("sesame",  "Mixed Sesame"),
    "HV":   ("sesame",  "Humera Sesame"),
    "RK":   ("bean",    "Red Kidney Bean"),
    "WP":   ("bean",    "White Pea Bean"),
    "GP":   ("bean",    "Green Mung Bean"),
    "CP":   ("bean",    "Chickpea"),
    "SY":   ("soybean", "Soybean"),
    "WH":   ("grain",   "Wheat"),
    "MZ":   ("grain",   "Maize"),
    "PT":   ("bean",    "Pinto Bean"),
    "PP":   ("bean",    "White Pigeon Pea"),
}

def get_commodity_info(code):
    prefix2 = code[:2].upper()
    prefix3 = code[:3].upper()
    if prefix3 in CODE_MAP:
        ctype, cname = CODE_MAP[prefix3]
    elif prefix2 in CODE_MAP:
        ctype, cname = CODE_MAP[prefix2]
    else:
        ctype, cname = "commodity", code
    return ctype, f"{cname} ({code})"

def sb_upsert(payload):
    url  = f"{SUPABASE_URL}/rest/v1/commodity_prices"
    data = json.dumps(payload).encode()
    req  = urllib.request.Request(url, data=data, method="POST")
    req.add_header("apikey",         SERVICE_KEY)
    req.add_header("Authorization",  f"Bearer {SERVICE_KEY}")
    req.add_header("Content-Type",   "application/json")
    req.add_header("Accept-Profile", "birrbank")
    req.add_header("Content-Profile","birrbank")
    req.add_header("Prefer",         "resolution=merge-duplicates")
    with urllib.request.urlopen(req, timeout=20) as r:
        return r.status

def scrape():
    req = urllib.request.Request("https://www.ecx.com.et/")
    req.add_header("User-Agent", "BirrBank/1.0")
    with urllib.request.urlopen(req, timeout=30) as r:
        body = r.read().decode("utf-8", errors="replace")

    # Strip img tags then parse ticker
    clean = re.sub(r"<img[^>]+/?>", "", body)
    matches = re.findall(r"([A-Z][A-Z0-9]{3,7})\s+(\d+)\s*:\s*(\d+)", clean)

    results = []
    seen = set()
    for code, price_qt, volume in matches:
        key = f"{code}_{price_qt}"
        if key in seen:
            continue
        seen.add(key)
        price_etb = round(int(price_qt) / 100, 2)  # quintal -> kg
        vol_kg    = int(volume) * 100               # quintals -> kg
        ctype, cname = get_commodity_info(code)
        results.append({
            "commodity_code": code,
            "commodity_name": cname,
            "commodity_type": ctype,
            "price_etb":      price_etb,
            "volume_kg":      vol_kg if vol_kg > 0 else None,
            "trade_date":     TODAY,
            "country_code":   "ET",
        })
        print(f"  {code}: ETB {price_etb}/kg ({ctype}), vol={vol_kg}kg")

    return results

def main():
    print("Scraping ECX homepage ticker...")
    prices = scrape()

    if not prices:
        print("No prices found — check ECX site structure")
        sys.exit(1)

    print(f"\nSaving {len(prices)} commodity prices...")
    saved = 0
    for p in prices:
        try:
            sb_upsert(p)
            saved += 1
        except Exception as e:
            print(f"  Error saving {p['commodity_code']}: {e}")

    print(f"Done: {saved}/{len(prices)} saved")
    if saved == 0:
        sys.exit(1)

main()
