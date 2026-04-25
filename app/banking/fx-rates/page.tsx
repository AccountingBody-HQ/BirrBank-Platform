import Link from 'next/link'
import EmailCapture from '@/components/EmailCapture'
export const dynamic = 'force-dynamic'

// ─── Placeholder data — replace with Supabase queries in Phase 2 ─────────────
// FX rates stored as ETB per 1 foreign currency unit. Never inverse.

const NBE_RATES = [
  { currency: 'USD', name: 'US Dollar',       flag: '🇺🇸', buy: '155.90', sell: '156.40', bg: '#1D4ED8' },
  { currency: 'GBP', name: 'British Pound',   flag: '🇬🇧', buy: '197.20', sell: '197.82', bg: '#1D4ED8' },
  { currency: 'EUR', name: 'Euro',             flag: '🇪🇺', buy: '168.50', sell: '169.12', bg: '#1D4ED8' },
  { currency: 'SAR', name: 'Saudi Riyal',      flag: '🇸🇦', buy: '41.40',  sell: '41.70',  bg: '#1D4ED8' },
  { currency: 'AED', name: 'UAE Dirham',       flag: '🇦🇪', buy: '42.30',  sell: '42.60',  bg: '#1D4ED8' },
  { currency: 'CNY', name: 'Chinese Yuan',     flag: '🇨🇳', buy: '21.40',  sell: '21.58',  bg: '#1D4ED8' },
  { currency: 'INR', name: 'Indian Rupee',     flag: '🇮🇳', buy: '1.84',   sell: '1.86',   bg: '#1D4ED8' },
  { currency: 'CHF', name: 'Swiss Franc',      flag: '🇨🇭', buy: '172.10', sell: '172.80', bg: '#1D4ED8' },
]

const BANK_RATES = [
  { bank: 'Commercial Bank of Ethiopia', usd_buy: '155.75', usd_sell: '156.55', eur_buy: '168.20', eur_sell: '169.30', gbp_buy: '196.90', gbp_sell: '198.10', verified: '25 Apr 2026' },
  { bank: 'Awash Bank',                  usd_buy: '155.85', usd_sell: '156.45', eur_buy: '168.40', eur_sell: '169.10', gbp_buy: '197.10', gbp_sell: '197.90', verified: '25 Apr 2026' },
  { bank: 'Dashen Bank',                 usd_buy: '155.80', usd_sell: '156.50', eur_buy: '168.30', eur_sell: '169.20', gbp_buy: '197.00', gbp_sell: '198.00', verified: '24 Apr 2026' },
  { bank: 'Bank of Abyssinia',           usd_buy: '155.70', usd_sell: '156.60', eur_buy: '168.10', eur_sell: '169.40', gbp_buy: '196.80', gbp_sell: '198.20', verified: '24 Apr 2026' },
  { bank: 'Zemen Bank',                  usd_buy: '155.90', usd_sell: '156.40', eur_buy: '168.50', eur_sell: '169.05', gbp_buy: '197.20', gbp_sell: '197.80', verified: '23 Apr 2026' },
  { bank: 'Wegagen Bank',                usd_buy: '155.65', usd_sell: '156.55', eur_buy: '168.00', eur_sell: '169.20', gbp_buy: '196.70', gbp_sell: '198.00', verified: '23 Apr 2026' },
  { bank: 'Nib International Bank',      usd_buy: '155.70', usd_sell: '156.50', eur_buy: '168.10', eur_sell: '169.15', gbp_buy: '196.90', gbp_sell: '197.90', verified: '22 Apr 2026' },
  { bank: 'Oromia International',        usd_buy: '155.60', usd_sell: '156.60', eur_buy: '167.90', eur_sell: '169.30', gbp_buy: '196.60', gbp_sell: '198.10', verified: '22 Apr 2026' },
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

const ShieldIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
)

export default function FxRatesPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ══════════════════════════════ HERO ══════════════════════════════════════ */}
      <section className="relative bg-white overflow-hidden border-b border-slate-100">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 900px 500px at 55% -80px, rgba(29,78,216,0.04) 0%, transparent 65%)' }}
        />
        <div className="relative max-w-6xl mx-auto px-8 pt-20 pb-14">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-6">
            <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
            <span>›</span>
            <Link href="/banking" className="hover:text-slate-600 transition-colors">Banking</Link>
            <span>›</span>
            <span style={{ color: '#1D4ED8', fontWeight: 700 }}>FX Rates</span>
          </div>

          <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: '#1D4ED8' }}>
            Banking · FX Rates
          </p>
          <h1
            className="font-serif font-bold mb-5 text-slate-950"
            style={{ fontSize: 'clamp(36px, 4.5vw, 54px)', letterSpacing: '-1.8px', lineHeight: 1.08 }}
          >
            Ethiopian FX rates —<br />
            <span style={{ color: '#1D4ED8' }}>NBE official vs all banks.</span>
          </h1>
          <p className="text-slate-600 mb-8" style={{ fontSize: '16px', lineHeight: '1.8', maxWidth: '520px' }}>
            The National Bank of Ethiopia publishes indicative rates daily at 09:30 EAT.
            Compare the official benchmark against buying and selling rates from every commercial bank.
          </p>

          <div className="flex flex-wrap gap-6">
            {[
              { icon: <ShieldIcon />, label: 'Official NBE indicative rates' },
              { icon: <ClockIcon />,  label: 'Updated 09:30 EAT every business day' },
              { icon: <ShieldIcon />, label: '8 major currencies vs ETB' },
              { icon: <ClockIcon />,  label: 'Per-bank buying and selling rates' },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <span style={{ color: '#1D4ED8' }}>{s.icon}</span>
                <span className="text-xs font-semibold text-slate-500">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ NBE OFFICIAL RATES GRID ═══════════════════════════ */}
      {/* NO ADS ON THIS PAGE — FX dashboard integrity rule */}
      <section className="border-b border-slate-100 bg-white" style={{ padding: '64px 32px' }}>
        <div className="max-w-6xl mx-auto">

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Official NBE rate</p>
              <h2
                className="font-serif font-bold text-slate-950"
                style={{ fontSize: 'clamp(22px, 2.8vw, 32px)', letterSpacing: '-1px', lineHeight: 1.15 }}
              >
                Today's NBE indicative rates
              </h2>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-100 rounded-full px-3 py-1.5">
                Updated 09:30 EAT · 25 Apr 2026
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {NBE_RATES.map((fx) => (
              <div
                key={fx.currency}
                className="bg-white rounded-2xl border border-slate-200 hover:border-blue-200 hover:shadow-md transition-all"
                style={{ padding: '18px 16px' }}
              >
                <div
                  className="inline-flex items-center rounded-lg mb-3"
                  style={{ background: '#f1f5f9', padding: '4px 10px' }}
                >
                  <span style={{ fontSize: '11px', fontWeight: 800, color: '#1D4ED8', letterSpacing: '1px' }}>
                    {fx.currency}
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-medium mb-0.5 truncate">{fx.name}</p>
                <p className="text-xs text-slate-400 mb-1" style={{ fontSize: '10px' }}>ETB per 1 {fx.currency}</p>
                <p className="font-mono font-black text-slate-950 leading-none mb-2" style={{ fontSize: '22px', letterSpacing: '-0.5px' }}>
                  {fx.sell}
                </p>
                <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                  <span className="text-xs text-slate-400">Buy</span>
                  <span className="font-mono font-semibold text-slate-500" style={{ fontSize: '12px' }}>{fx.buy}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-start gap-2 text-xs text-slate-400">
            <ShieldIcon />
            <p>
              <strong className="text-slate-600">Official NBE Rate</strong> — Published by the National Bank of Ethiopia.
              This is the regulatory benchmark. Individual bank rates may vary.
              Source: <span style={{ color: '#1D4ED8', fontWeight: 600 }}>nbe.gov.et/exchange/indicatives-rates/</span>
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════ PER-BANK RATE COMPARISON TABLE ════════════════════ */}
      <section className="border-b border-slate-100" style={{ background: '#f8faf8', padding: '64px 32px 96px' }}>
        <div className="max-w-6xl mx-auto">

          <div className="mb-8">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Bank-by-bank comparison</p>
            <h2
              className="font-serif font-bold text-slate-950"
              style={{ fontSize: 'clamp(22px, 2.8vw, 32px)', letterSpacing: '-1px', lineHeight: 1.15 }}
            >
              USD · EUR · GBP — all banks compared
            </h2>
            <p className="text-slate-500 mt-2" style={{ fontSize: '14px' }}>
              Sell rate is what you pay when buying foreign currency. Buy rate is what you receive when selling.
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-200" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <div style={{ height: 4, background: 'linear-gradient(90deg, #1D4ED8, #1E40AF)' }} />

            {/* Header */}
            <div
              className="hidden lg:grid border-b border-slate-200"
              style={{ gridTemplateColumns: '1fr 100px 100px 100px 100px 100px 100px 110px', padding: '12px 24px', background: '#f8fafc' }}
            >
              {['Bank', 'USD Buy', 'USD Sell', 'EUR Buy', 'EUR Sell', 'GBP Buy', 'GBP Sell', 'Verified'].map((h) => (
                <p key={h} className="text-xs font-black text-slate-400 uppercase tracking-widest">{h}</p>
              ))}
            </div>

            {/* NBE reference row */}
            <div
              className="hidden lg:grid items-center border-b-2 border-blue-200"
              style={{ gridTemplateColumns: '1fr 100px 100px 100px 100px 100px 100px 110px', padding: '14px 24px', background: '#f0fdf4' }}
            >
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase rounded-full px-2 py-0.5" style={{ background: '#1D4ED8', color: '#fff' }}>NBE</span>
                <p className="font-bold text-blue-900" style={{ fontSize: '13px' }}>Official NBE Indicative</p>
              </div>
              {['155.90', '156.40', '168.50', '169.12', '197.20', '197.82'].map((v) => (
                <p key={v} className="font-mono font-bold text-blue-700" style={{ fontSize: '14px' }}>{v}</p>
              ))}
              <p className="text-xs font-bold text-blue-700">Daily · Official</p>
            </div>

            {/* Bank rows */}
            {BANK_RATES.map((r, i) => (
              <div
                key={r.bank}
                className="hidden lg:grid items-center border-b border-slate-100 bg-white hover:bg-slate-50 transition-colors"
                style={{ gridTemplateColumns: '1fr 100px 100px 100px 100px 100px 100px 110px', padding: '13px 24px' }}
              >
                <p className="font-semibold text-slate-800" style={{ fontSize: '14px' }}>{r.bank}</p>
                <p className="font-mono text-slate-600" style={{ fontSize: '13px' }}>{r.usd_buy}</p>
                <p className="font-mono font-bold text-slate-800" style={{ fontSize: '14px' }}>{r.usd_sell}</p>
                <p className="font-mono text-slate-600" style={{ fontSize: '13px' }}>{r.eur_buy}</p>
                <p className="font-mono font-bold text-slate-800" style={{ fontSize: '14px' }}>{r.eur_sell}</p>
                <p className="font-mono text-slate-600" style={{ fontSize: '13px' }}>{r.gbp_buy}</p>
                <p className="font-mono font-bold text-slate-800" style={{ fontSize: '14px' }}>{r.gbp_sell}</p>
                <div className="flex items-center gap-1.5">
                  <span style={{ color: '#1D4ED8' }}><ClockIcon /></span>
                  <p className="text-xs text-slate-400">{r.verified}</p>
                </div>
              </div>
            ))}

            {/* Mobile rows */}
            {BANK_RATES.map((r) => (
              <div key={r.bank + '-mob'} className="lg:hidden border-b border-slate-100 bg-white" style={{ padding: '14px 16px' }}>
                <div className="flex items-center justify-between mb-2">
                  <p className="font-bold text-slate-800 text-sm">{r.bank}</p>
                  <div className="flex items-center gap-1 text-xs text-slate-400">
                    <ClockIcon /><span>{r.verified}</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: 'USD sell', val: r.usd_sell },
                    { label: 'EUR sell', val: r.eur_sell },
                    { label: 'GBP sell', val: r.gbp_sell },
                  ].map((fx) => (
                    <div key={fx.label} className="bg-slate-50 rounded-lg text-center" style={{ padding: '8px' }}>
                      <p className="text-xs text-slate-400 mb-1">{fx.label}</p>
                      <p className="font-mono font-bold text-slate-800" style={{ fontSize: '14px' }}>{fx.val}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Table footer */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-slate-200 bg-slate-50" style={{ padding: '14px 24px' }}>
              <p className="text-xs text-slate-400">
                Rates sourced from individual bank websites · NBE rate from nbe.gov.et · All rates ETB per 1 foreign unit
              </p>
              <Link href="/institutions" className="text-xs font-bold hover:underline shrink-0" style={{ color: '#1D4ED8' }}>
                View all 32 bank profiles →
              </Link>
            </div>
          </div>

          <p className="text-xs text-slate-400 mt-5 text-center leading-relaxed">
            FX rates are for comparison purposes only. Actual rates at the point of transaction may differ.
            Always confirm with the institution before any currency exchange.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════ HOW FX WORKS ═════════════════════════════ */}
      <section className="border-b border-slate-100 bg-white" style={{ padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Guide</p>
            <h2
              className="font-serif font-bold text-slate-950"
              style={{ fontSize: 'clamp(26px, 3vw, 36px)', letterSpacing: '-1.2px', lineHeight: 1.15 }}
            >
              Understanding Ethiopian FX rates.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                title: 'NBE indicative vs bank rate',
                body: 'The NBE publishes a daily indicative rate — the official benchmark. Banks set their own buying and selling rates within an allowed margin. The spread between buy and sell is the bank\'s FX revenue.',
              },
              {
                step: '02',
                title: 'Buy rate vs sell rate',
                body: 'The sell rate is what you pay when purchasing foreign currency (e.g. sending money abroad). The buy rate is what you receive when selling foreign currency to the bank. Sell is always higher.',
              },
              {
                step: '03',
                title: 'Diaspora transfers',
                body: 'For remittances, the effective rate includes both the FX rate and any transfer fee. Compare the total cost — not just the headline rate — when choosing between banks and money transfer agencies.',
              },
            ].map((s) => (
              <div key={s.step} className="bg-white rounded-2xl border border-slate-200 overflow-hidden" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                <div style={{ height: 3, background: '#1D4ED8' }} />
                <div style={{ padding: '28px 24px' }}>
                  <p className="font-mono font-black mb-3" style={{ fontSize: '32px', color: '#e2e8f0', lineHeight: 1 }}>{s.step}</p>
                  <p className="font-bold text-slate-900 mb-3" style={{ fontSize: '15px' }}>{s.title}</p>
                  <p className="text-sm text-slate-500" style={{ lineHeight: 1.75 }}>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-6">
            <Link href="/diaspora/remittance" className="inline-flex items-center gap-2 text-sm font-bold" style={{ color: '#1D4ED8' }}>
              Compare remittance services <ArrowRight />
            </Link>
            <Link href="/guides" className="inline-flex items-center gap-2 text-sm font-bold" style={{ color: '#1D4ED8' }}>
              Read all FX guides <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ DARK TRUST ════════════════════════════════ */}
      <section className="border-b border-slate-100" style={{ background: '#0a1f14', padding: '72px 32px' }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: '#4ade80' }}>Source transparency</p>
            <h3 className="font-serif font-bold mb-2" style={{ fontSize: 'clamp(22px, 2.5vw, 30px)', color: '#ffffff', letterSpacing: '-0.8px' }}>
              The NBE rate is always labelled. Always.
            </h3>
            <p style={{ color: '#6b9e7e', fontSize: '15px', lineHeight: 1.75, maxWidth: 480 }}>
              BirrBank never presents a bank rate as if it is the official rate.
              The NBE indicative rate is always clearly identified as the regulatory
              benchmark — distinguishing it from commercial bank rates is a legal
              and reputational requirement we treat as non-negotiable.
            </p>
          </div>
          <Link
            href="/banking/money-transfer"
            className="font-bold rounded-full transition-all shrink-0"
            style={{ fontSize: 14, padding: '14px 28px', background: '#1D4ED8', color: '#fff', whiteSpace: 'nowrap', boxShadow: '0 4px 20px rgba(29,78,216,0.25)' }}
          >
            Compare money transfer →
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════ EMAIL CAPTURE ════════════════════════════ */}
      <section className="bg-white" style={{ padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Daily FX alerts</p>
            <h2
              className="font-serif font-bold text-slate-950 mb-5"
              style={{ fontSize: 'clamp(30px, 3.5vw, 42px)', letterSpacing: '-1.5px', lineHeight: 1.1 }}
            >
              Track ETB exchange rates<br />
              <span style={{ color: '#1D4ED8' }}>from anywhere in the world.</span>
            </h2>
            <p className="text-slate-500 mb-8" style={{ fontSize: '15px', lineHeight: 1.85 }}>
              Weekly FX digest for diaspora and businesses. Know when the
              rate moves before you transfer.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'USD, GBP, EUR, SAR and AED vs ETB weekly summary',
                'Best bank buying and selling rates each week',
                'NBE policy changes affecting exchange rates',
                'Cheapest remittance corridors for diaspora',
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
