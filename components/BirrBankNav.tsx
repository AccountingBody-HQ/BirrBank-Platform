'use client'
import { useState } from 'react'
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
    { label: 'Guides',        href: '/guides' },
    { label: 'Regulations',   href: '/regulations' },
    { label: 'AI Assistant',  href: '/ai-assistant' },
    { label: 'Diaspora Hub',  href: '/diaspora' },
  ]},
]

export default function Navigation() {
  const pathname                        = usePathname()
  const [mobileOpen, setMobileOpen]     = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const isActive = (href: string) => pathname.startsWith(href)

  return (
    <nav
      className="sticky top-0 z-50"
      style={{ background: '#ffffff', borderBottom: '1px solid #e2e8f0' }}
    >
      <div className="max-w-6xl mx-auto px-8 flex items-center justify-between h-16">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <div style={{
            background: '#1A5C38', borderRadius: 8, width: 32, height: 32,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
              <line x1="3" y1="6"  x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="14" y2="18"/>
            </svg>
          </div>
          <span style={{ color: '#1A5C38', fontWeight: 800, fontSize: 18, letterSpacing: '-0.5px' }}>
            BirrBank
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-0.5">
          {NAV.map(item => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href={item.href}
                className="flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm transition-all"
                style={{
                  color:      isActive(item.href) ? '#1A5C38' : '#374151',
                  fontWeight: isActive(item.href) ? 700 : 500,
                  background: isActive(item.href) ? 'rgba(26,92,56,0.07)' : 'transparent',
                }}
              >
                {item.label}
                <ChevronDown
                  size={12}
                  style={{ color: isActive(item.href) ? '#1A5C38' : '#9ca3af' }}
                  className={'transition-transform ' + (openDropdown === item.label ? 'rotate-180' : '')}
                />
              </Link>

              {openDropdown === item.label && (
                <div
                  className="absolute top-full left-0 mt-1.5 w-52 rounded-xl overflow-hidden py-1.5 z-50"
                  style={{
                    background: '#ffffff',
                    border:     '1px solid #e2e8f0',
                    boxShadow:  '0 16px 40px rgba(0,0,0,0.10)',
                  }}
                >
                  {item.sub.map(s => (
                    <Link
                      key={s.href}
                      href={s.href}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-slate-50"
                      style={{ color: '#374151' }}
                    >
                      <span
                        className="w-1 h-1 rounded-full shrink-0"
                        style={{ background: '#1A5C38' }}
                      />
                      {s.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Desktop auth */}
        <div className="hidden md:flex items-center gap-2">
          <Link
            href="/sign-in"
            className="text-sm font-semibold px-4 py-2 rounded-lg transition-colors hover:bg-slate-50"
            style={{ color: '#374151' }}
          >
            Log in
          </Link>
          <Link
            href="/sign-up"
            className="text-sm font-bold px-5 py-2.5 rounded-full transition-all hover:opacity-90"
            style={{ background: '#1A5C38', color: '#fff', boxShadow: '0 2px 8px rgba(26,92,56,0.20)' }}
          >
            Get started
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg transition-colors hover:bg-slate-100"
          style={{ color: '#374151' }}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden px-6 py-4 space-y-1"
          style={{ background: '#ffffff', borderTop: '1px solid #e2e8f0' }}
        >
          {NAV.map(item => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2.5 text-sm rounded-lg transition-colors hover:bg-slate-50"
              style={{
                color:      isActive(item.href) ? '#1A5C38' : '#374151',
                fontWeight: isActive(item.href) ? 700 : 500,
              }}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-3 flex gap-3" style={{ borderTop: '1px solid #e2e8f0' }}>
            <Link
              href="/sign-in"
              onClick={() => setMobileOpen(false)}
              className="flex-1 text-center text-sm py-2.5 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
              style={{ color: '#374151' }}
            >
              Log in
            </Link>
            <Link
              href="/sign-up"
              onClick={() => setMobileOpen(false)}
              className="flex-1 text-center text-sm font-bold py-2.5 rounded-full"
              style={{ background: '#1A5C38', color: '#fff' }}
            >
              Get started
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
