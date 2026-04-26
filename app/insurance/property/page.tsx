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
const ClockIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
)
function fmtDate(d: string | null | undefined) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}
function fmtETB(val: number | null | undefined) {
  if (val == null) return '—'
  return 'ETB ' + Number(val).toLocaleString('en-ET')
}

export default async function PropertyInsurancePage() {
  const supabase = createSupabaseAdminClient()
  const { data: productsData } = await supabase.schema('birrbank').from('insurance_products').select('*, institutions(name, slug)').eq('product_type', 'property').eq('is_current', true).order('premium_from_etb', { ascending: true })
  const { count: totalCount } = await supabase.schema('birrbank').from('insurance_products').select('count', { count: 'exact', head: true }).eq('product_type', 'property').eq('is_current', true)
  const products = productsData ?? []

  const GUIDE = [
    { step: '01', title: 'Fire and allied perils vs homeowners', body: 'Fire and allied perils is the standard commercial property product — covering fire, explosion, lightning and related risks. Homeowners insurance is broader — covering the building, contents, burglary and sometimes natural disasters.' },
    { step: '02', title: 'How premiums are calculated', body: 'Property insurance premiums are typically expressed as a percentage of the insured value. A 0.35% annual premium on a property valued at ETB 2 million equals ETB 7,000 per year. Make sure you insure for full replacement value, not market value.' },
    { step: '03', title: 'What to insure separately', body: 'Building cover insures the structure. Contents cover insures what is inside. Burglary cover is often a separate add-on. For businesses, business interruption cover pays for lost revenue while premises are being repaired after a covered event.' },
  ]

  return (
    <div className="min-h-screen bg-white">
      <section className="relative bg-white overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 900px 500px at 55% -80px, rgba(29,78,216,0.04) 0%, transparent 65%)' }} />
        <div className="relative max-w-6xl mx-auto px-8 pt-20 pb-14">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-6">
            <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link><span>›</span>
            <Link href="/insurance" className="hover:text-slate-600 transition-colors">Insurance</Link><span>›</span>
            <span style={{ color: PILLAR, fontWeight: 700 }}>Property Insurance</span>
          </div>
          <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: PILLAR }}>Insurance · Property Insurance</p>
          <h1 className="font-serif font-bold mb-5 text-slate-950" style={{ fontSize: 'clamp(36px, 4.5vw, 54px)', letterSpacing: '-1.8px', lineHeight: 1.08 }}>
            Property insurance in Ethiopia —<br /><span style={{ color: PILLAR }}>fire, perils and homeowners cover.</span>
          </h1>
          <p className="text-slate-600 mb-8" style={{ fontSize: '16px', lineHeight: '1.8', maxWidth: '520px' }}>Fire and allied perils, homeowners and commercial property insurance from all NBE-licensed providers. Compare annual premiums as a percentage of property value.</p>
          <div className="flex flex-wrap gap-6">
            {[
              { icon: <ClockIcon />, label: (totalCount ?? 0) + ' products compared' },
              { icon: <ClockIcon />, label: 'NBE-licensed insurers only' },
              { icon: <ClockIcon />, label: 'Verified premium data' },
              { icon: <ClockIcon />, label: 'Last verified dates on every row' },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <span style={{ color: PILLAR }}>{s.icon}</span>
                <span className="text-xs font-semibold text-slate-500">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white" style={{ padding: '64px 32px 96px' }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-8">Showing {totalCount ?? 0} products · Sorted by premium</p>
          <div className="rounded-2xl overflow-hidden border border-slate-200" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <div style={{ height: 4, background: 'linear-gradient(90deg, #1D4ED8, #1E40AF)' }} />
            <div className="hidden sm:grid border-b border-slate-200" style={{ gridTemplateColumns: '1fr 160px 160px 160px 120px', padding: '13px 24px', background: '#f9fafb' }}>
              {['Insurer & product', 'Annual premium', 'Coverage from', 'Coverage to', 'Verified'].map((h) => (
                <p key={h} className="text-xs font-black text-slate-400 uppercase tracking-widest">{h}</p>
              ))}
            </div>
            {products.length > 0 ? products.map((p: any, i: number) => (
              <div key={p.id} className={'border-b border-slate-100 transition-colors ' + (i === 0 ? 'bg-blue-50' : 'bg-white hover:bg-slate-50')}>
                <div className="hidden sm:grid items-start" style={{ gridTemplateColumns: '1fr 160px 160px 160px 120px', padding: i === 0 ? '18px 24px' : '14px 24px' }}>
                  <div>
                    <p className={'font-bold ' + (i === 0 ? 'text-blue-900' : 'text-slate-800')} style={{ fontSize: i === 0 ? '15px' : '14px' }}>{p.institutions?.name ?? p.institution_slug}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{p.product_name}</p>
                    {p.key_features && Array.isArray(p.key_features) && p.key_features.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {p.key_features.slice(0, 3).map((f: string) => (
                          <span key={f} className="text-xs rounded-full px-2 py-0.5" style={{ background: '#f1f5f9', color: '#475569' }}>{f}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div>
                    {p.annual_premium_pct ? (
                      <p className={'font-mono font-black ' + (i === 0 ? 'text-blue-700' : 'text-slate-800')} style={{ fontSize: i === 0 ? '22px' : '16px', letterSpacing: '-0.5px' }}>{Number(p.annual_premium_pct).toFixed(2)}%</p>
                    ) : (
                      <p className={'font-mono font-black ' + (i === 0 ? 'text-blue-700' : 'text-slate-800')} style={{ fontSize: '14px' }}>{fmtETB(p.premium_from_etb)}</p>
                    )}
                    {p.annual_premium_pct && <p className="text-xs text-slate-400">of insured value</p>}
                    {!p.annual_premium_pct && p.premium_from_etb && p.premium_to_etb && <p className="text-xs text-slate-400">to {fmtETB(p.premium_to_etb)}</p>}
                  </div>
                  <p className="font-mono text-slate-600 text-sm">{fmtETB(p.coverage_from_etb)}</p>
                  <p className="font-mono text-slate-600 text-sm">{fmtETB(p.coverage_to_etb)}</p>
                  <div className="flex items-center gap-1.5"><span style={{ color: PILLAR }}><ClockIcon /></span><p className="text-xs text-slate-400">{fmtDate(p.last_verified_date)}</p></div>
                </div>
                <div className="sm:hidden" style={{ padding: '14px 16px' }}>
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <p className="font-bold text-slate-800 text-sm">{p.institutions?.name ?? p.institution_slug}</p>
                    <p className="font-mono font-bold text-slate-800 shrink-0">{p.annual_premium_pct ? Number(p.annual_premium_pct).toFixed(2) + '%' : fmtETB(p.premium_from_etb)}</p>
                  </div>
                  <p className="text-xs text-slate-400">{p.product_name} · verified {fmtDate(p.last_verified_date)}</p>
                </div>
              </div>
            )) : (
              <div className="py-12 text-center"><p className="text-slate-500 text-sm">Insurance data is being verified. Check back soon.</p></div>
            )}
            <div className="flex items-center justify-between border-t border-slate-200" style={{ background: '#f9fafb', padding: '14px 24px' }}>
              <p className="text-xs text-slate-400">Premiums sourced from insurer websites and NBE minimum schedule · For comparison only</p>
              <Link href="/insurance" className="text-xs font-bold hover:underline shrink-0" style={{ color: PILLAR }}>All insurance →</Link>
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-5 text-center leading-relaxed">
            Premiums are for comparison purposes only. Always get a formal quote directly from the insurer. BirrBank is not an insurance broker.
          </p>
        </div>
      </section>

      <section className="border-b border-slate-100" style={{ background: '#f9fafb', padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Guide</p>
            <h2 className="font-serif font-bold text-slate-950" style={{ fontSize: 'clamp(26px, 3vw, 36px)', letterSpacing: '-1.2px', lineHeight: 1.15 }}>
              What to look for when choosing property insurance.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {GUIDE.map((s) => (
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

      <section className="border-b border-slate-100" style={{ background: '#0f172a', padding: '72px 32px' }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: '#93c5fd' }}>Data integrity</p>
            <h3 className="font-serif font-bold mb-2" style={{ fontSize: 'clamp(22px, 2.5vw, 30px)', color: '#ffffff', letterSpacing: '-0.8px' }}>NBE-licensed insurers only. Always.</h3>
            <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: 1.75, maxWidth: 480 }}>Every insurer on BirrBank is verified against the NBE registry. Premium data is sourced from official insurer websites and NBE minimum premium schedules.</p>
          </div>
          <Link href="/insurance" className="font-bold rounded-full shrink-0" style={{ fontSize: 14, padding: '14px 28px', background: '#1D4ED8', color: '#fff', whiteSpace: 'nowrap', boxShadow: '0 4px 20px rgba(29,78,216,0.25)' }}>All insurance types →</Link>
        </div>
      </section>

      <section className="bg-white" style={{ padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Insurance alerts</p>
            <h2 className="font-serif font-bold text-slate-950 mb-5" style={{ fontSize: 'clamp(30px, 3.5vw, 42px)', letterSpacing: '-1.5px', lineHeight: 1.1 }}>
              Property Insurance changes,<br /><span style={{ color: PILLAR }}>direct to your inbox.</span>
            </h2>
            <p className="text-slate-500 mb-8" style={{ fontSize: '15px', lineHeight: 1.85 }}>Get notified when insurers update their property insurance premiums or launch new products.</p>
            <ul className="space-y-3 mb-8">
              {['Property Insurance premium changes across all providers','New product launches and coverage updates','NBE minimum premium schedule changes','Claims guide and process updates'].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-slate-600">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><polyline points="20 6 9 17 4 12"/></svg>
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
