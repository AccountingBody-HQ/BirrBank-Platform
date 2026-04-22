import Link from 'next/link'
export const dynamic = 'force-dynamic'
import { TrendingUp, Building2, Shield, Wheat, BookOpen, Globe } from 'lucide-react'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* Hero */}
      <section className="bg-gradient-to-b from-slate-950 to-slate-900 px-6 py-20 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-green-500 mb-4">Ethiopia's Financial Operating System</p>
        <h1 className="font-serif text-5xl font-bold text-white mb-6 max-w-3xl mx-auto leading-tight">
          Every financial product in Ethiopia. One platform.
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10">
          Compare savings rates, track ESX markets, monitor ECX commodity prices, and access insurance data — free, mobile-first, bilingual.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/banking" className="bg-green-700 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            Compare Rates
          </Link>
          <Link href="/markets" className="border border-slate-600 hover:border-slate-400 text-slate-300 px-8 py-3 rounded-lg font-semibold transition-colors">
            ESX Markets
          </Link>
        </div>
      </section>

      {/* Five Pillars */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <p className="text-xs font-bold uppercase tracking-widest text-green-500 text-center mb-2">Platform Coverage</p>
        <h2 className="font-serif text-3xl font-bold text-center mb-12">Five pillars. Complete coverage.</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            { icon: Building2, label: 'Banking', desc: '32 banks · 55 MFIs · 27 payment operators · 62 transfer agencies · 13 FX bureaus', href: '/banking', color: 'text-green-400' },
            { icon: Shield, label: 'Insurance', desc: '18 insurers · Motor · Life · Health · Property · Agriculture', href: '/insurance', color: 'text-pink-400' },
            { icon: TrendingUp, label: 'Markets', desc: 'ESX equities · IPO pipeline · T-bills · Investment banks', href: '/markets', color: 'text-blue-400' },
            { icon: Wheat, label: 'Commodities', desc: 'ECX daily prices · Coffee · Sesame · Grains · Beans', href: '/commodities', color: 'text-yellow-400' },
            { icon: BookOpen, label: 'Intelligence', desc: '500+ guides · Regulations · AI assistant · Diaspora hub', href: '/guides', color: 'text-purple-400' },
          ].map(({ icon: Icon, label, desc, href, color }) => (
            <Link key={label} href={href} className="bg-slate-800 hover:bg-slate-700 rounded-xl p-6 transition-colors group">
              <Icon className={`w-8 h-8 ${color} mb-3`} />
              <h3 className="font-bold text-white mb-2">{label}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* NBE Universe */}
      <section className="bg-slate-900 px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-green-500 mb-2">The Opportunity</p>
          <h2 className="font-serif text-3xl font-bold mb-8">214 NBE-regulated entities. Zero comprehensive platform — until now.</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { count: '32', label: 'Licensed Banks' },
              { count: '18', label: 'Insurers' },
              { count: '55', label: 'Microfinance' },
              { count: '62', label: 'Money Transfer' },
            ].map(({ count, label }) => (
              <div key={label} className="bg-slate-800 rounded-xl p-6">
                <p className="font-mono text-3xl font-bold text-green-400 mb-1">{count}</p>
                <p className="text-slate-400 text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <footer className="bg-slate-950 border-t border-slate-800 px-6 py-8 text-center">
        <p className="text-slate-500 text-xs max-w-2xl mx-auto">
          BirrBank provides financial information for comparison purposes only. We are not a bank, insurer, broker, or financial adviser. Always verify rates directly with the institution before making any financial decision.
        </p>
      </footer>

    </main>
  )
}
