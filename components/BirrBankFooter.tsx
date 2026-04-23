import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{background:'#f0fdf4', borderTop:'1px solid #bbf7d0'}}>
      {/* Main footer body */}
      <div className="max-w-6xl mx-auto px-8 py-16">
        <div className="grid grid-cols-5 gap-10">

          {/* Brand column */}
          <div className="col-span-2 pr-8">
            <div className="flex items-center gap-2 mb-5">
              <div style={{background:'#1A5C38', borderRadius:8, width:34, height:34, display:'flex', alignItems:'center', justifyContent:'center'}}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="14" y2="18"/></svg>
              </div>
              <span style={{color:'#1A5C38', fontWeight:800, fontSize:19, letterSpacing:'-0.5px'}}>BirrBank</span>
            </div>
            <p style={{color:'#2d6a4f', fontSize:14, lineHeight:1.75, marginBottom:20}}>
              Ethiopia's financial operating system. Compare savings rates, track ESX markets, monitor commodity prices and access insurance data — free, always.
            </p>
            <div style={{display:'flex', alignItems:'center', gap:6, marginBottom:24}}>
              <span style={{width:7, height:7, background:'#22c55e', borderRadius:'50%', display:'inline-block'}}></span>
              <span style={{color:'#2d6a4f', fontSize:12, fontWeight:600}}>Data updated daily from official sources</span>
            </div>
            {/* Social icons */}
            <div style={{display:'flex', gap:10}}>
              {[
                { href:'https://linkedin.com', label:'LinkedIn', icon:'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z' },
                { href:'https://twitter.com', label:'X', icon:'M18 6L6 18M6 6l12 12' },
                { href:'https://t.me/birrbank', label:'Telegram', icon:'M21 5L2 12.5l7 1M21 5l-2.5 14L9 13.5M21 5L9 13.5m0 0v5.5l3.5-3' },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  style={{width:36, height:36, background:'#fff', border:'1px solid #bbf7d0', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', textDecoration:'none', transition:'all 0.2s'}}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background='#1A5C38'; (e.currentTarget as HTMLElement).style.borderColor='#1A5C38' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background='#fff'; (e.currentTarget as HTMLElement).style.borderColor='#bbf7d0' }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1A5C38" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    onMouseEnter={e => (e.currentTarget.style.stroke='#fff')}
                    onMouseLeave={e => (e.currentTarget.style.stroke='#1A5C38')}>
                    <path d={s.icon}/>
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {[
            { title: 'Banking', links: [['Savings Rates', '/banking/savings-rates'], ['Loan Comparison', '/banking/loans'], ['FX Rates', '/banking/fx-rates'], ['Mobile Money', '/banking/mobile-money'], ['Microfinance', '/banking/microfinance'], ['Money Transfer', '/banking/money-transfer']] },
            { title: 'Markets & Data', links: [['ESX Equities', '/markets/equities'], ['IPO Pipeline', '/markets/ipo-pipeline'], ['Bonds & T-Bills', '/markets/bonds'], ['Commodity Prices', '/commodities'], ['Coffee Prices', '/commodities/coffee'], ['FX Dashboard', '/banking/fx-rates']] },
            { title: 'Insurance', links: [['Motor Insurance', '/insurance/motor'], ['Life Insurance', '/insurance/life'], ['Health Insurance', '/insurance/health'], ['Property Insurance', '/insurance/property'], ['Claims Guide', '/insurance/claims-guide'], ['Compare Providers', '/insurance']] },
            { title: 'Company', links: [['About BirrBank', '/about'], ['Intelligence Hub', '/guides'], ['AI Assistant', '/ai-assistant'], ['Diaspora Hub', '/diaspora'], ['Regulations', '/regulations'], ['Legal & Privacy', '/legal']] },
          ].map(col => (
            <div key={col.title}>
              <p style={{color:'#1A5C38', fontSize:11, fontWeight:800, textTransform:'uppercase', letterSpacing:'2px', marginBottom:16}}>{col.title}</p>
              <ul style={{listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:10}}>
                {col.links.map(([label, href]) => (
                  <li key={href}>
                    <Link href={href} style={{color:'#2d6a4f', fontSize:13, fontWeight:500, textDecoration:'none', display:'block', transition:'color 0.15s'}}
                      onMouseEnter={e => (e.currentTarget.style.color='#1A5C38')}
                      onMouseLeave={e => (e.currentTarget.style.color='#2d6a4f')}>
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
      <div style={{borderTop:'1px solid #bbf7d0'}}>
        <div className="max-w-6xl mx-auto px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p style={{color:'#86efac', fontSize:12}}>© 2026 BirrBank. All rights reserved.</p>
          <p style={{color:'#6b9e7e', fontSize:11, textAlign:'center', maxWidth:520, lineHeight:1.6}}>
            BirrBank provides financial information for comparison purposes only. Not a bank, insurer, broker or financial adviser. Always verify rates directly with the institution before making any financial decision.
          </p>
          <div style={{display:'flex', gap:20}}>
            {[['About', '/about'], ['Legal', '/legal'], ['Privacy', '/privacy'], ['Contact', '/contact']].map(([l, h]) => (
              <Link key={l} href={h} style={{color:'#6b9e7e', fontSize:12, fontWeight:500, textDecoration:'none'}}>{l}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
