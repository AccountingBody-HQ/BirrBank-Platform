import Link from 'next/link'
import EmailCapture from '@/components/EmailCapture'
export const dynamic = 'force-dynamic'

// ─── Placeholder data — replace with Supabase queries in Phase 2 ─────────────
// All prices in ETB per kg

const COFFEE_GRADES = [
  { code: 'LUBPAA2', name: 'Limu Grade 2',        region: 'Limu',       process: 'Washed',   price: '98,450', change: '+1,200', changePct: '+1.23', volume: '24.5t', badge: 'Top grade' },
  { code: 'LUBPAA3', name: 'Limu Grade 3',        region: 'Limu',       process: 'Washed',   price: '92,100', change: '+850',   changePct: '+0.93', volume: '18.2t', badge: null },
  { code: 'LUBPAA5', name: 'Limu Grade 5',        region: 'Limu',       process: 'Washed',   price: '84,300', change: '-400',   changePct: '-0.47', volume: '12.1t', badge: null },
  { code: 'LUBPDD5', name: 'Djimma Grade 5',      region: 'Djimma',     process: 'Natural',  price: '79,600', change: '+600',   changePct: '+0.76', volume: '31.8t', badge: null },
  { code: 'LUBPDD4', name: 'Djimma Grade 4',      region: 'Djimma',     process: 'Natural',  price: '83,200', change: '+420',   changePct: '+0.51', volume: '22.4t', badge: null },
  { code: 'YRGAA1', name: 'Yirgacheffe Grade 1',  region: 'Yirgacheffe', process: 'Washed',  price: '105,800', change: '+1,500', changePct: '+1.44', volume: '8.3t', badge: 'Premium' },
  { code: 'YRGAA2', name: 'Yirgacheffe Grade 2',  region: 'Yirgacheffe', process: 'Washed',  price: '99,200', change: '+900',   changePct: '+0.92', volume: '14.7t', badge: null },
  { code: 'GDKAA2', name: 'Gedeo Grade 2',        region: 'Gedeo',       process: 'Washed',  price: '96,300', change: '+750',   changePct: '+0.78', volume: '11.2t', badge: null },
  { code: 'HRRA3',  name: 'Harrar Grade 3',       region: 'Harrar',      process: 'Natural', price: '88,700', change: '-200',   changePct: '-0.22', volume: '9.8t',  badge: null },
  { code: 'KFAA2',  name: 'Kaffa Grade 2',        region: 'Kaffa',       process: 'Washed',  price: '94,500', change: '+650',   changePct: '+0.69', volume: '7.6t',  badge: null },
]

const REGIONS = ['All regions', 'Limu', 'Djimma', 'Yirgacheffe', 'Gedeo', 'Harrar', 'Kaffa']

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

export default function CoffeePricesPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ══════════════════════════════ HERO ══════════════════════════════════════ */}
      <section className="relative bg-white overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 900px 500px at 55% -80px, rgba(29,78,216,0.04) 0%, transparent 65%)' }} />
        <div className="relative max-w-6xl mx-auto px-8 pt-20 pb-14">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-6">
            <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
            <span>›</span>
            <Link href="/commodities" className="hover:text-slate-600 transition-colors">Commodities</Link>
            <span>›</span>
            <span style={{ color: PILLAR, fontWeight: 700 }}>Coffee Prices</span>
          </div>
          <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: PILLAR }}>Commodities · Coffee</p>
          <h1 className="font-serif font-bold mb-5 text-slate-950" style={{ fontSize: 'clamp(36px, 4.5vw, 54px)', letterSpacing: '-1.8px', lineHeight: 1.08 }}>
            Ethiopian coffee prices —<br />
            <span style={{ color: PILLAR }}>all grades and origins, daily.</span>
          </h1>
          <p className="text-slate-600 mb-8" style={{ fontSize: '16px', lineHeight: '1.8', maxWidth: '520px' }}>
            ECX daily settlement prices for every Ethiopian coffee grade and origin —
            Limu, Yirgacheffe, Djimma, Harrar and more. Prices in ETB per kilogram.
          </p>
          <div className="flex flex-wrap gap-6">
            {[
              { icon: <ClockIcon />, label: 'ECX official daily prices' },
              { icon: <ClockIcon />, label: 'All grades and origins' },
              { icon: <ClockIcon />, label: 'Washed and natural process' },
              { icon: <ClockIcon />, label: 'Updated every ECX market day' },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <span style={{ color: PILLAR }}>{s.icon}</span>
                <span className="text-xs font-semibold text-slate-500">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ PRICE TABLE ════════════════════════════════ */}
      {/* NO ADS on commodity price pages — neutrality rule */}
      <section className="bg-white" style={{ padding: '64px 32px 80px' }}>
        <div className="max-w-6xl mx-auto">

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Filter by region</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {REGIONS.map((r, i) => (
                  <button key={r} className="rounded-full text-xs font-bold transition-all"
                    style={{ padding: '6px 14px', background: i === 0 ? PILLAR : '#f1f5f9', color: i === 0 ? '#fff' : '#64748b', border: i === 0 ? 'none' : '1px solid #e2e8f0' }}>
                    {r}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: PILLAR }} />
                <span className="text-xs font-bold rounded-full px-3 py-1.5 border" style={{ color: '#166534', background: '#dcfce7', borderColor: '#bbf7d0' }}>
                  ECX · 25 Apr 2026
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-200" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <div style={{ height: 4, background: 'linear-gradient(90deg, #1D4ED8, #f59e0b)' }} />
            <div className="hidden sm:grid border-b border-slate-200"
              style={{ gridTemplateColumns: '130px 1fr 120px 100px 150px 120px 100px', padding: '13px 24px', background: '#f9fafb' }}>
              {['ECX Code', 'Grade & name', 'Region', 'Process', 'Price (ETB/kg)', 'Change', 'Volume'].map((h) => (
                <p key={h} className="text-xs font-black text-slate-400 uppercase tracking-widest">{h}</p>
              ))}
            </div>

            {COFFEE_GRADES.map((c, i) => (
              <div key={c.code} className={`border-b border-slate-100 transition-colors ${i === 0 ? 'bg-amber-50' : 'bg-white hover:bg-slate-50'}`}>
                {/* Desktop */}
                <div className="hidden sm:grid items-center"
                  style={{ gridTemplateColumns: '130px 1fr 120px 100px 150px 120px 100px', padding: i === 0 ? '18px 24px' : '14px 24px' }}>
                  <span className="font-mono font-bold text-xs rounded-lg px-2 py-1 w-fit" style={{ background: '#EFF6FF', color: PILLAR }}>{c.code}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-slate-800" style={{ fontSize: i === 0 ? '15px' : '14px' }}>{c.name}</p>
                      {c.badge && <span className="text-xs font-bold rounded-full px-2 py-0.5" style={{ background: '#fef3c7', color: '#92400e' }}>{c.badge}</span>}
                    </div>
                  </div>
                  <p className="text-sm text-slate-500">{c.region}</p>
                  <span className="text-xs font-bold rounded-full px-2 py-1 w-fit" style={{ background: '#f1f5f9', color: '#475569' }}>{c.process}</span>
                  <p className="font-mono font-black text-slate-900" style={{ fontSize: i === 0 ? '22px' : '18px', letterSpacing: '-0.5px' }}>{c.price}</p>
                  <p className={`font-mono font-bold text-sm ${c.change.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>
                    {c.change} ({c.changePct})
                  </p>
                  <p className="font-mono text-slate-500 text-sm">{c.volume}</p>
                </div>
                {/* Mobile */}
                <div className="sm:hidden flex items-center gap-3" style={{ padding: '14px 16px' }}>
                  <span className="font-mono font-bold text-xs rounded-lg px-2 py-1 shrink-0" style={{ background: '#EFF6FF', color: PILLAR }}>{c.code}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-800 text-sm truncate">{c.name}</p>
                    <p className="text-xs text-slate-400">{c.region} · {c.process} · {c.volume}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-mono font-black text-slate-900" style={{ fontSize: '16px' }}>{c.price}</p>
                    <p className={`font-mono font-bold text-xs ${c.changePct.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>{c.changePct}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex items-center justify-between border-t border-slate-200" style={{ background: '#f9fafb', padding: '14px 24px' }}>
              <p className="text-xs text-slate-400">Source: Ethiopian Commodity Exchange (ecx.com.et) · Prices in ETB per kg · Updated every ECX trading day</p>
              <Link href="/commodities" className="text-xs font-bold hover:underline shrink-0" style={{ color: PILLAR }}>All commodities →</Link>
            </div>
          </div>

          <p className="text-xs text-slate-400 mt-5 text-center leading-relaxed">
            Prices are ECX daily settlement prices for reference only. Actual transaction prices may vary.
            BirrBank is not a commodity broker or trading platform.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════ ORIGINS GUIDE ════════════════════════════ */}
      <section className="border-b border-slate-100" style={{ background: '#f9fafb', padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Origins guide</p>
            <h2 className="font-serif font-bold text-slate-950" style={{ fontSize: 'clamp(26px, 3vw, 36px)', letterSpacing: '-1.2px', lineHeight: 1.15 }}>
              Ethiopian coffee origins explained.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { origin: 'Yirgacheffe', region: 'SNNPR', notes: 'Premium washed coffees with bright acidity, floral and citrus notes. Consistently commands the highest ECX prices. Grade 1 and 2 are most sought after by specialty buyers.' },
              { origin: 'Limu', region: 'Oromia', notes: 'Well-balanced washed coffees with medium acidity and wine-like complexity. Popular in European specialty markets. Grades 2 and 3 are most actively traded on the ECX.' },
              { origin: 'Djimma', region: 'Oromia', notes: 'Primarily natural process. Larger volumes and more accessible prices make Djimma the most traded origin on the ECX. Grade 5 accounts for the highest volume.' },
              { origin: 'Harrar', region: 'Oromia', notes: 'Natural process highland coffee with distinctive blueberry and wine notes. Lower ECX volumes but strong demand from Middle Eastern markets.' },
              { origin: 'Kaffa', region: 'SNNPR', notes: 'The original home of Arabica coffee. Forest and semi-forest coffees with complex profiles. Increasingly sought after for specialty and single-origin roasters.' },
              { origin: 'Gedeo', region: 'SNNPR', notes: 'Overlapping geographically with Yirgacheffe. Washed coffees with similar quality profile but distinct terroir. Growing recognition in international specialty markets.' },
            ].map((o) => (
              <div key={o.origin} className="bg-white rounded-2xl border border-slate-200 overflow-hidden" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                <div style={{ height: 3, background: PILLAR }} />
                <div style={{ padding: '24px' }}>
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-bold text-slate-900" style={{ fontSize: '15px' }}>{o.origin}</p>
                    <span className="text-xs font-bold rounded-full px-2 py-0.5" style={{ background: '#EFF6FF', color: PILLAR }}>{o.region}</span>
                  </div>
                  <p className="text-sm text-slate-500" style={{ lineHeight: 1.75 }}>{o.notes}</p>
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
              ECX official prices. Updated daily.
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: 1.75, maxWidth: 480 }}>
              All coffee prices are ECX daily settlement prices sourced from ecx.com.et.
              BirrBank does not estimate or interpolate prices. Every figure shown is the
              official ECX closing price for that trading day.
            </p>
          </div>
          <div className="flex flex-col gap-3 shrink-0">
            {[
              { dot: '#22c55e', label: 'ECX official source',        sub: 'ecx.com.et daily settlement prices' },
              { dot: PILLAR,    label: 'Updated every trading day',  sub: 'No stale prices shown' },
              { dot: '#94a3b8', label: 'No commercial bias',        sub: 'No broker or exporter pays for placement' },
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
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Coffee price alerts</p>
            <h2 className="font-serif font-bold text-slate-950 mb-5" style={{ fontSize: 'clamp(30px, 3.5vw, 42px)', letterSpacing: '-1.5px', lineHeight: 1.1 }}>
              ECX coffee prices,<br />
              <span style={{ color: PILLAR }}>weekly to your inbox.</span>
            </h2>
            <p className="text-slate-500 mb-8" style={{ fontSize: '15px', lineHeight: 1.85 }}>
              Weekly summary of ECX coffee price movements across all grades and origins —
              for exporters, cooperatives, lenders and investors tracking the market.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Weekly ECX coffee settlement price summary',
                'Grade and origin price movements and trends',
                'Volume and trading activity highlights',
                'ECX market news and policy updates',
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
