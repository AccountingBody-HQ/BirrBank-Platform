import Link from 'next/link'
import EmailCapture from '@/components/EmailCapture'
export const dynamic = 'force-dynamic'

// ─── Placeholder data — replace with Supabase queries in Phase 2 ─────────────
// All prices in ETB per kg

const SESAME_GRADES = [
  { code: 'WHGS1', name: 'White Sesame Grade 1',  origin: 'Humera',     moisture: '5.0%', ffa: '1.5%', price: '52,400', change: '+480',  changePct: '+0.92', volume: '42.3t', badge: 'Top grade' },
  { code: 'WHGS2', name: 'White Sesame Grade 2',  origin: 'Humera',     moisture: '5.5%', ffa: '2.0%', price: '48,200', change: '+320',  changePct: '+0.67', volume: '68.1t', badge: null },
  { code: 'WHGS3', name: 'White Sesame Grade 3',  origin: 'Humera',     moisture: '6.0%', ffa: '2.5%', price: '43,800', change: '-200',  changePct: '-0.45', volume: '31.4t', badge: null },
  { code: 'MXGS1', name: 'Mixed Sesame Grade 1',  origin: 'Wollega',    moisture: '5.5%', ffa: '2.0%', price: '44,600', change: '+250',  changePct: '+0.56', volume: '28.7t', badge: null },
  { code: 'MXGS2', name: 'Mixed Sesame Grade 2',  origin: 'Wollega',    moisture: '6.0%', ffa: '2.5%', price: '40,100', change: '+180',  changePct: '+0.45', volume: '19.2t', badge: null },
  { code: 'MXGS3', name: 'Mixed Sesame Grade 3',  origin: 'Wollega',    moisture: '6.5%', ffa: '3.0%', price: '36,500', change: '-150',  changePct: '-0.41', volume: '11.8t', badge: null },
  { code: 'WHGS2G', name: 'White Sesame G2 Gondar', origin: 'Gondar',   moisture: '5.5%', ffa: '2.0%', price: '47,300', change: '+290',  changePct: '+0.62', volume: '22.6t', badge: null },
]

const ORIGINS = ['All origins', 'Humera', 'Wollega', 'Gondar']

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

export default function SesamePricesPage() {
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
            <span style={{ color: PILLAR, fontWeight: 700 }}>Sesame Prices</span>
          </div>
          <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: PILLAR }}>Commodities · Sesame</p>
          <h1 className="font-serif font-bold mb-5 text-slate-950" style={{ fontSize: 'clamp(36px, 4.5vw, 54px)', letterSpacing: '-1.8px', lineHeight: 1.08 }}>
            Ethiopian sesame prices —<br />
            <span style={{ color: PILLAR }}>all grades and origins, daily.</span>
          </h1>
          <p className="text-slate-600 mb-8" style={{ fontSize: '16px', lineHeight: '1.8', maxWidth: '520px' }}>
            ECX daily settlement prices for white and mixed sesame across all grades and
            origins — Humera, Wollega and Gondar. Prices in ETB per kilogram.
          </p>
          <div className="flex flex-wrap gap-6">
            {[
              { icon: <ClockIcon />, label: 'ECX official daily prices' },
              { icon: <ClockIcon />, label: 'White and mixed sesame grades' },
              { icon: <ClockIcon />, label: 'Moisture and FFA specs included' },
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
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Filter by origin</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {ORIGINS.map((r, i) => (
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
            <div style={{ height: 4, background: 'linear-gradient(90deg, #1D4ED8, #1E40AF)' }} />
            <div className="hidden sm:grid border-b border-slate-200"
              style={{ gridTemplateColumns: '120px 1fr 110px 90px 80px 140px 120px 100px', padding: '13px 24px', background: '#f9fafb' }}>
              {['ECX Code', 'Grade', 'Origin', 'Moisture', 'FFA', 'Price (ETB/kg)', 'Change', 'Volume'].map((h) => (
                <p key={h} className="text-xs font-black text-slate-400 uppercase tracking-widest">{h}</p>
              ))}
            </div>

            {SESAME_GRADES.map((s, i) => (
              <div key={s.code} className={`border-b border-slate-100 transition-colors ${i === 0 ? 'bg-blue-50' : 'bg-white hover:bg-slate-50'}`}>
                {/* Desktop */}
                <div className="hidden sm:grid items-center"
                  style={{ gridTemplateColumns: '120px 1fr 110px 90px 80px 140px 120px 100px', padding: i === 0 ? '18px 24px' : '14px 24px' }}>
                  <span className="font-mono font-bold text-xs rounded-lg px-2 py-1 w-fit" style={{ background: '#EFF6FF', color: PILLAR }}>{s.code}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-slate-800" style={{ fontSize: i === 0 ? '15px' : '14px' }}>{s.name}</p>
                      {s.badge && <span className="text-xs font-bold rounded-full px-2 py-0.5" style={{ background: '#dbeafe', color: PILLAR }}>{s.badge}</span>}
                    </div>
                  </div>
                  <p className="text-sm text-slate-500">{s.origin}</p>
                  <p className="font-mono text-sm text-slate-600">{s.moisture}</p>
                  <p className="font-mono text-sm text-slate-600">{s.ffa}</p>
                  <p className={`font-mono font-black ${i === 0 ? 'text-blue-700' : 'text-slate-900'}`}
                    style={{ fontSize: i === 0 ? '22px' : '18px', letterSpacing: '-0.5px' }}>{s.price}</p>
                  <p className={`font-mono font-bold text-sm ${s.change.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>
                    {s.change} ({s.changePct})
                  </p>
                  <p className="font-mono text-slate-500 text-sm">{s.volume}</p>
                </div>
                {/* Mobile */}
                <div className="sm:hidden flex items-center gap-3" style={{ padding: '14px 16px' }}>
                  <span className="font-mono font-bold text-xs rounded-lg px-2 py-1 shrink-0" style={{ background: '#EFF6FF', color: PILLAR }}>{s.code}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-800 text-sm truncate">{s.name}</p>
                    <p className="text-xs text-slate-400">{s.origin} · Moisture {s.moisture} · {s.volume}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-mono font-black text-slate-900" style={{ fontSize: '16px' }}>{s.price}</p>
                    <p className={`font-mono font-bold text-xs ${s.changePct.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>{s.changePct}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex items-center justify-between border-t border-slate-200" style={{ background: '#f9fafb', padding: '14px 24px' }}>
              <p className="text-xs text-slate-400">Source: Ethiopian Commodity Exchange (ecx.com.et) · Prices in ETB per kg · FFA = Free Fatty Acid content</p>
              <Link href="/commodities" className="text-xs font-bold hover:underline shrink-0" style={{ color: PILLAR }}>All commodities →</Link>
            </div>
          </div>

          <p className="text-xs text-slate-400 mt-5 text-center leading-relaxed">
            Prices are ECX daily settlement prices for reference only. Actual transaction prices may vary.
            BirrBank is not a commodity broker or trading platform.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════ GRADING GUIDE ════════════════════════════ */}
      <section className="border-b border-slate-100" style={{ background: '#f9fafb', padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Grading guide</p>
            <h2 className="font-serif font-bold text-slate-950" style={{ fontSize: 'clamp(26px, 3vw, 36px)', letterSpacing: '-1.2px', lineHeight: 1.15 }}>
              How ECX grades Ethiopian sesame.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'White vs mixed sesame', body: 'White sesame (Humera origin) commands premium prices due to its high oil content, light colour and low impurity levels. Mixed sesame from Wollega and other regions trades at a discount but in higher volumes.' },
              { step: '02', title: 'Moisture content matters', body: 'Lower moisture content means higher quality and longer shelf life. Grade 1 sesame must have moisture below 5%. Each percentage point above this threshold reduces the grade and the price received at the ECX warehouse.' },
              { step: '03', title: 'FFA and oil quality', body: 'Free Fatty Acid (FFA) content determines oil quality. Lower FFA means fresher, higher quality sesame oil. Grade 1 requires FFA below 1.5%. Buyers pay premiums for low-FFA sesame destined for edible oil production.' },
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
            <Link href="/commodities/ecx-guide" className="inline-flex items-center gap-2 text-sm font-bold" style={{ color: PILLAR }}>
              How ECX works <ArrowRight />
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
              ECX official prices. Updated daily.
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: 1.75, maxWidth: 480 }}>
              All sesame prices are ECX daily settlement prices sourced from ecx.com.et.
              BirrBank does not estimate or interpolate prices. Every figure shown is
              the official ECX closing price for that trading day.
            </p>
          </div>
          <div className="flex flex-col gap-3 shrink-0">
            {[
              { dot: '#22c55e', label: 'ECX official source',       sub: 'ecx.com.et daily settlement prices' },
              { dot: PILLAR,    label: 'Updated every trading day', sub: 'No stale prices shown' },
              { dot: '#94a3b8', label: 'No commercial bias',       sub: 'No broker or exporter pays for placement' },
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
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Sesame price alerts</p>
            <h2 className="font-serif font-bold text-slate-950 mb-5" style={{ fontSize: 'clamp(30px, 3.5vw, 42px)', letterSpacing: '-1.5px', lineHeight: 1.1 }}>
              ECX sesame prices,<br />
              <span style={{ color: PILLAR }}>weekly to your inbox.</span>
            </h2>
            <p className="text-slate-500 mb-8" style={{ fontSize: '15px', lineHeight: 1.85 }}>
              Weekly summary of ECX sesame price movements across all grades and origins —
              for exporters, processors and lenders tracking the market.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Weekly ECX sesame settlement price summary',
                'White and mixed sesame grade price movements',
                'Humera, Wollega and Gondar origin differentials',
                'ECX market news and seasonal supply updates',
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
