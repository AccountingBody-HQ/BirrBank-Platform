import Link from 'next/link'
export const dynamic = 'force-dynamic'

const RATES = [
  { rank: 1, bank: 'Awash Bank', product: '12-month fixed', rate: '9.50', badge: 'Highest rate' },
  { rank: 2, bank: 'Zemen Bank', product: '12-month fixed', rate: '9.25', badge: null },
  { rank: 3, bank: 'Bank of Abyssinia', product: '12-month fixed', rate: '9.00', badge: null },
  { rank: 4, bank: 'Dashen Bank', product: 'Savings account', rate: '8.75', badge: null },
  { rank: 5, bank: 'Oromia International', product: 'Savings account', rate: '8.50', badge: null },
]

const TICKER = [
  { label: 'USD/ETB', value: '156.40', up: true, change: '+0.3%' },
  { label: 'Coffee Grade A', value: 'ETB 43,200', up: true, change: '+1.8%' },
  { label: 'Sesame White', value: 'ETB 28,500', up: true, change: '+0.6%' },
  { label: 'Best savings rate', value: '9.50%', up: true, change: 'Awash Bank' },
  { label: 'White Wheat', value: 'ETB 7,100', up: false, change: '-0.4%' },
  { label: 'GBP/ETB', value: '198.20', up: true, change: '+0.2%' },
  { label: 'WGAGN (Wegagen)', value: 'ETB 42.50', up: true, change: '+3.2%' },
  { label: 'SAR/ETB', value: '41.70', up: false, change: '-0.1%' },
]

const PILLARS = [
  { label: 'Banking', stat: 'Up to 9.50% p.a.', href: '/banking', desc: '32 banks · 55 MFIs · 27 payment operators · 62 transfer agencies' },
  { label: 'Insurance', stat: 'First in Ethiopia', href: '/insurance', desc: '18 providers · Motor · Life · Health · Property · Agricultural' },
  { label: 'Markets', stat: '45+ IPOs in pipeline', href: '/markets', desc: 'ESX equities · IPO pipeline · T-bill yields · Investment banks' },
  { label: 'Commodities', stat: 'Live ECX data', href: '/commodities', desc: 'ECX daily prices · Coffee · Sesame · Grains · Beans · History' },
  { label: 'Intelligence', stat: '500+ guides', href: '/guides', desc: 'Guides · Regulations · AI assistant · Diaspora hub · News' },
]

const METRICS = [
  { value: '9.50%', label: 'Best savings rate' },
  { value: '156.4', label: 'USD / ETB today' },
  { value: '214', label: 'Institutions tracked' },
  { value: '45+', label: 'IPOs in pipeline' },
]

const PILLAR_ICONS: Record<string, React.ReactNode> = {
  Banking: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A5C38" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="3"/><line x1="2" y1="10" x2="22" y2="10"/></svg>,
  Insurance: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A5C38" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Markets: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A5C38" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  Commodities: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A5C38" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22V12M12 12C12 6 7 4 7 4s5 2 5 8z"/><path d="M12 12C12 6 17 4 17 4s-5 2-5 8z"/><line x1="8" y1="22" x2="16" y2="22"/></svg>,
  Intelligence: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A5C38" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Live ticker */}
      <div className="overflow-hidden" style={{background:'#0a1f0f', borderBottom:'1px solid rgba(26,92,56,0.4)'}}>
        <div className="flex items-center" style={{height:36}}>
          <div className="flex items-center gap-2 px-5 shrink-0" style={{background:'#1A5C38', height:'100%'}}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{boxShadow:'0 0 0 3px rgba(52,211,153,0.3)'}}></span>
            <span className="text-xs font-black uppercase tracking-widest" style={{color:'#fff', letterSpacing:'2px'}}>Live</span>
          </div>
          <div className="flex items-center gap-10 px-6 overflow-x-auto" style={{scrollbarWidth:'none'}}>
            {TICKER.map((t, i) => (
              <span key={i} className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-medium" style={{color:'rgba(255,255,255,0.45)'}}>{t.label}</span>
                <span className="text-xs font-mono font-bold" style={{color:'#fff'}}>{t.value}</span>
                <span className={`text-xs font-bold ${t.up ? 'text-emerald-400' : 'text-red-400'}`}>{t.change}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="relative bg-white overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 pointer-events-none" style={{background:'radial-gradient(ellipse 800px 400px at 50% -80px,rgba(26,92,56,0.07) 0%,transparent 70%)'}} />
        <div className="relative max-w-6xl mx-auto px-8 pt-24 pb-24">
          <div className="grid grid-cols-2 gap-16 items-start">
            <div>
              <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 text-xs text-slate-600 font-semibold mb-8 tracking-wide">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                214 NBE-regulated institutions · Free forever
              </div>
              <h1 className="font-serif font-bold text-slate-950 leading-none mb-8" style={{fontSize:'64px', letterSpacing:'-2.5px', lineHeight:'1.02'}}>
                The smartest<br/>way to manage<br/>money in<br/><span className="text-green-700">Ethiopia</span>
              </h1>
              <p className="text-lg text-slate-500 leading-relaxed mb-10 max-w-sm">
                Compare every bank, insurer and investment. Live commodity and ESX market data. All free, always.
              </p>
              <div className="flex gap-3 mb-12">
                <Link href="/banking/savings-rates" className="bg-green-800 hover:bg-green-700 text-white font-bold rounded-full transition-colors" style={{fontSize:'16px', padding:'16px 34px', boxShadow:'0 4px 20px rgba(26,92,56,0.3)'}}>
                  Compare savings rates
                </Link>
                <Link href="/markets" className="border-2 border-green-200 text-green-800 hover:border-green-400 font-semibold rounded-full transition-colors" style={{fontSize:'16px', padding:'16px 30px'}}>
                  ESX markets
                </Link>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {['#1A5C38','#2d6a4f','#40916c','#52b788','#74c69d'].map((c,i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold" style={{background:c}}>{String.fromCharCode(65+i)}</div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">Trusted by thousands</p>
                  <p className="text-xs text-slate-500">across Ethiopia and the diaspora</p>
                </div>
                <div className="ml-2 pl-4 border-l border-slate-200">
                  <p className="text-xs text-slate-500 font-medium">Data sourced from</p>
                  <p className="text-sm font-black text-slate-800 tracking-tight">NBE · ESX · ECX</p>
                </div>
              </div>
            </div>

            {/* Live rates card */}
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl" style={{background:'radial-gradient(ellipse at center,rgba(26,92,56,0.08) 0%,transparent 70%)'}} />
              <div className="relative bg-white rounded-2xl border border-slate-200 overflow-hidden" style={{boxShadow:'0 24px 64px rgba(0,0,0,0.08),0 4px 16px rgba(0,0,0,0.04)'}}>
                <div className="bg-white border-b border-slate-100 px-5 py-4 flex justify-between items-center">
                  <div>
                    <p className="text-xs font-black text-green-600 uppercase tracking-widest mb-0.5">Live data</p>
                    <p className="text-slate-900 font-bold text-base">Top savings rates today</p>
                  </div>
                  <div className="flex items-center gap-2 bg-green-50 rounded-full px-3 py-1.5">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full" style={{boxShadow:'0 0 0 3px rgba(52,211,153,0.3)'}}></span>
                    <span className="text-green-700 text-xs font-bold">Live</span>
                  </div>
                </div>
                <div className="divide-y divide-slate-50">
                  {RATES.map((r) => (
                    <div key={r.rank} className={`flex items-center gap-4 ${r.rank === 1 ? 'bg-green-50' : 'bg-white'}`} style={{padding:'18px 24px'}}>
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black shrink-0 ${r.rank === 1 ? 'bg-green-800 text-white' : 'bg-slate-100 text-slate-500'}`}>
                        {r.rank === 1 ? (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        ) : r.rank}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-bold text-sm truncate ${r.rank === 1 ? 'text-green-900' : 'text-slate-800'}`}>{r.bank}</p>
                        <p className={`text-xs mt-0.5 ${r.rank === 1 ? 'text-green-600 font-bold uppercase tracking-wide' : 'text-slate-400'}`}>{r.badge || r.product}</p>
                      </div>
                      <div className={`font-mono font-black text-right ${r.rank === 1 ? 'text-green-700 text-2xl' : 'text-slate-900 text-xl'}`} style={{letterSpacing:'-1px'}}>{r.rate}%</div>
                    </div>
                  ))}
                </div>
                <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
                  <p className="text-xs text-slate-400">Verified from official bank websites</p>
                  <Link href="/banking/savings-rates" className="text-xs font-bold transition-colors" style={{color:'#1A5C38'}}>See all 32 banks →</Link>
                </div>
              </div>
            </div>
          </div>

          {/* Metric pills */}
          <div className="grid grid-cols-4 gap-4 mt-14 pt-10 border-t border-slate-100">
            {METRICS.map((m) => (
              <div key={m.label} className="bg-white rounded-2xl border border-slate-200 text-center" style={{padding:'24px 20px', boxShadow:'0 2px 16px rgba(0,0,0,0.04)'}}>
                <p className="font-mono font-black text-slate-900 leading-none mb-2" style={{fontSize:'36px', letterSpacing:'-2px'}}>{m.value}</p>
                <p className="font-semibold uppercase tracking-widest" style={{fontSize:'11px', color:'#94a3b8'}}>{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Five identical pillars */}
      <section className="border-b border-slate-100" style={{background:'#f8faf8', padding:'80px 32px'}}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Full market coverage</p>
            <h2 className="font-serif font-bold text-slate-950" style={{fontSize:'40px', letterSpacing:'-1.5px'}}>Everything in Ethiopia's financial market</h2>
          </div>
          <div className="grid grid-cols-5 gap-4">
            {PILLARS.map((p) => (
              <Link key={p.label} href={p.href} className="group bg-white rounded-2xl border border-slate-200 hover:border-green-300 hover:shadow-xl transition-all duration-200 flex flex-col" style={{padding:'28px 24px', boxShadow:'0 2px 20px rgba(0,0,0,0.05)'}}>
                <div className="bg-slate-50 rounded-xl flex items-center justify-center group-hover:bg-green-50 transition-colors shrink-0" style={{width:'48px', height:'48px', marginBottom:'20px'}}>
                  {PILLAR_ICONS[p.label]}
                </div>
                <p className="font-bold text-slate-900 mb-2 tracking-tight" style={{fontSize:'15px'}}>{p.label}</p>
                <p className="text-slate-500 leading-relaxed flex-1" style={{fontSize:'12px', lineHeight:'1.7', marginBottom:'20px'}}>{p.desc}</p>
                <div className="flex items-center gap-1.5 text-xs text-slate-600 font-semibold mt-auto group-hover:text-slate-900 transition-colors">
                  <span>{p.stat}</span>
                  <svg className="group-hover:translate-x-0.5 transition-transform text-green-600" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1A5C38" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust signals */}
      <section className="bg-white border-b border-slate-100" style={{padding:'72px 32px'}}>
        <div className="max-w-6xl mx-auto grid grid-cols-3 gap-12 text-center">
          {[
            { title: 'NBE verified data', desc: 'All institution data sourced directly from the National Bank of Ethiopia registry and official bank websites.', path: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M9 12l2 2 4-4' },
            { title: 'Updated every day', desc: 'Every rate shows a last-verified date. Stale data is automatically flagged. Rates older than 7 days shown with a warning.', path: 'M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z M12 6v6l4 2' },
            { title: 'Free forever', desc: 'BirrBank is permanently free for consumers. No paywalls, no premium tiers, no subscription ever required.', path: 'M12 1v22 M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' },
          ].map(item => (
            <div key={item.title}>
              <div className="w-12 h-12 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{boxShadow:'0 2px 12px rgba(26,92,56,0.08)'}}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d={item.path}/>
                </svg>
              </div>
              <h3 className="font-bold text-slate-900 mb-3 tracking-tight" style={{fontSize:'17px'}}>{item.title}</h3>
              <p className="text-slate-500 leading-relaxed" style={{fontSize:'14px', lineHeight:'1.75'}}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 py-10 px-8">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-green-800 rounded-lg flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="14" y2="18"/></svg>
            </div>
            <span className="font-black text-slate-900 text-base tracking-tight">BirrBank</span>
          </div>
          <p className="text-xs text-slate-400 text-center max-w-md leading-relaxed">
            Financial information for comparison only. Not a bank, insurer, broker or financial adviser. Always verify rates directly with the institution before making any financial decision.
          </p>
          <div className="flex gap-5 text-xs text-slate-400 font-medium">
            <Link href="/about" className="hover:text-slate-600 transition-colors">About</Link>
            <Link href="/legal" className="hover:text-slate-600 transition-colors">Legal</Link>
            <span>© 2026 BirrBank</span>
          </div>
        </div>
      </footer>

    </div>
  )
}
