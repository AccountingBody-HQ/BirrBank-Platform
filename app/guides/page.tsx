import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen, Layers } from 'lucide-react'
import { getBirrBankGuides } from '@/lib/sanity'
import { createSupabaseAdminClient } from '@/lib/supabase'
import EmailCapture from '@/components/EmailCapture'
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Guides — Ethiopian Finance Intelligence | BirrBank',
  description: 'Plain-language guides on every aspect of Ethiopian finance — banking, insurance, markets, commodities and regulations. Written for consumers, diaspora, investors and businesses.',
  alternates: { canonical: 'https://birrbank.com/guides/' },
  openGraph: {
    title: 'Guides — Ethiopian Finance Intelligence | BirrBank',
    description: 'Plain-language guides on every aspect of Ethiopian finance.',
    url: 'https://birrbank.com/guides/',
    type: 'website',
  },
}

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

export default async function GuidesPage() {
  const supabase = createSupabaseAdminClient()
  const [guides, instRes] = await Promise.all([
    getBirrBankGuides(),
    supabase.schema('birrbank').from('institutions').select('count',{count:'exact',head:true}).eq('is_active',true),
  ])
  const totalCount = guides.length
  const institutionCount = instRes.count ?? 214

  return (
    <div className="flex-1 bg-white">

      <section className="relative bg-slate-950 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 60% 0%, rgba(29,78,216,0.15) 0%, transparent 60%), radial-gradient(ellipse at 0% 100%, rgba(14,30,80,0.4) 0%, transparent 50%)' }} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <span className="text-blue-300 text-xs font-semibold tracking-wide">Intelligence &amp; Guides</span>
            </div>
            <h1 className="font-serif text-4xl lg:text-6xl font-bold text-white leading-[1.08] mb-6" style={{ letterSpacing: '-0.025em' }}>
              Ethiopian financial<br /><span className="text-blue-400">guides.</span>
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed max-w-2xl">
              Plain-language guides on every aspect of Ethiopian finance —
              written for consumers, diaspora, investors and businesses.
            </p>
          </div>
          <div className="mt-16 pt-10 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {[
              { value: String(institutionCount), label: 'NBE Institutions' },
              { value: '5',   label: 'Pillars Covered'  },
              { value: 'Free', label: 'Full Access'      },
              { value: 'ETB', label: 'Local Currency'    },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-black text-white tracking-tight">{s.value}</div>
                <div className="text-xs font-semibold text-slate-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center shrink-0">
              <Layers size={14} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">
                {totalCount === 0 ? 'No guides found' : totalCount === 1 ? '1 guide' : totalCount + ' guides'}
              </p>
              <p className="text-xs text-slate-500">across banking, insurance, markets, commodities and more</p>
            </div>
          </div>

          {guides.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {guides.map((g: any) => (
                <Link key={g._id} href={'/guides/' + g.slug.current}
                  className="group bg-white border border-slate-200 hover:border-blue-300 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-200 flex flex-col">
                  <div className="h-1.5 bg-blue-600" />
                  <div className="p-7 flex flex-col flex-1">
                    {g.contentType && (
                      <span className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">{g.contentType}</span>
                    )}
                    <h2 className="font-bold text-slate-900 text-lg leading-snug mb-3 group-hover:text-blue-700 transition-colors">
                      {g.title}
                    </h2>
                    {g.excerpt && (
                      <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-4">{g.excerpt}</p>
                    )}
                    <div className="mt-auto flex items-center gap-1.5 text-blue-600 text-sm font-semibold group-hover:gap-2.5 transition-all">
                      Read guide <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center mx-auto mb-5">
                <BookOpen size={24} className="text-slate-400" />
              </div>
              <h3 className="font-bold text-xl text-slate-900 mb-2">No guides yet</h3>
              <p className="text-slate-500 text-sm max-w-md mx-auto leading-relaxed">
                Guides will appear here once published. Check back soon.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="bg-white" style={{ padding: '96px 32px' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Guide alerts</p>
            <h2 className="font-serif font-bold text-slate-950 mb-5" style={{ fontSize: 'clamp(30px, 3.5vw, 42px)', letterSpacing: '-1.5px', lineHeight: 1.1 }}>
              New guides published weekly,<br /><span style={{ color: '#1D4ED8' }}>direct to your inbox.</span>
            </h2>
            <p className="text-slate-500 mb-8" style={{ fontSize: '15px', lineHeight: 1.85 }}>
              Stay informed on every aspect of Ethiopian finance — banking, markets, insurance, commodities and regulations.
            </p>
            <p className="text-xs text-slate-500 font-medium pt-5 border-t border-slate-100">Free forever · No credit card · Unsubscribe anytime</p>
          </div>
          <EmailCapture />
        </div>
      </section>

    </div>
  )
}
