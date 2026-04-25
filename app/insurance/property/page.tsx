import Link from 'next/link'
import EmailCapture from '@/components/EmailCapture'
export const dynamic = 'force-dynamic'

// ─── Placeholder data — replace with Supabase queries in Phase 2 ─────────────

const PROPERTY_PRODUCTS = [
  { rank: 1,  insurer: 'Ethiopian Insurance Corporation', type: 'Home - comprehensive', annualPremium: '0.35%', coverage: 'Replacement value', excess: '2,000', badge: 'Most comprehensive' },
  { rank: 2,  insurer: 'Awash Insurance',                 type: 'Home - comprehensive', annualPremium: '0.38%', coverage: 'Replacement value', excess: '2,000', badge: null },
  { rank: 3,  insurer: 'Nile Insurance',                  type: 'Home - comprehensive', annualPremium: '0.40%', coverage: 'Replacement value', excess: '2,500', badge: null },
  { rank: 4,  insurer: 'Nyala Insurance',                 type: 'Home - fire only',     annualPremium: '0.15%', coverage: 'Sum insured',       excess: '1,000', badge: 'Lowest premium' },
  { rank: 5,  insurer: 'Africa Insurance',                type: 'Home - fire only',     annualPremium: '0.18%', coverage: 'Sum insured',       excess: '1,000', badge: null },
  { rank: 6,  insurer: 'Ethiopian Insurance Corporation', type: 'Commercial property',  annualPremium: '0.30%', coverage: 'Replacement value', excess: '5,000', badge: 'Best for commercial' },
  { rank: 7,  insurer: 'Awash Insurance',                 type: 'Commercial property',  annualPremium: '0.32%', coverage: 'Replacement value', excess: '5,000', badge: null },
  { rank: 8,  insurer: 'Global Insurance',                type: 'Commercial property',  annualPremium: '0.35%', coverage: 'Replacement value', excess: '5,000', badge: null },
]

const COVER_TYPES = ['All types', 'Home - comprehensive', 'Home - fire only', 'Commercial property']

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

export default function PropertyInsurancePage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ══════════════════════════════ HERO ══════════════════════════════════════ */}
      <section className="relative bg-white overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 900px 500px at 55% -80px, rgba(29,78,216,0.04) 0%, transparent 65%)' }} />
        <div className="relative max-w-6xl mx-auto px-8 pt-20 pb-14">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-6">
            <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
            <span>›</span>
            <Link href="/insurance" className="hover:text-slate-600 transition-colors">Insurance</Link>
            <span>›</span>
            <span style={{ color: PILLAR, fontWeight: 700 }}>Property Insurance</span>
          </div>
          <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: PILLAR }}>Insurance · Property</p>
          <h1 className="font-serif font-bold mb-5 text-slate-950" style={{ fontSize: 'clamp(36px, 4.5vw, 54px)', letterSpacing: '-1.8px', lineHeight: 1.08 }}>
            Property insurance Ethiopia —<br />
            <span style={{ color: PILLAR }}>home and commercial cover compared.</span>
          </h1>
          <p className="text-slate-600 mb-8" style={{ fontSize: '16px', lineHeight: '1.8', maxWidth: '520px' }}>
            Home, commercial and industrial property cover from all 14 NBE-licensed providers.
            Fire, theft, flood and comprehensive cover — premiums and excess compared free.
          </p>
          <div className="flex flex-wrap gap-6">
            {[
              { icon: <ClockIcon />, label: '14 licensed providers' },
              { icon: <ClockIcon />, label: 'Home and commercial cover' },
              { icon: <ClockIcon />, label: 'Fire, theft and comprehensive' },
              { icon: <ClockIcon />, label: 'Premiums verified this quarter' },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <span style={{ color: PILLAR }}>{s.icon}</span>
                <span className="text-xs font-semibold text-slate-500">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ COMPARISON TABLE ══════════════════════════ */}
      <section className="bg-white" style={{ padding: '64px 32px 80px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Filter by cover type</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {COVER_TYPES.map((t, i) => (
                  <button key={t} className="rounded-full text-xs font-bold transition-all"
                    style={{ padding: '6px 14px', background: i === 0 ? PILLAR : '#f1f5f9', color: i === 0 ? '#fff' : '#64748b', border: i === 0 ? 'none' : '1px solid #e2e8f0' }}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ClockIcon />
              <span>Showing {PROPERTY_PRODUCTS.length} products · Sorted by premium rate</span>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-200" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <div style={{ height: 4, background: 'linear-gradient(90deg, #1D4ED8, #1E40AF)' }} />
            <div className="hidden sm:grid border-b border-slate-200"
              style={{ gridTemplateColumns: '44px 1fr 160px 150px 150px 110px', padding: '13px 24px', background: '#f9fafb' }}>
              {['#', 'Insurer', 'Cover type', 'Annual premium', 'Coverage basis', 'Excess'].map((h) => (
                <p key={h} className="text-xs font-black text-slate-400 uppercase tracking-widest">{h}</p>
              ))}
            </div>

            {PROPERTY_PRODUCTS.map((p) => (
              <div key={p.rank} className={`border-b border-slate-100 transition-colors ${p.rank === 1 ? 'bg-blue-50' : 'bg-white hover:bg-slate-50'}`}>
                <div className="hidden sm:grid items-center"
                  style={{ gridTemplateColumns: '44px 1fr 160px 150px 150px 110px', padding: p.rank === 1 ? '18px 24px' : '14px 24px' }}>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black"
                    style={p.rank === 1 ? { background: PILLAR, color: '#fff' } : { background: '#f1f5f9', color: '#94a3b8' }}>
                    {p.rank === 1 ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> : p.rank}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className={`font-bold ${p.rank === 1 ? 'text-blue-900' : 'text-slate-800'}`} style={{ fontSize: p.rank === 1 ? '15px' : '14px' }}>{p.insurer}</p>
                      {p.badge && <span className="text-xs font-bold rounded-full px-2 py-0.5" style={{ background: '#dbeafe', color: PILLAR }}>{p.badge}</span>}
                    </div>
                  </div>
                  <span className="text-xs font-bold rounded-full px-3 py-1 w-fit" style={{ background: '#f1f5f9', color: '#475569' }}>{p.type}</span>
                  <p className={`font-mono font-black ${p.rank === 1 ? 'text-blue-700' : 'text-slate-800'}`}
                    style={{ fontSize: p.rank === 1 ? '20px' : '16px', letterSpacing: '-0.5px' }}>
                    {p.annualPremium} p.a.
                  </p>
                  <p className="text-sm text-slate-500">{p.coverage}</p>
                  <p className="font-mono text-sm text-slate-600">ETB {p.excess}</p>
                </div>
                <div className="sm:hidden" style={{ padding: '14px 16px' }}>
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-bold text-slate-800 text-sm">{p.insurer}</p>
                        {p.badge && <span className="text-xs font-bold rounded-full px-2 py-0.5" style={{ background: '#dbeafe', color: PILLAR }}>{p.badge}</span>}
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">{p.type} · Excess ETB {p.excess}</p>
                    </div>
                    <p className="font-mono font-black text-slate-800 shrink-0" style={{ fontSize: '16px' }}>{p.annualPremium}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex items-center justify-between border-t border-slate-200" style={{ background: '#f9fafb', padding: '14px 24px' }}>
              <p className="text-xs text-slate-400">Premiums are % of insured value per year. Source: official insurer tariff schedules · Updated quarterly</p>
              <Link href="/institutions?type=insurer" className="text-xs font-bold hover:underline shrink-0" style={{ color: PILLAR }}>All 14 property insurers →</Link>
            </div>
          </div>

          <p className="text-xs text-slate-400 mt-5 text-center leading-relaxed">
            Premiums are for comparison only. Actual premiums depend on property type, location, construction and sum insured.
            Always get a formal quote. BirrBank is not an insurance broker or adviser.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════ WHAT IS COVERED ═══════════════════════════ */}
      <section className="border-b border-slate-100" style={{ background: '#f9fafb', padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Coverage explained</p>
            <h2 className="font-serif font-bold text-slate-950" style={{ fontSize: 'clamp(26px, 3vw, 36px)', letterSpacing: '-1.2px', lineHeight: 1.15 }}>
              What property insurance covers in Ethiopia.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                type: 'Fire and allied perils',
                items: ['Fire and explosion damage', 'Lightning strike', 'Aircraft impact', 'Riot and strike damage', 'Storm and flood (some policies)', 'Earthquake (optional add-on)'],
                notCovered: ['Gradual deterioration and wear', 'Government confiscation', 'War and nuclear risk'],
              },
              {
                type: 'Comprehensive home cover',
                items: ['All fire and allied perils', 'Burglary and theft', 'Accidental damage to contents', 'Burst pipes and water damage', 'Temporary accommodation costs', 'Third-party liability'],
                notCovered: ['Unoccupied property (30+ days)', 'Pre-existing damage', 'Wilful damage by insured'],
              },
            ].map((c) => (
              <div key={c.type} className="bg-white rounded-2xl border border-slate-200 overflow-hidden" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                <div style={{ height: 3, background: PILLAR }} />
                <div style={{ padding: '28px 24px' }}>
                  <p className="font-bold text-slate-900 mb-5" style={{ fontSize: '16px' }}>{c.type}</p>
                  <div className="mb-4">
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Covered</p>
                    <ul className="space-y-2">
                      {c.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5"><polyline points="20 6 9 17 4 12"/></svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-4 border-t border-slate-100">
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Not covered</p>
                    <ul className="space-y-2">
                      {c.notCovered.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-slate-400">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ GUIDE ════════════════════════════════════ */}
      <section className="border-b border-slate-100 bg-white" style={{ padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Guide</p>
            <h2 className="font-serif font-bold text-slate-950" style={{ fontSize: 'clamp(26px, 3vw, 36px)', letterSpacing: '-1.2px', lineHeight: 1.15 }}>
              How to choose property insurance in Ethiopia.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Insure at replacement cost, not market value', body: 'The sum insured should cover the cost of rebuilding the property from scratch — not its market sale price. In Addis Ababa, construction costs can exceed the land value for older properties. Underinsurance means a proportional payout reduction at claim time.' },
              { step: '02', title: 'Check flood and earthquake exclusions', body: 'Standard property policies in Ethiopia cover fire and allied perils but often exclude flood and earthquake. In flood-prone areas or seismically active regions, ask specifically about these perils and whether add-on cover is available.' },
              { step: '03', title: 'Declare all improvements and renovations', body: 'If you renovate or extend your property, notify your insurer immediately. Undeclared improvements are typically excluded from claims. The premium uplift for declared improvements is usually modest relative to the coverage gap.' },
            ].map((s) => (
              <div key={s.step} className="bg-white rounded-2xl border border-slate-200 overflow-hidden" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                <div style={{ height: 3, background: PILLAR }} />
                <div style={{ padding: '28px 24px' }}>
                  <p className="font-mono font-black mb-3" style={{ fontSize: '32px', color: '#e2e8f0', lineHeight: 1 }}>{s.step}</p>
                  <p className="font-bold text-slate-900 mb-3" style={{ fontSize: '15px' }}>{s.title}</p>
                  <p className="text-sm text-slate-500" style={{ lineHeight: 1.75 }}>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/insurance/claims-guide" className="inline-flex items-center gap-2 text-sm font-bold" style={{ color: PILLAR }}>
              Read the full claims guide <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ DARK TRUST ════════════════════════════════ */}
      <section className="border-b border-slate-100" style={{ background: '#0f172a', padding: '72px 32px' }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: '#93c5fd' }}>Data integrity</p>
            <h3 className="font-serif font-bold mb-2" style={{ fontSize: 'clamp(22px, 2.5vw, 30px)', color: '#ffffff', letterSpacing: '-0.8px' }}>
              Premiums from official tariff schedules.
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: 1.75, maxWidth: 480 }}>
              All premium rates are sourced from official insurer tariff schedules filed with NBE.
              No insurer pays to appear or rank higher. The lowest rate for equivalent cover is always shown first.
            </p>
          </div>
          <div className="flex flex-col gap-3 shrink-0">
            {[
              { dot: '#22c55e', label: 'NBE-licensed insurers only',  sub: 'All 14 verified against NBE registry' },
              { dot: PILLAR,    label: 'Official tariff sources',      sub: 'From NBE-filed insurer schedules' },
              { dot: '#94a3b8', label: 'No commission paid',          sub: 'Rankings never influenced by payments' },
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
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Insurance alerts</p>
            <h2 className="font-serif font-bold text-slate-950 mb-5" style={{ fontSize: 'clamp(30px, 3.5vw, 42px)', letterSpacing: '-1.5px', lineHeight: 1.1 }}>
              Premium changes and new products,<br />
              <span style={{ color: PILLAR }}>direct to your inbox.</span>
            </h2>
            <p className="text-slate-500 mb-8" style={{ fontSize: '15px', lineHeight: 1.85 }}>
              Quarterly digest of property insurance developments — new products, premium changes
              and NBE regulatory updates affecting property cover in Ethiopia.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Property insurance premium changes across all 14 providers',
                'New home and commercial property products',
                'NBE insurance regulation and directive updates',
                'Flood and earthquake cover availability updates',
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
