import Link from 'next/link'
import EmailCapture from '@/components/EmailCapture'
export const dynamic = 'force-dynamic'

// ─── Placeholder data — replace with Supabase queries in Phase 2 ─────────────

const HEALTH_PRODUCTS = [
  { rank: 1,  insurer: 'Ethiopian Insurance Corporation', plan: 'Individual Basic',    annualPremium: '4,800',  inpatient: '200,000', outpatient: '20,000',  dental: false, maternity: false, badge: 'Best value' },
  { rank: 2,  insurer: 'Awash Insurance',                 plan: 'Individual Standard', annualPremium: '6,000',  inpatient: '300,000', outpatient: '30,000',  dental: false, maternity: true,  badge: null },
  { rank: 3,  insurer: 'Nile Insurance',                  plan: 'Individual Standard', annualPremium: '6,400',  inpatient: '300,000', outpatient: '25,000',  dental: false, maternity: false, badge: null },
  { rank: 4,  insurer: 'Africa Insurance',                plan: 'Individual Plus',     annualPremium: '8,000',  inpatient: '500,000', outpatient: '50,000',  dental: true,  maternity: true,  badge: null },
  { rank: 5,  insurer: 'Global Insurance',                plan: 'Individual Plus',     annualPremium: '8,500',  inpatient: '500,000', outpatient: '50,000',  dental: true,  maternity: true,  badge: null },
  { rank: 6,  insurer: 'Ethiopian Insurance Corporation', plan: 'Group Basic',         annualPremium: '3,600',  inpatient: '150,000', outpatient: '15,000',  dental: false, maternity: false, badge: 'Best group rate' },
  { rank: 7,  insurer: 'Awash Insurance',                 plan: 'Group Standard',      annualPremium: '4,800',  inpatient: '250,000', outpatient: '25,000',  dental: false, maternity: true,  badge: null },
  { rank: 8,  insurer: 'Africa Insurance',                plan: 'Group Plus',          annualPremium: '6,500',  inpatient: '400,000', outpatient: '40,000',  dental: true,  maternity: true,  badge: null },
]

const PLAN_TYPES = ['All plans', 'Individual', 'Group / employer']

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

export default function HealthInsurancePage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ══════════════════════════════ HERO ══════════════════════════════════════ */}
      <section className="relative bg-white overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 900px 500px at 55% -80px, rgba(29,78,216,0.04) 0%, transparent 65%)' }} />
        <div className="relative max-w-6xl mx-auto px-8 pt-20 pb-14">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-6">
            <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
            <span>›</span>
            <Link href="/insurance" className="hover:text-slate-600 transition-colors">Insurance</Link>
            <span>›</span>
            <span style={{ color: PILLAR, fontWeight: 700 }}>Health Insurance</span>
          </div>
          <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: PILLAR }}>Insurance · Health</p>
          <h1 className="font-serif font-bold mb-5 text-slate-950" style={{ fontSize: 'clamp(36px, 4.5vw, 54px)', letterSpacing: '-1.8px', lineHeight: 1.08 }}>
            Health insurance Ethiopia —<br />
            <span style={{ color: PILLAR }}>individual and group plans compared.</span>
          </h1>
          <p className="text-slate-600 mb-8" style={{ fontSize: '16px', lineHeight: '1.8', maxWidth: '520px' }}>
            Inpatient, outpatient, dental and maternity cover from all 12 NBE-licensed health
            insurance providers. Individual and group employer plans — all compared free.
          </p>
          <div className="flex flex-wrap gap-6">
            {[
              { icon: <ClockIcon />, label: '12 licensed health insurers' },
              { icon: <ClockIcon />, label: 'Individual and group plans' },
              { icon: <ClockIcon />, label: 'Inpatient, outpatient and dental' },
              { icon: <ClockIcon />, label: 'Premiums verified this quarter' },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <span style={{ color: PILLAR }}>{s.icon}</span>
                <span className="text-xs font-semibold text-slate-500">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ COMPARISON TABLE ══════════════════════════ */}
      {/* NO ADS — comparison integrity rule */}
      <section className="bg-white" style={{ padding: '64px 32px 80px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Filter by plan type</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {PLAN_TYPES.map((t, i) => (
                  <button key={t} className="rounded-full text-xs font-bold transition-all"
                    style={{ padding: '6px 14px', background: i === 0 ? PILLAR : '#f1f5f9', color: i === 0 ? '#fff' : '#64748b', border: i === 0 ? 'none' : '1px solid #e2e8f0' }}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ClockIcon />
              <span>Showing {HEALTH_PRODUCTS.length} plans · Sorted by premium</span>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-200" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <div style={{ height: 4, background: 'linear-gradient(90deg, #1D4ED8, #1E40AF)' }} />
            <div className="hidden lg:grid border-b border-slate-200"
              style={{ gridTemplateColumns: '44px 1fr 120px 120px 110px 80px 80px 80px', padding: '13px 24px', background: '#f9fafb' }}>
              {['#', 'Insurer', 'Plan', 'Annual premium', 'Inpatient', 'Outpatient', 'Dental', 'Maternity'].map((h) => (
                <p key={h} className="text-xs font-black text-slate-400 uppercase tracking-widest">{h}</p>
              ))}
            </div>

            {HEALTH_PRODUCTS.map((p) => (
              <div key={p.rank} className={`border-b border-slate-100 transition-colors ${p.rank === 1 ? 'bg-blue-50' : 'bg-white hover:bg-slate-50'}`}>
                {/* Desktop */}
                <div className="hidden lg:grid items-center"
                  style={{ gridTemplateColumns: '44px 1fr 120px 120px 110px 80px 80px 80px', padding: p.rank === 1 ? '18px 24px' : '14px 24px' }}>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black"
                    style={p.rank === 1 ? { background: PILLAR, color: '#fff' } : { background: '#f1f5f9', color: '#94a3b8' }}>
                    {p.rank === 1 ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> : p.rank}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className={`font-bold ${p.rank === 1 ? 'text-blue-900' : 'text-slate-800'}`} style={{ fontSize: p.rank === 1 ? '15px' : '13px' }}>{p.insurer}</p>
                      {p.badge && <span className="text-xs font-bold rounded-full px-2 py-0.5" style={{ background: '#dbeafe', color: PILLAR }}>{p.badge}</span>}
                    </div>
                  </div>
                  <span className="text-xs font-medium text-slate-500">{p.plan}</span>
                  <p className={`font-mono font-black ${p.rank === 1 ? 'text-blue-700' : 'text-slate-800'}`}
                    style={{ fontSize: p.rank === 1 ? '18px' : '15px', letterSpacing: '-0.5px' }}>
                    ETB {p.annualPremium}
                  </p>
                  <p className="font-mono text-xs text-slate-600">ETB {p.inpatient}</p>
                  <p className="font-mono text-xs text-slate-600">ETB {p.outpatient}</p>
                  <div className="flex justify-start">{p.dental ? <Check /> : <Cross />}</div>
                  <div className="flex justify-start">{p.maternity ? <Check /> : <Cross />}</div>
                </div>
                {/* Mobile */}
                <div className="lg:hidden" style={{ padding: '14px 16px' }}>
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-bold text-slate-800 text-sm">{p.insurer}</p>
                        {p.badge && <span className="text-xs font-bold rounded-full px-2 py-0.5" style={{ background: '#dbeafe', color: PILLAR }}>{p.badge}</span>}
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">{p.plan} · Inpatient ETB {p.inpatient}</p>
                    </div>
                    <p className="font-mono font-black text-slate-800 shrink-0" style={{ fontSize: '15px' }}>ETB {p.annualPremium}</p>
                  </div>
                  <div className="flex gap-3 mt-1">
                    <span className="text-xs text-slate-400 flex items-center gap-1">{p.dental ? <Check /> : <Cross />} Dental</span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">{p.maternity ? <Check /> : <Cross />} Maternity</span>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-slate-200" style={{ background: '#f9fafb', padding: '14px 24px' }}>
              <p className="text-xs text-slate-400">Premiums are indicative for an individual aged 30-40. Group premiums are per member per year. Source: official insurer tariff schedules.</p>
              <Link href="/institutions?type=insurer" className="text-xs font-bold hover:underline shrink-0" style={{ color: PILLAR }}>All 12 health insurers →</Link>
            </div>
          </div>

          <p className="text-xs text-slate-400 mt-5 text-center leading-relaxed">
            Premiums are for comparison only. Actual premiums depend on age, medical history and group size.
            Always get a formal quote before purchasing. BirrBank is not an insurance broker or adviser.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════ WHAT IS COVERED ═══════════════════════════ */}
      <section className="border-b border-slate-100" style={{ background: '#f9fafb', padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Coverage explained</p>
            <h2 className="font-serif font-bold text-slate-950" style={{ fontSize: 'clamp(26px, 3vw, 36px)', letterSpacing: '-1.2px', lineHeight: 1.15 }}>
              What health insurance covers in Ethiopia.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { title: 'Inpatient', icon: '🏥', desc: 'Hospital admission, surgery, ward costs, specialist fees and prescribed medicines during a hospital stay. The largest cost component — most plans cover ETB 150,000 to ETB 500,000 per year.' },
              { title: 'Outpatient', icon: '🩺', desc: 'GP and specialist consultations, diagnostic tests, X-rays and prescribed medicines without hospital admission. Limits are typically 10-15% of the inpatient limit.' },
              { title: 'Dental', icon: '🦷', desc: 'Basic dental cover includes consultations, extractions and fillings. Some comprehensive plans include crowns and root canal. Not included in most basic plans.' },
              { title: 'Maternity', icon: '👶', desc: 'Antenatal care, delivery (normal and C-section) and postnatal care. Usually subject to a waiting period of 9-12 months from policy start. Available on mid-tier and premium plans.' },
            ].map((c) => (
              <div key={c.title} className="bg-white rounded-2xl border border-slate-200 overflow-hidden" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                <div style={{ height: 3, background: PILLAR }} />
                <div style={{ padding: '24px' }}>
                  <p className="text-2xl mb-3">{c.icon}</p>
                  <p className="font-bold text-slate-900 mb-2" style={{ fontSize: '15px' }}>{c.title}</p>
                  <p className="text-sm text-slate-500" style={{ lineHeight: 1.75 }}>{c.desc}</p>
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
              How to choose a health insurance plan in Ethiopia.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Start with the inpatient limit', body: 'Inpatient care is the most expensive health cost. A serious illness or surgery in Addis Ababa can cost ETB 100,000 to ETB 500,000. Choose an inpatient limit that covers at least one major hospitalisation per year.' },
              { step: '02', title: 'Check the hospital network', body: 'Most health insurers in Ethiopia have a network of approved hospitals and clinics. Treatment at a non-network provider is either not covered or reimbursed at a lower rate. Confirm your preferred hospital is in-network before buying.' },
              { step: '03', title: 'Understand waiting periods', body: 'Most plans have a 30-day general waiting period and a 9 to 12 month waiting period for maternity. Pre-existing conditions may be excluded for 12 to 24 months. Always read the policy exclusions carefully.' },
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
              Read all insurance guides <ArrowRight />
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
              Premiums from official insurer schedules.
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: 1.75, maxWidth: 480 }}>
              All health insurance premiums are sourced from official insurer tariff schedules
              filed with NBE. No insurer pays to appear or rank higher. The lowest premium
              for equivalent cover is always shown first.
            </p>
          </div>
          <div className="flex flex-col gap-3 shrink-0">
            {[
              { dot: '#22c55e', label: 'NBE-licensed insurers only',  sub: 'All 12 verified against NBE registry' },
              { dot: PILLAR,    label: 'Official tariff sources',      sub: 'From NBE-filed insurer schedules' },
              { dot: '#94a3b8', label: 'No commission paid',          sub: 'Rankings never influenced by payments' },
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
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Health insurance alerts</p>
            <h2 className="font-serif font-bold text-slate-950 mb-5" style={{ fontSize: 'clamp(30px, 3.5vw, 42px)', letterSpacing: '-1.5px', lineHeight: 1.1 }}>
              New health plans and premium changes,<br />
              <span style={{ color: PILLAR }}>direct to your inbox.</span>
            </h2>
            <p className="text-slate-500 mb-8" style={{ fontSize: '15px', lineHeight: 1.85 }}>
              Quarterly digest of health insurance developments — new plan launches,
              premium changes, hospital network updates and NBE regulatory changes.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'New individual and group health plan launches',
                'Premium changes across all 12 licensed health insurers',
                'Hospital network additions and removals',
                'NBE health insurance regulation updates',
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
