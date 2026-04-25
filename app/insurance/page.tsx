import Link from 'next/link'
import EmailCapture from '@/components/EmailCapture'
export const dynamic = 'force-dynamic'

// ─── Placeholder data — replace with Supabase queries in Phase 2 ─────────────

const INSURERS = [
  { name: 'Ethiopian Insurance Corporation', type: 'State',   products: ['Motor','Life','Health','Property'], score: 4.2, badge: 'Largest insurer' },
  { name: 'Awash Insurance',                 type: 'Private', products: ['Motor','Life','Health','Property'], score: 4.0, badge: null },
  { name: 'Nile Insurance',                  type: 'Private', products: ['Motor','Life','Property'],          score: 3.9, badge: null },
  { name: 'Africa Insurance',                type: 'Private', products: ['Motor','Health','Property'],        score: 3.8, badge: null },
  { name: 'Global Insurance',                type: 'Private', products: ['Motor','Life','Health'],            score: 3.7, badge: null },
  { name: 'Nyala Insurance',                 type: 'Private', products: ['Motor','Property','Agricultural'],  score: 3.9, badge: 'Agricultural cover' },
]

const PRODUCT_TYPES = [
  {
    label: 'Motor Insurance',
    href: '/insurance/motor',
    desc: 'Third-party and comprehensive cover for cars, trucks and motorcycles.',
    stat: '18 providers',
    required: true,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
  },
  {
    label: 'Life Insurance',
    href: '/insurance/life',
    desc: 'Term life, whole life and endowment policies from all licensed providers.',
    stat: '15 providers',
    required: false,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
  },
  {
    label: 'Health Insurance',
    href: '/insurance/health',
    desc: 'Individual and group medical cover — inpatient, outpatient and dental.',
    stat: '12 providers',
    required: false,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
  },
  {
    label: 'Property Insurance',
    href: '/insurance/property',
    desc: 'Home, commercial and industrial property cover against fire, theft and disaster.',
    stat: '14 providers',
    required: false,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    label: 'Travel Insurance',
    href: '/insurance/travel',
    desc: 'International and domestic travel cover — medical, cancellation and baggage.',
    stat: '8 providers',
    required: false,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5 19.79 19.79 0 0 1 1.61 4.87 2 2 0 0 1 3.6 2.69h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 17z"/>
      </svg>
    ),
  },
  {
    label: 'Claims Guide',
    href: '/insurance/claims-guide',
    desc: 'Step-by-step claims process for every product type and provider.',
    stat: 'All providers',
    required: false,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
  },
]

const ArrowRight = ({ size = 13 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)

const StarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="#d97706" stroke="#d97706" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
)

const PILLAR = '#1D4ED8'
const PILLAR_BG = '#EFF6FF'

export default function InsurancePage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ══════════════════════════════ HERO ══════════════════════════════════════ */}
      <section className="relative bg-white overflow-hidden border-b border-slate-100">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 900px 500px at 55% -80px, rgba(29,78,216,0.04) 0%, transparent 65%)' }}
        />
        <div className="relative max-w-6xl mx-auto px-8 pt-20 pb-12">
          <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: PILLAR }}>Insurance</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            <div>
              <h1
                className="font-serif font-bold mb-5 text-slate-950"
                style={{ fontSize: 'clamp(38px, 4.5vw, 56px)', letterSpacing: '-1.8px', lineHeight: 1.08 }}
              >
                Ethiopia's first<br />
                <span style={{ color: PILLAR }}>insurance comparison.</span>
              </h1>
              <p className="text-slate-600 mb-8" style={{ fontSize: '16px', lineHeight: '1.8', maxWidth: '440px' }}>
                Motor, life, health and property insurance from all 18 NBE-licensed providers —
                compared free in one place for the first time in Ethiopia.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/insurance/motor"
                  className="font-bold rounded-full transition-all"
                  style={{ fontSize: 15, padding: '14px 32px', minWidth: 200, textAlign: 'center', background: PILLAR, color: '#fff', boxShadow: '0 4px 20px rgba(29,78,216,0.20)' }}
                >
                  Compare motor insurance
                </Link>
                <Link
                  href="/insurance/claims-guide"
                  className="font-bold rounded-full transition-all"
                  style={{ fontSize: 15, padding: '14px 32px', minWidth: 200, textAlign: 'center', border: '2px solid #1D4ED8', color: PILLAR, background: 'transparent' }}
                >
                  Claims guide
                </Link>
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: '18',    label: 'Licensed insurers',    sub: 'NBE-regulated' },
                { value: '1st',   label: 'Comparison platform',  sub: 'In Ethiopia' },
                { value: '6',     label: 'Product categories',   sub: 'Motor to agricultural' },
              ].map((s) => (
                <div key={s.label} className="bg-white rounded-2xl border border-slate-200 text-center" style={{ padding: '20px 12px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                  <p className="font-mono font-black mb-1" style={{ fontSize: '20px', letterSpacing: '-1px', color: PILLAR }}>{s.value}</p>
                  <p className="font-semibold text-slate-700 mb-0.5" style={{ fontSize: '11px' }}>{s.label}</p>
                  <p className="text-slate-400" style={{ fontSize: '10px' }}>{s.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ PRODUCT TYPES ════════════════════════════ */}
      <section className="border-b border-slate-100" style={{ background: '#f8faf8', padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">What we cover</p>
            <h2 className="font-serif font-bold text-slate-950" style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', letterSpacing: '-1.2px', lineHeight: 1.1 }}>
              Every insurance product in Ethiopia.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRODUCT_TYPES.map((cat) => (
              <Link
                key={cat.label}
                href={cat.href}
                className="group bg-white rounded-2xl border border-slate-200 hover:shadow-xl transition-all duration-200 flex flex-col overflow-hidden"
                style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
              >
                <div style={{ height: 3, background: PILLAR }} />
                <div className="flex gap-4 items-start" style={{ padding: '24px' }}>
                  <div className="rounded-xl flex items-center justify-center shrink-0" style={{ width: 48, height: 48, background: PILLAR_BG }}>
                    {cat.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <p className="font-bold text-slate-900" style={{ fontSize: '15px' }}>{cat.label}</p>
                      {cat.required && (
                        <span className="text-xs font-bold rounded-full px-2 py-0.5 shrink-0" style={{ background: '#fee2e2', color: '#991b1b' }}>
                          Required by law
                        </span>
                      )}
                    </div>
                    <p className="text-slate-500 text-xs mb-3" style={{ lineHeight: '1.7' }}>{cat.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400">{cat.stat}</span>
                      <div className="flex items-center gap-1 text-xs font-bold group-hover:gap-2 transition-all" style={{ color: '#1D4ED8' }}>
                        <span>Compare</span><ArrowRight size={11} />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ PROVIDERS TABLE ══════════════════════════ */}
      <section className="border-b border-slate-100 bg-white" style={{ padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">All providers</p>
              <h2 className="font-serif font-bold text-slate-950" style={{ fontSize: 'clamp(22px, 2.8vw, 32px)', letterSpacing: '-1px', lineHeight: 1.15 }}>
                18 NBE-licensed insurers
              </h2>
            </div>
            <Link href="/institutions?type=insurer" className="inline-flex items-center gap-2 text-sm font-bold shrink-0" style={{ color: '#1D4ED8' }}>
              Full insurer directory <ArrowRight />
            </Link>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-200" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <div style={{ height: 4, background: `linear-gradient(90deg, ${PILLAR}, #60a5fa)` }} />

            {/* Header */}
            <div
              className="hidden sm:grid border-b border-slate-200"
              style={{ gridTemplateColumns: '1fr 100px 1fr 80px', padding: '12px 24px', background: '#f8fafc' }}
            >
              {['Insurer', 'Type', 'Products offered', 'Score'].map((h) => (
                <p key={h} className="text-xs font-black text-slate-400 uppercase tracking-widest">{h}</p>
              ))}
            </div>

            {INSURERS.map((ins, i) => (
              <div
                key={ins.name}
                className={`border-b border-slate-100 transition-colors ${i === 0 ? 'bg-blue-50' : 'bg-white hover:bg-slate-50'}`}
              >
                {/* Desktop */}
                <div
                  className="hidden sm:grid items-center"
                  style={{ gridTemplateColumns: '1fr 100px 1fr 80px', padding: i === 0 ? '18px 24px' : '14px 24px' }}
                >
                  <div>
                    <p className="font-bold text-slate-800" style={{ fontSize: i === 0 ? '15px' : '14px' }}>{ins.name}</p>
                    {ins.badge && (
                      <span className="text-xs font-bold rounded-full px-2 py-0.5 mt-0.5 inline-block" style={{ background: PILLAR_BG, color: PILLAR }}>{ins.badge}</span>
                    )}
                  </div>
                  <span
                    className="text-xs font-bold rounded-full px-3 py-1 w-fit"
                    style={ins.type === 'State'
                      ? { background: '#dbeafe', color: '#1D4ED8' }
                      : { background: '#f1f5f9', color: '#475569' }}
                  >
                    {ins.type}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {ins.products.map((p) => (
                      <span key={p} className="text-xs font-medium rounded-md px-2 py-0.5" style={{ background: PILLAR_BG, color: PILLAR }}>
                        {p}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1">
                    <StarIcon />
                    <span className="font-bold text-slate-700 text-sm">{ins.score}</span>
                  </div>
                </div>

                {/* Mobile */}
                <div className="sm:hidden" style={{ padding: '14px 16px' }}>
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="font-bold text-slate-800 text-sm">{ins.name}</p>
                    <div className="flex items-center gap-1">
                      <StarIcon /><span className="font-bold text-slate-700 text-xs">{ins.score}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {ins.products.map((p) => (
                      <span key={p} className="text-xs font-medium rounded-md px-2 py-0.5" style={{ background: PILLAR_BG, color: PILLAR }}>{p}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <div className="flex items-center justify-between bg-slate-50 border-t border-slate-200" style={{ padding: '14px 24px' }}>
              <p className="text-xs text-slate-400">Source: NBE insurer registry (nbe.gov.et) · 18 licensed insurers total</p>
              <Link href="/institutions?type=insurer" className="text-xs font-bold hover:underline shrink-0" style={{ color: '#1D4ED8' }}>
                All 18 insurers →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ MOTOR CTA HIGHLIGHT ══════════════════════ */}
      <section className="border-b border-slate-100" style={{ background: '#f8faf8', padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="rounded-2xl overflow-hidden border border-blue-100" style={{ boxShadow: '0 4px 24px rgba(29,78,216,0.06)' }}>
            <div style={{ height: 4, background: `linear-gradient(90deg, ${PILLAR}, #60a5fa)` }} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div style={{ padding: '48px 40px' }}>
                <span className="text-xs font-black uppercase tracking-widest rounded-full px-3 py-1.5 inline-block mb-5" style={{ background: '#fee2e2', color: '#991b1b' }}>
                  Required by Ethiopian law
                </span>
                <h2 className="font-serif font-bold text-slate-950 mb-4" style={{ fontSize: 'clamp(24px, 3vw, 34px)', letterSpacing: '-1px', lineHeight: 1.15 }}>
                  Motor insurance is mandatory.<br />Find the best rate.
                </h2>
                <p className="text-slate-600 mb-6" style={{ fontSize: '15px', lineHeight: 1.8 }}>
                  All vehicles in Ethiopia must hold third-party motor insurance.
                  Premiums vary between providers. BirrBank compares all 18 to find
                  the right cover at the right price.
                </p>
                <Link
                  href="/insurance/motor"
                  className="inline-flex items-center gap-2 font-bold rounded-full transition-all"
                  style={{ fontSize: 15, padding: '14px 28px', background: PILLAR, color: '#fff', boxShadow: '0 4px 16px rgba(29,78,216,0.20)' }}
                >
                  Compare motor insurance <ArrowRight size={14} />
                </Link>
              </div>
              <div className="hidden lg:flex items-center justify-center" style={{ background: PILLAR_BG, padding: '48px 40px' }}>
                <div className="text-center">
                  <p className="font-mono font-black mb-2" style={{ fontSize: '64px', color: PILLAR, letterSpacing: '-2px', lineHeight: 1 }}>18</p>
                  <p className="font-bold text-slate-700 mb-1">licensed motor insurers</p>
                  <p className="text-sm text-slate-500">All NBE-regulated · All compared</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ DARK TRUST ════════════════════════════════ */}
      <section className="border-b border-slate-100" style={{ background: '#0a1f14', padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: '#4ade80' }}>Why BirrBank for insurance</p>
            <h2 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(26px, 3.5vw, 38px)', letterSpacing: '-1.2px', color: '#ffffff' }}>
              The first. The only. The complete.
            </h2>
            <p className="mx-auto" style={{ fontSize: '16px', lineHeight: 1.75, maxWidth: '480px', color: '#6b9e7e' }}>
              No insurance comparison platform has existed in Ethiopia before BirrBank.
              That is the opportunity — and the responsibility we take seriously.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>,
                tag: 'Complete market',
                headline: 'All 18 NBE-licensed insurers. Zero gaps.',
                body: 'Every insurer on BirrBank is verified against the National Bank of Ethiopia\'s official registry. No unlicensed operators, no grey-market providers.',
              },
              {
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
                tag: 'Claims transparency',
                headline: 'Step-by-step claims guides for every provider.',
                body: 'The most underserved part of insurance is the claims process. BirrBank publishes detailed claims guides — documents required, timelines, tips — for every insurer.',
              },
              {
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
                tag: 'No commission bias',
                headline: 'Rankings are never influenced by commissions.',
                body: 'Many comparison platforms earn commission from insurers they recommend. BirrBank\'s insurance rankings are based on verified product data — never on who pays more.',
              },
            ].map(({ icon, tag, headline, body }) => (
              <div key={tag} className="rounded-2xl flex flex-col" style={{ padding: '36px 32px', background: '#0f2d1a', border: '1px solid #1a3a24', minHeight: '260px' }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-6" style={{ background: '#1a3a24', border: '1px solid #2d6a4f' }}>
                  {icon}
                </div>
                <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: '#4ade80' }}>{tag}</p>
                <h3 className="font-bold mb-3" style={{ fontSize: '16px', lineHeight: 1.4, color: '#ffffff' }}>{headline}</h3>
                <p className="text-sm" style={{ lineHeight: '1.85', color: '#6b9e7e' }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ EMAIL CAPTURE ════════════════════════════ */}
      <section className="bg-white" style={{ padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Insurance alerts</p>
            <h2 className="font-serif font-bold text-slate-950 mb-5" style={{ fontSize: 'clamp(30px, 3.5vw, 42px)', letterSpacing: '-1.5px', lineHeight: 1.1 }}>
              New products and<br />
              <span style={{ color: '#1D4ED8' }}>premium changes, free.</span>
            </h2>
            <p className="text-slate-500 mb-8" style={{ fontSize: '15px', lineHeight: 1.85 }}>
              Be the first to know when an insurer launches a new product,
              changes its premiums, or when NBE updates mandatory cover requirements.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'New motor, life and health insurance products',
                'Premium changes across all 18 NBE-licensed insurers',
                'Mandatory insurance regulation updates from NBE',
                'Agricultural and micro-insurance product launches',
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
