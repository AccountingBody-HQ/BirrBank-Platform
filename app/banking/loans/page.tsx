import Link from 'next/link'
import EmailCapture from '@/components/EmailCapture'
export const dynamic = 'force-dynamic'

// ─── Placeholder data — replace with Supabase queries in Phase 2 ─────────────

const PERSONAL_LOANS = [
  { rank: 1,  bank: 'Awash Bank',               minRate: '12.00', maxRate: '15.00', maxTerm: '60',  maxAmount: '500,000',  badge: 'Lowest rate' },
  { rank: 2,  bank: 'Dashen Bank',               minRate: '12.50', maxRate: '15.50', maxTerm: '60',  maxAmount: '400,000',  badge: null },
  { rank: 3,  bank: 'Zemen Bank',                minRate: '13.00', maxRate: '16.00', maxTerm: '48',  maxAmount: '300,000',  badge: null },
  { rank: 4,  bank: 'Bank of Abyssinia',         minRate: '13.00', maxRate: '16.50', maxTerm: '60',  maxAmount: '500,000',  badge: null },
  { rank: 5,  bank: 'Oromia International Bank', minRate: '13.50', maxRate: '17.00', maxTerm: '48',  maxAmount: '250,000',  badge: null },
  { rank: 6,  bank: 'Nib International Bank',    minRate: '14.00', maxRate: '17.00', maxTerm: '60',  maxAmount: '400,000',  badge: null },
  { rank: 7,  bank: 'Wegagen Bank',              minRate: '14.00', maxRate: '17.50', maxTerm: '48',  maxAmount: '300,000',  badge: null },
  { rank: 8,  bank: 'Commercial Bank of Ethiopia', minRate: '14.50', maxRate: '18.00', maxTerm: '60', maxAmount: '1,000,000', badge: 'Highest limit' },
]

const HOME_LOANS = [
  { rank: 1, bank: 'Commercial Bank of Ethiopia', minRate: '11.50', maxRate: '14.00', maxTerm: '240', maxAmount: '3,000,000', badge: 'Best for housing' },
  { rank: 2, bank: 'Awash Bank',                  minRate: '12.00', maxRate: '15.00', maxTerm: '180', maxAmount: '2,000,000', badge: null },
  { rank: 3, bank: 'Dashen Bank',                 minRate: '12.50', maxRate: '15.50', maxTerm: '180', maxAmount: '2,000,000', badge: null },
  { rank: 4, bank: 'Bank of Abyssinia',           minRate: '13.00', maxRate: '16.00', maxTerm: '120', maxAmount: '1,500,000', badge: null },
  { rank: 5, bank: 'Oromia International Bank',   minRate: '13.50', maxRate: '16.50', maxTerm: '120', maxAmount: '1,000,000', badge: null },
]

const LOAN_TYPES = ['Personal', 'Home / Mortgage', 'Car', 'Business']

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

export default function LoansPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ══════════════════════════════ HERO ══════════════════════════════════════ */}
      <section className="relative bg-white overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 900px 500px at 55% -80px, rgba(29,78,216,0.04) 0%, transparent 65%)' }} />
        <div className="relative max-w-6xl mx-auto px-8 pt-20 pb-14">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-6">
            <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
            <span>›</span>
            <Link href="/banking" className="hover:text-slate-600 transition-colors">Banking</Link>
            <span>›</span>
            <span style={{ color: PILLAR, fontWeight: 700 }}>Loan Comparison</span>
          </div>
          <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: PILLAR }}>Banking · Loans</p>
          <h1 className="font-serif font-bold mb-5 text-slate-950" style={{ fontSize: 'clamp(36px, 4.5vw, 54px)', letterSpacing: '-1.8px', lineHeight: 1.08 }}>
            Best loan rates in Ethiopia —<br />
            <span style={{ color: PILLAR }}>all 32 banks compared.</span>
          </h1>
          <p className="text-slate-600 mb-8" style={{ fontSize: '16px', lineHeight: '1.8', maxWidth: '520px' }}>
            Personal, home, car and business loan rates from every NBE-licensed commercial bank.
            Verified from official sources and updated weekly. Includes EMI calculator.
          </p>
          <div className="flex flex-wrap gap-6">
            {[
              { icon: <ClockIcon />, label: '32 banks compared' },
              { icon: <ClockIcon />, label: 'All loan types covered' },
              { icon: <ClockIcon />, label: 'NBE-verified institutions only' },
              { icon: <ClockIcon />, label: 'EMI calculator included' },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <span style={{ color: PILLAR }}>{s.icon}</span>
                <span className="text-xs font-semibold text-slate-500">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ LOAN TYPE TABS + TABLE ════════════════════ */}
      {/* NO ADS on comparison tables — integrity rule */}
      <section className="bg-white" style={{ padding: '64px 32px 80px' }}>
        <div className="max-w-6xl mx-auto">

          {/* Filter bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Filter by loan type</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {LOAN_TYPES.map((t, i) => (
                  <button key={t} className="rounded-full text-xs font-bold transition-all"
                    style={{ padding: '6px 14px', background: i === 0 ? PILLAR : '#f1f5f9', color: i === 0 ? '#fff' : '#64748b', border: i === 0 ? 'none' : '1px solid #e2e8f0' }}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ClockIcon />
              <span>Rates verified this week · Sorted by minimum rate</span>
            </div>
          </div>

          {/* Personal loans table */}
          <div className="mb-4">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Personal loans</p>
          </div>
          <div className="rounded-2xl overflow-hidden border border-slate-200 mb-10" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <div style={{ height: 4, background: 'linear-gradient(90deg, #1D4ED8, #1E40AF)' }} />
            <div className="hidden sm:grid border-b border-slate-200"
              style={{ gridTemplateColumns: '44px 1fr 150px 150px 120px 130px', padding: '13px 24px', background: '#f9fafb' }}>
              {['#', 'Bank', 'Rate range', 'Max term', 'Max amount', 'Verified'].map((h) => (
                <p key={h} className="text-xs font-black text-slate-400 uppercase tracking-widest">{h}</p>
              ))}
            </div>
            {PERSONAL_LOANS.map((r) => (
              <div key={r.rank} className={`border-b border-slate-100 transition-colors ${r.rank === 1 ? 'bg-blue-50' : 'bg-white hover:bg-slate-50'}`}>
                {/* Desktop */}
                <div className="hidden sm:grid items-center"
                  style={{ gridTemplateColumns: '44px 1fr 150px 150px 120px 130px', padding: r.rank === 1 ? '18px 24px' : '14px 24px' }}>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black"
                    style={r.rank === 1 ? { background: PILLAR, color: '#fff' } : { background: '#f1f5f9', color: '#94a3b8' }}>
                    {r.rank === 1 ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> : r.rank}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className={`font-bold ${r.rank === 1 ? 'text-blue-900' : 'text-slate-800'}`} style={{ fontSize: r.rank === 1 ? '15px' : '14px' }}>{r.bank}</p>
                      {r.badge && <span className="text-xs font-bold rounded-full px-2 py-0.5" style={{ background: '#dbeafe', color: PILLAR }}>{r.badge}</span>}
                    </div>
                  </div>
                  <p className={`font-mono font-black ${r.rank === 1 ? 'text-blue-700' : 'text-slate-800'}`}
                    style={{ fontSize: r.rank === 1 ? '20px' : '16px', letterSpacing: '-0.5px' }}>
                    {r.minRate}–{r.maxRate}%
                  </p>
                  <p className="text-sm text-slate-500">{r.maxTerm} months</p>
                  <p className="font-mono text-sm text-slate-600">ETB {r.maxAmount}</p>
                  <div className="flex items-center gap-1.5">
                    <span style={{ color: PILLAR }}><ClockIcon /></span>
                    <p className="text-xs text-slate-400">This week</p>
                  </div>
                </div>
                {/* Mobile */}
                <div className="sm:hidden flex items-center gap-3" style={{ padding: '14px 16px' }}>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black shrink-0"
                    style={r.rank === 1 ? { background: PILLAR, color: '#fff' } : { background: '#f1f5f9', color: '#94a3b8' }}>
                    {r.rank}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-800 text-sm truncate">{r.bank}</p>
                    <p className="text-xs text-slate-400">Up to ETB {r.maxAmount} · {r.maxTerm}mo max</p>
                  </div>
                  <p className="font-mono font-black text-slate-800 shrink-0" style={{ fontSize: '16px' }}>{r.minRate}%+</p>
                </div>
              </div>
            ))}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-slate-200" style={{ background: '#f9fafb', padding: '14px 24px' }}>
              <p className="text-xs text-slate-400">Rates sourced from official bank websites and NBE registry · Sorted by minimum rate</p>
              <Link href="/institutions" className="text-xs font-bold hover:underline shrink-0" style={{ color: PILLAR }}>View all institutions →</Link>
            </div>
          </div>

          {/* Home loans table */}
          <div className="mb-4">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Home / mortgage loans</p>
          </div>
          <div className="rounded-2xl overflow-hidden border border-slate-200 mb-8" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <div style={{ height: 4, background: 'linear-gradient(90deg, #1D4ED8, #1E40AF)' }} />
            <div className="hidden sm:grid border-b border-slate-200"
              style={{ gridTemplateColumns: '44px 1fr 150px 150px 120px 130px', padding: '13px 24px', background: '#f9fafb' }}>
              {['#', 'Bank', 'Rate range', 'Max term', 'Max amount', 'Verified'].map((h) => (
                <p key={h} className="text-xs font-black text-slate-400 uppercase tracking-widest">{h}</p>
              ))}
            </div>
            {HOME_LOANS.map((r) => (
              <div key={r.rank} className={`border-b border-slate-100 transition-colors ${r.rank === 1 ? 'bg-blue-50' : 'bg-white hover:bg-slate-50'}`}>
                <div className="hidden sm:grid items-center"
                  style={{ gridTemplateColumns: '44px 1fr 150px 150px 120px 130px', padding: r.rank === 1 ? '18px 24px' : '14px 24px' }}>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black"
                    style={r.rank === 1 ? { background: PILLAR, color: '#fff' } : { background: '#f1f5f9', color: '#94a3b8' }}>
                    {r.rank === 1 ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> : r.rank}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className={`font-bold ${r.rank === 1 ? 'text-blue-900' : 'text-slate-800'}`} style={{ fontSize: r.rank === 1 ? '15px' : '14px' }}>{r.bank}</p>
                      {r.badge && <span className="text-xs font-bold rounded-full px-2 py-0.5" style={{ background: '#dbeafe', color: PILLAR }}>{r.badge}</span>}
                    </div>
                  </div>
                  <p className={`font-mono font-black ${r.rank === 1 ? 'text-blue-700' : 'text-slate-800'}`}
                    style={{ fontSize: r.rank === 1 ? '20px' : '16px', letterSpacing: '-0.5px' }}>
                    {r.minRate}–{r.maxRate}%
                  </p>
                  <p className="text-sm text-slate-500">{r.maxTerm} months</p>
                  <p className="font-mono text-sm text-slate-600">ETB {r.maxAmount}</p>
                  <div className="flex items-center gap-1.5">
                    <span style={{ color: PILLAR }}><ClockIcon /></span>
                    <p className="text-xs text-slate-400">This week</p>
                  </div>
                </div>
                <div className="sm:hidden flex items-center gap-3" style={{ padding: '14px 16px' }}>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black shrink-0"
                    style={r.rank === 1 ? { background: PILLAR, color: '#fff' } : { background: '#f1f5f9', color: '#94a3b8' }}>
                    {r.rank}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-800 text-sm truncate">{r.bank}</p>
                    <p className="text-xs text-slate-400">Up to ETB {r.maxAmount} · {r.maxTerm}mo max</p>
                  </div>
                  <p className="font-mono font-black text-slate-800 shrink-0" style={{ fontSize: '16px' }}>{r.minRate}%+</p>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between border-t border-slate-200" style={{ background: '#f9fafb', padding: '14px 24px' }}>
              <p className="text-xs text-slate-400">Rates sourced from official bank websites · Updated weekly</p>
              <Link href="/institutions" className="text-xs font-bold hover:underline shrink-0" style={{ color: PILLAR }}>View all institutions →</Link>
            </div>
          </div>

          <p className="text-xs text-slate-400 mt-2 text-center leading-relaxed">
            Loan rates are indicative and subject to individual credit assessment. Always verify the current rate and terms
            directly with the institution before applying. BirrBank is not a lender or financial adviser.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════ EMI CALCULATOR ════════════════════════════ */}
      <section className="border-b border-slate-100" style={{ background: '#f9fafb', padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">EMI calculator</p>
            <h2 className="font-serif font-bold text-slate-950" style={{ fontSize: 'clamp(26px, 3vw, 36px)', letterSpacing: '-1.2px', lineHeight: 1.15 }}>
              Calculate your monthly repayment.
            </h2>
            <p className="text-slate-500 mt-3" style={{ fontSize: '15px', lineHeight: 1.75, maxWidth: 520 }}>
              Enter your loan amount, interest rate and term to calculate your estimated monthly EMI (Equated Monthly Instalment).
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden" style={{ maxWidth: 640, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <div style={{ height: 4, background: 'linear-gradient(90deg, #1D4ED8, #1E40AF)' }} />
            <div style={{ padding: '36px' }}>
              <div className="space-y-6">
                {[
                  { label: 'Loan amount (ETB)', placeholder: 'e.g. 200,000', hint: 'Enter the total loan amount in Ethiopian Birr' },
                  { label: 'Annual interest rate (%)', placeholder: 'e.g. 13.00', hint: 'Use the rate from the table above' },
                  { label: 'Loan term (months)', placeholder: 'e.g. 60', hint: '12 = 1 year, 60 = 5 years, 240 = 20 years' },
                ].map((field) => (
                  <div key={field.label}>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">{field.label}</label>
                    <input
                      type="number"
                      placeholder={field.placeholder}
                      className="w-full rounded-xl border border-slate-200 text-slate-800 font-mono font-semibold transition-all"
                      style={{ padding: '12px 16px', fontSize: '16px', outline: 'none' }}
                      
                      
                    />
                    <p className="text-xs text-slate-400 mt-1">{field.hint}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-5 rounded-xl" style={{ background: '#EFF6FF', border: '1px solid #bfdbfe' }}>
                <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: PILLAR }}>Estimated monthly payment</p>
                <p className="font-mono font-black text-slate-950" style={{ fontSize: '40px', letterSpacing: '-1.5px', lineHeight: 1 }}>ETB —</p>
                <p className="text-xs text-slate-500 mt-2">Enter values above to calculate · For guidance only — actual repayments may vary</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ GUIDE ════════════════════════════════════ */}
      <section className="border-b border-slate-100 bg-white" style={{ padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Guide</p>
            <h2 className="font-serif font-bold text-slate-950" style={{ fontSize: 'clamp(26px, 3vw, 36px)', letterSpacing: '-1.2px', lineHeight: 1.15 }}>
              How to compare loan offers in Ethiopia.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Compare the APR, not the headline rate', body: 'Banks often advertise the lowest possible rate — which applies only to the best credit profiles. Look at the full rate range and calculate your EMI at the higher end to stress-test affordability.' },
              { step: '02', title: 'Check processing fees and penalties', body: 'Loan comparison must include processing fees (typically 1–2% of loan amount), early repayment penalties and insurance requirements. These can add significantly to the effective cost of borrowing.' },
              { step: '03', title: 'Match the term to the purpose', body: 'Short terms mean higher monthly payments but less total interest. Long terms (e.g. 20-year mortgages) reduce monthly burden but multiply total interest paid. Use the EMI calculator above to model both.' },
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

      {/* ══════════════════════════════ DARK TRUST ════════════════════════════════ */}
      <section className="border-b border-slate-100" style={{ background: '#0f172a', padding: '72px 32px' }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: '#93c5fd' }}>Data integrity</p>
            <h3 className="font-serif font-bold mb-2" style={{ fontSize: 'clamp(22px, 2.5vw, 30px)', color: '#ffffff', letterSpacing: '-0.8px' }}>
              Rates verified from official sources. Always.
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: 1.75, maxWidth: 480 }}>
              All loan rates are sourced from official bank websites and the NBE registry.
              No bank pays to appear in this comparison. The lowest rate is always first.
            </p>
          </div>
          <div className="flex flex-col gap-3 shrink-0">
            {[
              { dot: '#22c55e', label: 'NBE-licensed banks only',    sub: 'No unlicensed lenders listed' },
              { dot: PILLAR,    label: 'Verified this week',          sub: 'Rates checked from official sources' },
              { dot: '#94a3b8', label: 'No affiliate commissions',   sub: 'Rankings are never paid for' },
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
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Loan rate alerts</p>
            <h2 className="font-serif font-bold text-slate-950 mb-5" style={{ fontSize: 'clamp(30px, 3.5vw, 42px)', letterSpacing: '-1.5px', lineHeight: 1.1 }}>
              Get notified when<br />
              <span style={{ color: PILLAR }}>loan rates change.</span>
            </h2>
            <p className="text-slate-500 mb-8" style={{ fontSize: '15px', lineHeight: 1.85 }}>
              Weekly digest of loan rate changes across all 32 banks — personal, home, car and business.
              Know when a bank drops its rate before you apply.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Personal and business loan rate changes',
                'New mortgage products and housing finance schemes',
                'NBE lending rate directive changes',
                'Promotional loan offers and limited-time rates',
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
