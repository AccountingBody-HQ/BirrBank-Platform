import Link from 'next/link'
import EmailCapture from '@/components/EmailCapture'
import { createSupabaseAdminClient } from '@/lib/supabase'
export const dynamic = 'force-dynamic'

const PILLAR = '#1D4ED8'

export default async function MobileMoneyPage() {
  const supabase = createSupabaseAdminClient()
  const { data: operatorsData } = await supabase.schema('birrbank').from('institutions').select('*').eq('type', 'payment_operator').eq('is_active', true).order('name')
  const { count: operatorCount } = await supabase.schema('birrbank').from('institutions').select('count', { count: 'exact', head: true }).eq('type', 'payment_operator').eq('is_active', true)
  const operators = operatorsData ?? []

  return (
    <div className="min-h-screen bg-white">
      <section className="relative bg-white overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 900px 500px at 55% -80px, rgba(29,78,216,0.04) 0%, transparent 65%)' }} />
        <div className="relative max-w-6xl mx-auto px-8 pt-20 pb-14">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-6">
            <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link><span>›</span>
            <Link href="/banking" className="hover:text-slate-600 transition-colors">Banking</Link><span>›</span>
            <span style={{ color: PILLAR, fontWeight: 700 }}>Mobile Money</span>
          </div>
          <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: PILLAR }}>Banking · Mobile Money</p>
          <h1 className="font-serif font-bold mb-5 text-slate-950" style={{ fontSize: 'clamp(36px, 4.5vw, 54px)', letterSpacing: '-1.8px', lineHeight: 1.08 }}>
            Mobile money in Ethiopia —<br /><span style={{ color: PILLAR }}>TeleBirr, CBEBirr, Amole and more.</span>
          </h1>
          <p className="text-slate-600 mb-8" style={{ fontSize: '16px', lineHeight: '1.8', maxWidth: '520px' }}>
            All {operatorCount ?? 27} NBE-licensed payment operators in Ethiopia — compare mobile money platforms,
            USSD services and digital payment solutions.
          </p>
        </div>
      </section>

      <section className="bg-white" style={{ padding: '64px 32px 96px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {operators.length > 0 ? operators.map((op: any, i: number) => (
              <div key={op.slug} className="bg-white rounded-2xl border border-slate-200 overflow-hidden" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                <div style={{ height: 3, background: PILLAR }} />
                <div style={{ padding: '24px' }}>
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-bold text-slate-900" style={{ fontSize: '15px' }}>{op.name}</p>
                    {i === 0 && <span className="text-xs font-bold rounded-full px-2 py-0.5" style={{ background: '#dbeafe', color: PILLAR }}>Largest</span>}
                  </div>
                  {op.description && <p className="text-sm text-slate-500 mb-4" style={{ lineHeight: 1.75 }}>{op.description}</p>}
                  <div className="pt-3 border-t border-slate-100">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Founded</span>
                      <span className="font-semibold text-slate-700">{op.founded_year ?? '—'}</span>
                    </div>
                    {op.website_url && (
                      <div className="flex justify-between text-xs mt-1.5">
                        <span className="text-slate-400">Website</span>
                        <a href={op.website_url} target="_blank" rel="noopener noreferrer" className="font-semibold hover:underline" style={{ color: PILLAR }}>{op.website_url.replace('https://','').replace('www.','')}</a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )) : (
              <div className="col-span-3 py-10 text-center"><p className="text-slate-500 text-sm">Payment operator data is being populated.</p></div>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-6 text-center">Source: NBE registry · nbe.gov.et/financial-institutions · {operatorCount ?? 0} licensed payment operators</p>
        </div>
      </section>

      <section className="border-b border-slate-100" style={{ background: '#f9fafb', padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Guide</p>
            <h2 className="font-serif font-bold text-slate-950" style={{ fontSize: 'clamp(26px, 3vw, 36px)', letterSpacing: '-1.2px', lineHeight: 1.15 }}>Ethiopian mobile money explained.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'TeleBirr — the dominant platform', body: 'TeleBirr is Ethiopia largest mobile money platform with over 40 million registered users. Operated by Ethio Telecom, it supports payments, transfers, bill payments and merchant QR codes. Available on all networks via USSD and smartphone app.' },
              { step: '02', title: 'Interoperability — the future', body: 'The NBE Mobile Money Interoperability Directive requires all operators to enable transfers between platforms. This means TeleBirr users can send to CBEBirr users and vice versa — making the ecosystem more useful for everyone.' },
              { step: '03', title: 'Bank-linked vs standalone wallets', body: 'CBEBirr and Amole are bank-linked platforms — directly connected to your bank account. TeleBirr and HelloCash operate as standalone wallets you load with cash. Bank-linked wallets offer higher limits and easier fund management.' },
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
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Mobile money updates</p>
            <h2 className="font-serif font-bold text-slate-950 mb-5" style={{ fontSize: 'clamp(30px, 3.5vw, 42px)', letterSpacing: '-1.5px', lineHeight: 1.1 }}>
              Digital payments news,<br /><span style={{ color: PILLAR }}>direct to your inbox.</span>
            </h2>
            <p className="text-slate-500 mb-8" style={{ fontSize: '15px', lineHeight: 1.85 }}>Weekly updates on mobile money fee changes, new features and NBE payment policy updates.</p>
            <p className="text-xs text-slate-500 font-medium pt-5 border-t border-slate-100">Free forever · No credit card · Unsubscribe anytime</p>
          </div>
          <EmailCapture />
        </div>
      </section>
    </div>
  )
}
