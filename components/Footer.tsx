// ============================================
// GLOBALPAYROLLEXPERT — FOOTER COMPONENT
// ============================================

import Link from 'next/link'
import { Globe } from 'lucide-react'

const footerLinks = {
  'Country Data': [
    { label: 'All Countries', href: '/countries/' },
    { label: 'Compare Countries', href: '/compare/' },
    { label: 'Payroll Tools', href: '/payroll-tools/' },
    { label: 'Global Calculator', href: '/payroll-tools/global-calculator/' },
  ],
  'Employer Guides': [
    { label: 'EOR Intelligence', href: '/eor/' },
    { label: 'HR Compliance', href: '/hr-compliance/' },
    { label: 'Insights', href: '/insights/' },
    { label: 'AI Assistant', href: '/ai-assistant/' },
  ],
  'Account': [
    { label: 'Pricing', href: '/pricing/' },
    { label: 'Sign In', href: '/sign-in/' },
    { label: 'Sign Up', href: '/sign-up/' },
    { label: 'Dashboard', href: '/dashboard/' },
  ],
  'Company': [
    { label: 'About', href: '/about/' },
    { label: 'Contact', href: '/contact/' },
    { label: 'Privacy Policy', href: '/privacy-policy/' },
    { label: 'Terms', href: '/terms/' },
    { label: 'Disclaimer', href: '/disclaimer/' },
  ],
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">

        {/* TOP SECTION */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">

          {/* BRAND */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Globe className="h-6 w-6 text-blue-400" />
              <span className="text-base font-bold text-white tracking-tight">
                GlobalPayrollExpert
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 max-w-xs">
              World-class global payroll and HR intelligence. Covering employer
              obligations, tax data, and compliance for every country.
            </p>
          </div>

          {/* LINK COLUMNS */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3">
                {heading}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* BOTTOM SECTION */}
        <div className="mt-12 border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © {currentYear} GlobalPayrollExpert.com — All rights reserved.
          </p>
          <p className="text-xs text-slate-500 text-center sm:text-right max-w-md">
            Data is provided for reference purposes only and does not constitute
            professional legal, tax, or payroll advice. Always verify with a
            qualified local adviser.{' '}
            <Link href="/disclaimer/" className="underline hover:text-slate-300 transition-colors">
              Read our disclaimer.
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}