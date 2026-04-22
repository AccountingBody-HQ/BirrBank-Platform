'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'

const NAV = [
  { label: 'Banking', href: '/banking', sub: [
    { label: 'Savings Rates', href: '/banking/savings-rates' },
    { label: 'Loan Comparison', href: '/banking/loans' },
    { label: 'FX Rates', href: '/banking/fx-rates' },
    { label: 'Mobile Money', href: '/banking/mobile-money' },
    { label: 'Microfinance', href: '/banking/microfinance' },
    { label: 'Money Transfer', href: '/banking/money-transfer' },
  ]},
  { label: 'Insurance', href: '/insurance', sub: [
    { label: 'Motor Insurance', href: '/insurance/motor' },
    { label: 'Life Insurance', href: '/insurance/life' },
    { label: 'Health Insurance', href: '/insurance/health' },
    { label: 'Property Insurance', href: '/insurance/property' },
    { label: 'Claims Guide', href: '/insurance/claims-guide' },
  ]},
  { label: 'Markets', href: '/markets', sub: [
    { label: 'Listed Equities', href: '/markets/equities' },
    { label: 'IPO Pipeline', href: '/markets/ipo-pipeline' },
    { label: 'Bonds & T-Bills', href: '/markets/bonds' },
    { label: 'How to Invest', href: '/markets/how-to-invest' },
  ]},
  { label: 'Commodities', href: '/commodities', sub: [
    { label: 'Coffee Prices', href: '/commodities/coffee' },
    { label: 'Sesame Prices', href: '/commodities/sesame' },
    { label: 'Grain Prices', href: '/commodities/grains' },
    { label: 'How ECX Works', href: '/commodities/ecx-guide' },
  ]},
  { label: 'Intelligence', href: '/guides', sub: [
    { label: 'Guides', href: '/guides' },
    { label: 'Regulations', href: '/regulations' },
    { label: 'AI Assistant', href: '/ai-assistant' },
    { label: 'Diaspora Hub', href: '/diaspora' },
  ]},
]

export default function Navigation() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const isHero = pathname === '/'

  return (
    <nav className={`sticky top-0 z-50 ${isHero ? 'bg-transparent absolute w-full' : 'bg-white border-b border-slate-100'}`}
      style={isHero ? {position:'absolute', width:'100%'} : {}}>
      <div className="max-w-6xl mx-auto px-8 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 no-underline">
          <div className="w-8 h-8 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={isHero ? 'white' : '#1A5C38'} strokeWidth="2.5" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="14" y2="18"/></svg>
          </div>
          <span className={`font-black text-lg tracking-tight ${isHero ? 'text-white' : 'text-slate-900'}`}>BirrBank</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {NAV.map(item => (
            <div key={item.label} className="relative"
              onMouseEnter={() => setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}>
              <Link href={item.href}
                className={"flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors " +
                  (isHero
                    ? "text-white/80 hover:text-white hover:bg-white/10"
                    : (pathname.startsWith(item.href) ? "text-green-700 bg-green-50" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"))}>
                {item.label}
                <ChevronDown size={12} className={"transition-transform " + (openDropdown === item.label ? 'rotate-180' : '')} />
              </Link>
              {openDropdown === item.label && (
                <div className="absolute top-full left-0 mt-1 w-52 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden py-1 z-50">
                  {item.sub.map(s => (
                    <Link key={s.href} href={s.href}
                      className="block px-4 py-2.5 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors">
                      {s.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/sign-in" className={"text-sm font-medium transition-colors px-3 py-2 " + (isHero ? "text-white/80 hover:text-white" : "text-slate-600 hover:text-slate-900")}>
            Log in
          </Link>
          <Link href="/sign-up" className={`text-sm font-bold px-5 py-2.5 rounded-full transition-colors ${isHero ? 'bg-white text-green-900 hover:bg-green-50' : 'bg-green-700 text-white hover:bg-green-600'}`}>
            Get started
          </Link>
        </div>

        <button className={"md:hidden p-2 " + (isHero ? "text-white" : "text-slate-600")} onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-6 py-4 space-y-1">
          {NAV.map(item => (
            <Link key={item.label} href={item.href} onClick={() => setMobileOpen(false)}
              className="block px-3 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors">
              {item.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-slate-100 flex gap-3">
            <Link href="/sign-in" onClick={() => setMobileOpen(false)} className="flex-1 text-center text-sm text-slate-600 py-2">Log in</Link>
            <Link href="/sign-up" onClick={() => setMobileOpen(false)} className="flex-1 text-center text-sm font-bold bg-green-700 text-white py-2 rounded-full">Get started</Link>
          </div>
        </div>
      )}
    </nav>
  )
}
