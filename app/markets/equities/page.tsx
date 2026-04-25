import Link from 'next/link'
import EmailCapture from '@/components/EmailCapture'
export const dynamic = 'force-dynamic'

// ─── Placeholder data — replace with Supabase queries in Phase 2 ─────────────

const LISTED_SECURITIES = [
  {
    ticker: 'WB',
    company: 'Wegagen Bank',
    sector: 'Banking',
    price: '142.50',
    change: '+2.30',
    changePct: '+1.64',
    volume: '124,500',
    mktCap: '4.2B',
    pe: '12.4',
    divYield: '3.2',
    listed: 'Jan 2025',
    badge: 'First listed',
    description: 'One of Ethiopia\'s oldest private commercial banks, Wegagen was the first company to list on the ESX in January 2025.',
  },
  {
    ticker: 'GB',
    company: 'Gadaa Bank',
    sector: 'Banking',
    price: '98.75',
    change: '+0.75',
    changePct: '+0.77',
    volume: '87,200',
    mktCap: '1.8B',
    pe: '9.8',
    divYield: '2.5',
    listed: 'Mar 2025',
    badge: null,
    description: 'Gadaa Bank is a mid-sized commercial bank with strong presence in Oromia region, listed on the ESX in March 2025.',
  },
  {
    ticker: 'EIC',
    company: 'Ethiopian Insurance Corporation',
    sector: 'Insurance',
    price: '210.00',
    change: '-1.50',
    changePct: '-0.71',
    volume: '43,100',
    mktCap: '6.1B',
    pe: '15.2',
    divYield: '1.8',
    listed: 'Jun 2025',
    badge: 'Largest by mkt cap',
    description: 'The state-backed Ethiopian Insurance Corporation is the largest insurer in Ethiopia and the highest market-cap company currently on the ESX.',
  },
]

const INDEX_STATS = [
  { label: 'ESX Composite', value: '1,284.30', change: '+0.84%', sub: 'Index' },
  { label: 'Total volume', value: '254,800', change: '+12.3%', sub: 'Shares traded today' },
  { label: 'Market cap', value: 'ETB 12.1B', change: '+1.4%', sub: 'Total ESX market cap' },
  { label: 'Listed companies', value: '3', change: '45+ in pipeline', sub: 'Active listings' },
]

const ArrowRight = ({ size = 13 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)

const ClockIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
)

const PILLAR = '#1D4ED8'

export default function EquitiesPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ══════════════════════════════ HERO ══════════════════════════════════════ */}
      <section className="relative bg-white overflow-hidden border-b border-slate-100">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 900px 500px at 55% -80px, rgba(29,78,216,0.04) 0%, transparent 65%)' }}
        />
        <div className="relative max-w-6xl mx-auto px-8 pt-20 pb-14">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-6">
            <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
            <span>›</span>
            <Link href="/markets" className="hover:text-slate-600 transition-colors">Markets</Link>
            <span>›</span>
            <span style={{ color: PILLAR, fontWeight: 700 }}>Listed Equities</span>
          </div>

          <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: PILLAR }}>
            Markets · Listed Equities
          </p>
          <h1
            className="font-serif font-bold mb-5 text-slate-950"
            style={{ fontSize: 'clamp(36px, 4.5vw, 54px)', letterSpacing: '-1.8px', lineHeight: 1.08 }}
          >
            All ESX-listed equities —<br />
            <span style={{ color: PILLAR }}>prices, volumes and fundamentals.</span>
          </h1>
          <p className="text-slate-600 mb-8" style={{ fontSize: '16px', lineHeight: '1.8', maxWidth: '520px' }}>
            Every company trading on the Ethiopian Securities Exchange. End-of-day prices,
            volumes, P/E ratios and dividend yields — sourced directly from ESX.
          </p>

          {/* Stats bar */}
          <div className="flex flex-wrap gap-6">
            {[
              { icon: <ClockIcon />, label: '3 companies currently listed' },
              { icon: <ClockIcon />, label: 'End-of-day prices from ESX' },
              { icon: <ClockIcon />, label: '45+ IPOs in pipeline' },
              { icon: <ClockIcon />, label: 'Updated every market day' },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <span style={{ color: PILLAR }}>{s.icon}</span>
                <span className="text-xs font-semibold text-slate-500">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ INDEX STRIP ═══════════════════════════════ */}
      <section className="border-b border-slate-100 bg-white" style={{ padding: '32px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {INDEX_STATS.map((s) => (
              <div key={s.label} className="bg-white rounded-2xl border border-slate-200 overflow-hidden" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                <div style={{ height: 3, background: PILLAR }} />
                <div style={{ padding: '16px 20px' }}>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">{s.label}</p>
                  <p className="font-mono font-black text-slate-950" style={{ fontSize: '20px', letterSpacing: '-0.5px', lineHeight: 1 }}>{s.value}</p>
                  <p className={`text-xs font-semibold mt-1 ${s.change.startsWith('+') ? 'text-green-600' : 'text-slate-400'}`}>{s.change}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ EQUITIES TABLE ════════════════════════════ */}
      {/* NO ADS on securities pages — comparison integrity rule */}
      <section className="bg-white" style={{ padding: '64px 32px 96px' }}>
        <div className="max-w-6xl mx-auto">

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">ESX listed companies</p>
              <h2 className="font-serif font-bold text-slate-950" style={{ fontSize: 'clamp(22px, 2.8vw, 32px)', letterSpacing: '-1px', lineHeight: 1.15 }}>
                Currently trading on the ESX
              </h2>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-100 rounded-full px-3 py-1.5">
                End-of-day · 24 Apr 2026
              </span>
            </div>
          </div>

          {/* Full table */}
          <div className="rounded-2xl overflow-hidden border border-slate-200" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <div style={{ height: 4, background: 'linear-gradient(90deg, #1D4ED8, #a78bfa)' }} />

            {/* Desktop header */}
            <div
              className="hidden lg:grid border-b border-slate-200"
              style={{ gridTemplateColumns: '80px 1fr 120px 120px 110px 100px 90px 110px', padding: '13px 24px', background: '#f9fafb' }}
            >
              {['Ticker', 'Company', 'Sector', 'Price (ETB)', 'Change', 'Volume', 'P/E', 'Div yield'].map((h) => (
                <p key={h} className="text-xs font-black text-slate-400 uppercase tracking-widest">{h}</p>
              ))}
            </div>

            {LISTED_SECURITIES.map((s) => (
              <div
                key={s.ticker}
                className="border-b border-slate-100 bg-white hover:bg-slate-50 transition-colors"
              >
                {/* Desktop */}
                <div
                  className="hidden lg:grid items-center"
                  style={{ gridTemplateColumns: '80px 1fr 120px 120px 110px 100px 90px 110px', padding: '18px 24px' }}
                >
                  <span
                    className="font-mono font-black text-sm rounded-lg px-2 py-1 text-center"
                    style={{ background: '#EFF6FF', color: PILLAR }}
                  >
                    {s.ticker}
                  </span>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-bold text-slate-800" style={{ fontSize: '14px' }}>{s.company}</p>
                      {s.badge && (
                        <span className="text-xs font-bold rounded-full px-2 py-0.5" style={{ background: '#EFF6FF', color: PILLAR }}>
                          {s.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">Listed {s.listed}</p>
                  </div>
                  <p className="text-sm text-slate-500">{s.sector}</p>
                  <p className="font-mono font-black text-slate-900" style={{ fontSize: '20px', letterSpacing: '-0.5px' }}>{s.price}</p>
                  <div>
                    <p className={`font-mono font-bold text-sm ${s.change.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>
                      {s.change}
                    </p>
                    <p className={`font-mono text-xs ${s.changePct.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>
                      {s.changePct}
                    </p>
                  </div>
                  <p className="font-mono text-slate-600 text-sm">{s.volume}</p>
                  <p className="font-mono text-slate-600 text-sm">{s.pe}x</p>
                  <p className="font-mono text-slate-600 text-sm">{s.divYield}%</p>
                </div>

                {/* Tablet / mobile */}
                <div className="lg:hidden flex items-center gap-3" style={{ padding: '14px 16px' }}>
                  <span className="font-mono font-black text-xs rounded-lg px-2 py-1.5 shrink-0" style={{ background: '#EFF6FF', color: PILLAR }}>{s.ticker}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-800 text-sm truncate">{s.company}</p>
                    <p className="text-xs text-slate-400">{s.sector} · Vol {s.volume} · P/E {s.pe}x</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-mono font-black text-slate-900" style={{ fontSize: '18px' }}>{s.price}</p>
                    <p className={`font-mono font-bold text-xs ${s.changePct.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>{s.changePct}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Table footer */}
            <div
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-slate-200"
              style={{ background: '#f9fafb', padding: '14px 24px' }}
            >
              <p className="text-xs text-slate-400">Source: Ethiopian Securities Exchange (esx.et) · End-of-day prices · Updated every market day</p>
              <Link href="/markets/ipo-pipeline" className="text-xs font-bold hover:underline shrink-0" style={{ color: PILLAR }}>
                See 45+ IPOs in pipeline →
              </Link>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-slate-400 mt-5 text-center leading-relaxed">
            Prices are for comparison and informational purposes only. Always verify current prices
            directly with your broker or the ESX before making any investment decision.
            BirrBank is not a broker or financial adviser.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════ COMPANY CARDS ════════════════════════════ */}
      <section className="border-b border-slate-100" style={{ background: '#f9fafb', padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Company profiles</p>
            <h2 className="font-serif font-bold text-slate-950" style={{ fontSize: 'clamp(26px, 3vw, 36px)', letterSpacing: '-1.2px', lineHeight: 1.15 }}>
              About each listed company.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {LISTED_SECURITIES.map((s) => (
              <div key={s.ticker} className="bg-white rounded-2xl border border-slate-200 overflow-hidden" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                <div style={{ height: 3, background: PILLAR }} />
                <div style={{ padding: '28px 24px' }}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono font-black text-sm rounded-lg px-3 py-1.5" style={{ background: '#EFF6FF', color: PILLAR }}>{s.ticker}</span>
                    <div>
                      <p className="font-bold text-slate-900" style={{ fontSize: '14px' }}>{s.company}</p>
                      <p className="text-xs text-slate-400">Listed {s.listed}</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 mb-5" style={{ lineHeight: 1.75 }}>{s.description}</p>
                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100">
                    <div>
                      <p className="text-xs text-slate-400 mb-0.5">Market cap</p>
                      <p className="font-mono font-bold text-slate-800 text-sm">ETB {s.mktCap}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 mb-0.5">Div yield</p>
                      <p className="font-mono font-bold text-slate-800 text-sm">{s.divYield}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 mb-0.5">P/E ratio</p>
                      <p className="font-mono font-bold text-slate-800 text-sm">{s.pe}x</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 mb-0.5">Sector</p>
                      <p className="font-bold text-slate-800 text-sm">{s.sector}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ DARK TRUST ════════════════════════════════ */}
      <section className="border-b border-slate-100" style={{ background: '#0f172a', padding: '72px 32px' }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: '#93c5fd' }}>Data integrity</p>
            <h3 className="font-serif font-bold mb-2" style={{ fontSize: 'clamp(22px, 2.5vw, 30px)', color: '#ffffff', letterSpacing: '-0.8px' }}>
              End-of-day prices. Official ESX source.
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: 1.75, maxWidth: 480 }}>
              All prices are sourced from the Ethiopian Securities Exchange end-of-day feed.
              BirrBank does not display real-time prices — all data is end-of-day and clearly
              timestamped. Never make a trading decision based on this data alone.
            </p>
          </div>
          <div className="flex flex-col gap-3 shrink-0">
            {[
              { dot: '#22c55e', label: 'ESX verified',      sub: 'Official exchange source' },
              { dot: PILLAR,    label: 'End-of-day',          sub: 'Not real-time — timestamped' },
              { dot: '#94a3b8', label: 'No commercial bias', sub: 'Rankings never sold' },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-3 rounded-xl" style={{ background: '#1e293b', border: '1px solid #334155', padding: '14px 20px' }}>
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: s.dot }} />
                <div>
                  <span className="text-sm font-semibold" style={{ color: '#93c5fd' }}>{s.label}</span>
                  <p className="text-xs mt-0.5" style={{ color: '#64748b' }}>{s.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ EMAIL CAPTURE ════════════════════════════ */}
      <section className="bg-white" style={{ padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">ESX market alerts</p>
            <h2 className="font-serif font-bold text-slate-950 mb-5" style={{ fontSize: 'clamp(30px, 3.5vw, 42px)', letterSpacing: '-1.5px', lineHeight: 1.1 }}>
              ESX price updates,<br />
              <span style={{ color: PILLAR }}>direct to your inbox.</span>
            </h2>
            <p className="text-slate-500 mb-8" style={{ fontSize: '15px', lineHeight: 1.85 }}>
              Weekly summary of ESX price movements, index changes and upcoming IPO announcements
              for retail investors and diaspora shareholders.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Weekly ESX price and volume summary',
                'Dividend announcements and payment dates',
                'New IPO listings and subscription windows',
                'NBE and ECMA regulatory updates for investors',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-slate-600">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-xs text-slate-500 font-medium pt-5 border-t border-slate-100">
              Free forever · No credit card · Unsubscribe anytime
            </p>
          </div>
          <EmailCapture />
        </div>
      </section>

    </div>
  )
}
