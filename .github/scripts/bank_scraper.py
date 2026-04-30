import urllib.request
import json
import re
import csv
import io
import os
import sys
import datetime
from concurrent.futures import ThreadPoolExecutor, as_completed

SUPABASE_URL = os.environ["SUPABASE_URL"]
SUPABASE_KEY = os.environ["SUPABASE_SERVICE_ROLE_KEY"]
TODAY = datetime.date.today().isoformat()
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"

def fetch(url, timeout=20):
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "text/html,application/json,*/*"})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read().decode("utf-8", errors="ignore")

def upsert(slug, rates):
    if not rates:
        print(f"  {slug}: no rates extracted")
        return 0
    records = [
        {"institution_slug": slug, "country_code": "ET", "currency_code": r["currency_code"],
         "buying_rate": r["buying_rate"], "selling_rate": r["selling_rate"],
         "rate_date": TODAY, "source": "scraped"}
        for r in rates if r.get("buying_rate") and r.get("selling_rate")
    ]
    if not records:
        return 0
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json",
        "Accept-Profile": "birrbank",
        "Content-Profile": "birrbank"
    }
    # Delete today records for this bank first
    del_req = urllib.request.Request(
        f"{SUPABASE_URL}/rest/v1/exchange_rates?institution_slug=eq.{slug}&rate_date=eq.{TODAY}",
        headers=headers,
        method="DELETE"
    )
    try:
        with urllib.request.urlopen(del_req, timeout=15) as r:
            r.read()
    except:
        pass
    # Insert fresh
    ins_req = urllib.request.Request(
        f"{SUPABASE_URL}/rest/v1/exchange_rates",
        data=json.dumps(records).encode(),
        headers=headers,
        method="POST"
    )
    with urllib.request.urlopen(ins_req, timeout=30) as r:
        r.read()
    print(f"  {slug}: {len(records)} rates saved")
    return len(records)

def scrape_cbe():
    data = json.loads(fetch(f"https://combanketh.et/cbeapi/daily-exchange-rates/?_limit=1&Date={TODAY}"))
    rates = []
    if not data:
        return rates
    for item in data[0].get("ExchangeRate", []):
        code = item.get("currency", {}).get("CurrencyCode")
        buying = item.get("transactionalBuying")
        selling = item.get("transactionalSelling")
        if code and buying and selling:
            try:
                rates.append({"currency_code": code, "buying_rate": float(buying), "selling_rate": float(selling)})
            except:
                pass
    return rates

def scrape_dashen():
    html = fetch("https://dashenbanksc.com/daily-exchange-rates/")
    rows = re.findall(r"<tr[^>]*>(.*?)</tr>", html, re.DOTALL)
    rates = []
    seen = set()
    CODES = {"USD","EUR","GBP","SAR","AED","CHF","CAD","CNY","JPY","KES","AUD","NOK","SEK","DKK","KWD","ZAR","INR","DJF"}
    for row in rows:
        cells = [re.sub(r"<[^>]+>", "", c).strip() for c in re.findall(r"<td[^>]*>(.*?)</td>", row, re.DOTALL)]
        cells = [c for c in cells if c]
        if len(cells) >= 4 and cells[0] in CODES and cells[0] not in seen:
            try:
                rates.append({"currency_code": cells[0], "buying_rate": float(cells[2]), "selling_rate": float(cells[3])})
                seen.add(cells[0])
            except:
                pass
    return rates

def scrape_wegagen():
    data = json.loads(fetch("https://weg.back.strapi.wegagen.com/api/exchange-rates?populate=*"))
    rates = []
    for item in data.get("data", []):
        attrs = item.get("attributes", {})
        code = attrs.get("code")
        buying = attrs.get("buying") or attrs.get("tra_buying")
        selling = attrs.get("selling") or attrs.get("tra_selling")
        if code and buying and selling:
            try:
                rates.append({"currency_code": code, "buying_rate": float(buying), "selling_rate": float(selling)})
            except:
                pass
    return rates

def scrape_nib():
    html = fetch("https://nibbanksc.com/exchange-rate/")
    rows = re.findall(r"<tr[^>]*>(.*?)</tr>", html, re.DOTALL)
    rates = []
    seen = set()
    CODES = {"USD","EUR","GBP","SAR","AED","CHF","CAD","CNY","JPY"}
    for row in rows:
        cells = [re.sub(r"<[^>]+>", "", c).strip() for c in re.findall(r"<td[^>]*>(.*?)</td>", row, re.DOTALL)]
        cells = [c for c in cells if c]
        if len(cells) >= 3 and cells[0] in CODES and cells[0] not in seen:
            try:
                rates.append({"currency_code": cells[0], "buying_rate": float(cells[1]), "selling_rate": float(cells[2])})
                seen.add(cells[0])
            except:
                pass
    return rates

def scrape_zemen():
    html = fetch("https://zemenbank.com/exchange-rates/")
    CMAP = {"US Dollar":"USD","Euro":"EUR","Pound Sterling":"GBP","Saudi Riyal":"SAR",
            "UAE Dirham":"AED","Swiss Franc":"CHF","Canadian Dollar":"CAD","Chinese Yuan":"CNY",
            "Japanese Yen":"JPY","Kenyan Shilling":"KES","Australian Dollar":"AUD",
            "Norwegian Krone":"NOK","Swedish Krona":"SEK","Danish Krone":"DKK",
            "Kuwaiti Dinar":"KWD","South African Rand":"ZAR","Indian Rupee":"INR","Djibouti Franc":"DJF"}
    rates = []
    segments = re.split(r'class="exr-row"', html)[1:]
    for seg in segments:
        name_m = re.search(r'exr-currency-name[^>]*>([^<]+)</span>', seg)
        cols = re.findall(r'class="exr-column"[^>]*>(\d+\.\d+)<', seg)
        if name_m and len(cols) >= 2:
            code = CMAP.get(name_m.group(1).strip())
            if code:
                try:
                    rates.append({"currency_code": code, "buying_rate": float(cols[0]), "selling_rate": float(cols[1])})
                except:
                    pass
    return rates

def scrape_coop():
    html = fetch("https://coopbankoromia.com.et/daily-exchange-rates/")
    m = re.search(r"var exchangeRates\s*=\s*(\{[^<]+\})", html)
    if not m:
        return []
    try:
        data = json.loads(m.group(1))
    except:
        return []
    rates = []
    for code, info in data.items():
        try:
            buying = info.get("buying") or info.get("transaction_buying")
            selling = info.get("selling") or info.get("transaction_selling")
            if buying and selling:
                rates.append({"currency_code": code, "buying_rate": float(buying), "selling_rate": float(selling)})
        except:
            pass
    return rates

def scrape_bunna():
    url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vT9cRBkMy5uaIjJ05Rq1cPQLYm5ivo56vUO_-R5oBr0MqrzBRDIu-evKWDfjQZhysZPzpAECEwiok30/pub?gid=171183432&single=true&output=csv"
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=20) as r:
        content = r.read().decode("utf-8", errors="ignore")
    reader = csv.DictReader(io.StringIO(content))
    rates = []
    for row in reader:
        code = row.get("Currency Code", "").strip()
        b = row.get("Average Buying", "").strip()
        s = row.get("Average Selling", "").strip()
        if code and b not in ("", "No Trade") and s not in ("", "No Trade"):
            try:
                rates.append({"currency_code": code, "buying_rate": float(b), "selling_rate": float(s)})
            except:
                pass
    return rates

def scrape_berhan():
    html = fetch("https://berhanbanksc.com/exchange-rates/")
    matches = re.findall(r"id='([A-Z]{3})'\s+value=(\{[^/]+\})\s*/", html)
    rates = []
    for code, json_str in matches:
        try:
            data = json.loads(json_str)
            b, s = float(data["buying"]), float(data["selling"])
            if b > 0 and s > 0:
                rates.append({"currency_code": code, "buying_rate": b, "selling_rate": s})
        except:
            pass
    return rates

def scrape_addis():
    data = json.loads(fetch("https://api.addisbanksc.com/api/exchange-rates"))
    rates = []
    for item in data:
        code = item.get("currency")
        buying = item.get("transactionBuying") or item.get("buying")
        selling = item.get("transactionSelling") or item.get("selling")
        if code and code != "ETB" and buying and selling:
            try:
                b, s = float(buying), float(selling)
                if b > 0 and s > 0:
                    rates.append({"currency_code": code, "buying_rate": b, "selling_rate": s})
            except:
                pass
    return rates

def scrape_amhara():
    html = fetch("https://www.amharabank.com/daily-exchange-rate/")
    CMAP = {"US Dollar":"USD","Euro":"EUR","Pound Sterling":"GBP","Saudi Riyal":"SAR",
            "UAE Dirham":"AED","Swiss Franc":"CHF","Canadian Dollar":"CAD","Chinese Yuan":"CNY",
            "Japanese Yen":"JPY","Kenyan Shilling":"KES","Australian Dollar":"AUD"}
    rates = []
    for name, code in CMAP.items():
        pattern = re.escape(name) + r"\s*\([A-Z]+\)\s*([\d.]+)\s+([\d.]+)"
        m = re.search(pattern, html)
        if m:
            try:
                rates.append({"currency_code": code, "buying_rate": float(m.group(1)), "selling_rate": float(m.group(2))})
            except:
                pass
    return rates

def scrape_enat():
    html = fetch("https://www.enatbanksc.com/")
    rates = []
    CODES = ["USD","EUR","GBP","SAR","AED","CHF","CAD","CNY","JPY"]
    for code in CODES:
        pattern = rf"<h4>{code}</h4>.*?<p>([\d.]+)</p>.*?<p>([\d.]+)</p>"
        m = re.search(pattern, html, re.DOTALL)
        if m:
            try:
                rates.append({"currency_code": code, "buying_rate": float(m.group(1)), "selling_rate": float(m.group(2))})
            except:
                pass
    return rates

def scrape_ahadu():
    html = fetch("https://ahadubank.com/")
    CMAP = {"US - DOLLAR":"USD","US DOLLAR":"USD","EURO":"EUR","EUR":"EUR",
            "POUND STERLING":"GBP","GBP":"GBP","SAUDI RIYAL":"SAR","SAR":"SAR",
            "UAE DIRHAM":"AED","AED":"AED","SWISS FRANC":"CHF","CHF":"CHF",
            "CANADIAN DOLLAR":"CAD","CAD":"CAD"}
    blocks = re.findall(r"<h6[^>]*><span[^>]*>([^<]+)</span>.*?Buying:\s*([\d.]+).*?Selling:\s*([\d.]+)", html, re.DOTALL)
    rates = []
    seen = set()
    for name, buying, selling in blocks:
        code = CMAP.get(name.strip().upper())
        if code and code not in seen:
            try:
                rates.append({"currency_code": code, "buying_rate": float(buying), "selling_rate": float(selling)})
                seen.add(code)
            except:
                pass
    return rates

def scrape_gadaa():
    html = fetch("https://gadaabank.com.et/")
    rows = re.findall(r"<tr[^>]*>(.*?)</tr>", html, re.DOTALL)
    rates = []
    seen = set()
    CODES = {"USD","EUR","GBP","SAR","AED","CHF","CAD","CNY","JPY"}
    for row in rows:
        cells = [re.sub(r"<[^>]+>", "", c).strip() for c in re.findall(r"<td[^>]*>(.*?)</td>", row, re.DOTALL)]
        cells = [c for c in cells if c]
        if len(cells) >= 3 and cells[0] in CODES and cells[0] not in seen:
            try:
                rates.append({"currency_code": cells[0], "buying_rate": float(cells[1]), "selling_rate": float(cells[2])})
                seen.add(cells[0])
            except:
                pass
    return rates

def scrape_zamzam():
    html = fetch("https://zamzambank.com/exchange-rates/")
    rows = re.findall(r"<tr[^>]*>(.*?)</tr>", html, re.DOTALL)
    rates = []
    seen = set()
    CODES = {"USD","EUR","GBP","SAR","AED","CHF","CAD","CNY","JPY","KES","AUD","NOK","SEK","DKK","KWD","ZAR","INR","DJF"}
    for row in rows:
        cells = [re.sub(r"<[^>]+>", "", c).strip() for c in re.findall(r"<td[^>]*>(.*?)</td>", row, re.DOTALL)]
        cells = [re.sub(r"&#[0-9]+;", " ", c).strip() for c in cells]
        cells = [c for c in cells if c]
        if len(cells) >= 3:
            code_m = re.match(r"([A-Z]{3})\s", cells[0])
            if code_m:
                code = code_m.group(1)
                if code in CODES and code not in seen:
                    try:
                        rates.append({"currency_code": code, "buying_rate": float(cells[1]), "selling_rate": float(cells[2])})
                        seen.add(code)
                    except:
                        pass
    return rates

BANKS = [
    ("commercial-bank-of-ethiopia", scrape_cbe),
    ("dashen-bank", scrape_dashen),
    ("wegagen-bank", scrape_wegagen),
    ("nib-international-bank", scrape_nib),
    ("zemen-bank", scrape_zemen),
    ("cooperative-bank-of-oromia", scrape_coop),
    ("bunna-international-bank", scrape_bunna),
    ("berhan-bank", scrape_berhan),
    ("addis-international-bank", scrape_addis),
    ("amhara-bank", scrape_amhara),
    ("enat-bank", scrape_enat),
    ("ahadu-bank", scrape_ahadu),
    ("gadaa-bank", scrape_gadaa),
    ("zamzam-bank", scrape_zamzam),
]

print(f"BirrBank Bank FX Scraper -- {TODAY}")
print(f"Scraping {len(BANKS)} banks...")
total_saved = 0
errors = []

def run_bank(slug, fn):
    try:
        rates = fn()
        saved = upsert(slug, rates)
        return (slug, saved, None)
    except Exception as e:
        return (slug, 0, str(e))

with ThreadPoolExecutor(max_workers=8) as ex:
    futures = {ex.submit(run_bank, slug, fn): slug for slug, fn in BANKS}
    for f in as_completed(futures):
        slug, saved, error = f.result()
        if error:
            print(f"  ERROR {slug}: {error}")
            errors.append(slug)
        else:
            total_saved += saved

print(f"\nDone. {total_saved} rates saved. {len(errors)} errors: {errors}")
if len(errors) > len(BANKS) // 2:
    sys.exit(1)
