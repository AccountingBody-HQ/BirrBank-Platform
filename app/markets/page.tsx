import Link from 'next/link'
import EmailCapture from '@/components/EmailCapture'
export const dynamic = 'force-dynamic'

// ─── Placeholder data — replace with Supabase queries in Phase 2 ─────────────

const LISTED_SECURITIES = [
  { ticker: 'WB',  company: 'Wegagen Bank',  sector: 'Banking',     price: '142.50', change: '+2.30', changePct: '+1.64', volume: '124,500', mktCap: '4.2B',  listed: 'Jan 2025', badge: 'First listed' },
  { ticker: 'GB',  company: 'Gadaa Bank',    sector: 'Banking',     price: '98.75',  change: '+0.75', changePct: '+0.77', volume: '87,200',  mktCap: '1.8B',  listed: 'Mar 2025', badge: null },
  { ticker: 'EIC', company: 'Ethiopian Insurance Corporation', sector: 'Insurance', price: '210.00', change: '-1.50', changePct: '-0.71', volume: '43,100', mktCap: '6.1B', listed: 'Jun 2025', badge: null },
]

const IPO_PIPELINE = [
  { company: 'Awash Bank',             sector: 'Banking',   status: 'Under review',  shares: '500M',  offerPrice: '—',      manager: 'CBE Capital' },
  { company: 'Bank of Abyssinia',      sector: 'Banking',   status: 'Under review',  shares: '350M',  offerPrice: '—',      manager: 'Wegagen Capital' },
  { company: 'Dashen Bank',            sector: 'Banking',   status: 'Announced',     shares: '420M',  offerPrice: '—',      manager: 'TBA' },
  { company: 'Oromia International',   sector: 'Banking',   status: 'Announced',     shares: '280M',  offerPrice: '—',      manager: 'TBA' },
  { company: 'Ethio Telecom',          sector: 'Telecoms',  status: 'Announced',     shares: '1.2B',  offerPrice: '—',      manager: 'TBA' },
]

const TBILLS = [
  { tenor: '28-day',  yield: '7.20', lastAuction: '21 Apr 2026', minInvest: 'ETB 1,000',  issuer: 'NBE' },
  { tenor: '91-day',  yield: '8.10', lastAuction: '21 Apr 2026', minInvest: 'ETB 1,000',  issuer: 'NBE' },
  { tenor: '182-day', yield: '8.75', lastAuction: '14 Apr 2026', minInvest: 'ETB 5,000',  issuer: 'NBE' },
  { tenor: '364-day', yield: '9.15', lastAuction: '07 Apr 2026', minInvest: 'ETB 10,000', issuer: 'NBE' },
]

const SUB_CATEGORIES = [
  {
    label: 'Listed Equities',
    href: '/markets/equities',
    desc: 'Track all ESX-listed companies — prices, volumes, P/E ratios and dividends.',
    stat: '3 listed',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    label: 'IPO Pipeline',
    href: '/markets/ipo-pipeline',
    desc: '45+ prospectuses under ECMA review. Track upcoming listings before they open.',
    stat: '45+ IPOs',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/>
      </svg>
    ),
  },
  {
    label: 'Bonds & T-Bills',
    href: '/markets/bonds',
    desc: 'NBE Treasury bill auction results — yields, tenors and minimum investments.',
    stat: '9.15% best yield',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
  },
  {
    label: 'How to Invest',
    href: '/markets/how-to-invest',
    desc: 'Step-by-step guide to opening a brokerage account and buying ESX-listed shares.',
    stat: 'Beginner guide',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
  },
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
const PILLAR_BG = '#EFF6FF'

export default function MarketsPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ══════════════════════════════ HERO ══════════════════════════════════════ */}
      <section className="relative bg-white overflow-hidden border-b border-slate-100">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 900px 500px at 55% -80px, rgba(29,78,216,0.04) 0%, transparent 65%)' }}
        />
        <div className="relative max-w-6xl mx-auto px-8 pt-20 pb-12">
          <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: PILLAR }}>Markets</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            <div>
              <h1
                className="font-serif font-bold mb-5 text-slate-950"
                style={{ fontSize: 'clamp(38px, 4.5vw, 56px)', letterSpacing: '-1.8px', lineHeight: 1.08 }}
              >
                Ethiopia's capital<br />
                <span style={{ color: PILLAR }}>markets, tracked.</span>
              </h1>
              <p className="text-slate-600 mb-8" style={{ fontSize: '16px', lineHeight: '1.8', maxWidth: '440px' }}>
                ESX-listed equities, the full IPO pipeline and Treasury bill yields —
                the complete intelligence layer for Ethiopian capital markets.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/markets/equities"
                  className="font-bold rounded-full transition-all"
                  style={{ fontSize: 15, padding: '14px 32px', minWidth: 200, textAlign: 'center', background: PILLAR, color: '#fff', boxShadow: '0 4px 20px rgba(29,78,216,0.20)' }}
                >
                  View listed equities
                </Link>
                <Link
                  href="/markets/ipo-pipeline"
                  className="font-bold rounded-full transition-all"
                  style={{ fontSize: 15, padding: '14px 32px', minWidth: 200, textAlign: 'center', border: '2px solid #1D4ED8', color: PILLAR, background: 'transparent' }}
                >
                  IPO pipeline
                </Link>
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: '3',    label: 'ESX-listed',       sub: 'companies' },
                { value: '45+',  label: 'IPOs in review',   sub: 'ECMA pipeline' },
                { value: '9.15%', label: 'Best T-bill yield', sub: '364-day tenor' },
              ].map((s) => (
                <div key={s.label} className="bg-white rounded-2xl border border-slate-200 text-center" style={{ padding: '20px 12px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                  <p className="font-mono font-black mb-1" style={{ fontSize: '20px', letterSpacing: '-1px', color: PILLAR }}>{s.value}</p>
                  <p className="font-semibold text-slate-700 mb-0.5" style={{ fontSize: '11px' }}>{s.label}</p>
                  <p className="text-slate-400" style={{ fontSize: '10px' }}>{s.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ SUB-CATEGORIES ════════════════════════════ */}
      <section className="border-b border-slate-100" style={{ background: '#f8faf8', padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">What we cover</p>
            <h2 className="font-serif font-bold text-slate-950" style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', letterSpacing: '-1.2px', lineHeight: 1.1 }}>
              The full Ethiopian capital markets picture.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SUB_CATEGORIES.map((cat) => (
              <Link
                key={cat.label}
                href={cat.href}
                className="group bg-white rounded-2xl border border-slate-200 hover:shadow-xl transition-all duration-200 flex flex-col overflow-hidden"
                style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
              >
                <div style={{ height: 3, background: PILLAR }} />
                <div className="flex gap-4 items-start" style={{ padding: '24px' }}>
                  <div className="rounded-xl flex items-center justify-center shrink-0" style={{ width: 48, height: 48, background: PILLAR_BG }}>
                    {cat.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-900 mb-1.5" style={{ fontSize: '15px' }}>{cat.label}</p>
                    <p className="text-slate-500 text-xs mb-3" style={{ lineHeight: '1.7' }}>{cat.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400">{cat.stat}</span>
                      <div className="flex items-center gap-1 text-xs font-bold group-hover:gap-2 transition-all" style={{ color: '#1D4ED8' }}>
                        <span>Explore</span><ArrowRight size={11} />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ LISTED SECURITIES ════════════════════════ */}
      {/* NO ADS on securities pages — must appear objective */}
      <section className="border-b border-slate-100 bg-white" style={{ padding: '96px 32px' }}>
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

          <div className="rounded-2xl overflow-hidden border border-slate-200" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <div style={{ height: 4, background: `linear-gradient(90deg, ${PILLAR}, #a78bfa)` }} />
            <div
              className="hidden sm:grid border-b border-slate-200"
              style={{ gridTemplateColumns: '80px 1fr 120px 110px 110px 110px 110px', padding: '12px 24px', background: '#f8fafc' }}
            >
              {['Ticker', 'Company', 'Sector', 'Price (ETB)', 'Change', 'Volume', 'Mkt Cap'].map((h) => (
                <p key={h} className="text-xs font-black text-slate-400 uppercase tracking-widest">{h}</p>
              ))}
            </div>

            {LISTED_SECURITIES.map((s) => (
              <Link
                key={s.ticker}
                href={`/markets/${s.ticker.toLowerCase()}`}
                className="block border-b border-slate-100 bg-white hover:bg-slate-50 transition-colors"
              >
                {/* Desktop */}
                <div
                  className="hidden sm:grid items-center"
                  style={{ gridTemplateColumns: '80px 1fr 120px 110px 110px 110px 110px', padding: '16px 24px' }}
                >
                  <span className="font-mono font-black text-sm rounded-lg px-2 py-1 text-center" style={{ background: PILLAR_BG, color: PILLAR }}>{s.ticker}</span>
                  <div>
                    <p className="font-bold text-slate-800" style={{ fontSize: '14px' }}>{s.company}</p>
                    {s.badge && <span className="text-xs font-bold rounded-full px-2 py-0.5 mt-0.5 inline-block" style={{ background: '#f8faf8', color: PILLAR }}>{s.badge}</span>}
                  </div>
                  <p className="text-sm text-slate-500">{s.sector}</p>
                  <p className="font-mono font-black text-slate-900" style={{ fontSize: '18px', letterSpacing: '-0.5px' }}>{s.price}</p>
                  <p className={`font-mono font-bold text-sm ${s.change.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>
                    {s.change} ({s.changePct})
                  </p>
                  <p className="font-mono text-slate-600 text-sm">{s.volume}</p>
                  <p className="text-slate-600 text-sm">ETB {s.mktCap}</p>
                </div>
                {/* Mobile */}
                <div className="sm:hidden flex items-center gap-3" style={{ padding: '14px 16px' }}>
                  <span className="font-mono font-black text-xs rounded-lg px-2 py-1.5 shrink-0" style={{ background: PILLAR_BG, color: PILLAR }}>{s.ticker}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-800 text-sm truncate">{s.company}</p>
                    <p className="text-xs text-slate-400">{s.sector} · Vol {s.volume}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-mono font-black text-slate-900" style={{ fontSize: '18px' }}>{s.price}</p>
                    <p className={`font-mono font-bold text-xs ${s.change.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>{s.changePct}</p>
                  </div>
                </div>
              </Link>
            ))}

            <div className="flex items-center justify-between bg-slate-50 border-t border-slate-200" style={{ padding: '14px 24px' }}>
              <p className="text-xs text-slate-400">Source: Ethiopian Securities Exchange (esx.et) · End-of-day prices</p>
              <Link href="/markets/equities" className="text-xs font-bold hover:underline shrink-0" style={{ color: '#1D4ED8' }}>
                Full equities view →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ IPO PIPELINE ═════════════════════════════ */}
      <section className="border-b border-slate-100" style={{ background: '#f8faf8', padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">IPO pipeline</p>
              <h2 className="font-serif font-bold text-slate-950" style={{ fontSize: 'clamp(22px, 2.8vw, 32px)', letterSpacing: '-1px', lineHeight: 1.15 }}>
                45+ prospectuses under ECMA review
              </h2>
            </div>
            <Link href="/markets/ipo-pipeline" className="inline-flex items-center gap-2 text-sm font-bold shrink-0" style={{ color: '#1D4ED8' }}>
              Full pipeline <ArrowRight />
            </Link>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-200" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
            <div style={{ height: 4, background: `linear-gradient(90deg, ${PILLAR}, #a78bfa)` }} />
            <div
              className="hidden sm:grid border-b border-slate-200"
              style={{ gridTemplateColumns: '1fr 120px 100px 120px 160px', padding: '12px 24px', background: '#f8fafc' }}
            >
              {['Company', 'Sector', 'Shares', 'Lead manager', 'Status'].map((h) => (
                <p key={h} className="text-xs font-black text-slate-400 uppercase tracking-widest">{h}</p>
              ))}
            </div>

            {IPO_PIPELINE.map((ipo) => (
              <div
                key={ipo.company}
                className="hidden sm:grid items-center border-b border-slate-100 bg-white hover:bg-slate-50 transition-colors"
                style={{ gridTemplateColumns: '1fr 120px 100px 120px 160px', padding: '14px 24px' }}
              >
                <p className="font-bold text-slate-800" style={{ fontSize: '14px' }}>{ipo.company}</p>
                <p className="text-sm text-slate-500">{ipo.sector}</p>
                <p className="font-mono text-sm text-slate-600">{ipo.shares}</p>
                <p className="text-sm text-slate-500">{ipo.manager}</p>
                <span
                  className="text-xs font-bold rounded-full px-3 py-1 inline-flex w-fit items-center gap-1.5"
                  style={ipo.status === 'Under review'
                    ? { background: '#fef3c7', color: '#92400e' }
                    : { background: '#f8faf8', color: PILLAR }}
                >
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: ipo.status === 'Under review' ? '#f59e0b' : PILLAR }} />
                  {ipo.status}
                </span>
              </div>
            ))}

            {/* Mobile IPO rows */}
            {IPO_PIPELINE.map((ipo) => (
              <div key={ipo.company + '-mob'} className="sm:hidden border-b border-slate-100 bg-white" style={{ padding: '14px 16px' }}>
                <div className="flex items-center justify-between">
                  <p className="font-bold text-slate-800 text-sm">{ipo.company}</p>
                  <span className="text-xs font-bold rounded-full px-2 py-0.5" style={ipo.status === 'Under review' ? { background: '#fef3c7', color: '#92400e' } : { background: '#f8faf8', color: PILLAR }}>
                    {ipo.status}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">{ipo.sector} · {ipo.shares} shares · {ipo.manager}</p>
              </div>
            ))}

            <div className="flex items-center justify-between bg-slate-50 border-t border-slate-200" style={{ padding: '14px 24px' }}>
              <p className="text-xs text-slate-400">Source: ECMA (Ethiopian Capital Markets Authority) · Updated monthly</p>
              <Link href="/markets/ipo-pipeline" className="text-xs font-bold hover:underline shrink-0" style={{ color: '#1D4ED8' }}>
                See all 45+ IPOs →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ T-BILLS ══════════════════════════════════ */}
      <section className="border-b border-slate-100 bg-white" style={{ padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Treasury bills</p>
              <h2 className="font-serif font-bold text-slate-950" style={{ fontSize: 'clamp(22px, 2.8vw, 32px)', letterSpacing: '-1px', lineHeight: 1.15 }}>
                NBE T-bill auction yields
              </h2>
            </div>
            <Link href="/markets/bonds" className="inline-flex items-center gap-2 text-sm font-bold shrink-0" style={{ color: '#1D4ED8' }}>
              Full bonds & T-bills <ArrowRight />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TBILLS.map((t) => (
              <div key={t.tenor} className="bg-white rounded-2xl border border-slate-200 overflow-hidden" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                <div style={{ height: 3, background: PILLAR }} />
                <div style={{ padding: '24px' }}>
                  <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: PILLAR }}>{t.tenor} T-Bill</p>
                  <p className="font-mono font-black text-slate-950 mb-1" style={{ fontSize: '32px', letterSpacing: '-1px', lineHeight: 1 }}>{t.yield}%</p>
                  <p className="text-xs text-slate-400 mb-4">Annual yield</p>
                  <div className="space-y-1.5 pt-3 border-t border-slate-100">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Min. investment</span>
                      <span className="font-semibold text-slate-700">{t.minInvest}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Last auction</span>
                      <span className="font-semibold text-slate-700">{t.lastAuction}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Issuer</span>
                      <span className="font-semibold text-slate-700">{t.issuer}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-5 text-center">
            T-bill yields from NBE auction results · nbe.gov.et/exchange/treasury-bill-auction-results/ · For comparison only
          </p>
        </div>
      </section>

      {/* ══════════════════════════════ DARK TRUST ════════════════════════════════ */}
      <section className="border-b border-slate-100" style={{ background: '#0f172a', padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: '#93c5fd' }}>Why BirrBank for markets</p>
            <h2 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(26px, 3.5vw, 38px)', letterSpacing: '-1.2px', color: '#ffffff' }}>
              The only platform with the full picture.
            </h2>
            <p className="mx-auto" style={{ fontSize: '16px', lineHeight: 1.75, maxWidth: '480px', color: '#94a3b8' }}>
              ESX equities, the IPO pipeline, T-bill yields — and the dual view that shows
              a bank as both a deposit product and an investable equity, on one page.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
                tag: 'ESX coverage',
                headline: 'Every listed security tracked daily.',
                body: 'End-of-day prices, volumes and indices sourced from the Ethiopian Securities Exchange. Updated every market day.',
              },
              {
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg>,
                tag: 'IPO intelligence',
                headline: '45+ prospectuses. Updated monthly.',
                body: 'The most comprehensive IPO pipeline tracker in Ethiopia. Every ECMA-filed prospectus monitored from announcement to listing.',
              },
              {
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>,
                tag: 'Dual-view innovation',
                headline: 'Savings rate and stock price. One page.',
                body: "When a bank lists on the ESX, BirrBank shows its deposit rates alongside its share price — the only platform that holds both datasets simultaneously.",
              },
            ].map(({ icon, tag, headline, body }) => (
              <div key={tag} className="rounded-2xl flex flex-col" style={{ padding: '36px 32px', background: '#1e293b', border: '1px solid #1e293b', minHeight: '260px' }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-6" style={{ background: '#334155', border: '1px solid #475569' }}>
                  {icon}
                </div>
                <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: '#93c5fd' }}>{tag}</p>
                <h3 className="font-bold mb-3" style={{ fontSize: '16px', lineHeight: 1.4, color: '#ffffff' }}>{headline}</h3>
                <p className="text-sm" style={{ lineHeight: '1.85', color: '#94a3b8' }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ EMAIL CAPTURE ════════════════════════════ */}
      <section className="bg-white" style={{ padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Markets intelligence</p>
            <h2 className="font-serif font-bold text-slate-950 mb-5" style={{ fontSize: 'clamp(30px, 3.5vw, 42px)', letterSpacing: '-1.5px', lineHeight: 1.1 }}>
              ESX updates and IPO alerts,<br />
              <span style={{ color: '#1D4ED8' }}>direct to your inbox.</span>
            </h2>
            <p className="text-slate-500 mb-8" style={{ fontSize: '15px', lineHeight: 1.85 }}>
              Weekly markets digest for retail investors and diaspora. Know before the IPO opens.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'ESX weekly price summary and index movement',
                'New IPO announcements and prospectus filings',
                'T-bill auction results and yield changes',
                'NBE and ECMA regulatory updates affecting investors',
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
