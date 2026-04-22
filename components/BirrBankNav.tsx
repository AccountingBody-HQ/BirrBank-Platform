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
    <nav style={{background:'#163300'}} className="sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-8 flex items-center justify-between h-16">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 no-underline">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect width="28" height="28" rx="6" fill="rgba(255,255,255,0.1)"/>
            <path d="M6 8h16M6 14h16M6 20h10" stroke="#9ef07a" strokeWidth="2.2" strokeLinecap="round"/>
          </svg>
          <span style={{color:'#9ef07a'}} className="font-black text-lg tracking-tight">BirrBank</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV.map(item => (
            <div key={item.label} className="relative"
              onMouseEnter={() => setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}>
              <Link href={item.href}
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-colors"
                style={{color: pathname.startsWith(item.href) ? '#9ef07a' : '#7ec86a', opacity: pathname.startsWith(item.href) ? 1 : 0.85}}>
                {item.label}
                <ChevronDown size={12} className={"transition-transform " + (openDropdown === item.label ? 'rotate-180' : '')} />
              </Link>
              {openDropdown === item.label && (
                <div className="absolute top-full left-0 mt-1 w-52 rounded-xl overflow-hidden py-1 z-50"
                  style={{background:'#1f4700', border:'1px solid rgba(158,240,122,0.15)', boxShadow:'0 16px 40px rgba(0,0,0,0.3)'}}>
                  {item.sub.map(s => (
                    <Link key={s.href} href={s.href}
                      className="block px-4 py-2.5 text-sm font-medium transition-colors"
                      style={{color:'#9ef07a'}}
                      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(158,240,122,0.08)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                      {s.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/sign-in"
            className="text-sm font-semibold px-3 py-2 transition-colors"
            style={{color:'#7ec86a'}}>
            Log in
          </Link>
          <Link href="/sign-up"
            className="text-sm font-bold px-5 py-2.5 rounded-full transition-colors"
            style={{background:'transparent', border:'1.5px solid #9ef07a', color:'#9ef07a'}}>
            Get started
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden p-2" style={{color:'#9ef07a'}} onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden px-6 py-4 space-y-1" style={{background:'#1f4700', borderTop:'1px solid rgba(158,240,122,0.1)'}}>
          {NAV.map(item => (
            <Link key={item.label} href={item.href} onClick={() => setMobileOpen(false)}
              className="block px-3 py-2.5 text-sm font-semibold rounded-lg transition-colors"
              style={{color:'#9ef07a'}}>
              {item.label}
            </Link>
          ))}
          <div className="pt-3 flex gap-3" style={{borderTop:'1px solid rgba(158,240,122,0.1)'}}>
            <Link href="/sign-in" onClick={() => setMobileOpen(false)}
              className="flex-1 text-center text-sm py-2 font-semibold"
              style={{color:'#9ef07a'}}>Log in</Link>
            <Link href="/sign-up" onClick={() => setMobileOpen(false)}
              className="flex-1 text-center text-sm font-bold py-2 rounded-full"
              style={{border:'1.5px solid #9ef07a', color:'#9ef07a'}}>Get started</Link>
          </div>
        </div>
      )}
    </nav>
  )
}
