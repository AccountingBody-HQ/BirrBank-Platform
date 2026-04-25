import Link from 'next/link'
import EmailCapture from '@/components/EmailCapture'
export const dynamic = 'force-dynamic'

// ─── Placeholder data — replace with Supabase queries in Phase 2 ─────────────
// FX rates stored as ETB per 1 foreign currency unit (e.g. 1 USD = 156.40 ETB)
// NBE indicative rate is the official reference benchmark — always shown first

const NBE_RATES = [
  { currency: 'USD', name: 'US Dollar',        buy: '155.90', sell: '156.40', bg: '#1A5C38' },
  { currency: 'GBP', name: 'British Pound',    buy: '197.20', sell: '197.82', bg: '#1d4ed8' },
  { currency: 'EUR', name: 'Euro',             buy: '168.50', sell: '169.12', bg: '#7c3aed' },
  { currency: 'SAR', name: 'Saudi Riyal',      buy: '41.40',  sell: '41.70',  bg: '#d97706' },
  { currency: 'AED', name: 'UAE Dirham',       buy: '42.30',  sell: '42.60',  bg: '#0891b2' },
  { currency: 'CAD', name: 'Canadian Dollar',  buy: '112.80', sell: '113.20', bg: '#dc2626' },
  { currency: 'CHF', name: 'Swiss Franc',      buy: '174.60', sell: '175.10', bg: '#64748b' },
  { currency: 'CNY', name: 'Chinese Yuan',     buy: '21.40',  sell: '21.60',  bg: '#b91c1c' },
]

const BANK_FX = [
  { bank: 'Commercial Bank of Ethiopia', usd_buy: '155.50', usd_sell: '157.20', eur_buy: '168.10', eur_sell: '169.80', gbp_buy: '196.80', gbp_sell: '198.50', verified: '22 Apr 2026', badge: 'State bank' },
  { bank: 'Awash Bank',                  usd_buy: '155.70', usd_sell: '156.90', eur_buy: '168.30', eur_sell: '169.50', gbp_buy: '197.00', gbp_sell: '198.20', verified: '22 Apr 2026', badge: 'Tight spread' },
  { bank: 'Dashen Bank',                 usd_buy: '155.60', usd_sell: '157.00', eur_buy: '168.20', eur_sell: '169.60', gbp_buy: '196.90', gbp_sell: '198.30', verified: '21 Apr 2026', badge: null },
  { bank: 'Bank of Abyssinia',           usd_buy: '155.40', usd_sell: '157.10', eur_buy: '168.00', eur_sell: '169.70', gbp_buy: '196.70', gbp_sell: '198.40', verified: '21 Apr 2026', badge: null },
  { bank: 'Zemen Bank',                  usd_buy: '155.80', usd_sell: '156.80', eur_buy: '168.40', eur_sell: '169.40', gbp_buy: '197.10', gbp_sell: '198.10', verified: '20 Apr 2026', badge: 'Premium' },
  { bank: 'Wegagen Bank',                usd_buy: '155.30', usd_sell: '157.30', eur_buy: '167.90', eur_sell: '169.90', gbp_buy: '196.60', gbp_sell: '198.60', verified: '20 Apr 2026', badge: null },
  { bank: 'Nib International Bank',      usd_buy: '155.20', usd_sell: '157.40', eur_buy: '167.80', eur_sell: '170.00', gbp_buy: '196.50', gbp_sell: '198.70', verified: '19 Apr 2026', badge: null },
  { bank: 'Oromia International',        usd_buy: '155.60', usd_sell: '157.00', eur_buy: '168.20', eur_sell: '169.60', gbp_buy: '196.90', gbp_sell: '198.30', verified: '19 Apr 2026', badge: null },
]

const CURRENCIES = ['USD', 'EUR', 'GBP', 'SAR', 'AED']

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

const ShieldIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
)

export default function FXRatesPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ══════════════════════════════ HERO ══════════════════════════════════════ */}
      <section className="relative bg-white overflow-hidden border-b border-slate-100">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 900px 500px at 55% -80px, rgba(26,92,56,0.05) 0%, transparent 65%)' }}
        />
        <div className="relative max-w-6xl mx-auto px-8 pt-20 pb-14">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-6">
            <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
            <span>›</span>
            <Link href="/banking" className="hover:text-slate-600 transition-colors">Banking</Link>
            <span>›</span>
            <span style={{ color: '#1A5C38', fontWeight: 700 }}>FX Rates</span>
          </div>

          <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: '#1A5C38' }}>
            Banking · FX rates
          </p>
          <h1
            className="font-serif font-bold mb-5 text-slate-950"
            style={{ fontSize: 'clamp(36px, 4.5vw, 54px)', letterSpacing: '-1.8px', lineHeight: 1.08 }}
          >
            Ethiopian FX rates —<br />
            <span style={{ color: '#1A5C38' }}>NBE official vs all banks.</span>
          </h1>
          <p className="text-slate-600 mb-8" style={{ fontSize: '16px', lineHeight: '1.8', maxWidth: '520px' }}>
            Official National Bank of Ethiopia indicative rates alongside per-bank
            buying and selling rates. Updated every business day at 09:30 EAT.
          </p>

          <div className="flex flex-wrap gap-6">
            {[
              { icon: <ShieldIcon />, label: 'Official NBE indicative rates' },
              { icon: <ClockIcon />,  label: 'Updated 09:30 EAT daily' },
              { icon: <ShieldIcon />, label: '8 major currencies' },
              { icon: <ClockIcon />,  label: 'Per-bank buy and sell rates' },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <span style={{ color: '#1A5C38' }}>{s.icon}</span>
                <span className="text-xs font-semibold text-slate-500">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ NBE OFFICIAL RATES ════════════════════════ */}
      {/* NO ADS ON THIS PAGE — FX dashboard integrity rule */}
      <section className="bg-white" style={{ padding: '64px 32px 80px' }}>
        <div className="max-w-6xl mx-auto">

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Official reference</p>
              <h2
                className="font-serif font-bold text-slate-950"
                style={{ fontSize: 'clamp(22px, 2.8vw, 32px)', letterSpacing: '-1px', lineHeight: 1.15 }}
              >
                NBE indicative rates — today
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400 sm:pb-1">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="font-semibold">Updated 09:30 EAT · 22 Apr 2026</span>
            </div>
          </div>

          {/* NBE rate cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-4">
            {NBE_RATES.map((fx) => (
              <div
                key={fx.currency}
                className="bg-white rounded-2xl border border-slate-200 hover:border-green-200 hover:shadow-md transition-all"
                style={{ padding: '16px 14px' }}
              >
                <div
                  className="inline-flex items-center rounded-lg mb-3"
                  style={{ background: fx.bg, padding: '4px 10px' }}
                >
                  <span style={{ fontSize: '11px', fontWeight: 800, color: '#fff', letterSpacing: '1px' }}>{fx.currency}</span>
                </div>
                <p className="text-xs text-slate-400 mb-1" style={{ fontSize: '10px' }}>ETB per 1 {fx.currency}</p>
                <p className="font-mono font-black text-slate-950" style={{ fontSize: '20px', letterSpacing: '-0.5px', lineHeight: 1 }}>{fx.sell}</p>
                <div className="flex justify-between items-center pt-2 mt-2 border-t border-slate-100">
                  <span className="text-slate-400" style={{ fontSize: '10px' }}>Buy</span>
                  <span className="font-mono font-semibold text-slate-500" style={{ fontSize: '11px' }}>{fx.buy}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2">
            <p className="text-xs text-slate-400">
              <strong className="text-slate-600">Official NBE Rate</strong> — published daily by the National Bank of Ethiopia.
              This is the reference benchmark. Individual bank rates will differ.
            </p>
            
              href="https://nbe.gov.et/exchange/indicatives-rates/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold shrink-0 ml-4"
              style={{ color: '#1A5C38' }}
            >
              <span>View on NBE.gov.et</span>
              <ArrowRight size={11} />
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ PER-BANK COMPARISON ══════════════════════ */}
      <section className="border-y border-slate-100" style={{ background: '#f8faf8', padding: '80px 32px' }}>
        <div className="max-w-6xl mx-auto">

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Per-bank rates</p>
              <h2
                className="font-serif font-bold text-slate-950"
                style={{ fontSize: 'clamp(22px, 2.8vw, 32px)', letterSpacing: '-1px', lineHeight: 1.15 }}
              >
                Bank-by-bank FX comparison — USD · EUR · GBP
              </h2>
            </div>
            <p className="text-xs text-slate-400 sm:pb-1 shrink-0">Sell rate = what you pay the bank · Buy rate = what the bank pays you</p>
          </div>

          {/* Currency filter tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {CURRENCIES.map((c, i) => (
              <button
                key={c}
                className="rounded-full text-xs font-bold transition-all"
                style={{
                  padding: '6px 16px',
                  background: i === 0 ? '#1A5C38' : '#ffffff',
                  color:      i === 0 ? '#fff'     : '#64748b',
                  border:     i === 0 ? 'none'     : '1px solid #e2e8f0',
                }}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Bank FX table */}
          <div className="rounded-2xl overflow-hidden border border-slate-200" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <div style={{ height: 4, background: 'linear-gradient(90deg, #1A5C38, #2d9e5f)' }} />

            {/* Header */}
            <div
              className="hidden sm:grid border-b border-slate-200 bg-white"
              style={{ gridTemplateColumns: '1fr 110px 110px 110px 110px 110px 110px 110px', padding: '13px 24px' }}
            >
              {['Bank', 'USD buy', 'USD sell', 'EUR buy', 'EUR sell', 'GBP buy', 'GBP sell', 'Last verified'].map((h) => (
                <p key={h} className="text-xs font-black text-slate-400 uppercase tracking-widest">{h}</p>
              ))}
            </div>

            {/* NBE reference row */}
            <div
              className="hidden sm:grid items-center border-b border-slate-200"
              style={{ gridTemplateColumns: '1fr 110px 110px 110px 110px 110px 110px 110px', padding: '14px 24px', background: '#f0fdf4' }}
            >
              <div>
                <p className="font-bold text-green-900" style={{ fontSize: '14px' }}>National Bank of Ethiopia</p>
                <span className="text-xs font-bold uppercase tracking-wide" style={{ color: '#1A5C38' }}>Official NBE Rate</span>
              </div>
              {['155.90', '156.40', '168.50', '169.12', '197.20', '197.82'].map((v, i) => (
                <p key={i} className="font-mono font-black text-green-700" style={{ fontSize: '15px', letterSpacing: '-0.5px' }}>{v}</p>
              ))}
              <div className="flex items-center gap-1.5">
                <span style={{ color: '#1A5C38' }}><ClockIcon /></span>
                <p className="text-xs text-slate-400 font-medium">22 Apr 2026</p>
              </div>
            </div>

            {/* Bank rows */}
            {BANK_FX.map((b, idx) => (
              <div
                key={b.bank}
                className="border-b border-slate-100 transition-colors"
              >
                {/* Desktop */}
                <div
                  className="hidden sm:grid items-center hover:bg-slate-50"
                  style={{ gridTemplateColumns: '1fr 110px 110px 110px 110px 110px 110px 110px', padding: '14px 24px', background: idx % 2 === 0 ? '#ffffff' : '#fafafa' }}
                >
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-slate-800" style={{ fontSize: '14px' }}>{b.bank}</p>
                    {b.badge && (
                      <span className="text-xs font-bold rounded-full px-2 py-0.5" style={{ background: '#e6f4ed', color: '#1A5C38' }}>
                        {b.badge}
                      </span>
                    )}
                  </div>
                  {[b.usd_buy, b.usd_sell, b.eur_buy, b.eur_sell, b.gbp_buy, b.gbp_sell].map((v, i) => (
                    <p key={i} className="font-mono font-semibold text-slate-700" style={{ fontSize: '14px', letterSpacing: '-0.5px' }}>{v}</p>
                  ))}
                  <div className="flex items-center gap-1.5">
                    <span style={{ color: '#1A5C38' }}><ClockIcon /></span>
                    <p className="text-xs text-slate-400 font-medium">{b.verified}</p>
                  </div>
                </div>

                {/* Mobile */}
                <div className="sm:hidden" style={{ padding: '14px 16px' }}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-bold text-slate-800 text-sm">{b.bank}</p>
                    {b.badge && (
                      <span className="text-xs font-bold rounded-full px-2 py-0.5" style={{ background: '#e6f4ed', color: '#1A5C38' }}>{b.badge}</span>
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: 'USD sell', val: b.usd_sell },
                      { label: 'EUR sell', val: b.eur_sell },
                      { label: 'GBP sell', val: b.gbp_sell },
                    ].map((item) => (
                      <div key={item.label} className="bg-slate-50 rounded-lg text-center" style={{ padding: '8px' }}>
                        <p className="text-xs text-slate-400 mb-0.5">{item.label}</p>
                        <p className="font-mono font-black text-slate-800" style={{ fontSize: '13px' }}>{item.val}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-slate-400 mt-2">Verified {b.verified}</p>
                </div>
              </div>
            ))}

            {/* Footer */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-slate-200 bg-slate-50" style={{ padding: '14px 24px' }}>
              <p className="text-xs text-slate-400">
                Sell rate = ETB you pay per 1 foreign unit · Buy rate = ETB you receive per 1 foreign unit · Sourced from official bank websites
              </p>
              <Link href="/banking/money-transfer" className="text-xs font-bold hover:underline shrink-0" style={{ color: '#1A5C38' }}>
                Compare remittance fees →
              </Link>
            </div>
          </div>

          <p className="text-xs text-slate-400 mt-5 text-center leading-relaxed">
            FX rates are indicative and change throughout the trading day. Always confirm the rate directly
            with the bank before any transaction. BirrBank is not a foreign exchange dealer.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════ EXPLAINER ════════════════════════════════ */}
      <section className="bg-white border-b border-slate-100" style={{ padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Guide</p>
            <h2
              className="font-serif font-bold text-slate-950"
              style={{ fontSize: 'clamp(26px, 3vw, 36px)', letterSpacing: '-1.2px', lineHeight: 1.15 }}
            >
              Understanding FX rates in Ethiopia.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                title: 'The NBE indicative rate',
                body: 'The National Bank of Ethiopia publishes an official indicative rate each business day at 09:30 EAT. This is the benchmark. Commercial banks set their own rates around this reference — you will always pay more or receive less than the NBE rate.',
              },
              {
                step: '02',
                title: 'Buy rate vs sell rate',
                body: 'The sell rate is what you pay the bank (selling USD to get ETB). The buy rate is what the bank pays you (buying your USD). The difference — the spread — is how banks earn on FX. A tighter spread means a better deal.',
              },
              {
                step: '03',
                title: 'Sending money from abroad',
                body: 'If you are in the diaspora sending ETB home, compare money transfer agencies and bank SWIFT rates separately. Licensed agencies like Western Union and MoneyGram often offer competitive all-in rates including fees.',
              },
            ].map((s) => (
              <div key={s.step} className="bg-white rounded-2xl border border-slate-200 overflow-hidden" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                <div style={{ height: 3, background: '#1A5C38' }} />
                <div style={{ padding: '28px 24px' }}>
                  <p className="font-mono font-black mb-3" style={{ fontSize: '32px', color: '#e2e8f0', lineHeight: 1 }}>{s.step}</p>
                  <p className="font-bold text-slate-900 mb-3" style={{ fontSize: '15px' }}>{s.title}</p>
                  <p className="text-sm text-slate-500" style={{ lineHeight: 1.75 }}>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-6">
            <Link href="/banking/money-transfer" className="inline-flex items-center gap-2 text-sm font-bold" style={{ color: '#1A5C38' }}>
              Compare remittance services <ArrowRight />
            </Link>
            <Link href="/diaspora" className="inline-flex items-center gap-2 text-sm font-bold" style={{ color: '#1A5C38' }}>
              Diaspora hub <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ DARK TRUST ════════════════════════════════ */}
      <section style={{ background: '#0a1f14', padding: '72px 32px' }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: '#4ade80' }}>Data source</p>
            <h3 className="font-serif font-bold mb-2" style={{ fontSize: 'clamp(22px, 2.5vw, 30px)', color: '#ffffff', letterSpacing: '-0.8px' }}>
              The official NBE rate. Always labelled clearly.
            </h3>
            <p style={{ color: '#6b9e7e', fontSize: '15px', lineHeight: 1.75, maxWidth: 480 }}>
              BirrBank never presents a bank rate as the official rate. The NBE indicative
              rate is always displayed as the reference benchmark — clearly labelled
              as 'Official NBE Rate'. This distinction is both legally and reputationally important.
            </p>
          </div>
          <div className="shrink-0">
            
              href="https://nbe.gov.et/exchange/indicatives-rates/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-bold rounded-full transition-all"
              style={{ fontSize: 14, padding: '14px 28px', background: '#1A5C38', color: '#fff', boxShadow: '0 4px 20px rgba(26,92,56,0.35)' }}
            >
              View NBE source data <ArrowRight />
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ EMAIL CAPTURE ════════════════════════════ */}
      <section className="bg-white" style={{ padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">FX rate alerts</p>
            <h2
              className="font-serif font-bold text-slate-950 mb-5"
              style={{ fontSize: 'clamp(30px, 3.5vw, 42px)', letterSpacing: '-1.5px', lineHeight: 1.1 }}
            >
              Track ETB exchange<br />
              <span style={{ color: '#1A5C38' }}>rates every week.</span>
            </h2>
            <p className="text-slate-500 mb-8" style={{ fontSize: '15px', lineHeight: 1.85 }}>
              Weekly FX summary direct to your inbox — USD, GBP, EUR, SAR and AED
              vs ETB. Essential reading for the diaspora and businesses with import or export exposure.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Weekly NBE rate summary — all major currencies',
                'Notable bank spread changes and best rates',
                'FX policy updates from the National Bank of Ethiopia',
                'Remittance cost comparisons for the diaspora',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-slate-600">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A5C38" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
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
