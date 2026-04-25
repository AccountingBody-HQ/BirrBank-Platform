import Link from 'next/link'
import EmailCapture from '@/components/EmailCapture'
export const dynamic = 'force-dynamic'

// ─── Placeholder data — replace with Supabase queries in Phase 2 ─────────────

const TBILLS = [
  { tenor: '28-day',  yield: '7.20', lastAuction: '21 Apr 2026', nextAuction: '28 Apr 2026', minInvest: 'ETB 1,000',  issued: 'ETB 2.1B', issuer: 'NBE' },
  { tenor: '91-day',  yield: '8.10', lastAuction: '21 Apr 2026', nextAuction: '28 Apr 2026', minInvest: 'ETB 1,000',  issued: 'ETB 3.4B', issuer: 'NBE' },
  { tenor: '182-day', yield: '8.75', lastAuction: '14 Apr 2026', nextAuction: '05 May 2026', minInvest: 'ETB 5,000',  issued: 'ETB 1.8B', issuer: 'NBE' },
  { tenor: '364-day', yield: '9.15', lastAuction: '07 Apr 2026', nextAuction: '05 May 2026', minInvest: 'ETB 10,000', issued: 'ETB 4.2B', issuer: 'NBE' },
]

const GOVT_BONDS = [
  { name: 'NBE Development Bond',     maturity: '5-year',  coupon: '9.50', minInvest: 'ETB 5,000',  issuer: 'NBE',    status: 'Open',   issued: 'Jan 2024' },
  { name: 'Ethiopian Roads Bond',     maturity: '7-year',  coupon: '9.75', minInvest: 'ETB 10,000', issuer: 'MoFEC',  status: 'Open',   issued: 'Mar 2024' },
  { name: 'Ethio Telecom Bond',       maturity: '3-year',  coupon: '8.50', minInvest: 'ETB 5,000',  issuer: 'Corporate', status: 'Closed', issued: 'Jun 2023' },
  { name: 'NBE Housing Finance Bond', maturity: '10-year', coupon: '10.00', minInvest: 'ETB 25,000', issuer: 'NBE',  status: 'Open',   issued: 'Sep 2024' },
]

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

const PILLAR = '#1D4ED8'

export default function BondsPage() {
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
            <Link href="/markets" className="hover:text-slate-600 transition-colors">Markets</Link>
            <span>›</span>
            <span style={{ color: PILLAR, fontWeight: 700 }}>Bonds & T-Bills</span>
          </div>

          <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: PILLAR }}>
            Markets · Bonds & T-Bills
          </p>
          <h1
            className="font-serif font-bold mb-5 text-slate-950"
            style={{ fontSize: 'clamp(36px, 4.5vw, 54px)', letterSpacing: '-1.8px', lineHeight: 1.08 }}
          >
            NBE T-bill yields and<br />
            <span style={{ color: PILLAR }}>government bonds — compared.</span>
          </h1>
          <p className="text-slate-600 mb-8" style={{ fontSize: '16px', lineHeight: '1.8', maxWidth: '520px' }}>
            Every Treasury bill auction result and government bond offering from the
            National Bank of Ethiopia. Yields, tenors, minimum investments and next auction dates.
          </p>

          {/* Stats bar */}
          <div className="flex flex-wrap gap-6">
            {[
              { icon: <ClockIcon />, label: '9.15% best T-bill yield (364-day)' },
              { icon: <ClockIcon />, label: 'Auction results from NBE directly' },
              { icon: <ClockIcon />, label: 'ETB 1,000 minimum investment' },
              { icon: <ClockIcon />, label: 'Updated after every auction' },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <span style={{ color: PILLAR }}>{s.icon}</span>
                <span className="text-xs font-semibold text-slate-500">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ T-BILLS ══════════════════════════════════ */}
      {/* NO ADS on this page — comparison integrity rule */}
      <section className="bg-white" style={{ padding: '64px 32px 80px' }}>
        <div className="max-w-6xl mx-auto">

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Treasury bills</p>
              <h2 className="font-serif font-bold text-slate-950" style={{ fontSize: 'clamp(22px, 2.8vw, 32px)', letterSpacing: '-1px', lineHeight: 1.15 }}>
                NBE T-bill auction yields
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ClockIcon />
              <span>Last auction: 21 Apr 2026</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TBILLS.map((t) => (
              <div key={t.tenor} className="bg-white rounded-2xl border border-slate-200 overflow-hidden" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                <div style={{ height: 3, background: PILLAR }} />
                <div style={{ padding: '24px' }}>
                  <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: PILLAR }}>{t.tenor} T-Bill</p>
                  <p className="font-mono font-black text-slate-950 mb-1" style={{ fontSize: '36px', letterSpacing: '-1px', lineHeight: 1 }}>{t.yield}%</p>
                  <p className="text-xs text-slate-400 mb-5">Annual yield</p>
                  <div className="space-y-2 pt-4 border-t border-slate-100">
                    {[
                      { label: 'Min. investment', value: t.minInvest },
                      { label: 'Last auction',    value: t.lastAuction },
                      { label: 'Next auction',    value: t.nextAuction },
                      { label: 'Total issued',    value: t.issued },
                      { label: 'Issuer',          value: t.issuer },
                    ].map((row) => (
                      <div key={row.label} className="flex justify-between text-xs">
                        <span className="text-slate-400">{row.label}</span>
                        <span className="font-semibold text-slate-700">{row.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-5 text-center">
            Source: NBE auction results · nbe.gov.et · For comparison only — verify with your broker before investing
          </p>
        </div>
      </section>

      {/* ══════════════════════════════ GOVT BONDS ════════════════════════════════ */}
      <section className="border-b border-slate-100" style={{ background: '#f9fafb', padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Government & corporate bonds</p>
              <h2 className="font-serif font-bold text-slate-950" style={{ fontSize: 'clamp(22px, 2.8vw, 32px)', letterSpacing: '-1px', lineHeight: 1.15 }}>
                Active bond offerings
              </h2>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-200" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <div style={{ height: 4, background: 'linear-gradient(90deg, #1D4ED8, #1E40AF)' }} />

            {/* Desktop header */}
            <div
              className="hidden sm:grid border-b border-slate-200"
              style={{ gridTemplateColumns: '1fr 110px 110px 140px 100px 100px', padding: '13px 24px', background: '#f9fafb' }}
            >
              {['Bond name', 'Maturity', 'Coupon', 'Min. invest', 'Issuer', 'Status'].map((h) => (
                <p key={h} className="text-xs font-black text-slate-400 uppercase tracking-widest">{h}</p>
              ))}
            </div>

            {GOVT_BONDS.map((b) => (
              <div key={b.name} className="border-b border-slate-100 bg-white hover:bg-slate-50 transition-colors">
                {/* Desktop */}
                <div
                  className="hidden sm:grid items-center"
                  style={{ gridTemplateColumns: '1fr 110px 110px 140px 100px 100px', padding: '16px 24px' }}
                >
                  <div>
                    <p className="font-bold text-slate-800" style={{ fontSize: '14px' }}>{b.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">Issued {b.issued}</p>
                  </div>
                  <p className="text-sm text-slate-500">{b.maturity}</p>
                  <p className="font-mono font-black" style={{ fontSize: '18px', color: PILLAR, letterSpacing: '-0.5px' }}>{b.coupon}%</p>
                  <p className="font-mono text-sm text-slate-600">{b.minInvest}</p>
                  <p className="text-sm text-slate-500">{b.issuer}</p>
                  <span
                    className="text-xs font-bold rounded-full px-3 py-1 inline-flex w-fit"
                    style={b.status === 'Open'
                      ? { background: '#dbeafe', color: PILLAR }
                      : { background: '#f1f5f9', color: '#94a3b8' }}
                  >
                    {b.status}
                  </span>
                </div>

                {/* Mobile */}
                <div className="sm:hidden" style={{ padding: '14px 16px' }}>
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <p className="font-bold text-slate-800 text-sm">{b.name}</p>
                    <span
                      className="text-xs font-bold rounded-full px-2 py-0.5 shrink-0"
                      style={b.status === 'Open' ? { background: '#dbeafe', color: PILLAR } : { background: '#f1f5f9', color: '#94a3b8' }}
                    >
                      {b.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{b.maturity} · {b.coupon}% coupon · Min {b.minInvest} · {b.issuer}</p>
                </div>
              </div>
            ))}

            <div
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-slate-200"
              style={{ background: '#f9fafb', padding: '14px 24px' }}
            >
              <p className="text-xs text-slate-400">Source: NBE & MoFEC official bond prospectuses · Updated on new issuances</p>
              <Link href="/markets" className="text-xs font-bold hover:underline shrink-0" style={{ color: PILLAR }}>
                Back to Markets →
              </Link>
            </div>
          </div>

          <p className="text-xs text-slate-400 mt-5 text-center leading-relaxed">
            Bond data is for comparison purposes only. Always read the official prospectus and consult
            a licensed financial adviser before investing. BirrBank is not a broker or financial adviser.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════ HOW T-BILLS WORK ════════════════════════ */}
      <section className="border-b border-slate-100 bg-white" style={{ padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Guide</p>
            <h2
              className="font-serif font-bold text-slate-950"
              style={{ fontSize: 'clamp(26px, 3vw, 36px)', letterSpacing: '-1.2px', lineHeight: 1.15 }}
            >
              How Ethiopian T-bills and bonds work.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                title: 'What is a Treasury bill?',
                body: 'T-bills are short-term debt instruments issued by the National Bank of Ethiopia. You buy them at a discount and receive the face value at maturity. The difference is your return. Tenors range from 28 days to 364 days.',
              },
              {
                step: '02',
                title: 'How to buy NBE T-bills',
                body: 'T-bills are sold through NBE-authorised dealers — primarily commercial banks and licensed securities firms. You submit a bid at the weekly auction specifying the amount and yield you want. Allotment is competitive.',
              },
              {
                step: '03',
                title: 'T-bills vs savings accounts',
                body: 'The 364-day T-bill currently yields 9.15% — higher than most bank savings accounts. T-bills carry sovereign risk (very low in Ethiopia) and have no early redemption, unlike savings accounts which allow withdrawals.',
              },
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
          <div className="mt-8">
            <Link href="/guides" className="inline-flex items-center gap-2 text-sm font-bold" style={{ color: PILLAR }}>
              Read all investing guides <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ DARK TRUST ════════════════════════════════ */}
      <section className="border-b border-slate-100" style={{ background: '#0f172a', padding: '72px 32px' }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: '#93c5fd' }}>Data integrity</p>
            <h3 className="font-serif font-bold mb-2" style={{ fontSize: 'clamp(22px, 2.5vw, 30px)', color: '#ffffff', letterSpacing: '-0.8px' }}>
              Auction results straight from NBE.
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: 1.75, maxWidth: 480 }}>
              All T-bill yields are sourced from official NBE auction result publications.
              BirrBank does not estimate or interpolate yields — every number shown is
              the actual weighted average from the most recent auction.
            </p>
          </div>
          <div className="flex flex-col gap-3 shrink-0">
            {[
              { dot: '#22c55e', label: 'NBE official source',   sub: 'nbe.gov.et auction results' },
              { dot: PILLAR,    label: 'Post-auction updates',    sub: 'Updated after each weekly auction' },
              { dot: '#94a3b8', label: 'No estimated yields',   sub: 'Actual weighted averages only' },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-3 rounded-xl" style={{ background: '#1e293b', border: '1px solid #334155', padding: '14px 20px' }}>
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: s.dot }} />
                <div>
                  <span className="text-sm font-semibold" style={{ color: '#93c5fd' }}>{s.label}</span>
                  <p className="text-xs mt-0.5" style={{ color: '#64748b' }}>{s.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ EMAIL CAPTURE ════════════════════════════ */}
      <section className="bg-white" style={{ padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">T-bill & bond alerts</p>
            <h2 className="font-serif font-bold text-slate-950 mb-5" style={{ fontSize: 'clamp(30px, 3.5vw, 42px)', letterSpacing: '-1.5px', lineHeight: 1.1 }}>
              Auction results,<br />
              <span style={{ color: PILLAR }}>every week in your inbox.</span>
            </h2>
            <p className="text-slate-500 mb-8" style={{ fontSize: '15px', lineHeight: 1.85 }}>
              Get the latest NBE T-bill auction results and bond issuances the moment
              they are published — before your bank sends its own communication.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Weekly T-bill auction results — all four tenors',
                'New government and corporate bond issuances',
                'Yield changes and trend analysis',
                'Comparison of T-bill yields vs bank savings rates',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-slate-600">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
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
