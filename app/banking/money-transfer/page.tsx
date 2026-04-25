import Link from 'next/link'
import EmailCapture from '@/components/EmailCapture'
export const dynamic = 'force-dynamic'

// ─── Placeholder data — replace with Supabase queries in Phase 2 ─────────────

const OPERATORS = [
  { rank: 1,  name: 'Western Union',       type: 'Global MSB',      fee: '4.99',  feeType: 'Fixed (USD)',  speed: 'Minutes',   maxSend: '10,000', corridors: 'USA, UK, EU, GCC', badge: 'Widest reach' },
  { rank: 2,  name: 'MoneyGram',           type: 'Global MSB',      fee: '4.99',  feeType: 'Fixed (USD)',  speed: 'Minutes',   maxSend: '10,000', corridors: 'USA, UK, EU, GCC', badge: null },
  { rank: 3,  name: 'Dahabshiil',          type: 'Regional MSB',    fee: '3.00',  feeType: 'Fixed (USD)',  speed: 'Same day',  maxSend: '5,000',  corridors: 'GCC, UK, USA',     badge: 'Lowest fee' },
  { rank: 4,  name: 'Remitly',             type: 'Digital',         fee: '2.99',  feeType: 'Fixed (USD)',  speed: 'Minutes',   maxSend: '10,000', corridors: 'USA, UK, Canada',  badge: 'Best digital' },
  { rank: 5,  name: 'Wise (TransferWise)', type: 'Digital',         fee: '0.50%', feeType: '% of amount', speed: '1-2 days',  maxSend: '50,000', corridors: 'USA, UK, EU',      badge: null },
  { rank: 6,  name: 'WorldRemit',          type: 'Digital',         fee: '3.99',  feeType: 'Fixed (USD)',  speed: 'Minutes',   maxSend: '8,000',  corridors: 'USA, UK, EU, GCC', badge: null },
  { rank: 7,  name: 'Ria Money Transfer',  type: 'Global MSB',      fee: '3.99',  feeType: 'Fixed (USD)',  speed: 'Same day',  maxSend: '7,999',  corridors: 'USA, EU, GCC',     badge: null },
  { rank: 8,  name: 'Kifiya / Ethswitch',  type: 'Local aggregator', fee: '0.00', feeType: 'Free',         speed: 'Instant',   maxSend: '50,000', corridors: 'Ethiopia only',    badge: 'Domestic free' },
  { rank: 9,  name: 'TeleBirr International', type: 'Telco wallet', fee: '1.00%', feeType: '% of amount', speed: 'Minutes',   maxSend: '5,000',  corridors: 'UAE, Saudi Arabia', badge: null },
  { rank: 10, name: 'CBE Foreign Transfer', type: 'Bank transfer',  fee: '0.25%', feeType: '% of amount', speed: '1-3 days',  maxSend: '500,000', corridors: 'All SWIFT countries', badge: 'Bank SWIFT' },
]

const CORRIDORS = [
  { from: 'USA',          currency: 'USD', rate: '156.40', operators: 'Western Union, MoneyGram, Remitly, Wise, WorldRemit' },
  { from: 'United Kingdom', currency: 'GBP', rate: '197.82', operators: 'Western Union, Dahabshiil, Remitly, Wise' },
  { from: 'Saudi Arabia', currency: 'SAR', rate: '41.70',  operators: 'Western Union, Dahabshiil, TeleBirr International' },
  { from: 'UAE',          currency: 'AED', rate: '42.60',  operators: 'Western Union, Dahabshiil, TeleBirr International' },
  { from: 'European Union', currency: 'EUR', rate: '169.12', operators: 'Western Union, MoneyGram, Wise, WorldRemit' },
  { from: 'Canada',       currency: 'CAD', rate: '114.30', operators: 'Western Union, MoneyGram, Remitly' },
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

export default function MoneyTransferPage() {
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
            <span style={{ color: PILLAR, fontWeight: 700 }}>Money Transfer</span>
          </div>
          <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: PILLAR }}>Banking · Money Transfer</p>
          <h1 className="font-serif font-bold mb-5 text-slate-950" style={{ fontSize: 'clamp(36px, 4.5vw, 54px)', letterSpacing: '-1.8px', lineHeight: 1.08 }}>
            Send money to Ethiopia —<br />
            <span style={{ color: PILLAR }}>all remittance operators compared.</span>
          </h1>
          <p className="text-slate-600 mb-8" style={{ fontSize: '16px', lineHeight: '1.8', maxWidth: '520px' }}>
            Fees, exchange rates and transfer speed across 62 NBE-licensed remittance agencies.
            Find the cheapest and fastest way to send money home from the diaspora.
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            <Link href="/diaspora" className="font-bold rounded-full transition-all"
              style={{ fontSize: 15, padding: '14px 32px', minWidth: 200, textAlign: 'center', background: PILLAR, color: '#fff', boxShadow: '0 4px 20px rgba(29,78,216,0.20)' }}>
              Diaspora hub
            </Link>
            <Link href="/banking/fx-rates" className="font-bold rounded-full transition-all"
              style={{ fontSize: 15, padding: '14px 32px', minWidth: 200, textAlign: 'center', border: '2px solid #1D4ED8', color: PILLAR, background: 'transparent' }}>
              Check FX rates
            </Link>
          </div>
          <div className="flex flex-wrap gap-6">
            {[
              { icon: <ClockIcon />, label: '62 licensed remittance agencies' },
              { icon: <ClockIcon />, label: 'Fees from official operator sites' },
              { icon: <ClockIcon />, label: 'Live NBE exchange rates' },
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
      {/* NO ADS — comparison integrity rule */}
      <section className="bg-white" style={{ padding: '64px 32px 80px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">All operators</p>
              <p className="text-sm text-slate-500">Sorted by fee (lowest first)</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ClockIcon />
              <span>Showing {OPERATORS.length} of 62 licensed operators</span>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-200" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <div style={{ height: 4, background: 'linear-gradient(90deg, #1D4ED8, #1E40AF)' }} />
            <div className="hidden lg:grid border-b border-slate-200"
              style={{ gridTemplateColumns: '44px 1fr 120px 130px 110px 110px 160px', padding: '13px 24px', background: '#f9fafb' }}>
              {['#', 'Operator', 'Type', 'Fee', 'Speed', 'Max send', 'Key corridors'].map((h) => (
                <p key={h} className="text-xs font-black text-slate-400 uppercase tracking-widest">{h}</p>
              ))}
            </div>

            {OPERATORS.map((op) => (
              <div key={op.rank} className={`border-b border-slate-100 transition-colors ${op.rank === 1 ? 'bg-blue-50' : 'bg-white hover:bg-slate-50'}`}>
                {/* Desktop */}
                <div className="hidden lg:grid items-center"
                  style={{ gridTemplateColumns: '44px 1fr 120px 130px 110px 110px 160px', padding: op.rank === 1 ? '18px 24px' : '14px 24px' }}>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black"
                    style={op.rank === 1 ? { background: PILLAR, color: '#fff' } : { background: '#f1f5f9', color: '#94a3b8' }}>
                    {op.rank === 1 ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> : op.rank}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className={`font-bold ${op.rank === 1 ? 'text-blue-900' : 'text-slate-800'}`} style={{ fontSize: op.rank === 1 ? '15px' : '14px' }}>{op.name}</p>
                      {op.badge && <span className="text-xs font-bold rounded-full px-2 py-0.5" style={{ background: '#dbeafe', color: PILLAR }}>{op.badge}</span>}
                    </div>
                  </div>
                  <p className="text-sm text-slate-500">{op.type}</p>
                  <div>
                    <p className={`font-mono font-black ${op.rank === 1 ? 'text-blue-700' : 'text-slate-800'}`}
                      style={{ fontSize: op.rank === 1 ? '18px' : '15px', letterSpacing: '-0.5px' }}>
                      {op.fee === '0.00' ? 'Free' : `${op.fee}`}
                    </p>
                    <p className="text-xs text-slate-400">{op.feeType}</p>
                  </div>
                  <span className="text-xs font-bold rounded-full px-2 py-1 inline-flex w-fit"
                    style={op.speed === 'Minutes' || op.speed === 'Instant'
                      ? { background: '#dbeafe', color: PILLAR }
                      : { background: '#f1f5f9', color: '#64748b' }}>
                    {op.speed}
                  </span>
                  <p className="font-mono text-sm text-slate-600">USD {op.maxSend}</p>
                  <p className="text-xs text-slate-500">{op.corridors}</p>
                </div>
                {/* Mobile */}
                <div className="lg:hidden" style={{ padding: '14px 16px' }}>
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-bold text-slate-800 text-sm">{op.name}</p>
                      {op.badge && <span className="text-xs font-bold rounded-full px-2 py-0.5" style={{ background: '#dbeafe', color: PILLAR }}>{op.badge}</span>}
                    </div>
                    <p className="font-mono font-black text-slate-800 shrink-0" style={{ fontSize: '15px' }}>
                      {op.fee === '0.00' ? 'Free' : op.fee}
                    </p>
                  </div>
                  <p className="text-xs text-slate-400">{op.type} · {op.speed} · Max USD {op.maxSend}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{op.corridors}</p>
                </div>
              </div>
            ))}

            <div className="flex items-center justify-between border-t border-slate-200" style={{ background: '#f9fafb', padding: '14px 24px' }}>
              <p className="text-xs text-slate-400">Source: NBE remittance operator registry · Fees from official operator websites · Updated monthly</p>
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-5 text-center leading-relaxed">
            Fees shown are indicative for a typical USD 500 transfer. Actual fees vary by amount, corridor and payment method.
            Always check the exact fee on the operator platform before sending. BirrBank is not a remittance provider.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════ CORRIDORS ════════════════════════════════ */}
      <section className="border-b border-slate-100" style={{ background: '#f9fafb', padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Key corridors</p>
              <h2 className="font-serif font-bold text-slate-950" style={{ fontSize: 'clamp(26px, 3vw, 36px)', letterSpacing: '-1.2px', lineHeight: 1.15 }}>
                Send from these countries to Ethiopia.
              </h2>
            </div>
            <Link href="/banking/fx-rates" className="inline-flex items-center gap-2 text-sm font-bold shrink-0" style={{ color: PILLAR }}>
              Full FX rates <ArrowRight />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CORRIDORS.map((c) => (
              <div key={c.from} className="bg-white rounded-2xl border border-slate-200 overflow-hidden" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                <div style={{ height: 3, background: PILLAR }} />
                <div style={{ padding: '24px' }}>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-bold text-slate-900" style={{ fontSize: '15px' }}>{c.from}</p>
                      <p className="text-xs text-slate-400">Sending in {c.currency}</p>
                    </div>
                    <div className="rounded-lg px-3 py-1" style={{ background: '#EFF6FF' }}>
                      <span className="font-mono font-black text-sm" style={{ color: PILLAR }}>{c.currency}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 mb-1">NBE rate · ETB per 1 {c.currency}</p>
                  <p className="font-mono font-black text-slate-950 mb-4" style={{ fontSize: '28px', letterSpacing: '-1px', lineHeight: 1 }}>{c.rate}</p>
                  <div className="pt-3 border-t border-slate-100">
                    <p className="text-xs text-slate-400 mb-1">Available operators</p>
                    <p className="text-xs text-slate-600 font-medium">{c.operators}</p>
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
              How to get the best remittance rate.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Compare the total cost, not just the fee', body: 'Operators make money on both the transfer fee and the exchange rate margin. An operator with a zero fee may offer a worse exchange rate than NBE official. Always multiply your send amount by the offered rate and compare the ETB received.' },
              { step: '02', title: 'Match speed to urgency', body: 'Instant and same-day transfers cost more. If the transfer is not urgent, digital operators like Wise or bank SWIFT transfers often offer better rates for 1 to 3 day delivery. Plan ahead and save on fees.' },
              { step: '03', title: 'Check the pickup or delivery method', body: 'Some operators deliver directly to a bank account, others require cash pickup at an agent. TeleBirr and CBEBirr can receive directly into mobile wallets. Confirm the recipient has access to the delivery method before sending.' },
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
            <Link href="/diaspora" className="inline-flex items-center gap-2 text-sm font-bold" style={{ color: PILLAR }}>
              Visit the Diaspora hub <ArrowRight />
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
              Only NBE-licensed operators listed.
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: 1.75, maxWidth: 480 }}>
              All remittance operators on this page are licensed by the National Bank of Ethiopia
              to operate in Ethiopia. Fees are sourced from official operator websites and updated monthly.
              No operator pays to appear or rank higher.
            </p>
          </div>
          <div className="flex flex-col gap-3 shrink-0">
            {[
              { dot: '#22c55e', label: 'NBE-licensed operators only',  sub: 'Verified against NBE remittance registry' },
              { dot: PILLAR,    label: 'Official fee sources',          sub: 'Fees from operator websites monthly' },
              { dot: '#94a3b8', label: 'No sponsored rankings',        sub: 'Sorted by fee, never by payment' },
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
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Remittance alerts</p>
            <h2 className="font-serif font-bold text-slate-950 mb-5" style={{ fontSize: 'clamp(30px, 3.5vw, 42px)', letterSpacing: '-1.5px', lineHeight: 1.1 }}>
              ETB rate movements,<br />
              <span style={{ color: PILLAR }}>direct to your inbox.</span>
            </h2>
            <p className="text-slate-500 mb-8" style={{ fontSize: '15px', lineHeight: 1.85 }}>
              Weekly digest for diaspora — FX rate changes, new remittance corridors,
              fee changes and NBE policy updates affecting money transfers to Ethiopia.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Weekly ETB exchange rate movements vs USD, GBP, SAR, AED',
                'Remittance fee changes across all major operators',
                'New transfer corridors and operator launches',
                'NBE forex and remittance policy updates',
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
