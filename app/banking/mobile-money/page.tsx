import Link from 'next/link'
import EmailCapture from '@/components/EmailCapture'
export const dynamic = 'force-dynamic'

// ─── Placeholder data — replace with Supabase queries in Phase 2 ─────────────

const OPERATORS = [
  {
    rank: 1,
    name: 'TeleBirr',
    operator: 'Ethio Telecom',
    type: 'Telco wallet',
    users: '40M+',
    sendFee: '0.5%',
    maxSend: '200,000',
    ussd: '*127#',
    hasApp: true,
    merchantPay: true,
    international: true,
    badge: 'Largest network',
    desc: 'Ethiopia largest mobile money service, operated by state-owned Ethio Telecom. Available to all Ethio Telecom subscribers via USSD or app.',
  },
  {
    rank: 2,
    name: 'CBEBirr',
    operator: 'Commercial Bank of Ethiopia',
    type: 'Bank wallet',
    users: '10M+',
    sendFee: '0.3%',
    maxSend: '500,000',
    ussd: '*994#',
    hasApp: true,
    merchantPay: true,
    international: false,
    badge: 'Lowest fees',
    desc: 'CBE mobile wallet service, tightly integrated with CBE accounts. Lowest transfer fees of any major operator. Requires CBE account for full functionality.',
  },
  {
    rank: 3,
    name: 'Amole',
    operator: 'Dashen Bank',
    type: 'Bank wallet',
    users: '5M+',
    sendFee: '0.5%',
    maxSend: '300,000',
    ussd: '*805#',
    hasApp: true,
    merchantPay: true,
    international: true,
    badge: null,
    desc: 'Dashen Bank digital wallet, available to both Dashen account holders and non-customers. Strong merchant payment and international remittance features.',
  },
  {
    rank: 4,
    name: 'HelloCash',
    operator: 'Hijra Bank / Somtel',
    type: 'Telco wallet',
    users: '3M+',
    sendFee: '0.5%',
    maxSend: '150,000',
    ussd: '*855#',
    hasApp: true,
    merchantPay: true,
    international: false,
    badge: 'Sharia-compliant',
    desc: 'A Sharia-compliant mobile money service popular in eastern Ethiopia and Somali regional state. Operated jointly by Hijra Bank and Somtel.',
  },
  {
    rank: 5,
    name: 'M-Birr',
    operator: 'MOSS ICT / Multiple banks',
    type: 'Interoperable wallet',
    users: '2M+',
    sendFee: '0.6%',
    maxSend: '100,000',
    ussd: '*126#',
    hasApp: false,
    merchantPay: true,
    international: false,
    badge: null,
    desc: 'One of Ethiopia oldest mobile money services, interoperable across multiple banks and MFIs. USSD-only, no smartphone required.',
  },
  {
    rank: 6,
    name: 'Awash Birr',
    operator: 'Awash Bank',
    type: 'Bank wallet',
    users: '1M+',
    sendFee: '0.5%',
    maxSend: '200,000',
    ussd: '*910#',
    hasApp: true,
    merchantPay: true,
    international: false,
    badge: null,
    desc: 'Awash Bank mobile wallet, available to account holders and agents. Strong branch network for cash-in and cash-out.',
  },
]

const FEATURE_COMPARISON = [
  { feature: 'Send money (P2P)',         telebirr: true,  cbebirr: true,  amole: true,  hellocash: true  },
  { feature: 'Merchant payments',        telebirr: true,  cbebirr: true,  amole: true,  hellocash: true  },
  { feature: 'International remittance', telebirr: true,  cbebirr: false, amole: true,  hellocash: false },
  { feature: 'Utility bill payment',     telebirr: true,  cbebirr: true,  amole: true,  hellocash: false },
  { feature: 'Smartphone app',           telebirr: true,  cbebirr: true,  amole: true,  hellocash: true  },
  { feature: 'USSD (no smartphone)',     telebirr: true,  cbebirr: true,  amole: true,  hellocash: true  },
  { feature: 'Sharia-compliant',         telebirr: false, cbebirr: false, amole: false, hellocash: true  },
  { feature: 'Savings interest',         telebirr: false, cbebirr: true,  amole: false, hellocash: false },
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

const PILLAR = '#1D4ED8'

export default function MobileMoneyPage() {
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
            <span style={{ color: PILLAR, fontWeight: 700 }}>Mobile Money</span>
          </div>
          <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: PILLAR }}>Banking · Mobile Money</p>
          <h1 className="font-serif font-bold mb-5 text-slate-950" style={{ fontSize: 'clamp(36px, 4.5vw, 54px)', letterSpacing: '-1.8px', lineHeight: 1.08 }}>
            Ethiopia mobile money —<br />
            <span style={{ color: PILLAR }}>all operators compared.</span>
          </h1>
          <p className="text-slate-600 mb-8" style={{ fontSize: '16px', lineHeight: '1.8', maxWidth: '520px' }}>
            TeleBirr, CBEBirr, Amole, HelloCash and more — fees, limits, features and
            USSD codes for every NBE-licensed mobile payment operator in Ethiopia.
          </p>
          <div className="flex flex-wrap gap-6">
            {[
              { icon: <ClockIcon />, label: '27 licensed operators tracked' },
              { icon: <ClockIcon />, label: 'Fees verified from official sources' },
              { icon: <ClockIcon />, label: 'USSD codes included' },
              { icon: <ClockIcon />, label: 'Updated monthly' },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <span style={{ color: PILLAR }}>{s.icon}</span>
                <span className="text-xs font-semibold text-slate-500">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ OPERATOR TABLE ════════════════════════════ */}
      <section className="bg-white" style={{ padding: '64px 32px 80px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">All operators</p>
              <p className="text-sm text-slate-500">Sorted by user base (largest first)</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ClockIcon />
              <span>Showing {'{OPERATORS.length}'} major operators</span>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-200" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <div style={{ height: 4, background: 'linear-gradient(90deg, #1D4ED8, #1E40AF)' }} />
            <div className="hidden lg:grid border-b border-slate-200"
              style={{ gridTemplateColumns: '44px 1fr 130px 100px 110px 110px 90px', padding: '13px 24px', background: '#f9fafb' }}>
              {['#', 'Operator', 'Type', 'Users', 'Send fee', 'Max send', 'USSD'].map((h) => (
                <p key={h} className="text-xs font-black text-slate-400 uppercase tracking-widest">{h}</p>
              ))}
            </div>
            {OPERATORS.map((op) => (
              <div key={op.name} className={`border-b border-slate-100 transition-colors ${op.rank === 1 ? 'bg-blue-50' : 'bg-white hover:bg-slate-50'}`}>
                <div className="hidden lg:grid items-center"
                  style={{ gridTemplateColumns: '44px 1fr 130px 100px 110px 110px 90px', padding: op.rank === 1 ? '18px 24px' : '14px 24px' }}>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black"
                    style={op.rank === 1 ? { background: PILLAR, color: '#fff' } : { background: '#f1f5f9', color: '#94a3b8' }}>
                    {op.rank === 1 ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> : op.rank}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className={`font-bold ${op.rank === 1 ? 'text-blue-900' : 'text-slate-800'}`} style={{ fontSize: op.rank === 1 ? '15px' : '14px' }}>{op.name}</p>
                      {op.badge && <span className="text-xs font-bold rounded-full px-2 py-0.5" style={{ background: '#dbeafe', color: PILLAR }}>{op.badge}</span>}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{op.operator}</p>
                  </div>
                  <p className="text-sm text-slate-500">{op.type}</p>
                  <p className="font-mono font-bold text-slate-700 text-sm">{op.users}</p>
                  <p className={`font-mono font-black ${op.rank === 1 ? 'text-blue-700' : 'text-slate-800'}`} style={{ fontSize: op.rank === 1 ? '18px' : '15px' }}>{op.sendFee}</p>
                  <p className="font-mono text-sm text-slate-600">ETB {op.maxSend}</p>
                  <code className="text-xs font-mono font-bold rounded-lg px-2 py-1" style={{ background: '#f1f5f9', color: '#475569' }}>{op.ussd}</code>
                </div>
                <div className="lg:hidden" style={{ padding: '14px 16px' }}>
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-slate-800 text-sm">{op.name}</p>
                        {op.badge && <span className="text-xs font-bold rounded-full px-2 py-0.5" style={{ background: '#dbeafe', color: PILLAR }}>{op.badge}</span>}
                      </div>
                      <p className="text-xs text-slate-400">{op.operator}</p>
                    </div>
                    <code className="text-xs font-mono font-bold rounded-lg px-2 py-1 shrink-0" style={{ background: '#f1f5f9', color: '#475569' }}>{op.ussd}</code>
                  </div>
                  <p className="text-xs text-slate-400">{op.type} · {op.users} users · {op.sendFee} fee · Max ETB {op.maxSend}</p>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between border-t border-slate-200" style={{ background: '#f9fafb', padding: '14px 24px' }}>
              <p className="text-xs text-slate-400">Source: NBE payment operator registry · Fees from official operator websites · Updated monthly</p>
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-5 text-center leading-relaxed">
            Fees and limits are indicative and may vary by transaction type. Always verify current fees with the operator before transacting.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════ FEATURE COMPARISON ════════════════════════ */}
      <section className="border-b border-slate-100" style={{ background: '#f9fafb', padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Feature comparison</p>
            <h2 className="font-serif font-bold text-slate-950" style={{ fontSize: 'clamp(26px, 3vw, 36px)', letterSpacing: '-1.2px', lineHeight: 1.15 }}>
              Top 4 operators — features side by side.
            </h2>
          </div>
          <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <div style={{ height: 4, background: 'linear-gradient(90deg, #1D4ED8, #1E40AF)' }} />
            <div className="grid border-b border-slate-200" style={{ gridTemplateColumns: '1fr 120px 120px 120px 120px', padding: '14px 24px', background: '#f9fafb' }}>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Feature</p>
              {['TeleBirr', 'CBEBirr', 'Amole', 'HelloCash'].map((n) => (
                <p key={n} className="text-xs font-black uppercase tracking-widest text-center" style={{ color: PILLAR }}>{n}</p>
              ))}
            </div>
            {FEATURE_COMPARISON.map((row, i) => (
              <div key={row.feature} className="grid items-center border-b border-slate-100"
                style={{ gridTemplateColumns: '1fr 120px 120px 120px 120px', padding: '13px 24px', background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                <p className="text-sm text-slate-700 font-medium">{row.feature}</p>
                {[row.telebirr, row.cbebirr, row.amole, row.hellocash].map((v, j) => (
                  <div key={j} className="flex justify-center">{v ? <Check /> : <Cross />}</div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ OPERATOR CARDS ════════════════════════════ */}
      <section className="border-b border-slate-100 bg-white" style={{ padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Operator profiles</p>
            <h2 className="font-serif font-bold text-slate-950" style={{ fontSize: 'clamp(26px, 3vw, 36px)', letterSpacing: '-1.2px', lineHeight: 1.15 }}>
              About each operator.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {OPERATORS.map((op) => (
              <div key={op.name} className="bg-white rounded-2xl border border-slate-200 overflow-hidden" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                <div style={{ height: 3, background: PILLAR }} />
                <div style={{ padding: '24px' }}>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <p className="font-bold text-slate-900" style={{ fontSize: '15px' }}>{op.name}</p>
                      <p className="text-xs text-slate-400">{op.operator}</p>
                    </div>
                    <code className="text-xs font-mono font-bold rounded-lg px-2 py-1 shrink-0" style={{ background: '#EFF6FF', color: PILLAR }}>{op.ussd}</code>
                  </div>
                  <p className="text-sm text-slate-500 mb-4" style={{ lineHeight: 1.75 }}>{op.desc}</p>
                  <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100">
                    <div>
                      <p className="text-xs text-slate-400 mb-0.5">Send fee</p>
                      <p className="font-mono font-bold text-slate-800 text-sm">{op.sendFee}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 mb-0.5">Max send</p>
                      <p className="font-mono font-bold text-slate-800 text-sm">ETB {op.maxSend}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 mb-0.5">Users</p>
                      <p className="font-bold text-slate-800 text-sm">{op.users}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 mb-0.5">International</p>
                      <p className="font-bold text-slate-800 text-sm">{op.international ? 'Yes' : 'No'}</p>
                    </div>
                  </div>
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
              Only NBE-licensed operators listed.
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: 1.75, maxWidth: 480 }}>
              Every operator on this page holds a valid NBE payment service licence.
              Fees are sourced from official operator websites and updated monthly.
              No operator pays to appear or rank higher on BirrBank.
            </p>
          </div>
          <div className="flex flex-col gap-3 shrink-0">
            {[
              { dot: '#22c55e', label: 'NBE-licensed only',       sub: 'All operators verified against NBE registry' },
              { dot: PILLAR,    label: 'Official fee sources',     sub: 'From operator websites and NBE disclosures' },
              { dot: '#94a3b8', label: 'No sponsored rankings',   sub: 'Sorted by user base, not by payment' },
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
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Mobile money updates</p>
            <h2 className="font-serif font-bold text-slate-950 mb-5" style={{ fontSize: 'clamp(30px, 3.5vw, 42px)', letterSpacing: '-1.5px', lineHeight: 1.1 }}>
              New operators and fee changes,<br />
              <span style={{ color: PILLAR }}>direct to your inbox.</span>
            </h2>
            <p className="text-slate-500 mb-8" style={{ fontSize: '15px', lineHeight: 1.85 }}>
              Monthly digest of mobile money developments — new operator launches, fee changes,
              limit increases and NBE payment policy updates.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'New NBE-licensed payment operator launches',
                'Fee and limit changes across all operators',
                'International remittance corridor updates',
                'NBE payment system policy and directive changes',
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
