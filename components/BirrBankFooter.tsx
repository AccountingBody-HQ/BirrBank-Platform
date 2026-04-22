import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-green-800 rounded-lg flex items-center justify-center text-sm font-black text-white">ብ</div>
              <span className="font-bold text-white text-lg">BirrBank</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">Ethiopia's financial operating system. Free. Mobile-first. Bilingual.</p>
          </div>
          {[
            { title: 'Banking', links: [['Savings Rates', '/banking/savings-rates'], ['Loan Comparison', '/banking/loans'], ['FX Rates', '/banking/fx-rates'], ['Mobile Money', '/banking/mobile-money']] },
            { title: 'Markets', links: [['Listed Equities', '/markets/equities'], ['IPO Pipeline', '/markets/ipo-pipeline'], ['Bonds & T-Bills', '/markets/bonds'], ['How to Invest', '/markets/how-to-invest']] },
            { title: 'Commodities', links: [['Coffee Prices', '/commodities/coffee'], ['Sesame Prices', '/commodities/sesame'], ['Grain Prices', '/commodities/grains'], ['ECX Guide', '/commodities/ecx-guide']] },
            { title: 'Intelligence', links: [['Guides', '/guides'], ['Regulations', '/regulations'], ['AI Assistant', '/ai-assistant'], ['Diaspora Hub', '/diaspora']] },
          ].map(col => (
            <div key={col.title}>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">{col.title}</p>
              <ul className="space-y-2">
                {col.links.map(([label, href]) => (
                  <li key={href}>
                    <Link href={href} className="text-sm text-slate-400 hover:text-white transition-colors">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-600">© 2026 BirrBank. All rights reserved.</p>
          <p className="text-xs text-slate-600 text-center max-w-xl">BirrBank provides financial information for comparison purposes only. We are not a bank, insurer, broker, or financial adviser. Always verify rates directly with the institution before making any financial decision.</p>
          <div className="flex gap-4">
            <Link href="/about" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">About</Link>
            <Link href="/legal" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">Legal</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
