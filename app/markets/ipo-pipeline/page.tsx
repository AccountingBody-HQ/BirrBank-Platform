import Link from 'next/link'
import EmailCapture from '@/components/EmailCapture'
import { createSupabaseAdminClient } from '@/lib/supabase'
export const dynamic = 'force-dynamic'

const PILLAR = '#1D4ED8'

const STATUS_STYLES: Record<string, { bg: string; color: string; dot: string }> = {
  announced:        { bg: '#f1f5f9', color: '#475569', dot: '#94a3b8' },
  review:           { bg: '#fef3c7', color: '#92400e', dot: '#f59e0b' },
  approved:         { bg: '#dbeafe', color: '#1D4ED8', dot: '#1D4ED8' },
  open:             { bg: '#dcfce7', color: '#166534', dot: '#22c55e' },
  priced:           { bg: '#ede9fe', color: '#5b21b6', dot: '#7c3aed' },
  listed:           { bg: '#d1fae5', color: '#065f46', dot: '#10b981' },
  withdrawn:        { bg: '#fee2e2', color: '#991b1b', dot: '#ef4444' },
}

const STATUS_LABELS: Record<string, string> = {
  announced: 'Announced',
  review:    'Under review',
  approved:  'Approved',
  open:      'Subscription open',
  priced:    'Priced',
  listed:    'Listed',
  withdrawn: 'Withdrawn',
}

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
  return new Date(d).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })
}
function fmtAmount(val: number | null | undefined) {
  if (val == null) return '—'
  const b = Number(val) / 1e9
  if (b >= 1) return 'ETB ' + b.toFixed(1) + 'B'
  const m = Number(val) / 1e6
  return 'ETB ' + m.toFixed(0) + 'M'
}
function fmtShares(val: number | null | undefined) {
  if (val == null) return '—'
  const m = Number(val) / 1e6
  return m.toFixed(0) + 'M'
}

export default async function IpoPipelinePage() {
  const supabase = createSupabaseAdminClient()

  const { data: ipoData } = await supabase
    .schema('birrbank')
    .from('ipo_pipeline')
    .select('*')
    .neq('status', 'withdrawn')
    .order('status')

  const { count: totalCount } = await supabase
    .schema('birrbank')
    .from('ipo_pipeline')
    .select('count', { count: 'exact', head: true })
    .neq('status', 'withdrawn')

  const ipos = ipoData ?? []

  // Count by status
  const statusCounts = ipos.reduce((acc: Record<string, number>, ipo: any) => {
    acc[ipo.status] = (acc[ipo.status] ?? 0) + 1
    return acc
  }, {})

  return (
    <div className="min-h-screen bg-white">

      {/* ══════════════════════════════ HERO ══════════════════════════════════════ */}
      <section className="relative bg-white overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 900px 500px at 55% -80px, rgba(29,78,216,0.04) 0%, transparent 65%)' }} />
        <div className="relative max-w-6xl mx-auto px-8 pt-20 pb-14">
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
          <h1 className="font-serif font-bold mb-5 text-slate-950" style={{ fontSize: 'clamp(36px, 4.5vw, 54px)', letterSpacing: '-1.8px', lineHeight: 1.08 }}>
            Ethiopia IPO pipeline —<br />
            <span style={{ color: PILLAR }}>every prospectus tracked.</span>
          </h1>
          <p className="text-slate-600 mb-8" style={{ fontSize: '16px', lineHeight: '1.8', maxWidth: '520px' }}>
            {totalCount ?? 0}+ companies under ECMA review or with announced intent to list on the Ethiopian
            Securities Exchange. Updated from official ECMA filings.
          </p>
          <div className="flex flex-wrap gap-6">
            {[
              { icon: <ClockIcon />, label: (totalCount ?? 0) + ' companies tracked' },
              { icon: <ClockIcon />, label: 'Updated from ECMA filings' },
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
      <section className="bg-white" style={{ padding: '64px 32px 96px' }}>
        <div className="max-w-6xl mx-auto">

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">All filings</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ClockIcon />
              <span>Showing {ipos.length} filings · Sorted by status</span>
            </div>
          </div>

          {/* Status legend */}
          <div className="flex flex-wrap gap-3 mb-6">
            {Object.entries(STATUS_STYLES).filter(([key]) => statusCounts[key] > 0).map(([key, style]) => (
              <div key={key} className="flex items-center gap-2 rounded-full px-3 py-1.5" style={{ background: style.bg }}>
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: style.dot }} />
                <span className="text-xs font-bold" style={{ color: style.color }}>{STATUS_LABELS[key]} ({statusCounts[key]})</span>
              </div>
            ))}
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-200" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <div style={{ height: 4, background: 'linear-gradient(90deg, #1D4ED8, #1E40AF)' }} />

            <div className="hidden sm:grid border-b border-slate-200" style={{ gridTemplateColumns: '1fr 130px 110px 130px 160px 160px', padding: '13px 24px', background: '#f9fafb' }}>
              {['Company', 'Sector', 'Total raise', 'Exp. listing', 'Lead manager', 'Status'].map((h) => (
                <p key={h} className="text-xs font-black text-slate-400 uppercase tracking-widest">{h}</p>
              ))}
            </div>

            {ipos.length > 0 ? ipos.map((ipo: any) => {
              const st = STATUS_STYLES[ipo.status] ?? STATUS_STYLES['announced']
              const label = STATUS_LABELS[ipo.status] ?? ipo.status
              return (
                <div key={ipo.id} className="border-b border-slate-100 bg-white hover:bg-slate-50 transition-colors">
                  <div className="hidden sm:grid items-center" style={{ gridTemplateColumns: '1fr 130px 110px 130px 160px 160px', padding: '15px 24px' }}>
                    <div>
                      <p className="font-bold text-slate-800" style={{ fontSize: '14px' }}>{ipo.company_name}</p>
                      {ipo.notes && <p className="text-xs text-slate-400 mt-0.5">{ipo.notes}</p>}
                    </div>
                    <p className="text-sm text-slate-500">{ipo.sector ?? '—'}</p>
                    <p className="font-mono text-sm text-slate-600">{fmtAmount(ipo.total_raise_etb)}</p>
                    <p className="text-sm text-slate-500">{fmtDate(ipo.expected_listing)}</p>
                    <p className="text-sm text-slate-500">{ipo.lead_manager ?? '—'}</p>
                    <span className="text-xs font-bold rounded-full px-3 py-1 inline-flex w-fit items-center gap-1.5" style={{ background: st.bg, color: st.color }}>
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: st.dot }} />
                      {label}
                    </span>
                  </div>
                  <div className="sm:hidden" style={{ padding: '14px 16px' }}>
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <p className="font-bold text-slate-800 text-sm">{ipo.company_name}</p>
                      <span className="text-xs font-bold rounded-full px-2 py-0.5 shrink-0" style={{ background: st.bg, color: st.color }}>{label}</span>
                    </div>
                    <p className="text-xs text-slate-400">{ipo.sector ?? '—'} · {fmtAmount(ipo.total_raise_etb)} · {ipo.lead_manager ?? '—'}</p>
                    {ipo.notes && <p className="text-xs text-slate-400 mt-0.5 italic">{ipo.notes}</p>}
                  </div>
                </div>
              )
            }) : (
              <div className="py-12 text-center">
                <p className="text-slate-500 text-sm">No IPO pipeline data available. Check back soon.</p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-slate-200" style={{ background: '#f9fafb', padding: '14px 24px' }}>
              <p className="text-xs text-slate-400">Source: Ethiopian Capital Markets Authority (ECMA) · ecma.gov.et · Updated monthly</p>
              <Link href="/markets" className="text-xs font-bold hover:underline shrink-0" style={{ color: PILLAR }}>Back to Markets →</Link>
            </div>
          </div>

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
            <h2 className="font-serif font-bold text-slate-950" style={{ fontSize: 'clamp(26px, 3vw, 36px)', letterSpacing: '-1.2px', lineHeight: 1.15 }}>
              How Ethiopian IPOs work — a plain-language guide.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'What the pipeline status means', body: 'Announced means a company has publicly stated intent to list. Under review means ECMA is actively reviewing the prospectus. Approved means a listing date may be set soon.' },
              { step: '02', title: 'How to participate in an IPO', body: 'When an IPO opens, you apply through a licensed broker or directly via the ESX platform. You need a Central Securities Depository (CSD) account. Shares are allocated after the subscription window closes.' },
              { step: '03', title: 'What to look at in a prospectus', body: 'Focus on the use of proceeds, financial statements for the last 3 years, capital adequacy ratios for banks, management background and the offer price relative to book value. ECMA publishes all prospectuses on ecma.gov.et.' },
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
              Every filing is sourced from ECMA directly.
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: 1.75, maxWidth: 480 }}>
              BirrBank does not list rumours. Every company in the pipeline has either filed
              a formal prospectus with ECMA, or made an official public announcement of listing intent.
              We update status as filings progress.
            </p>
          </div>
          <div className="flex flex-col gap-3 shrink-0">
            {[
              { dot: '#1D4ED8', label: 'Approved',       sub: 'ECMA approval complete' },
              { dot: '#f59e0b', label: 'Under review',   sub: 'ECMA actively reviewing filing' },
              { dot: '#94a3b8', label: 'Announced',      sub: 'Public intent declared, filing pending' },
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
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">IPO alerts</p>
            <h2 className="font-serif font-bold text-slate-950 mb-5" style={{ fontSize: 'clamp(30px, 3.5vw, 42px)', letterSpacing: '-1.5px', lineHeight: 1.1 }}>
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
