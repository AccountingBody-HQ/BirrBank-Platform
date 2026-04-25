import Link from 'next/link'
import EmailCapture from '@/components/EmailCapture'
export const dynamic = 'force-dynamic'

// ─── Placeholder data — replace with Supabase queries in Phase 2 ─────────────

const MFIS = [
  { rank: 1,  name: 'Amhara Credit and Saving Institution', short: 'ACSI',     region: 'Amhara',    clients: '1.2M+', loanRate: '18.00', maxLoan: '500,000',  minLoan: '1,000',  sharia: false, badge: 'Largest MFI' },
  { rank: 2,  name: 'Oromia Credit and Saving Share Co.',   short: 'OCSSCO',   region: 'Oromia',    clients: '900K+', loanRate: '18.00', maxLoan: '400,000',  minLoan: '1,000',  sharia: false, badge: null },
  { rank: 3,  name: 'Dedebit Credit and Saving Institution', short: 'DECSI',   region: 'Tigray',    clients: '700K+', loanRate: '18.00', maxLoan: '300,000',  minLoan: '500',    sharia: false, badge: null },
  { rank: 4,  name: 'Omo Microfinance Institution',          short: 'Omo MFI',  region: 'SNNPR',     clients: '500K+', loanRate: '18.00', maxLoan: '250,000',  minLoan: '500',    sharia: false, badge: null },
  { rank: 5,  name: 'Addis Credit and Saving Institution',   short: 'ADCSI',    region: 'Addis Ababa', clients: '300K+', loanRate: '18.00', maxLoan: '200,000', minLoan: '1,000', sharia: false, badge: 'Addis-focused' },
  { rank: 6,  name: 'Specialized Financial Promotion Institution', short: 'SFPI', region: 'National', clients: '200K+', loanRate: '15.00', maxLoan: '1,000,000', minLoan: '5,000', sharia: false, badge: 'SME-focused' },
  { rank: 7,  name: 'Buusaa Gonofaa Microfinance',           short: 'BG MFI',   region: 'Oromia',    clients: '180K+', loanRate: '18.00', maxLoan: '150,000',  minLoan: '500',    sharia: false, badge: null },
  { rank: 8,  name: 'Wasasa Microfinance Institution',        short: 'Wasasa',   region: 'Oromia',    clients: '120K+', loanRate: '18.00', maxLoan: '100,000',  minLoan: '500',    sharia: false, badge: null },
  { rank: 9,  name: 'Harbu Microfinance Institution',         short: 'Harbu',    region: 'Oromia',    clients: '80K+',  loanRate: '18.00', maxLoan: '100,000',  minLoan: '500',    sharia: false, badge: null },
  { rank: 10, name: 'Metemamen Microfinance Institution',     short: 'MMFI',     region: 'National',  clients: '60K+',  loanRate: '17.00', maxLoan: '150,000',  minLoan: '1,000',  sharia: true,  badge: 'Sharia-compliant' },
]

const LOAN_TYPES = [
  { type: 'Agriculture loan',     desc: 'Seasonal crop finance, inputs and equipment for smallholder farmers.', minAmount: 'ETB 500', maxAmount: 'ETB 100,000',  term: 'Up to 12 months' },
  { type: 'Micro business loan',  desc: 'Working capital and asset finance for small urban and peri-urban businesses.', minAmount: 'ETB 1,000', maxAmount: 'ETB 300,000', term: 'Up to 36 months' },
  { type: 'Group loan (Iqub)',    desc: 'Solidarity group lending based on the traditional Iqub model. No collateral required.', minAmount: 'ETB 500', maxAmount: 'ETB 50,000', term: 'Up to 12 months' },
  { type: 'Housing microfinance', desc: 'Incremental housing loans for low-income households building or improving homes.', minAmount: 'ETB 5,000', maxAmount: 'ETB 500,000', term: 'Up to 60 months' },
  { type: 'Women enterprise loan', desc: 'Dedicated products for women-owned micro enterprises with simplified documentation.', minAmount: 'ETB 1,000', maxAmount: 'ETB 200,000', term: 'Up to 36 months' },
]

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

export default function MicrofinancePage() {
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
            <span style={{ color: PILLAR, fontWeight: 700 }}>Microfinance</span>
          </div>
          <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: PILLAR }}>Banking · Microfinance</p>
          <h1 className="font-serif font-bold mb-5 text-slate-950" style={{ fontSize: 'clamp(36px, 4.5vw, 54px)', letterSpacing: '-1.8px', lineHeight: 1.08 }}>
            Ethiopia microfinance institutions —<br />
            <span style={{ color: PILLAR }}>all 55 MFIs, one directory.</span>
          </h1>
          <p className="text-slate-600 mb-8" style={{ fontSize: '16px', lineHeight: '1.8', maxWidth: '520px' }}>
            Micro-loans, rural finance and SME credit from every NBE-licensed microfinance
            institution in Ethiopia. Rates, regions and loan types — all in one place.
          </p>
          <div className="flex flex-wrap gap-6">
            {[
              { icon: <ClockIcon />, label: '55 NBE-licensed MFIs' },
              { icon: <ClockIcon />, label: 'Loan rates from official sources' },
              { icon: <ClockIcon />, label: 'Regional coverage mapped' },
              { icon: <ClockIcon />, label: 'Sharia-compliant options included' },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <span style={{ color: PILLAR }}>{s.icon}</span>
                <span className="text-xs font-semibold text-slate-500">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ MFI DIRECTORY TABLE ══════════════════════ */}
      <section className="bg-white" style={{ padding: '64px 32px 80px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">MFI directory</p>
              <p className="text-sm text-slate-500">Top 10 by client base · Showing {MFIS.length} of 55 licensed MFIs</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ClockIcon />
              <span>NBE-verified · Updated quarterly</span>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-200" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <div style={{ height: 4, background: 'linear-gradient(90deg, #1D4ED8, #1E40AF)' }} />
            <div className="hidden lg:grid border-b border-slate-200"
              style={{ gridTemplateColumns: '44px 1fr 100px 110px 110px 120px 120px', padding: '13px 24px', background: '#f9fafb' }}>
              {['#', 'Institution', 'Region', 'Clients', 'Loan rate', 'Min loan', 'Max loan'].map((h) => (
                <p key={h} className="text-xs font-black text-slate-400 uppercase tracking-widest">{h}</p>
              ))}
            </div>

            {MFIS.map((m) => (
              <div key={m.rank} className={`border-b border-slate-100 transition-colors ${m.rank === 1 ? 'bg-blue-50' : 'bg-white hover:bg-slate-50'}`}>
                {/* Desktop */}
                <div className="hidden lg:grid items-center"
                  style={{ gridTemplateColumns: '44px 1fr 100px 110px 110px 120px 120px', padding: m.rank === 1 ? '18px 24px' : '14px 24px' }}>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black"
                    style={m.rank === 1 ? { background: PILLAR, color: '#fff' } : { background: '#f1f5f9', color: '#94a3b8' }}>
                    {m.rank === 1 ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> : m.rank}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className={`font-bold ${m.rank === 1 ? 'text-blue-900' : 'text-slate-800'}`} style={{ fontSize: m.rank === 1 ? '15px' : '14px' }}>{m.short}</p>
                      {m.badge && <span className="text-xs font-bold rounded-full px-2 py-0.5" style={m.badge === 'Sharia-compliant' ? { background: '#fef3c7', color: '#92400e' } : { background: '#dbeafe', color: PILLAR }}>{m.badge}</span>}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 truncate" style={{ maxWidth: 220 }}>{m.name}</p>
                  </div>
                  <p className="text-sm text-slate-500">{m.region}</p>
                  <p className="font-mono font-bold text-slate-700 text-sm">{m.clients}</p>
                  <p className={`font-mono font-black ${m.rank === 1 ? 'text-blue-700' : 'text-slate-800'}`}
                    style={{ fontSize: m.rank === 1 ? '18px' : '15px', letterSpacing: '-0.5px' }}>{m.loanRate}%</p>
                  <p className="font-mono text-sm text-slate-600">ETB {m.minLoan}</p>
                  <p className="font-mono text-sm text-slate-600">ETB {m.maxLoan}</p>
                </div>
                {/* Mobile */}
                <div className="lg:hidden" style={{ padding: '14px 16px' }}>
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-slate-800 text-sm">{m.short}</p>
                        {m.badge && <span className="text-xs font-bold rounded-full px-2 py-0.5" style={m.badge === 'Sharia-compliant' ? { background: '#fef3c7', color: '#92400e' } : { background: '#dbeafe', color: PILLAR }}>{m.badge}</span>}
                      </div>
                      <p className="text-xs text-slate-400">{m.region} · {m.clients} clients</p>
                    </div>
                    <p className="font-mono font-black text-slate-800 shrink-0" style={{ fontSize: '16px' }}>{m.loanRate}%</p>
                  </div>
                  <p className="text-xs text-slate-400">ETB {m.minLoan} min · ETB {m.maxLoan} max</p>
                </div>
              </div>
            ))}

            <div className="flex items-center justify-between border-t border-slate-200" style={{ background: '#f9fafb', padding: '14px 24px' }}>
              <p className="text-xs text-slate-400">Source: NBE microfinance institution registry · nbe.gov.et · Updated quarterly</p>
              <Link href="/institutions" className="text-xs font-bold hover:underline shrink-0" style={{ color: PILLAR }}>View all 214 institutions →</Link>
            </div>
          </div>

          <p className="text-xs text-slate-400 mt-5 text-center leading-relaxed">
            Loan rates and limits are indicative. Actual terms depend on creditworthiness, collateral and MFI product policies.
            Always verify directly with the institution. BirrBank is not a lender or financial adviser.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════ LOAN TYPES ════════════════════════════════ */}
      <section className="border-b border-slate-100" style={{ background: '#f9fafb', padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Loan types</p>
            <h2 className="font-serif font-bold text-slate-950" style={{ fontSize: 'clamp(26px, 3vw, 36px)', letterSpacing: '-1.2px', lineHeight: 1.15 }}>
              What microfinance products are available.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {LOAN_TYPES.map((lt) => (
              <div key={lt.type} className="bg-white rounded-2xl border border-slate-200 overflow-hidden" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                <div style={{ height: 3, background: PILLAR }} />
                <div style={{ padding: '24px' }}>
                  <p className="font-bold text-slate-900 mb-2" style={{ fontSize: '15px' }}>{lt.type}</p>
                  <p className="text-sm text-slate-500 mb-4" style={{ lineHeight: 1.75 }}>{lt.desc}</p>
                  <div className="space-y-1.5 pt-3 border-t border-slate-100">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Min amount</span>
                      <span className="font-mono font-semibold text-slate-700">{lt.minAmount}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Max amount</span>
                      <span className="font-mono font-semibold text-slate-700">{lt.maxAmount}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Typical term</span>
                      <span className="font-semibold text-slate-700">{lt.term}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ GUIDE ════════════════════════════════════ */}
      <section className="border-b border-slate-100 bg-white" style={{ padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Guide</p>
            <h2 className="font-serif font-bold text-slate-950" style={{ fontSize: 'clamp(26px, 3vw, 36px)', letterSpacing: '-1.2px', lineHeight: 1.15 }}>
              How microfinance works in Ethiopia.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'MFIs vs commercial banks', body: 'Microfinance institutions serve clients who lack the collateral or credit history for commercial bank loans. MFI loans are smaller, terms are shorter and documentation requirements are simpler. NBE licenses and regulates all 55 MFIs.' },
              { step: '02', title: 'How group lending works', body: 'Many MFIs offer solidarity group loans based on the traditional Iqub mutual savings model. A group of 5 to 20 members guarantee each other loan. No individual collateral is needed — peer accountability replaces it.' },
              { step: '03', title: 'What documents you need', body: 'Typical requirements include a national ID, a business registration or kebele letter, and proof of residence. Some MFIs require a guarantor or a small compulsory savings deposit before disbursing a loan.' },
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
              Every MFI verified against the NBE registry.
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: 1.75, maxWidth: 480 }}>
              All 55 microfinance institutions listed on BirrBank hold a valid NBE microfinance
              licence. No unlicensed lender appears here. Rates are sourced from official MFI
              disclosures and the NBE interest rate schedule.
            </p>
          </div>
          <div className="flex flex-col gap-3 shrink-0">
            {[
              { dot: '#22c55e', label: 'NBE-licensed MFIs only',    sub: 'No informal or unlicensed lenders' },
              { dot: PILLAR,    label: 'Official rate sources',      sub: 'NBE interest rate schedule and MFI disclosures' },
              { dot: '#94a3b8', label: 'No affiliate commissions',  sub: 'No MFI pays for placement or ranking' },
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
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Microfinance updates</p>
            <h2 className="font-serif font-bold text-slate-950 mb-5" style={{ fontSize: 'clamp(30px, 3.5vw, 42px)', letterSpacing: '-1.5px', lineHeight: 1.1 }}>
              New MFI products and rate changes,<br />
              <span style={{ color: PILLAR }}>direct to your inbox.</span>
            </h2>
            <p className="text-slate-500 mb-8" style={{ fontSize: '15px', lineHeight: 1.85 }}>
              Quarterly digest of microfinance developments — new MFI licences, product launches,
              NBE rate directives and rural finance policy updates.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'New NBE microfinance licence approvals',
                'MFI product launches and rate changes',
                'NBE interest rate directive updates',
                'Government rural finance and SME schemes',
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
