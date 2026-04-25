import Link from 'next/link'
import EmailCapture from '@/components/EmailCapture'
import { createSupabaseAdminClient } from '@/lib/supabase'
export const dynamic = 'force-dynamic'

const PILLAR = '#1D4ED8'

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

function fmt(val: number | null | undefined) {
  if (val == null) return '—'
  return Number(val).toLocaleString('en-ET', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
function fmtVol(val: number | null | undefined) {
  if (val == null) return '—'
  return (Number(val) / 1000).toFixed(1) + 't'
}

export default async function SesamePricesPage() {
  const supabase = createSupabaseAdminClient()
  const today = new Date().toISOString().split('T')[0]
  const displayDate = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

  const { data: sesameData } = await supabase
    .schema('birrbank')
    .from('commodity_prices')
    .select('*')
    .eq('commodity_type', 'sesame')
    .eq('trade_date', today)
    .order('price_etb', { ascending: false })

  const { count: totalGrades } = await supabase
    .schema('birrbank')
    .from('commodity_prices')
    .select('count', { count: 'exact', head: true })
    .eq('commodity_type', 'sesame')
    .eq('trade_date', today)

  const sesames = sesameData ?? []

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
            ECX daily settlement prices for every Ethiopian sesame grade — Humera white sesame,
            Wollega mixed sesame and more. Prices in ETB per kilogram.
          </p>
          <div className="flex flex-wrap gap-6">
            {[
              { icon: <ClockIcon />, label: 'ECX official daily prices' },
              { icon: <ClockIcon />, label: (totalGrades ?? 0) + ' grades tracked today' },
              { icon: <ClockIcon />, label: 'Humera, Wollega and Gondar origins' },
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
      <section className="bg-white" style={{ padding: '64px 32px 80px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Today ECX settlement prices</p>
            <div className="flex items-center gap-2 shrink-0">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: PILLAR }} />
              <span className="text-xs font-bold rounded-full px-3 py-1.5 border" style={{ color: '#166534', background: '#dcfce7', borderColor: '#bbf7d0' }}>
                ECX · {displayDate}
              </span>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-200" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <div style={{ height: 4, background: 'linear-gradient(90deg, #1D4ED8, #f59e0b)' }} />
            <div className="hidden sm:grid border-b border-slate-200"
              style={{ gridTemplateColumns: '130px 1fr 140px 100px 160px 140px 100px', padding: '13px 24px', background: '#f9fafb' }}>
              {['ECX Code', 'Grade & name', 'Region', 'Grade', 'Price (ETB/kg)', 'Change', 'Volume'].map((h) => (
                <p key={h} className="text-xs font-black text-slate-400 uppercase tracking-widest">{h}</p>
              ))}
            </div>

            {sesames.length > 0 ? sesames.map((c: any, i: number) => {
              const changePos = Number(c.price_change ?? 0) >= 0
              const isTop = i === 0
              return (
                <div key={c.id} className={'border-b border-slate-100 transition-colors ' + (isTop ? 'bg-amber-50' : 'bg-white hover:bg-slate-50')}>
                  <div className="hidden sm:grid items-center"
                    style={{ gridTemplateColumns: '130px 1fr 140px 100px 160px 140px 100px', padding: isTop ? '18px 24px' : '14px 24px' }}>
                    <span className="font-mono font-bold text-xs rounded-lg px-2 py-1 w-fit" style={{ background: '#EFF6FF', color: PILLAR }}>{c.commodity_code}</span>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-slate-800" style={{ fontSize: isTop ? '15px' : '14px' }}>{c.commodity_name}</p>
                      {isTop && <span className="text-xs font-bold rounded-full px-2 py-0.5" style={{ background: '#fef3c7', color: '#92400e' }}>Top price</span>}
                    </div>
                    <p className="text-sm text-slate-500">{c.region_of_origin ?? '—'}</p>
                    <span className="text-xs font-bold rounded-full px-2 py-1 w-fit" style={{ background: '#f1f5f9', color: '#475569' }}>{c.grade ?? '—'}</span>
                    <p className="font-mono font-black text-slate-900" style={{ fontSize: isTop ? '22px' : '18px', letterSpacing: '-0.5px' }}>{fmt(c.price_etb)}</p>
                    <p className={'font-mono font-bold text-sm ' + (changePos ? 'text-green-600' : 'text-red-500')}>
                      {changePos ? '+' : ''}{fmt(c.price_change)} ({changePos ? '+' : ''}{Number(c.price_change_pct ?? 0).toFixed(2)}%)
                    </p>
                    <p className="font-mono text-slate-500 text-sm">{fmtVol(c.volume_kg)}</p>
                  </div>
                  <div className="sm:hidden flex items-center gap-3" style={{ padding: '14px 16px' }}>
                    <span className="font-mono font-bold text-xs rounded-lg px-2 py-1 shrink-0" style={{ background: '#EFF6FF', color: PILLAR }}>{c.commodity_code}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-slate-800 text-sm truncate">{c.commodity_name}</p>
                      <p className="text-xs text-slate-400">{c.region_of_origin ?? '—'} · {c.grade ?? '—'} · {fmtVol(c.volume_kg)}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-mono font-black text-slate-900" style={{ fontSize: '16px' }}>{fmt(c.price_etb)}</p>
                      <p className={'font-mono font-bold text-xs ' + (changePos ? 'text-green-600' : 'text-red-500')}>
                        {changePos ? '+' : ''}{Number(c.price_change_pct ?? 0).toFixed(2)}%
                      </p>
                    </div>
                  </div>
                </div>
              )
            }) : (
              <div className="py-12 text-center">
                <p className="text-slate-500 text-sm">Sesame prices for today are not yet available. ECX publishes prices each trading day.</p>
              </div>
            )}

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
              Ethiopian sesame origins explained.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { origin: 'Humera', region: 'Tigray', notes: 'Ethiopia primary sesame-growing region. Humera white sesame commands premium prices globally for its high oil content, bright white colour and low free fatty acid levels. Grade 1 is the export benchmark.' },
              { origin: 'Wollega', region: 'Oromia', notes: 'Mixed sesame from western Oromia. Lower price point than Humera but significant volume traded on the ECX. Grades 1-3 cover a wide range of export markets including Asia and the Middle East.' },
              { origin: 'Gondar', region: 'Amhara', notes: 'White sesame from Gondar zone. Quality profile close to Humera with competitive pricing. Growing share of ECX trading volume as production in the region expands.' },
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
              All sesame prices are ECX daily settlement prices sourced from ecx.com.et.
              BirrBank does not estimate or interpolate prices. Every figure shown is the
              official ECX closing price for that trading day.
            </p>
          </div>
          <Link href="/commodities" className="font-bold rounded-full shrink-0"
            style={{ fontSize: 14, padding: '14px 28px', background: '#1D4ED8', color: '#fff', whiteSpace: 'nowrap', boxShadow: '0 4px 20px rgba(29,78,216,0.25)' }}>
            All commodities →
          </Link>
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
              for exporters, traders and agribusinesses tracking the market.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Weekly ECX sesame settlement price summary',
                'Grade and origin price movements and trends',
                'Volume and trading activity highlights',
                'ECX market news and export policy updates',
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
