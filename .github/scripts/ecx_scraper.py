import os, sys, re, json, datetime
import urllib.request

SUPABASE_URL = os.environ["SUPABASE_URL"]
SERVICE_KEY  = os.environ["SUPABASE_SERVICE_ROLE_KEY"]
TODAY        = datetime.date.today().isoformat()

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
    upper = code.upper()
    for length in (3, 2):
        prefix = upper[:length]
        if prefix in CODE_MAP:
            ctype, cname = CODE_MAP[prefix]
            return ctype, f"{cname} ({code.upper()})"
    return "commodity", code.upper()

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

def scrape():
    req = urllib.request.Request("https://www.ecx.com.et/")
    req.add_header("User-Agent", "BirrBank/1.0")
    with urllib.request.urlopen(req, timeout=30) as r:
        body = r.read().decode("utf-8", errors="replace")

    # Extract the trading table (Symbol WH Pro.Year Prvs.Close Close Change High Low Volume)
    idx = body.find("Prvs.Close")
    if idx == -1:
        print("Trading table not found — falling back to ticker")
        return scrape_ticker(body)

    chunk = body[idx:idx+10000]
    clean = re.sub(r"<[^>]+>", " ", chunk)
    clean = re.sub(r"\s+", " ", clean).strip()

    # Case-insensitive code match (ECX uses mixed case like LWGj3)
    rows = re.findall(
        r"([A-Za-z][A-Za-z0-9]{3,7})\s+([A-Z]{2})\s+(\d{4})\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)",
        clean
    )

    results = []
    seen = set()
    for sym, wh, yr, prev_qt, close_qt, vol_qt, high_qt, low_qt, vol_ton in rows:
        code = sym.upper()
        if code in seen:
            continue
        seen.add(code)

        close_etb = round(float(close_qt) / 100, 2)
        prev_etb  = round(float(prev_qt) / 100, 2) if float(prev_qt) > 0 else None
        change    = round(close_etb - prev_etb, 2) if prev_etb else None
        change_pct= round((change / prev_etb) * 100, 2) if prev_etb and prev_etb > 0 else None
        vol_kg    = round(float(vol_ton) * 1000) if float(vol_ton) > 0 else None

        ctype, cname = get_commodity_info(code)
        results.append({
            "commodity_code":   code,
            "commodity_name":   cname,
            "commodity_type":   ctype,
            "price_etb":        close_etb,
            "price_change":     change,
            "price_change_pct": change_pct,
            "volume_kg":        vol_kg,
        })
        print(f"  {code}: {close_etb} ETB/kg (prev={prev_etb}, chg={change}, vol={vol_kg}kg)")

    return results

def scrape_ticker(body):
    # Fallback: parse the ticker marquee
    clean = re.sub(r"<img[^>]+/?>", "", body)
    matches = re.findall(r"([A-Z][A-Z0-9]{3,7})\s+(\d+)\s*:\s*(\d+)", clean)
    results = []
    seen = set()
    for code, price_qt, volume in matches:
        if code in seen:
            continue
        seen.add(code)
        price_etb = round(int(price_qt) / 100, 2)
        vol_kg    = int(volume) * 100
        ctype, cname = get_commodity_info(code)
        results.append({
            "commodity_code":   code,
            "commodity_name":   cname,
            "commodity_type":   ctype,
            "price_etb":        price_etb,
            "price_change":     None,
            "price_change_pct": None,
            "volume_kg":        vol_kg if vol_kg > 0 else None,
        })
        print(f"  {code}: {price_etb} ETB/kg (ticker fallback)")
    return results

def main():
    print("Scraping ECX trading table...")
    prices = scrape()

    if not prices:
        print("No prices found")
        sys.exit(1)

    print(f"Saving {len(prices)} commodity prices...")
    saved = 0
    for p in prices:
        row = {
            "commodity_code":   p["commodity_code"],
            "commodity_name":   p["commodity_name"],
            "commodity_type":   p["commodity_type"],
            "price_etb":        p["price_etb"],
            "price_change":     p["price_change"],
            "price_change_pct": p["price_change_pct"],
            "volume_kg":        p["volume_kg"],
            "trade_date":       TODAY,
            "country_code":     "ET",
        }
        try:
            sb_request("POST", "commodity_prices?on_conflict=commodity_code,trade_date", row,
                {"Prefer": "resolution=merge-duplicates,return=minimal"})
            sb_request("POST", "commodity_history?on_conflict=commodity_code,trade_date", {
                "commodity_code": p["commodity_code"],
                "trade_date":     TODAY,
                "price_etb":      p["price_etb"],
                "volume_kg":      p["volume_kg"],
                "country_code":   "ET",
            }, {"Prefer": "resolution=merge-duplicates,return=minimal"})
            saved += 1
        except Exception as e:
            print(f"  Error {p['commodity_code']}: {e}")

    print(f"Done: {saved}/{len(prices)} saved")
    if saved == 0:
        sys.exit(1)

main()
