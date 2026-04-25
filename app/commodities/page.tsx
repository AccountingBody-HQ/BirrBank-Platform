import Link from 'next/link'
import EmailCapture from '@/components/EmailCapture'
import { createSupabaseAdminClient } from '@/lib/supabase'
export const dynamic = 'force-dynamic'

const PILLAR = '#1D4ED8'
const PILLAR_BG = '#EFF6FF'

const SUB_CATEGORIES = [
  { label: 'Coffee Prices', href: '/commodities/coffee', desc: "Multiple grade and origin prices from Ethiopia largest export commodity.", stat: 'World 5th largest producer',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22V12M12 12C12 6 7 4 7 4s5 2 5 8z"/><path d="M12 12C12 6 17 4 17 4s-5 2-5 8z"/><line x1="8" y1="22" x2="16" y2="22"/></svg> },
  { label: 'Sesame Prices', href: '/commodities/sesame', desc: 'White and mixed sesame grade prices — Ethiopia is a top global exporter.', stat: 'Major export crop',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="12" rx="4" ry="8"/><path d="M12 4C8 4 4 8 4 12s4 8 8 8"/><path d="M12 4c4 0 8 4 8 8s-4 8-8 8"/></svg> },
  { label: 'Grain Prices', href: '/commodities/grains', desc: 'Wheat, beans and soybean prices from the ECX daily ticker.', stat: 'Food security data',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 0 1 10 10H2A10 10 0 0 1 12 2z"/><line x1="12" y1="12" x2="12" y2="22"/><path d="M8 16s1-1 4-1 4 1 4 1"/></svg> },
  { label: 'How ECX Works', href: '/commodities/ecx-guide', desc: 'Guide to the Ethiopian Commodity Exchange — trading, grading and price discovery.', stat: 'Beginner guide',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg> },
]

const ArrowRight = ({ size = 13 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
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

export default async function CommoditiesPage() {
  const supabase = createSupabaseAdminClient()
  const today = new Date().toISOString().split('T')[0]
  const displayDate = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

  // Top coffee prices
  const { data: coffeeData } = await supabase
    .schema('birrbank')
    .from('commodity_prices')
    .select('*')
    .eq('commodity_type', 'coffee')
    .eq('trade_date', today)
    .order('price_etb', { ascending: false })
    .limit(4)

  // Other commodities — sesame, beans, grains
  const { data: otherData } = await supabase
    .schema('birrbank')
    .from('commodity_prices')
    .select('*')
    .in('commodity_type', ['sesame', 'bean', 'grain', 'soybean', 'chickpea'])
    .eq('trade_date', today)
    .order('price_etb', { ascending: false })
    .limit(4)

  // Total commodity codes tracked today
  const { count: totalCodes } = await supabase
    .schema('birrbank')
    .from('commodity_prices')
    .select('count', { count: 'exact', head: true })
    .eq('trade_date', today)

  const coffees = coffeeData ?? []
  const others  = otherData ?? []

  return (
    <div className="min-h-screen bg-white">

      {/* ══════════════════════════════ HERO ══════════════════════════════════════ */}
      <section className="relative bg-white overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 900px 500px at 55% -80px, rgba(29,78,216,0.04) 0%, transparent 65%)' }} />
        <div className="relative max-w-6xl mx-auto px-8 pt-20 pb-12">
          <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: PILLAR }}>Commodities</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            <div>
              <h1 className="font-serif font-bold mb-5 text-slate-950" style={{ fontSize: 'clamp(38px, 4.5vw, 56px)', letterSpacing: '-1.8px', lineHeight: 1.08 }}>
                ECX commodity prices —<br />
                <span style={{ color: PILLAR }}>coffee, sesame, grains.</span>
              </h1>
              <p className="text-slate-600 mb-8" style={{ fontSize: '16px', lineHeight: '1.8', maxWidth: '440px' }}>
                Daily prices from the Ethiopian Commodity Exchange across all grades and origins.
                The only financial platform integrating commodity data with banking and investment intelligence.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/commodities/coffee" className="font-bold rounded-full transition-all"
                  style={{ fontSize: 15, padding: '14px 32px', minWidth: 200, textAlign: 'center', background: PILLAR, color: '#fff', boxShadow: '0 4px 20px rgba(29,78,216,0.20)' }}>
                  Coffee prices
                </Link>
                <Link href="/commodities/sesame" className="font-bold rounded-full transition-all"
                  style={{ fontSize: 15, padding: '14px 32px', minWidth: 200, textAlign: 'center', border: '2px solid #1D4ED8', color: PILLAR, background: 'transparent' }}>
                  Sesame prices
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: 'Daily',                      label: 'ECX price updates', sub: 'Every market day' },
                { value: '5th',                        label: 'Coffee producer',    sub: 'Ethiopia globally' },
                { value: (totalCodes ?? 0).toString(), label: 'Codes tracked',      sub: 'Today on ECX' },
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
      <section className="border-b border-slate-100" style={{ background: '#f9fafb', padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">What we cover</p>
            <h2 className="font-serif font-bold text-slate-950" style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', letterSpacing: '-1.2px', lineHeight: 1.1 }}>
              Every ECX commodity, tracked.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SUB_CATEGORIES.map((cat) => (
              <Link key={cat.label} href={cat.href}
                className="group bg-white rounded-2xl border border-slate-200 hover:shadow-xl transition-all duration-200 flex flex-col overflow-hidden"
                style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                <div style={{ height: 3, background: PILLAR }} />
                <div className="flex gap-4 items-start" style={{ padding: '24px' }}>
                  <div className="rounded-xl flex items-center justify-center shrink-0" style={{ width: 48, height: 48, background: PILLAR_BG }}>{cat.icon}</div>
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

      {/* ══════════════════════════════ COFFEE PRICES ════════════════════════════ */}
      <section className="border-b border-slate-100 bg-white" style={{ padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Coffee — ECX daily</p>
              <h2 className="font-serif font-bold text-slate-950" style={{ fontSize: 'clamp(22px, 2.8vw, 32px)', letterSpacing: '-1px', lineHeight: 1.15 }}>
                Coffee grade prices — today
              </h2>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: PILLAR }} />
                <span className="text-xs font-bold rounded-full px-3 py-1.5 border" style={{ color: '#166534', background: '#dcfce7', borderColor: '#bbf7d0' }}>
                  ECX · {displayDate}
                </span>
              </div>
              <Link href="/commodities/coffee" className="inline-flex items-center gap-1.5 text-sm font-bold" style={{ color: '#1D4ED8' }}>
                All grades <ArrowRight />
              </Link>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-200" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <div style={{ height: 4, background: 'linear-gradient(90deg, #1D4ED8, #f59e0b)' }} />
            <div className="hidden sm:grid border-b border-slate-200"
              style={{ gridTemplateColumns: '120px 1fr 120px 140px 110px 100px', padding: '12px 24px', background: '#f9fafb' }}>
              {['ECX Code', 'Grade & Origin', 'Region', 'Price (ETB/kg)', 'Change', 'Volume'].map((h) => (
                <p key={h} className="text-xs font-black text-slate-400 uppercase tracking-widest">{h}</p>
              ))}
            </div>

            {coffees.length > 0 ? coffees.map((c: any, i: number) => {
              const changePos = Number(c.price_change ?? 0) >= 0
              return (
                <div key={c.id} className={'border-b border-slate-100 transition-colors ' + (i === 0 ? 'bg-amber-50' : 'bg-white hover:bg-slate-50')}>
                  <div className="hidden sm:grid items-center"
                    style={{ gridTemplateColumns: '120px 1fr 120px 140px 110px 100px', padding: i === 0 ? '18px 24px' : '14px 24px' }}>
                    <span className="font-mono font-bold text-xs rounded-lg px-2 py-1 text-center w-fit" style={{ background: PILLAR_BG, color: PILLAR }}>{c.commodity_code}</span>
                    <p className="font-bold text-slate-800" style={{ fontSize: i === 0 ? '15px' : '14px' }}>{c.commodity_name}</p>
                    <p className="text-sm text-slate-500">{c.region_of_origin ?? '—'}</p>
                    <p className="font-mono font-black text-slate-900" style={{ fontSize: i === 0 ? '22px' : '18px', letterSpacing: '-0.5px' }}>{fmt(c.price_etb)}</p>
                    <p className={'font-mono font-bold text-sm ' + (changePos ? 'text-green-600' : 'text-red-500')}>
                      {changePos ? '+' : ''}{fmt(c.price_change)} ({changePos ? '+' : ''}{Number(c.price_change_pct ?? 0).toFixed(2)}%)
                    </p>
                    <p className="font-mono text-slate-500 text-sm">{fmtVol(c.volume_kg)}</p>
                  </div>
                  <div className="sm:hidden flex items-center gap-3" style={{ padding: '14px 16px' }}>
                    <span className="font-mono font-bold text-xs rounded-lg px-2 py-1 shrink-0" style={{ background: PILLAR_BG, color: PILLAR }}>{c.commodity_code}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-slate-800 text-sm truncate">{c.commodity_name}</p>
                      <p className="text-xs text-slate-400">{c.region_of_origin ?? '—'} · {fmtVol(c.volume_kg)}</p>
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
              <div className="py-10 text-center">
                <p className="text-slate-500 text-sm">Coffee prices for today are not yet available.</p>
              </div>
            )}

            <div className="flex items-center justify-between border-t border-slate-200" style={{ background: '#f9fafb', padding: '14px 24px' }}>
              <p className="text-xs text-slate-400">Source: Ethiopian Commodity Exchange (ecx.com.et) · Prices in ETB per kg</p>
              <Link href="/commodities/coffee" className="text-xs font-bold hover:underline shrink-0" style={{ color: '#1D4ED8' }}>All coffee grades →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ OTHER COMMODITIES ════════════════════════ */}
      <section className="border-b border-slate-100" style={{ background: '#f9fafb', padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Sesame · Beans · Grains</p>
              <h2 className="font-serif font-bold text-slate-950" style={{ fontSize: 'clamp(22px, 2.8vw, 32px)', letterSpacing: '-1px', lineHeight: 1.15 }}>
                Other ECX commodities — today
              </h2>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: PILLAR }} />
              <span className="text-xs font-bold rounded-full px-3 py-1.5 border" style={{ color: '#166534', background: '#dcfce7', borderColor: '#bbf7d0' }}>
                ECX · {displayDate}
              </span>
            </div>
          </div>

          {others.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {others.map((c: any) => {
                const changePos = Number(c.price_change ?? 0) >= 0
                return (
                  <div key={c.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                    <div style={{ height: 3, background: '#1D4ED8' }} />
                    <div style={{ padding: '24px' }}>
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono font-bold text-xs rounded-lg px-2 py-1" style={{ background: PILLAR_BG, color: PILLAR }}>{c.commodity_code}</span>
                        <span className="text-xs font-bold text-slate-400 rounded-full px-2 py-0.5 bg-slate-100 capitalize">{c.commodity_type}</span>
                      </div>
                      <p className="font-bold text-slate-800 mb-3" style={{ fontSize: '14px' }}>{c.commodity_name}</p>
                      <p className="font-mono font-black text-slate-950 mb-1" style={{ fontSize: '24px', letterSpacing: '-0.5px', lineHeight: 1 }}>{fmt(c.price_etb)}</p>
                      <p className="text-xs text-slate-400 mb-3">ETB per kg</p>
                      <div className={'inline-flex items-center gap-1 text-xs font-bold rounded-full px-2 py-1 ' + (changePos ? 'text-blue-700 bg-blue-50' : 'text-red-600 bg-red-50')}>
                        {changePos ? '+' : ''}{fmt(c.price_change)} ({changePos ? '+' : ''}{Number(c.price_change_pct ?? 0).toFixed(2)}%)
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white text-center py-10">
              <p className="text-slate-500 text-sm">Commodity prices for today are not yet available.</p>
            </div>
          )}

          <p className="text-xs text-slate-400 mt-5 text-center">
            Prices in ETB per kg · Source: ecx.com.et · Updated every ECX market day · For reference only
          </p>
        </div>
      </section>

      {/* ══════════════════════════════ DARK TRUST ════════════════════════════════ */}
      <section className="border-b border-slate-100" style={{ background: '#0f172a', padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: '#93c5fd' }}>Why this matters</p>
            <h2 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(26px, 3.5vw, 38px)', letterSpacing: '-1.2px', color: '#ffffff' }}>
              No other financial platform covers ECX.
            </h2>
            <p className="mx-auto" style={{ fontSize: '16px', lineHeight: 1.75, maxWidth: '520px', color: '#94a3b8' }}>
              BirrBank is the only platform that integrates commodity prices with banking and
              capital market data — giving exporters, farmers, lenders and investors a complete picture.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#93c5fd" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22V12M12 12C12 6 7 4 7 4s5 2 5 8z"/><path d="M12 12C12 6 17 4 17 4s-5 2-5 8z"/><line x1="8" y1="22" x2="16" y2="22"/></svg>, tag: 'Coffee exporters', headline: "Ethiopia most valuable export, priced daily.", body: 'Coffee is Ethiopia largest export commodity. Exporters, cooperatives and financiers need grade-level price data every trading day. BirrBank surfaces it in one place.' },
              { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#93c5fd" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3h18v18H3z"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></svg>, tag: 'Agricultural SMEs', headline: 'Benchmark prices for lending decisions.', body: 'Banks and MFIs lending to agricultural businesses need commodity price benchmarks. BirrBank integrates ECX prices with the banking pillar to serve both sides.' },
              { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#93c5fd" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>, tag: 'Diaspora & investors', headline: "Ethiopia commodity story for global audiences.", body: 'International investors and diaspora watching Ethiopia agricultural sector need accessible price data in English. BirrBank is the only platform providing it free.' },
            ].map(({ icon, tag, headline, body }) => (
              <div key={tag} className="rounded-2xl flex flex-col" style={{ padding: '36px 32px', background: '#1e293b', border: '1px solid #334155', minHeight: '260px' }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-6" style={{ background: '#1e3a5f', border: '1px solid #1d4ed8' }}>{icon}</div>
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
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Daily commodity alerts</p>
            <h2 className="font-serif font-bold text-slate-950 mb-5" style={{ fontSize: 'clamp(30px, 3.5vw, 42px)', letterSpacing: '-1.5px', lineHeight: 1.1 }}>
              ECX prices,<br />
              <span style={{ color: '#1D4ED8' }}>direct to your inbox.</span>
            </h2>
            <p className="text-slate-500 mb-8" style={{ fontSize: '15px', lineHeight: 1.85 }}>
              Weekly commodity price digest for exporters, lenders and investors.
              Coffee, sesame and grain movements in one clean summary.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Coffee grade prices — all origins and grades',
                'Sesame, kidney bean and chickpea weekly movements',
                'Wheat and grain price trends for food sector planning',
                'ECX market news and new commodity listings',
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
