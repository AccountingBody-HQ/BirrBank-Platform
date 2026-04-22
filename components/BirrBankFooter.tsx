import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{background:'#f5f5f5', borderTop:'1px solid #e8e8e8'}}>
      <div className="max-w-6xl mx-auto px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div style={{background:'#1A5C38', borderRadius:8, width:32, height:32, display:'flex', alignItems:'center', justifyContent:'center'}}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="14" y2="18"/></svg>
              </div>
              <span style={{color:'#1A5C38', fontWeight:800, fontSize:17, letterSpacing:'-0.4px'}}>BirrBank</span>
            </div>
            <p style={{color:'#555', fontSize:13, lineHeight:1.7}}>
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
              <p style={{color:'#999', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'1.5px', marginBottom:12}}>{col.title}</p>
              <ul style={{listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:8}}>
                {col.links.map(([label, href]) => (
                  <li key={href}>
                    <Link href={href} style={{color:'#1A5C38', fontSize:13, fontWeight:500, textDecoration:'none', opacity:1}}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{borderTop:'1px solid #e0e0e0', paddingTop:28, display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:16}}>
          <p style={{color:'#999', fontSize:11}}>© 2026 BirrBank. All rights reserved.</p>
          <p style={{color:'#999', fontSize:11, textAlign:'center', maxWidth:480, lineHeight:1.6}}>
            Financial information for comparison only. Not a bank, insurer, broker or financial adviser. Always verify rates directly with the institution.
          </p>
          <div style={{display:'flex', gap:20}}>
            <Link href="/about" style={{color:'#1A5C38', fontSize:12, fontWeight:500, textDecoration:'none'}}>About</Link>
            <Link href="/legal" style={{color:'#1A5C38', fontSize:12, fontWeight:500, textDecoration:'none'}}>Legal</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
