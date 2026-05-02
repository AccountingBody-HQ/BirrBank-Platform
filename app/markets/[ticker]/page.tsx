import Link from 'next/link'
import { createSupabaseAdminClient } from '@/lib/supabase'
import { notFound } from 'next/navigation'
export const dynamic = 'force-dynamic'

const ArrowRight = ({ size = 13 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)

function fmt(val: number | null | undefined, decimals = 2) {
  if (val == null) return '—'
  return Number(val).toFixed(decimals)
}

function fmtETB(val: number | null | undefined) {
  if (val == null) return '—'
  return 'ETB ' + Number(val).toLocaleString('en-ET', { minimumFractionDigits: 2 })
}

function fmtDate(d: string | null | undefined) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

function fmtBig(val: number | null | undefined) {
  if (val == null) return '—'
  if (val >= 1_000_000_000) return 'ETB ' + (val / 1_000_000_000).toFixed(2) + 'B'
  if (val >= 1_000_000)     return 'ETB ' + (val / 1_000_000).toFixed(2) + 'M'
  return 'ETB ' + Number(val).toLocaleString('en-ET')
}

export default async function TickerPage({ params }: { params: Promise<{ ticker: string }> }) {
  const { ticker } = await params
  const supabase = createSupabaseAdminClient()

  const { data: security } = await supabase
    .schema('birrbank')
    .from('listed_securities')
    .select('*')
    .eq('ticker', ticker.toUpperCase())
    .single()

  if (!security) notFound()

  // Separate institution lookup — join returns null on this table (Rule 21)
  let institution: { name: string; slug: string } | null = null
  if (security.institution_slug) {
    const { data: instData } = await supabase.schema('birrbank').from('institutions').select('name, slug').eq('slug', security.institution_slug).single()
    institution = instData
  }

  // Price history — last 30 trading days
  const { data: history } = await supabase
    .schema('birrbank')
    .from('price_history')
    .select('trade_date, close_price, volume')
    .eq('ticker', ticker.toUpperCase())
    .order('trade_date', { ascending: false })
    .limit(30)

  const priceHistory = (history ?? []).reverse()
  const isPositive   = Number(security.price_change_pct ?? 0) >= 0

  return (
    <div className="min-h-screen bg-white">

      {/* HERO */}
      <section className="relative bg-white overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 900px 500px at 55% -80px, rgba(29,78,216,0.04) 0%, transparent 65%)' }} />
        <div className="relative max-w-7xl mx-auto px-8 pt-20 pb-14">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-6">
            <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link><span>›</span>
            <Link href="/markets" className="hover:text-slate-600 transition-colors">Markets</Link><span>›</span>
            <Link href="/markets/equities" className="hover:text-slate-600 transition-colors">Equities</Link><span>›</span>
            <span style={{ color: '#1D4ED8', fontWeight: 700 }}>{security.ticker}</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end gap-6 justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono font-black text-sm px-3 py-1 rounded-lg" style={{ background: '#1D4ED8', color: '#fff' }}>
                  {security.ticker}
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full capitalize"
                  style={{ background: '#f1f5f9', color: '#64748b' }}>
                  {security.security_type ?? 'equity'} · ESX
                </span>
              </div>
              <h1 className="font-serif font-bold text-slate-950 mb-2"
                style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', letterSpacing: '-1.2px', lineHeight: 1.1 }}>
                {security.company_name}
              </h1>
              {security.sector && (
                <p className="text-slate-500 text-sm">{security.sector} · Listed {fmtDate(security.listing_date)}</p>
              )}
            </div>

            {/* Price block */}
            <div className="shrink-0 text-right">
              <p className="font-mono font-black text-slate-950" style={{ fontSize: 'clamp(32px, 4vw, 48px)', letterSpacing: '-2px', lineHeight: 1 }}>
                {fmtETB(security.last_price_etb)}
              </p>
              {security.price_change_pct != null && (
                <p className="font-mono font-bold mt-1" style={{ fontSize: '16px', color: isPositive ? '#16a34a' : '#ef4444' }}>
                  {isPositive ? '+' : ''}{fmt(security.price_change_pct)}%
                </p>
              )}
              <p className="text-xs text-slate-400 mt-1">Last updated {fmtDate(security.last_updated)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* KEY STATS */}
      <section className="border-b border-slate-100 bg-white" style={{ padding: '48px 32px' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { label: 'Last Price',    value: fmtETB(security.last_price_etb)     },
              { label: 'Change',        value: security.price_change_pct != null ? (isPositive ? '+' : '') + fmt(security.price_change_pct) + '%' : '—', color: security.price_change_pct != null ? (isPositive ? '#16a34a' : '#ef4444') : undefined },
              { label: 'Volume Today', value: security.volume_today != null ? Number(security.volume_today).toLocaleString() : '—' },
              { label: 'Market Cap',   value: fmtBig(security.market_cap_etb)      },
              { label: 'P/E Ratio',    value: security.pe_ratio != null ? fmt(security.pe_ratio) + 'x' : '—' },
              { label: 'Div. Yield',   value: security.dividend_yield_pct != null ? fmt(security.dividend_yield_pct) + '%' : '—' },
            ].map(s => (
              <div key={s.label} className="rounded-2xl border border-slate-200 text-center"
                style={{ padding: '20px 16px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <p className="font-mono font-black" style={{ fontSize: '20px', letterSpacing: '-0.5px', color: s.color ?? '#0f172a', lineHeight: 1 }}>{s.value}</p>
                <p className="text-xs text-slate-400 mt-1.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICE HISTORY + INSTITUTION LINK */}
      <section className="bg-white" style={{ padding: '64px 32px 96px' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Price history table */}
            <div className="lg:col-span-2">
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-5">Price history · Last 30 trading days</p>
              {priceHistory.length > 0 ? (
                <div className="rounded-2xl overflow-hidden border border-slate-200" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
                  <div style={{ height: 4, background: 'linear-gradient(90deg, #1D4ED8, #1E40AF)' }} />
                  <div className="grid border-b border-slate-200"
                    style={{ gridTemplateColumns: '1fr 1fr 1fr', padding: '12px 20px', background: '#f9fafb' }}>
                    {['Date', 'Close Price (ETB)', 'Volume'].map(h => (
                      <p key={h} className="text-xs font-black text-slate-400 uppercase tracking-widest">{h}</p>
                    ))}
                  </div>
                  {priceHistory.map((p: any, i: number) => (
                    <div key={i} className="grid border-b border-slate-100 hover:bg-slate-50 transition-colors"
                      style={{ gridTemplateColumns: '1fr 1fr 1fr', padding: '12px 20px' }}>
                      <p className="text-sm text-slate-600">{fmtDate(p.trade_date)}</p>
                      <p className="font-mono font-bold text-slate-800">{p.close_price ? Number(p.close_price).toLocaleString('en-ET', { minimumFractionDigits: 2 }) : '—'}</p>
                      <p className="font-mono text-slate-400 text-sm">{p.volume ? Number(p.volume).toLocaleString() : '—'}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-slate-200 py-12 text-center">
                  <p className="text-slate-400 text-sm">Price history is being populated. Check back after the next trading day.</p>
                </div>
              )}
            </div>

            {/* Right column */}
            <div className="space-y-5">

              {/* Institution link */}
              {institution && (
                <div className="rounded-2xl border border-slate-200 overflow-hidden" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                  <div style={{ height: 3, background: 'linear-gradient(90deg, #1D4ED8, #1E40AF)' }} />
                  <div style={{ padding: '20px' }}>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Institution profile</p>
                    <p className="font-bold text-slate-900 mb-2">{institution.name}</p>
                    <p className="text-xs text-slate-500 mb-4" style={{ lineHeight: 1.6 }}>
                      View savings rates, loan rates, FX services and full institution profile on BirrBank.
                    </p>
                    <Link href={'/institutions/' + institution.slug}
                      className="inline-flex items-center gap-2 font-bold rounded-full text-sm"
                      style={{ background: '#1D4ED8', color: '#fff', padding: '10px 18px' }}>
                      View institution <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              )}

              {/* How to invest */}
              <div className="rounded-2xl border border-slate-200 overflow-hidden" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                <div style={{ height: 3, background: '#f1f5f9' }} />
                <div style={{ padding: '20px' }}>
                  <p className="font-bold text-slate-800 mb-3" style={{ fontSize: '13px' }}>How to buy {security.ticker}</p>
                  <div className="space-y-2.5">
                    {[
                      'Open a brokerage account at CBE Capital or Wegagen Capital',
                      'Complete KYC verification with your national ID',
                      'Deposit ETB funds to your brokerage account',
                      'Place a buy order for ' + security.ticker + ' on the ESX',
                    ].map((step, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <span className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-xs font-black mt-0.5"
                          style={{ background: '#dbeafe', color: '#1D4ED8' }}>{i + 1}</span>
                        <p className="text-xs text-slate-600" style={{ lineHeight: 1.6 }}>{step}</p>
                      </div>
                    ))}
                  </div>
                  <Link href="/markets/how-to-invest"
                    className="inline-flex items-center gap-1 text-xs font-bold mt-4" style={{ color: '#1D4ED8' }}>
                    Full investing guide <ArrowRight size={10} />
                  </Link>
                </div>
              </div>

              {/* Disclaimer */}
              <p className="text-xs text-slate-400 leading-relaxed">
                Data sourced from ESX daily published summaries. BirrBank is not a broker or investment adviser.
                Always verify prices with your broker before trading.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
