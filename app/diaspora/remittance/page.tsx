import Link from 'next/link'
import EmailCapture from '@/components/EmailCapture'
import { createSupabaseAdminClient } from '@/lib/supabase'
export const dynamic = 'force-dynamic'

const PILLAR = '#1D4ED8'
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

export default async function RemittancePage() {
  const supabase = createSupabaseAdminClient()
  const { data: transferData } = await supabase.schema('birrbank').from('transfer_services').select('*, institutions(name)').eq('is_current', true).order('fee_percentage', { ascending: true })
  const transfers = transferData ?? []

  return (
    <div className="min-h-screen bg-white">
      <section className="relative bg-white overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 900px 500px at 55% -80px, rgba(29,78,216,0.04) 0%, transparent 65%)' }} />
        <div className="relative max-w-6xl mx-auto px-8 pt-20 pb-14">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-6">
            <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link><span>›</span>
            <Link href="/diaspora" className="hover:text-slate-600 transition-colors">Diaspora</Link><span>›</span>
            <span style={{ color: PILLAR, fontWeight: 700 }}>Remittance Comparison</span>
          </div>
          <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: PILLAR }}>Diaspora · Remittance</p>
          <h1 className="font-serif font-bold mb-5 text-slate-950" style={{ fontSize: 'clamp(36px, 4.5vw, 54px)', letterSpacing: '-1.8px', lineHeight: 1.08 }}>
            Cheapest way to send money to Ethiopia —<br /><span style={{ color: PILLAR }}>all services compared.</span>
          </h1>
          <p className="text-slate-600 mb-8" style={{ fontSize: '16px', lineHeight: '1.8', maxWidth: '520px' }}>
            Compare fees, exchange rate margins and transfer speeds across Western Union, MoneyGram,
            Wise, Dahabshiil and direct bank SWIFT transfers for all major diaspora corridors.
          </p>
          <div className="flex flex-wrap gap-6">
            {[
              { icon: <ClockIcon />, label: transfers.length + ' services compared' },
              { icon: <ClockIcon />, label: 'Fee percentage and flat fees' },
              { icon: <ClockIcon />, label: 'Processing time per service' },
              { icon: <ClockIcon />, label: 'Major corridors covered' },
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
          <div className="rounded-2xl overflow-hidden border border-slate-200" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <div style={{ height: 4, background: 'linear-gradient(90deg, #1D4ED8, #1E40AF)' }} />
            <div className="hidden sm:grid border-b border-slate-200" style={{ gridTemplateColumns: '1fr 110px 130px 110px 130px 110px', padding: '13px 24px', background: '#f9fafb' }}>
              {['Service', 'Fee %', 'Min amount', 'Max amount', 'Processing', 'Verified'].map((h) => (
                <p key={h} className="text-xs font-black text-slate-400 uppercase tracking-widest">{h}</p>
              ))}
            </div>
            {transfers.length > 0 ? transfers.map((t: any, i: number) => (
              <div key={t.id} className={'border-b border-slate-100 transition-colors ' + (i === 0 ? 'bg-blue-50' : 'bg-white hover:bg-slate-50')}>
                <div className="hidden sm:grid items-start" style={{ gridTemplateColumns: '1fr 110px 130px 110px 130px 110px', padding: i === 0 ? '18px 24px' : '14px 24px' }}>
                  <div>
                    <p className={'font-bold ' + (i === 0 ? 'text-blue-900' : 'text-slate-800')} style={{ fontSize: i === 0 ? '15px' : '14px' }}>{t.institutions?.name ?? t.institution_slug}</p>
                    {t.notes && <p className="text-xs text-slate-400 mt-0.5">{t.notes}</p>}
                    {t.destination_countries && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {t.destination_countries.slice(0, 5).map((c: string) => (
                          <span key={c} className="text-xs rounded px-1.5 py-0.5" style={{ background: '#f1f5f9', color: '#475569' }}>{c}</span>
                        ))}
                        {t.destination_countries.length > 5 && <span className="text-xs text-slate-400">+{t.destination_countries.length - 5} more</span>}
                      </div>
                    )}
                  </div>
                  <p className={'font-mono font-black ' + (i === 0 ? 'text-blue-700' : 'text-slate-800')} style={{ fontSize: i === 0 ? '22px' : '16px', letterSpacing: '-0.5px' }}>
                    {t.fee_percentage ? Number(t.fee_percentage).toFixed(2) + '%' : '—'}
                  </p>
                  <p className="font-mono text-slate-600 text-sm">{fmtETB(t.min_amount_etb)}</p>
                  <p className="font-mono text-slate-600 text-sm">{fmtETB(t.max_amount_etb)}</p>
                  <p className="text-sm text-slate-500">{t.processing_hours ? t.processing_hours + (t.processing_hours === 1 ? ' hour' : ' hours') : '—'}</p>
                  <div className="flex items-center gap-1.5"><span style={{ color: PILLAR }}><ClockIcon /></span><p className="text-xs text-slate-400">{fmtDate(t.last_verified_date)}</p></div>
                </div>
                <div className="sm:hidden" style={{ padding: '14px 16px' }}>
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <p className="font-bold text-slate-800 text-sm">{t.institutions?.name ?? t.institution_slug}</p>
                    <p className="font-mono font-bold text-slate-800 shrink-0">{t.fee_percentage ? Number(t.fee_percentage).toFixed(2) + '%' : '—'}</p>
                  </div>
                  <p className="text-xs text-slate-400">{t.processing_hours ? t.processing_hours + 'h processing' : '—'} · {fmtETB(t.min_amount_etb)} min</p>
                </div>
              </div>
            )) : (
              <div className="py-10 text-center"><p className="text-slate-500 text-sm">Remittance data is being verified. Check back soon.</p></div>
            )}
            <div className="flex items-center justify-between border-t border-slate-200" style={{ background: '#f9fafb', padding: '14px 24px' }}>
              <p className="text-xs text-slate-400">Fees sourced from official service websites · For comparison only · Sorted by fee (low to high)</p>
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-5 text-center leading-relaxed">
            Transfer fees and exchange rates may vary. Always check the actual cost at the point of transfer.
            BirrBank is not a money transfer service.
          </p>
        </div>
      </section>

      <section className="bg-white" style={{ padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Remittance alerts</p>
            <h2 className="font-serif font-bold text-slate-950 mb-5" style={{ fontSize: 'clamp(30px, 3.5vw, 42px)', letterSpacing: '-1.5px', lineHeight: 1.1 }}>
              Fee changes,<br /><span style={{ color: PILLAR }}>direct to your inbox.</span>
            </h2>
            <p className="text-slate-500 mb-8" style={{ fontSize: '15px', lineHeight: 1.85 }}>Weekly digest of remittance fee changes and ETB rate movements for diaspora senders.</p>
            <p className="text-xs text-slate-500 font-medium pt-5 border-t border-slate-100">Free forever · No credit card · Unsubscribe anytime</p>
          </div>
          <EmailCapture />
        </div>
      </section>
    </div>
  )
}
