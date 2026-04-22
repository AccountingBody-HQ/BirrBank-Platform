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

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 text-white no-underline">
          <div className="w-8 h-8 bg-green-800 rounded-lg flex items-center justify-center text-sm font-black">ብ</div>
          <span className="font-bold text-lg tracking-tight text-slate-900">BirrBank</span>
        </Link>
        <div className="hidden md:flex items-center gap-1">
          {NAV.map(item => (
            <div key={item.label} className="relative"
              onMouseEnter={() => setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}>
              <Link href={item.href}
                className={"flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors " + (pathname.startsWith(item.href) ? 'text-green-700 bg-green-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50')}>
                {item.label}
                <ChevronDown size={12} className={"transition-transform " + (openDropdown === item.label ? 'rotate-180' : '')} />
              </Link>
              {openDropdown === item.label && (
                <div className="absolute top-full left-0 mt-1 w-52 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden py-1">
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
          <Link href="/diaspora" className="text-sm text-slate-600 hover:text-slate-900 transition-colors px-3 py-2">Diaspora</Link>
          <Link href="/sign-in" className="text-sm text-slate-600 hover:text-slate-900 transition-colors px-3 py-2">Sign in</Link>
          <Link href="/sign-up" className="text-sm font-bold bg-green-700 hover:bg-green-600 text-white px-5 py-2.5 rounded-full transition-colors">Get alerts</Link>
        </div>
        <button className="md:hidden text-slate-400 hover:text-white p-2" onClick={() => setMobileOpen(!mobileOpen)}>
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
            <Link href="/sign-in" onClick={() => setMobileOpen(false)} className="flex-1 text-center text-sm text-slate-600 hover:text-slate-900 py-2">Sign in</Link>
            <Link href="/sign-up" onClick={() => setMobileOpen(false)} className="flex-1 text-center text-sm font-semibold bg-green-800 text-white py-2 rounded-lg">Get alerts</Link>
          </div>
        </div>
      )}
    </nav>
  )
}
