import Link from 'next/link'
import EmailCapture from '@/components/EmailCapture'
export const dynamic = 'force-dynamic'

// ─── Placeholder data — replace with Supabase queries in Phase 2 ─────────────

const IPO_PIPELINE = [
  { company: 'Awash Bank',                    sector: 'Banking',        status: 'Under review',  shares: '500M',  offerPrice: '—',    manager: 'CBE Capital',      filed: 'Jan 2026', notes: 'Largest bank IPO by asset size' },
  { company: 'Bank of Abyssinia',             sector: 'Banking',        status: 'Under review',  shares: '350M',  offerPrice: '—',    manager: 'Wegagen Capital', filed: 'Feb 2026', notes: 'Second oldest private bank' },
  { company: 'Dashen Bank',                   sector: 'Banking',        status: 'Announced',     shares: '420M',  offerPrice: '—',    manager: 'TBA',             filed: 'Mar 2026', notes: 'Strong diaspora shareholder base' },
  { company: 'Oromia International Bank',     sector: 'Banking',        status: 'Announced',     shares: '280M',  offerPrice: '—',    manager: 'TBA',             filed: 'Mar 2026', notes: '' },
  { company: 'Ethio Telecom',                 sector: 'Telecoms',       status: 'Announced',     shares: '1.2B',  offerPrice: '—',    manager: 'TBA',             filed: 'Nov 2025', notes: 'Partial government divestiture' },
  { company: 'Ethiopian Airlines',            sector: 'Aviation',       status: 'Announced',     shares: '—',    offerPrice: '—',    manager: 'TBA',             filed: '—',        notes: 'Government has signalled intent' },
  { company: 'Nib International Bank',        sector: 'Banking',        status: 'Prospectus filed', shares: '240M', offerPrice: '—', manager: 'CBE Capital',   filed: 'Apr 2026', notes: '' },
  { company: 'Hijra Bank',                    sector: 'Banking',        status: 'Under review',  shares: '180M',  offerPrice: '—',    manager: 'TBA',             filed: 'Feb 2026', notes: 'First Sharia-compliant IPO on ESX' },
  { company: 'ZamZam Bank',                   sector: 'Banking',        status: 'Under review',  shares: '160M',  offerPrice: '—',    manager: 'TBA',             filed: 'Feb 2026', notes: 'Sharia-compliant' },
  { company: 'Ethiopian Reinsurance',         sector: 'Insurance',      status: 'Announced',     shares: '120M',  offerPrice: '—',    manager: 'TBA',             filed: '—',        notes: 'State-owned reinsurer' },
  { company: 'Nyala Insurance',               sector: 'Insurance',      status: 'Under review',  shares: '90M',   offerPrice: '—',    manager: 'TBA',             filed: 'Jan 2026', notes: '' },
  { company: 'Bunna International Bank',      sector: 'Banking',        status: 'Under review',  shares: '200M',  offerPrice: '—',    manager: 'TBA',             filed: 'Mar 2026', notes: '' },
  { company: 'Abay Bank',                     sector: 'Banking',        status: 'Announced',     shares: '170M',  offerPrice: '—',    manager: 'TBA',             filed: '—',        notes: '' },
  { company: 'Enat Bank',                     sector: 'Banking',        status: 'Announced',     shares: '150M',  offerPrice: '—',    manager: 'TBA',             filed: '—',        notes: 'Women-focused bank' },
  { company: 'Cooperative Bank of Oromia',    sector: 'Banking',        status: 'Under review',  shares: '310M',  offerPrice: '—',    manager: 'TBA',             filed: 'Jan 2026', notes: '' },
]

const STATUS_STYLES: Record<string, { bg: string; color: string; dot: string }> = {
  'Prospectus filed': { bg: '#dbeafe', color: '#1D4ED8',  dot: '#1D4ED8' },
  'Under review':     { bg: '#fef3c7', color: '#92400e',  dot: '#f59e0b' },
  'Announced':        { bg: '#f1f5f9', color: '#475569',  dot: '#94a3b8' },
}

const SECTORS = ['All sectors', 'Banking', 'Insurance', 'Telecoms', 'Aviation']

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

export default function IpoPipelinePage() {
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
            <span style={{ color: PILLAR, fontWeight: 700 }}>IPO Pipeline</span>
          </div>

          <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: PILLAR }}>
            Markets · IPO Pipeline
          </p>
          <h1
            className="font-serif font-bold mb-5 text-slate-950"
            style={{ fontSize: 'clamp(36px, 4.5vw, 54px)', letterSpacing: '-1.8px', lineHeight: 1.08 }}
          >
            Ethiopia's full IPO pipeline —<br />
            <span style={{ color: PILLAR }}>every prospectus tracked.</span>
          </h1>
          <p className="text-slate-600 mb-8" style={{ fontSize: '16px', lineHeight: '1.8', maxWidth: '520px' }}>
            45+ companies under ECMA review or with announced intent to list on the Ethiopian
            Securities Exchange. Updated monthly from official ECMA filings.
          </p>

          {/* Stats bar */}
          <div className="flex flex-wrap gap-6">
            {[
              { icon: <ClockIcon />, label: '45+ companies tracked' },
              { icon: <ClockIcon />, label: 'Updated monthly from ECMA' },
              { icon: <ClockIcon />, label: 'Official prospectus filings only' },
              { icon: <ClockIcon />, label: 'Status updated on every row' },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <span style={{ color: PILLAR }}>{s.icon}</span>
                <span className="text-xs font-semibold text-slate-500">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ PIPELINE TABLE ════════════════════════════ */}
      {/* NO ADS on this page — comparison integrity rule */}
      <section className="bg-white" style={{ padding: '64px 32px 96px' }}>
        <div className="max-w-6xl mx-auto">

          {/* Filter + count bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Filter by sector</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {SECTORS.map((s, i) => (
                  <button
                    key={s}
                    className="rounded-full text-xs font-bold transition-all"
                    style={{
                      padding: '6px 14px',
                      background: i === 0 ? PILLAR : '#f1f5f9',
                      color:      i === 0 ? '#fff'  : '#64748b',
                      border:     i === 0 ? 'none'  : '1px solid #e2e8f0',
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ClockIcon />
              <span>Showing {IPO_PIPELINE.length} of 45+ filings · Sorted by status</span>
            </div>
          </div>

          {/* Status legend */}
          <div className="flex flex-wrap gap-3 mb-6">
            {Object.entries(STATUS_STYLES).map(([label, style]) => (
              <div key={label} className="flex items-center gap-2 rounded-full px-3 py-1.5" style={{ background: style.bg }}>
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: style.dot }} />
                <span className="text-xs font-bold" style={{ color: style.color }}>{label}</span>
              </div>
            ))}
          </div>

          {/* Table */}
          <div className="rounded-2xl overflow-hidden border border-slate-200" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <div style={{ height: 4, background: 'linear-gradient(90deg, #1D4ED8, #a78bfa)' }} />

            {/* Desktop header */}
            <div
              className="hidden sm:grid border-b border-slate-200"
              style={{ gridTemplateColumns: '1fr 130px 110px 120px 160px 160px', padding: '13px 24px', background: '#f9fafb' }}
            >
              {['Company', 'Sector', 'Shares', 'Filed', 'Lead manager', 'Status'].map((h) => (
                <p key={h} className="text-xs font-black text-slate-400 uppercase tracking-widest">{h}</p>
              ))}
            </div>

            {/* Rows */}
            {IPO_PIPELINE.map((ipo) => {
              const st = STATUS_STYLES[ipo.status] ?? STATUS_STYLES['Announced']
              return (
                <div
                  key={ipo.company}
                  className="border-b border-slate-100 bg-white hover:bg-slate-50 transition-colors"
                >
                  {/* Desktop */}
                  <div
                    className="hidden sm:grid items-center"
                    style={{ gridTemplateColumns: '1fr 130px 110px 120px 160px 160px', padding: '15px 24px' }}
                  >
                    <div>
                      <p className="font-bold text-slate-800" style={{ fontSize: '14px' }}>{ipo.company}</p>
                      {ipo.notes && (
                        <p className="text-xs text-slate-400 mt-0.5">{ipo.notes}</p>
                      )}
                    </div>
                    <p className="text-sm text-slate-500">{ipo.sector}</p>
                    <p className="font-mono text-sm text-slate-600">{ipo.shares}</p>
                    <p className="text-sm text-slate-500">{ipo.filed}</p>
                    <p className="text-sm text-slate-500">{ipo.manager}</p>
                    <span
                      className="text-xs font-bold rounded-full px-3 py-1 inline-flex w-fit items-center gap-1.5"
                      style={{ background: st.bg, color: st.color }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: st.dot }} />
                      {ipo.status}
                    </span>
                  </div>

                  {/* Mobile */}
                  <div className="sm:hidden" style={{ padding: '14px 16px' }}>
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <p className="font-bold text-slate-800 text-sm">{ipo.company}</p>
                      <span
                        className="text-xs font-bold rounded-full px-2 py-0.5 shrink-0"
                        style={{ background: st.bg, color: st.color }}
                      >
                        {ipo.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">{ipo.sector} · {ipo.shares} shares · {ipo.manager}</p>
                    {ipo.notes && <p className="text-xs text-slate-400 mt-0.5 italic">{ipo.notes}</p>}
                  </div>
                </div>
              )
            })}

            {/* Table footer */}
            <div
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-slate-200"
              style={{ background: '#f9fafb', padding: '14px 24px' }}
            >
              <p className="text-xs text-slate-400">
                Source: Ethiopian Capital Markets Authority (ECMA) · ecma.gov.et · Updated monthly
              </p>
              <Link href="/markets" className="text-xs font-bold hover:underline shrink-0" style={{ color: PILLAR }}>
                Back to Markets →
              </Link>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-slate-400 mt-5 text-center leading-relaxed">
            IPO data is sourced from public ECMA filings and company announcements. Offer prices and timelines are
            subject to regulatory approval and may change. This is not investment advice.
            BirrBank is a comparison platform, not a broker or financial adviser.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════ HOW TO READ AN IPO ═══════════════════════ */}
      <section className="border-b border-y border-slate-100" style={{ background: '#f9fafb', padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Guide</p>
            <h2
              className="font-serif font-bold text-slate-950"
              style={{ fontSize: 'clamp(26px, 3vw, 36px)', letterSpacing: '-1.2px', lineHeight: 1.15 }}
            >
              How Ethiopian IPOs work — a plain-language guide.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                title: 'What the pipeline status means',
                body: 'Announced means a company has publicly stated intent to list. Under review means ECMA is actively reviewing the prospectus. Prospectus filed means the formal document is submitted and a listing date may be set soon.',
              },
              {
                step: '02',
                title: 'How to participate in an IPO',
                body: 'When an IPO opens, you apply through a licensed broker or directly via the ESX platform. You need a Central Securities Depository (CSD) account. Shares are allocated after the subscription window closes — often oversubscribed.',
              },
              {
                step: '03',
                title: 'What to look at in a prospectus',
                body: 'Focus on the use of proceeds, financial statements for the last 3 years, capital adequacy ratios for banks, management background and the offer price relative to book value. ECMA publishes all prospectuses on ecma.gov.et.',
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
            <Link
              href="/guides"
              className="inline-flex items-center gap-2 text-sm font-bold"
              style={{ color: PILLAR }}
            >
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
            <h3
              className="font-serif font-bold mb-2"
              style={{ fontSize: 'clamp(22px, 2.5vw, 30px)', color: '#ffffff', letterSpacing: '-0.8px' }}
            >
              Every filing is sourced from ECMA directly.
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: 1.75, maxWidth: 480 }}>
              BirrBank does not list rumours. Every company in the pipeline has either filed
              a formal prospectus with ECMA, or made an official public announcement of listing intent.
              We update status monthly as filings progress.
            </p>
          </div>
          <div className="flex flex-col gap-3 shrink-0">
            {[
              { dot: '#1D4ED8', label: 'Prospectus filed', sub: 'Formal ECMA submission complete' },
              { dot: '#f59e0b', label: 'Under review',     sub: 'ECMA actively reviewing filing' },
              { dot: '#94a3b8', label: 'Announced',        sub: 'Public intent declared, filing pending' },
            ].map((s) => (
              <div
                key={s.label}
                className="flex items-center gap-3 rounded-xl"
                style={{ background: '#1e293b', border: '1px solid #334155', padding: '14px 20px' }}
              >
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
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">IPO alerts</p>
            <h2
              className="font-serif font-bold text-slate-950 mb-5"
              style={{ fontSize: 'clamp(30px, 3.5vw, 42px)', letterSpacing: '-1.5px', lineHeight: 1.1 }}
            >
              Know before the<br />
              <span style={{ color: PILLAR }}>IPO window opens.</span>
            </h2>
            <p className="text-slate-500 mb-8" style={{ fontSize: '15px', lineHeight: 1.85 }}>
              Get notified when a new prospectus is filed, when an IPO date is confirmed,
              and when subscription windows open — before it hits the news.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'New ECMA prospectus filings as they happen',
                'IPO subscription window open and close dates',
                'Share allocation results and listing prices',
                'Post-listing ESX performance updates',
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
