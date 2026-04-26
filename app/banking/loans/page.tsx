import Link from 'next/link'
import EmailCapture from '@/components/EmailCapture'
import { createSupabaseAdminClient } from '@/lib/supabase'
export const dynamic = 'force-dynamic'

const PILLAR = '#1D4ED8'

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

function fmt(val: number | null | undefined) {
  if (val == null) return '—'
  return Number(val).toFixed(2)
}
function fmtDate(d: string | null | undefined) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}
function fmtETB(val: number | null | undefined) {
  if (val == null) return '—'
  return 'ETB ' + Number(val).toLocaleString('en-ET')
}

export default async function LoansPage() {
  const supabase = createSupabaseAdminClient()

  // Personal loans — sorted by min rate
  const { data: personalLoans } = await supabase
    .schema('birrbank')
    .from('loan_rates')
    .select('*, institutions(name)')
    .eq('loan_type', 'personal')
    .eq('is_current', true)
    .order('min_rate', { ascending: true })

  // Home loans
  const { data: homeLoans } = await supabase
    .schema('birrbank')
    .from('loan_rates')
    .select('*, institutions(name)')
    .eq('loan_type', 'home_mortgage')
    .eq('is_current', true)
    .order('min_rate', { ascending: true })

  // Business loans
  const { data: businessLoans } = await supabase
    .schema('birrbank')
    .from('loan_rates')
    .select('*, institutions(name)')
    .eq('loan_type', 'business')
    .eq('is_current', true)
    .order('min_rate', { ascending: true })

  // Bank count
  const { count: bankCount } = await supabase
    .schema('birrbank')
    .from('institutions')
    .select('count', { count: 'exact', head: true })
    .eq('type', 'bank')
    .eq('is_active', true)

  const personal  = personalLoans ?? []
  const home      = homeLoans ?? []
  const business  = businessLoans ?? []

  const LoanTable = ({ loans, title }: { loans: any[], title: string }) => (
    <div className="mb-12">
      <h3 className="font-serif font-bold text-slate-950 mb-6" style={{ fontSize: 'clamp(20px, 2.5vw, 26px)', letterSpacing: '-0.8px' }}>{title}</h3>
      <div className="rounded-2xl overflow-hidden border border-slate-200" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
        <div style={{ height: 4, background: 'linear-gradient(90deg, #1D4ED8, #1E40AF)' }} />
        <div className="hidden sm:grid border-b border-slate-200"
          style={{ gridTemplateColumns: '44px 1fr 130px 130px 120px 130px 110px', padding: '13px 24px', background: '#f9fafb' }}>
          {['#', 'Bank', 'Min rate', 'Max rate', 'Max term', 'Max amount', 'Verified'].map((h) => (
            <p key={h} className="text-xs font-black text-slate-400 uppercase tracking-widest">{h}</p>
          ))}
        </div>
        {loans.length > 0 ? loans.map((r: any, i: number) => (
          <div key={r.id} className={'border-b border-slate-100 transition-colors ' + (i === 0 ? 'bg-blue-50' : 'bg-white hover:bg-slate-50')}>
            <div className="hidden sm:grid items-center"
              style={{ gridTemplateColumns: '44px 1fr 130px 130px 120px 130px 110px', padding: i === 0 ? '18px 24px' : '13px 24px' }}>
              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black"
                style={i === 0 ? { background: '#1D4ED8', color: '#fff' } : { background: '#f1f5f9', color: '#94a3b8' }}>
                {i === 0 ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> : i + 1}
              </div>
              <p className={'font-bold ' + (i === 0 ? 'text-blue-900' : 'text-slate-800')} style={{ fontSize: i === 0 ? '15px' : '14px' }}>
                {r.institutions?.name ?? r.institution_slug}
              </p>
              <p className={'font-mono font-black ' + (i === 0 ? 'text-blue-700' : 'text-slate-800')} style={{ fontSize: i === 0 ? '22px' : '16px', letterSpacing: '-0.5px' }}>
                {fmt(r.min_rate)}%
              </p>
              <p className="font-mono text-slate-500 text-sm">{r.max_rate ? fmt(r.max_rate) + '%' : '—'}</p>
              <p className="text-sm text-slate-500">{r.max_tenure_months ? r.max_tenure_months + ' months' : '—'}</p>
              <p className="font-mono text-slate-600 text-sm">{fmtETB(r.max_amount_etb)}</p>
              <div className="flex items-center gap-1.5">
                <span style={{ color: PILLAR }}><ClockIcon /></span>
                <p className="text-xs text-slate-400">{fmtDate(r.last_verified_date)}</p>
              </div>
            </div>
            <div className="sm:hidden flex items-center gap-3" style={{ padding: '13px 16px' }}>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-slate-800 text-sm">{r.institutions?.name ?? r.institution_slug}</p>
                <p className="text-xs text-slate-400">{r.max_tenure_months ? r.max_tenure_months + ' months max' : '—'} · {fmtETB(r.max_amount_etb)}</p>
              </div>
              <p className="font-mono font-black text-slate-800 shrink-0" style={{ fontSize: '18px' }}>{fmt(r.min_rate)}%</p>
            </div>
          </div>
        )) : (
          <div className="py-10 text-center"><p className="text-slate-500 text-sm">Loan rate data is being verified. Check back soon.</p></div>
        )}
        <div className="flex items-center justify-between border-t border-slate-200" style={{ background: '#f9fafb', padding: '14px 24px' }}>
          <p className="text-xs text-slate-400">Rates sourced from official bank websites · For comparison only · Sorted by minimum rate</p>
          <Link href="/banking/savings-rates" className="text-xs font-bold hover:underline shrink-0" style={{ color: PILLAR }}>Compare savings rates →</Link>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-white">

      {/* HERO */}
      <section className="relative bg-white overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 900px 500px at 55% -80px, rgba(29,78,216,0.04) 0%, transparent 65%)' }} />
        <div className="relative max-w-6xl mx-auto px-8 pt-20 pb-14">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-6">
            <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link><span>›</span>
            <Link href="/banking" className="hover:text-slate-600 transition-colors">Banking</Link><span>›</span>
            <span style={{ color: PILLAR, fontWeight: 700 }}>Loan Comparison</span>
          </div>
          <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: PILLAR }}>Banking · Loans</p>
          <h1 className="font-serif font-bold mb-5 text-slate-950" style={{ fontSize: 'clamp(36px, 4.5vw, 54px)', letterSpacing: '-1.8px', lineHeight: 1.08 }}>
            Best loan rates in Ethiopia —<br /><span style={{ color: PILLAR }}>all {bankCount ?? 32} banks compared.</span>
          </h1>
          <p className="text-slate-600 mb-8" style={{ fontSize: '16px', lineHeight: '1.8', maxWidth: '520px' }}>
            Personal, home mortgage, car and business loan rates from every commercial bank —
            verified from official sources and sorted by lowest rate.
          </p>
          <div className="flex flex-wrap gap-6">
            {[
              { icon: <ClockIcon />, label: (bankCount ?? 32) + ' banks compared' },
              { icon: <ClockIcon />, label: 'Personal, home and business loans' },
              { icon: <ClockIcon />, label: 'Sorted by lowest rate' },
              { icon: <ClockIcon />, label: 'Last verified dates on every row' },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <span style={{ color: PILLAR }}>{s.icon}</span>
                <span className="text-xs font-semibold text-slate-500">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOAN TABLES */}
      <section className="bg-white" style={{ padding: '64px 32px 96px' }}>
        <div className="max-w-6xl mx-auto">
          <LoanTable loans={personal} title="Personal loans" />
          <LoanTable loans={home} title="Home mortgage loans" />
          <LoanTable loans={business} title="Business loans" />
          <p className="text-xs text-slate-400 mt-4 text-center leading-relaxed">
            Rates are for comparison purposes only and may change without notice.
            Always verify the current rate directly with the institution before applying.
            BirrBank is not a bank or financial adviser.
          </p>
        </div>
      </section>

      {/* GUIDE */}
      <section className="border-b border-slate-100" style={{ background: '#f9fafb', padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Guide</p>
            <h2 className="font-serif font-bold text-slate-950" style={{ fontSize: 'clamp(26px, 3vw, 36px)', letterSpacing: '-1.2px', lineHeight: 1.15 }}>
              How to choose the best loan in Ethiopia.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Compare the minimum rate, not the maximum', body: 'Banks quote a rate range. The minimum rate applies to their best customers — strong credit history, high income, good collateral. The maximum rate applies to higher-risk borrowers. Always ask which rate you personally qualify for.' },
              { step: '02', title: 'Factor in the total cost, not just the rate', body: 'Processing fees, insurance requirements and collateral valuation costs add to the effective cost of a loan. A bank with a 13% rate and ETB 5,000 in fees may cost more than a bank with a 13.5% rate and no fees on a small loan.' },
              { step: '03', title: 'Collateral requirements vary significantly', body: 'Most Ethiopian banks require collateral for personal loans above ETB 50,000. CBE accepts vehicle logbooks and land title deeds. Some private banks offer unsecured personal loans at higher rates. Always compare collateral requirements alongside rates.' },
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
            <Link href="/guides" className="inline-flex items-center gap-2 text-sm font-bold" style={{ color: PILLAR }}>
              Read all banking guides <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* DARK TRUST */}
      <section className="border-b border-slate-100" style={{ background: '#0f172a', padding: '72px 32px' }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: '#93c5fd' }}>Data integrity</p>
            <h3 className="font-serif font-bold mb-2" style={{ fontSize: 'clamp(22px, 2.5vw, 30px)', color: '#ffffff', letterSpacing: '-0.8px' }}>
              Every rate has a verified date. Always.
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: 1.75, maxWidth: 480 }}>
              Loan rates are sourced from official bank websites and verified weekly.
              Any rate older than 7 days is flagged automatically.
            </p>
          </div>
          <Link href="/banking/savings-rates" className="font-bold rounded-full shrink-0"
            style={{ fontSize: 14, padding: '14px 28px', background: '#1D4ED8', color: '#fff', whiteSpace: 'nowrap', boxShadow: '0 4px 20px rgba(29,78,216,0.25)' }}>
            Compare savings rates →
          </Link>
        </div>
      </section>

      {/* EMAIL */}
      <section className="bg-white" style={{ padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Loan rate alerts</p>
            <h2 className="font-serif font-bold text-slate-950 mb-5" style={{ fontSize: 'clamp(30px, 3.5vw, 42px)', letterSpacing: '-1.5px', lineHeight: 1.1 }}>
              Rate changes,<br /><span style={{ color: PILLAR }}>direct to your inbox.</span>
            </h2>
            <p className="text-slate-500 mb-8" style={{ fontSize: '15px', lineHeight: 1.85 }}>
              Get notified when banks change their loan rates — weekly digest across all {bankCount ?? 32} commercial banks.
            </p>
            <ul className="space-y-3 mb-8">
              {['Personal, home and business loan rate changes','New loan products and promotional rates','NBE lending rate directive changes','Collateral requirement updates'].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-slate-600">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><polyline points="20 6 9 17 4 12"/></svg>
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
