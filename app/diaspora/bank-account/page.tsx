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

export default async function BankAccountPage() {
  const supabase = createSupabaseAdminClient()
  const { data: banksData } = await supabase.schema('birrbank').from('institutions').select('slug, name, swift_code, website_url, founded_year').eq('type', 'bank').eq('is_active', true).not('swift_code', 'is', null).order('name')
  const banks = banksData ?? []

  return (
    <div className="min-h-screen bg-white">
      <section className="relative bg-white overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 900px 500px at 55% -80px, rgba(29,78,216,0.04) 0%, transparent 65%)' }} />
        <div className="relative max-w-6xl mx-auto px-8 pt-20 pb-14">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-6">
            <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link><span>›</span>
            <Link href="/diaspora" className="hover:text-slate-600 transition-colors">Diaspora</Link><span>›</span>
            <span style={{ color: PILLAR, fontWeight: 700 }}>Open a Bank Account</span>
          </div>
          <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: PILLAR }}>Diaspora · Bank Account</p>
          <h1 className="font-serif font-bold mb-5 text-slate-950" style={{ fontSize: 'clamp(36px, 4.5vw, 54px)', letterSpacing: '-1.8px', lineHeight: 1.08 }}>
            Open an Ethiopian bank account<br /><span style={{ color: PILLAR }}>from anywhere in the world.</span>
          </h1>
          <p className="text-slate-600 mb-8" style={{ fontSize: '16px', lineHeight: '1.8', maxWidth: '520px' }}>
            Step-by-step guide to opening a diaspora savings or foreign currency account at Ethiopian
            commercial banks — requirements, documents and process explained.
          </p>
        </div>
      </section>

      <section className="bg-white" style={{ padding: '64px 32px 96px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Step-by-step guide</p>
            <h2 className="font-serif font-bold text-slate-950" style={{ fontSize: 'clamp(26px, 3vw, 36px)', letterSpacing: '-1.2px', lineHeight: 1.15 }}>How to open a diaspora account.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {[
              { step: '01', title: 'Choose your bank', body: 'Select a commercial bank with SWIFT capability. Awash Bank, CBE and Dashen Bank all offer diaspora accounts with competitive USD and ETB rates.' },
              { step: '02', title: 'Gather your documents', body: 'You will need a valid passport, proof of address abroad, Ethiopian origin documentation (if applicable) and a minimum initial deposit amount.' },
              { step: '03', title: 'Apply in person or remotely', body: 'Most banks require an in-person visit or a visit by a designated representative in Ethiopia. Some banks accept notarised documents sent from abroad.' },
              { step: '04', title: 'Fund and activate', body: 'Transfer your initial deposit via SWIFT. Once received, your account is activated and you can manage it online or through the bank mobile app.' },
            ].map((s) => (
              <div key={s.step} className="bg-white rounded-2xl border border-slate-200 overflow-hidden" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                <div style={{ height: 3, background: PILLAR }} />
                <div style={{ padding: '24px' }}>
                  <p className="font-mono font-black mb-3" style={{ fontSize: '32px', color: '#e2e8f0', lineHeight: 1 }}>{s.step}</p>
                  <p className="font-bold text-slate-900 mb-2" style={{ fontSize: '14px' }}>{s.title}</p>
                  <p className="text-sm text-slate-500" style={{ lineHeight: 1.75 }}>{s.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mb-8">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Banks with SWIFT capability</p>
            <h2 className="font-serif font-bold text-slate-950 mb-6" style={{ fontSize: 'clamp(22px, 2.8vw, 30px)', letterSpacing: '-1px' }}>
              Banks that accept international transfers
            </h2>
          </div>
          <div className="rounded-2xl overflow-hidden border border-slate-200" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <div style={{ height: 4, background: 'linear-gradient(90deg, #1D4ED8, #1E40AF)' }} />
            <div className="hidden sm:grid border-b border-slate-200" style={{ gridTemplateColumns: '1fr 160px 120px', padding: '13px 24px', background: '#f9fafb' }}>
              {['Bank', 'SWIFT code', 'Founded'].map((h) => (
                <p key={h} className="text-xs font-black text-slate-400 uppercase tracking-widest">{h}</p>
              ))}
            </div>
            {banks.map((b: any, i: number) => (
              <Link key={b.slug} href={'/institutions/' + b.slug}
                className={'block border-b border-slate-100 transition-colors ' + (i === 0 ? 'bg-blue-50 hover:bg-blue-100' : 'bg-white hover:bg-slate-50')}>
                <div className="hidden sm:grid items-center" style={{ gridTemplateColumns: '1fr 160px 120px', padding: '13px 24px' }}>
                  <p className={'font-bold ' + (i === 0 ? 'text-blue-900' : 'text-slate-800')} style={{ fontSize: '14px' }}>{b.name}</p>
                  <p className="font-mono text-slate-600 text-sm">{b.swift_code}</p>
                  <p className="text-sm text-slate-500">{b.founded_year ?? '—'}</p>
                </div>
                <div className="sm:hidden flex items-center justify-between gap-3" style={{ padding: '13px 16px' }}>
                  <p className="font-bold text-slate-800 text-sm">{b.name}</p>
                  <p className="font-mono text-slate-500 text-xs">{b.swift_code}</p>
                </div>
              </Link>
            ))}
            <div className="border-t border-slate-200" style={{ background: '#f9fafb', padding: '14px 24px' }}>
              <p className="text-xs text-slate-400">Banks with active SWIFT codes · Source: NBE registry · Click any bank for full profile</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white" style={{ padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Diaspora banking alerts</p>
            <h2 className="font-serif font-bold text-slate-950 mb-5" style={{ fontSize: 'clamp(30px, 3.5vw, 42px)', letterSpacing: '-1.5px', lineHeight: 1.1 }}>
              Stay informed,<br /><span style={{ color: PILLAR }}>wherever you are.</span>
            </h2>
            <p className="text-slate-500 mb-8" style={{ fontSize: '15px', lineHeight: 1.85 }}>Weekly updates on diaspora account rates, FX changes and new banking services for Ethiopians abroad.</p>
            <p className="text-xs text-slate-500 font-medium pt-5 border-t border-slate-100">Free forever · No credit card · Unsubscribe anytime</p>
          </div>
          <EmailCapture />
        </div>
      </section>
    </div>
  )
}
