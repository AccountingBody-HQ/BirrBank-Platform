import Link from 'next/link'
import EmailCapture from '@/components/EmailCapture'
export const dynamic = 'force-dynamic'

// ─── Placeholder data — replace with Supabase queries in Phase 2 ─────────────

const REMITTANCE_PROVIDERS = [
  { name: 'Western Union',     corridor: 'Global',      fee: '3.5%',  speed: 'Minutes',  minAmount: '$10',   badge: 'Most branches' },
  { name: 'MoneyGram',         corridor: 'Global',      fee: '3.8%',  speed: 'Minutes',  minAmount: '$10',   badge: null },
  { name: 'Dahabshiil',        corridor: 'Africa/Gulf', fee: '2.9%',  speed: '1-2 hours',minAmount: '$20',   badge: 'Best for Gulf' },
  { name: 'Remitly',           corridor: 'US/UK/EU',    fee: '1.99%', speed: '3-5 mins', minAmount: '$15',   badge: 'Best rate' },
  { name: 'WorldRemit',        corridor: 'Global',      fee: '2.5%',  speed: '1-2 hours',minAmount: '$10',   badge: null },
  { name: 'CBE (SWIFT)',       corridor: 'Global',      fee: 'Varies',speed: '1-3 days', minAmount: 'None',  badge: 'Bank transfer' },
]

const FX_DIASPORA = [
  { from: 'USD', name: 'US Dollar',    rate: '156.40', flag: '🇺🇸', bg: '#1D4ED8', remit: '$5B+/yr' },
  { from: 'GBP', name: 'British Pound',rate: '197.82', flag: '🇬🇧', bg: '#1D4ED8', remit: 'Large diaspora' },
  { from: 'SAR', name: 'Saudi Riyal',  rate: '41.70',  flag: '🇸🇦', bg: '#1D4ED8', remit: '3M+ Ethiopians' },
  { from: 'AED', name: 'UAE Dirham',   rate: '42.60',  flag: '🇦🇪', bg: '#1D4ED8', remit: 'Growing corridor' },
]

const DIASPORA_GUIDES = [
  {
    title: 'How to open a diaspora bank account from abroad',
    pillar: 'Banking',
    readTime: '6 min read',
    href: '/guides/diaspora-bank-account',
    color: '#1D4ED8',
  },
  {
    title: 'How to invest in Ethiopian stocks (ESX) from abroad',
    pillar: 'Markets',
    readTime: '8 min read',
    href: '/guides/invest-esx-from-abroad',
    color: '#1D4ED8',
  },
  {
    title: 'Cheapest ways to send money to Ethiopia in 2026',
    pillar: 'Remittance',
    readTime: '5 min read',
    href: '/guides/cheapest-remittance-ethiopia',
    color: '#0891b2',
  },
]

const SUB_PAGES = [
  {
    label: 'Send Money Home',
    href: '/diaspora/remittance',
    desc: 'Compare remittance fees, FX rates and transfer speed across all corridors.',
    stat: '62 transfer agencies',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0891b2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
      </svg>
    ),
  },
  {
    label: 'Invest from Abroad',
    href: '/diaspora/invest',
    desc: 'Buy Ethiopian stocks on the ESX, T-bills and upcoming IPOs from anywhere.',
    stat: 'ESX + IPO pipeline',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0891b2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    label: 'Open a Bank Account',
    href: '/diaspora/bank-account',
    desc: 'Which Ethiopian banks accept diaspora account applications from abroad.',
    stat: '12 diaspora-ready banks',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0891b2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="3"/><line x1="2" y1="10" x2="22" y2="10"/>
      </svg>
    ),
  },
  {
    label: 'Track ETB Rates',
    href: '/banking/fx-rates',
    desc: 'Monitor USD, GBP, SAR and AED vs ETB daily. Know before you transfer.',
    stat: 'Updated 09:30 EAT',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0891b2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
  },
]

const ArrowRight = ({ size = 13 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)

const ClockIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
)

const PILLAR = '#1D4ED8'
const PILLAR_BG = '#EFF6FF'

export default function DiasporaPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ══════════════════════════════ HERO ══════════════════════════════════════ */}
      <section className="relative bg-white overflow-hidden border-b border-slate-100">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 900px 500px at 55% -80px, rgba(29,78,216,0.04) 0%, transparent 65%)' }}
        />
        <div className="relative max-w-6xl mx-auto px-8 pt-20 pb-12">
          <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: '#1D4ED8' }}>Diaspora</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            <div>
              <h1
                className="font-serif font-bold mb-5 text-slate-950"
                style={{ fontSize: 'clamp(38px, 4.5vw, 56px)', letterSpacing: '-1.8px', lineHeight: 1.08 }}
              >
                Ethiopia's financial<br />
                <span style={{ color: '#1D4ED8' }}>hub for the diaspora.</span>
              </h1>
              <p className="text-slate-600 mb-8" style={{ fontSize: '16px', lineHeight: '1.8', maxWidth: '440px' }}>
                Send money home cheaper. Invest in Ethiopian stocks from abroad.
                Track ETB rates daily. Everything the 10 million strong Ethiopian
                diaspora needs — free, in one place.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/diaspora/remittance"
                  className="font-bold rounded-full transition-all"
                  style={{ fontSize: 15, padding: '14px 32px', minWidth: 200, textAlign: 'center', background: PILLAR, color: '#fff', boxShadow: '0 4px 20px rgba(29,78,216,0.20)' }}
                >
                  Compare remittance rates
                </Link>
                <Link
                  href="/banking/fx-rates"
                  className="font-bold rounded-full transition-all"
                  style={{ fontSize: 15, padding: '14px 32px', minWidth: 200, textAlign: 'center', border: '2px solid #1D4ED8', color: PILLAR, background: 'transparent' }}
                >
                  Track ETB rates
                </Link>
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: '10M+',  label: 'Ethiopians abroad',  sub: 'Global diaspora' },
                { value: '$5B+',  label: 'Annual remittances', sub: 'Sent home yearly' },
                { value: '62',    label: 'Transfer agencies',  sub: 'NBE-licensed' },
              ].map((s) => (
                <div key={s.label} className="bg-white rounded-2xl border border-slate-200 text-center" style={{ padding: '20px 12px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                  <p className="font-mono font-black mb-1" style={{ fontSize: '20px', letterSpacing: '-1px', color: PILLAR }}>{s.value}</p>
                  <p className="font-semibold text-slate-700 mb-0.5" style={{ fontSize: '11px' }}>{s.label}</p>
                  <p className="text-slate-400" style={{ fontSize: '10px' }}>{s.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ SUB PAGES ════════════════════════════════ */}
      <section className="border-b border-slate-100" style={{ background: '#f8faf8', padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">What we cover</p>
            <h2 className="font-serif font-bold text-slate-950" style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', letterSpacing: '-1.2px', lineHeight: 1.1 }}>
              Everything the diaspora needs.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SUB_PAGES.map((cat) => (
              <Link
                key={cat.label}
                href={cat.href}
                className="group bg-white rounded-2xl border border-slate-200 hover:shadow-xl transition-all duration-200 flex flex-col overflow-hidden"
                style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
              >
                <div style={{ height: 3, background: PILLAR }} />
                <div className="flex gap-4 items-start" style={{ padding: '24px' }}>
                  <div className="rounded-xl flex items-center justify-center shrink-0" style={{ width: 48, height: 48, background: PILLAR_BG }}>
                    {cat.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-900 mb-1.5" style={{ fontSize: '15px' }}>{cat.label}</p>
                    <p className="text-slate-500 text-xs mb-3" style={{ lineHeight: '1.7' }}>{cat.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400">{cat.stat}</span>
                      <div className="flex items-center gap-1 text-xs font-bold group-hover:gap-2 transition-all" style={{ color: '#1D4ED8' }}>
                        <span>Go</span><ArrowRight size={11} />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ FX RATES FOR DIASPORA ════════════════════ */}
      {/* NO ADS on FX section — rate data must be clean */}
      <section className="border-b border-slate-100 bg-white" style={{ padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Live ETB rates</p>
              <h2 className="font-serif font-bold text-slate-950" style={{ fontSize: 'clamp(22px, 2.8vw, 32px)', letterSpacing: '-1px', lineHeight: 1.15 }}>
                Today's exchange rates — NBE official
              </h2>
            </div>
            <Link href="/banking/fx-rates" className="inline-flex items-center gap-2 text-sm font-bold shrink-0" style={{ color: '#1D4ED8' }}>
              Full FX dashboard <ArrowRight />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {FX_DIASPORA.map((fx) => (
              <div key={fx.from} className="bg-white rounded-2xl border border-slate-200 hover:border-blue-200 hover:shadow-md transition-all" style={{ padding: '24px' }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="inline-flex items-center rounded-lg" style={{ background: '#f1f5f9', padding: '5px 12px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: '#1D4ED8', letterSpacing: '1px' }}>{fx.from}</span>
                  </div>
                  <p className="text-xs text-slate-400 font-medium">{fx.name}</p>
                </div>
                <p className="text-xs text-slate-400 mb-1">ETB per 1 {fx.from}</p>
                <p className="font-mono font-black text-slate-950 mb-2" style={{ fontSize: '28px', letterSpacing: '-1px', lineHeight: 1 }}>{fx.rate}</p>
                <p className="text-xs font-medium" style={{ color: '#1D4ED8' }}>{fx.remit}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-2 text-xs text-slate-400">
            <ClockIcon />
            <span>Official NBE indicative rates · Updated 09:30 EAT every business day · Source: nbe.gov.et</span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ REMITTANCE COMPARISON ════════════════════ */}
      <section className="border-b border-slate-100" style={{ background: '#f8faf8', padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Remittance comparison</p>
              <h2 className="font-serif font-bold text-slate-950" style={{ fontSize: 'clamp(22px, 2.8vw, 32px)', letterSpacing: '-1px', lineHeight: 1.15 }}>
                Cheapest way to send money to Ethiopia
              </h2>
            </div>
            <Link href="/diaspora/remittance" className="inline-flex items-center gap-2 text-sm font-bold shrink-0" style={{ color: '#1D4ED8' }}>
              Full comparison <ArrowRight />
            </Link>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-200" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <div style={{ height: 4, background: `linear-gradient(90deg, ${PILLAR}, #22d3ee)` }} />

            {/* Header */}
            <div
              className="hidden sm:grid border-b border-slate-200"
              style={{ gridTemplateColumns: '1fr 100px 120px 110px 100px 130px', padding: '12px 24px', background: '#f8fafc' }}
            >
              {['Provider', 'Corridor', 'Typical fee', 'Speed', 'Min. amount', 'Status'].map((h) => (
                <p key={h} className="text-xs font-black text-slate-400 uppercase tracking-widest">{h}</p>
              ))}
            </div>

            {REMITTANCE_PROVIDERS.map((r, i) => (
              <div key={r.name} className={`border-b border-slate-100 transition-colors ${i === 0 ? 'bg-cyan-50' : 'bg-white hover:bg-slate-50'}`}>
                {/* Desktop */}
                <div
                  className="hidden sm:grid items-center"
                  style={{ gridTemplateColumns: '1fr 100px 120px 110px 100px 130px', padding: i === 0 ? '18px 24px' : '14px 24px' }}
                >
                  <div>
                    <p className="font-bold text-slate-800" style={{ fontSize: i === 0 ? '15px' : '14px' }}>{r.name}</p>
                    {r.badge && (
                      <span className="text-xs font-bold rounded-full px-2 py-0.5 mt-0.5 inline-block"
                        style={r.badge === 'Best rate' ? { background: '#dbeafe', color: '#1D4ED8' } : { background: PILLAR_BG, color: PILLAR }}>
                        {r.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-500">{r.corridor}</p>
                  <p className={`font-mono font-black ${i === 0 ? 'text-blue-700' : 'text-slate-800'}`}
                    style={{ fontSize: i === 0 ? '20px' : '16px', letterSpacing: '-0.5px' }}>
                    {r.fee}
                  </p>
                  <p className="text-sm text-slate-600">{r.speed}</p>
                  <p className="font-mono text-sm text-slate-600">{r.minAmount}</p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold rounded-full px-3 py-1 w-fit"
                    style={{ background: '#dbeafe', color: '#1D4ED8' }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    NBE licensed
                  </span>
                </div>

                {/* Mobile */}
                <div className="sm:hidden flex items-center gap-3" style={{ padding: '14px 16px' }}>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="font-bold text-slate-800 text-sm">{r.name}</p>
                      {r.badge && (
                        <span className="text-xs font-bold rounded-full px-2 py-0.5 shrink-0"
                          style={r.badge === 'Best rate' ? { background: '#dbeafe', color: '#1D4ED8' } : { background: PILLAR_BG, color: PILLAR }}>
                          {r.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400">{r.corridor} · {r.speed} · min {r.minAmount}</p>
                  </div>
                  <p className="font-mono font-black text-slate-800 shrink-0" style={{ fontSize: '18px' }}>{r.fee}</p>
                </div>
              </div>
            ))}

            <div className="flex items-center justify-between bg-slate-50 border-t border-slate-200" style={{ padding: '14px 24px' }}>
              <p className="text-xs text-slate-400">Fees are indicative and may vary by amount and corridor · Always verify before transferring</p>
              <Link href="/diaspora/remittance" className="text-xs font-bold hover:underline shrink-0" style={{ color: '#1D4ED8' }}>
                Full remittance guide →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ FEATURED GUIDES ══════════════════════════ */}
      <section className="border-b border-slate-100 bg-white" style={{ padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Diaspora guides</p>
            <h2 className="font-serif font-bold text-slate-950" style={{ fontSize: 'clamp(26px, 3vw, 36px)', letterSpacing: '-1.2px', lineHeight: 1.1 }}>
              Essential reading for Ethiopians abroad.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {DIASPORA_GUIDES.map((g) => (
              <Link
                key={g.title}
                href={g.href}
                className="group bg-white rounded-2xl border border-slate-200 hover:shadow-xl transition-all duration-200 overflow-hidden"
                style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
              >
                <div style={{ height: 3, background: g.color }} />
                <div style={{ padding: '28px 24px' }}>
                  <span className="text-xs font-bold rounded-full px-2 py-0.5 inline-block mb-4"
                    style={{ background: '#f1f5f9', color: '#475569' }}>
                    {g.pillar}
                  </span>
                  <p className="font-bold text-slate-900 mb-4 leading-snug" style={{ fontSize: '15px' }}>{g.title}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-medium">{g.readTime}</span>
                    <div className="flex items-center gap-1 text-xs font-bold group-hover:gap-2 transition-all" style={{ color: '#1D4ED8' }}>
                      <span>Read</span><ArrowRight size={11} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/guides" className="inline-flex items-center gap-2 text-sm font-bold" style={{ color: '#1D4ED8' }}>
              All diaspora guides <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ DARK TRUST ════════════════════════════════ */}
      <section className="border-b border-slate-100" style={{ background: '#0a1f14', padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: '#4ade80' }}>Built for the diaspora</p>
            <h2 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(26px, 3.5vw, 38px)', letterSpacing: '-1.2px', color: '#ffffff' }}>
              Ethiopia's financial platform, wherever you are.
            </h2>
            <p className="mx-auto" style={{ fontSize: '16px', lineHeight: 1.75, maxWidth: '520px', color: '#6b9e7e' }}>
              10 million Ethiopians abroad send $5 billion home every year.
              BirrBank is built to serve every one of them — free, in English, on any device.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
                tag: 'Cheapest transfers',
                headline: 'Find the lowest fee for every corridor.',
                body: 'Fees vary dramatically between providers and corridors. A 1% difference on a $500 transfer is $5 — every time. BirrBank shows the full cost comparison before you commit.',
              },
              {
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
                tag: 'Invest from abroad',
                headline: 'Ethiopian stocks and T-bills — from anywhere.',
                body: 'The ESX is open to diaspora investors. BirrBank tracks every listed equity, the full IPO pipeline and T-bill yields so you can invest in Ethiopia\'s growth from London, Riyadh or Toronto.',
              },
              {
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
                tag: 'Rate tracking',
                headline: 'Know the ETB rate before you transfer.',
                body: 'NBE publishes a new indicative rate every business day at 09:30 EAT. BirrBank surfaces it instantly — so diaspora in every time zone know the rate before their bank does.',
              },
            ].map(({ icon, tag, headline, body }) => (
              <div key={tag} className="rounded-2xl flex flex-col" style={{ padding: '36px 32px', background: '#0f2d1a', border: '1px solid #1a3a24', minHeight: '260px' }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-6" style={{ background: '#1a3a24', border: '1px solid #2d6a4f' }}>
                  {icon}
                </div>
                <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: '#4ade80' }}>{tag}</p>
                <h3 className="font-bold mb-3" style={{ fontSize: '16px', lineHeight: 1.4, color: '#ffffff' }}>{headline}</h3>
                <p className="text-sm" style={{ lineHeight: '1.85', color: '#6b9e7e' }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ EMAIL CAPTURE ════════════════════════════ */}
      <section className="bg-white" style={{ padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Diaspora weekly</p>
            <h2 className="font-serif font-bold text-slate-950 mb-5" style={{ fontSize: 'clamp(30px, 3.5vw, 42px)', letterSpacing: '-1.5px', lineHeight: 1.1 }}>
              Stay connected to<br />
              <span style={{ color: '#1D4ED8' }}>Ethiopia's economy.</span>
            </h2>
            <p className="text-slate-500 mb-8" style={{ fontSize: '15px', lineHeight: 1.85 }}>
              Weekly digest built for Ethiopians abroad. ETB rates, ESX updates,
              IPO announcements and the best remittance rates — every week.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'ETB exchange rate movements vs USD, GBP, SAR, AED',
                'Best remittance fees across all corridors that week',
                'ESX market updates and new IPO announcements',
                'Banking and investment news from Addis Ababa',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-slate-600">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-xs text-slate-500 font-medium pt-5 border-t border-slate-100">
              Free forever · No credit card · Unsubscribe anytime
            </p>
          </div>
          <EmailCapture />
        </div>
      </section>

    </div>
  )
}
