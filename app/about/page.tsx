import type { Metadata } from 'next'
import Link from 'next/link'
import { createSupabaseAdminClient } from '@/lib/supabase'
import { ArrowRight, Globe, Shield, TrendingUp, Users, ExternalLink } from 'lucide-react'
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'About BirrBank — Mission, Methodology & Data Standards',
  description: "Ethiopia's financial intelligence platform. How we source, verify and maintain savings rates, FX, insurance, markets and commodity data.",
  alternates: { canonical: 'https://birrbank.com/about' },
  openGraph: {
    title: 'About BirrBank — Mission, Methodology & Data Standards',
    description: "Ethiopia's financial intelligence platform — data methodology and mission.",
    url: 'https://birrbank.com/about',
    siteName: 'BirrBank',
    type: 'website',
  },
}

const WHO_ITS_FOR = [
  { icon: Users,      title: 'Retail Savers',          body: 'Ethiopians comparing savings rates and fixed deposit offers across commercial banks to make the most of their money.' },
  { icon: Shield,     title: 'Diaspora Investors',     body: 'Ethiopian nationals living abroad tracking ETB exchange rates, ESX stock prices, IPO pipelines and investment opportunities.' },
  { icon: TrendingUp, title: 'Agri-businesses & Exporters', body: 'Exporters, cooperatives and lenders who need daily ECX commodity prices for coffee, sesame and grains to make pricing and lending decisions.' },
  { icon: Globe,      title: 'Financial Professionals', body: 'Analysts, bankers, insurers and journalists who need a single verified source for Ethiopian financial data across all sectors.' },
]

const METHODOLOGY = [
  { step: '01', title: 'Official Sources Only', body: 'Every data point is traced to an official publication — an NBE circular, ECX settlement report, ESX end-of-day file, or insurer website. We do not accept secondary sources or unverified third-party data.' },
  { step: '02', title: 'Regular Verification', body: 'Data is checked against source on a rolling cycle. Rate changes, new product launches and regulatory updates are applied as soon as they are confirmed from official sources.' },
  { step: '03', title: 'Source Transparency', body: 'Every data section cites its source. You can verify every figure yourself — from NBE FX rates to ECX settlement prices to ESX end-of-day prices.' },
  { step: '04', title: 'Free, Always', body: 'BirrBank is free to use with no account required for core data. We do not accept payment from banks, insurers or brokers to influence rankings or placement.' },
]

export default async function AboutPage() {
  const supabase = createSupabaseAdminClient()
  const [instRes, ipoRes] = await Promise.all([
    supabase.schema('birrbank').from('institutions').select('count',{count:'exact',head:true}).eq('is_active',true),
    supabase.schema('birrbank').from('ipo_pipeline').select('count',{count:'exact',head:true}).neq('status','listed').neq('status','withdrawn'),
  ])
  const institutionCount = instRes.count ?? 218
  const ipoCount = ipoRes.count ?? 45

  return (
    <main className="bg-white flex-1">
      <section className="relative overflow-hidden" style={{ background:'#0f172a' }}>
        <div className="absolute inset-0" style={{ background:'radial-gradient(ellipse at 60% 0%, rgba(29,78,216,0.18) 0%, transparent 60%)' }} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-20">
          <div className="max-w-3xl">
            <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6">
              <Link href="/" className="hover:text-slate-200 transition-colors">Home</Link>
              <span>›</span>
              <span className="text-slate-300">About</span>
            </nav>
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8"
              style={{ background:'rgba(29,78,216,0.15)', border:'1px solid rgba(29,78,216,0.3)' }}>
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <span className="text-blue-300 text-xs font-semibold tracking-wide">About BirrBank</span>
            </div>
            <h1 className="font-serif text-4xl lg:text-6xl font-bold text-white leading-[1.08] mb-8" style={{ letterSpacing:'-0.025em' }}>
              Ethiopia's financial intelligence platform — free, verified, always current.
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed max-w-2xl">
              BirrBank gives retail savers, diaspora investors, agribusinesses and financial professionals authoritative, verified financial data across all five pillars of the Ethiopian economy — banking, insurance, markets, commodities and intelligence.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-blue-600 text-xs font-bold uppercase tracking-widest mb-4">Our Mission</p>
              <h2 className="font-serif text-4xl font-bold text-slate-900 tracking-tight leading-tight mb-6">
                One verified source.<br />Every Ethiopian financial product.
              </h2>
              <div className="space-y-5 text-slate-600 leading-relaxed">
                <p>Ethiopian financial data is fragmented. Savings rates sit on individual bank websites. ECX prices are published in formats designed for traders. ESX end-of-day data is hard to find. Insurance premiums are not compared anywhere.</p>
                <p>BirrBank is built to fix that. We aggregate, verify and maintain financial data across savings, FX, insurance, capital markets and commodities — for Ethiopia, in one place, updated continuously.</p>
                <p>Our goal is to become the reference platform for anyone making financial decisions in or about Ethiopia — whether they are comparing savings rates, tracking an IPO, or pricing a commodity export.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5">
              {[
                { value:`${institutionCount}+`, label:'Institutions tracked', sub:'Banks, insurers, MFIs and more' },
                { value:'5',                   label:'Data pillars',         sub:'Banking, insurance, markets, commodities, intelligence' },
                { value:`${ipoCount}+`,         label:'IPOs in pipeline',    sub:'ECMA filings tracked' },
                { value:'100%',                 label:'Free to access',      sub:'No account required' },
              ].map(s => (
                <div key={s.label} className="bg-white border border-slate-200 rounded-2xl p-6">
                  <div className="text-3xl font-black text-slate-900 tracking-tight">{s.value}</div>
                  <div className="text-sm font-bold text-slate-700 mt-1">{s.label}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <div className="mb-14">
            <p className="text-blue-600 text-xs font-bold uppercase tracking-widest mb-3">Who It Is For</p>
            <h2 className="font-serif text-4xl font-bold text-slate-900 tracking-tight leading-tight">Built for everyone with a financial stake in Ethiopia.</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHO_ITS_FOR.map(item => (
              <div key={item.title} className="bg-white border border-slate-200 rounded-2xl p-7 hover:shadow-md transition-shadow">
                <div className="bg-blue-600 text-white w-11 h-11 rounded-xl flex items-center justify-center mb-5">
                  <item.icon size={20} />
                </div>
                <h3 className="font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <div className="mb-14">
            <p className="text-blue-600 text-xs font-bold uppercase tracking-widest mb-3">Data Methodology</p>
            <div className="flex items-end justify-between gap-6">
              <h2 className="font-serif text-4xl font-bold text-slate-900 tracking-tight leading-tight">How we source and verify every data point.</h2>
              <p className="hidden lg:block text-slate-500 max-w-md leading-relaxed">Our methodology is built on one principle: every number must be traceable to an official source.</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {METHODOLOGY.map(m => (
              <div key={m.step}>
                <div className="text-6xl font-black text-slate-100 leading-none mb-4 select-none">{m.step}</div>
                <h3 className="font-bold text-slate-900 text-lg mb-3 leading-tight">{m.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <p className="text-blue-600 text-xs font-bold uppercase tracking-widest mb-4">Data Accuracy</p>
            <h2 className="font-serif text-3xl font-bold text-slate-900 tracking-tight leading-tight mb-6">Accurate data. Honest limitations.</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>We invest significant effort in ensuring the data on BirrBank is accurate, current and properly sourced. Every data point is linked to an official source — NBE publications, ECX settlement reports, ESX end-of-day files, or insurer websites.</p>
              <p>However, financial data changes frequently. Rates change. Products launch and close. Rules are updated. We cannot guarantee that all data is current at every moment.</p>
              <p className="font-medium text-slate-800">BirrBank is a research and reference tool. It is not a substitute for qualified professional advice. Always verify critical financial decisions with a qualified adviser in the relevant field.</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-6">
              <Link href="/disclaimer" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors">
                Read our full disclaimer <ArrowRight size={15} />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-semibold text-sm transition-colors">
                Report a data error <ExternalLink size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden" style={{ background:'#0f172a' }}>
        <div className="absolute inset-0" style={{ background:'radial-gradient(ellipse at 80% 50%, rgba(29,78,216,0.12) 0%, transparent 60%)' }} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div>
            <h2 className="font-serif text-4xl font-bold text-white leading-tight tracking-tight mb-4">Start exploring Ethiopian financial data.</h2>
            <p className="text-slate-400 leading-relaxed max-w-xl">All savings rates, FX rates, ESX prices, ECX commodity data and insurance comparisons are free — no account required.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Link href="/banking/savings-rates" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-7 py-4 rounded-xl transition-colors text-sm">
              Compare savings rates <ArrowRight size={15} />
            </Link>
            <Link href="/markets/equities" className="inline-flex items-center gap-2 border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white font-bold px-7 py-4 rounded-xl transition-colors text-sm">
              View ESX equities
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
