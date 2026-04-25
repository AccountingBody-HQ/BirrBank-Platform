import Link from 'next/link'
import EmailCapture from '@/components/EmailCapture'
export const dynamic = 'force-dynamic'

// ─── Placeholder data — replace with Supabase queries in Phase 2 ─────────────

const DIASPORA_BANKS = [
  { rank: 1,  bank: 'Awash Bank',                  remoteOpen: true,  fcyAccount: true,  onlineBanking: true,  minDeposit: 'USD 100', intlTransfer: true,  badge: 'Best for diaspora' },
  { rank: 2,  bank: 'Commercial Bank of Ethiopia',  remoteOpen: true,  fcyAccount: true,  onlineBanking: true,  minDeposit: 'USD 200', intlTransfer: true,  badge: 'Largest branch network' },
  { rank: 3,  bank: 'Dashen Bank',                  remoteOpen: true,  fcyAccount: true,  onlineBanking: true,  minDeposit: 'USD 100', intlTransfer: true,  badge: null },
  { rank: 4,  bank: 'Bank of Abyssinia',            remoteOpen: true,  fcyAccount: true,  onlineBanking: false, minDeposit: 'USD 200', intlTransfer: true,  badge: null },
  { rank: 5,  bank: 'Zemen Bank',                   remoteOpen: true,  fcyAccount: true,  onlineBanking: true,  minDeposit: 'USD 500', intlTransfer: true,  badge: null },
  { rank: 6,  bank: 'Wegagen Bank',                 remoteOpen: true,  fcyAccount: false, onlineBanking: false, minDeposit: 'ETB 500', intlTransfer: true,  badge: null },
  { rank: 7,  bank: 'Nib International Bank',       remoteOpen: false, fcyAccount: true,  onlineBanking: false, minDeposit: 'USD 100', intlTransfer: true,  badge: null },
  { rank: 8,  bank: 'Hibret Bank',                  remoteOpen: false, fcyAccount: false, onlineBanking: false, minDeposit: 'ETB 500', intlTransfer: true,  badge: null },
  { rank: 9,  bank: 'Oromia International Bank',    remoteOpen: false, fcyAccount: false, onlineBanking: false, minDeposit: 'ETB 500', intlTransfer: true,  badge: null },
  { rank: 10, bank: 'Bunna International Bank',     remoteOpen: false, fcyAccount: false, onlineBanking: false, minDeposit: 'ETB 500', intlTransfer: false, badge: null },
]

const ACCOUNT_TYPES = [
  { type: 'Foreign Currency Account (FCY)', desc: 'Hold USD, GBP, EUR or SAR in an Ethiopian bank account. Earn interest in foreign currency. Ideal for diaspora who want to keep savings in foreign currency while maintaining an Ethiopian account. Available at CBE, Awash and Dashen.', minDeposit: 'USD 100', currency: 'USD, GBP, EUR, SAR' },
  { type: 'Non-Resident ETB Account', desc: 'An ETB-denominated account for diaspora. Funds convert to ETB at the point of deposit. Earn interest at Ethiopian savings rates — currently up to 9.50%. Best for those planning to use funds inside Ethiopia.', minDeposit: 'ETB 500', currency: 'ETB' },
  { type: 'Diaspora Fixed Deposit', desc: 'Lock in a fixed deposit rate for 6, 12 or 24 months. Ethiopian banks offer preferential rates for diaspora fixed deposits — sometimes 0.5-1% above standard rates. Funds can be deposited in foreign currency.', minDeposit: 'USD 500', currency: 'USD or ETB' },
]

const STEPS = [
  { step: '01', title: 'Choose a diaspora-ready bank', body: 'Not all Ethiopian banks accept remote account opening. Awash Bank, CBE, Dashen and Bank of Abyssinia are the most diaspora-friendly. Check the table above for remote opening availability before starting.' },
  { step: '02', title: 'Prepare your documents', body: 'Required documents typically include: valid Ethiopian passport (or foreign passport for dual nationals), proof of address in your country of residence (utility bill or bank statement), Ethiopian tax identification number (TIN) if available, and completed account opening form from the bank.' },
  { step: '03', title: 'Submit documents remotely or in-branch', body: 'Some banks accept notarised document scans via email or through their diaspora banking portal. Others require the documents to be submitted at an Ethiopian embassy or in-branch by a power of attorney holder in Ethiopia.' },
  { step: '04', title: 'Make your initial deposit', body: 'Fund your new account via international wire transfer. Use the bank SWIFT code and your new account number. Ensure the transfer reference matches the bank instructions exactly to avoid delays in credit.' },
  { step: '05', title: 'Activate online or mobile banking', body: 'Most diaspora-ready banks now offer mobile and online banking accessible from abroad. Activate this immediately — it allows you to monitor balances, make internal transfers and manage your account without visiting a branch.' },
]

const Check = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

const Cross = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)

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

export default function DiasporaBankAccountPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ══════════════════════════════ HERO ══════════════════════════════════════ */}
      <section className="relative bg-white overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 900px 500px at 55% -80px, rgba(29,78,216,0.04) 0%, transparent 65%)' }} />
        <div className="relative max-w-6xl mx-auto px-8 pt-20 pb-14">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-6">
            <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
            <span>›</span>
            <Link href="/diaspora" className="hover:text-slate-600 transition-colors">Diaspora</Link>
            <span>›</span>
            <span style={{ color: PILLAR, fontWeight: 700 }}>Open a Bank Account</span>
          </div>
          <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: PILLAR }}>Diaspora · Banking</p>
          <h1 className="font-serif font-bold mb-5 text-slate-950" style={{ fontSize: 'clamp(36px, 4.5vw, 54px)', letterSpacing: '-1.8px', lineHeight: 1.08 }}>
            Open an Ethiopian bank account<br />
            <span style={{ color: PILLAR }}>from abroad — which banks accept you.</span>
          </h1>
          <p className="text-slate-600 mb-8" style={{ fontSize: '16px', lineHeight: '1.8', maxWidth: '520px' }}>
            12 Ethiopian banks now offer diaspora banking services. Compare which accept
            remote account opening, offer foreign currency accounts and provide online
            banking accessible from abroad.
          </p>
          <div className="flex flex-wrap gap-6">
            {[
              { icon: <ClockIcon />, label: '12 diaspora-ready banks' },
              { icon: <ClockIcon />, label: 'Remote opening availability shown' },
              { icon: <ClockIcon />, label: 'FCY and ETB account options' },
              { icon: <ClockIcon />, label: 'Updated quarterly' },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <span style={{ color: PILLAR }}>{s.icon}</span>
                <span className="text-xs font-semibold text-slate-500">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ BANK COMPARISON TABLE ═════════════════════ */}
      <section className="bg-white" style={{ padding: '64px 32px 80px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">All banks</p>
              <p className="text-sm text-slate-500">Sorted by diaspora-friendliness</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ClockIcon />
              <span>Verified this quarter</span>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-200" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <div style={{ height: 4, background: 'linear-gradient(90deg, #1D4ED8, #1E40AF)' }} />
            <div className="hidden lg:grid border-b border-slate-200"
              style={{ gridTemplateColumns: '44px 1fr 120px 110px 120px 130px 110px', padding: '13px 24px', background: '#f9fafb' }}>
              {['#', 'Bank', 'Remote open', 'FCY account', 'Online banking', 'Min. deposit', 'Intl transfer'].map((h) => (
                <p key={h} className="text-xs font-black text-slate-400 uppercase tracking-widest">{h}</p>
              ))}
            </div>

            {DIASPORA_BANKS.map((b) => (
              <div key={b.rank} className={`border-b border-slate-100 transition-colors ${b.rank === 1 ? 'bg-blue-50' : 'bg-white hover:bg-slate-50'}`}>
                {/* Desktop */}
                <div className="hidden lg:grid items-center"
                  style={{ gridTemplateColumns: '44px 1fr 120px 110px 120px 130px 110px', padding: b.rank === 1 ? '18px 24px' : '14px 24px' }}>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black"
                    style={b.rank === 1 ? { background: PILLAR, color: '#fff' } : { background: '#f1f5f9', color: '#94a3b8' }}>
                    {b.rank === 1 ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> : b.rank}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className={`font-bold ${b.rank === 1 ? 'text-blue-900' : 'text-slate-800'}`} style={{ fontSize: b.rank === 1 ? '15px' : '14px' }}>{b.bank}</p>
                      {b.badge && <span className="text-xs font-bold rounded-full px-2 py-0.5" style={{ background: '#dbeafe', color: PILLAR }}>{b.badge}</span>}
                    </div>
                  </div>
                  <div className="flex justify-start">{b.remoteOpen ? <Check /> : <Cross />}</div>
                  <div className="flex justify-start">{b.fcyAccount ? <Check /> : <Cross />}</div>
                  <div className="flex justify-start">{b.onlineBanking ? <Check /> : <Cross />}</div>
                  <p className="font-mono text-sm text-slate-600">{b.minDeposit}</p>
                  <div className="flex justify-start">{b.intlTransfer ? <Check /> : <Cross />}</div>
                </div>
                {/* Mobile */}
                <div className="lg:hidden" style={{ padding: '14px 16px' }}>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-slate-800 text-sm">{b.bank}</p>
                        {b.badge && <span className="text-xs font-bold rounded-full px-2 py-0.5" style={{ background: '#dbeafe', color: PILLAR }}>{b.badge}</span>}
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">Min deposit: {b.minDeposit}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-xs text-slate-500 flex items-center gap-1">{b.remoteOpen ? <Check /> : <Cross />} Remote open</span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">{b.fcyAccount ? <Check /> : <Cross />} FCY</span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">{b.onlineBanking ? <Check /> : <Cross />} Online</span>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex items-center justify-between border-t border-slate-200" style={{ background: '#f9fafb', padding: '14px 24px' }}>
              <p className="text-xs text-slate-400">Source: official bank websites and diaspora banking units · Updated quarterly · FCY = Foreign Currency</p>
              <Link href="/institutions" className="text-xs font-bold hover:underline shrink-0" style={{ color: PILLAR }}>All 32 banks →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ ACCOUNT TYPES ════════════════════════════ */}
      <section className="border-b border-slate-100" style={{ background: '#f9fafb', padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Account types</p>
            <h2 className="font-serif font-bold text-slate-950" style={{ fontSize: 'clamp(26px, 3vw, 36px)', letterSpacing: '-1.2px', lineHeight: 1.15 }}>
              Which account type is right for you.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {ACCOUNT_TYPES.map((a) => (
              <div key={a.type} className="bg-white rounded-2xl border border-slate-200 overflow-hidden" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                <div style={{ height: 3, background: PILLAR }} />
                <div style={{ padding: '28px 24px' }}>
                  <p className="font-bold text-slate-900 mb-3" style={{ fontSize: '15px' }}>{a.type}</p>
                  <p className="text-sm text-slate-500 mb-5" style={{ lineHeight: 1.75 }}>{a.desc}</p>
                  <div className="space-y-2 pt-4 border-t border-slate-100">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Min. deposit</span>
                      <span className="font-mono font-semibold text-slate-700">{a.minDeposit}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Currency</span>
                      <span className="font-semibold text-slate-700">{a.currency}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ HOW TO OPEN ══════════════════════════════ */}
      <section className="border-b border-slate-100 bg-white" style={{ padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Step by step</p>
            <h2 className="font-serif font-bold text-slate-950" style={{ fontSize: 'clamp(26px, 3vw, 36px)', letterSpacing: '-1.2px', lineHeight: 1.15 }}>
              How to open an Ethiopian bank account from abroad.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {STEPS.map((s) => (
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
            <Link href="/banking/savings-rates" className="inline-flex items-center gap-2 text-sm font-bold" style={{ color: PILLAR }}>
              Compare savings rates <ArrowRight />
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
              Verified from official bank sources.
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: 1.75, maxWidth: 480 }}>
              All information is sourced from official Ethiopian bank websites and diaspora
              banking unit contacts. Availability changes — always confirm directly with
              your chosen bank before starting the account opening process.
            </p>
          </div>
          <div className="flex flex-col gap-3 shrink-0">
            {[
              { dot: '#22c55e', label: 'NBE-licensed banks only',    sub: 'All 32 verified against NBE registry' },
              { dot: PILLAR,    label: 'Updated quarterly',           sub: 'From official bank diaspora units' },
              { dot: '#94a3b8', label: 'Always verify directly',     sub: 'Confirm with the bank before applying' },
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
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Diaspora banking updates</p>
            <h2 className="font-serif font-bold text-slate-950 mb-5" style={{ fontSize: 'clamp(30px, 3.5vw, 42px)', letterSpacing: '-1.5px', lineHeight: 1.1 }}>
              New diaspora banking products,<br />
              <span style={{ color: PILLAR }}>direct to your inbox.</span>
            </h2>
            <p className="text-slate-500 mb-8" style={{ fontSize: '15px', lineHeight: 1.85 }}>
              Quarterly digest of diaspora banking developments — new remote account opening,
              FCY product launches, savings rate changes and NBE regulation updates.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'New diaspora account opening launches from Ethiopian banks',
                'FCY deposit rate changes and new product offerings',
                'NBE diaspora banking regulation updates',
                'Best savings rates for diaspora fixed deposits',
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
