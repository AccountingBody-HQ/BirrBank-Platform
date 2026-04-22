import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{background:'#163300'}}>
      <div className="max-w-6xl mx-auto px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <rect width="28" height="28" rx="6" fill="rgba(255,255,255,0.1)"/>
                <path d="M6 8h16M6 14h16M6 20h10" stroke="#9ef07a" strokeWidth="2.2" strokeLinecap="round"/>
              </svg>
              <span style={{color:'#9ef07a'}} className="font-black text-lg tracking-tight">BirrBank</span>
            </div>
            <p style={{color:'rgba(158,240,122,0.6)'}} className="text-sm leading-relaxed">
              Ethiopia's financial operating system. Free. Mobile-first. Bilingual.
            </p>
          </div>

          {[
            { title: 'Banking', links: [['Savings Rates', '/banking/savings-rates'], ['Loan Comparison', '/banking/loans'], ['FX Rates', '/banking/fx-rates'], ['Mobile Money', '/banking/mobile-money']] },
            { title: 'Markets', links: [['Listed Equities', '/markets/equities'], ['IPO Pipeline', '/markets/ipo-pipeline'], ['Bonds & T-Bills', '/markets/bonds'], ['How to Invest', '/markets/how-to-invest']] },
            { title: 'Commodities', links: [['Coffee Prices', '/commodities/coffee'], ['Sesame Prices', '/commodities/sesame'], ['Grain Prices', '/commodities/grains'], ['ECX Guide', '/commodities/ecx-guide']] },
            { title: 'Intelligence', links: [['Guides', '/guides'], ['Regulations', '/regulations'], ['AI Assistant', '/ai-assistant'], ['Diaspora Hub', '/diaspora']] },
          ].map(col => (
            <div key={col.title}>
              <p style={{color:'rgba(158,240,122,0.5)'}} className="text-xs font-bold uppercase tracking-widest mb-3">{col.title}</p>
              <ul className="space-y-2">
                {col.links.map(([label, href]) => (
                  <li key={href}>
                    <Link href={href}
                      style={{color:'#9ef07a'}}
                      className="text-sm font-medium hover:opacity-70 transition-opacity">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{borderTop:'1px solid rgba(158,240,122,0.15)'}}>
          <p style={{color:'rgba(158,240,122,0.4)'}} className="text-xs">© 2026 BirrBank. All rights reserved.</p>
          <p style={{color:'rgba(158,240,122,0.4)'}} className="text-xs text-center max-w-xl leading-relaxed">
            BirrBank provides financial information for comparison purposes only. Not a bank, insurer, broker or financial adviser. Always verify rates directly with the institution.
          </p>
          <div className="flex gap-5">
            <Link href="/about" style={{color:'rgba(158,240,122,0.5)'}} className="text-xs hover:opacity-100 transition-opacity">About</Link>
            <Link href="/legal" style={{color:'rgba(158,240,122,0.5)'}} className="text-xs hover:opacity-100 transition-opacity">Legal</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
