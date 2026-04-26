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

  const { data: ratesData } = await supabase
    .schema('birrbank').from('savings_rates')
    .select('annual_rate, account_type, institution_slug, last_verified_date, institutions(name)')
    .eq('is_current', true).order('annual_rate', { ascending: false }).limit(5)

  const TOP_RATES = (ratesData ?? []).map((r: any, i: number) => ({
    rank: i + 1,
    bank: r.institutions?.name ?? r.institution_slug,
    product: ACCOUNT_TYPE_LABELS[r.account_type] ?? r.account_type,
    rate: Number(r.annual_rate).toFixed(2),
  }))

  const { data: fxData } = await supabase
    .schema('birrbank').from('exchange_rates')
    .select('currency_code, buying_rate, selling_rate, rate_date')
    .eq('institution_slug', 'nbe')
    .in('currency_code', ['USD', 'GBP', 'EUR', 'SAR', 'AED'])
    .order('rate_date', { ascending: false })
    .order('currency_code')
    .limit(5)

  const FX_RATES = (fxData ?? []).map((r: any) => ({
    currency: r.currency_code,
    name: CURRENCY_NAMES[r.currency_code] ?? r.currency_code,
    buy: Number(r.buying_rate).toFixed(2),
    sell: Number(r.selling_rate).toFixed(2),
  }))

  const { count: institutionCount } = await supabase
    .schema('birrbank').from('institutions')
    .select('count', { count: 'exact', head: true }).eq('is_active', true)

  const bestRate = TOP_RATES[0]?.rate ?? '9.50'
  const instCount = institutionCount ?? 214

  return (
    <div className="min-h-screen bg-white">

      {/* ══════════════════════════════════ HERO ═══════════════════════════════════ */}
      <section className="relative bg-slate-950 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 65% -10%, rgba(29,78,216,0.25) 0%, transparent 55%), radial-gradient(ellipse at 0% 100%, rgba(14,30,80,0.5) 0%, transparent 50%)' }} />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-8">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-blue-300 text-xs font-semibold tracking-wide">Ethiopia Financial Operating System</span>
              </div>
              <h1 className="font-serif text-4xl lg:text-6xl font-bold text-white leading-[1.08] mb-6" style={{ letterSpacing: '-0.025em' }}>
                Ethiopia best<br />financial products,<br /><span className="text-blue-400">compared.</span>
              </h1>
              <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-md">
                Savings rates, FX, insurance, ESX markets and commodity prices —
                all verified from official sources, completely free.
              </p>
              <div className="mb-8">
                <HeroSearch />
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/banking/savings-rates"
                  className="font-bold rounded-full transition-all inline-flex items-center justify-center"
                  style={{ fontSize: 15, padding: '14px 32px', minWidth: 200, background: '#1D4ED8', color: '#fff', boxShadow: '0 4px 20px rgba(29,78,216,0.35)' }}>
                  Compare savings rates
                </Link>
                <Link href="/banking/fx-rates"
                  className="font-bold rounded-full transition-all inline-flex items-center justify-center"
                  style={{ fontSize: 15, padding: '14px 32px', minWidth: 200, border: '2px solid rgba(255,255,255,0.15)', color: '#fff', background: 'transparent' }}>
                  Check FX rates
                </Link>
              </div>
            </div>

            {/* Right: rates card */}
            <div className="hidden lg:block">
              <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-700/50" style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.4)' }}>
                <div style={{ height: 3, background: 'linear-gradient(90deg, #1D4ED8, #3b82f6)' }} />
                <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest mb-0.5 text-blue-400">Top rates today</p>
                    <p className="text-white font-bold" style={{ fontSize: '15px' }}>Savings rates · All Ethiopian banks</p>
                  </div>
                  <div className="flex items-center gap-2 bg-blue-600/10 border border-blue-500/20 rounded-full px-3 py-1.5">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
                    <span className="text-xs font-bold text-blue-300">Live</span>
                  </div>
                </div>
                <div className="divide-y divide-slate-800">
                  {TOP_RATES.map((r) => (
                    <div key={r.rank} className={`flex items-center gap-4 ${r.rank === 1 ? 'bg-blue-600/10' : ''}`} style={{ padding: r.rank === 1 ? '16px 20px' : '12px 20px' }}>
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black shrink-0"
                        style={r.rank === 1 ? { background: '#1D4ED8', color: '#fff' } : { background: '#1e293b', color: '#475569' }}>
                        {r.rank === 1 ? (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                        ) : r.rank}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-bold truncate ${r.rank === 1 ? 'text-white' : 'text-slate-300'}`} style={{ fontSize: r.rank === 1 ? '15px' : '13px' }}>{r.bank}</p>
                        <p className={`text-xs mt-0.5 ${r.rank === 1 ? 'text-blue-400 font-bold uppercase tracking-wide' : 'text-slate-500'}`}>{r.rank === 1 ? 'Best rate' : r.product}</p>
                      </div>
                      <div className={`font-mono font-black ${r.rank === 1 ? 'text-blue-400' : 'text-slate-400'}`} style={{ fontSize: r.rank === 1 ? '26px' : '16px', letterSpacing: '-1px' }}>
                        {r.rate}%
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-5 py-3 border-t border-slate-800 flex items-center justify-between">
                  <p className="text-xs text-slate-500">Official bank sources · NBE registry</p>
                  <Link href="/banking/savings-rates" className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors">
                    See all 32 banks →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Stat bar inside dark hero */}
          <div className="mt-16 pt-10 border-t border-slate-800 grid grid-cols-3 gap-8">
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
      <section className="border-b border-slate-100" style={{ background: '#f9fafb', padding: '96px 32px' }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Explore the platform</p>
            <h2 className="font-serif font-bold text-slate-950" style={{ fontSize: 'clamp(32px, 4vw, 46px)', letterSpacing: '-1.5px', lineHeight: 1.1 }}>
              Ethiopia financial market,<br />fully covered.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {CATEGORIES.map((cat) => (
              <Link key={cat.label} href={cat.href}
                className="group bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all duration-200 flex flex-col overflow-hidden">
                <div style={{ height: 3, background: 'linear-gradient(90deg, #1D4ED8, #1E40AF)' }} />
                <div className="flex flex-col flex-1 p-6">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-5 text-blue-600">
                    {cat.icon}
                  </div>
                  <p className="font-bold text-slate-900 mb-2" style={{ fontSize: '15px' }}>{cat.label}</p>
                  <p className="text-slate-400 text-xs leading-relaxed flex-1">{cat.desc}</p>
                  <div className="mt-5 pt-5 border-t border-slate-100">
                    <div className="flex items-baseline gap-2 mb-3">
                      <p className="font-mono font-black text-blue-600" style={{ fontSize: '22px', letterSpacing: '-1px', lineHeight: 1 }}>{cat.statNum}</p>
                      <p className="text-xs text-slate-400">{cat.statLabel}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-bold text-blue-600 group-hover:gap-2 transition-all">
                      <span>{cat.action}</span><ArrowRight size={11} />
                    </div>
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
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Live rates</p>
              <h2 className="font-serif font-bold text-slate-950" style={{ fontSize: 'clamp(24px, 3vw, 36px)', letterSpacing: '-1px', lineHeight: 1.15 }}>
                Today FX rates — NBE official
              </h2>
            </div>
            <Link href="/banking/fx-rates" className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 shrink-0 sm:pb-1">
              See all rates <ArrowRight />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {FX_RATES.map((fx) => (
              <div key={fx.currency} className="bg-white rounded-2xl border border-slate-200 hover:border-blue-200 hover:shadow-md transition-all p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="inline-flex items-center rounded-lg bg-blue-600 px-3 py-1">
                    <span className="text-xs font-black text-white tracking-widest">{fx.currency}</span>
                  </div>
                  <p className="text-xs text-slate-400 font-medium">{fx.name}</p>
                </div>
                <p className="text-xs text-slate-400 font-medium mb-1">ETB per 1 {fx.currency}</p>
                <p className="font-mono font-black text-slate-950 mb-3" style={{ fontSize: '28px', letterSpacing: '-1px', lineHeight: 1 }}>{fx.sell}</p>
                <div className="flex justify-between items-center pt-3 border-t border-slate-100">
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

      {/* ═════════════════════════════════ TRUST ═══════════════════════════════════ */}
      <section className="border-b border-slate-100" style={{ background: '#0f172a', padding: '96px 32px' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: '#93c5fd' }}>Why use BirrBank</p>
            <h2 className="font-serif font-bold text-white mb-4" style={{ fontSize: 'clamp(26px, 3.5vw, 42px)', letterSpacing: '-1.2px' }}>
              Unbiased. Verified. Free.
            </h2>
            <p className="text-slate-400 mx-auto" style={{ fontSize: '16px', lineHeight: 1.75, maxWidth: '480px' }}>
              We never take fees from the institutions we rank. The best rate is always #1 — regardless of who offers it.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#93c5fd" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>,
                tag: 'NBE verified',
                headline: '214 institutions. Zero grey-market listings.',
                body: 'Every institution on BirrBank is verified against the National Bank of Ethiopia official registry. If it is not NBE-licensed, it is not here.',
              },
              {
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#93c5fd" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
                tag: 'Updated daily',
                headline: 'Every rate comes with a verified date.',
                body: 'Any rate older than 7 days is automatically flagged with a warning badge. You always know exactly how fresh the data is before making any decision.',
              },
              {
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#93c5fd" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
                tag: 'No commercial bias',
                headline: 'We earn nothing from the institutions we rank.',
                body: 'BirrBank makes no money from rankings or placements. We are funded by advertising and data services — never by the banks or insurers you are comparing.',
              },
            ].map(({ icon, tag, headline, body }) => (
              <div key={tag} className="rounded-2xl flex flex-col" style={{ padding: '36px 32px', background: '#1e293b', border: '1px solid #334155', minHeight: '280px' }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-6" style={{ background: '#1e3a5f', border: '1px solid #1d4ed8' }}>
                  {icon}
                </div>
                <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: '#93c5fd' }}>{tag}</p>
                <h3 className="font-bold text-white mb-3" style={{ fontSize: '16px', lineHeight: 1.4 }}>{headline}</h3>
                <p className="text-sm text-slate-400" style={{ lineHeight: '1.85' }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ EMAIL CAPTURE ══════════════════════════════ */}
      <section className="bg-white" style={{ padding: '96px 32px' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Weekly rate alerts</p>
            <h2 className="font-serif font-bold text-slate-950 mb-5" style={{ fontSize: 'clamp(32px, 4vw, 46px)', letterSpacing: '-1.5px', lineHeight: 1.1 }}>
              The best rates,<br /><span style={{ color: '#1D4ED8' }}>direct to your inbox.</span>
            </h2>
            <p className="text-slate-500 mb-8" style={{ fontSize: '15px', lineHeight: 1.85 }}>
              Once a week. No noise. Just the sharpest moves across savings rates, FX, ESX markets and ECX commodity prices.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Rate changes across all 32 commercial banks',
                'FX movements — USD, GBP, SAR, AED vs ETB',
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
