import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-12">

          {/* Brand column */}
          <div className="lg:col-span-2 lg:pr-8 lg:border-r lg:border-slate-800">
            <div className="flex items-center gap-2.5 mb-6">
              <div style={{
                background: '#1D4ED8', borderRadius: 8, width: 36, height: 36,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(29,78,216,0.4)'
              }}>
                <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <text x="16" y="24" textAnchor="middle" fontFamily="Arial Black, Helvetica Neue, Arial, sans-serif" fontWeight="900" fontSize="23" fill="#ffffff">B</text>
                  <rect x="13.5" y="2" width="3" height="5" rx="1.5" fill="#ffffff"/>
                  <rect x="13.5" y="25" width="3" height="5" rx="1.5" fill="#ffffff"/>
                </svg>
              </div>
              <div className="flex items-start">
                <span style={{ color: '#ffffff', fontWeight: 800, fontSize: 20, letterSpacing: '-0.5px', lineHeight: 1 }}>BirrBank</span>
                <span style={{ color: '#ffffff', fontWeight: 700, fontSize: 11, lineHeight: 1, marginTop: 1, marginLeft: 1 }}>®</span>
              </div>
            </div>

            <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.85, marginBottom: 24 }}>
              Ethiopia financial operating system. Free, mobile-first, covering 214 NBE-regulated institutions across banking, insurance, markets and commodities.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 28 }}>
              <span style={{ width: 7, height: 7, background: '#22c55e', borderRadius: '50%', display: 'inline-block', flexShrink: 0 }} />
              <span style={{ color: '#64748b', fontSize: 12, fontWeight: 600 }}>Data updated daily from official sources</span>
            </div>

            <div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
              {[
                { href: 'https://linkedin.com', label: 'LinkedIn', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg> },
                { href: 'https://twitter.com',   label: 'X / Twitter', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg> },
                { href: 'https://t.me/birrbank', label: 'Telegram', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 5L2 12.5l7 1M21 5l-2.5 14L9 13.5M21 5L9 13.5m0 0v5.5l3.5-3"/></svg> },
              ].map(({ href, label, icon }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} style={{
                  width: 36, height: 36, background: '#1e293b',
                  border: '1px solid #334155', borderRadius: 8,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none',
                  transition: 'border-color 0.2s',
                }}>
                  {icon}
                </a>
              ))}
            </div>

            <p style={{ color: '#475569', fontSize: 12, lineHeight: 1.7 }}>
              Free for every Ethiopian and the global diaspora.<br />
              No subscriptions. No paywalls. No affiliate bias.
            </p>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-5 gap-8 lg:pl-4">
            {[
              { title: 'Banking', links: [
                ['Savings Rates',   '/banking/savings-rates'],
                ['Loan Comparison', '/banking/loans'],
                ['FX Rates',        '/banking/fx-rates'],
                ['Mobile Money',    '/banking/mobile-money'],
                ['Microfinance',    '/banking/microfinance'],
                ['Money Transfer',  '/banking/money-transfer'],
              ]},
              { title: 'Markets', links: [
                ['ESX Equities',     '/markets/equities'],
                ['IPO Pipeline',     '/markets/ipo-pipeline'],
                ['Bonds & T-Bills',  '/markets/bonds'],
                ['Commodity Prices', '/commodities'],
                ['Coffee Prices',    '/commodities/coffee'],
                ['FX Dashboard',     '/banking/fx-rates'],
              ]},
              { title: 'Insurance', links: [
                ['Motor Insurance',    '/insurance/motor'],
                ['Life Insurance',     '/insurance/life'],
                ['Health Insurance',   '/insurance/health'],
                ['Property Insurance', '/insurance/property'],
                ['Claims Guide',       '/insurance/claims-guide'],
                ['Compare Providers',  '/insurance'],
              ]},
              { title: 'Diaspora', links: [
                ['Diaspora Hub',       '/diaspora'],
                ['Send Money Home',    '/diaspora/remittance'],
                ['Invest from Abroad', '/diaspora/invest'],
                ['Open Bank Account',  '/diaspora/bank-account'],
                ['Track ETB Rates',    '/banking/fx-rates'],
                ['IPO Pipeline',       '/markets/ipo-pipeline'],
              ]},
              { title: 'Company', links: [
                ['About BirrBank',   '/about'],
                ['Intelligence Hub', '/guides'],
                ['AI Assistant',     '/ai-assistant'],
                ['Regulations',      '/regulations'],
                ['Terms & Privacy',  '/terms'],
                ['Contact',          '/contact'],
              ]},
            ].map(col => (
              <div key={col.title}>
                <p style={{ color: '#e2e8f0', fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: 16 }}>
                  {col.title}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {col.links.map(([label, href]) => (
                    <li key={href}>
                      <Link href={href} className="transition-colors hover:text-white"
                        style={{ color: '#64748b', fontSize: 13, fontWeight: 500, textDecoration: 'none' }}>
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p style={{ color: '#475569', fontSize: 13 }}>© 2026 BirrBank<sup style={{ color: '#ffffff', fontSize: 9, verticalAlign: 'super', lineHeight: 0 }}>®</sup>. All rights reserved.</p>
          <p style={{ color: '#475569', fontSize: 12, textAlign: 'center', maxWidth: 540, lineHeight: 1.7 }}>
            BirrBank provides financial information for comparison purposes only.
            Not a bank, insurer, broker or financial adviser.
            Always verify rates directly with the institution.
          </p>
          <div style={{ display: 'flex', gap: 24 }}>
            {[['About', '/about'], ['Legal', '/terms'], ['Privacy', '/privacy-policy'], ['Contact', '/contact']].map(([l, h]) => (
              <Link key={l} href={h} className="transition-colors hover:text-white"
                style={{ color: '#475569', fontSize: 13, fontWeight: 500, textDecoration: 'none' }}>
                {l}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
