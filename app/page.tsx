import Link from 'next/link'
import CountrySearch from '@/components/homepage/CountrySearch'
import { Globe, Calculator, Building2, Shield, ArrowRight, CheckCircle, TrendingUp, Users, Database, RefreshCw, MapPin } from 'lucide-react'

const FEATURED_COUNTRIES = [
  { code: 'gb', name: 'United Kingdom', stat: 'Corp Tax: 25%', currency: 'GBP' },
  { code: 'us', name: 'United States', stat: 'Fed Tax: up to 37%', currency: 'USD' },
  { code: 'de', name: 'Germany', stat: 'Corp Tax: 15%', currency: 'EUR' },
  { code: 'fr', name: 'France', stat: 'Corp Tax: 25%', currency: 'EUR' },
  { code: 'nl', name: 'Netherlands', stat: 'Corp Tax: 25.8%', currency: 'EUR' },
  { code: 'sg', name: 'Singapore', stat: 'Corp Tax: 17%', currency: 'SGD' },
  { code: 'ae', name: 'UAE', stat: 'Corp Tax: 9%', currency: 'AED' },
  { code: 'au', name: 'Australia', stat: 'Corp Tax: 30%', currency: 'AUD' },
  { code: 'ca', name: 'Canada', stat: 'Fed Tax: 15%', currency: 'CAD' },
  { code: 'jp', name: 'Japan', stat: 'Corp Tax: 23.2%', currency: 'JPY' },
  { code: 'in', name: 'India', stat: 'Corp Tax: 22%', currency: 'INR' },
  { code: 'ch', name: 'Switzerland', stat: 'Corp Tax: 8.5%', currency: 'CHF' },
]

const REGIONS = [
  { name: 'Europe', slug: 'europe', count: 44 },
  { name: 'Americas', slug: 'americas', count: 35 },
  { name: 'Asia Pacific', slug: 'asia-pacific', count: 42 },
  { name: 'Middle East', slug: 'middle-east', count: 18 },
  { name: 'Africa', slug: 'africa', count: 56 },
]

const PLATFORM_CARDS = [
  {
    icon: Globe,
    title: 'Country Data',
    description: 'Income tax brackets, social security rates, employment rules, and payroll compliance obligations for every country.',
    href: '/countries/',
    cta: 'Browse all countries',
    gradient: 'from-blue-600 to-blue-700',
    border: 'border-blue-200',
    iconBg: 'bg-blue-100 text-blue-700',
  },
  {
    icon: Calculator,
    title: 'Payroll Calculators',
    description: 'Calculate net pay, employer costs, tax, and social security contributions with a full line-by-line breakdown.',
    href: '/payroll-tools/',
    cta: 'Open calculators',
    gradient: 'from-indigo-600 to-indigo-700',
    border: 'border-indigo-200',
    iconBg: 'bg-indigo-100 text-indigo-700',
  },
  {
    icon: Building2,
    title: 'EOR Intelligence',
    description: 'Employer of Record cost estimators, provider comparisons, and guides for hiring without a local entity.',
    href: '/eor/',
    cta: 'Explore EOR',
    gradient: 'from-sky-600 to-sky-700',
    border: 'border-sky-200',
    iconBg: 'bg-sky-100 text-sky-700',
  },
  {
    icon: Shield,
    title: 'HR Compliance',
    description: 'Global employment law by topic — minimum wage, leave entitlements, notice periods, and probation rules.',
    href: '/hr-compliance/',
    cta: 'View compliance guides',
    gradient: 'from-teal-600 to-teal-700',
    border: 'border-teal-200',
    iconBg: 'bg-teal-100 text-teal-700',
  },
]

const TRUST_ITEMS = [
  { icon: Database, label: 'Government sources', sub: 'Official tax authority data' },
  { icon: CheckCircle, label: 'Expert verified', sub: 'Reviewed by payroll professionals' },
  { icon: RefreshCw, label: 'Updated monthly', sub: 'Current rates and thresholds' },
  { icon: Users, label: 'Built for professionals', sub: 'EOR firms, HR teams, lawyers' },
]

const STATS = [
  { value: '195', label: 'Countries Covered' },
  { value: '10,000+', label: 'Data Points' },
  { value: 'Monthly', label: 'Data Updates' },
  { value: 'Free', label: 'Core Access' },
]

export default async function HomePage() {
  let insights: any[] = []
  try {
    const { createClient } = await import('@sanity/client')
    const sanity = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
      apiVersion: '2024-01-01',
      useCdn: true,
    })
    insights = await sanity.fetch(
      `*[_type == "post" && "globalpayrollexpert" in showOnSites] | order(publishedAt desc)[0...3] {
        title, slug, publishedAt, excerpt,
        "category": categories[0]->title
      }`
    )
  } catch (_) {
    insights = []
  }

  return (
    <main className="min-h-screen bg-white">

      {/* ── HERO ── */}
      <section className="relative bg-[#0a1628] text-white overflow-hidden">

        {/* dot grid */}
        <div className="absolute inset-0 opacity-[0.15]"
          style={{backgroundImage: 'radial-gradient(circle, #4b8ef1 1px, transparent 1px)', backgroundSize: '32px 32px'}} />

        {/* colour washes */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">

          {/* eyebrow */}
          <div className="flex justify-center mb-8">
            <span className="inline-flex items-center gap-2 border border-blue-500/40 bg-blue-500/10 text-blue-300 text-xs font-semibold tracking-widest uppercase px-5 py-2 rounded-full">
              <TrendingUp size={12} />
              Trusted by global payroll professionals
            </span>
          </div>

          {/* headline */}
          <h1 className="text-center text-4xl sm:text-5xl lg:text-[3.75rem] font-extrabold leading-[1.1] tracking-tight mb-6 max-w-4xl mx-auto">
            The World's Most Comprehensive<br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Global Payroll Intelligence
            </span>{" "}Platform
          </h1>

          <p className="text-center text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Payroll data, calculators, and compliance guides for every country.
            Built for EOR firms, HR directors, lawyers, and global employers.
          </p>

          {/* search */}
          <div className="max-w-2xl mx-auto mb-10">
            <CountrySearch />
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/countries/"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl transition-colors text-base shadow-lg shadow-blue-900/40">
              Explore Countries <ArrowRight size={18} />
            </Link>
            <Link href="/payroll-tools/global-calculator/"
              className="inline-flex items-center gap-2 border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white font-semibold px-8 py-4 rounded-xl transition-colors text-base">
              Try the Calculator
            </Link>
          </div>

          {/* stat bar */}
          <div className="border-t border-slate-700/60 pt-10 grid grid-cols-2 sm:grid-cols-4 gap-0 divide-x divide-slate-700/60">
            {STATS.map(s => (
              <div key={s.label} className="px-6 text-center first:pl-0 last:pr-0">
                <div className="text-3xl font-black text-white tracking-tight">{s.value}</div>
                <div className="text-slate-400 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REGION STRIP ── */}
      <section className="bg-slate-900 border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider mr-3 flex items-center gap-1.5">
              <MapPin size={12} /> Regions
            </span>
            {REGIONS.map(r => (
              <Link key={r.slug}
                href={`/countries/?region=${r.slug}`}
                className="text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700 hover:border-slate-500 text-sm font-medium px-4 py-1.5 rounded-full transition-all">
                {r.name}
                <span className="text-slate-500 ml-1.5 text-xs">{r.count}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED COUNTRIES ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-blue-600 text-xs font-bold uppercase tracking-widest mb-2">Popular Jurisdictions</p>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Featured Countries</h2>
          </div>
          <Link href="/countries/"
            className="text-slate-500 hover:text-blue-600 font-medium text-sm flex items-center gap-1 transition-colors">
            All 195 countries <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {FEATURED_COUNTRIES.map(c => (
            <Link key={c.code} href={`/countries/${c.code}/`}
              className="group relative bg-white border border-slate-200 hover:border-blue-400 hover:shadow-lg rounded-2xl p-5 transition-all duration-200 overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center gap-3 mb-4">
                <img src={`https://flagcdn.com/32x24/${c.code}.png`} alt={c.name}
                  width={32} height={24} className="rounded shadow-sm" />
                <span className="font-bold text-slate-800 text-sm leading-tight group-hover:text-blue-700 transition-colors">{c.name}</span>
              </div>
              <div className="text-xs text-slate-500 font-medium bg-slate-50 border border-slate-100 rounded-lg px-3 py-2">{c.stat}</div>
              <div className="mt-3 flex items-center gap-1 text-xs text-blue-600 font-semibold opacity-0 group-hover:opacity-100 transition-all">
                View full data <ArrowRight size={11} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── PLATFORM CARDS ── */}
      <section className="bg-slate-50 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-14">
            <p className="text-blue-600 text-xs font-bold uppercase tracking-widest mb-3">The Platform</p>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Everything You Need for Global Payroll</h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto">One authoritative source for country data, payroll calculations, EOR intelligence, and employment law compliance.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PLATFORM_CARDS.map(card => (
              <Link key={card.title} href={card.href}
                className={`group bg-white border ${card.border} hover:shadow-xl rounded-2xl p-7 transition-all duration-200 flex flex-col relative overflow-hidden`}>
                <div className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className={`inline-flex p-3 rounded-xl ${card.iconBg} w-fit mb-5`}>
                  <card.icon size={22} />
                </div>
                <h3 className="font-extrabold text-slate-900 text-lg mb-2 tracking-tight">{card.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed flex-1">{card.description}</p>
                <div className="mt-6 text-sm font-bold flex items-center gap-1.5 text-slate-700 group-hover:text-blue-600 group-hover:gap-2.5 transition-all">
                  {card.cta} <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-[#0a1628] rounded-3xl px-8 py-12">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-extrabold text-white tracking-tight">Data You Can Trust</h2>
            <p className="text-slate-400 mt-2 text-sm">Every data point is sourced, verified, and kept current</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRUST_ITEMS.map((item, i) => (
              <div key={item.label} className="flex flex-col items-center text-center">
                <div className="bg-blue-600/20 border border-blue-500/30 text-blue-400 p-4 rounded-2xl mb-4">
                  <item.icon size={22} />
                </div>
                <div className="font-bold text-white mb-1">{item.label}</div>
                <div className="text-slate-400 text-sm">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LATEST INSIGHTS ── */}
      {insights.length > 0 && (
        <section className="border-t border-slate-200 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-blue-600 text-xs font-bold uppercase tracking-widest mb-2">Knowledge Base</p>
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Latest Insights</h2>
              </div>
              <Link href="/insights/" className="text-slate-500 hover:text-blue-600 font-medium text-sm flex items-center gap-1">
                All articles <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              {insights.map((article: any) => (
                <Link key={article.slug?.current} href={`/insights/${article.slug?.current}/`}
                  className="group border border-slate-200 hover:border-blue-300 hover:shadow-lg rounded-2xl p-7 transition-all relative overflow-hidden bg-white">
                  <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {article.category && (
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">{article.category}</span>
                  )}
                  <h3 className="font-bold text-slate-900 mt-2 mb-3 leading-snug group-hover:text-blue-700 transition-colors">{article.title}</h3>
                  {article.excerpt && <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">{article.excerpt}</p>}
                  <div className="mt-5 text-blue-600 text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read article <ArrowRight size={13} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── EMAIL CAPTURE ── */}
      <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '28px 28px'}} />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-4">Stay Current</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight">Get Monthly Global Payroll Updates</h2>
          <p className="text-blue-100 mb-10 text-lg max-w-xl mx-auto leading-relaxed">
            Rate changes, new country data, compliance alerts, and payroll news — delivered once a month. Free.
          </p>
          <form action="/api/subscribe" method="POST"
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              name="email"
              required
              placeholder="your@email.com"
              className="flex-1 px-5 py-4 rounded-xl text-slate-800 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-white/60 bg-white font-medium"
            />
            <button type="submit"
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-4 rounded-xl transition-colors whitespace-nowrap shadow-lg">
              Subscribe free
            </button>
          </form>
          <p className="text-blue-200/70 text-xs mt-5">No spam. Unsubscribe any time. We respect your privacy.</p>
        </div>
      </section>

    </main>
  )
}
