'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'

const NAV = [
  { label: 'Banking', href: '/banking', sub: [
    { label: 'Savings Rates',   href: '/banking/savings-rates' },
    { label: 'Loan Comparison', href: '/banking/loans' },
    { label: 'FX Rates',        href: '/banking/fx-rates' },
    { label: 'Mobile Money',    href: '/banking/mobile-money' },
    { label: 'Microfinance',    href: '/banking/microfinance' },
    { label: 'Money Transfer',  href: '/banking/money-transfer' },
  ]},
  { label: 'Insurance', href: '/insurance', sub: [
    { label: 'Motor Insurance',    href: '/insurance/motor' },
    { label: 'Life Insurance',     href: '/insurance/life' },
    { label: 'Health Insurance',   href: '/insurance/health' },
    { label: 'Property Insurance', href: '/insurance/property' },
    { label: 'Claims Guide',       href: '/insurance/claims-guide' },
  ]},
  { label: 'Markets', href: '/markets', sub: [
    { label: 'Listed Equities', href: '/markets/equities' },
    { label: 'IPO Pipeline',    href: '/markets/ipo-pipeline' },
    { label: 'Bonds & T-Bills', href: '/markets/bonds' },
    { label: 'How to Invest',   href: '/markets/how-to-invest' },
  ]},
  { label: 'Commodities', href: '/commodities', sub: [
    { label: 'Coffee Prices', href: '/commodities/coffee' },
    { label: 'Sesame Prices', href: '/commodities/sesame' },
    { label: 'Grain Prices',  href: '/commodities/grains' },
    { label: 'How ECX Works', href: '/commodities/ecx-guide' },
  ]},
  { label: 'Intelligence', href: '/guides', sub: [
    { label: 'Guides',       href: '/guides' },
    { label: 'Regulations',  href: '/regulations' },
    { label: 'AI Assistant', href: '/ai-assistant' },
  ]},
  { label: 'Diaspora', href: '/diaspora', sub: [
    { label: 'Diaspora Hub',        href: '/diaspora' },
    { label: 'Send Money Home',     href: '/diaspora/remittance' },
    { label: 'Invest from Abroad',  href: '/diaspora/invest' },
    { label: 'Open a Bank Account', href: '/diaspora/bank-account' },
    { label: 'Track ETB Rates',     href: '/banking/fx-rates' },
  ]},
]

export default function Navigation() {
  const pathname                        = usePathname()
  const [mobileOpen, setMobileOpen]     = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const navRef                          = useRef<HTMLDivElement>(null)

  const isActive = (href: string) => pathname === '/' ? href === '/' : pathname.startsWith(href)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function toggleDropdown(label: string) {
    setOpenDropdown(prev => prev === label ? null : label)
  }

  return (
    <nav
      ref={navRef}
      className="sticky top-0 z-50"
      style={{ background: '#0f172a', borderBottom: '1px solid #1e293b' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 no-underline shrink-0">
          <div style={{
            background: '#1D4ED8', borderRadius: 8, width: 34, height: 34,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(29,78,216,0.4)'
          }}>
            <svg width="18" height="18" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <text x="16" y="24" textAnchor="middle" fontFamily="Arial Black, Helvetica Neue, Arial, sans-serif" fontWeight="900" fontSize="24" fill="#ffffff">B</text>
              <rect x="13.5" y="2" width="3" height="5" rx="1.5" fill="#ffffff"/>
              <rect x="13.5" y="25" width="3" height="5" rx="1.5" fill="#ffffff"/>
            </svg>
          </div>
          <div className="flex items-start">
            <span style={{ color: '#ffffff', fontWeight: 800, fontSize: 19, letterSpacing: '-0.5px', lineHeight: 1 }}>BirrBank</span>
            <span style={{ color: '#93c5fd', fontWeight: 700, fontSize: 11, lineHeight: 1, marginTop: 1, marginLeft: 1 }}>®</span>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-0.5">
          {NAV.map(item => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href={item.href}
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm transition-all"
                style={{
                  color:      isActive(item.href) ? '#93c5fd' : '#94a3b8',
                  fontWeight: isActive(item.href) ? 700 : 500,
                  background: isActive(item.href) ? 'rgba(29,78,216,0.15)' : 'transparent',
                }}
              >
                {item.label}
                <ChevronDown
                  size={11}
                  style={{ color: isActive(item.href) ? '#93c5fd' : '#475569' }}
                  className={'transition-transform ' + (openDropdown === item.label ? 'rotate-180' : '')}
                />
              </Link>

              {openDropdown === item.label && (
                <div className="absolute left-0 w-56 z-50" style={{ top: '100%', paddingTop: '8px' }}>
                  <div style={{
                    background: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '12px',
                    boxShadow: '0 20px 48px rgba(0,0,0,0.4)',
                    padding: '6px 0',
                    overflow: 'hidden',
                  }}>
                    {item.sub.map(s => (
                      <Link
                        key={s.href}
                        href={s.href}
                        className="block px-4 py-2.5 text-sm transition-colors hover:bg-slate-700/50 hover:text-white"
                        style={{ color: '#94a3b8', fontWeight: 500 }}
                        onClick={() => setOpenDropdown(null)}
                      >
                        {s.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Search box */}
        <div className="hidden lg:flex items-center">
          <div className="flex items-center gap-2 transition-all" style={{
            padding: '9px 16px', minWidth: 210,
            background: '#1e293b', border: '1px solid #334155',
            borderRadius: 999,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              placeholder="Search banks, rates, guides..."
              className="bg-transparent outline-none w-full placeholder-slate-500 text-slate-300"
              style={{ fontSize: 13, fontWeight: 500 }}
            />
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 rounded-lg transition-colors hover:bg-slate-800"
          style={{ color: '#94a3b8' }}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden px-6 py-4 space-y-1" style={{ background: '#0f172a', borderTop: '1px solid #1e293b' }}>
          {NAV.map(item => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2.5 text-sm rounded-lg transition-colors hover:bg-slate-800"
              style={{
                color:      isActive(item.href) ? '#93c5fd' : '#94a3b8',
                fontWeight: isActive(item.href) ? 700 : 500,
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
