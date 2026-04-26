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

function fmt(val: number | null | undefined, decimals = 2) {
  if (val == null) return '—'
  return Number(val).toFixed(decimals)
}
function fmtDate(d: string | null | undefined) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}
function fmtMin(val: number | null | undefined) {
  if (val == null) return '—'
  return 'ETB ' + Number(val).toLocaleString('en-ET')
}
function tenorLabel(type: string) {
  return type.replace('tbill_', '').replace('d', '-day') + ' T-Bill'
}

export default async function BondsPage() {
  const supabase = createSupabaseAdminClient()

  const { data: tbillData } = await supabase
    .schema('birrbank')
    .from('debt_instruments')
    .select('*')
    .like('instrument_type', 'tbill%')
    .eq('is_current', true)
    .order('yield_pct', { ascending: false })

  const { data: bondData } = await supabase
    .schema('birrbank')
    .from('debt_instruments')
    .select('*')
    .in('instrument_type', ['government_bond', 'corporate_bond'])
    .eq('is_current', true)
    .order('coupon_rate_pct', { ascending: false })

  const tbills = tbillData ?? []
  const bonds  = bondData ?? []
  const bestYield = tbills[0] ? fmt(tbills[0].yield_pct) + '%' : '—'

  return (
    <div className="min-h-screen bg-white">

      {/* ══════════════════════════════ HERO ══════════════════════════════════════ */}
      <section className="relative bg-white overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 900px 500px at 55% -80px, rgba(29,78,216,0.04) 0%, transparent 65%)' }} />
        <div className="relative max-w-6xl mx-auto px-8 pt-20 pb-14">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-6">
            <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
            <span>›</span>
            <Link href="/markets" className="hover:text-slate-600 transition-colors">Markets</Link>
            <span>›</span>
            <span style={{ color: PILLAR, fontWeight: 700 }}>Bonds & T-Bills</span>
          </div>
          <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: PILLAR }}>Markets · Bonds & T-Bills</p>
          <h1 className="font-serif font-bold mb-5 text-slate-950" style={{ fontSize: 'clamp(36px, 4.5vw, 54px)', letterSpacing: '-1.8px', lineHeight: 1.08 }}>
            Ethiopian T-bills and bonds —<br />
            <span style={{ color: PILLAR }}>NBE auction yields, all tenors.</span>
          </h1>
          <p className="text-slate-600 mb-8" style={{ fontSize: '16px', lineHeight: '1.8', maxWidth: '520px' }}>
            Treasury bill auction results from the National Bank of Ethiopia — yields, tenors,
            minimum investments and auction dates. The safest ETB-denominated investment compared.
          </p>
          <div className="flex flex-wrap gap-6">
            {[
              { icon: <ClockIcon />, label: tbills.length + ' T-bill tenors tracked' },
              { icon: <ClockIcon />, label: 'Best yield: ' + bestYield },
              { icon: <ClockIcon />, label: 'NBE auction results' },
              { icon: <ClockIcon />, label: 'Updated weekly after each auction' },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <span style={{ color: PILLAR }}>{s.icon}</span>
                <span className="text-xs font-semibold text-slate-500">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ T-BILL CARDS ══════════════════════════════ */}
      <section className="bg-white" style={{ padding: '64px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Treasury bills</p>
              <h2 className="font-serif font-bold text-slate-950" style={{ fontSize: 'clamp(22px, 2.8vw, 32px)', letterSpacing: '-1px', lineHeight: 1.15 }}>
                NBE T-bill auction yields
              </h2>
            </div>
            <p className="text-xs text-slate-400">Source: nbe.gov.et/exchange/treasury-bill-auction-results/</p>
          </div>

          {tbills.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {tbills.map((t: any, i: number) => (
                <div key={t.id} className={'rounded-2xl border overflow-hidden ' + (i === 0 ? 'border-blue-200' : 'border-slate-200')}
                  style={{ boxShadow: i === 0 ? '0 4px 24px rgba(29,78,216,0.12)' : '0 2px 12px rgba(0,0,0,0.04)' }}>
                  <div style={{ height: 4, background: 'linear-gradient(90deg, #1D4ED8, #1E40AF)' }} />
                  <div className={i === 0 ? 'bg-blue-50' : 'bg-white'} style={{ padding: '28px 24px' }}>
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-xs font-black uppercase tracking-widest" style={{ color: PILLAR }}>{tenorLabel(t.instrument_type)}</p>
                      {i === 0 && <span className="text-xs font-bold rounded-full px-2 py-0.5" style={{ background: '#dbeafe', color: '#1D4ED8' }}>Best yield</span>}
                    </div>
                    <p className="font-mono font-black text-slate-950 mb-1" style={{ fontSize: '36px', letterSpacing: '-1px', lineHeight: 1, color: PILLAR }}>
                      {t.yield_pct ? fmt(t.yield_pct) + '%' : '—'}
                    </p>
                    <p className="text-xs text-slate-400 mb-5">Annual yield</p>
                    <div className="space-y-2 pt-4 border-t border-slate-200">
                      {[
                        { label: 'Min. investment', value: fmtMin(t.minimum_investment) },
                        { label: 'Last auction',    value: fmtDate(t.auction_date) },
                        { label: 'Maturity',        value: fmtDate(t.maturity_date) },
                        { label: 'Issuer',          value: t.issuer },
                      ].map((f) => (
                        <div key={f.label} className="flex justify-between text-xs">
                          <span className="text-slate-400">{f.label}</span>
                          <span className="font-semibold text-slate-700">{f.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 text-center py-12">
              <p className="text-slate-500 text-sm">T-bill data is being updated. Check back after the next NBE auction.</p>
            </div>
          )}

          <p className="text-xs text-slate-400 mt-5 text-center">
            Yields from NBE auction results · For comparison only · Always verify with your broker before investing
          </p>
        </div>
      </section>

      {/* ══════════════════════════════ BONDS TABLE ═══════════════════════════════ */}
      {bonds.length > 0 && (
        <section className="border-b border-slate-100" style={{ background: '#f9fafb', padding: '64px 32px 96px' }}>
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Government & corporate bonds</p>
              <h2 className="font-serif font-bold text-slate-950" style={{ fontSize: 'clamp(22px, 2.8vw, 32px)', letterSpacing: '-1px', lineHeight: 1.15 }}>
                Fixed income instruments
              </h2>
            </div>
            <div className="rounded-2xl overflow-hidden border border-slate-200" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
              <div style={{ height: 4, background: 'linear-gradient(90deg, #1D4ED8, #1E40AF)' }} />
              <div className="hidden sm:grid border-b border-slate-200"
                style={{ gridTemplateColumns: '1fr 100px 120px 130px 100px 100px', padding: '13px 24px', background: '#f9fafb' }}>
                {['Bond name', 'Maturity', 'Coupon', 'Min. invest', 'Issuer', 'Status'].map((h) => (
                  <p key={h} className="text-xs font-black text-slate-400 uppercase tracking-widest">{h}</p>
                ))}
              </div>
              {bonds.map((b: any) => (
                <div key={b.id} className="border-b border-slate-100 bg-white hover:bg-slate-50 transition-colors">
                  <div className="hidden sm:grid items-center"
                    style={{ gridTemplateColumns: '1fr 100px 120px 130px 100px 100px', padding: '15px 24px' }}>
                    <p className="font-bold text-slate-800" style={{ fontSize: '14px' }}>{b.issuer} Bond</p>
                    <p className="text-sm text-slate-500">{b.maturity_date ? Math.round((new Date(b.maturity_date).getTime() - new Date(b.issue_date).getTime()) / (365.25 * 24 * 3600 * 1000)) + '-year' : '—'}</p>
                    <p className="font-mono font-bold text-slate-800">{b.coupon_rate_pct ? fmt(b.coupon_rate_pct) + '%' : '—'}</p>
                    <p className="font-mono text-slate-600 text-sm">{fmtMin(b.minimum_investment)}</p>
                    <p className="text-sm text-slate-500">{b.issuer}</p>
                    <span className="text-xs font-bold rounded-full px-2 py-0.5 w-fit" style={{ background: '#dcfce7', color: '#166534' }}>Active</span>
                  </div>
                  <div className="sm:hidden" style={{ padding: '14px 16px' }}>
                    <div className="flex justify-between mb-1">
                      <p className="font-bold text-slate-800 text-sm">{b.issuer} Bond</p>
                      <span className="text-xs font-bold rounded-full px-2 py-0.5" style={{ background: '#dcfce7', color: '#166534' }}>Active</span>
                    </div>
                    <p className="text-xs text-slate-400">{b.coupon_rate_pct ? fmt(b.coupon_rate_pct) + '% coupon' : '—'} · {fmtMin(b.minimum_investment)} min</p>
                  </div>
                </div>
              ))}
              <div className="border-t border-slate-200" style={{ background: '#f9fafb', padding: '14px 24px' }}>
                <p className="text-xs text-slate-400">Source: NBE · For comparison only · Not investment advice</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════ HOW T-BILLS WORK ═════════════════════════ */}
      <section className="border-b border-slate-100" style={{ background: bonds.length > 0 ? '#ffffff' : '#f9fafb', padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Guide</p>
            <h2 className="font-serif font-bold text-slate-950" style={{ fontSize: 'clamp(26px, 3vw, 36px)', letterSpacing: '-1.2px', lineHeight: 1.15 }}>
              How Ethiopian T-bills work.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'What a T-bill is', body: 'Treasury bills are short-term debt instruments issued by the NBE on behalf of the government. You lend money to the government for 28, 91, 182 or 364 days and receive your principal plus interest at maturity.' },
              { step: '02', title: 'How the auction works', body: 'The NBE holds weekly auctions. Investors submit bids through licensed banks and brokers. The yield is set by the auction — meaning the rate you see reflects actual market demand, not an arbitrary rate.' },
              { step: '03', title: 'Why compare T-bills vs savings', body: 'A 364-day T-bill at 9.15% compares directly to a 12-month fixed deposit. T-bills are government-backed with zero credit risk. Fixed deposits carry bank credit risk but may offer higher rates.' },
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
            <Link href="/markets/how-to-invest" className="inline-flex items-center gap-2 text-sm font-bold" style={{ color: PILLAR }}>
              Full investing guide <ArrowRight />
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
              NBE auction results. Official source.
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: 1.75, maxWidth: 480 }}>
              All T-bill yields are sourced from official NBE auction result publications.
              BirrBank does not estimate yields — every figure shown is the actual auction clearing rate.
            </p>
          </div>
          <Link href="/banking/savings-rates" className="font-bold rounded-full shrink-0"
            style={{ fontSize: 14, padding: '14px 28px', background: '#1D4ED8', color: '#fff', whiteSpace: 'nowrap', boxShadow: '0 4px 20px rgba(29,78,216,0.25)' }}>
            Compare savings rates →
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════ EMAIL CAPTURE ════════════════════════════ */}
      <section className="bg-white" style={{ padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">T-bill alerts</p>
            <h2 className="font-serif font-bold text-slate-950 mb-5" style={{ fontSize: 'clamp(30px, 3.5vw, 42px)', letterSpacing: '-1.5px', lineHeight: 1.1 }}>
              NBE auction results,<br />
              <span style={{ color: PILLAR }}>direct to your inbox.</span>
            </h2>
            <p className="text-slate-500 mb-8" style={{ fontSize: '15px', lineHeight: 1.85 }}>
              Weekly T-bill auction results as soon as the NBE publishes them — yields, volumes and next auction dates.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Weekly NBE T-bill auction results — all tenors',
                'Yield changes vs previous auction',
                'New bond issuances and corporate bond listings',
                'Comparison with best bank fixed deposit rates',
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
