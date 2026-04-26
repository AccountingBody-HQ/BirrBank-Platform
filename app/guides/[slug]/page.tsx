import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { getBirrBankGuideBySlug, getRelatedBirrBankGuides } from '@/lib/sanity'
export const dynamic = 'force-dynamic'

const CONTENT_TYPE_PILLAR: Record<string, string> = {
  'Bank Review': 'banking', 'Rate Guide': 'banking', 'Loan Guide': 'banking',
  'Savings Guide': 'banking', 'FX Guide': 'banking',
  'Insurance Guide': 'insurance',
  'Market Analysis': 'markets', 'IPO Guide': 'markets', 'ESX Guide': 'markets', 'Investment Guide': 'markets',
  'Commodity Report': 'commodities', 'ECX Guide': 'commodities',
  'Diaspora Guide': 'diaspora',
  'Regulatory Update': 'regulations',
  'Financial Explainer': 'general', 'Article': 'general',
}

const PILLAR_COLORS: Record<string, { bg: string; color: string; border: string }> = {
  banking:     { bg: '#dbeafe', color: '#1D4ED8', border: '#bfdbfe' },
  insurance:   { bg: '#dcfce7', color: '#166534', border: '#bbf7d0' },
  markets:     { bg: '#ede9fe', color: '#5b21b6', border: '#ddd6fe' },
  commodities: { bg: '#fef3c7', color: '#92400e', border: '#fde68a' },
  regulations: { bg: '#fee2e2', color: '#991b1b', border: '#fecaca' },
  diaspora:    { bg: '#ecfeff', color: '#0e7490', border: '#a5f3fc' },
  general:     { bg: '#f1f5f9', color: '#475569', border: '#e2e8f0' },
}

const PILLAR_LABELS: Record<string, string> = {
  banking: 'Banking', insurance: 'Insurance', markets: 'Markets',
  commodities: 'Commodities', regulations: 'Regulations', diaspora: 'Diaspora', general: 'General',
}

function getPillar(contentType: string | null): string {
  if (!contentType) return 'general'
  return CONTENT_TYPE_PILLAR[contentType] ?? 'general'
}

function formatDate(d: string | null | undefined) {
  if (!d) return null
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

function estimateReadTime(body: any[]): number {
  if (!body) return 3
  const text = body.map((block: any) =>
    block._type === 'block' && block.children
      ? block.children.map((c: any) => c.text || '').join(' ')
      : ''
  ).join(' ')
  const wordCount = text.split(' ').filter((w: string) => w.length > 0).length
  return Math.max(1, Math.ceil(wordCount / 220))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const guide = await getBirrBankGuideBySlug(slug)
  if (!guide) return { title: 'Guide Not Found' }
  return {
    title: guide.title + ' | BirrBank',
    description: guide.excerpt || undefined,
    openGraph: {
      title: guide.title,
      description: guide.excerpt || undefined,
      url: 'https://birrbank.com/guides/' + slug + '/',
      type: 'article',
      ...(guide.publishedAt && { publishedTime: guide.publishedAt }),
    },
    twitter: { card: 'summary_large_image', title: guide.title, description: guide.excerpt || undefined },
  }
}

const portableComponents = {
  block: {
    h2: ({ children }: any) => (
      <h2 className="font-serif text-2xl font-bold text-slate-900 tracking-tight mt-12 mb-4 leading-snug">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="font-serif text-xl font-bold text-slate-900 tracking-tight mt-10 mb-3 leading-snug">{children}</h3>
    ),
    h4: ({ children }: any) => <h4 className="font-bold text-slate-900 mt-8 mb-2">{children}</h4>,
    normal: ({ children }: any) => (
      <p className="text-slate-600 leading-[1.85] mb-5 text-[17px]">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-blue-600 pl-6 my-8 text-slate-700 italic leading-relaxed bg-blue-50/50 py-4 pr-4 rounded-r-xl">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-outside pl-6 mb-6 space-y-2 text-slate-600 leading-relaxed text-[17px]">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol style={{ listStyleType: 'decimal', paddingLeft: '1.5rem', marginBottom: '1.5rem' }} className="space-y-2 text-slate-600 leading-relaxed text-[17px]">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => <li>{children}</li>,
    number: ({ children }: any) => <li style={{ display: 'list-item', listStyleType: 'decimal' }} className="text-slate-600 leading-relaxed pl-1">{children}</li>,
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-semibold text-slate-800">{children}</strong>,
    em: ({ children }: any) => <em>{children}</em>,
    code: ({ children }: any) => <code className="bg-slate-100 text-slate-800 text-sm px-1.5 py-0.5 rounded font-mono">{children}</code>,
    link: ({ value, children }: any) => {
      const href = value?.href || '#'
      if (href.startsWith('http')) {
        return <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 underline underline-offset-2 transition-colors">{children}</a>
      }
      return <a href={href} className="text-blue-600 hover:text-blue-700 underline underline-offset-2 transition-colors">{children}</a>
    },
  },
  types: {
    tableBlock: ({ value }: any) => {
      const headers = value?.headers ?? []
      const rows = value?.rows ?? []
      if (!headers.length && !rows.length) return null
      return (
        <div className="my-8 overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
          <table className="w-full text-sm text-left border-collapse">
            {headers.length > 0 && (
              <thead className="bg-slate-950 text-white">
                <tr>{headers.map((h: string, i: number) => (
                  <th key={i} className="px-4 py-3 font-semibold text-sm border-r border-white/10 last:border-r-0">{h}</th>
                ))}</tr>
              </thead>
            )}
            <tbody>{rows.map((row: any, ri: number) => (
              <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                {(row.cells ?? []).map((cell: string, ci: number) => (
                  <td key={ci} className="px-4 py-3 text-slate-700 border-r border-slate-200 last:border-r-0 border-t border-slate-100">{cell}</td>
                ))}
              </tr>
            ))}</tbody>
          </table>
        </div>
      )
    },
  },
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const guide = await getBirrBankGuideBySlug(slug)
  if (!guide) notFound()

  const pillar = getPillar(guide.contentType)
  const pillarStyle = PILLAR_COLORS[pillar] ?? PILLAR_COLORS.general
  const pillarLabel = guide.contentType ?? PILLAR_LABELS[pillar] ?? pillar
  const related = await getRelatedBirrBankGuides(slug, guide.contentType)
  const readTime = estimateReadTime(guide.body || [])

  return (
    <div className="bg-white flex-1">

      <section className="relative bg-slate-950 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 60% 0%, rgba(29,78,216,0.18) 0%, transparent 60%), radial-gradient(ellipse at 0% 100%, rgba(14,30,80,0.4) 0%, transparent 50%)' }} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-20">
          <Link href="/guides" className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm font-medium transition-colors mb-10">
            <ArrowLeft size={14} /> All guides
          </Link>
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest"
                style={{ background: 'rgba(29,78,216,0.15)', border: '1px solid rgba(29,78,216,0.3)', color: '#93c5fd' }}>
                {pillarLabel}
              </span>
              <span className="text-slate-500 text-xs">{readTime} min read</span>
              {formatDate(guide.publishedAt) && (
                <span className="text-slate-500 text-xs">· {formatDate(guide.publishedAt)}</span>
              )}
            </div>
            <h1 className="font-serif text-3xl lg:text-5xl font-bold text-white leading-tight mb-6" style={{ letterSpacing: '-0.025em' }}>
              {guide.title}
            </h1>
            {guide.excerpt && (
              <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">{guide.excerpt}</p>
            )}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-[1fr_300px] gap-16">
            <article>
              {guide.body && guide.body.length > 0 ? (
                <PortableText value={guide.body} components={portableComponents} />
              ) : (
                <p className="text-slate-400">Guide content is being prepared. Check back soon.</p>
              )}
              <div className="mt-16 pt-8 border-t border-slate-100">
                <Link href="/guides" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 text-sm font-semibold transition-colors">
                  <ArrowLeft size={14} /> All guides
                </Link>
              </div>
            </article>

            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-6">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-4">Explore BirrBank</h3>
                  <div className="space-y-1">
                    {[
                      { label: 'Savings rates', href: '/banking/savings-rates' },
                      { label: 'Loan comparison', href: '/banking/loans' },
                      { label: 'FX rates', href: '/banking/fx-rates' },
                      { label: 'ESX markets', href: '/markets' },
                      { label: 'ECX commodities', href: '/commodities' },
                      { label: 'All institutions', href: '/institutions' },
                      { label: 'Insurance comparison', href: '/insurance' },
                      { label: 'Diaspora hub', href: '/diaspora' },
                    ].map(l => (
                      <Link key={l.href} href={l.href}
                        className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200 transition-all group">
                        <span className="text-sm font-medium text-slate-700 group-hover:text-blue-700 transition-colors">{l.label}</span>
                        <ArrowRight size={12} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                  <p className="text-xs text-amber-800 leading-relaxed">
                    <span className="font-bold">Disclaimer:</span> This guide is for informational purposes only.
                    Always verify rates and products directly with the institution.
                    BirrBank is not a bank, insurer, broker or financial adviser.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-slate-50 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#1D4ED8' }}>Keep reading</p>
                <h2 className="font-serif text-3xl font-bold text-slate-900 tracking-tight">Related guides.</h2>
              </div>
              <Link href="/guides" className="hidden sm:flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors">
                All guides <ArrowRight size={15} />
              </Link>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              {related.map((r: any) => (
                <Link key={r._id} href={'/guides/' + r.slug.current}
                  className="group bg-white border border-slate-200 hover:border-blue-300 hover:shadow-lg rounded-2xl overflow-hidden transition-all duration-200 flex flex-col">
                  <div className="h-1.5 bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="p-7 flex flex-col flex-1">
                    {r.contentType && (
                      <span className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#1D4ED8' }}>{r.contentType}</span>
                    )}
                    <h3 className="font-bold text-slate-900 text-lg mb-3 leading-snug group-hover:text-blue-700 transition-colors flex-1">{r.title}</h3>
                    {r.excerpt && <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-4">{r.excerpt}</p>}
                    <div className="flex items-center gap-1.5 text-blue-600 text-sm font-semibold group-hover:gap-2.5 transition-all">
                      Read guide <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  )
}
