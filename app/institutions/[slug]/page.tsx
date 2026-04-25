import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createSupabaseAdminClient } from '@/lib/supabase'
export const dynamic = 'force-dynamic'

const ACCOUNT_TYPE_LABELS: Record<string, string> = {
  regular_savings:   'Regular savings',
  fixed_deposit_3m:  '3-month fixed deposit',
  fixed_deposit_6m:  '6-month fixed deposit',
  fixed_deposit_12m: '12-month fixed deposit',
  fixed_deposit_24m: '24-month fixed deposit',
  current:           'Current account',
  diaspora:          'Diaspora account',
  youth:             'Youth savings',
  women:             'Women savings',
}

const LOAN_TYPE_LABELS: Record<string, string> = {
  personal:      'Personal loan',
  home_mortgage: 'Home mortgage',
  car:           'Car loan',
  business:      'Business loan',
  agricultural:  'Agricultural loan',
  education:     'Education loan',
  emergency:     'Emergency loan',
  microfinance:  'Microfinance loan',
}

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
const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)
const CrossIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)

function fmt(val: number | null | undefined) {
  if (val == null) return '—'
  return Number(val).toFixed(2)
}
function fmtDate(d: string | null | undefined) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}
function fmtMin(val: number | null | undefined) {
  if (val == null) return '0'
  return Number(val).toLocaleString('en-ET')
}

export default async function InstitutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase  = createSupabaseAdminClient()
  const today     = new Date().toISOString().split('T')[0]

  // Institution profile
  const { data: inst } = await supabase
    .schema('birrbank')
    .from('institutions')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (!inst) notFound()

  // Savings rates
  const { data: savingsData } = await supabase
    .schema('birrbank')
    .from('savings_rates')
    .select('*')
    .eq('institution_slug', slug)
    .eq('is_current', true)
    .order('annual_rate', { ascending: false })

  // Loan rates
  const { data: loanData } = await supabase
    .schema('birrbank')
    .from('loan_rates')
    .select('*')
    .eq('institution_slug', slug)
    .eq('is_current', true)
    .order('min_rate', { ascending: true })

  // Digital services
  const { data: digitalData } = await supabase
    .schema('birrbank')
    .from('digital_services')
    .select('*')
    .eq('institution_slug', slug)
    .single()

  // FX rates for today
  const { data: fxData } = await supabase
    .schema('birrbank')
    .from('exchange_rates')
    .select('*')
    .eq('institution_slug', slug)
    .eq('rate_date', today)
    .in('currency_code', ['USD', 'EUR', 'GBP'])

  // ESX listed security if applicable
  const { data: securityData } = inst.is_listed_on_esx
    ? await supabase.schema('birrbank').from('listed_securities').select('*').eq('institution_slug', slug).single()
    : { data: null }

  const savings = savingsData ?? []
  const loans   = loanData ?? []
  const digital = digitalData
  const fxMap: Record<string, any> = {}
  for (const r of (fxData ?? [])) { fxMap[r.currency_code] = r }

  const bestSavingsRate = savings[0] ? Number(savings[0].annual_rate).toFixed(2) : '—'

  return (
    <div className="min-h-screen bg-white">

      {/* ══════════════════════════════ HERO ══════════════════════════════════════ */}
      <section className="relative bg-white overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 900px 400px at 55% -80px, rgba(29,78,216,0.04) 0%, transparent 65%)' }} />
        <div className="relative max-w-6xl mx-auto px-8 pt-20 pb-14">

          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-6">
            <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
            <span>›</span>
            <Link href="/institutions" className="hover:text-slate-600 transition-colors">Institutions</Link>
            <span>›</span>
            <span style={{ color: '#1D4ED8', fontWeight: 700 }}>{inst.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <p className="text-xs font-black uppercase tracking-widest" style={{ color: '#1D4ED8' }}>
                  {inst.type.replace(/_/g, ' ')}
                </p>
                {inst.is_listed_on_esx && (
                  <span className="text-xs font-bold rounded-full px-3 py-1" style={{ background: '#eff6ff', color: '#1D4ED8' }}>
                    ESX listed{securityData?.ticker ? ' · ' + securityData.ticker : ''}
                  </span>
                )}
              </div>
              <h1 className="font-serif font-bold mb-4 text-slate-950" style={{ fontSize: 'clamp(32px, 4vw, 50px)', letterSpacing: '-1.5px', lineHeight: 1.1 }}>
                {inst.name}
              </h1>
              {inst.description && (
                <p className="text-slate-600 mb-6" style={{ fontSize: '15px', lineHeight: 1.8, maxWidth: 540 }}>
                  {inst.description}
                </p>
              )}
              <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                {[
                  { label: 'Founded',     value: inst.founded_year?.toString() ?? '—' },
                  { label: 'SWIFT',       value: inst.swift_code ?? '—' },
                  { label: 'NBE licence', value: inst.nbe_licence_date ? fmtDate(inst.nbe_licence_date) : '—' },
                  { label: 'Website',     value: inst.website_url ? inst.website_url.replace('https://','').replace('www.','') : '—' },
                ].map((d) => (
                  <div key={d.label}>
                    <span className="font-black uppercase tracking-widest text-slate-400">{d.label}: </span>
                    <span className="font-semibold text-slate-600">{d.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Score card */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden" style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>
              <div style={{ height: 4, background: 'linear-gradient(90deg, #1D4ED8, #1E40AF)' }} />
              <div style={{ padding: '28px 24px' }}>
                <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">BirrBank score</p>
                <p className="font-mono font-black mb-1" style={{ fontSize: '52px', color: '#1D4ED8', letterSpacing: '-2px', lineHeight: 1 }}>
                  {inst.birrbank_score ? Number(inst.birrbank_score).toFixed(1) : '—'}
                </p>
                <p className="text-xs text-slate-400 mb-6">out of 5.0</p>
                <div className="space-y-2 pt-4 border-t border-slate-100">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Quick facts</p>
                  {[
                    { label: 'Best savings rate', value: bestSavingsRate !== '—' ? bestSavingsRate + '%' : '—' },
                    { label: 'Mobile app',         value: digital ? (digital.has_mobile_app ? 'Yes' : 'No') : '—' },
                    { label: 'SWIFT transfers',    value: digital ? (digital.has_swift ? 'Yes' : 'No') : '—' },
                    { label: 'App store rating',   value: digital?.app_store_rating ? Number(digital.app_store_rating).toFixed(1) + ' / 5' : '—' },
                  ].map((f) => (
                    <div key={f.label} className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">{f.label}</span>
                      <span className="font-bold text-slate-700">{f.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ DUAL-VIEW (if ESX listed) ═════════════════════════════ */}
      {inst.is_listed_on_esx && securityData && (
        <section className="border-b border-slate-100" style={{ background: '#ffffff', padding: '64px 32px' }}>
          <div className="max-w-6xl mx-auto">
            <div className="rounded-2xl overflow-hidden border border-blue-100" style={{ boxShadow: '0 4px 24px rgba(29,78,216,0.08)' }}>
              <div style={{ height: 4, background: 'linear-gradient(90deg, #1D4ED8, #1E40AF)' }} />
              <div style={{ padding: '32px' }}>
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: '#1D4ED8' }}>
                      Dual-view — ESX listed
                    </p>
                    <h2 className="font-serif font-bold text-slate-950" style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', letterSpacing: '-0.8px' }}>
                      {inst.name} — deposit product + investable equity
                    </h2>
                  </div>
                  <Link href={'/markets/' + securityData.ticker?.toLowerCase()}
                    className="inline-flex items-center gap-2 font-bold rounded-full text-sm"
                    style={{ padding: '10px 20px', background: '#1D4ED8', color: '#fff' }}>
                    View on ESX <ArrowRight size={12} />
                  </Link>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: 'Share price',    value: securityData.last_price_etb ? 'ETB ' + fmt(securityData.last_price_etb) : '—', sub: securityData.price_change_pct ? (Number(securityData.price_change_pct) >= 0 ? '+' : '') + fmt(securityData.price_change_pct) + '%' : '—' },
                    { label: 'Market cap',     value: securityData.market_cap_etb ? 'ETB ' + (Number(securityData.market_cap_etb)/1e9).toFixed(1) + 'B' : '—', sub: 'Total' },
                    { label: 'P/E ratio',      value: securityData.pe_ratio ? fmt(securityData.pe_ratio) : '—', sub: 'Price/earnings' },
                    { label: 'Dividend yield', value: securityData.dividend_yield_pct ? fmt(securityData.dividend_yield_pct) + '%' : '—', sub: 'Annual' },
                  ].map((s) => (
                    <div key={s.label} className="bg-white rounded-xl border border-blue-100 text-center" style={{ padding: '20px 12px' }}>
                      <p className="font-mono font-black mb-1" style={{ fontSize: '20px', color: '#1D4ED8', letterSpacing: '-0.5px' }}>{s.value}</p>
                      <p className="text-xs font-bold text-slate-700 mb-0.5">{s.label}</p>
                      <p className="text-xs text-slate-400">{s.sub}</p>
                    </div>
                  ))}
                </div>
                {savings[0] && securityData.dividend_yield_pct && (
                  <p className="text-xs text-slate-500 mt-4">
                    {inst.name} pays you <strong>{bestSavingsRate}%</strong> to deposit.
                    Its stock yields <strong>{fmt(securityData.dividend_yield_pct)}%</strong> dividends.
                    Compare both — deposit product and investable equity — on this page.
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════ SAVINGS RATES ════════════════════════════ */}
      <section className="border-b border-slate-100 bg-white" style={{ padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Savings & deposits</p>
              <h2 className="font-serif font-bold text-slate-950" style={{ fontSize: 'clamp(22px, 2.8vw, 30px)', letterSpacing: '-1px' }}>
                {inst.name} savings rates
              </h2>
            </div>
            <Link href="/banking/savings-rates" className="inline-flex items-center gap-2 text-sm font-bold shrink-0" style={{ color: '#1D4ED8' }}>
              Compare all banks <ArrowRight />
            </Link>
          </div>

          {savings.length > 0 ? (
            <div className="rounded-2xl overflow-hidden border border-slate-200" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
              <div style={{ height: 4, background: 'linear-gradient(90deg, #1D4ED8, #1E40AF)' }} />
              <div className="hidden sm:grid border-b border-slate-200" style={{ gridTemplateColumns: '1fr 120px 120px 100px 110px', padding: '12px 24px', background: '#f9fafb' }}>
                {['Product', 'Annual rate', 'Min. balance', 'Term', 'Last verified'].map((h) => (
                  <p key={h} className="text-xs font-black text-slate-400 uppercase tracking-widest">{h}</p>
                ))}
              </div>
              {savings.map((s: any, i: number) => (
                <div key={s.id} className={'border-b border-slate-100 ' + (i === 0 ? 'bg-blue-50' : 'bg-white hover:bg-slate-50') + ' transition-colors'}>
                  <div className="hidden sm:grid items-center" style={{ gridTemplateColumns: '1fr 120px 120px 100px 110px', padding: i === 0 ? '18px 24px' : '14px 24px' }}>
                    <div>
                      <p className={'font-bold ' + (i === 0 ? 'text-blue-900' : 'text-slate-800')} style={{ fontSize: i === 0 ? '15px' : '14px' }}>
                        {ACCOUNT_TYPE_LABELS[s.account_type] ?? s.account_type}
                      </p>
                      {s.is_sharia_compliant && (
                        <span className="text-xs font-bold rounded-full px-2 py-0.5 mt-0.5 inline-block" style={{ background: '#fef3c7', color: '#92400e' }}>Sharia</span>
                      )}
                    </div>
                    <p className={'font-mono font-black ' + (i === 0 ? 'text-blue-700' : 'text-slate-800')} style={{ fontSize: i === 0 ? '24px' : '18px', letterSpacing: '-0.5px' }}>
                      {Number(s.annual_rate).toFixed(2)}%
                    </p>
                    <p className="font-mono text-slate-600 text-sm">ETB {fmtMin(s.minimum_balance_etb)}</p>
                    <p className="text-slate-500 text-sm">{s.minimum_tenure_days ? Math.round(s.minimum_tenure_days/30) + ' months' : 'Flexible'}</p>
                    <div className="flex items-center gap-1.5">
                      <span style={{ color: '#1D4ED8' }}><ClockIcon /></span>
                      <p className="text-xs text-slate-400">{fmtDate(s.last_verified_date)}</p>
                    </div>
                  </div>
                  <div className="sm:hidden flex items-center gap-3" style={{ padding: '14px 16px' }}>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-slate-800 text-sm">{ACCOUNT_TYPE_LABELS[s.account_type] ?? s.account_type}</p>
                      <p className="text-xs text-slate-400">ETB {fmtMin(s.minimum_balance_etb)} min · verified {fmtDate(s.last_verified_date)}</p>
                    </div>
                    <p className="font-mono font-black text-slate-800 shrink-0" style={{ fontSize: '20px' }}>{Number(s.annual_rate).toFixed(2)}%</p>
                  </div>
                </div>
              ))}
              <div className="bg-white border-t border-slate-200" style={{ padding: '12px 24px' }}>
                <p className="text-xs text-slate-400">Rates for comparison only · Verify directly with {inst.name} · BirrBank is not a financial adviser</p>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 text-center py-12">
              <p className="text-slate-500 text-sm">Savings rate data for {inst.name} is being verified. Check back soon.</p>
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════ LOAN RATES ════════════════════════════════ */}
      <section className="border-b border-slate-100" style={{ background: '#f9fafb', padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Loans & credit</p>
              <h2 className="font-serif font-bold text-slate-950" style={{ fontSize: 'clamp(22px, 2.8vw, 30px)', letterSpacing: '-1px' }}>
                {inst.name} loan rates
              </h2>
            </div>
            <Link href="/banking/loans" className="inline-flex items-center gap-2 text-sm font-bold shrink-0" style={{ color: '#1D4ED8' }}>
              Compare all banks <ArrowRight />
            </Link>
          </div>
          {loans.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {loans.map((l: any) => (
                <div key={l.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                  <div style={{ height: 3, background: '#1D4ED8' }} />
                  <div style={{ padding: '24px' }}>
                    <p className="font-bold text-slate-900 mb-4" style={{ fontSize: '15px' }}>{LOAN_TYPE_LABELS[l.loan_type] ?? l.loan_type}</p>
                    <div className="flex items-baseline gap-1 mb-1">
                      <p className="font-mono font-black text-slate-950" style={{ fontSize: '28px', letterSpacing: '-1px', lineHeight: 1 }}>{Number(l.min_rate).toFixed(2)}%</p>
                      {l.max_rate && <p className="text-sm text-slate-400">– {Number(l.max_rate).toFixed(2)}%</p>}
                    </div>
                    <p className="text-xs text-slate-400 mb-4">Annual interest rate range</p>
                    <div className="space-y-1.5 pt-3 border-t border-slate-100">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Max tenure</span>
                        <span className="font-semibold text-slate-700">{l.max_tenure_months ? l.max_tenure_months + ' months' : '—'}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Last verified</span>
                        <span className="font-semibold text-slate-700">{fmtDate(l.last_verified_date)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white text-center py-12">
              <p className="text-slate-500 text-sm">Loan rate data for {inst.name} is being verified. Check back soon.</p>
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════ FX + DIGITAL ═════════════════════════════ */}
      <section className="border-b border-slate-100 bg-white" style={{ padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* FX rates */}
          <div className="rounded-2xl overflow-hidden border border-slate-200" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
            <div style={{ height: 3, background: '#1D4ED8' }} />
            <div style={{ padding: '28px 24px' }}>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">FX rates today</p>
              {fxData && fxData.length > 0 ? (
                <div className="space-y-3">
                  {(['USD','EUR','GBP'] as const).map((ccy) => fxMap[ccy] ? (
                    <div key={ccy}>
                      <div className="flex justify-between items-center py-2 border-b border-slate-100">
                        <span className="text-sm text-slate-500 font-medium">{ccy} sell</span>
                        <span className="font-mono font-bold text-slate-800" style={{ fontSize: '16px' }}>ETB {fmt(fxMap[ccy].selling_rate)}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-slate-100">
                        <span className="text-sm text-slate-500 font-medium">{ccy} buy</span>
                        <span className="font-mono font-bold text-slate-800" style={{ fontSize: '16px' }}>ETB {fmt(fxMap[ccy].buying_rate)}</span>
                      </div>
                    </div>
                  ) : null)}
                </div>
              ) : (
                <p className="text-sm text-slate-400">FX rates for today are not yet available for this institution.</p>
              )}
              <Link href="/banking/fx-rates" className="inline-flex items-center gap-1.5 text-xs font-bold mt-4" style={{ color: '#1D4ED8' }}>
                Compare all banks <ArrowRight size={11} />
              </Link>
            </div>
          </div>

          {/* Digital services */}
          <div className="rounded-2xl overflow-hidden border border-slate-200" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
            <div style={{ height: 3, background: '#1D4ED8' }} />
            <div style={{ padding: '28px 24px' }}>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Digital services</p>
              {digital ? (
                <div className="space-y-3">
                  {[
                    { label: 'Mobile banking app',  value: digital.has_mobile_app },
                    { label: 'Internet banking',    value: digital.has_internet_banking },
                    { label: 'USSD (*) banking',    value: digital.has_ussd },
                    { label: 'SWIFT international', value: digital.has_swift },
                  ].map((d) => (
                    <div key={d.label} className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-sm text-slate-500 font-medium">{d.label}</span>
                      <span>{d.value ? <CheckIcon /> : <CrossIcon />}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-slate-500 font-medium">App store rating</span>
                    <span className="font-bold text-slate-700">{digital.app_store_rating ? Number(digital.app_store_rating).toFixed(1) + ' / 5.0' : '—'}</span>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-slate-400">Digital services data is being verified for this institution.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ DARK CTA ══════════════════════════════════ */}
      <section style={{ background: '#0f172a', padding: '72px 32px' }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: '#93c5fd' }}>Compare further</p>
            <h3 className="font-serif font-bold mb-2" style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', color: '#ffffff', letterSpacing: '-0.8px' }}>
              See how {inst.name} compares to all 32 banks.
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.75, maxWidth: 440 }}>
              BirrBank ranks every commercial bank by savings rate, loan rate, digital services and FX competitiveness — all on one comparison page.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link href="/banking/savings-rates" className="font-bold rounded-full text-center"
              style={{ fontSize: 14, padding: '13px 24px', background: '#1D4ED8', color: '#fff', boxShadow: '0 4px 16px rgba(29,78,216,0.25)' }}>
              Compare savings rates
            </Link>
            <Link href="/institutions" className="font-bold rounded-full text-center"
              style={{ fontSize: 14, padding: '13px 24px', border: '1.5px solid #334155', color: '#94a3b8' }}>
              All institutions
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
