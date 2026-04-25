import Link from 'next/link'
import EmailCapture from '@/components/EmailCapture'
export const dynamic = 'force-dynamic'

// ─── Placeholder data — replace with Supabase queries in Phase 2 ─────────────

const PROVIDERS = [
  { rank: 1,  name: 'Remitly',             type: 'Digital',      corridor: 'USA, UK, Canada', fee: '1.99%', fxMargin: '0.5%', speed: '3-5 mins',  maxSend: '$10,000', badge: 'Best overall' },
  { rank: 2,  name: 'Wise',                type: 'Digital',      corridor: 'USA, UK, EU',     fee: '0.5%',  fxMargin: '0.3%', speed: '1-2 days',  maxSend: '$50,000', badge: 'Best FX rate' },
  { rank: 3,  name: 'Dahabshiil',          type: 'Regional MSB', corridor: 'GCC, UK, USA',    fee: '2.9%',  fxMargin: '1.0%', speed: 'Same day',  maxSend: '$5,000',  badge: 'Best for Gulf' },
  { rank: 4,  name: 'Western Union',       type: 'Global MSB',   corridor: 'Global',          fee: '3.5%',  fxMargin: '1.5%', speed: 'Minutes',   maxSend: '$10,000', badge: null },
  { rank: 5,  name: 'MoneyGram',           type: 'Global MSB',   corridor: 'Global',          fee: '3.8%',  fxMargin: '1.5%', speed: 'Minutes',   maxSend: '$10,000', badge: null },
  { rank: 6,  name: 'WorldRemit',          type: 'Digital',      corridor: 'Global',          fee: '2.5%',  fxMargin: '1.0%', speed: '1-2 hours', maxSend: '$8,000',  badge: null },
  { rank: 7,  name: 'Ria Money Transfer',  type: 'Global MSB',   corridor: 'USA, EU, GCC',    fee: '3.9%',  fxMargin: '1.2%', speed: 'Same day',  maxSend: '$7,999',  badge: null },
  { rank: 8,  name: 'TeleBirr International', type: 'Mobile wallet', corridor: 'UAE, Saudi Arabia', fee: '1.0%', fxMargin: '0.8%', speed: 'Minutes', maxSend: '$5,000', badge: 'Mobile delivery' },
  { rank: 9,  name: 'CBE Foreign Transfer',type: 'Bank SWIFT',   corridor: 'All SWIFT',       fee: '0.25%', fxMargin: '0.5%', speed: '1-3 days',  maxSend: 'No limit', badge: 'Bank to bank' },
  { rank: 10, name: 'Kifiya Ethswitch',    type: 'Local',        corridor: 'Ethiopia only',   fee: 'Free',  fxMargin: 'N/A',  speed: 'Instant',   maxSend: 'ETB 50,000', badge: 'Domestic free' },
]

const CORRIDORS = [
  { from: 'USA',            currency: 'USD', rate: '156.40', flag: '🇺🇸', remit: '$3B+/yr',    operators: 'Remitly, Wise, Western Union, MoneyGram, WorldRemit' },
  { from: 'Saudi Arabia',   currency: 'SAR', rate: '41.70',  flag: '🇸🇦', remit: '$1B+/yr',    operators: 'Western Union, Dahabshiil, TeleBirr International' },
  { from: 'United Kingdom', currency: 'GBP', rate: '197.82', flag: '🇬🇧', remit: 'Large volume', operators: 'Remitly, Wise, Dahabshiil, Western Union' },
  { from: 'UAE',            currency: 'AED', rate: '42.60',  flag: '🇦🇪', remit: 'Growing fast', operators: 'Western Union, Dahabshiil, TeleBirr International' },
  { from: 'European Union', currency: 'EUR', rate: '169.12', flag: '🇪🇺', remit: 'Significant',  operators: 'Wise, WorldRemit, Western Union, MoneyGram' },
  { from: 'Canada',         currency: 'CAD', rate: '114.30', flag: '🇨🇦', remit: 'Growing',      operators: 'Remitly, Western Union, MoneyGram' },
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

export default function DiasporaRemittancePage() {
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
            <span style={{ color: PILLAR, fontWeight: 700 }}>Send Money Home</span>
          </div>
          <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: PILLAR }}>Diaspora · Remittance</p>
          <h1 className="font-serif font-bold mb-5 text-slate-950" style={{ fontSize: 'clamp(36px, 4.5vw, 54px)', letterSpacing: '-1.8px', lineHeight: 1.08 }}>
            Cheapest way to send money<br />
            <span style={{ color: PILLAR }}>to Ethiopia — all operators compared.</span>
          </h1>
          <p className="text-slate-600 mb-8" style={{ fontSize: '16px', lineHeight: '1.8', maxWidth: '520px' }}>
            Fees, exchange rate margins and transfer speed across 62 NBE-licensed remittance
            operators. Find the cheapest route from USA, UK, GCC and beyond.
          </p>
          <div className="flex flex-wrap gap-6">
            {[
              { icon: <ClockIcon />, label: '62 licensed remittance operators' },
              { icon: <ClockIcon />, label: 'Fee and FX margin both shown' },
              { icon: <ClockIcon />, label: 'All major corridors covered' },
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

      {/* ══════════════════════════════ PROVIDER TABLE ════════════════════════════ */}
      {/* Ads permitted on diaspora pages — sidebar only — but none here in comparison table */}
      <section className="bg-white" style={{ padding: '64px 32px 80px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">All providers</p>
              <p className="text-sm text-slate-500">Sorted by total cost (fee + FX margin)</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ClockIcon />
              <span>Showing {PROVIDERS.length} of 62 licensed operators</span>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-200" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <div style={{ height: 4, background: 'linear-gradient(90deg, #1D4ED8, #1E40AF)' }} />
            <div className="hidden lg:grid border-b border-slate-200"
              style={{ gridTemplateColumns: '44px 1fr 110px 120px 90% 100px 110px 120px', padding: '13px 24px', background: '#f9fafb' }}>
              {['#', 'Provider', 'Type', 'Corridor', 'Fee', 'FX margin', 'Speed', 'Max send'].map((h) => (
                <p key={h} className="text-xs font-black text-slate-400 uppercase tracking-widest">{h}</p>
              ))}
            </div>

            {PROVIDERS.map((p) => (
              <div key={p.rank} className={`border-b border-slate-100 transition-colors ${p.rank === 1 ? 'bg-blue-50' : 'bg-white hover:bg-slate-50'}`}>
                {/* Desktop */}
                <div className="hidden lg:grid items-center"
                  style={{ gridTemplateColumns: '44px 1fr 110px 120px 90px 100px 110px 120px', padding: p.rank === 1 ? '18px 24px' : '14px 24px' }}>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black"
                    style={p.rank === 1 ? { background: PILLAR, color: '#fff' } : { background: '#f1f5f9', color: '#94a3b8' }}>
                    {p.rank === 1 ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> : p.rank}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className={`font-bold ${p.rank === 1 ? 'text-blue-900' : 'text-slate-800'}`} style={{ fontSize: p.rank === 1 ? '15px' : '14px' }}>{p.name}</p>
                      {p.badge && <span className="text-xs font-bold rounded-full px-2 py-0.5" style={{ background: '#dbeafe', color: PILLAR }}>{p.badge}</span>}
                    </div>
                  </div>
                  <p className="text-xs text-slate-500">{p.type}</p>
                  <p className="text-xs text-slate-500">{p.corridor}</p>
                  <p className={`font-mono font-black ${p.rank === 1 ? 'text-blue-700' : 'text-slate-800'}`}
                    style={{ fontSize: p.rank === 1 ? '18px' : '15px' }}>{p.fee}</p>
                  <p className="font-mono text-sm text-slate-600">{p.fxMargin}</p>
                  <span className="text-xs font-bold rounded-full px-2 py-1 w-fit"
                    style={p.speed === 'Minutes' || p.speed === 'Instant' || p.speed === '3-5 mins'
                      ? { background: '#dbeafe', color: PILLAR }
                      : { background: '#f1f5f9', color: '#64748b' }}>
                    {p.speed}
                  </span>
                  <p className="font-mono text-xs text-slate-600">{p.maxSend}</p>
                </div>
                {/* Mobile */}
                <div className="lg:hidden" style={{ padding: '14px 16px' }}>
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-bold text-slate-800 text-sm">{p.name}</p>
                      {p.badge && <span className="text-xs font-bold rounded-full px-2 py-0.5" style={{ background: '#dbeafe', color: PILLAR }}>{p.badge}</span>}
                    </div>
                    <p className="font-mono font-black text-slate-800 shrink-0" style={{ fontSize: '15px' }}>{p.fee}</p>
                  </div>
                  <p className="text-xs text-slate-400">{p.type} · {p.corridor} · {p.speed} · Max {p.maxSend}</p>
                </div>
              </div>
            ))}

            <div className="flex items-center justify-between border-t border-slate-200" style={{ background: '#f9fafb', padding: '14px 24px' }}>
              <p className="text-xs text-slate-400">Source: NBE remittance registry and official operator websites · Updated monthly · Fees indicative for USD 500 transfer</p>
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-5 text-center leading-relaxed">
            Total cost = transfer fee + FX margin. Always calculate the ETB received, not just the fee percentage.
            BirrBank is not a remittance provider. Verify exact costs on the operator platform before sending.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════ CORRIDORS ════════════════════════════════ */}
      <section className="border-b border-slate-100" style={{ background: '#f9fafb', padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">By corridor</p>
              <h2 className="font-serif font-bold text-slate-950" style={{ fontSize: 'clamp(26px, 3vw, 36px)', letterSpacing: '-1.2px', lineHeight: 1.15 }}>
                Current ETB rates by sending country.
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
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{c.flag}</span>
                      <div>
                        <p className="font-bold text-slate-900" style={{ fontSize: '14px' }}>{c.from}</p>
                        <p className="text-xs text-slate-400">{c.remit}</p>
                      </div>
                    </div>
                    <div className="rounded-lg px-3 py-1" style={{ background: '#EFF6FF' }}>
                      <span className="font-mono font-black text-sm" style={{ color: PILLAR }}>{c.currency}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 mb-1">NBE rate · ETB per 1 {c.currency}</p>
                  <p className="font-mono font-black text-slate-950 mb-4" style={{ fontSize: '28px', letterSpacing: '-1px', lineHeight: 1 }}>{c.rate}</p>
                  <div className="pt-3 border-t border-slate-100">
                    <p className="text-xs text-slate-400 mb-1">Best operators for this corridor</p>
                    <p className="text-xs text-slate-600 font-medium" style={{ lineHeight: 1.6 }}>{c.operators}</p>
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
              How to get the best rate when sending money home.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Compare total cost, not just the fee', body: 'Operators profit on both the transfer fee and the exchange rate margin. An operator advertising zero fees may offer a rate 2% below the NBE official rate. Always calculate how many ETB the recipient will actually receive.' },
              { step: '02', title: 'Send larger amounts less frequently', body: 'Most fees are percentage-based. Sending $1,000 once costs less in fees than sending $100 ten times. If your recipient can manage cash flow, consolidating transfers saves money.' },
              { step: '03', title: 'Check the ETB rate before you send', body: 'The NBE publishes a new indicative rate every business day at 09:30 EAT. Monitor the rate on BirrBank and send when the ETB is stronger. A 2% rate movement on a $500 transfer is $10 — meaningful over a year.' },
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
              Every remittance provider on this page is licensed by the National Bank of Ethiopia.
              Fees and FX margins are sourced from official operator platforms monthly.
              No operator pays to appear or rank higher on BirrBank.
            </p>
          </div>
          <div className="flex flex-col gap-3 shrink-0">
            {[
              { dot: '#22c55e', label: 'NBE-licensed operators only',  sub: 'Verified against NBE remittance registry' },
              { dot: PILLAR,    label: 'Fee + FX margin both shown',   sub: 'Full cost transparency — not just the fee' },
              { dot: '#94a3b8', label: 'No sponsored rankings',       sub: 'Sorted by total cost, never by payment' },
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
              ETB rate and fee alerts,<br />
              <span style={{ color: PILLAR }}>direct to your inbox.</span>
            </h2>
            <p className="text-slate-500 mb-8" style={{ fontSize: '15px', lineHeight: 1.85 }}>
              Weekly digest for the diaspora — ETB rate movements, fee changes across
              all operators and NBE remittance policy updates.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Weekly ETB exchange rate vs USD, GBP, SAR, AED',
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
