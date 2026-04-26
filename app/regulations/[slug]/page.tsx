import Link from 'next/link'
import { createSupabaseAdminClient } from '@/lib/supabase'
import { notFound } from 'next/navigation'
export const dynamic = 'force-dynamic'

const REGULATOR_STYLES: Record<string, { bg: string; color: string }> = {
  NBE:  { bg: '#dbeafe', color: '#1D4ED8' },
  ECMA: { bg: '#ede9fe', color: '#5b21b6' },
  ECX:  { bg: '#fef3c7', color: '#92400e' },
  MOF:  { bg: '#dcfce7', color: '#166534' },
  other:{ bg: '#f1f5f9', color: '#475569' },
}

const ArrowRight = ({ size = 13 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)

function fmtDate(d: string | null | undefined) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default async function RegulationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = createSupabaseAdminClient()

  const { data: reg } = await supabase
    .schema('birrbank')
    .from('regulations')
    .select('*')
    .eq('slug', slug)
    .eq('is_current', true)
    .single()

  if (!reg) notFound()

  const { data: related } = await supabase
    .schema('birrbank')
    .from('regulations')
    .select('slug, title, regulator, published_date')
    .eq('regulator', reg.regulator)
    .eq('is_current', true)
    .neq('slug', slug)
    .order('published_date', { ascending: false })
    .limit(4)

  const regStyle = REGULATOR_STYLES[reg.regulator] ?? REGULATOR_STYLES.other

  const impacts: string[] = Array.isArray(reg.impacts) ? reg.impacts : []

  return (
    <div className="min-h-screen bg-white">

      {/* HERO */}
      <section className="relative bg-white overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 900px 500px at 55% -80px, rgba(29,78,216,0.04) 0%, transparent 65%)' }} />
        <div className="relative max-w-4xl mx-auto px-8 pt-20 pb-14">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-6">
            <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link><span>›</span>
            <Link href="/regulations" className="hover:text-slate-600 transition-colors">Regulations</Link><span>›</span>
            <span style={{ color: '#1D4ED8', fontWeight: 700 }}>{reg.regulator}</span>
          </div>
          <span className="text-xs font-black rounded-full px-3 py-1 mb-6 inline-block"
            style={{ background: regStyle.bg, color: regStyle.color }}>
            {reg.regulator}
          </span>
          <h1 className="font-serif font-bold text-slate-950 mb-5"
            style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', letterSpacing: '-1.2px', lineHeight: 1.12 }}>
            {reg.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
            {reg.category && <span className="font-semibold text-slate-500">{reg.category}</span>}
            <span>·</span>
            <span>Published {fmtDate(reg.published_date)}</span>
            {reg.effective_date && (
              <>
                <span>·</span>
                <span>Effective {fmtDate(reg.effective_date)}</span>
              </>
            )}
            <span>·</span>
            <span className="font-bold px-2 py-0.5 rounded-full" style={{ background: '#dcfce7', color: '#166534' }}>Active</span>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="bg-white" style={{ padding: '64px 32px 96px' }}>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">

            {/* Main content */}
            <article className="lg:col-span-3 space-y-8">

              {/* Summary */}
              {reg.summary && (
                <div className="rounded-2xl p-6" style={{ background: '#f9fafb', border: '1px solid #e2e8f0' }}>
                  <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: '#1D4ED8' }}>Summary</p>
                  <p className="text-slate-700" style={{ fontSize: '16px', lineHeight: 1.85 }}>{reg.summary}</p>
                </div>
              )}

              {/* Impacts */}
              {impacts.length > 0 && (
                <div>
                  <h2 className="font-serif font-bold text-slate-950 mb-4" style={{ fontSize: 'clamp(18px, 2vw, 22px)', letterSpacing: '-0.5px' }}>
                    Who is affected
                  </h2>
                  <div className="space-y-3">
                    {impacts.map((impact: string, i: number) => (
                      <div key={i} className="flex items-start gap-3 rounded-xl p-4" style={{ background: '#f9fafb', border: '1px solid #e2e8f0' }}>
                        <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                          style={{ background: '#dbeafe' }}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                        </div>
                        <p className="text-slate-600" style={{ fontSize: '14px', lineHeight: 1.7 }}>{impact}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Full text link */}
              {reg.full_text_url && (
                <div className="rounded-2xl border border-slate-200 overflow-hidden" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                  <div style={{ height: 3, background: 'linear-gradient(90deg, #1D4ED8, #1E40AF)' }} />
                  <div className="flex items-center justify-between p-5">
                    <div>
                      <p className="font-bold text-slate-900 mb-0.5" style={{ fontSize: '14px' }}>Official directive text</p>
                      <p className="text-xs text-slate-400">Source: {reg.regulator === 'NBE' ? 'nbe.gov.et' : reg.regulator === 'ECMA' ? 'ecma.gov.et' : 'ecx.com.et'}</p>
                    </div>
                    <a href={reg.full_text_url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 font-bold rounded-full text-sm shrink-0"
                      style={{ background: '#1D4ED8', color: '#fff', padding: '10px 20px' }}>
                      Read full text <ArrowRight size={12} />
                    </a>
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-slate-100">
                <p className="text-xs text-slate-400 leading-relaxed">
                  This summary is for informational purposes only. Always refer to the official directive text.
                  BirrBank is not a legal adviser. Effective dates and applicability may vary.
                </p>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-8 space-y-5">

                {/* Meta card */}
                <div className="rounded-2xl border border-slate-200 overflow-hidden" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                  <div style={{ height: 3, background: regStyle.color }} />
                  <div style={{ padding: '20px' }}>
                    <p className="font-bold text-slate-800 mb-4" style={{ fontSize: '13px' }}>Directive details</p>
                    <div className="space-y-3">
                      {[
                        { label: 'Issuer',     value: reg.regulator },
                        { label: 'Category',   value: reg.category ?? '—' },
                        { label: 'Published',  value: fmtDate(reg.published_date) },
                        { label: 'Effective',  value: reg.effective_date ? fmtDate(reg.effective_date) : '—' },
                        { label: 'Status',     value: 'Active' },
                      ].map(row => (
                        <div key={row.label}>
                          <p className="text-xs text-slate-400 mb-0.5">{row.label}</p>
                          <p className="text-xs font-semibold text-slate-700">{row.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Related */}
                {related && related.length > 0 && (
                  <div className="rounded-2xl border border-slate-200 overflow-hidden" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                    <div style={{ height: 3, background: '#f1f5f9' }} />
                    <div style={{ padding: '20px' }}>
                      <p className="font-bold text-slate-800 mb-4" style={{ fontSize: '13px' }}>More {reg.regulator} directives</p>
                      <div className="space-y-3">
                        {related.map((r: any) => (
                          <Link key={r.slug} href={'/regulations/' + r.slug}
                            className="block text-xs font-semibold text-slate-600 hover:text-blue-700 hover:underline leading-snug">
                            {r.title}
                            <span className="block text-slate-400 font-normal mt-0.5">{fmtDate(r.published_date)}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <Link href="/regulations" className="flex items-center gap-2 text-xs font-bold" style={{ color: '#1D4ED8' }}>
                  ← All regulations
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}
