import Link from 'next/link'
import EmailCapture from '@/components/EmailCapture'
import { createSupabaseAdminClient } from '@/lib/supabase'
export const dynamic = 'force-dynamic'

const CURRENCY_NAMES: Record<string, string> = {
  USD: 'US Dollar',
  GBP: 'British Pound',
  EUR: 'Euro',
  SAR: 'Saudi Riyal',
  AED: 'UAE Dirham',
  CNY: 'Chinese Yuan',
  INR: 'Indian Rupee',
  CHF: 'Swiss Franc',
}

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

function fmt(val: number | null) {
  if (val == null) return '—'
  return Number(val).toFixed(2)
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default async function FxRatesPage() {
  const supabase = createSupabaseAdminClient()
  const today = new Date().toISOString().split('T')[0]

  // NBE official rates for today
  const { data: nbeData } = await supabase
    .schema('birrbank')
    .from('exchange_rates')
    .select('currency_code, buying_rate, selling_rate, rate_date')
    .eq('institution_slug', 'nbe')
    .eq('rate_date', today)
    .order('currency_code')

  // Per-bank rates for today — USD, EUR, GBP
  const { data: bankRatesRaw } = await supabase
    .schema('birrbank')
    .from('exchange_rates')
    .select('institution_slug, currency_code, buying_rate, selling_rate, rate_date, institutions(name)')
    .neq('institution_slug', 'nbe')
    .eq('rate_date', today)
    .in('currency_code', ['USD', 'EUR', 'GBP'])
    .order('institution_slug')

  // Group bank rates by institution
  const bankMap: Record<string, any> = {}
  for (const r of (bankRatesRaw ?? [])) {
    const slug = r.institution_slug
    if (!bankMap[slug]) {
      bankMap[slug] = {
        bank: (r as any).institutions?.name ?? slug,
        verified: formatDate(r.rate_date),
      }
    }
    bankMap[slug][r.currency_code.toLowerCase() + '_buy']  = fmt(r.buying_rate)
    bankMap[slug][r.currency_code.toLowerCase() + '_sell'] = fmt(r.selling_rate)
  }
  const BANK_RATES = Object.values(bankMap)

  const NBE_RATES = (nbeData ?? []).map((r: any) => ({
    currency: r.currency_code,
    name:     CURRENCY_NAMES[r.currency_code] ?? r.currency_code,
    buy:      fmt(r.buying_rate),
    sell:     fmt(r.selling_rate),
  }))

  // NBE reference values for the table header row
  const nbeUSD = nbeData?.find((r: any) => r.currency_code === 'USD')
  const nbeEUR = nbeData?.find((r: any) => r.currency_code === 'EUR')
  const nbeGBP = nbeData?.find((r: any) => r.currency_code === 'GBP')
  const nbeRow = [
    fmt(nbeUSD?.buying_rate ?? null), fmt(nbeUSD?.selling_rate ?? null),
    fmt(nbeEUR?.buying_rate ?? null), fmt(nbeEUR?.selling_rate ?? null),
    fmt(nbeGBP?.buying_rate ?? null), fmt(nbeGBP?.selling_rate ?? null),
  ]

  const displayDate = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

  return (
    <div className="min-h-screen bg-white">

      {/* ══════════════════════════════ HERO ══════════════════════════════════════ */}
      <section className="relative bg-white overflow-hidden border-b border-slate-100">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 900px 500px at 55% -80px, rgba(29,78,216,0.04) 0%, transparent 65%)' }}
        />
        <div className="relative max-w-6xl mx-auto px-8 pt-20 pb-14">
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
              { icon: <ShieldIcon />, label: NBE_RATES.length + ' currencies vs ETB' },
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
      <section className="border-b border-slate-100 bg-white" style={{ padding: '64px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Official NBE rate</p>
              <h2
                className="font-serif font-bold text-slate-950"
                style={{ fontSize: 'clamp(22px, 2.8vw, 32px)', letterSpacing: '-1px', lineHeight: 1.15 }}
              >
                Today NBE indicative rates
              </h2>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-100 rounded-full px-3 py-1.5">
                Updated 09:30 EAT · {displayDate}
              </span>
            </div>
          </div>

          {NBE_RATES.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              {NBE_RATES.map((fx) => (
                <div
                  key={fx.currency}
                  className="bg-white rounded-2xl border border-slate-200 hover:border-blue-200 hover:shadow-md transition-all"
                  style={{ padding: '18px 16px' }}
                >
                  <div className="inline-flex items-center rounded-lg mb-3" style={{ background: '#1D4ED8', padding: '4px 10px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: '#ffffff', letterSpacing: '1px' }}>
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
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 text-center py-12">
              <p className="text-slate-500 text-sm">NBE rates are published at 09:30 EAT each business day. Check back after that time.</p>
            </div>
          )}

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
      <section className="border-b border-slate-100" style={{ background: '#ffffff', padding: '64px 32px 96px' }}>
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

            <div
              className="hidden lg:grid border-b border-slate-200"
              style={{ gridTemplateColumns: '1fr 100px 100px 100px 100px 100px 100px 110px', padding: '12px 24px', background: '#f9fafb' }}
            >
              {['Bank', 'USD Buy', 'USD Sell', 'EUR Buy', 'EUR Sell', 'GBP Buy', 'GBP Sell', 'Verified'].map((h) => (
                <p key={h} className="text-xs font-black text-slate-400 uppercase tracking-widest">{h}</p>
              ))}
            </div>

            {/* NBE reference row */}
            <div
              className="hidden lg:grid items-center border-b-2 border-blue-200"
              style={{ gridTemplateColumns: '1fr 100px 100px 100px 100px 100px 100px 110px', padding: '14px 24px', background: '#eff6ff' }}
            >
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase rounded-full px-2 py-0.5" style={{ background: '#1D4ED8', color: '#fff' }}>NBE</span>
                <p className="font-bold text-blue-900" style={{ fontSize: '13px' }}>Official NBE Indicative</p>
              </div>
              {nbeRow.map((v, i) => (
                <p key={i} className="font-mono font-bold text-blue-700" style={{ fontSize: '14px' }}>{v}</p>
              ))}
              <p className="text-xs font-bold text-blue-700">Daily · Official</p>
            </div>

            {BANK_RATES.length > 0 ? BANK_RATES.map((r: any) => (
              <div key={r.bank}>
                <div
                  className="hidden lg:grid items-center border-b border-slate-100 bg-white hover:bg-slate-50 transition-colors"
                  style={{ gridTemplateColumns: '1fr 100px 100px 100px 100px 100px 100px 110px', padding: '13px 24px' }}
                >
                  <p className="font-semibold text-slate-800" style={{ fontSize: '14px' }}>{r.bank}</p>
                  <p className="font-mono text-slate-600" style={{ fontSize: '13px' }}>{r.usd_buy ?? '—'}</p>
                  <p className="font-mono font-bold text-slate-800" style={{ fontSize: '14px' }}>{r.usd_sell ?? '—'}</p>
                  <p className="font-mono text-slate-600" style={{ fontSize: '13px' }}>{r.eur_buy ?? '—'}</p>
                  <p className="font-mono font-bold text-slate-800" style={{ fontSize: '14px' }}>{r.eur_sell ?? '—'}</p>
                  <p className="font-mono text-slate-600" style={{ fontSize: '13px' }}>{r.gbp_buy ?? '—'}</p>
                  <p className="font-mono font-bold text-slate-800" style={{ fontSize: '14px' }}>{r.gbp_sell ?? '—'}</p>
                  <div className="flex items-center gap-1.5">
                    <span style={{ color: '#1D4ED8' }}><ClockIcon /></span>
                    <p className="text-xs text-slate-400">{r.verified}</p>
                  </div>
                </div>
                <div className="lg:hidden border-b border-slate-100 bg-white" style={{ padding: '14px 16px' }}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-bold text-slate-800 text-sm">{r.bank}</p>
                    <div className="flex items-center gap-1 text-xs text-slate-400">
                      <ClockIcon /><span>{r.verified}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: 'USD sell', val: r.usd_sell ?? '—' },
                      { label: 'EUR sell', val: r.eur_sell ?? '—' },
                      { label: 'GBP sell', val: r.gbp_sell ?? '—' },
                    ].map((fx) => (
                      <div key={fx.label} className="bg-slate-50 rounded-lg text-center" style={{ padding: '8px' }}>
                        <p className="text-xs text-slate-400 mb-1">{fx.label}</p>
                        <p className="font-mono font-bold text-slate-800" style={{ fontSize: '14px' }}>{fx.val}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )) : (
              <div className="py-10 text-center">
                <p className="text-sm text-slate-400">Per-bank rates are updated daily. Check back soon.</p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-slate-200" style={{ background: '#f9fafb', padding: '14px 24px' }}>
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
              { step: '01', title: 'NBE indicative vs bank rate', body: 'The NBE publishes a daily indicative rate — the official benchmark. Banks set their own buying and selling rates within an allowed margin. The spread between buy and sell is the bank FX revenue.' },
              { step: '02', title: 'Buy rate vs sell rate', body: 'The sell rate is what you pay when purchasing foreign currency. The buy rate is what you receive when selling foreign currency to the bank. Sell is always higher.' },
              { step: '03', title: 'Diaspora transfers', body: 'For remittances, the effective rate includes both the FX rate and any transfer fee. Compare the total cost — not just the headline rate — when choosing between banks and money transfer agencies.' },
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
      <section className="border-b border-slate-100" style={{ background: '#0f172a', padding: '72px 32px' }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: '#93c5fd' }}>Source transparency</p>
            <h3 className="font-serif font-bold mb-2" style={{ fontSize: 'clamp(22px, 2.5vw, 30px)', color: '#ffffff', letterSpacing: '-0.8px' }}>
              The NBE rate is always labelled. Always.
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: 1.75, maxWidth: 480 }}>
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
              Weekly FX digest for diaspora and businesses. Know when the rate moves before you transfer.
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
