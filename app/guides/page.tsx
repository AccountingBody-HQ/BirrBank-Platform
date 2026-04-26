import Link from 'next/link'
import EmailCapture from '@/components/EmailCapture'
import { createSupabaseAdminClient } from '@/lib/supabase'
export const dynamic = 'force-dynamic'

const PILLAR = '#1D4ED8'
const PILLAR_LABELS: Record<string, string> = {
  banking: 'Banking', insurance: 'Insurance', markets: 'Markets',
  commodities: 'Commodities', regulations: 'Regulations', diaspora: 'Diaspora', general: 'General',
}
const ArrowRight = ({ size = 13 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)

export default async function GuidesPage() {
  const supabase = createSupabaseAdminClient()
  const { data: guidesData } = await supabase.schema('birrbank').from('guides').select('*').eq('is_current', true).order('is_featured', { ascending: false }).order('published_at', { ascending: false })
  const { count: totalCount } = await supabase.schema('birrbank').from('guides').select('count', { count: 'exact', head: true }).eq('is_current', true)
  const guides = guidesData ?? []
  const featured = guides.filter((g: any) => g.is_featured)
  const rest = guides.filter((g: any) => !g.is_featured)

  const PILLAR_COLORS: Record<string, { bg: string; color: string }> = {
    banking: { bg: '#dbeafe', color: '#1D4ED8' },
    insurance: { bg: '#dcfce7', color: '#166534' },
    markets: { bg: '#ede9fe', color: '#5b21b6' },
    commodities: { bg: '#fef3c7', color: '#92400e' },
    regulations: { bg: '#fee2e2', color: '#991b1b' },
    diaspora: { bg: '#ecfeff', color: '#0e7490' },
    general: { bg: '#f1f5f9', color: '#475569' },
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="relative bg-white overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 900px 500px at 55% -80px, rgba(29,78,216,0.04) 0%, transparent 65%)' }} />
        <div className="relative max-w-6xl mx-auto px-8 pt-20 pb-14">
          <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: PILLAR }}>Intelligence · Guides</p>
          <h1 className="font-serif font-bold mb-5 text-slate-950" style={{ fontSize: 'clamp(36px, 4.5vw, 54px)', letterSpacing: '-1.8px', lineHeight: 1.08 }}>
            Ethiopian financial guides —<br /><span style={{ color: PILLAR }}>banking, markets, insurance and more.</span>
          </h1>
          <p className="text-slate-600 mb-8" style={{ fontSize: '16px', lineHeight: '1.8', maxWidth: '520px' }}>
            Plain-language guides on every aspect of Ethiopian finance —
            written for consumers, diaspora, investors and businesses.
          </p>
          <div className="flex flex-wrap gap-3">
            {Object.entries(PILLAR_LABELS).map(([key, label]) => {
              const style = PILLAR_COLORS[key] ?? PILLAR_COLORS['general']
              return (
                <span key={key} className="text-xs font-bold rounded-full px-3 py-1.5" style={{ background: style.bg, color: style.color }}>{label}</span>
              )
            })}
          </div>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="border-b border-slate-100 bg-white" style={{ padding: '64px 32px' }}>
          <div className="max-w-6xl mx-auto">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-8">Featured guides</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {featured.map((g: any) => {
                const style = PILLAR_COLORS[g.pillar] ?? PILLAR_COLORS['general']
                return (
                  <Link key={g.slug} href={'/guides/' + g.slug}
                    className="group bg-white rounded-2xl border border-slate-200 hover:shadow-xl transition-all duration-200 overflow-hidden"
                    style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                    <div style={{ height: 4, background: 'linear-gradient(90deg, #1D4ED8, #1E40AF)' }} />
                    <div style={{ padding: '28px 24px' }}>
                      <span className="text-xs font-bold rounded-full px-2 py-0.5 mb-4 inline-block" style={{ background: style.bg, color: style.color }}>
                        {PILLAR_LABELS[g.pillar] ?? g.pillar}
                      </span>
                      <p className="font-bold text-slate-900 mb-3" style={{ fontSize: '16px', lineHeight: 1.4 }}>{g.title}</p>
                      {g.meta_description && <p className="text-sm text-slate-500 mb-4" style={{ lineHeight: 1.7 }}>{g.meta_description}</p>}
                      <div className="flex items-center gap-1 text-xs font-bold group-hover:gap-2 transition-all" style={{ color: PILLAR }}>
                        <span>Read guide</span><ArrowRight size={11} />
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      <section className="border-b border-slate-100" style={{ background: '#f9fafb', padding: '64px 32px 96px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">All guides · {totalCount ?? 0} published</p>
          </div>
          {rest.length > 0 ? (
            <div className="rounded-2xl overflow-hidden border border-slate-200" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
              <div style={{ height: 4, background: 'linear-gradient(90deg, #1D4ED8, #1E40AF)' }} />
              {rest.map((g: any, i: number) => {
                const style = PILLAR_COLORS[g.pillar] ?? PILLAR_COLORS['general']
                return (
                  <Link key={g.slug} href={'/guides/' + g.slug}
                    className={'block border-b border-slate-100 transition-colors ' + (i === 0 ? 'bg-blue-50 hover:bg-blue-100' : 'bg-white hover:bg-slate-50')}>
                    <div className="flex items-center gap-4" style={{ padding: '16px 24px' }}>
                      <span className="text-xs font-bold rounded-full px-2 py-0.5 shrink-0" style={{ background: style.bg, color: style.color }}>
                        {PILLAR_LABELS[g.pillar] ?? g.pillar}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-slate-800 truncate" style={{ fontSize: '14px' }}>{g.title}</p>
                        {g.meta_description && <p className="text-xs text-slate-400 truncate mt-0.5">{g.meta_description}</p>}
                      </div>
                      <ArrowRight size={12} />
                    </div>
                  </Link>
                )
              })}
              <div className="border-t border-slate-200" style={{ background: '#f9fafb', padding: '14px 24px' }}>
                <p className="text-xs text-slate-400">Showing {guides.length} of {totalCount ?? 0} guides · More being published weekly</p>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white text-center py-12">
              <p className="text-slate-500 text-sm">More guides being published weekly. Check back soon.</p>
            </div>
          )}
        </div>
      </section>

      <section className="bg-white" style={{ padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Guide alerts</p>
            <h2 className="font-serif font-bold text-slate-950 mb-5" style={{ fontSize: 'clamp(30px, 3.5vw, 42px)', letterSpacing: '-1.5px', lineHeight: 1.1 }}>
              New guides published weekly,<br /><span style={{ color: PILLAR }}>direct to your inbox.</span>
            </h2>
            <p className="text-slate-500 mb-8" style={{ fontSize: '15px', lineHeight: 1.85 }}>Stay informed on every aspect of Ethiopian finance — banking, markets, insurance, commodities and regulations.</p>
            <p className="text-xs text-slate-500 font-medium pt-5 border-t border-slate-100">Free forever · No credit card · Unsubscribe anytime</p>
          </div>
          <EmailCapture />
        </div>
      </section>
    </div>
  )
}
