import type { Metadata } from 'next'
import Link from 'next/link'
import EmailCapture from '@/components/EmailCapture'
import HeroSearch from '@/components/HeroSearch'
import { createSupabaseAdminClient } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'BirrBank — Ethiopia Financial Operating System',
  description: 'Compare savings rates, FX, insurance, ESX markets and commodity prices across all 214 NBE-regulated institutions. Free, verified and unbiased.',
  alternates: { canonical: 'https://birrbank.com/' },
}

const CURRENCY_NAMES: Record<string, string> = {
  USD: 'US Dollar', GBP: 'British Pound', EUR: 'Euro',
  SAR: 'Saudi Riyal', AED: 'UAE Dirham', CNY: 'Chinese Yuan', CHF: 'Swiss Franc',
}

const ACCOUNT_TYPE_LABELS: Record<string, string> = {
  regular_savings: 'Regular savings', fixed_deposit_3m: '3-month fixed',
  fixed_deposit_6m: '6-month fixed', fixed_deposit_12m: '12-month fixed',
  fixed_deposit_24m: '24-month fixed', current: 'Current account',
  diaspora: 'Diaspora account', youth: 'Youth savings', women: 'Women savings',
}

const CATEGORIES = [
  {
    label: 'Banking', href: '/banking', action: 'Compare savings rates',
    desc: 'Find the best savings, FX and loan rates across all 32 banks.',
    statNum: '32', statLabel: 'banks',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="3"/><line x1="2" y1="10" x2="22" y2="10"/>
      </svg>
    ),
  },
  {
    label: 'Insurance', href: '/insurance', action: 'Compare insurance',
    desc: 'Motor, life, health and property insurance from all 18 providers.',
    statNum: '18', statLabel: 'providers',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    label: 'Markets', href: '/markets', action: 'Explore ESX markets',
    desc: 'Track live ESX equities, T-bill yields and the IPO pipeline.',
    statNum: '45+', statLabel: 'IPOs in pipeline',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    label: 'Commodities', href: '/commodities', action: 'View ECX prices',
    desc: 'Daily coffee, sesame and grain prices from the Ethiopian Commodity Exchange.',
    statNum: 'Daily', statLabel: 'ECX prices',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

export default async function HomePage() {
  const supabase = createSupabaseAdminClient()

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
    supabase.schema('birrbank').from('exchange_rates')
      .select('currency_code, buying_rate, selling_rate, rate_date')
      .eq('institution_slug', 'nbe')
      .in('currency_code', ['USD', 'GBP', 'EUR', 'SAR', 'AED'])
      .order('rate_date', { ascending: false }).order('currency_code').limit(5),
    supabase.schema('birrbank').from('institutions')
      .select('count', { count: 'exact', head: true }).eq('is_active', true),
    supabase.schema('birrbank').from('commodity_prices')
      .select('commodity_name, price_etb').eq('commodity_type', 'coffee')
      .order('trade_date', { ascending: false }).limit(1),
    supabase.schema('birrbank').from('listed_securities')
      .select('ticker, company_name, last_price_etb, price_change_pct')
      .order('last_updated', { ascending: false }).limit(1),
  ])

  const bestRate = ratesData?.[0] ? Number(ratesData[0].annual_rate).toFixed(2) : '9.50'
  const bestBank = (ratesData?.[0] as any)?.institutions?.name ?? 'Top bank'
  const instCount = institutionCount ?? 214

  const usdRate = fxData?.find((r: any) => r.currency_code === 'USD')
  const usdSell = usdRate ? Number(usdRate.selling_rate).toFixed(2) : '126.40'

  const coffeePrice = coffeeData?.[0] ? Number((coffeeData[0] as any).price_etb).toLocaleString() : '28,500'
  const stock = stockData?.[0] as any
  const stockChange = stock?.price_change_pct ? Number(stock.price_change_pct) : 0

  const FX_RATES = (fxData ?? []).map((r: any) => ({
    currency: r.currency_code,
    name: CURRENCY_NAMES[r.currency_code] ?? r.currency_code,
    buy: Number(r.buying_rate).toFixed(2),
    sell: Number(r.selling_rate).toFixed(2),
  }))

  const pillars = [
    {
      label: 'Banking',
      sublabel: 'Best savings rate',
      value: bestRate + '%',
      sub: bestBank,
      href: '/banking/savings-rates',
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="3"/><line x1="2" y1="10" x2="22" y2="10"/></svg>,
      positive: true,
    },
    {
      label: 'FX',
      sublabel: 'USD / ETB today',
      value: usdSell,
      sub: 'NBE official rate',
      href: '/banking/fx-rates',
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
      positive: true,
    },
    {
      label: 'ESX Markets',
      sublabel: stock?.ticker ?? 'Latest stock',
      value: stock ? 'ETB ' + Number(stock.last_price_etb).toFixed(2) : '—',
      sub: stockChange >= 0 ? '+' + stockChange.toFixed(2) + '% today' : stockChange.toFixed(2) + '% today',
      href: '/markets',
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
      positive: stockChange >= 0,
    },
    {
      label: 'Commodities',
      sublabel: 'Coffee · ECX today',
      value: 'ETB ' + coffeePrice,
      sub: 'Yirgacheffe Grade 2',
      href: '/commodities/coffee',
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22V12M12 12C12 6 7 4 7 4s5 2 5 8z"/><path d="M12 12C12 6 17 4 17 4s-5 2-5 8z"/><line x1="8" y1="22" x2="16" y2="22"/></svg>,
      positive: true,
    },
    {
      label: 'Intelligence',
      sublabel: 'Financial guides',
      value: '500+',
      sub: 'Free to read',
      href: '/guides',
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
      positive: true,
    },
  ]

  return (
    <div className="min-h-screen bg-white">

      {/* ══════════════════════════════════ HERO ═══════════════════════════════════ */}
      <section className="relative bg-slate-950 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 65% -10%, rgba(29,78,216,0.2) 0%, transparent 55%), radial-gradient(ellipse at 0% 100%, rgba(14,30,80,0.5) 0%, transparent 50%)' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-12 sm:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-8">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-blue-300 text-xs font-semibold tracking-wide">Ethiopia Financial Operating System</span>
              </div>
              <h1 className="font-serif text-4xl lg:text-6xl font-bold text-white leading-[1.08] mb-6" style={{ letterSpacing: '-0.025em' }}>
                Ethiopia's financial<br />products,<br /><span className="text-blue-400">compared.</span>
              </h1>
              <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-md">
                Savings rates, FX, insurance, ESX markets and commodity prices.
                All verified from official sources. Completely free.
              </p>
              <div className="mb-8">
                <HeroSearch />
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/banking/savings-rates"
                  className="font-bold rounded-full transition-all inline-flex items-center justify-center text-center"
                  style={{ fontSize: 15, padding: '14px 0', width: 220, background: '#1D4ED8', color: '#fff', boxShadow: '0 4px 20px rgba(29,78,216,0.35)' }}>
                  Compare savings rates
                </Link>
                <Link href="/banking/fx-rates"
                  className="font-bold rounded-full transition-all inline-flex items-center justify-center text-center"
                  style={{ fontSize: 15, padding: '14px 0', width: 220, border: '2px solid rgba(255,255,255,0.2)', color: '#fff', background: 'rgba(255,255,255,0.05)' }}>
                  Check FX rates
                </Link>
              </div>
            </div>

            {/* Right: 5-pillar live snapshot */}
            <div className="hidden lg:block">
              <div className="rounded-2xl overflow-hidden" style={{ boxShadow: '0 0 0 1px rgba(29,78,216,0.12), 0 24px 64px rgba(0,0,0,0.4), 0 0 80px rgba(29,78,216,0.12)' }}>
                {/* Dark header */}
                <div className="flex items-center justify-between px-6 py-5" style={{ background: '#0f172a', borderBottom: '1px solid #1e293b' }}>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#3b82f6' }} />
                      <p className="text-xs font-black uppercase tracking-widest" style={{ color: '#93c5fd' }}>Live market snapshot</p>
                    </div>
                    <p className="font-bold text-white" style={{ fontSize: '15px' }}>All 5 pillars · Updated daily</p>
                  </div>
                  <div className="rounded-full px-3 py-1.5" style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.25)' }}>
                    <span className="text-xs font-bold" style={{ color: '#93c5fd' }}>NBE · ESX · ECX</span>
                  </div>
                </div>
                {/* Rows */}
                <div className="divide-y divide-slate-100" style={{ background: '#ffffff' }}>
                  {pillars.map((p, i) => (
                    <Link key={p.label} href={p.href}
                      className="flex items-center gap-4 transition-all group hover:bg-blue-50/50"
                      style={{ padding: i === 0 ? '22px 24px' : '15px 24px', background: i === 0 ? 'linear-gradient(135deg, #eff6ff 0%, #f0f9ff 100%)' : '#ffffff' }}>
                      <div className="rounded-2xl flex items-center justify-center shrink-0"
                        style={i === 0
                          ? { width: 46, height: 46, background: 'linear-gradient(135deg, #1D4ED8, #1E40AF)', color: '#fff', boxShadow: '0 6px 16px rgba(29,78,216,0.4)' }
                          : { width: 38, height: 38, background: '#f8fafc', color: '#94a3b8', border: '1.5px solid #e2e8f0' }}>
                        {p.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold truncate mb-0.5" style={{ fontSize: i === 0 ? '14px' : '13px', color: i === 0 ? '#1e3a8a' : '#64748b' }}>{p.label}</p>
                        <p className="truncate" style={{ fontSize: '12px', color: i === 0 ? '#3b82f6' : '#94a3b8', fontWeight: i === 0 ? 600 : 400 }}>{p.sublabel}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-mono font-black" style={{ fontSize: i === 0 ? '30px' : '17px', color: i === 0 ? '#1D4ED8' : '#0f172a', letterSpacing: '-1px', lineHeight: 1.1 }}>{p.value}</p>
                        <p className="mt-0.5 font-semibold" style={{ fontSize: '11px', color: i === 2 ? (p.positive ? '#16a34a' : '#dc2626') : (i === 0 ? '#3b82f6' : '#94a3b8') }}>{p.sub}</p>
                      </div>
                    </Link>
                  ))}
                </div>
                {/* Footer */}
                <div className="px-6 py-4 flex items-center justify-between" style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
                  <p className="text-xs font-medium" style={{ color: '#94a3b8' }}>Verified from official sources daily</p>
                  <Link href="/banking" className="text-xs font-bold flex items-center gap-1 group-hover:gap-2 transition-all" style={{ color: '#1D4ED8' }}>
                    Full platform <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Stat bar */}
          <div className="mt-10 sm:mt-16 pt-8 sm:pt-10 border-t border-slate-800 grid grid-cols-3 gap-4 sm:gap-8">
            {[
              { value: instCount.toString(), label: 'NBE-regulated institutions' },
              { value: bestRate + '%',        label: 'Best savings rate today'   },
              { value: 'Free',                label: 'Always — no subscriptions' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-mono font-black text-white mb-1" style={{ fontSize: '28px', letterSpacing: '-1px' }}>{s.value}</div>
                <div className="text-xs font-semibold text-slate-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ CATEGORIES ════════════════════════════════ */}
      <section className="border-b border-slate-100" style={{ background: '#f8fafc', padding: '96px 32px' }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="font-serif font-bold text-slate-950" style={{ fontSize: 'clamp(32px, 4vw, 46px)', letterSpacing: '-1.5px', lineHeight: 1.1 }}>
              Ethiopia financial market,<br />fully covered.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {CATEGORIES.map((cat) => (
              <Link key={cat.label} href={cat.href}
                className="group bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all duration-200 flex flex-col overflow-hidden">
                <div className="h-1.5" style={{ background: 'linear-gradient(90deg, #1D4ED8, #1E40AF)' }} />
                <div className="flex flex-col flex-1 p-7">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 text-blue-600" style={{ background: 'linear-gradient(135deg, #eff6ff, #dbeafe)', border: '1px solid #bfdbfe' }}>
                    {cat.icon}
                  </div>
                  <p className="font-bold text-slate-900 mb-3" style={{ fontSize: '16px' }}>{cat.label}</p>
                  <p className="text-slate-500 text-sm leading-relaxed flex-1">{cat.desc}</p>
                  <div className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-1.5 text-blue-600 text-sm font-semibold group-hover:gap-2.5 transition-all">
                    {cat.action} <ArrowRight size={13} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-10 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-sm text-slate-500">
              Covering all <strong className="text-slate-800">{instCount} NBE-regulated institutions</strong> across 8 categories — banks, insurers, MFIs, payment operators and more.
            </p>
            <Link href="/institutions" className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 shrink-0">
              View all institutions <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ FX RATES ═══════════════════════════════════ */}
      <section className="border-b border-slate-100 bg-white" style={{ padding: '96px 32px' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="font-serif font-bold text-slate-950" style={{ fontSize: 'clamp(24px, 3vw, 36px)', letterSpacing: '-1px', lineHeight: 1.15 }}>
                Today FX rates — NBE official
              </h2>
            </div>
            <Link href="/banking/fx-rates" className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 shrink-0 sm:pb-1">
              See all rates <ArrowRight />
            </Link>
          </div>
          {/* Desktop table */}
          <div className="hidden md:block rounded-2xl overflow-hidden border border-slate-200" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <div style={{ height: 4, background: 'linear-gradient(90deg, #1D4ED8, #1E40AF)' }} />
            <div className="grid grid-cols-5 border-b border-slate-100 bg-slate-50">
              {['Currency', 'Name', 'Selling (ETB)', 'Buying (ETB)', ''].map((h, i) => (
                <div key={i} className="px-6 py-3">
                  <span className="text-xs font-black uppercase tracking-widest text-slate-400">{h}</span>
                </div>
              ))}
            </div>
            {FX_RATES.map((fx, i) => (
              <div key={fx.currency} className={'grid grid-cols-5 border-b border-slate-100 hover:bg-blue-50/30 transition-colors ' + (i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50')}>
                <div className="px-6 py-4 flex items-center">
                  <span className="inline-flex items-center rounded-lg bg-blue-600 px-3 py-1">
                    <span className="text-xs font-black text-white tracking-widest">{fx.currency}</span>
                  </span>
                </div>
                <div className="px-6 py-4 flex items-center">
                  <span className="text-sm font-medium text-slate-600">{fx.name}</span>
                </div>
                <div className="px-6 py-4 flex items-center">
                  <span className="font-mono font-black text-slate-950" style={{ fontSize: '20px', letterSpacing: '-0.5px' }}>{fx.sell}</span>
                </div>
                <div className="px-6 py-4 flex items-center">
                  <span className="font-mono font-semibold text-slate-500" style={{ fontSize: '16px' }}>{fx.buy}</span>
                </div>
                <div className="px-6 py-4 flex items-center justify-end">
                  <Link href="/banking/fx-rates" className="text-xs font-bold text-blue-600 hover:underline">Details →</Link>
                </div>
              </div>
            ))}
          </div>
          {/* Mobile cards */}
          <div className="grid grid-cols-1 gap-3 md:hidden">
            {FX_RATES.map((fx) => (
              <div key={fx.currency} className="bg-white rounded-xl border border-slate-200 p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center rounded-lg bg-blue-600 px-2.5 py-1">
                    <span className="text-xs font-black text-white tracking-wider">{fx.currency}</span>
                  </span>
                  <span className="text-xs text-slate-400">{fx.name}</span>
                </div>
                <p className="font-mono font-black text-slate-950 mb-1" style={{ fontSize: '22px', letterSpacing: '-0.5px', lineHeight: 1 }}>{fx.sell}</p>
                <p className="text-xs text-slate-400 mb-2">Sell rate</p>
                <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                  <span className="text-xs text-slate-400">Buy</span>
                  <span className="font-mono font-semibold text-slate-600 text-sm">{fx.buy}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-sm text-slate-500">
              Official rates published daily by the <strong className="text-slate-800">National Bank of Ethiopia</strong> · Updated 09:30 EAT every business day.
            </p>
            <Link href="/banking/fx-rates" className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 shrink-0">
              Full FX dashboard <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════ TRUST — WHITE ════════════════════════════ */}
      <section className="border-b border-slate-100 bg-white" style={{ padding: '96px 32px' }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="font-serif font-bold text-slate-950 mb-4" style={{ fontSize: 'clamp(26px, 3.5vw, 42px)', letterSpacing: '-1.2px' }}>
              Unbiased. Verified. Free.
            </h2>
            <p className="text-slate-500" style={{ fontSize: '16px', lineHeight: 1.75, maxWidth: '480px' }}>
              We never take fees from the institutions we rank. The best rate is always #1, regardless of who offers it.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>,
                tag: 'NBE verified',
                headline: '214 institutions. Zero grey-market listings.',
                body: 'Every institution on BirrBank is verified against the National Bank of Ethiopia official registry. If it is not NBE-licensed, it is not here.',
              },
              {
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
                tag: 'Updated daily',
                headline: 'Every rate comes with a verified date.',
                body: 'Any rate older than 7 days is automatically flagged with a warning badge. You always know how fresh the data is before making any decision.',
              },
              {
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
                tag: 'No commercial bias',
                headline: 'We earn nothing from the institutions we rank.',
                body: 'BirrBank makes no money from rankings or placements. We are funded by advertising and data services, never by the banks or insurers you are comparing.',
              },
            ].map(({ icon, tag, headline, body }) => (
              <div key={tag} className="rounded-2xl flex flex-col overflow-hidden" style={{ background: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 4px 24px rgba(29,78,216,0.07)', minHeight: '280px' }}>
                <div style={{ height: 4, background: 'linear-gradient(90deg, #1D4ED8, #1E40AF)' }} />
                <div style={{ padding: '36px 32px' }} className="flex flex-col flex-1">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6" style={{ background: 'linear-gradient(135deg, #eff6ff, #dbeafe)', border: '1px solid #bfdbfe', boxShadow: '0 4px 12px rgba(29,78,216,0.1)' }}>
                    {icon}
                  </div>
                  <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: '#1D4ED8' }}>{tag}</p>
                  <h3 className="font-bold text-slate-900 mb-4" style={{ fontSize: '17px', lineHeight: 1.35 }}>{headline}</h3>
                  <p className="text-sm text-slate-500 flex-1" style={{ lineHeight: '1.85' }}>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ EMAIL CAPTURE ══════════════════════════════ */}
      <section className="bg-white" style={{ padding: '96px 32px' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-serif font-bold text-slate-950 mb-5" style={{ fontSize: 'clamp(32px, 4vw, 46px)', letterSpacing: '-1.5px', lineHeight: 1.1 }}>
              The best rates,<br /><span style={{ color: '#1D4ED8' }}>direct to your inbox.</span>
            </h2>
            <p className="text-slate-500 mb-8" style={{ fontSize: '15px', lineHeight: 1.85 }}>
              Once a week. No noise. Just the sharpest moves across savings rates, FX, ESX markets and ECX commodity prices.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Rate changes across all 32 commercial banks',
                'FX movements: USD, GBP, SAR, AED vs ETB',
                'ESX market updates and new IPO announcements',
                'ECX commodity prices for coffee and sesame',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-slate-600">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-xs text-slate-500 font-medium pt-5 border-t border-slate-100">Free forever · No credit card · Unsubscribe anytime</p>
          </div>
          <EmailCapture />
        </div>
      </section>

    </div>
  )
}
