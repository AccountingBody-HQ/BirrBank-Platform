import Link from 'next/link'
import EmailCapture from '@/components/EmailCapture'
export const dynamic = 'force-dynamic'

// ─── Placeholder data — replace with Supabase queries in Phase 2 ─────────────

const TOP_SAVINGS = [
  { rank: 1, bank: 'Awash Bank',            product: '12-month fixed deposit', rate: '9.50', badge: 'Best rate' },
  { rank: 2, bank: 'Zemen Bank',             product: '12-month fixed deposit', rate: '9.25', badge: null },
  { rank: 3, bank: 'Bank of Abyssinia',      product: '12-month fixed deposit', rate: '9.00', badge: null },
  { rank: 4, bank: 'Dashen Bank',            product: 'Regular savings',        rate: '8.75', badge: null },
  { rank: 5, bank: 'Oromia International',   product: 'Regular savings',        rate: '8.50', badge: null },
]

const FX_PREVIEW = [
  { currency: 'USD', name: 'US Dollar',     buy: '155.90', sell: '156.40', bg: '#1D4ED8' },
  { currency: 'GBP', name: 'British Pound', buy: '197.20', sell: '197.82', bg: '#1D4ED8' },
  { currency: 'EUR', name: 'Euro',          buy: '168.50', sell: '169.12', bg: '#1D4ED8' },
]

const SUB_CATEGORIES = [
  {
    label: 'Savings Rates',
    href: '/banking/savings-rates',
    desc: 'Compare savings and fixed deposit rates across all 32 commercial banks.',
    stat: '32 banks',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
  },
  {
    label: 'Loan Comparison',
    href: '/banking/loans',
    desc: 'Personal, car, home and business loan rates with EMI calculator.',
    stat: 'All loan types',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
      </svg>
    ),
  },
  {
    label: 'FX Rates',
    href: '/banking/fx-rates',
    desc: 'Official NBE indicative rates vs per-bank buying and selling rates.',
    stat: 'Updated daily',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
  },
  {
    label: 'Mobile Money',
    href: '/banking/mobile-money',
    desc: 'TeleBirr, HelloCash, Amole and CBEBirr — compare all payment operators.',
    stat: '27 operators',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
      </svg>
    ),
  },
  {
    label: 'Microfinance',
    href: '/banking/microfinance',
    desc: 'Micro-loans, rural finance and SME credit from 55 licensed MFIs.',
    stat: '55 MFIs',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    label: 'Money Transfer',
    href: '/banking/money-transfer',
    desc: 'Compare diaspora remittance fees and transfer speed across 62 agencies.',
    stat: '62 agencies',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
      </svg>
    ),
  },
]

const ArrowRight = ({ size = 13 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)

export default function BankingHubPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ══════════════════════════════ HERO ══════════════════════════════════════ */}
      <section className="relative bg-white overflow-hidden border-b border-slate-100">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 900px 500px at 55% -80px, rgba(29,78,216,0.04) 0%, transparent 65%)' }}
        />
        <div className="relative max-w-6xl mx-auto px-8 pt-20 pb-12">

          <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: '#1D4ED8' }}>
            Banking
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            <div>
              <h1
                className="font-serif font-bold mb-5 text-slate-950"
                style={{ fontSize: 'clamp(38px, 4.5vw, 56px)', letterSpacing: '-1.8px', lineHeight: 1.08 }}
              >
                Compare every bank<br />
                <span style={{ color: '#1D4ED8' }}>in Ethiopia.</span>
              </h1>
              <p className="text-slate-600 mb-8" style={{ fontSize: '16px', lineHeight: '1.8', maxWidth: '440px' }}>
                Savings rates, loans, FX and digital services across all 32 commercial banks —
                verified from official sources and updated weekly.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/banking/savings-rates"
                  className="font-bold rounded-full transition-all"
                  style={{ fontSize: 15, padding: '14px 32px', minWidth: 200, textAlign: 'center', background: '#1D4ED8', color: '#fff', boxShadow: '0 4px 20px rgba(29,78,216,0.20)' }}
                >
                  Compare savings rates
                </Link>
                <Link
                  href="/banking/fx-rates"
                  className="font-bold rounded-full transition-all"
                  style={{ fontSize: 15, padding: '14px 32px', minWidth: 200, textAlign: 'center', border: '2px solid #1A5C38', color: '#1D4ED8', background: 'transparent' }}
                >
                  Check FX rates
                </Link>
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: '32',   label: 'Commercial banks',    sub: 'NBE-licensed' },
                { value: '9.50%', label: 'Best savings rate',   sub: '12-month fixed' },
                { value: 'Daily', label: 'FX rate updates',     sub: '09:30 EAT' },
              ].map((s) => (
                <div key={s.label} className="bg-white rounded-2xl border border-slate-200 text-center" style={{ padding: '20px 12px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                  <p className="font-mono font-black text-slate-950 mb-1" style={{ fontSize: '20px', letterSpacing: '-1px', color: '#1D4ED8' }}>{s.value}</p>
                  <p className="font-semibold text-slate-700 mb-0.5" style={{ fontSize: '11px' }}>{s.label}</p>
                  <p className="text-slate-400" style={{ fontSize: '10px' }}>{s.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ SUB-CATEGORIES ════════════════════════════ */}
      <section className="border-b border-slate-100" style={{ background: '#f8faf8', padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">What we cover</p>
            <h2
              className="font-serif font-bold text-slate-950"
              style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', letterSpacing: '-1.2px', lineHeight: 1.1 }}
            >
              The complete Ethiopian banking picture.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SUB_CATEGORIES.map((cat) => (
              <Link
                key={cat.label}
                href={cat.href}
                className="group bg-white rounded-2xl border border-slate-200 hover:shadow-xl transition-all duration-200 flex flex-col overflow-hidden"
                style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
              >
                <div style={{ height: 3, background: '#1D4ED8' }} />
                <div className="flex gap-4 items-start" style={{ padding: '24px' }}>
                  <div className="rounded-xl flex items-center justify-center shrink-0" style={{ width: 48, height: 48, background: '#f8fafc' }}>
                    {cat.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-900 mb-1.5" style={{ fontSize: '15px' }}>{cat.label}</p>
                    <p className="text-slate-500 text-xs mb-3" style={{ lineHeight: '1.7' }}>{cat.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400">{cat.stat}</span>
                      <div className="flex items-center gap-1 text-xs font-bold group-hover:gap-2 transition-all" style={{ color: '#1D4ED8' }}>
                        <span>Explore</span>
                        <ArrowRight size={11} />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ SAVINGS RATES PREVIEW ════════════════════ */}
      <section className="border-b border-slate-100 bg-white" style={{ padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Top rates today</p>
              <h2
                className="font-serif font-bold text-slate-950"
                style={{ fontSize: 'clamp(24px, 3vw, 34px)', letterSpacing: '-1px', lineHeight: 1.15 }}
              >
                Best savings rates — all banks compared
              </h2>
            </div>
            <Link
              href="/banking/savings-rates"
              className="inline-flex items-center gap-2 text-sm font-bold shrink-0 sm:pb-1"
              style={{ color: '#1D4ED8' }}
            >
              See all 32 banks <ArrowRight />
            </Link>
          </div>

          {/* Table */}
          <div className="rounded-2xl overflow-hidden border border-slate-200" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
            <div style={{ height: 4, background: 'linear-gradient(90deg, #1D4ED8, #1E40AF)' }} />

            {/* Header */}
            <div className="grid grid-cols-12 bg-slate-50 border-b border-slate-200" style={{ padding: '12px 24px' }}>
              <div className="col-span-1"><p className="text-xs font-black text-slate-400 uppercase tracking-widest">#</p></div>
              <div className="col-span-5"><p className="text-xs font-black text-slate-400 uppercase tracking-widest">Bank</p></div>
              <div className="col-span-4"><p className="text-xs font-black text-slate-400 uppercase tracking-widest">Product</p></div>
              <div className="col-span-2 text-right"><p className="text-xs font-black text-slate-400 uppercase tracking-widest">Rate</p></div>
            </div>

            {/* Rows */}
            {TOP_SAVINGS.map((r) => (
              <div
                key={r.rank}
                className={`grid grid-cols-12 items-center border-b border-slate-100 transition-colors ${r.rank === 1 ? 'bg-blue-50' : 'bg-white hover:bg-slate-50'}`}
                style={{ padding: r.rank === 1 ? '18px 24px' : '14px 24px' }}
              >
                <div className="col-span-1">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black"
                    style={r.rank === 1
                      ? { background: '#1D4ED8', color: '#fff' }
                      : { background: '#f1f5f9', color: '#94a3b8' }}
                  >
                    {r.rank === 1 ? (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    ) : r.rank}
                  </div>
                </div>
                <div className="col-span-5">
                  <p className={`font-bold ${r.rank === 1 ? 'text-blue-900' : 'text-slate-800'}`} style={{ fontSize: r.rank === 1 ? '15px' : '14px' }}>
                    {r.bank}
                  </p>
                  {r.badge && (
                    <span className="text-xs font-bold uppercase tracking-wide" style={{ color: '#1D4ED8' }}>{r.badge}</span>
                  )}
                </div>
                <div className="col-span-4">
                  <p className="text-slate-500 text-sm">{r.product}</p>
                </div>
                <div className="col-span-2 text-right">
                  <p
                    className={`font-mono font-black ${r.rank === 1 ? 'text-blue-700' : 'text-slate-800'}`}
                    style={{ fontSize: r.rank === 1 ? '24px' : '18px', letterSpacing: '-1px' }}
                  >
                    {r.rate}%
                  </p>
                </div>
              </div>
            ))}

            {/* Footer row */}
            <div className="flex items-center justify-between bg-slate-50 border-t border-slate-200" style={{ padding: '14px 24px' }}>
              <p className="text-xs text-slate-400">Official bank sources · NBE registry · Last verified this week</p>
              <Link href="/banking/savings-rates" className="text-xs font-bold hover:underline" style={{ color: '#1D4ED8' }}>
                Full comparison — all 32 banks →
              </Link>
            </div>
          </div>

          {/* Disclaimer below table — never ads */}
          <p className="text-xs text-slate-400 mt-4 text-center">
            Rates are for comparison purposes only. Always verify directly with the institution before making any financial decision.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════ FX RATES PREVIEW ═════════════════════════ */}
      <section className="border-b border-slate-100" style={{ background: '#f8faf8', padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Live rates</p>
              <h2
                className="font-serif font-bold text-slate-950"
                style={{ fontSize: 'clamp(24px, 3vw, 34px)', letterSpacing: '-1px', lineHeight: 1.15 }}
              >
                FX rates — NBE official snapshot
              </h2>
            </div>
            <Link
              href="/banking/fx-rates"
              className="inline-flex items-center gap-2 text-sm font-bold shrink-0 sm:pb-1"
              style={{ color: '#1D4ED8' }}
            >
              Full FX dashboard <ArrowRight />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {FX_PREVIEW.map((fx) => (
              <div
                key={fx.currency}
                className="bg-white rounded-2xl border border-slate-200 hover:border-blue-200 hover:shadow-md transition-all"
                style={{ padding: '24px' }}
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="inline-flex items-center rounded-lg" style={{ background: fx.bg, padding: '5px 14px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 800, color: '#fff', letterSpacing: '1px' }}>{fx.currency}</span>
                  </div>
                  <p className="text-sm text-slate-500 font-medium">{fx.name}</p>
                </div>
                <p className="text-xs text-slate-400 font-medium mb-1">ETB per 1 {fx.currency}</p>
                <p className="font-mono font-black text-slate-950 mb-3" style={{ fontSize: '32px', letterSpacing: '-1px', lineHeight: 1 }}>{fx.sell}</p>
                <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                  <span className="text-xs text-slate-400">Buy rate</span>
                  <span className="font-mono font-semibold text-slate-600" style={{ fontSize: '14px' }}>{fx.buy}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-sm text-slate-500">
              Official rates from the <strong className="text-slate-700">National Bank of Ethiopia</strong> · Updated 09:30 EAT every business day.
            </p>
            <Link href="/banking/fx-rates" className="inline-flex items-center gap-2 text-sm font-bold shrink-0" style={{ color: '#1D4ED8' }}>
              Compare per-bank rates <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ TRUST / DARK SECTION ═════════════════════ */}
      <section className="border-b border-slate-100" style={{ background: '#0f172a', padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: '#93c5fd' }}>Why trust BirrBank</p>
            <h2
              className="font-serif font-bold mb-4"
              style={{ fontSize: 'clamp(26px, 3.5vw, 38px)', letterSpacing: '-1.2px', color: '#ffffff' }}
            >
              The only platform covering all 32 banks.
            </h2>
            <p className="mx-auto" style={{ fontSize: '16px', lineHeight: 1.75, maxWidth: '480px', color: '#94a3b8' }}>
              Every institution verified against the NBE registry. Every rate timestamped.
              No commercial arrangement influences any ranking.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>,
                tag: 'Complete coverage',
                headline: 'All 32 NBE-licensed banks. No gaps.',
                body: 'From CBE with 60% market share to every new private entrant — BirrBank is the only platform that covers the complete commercial banking landscape of Ethiopia.',
              },
              {
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
                tag: 'Verified weekly',
                headline: 'Every rate has a verified date.',
                body: 'Rates older than 7 days are flagged automatically. You see exactly how fresh the data is before making any comparison decision.',
              },
              {
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
                tag: 'No affiliate fees',
                headline: 'Rankings are never for sale.',
                body: 'BirrBank earns nothing from the banks it ranks. The best savings rate is always first — regardless of which institution offers it.',
              },
            ].map(({ icon, tag, headline, body }) => (
              <div key={tag} className="rounded-2xl flex flex-col" style={{ padding: '36px 32px', background: '#1e293b', border: '1px solid #1e293b', minHeight: '260px' }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-6" style={{ background: '#334155', border: '1px solid #475569' }}>
                  {icon}
                </div>
                <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: '#93c5fd' }}>{tag}</p>
                <h3 className="font-bold mb-3" style={{ fontSize: '16px', lineHeight: 1.4, color: '#ffffff' }}>{headline}</h3>
                <p className="text-sm" style={{ lineHeight: '1.85', color: '#94a3b8' }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ EMAIL CAPTURE ════════════════════════════ */}
      <section className="bg-white" style={{ padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Weekly banking alerts</p>
            <h2
              className="font-serif font-bold text-slate-950 mb-5"
              style={{ fontSize: 'clamp(32px, 4vw, 46px)', letterSpacing: '-1.5px', lineHeight: 1.1 }}
            >
              Rate changes,<br />
              <span style={{ color: '#1D4ED8' }}>direct to your inbox.</span>
            </h2>
            <p className="text-slate-500 mb-8" style={{ fontSize: '15px', lineHeight: 1.85 }}>
              Get notified the moment a bank changes its savings rate or FX margin.
              Once a week. No noise.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Savings and fixed deposit rate changes across all 32 banks',
                'FX rate movements — USD, GBP, EUR, SAR, AED vs ETB',
                'New bank products, promotions and account launches',
                'NBE directives affecting deposit and lending rates',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-slate-600">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-3 pt-5 border-t border-slate-100">
              <p className="text-xs text-slate-500 font-medium">Free forever · No credit card · Unsubscribe anytime</p>
            </div>
          </div>
          <EmailCapture />
        </div>
      </section>

    </div>
  )
}
