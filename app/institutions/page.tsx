import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { createSupabaseAdminClient } from '@/lib/supabase'
import { Suspense } from 'react'
import InstitutionsClient from '@/components/institutions/InstitutionsClient'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'All NBE-Regulated Institutions | BirrBank',
  description: 'Every bank, insurer, microfinance institute, payment operator, money transfer agency and FX bureau licensed by the National Bank of Ethiopia — verified, profiled and compared free.',
}

const TYPE_CONFIG: Record<string, { label: string; pillar: string; desc: string }> = {
  bank:                  { label: 'Commercial Banks',        pillar: 'Banking',   desc: '32 NBE-licensed commercial banks' },
  insurer:               { label: 'Insurance Companies',     pillar: 'Insurance', desc: '18 licensed insurers' },
  microfinance:          { label: 'Microfinance Institutes',  pillar: 'Banking',   desc: '55 MFIs nationwide' },
  payment_operator:      { label: 'Payment Operators',       pillar: 'Banking',   desc: 'Mobile money and digital wallets' },
  money_transfer:        { label: 'Money Transfer',          pillar: 'Diaspora',  desc: '65 remittance agencies' },
  fx_bureau:             { label: 'FX Bureaux',              pillar: 'Banking',   desc: '13 independent bureaux' },
  capital_goods_finance: { label: 'Capital Goods Finance',   pillar: 'Banking',   desc: '6 leasing companies' },
  reinsurer:             { label: 'Reinsurance',             pillar: 'Insurance', desc: 'Reinsurance providers' },
}

export default async function InstitutionsPage() {
  const supabase = createSupabaseAdminClient()

  const { data: institutions } = await supabase
    .schema('birrbank')
    .from('institutions')
    .select('slug, name, type, swift_code, website_url, coverage_level, nbe_licence_date, nbe_licence_number, branches_count, operational_status, hq_region, service_type, phone, email, is_active')
    .order('name')

  const typeCounts: Record<string, number> = {}
  for (const inst of (institutions ?? [])) {
    typeCounts[inst.type] = (typeCounts[inst.type] ?? 0) + 1
  }
  const totalCount = institutions?.length ?? 0

  return (
    <main className="bg-white flex-1">

      {/* DARK HERO */}
      <section className="relative overflow-hidden" style={{ background: '#0f172a' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 60% 0%, rgba(29,78,216,0.18) 0%, transparent 60%), radial-gradient(ellipse at 0% 100%, rgba(14,30,80,0.4) 0%, transparent 50%)' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-0">
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8">
            <Link href="/" className="hover:text-slate-300 transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-slate-400">Institutions</span>
          </nav>
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold mb-6"
            style={{ background: 'rgba(29,78,216,0.15)', color: '#93c5fd', border: '1px solid rgba(29,78,216,0.3)' }}>
            NBE-Regulated Registry
          </div>
          <h1 className="font-serif font-bold text-white mb-4"
            style={{ fontSize: 'clamp(38px, 4.5vw, 56px)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
            Ethiopia's complete<br />financial institution registry.
          </h1>
          <p className="text-slate-400 mb-8" style={{ fontSize: '16px', lineHeight: 1.8, maxWidth: '560px' }}>
            Every bank, insurer, microfinance institute, payment operator, money transfer agency and FX bureau licensed by the National Bank of Ethiopia. Verified, profiled and compared free.
          </p>
          <div className="flex flex-wrap gap-3 mb-10">
            <Link href="/banking/savings-rates"
              className="font-bold rounded-full transition-all text-center"
              style={{ fontSize: 15, padding: '14px 32px', minWidth: 200, background: '#1D4ED8', color: '#fff' }}>
              Compare savings rates
            </Link>
            <Link href="/banking/fx-rates"
              className="font-bold rounded-full transition-all text-center"
              style={{ fontSize: 15, padding: '14px 32px', minWidth: 200, border: '1.5px solid rgba(255,255,255,0.2)', color: '#fff' }}>
              View FX rates
            </Link>
          </div>
          <div className="grid grid-cols-3 mt-10 pt-8 border-t border-slate-800">
            {[
              { value: String(totalCount), label: 'NBE-licensed institutions' },
              { value: '7', label: 'Institution categories' },
              { value: 'NBE', label: 'Source: nbe.gov.et' },
            ].map(s => (
              <div key={s.label} className="text-center py-6">
                <div className="font-mono font-black text-white mb-1"
                  style={{ fontSize: 'clamp(22px, 3vw, 32px)', letterSpacing: '-1px' }}>{s.value}</div>
                <div className="text-xs font-semibold text-slate-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORY CARDS */}
      <section style={{ background: '#f8fafc', padding: '96px 0' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif font-bold text-slate-950 mb-10"
            style={{ fontSize: 'clamp(22px, 3vw, 38px)', letterSpacing: '-0.5px' }}>
            Browse by institution type
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {Object.entries(TYPE_CONFIG).map(([type, cfg]) => (
              <Link key={type} href={`/institutions?type=${type}`}
                className="group bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col">
                <div style={{ height: 4, background: 'linear-gradient(90deg, #1D4ED8, #1E40AF)' }} />
                <div style={{ padding: '28px 24px' }} className="flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <p className="font-mono font-black" style={{ fontSize: '36px', color: '#1D4ED8', letterSpacing: '-2px', lineHeight: 1 }}>
                      {typeCounts[type] ?? 0}
                    </p>
                    <span className="text-xs font-bold rounded-full px-2 py-1 shrink-0"
                      style={{ background: '#dbeafe', color: '#1D4ED8' }}>{cfg.pillar}</span>
                  </div>
                  <p className="font-bold text-slate-900 mb-1" style={{ fontSize: '14px' }}>{cfg.label}</p>
                  <p className="text-xs text-slate-400 mb-4 flex-1">{cfg.desc}</p>
                  <div className="flex items-center gap-1 text-xs font-bold group-hover:gap-2 transition-all" style={{ color: '#1D4ED8' }}>
                    Browse all
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE GRID */}
      <section style={{ padding: '96px 0', background: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif font-bold text-slate-950 mb-8"
            style={{ fontSize: 'clamp(22px, 3vw, 38px)', letterSpacing: '-0.5px' }}>
            All {totalCount} institutions
          </h2>
          <Suspense fallback={<div className="text-center py-20 text-slate-400 text-sm">Loading...</div>}>
            <InstitutionsClient institutions={institutions ?? []} />
          </Suspense>
        </div>
      </section>

      {/* DARK TRUST */}
      <section style={{ background: '#0f172a', padding: '72px 0', borderTop: '1px solid #1e293b' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: '#93c5fd' }}>Source integrity</p>
            <h3 className="font-serif font-bold mb-2"
              style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', color: '#ffffff', letterSpacing: '-0.5px' }}>
              Every institution verified against the NBE registry.
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: 1.75, maxWidth: 520 }}>
              If it is not licensed by the National Bank of Ethiopia, it does not appear on BirrBank. No grey-market operators. No unverified listings.
            </p>
          </div>
          <Link href="/banking/savings-rates"
            className="font-bold rounded-full transition-all shrink-0"
            style={{ fontSize: 14, padding: '14px 28px', background: '#1D4ED8', color: '#fff', whiteSpace: 'nowrap' }}>
            Compare savings rates
          </Link>
        </div>
      </section>

    </main>
  )
}
