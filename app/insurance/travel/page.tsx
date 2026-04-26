import Link from 'next/link'
import EmailCapture from '@/components/EmailCapture'
import { createSupabaseAdminClient } from '@/lib/supabase'
export const dynamic = 'force-dynamic'

const PILLAR = '#1D4ED8'

const ArrowRight = ({ size = 13 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)

const ShieldIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
)

function fmtETB(val: number | null | undefined) {
  if (val == null) return '—'
  return 'ETB ' + Number(val).toLocaleString('en-ET')
}

function fmtDate(d: string | null | undefined) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default async function TravelInsurancePage() {
  const supabase = createSupabaseAdminClient()

  const { data: productsData } = await supabase
    .schema('birrbank')
    .from('insurance_products')
    .select('*, institutions(name, slug)')
    .eq('product_type', 'travel')
    .eq('is_current', true)
    .order('premium_from_etb', { ascending: true })

  const { count: insurerCount } = await supabase
    .schema('birrbank')
    .from('institutions')
    .select('count', { count: 'exact', head: true })
    .eq('type', 'insurer')
    .eq('is_active', true)

  const products = productsData ?? []

  return (
    <div className="min-h-screen bg-white">

      {/* HERO */}
      <section className="relative bg-white overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 900px 500px at 55% -80px, rgba(29,78,216,0.04) 0%, transparent 65%)' }} />
        <div className="relative max-w-6xl mx-auto px-8 pt-20 pb-14">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-6">
            <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link><span>›</span>
            <Link href="/insurance" className="hover:text-slate-600 transition-colors">Insurance</Link><span>›</span>
            <span style={{ color: PILLAR, fontWeight: 700 }}>Travel Insurance</span>
          </div>
          <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: PILLAR }}>Insurance · Travel</p>
          <h1 className="font-serif font-bold mb-5 text-slate-950"
            style={{ fontSize: 'clamp(36px, 4.5vw, 54px)', letterSpacing: '-1.8px', lineHeight: 1.08 }}>
            Travel insurance in Ethiopia —<br />
            <span style={{ color: PILLAR }}>all {insurerCount ?? 18} insurers compared.</span>
          </h1>
          <p className="text-slate-600 mb-8" style={{ fontSize: '16px', lineHeight: '1.8', maxWidth: '520px' }}>
            Compare travel insurance products from every NBE-licensed insurer in Ethiopia.
            Essential for Ethiopians travelling abroad and diaspora visiting home.
          </p>
          <div className="flex flex-wrap gap-6">
            {[
              { icon: <ShieldIcon />, label: (insurerCount ?? 18) + ' insurers compared' },
              { icon: <ShieldIcon />, label: 'NBE-licensed providers only' },
              { icon: <ShieldIcon />, label: 'Medical, trip cancellation and baggage cover' },
              { icon: <ShieldIcon />, label: 'Sharia-compliant options available' },
            ].map(s => (
              <div key={s.label} className="flex items-center gap-2">
                <span style={{ color: PILLAR }}>{s.icon}</span>
                <span className="text-xs font-semibold text-slate-500">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS TABLE */}
      <section className="bg-white" style={{ padding: '64px 32px 96px' }}>
        <div className="max-w-6xl mx-auto">

          <div className="flex items-center justify-between mb-8">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
              {products.length > 0 ? products.length + ' travel products' : 'Travel insurance products'}
            </p>
          </div>

          {products.length > 0 ? (
            <div className="rounded-2xl overflow-hidden border border-slate-200" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
              <div style={{ height: 4, background: 'linear-gradient(90deg, #1D4ED8, #1E40AF)' }} />
              <div className="hidden sm:grid border-b border-slate-200"
                style={{ gridTemplateColumns: '44px 1fr 160px 140px 140px 110px', padding: '13px 24px', background: '#f9fafb' }}>
                {['#', 'Insurer', 'Product', 'Premium from', 'Coverage from', 'Verified'].map(h => (
                  <p key={h} className="text-xs font-black text-slate-400 uppercase tracking-widest">{h}</p>
                ))}
              </div>
              {products.map((p: any, i: number) => (
                <div key={p.id}
                  className={'border-b border-slate-100 transition-colors ' + (i === 0 ? 'bg-blue-50' : 'bg-white hover:bg-slate-50')}>
                  <div className="hidden sm:grid items-center"
                    style={{ gridTemplateColumns: '44px 1fr 160px 140px 140px 110px', padding: i === 0 ? '18px 24px' : '14px 24px' }}>
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black"
                      style={i === 0 ? { background: '#1D4ED8', color: '#fff' } : { background: '#f1f5f9', color: '#94a3b8' }}>
                      {i === 0 ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> : i + 1}
                    </div>
                    <div>
                      <p className={'font-bold ' + (i === 0 ? 'text-blue-900' : 'text-slate-800')}
                        style={{ fontSize: i === 0 ? '15px' : '14px' }}>
                        {p.institutions?.name ?? p.institution_slug}
                      </p>
                      {p.is_sharia_compliant && (
                        <span className="text-xs font-bold rounded-full px-2 py-0.5 mt-1 inline-block"
                          style={{ background: '#fef3c7', color: '#92400e' }}>Sharia</span>
                      )}
                    </div>
                    <p className="text-sm text-slate-600">{p.product_name ?? '—'}</p>
                    <p className={'font-mono font-black ' + (i === 0 ? 'text-blue-700' : 'text-slate-800')}
                      style={{ fontSize: i === 0 ? '18px' : '15px', letterSpacing: '-0.5px' }}>
                      {fmtETB(p.premium_from_etb)}
                    </p>
                    <p className="font-mono text-sm text-slate-600">{fmtETB(p.coverage_from_etb)}</p>
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs text-slate-400">{fmtDate(p.last_verified_date)}</p>
                    </div>
                  </div>
                  <div className="sm:hidden flex items-center gap-3" style={{ padding: '14px 16px' }}>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-slate-800 text-sm">{p.institutions?.name ?? p.institution_slug}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{p.product_name} · from {fmtETB(p.premium_from_etb)}</p>
                    </div>
                    <p className="font-mono font-black text-slate-800 shrink-0" style={{ fontSize: '16px' }}>
                      {fmtETB(p.premium_from_etb)}
                    </p>
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-between border-t border-slate-200"
                style={{ background: '#f9fafb', padding: '14px 24px' }}>
                <p className="text-xs text-slate-400">
                  Premiums sourced from official insurer websites · For comparison only · Sorted by lowest premium
                </p>
                <Link href="/insurance" className="text-xs font-bold hover:underline shrink-0" style={{ color: PILLAR }}>
                  All insurance types →
                </Link>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 overflow-hidden" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
              <div style={{ height: 4, background: 'linear-gradient(90deg, #1D4ED8, #1E40AF)' }} />
              <div className="py-16 text-center px-8">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: '#dbeafe' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <p className="font-bold text-slate-800 mb-2">Travel insurance data being verified</p>
                <p className="text-slate-500 text-sm mb-6" style={{ maxWidth: '400px', margin: '0 auto 24px' }}>
                  Our team is verifying travel insurance products from all 18 NBE-licensed insurers.
                  Data will be published shortly. Sign up below for an alert.
                </p>
                <Link href="/insurance"
                  className="inline-flex items-center gap-2 font-bold rounded-full text-sm"
                  style={{ background: PILLAR, color: '#fff', padding: '12px 24px' }}>
                  View other insurance types <ArrowRight />
                </Link>
              </div>
            </div>
          )}

          <p className="text-xs text-slate-400 mt-5 text-center leading-relaxed">
            Premiums are indicative and for comparison only. Actual premiums depend on trip duration,
            destination, age and declared value. Always confirm with the insurer before purchasing.
            BirrBank is not an insurance broker or adviser.
          </p>
        </div>
      </section>

      {/* GUIDE */}
      <section className="border-b border-slate-100" style={{ background: '#f9fafb', padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Guide</p>
            <h2 className="font-serif font-bold text-slate-950"
              style={{ fontSize: 'clamp(26px, 3vw, 36px)', letterSpacing: '-1.2px', lineHeight: 1.15 }}>
              What Ethiopian travel insurance covers.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Medical emergencies abroad', body: 'The most critical cover. Ethiopian travel insurance typically covers emergency medical treatment, hospitalisation and medical evacuation. Coverage amounts vary significantly — compare the maximum coverage limit before selecting a policy.' },
              { step: '02', title: 'Trip cancellation and delays', body: 'Covers non-refundable costs if your trip is cancelled due to illness, family emergency or flight cancellation. Check whether the policy covers both pre-departure cancellation and mid-trip curtailment separately.' },
              { step: '03', title: 'Baggage and personal effects', body: 'Covers loss, theft or damage to luggage and personal items. Ethiopian insurers typically cover up to ETB 50,000 in personal effects. High-value items such as cameras or laptops often require separate declaration.' },
            ].map(s => (
              <div key={s.step} className="bg-white rounded-2xl border border-slate-200 overflow-hidden"
                style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                <div style={{ height: 3, background: PILLAR }} />
                <div style={{ padding: '28px 24px' }}>
                  <p className="font-mono font-black mb-3" style={{ fontSize: '32px', color: '#e2e8f0', lineHeight: 1 }}>{s.step}</p>
                  <p className="font-bold text-slate-900 mb-3" style={{ fontSize: '15px' }}>{s.title}</p>
                  <p className="text-sm text-slate-500" style={{ lineHeight: 1.75 }}>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/insurance" className="inline-flex items-center gap-2 text-sm font-bold" style={{ color: PILLAR }}>
              Compare motor insurance <ArrowRight />
            </Link>
            <Link href="/insurance/health" className="inline-flex items-center gap-2 text-sm font-bold" style={{ color: PILLAR }}>
              Compare health insurance <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* EMAIL */}
      <section className="bg-white" style={{ padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Travel insurance alerts</p>
            <h2 className="font-serif font-bold text-slate-950 mb-5"
              style={{ fontSize: 'clamp(30px, 3.5vw, 42px)', letterSpacing: '-1.5px', lineHeight: 1.1 }}>
              New products and rate changes,<br /><span style={{ color: PILLAR }}>direct to your inbox.</span>
            </h2>
            <p className="text-slate-500 mb-8" style={{ fontSize: '15px', lineHeight: 1.85 }}>
              Get notified when new travel insurance products launch or existing premiums change
              across all {insurerCount ?? 18} NBE-licensed insurers.
            </p>
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
