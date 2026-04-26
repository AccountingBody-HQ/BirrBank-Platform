import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseAdminClient } from '@/lib/supabase'

export const runtime = 'nodejs'
export const maxDuration = 120

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY!

const PILLARS: Record<string, string> = {
  banking:      'Banking & Microfinance',
  insurance:    'Insurance',
  markets:      'Capital Markets',
  commodities:  'Commodities',
  regulations:  'Regulations',
  diaspora:     'Diaspora',
  intelligence: 'Intelligence',
}

const CONTENT_TYPES: Record<string, string> = {
  bank_review:        'Bank Review',
  rate_guide:         'Rate Guide',
  insurance_guide:    'Insurance Guide',
  market_analysis:    'Market Analysis',
  commodity_report:   'Commodity Report',
  ipo_guide:          'IPO Guide',
  diaspora_guide:     'Diaspora Guide',
  regulatory_update:  'Regulatory Update',
  investment_guide:   'Investment Guide',
  loan_guide:         'Loan Guide',
  fx_guide:           'FX Guide',
  savings_guide:      'Savings Guide',
  ecx_guide:          'ECX Guide',
  esx_guide:          'ESX Guide',
  financial_explainer:'Financial Explainer',
}

const CONTENT_STRUCTURES: Record<string, string> = {
  bank_review: `Write a comprehensive, factual review of the institution covering:
1. Institution Overview — history, ownership, NBE licence, branch network, market position
2. Savings Products — account types, current rates, minimum balances, special features
3. Loan Products — personal, home, business and car loans, rates and eligibility
4. Digital Services — mobile app, internet banking, USSD, mobile money integration
5. FX and Remittance — currencies supported, FX rates, transfer services for diaspora
6. Special Accounts — diaspora, youth, women savings accounts where available
7. Who Is This Bank Best For — specific user profiles that benefit most
8. How to Open an Account — step-by-step practical guide
9. BirrBank Verdict — balanced summary of strengths and weaknesses`,

  rate_guide: `Write a practical rate comparison guide covering:
1. Current Rate Environment — overview of savings/loan rates across Ethiopian banks
2. How Rates Are Set — NBE directives, market competition, product types
3. Best Rates by Category — fixed deposits, regular savings, current accounts
4. How to Read a Rate — understanding APR, minimum balance, lock-in periods
5. Rate Alert Strategy — how to track rate changes using BirrBank
6. Practical Recommendations — which products suit which savings goals`,

  insurance_guide: `Write a practical insurance guide covering:
1. Insurance Overview — the Ethiopian insurance market, NBE regulation, key players
2. Product Types — motor, life, health, property, travel, agricultural coverage
3. How Premiums Are Calculated — key factors, typical ranges in ETB
4. Claims Process — step-by-step how to make a claim in Ethiopia
5. Comparing Providers — what to look for, BirrBank comparison methodology
6. Common Mistakes — errors Ethiopians make when buying insurance
7. Practical Buying Guide — how to choose the right product`,

  market_analysis: `Write a capital markets analysis covering:
1. ESX Market Overview — current listings, index performance, trading volumes
2. Sector Analysis — banking, manufacturing, agricultural sectors on ESX
3. IPO Pipeline — upcoming listings, ECMA approvals, subscription windows
4. T-Bill and Bond Market — current yields, auction results, investment minimums
5. Investment Returns Comparison — ESX equities vs savings rates vs T-bills
6. How to Invest on ESX — practical steps for first-time investors
7. Risk Considerations — market risk, liquidity, regulatory risk in Ethiopian context`,

  commodity_report: `Write an ECX commodity market report covering:
1. Market Overview — ECX structure, trading hours, commodity classes
2. Coffee Market — current prices by grade, seasonal factors, export outlook
3. Sesame Market — price trends, quality grades, export demand
4. Grain and Bean Market — wheat, soybean, chickpea price movements
5. Price Drivers — weather, global demand, export policy, birr exchange rate
6. Who Uses ECX Data — exporters, farmers, agribusinesses, financial institutions
7. How to Access ECX Prices — BirrBank commodities section, ECX official site`,

  ipo_guide: `Write a practical IPO investment guide covering:
1. What is an IPO in Ethiopia — ESX listing process, ECMA approval, prospectus
2. Current IPO Pipeline — companies under review, expected listing timelines
3. How to Participate — account opening at CBE Capital or Wegagen Capital, process
4. Reading a Prospectus — key sections every investor must review
5. Valuation Basics — how to assess if an IPO is fairly priced
6. Risks of IPO Investing — liquidity risk, pricing risk, lock-up periods
7. Historical Performance — how previous Ethiopian IPOs have performed post-listing`,

  diaspora_guide: `Write a practical guide for the Ethiopian diaspora covering:
1. Diaspora Banking Overview — which banks offer diaspora accounts, requirements
2. Sending Money Home — best remittance services, fees, exchange rates comparison
3. Opening an Account from Abroad — required documents, online vs in-person process
4. Investing in Ethiopia — ESX stocks, T-bills, fixed deposits from abroad
5. Property Investment — how diaspora can legally purchase property in Ethiopia
6. FX Considerations — ETB exchange rate, timing strategies, rate alerts
7. Tax Implications — Ethiopian and home country tax considerations for diaspora investors`,

  regulatory_update: `Write a clear regulatory update covering:
1. Regulation Overview — which authority issued it, effective date, scope
2. What Changed — specific changes from previous rules in plain language
3. Who Is Affected — institutions, consumers, investors, specific product categories
4. Compliance Requirements — what banks, insurers or businesses must do
5. Consumer Impact — how this affects Ethiopian consumers and the diaspora
6. BirrBank Data Update — which BirrBank sections are affected by this regulation
7. Official Source — direct link to NBE, ECMA or ECX directive`,

  investment_guide: `Write a practical investment guide for Ethiopian retail investors covering:
1. Investment Options in Ethiopia — savings accounts, T-bills, ESX equities compared
2. Risk and Return Framework — expected returns and risks for each asset class
3. Starting with Small Amounts — minimum investments across all products
4. Diversification in an Ethiopian Context — building a balanced portfolio with available products
5. ESX Step-by-Step — how to open a brokerage account and place first trade
6. T-Bill Investment — how NBE auctions work, minimum amounts, yield calculation
7. Long-Term Wealth Building — compound interest, regular savings, reinvestment`,

  loan_guide: `Write a comprehensive loan guide covering:
1. Ethiopian Loan Market Overview — NBE rate directives, bank competition, market rates
2. Personal Loans — rates across banks, eligibility, required documents
3. Home Loans — mortgage availability, rates, LTV ratios, land ownership rules
4. Business Loans — SME credit, working capital, equipment finance
5. Agricultural Loans — microfinance options, CBE Birr agricultural credit
6. How to Compare Loans — APR vs flat rate, total cost calculation, EMI formula
7. Application Tips — how to improve approval chances at Ethiopian banks
8. EMI Calculator Guide — using BirrBank loan calculator`,

  fx_guide: `Write a practical FX guide covering:
1. Ethiopian FX Market — NBE as regulator, official vs commercial bank rates
2. How the Birr Exchange Rate is Set — NBE indicative rate, bank spreads
3. Currency by Currency Guide — USD, GBP, EUR, SAR, AED rates and uses
4. Best Rate Strategy — how to get the best ETB when converting foreign currency
5. Bank vs FX Bureau — when to use each, fee comparison
6. Diaspora Remittance FX — how transfer fees and exchange rates combine
7. Rate Alert Strategy — using BirrBank to track daily NBE and bank rates`,

  savings_guide: `Write a comprehensive savings guide covering:
1. Ethiopian Savings Market Overview — NBE minimum rate directive, competitive rates
2. Account Types Compared — regular savings, fixed deposits, current, diaspora, youth, women
3. Fixed Deposit Strategy — 3, 6, 12 and 24-month rates compared across banks
4. Sharia-Compliant Options — Islamic savings products available in Ethiopia
5. Minimum Balance Requirements — what to watch for across institutions
6. Interest Calculation — how banks calculate and pay interest in Ethiopia
7. Best Savings Strategy by Goal — emergency fund, house purchase, education, retirement`,

  ecx_guide: `Write a guide to the Ethiopian Commodity Exchange covering:
1. ECX Overview — history, structure, regulation, trading hours
2. Commodity Classes — coffee grades, sesame varieties, grains, beans traded on ECX
3. How Prices Are Set — auction mechanism, daily settlement price
4. Who Trades on ECX — exporters, processors, government agencies, foreign buyers
5. Reading ECX Price Data — commodity codes, price per quintal, volume units
6. Price Trends and Seasonality — how to read historical patterns
7. BirrBank ECX Integration — how BirrBank sources and displays ECX data daily`,

  esx_guide: `Write a guide to the Ethiopian Securities Exchange covering:
1. ESX Overview — launch in January 2025, ECMA regulation, current listings
2. How ESX Works — trading sessions, settlement, custody at ECSD
3. Listed Companies — current listings, sectors, market capitalisation
4. How to Open a Brokerage Account — CBE Capital, Wegagen Capital, process and documents
5. Placing a Trade — order types, minimum lot sizes, trading fees
6. Reading ESX Data — price, change, volume, P/E ratio interpretation
7. IPO Pipeline — how ECMA approvals lead to new listings, what to watch for`,

  financial_explainer: `Write a clear financial explainer covering:
1. Plain English Definition — what this term or concept means in one clear paragraph
2. Why It Matters in Ethiopia — the specific Ethiopian context and relevance
3. How It Works in Practice — step-by-step mechanics with a realistic ETB example
4. Common Misconceptions — what Ethiopians commonly misunderstand about this
5. Real-World Application — a concrete scenario showing it in the Ethiopian financial context
6. Related Concepts — 3-5 closely related terms the reader should also understand
7. Where to Learn More — official sources, BirrBank guides, NBE resources`,
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { action } = body

    if (action === 'generate') {
      const { pillar, contentType, topic, institutionName, length } = body

      if (!pillar || !contentType || !topic) {
        return NextResponse.json({ error: 'pillar, contentType and topic are required' }, { status: 400 })
      }

      const wordTargets: Record<string, string> = {
        short:    '500 to 650 words — tight, practical, zero padding.',
        standard: '900 to 1100 words — comprehensive and useful for Ethiopian consumers.',
        deep:     '1800 to 2200 words — exhaustive reference guide for the BirrBank platform.',
      }
      const wordTarget = wordTargets[length ?? 'standard']
      const structure  = CONTENT_STRUCTURES[contentType] ?? CONTENT_STRUCTURES.financial_explainer
      const instLine   = institutionName ? `INSTITUTION FOCUS: \${institutionName} — all specific data and examples should reference this institution.` : ''

      const prompt = `You are the lead content writer for BirrBank — Ethiopia financial operating system and the definitive source of financial intelligence for Ethiopian consumers, businesses and the diaspora.

PLATFORM: BirrBank (birrbank.com)
BRAND POSITION: Ethiopia free, independent, verified financial intelligence platform
AUDIENCE: Ethiopian consumers comparing savings rates and loans, diaspora sending money home and investing in Ethiopian stocks, retail investors on the ESX, SMEs comparing business loans and FX rates, and financial professionals tracking the Ethiopian market.
VOICE: Authoritative, practical, clear. Written for people making real financial decisions with real money. Never generic. Never vague. Always grounded in the Ethiopian financial reality.

PILLAR: \${PILLARS[pillar] ?? pillar}
CONTENT TYPE: \${CONTENT_TYPES[contentType] ?? contentType}
TOPIC: \${topic}
\${instLine}

CONTENT STRUCTURE — FOLLOW EXACTLY:
\${structure}

TARGET LENGTH: \${wordTarget}

ETHIOPIA-SPECIFIC RULES — NEVER VIOLATE:
1. All monetary values must be in ETB (Ethiopian Birr) unless comparing with foreign currencies.
2. All interest rates are stored and displayed as percentages — 9.50% not 0.095.
3. Always reference the National Bank of Ethiopia (NBE) as the primary regulator.
4. FX rates are always ETB per 1 foreign unit — 1 USD = [rate] ETB.
5. Never invent specific NBE-mandated rates or thresholds — use directional language and cite nbe.gov.et.
6. Ethiopian banks named in the article must be real NBE-licensed banks.
7. The Ethiopian Securities Exchange (ESX) launched in January 2025 — not earlier.
8. Never claim BirrBank offers financial services — it is an information and comparison platform only.

ACCURACY RULES:
- Where specific rates are stated, add: (verify current rate at nbe.gov.et or the institution website)
- Where figures are uncertain, use directional language: rates typically range, the NBE minimum rate is
- Always name the specific Ethiopian authority: NBE, ECMA, ECX, MoF

FORBIDDEN PHRASES: Never use: In today the fast-paced world, It is worth noting, It is important to note, First and foremost, Last but not least, In conclusion it is clear that, or any similar filler.

OUTPUT FORMAT:
- Full article in markdown only
- Use ## for main headings and ### for sub-headings
- No preamble or meta-commentary
- After the article write exactly: ---SUMMARY---
  Then a 2-3 sentence plain-English summary for search indexing.
- Then write exactly: ---KEYWORDS---
  Then 8-12 comma-separated keywords.

Write the article now. Start immediately with the title.`

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: length === 'deep' ? 6000 : 4000,
          messages: [{ role: 'user', content: prompt }],
        }),
      })

      const data = await response.json()
      const raw  = (data.content ?? []).filter((b: any) => b.type === 'text').map((b: any) => b.text).join('')

      if (!raw) return NextResponse.json({ error: 'No response from AI' }, { status: 500 })

      const summaryMatch  = raw.match(/---SUMMARY---([\s\S]*?)(?:---KEYWORDS---|$)/)
      const keywordsMatch = raw.match(/---KEYWORDS---([\s\S]*)$/)
      const content       = raw.split('---SUMMARY---')[0].trim()
      const summary       = summaryMatch  ? summaryMatch[1].trim()  : ''
      const keywords      = keywordsMatch ? keywordsMatch[1].trim() : ''

      const titleMatch = content.match(/^#\s+(.+)$/m)
      const title      = titleMatch ? titleMatch[1].trim() : topic

      return NextResponse.json({ ok: true, content, summary, keywords, title })
    }

    if (action === 'save_guide') {
      const { title, pillar, contentType, body: guideBody, summary, keywords, institutionSlug } = body

      if (!title || !pillar || !guideBody) {
        return NextResponse.json({ error: 'title, pillar and body are required' }, { status: 400 })
      }

      const supabase = createSupabaseAdminClient()
      const today    = new Date().toISOString().split('T')[0]
      const slug     = title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').slice(0, 200)

      const { error } = await supabase
        .schema('birrbank')
        .from('guides')
        .insert({
          slug,
          title,
          pillar,
          content_type: contentType ?? 'article',
          institution_slug: institutionSlug || null,
          body: guideBody,
          published_at: today,
          is_current: true,
          country_code: 'ET',
        })

      if (error) return NextResponse.json({ error: error.message }, { status: 500 })
      return NextResponse.json({ ok: true, slug })
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
