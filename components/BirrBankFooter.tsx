import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ background: '#0a1f14', borderTop: '1px solid #1a3a24' }}>
      <div className="max-w-6xl mx-auto px-8 py-20">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-10">

          {/* Brand column */}
          <div className="col-span-2 pr-4">
            <div className="flex items-center gap-2.5 mb-5">
              <div style={{
                background: '#1A5C38', borderRadius: 8, width: 34, height: 34,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <text x="16" y="24" textAnchor="middle" fontFamily="Arial Black, Helvetica Neue, Arial, sans-serif" fontWeight="900" fontSize="23" fill="#ffffff">B</text>
                  <rect x="13.5" y="2" width="3" height="5" rx="1.5" fill="#ffffff"/>
                  <rect x="13.5" y="25" width="3" height="5" rx="1.5" fill="#ffffff"/>
                </svg>
              </div>
              <span style={{ color: '#ffffff', fontWeight: 800, fontSize: 19, letterSpacing: '-0.5px' }}>
                BirrBank
              </span>
            </div>

            <p style={{ color: '#6b9e7e', fontSize: 14, lineHeight: 1.8, marginBottom: 20 }}>
              Ethiopia's financial operating system. Compare savings rates, track ESX markets,
              monitor commodity prices and access insurance data — free, always.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 24 }}>
              <span style={{ width: 7, height: 7, background: '#22c55e', borderRadius: '50%', display: 'inline-block' }} />
              <span style={{ color: '#6b9e7e', fontSize: 12, fontWeight: 600 }}>
                Data updated daily from official sources
              </span>
            </div>

            <div style={{ display: 'flex', gap: 8, marginBottom: 28 }}>
              {[
                { href: 'https://linkedin.com',  icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b9e7e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg> },
                { href: 'https://twitter.com',   icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b9e7e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg> },
                { href: 'https://t.me/birrbank', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b9e7e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 5L2 12.5l7 1M21 5l-2.5 14L9 13.5M21 5L9 13.5m0 0v5.5l3.5-3"/></svg> },
              ].map(({ href, icon }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer" style={{
                  width: 34, height: 34, background: '#1a3a24',
                  border: '1px solid #2d6a4f', borderRadius: 8,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none',
                }}>
                  {icon}
                </a>
              ))}
            </div>

            <div style={{ borderTop: '1px solid #1a3a24', paddingTop: 20 }}>
              <p style={{ color: '#4a7a5a', fontSize: 11, lineHeight: 1.7 }}>
                Free for every Ethiopian and the global diaspora.<br />
                No subscriptions. No paywalls. No affiliate bias.
              </p>
            </div>
          </div>

          {/* Link columns */}
          {[
            { title: 'Banking', links: [
              ['Savings Rates',   '/banking/savings-rates'],
              ['Loan Comparison', '/banking/loans'],
              ['FX Rates',        '/banking/fx-rates'],
              ['Mobile Money',    '/banking/mobile-money'],
              ['Microfinance',    '/banking/microfinance'],
              ['Money Transfer',  '/banking/money-transfer'],
            ]},
            { title: 'Markets & Data', links: [
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
            { title: 'Company', links: [
              ['About BirrBank',  '/about'],
              ['Intelligence Hub','/guides'],
              ['AI Assistant',    '/ai-assistant'],
              ['Diaspora Hub',    '/diaspora'],
              ['Regulations',     '/regulations'],
              ['Legal & Privacy', '/legal'],
            ]},
          ].map(col => (
            <div key={col.title}>
              <p style={{
                color: '#e2f5ea', fontSize: 11, fontWeight: 900,
                textTransform: 'uppercase', letterSpacing: '2px', marginBottom: 16,
              }}>
                {col.title}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {col.links.map(([label, href]) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="transition-colors hover:text-white"
                      style={{ color: '#8fbfa0', fontSize: 13, fontWeight: 500, textDecoration: 'none' }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid #1a3a24' }}>
        <div className="max-w-6xl mx-auto px-8 py-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p style={{ color: '#4a7a5a', fontSize: 12 }}>© 2026 BirrBank. All rights reserved.</p>
          <p style={{ color: '#4a7a5a', fontSize: 11, textAlign: 'center', maxWidth: 520, lineHeight: 1.6 }}>
            BirrBank provides financial information for comparison purposes only.
            Not a bank, insurer, broker or financial adviser.
            Always verify rates directly with the institution.
          </p>
          <div style={{ display: 'flex', gap: 20 }}>
            {[['About', '/about'], ['Legal', '/legal'], ['Privacy', '/privacy'], ['Contact', '/contact']].map(([l, h]) => (
              <Link
                key={l}
                href={h}
                className="transition-colors hover:text-white"
                style={{ color: '#4a7a5a', fontSize: 12, fontWeight: 500, textDecoration: 'none' }}
              >
                {l}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
