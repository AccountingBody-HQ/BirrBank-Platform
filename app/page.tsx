import type { Metadata } from 'next'
import Link from 'next/link'
import EmailCapture from '@/components/EmailCapture'
import HeroSearch from '@/components/HeroSearch'
import { createSupabaseAdminClient } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'BirrBank — Ethiopia Financial Operating System',
  description: 'Compare savings rates, FX, insurance, ESX markets and commodity prices across all NBE-regulated institutions. Free, verified and unbiased.',
  alternates: { canonical: 'https://birrbank.com/' },
}

const CURRENCY_NAMES: Record<string, string> = {
  USD: 'US Dollar', GBP: 'British Pound', EUR: 'Euro',
  SAR: 'Saudi Riyal', AED: 'UAE Dirham', CNY: 'Chinese Yuan', CHF: 'Swiss Franc',
}

const CATEGORIES = [
  {
    label: 'Banking', href: '/banking', action: 'Compare savings rates',
    desc: 'Find the best savings, FX and loan rates across all 32 banks.',
    statNum: '32', statLabel: 'banks',
    colour: '#1D4ED8',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="3"/><line x1="2" y1="10" x2="22" y2="10"/>
      </svg>
    ),
  },
  {
    label: 'Insurance', href: '/insurance', action: 'Compare insurance',
    desc: 'Motor, life, health and property insurance from all 18 providers.',
    statNum: '18', statLabel: 'providers',
    colour: '#0891b2',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    label: 'Markets', href: '/markets', action: 'Explore ESX markets',
    desc: 'Track live ESX equities, T-bill yields and the IPO pipeline.',
    statNum: '45+', statLabel: 'IPOs in pipeline',
    colour: '#7c3aed',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    label: 'Commodities', href: '/commodities', action: 'View ECX prices',
    desc: 'Daily coffee, sesame and grain prices from the Ethiopian Commodity Exchange.',
    statNum: 'Daily', statLabel: 'ECX prices',
    colour: '#b45309',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22V12M12 12C12 6 7 4 7 4s5 2 5 8z"/>
        <path d="M12 12C12 6 17 4 17 4s-5 2-5 8z"/>
        <line x1="8" y1="22" x2="16" y2="22"/>
      </svg>
    ),
  },
  {
    label: 'Guides', href: '/guides', action: 'Read the guides',
    desc: 'Plain-language guides on banking, investing, insurance and diaspora.',
    statNum: '500+', statLabel: 'guides',
    colour: '#059669',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
  },
]

const ArrowRight = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)

const PILLAR_ICONS = {
  banking: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="3"/><line x1="2" y1="10" x2="22" y2="10"/></svg>,
  fx: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  markets: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  commodities: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22V12M12 12C12 6 7 4 7 4s5 2 5 8z"/><path d="M12 12C12 6 17 4 17 4s-5 2-5 8z"/><line x1="8" y1="22" x2="16" y2="22"/></svg>,
  intelligence: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
}

export default async function HomePage() {
  const supabase = createSupabaseAdminClient()

  // Get latest NBE FX date first so all homepage FX data is consistent
  const { data: latestNBERow } = await supabase
    .schema('birrbank')
    .from('exchange_rates')
    .select('rate_date')
    .eq('institution_slug', 'nbe')
    .order('rate_date', { ascending: false })
    .limit(1)

  const nbeLatestDate = latestNBERow?.[0]?.rate_date ?? null

  const [
    { data: ratesData },
    { data: fxData },
    { count: institutionCount },
    { data: coffeeData },
    { data: stockData },
  ] = await Promise.all([
    supabase.schema('birrbank').from('savings_rates')
      .select('annual_rate, account_type, institution_slug, institutions(name)')
      .eq('is_current', true).order('annual_rate', { ascending: false }).limit(1),

    nbeLatestDate
      ? supabase.schema('birrbank').from('exchange_rates')
          .select('currency_code, buying_rate, selling_rate, weighted_average, rate_date')
          .eq('institution_slug', 'nbe')
          .eq('rate_date', nbeLatestDate)
          .in('currency_code', ['USD', 'GBP', 'EUR', 'SAR', 'AED'])
          .order('currency_code')
      : supabase.schema('birrbank').from('exchange_rates')
          .select('currency_code, buying_rate, selling_rate, weighted_average, rate_date')
          .eq('institution_slug', 'nbe')
          .in('currency_code', ['USD', 'GBP', 'EUR', 'SAR', 'AED'])
          .order('rate_date', { ascending: false })
          .limit(25),

    supabase.schema('birrbank').from('institutions')
      .select('count', { count: 'exact', head: true }).eq('is_active', true),

    supabase.schema('birrbank').from('commodity_prices')
      .select('commodity_name, price_etb')
      .eq('commodity_type', 'coffee')
      .order('trade_date', { ascending: false }).limit(1),

    supabase.schema('birrbank').from('listed_securities')
      .select('ticker, company_name, last_price_etb, price_change_pct')
      .order('last_updated', { ascending: false }).limit(1),
  ])

  // Deduplicate FX — one row per currency (latest date wins)
  const seenCurrencies = new Set<string>()
  const uniqueFx = (fxData ?? []).filter((r: any) => {
    if (seenCurrencies.has(r.currency_code)) return false
    seenCurrencies.add(r.currency_code)
    return true
  })

  // Ordered display: USD first, then prominence order
  const FX_ORDER = ['USD', 'GBP', 'EUR', 'SAR', 'AED']
  const FX_RATES = FX_ORDER
    .map(code => uniqueFx.find((r: any) => r.currency_code === code))
    .filter(Boolean)
    .map((r: any) => ({
      currency: r.currency_code,
      name: CURRENCY_NAMES[r.currency_code] ?? r.currency_code,
      buy: Number(r.buying_rate).toFixed(2),
      sell: Number(r.selling_rate).toFixed(2),
      weighted: r.weighted_average ? Number(r.weighted_average).toFixed(2) : null,
    }))

  const bestRate = ratesData?.[0] ? Number(ratesData[0].annual_rate).toFixed(2) : null
  const bestBank = (ratesData?.[0] as any)?.institutions?.name ?? null
  const instCount = institutionCount ?? 0

  const usdRate = uniqueFx.find((r: any) => r.currency_code === 'USD') as any
  const usdSell = usdRate ? Number(usdRate.selling_rate).toFixed(2) : null

  const coffeePrice = coffeeData?.[0]
    ? Number((coffeeData[0] as any).price_etb).toLocaleString('en-ET')
    : null
  const stock = stockData?.[0] as any
  const stockChange = stock?.price_change_pct ? Number(stock.price_change_pct) : 0

  const pillars = [
    {
      key: 'banking',
      label: 'Banking',
      sublabel: 'Best savings rate',
      value: bestRate ? bestRate + '%' : 'No data',
      sub: bestBank ?? 'Awaiting data',
      href: '/banking/savings-rates',
      icon: PILLAR_ICONS.banking,
      positive: true,
      featured: true,
    },
    {
      key: 'fx',
      label: 'FX',
      sublabel: 'USD / ETB today',
      value: usdSell ?? '--',
      sub: 'NBE official rate',
      href: '/banking/fx-rates',
      icon: PILLAR_ICONS.fx,
      positive: true,
      featured: false,
    },
    {
      key: 'markets',
      label: 'ESX Markets',
      sublabel: stock?.ticker ?? 'Latest stock',
      value: stock ? 'ETB ' + Number(stock.last_price_etb).toFixed(2) : '--',
      sub: stockChange >= 0
        ? '+' + stockChange.toFixed(2) + '% today'
        : stockChange.toFixed(2) + '% today',
      href: '/markets',
      icon: PILLAR_ICONS.markets,
      positive: stockChange >= 0,
      featured: false,
    },
    {
      key: 'commodities',
      label: 'Commodities',
      sublabel: 'Coffee - ECX today',
      value: coffeePrice ? 'ETB ' + coffeePrice : '--',
      sub: 'Yirgacheffe Grade 2',
      href: '/commodities/coffee',
      icon: PILLAR_ICONS.commodities,
      positive: true,
      featured: false,
    },
    {
      key: 'intelligence',
      label: 'Intelligence',
      sublabel: 'Financial guides',
      value: '500+',
      sub: 'Free to read',
      href: '/guides',
      icon: PILLAR_ICONS.intelligence,
      positive: true,
      featured: false,
    },
  ]

  return (
    <div className="min-h-screen bg-white">

      {/* ════════════════════════════════ HERO ═══════════════════════════════════ */}
      <section className="relative bg-slate-950 overflow-hidden">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 65% -10%, rgba(29,78,216,0.18) 0%, transparent 55%), radial-gradient(ellipse at 0% 100%, rgba(14,30,80,0.45) 0%, transparent 50%)'
        }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-12 sm:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8"
                style={{ background: 'rgba(29,78,216,0.12)', border: '1px solid rgba(29,78,216,0.25)' }}>
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-blue-300 text-xs font-semibold tracking-wide">
                  Ethiopia Financial Operating System
                </span>
              </div>

              <h1 className="font-serif font-bold text-white mb-6"
                style={{ fontSize: 'clamp(36px, 5vw, 60px)', letterSpacing: '-0.03em', lineHeight: 1.06 }}>
                Ethiopia's financial<br />products,{' '}
                <span style={{ color: '#60a5fa' }}>compared.</span>
              </h1>

              <p className="text-slate-400 leading-relaxed mb-10 max-w-md"
                style={{ fontSize: '17px', lineHeight: 1.75 }}>
                Savings rates, FX, insurance, ESX markets and commodity prices.
                All verified from official sources. Completely free.
              </p>

              <div className="mb-10">
                <HeroSearch />
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href="/banking/savings-rates" className="hero-btn hero-btn-primary">
                  Compare savings rates
                </Link>
                <Link href="/banking/fx-rates" className="hero-btn hero-btn-secondary">
                  Check FX rates
                </Link>
              </div>
            </div>

            {/* Right: 5-pillar live snapshot */}
            <div className="hidden lg:block">
              <div className="bg-white rounded-2xl overflow-hidden"
                style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.08), 0 32px 80px rgba(0,0,0,0.5), 0 0 100px rgba(29,78,216,0.15), inset 3px 0 0 rgba(29,78,216,0.35)' }}>
                                {/* Card header */}
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest mb-0.5"
                      style={{ color: '#1D4ED8' }}>Live market snapshot</p>
                    <p className="font-semibold text-slate-700" style={{ fontSize: '13px' }}>
                      All 5 pillars - updated daily
                    </p>
                  </div>
                  <div className="flex items-center gap-2 rounded-full px-3 py-1.5"
                    style={{ background: '#eff6ff', border: '1px solid #bfdbfe' }}>
                    <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#3b82f6' }} />
                    <span className="text-xs font-bold" style={{ color: '#1D4ED8' }}>Live</span>
                  </div>
                </div>

                {/* Pillar rows */}
                <div className="divide-y divide-slate-100">
                  {pillars.map((p) => (
                    <Link key={p.key} href={p.href}
                      className="relative flex items-center gap-4 transition-all duration-150 group overflow-hidden hover:bg-slate-50"
                      style={{ padding: p.featured ? '20px 24px' : '14px 24px' }}
                      
                    >
                      {/* Left border accent on hover via group */}
                      <div className="absolute left-0 inset-y-0 w-[3px] bg-blue-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-150 origin-center" />

                      <div className="rounded-xl flex items-center justify-center shrink-0 transition-all"
                        style={p.featured
                          ? { width: 44, height: 44, background: '#1D4ED8', color: '#fff', boxShadow: '0 4px 14px rgba(29,78,216,0.35)' }
                          : { width: 36, height: 36, background: '#f1f5f9', color: '#94a3b8', border: '1px solid #e2e8f0' }}>
                        {p.icon}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="font-bold truncate transition-colors group-hover:text-blue-600"
                          style={{ fontSize: p.featured ? '14px' : '13px', color: p.featured ? '#1e40af' : '#475569' }}>
                          {p.label}
                        </p>
                        <p className="truncate mt-0.5"
                          style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 400 }}>
                          {p.sublabel}
                        </p>
                      </div>

                      <div className="text-right shrink-0">
                        <p className="font-mono font-black transition-colors group-hover:text-blue-600"
                          style={{
                            fontSize: p.featured ? '28px' : '16px',
                            color: p.featured ? '#1D4ED8' : '#334155',
                            letterSpacing: '-1px', lineHeight: 1.1
                          }}>
                          {p.value}
                        </p>
                        <p className="mt-0.5 font-medium"
                          style={{
                            fontSize: '11px',
                            color: p.key === 'markets'
                              ? (p.positive ? '#16a34a' : '#dc2626')
                              : '#94a3b8'
                          }}>
                          {p.sub}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Card footer */}
                <div className="px-6 py-3.5 flex items-center justify-between border-t border-slate-100"
                  style={{ background: '#f8fafc' }}>
                  <p className="text-xs" style={{ color: '#94a3b8' }}>
                    Official sources - NBE - ESX - ECX
                  </p>
                  <Link href="/banking"
                    className="text-xs font-bold flex items-center gap-1 hover:gap-2 transition-all"
                    style={{ color: '#1D4ED8' }}>
                    Full platform <ArrowRight size={11} />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Stat bar */}
          <div className="mt-10 sm:mt-16 pt-8 border-t border-slate-800 grid grid-cols-3">
            {[
              { value: instCount > 0 ? instCount.toString() : '--', label: 'NBE-regulated institutions' },
              { value: bestRate ? bestRate + '%' : '--',             label: 'Best savings rate today'   },
              { value: 'Free',                                       label: 'Always - no subscriptions' },
            ].map((s) => (
              <div key={s.label} className="text-center py-6 border-r border-slate-800 last:border-r-0">
                <div className="font-mono font-black text-white mb-1"
                  style={{ fontSize: 'clamp(22px, 3vw, 32px)', letterSpacing: '-1px' }}>
                  {s.value}
                </div>
                <div className="text-xs font-semibold text-slate-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ CATEGORIES ════════════════════════════════ */}
      <section style={{ background: '#f8fafc', padding: '96px 0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-xs font-black uppercase tracking-widest mb-4"
              style={{ color: '#1D4ED8' }}>
              Five pillars
            </p>
            <h2 className="font-serif font-bold text-slate-950"
              style={{ fontSize: 'clamp(30px, 4vw, 48px)', letterSpacing: '-1.5px', lineHeight: 1.08 }}>
              Ethiopia's financial market,<br />fully covered.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {CATEGORIES.map((cat) => (
              <Link key={cat.label} href={cat.href}
                className="group bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all duration-200 flex flex-col overflow-hidden">
                <div style={{ height: 4, background: `linear-gradient(90deg, ${cat.colour}, ${cat.colour}bb)` }} />
                <div className="flex flex-col flex-1 p-6">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: `${cat.colour}12`, border: `1px solid ${cat.colour}30`, color: cat.colour }}>
                    {cat.icon}
                  </div>
                  <p className="font-bold text-slate-900 mb-2" style={{ fontSize: '15px' }}>
                    {cat.label}
                  </p>
                  <p className="text-slate-500 text-sm leading-relaxed flex-1">{cat.desc}</p>
                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-sm font-semibold group-hover:gap-2.5 transition-all"
                    style={{ color: cat.colour }}>
                    {cat.action} <ArrowRight size={13} />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-sm text-slate-500">
              Covering all{' '}
              <strong className="text-slate-800">{instCount} NBE-regulated institutions</strong>{' '}
              across 8 categories - banks, insurers, MFIs, payment operators and more.
            </p>
            <Link href="/institutions"
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 shrink-0">
              View all institutions <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════ FX RATES ════════════════════════════════ */}
      <section style={{ background: '#ffffff', padding: '96px 0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: '#1D4ED8' }}>
                FX rates
              </p>
              <h2 className="font-serif font-bold text-slate-950"
                style={{ fontSize: 'clamp(24px, 3vw, 38px)', letterSpacing: '-1px', lineHeight: 1.12 }}>
                Today's FX rates{' '}
                <span className="text-slate-400 font-normal" style={{ fontSize: '60%' }}>NBE official</span>
              </h2>
            </div>
            <Link href="/banking/fx-rates"
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 shrink-0 sm:pb-1">
              Full FX dashboard <ArrowRight />
            </Link>
          </div>

          {FX_RATES.length > 0 ? (
            <>
              {/* Desktop table */}
              <div className="hidden md:block rounded-2xl overflow-hidden border border-slate-200"
                style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}>
                <div style={{ height: 4, background: 'linear-gradient(90deg, #1D4ED8, #1E40AF)' }} />
                <div className="grid border-b border-slate-100 bg-slate-50"
                  style={{ gridTemplateColumns: '1fr 1.5fr 1fr 1fr 1fr 80px' }}>
                  {['Currency', 'Name', 'Buying (ETB)', 'Selling (ETB)', 'Weighted Avg', ''].map((h, i) => (
                    <div key={i} className="px-5 py-3">
                      <span className="text-xs font-black uppercase tracking-widest text-slate-400">{h}</span>
                    </div>
                  ))}
                </div>
                {FX_RATES.map((fx, i) => (
                  <div key={fx.currency}
                    className={'grid items-center border-b border-slate-100 hover:bg-blue-50/30 transition-colors ' + (i % 2 === 0 ? 'bg-white' : 'bg-slate-50/40')}
                    style={{ gridTemplateColumns: '1fr 1.5fr 1fr 1fr 1fr 80px' }}>
                    <div className="px-5 py-4">
                      <span className="inline-flex items-center rounded-lg px-3 py-1"
                        style={{ background: '#1D4ED8' }}>
                        <span className="text-xs font-black text-white tracking-widest">{fx.currency}</span>
                      </span>
                    </div>
                    <div className="px-5 py-4">
                      <span className="text-sm font-medium text-slate-600">{fx.name}</span>
                    </div>
                    <div className="px-5 py-4">
                      <span className="font-mono font-semibold text-slate-600" style={{ fontSize: '16px' }}>{fx.buy}</span>
                    </div>
                    <div className="px-5 py-4">
                      <span className="font-mono font-black text-slate-950" style={{ fontSize: '18px', letterSpacing: '-0.5px' }}>{fx.sell}</span>
                    </div>
                    <div className="px-5 py-4">
                      <span className="font-mono text-slate-500" style={{ fontSize: '14px' }}>
                        {fx.weighted ?? '--'}
                      </span>
                    </div>
                    <div className="px-5 py-4 flex justify-end">
                      <Link href="/banking/fx-rates"
                        className="text-xs font-bold text-blue-600 hover:underline">
                        Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile cards */}
              <div className="grid grid-cols-1 gap-3 md:hidden">
                {FX_RATES.map((fx) => (
                  <div key={fx.currency}
                    className="bg-white rounded-xl border border-slate-200 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-flex items-center rounded-lg px-2.5 py-1"
                        style={{ background: '#1D4ED8' }}>
                        <span className="text-xs font-black text-white tracking-wider">{fx.currency}</span>
                      </span>
                      <span className="text-xs text-slate-400">{fx.name}</span>
                    </div>
                    <p className="font-mono font-black text-slate-950 mb-1"
                      style={{ fontSize: '22px', letterSpacing: '-0.5px', lineHeight: 1 }}>
                      {fx.sell}
                    </p>
                    <p className="text-xs text-slate-400 mb-3">Selling rate (ETB)</p>
                    <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                      <span className="text-xs text-slate-400">Buying</span>
                      <span className="font-mono font-semibold text-slate-600 text-sm">{fx.buy}</span>
                    </div>
                    {fx.weighted && (
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-xs text-slate-400">Weighted avg</span>
                        <span className="font-mono text-slate-500 text-sm">{fx.weighted}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-center py-16">
              <p className="text-slate-400 text-sm">FX rates will appear here once the NBE scraper runs.</p>
            </div>
          )}

          <div className="mt-10 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-sm text-slate-500">
              Official rates published daily by the{' '}
              <strong className="text-slate-800">National Bank of Ethiopia</strong>{' '}
              - updated 09:30 EAT every business day.
            </p>
            <Link href="/banking/fx-rates"
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 shrink-0">
              All 18 currencies <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ TRUST ═══════════════════════════════════ */}
      <section style={{ background: '#f8fafc', padding: '96px 0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-2xl">
            <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: '#1D4ED8' }}>
              Our promise
            </p>
            <h2 className="font-serif font-bold text-slate-950 mb-5"
              style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', letterSpacing: '-1.3px', lineHeight: 1.1 }}>
              Unbiased. Verified. Free.
            </h2>
            <p className="text-slate-500" style={{ fontSize: '16px', lineHeight: 1.8 }}>
              We never take fees from the institutions we rank. The best rate is always first, regardless of who offers it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>,
                tag: 'NBE verified',
                headline: '225 institutions. Zero grey-market listings.',
                body: 'Every institution on BirrBank is verified against the National Bank of Ethiopia official registry. If it is not NBE-licensed, it is not here.',
              },
              {
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
                tag: 'Updated daily',
                headline: 'Every rate comes with a verified date.',
                body: 'Any rate older than 7 days is automatically flagged with a warning badge. You always know how fresh the data is before making any decision.',
              },
              {
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
                tag: 'No commercial bias',
                headline: 'We earn nothing from the institutions we rank.',
                body: 'BirrBank makes no money from rankings or placements. We are funded by advertising and data services, never by the banks or insurers you are comparing.',
              },
            ].map(({ icon, tag, headline, body }) => (
              <div key={tag}
                className="rounded-2xl flex flex-col overflow-hidden"
                style={{ background: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
                <div style={{ height: 4, background: 'linear-gradient(90deg, #1D4ED8, #1E40AF)' }} />
                <div className="flex flex-col flex-1 p-8">
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-6"
                    style={{ background: '#eff6ff', border: '1px solid #bfdbfe' }}>
                    {icon}
                  </div>
                  <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: '#1D4ED8' }}>
                    {tag}
                  </p>
                  <h3 className="font-bold text-slate-900 mb-4" style={{ fontSize: '16px', lineHeight: 1.4 }}>
                    {headline}
                  </h3>
                  <p className="text-sm text-slate-500 flex-1" style={{ lineHeight: '1.85' }}>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ EMAIL CAPTURE ══════════════════════════════ */}
      <section style={{ background: '#ffffff', padding: '96px 0' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: '#1D4ED8' }}>
                Weekly digest
              </p>
              <h2 className="font-serif font-bold text-slate-950 mb-5"
                style={{ fontSize: 'clamp(30px, 4vw, 46px)', letterSpacing: '-1.5px', lineHeight: 1.08 }}>
                The best rates,{' '}
                <span style={{ color: '#1D4ED8' }}>direct to your inbox.</span>
              </h2>
              <p className="text-slate-500 mb-8" style={{ fontSize: '15px', lineHeight: 1.85 }}>
                Once a week. No noise. Just the sharpest moves across savings rates,
                FX, ESX markets and ECX commodity prices.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Rate changes across all 32 commercial banks',
                  'FX movements: USD, GBP, SAR, AED vs ETB',
                  'ESX market updates and new IPO announcements',
                  'ECX commodity prices for coffee and sesame',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-slate-600">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                      stroke="#1D4ED8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                      className="shrink-0">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-slate-500 font-medium pt-5 border-t border-slate-100">
                Free forever - no credit card - unsubscribe anytime
              </p>
            </div>
            <EmailCapture />
          </div>
        </div>
      </section>

    </div>
  )
}
