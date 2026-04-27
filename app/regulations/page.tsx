import Link from 'next/link'
import EmailCapture from '@/components/EmailCapture'
import { createSupabaseAdminClient } from '@/lib/supabase'
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
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default async function RegulationsPage() {
  const supabase = createSupabaseAdminClient()

  const { data: regsData } = await supabase
    .schema('birrbank')
    .from('regulations')
    .select('*')
    .eq('is_current', true)
    .order('published_date', { ascending: false })

  const { count: totalCount } = await supabase
    .schema('birrbank')
    .from('regulations')
    .select('count', { count: 'exact', head: true })
    .eq('is_current', true)

  const regulations = regsData ?? []

  // Count by regulator
  const regulatorCounts = regulations.reduce((acc: Record<string, number>, r: any) => {
    acc[r.regulator] = (acc[r.regulator] ?? 0) + 1
    return acc
  }, {})

  return (
    <div className="min-h-screen bg-white">

      {/* ══════════════════════════════ HERO ══════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ background: '#0f172a' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 60% 0%, rgba(29,78,216,0.18) 0%, transparent 60%), radial-gradient(ellipse at 0% 100%, rgba(14,30,80,0.4) 0%, transparent 50%)' }} />
        <div className="relative max-w-7xl mx-auto px-8 pt-20 pb-14">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-6">
            <Link href="/" className="hover:text-slate-300 transition-colors">Home</Link>
            <span>›</span>
            <span style={{ color: '#1D4ED8', fontWeight: 700 }}>Regulations</span>
          </div>
          <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: '#93c5fd' }}>Intelligence · Regulations</p>
          <h1 className="font-serif font-bold mb-5 text-white" style={{ fontSize: 'clamp(36px, 4.5vw, 54px)', letterSpacing: '-1.8px', lineHeight: 1.08 }}>
            Ethiopian financial regulations —<br />
            <span style={{ color: '#1D4ED8' }}>NBE, ECMA and ECX directives.</span>
          </h1>
          <p className="text-slate-400 mb-8" style={{ fontSize: '16px', lineHeight: '1.8', maxWidth: '520px' }}>
            Every significant directive, proclamation and regulatory update from the National Bank of Ethiopia,
            Ethiopian Capital Markets Authority and Ethiopian Commodity Exchange — summarised and searchable.
          </p>
          <div className="flex flex-wrap gap-4">
            {Object.entries(regulatorCounts).map(([reg, count]) => {
              const style = REGULATOR_STYLES[reg] ?? REGULATOR_STYLES['other']
              return (
                <div key={reg} className="flex items-center gap-2 rounded-full px-3 py-1.5" style={{ background: style.bg }}>
                  <span className="text-xs font-black" style={{ color: style.color }}>{reg}</span>
                  <span className="text-xs font-bold" style={{ color: style.color }}>{count} directives</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ REGULATIONS TABLE ════════════════════════ */}
      <section className="bg-white" style={{ padding: '64px 32px 96px' }}>
        <div className="max-w-7xl mx-auto">

          <div className="flex items-center justify-between mb-8">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
              {totalCount ?? 0} active directives · Sorted by date (most recent first)
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-200" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <div style={{ height: 4, background: 'linear-gradient(90deg, #1D4ED8, #1E40AF)' }} />

            <div className="hidden sm:grid border-b border-slate-200"
              style={{ gridTemplateColumns: '90px 1fr 130px 120px 110px', padding: '13px 24px', background: '#f9fafb' }}>
              {['Issuer', 'Directive', 'Category', 'Published', 'Status'].map((h) => (
                <p key={h} className="text-xs font-black text-slate-400 uppercase tracking-widest">{h}</p>
              ))}
            </div>

            {regulations.length > 0 ? regulations.map((r: any, i: number) => {
              const style = REGULATOR_STYLES[r.regulator] ?? REGULATOR_STYLES['other']
              return (
                <div key={r.id} className={'border-b border-slate-100 ' + (i === 0 ? 'bg-blue-50' : 'bg-white hover:bg-slate-50') + ' transition-colors'}>
                  {/* Desktop */}
                  <div className="hidden sm:grid items-start"
                    style={{ gridTemplateColumns: '90px 1fr 130px 120px 110px', padding: '18px 24px', gap: '0' }}>
                    <span className="text-xs font-black rounded-full px-2 py-1 w-fit mt-0.5" style={{ background: style.bg, color: style.color }}>{r.regulator}</span>
                    <div className="pr-6">
                      <p className="font-bold text-slate-800 mb-1" style={{ fontSize: '14px' }}>{r.title}</p>
                      {r.summary && <p className="text-xs text-slate-500" style={{ lineHeight: 1.7 }}>{r.summary}</p>}
                      {r.full_text_url && (
                        <a href={r.full_text_url} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-bold mt-2" style={{ color: '#1D4ED8' }}>
                          Full text <ArrowRight size={10} />
                        </a>
                      )}
                    </div>
                    <p className="text-sm text-slate-500 mt-0.5">{r.category ?? '—'}</p>
                    <p className="text-sm text-slate-500 mt-0.5">{fmtDate(r.published_date)}</p>
                    <span className="text-xs font-bold rounded-full px-2 py-1 w-fit mt-0.5" style={{ background: '#dcfce7', color: '#166534' }}>Active</span>
                  </div>
                  {/* Mobile */}
                  <div className="sm:hidden" style={{ padding: '16px 16px' }}>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <p className="font-bold text-slate-800 text-sm">{r.title}</p>
                      <span className="text-xs font-black rounded-full px-2 py-0.5 shrink-0" style={{ background: style.bg, color: style.color }}>{r.regulator}</span>
                    </div>
                    <p className="text-xs text-slate-500 mb-1" style={{ lineHeight: 1.6 }}>{r.summary}</p>
                    <p className="text-xs text-slate-400">{r.category ?? '—'} · {fmtDate(r.published_date)}</p>
                  </div>
                </div>
              )
            }) : (
              <div className="py-12 text-center">
                <p className="text-slate-500 text-sm">No regulations data available.</p>
              </div>
            )}

            <div className="flex items-center justify-between border-t border-slate-200" style={{ background: '#f9fafb', padding: '14px 24px' }}>
              <p className="text-xs text-slate-400">Sources: NBE (nbe.gov.et) · ECMA (ecma.gov.et) · ECX (ecx.com.et) · Updated as directives are published</p>
            </div>
          </div>

          <p className="text-xs text-slate-400 mt-5 text-center leading-relaxed">
            Regulation summaries are for informational purposes only. Always refer to the official directive text.
            BirrBank is not a legal adviser.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════ DARK TRUST ════════════════════════════════ */}
      <section className="border-b border-slate-100" style={{ background: '#0f172a', padding: '72px 32px' }}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: '#93c5fd' }}>Source integrity</p>
            <h3 className="font-serif font-bold mb-2" style={{ fontSize: 'clamp(22px, 2.5vw, 30px)', color: '#ffffff', letterSpacing: '-0.8px' }}>
              Official sources only. No interpretation.
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: 1.75, maxWidth: 480 }}>
              Every directive listed here is sourced from the official publications of the NBE, ECMA or ECX.
              BirrBank summarises for accessibility but always links to the original full text.
            </p>
          </div>
          <div className="flex flex-col gap-3 shrink-0">
            {[
              { dot: '#dbeafe', label: 'NBE',  sub: 'National Bank of Ethiopia' },
              { dot: '#ede9fe', label: 'ECMA', sub: 'Ethiopian Capital Markets Authority' },
              { dot: '#fef3c7', label: 'ECX',  sub: 'Ethiopian Commodity Exchange' },
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
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Regulatory alerts</p>
            <h2 className="font-serif font-bold text-slate-950 mb-5" style={{ fontSize: 'clamp(30px, 3.5vw, 42px)', letterSpacing: '-1.5px', lineHeight: 1.1 }}>
              New directives,<br />
              <span style={{ color: '#1D4ED8' }}>direct to your inbox.</span>
            </h2>
            <p className="text-slate-500 mb-8" style={{ fontSize: '15px', lineHeight: 1.85 }}>
              Get notified when the NBE, ECMA or ECX publishes a new directive — before it affects your rates, products or compliance obligations.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'New NBE banking and FX directives as published',
                'ECMA capital markets regulatory updates',
                'ECX trading rule and grading standard changes',
                'Interest rate policy changes affecting deposits and loans',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-slate-600">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-xs text-slate-500 font-medium pt-5 border-t border-slate-100">Free forever · No credit card · Unsubscribe anytime</p>
          </div>
          <EmailCapture />
        </div>
      </section>

    </div>
  )
}
