import Link from 'next/link'
export const dynamic = 'force-dynamic'

const RATES = [
  { rank: 1, bank: 'Awash Bank', product: '12-month fixed', rate: '9.50', badge: 'Highest rate' },
  { rank: 2, bank: 'Zemen Bank', product: '12-month fixed', rate: '9.25', badge: null },
  { rank: 3, bank: 'Bank of Abyssinia', product: '12-month fixed', rate: '9.00', badge: null },
  { rank: 4, bank: 'Dashen Bank', product: 'Savings account', rate: '8.75', badge: null },
  { rank: 5, bank: 'Oromia International', product: 'Savings account', rate: '8.50', badge: null },
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

const BTN = 'font-bold rounded-full transition-all'
const BTN_STYLE = {fontSize:16, padding:'15px 34px'}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="relative bg-white overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 pointer-events-none" style={{background:'radial-gradient(ellipse 800px 400px at 50% -80px,rgba(26,92,56,0.07) 0%,transparent 70%)'}} />
        <div className="relative max-w-6xl mx-auto px-8 pt-24 pb-24">
          <div className="grid grid-cols-2 gap-16 items-start">
            <div>
              <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-2 text-xs text-green-800 font-semibold mb-8 tracking-wide">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                214 NBE-regulated institutions · Free forever
              </div>
              <h1 className="font-serif font-bold text-slate-950 leading-none mb-6" style={{fontSize:'60px', letterSpacing:'-2.5px', lineHeight:'1.05'}}>
                The smartest<br/>way to manage<br/>money in<br/><span className="text-green-700">Ethiopia</span>
              </h1>
              <p className="text-slate-500 leading-relaxed mb-8 max-w-sm" style={{fontSize:'17px', lineHeight:'1.7'}}>
                Compare every bank, insurer and investment. ESX market data. Commodity prices. All free, always.
              </p>
              <div className="flex gap-3 mb-10">
                <Link href="/banking/savings-rates" className={BTN} style={{...BTN_STYLE, background:'#1A5C38', color:'#fff', boxShadow:'0 4px 24px rgba(26,92,56,0.3)'}}>
                  Compare savings rates
                </Link>
                <Link href="/markets" className={BTN} style={{...BTN_STYLE, border:'2px solid #1A5C38', color:'#1A5C38', background:'transparent'}}>
                  Explore markets
                </Link>
              </div>
              <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-4 py-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-xs font-semibold text-slate-600">Data sourced from</span>
                  <span className="text-xs font-black text-slate-800 tracking-tight">NBE · ESX · ECX</span>
                </div>
              </div>
            </div>

            {/* Live rates card */}
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl" style={{background:'radial-gradient(ellipse at center,rgba(26,92,56,0.07) 0%,transparent 70%)'}} />
              <div className="relative bg-white rounded-2xl border border-slate-200 overflow-hidden" style={{boxShadow:'0 24px 64px rgba(0,0,0,0.08),0 4px 16px rgba(0,0,0,0.04)'}}>
                <div className="bg-white border-b border-slate-100 px-5 py-4 flex justify-between items-center">
                  <div>
                    <p className="text-xs font-black text-green-600 uppercase tracking-widest mb-0.5">Verified today</p>
                    <p className="text-slate-900 font-bold text-base">Top savings rates</p>
                  </div>
                  <div className="flex items-center gap-2 bg-green-50 border border-green-100 rounded-full px-3 py-1.5">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    <span className="text-green-700 text-xs font-bold">NBE verified</span>
                  </div>
                </div>
                <div className="divide-y divide-slate-50">
                  {RATES.map((r) => (
                    <div key={r.rank} className={`flex items-center gap-4 ${r.rank === 1 ? 'bg-green-50' : 'bg-white'}`} style={{padding:'16px 20px'}}>
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
                  <p className="text-xs text-slate-400">Sourced from official bank websites</p>
                  <Link href="/banking/savings-rates" className="text-xs font-bold" style={{color:'#1A5C38'}}>See all 32 banks →</Link>
                </div>
              </div>
            </div>
          </div>

          {/* Metric pills */}
          <div className="grid grid-cols-4 gap-4 mt-12 pt-10 border-t border-slate-100">
            {METRICS.map((m) => (
              <div key={m.label} className="bg-white rounded-2xl border border-slate-200 text-center" style={{padding:'20px 16px', boxShadow:'0 2px 16px rgba(0,0,0,0.04)'}}>
                <p className="font-mono font-black text-slate-900 leading-none mb-2" style={{fontSize:'32px', letterSpacing:'-2px'}}>{m.value}</p>
                <p className="font-semibold uppercase tracking-widest" style={{fontSize:'10px', color:'#94a3b8'}}>{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Five pillars */}
      <section className="border-b border-slate-100" style={{background:'#f8faf8', padding:'96px 32px'}}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Full market coverage</p>
            <h2 className="font-serif font-bold text-slate-950" style={{fontSize:'38px', letterSpacing:'-1.5px'}}>Everything in Ethiopia's financial market</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {PILLARS.map((p) => (
              <Link key={p.label} href={p.href} className="group bg-white rounded-2xl border border-slate-200 hover:border-green-300 hover:shadow-lg transition-all duration-200 flex flex-col" style={{padding:'32px 24px', boxShadow:'0 2px 16px rgba(0,0,0,0.04)'}}>
                <div className="bg-slate-50 rounded-xl flex items-center justify-center group-hover:bg-green-50 transition-colors shrink-0" style={{width:'44px', height:'44px', marginBottom:'16px'}}>
                  {PILLAR_ICONS[p.label]}
                </div>
                <p className="font-bold text-slate-900 mb-2 tracking-tight" style={{fontSize:'14px'}}>{p.label}</p>
                <p className="text-slate-500 leading-relaxed flex-1" style={{fontSize:'11px', lineHeight:'1.7', marginBottom:'16px'}}>{p.desc}</p>
                <div className="flex items-center gap-1 text-xs text-slate-500 font-semibold mt-auto group-hover:text-green-700 transition-colors">
                  <span>{p.stat}</span>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust signals */}
      <section className="bg-white border-b border-slate-100" style={{padding:'96px 32px'}}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Why trust BirrBank</p>
            <h2 className="font-serif font-bold text-slate-950" style={{fontSize:'38px', letterSpacing:'-1.5px'}}>Built on verified data</h2>
          </div>
          <div className="grid grid-cols-3 gap-10 text-center">
            <div>
              <div className="w-12 h-12 bg-green-50 border border-green-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A5C38" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <polyline points="9 12 11 14 15 10"/>
                </svg>
              </div>
              <h3 className="font-bold text-slate-900 mb-4" style={{fontSize:'17px'}}>NBE verified data</h3>
              <p className="text-slate-500 leading-relaxed" style={{fontSize:'14px', lineHeight:'1.75'}}>All institution data sourced directly from the National Bank of Ethiopia registry and official bank websites.</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-green-50 border border-green-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A5C38" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <h3 className="font-bold text-slate-900 mb-4" style={{fontSize:'17px'}}>Updated every day</h3>
              <p className="text-slate-500 leading-relaxed" style={{fontSize:'14px', lineHeight:'1.75'}}>Every rate shows a last-verified date. Stale data is automatically flagged. Rates older than 7 days shown with a warning.</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-green-50 border border-green-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A5C38" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23"/>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
              </div>
              <h3 className="font-bold text-slate-900 mb-4" style={{fontSize:'17px'}}>Free forever</h3>
              <p className="text-slate-500 leading-relaxed" style={{fontSize:'14px', lineHeight:'1.75'}}>BirrBank is permanently free for consumers. No paywalls, no premium tiers, no subscription ever required.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Email capture */}
      <section className="border-b border-slate-100" style={{background:'#f8faf8', padding:'96px 32px'}}>
        <div className="max-w-6xl mx-auto grid grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Stay informed</p>
            <h2 className="font-serif font-bold text-slate-950 mb-4" style={{fontSize:'38px', letterSpacing:'-1.5px', lineHeight:'1.15'}}>
              Weekly rate alerts.<br/>
              <span className="text-green-700">Free. No noise.</span>
            </h2>
            <p className="text-slate-500 mb-6" style={{fontSize:'16px', lineHeight:'1.7'}}>Once a week — the best savings rates, FX movements, ESX updates and commodity prices direct to your inbox.</p>
            <ul className="space-y-3">
              {['Best savings rate changes across all 32 banks','FX rate movements — USD, GBP, SAR, AED vs ETB','ESX market updates and new IPO announcements','ECX commodity price movements for coffee and sesame'].map(item => (
                <li key={item} className="flex items-center gap-3 text-sm text-slate-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-8" style={{boxShadow:'0 4px 24px rgba(0,0,0,0.06)'}}>
            <h3 className="font-bold text-slate-900 mb-2" style={{fontSize:'20px'}}>Get weekly updates</h3>
            <p className="text-slate-500 text-sm mb-6">Trusted by financial professionals across Ethiopia and the diaspora.</p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100"
              />
              <button className="w-full font-bold rounded-xl py-3 text-white transition-colors" style={{background:'#1A5C38', fontSize:'15px'}}>
                Subscribe free →
              </button>
            </div>
            <p className="text-xs text-slate-400 mt-4 text-center">No spam. Unsubscribe anytime. See our Privacy Policy.</p>
          </div>
        </div>
      </section>

    </div>
  )
}
