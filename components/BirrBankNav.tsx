'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'

type NavProps = { institutionCounts?: Record<string, number> }

function MobileSection({ item, onClose }: { item: { label: string; href: string; sub: { label: string; href: string; desc: string }[] }; onClose: () => void }) {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-3 py-2.5 text-sm font-medium rounded-lg transition-all"
        style={{ color: '#94a3b8' }}
      >
        {item.label}
        <ChevronDown size={14} className={'transition-transform ' + (open ? 'rotate-180' : '')} />
      </button>
      {open && (
        <div className="ml-3 pl-3 mb-1" style={{ borderLeft: '1px solid #1e293b' }}>
          {item.sub.map(s => (
            <Link key={s.href} href={s.href} onClick={onClose}
              className="flex flex-col px-3 py-2 rounded-lg transition-all group"
              style={{ color: '#94a3b8' }}>
              <span className="text-sm font-medium group-hover:text-white transition-colors">{s.label}</span>
              <span className="text-xs mt-0.5" style={{ color: '#475569' }}>{s.desc}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Navigation({ institutionCounts = {} }: NavProps) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const c = institutionCounts
  const totalInstitutions = Object.values(c).reduce((a, b) => a + b, 0)

  const NAV = [
    { label: 'Banking', href: '/banking', sub: [
      { label: 'Savings Rates',   href: '/banking/savings-rates',  desc: 'Compare all 32 banks' },
      { label: 'Loan Comparison', href: '/banking/loans',          desc: 'Rates and terms' },
      { label: 'FX Rates',        href: '/banking/fx-rates',       desc: 'NBE official rates' },
      { label: 'Mobile Money',    href: '/banking/mobile-money',   desc: 'Payment operators' },
      { label: 'Microfinance',    href: '/banking/microfinance',   desc: `${c.microfinance || 58} MFIs covered` },
      { label: 'Money Transfer',  href: '/banking/money-transfer', desc: 'Remittance comparison' },
    ]},
    { label: 'Institutions', href: '/institutions', sub: [
      { label: 'All Institutions',    href: '/institutions#registry',             desc: `${totalInstitutions || 222} NBE-regulated entities` },
      { label: 'Banks',               href: '/institutions?type=bank#registry',    desc: `${c.bank || 32} licensed commercial banks` },
      { label: 'Microfinance',        href: '/institutions?type=microfinance#registry', desc: `${c.microfinance || 58} MFIs nationwide` },
      { label: 'Payment Operators',   href: '/institutions?type=payment_operator#registry', desc: 'Mobile money and wallets' },
      { label: 'FX Bureaux',          href: '/institutions?type=fx_bureau#registry', desc: `${c.fx_bureau || 13} independent bureaux` },
      { label: 'Money Transfer',      href: '/institutions?type=money_transfer#registry', desc: `${c.money_transfer || 65} remittance agencies` },
      { label: 'Insurance Companies', href: '/institutions?type=insurer#registry', desc: `${c.insurer || 18} licensed insurers` },
    ]},
    { label: 'Insurance', href: '/insurance', sub: [
      { label: 'Motor Insurance',    href: '/insurance/motor',        desc: 'Compare all providers' },
      { label: 'Life Insurance',     href: '/insurance/life',         desc: '18 insurers' },
      { label: 'Health Insurance',   href: '/insurance/health',       desc: 'Individual and group' },
      { label: 'Property Insurance', href: '/insurance/property',     desc: 'Home and commercial' },
      { label: 'Travel Insurance',    href: '/insurance/travel',       desc: 'International and domestic' },
      { label: 'Claims Guide',       href: '/insurance/claims-guide', desc: 'How to claim' },
    ]},
    { label: 'Markets', href: '/markets', sub: [
      { label: 'Listed Equities', href: '/markets/equities',      desc: 'ESX listed companies' },
      { label: 'IPO Pipeline',    href: '/markets/ipo-pipeline',  desc: '45+ in pipeline' },
      { label: 'Bonds & T-Bills', href: '/markets/bonds',         desc: 'Debt instruments' },
      { label: 'How to Invest',   href: '/markets/how-to-invest', desc: 'Beginner guide' },
    ]},
    { label: 'Commodities', href: '/commodities', sub: [
      { label: 'Coffee Prices', href: '/commodities/coffee',    desc: 'ECX daily prices' },
      { label: 'Sesame Prices', href: '/commodities/sesame',    desc: 'Grade by grade' },
      { label: 'Grain Prices',  href: '/commodities/grains',    desc: 'All grains' },
      { label: 'How ECX Works', href: '/commodities/ecx-guide', desc: 'Exchange explained' },
    ]},
    { label: 'Intelligence', href: '/guides', sub: [
      { label: 'Guides',       href: '/guides',       desc: '500+ financial guides' },
      { label: 'Regulations',  href: '/regulations',  desc: 'NBE directives' },
      { label: 'AI Assistant', href: '/ai-assistant', desc: 'Ask any question' },
    ]},
    { label: 'Diaspora', href: '/diaspora', sub: [
      { label: 'Diaspora Hub',        href: '/diaspora',              desc: 'Everything for diaspora' },
      { label: 'Send Money Home',     href: '/diaspora/remittance',   desc: 'Best transfer rates' },
      { label: 'Invest from Abroad',  href: '/diaspora/invest',       desc: 'ESX and property' },
      { label: 'Open a Bank Account', href: '/diaspora/bank-account', desc: 'SWIFT-enabled banks' },
      { label: 'Track ETB Rates',     href: '/banking/fx-rates',      desc: 'Live FX dashboard' },
    ]},
  ]

  const isActive = (href: string) => pathname === '/' ? href === '/' : pathname.startsWith(href)

  return (
    <header className="sticky top-0 z-50 w-full" style={{ background: 'rgba(15,23,42,0.97)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #1e293b' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center gap-6">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 mr-4">
            <div style={{ background: '#1D4ED8', borderRadius: 8, width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(29,78,216,0.4)' }}>
              <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
                <text x="16" y="24" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="24" fill="#ffffff">B</text>
                <rect x="13.5" y="2" width="3" height="5" rx="1.5" fill="#ffffff"/>
                <rect x="13.5" y="25" width="3" height="5" rx="1.5" fill="#ffffff"/>
              </svg>
            </div>
            <div className="flex items-start">
              <span style={{ color: '#ffffff', fontWeight: 800, fontSize: 19, letterSpacing: '-0.5px', lineHeight: 1 }}>BirrBank</span>
              <span style={{ color: '#ffffff', fontWeight: 700, fontSize: 11, lineHeight: 1, marginTop: 1, marginLeft: 1 }}>®</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5 flex-1">
            {NAV.map(item => (
              <div key={item.label} className="relative"
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}>
                <Link href={item.href}
                  className={'flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-lg transition-all ' + (isActive(item.href) ? 'text-white bg-white/10' : 'text-slate-400 hover:text-white hover:bg-white/5')}
                >
                  {item.label} <ChevronDown size={12} className={'transition-transform ' + (openDropdown === item.label ? 'rotate-180' : '')} />
                </Link>
                {openDropdown === item.label && (
                  <div className="absolute left-0 top-full pt-2 w-64 z-50 dropdown-slide">
                    <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 12, boxShadow: '0 20px 48px rgba(0,0,0,0.5)', padding: '6px 0' }}>
                      {item.sub.map(s => (
                        <Link key={s.href} href={s.href}
                          className="block px-4 py-2.5 hover:bg-slate-800 transition-colors"
                          onClick={() => setOpenDropdown(null)}>
                          <p className="text-sm font-semibold text-white">{s.label}</p>
                          <p className="text-xs text-slate-400 mt-0.5">{s.desc}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Search */}
          <div className="hidden lg:flex items-center">
            <div className="flex items-center gap-2" style={{ padding: '9px 16px', minWidth: 210, background: '#1e293b', border: '1px solid #334155', borderRadius: 999 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input type="text" placeholder="Search banks, rates, guides..."
                className="bg-transparent outline-none w-full placeholder-slate-500 text-slate-300"
                style={{ fontSize: 13, fontWeight: 500 }} />
            </div>
          </div>

          {/* Mobile button */}
          <button className="lg:hidden ml-auto p-2 rounded-lg transition-all" style={{ color: '#94a3b8' }}
            onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden" style={{ background: '#0f172a', borderTop: '1px solid #1e293b' }}>
          {/* Mobile search */}
          <div className="px-4 py-3" style={{ borderBottom: '1px solid #1e293b' }}>
            <div className="flex items-center gap-2" style={{ padding: '10px 14px', background: '#1e293b', border: '1px solid #334155', borderRadius: 10 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input type="text" placeholder="Search banks, rates, guides..."
                className="bg-transparent outline-none w-full placeholder-slate-500 text-slate-300"
                style={{ fontSize: 13 }} />
            </div>
          </div>
          {/* Nav sections */}
          <nav className="px-2 py-2">
            {NAV.map(item => (
              <MobileSection key={item.label} item={item} onClose={() => setMobileOpen(false)} />
            ))}
          </nav>
          {/* Bottom CTA */}
          <div className="px-4 py-4" style={{ borderTop: '1px solid #1e293b' }}>
            <Link href="/banking/savings-rates"
              className="block w-full text-center font-bold text-white rounded-xl py-3 transition-all"
              style={{ background: '#1D4ED8', fontSize: 14 }}
              onClick={() => setMobileOpen(false)}>
              Compare savings rates
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
