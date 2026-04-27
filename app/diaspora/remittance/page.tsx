import type { Metadata } from 'next'
import Link from 'next/link'
import EmailCapture from '@/components/EmailCapture'
import { createSupabaseAdminClient } from '@/lib/supabase'
import { ChevronRight } from 'lucide-react'
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Cheapest Way to Send Money to Ethiopia — All Services Compared | BirrBank',
  description: 'Compare remittance fees, exchange rate margins and transfer speeds across all major diaspora corridors to Ethiopia.',
}

function fmtDate(d: string | null | undefined) { if (!d) return '—'; return new Date(d).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' }) }
function fmtETB(val: number | null | undefined) { if (val == null) return '—'; return 'ETB '+Number(val).toLocaleString('en-ET') }

export default async function RemittancePage() {
  const supabase = createSupabaseAdminClient()
  const [transferRes] = await Promise.all([
    supabase.schema('birrbank').from('transfer_services').select('*, institutions(name)').eq('is_current',true).order('fee_percentage',{ascending:true}),
  ])
  const transfers = transferRes.data ?? []

  return (
    <main className="bg-white flex-1">
      <section className="relative overflow-hidden" style={{ background:'#0f172a' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background:'radial-gradient(ellipse at 60% 0%, rgba(29,78,216,0.18) 0%, transparent 60%)' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12">
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8">
            <Link href="/" className="hover:text-slate-300 transition-colors">Home</Link>
            <ChevronRight size={12} /><Link href="/diaspora" className="hover:text-slate-300 transition-colors">Diaspora</Link>
            <ChevronRight size={12} /><span className="text-slate-400">Remittance</span>
          </nav>
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold mb-6"
            style={{ background:'rgba(29,78,216,0.15)', color:'#93c5fd', border:'1px solid rgba(29,78,216,0.3)' }}>
            Diaspora — Remittance
          </div>
          <h1 className="font-serif font-bold text-white mb-4"
            style={{ fontSize:'clamp(38px, 4.5vw, 56px)', letterSpacing:'-0.025em', lineHeight:1.08 }}>
            Cheapest way to send money to Ethiopia — all services compared.
          </h1>
          <p className="text-slate-400 mb-8" style={{ fontSize:'16px', lineHeight:1.8, maxWidth:'520px' }}>
            Compare fees, exchange rate margins and transfer speeds across Western Union, MoneyGram, Wise, Dahabshiil and direct bank SWIFT transfers for all major diaspora corridors.
          </p>
          <div className="flex flex-wrap gap-3 mb-10">
            <Link href="/banking/fx-rates" className="font-bold rounded-full transition-all text-center"
              style={{ fontSize:15, padding:'14px 32px', minWidth:200, background:'#1D4ED8', color:'#fff' }}>
              Check ETB rates
            </Link>
            <Link href="/diaspora/bank-account" className="font-bold rounded-full transition-all text-center"
              style={{ fontSize:15, padding:'14px 32px', minWidth:200, border:'1.5px solid rgba(255,255,255,0.2)', color:'#fff' }}>
              Open a bank account
            </Link>
          </div>
          <div className="grid grid-cols-3 mt-2 pt-8 border-t border-slate-800">
            {[
              { value:String(transfers.length), label:'Services compared' },
              { value:'Fee + FX', label:'Total cost shown' },
              { value:'Free', label:'No referral fees' },
            ].map(s => (
              <div key={s.label} className="text-center py-6 border-r border-slate-800 last:border-r-0">
                <div className="font-mono font-black text-white mb-1" style={{ fontSize:'clamp(22px, 3vw, 36px)', letterSpacing:'-1px' }}>{s.value}</div>
                <div className="text-xs font-semibold text-slate-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background:'#ffffff', padding:'64px 0 96px' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl overflow-hidden border border-slate-200" style={{ boxShadow:'0 4px 24px rgba(0,0,0,0.06)' }}>
            <div style={{ height:4, background:'linear-gradient(90deg, #1D4ED8, #1E40AF)' }} />
            <div className="hidden sm:grid border-b border-slate-200"
              style={{ gridTemplateColumns:'1fr 110px 130px 110px 130px 110px', padding:'13px 24px', background:'#f8fafc' }}>
              {['Service','Fee %','Min amount','Max amount','Processing','Verified'].map(h => (
                <p key={h} className="text-xs font-black text-slate-400 uppercase tracking-widest">{h}</p>
              ))}
            </div>
            {transfers.length > 0 ? transfers.map((t: any, i: number) => (
              <div key={t.id} className={'border-b border-slate-100 transition-colors ' + (i===0 ? 'bg-blue-50' : 'bg-white hover:bg-slate-50')}>
                <div className="hidden sm:grid items-start"
                  style={{ gridTemplateColumns:'1fr 110px 130px 110px 130px 110px', padding:i===0?'18px 24px':'14px 24px' }}>
                  <div>
                    <p className={'font-bold ' + (i===0 ? 'text-blue-900' : 'text-slate-800')} style={{ fontSize:i===0?'15px':'14px' }}>
                      {t.institutions?.name ?? t.institution_slug}
                    </p>
                    {t.notes && <p className="text-xs text-slate-400 mt-0.5">{t.notes}</p>}
                    {t.destination_countries && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {t.destination_countries.slice(0,5).map((c: string) => (
                          <span key={c} className="text-xs rounded px-1.5 py-0.5" style={{ background:'#f1f5f9', color:'#475569' }}>{c}</span>
                        ))}
                        {t.destination_countries.length > 5 && <span className="text-xs text-slate-400">+{t.destination_countries.length-5} more</span>}
                      </div>
                    )}
                  </div>
                  <p className={'font-mono font-black ' + (i===0 ? 'text-blue-700' : 'text-slate-800')} style={{ fontSize:i===0?'22px':'16px', letterSpacing:'-0.5px' }}>
                    {t.fee_percentage ? Number(t.fee_percentage).toFixed(2)+'%' : '—'}
                  </p>
                  <p className="font-mono text-slate-600 text-sm">{fmtETB(t.min_amount_etb)}</p>
                  <p className="font-mono text-slate-600 text-sm">{fmtETB(t.max_amount_etb)}</p>
                  <p className="text-sm text-slate-500">{t.processing_hours ? t.processing_hours+(t.processing_hours===1?' hour':' hours') : '—'}</p>
                  <p className="text-xs text-slate-400">{fmtDate(t.last_verified_date)}</p>
                </div>
                <div className="sm:hidden" style={{ padding:'14px 16px' }}>
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <p className="font-bold text-slate-800 text-sm">{t.institutions?.name ?? t.institution_slug}</p>
                    <p className="font-mono font-bold text-slate-800 shrink-0">{t.fee_percentage ? Number(t.fee_percentage).toFixed(2)+'%' : '—'}</p>
                  </div>
                  <p className="text-xs text-slate-400">{t.processing_hours ? t.processing_hours+'h processing' : '—'} · {fmtETB(t.min_amount_etb)} min</p>
                </div>
              </div>
            )) : (
              <div className="py-10 text-center"><p className="text-slate-500 text-sm">Remittance data is being verified. Check back soon.</p></div>
            )}
            <div className="border-t border-slate-200" style={{ background:'#f8fafc', padding:'14px 24px' }}>
              <p className="text-xs text-slate-400">Fees sourced from official service websites · For comparison only · Sorted by fee (low to high)</p>
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-5 text-center">Transfer fees and exchange rates may vary. Always check the actual cost at the point of transfer. BirrBank is not a money transfer service.</p>
        </div>
      </section>

      <section style={{ background:'#0f172a', padding:'72px 0', borderTop:'1px solid #1e293b' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color:'#93c5fd' }}>Also track</p>
            <h3 className="font-serif font-bold mb-2" style={{ fontSize:'clamp(22px, 2.5vw, 30px)', color:'#ffffff', letterSpacing:'-0.5px' }}>
              Compare the live NBE ETB exchange rate.
            </h3>
            <p style={{ color:'#94a3b8', fontSize:'15px', lineHeight:1.75, maxWidth:480 }}>
              The fee is only part of the cost. The exchange rate margin is often larger. Compare the total ETB received — not just the headline fee.
            </p>
          </div>
          <Link href="/banking/fx-rates" className="font-bold rounded-full shrink-0"
            style={{ fontSize:14, padding:'14px 28px', background:'#1D4ED8', color:'#fff', whiteSpace:'nowrap' }}>
            Check ETB rates
          </Link>
        </div>
      </section>

      <section style={{ background:'#ffffff', padding:'96px 0' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-serif font-bold text-slate-950 mb-5"
              style={{ fontSize:'clamp(30px, 3.5vw, 42px)', letterSpacing:'-0.5px', lineHeight:1.1 }}>
              Fee changes, direct to your inbox.
            </h2>
            <p className="text-slate-500 mb-8" style={{ fontSize:'15px', lineHeight:1.85 }}>
              Weekly digest of remittance fee changes and ETB rate movements for diaspora senders.
            </p>
            <p className="text-xs text-slate-500 font-medium pt-5 border-t border-slate-100">Free forever · No credit card · Unsubscribe anytime</p>
          </div>
          <EmailCapture />
        </div>
      </section>
    </main>
  )
}
