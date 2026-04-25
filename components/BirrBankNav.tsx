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

  // Close dropdown when clicking outside
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
      style={{
        background: '#ffffff',
        borderBottom: '2px solid #cbd5e1',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
      }}
    >
      <div className="max-w-6xl mx-auto px-8 flex items-center justify-between h-16">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 no-underline shrink-0">
          <div style={{
            background: '#1D4ED8',
            borderRadius: 8,
            width: 34,
            height: 34,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(26,92,56,0.25)'
          }}>
            <svg width="18" height="18" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <text x="16" y="24" textAnchor="middle" fontFamily="Arial Black, Helvetica Neue, Arial, sans-serif" fontWeight="900" fontSize="24" fill="#ffffff">B</text>
              <rect x="13.5" y="2" width="3" height="5" rx="1.5" fill="#ffffff"/>
              <rect x="13.5" y="25" width="3" height="5" rx="1.5" fill="#ffffff"/>
            </svg>
          </div>
          <div className="flex items-start">
            <span style={{ color: '#1D4ED8', fontWeight: 800, fontSize: 19, letterSpacing: '-0.5px', lineHeight: 1 }}>
              BirrBank
            </span>
            <span style={{ color: '#1D4ED8', fontWeight: 700, fontSize: 11, lineHeight: 1, marginTop: 1, marginLeft: 1 }}>®</span>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-0.5">
          {NAV.map(item => (
            <div
              key={item.label}
              className="relative"
            >
              <div className="flex items-center">
                <Link
                  href={item.href}
                  className="flex items-center px-3 py-2 rounded-l-lg text-sm transition-all"
                  style={{
                    color:      isActive(item.href) ? '#1D4ED8' : '#0f172a',
                    fontWeight: isActive(item.href) ? 700 : 600,
                    background: isActive(item.href) ? 'rgba(29,78,216,0.08)' : 'transparent',
                  }}
                  onClick={() => setOpenDropdown(null)}
                >
                  {item.label}
                </Link>
                <button
                  onClick={() => toggleDropdown(item.label)}
                  className="flex items-center px-1 py-2 rounded-r-lg text-sm transition-all"
                  style={{
                    background: isActive(item.href) ? 'rgba(29,78,216,0.08)' : 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    paddingRight: '8px',
                  }}
                >
                  <ChevronDown
                    size={11}
                    style={{ color: isActive(item.href) ? '#1D4ED8' : '#64748b' }}
                    className={'transition-transform ' + (openDropdown === item.label ? 'rotate-180' : '')}
                  />
                </button>
              </div>

              {openDropdown === item.label && (
                <div
                  className="absolute left-0 w-56 z-50"
                  style={{ top: 'calc(100% + 4px)' }}
                >
                  <div style={{
                    background: '#ffffff',
                    border: '1.5px solid #e2e8f0',
                    borderRadius: '12px',
                    boxShadow: '0 20px 48px rgba(0,0,0,0.14)',
                    padding: '6px 0',
                    overflow: 'hidden',
                  }}>
                    {item.sub.map(s => (
                      <Link
                        key={s.href}
                        href={s.href}
                        className="block px-4 py-2.5 text-sm transition-colors hover:bg-slate-50 hover:text-blue-700"
                        style={{ color: '#1e293b', fontWeight: 500 }}
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
          <div
            className="flex items-center gap-2 transition-all"
            style={{
              padding: '9px 16px',
              minWidth: 210,
              background: '#ffffff',
              border: '1.5px solid #94a3b8',
              borderRadius: 999,
              boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.06)'
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              placeholder="Search banks, rates, guides..."
              className="bg-transparent outline-none text-slate-700 placeholder-slate-400 w-full"
              style={{ fontSize: 13, fontWeight: 500 }}
            />
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 rounded-lg transition-colors hover:bg-slate-100"
          style={{ color: '#1e293b' }}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="lg:hidden px-6 py-4 space-y-1"
          style={{ background: '#ffffff', borderTop: '1.5px solid #e2e8f0' }}
        >
          {NAV.map(item => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2.5 text-sm rounded-lg transition-colors hover:bg-white"
              style={{
                color:      isActive(item.href) ? '#1D4ED8' : '#1e293b',
                fontWeight: isActive(item.href) ? 700 : 600,
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
