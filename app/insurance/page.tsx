import Link from 'next/link'
import EmailCapture from '@/components/EmailCapture'
import { createSupabaseAdminClient } from '@/lib/supabase'
export const dynamic = 'force-dynamic'

const PILLAR = '#1D4ED8'

const PRODUCT_TYPES = [
  { label: 'Motor Insurance', href: '/insurance/motor', desc: 'Third-party and comprehensive cover for cars, trucks and motorcycles.', required: true,
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg> },
  { label: 'Life Insurance', href: '/insurance/life', desc: 'Term life, whole life and endowment policies from all licensed providers.', required: false,
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> },
  { label: 'Health Insurance', href: '/insurance/health', desc: 'Individual and group health plans covering hospitalisation and outpatient care.', required: false,
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg> },
  { label: 'Property Insurance', href: '/insurance/property', desc: 'Fire, allied perils and homeowners cover for residential and commercial property.', required: false,
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
]

const ArrowRight = ({ size = 13 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)

export default async function InsurancePage() {
  const supabase = createSupabaseAdminClient()

  const { data: insurersData } = await supabase
    .schema('birrbank')
    .from('institutions')
    .select('slug, name, type, founded_year, birrbank_score, website_url')
    .eq('type', 'insurer')
    .eq('is_active', true)
    .order('name')

  const { count: insurerCount } = await supabase
    .schema('birrbank')
    .from('institutions')
    .select('count', { count: 'exact', head: true })
    .eq('type', 'insurer')
    .eq('is_active', true)

  const { count: motorCount } = await supabase
    .schema('birrbank')
    .from('insurance_products')
    .select('count', { count: 'exact', head: true })
    .eq('product_type', 'motor')
    .eq('is_current', true)

  const insurers = insurersData ?? []

  return (
    <div className="min-h-screen bg-white">

      {/* ══════════════════════════════ HERO ══════════════════════════════════════ */}
      <section className="relative bg-white overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 900px 500px at 55% -80px, rgba(29,78,216,0.04) 0%, transparent 65%)' }} />
        <div className="relative max-w-6xl mx-auto px-8 pt-20 pb-12">
          <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: PILLAR }}>Insurance</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            <div>
              <h1 className="font-serif font-bold mb-5 text-slate-950" style={{ fontSize: 'clamp(38px, 4.5vw, 56px)', letterSpacing: '-1.8px', lineHeight: 1.08 }}>
                Compare insurance<br />
                <span style={{ color: PILLAR }}>across all {insurerCount ?? 18} providers.</span>
              </h1>
              <p className="text-slate-600 mb-8" style={{ fontSize: '16px', lineHeight: '1.8', maxWidth: '440px' }}>
                Motor, life, health and property insurance from every NBE-licensed insurer in Ethiopia —
                premiums, coverage limits and key features compared free.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/insurance/motor" className="font-bold rounded-full transition-all"
                  style={{ fontSize: 15, padding: '14px 32px', minWidth: 200, textAlign: 'center', background: PILLAR, color: '#fff', boxShadow: '0 4px 20px rgba(29,78,216,0.20)' }}>
                  Compare motor insurance
                </Link>
                <Link href="/insurance/life" className="font-bold rounded-full transition-all"
                  style={{ fontSize: 15, padding: '14px 32px', minWidth: 200, textAlign: 'center', border: '2px solid #1D4ED8', color: PILLAR, background: 'transparent' }}>
                  Life insurance
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: (insurerCount ?? 18).toString(), label: 'Licensed insurers', sub: 'NBE-regulated' },
                { value: (motorCount ?? 0).toString(),    label: 'Motor products',    sub: 'Compared' },
                { value: 'Free',                          label: 'Always',            sub: 'No broker fees' },
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
      <section className="border-b border-slate-100" style={{ background: '#f9fafb', padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">What we cover</p>
            <h2 className="font-serif font-bold text-slate-950" style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', letterSpacing: '-1.2px', lineHeight: 1.1 }}>
              Every insurance product type, compared.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PRODUCT_TYPES.map((cat) => (
              <Link key={cat.label} href={cat.href}
                className="group bg-white rounded-2xl border border-slate-200 hover:shadow-xl transition-all duration-200 flex flex-col overflow-hidden"
                style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                <div style={{ height: 3, background: PILLAR }} />
                <div className="flex gap-4 items-start" style={{ padding: '24px' }}>
                  <div className="rounded-xl flex items-center justify-center shrink-0" style={{ width: 48, height: 48, background: '#EFF6FF' }}>{cat.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <p className="font-bold text-slate-900" style={{ fontSize: '15px' }}>{cat.label}</p>
                      {cat.required && <span className="text-xs font-bold rounded-full px-2 py-0.5" style={{ background: '#fee2e2', color: '#991b1b' }}>Required by law</span>}
                    </div>
                    <p className="text-slate-500 text-xs mb-3" style={{ lineHeight: '1.7' }}>{cat.desc}</p>
                    <div className="flex items-center gap-1 text-xs font-bold group-hover:gap-2 transition-all" style={{ color: PILLAR }}>
                      <span>Compare</span><ArrowRight size={11} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ ALL INSURERS ═════════════════════════════ */}
      <section className="border-b border-slate-100 bg-white" style={{ padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">All insurers</p>
              <h2 className="font-serif font-bold text-slate-950" style={{ fontSize: 'clamp(22px, 2.8vw, 32px)', letterSpacing: '-1px', lineHeight: 1.15 }}>
                All {insurerCount ?? 18} NBE-licensed insurers
              </h2>
            </div>
            <Link href="/insurance/motor" className="inline-flex items-center gap-2 text-sm font-bold shrink-0" style={{ color: PILLAR }}>
              Compare motor insurance <ArrowRight />
            </Link>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-200" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <div style={{ height: 4, background: 'linear-gradient(90deg, #1D4ED8, #1E40AF)' }} />
            <div className="hidden sm:grid border-b border-slate-200"
              style={{ gridTemplateColumns: '1fr 130px 100px 80px', padding: '12px 24px', background: '#f9fafb' }}>
              {['Insurer', 'Type', 'Founded', 'Score'].map((h) => (
                <p key={h} className="text-xs font-black text-slate-400 uppercase tracking-widest">{h}</p>
              ))}
            </div>

            {insurers.map((ins: any, i: number) => (
              <div key={ins.slug} className={'border-b border-slate-100 transition-colors ' + (i === 0 ? 'bg-blue-50' : 'bg-white hover:bg-slate-50')}>
                <div className="hidden sm:grid items-center"
                  style={{ gridTemplateColumns: '1fr 130px 100px 80px', padding: i === 0 ? '18px 24px' : '13px 24px' }}>
                  <div>
                    <p className={'font-bold ' + (i === 0 ? 'text-blue-900' : 'text-slate-800')} style={{ fontSize: i === 0 ? '15px' : '14px' }}>{ins.name}</p>
                    {i === 0 && <span className="text-xs font-bold" style={{ color: PILLAR }}>Largest insurer</span>}
                  </div>
                  <p className="text-sm text-slate-500 capitalize">{ins.type}</p>
                  <p className="text-sm text-slate-500">{ins.founded_year ?? '—'}</p>
                  <p className="text-sm font-bold text-slate-600">{ins.birrbank_score ? Number(ins.birrbank_score).toFixed(1) : '—'}</p>
                </div>
                <div className="sm:hidden flex items-center justify-between gap-3" style={{ padding: '13px 16px' }}>
                  <p className="font-bold text-slate-800 text-sm">{ins.name}</p>
                  <p className="text-xs text-slate-400 shrink-0">{ins.founded_year ?? '—'}</p>
                </div>
              </div>
            ))}

            <div className="flex items-center justify-between border-t border-slate-200" style={{ background: '#f9fafb', padding: '14px 24px' }}>
              <p className="text-xs text-slate-400">Source: NBE registry · nbe.gov.et/financial-institutions</p>
              <Link href="/insurance/motor" className="text-xs font-bold hover:underline shrink-0" style={{ color: PILLAR }}>
                Compare products →
              </Link>
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-4 text-center">
            Data for comparison purposes only. Always verify directly with the insurer.
            BirrBank is not an insurance broker or financial adviser.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════ TRUST ════════════════════════════════════ */}
      <section className="border-b border-slate-100" style={{ background: '#0f172a', padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: '#93c5fd' }}>Why BirrBank for insurance</p>
            <h2 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(26px, 3.5vw, 38px)', letterSpacing: '-1.2px', color: '#ffffff' }}>
              First insurance comparison platform in Ethiopia.
            </h2>
            <p className="mx-auto" style={{ fontSize: '16px', lineHeight: 1.75, maxWidth: '480px', color: '#94a3b8' }}>
              No other platform compares insurance products across all {insurerCount ?? 18} NBE-licensed insurers.
              BirrBank covers motor, life, health and property — all in one place.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#93c5fd" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>, tag: 'NBE verified', headline: 'Only licensed insurers. No unlicensed operators.', body: 'Every insurer on BirrBank is verified against the NBE registry. If it is not NBE-licensed, it does not appear.' },
              { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#93c5fd" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>, tag: 'No broker fees', headline: 'Free comparison. No commissions paid to us.', body: 'BirrBank earns nothing from the insurers it compares. Rankings are based purely on price and coverage — never on commercial arrangements.' },
              { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#93c5fd" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, tag: 'Verified data', headline: 'Premiums verified from official insurer sources.', body: 'All premium data is sourced from insurer websites and NBE-published minimum schedules. Every figure is timestamped with its verification date.' },
            ].map(({ icon, tag, headline, body }) => (
              <div key={tag} className="rounded-2xl flex flex-col" style={{ padding: '36px 32px', background: '#1e293b', border: '1px solid #334155', minHeight: '260px' }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-6" style={{ background: '#1e3a5f', border: '1px solid #1d4ed8' }}>{icon}</div>
                <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: '#93c5fd' }}>{tag}</p>
                <h3 className="font-bold mb-3" style={{ fontSize: '16px', lineHeight: 1.4, color: '#ffffff' }}>{headline}</h3>
                <p className="text-sm" style={{ lineHeight: '1.85', color: '#94a3b8' }}>{body}</p>
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
              New products and rate changes,<br />
              <span style={{ color: PILLAR }}>direct to your inbox.</span>
            </h2>
            <p className="text-slate-500 mb-8" style={{ fontSize: '15px', lineHeight: 1.85 }}>
              Get notified when insurers update their premiums or launch new products — before renewal season.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Motor insurance premium changes across all ' + (insurerCount ?? 18) + ' providers',
                'New life and health insurance product launches',
                'NBE minimum premium schedule updates',
                'Claims guide updates and insurer service changes',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-slate-600">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
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
