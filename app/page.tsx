import Link from 'next/link'
import EmailCapture from '@/components/EmailCapture'
export const dynamic = 'force-dynamic'

// ─── Placeholder data — replace with Supabase queries in next phase ──────────

const TOP_RATES = [
  { rank: 1, bank: 'Awash Bank',          product: '12-month fixed deposit', rate: '9.50', badge: 'Best rate' },
  { rank: 2, bank: 'Zemen Bank',           product: '12-month fixed deposit', rate: '9.25', badge: null },
  { rank: 3, bank: 'Bank of Abyssinia',    product: '12-month fixed deposit', rate: '9.00', badge: null },
  { rank: 4, bank: 'Dashen Bank',          product: 'Regular savings',        rate: '8.75', badge: null },
  { rank: 5, bank: 'Oromia International', product: 'Regular savings',        rate: '8.50', badge: null },
]

const CATEGORIES = [
  {
    label: 'Banking',
    href: '/banking',
    action: 'Compare savings rates',
    desc: 'Find the best savings, FX and loan rates across all 32 banks.',
    stat: '32 banks',
    iconBg: '#e6f4ed',
    iconColor: '#1A5C38',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1A5C38" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="3"/><line x1="2" y1="10" x2="22" y2="10"/>
      </svg>
    ),
  },
  {
    label: 'Insurance',
    href: '/insurance',
    action: 'Compare insurance',
    desc: 'Motor, life, health and property insurance from all 18 providers.',
    stat: '18 providers',
    iconBg: '#eff6ff',
    iconColor: '#1d4ed8',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    label: 'Markets',
    href: '/markets',
    action: 'Explore ESX markets',
    desc: 'Track live ESX equities, T-bill yields and the IPO pipeline.',
    stat: '45+ IPOs',
    iconBg: '#f5f3ff',
    iconColor: '#7c3aed',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    label: 'Commodities',
    href: '/commodities',
    action: 'View ECX prices',
    desc: 'Daily coffee, sesame and grain prices from the Ethiopian Commodity Exchange.',
    stat: 'Live ECX',
    iconBg: '#fffbeb',
    iconColor: '#d97706',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22V12M12 12C12 6 7 4 7 4s5 2 5 8z"/>
        <path d="M12 12C12 6 17 4 17 4s-5 2-5 8z"/>
        <line x1="8" y1="22" x2="16" y2="22"/>
      </svg>
    ),
  },
  {
    label: 'Guides',
    href: '/guides',
    action: 'Read the guides',
    desc: '500+ guides on banking, investing, insurance and the diaspora.',
    stat: '500+ guides',
    iconBg: '#ecfeff',
    iconColor: '#0891b2',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0891b2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
  },
]

const ArrowRight = ({ size = 13 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
)

const BTN_BASE = 'font-bold rounded-full transition-all'
const BTN_SZ   = { fontSize: 15, padding: '14px 32px' } as React.CSSProperties

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ════════════════════════════════════ HERO ═══════════════════════════════════ */}
      <section className="relative bg-white overflow-hidden border-b border-slate-100">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 900px 500px at 55% -80px, rgba(26,92,56,0.05) 0%, transparent 65%)' }}
        />

        <div className="relative max-w-6xl mx-auto px-8 pt-20 pb-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left */}
            <div className="pb-16">
              <h1
                className="font-serif font-bold mb-6"
                style={{ fontSize: 'clamp(38px, 4.5vw, 56px)', letterSpacing: '-1.8px', lineHeight: 1.08 }}
              >
                <span className="text-slate-950">Ethiopia's best</span>
                <br />
                <span className="text-slate-950">financial rates,</span>
                <br />
                <span style={{ color: '#1A5C38' }}>compared.</span>
              </h1>

              <p className="text-slate-500 mb-10" style={{ fontSize: '16px', lineHeight: '1.8', maxWidth: '400px' }}>
                Savings rates, FX, insurance, ESX markets and commodity prices —
                all verified from official sources, completely free.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/banking/savings-rates"
                  className={BTN_BASE}
                  style={{ ...BTN_SZ, minWidth: 210, textAlign: 'center', background: '#1A5C38', color: '#fff', boxShadow: '0 4px 20px rgba(26,92,56,0.22)' }}
                >
                  Compare savings rates
                </Link>
                <Link
                  href="/banking/fx-rates"
                  className={BTN_BASE}
                  style={{ ...BTN_SZ, minWidth: 210, textAlign: 'center', border: '2px solid #1A5C38', color: '#1A5C38', background: 'transparent' }}
                >
                  Check FX rates
                </Link>
              </div>
            </div>

            {/* Right: rates card */}
            <div className="relative hidden lg:block pb-16">
              <div
                className="bg-white rounded-2xl overflow-hidden"
                style={{ border: '1px solid #e2e8f0', boxShadow: '0 24px 64px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06)' }}
              >
                <div style={{ height: 4, background: 'linear-gradient(90deg, #1A5C38, #2d9e5f)' }} />
                <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black text-green-600 uppercase tracking-widest mb-0.5">Verified today</p>
                    <p className="text-slate-900 font-bold" style={{ fontSize: '15px' }}>Top savings rates · All 32 banks</p>
                  </div>
                  <div className="flex items-center gap-2 bg-green-50 border border-green-100 rounded-full px-3 py-1.5">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs font-bold text-green-700">Live</span>
                  </div>
                </div>

                <div className="divide-y divide-slate-100">
                  {TOP_RATES.map((r) => (
                    <div
                      key={r.rank}
                      className={`flex items-center gap-4 transition-colors ${r.rank === 1 ? 'bg-green-50' : 'bg-white hover:bg-slate-50'}`}
                      style={{ padding: r.rank === 1 ? '16px 20px' : '12px 20px' }}
                    >
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black shrink-0"
                        style={r.rank === 1
                          ? { background: '#1A5C38', color: '#fff' }
                          : { background: '#f1f5f9', color: '#94a3b8' }}
                      >
                        {r.rank === 1 ? (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                        ) : r.rank}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-bold truncate ${r.rank === 1 ? 'text-green-900' : 'text-slate-800'}`}
                          style={{ fontSize: r.rank === 1 ? '15px' : '13px' }}>
                          {r.bank}
                        </p>
                        <p className={`text-xs mt-0.5 ${r.rank === 1 ? 'text-green-600 font-bold uppercase tracking-wide' : 'text-slate-400'}`}>
                          {r.badge ?? r.product}
                        </p>
                      </div>
                      <div
                        className={`font-mono font-black ${r.rank === 1 ? 'text-green-700' : 'text-slate-700'}`}
                        style={{ fontSize: r.rank === 1 ? '26px' : '16px', letterSpacing: '-1px' }}
                      >
                        {r.rate}%
                      </div>
                    </div>
                  ))}
                </div>

                <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <p className="text-xs text-slate-400">Official bank websites · NBE registry</p>
                  <Link href="/banking/savings-rates" className="text-xs font-bold hover:underline" style={{ color: '#1A5C38' }}>
                    See all 32 banks →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── 3-stat credibility bar ── */}
        <div className="relative max-w-6xl mx-auto px-8 pb-12">
          <div className="grid grid-cols-3 gap-px bg-slate-200 rounded-2xl overflow-hidden border border-slate-200">
            {[
              { value: '214',   label: 'NBE-regulated institutions', sub: 'Every licensed entity covered' },
              { value: '9.50%', label: 'Best savings rate today',    sub: 'Awash Bank · 12-month fixed'  },
              { value: 'Free',  label: 'Always free to use',         sub: 'No subscriptions, ever'       },
            ].map((s, i) => (
              <div key={i} className="bg-white px-8 py-6 text-center">
                <p className="font-mono font-black text-slate-950 mb-1" style={{ fontSize: '26px', letterSpacing: '-1px' }}>
                  {s.value}
                </p>
                <p className="font-semibold text-slate-800 mb-0.5" style={{ fontSize: '13px' }}>{s.label}</p>
                <p className="text-xs text-slate-400">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════ PRODUCT CATEGORIES ════════════════════════════ */}
      <section className="border-b border-slate-100" style={{ background: '#f8faf8', padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">

          <div className="mb-10">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">What would you like to do?</p>
            <h2
              className="font-serif font-bold text-slate-950"
              style={{ fontSize: 'clamp(32px, 4vw, 46px)', letterSpacing: '-1.5px', lineHeight: 1.1 }}
            >
              Ethiopia's financial market, fully covered.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.label}
                href={cat.href}
                className="group bg-white rounded-2xl border border-slate-200 hover:shadow-lg transition-all duration-200 flex flex-col"
                style={{ padding: '32px 28px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
              >
                <div
                  className="rounded-xl flex items-center justify-center shrink-0 mb-6"
                  style={{ width: 52, height: 52, background: cat.iconBg }}
                >
                  {cat.icon}
                </div>
                <p className="font-bold text-slate-900 mb-2" style={{ fontSize: '15px' }}>{cat.label}</p>
                <p className="text-slate-400 mb-4 text-xs" style={{ lineHeight: '1.8' }}>{cat.desc}</p>
                <div
                  className="flex items-center justify-center rounded-lg mb-5 font-mono font-black"
                  style={{ background: cat.iconBg, color: cat.iconColor, fontSize: '20px', letterSpacing: '-0.5px', height: '48px' }}
                >
                  {cat.stat}
                </div>
                <div
                  className="flex items-center gap-1.5 text-xs font-bold group-hover:gap-2.5 transition-all mt-auto"
                  style={{ color: cat.iconColor }}
                >
                  <span>{cat.action}</span>
                  <ArrowRight size={11} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════ FEATURED: FX RATES ═════════════════════════ */}
      <section className="bg-white border-b border-slate-100" style={{ padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Updated daily</p>
              <h2
                className="font-serif font-bold text-slate-950"
                style={{ fontSize: 'clamp(24px, 3vw, 32px)', letterSpacing: '-1px', lineHeight: 1.15 }}
              >
                Today's FX rates — NBE official
              </h2>
            </div>
            <Link
              href="/banking/fx-rates"
              className="inline-flex items-center gap-2 text-sm font-bold shrink-0 sm:pb-1"
              style={{ color: '#1A5C38' }}
            >
              See all rates <ArrowRight />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { currency: 'USD', name: 'US Dollar',     buy: '155.90', sell: '156.40', bg: '#eff6ff', color: '#1d4ed8' },
              { currency: 'GBP', name: 'British Pound', buy: '197.20', sell: '197.82', bg: '#f0f4ff', color: '#3730a3' },
              { currency: 'EUR', name: 'Euro',          buy: '168.50', sell: '169.12', bg: '#fffbeb', color: '#d97706' },
              { currency: 'SAR', name: 'Saudi Riyal',   buy: '41.40',  sell: '41.70',  bg: '#e6f4ed', color: '#1A5C38' },
              { currency: 'AED', name: 'UAE Dirham',    buy: '42.30',  sell: '42.60',  bg: '#ecfeff', color: '#0891b2' },
            ].map((fx) => (
              <div
                key={fx.currency}
                className="bg-white rounded-2xl border border-slate-200 hover:border-green-200 hover:shadow-md transition-all"
                style={{ padding: '24px 20px' }}
              >
                <div className="mb-4">
                  <div
                    className="inline-flex items-center rounded-lg mb-2"
                    style={{ background: fx.bg, padding: '4px 10px' }}
                  >
                    <span style={{ fontSize: '11px', fontWeight: 800, color: fx.color, letterSpacing: '1px' }}>
                      {fx.currency}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-medium">{fx.name} / ETB</p>
                </div>
                <div className="space-y-2.5">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-400 font-medium">Buy</span>
                    <span className="font-mono font-bold text-slate-700" style={{ fontSize: '14px' }}>{fx.buy}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-400 font-medium">Sell</span>
                    <span className="font-mono font-black text-slate-950" style={{ fontSize: '15px' }}>{fx.sell}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-4 pt-3 border-t border-slate-100">NBE official · Today</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════ TRUST ════════════════════════════════════ */}
      <section className="border-b border-slate-100" style={{ background: '#0a1f14', padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-12">
            <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: '#4ade80' }}>Why use BirrBank</p>
            <h2
              className="font-serif font-bold mb-4"
              style={{ fontSize: 'clamp(26px, 3.5vw, 38px)', letterSpacing: '-1.2px', color: '#ffffff' }}
            >
              Unbiased. Verified. Free.
            </h2>
            <p className="mx-auto" style={{ fontSize: '16px', lineHeight: 1.75, maxWidth: '480px', color: '#6b9e7e' }}>
              We never take fees from the institutions we rank. The best rate is always #1 — regardless of who offers it.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    <polyline points="9 12 11 14 15 10"/>
                  </svg>
                ),
                tag: 'NBE verified',
                headline: '214 institutions. Zero grey-market listings.',
                body: "Every institution on BirrBank is verified against the National Bank of Ethiopia's official registry. If it's not NBE-licensed, it's not here.",
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                ),
                tag: 'Updated daily',
                headline: 'Every rate comes with a verified date.',
                body: 'Any rate older than 7 days is automatically flagged with a warning badge. You always know exactly how fresh the data is before making any decision.',
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="1" x2="12" y2="23"/>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  </svg>
                ),
                tag: 'No commercial bias',
                headline: 'We earn nothing from the institutions we rank.',
                body: "BirrBank makes no money from rankings or placements. We're funded by advertising and data services — never by the banks or insurers you're comparing.",
              },
            ].map(({ icon, tag, headline, body }) => (
              <div key={tag} className="rounded-2xl" style={{ padding: '36px 32px', background: '#0f2d1a', border: '1px solid #1a3a24' }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-6" style={{ background: '#1a3a24', border: '1px solid #2d6a4f' }}>
                  {icon}
                </div>
                <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: '#4ade80' }}>{tag}</p>
                <h3 className="font-bold mb-3" style={{ fontSize: '16px', lineHeight: 1.4, color: '#ffffff' }}>{headline}</h3>
                <p className="text-sm" style={{ lineHeight: '1.85', color: '#6b9e7e' }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ EMAIL CAPTURE ═══════════════════════════════ */}
      <section className="bg-white" style={{ padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Weekly rate alerts</p>
            <h2
              className="font-serif font-bold text-slate-950 mb-5"
              style={{ fontSize: 'clamp(32px, 4vw, 46px)', letterSpacing: '-1.5px', lineHeight: 1.1 }}
            >
              The best rates,<br />
              <span style={{ color: '#1A5C38' }}>direct to your inbox.</span>
            </h2>
            <p className="text-slate-500 mb-8" style={{ fontSize: '15px', lineHeight: 1.85 }}>
              Once a week. No noise. Just the sharpest moves across savings
              rates, FX, ESX markets and ECX commodity prices.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Rate changes across all 32 commercial banks',
                'FX movements — USD, GBP, SAR, AED vs ETB',
                'ESX market updates and new IPO announcements',
                'ECX commodity prices for coffee and sesame',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-slate-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-3 pt-5 border-t border-slate-100">
              <p className="text-xs text-slate-500 font-medium">
                Join <strong className="text-slate-900">2,400+</strong> Ethiopians and diaspora members already subscribed
              </p>
            </div>
          </div>
          <EmailCapture />
        </div>
      </section>

    </div>
  )
}
