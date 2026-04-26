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

export default async function MicrofinancePage() {
  const supabase = createSupabaseAdminClient()
  const { data: mfiData } = await supabase.schema('birrbank').from('institutions').select('*').eq('type', 'microfinance').eq('is_active', true).order('name')
  const { count: mfiCount } = await supabase.schema('birrbank').from('institutions').select('count', { count: 'exact', head: true }).eq('type', 'microfinance').eq('is_active', true)
  const mfis = mfiData ?? []

  return (
    <div className="min-h-screen bg-white">
      <section className="relative bg-white overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 900px 500px at 55% -80px, rgba(29,78,216,0.04) 0%, transparent 65%)' }} />
        <div className="relative max-w-6xl mx-auto px-8 pt-20 pb-14">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-6">
            <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link><span>›</span>
            <Link href="/banking" className="hover:text-slate-600 transition-colors">Banking</Link><span>›</span>
            <span style={{ color: PILLAR, fontWeight: 700 }}>Microfinance</span>
          </div>
          <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: PILLAR }}>Banking · Microfinance</p>
          <h1 className="font-serif font-bold mb-5 text-slate-950" style={{ fontSize: 'clamp(36px, 4.5vw, 54px)', letterSpacing: '-1.8px', lineHeight: 1.08 }}>
            Microfinance institutes in Ethiopia —<br /><span style={{ color: PILLAR }}>all {mfiCount ?? 55} NBE-licensed MFIs.</span>
          </h1>
          <p className="text-slate-600 mb-8" style={{ fontSize: '16px', lineHeight: '1.8', maxWidth: '520px' }}>
            Every NBE-licensed microfinance institution in Ethiopia — micro-loans, rural finance,
            agricultural credit and SME lending for underserved communities.
          </p>
        </div>
      </section>

      <section className="bg-white" style={{ padding: '64px 32px 96px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="rounded-2xl overflow-hidden border border-slate-200" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <div style={{ height: 4, background: 'linear-gradient(90deg, #1D4ED8, #1E40AF)' }} />
            <div className="hidden sm:grid border-b border-slate-200" style={{ gridTemplateColumns: '1fr 130px 120px', padding: '13px 24px', background: '#f9fafb' }}>
              {['Institution', 'Headquarters', 'Founded'].map((h) => (
                <p key={h} className="text-xs font-black text-slate-400 uppercase tracking-widest">{h}</p>
              ))}
            </div>
            {mfis.length > 0 ? mfis.map((m: any, i: number) => (
              <div key={m.slug} className={'border-b border-slate-100 transition-colors ' + (i === 0 ? 'bg-blue-50' : 'bg-white hover:bg-slate-50')}>
                <div className="hidden sm:grid items-center" style={{ gridTemplateColumns: '1fr 130px 120px', padding: '14px 24px' }}>
                  <div>
                    <p className={'font-bold ' + (i === 0 ? 'text-blue-900' : 'text-slate-800')} style={{ fontSize: '14px' }}>{m.name}</p>
                    {m.website_url && <a href={m.website_url} target="_blank" rel="noopener noreferrer" className="text-xs font-medium hover:underline" style={{ color: PILLAR }}>{m.website_url.replace('https://','').replace('www.','')}</a>}
                  </div>
                  <p className="text-sm text-slate-500">{m.headquarters ?? '—'}</p>
                  <p className="text-sm text-slate-500">{m.founded_year ?? '—'}</p>
                </div>
                <div className="sm:hidden" style={{ padding: '13px 16px' }}>
                  <p className="font-bold text-slate-800 text-sm">{m.name}</p>
                  <p className="text-xs text-slate-400">{m.headquarters ?? '—'} · Est. {m.founded_year ?? '—'}</p>
                </div>
              </div>
            )) : (
              <div className="py-10 text-center"><p className="text-slate-500 text-sm">MFI directory is being populated. Check back soon.</p></div>
            )}
            <div className="border-t border-slate-200" style={{ background: '#f9fafb', padding: '14px 24px' }}>
              <p className="text-xs text-slate-400">Source: NBE registry · nbe.gov.et/financial-institutions · {mfiCount ?? 0} licensed MFIs in Ethiopia</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-100" style={{ background: '#f9fafb', padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Guide</p>
            <h2 className="font-serif font-bold text-slate-950" style={{ fontSize: 'clamp(26px, 3vw, 36px)', letterSpacing: '-1.2px', lineHeight: 1.15 }}>What microfinance institutions offer.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Who MFIs serve', body: 'Microfinance institutions serve individuals and small businesses that cannot access commercial bank credit — smallholder farmers, rural entrepreneurs, women-led businesses and low-income urban households. Loan sizes are typically ETB 1,000 to ETB 500,000.' },
              { step: '02', title: 'Loan products available', body: 'MFIs offer micro-loans for working capital, agricultural inputs, equipment purchase and housing improvement. Group lending models allow members without traditional collateral to access credit using social guarantee mechanisms.' },
              { step: '03', title: 'Savings products', body: 'Most NBE-licensed MFIs also offer savings accounts with competitive rates — often higher than commercial banks for small balances. Compulsory savings linked to loans help members build financial discipline and credit history.' },
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

      <section className="bg-white" style={{ padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">MFI updates</p>
            <h2 className="font-serif font-bold text-slate-950 mb-5" style={{ fontSize: 'clamp(30px, 3.5vw, 42px)', letterSpacing: '-1.5px', lineHeight: 1.1 }}>
              Microfinance news,<br /><span style={{ color: PILLAR }}>direct to your inbox.</span>
            </h2>
            <p className="text-slate-500 mb-8" style={{ fontSize: '15px', lineHeight: 1.85 }}>Weekly updates on microfinance rates, new MFI products and NBE regulatory changes affecting the sector.</p>
            <p className="text-xs text-slate-500 font-medium pt-5 border-t border-slate-100">Free forever · No credit card · Unsubscribe anytime</p>
          </div>
          <EmailCapture />
        </div>
      </section>
    </div>
  )
}
