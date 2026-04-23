import Link from 'next/link'
import EmailCapture from '@/components/EmailCapture'
export const dynamic = 'force-dynamic'

// ─── Placeholder data — replace with Supabase queries in next phase ───────────

const TOP_RATES = [
  { rank: 1, bank: 'Awash Bank',          product: '12-month fixed deposit', rate: '9.50', badge: 'Highest rate' },
  { rank: 2, bank: 'Zemen Bank',           product: '12-month fixed deposit', rate: '9.25', badge: null },
  { rank: 3, bank: 'Bank of Abyssinia',    product: '12-month fixed deposit', rate: '9.00', badge: null },
  { rank: 4, bank: 'Dashen Bank',          product: 'Regular savings',        rate: '8.75', badge: null },
  { rank: 5, bank: 'Oromia International', product: 'Regular savings',        rate: '8.50', badge: null },
]

const TICKER_ITEMS = [
  { label: 'USD / ETB',    value: '156.40', change: '+0.40',  up: true  },
  { label: 'GBP / ETB',    value: '197.82', change: '+0.18',  up: true  },
  { label: 'EUR / ETB',    value: '169.12', change: '−0.70',  up: false },
  { label: 'SAR / ETB',    value: '41.70',  change: '+0.12',  up: true  },
  { label: 'AED / ETB',    value: '42.60',  change: '+0.08',  up: true  },
  { label: 'Best savings', value: '9.50%',  change: 'Awash Bank', up: null },
  { label: 'ECX Coffee',   value: '312.50', change: '+4.20',  up: true  },
  { label: 'ESX — WGAGN',  value: '28.40',  change: '+0.60',  up: true  },
]

const DATA_STRIP = [
  { label: 'Best savings rate', value: '9.50%',  change: '+0.25% this week', up: true,  sub: 'Awash Bank · 12-month' },
  { label: 'USD / ETB',         value: '156.40', change: '+0.40 today',      up: true,  sub: 'CBE official rate'     },
  { label: 'EUR / ETB',         value: '169.12', change: '−0.70 today',      up: false, sub: 'CBE official rate'     },
  { label: 'IPOs in pipeline',  value: '45+',    change: 'ESX registered',   up: null,  sub: 'Under ECMA review'     },
  { label: 'Institutions',      value: '214',    change: 'NBE-regulated',    up: null,  sub: '8 institution types'   },
]

const PILLAR_CHIPS = ['32 commercial banks', '55 MFIs', '27 payment operators', '62 transfer agencies']

const NON_BANKING_PILLARS = [
  {
    label: 'Insurance',
    href: '/insurance',
    icon: 'Insurance',
    stat: '18 providers',
    sub: 'Motor · Life · Health · Property · Agricultural',
  },
  {
    label: 'Markets',
    href: '/markets',
    icon: 'Markets',
    stat: '45+ IPOs',
    sub: 'ESX equities · T-bill yields · Investment banks',
  },
  {
    label: 'Commodities',
    href: '/commodities',
    icon: 'Commodities',
    stat: 'Live ECX',
    sub: 'Coffee · Sesame · Grains · Beans',
  },
  {
    label: 'Intelligence',
    href: '/guides',
    icon: 'Intelligence',
    stat: '500+ guides',
    sub: 'Guides · Regulations · AI assistant · Diaspora',
  },
]

const TRUST_STATS = [
  { value: '214',   label: 'NBE-licensed institutions',  sub: 'Every licensed entity in Ethiopia'    },
  { value: '32',    label: 'Commercial banks compared',  sub: 'State and private — all included'     },
  { value: '0',     label: 'Affiliate fees earned',      sub: 'We earn nothing from rankings'        },
  { value: '7-day', label: 'Maximum rate age',           sub: 'Stale data flagged automatically'     },
]

const TRUST_CARDS = [
  {
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#1A5C38" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
    tag: 'NBE verified',
    headline: '214 licensed institutions. Zero approximations.',
    body: "Every institution verified against the National Bank of Ethiopia's official registry. We list only what NBE licenses — no unlicensed operators, no grey-market services.",
  },
  {
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#1A5C38" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    tag: 'Updated daily',
    headline: 'Every rate shows a verified date.',
    body: 'Stale data is automatically flagged. Any rate older than 7 days shows a warning badge. You always know exactly how fresh the data is.',
  },
  {
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#1A5C38" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
    tag: 'No commercial bias',
    headline: 'Free for every Ethiopian. Forever.',
    body: 'BirrBank earns nothing from institutions it lists. The best rate is always ranked first. No affiliate commissions, no sponsored placements.',
  },
]

// ─── SVG icon map ────────────────────────────────────────────────────────────────

const ICONS: Record<string, React.ReactNode> = {
  Banking: (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#1A5C38" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="20" height="14" rx="3"/><line x1="2" y1="10" x2="22" y2="10"/>
    </svg>
  ),
  Insurance: (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#1A5C38" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  Markets: (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#1A5C38" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  ),
  Commodities: (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#1A5C38" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22V12M12 12C12 6 7 4 7 4s5 2 5 8z"/>
      <path d="M12 12C12 6 17 4 17 4s-5 2-5 8z"/>
      <line x1="8" y1="22" x2="16" y2="22"/>
    </svg>
  ),
  Intelligence: (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#1A5C38" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
}

const ArrowRight = ({ size = 13 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
)

// ─── Shared button styles ────────────────────────────────────────────────────────

const BTN_BASE = 'font-bold rounded-full transition-all'
const BTN_SZ   = { fontSize: 15, padding: '14px 32px' } as React.CSSProperties

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ══════════════════════════════ TICKER BAR ═══════════════════════════════════ */}
      <div className="border-b border-slate-100 bg-slate-50 overflow-x-auto">
        <div className="max-w-6xl mx-auto px-8 py-2 flex items-center gap-0 min-w-max">
          {TICKER_ITEMS.map((t, i) => (
            <div key={i} className="flex items-center gap-2 shrink-0 px-4" style={{ borderRight: i < TICKER_ITEMS.length - 1 ? '1px solid #e2e8f0' : 'none' }}>
              <span className="text-xs text-slate-400 font-medium">{t.label}</span>
              <span className="text-xs font-black text-slate-800 font-mono">{t.value}</span>
              {t.up === true  && <span className="text-xs font-bold text-green-600">{t.change}</span>}
              {t.up === false && <span className="text-xs font-bold text-red-500">{t.change}</span>}
              {t.up === null  && <span className="text-xs text-slate-400">{t.change}</span>}
            </div>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════ HERO ═══════════════════════════════════ */}
      <section className="relative bg-white overflow-hidden border-b border-slate-100">

        {/* Dot grid texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            opacity: 0.35,
          }}
        />
        {/* Green radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 900px 500px at 60% -60px, rgba(26,92,56,0.06) 0%, transparent 60%)' }}
        />

        <div className="relative max-w-6xl mx-auto px-8 pt-20 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* ── Left ── */}
            <div>
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 bg-green-50 border border-green-100 rounded-full px-4 py-2 mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-bold text-green-700 uppercase tracking-widest">
                  214 NBE-regulated institutions · Updated daily
                </span>
              </div>

              <h1
                className="font-serif font-bold mb-7"
                style={{ fontSize: 'clamp(52px, 6vw, 80px)', letterSpacing: '-3px', lineHeight: 0.97 }}
              >
                <span className="text-slate-950">Ethiopia's<br />financial</span>
                <br />
                <span style={{ color: '#1A5C38' }}>operating</span>
                <br />
                <span style={{ color: '#1A5C38' }}>system.</span>
              </h1>

              <p className="text-slate-500 mb-10" style={{ fontSize: '16px', lineHeight: '1.8', maxWidth: '400px' }}>
                Compare savings rates, track ESX markets, monitor commodity prices
                and access insurance data — all verified, all free.
              </p>

              <div className="flex flex-wrap gap-3 mb-12">
                <Link
                  href="/banking/savings-rates"
                  className={BTN_BASE}
                  style={{ ...BTN_SZ, background: '#1A5C38', color: '#fff', boxShadow: '0 4px 20px rgba(26,92,56,0.22)' }}
                >
                  Compare savings rates
                </Link>
                <Link
                  href="/markets"
                  className={BTN_BASE}
                  style={{ ...BTN_SZ, border: '2px solid #1A5C38', color: '#1A5C38', background: 'transparent' }}
                >
                  Explore markets
                </Link>
              </div>

              {/* Inline credibility numbers */}
              <div className="flex flex-wrap items-center gap-8 pt-2 border-t border-slate-100">
                {[
                  { val: '32',    label: 'Banks compared'   },
                  { val: '9.50%', label: 'Best savings rate' },
                  { val: '45+',   label: 'IPOs in pipeline' },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="font-mono font-black text-slate-950" style={{ fontSize: '20px', letterSpacing: '-1px', lineHeight: 1.2 }}>
                      {s.val}
                    </p>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: rates card ── */}
            <div className="relative">
              {/* Decorative shadow block */}
              <div
                className="absolute rounded-2xl pointer-events-none"
                style={{ inset: 0, top: 12, left: 12, right: -8, bottom: -8, background: 'rgba(26,92,56,0.07)', borderRadius: 18, zIndex: 0 }}
              />
              <div
                className="relative bg-white rounded-2xl border border-slate-200 overflow-hidden"
                style={{ boxShadow: '0 24px 60px rgba(0,0,0,0.09), 0 4px 16px rgba(0,0,0,0.05)', zIndex: 1 }}
              >
                {/* Card header */}
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

                {/* Rate rows */}
                <div className="divide-y divide-slate-50">
                  {TOP_RATES.map((r) => (
                    <div
                      key={r.rank}
                      className={`flex items-center gap-4 transition-colors ${r.rank === 1 ? 'bg-green-50' : 'bg-white hover:bg-slate-50'}`}
                      style={{ padding: '13px 20px' }}
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
                        <p className={`font-bold text-sm truncate ${r.rank === 1 ? 'text-green-900' : 'text-slate-800'}`}>
                          {r.bank}
                        </p>
                        <p className={`text-xs mt-0.5 ${r.rank === 1 ? 'text-green-600 font-bold uppercase tracking-wide' : 'text-slate-400'}`}>
                          {r.badge ?? r.product}
                        </p>
                      </div>
                      <div
                        className={`font-mono font-black ${r.rank === 1 ? 'text-green-700' : 'text-slate-900'}`}
                        style={{ fontSize: r.rank === 1 ? '21px' : '17px', letterSpacing: '-0.5px' }}
                      >
                        {r.rate}%
                      </div>
                    </div>
                  ))}
                </div>

                {/* Card footer */}
                <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <p className="text-xs text-slate-400">Source: Official bank websites · NBE registry</p>
                  <Link href="/banking/savings-rates" className="text-xs font-bold hover:underline" style={{ color: '#1A5C38' }}>
                    See all 32 banks →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Live data strip ── */}
        <div className="relative max-w-6xl mx-auto px-8 pb-16">
          <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white" style={{ boxShadow: '0 2px 20px rgba(0,0,0,0.04)' }}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-x divide-slate-100">
              {DATA_STRIP.map((d, i) => (
                <div key={i} className="px-5 py-5">
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2.5">{d.label}</p>
                  <div className="flex items-baseline gap-1.5 mb-1">
                    <p className="font-mono font-black text-slate-950" style={{ fontSize: '21px', letterSpacing: '-1px', lineHeight: 1.1 }}>
                      {d.value}
                    </p>
                    {d.up === true  && <span className="text-xs font-bold text-green-600">{d.change}</span>}
                    {d.up === false && <span className="text-xs font-bold text-red-500">{d.change}</span>}
                  </div>
                  <p className="text-xs text-slate-400 font-medium">
                    {d.up === null ? d.change : d.sub}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════ FIVE PILLARS ════════════════════════════════ */}
      <section className="border-b border-slate-100" style={{ background: '#f8faf8', padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">

          {/* Section header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Full market coverage</p>
              <h2
                className="font-serif font-bold text-slate-950"
                style={{ fontSize: 'clamp(30px, 4vw, 42px)', letterSpacing: '-1.5px', lineHeight: 1.1 }}
              >
                Everything in Ethiopia's<br />financial market
              </h2>
            </div>
            <p className="text-slate-400 text-sm font-medium sm:pb-1">214 institutions · 5 pillars</p>
          </div>

          {/* Banking — featured split card */}
          <Link
            href="/banking"
            className="group block bg-white rounded-2xl border border-slate-200 hover:border-green-200 hover:shadow-2xl transition-all duration-300 mb-4 overflow-hidden"
            style={{ boxShadow: '0 4px 32px rgba(0,0,0,0.06)' }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2">

              {/* Left: copy */}
              <div style={{ padding: '44px 48px' }}>
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="bg-slate-50 group-hover:bg-green-50 transition-colors rounded-xl flex items-center justify-center shrink-0"
                    style={{ width: 40, height: 40 }}
                  >
                    {ICONS['Banking']}
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest text-slate-400">Banking</span>
                  <span className="flex items-center gap-1.5 text-xs font-bold" style={{ color: '#1A5C38' }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    Updated today
                  </span>
                </div>

                <h3
                  className="font-serif font-bold text-slate-950 mb-4"
                  style={{ fontSize: '28px', letterSpacing: '-1px', lineHeight: 1.2 }}
                >
                  Compare every bank<br />in Ethiopia
                </h3>

                <p className="text-slate-500 mb-8" style={{ fontSize: '14px', lineHeight: 1.85 }}>
                  Savings rates, FX rates, loan products and mobile money across every
                  NBE-licensed institution — verified daily from official bank websites.
                </p>

                <div className="flex flex-wrap gap-2">
                  {PILLAR_CHIPS.map((chip) => (
                    <span
                      key={chip}
                      className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-full text-xs font-semibold text-slate-600"
                      style={{ padding: '6px 12px' }}
                    >
                      <span className="w-1 h-1 rounded-full bg-green-500 shrink-0" />
                      {chip}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: live rate */}
              <div
                className="border-t md:border-t-0 md:border-l border-slate-100 flex flex-col justify-center relative overflow-hidden"
                style={{ padding: '44px 48px', background: '#f8faf8' }}
              >
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse 260px 260px at 50% 50%, rgba(26,92,56,0.06) 0%, transparent 70%)' }}
                />
                <div className="relative">
                  <p className="text-xs font-black uppercase tracking-widest text-green-600 mb-4">
                    Top savings rate · Today
                  </p>
                  <div className="flex items-end gap-1 mb-3">
                    <p
                      className="font-mono font-black text-slate-950 leading-none"
                      style={{ fontSize: '68px', letterSpacing: '-4px' }}
                    >
                      9.50
                    </p>
                    <p
                      className="font-mono font-black leading-none mb-2"
                      style={{ fontSize: '32px', color: '#1A5C38', letterSpacing: '-2px' }}
                    >
                      %
                    </p>
                  </div>
                  <p className="text-slate-700 font-semibold text-sm mb-1">
                    Awash Bank · 12-month fixed deposit
                  </p>
                  <p className="text-xs text-slate-400 mb-10">
                    NBE verified · Updated today
                  </p>
                  <div
                    className="inline-flex items-center gap-2 text-sm font-bold group-hover:gap-3 transition-all"
                    style={{ color: '#1A5C38' }}
                  >
                    <span>Compare all 32 banks</span>
                    <ArrowRight />
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* 4 smaller pillar cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {NON_BANKING_PILLARS.map((p) => (
              <Link
                key={p.label}
                href={p.href}
                className="group bg-white rounded-2xl border border-slate-200 hover:border-green-300 hover:shadow-lg transition-all duration-200 flex flex-col"
                style={{ padding: '28px 24px', boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}
              >
                <div
                  className="bg-slate-50 group-hover:bg-green-50 transition-colors rounded-xl flex items-center justify-center shrink-0 mb-4"
                  style={{ width: 40, height: 40 }}
                >
                  {ICONS[p.icon]}
                </div>
                <p className="font-bold text-slate-900 mb-1.5 text-sm">{p.label}</p>
                <p className="text-slate-400 flex-1 mb-5" style={{ fontSize: '12px', lineHeight: '1.7' }}>
                  {p.sub}
                </p>
                <div
                  className="flex items-center gap-1.5 text-xs font-bold group-hover:gap-2.5 transition-all"
                  style={{ color: '#1A5C38' }}
                >
                  <span>{p.stat}</span>
                  <ArrowRight size={11} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════ TRUST ════════════════════════════════════ */}
      <section className="bg-white border-b border-slate-100" style={{ padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">

          {/* Top: copy + stats grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-16">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Why trust BirrBank</p>
              <h2
                className="font-serif font-bold text-slate-950 mb-6"
                style={{ fontSize: 'clamp(30px, 4vw, 42px)', letterSpacing: '-1.5px', lineHeight: 1.1 }}
              >
                Built on verified data.<br />
                <span style={{ color: '#1A5C38' }}>Earned by the numbers.</span>
              </h2>
              <p className="text-slate-500 mb-8" style={{ fontSize: '15px', lineHeight: 1.85 }}>
                No affiliate commissions. No sponsored placements. No grey-market operators.
                BirrBank earns nothing from the institutions it ranks — the best rate is always first.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-bold"
                style={{ color: '#1A5C38' }}
              >
                How we verify data <ArrowRight />
              </Link>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {TRUST_STATS.map((s) => (
                <div
                  key={s.label}
                  className="border border-slate-100 rounded-2xl"
                  style={{ padding: '28px 24px' }}
                >
                  <p
                    className="font-mono font-black text-slate-950 mb-2"
                    style={{ fontSize: '34px', letterSpacing: '-2px', lineHeight: 1 }}
                  >
                    {s.value}
                  </p>
                  <p className="font-bold text-slate-900 mb-1 text-sm">{s.label}</p>
                  <p className="text-xs text-slate-400">{s.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom: 3 trust cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {TRUST_CARDS.map(({ icon, tag, headline, body }) => (
              <div
                key={tag}
                className="border border-slate-100 rounded-2xl"
                style={{ padding: '36px 32px' }}
              >
                <div className="w-10 h-10 bg-green-50 border border-green-100 rounded-xl flex items-center justify-center mb-6">
                  {icon}
                </div>
                <p className="text-xs font-black uppercase tracking-widest text-green-600 mb-3">{tag}</p>
                <h3 className="font-bold text-slate-900 mb-3" style={{ fontSize: '16px', lineHeight: 1.4 }}>
                  {headline}
                </h3>
                <p className="text-slate-500 text-sm" style={{ lineHeight: '1.85' }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════ EMAIL CAPTURE ═══════════════════════════════ */}
      <section className="border-b border-slate-100" style={{ background: '#f8faf8', padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Weekly intelligence</p>
            <h2
              className="font-serif font-bold text-slate-950 mb-5"
              style={{ fontSize: 'clamp(30px, 4vw, 42px)', letterSpacing: '-1.5px', lineHeight: 1.1 }}
            >
              The best rates.<br />
              <span style={{ color: '#1A5C38' }}>Direct to your inbox.</span>
            </h2>
            <p className="text-slate-500 mb-8" style={{ fontSize: '15px', lineHeight: 1.85 }}>
              Once a week. No noise, no promotions. Just the sharpest moves across
              savings rates, FX, ESX markets and ECX commodity prices.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                'Rate changes across all 32 commercial banks',
                'FX movements — USD, GBP, SAR, AED vs ETB',
                'ESX market updates and new IPO announcements',
                'ECX price movements for coffee and sesame',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-slate-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            {/* Social proof */}
            <div className="flex items-center gap-3 pt-6 border-t border-slate-200">
              <div className="flex -space-x-2">
                {['#1A5C38', '#2d6a4f', '#4ade80', '#bbf7d0'].map((c, i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full border-2 border-white"
                    style={{ background: c }}
                  />
                ))}
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Join <strong className="text-slate-900">2,400+</strong> Ethiopians and diaspora members
              </p>
            </div>
          </div>

          <EmailCapture />
        </div>
      </section>

      {/* ══════════════════════════════════ DISCLAIMER ════════════════════════════════ */}
      <div className="bg-white" style={{ padding: '28px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-xs text-slate-400" style={{ maxWidth: '680px', lineHeight: '1.8' }}>
            BirrBank provides financial information for comparison purposes only. We are not a bank,
            insurer, broker, or financial adviser. Always verify rates directly with the institution
            before making any financial decision. All data sourced from official institution websites
            and the National Bank of Ethiopia registry.
          </p>
        </div>
      </div>

    </div>
  )
}
