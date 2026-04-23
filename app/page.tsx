import Link from 'next/link'
import EmailCapture from '@/components/EmailCapture'
export const dynamic = 'force-dynamic'

const RATES = [
  { rank: 1, bank: 'Awash Bank',         product: '12-month fixed',  rate: '9.50', badge: 'Highest rate' },
  { rank: 2, bank: 'Zemen Bank',          product: '12-month fixed',  rate: '9.25', badge: null },
  { rank: 3, bank: 'Bank of Abyssinia',   product: '12-month fixed',  rate: '9.00', badge: null },
  { rank: 4, bank: 'Dashen Bank',         product: 'Savings account', rate: '8.75', badge: null },
  { rank: 5, bank: 'Oromia International',product: 'Savings account', rate: '8.50', badge: null },
]

const PILLAR_CARDS = [
  { label: 'Insurance',    stat: '18 providers',    href: '/insurance',   desc: 'Motor · Life · Health · Property · Agricultural', icon: 'Insurance'    },
  { label: 'Markets',      stat: '45+ IPOs',         href: '/markets',     desc: 'ESX equities · IPO pipeline · T-bill yields',      icon: 'Markets'      },
  { label: 'Commodities',  stat: 'Live ECX prices',  href: '/commodities', desc: 'Coffee · Sesame · Grains · Beans',                 icon: 'Commodities'  },
  { label: 'Intelligence', stat: '500+ guides',      href: '/guides',      desc: 'Guides · Regulations · AI assistant · Diaspora',   icon: 'Intelligence' },
]

const LIVE_DATA = [
  { label: 'Best savings rate',    value: '9.50%',  sub: 'Awash Bank · 12-month',  trend: 'up'   },
  { label: 'USD / ETB',            value: '156.40', sub: 'CBE official · Today',    trend: 'up'   },
  { label: 'EUR / ETB',            value: '169.82', sub: 'CBE official · Today',    trend: 'down' },
  { label: 'Institutions tracked', value: '214',    sub: 'NBE-regulated',           trend: null   },
  { label: 'IPOs in pipeline',     value: '45+',    sub: 'ESX registered',          trend: null   },
]

const PILLAR_ICONS: Record<string, React.ReactNode> = {
  Banking:      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A5C38" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="3"/><line x1="2" y1="10" x2="22" y2="10"/></svg>,
  Insurance:    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A5C38" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Markets:      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A5C38" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  Commodities:  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A5C38" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22V12M12 12C12 6 7 4 7 4s5 2 5 8z"/><path d="M12 12C12 6 17 4 17 4s-5 2-5 8z"/><line x1="8" y1="22" x2="16" y2="22"/></svg>,
  Intelligence: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A5C38" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
}

const ArrowRight = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)

const BTN  = 'font-bold rounded-full transition-all'
const BTN_SZ = { fontSize: 16, padding: '15px 34px' }

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ═══════════════════════════════════════ HERO ════════════════════════════════════════ */}
      <section className="relative bg-white overflow-hidden border-b border-slate-100">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 900px 500px at 60% -100px,rgba(26,92,56,0.055) 0%,transparent 70%)' }}
        />

        <div className="relative max-w-6xl mx-auto px-8 pt-24 pb-16">
          <div className="grid grid-cols-2 gap-20 items-start">

            {/* ── Left ── */}
            <div className="pt-2">
              <h1
                className="font-serif font-bold text-slate-950 mb-7"
                style={{ fontSize: '70px', letterSpacing: '-2.5px', lineHeight: '1.0' }}
              >
                Ethiopia's<br />
                financial<br />
                <span style={{ color: '#1A5C38' }}>operating</span><br />
                <span style={{ color: '#1A5C38' }}>system.</span>
              </h1>

              <p className="text-slate-500 mb-10" style={{ fontSize: '18px', lineHeight: '1.75', maxWidth: '400px' }}>
                Compare savings rates across 32 banks. Track ESX markets live.
                Monitor commodity prices. Access insurance data. All free, always.
              </p>

              <div className="flex gap-3 mb-12">
                <Link
                  href="/banking/savings-rates"
                  className={BTN}
                  style={{ ...BTN_SZ, background: '#1A5C38', color: '#fff', boxShadow: '0 4px 24px rgba(26,92,56,0.25)' }}
                >
                  Compare savings rates
                </Link>
                <Link
                  href="/markets"
                  className={BTN}
                  style={{ ...BTN_SZ, border: '2px solid #1A5C38', color: '#1A5C38', background: 'transparent' }}
                >
                  Explore markets
                </Link>
              </div>

              <div className="flex items-center gap-7 pt-7 border-t border-slate-100">
                {[
                  { dot: 'bg-green-500', text: '214 institutions' },
                  { dot: 'bg-slate-300',  text: 'NBE regulated'   },
                  { dot: 'bg-slate-300',  text: 'Free forever'     },
                ].map(({ dot, text }) => (
                  <div key={text} className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: rates card ── */}
            <div className="relative pt-2">
              <div
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden"
                style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.09),0 4px 16px rgba(0,0,0,0.04)' }}
              >
                {/* Card header */}
                <div className="bg-white border-b border-slate-100 px-5 py-4 flex justify-between items-center">
                  <div>
                    <p className="text-xs font-black text-green-600 uppercase tracking-widest mb-0.5">Verified today</p>
                    <p className="text-slate-900 font-bold text-base">Top savings rates</p>
                  </div>
                  <div className="flex items-center gap-2 bg-green-50 border border-green-100 rounded-full px-3 py-1.5">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                    <span className="text-green-700 text-xs font-bold">NBE verified</span>
                  </div>
                </div>

                {/* Rate rows */}
                <div className="divide-y divide-slate-50">
                  {RATES.map((r) => (
                    <div
                      key={r.rank}
                      className={`flex items-center gap-4 ${r.rank === 1 ? 'bg-green-50' : 'bg-white'}`}
                      style={{ padding: '16px 20px' }}
                    >
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black shrink-0 ${
                          r.rank === 1 ? 'text-white' : 'bg-slate-100 text-slate-500'
                        }`}
                        style={r.rank === 1 ? { background: '#1A5C38' } : {}}
                      >
                        {r.rank === 1 ? (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        ) : r.rank}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-bold text-sm truncate ${r.rank === 1 ? 'text-green-900' : 'text-slate-800'}`}>
                          {r.bank}
                        </p>
                        <p className={`text-xs mt-0.5 ${r.rank === 1 ? 'text-green-600 font-bold uppercase tracking-wide' : 'text-slate-400'}`}>
                          {r.badge || r.product}
                        </p>
                      </div>
                      <div
                        className={`font-mono font-black text-right ${r.rank === 1 ? 'text-green-700 text-2xl' : 'text-slate-900 text-xl'}`}
                        style={{ letterSpacing: '-1px' }}
                      >
                        {r.rate}%
                      </div>
                    </div>
                  ))}
                </div>

                {/* Card footer */}
                <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
                  <p className="text-xs text-slate-400">Sourced from official bank websites</p>
                  <Link href="/banking/savings-rates" className="text-xs font-bold" style={{ color: '#1A5C38' }}>
                    See all 32 banks →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Live data strip ── */}
        <div className="max-w-6xl mx-auto px-8 pb-20">
          <div
            className="grid grid-cols-5 border border-slate-200 rounded-2xl overflow-hidden bg-white"
            style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}
          >
            {LIVE_DATA.map((d, i) => (
              <div
                key={d.label}
                className="px-6 py-5"
                style={{ borderRight: i < LIVE_DATA.length - 1 ? '1px solid #f1f5f9' : 'none' }}
              >
                <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">{d.label}</p>
                <div className="flex items-baseline gap-1.5 mb-1">
                  <p
                    className="font-mono font-black text-slate-950"
                    style={{ fontSize: '24px', letterSpacing: '-1px', lineHeight: 1 }}
                  >
                    {d.value}
                  </p>
                  {d.trend === 'up' && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="18 15 12 9 6 15" />
                    </svg>
                  )}
                  {d.trend === 'down' && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  )}
                </div>
                <p className="text-xs text-slate-400 font-medium">{d.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════ PILLARS ═══════════════════════════════════════ */}
      <section className="border-b border-slate-100" style={{ background: '#f8faf8', padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">

          {/* Section header */}
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Full market coverage</p>
              <h2
                className="font-serif font-bold text-slate-950"
                style={{ fontSize: '42px', letterSpacing: '-1.5px', lineHeight: 1.1 }}
              >
                Everything in Ethiopia's<br />financial market
              </h2>
            </div>
            <p className="text-slate-400 text-sm font-medium pb-1">214 institutions · 5 pillars</p>
          </div>

          {/* ── Featured: Banking ── */}
          <Link
            href="/banking"
            className="group block bg-white rounded-2xl border border-slate-200 hover:border-green-200 hover:shadow-xl transition-all duration-300 mb-4 overflow-hidden"
            style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}
          >
            <div className="grid grid-cols-2">

              {/* Left: copy */}
              <div style={{ padding: '44px 48px' }}>
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="bg-slate-50 rounded-xl flex items-center justify-center group-hover:bg-green-50 transition-colors"
                    style={{ width: 44, height: 44 }}
                  >
                    {PILLAR_ICONS['Banking']}
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest text-slate-400">Banking</span>
                  <span
                    className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold border"
                    style={{ background: '#f0fdf4', borderColor: '#bbf7d0', color: '#1A5C38' }}
                  >
                    Featured pillar
                  </span>
                </div>
                <p
                  className="font-serif font-bold text-slate-950 mb-4"
                  style={{ fontSize: '30px', letterSpacing: '-1px', lineHeight: 1.2 }}
                >
                  Compare every bank in Ethiopia
                </p>
                <p className="text-slate-500 mb-8" style={{ fontSize: '15px', lineHeight: 1.75 }}>
                  Savings rates, FX rates, loan products and mobile money across every
                  NBE-licensed institution — verified daily from official bank websites.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['32 commercial banks', '55 MFIs', '27 payment operators', '62 transfer agencies'].map((chip) => (
                    <span
                      key={chip}
                      className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-full text-xs font-semibold text-slate-600"
                      style={{ padding: '6px 14px' }}
                    >
                      <span className="w-1 h-1 rounded-full bg-green-500 shrink-0" />
                      {chip}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: live rate */}
              <div
                className="border-l border-slate-100 flex flex-col justify-center"
                style={{ padding: '44px 48px', background: '#f8faf8' }}
              >
                <p className="text-xs font-black uppercase tracking-widest text-green-600 mb-4">
                  Top savings rate today
                </p>
                <p
                  className="font-mono font-black text-slate-950 mb-2"
                  style={{ fontSize: '76px', letterSpacing: '-4px', lineHeight: 1 }}
                >
                  9.50<span style={{ fontSize: '38px', color: '#1A5C38' }}>%</span>
                </p>
                <p className="text-slate-500 font-medium mb-1" style={{ fontSize: '14px' }}>
                  Awash Bank · 12-month fixed deposit
                </p>
                <p className="text-xs text-slate-400 mb-10">NBE verified · Updated today</p>
                <div
                  className="flex items-center gap-2 text-sm font-bold group-hover:gap-3 transition-all"
                  style={{ color: '#1A5C38' }}
                >
                  <span>Compare all 32 banks</span>
                  <ArrowRight />
                </div>
              </div>
            </div>
          </Link>

          {/* ── 4 smaller pillar cards ── */}
          <div className="grid grid-cols-4 gap-4">
            {PILLAR_CARDS.map((p) => (
              <Link
                key={p.label}
                href={p.href}
                className="group bg-white rounded-2xl border border-slate-200 hover:border-green-300 hover:shadow-lg transition-all duration-200 flex flex-col"
                style={{ padding: '32px 28px', boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}
              >
                <div
                  className="bg-slate-50 rounded-xl flex items-center justify-center group-hover:bg-green-50 transition-colors shrink-0 mb-5"
                  style={{ width: 44, height: 44 }}
                >
                  {PILLAR_ICONS[p.icon]}
                </div>
                <p className="font-bold text-slate-900 mb-2" style={{ fontSize: '15px' }}>{p.label}</p>
                <p className="text-slate-400 leading-relaxed flex-1 mb-5" style={{ fontSize: '12px', lineHeight: '1.7' }}>
                  {p.desc}
                </p>
                <div
                  className="flex items-center gap-1 text-xs font-bold mt-auto group-hover:gap-2 transition-all"
                  style={{ color: '#1A5C38' }}
                >
                  <span>{p.stat}</span>
                  <ArrowRight />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════ TRUST ═════════════════════════════════════════ */}
      <section className="bg-white border-b border-slate-100" style={{ padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-16">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Why trust BirrBank</p>
            <h2
              className="font-serif font-bold text-slate-950 mb-5"
              style={{ fontSize: '42px', letterSpacing: '-1.5px' }}
            >
              Built on verified data
            </h2>
            <p className="text-slate-400 mx-auto" style={{ fontSize: '16px', lineHeight: 1.7, maxWidth: '480px' }}>
              No affiliate commissions. No sponsored placements. The best rate is always ranked first.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A5C38" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    <polyline points="9 12 11 14 15 10"/>
                  </svg>
                ),
                tag: 'NBE verified',
                headline: '214 licensed institutions. Zero approximations.',
                body: 'Every institution verified against the National Bank of Ethiopia\'s official registry. We list only what NBE licenses — no unlicensed operators, no grey-market services.',
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A5C38" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                ),
                tag: 'Updated daily',
                headline: 'Every rate shows a verified date.',
                body: 'Stale data is automatically flagged. Any rate older than 7 days appears with a warning badge. You always know how fresh the data is before making a decision.',
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A5C38" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="1" x2="12" y2="23"/>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  </svg>
                ),
                tag: 'No commercial bias',
                headline: 'No affiliate commissions. No sponsored placements.',
                body: 'BirrBank earns nothing from the institutions it lists. The best rate is always #1 regardless of who offers it. Permanently free for every Ethiopian.',
              },
            ].map(({ icon, tag, headline, body }) => (
              <div key={tag} className="border border-slate-100 rounded-2xl" style={{ padding: '36px 32px' }}>
                <div className="w-12 h-12 bg-green-50 border border-green-100 rounded-2xl flex items-center justify-center mb-6">
                  {icon}
                </div>
                <p className="text-xs font-black uppercase tracking-widest text-green-600 mb-3">{tag}</p>
                <h3 className="font-bold text-slate-900 mb-3" style={{ fontSize: '18px', lineHeight: 1.35 }}>{headline}</h3>
                <p className="text-slate-500 leading-relaxed" style={{ fontSize: '14px', lineHeight: '1.75' }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════ EMAIL ══════════════════════════════════════════ */}
      <section className="border-b border-slate-100" style={{ background: '#f8faf8', padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-2 gap-20 items-center">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Weekly intelligence</p>
            <h2
              className="font-serif font-bold text-slate-950 mb-5"
              style={{ fontSize: '42px', letterSpacing: '-1.5px', lineHeight: '1.1' }}
            >
              The best rates.<br />
              <span style={{ color: '#1A5C38' }}>Direct to your inbox.</span>
            </h2>
            <p className="text-slate-500 mb-8" style={{ fontSize: '16px', lineHeight: '1.75' }}>
              Once a week — no noise, no promotions. Just the sharpest moves across
              savings rates, FX, ESX markets and ECX commodity prices.
            </p>
            <ul className="space-y-3">
              {[
                'Savings rate changes across all 32 banks',
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
          </div>
          <EmailCapture />
        </div>
      </section>

    </div>
  )
}
