import Link from 'next/link'
export const dynamic = 'force-dynamic'

// ─── Placeholder data — replace with Supabase queries in Phase 2 ─────────────
// All counts from Supabase count() in production — never hardcoded

const INSTITUTION_TYPES = [
  { type: 'bank',             label: 'Commercial Banks',       count: 32,  phase: 'Live',     pillar: 'Banking',     color: '#1D4ED8', bg: '#EFF6FF', href: '/institutions?type=bank' },
  { type: 'insurer',          label: 'Insurance Companies',    count: 18,  phase: 'Live',     pillar: 'Insurance',   color: '#1d4ed8', bg: '#eff6ff', href: '/institutions?type=insurer' },
  { type: 'microfinance',     label: 'Microfinance Institutes', count: 55, phase: 'Building', pillar: 'Banking',     color: '#1D4ED8', bg: '#EFF6FF', href: '/institutions?type=microfinance' },
  { type: 'payment_operator', label: 'Payment Operators',      count: 27,  phase: 'Building', pillar: 'Banking',     color: '#1D4ED8', bg: '#EFF6FF', href: '/institutions?type=payment_operator' },
  { type: 'money_transfer',   label: 'Money Transfer Agencies',count: 62,  phase: 'Building', pillar: 'Diaspora',    color: '#0891b2', bg: '#ecfeff', href: '/institutions?type=money_transfer' },
  { type: 'fx_bureau',        label: 'FX Bureaus',             count: 13,  phase: 'Live',     pillar: 'Banking',     color: '#1D4ED8', bg: '#EFF6FF', href: '/institutions?type=fx_bureau' },
  { type: 'capital_lease',    label: 'Capital Goods Finance',  count: 6,   phase: 'Coming',   pillar: 'Banking',     color: '#64748b', bg: '#f1f5f9', href: '/institutions?type=capital_lease' },
  { type: 'reinsurer',        label: 'Reinsurance Company',    count: 1,   phase: 'Coming',   pillar: 'Insurance',   color: '#64748b', bg: '#f1f5f9', href: '/institutions?type=reinsurer' },
]

const FEATURED_BANKS = [
  { slug: 'commercial-bank-of-ethiopia', name: 'Commercial Bank of Ethiopia', type: 'State bank',   swift: 'CBETETAA', score: 4.1, badge: '~60% market share', savingsRate: '7.50', founded: '1942' },
  { slug: 'awash-bank',                  name: 'Awash Bank',                  type: 'Private bank', swift: 'AWINETAA', score: 4.4, badge: 'Largest private',   savingsRate: '9.50', founded: '1994' },
  { slug: 'bank-of-abyssinia',           name: 'Bank of Abyssinia',           type: 'Private bank', swift: 'ABYSETAA', score: 4.3, badge: 'Tech leader',       savingsRate: '9.00', founded: '1996' },
  { slug: 'dashen-bank',                 name: 'Dashen Bank',                 type: 'Private bank', swift: 'DASHETAA', score: 4.2, badge: null,                savingsRate: '8.75', founded: '1995' },
  { slug: 'zemen-bank',                  name: 'Zemen Bank',                  type: 'Private bank', swift: 'ZEMNETAA', score: 4.3, badge: 'Premium banking',   savingsRate: '9.25', founded: '2008' },
  { slug: 'oromia-international-bank',   name: 'Oromia International Bank',   type: 'Private bank', swift: 'ORINETAA', score: 4.0, badge: 'Rural focus',       savingsRate: '8.50', founded: '2008' },
  { slug: 'wegagen-bank',                name: 'Wegagen Bank',                type: 'Private bank', swift: 'WEGAETAA', score: 3.9, badge: 'ESX listed',        savingsRate: '8.25', founded: '1997' },
  { slug: 'gadaa-bank',                  name: 'Gadaa Bank',                  type: 'Private bank', swift: 'GDAAETAA', score: 3.8, badge: 'ESX listed',        savingsRate: '7.00', founded: '2022' },
  { slug: 'hijra-bank',                  name: 'Hijra Bank',                  type: 'Private bank', swift: '—',        score: 3.8, badge: 'Islamic banking',   savingsRate: '7.75', founded: '2022' },
  { slug: 'amhara-bank',                 name: 'Amhara Bank',                 type: 'Private bank', swift: 'AMHRETAA', score: 3.7, badge: null,                savingsRate: '7.00', founded: '2022' },
  { slug: 'enat-bank',                   name: 'Enat Bank',                   type: 'Private bank', swift: 'ENATETA1', score: 3.8, badge: 'Women-focused',     savingsRate: '7.00', founded: '2013' },
  { slug: 'cooperative-bank-of-oromia',  name: 'Cooperative Bank of Oromia',  type: 'Cooperative',  swift: 'COOPETAA', score: 3.9, badge: '745 branches',      savingsRate: '7.50', founded: '2005' },
]

const ArrowRight = ({ size = 13 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)

const StarIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="#d97706" stroke="#d97706" strokeWidth="1">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
)

const ShieldIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
)

export default function InstitutionsPage() {
  const totalInstitutions = INSTITUTION_TYPES.reduce((sum, t) => sum + t.count, 0)

  return (
    <div className="min-h-screen bg-white">

      {/* ══════════════════════════════ HERO ══════════════════════════════════════ */}
      <section className="relative bg-white overflow-hidden border-b border-slate-100">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 900px 500px at 55% -80px, rgba(29,78,216,0.04) 0%, transparent 65%)' }}
        />
        <div className="relative max-w-6xl mx-auto px-8 pt-20 pb-14">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-6">
            <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
            <span>›</span>
            <span style={{ color: '#1D4ED8', fontWeight: 700 }}>All Institutions</span>
          </div>

          <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: '#1D4ED8' }}>
            NBE-regulated universe
          </p>
          <h1
            className="font-serif font-bold mb-5 text-slate-950"
            style={{ fontSize: 'clamp(38px, 4.5vw, 56px)', letterSpacing: '-1.8px', lineHeight: 1.08 }}
          >
            All {totalInstitutions} NBE-regulated<br />
            <span style={{ color: '#1D4ED8' }}>institutions, in one place.</span>
          </h1>
          <p className="text-slate-600 mb-8" style={{ fontSize: '16px', lineHeight: '1.8', maxWidth: '520px' }}>
            Every bank, insurer, microfinance institute, payment operator, money transfer
            agency and FX bureau licensed by the National Bank of Ethiopia — verified,
            profiled and compared free.
          </p>

          <div className="flex flex-wrap gap-6">
            {[
              { icon: <ShieldIcon />, label: `${totalInstitutions} NBE-licensed institutions` },
              { icon: <ShieldIcon />, label: '8 institution categories' },
              { icon: <ShieldIcon />, label: 'Verified against NBE registry' },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <span style={{ color: '#1D4ED8' }}>{s.icon}</span>
                <span className="text-xs font-semibold text-slate-500">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ CATEGORY GRID ════════════════════════════ */}
      <section className="border-b border-slate-100" style={{ background: '#f8faf8', padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Browse by type</p>
            <h2 className="font-serif font-bold text-slate-950" style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', letterSpacing: '-1.2px', lineHeight: 1.1 }}>
              The complete NBE-regulated universe.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {INSTITUTION_TYPES.map((t) => (
              <Link
                key={t.type}
                href={t.href}
                className="group bg-white rounded-2xl border border-slate-200 hover:shadow-xl transition-all duration-200 overflow-hidden"
                style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
              >
                <div style={{ height: 3, background: t.color }} />
                <div style={{ padding: '28px 24px' }}>
                  <div className="flex items-start justify-between mb-4">
                    <p className="font-mono font-black" style={{ fontSize: '36px', color: t.color, letterSpacing: '-2px', lineHeight: 1 }}>
                      {t.count}
                    </p>
                    <span
                      className="text-xs font-bold rounded-full px-2 py-1 shrink-0"
                      style={
                        t.phase === 'Live'
                          ? { background: '#dbeafe', color: '#1D4ED8' }
                          : t.phase === 'Building'
                          ? { background: '#fef3c7', color: '#92400e' }
                          : { background: '#f1f5f9', color: '#64748b' }
                      }
                    >
                      {t.phase}
                    </span>
                  </div>
                  <p className="font-bold text-slate-900 mb-1" style={{ fontSize: '14px' }}>{t.label}</p>
                  <p className="text-xs text-slate-400 mb-4">{t.pillar} pillar</p>
                  <div className="flex items-center gap-1 text-xs font-bold group-hover:gap-2 transition-all" style={{ color: '#1D4ED8' }}>
                    <span>Browse all</span><ArrowRight size={11} />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200">
            <p className="text-sm text-slate-500">
              <strong className="text-slate-700">Live</strong> — fully populated with verified data ·
              <strong className="text-slate-700"> Building</strong> — profiles active, data being verified ·
              <strong className="text-slate-700"> Coming soon</strong> — registry seeded, full data in Phase 3
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ FEATURED BANKS ═══════════════════════════ */}
      <section className="border-b border-slate-100 bg-white" style={{ padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Commercial banks</p>
              <h2 className="font-serif font-bold text-slate-950" style={{ fontSize: 'clamp(22px, 2.8vw, 32px)', letterSpacing: '-1px', lineHeight: 1.15 }}>
                All 32 NBE-licensed banks
              </h2>
            </div>
            <Link href="/banking/savings-rates" className="inline-flex items-center gap-2 text-sm font-bold shrink-0" style={{ color: '#1D4ED8' }}>
              Compare savings rates <ArrowRight />
            </Link>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-200" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <div style={{ height: 4, background: 'linear-gradient(90deg, #1D4ED8, #1E40AF)' }} />

            {/* Header */}
            <div
              className="hidden sm:grid border-b border-slate-200"
              style={{ gridTemplateColumns: '1fr 130px 100px 120px 80px', padding: '12px 24px', background: '#f8fafc' }}
            >
              {['Bank', 'Type', 'Founded', 'Best savings rate', 'Score'].map((h) => (
                <p key={h} className="text-xs font-black text-slate-400 uppercase tracking-widest">{h}</p>
              ))}
            </div>

            {FEATURED_BANKS.map((b, i) => (
              <Link
                key={b.slug}
                href={`/institutions/${b.slug}`}
                className={`block border-b border-slate-100 transition-colors ${i === 0 ? 'bg-blue-50 hover:bg-green-100' : 'bg-white hover:bg-slate-50'}`}
              >
                {/* Desktop */}
                <div
                  className="hidden sm:grid items-center"
                  style={{ gridTemplateColumns: '1fr 130px 100px 120px 80px', padding: i === 0 ? '18px 24px' : '13px 24px' }}
                >
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className={`font-bold ${i === 0 ? 'text-blue-900' : 'text-slate-800'}`}
                        style={{ fontSize: i === 0 ? '15px' : '14px' }}>
                        {b.name}
                      </p>
                      {b.badge && (
                        <span className="text-xs font-bold rounded-full px-2 py-0.5" style={{ background: '#EFF6FF', color: '#1D4ED8' }}>
                          {b.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">{b.swift !== '—' ? b.swift : 'No SWIFT'}</p>
                  </div>
                  <p className="text-sm text-slate-500 capitalize">{b.type}</p>
                  <p className="text-sm text-slate-500">{b.founded}</p>
                  <p className={`font-mono font-black ${i === 0 ? 'text-blue-700' : 'text-slate-800'}`}
                    style={{ fontSize: i === 0 ? '20px' : '16px', letterSpacing: '-0.5px' }}>
                    {b.savingsRate}%
                  </p>
                  <div className="flex items-center gap-1">
                    <StarIcon />
                    <span className="font-bold text-slate-700 text-sm">{b.score}</span>
                  </div>
                </div>

                {/* Mobile */}
                <div className="sm:hidden flex items-center gap-3" style={{ padding: '13px 16px' }}>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <p className="font-bold text-slate-800 text-sm">{b.name}</p>
                      {b.badge && (
                        <span className="text-xs font-bold rounded-full px-2 py-0.5 shrink-0" style={{ background: '#EFF6FF', color: '#1D4ED8' }}>{b.badge}</span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400">{b.type} · Est. {b.founded}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-mono font-black text-slate-800" style={{ fontSize: '18px' }}>{b.savingsRate}%</p>
                    <div className="flex items-center gap-1 justify-end mt-0.5">
                      <StarIcon /><span className="text-xs font-bold text-slate-600">{b.score}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}

            <div className="flex items-center justify-between bg-slate-50 border-t border-slate-200" style={{ padding: '14px 24px' }}>
              <p className="text-xs text-slate-400">
                Showing {FEATURED_BANKS.length} of 32 banks · Source: NBE registry (nbe.gov.et)
              </p>
              <Link href="/banking/savings-rates" className="text-xs font-bold hover:underline shrink-0" style={{ color: '#1D4ED8' }}>
                Compare all rates →
              </Link>
            </div>
          </div>

          <p className="text-xs text-slate-400 mt-4 text-center">
            Data for comparison purposes only. Always verify directly with the institution.
            BirrBank is not a bank or financial adviser.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════ DARK TRUST ════════════════════════════════ */}
      <section className="border-b border-slate-100" style={{ background: '#0a1f14', padding: '72px 32px' }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: '#4ade80' }}>Source integrity</p>
            <h3 className="font-serif font-bold mb-2" style={{ fontSize: 'clamp(22px, 2.5vw, 30px)', color: '#ffffff', letterSpacing: '-0.8px' }}>
              Every institution verified against the NBE registry.
            </h3>
            <p style={{ color: '#6b9e7e', fontSize: '15px', lineHeight: 1.75, maxWidth: 520 }}>
              If it is not licensed by the National Bank of Ethiopia, it does not appear
              on BirrBank. No grey-market operators. No unverified listings. Ever.
            </p>
          </div>
          <Link
            href="/banking/savings-rates"
            className="font-bold rounded-full transition-all shrink-0"
            style={{ fontSize: 14, padding: '14px 28px', background: '#1D4ED8', color: '#fff', whiteSpace: 'nowrap', boxShadow: '0 4px 20px rgba(29,78,216,0.25)' }}
          >
            Compare savings rates →
          </Link>
        </div>
      </section>

    </div>
  )
}
