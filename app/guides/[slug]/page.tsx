import Link from 'next/link'
import { createSupabaseAdminClient } from '@/lib/supabase'
import { notFound } from 'next/navigation'
export const dynamic = 'force-dynamic'

const PILLAR_COLORS: Record<string, { bg: string; color: string }> = {
  banking:      { bg: '#dbeafe', color: '#1D4ED8' },
  insurance:    { bg: '#dcfce7', color: '#166534' },
  markets:      { bg: '#ede9fe', color: '#5b21b6' },
  commodities:  { bg: '#fef3c7', color: '#92400e' },
  regulations:  { bg: '#fee2e2', color: '#991b1b' },
  diaspora:     { bg: '#ecfeff', color: '#0e7490' },
  general:      { bg: '#f1f5f9', color: '#475569' },
}

const PILLAR_LABELS: Record<string, string> = {
  banking: 'Banking', insurance: 'Insurance', markets: 'Markets',
  commodities: 'Commodities', regulations: 'Regulations', diaspora: 'Diaspora', general: 'General',
}

const ArrowRight = ({ size = 13 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)

function fmtDate(d: string | null | undefined) {
  if (!d) return null
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

function renderBody(body: string) {
  const lines = body.split('\n')
  const elements: React.ReactNode[] = []
  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    if (!line.trim()) { i++; continue }
    if (line.startsWith('## ')) {
      elements.push(<h2 key={i} className="font-serif font-bold text-slate-950 mt-10 mb-4" style={{ fontSize: 'clamp(20px, 2.5vw, 26px)', letterSpacing: '-0.8px' }}>{line.slice(3)}</h2>)
    } else if (line.startsWith('### ')) {
      elements.push(<h3 key={i} className="font-bold text-slate-900 mt-8 mb-3" style={{ fontSize: '18px' }}>{line.slice(4)}</h3>)
    } else if (line.startsWith('# ')) {
      // Skip — title shown in hero
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      const items: string[] = []
      while (i < lines.length && (lines[i].startsWith('- ') || lines[i].startsWith('* '))) {
        items.push(lines[i].slice(2))
        i++
      }
      elements.push(
        <ul key={i} className="my-4 space-y-2">
          {items.map((item, j) => (
            <li key={j} className="flex items-start gap-3 text-slate-600" style={{ fontSize: '15px', lineHeight: 1.75 }}>
              <svg className="shrink-0 mt-1" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }} />
            </li>
          ))}
        </ul>
      )
      continue
    } else if (/^\d+\.\s/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s/, ''))
        i++
      }
      elements.push(
        <ol key={i} className="my-4 space-y-2 list-decimal list-inside">
          {items.map((item, j) => (
            <li key={j} className="text-slate-600" style={{ fontSize: '15px', lineHeight: 1.75 }}
              dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }} />
          ))}
        </ol>
      )
      continue
    } else if (line.startsWith('---')) {
      elements.push(<hr key={i} className="border-slate-200 my-8" />)
    } else {
      elements.push(
        <p key={i} className="text-slate-600 my-4" style={{ fontSize: '16px', lineHeight: 1.85 }}
          dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }} />
      )
    }
    i++
  }
  return elements
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = createSupabaseAdminClient()

  const { data: guide } = await supabase
    .schema('birrbank')
    .from('guides')
    .select('*, institutions(name, slug)')
    .eq('slug', slug)
    .eq('is_current', true)
    .single()

  if (!guide) notFound()

  const { data: related } = await supabase
    .schema('birrbank')
    .from('guides')
    .select('slug, title, pillar')
    .eq('pillar', guide.pillar)
    .eq('is_current', true)
    .neq('slug', slug)
    .limit(3)

  const pillarStyle = PILLAR_COLORS[guide.pillar] ?? PILLAR_COLORS.general
  const pillarLabel = PILLAR_LABELS[guide.pillar] ?? guide.pillar

  return (
    <div className="min-h-screen bg-white">

      {/* HERO */}
      <section className="relative bg-white overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 900px 500px at 55% -80px, rgba(29,78,216,0.04) 0%, transparent 65%)' }} />
        <div className="relative max-w-4xl mx-auto px-8 pt-20 pb-14">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-6">
            <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link><span>›</span>
            <Link href="/guides" className="hover:text-slate-600 transition-colors">Guides</Link><span>›</span>
            <span style={{ color: '#1D4ED8', fontWeight: 700 }}>{pillarLabel}</span>
          </div>
          <span className="text-xs font-bold rounded-full px-3 py-1 mb-6 inline-block"
            style={{ background: pillarStyle.bg, color: pillarStyle.color }}>
            {pillarLabel}
          </span>
          <h1 className="font-serif font-bold text-slate-950 mb-5"
            style={{ fontSize: 'clamp(28px, 4vw, 44px)', letterSpacing: '-1.5px', lineHeight: 1.1 }}>
            {guide.title}
          </h1>
          {guide.meta_description && (
            <p className="text-slate-600 mb-6" style={{ fontSize: '17px', lineHeight: 1.8, maxWidth: '600px' }}>
              {guide.meta_description}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
            {fmtDate(guide.published_at) && <span>Published {fmtDate(guide.published_at)}</span>}
            {guide.institutions?.name && (
              <>
                <span>·</span>
                <Link href={'/institutions/' + guide.institutions.slug} className="hover:underline" style={{ color: '#1D4ED8' }}>
                  {guide.institutions.name}
                </Link>
              </>
            )}
            <span>·</span>
            <span>BirrBank Guide</span>
          </div>
        </div>
      </section>

      {/* BODY */}
      <section className="bg-white" style={{ padding: '64px 32px 96px' }}>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">

            {/* Article */}
            <article className="lg:col-span-3">
              {guide.body ? renderBody(guide.body) : (
                <p className="text-slate-400">Guide content is being prepared. Check back soon.</p>
              )}
              <div className="mt-12 pt-8 border-t border-slate-100">
                <p className="text-xs text-slate-400 leading-relaxed">
                  This guide is provided for informational purposes only.
                  Always verify rates and products directly with the institution.
                  BirrBank is not a bank, insurer, broker or financial adviser.
                </p>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-8 space-y-5">
                <div className="rounded-2xl border border-slate-200 overflow-hidden" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                  <div style={{ height: 3, background: 'linear-gradient(90deg, #1D4ED8, #1E40AF)' }} />
                  <div style={{ padding: '20px' }}>
                    <p className="font-bold text-slate-800 mb-4" style={{ fontSize: '13px' }}>Quick links</p>
                    <div className="space-y-2">
                      {[
                        { label: 'Savings rates', href: '/banking/savings-rates' },
                        { label: 'Loan comparison', href: '/banking/loans' },
                        { label: 'FX rates', href: '/banking/fx-rates' },
                        { label: 'ESX markets', href: '/markets' },
                        { label: 'ECX commodities', href: '/commodities' },
                        { label: 'All institutions', href: '/institutions' },
                      ].map(l => (
                        <Link key={l.href} href={l.href}
                          className="flex items-center justify-between text-xs font-semibold hover:underline"
                          style={{ color: '#1D4ED8' }}>
                          {l.label} <ArrowRight size={10} />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {related && related.length > 0 && (
                  <div className="rounded-2xl border border-slate-200 overflow-hidden" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                    <div style={{ height: 3, background: '#f1f5f9' }} />
                    <div style={{ padding: '20px' }}>
                      <p className="font-bold text-slate-800 mb-4" style={{ fontSize: '13px' }}>Related guides</p>
                      <div className="space-y-3">
                        {related.map((r: any) => (
                          <Link key={r.slug} href={'/guides/' + r.slug}
                            className="block text-xs font-semibold text-slate-600 hover:text-blue-700 hover:underline leading-snug">
                            {r.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}
