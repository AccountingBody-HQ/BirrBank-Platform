import type { Metadata } from 'next'
import Link from 'next/link'
import EmailCapture from '@/components/EmailCapture'
import { createSupabaseAdminClient } from '@/lib/supabase'
import { ChevronRight } from 'lucide-react'
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Ethiopian FX Rates — NBE Official vs All Banks | BirrBank',
  description: 'Compare official NBE indicative FX rates against per-bank buying and selling rates for USD, EUR, GBP, SAR and AED vs ETB.',
}

const CURRENCY_NAMES: Record<string, string> = {
  USD:'US Dollar', GBP:'British Pound', EUR:'Euro', SAR:'Saudi Riyal',
  AED:'UAE Dirham', CNY:'Chinese Yuan', INR:'Indian Rupee', CHF:'Swiss Franc',
}

function fmt(val: number | null) {
  if (val == null) return '—'
  return Number(val).toFixed(2)
}
function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })
}

export default async function FxRatesPage() {
  const supabase = createSupabaseAdminClient()

  const [nbeRes, bankRatesRes] = await Promise.all([
    supabase.schema('birrbank').from('exchange_rates')
      .select('currency_code, buying_rate, selling_rate, rate_date')
      .eq('institution_slug', 'nbe')
      .order('rate_date', { ascending: false })
      .order('currency_code')
      .limit(16),
    supabase.schema('birrbank').from('exchange_rates')
      .select('institution_slug, currency_code, buying_rate, selling_rate, rate_date, institutions(name)')
      .neq('institution_slug', 'nbe')
      .order('rate_date', { ascending: false })
      .in('currency_code', ['USD','EUR','GBP'])
      .limit(200),
  ])

  // Dedupe NBE — one per currency (most recent)
  const nbeMap: Record<string, any> = {}
  for (const r of (nbeRes.data ?? [])) {
    if (!nbeMap[r.currency_code]) nbeMap[r.currency_code] = r
  }
  const NBE_RATES = Object.values(nbeMap).map((r: any) => ({
    currency: r.currency_code,
    name: CURRENCY_NAMES[r.currency_code] ?? r.currency_code,
    buy: fmt(r.buying_rate), sell: fmt(r.selling_rate),
  }))

  // Dedupe bank rates — one per institution per currency (most recent)
  const bankMap: Record<string, any> = {}
  for (const r of (bankRatesRes.data ?? [])) {
    const slug = r.institution_slug
    if (!bankMap[slug]) bankMap[slug] = { bank: (r as any).institutions?.name ?? slug, verified: formatDate(r.rate_date) }
    if (!bankMap[slug][r.currency_code.toLowerCase() + '_buy']) {
      bankMap[slug][r.currency_code.toLowerCase() + '_buy'] = fmt(r.buying_rate)
      bankMap[slug][r.currency_code.toLowerCase() + '_sell'] = fmt(r.selling_rate)
    }
  }
  const BANK_RATES = Object.values(bankMap)

  const nbeUSD = nbeMap['USD'], nbeEUR = nbeMap['EUR'], nbeGBP = nbeMap['GBP']
  const nbeRow = [
    fmt(nbeUSD?.buying_rate ?? null), fmt(nbeUSD?.selling_rate ?? null),
    fmt(nbeEUR?.buying_rate ?? null), fmt(nbeEUR?.selling_rate ?? null),
    fmt(nbeGBP?.buying_rate ?? null), fmt(nbeGBP?.selling_rate ?? null),
  ]

  const displayDate = new Date().toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })

  return (
    <main className="bg-white flex-1">

      {/* DARK HERO */}
      <section className="relative overflow-hidden" style={{ background: '#0f172a' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 60% 0%, rgba(29,78,216,0.18) 0%, transparent 60%), radial-gradient(ellipse at 0% 100%, rgba(14,30,80,0.4) 0%, transparent 50%)' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-0">
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8">
            <Link href="/" className="hover:text-slate-300 transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/banking" className="hover:text-slate-300 transition-colors">Banking</Link>
            <ChevronRight size={12} />
            <span className="text-slate-400">FX Rates</span>
          </nav>
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold mb-6"
            style={{ background: 'rgba(29,78,216,0.15)', color: '#93c5fd', border: '1px solid rgba(29,78,216,0.3)' }}>
            Banking — FX Rates
          </div>
          <h1 className="font-serif font-bold text-white mb-4"
            style={{ fontSize: 'clamp(38px, 4.5vw, 56px)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
            Ethiopian FX rates — NBE official vs all banks.
          </h1>
          <p className="text-slate-400 mb-8" style={{ fontSize: '16px', lineHeight: 1.8, maxWidth: '520px' }}>
            The National Bank of Ethiopia publishes indicative rates daily at 09:30 EAT. Compare the official benchmark against buying and selling rates from every commercial bank.
          </p>
          <div className="flex flex-wrap gap-3 mb-10">
            <Link href="/banking/savings-rates"
              className="font-bold rounded-full transition-all text-center"
              style={{ fontSize: 15, padding: '14px 32px', minWidth: 200, background: '#1D4ED8', color: '#fff' }}>
              Compare savings rates
            </Link>
            <Link href="/diaspora/remittance"
              className="font-bold rounded-full transition-all text-center"
              style={{ fontSize: 15, padding: '14px 32px', minWidth: 200, border: '1.5px solid rgba(255,255,255,0.2)', color: '#fff' }}>
              Compare remittance
            </Link>
          </div>
          <div className="grid grid-cols-3 mt-2 pt-8 border-t border-slate-800">
            {[
              { value: String(NBE_RATES.length), label: 'Currencies tracked' },
              { value: 'Daily', label: 'NBE update frequency' },
              { value: String(BANK_RATES.length), label: 'Banks with FX rates' },
            ].map(s => (
              <div key={s.label} className="text-center py-6 border-r border-slate-800 last:border-r-0">
                <div className="font-mono font-black text-white mb-1" style={{ fontSize: 'clamp(22px, 3vw, 36px)', letterSpacing: '-1px' }}>{s.value}</div>
                <div className="text-xs font-semibold text-slate-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NBE OFFICIAL RATES */}
      <section style={{ background: '#ffffff', padding: '64px 0' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <h2 className="font-serif font-bold text-slate-950"
              style={{ fontSize: 'clamp(22px, 2.8vw, 32px)', letterSpacing: '-0.5px' }}>
              NBE indicative rates today
            </h2>
            <div className="flex items-center gap-2 shrink-0">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-100 rounded-full px-3 py-1.5">
                Updated 09:30 EAT · {displayDate}
              </span>
            </div>
          </div>
          {NBE_RATES.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              {NBE_RATES.map(fx => (
                <div key={fx.currency} className="bg-white rounded-2xl border border-slate-200 hover:border-blue-200 hover:shadow-md transition-all overflow-hidden">
                  <div style={{ height: 4, background: 'linear-gradient(90deg, #1D4ED8, #1E40AF)' }} />
                  <div style={{ padding: '16px' }}>
                    <div className="inline-flex items-center rounded-lg mb-3" style={{ background: '#1D4ED8', padding: '4px 10px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 800, color: '#fff', letterSpacing: '1px' }}>{fx.currency}</span>
                    </div>
                    <p className="text-xs text-slate-400 font-medium mb-0.5 truncate">{fx.name}</p>
                    <p className="font-mono font-black text-slate-950 leading-none mb-2" style={{ fontSize: '22px', letterSpacing: '-0.5px' }}>{fx.sell}</p>
                    <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                      <span className="text-xs text-slate-400">Buy</span>
                      <span className="font-mono font-semibold text-slate-500" style={{ fontSize: '12px' }}>{fx.buy}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 text-center py-12">
              <p className="text-slate-500 text-sm">NBE rates are published at 09:30 EAT each business day.</p>
            </div>
          )}
          <p className="text-xs text-slate-400 mt-4">
            Official NBE rate — Published by the National Bank of Ethiopia. Source: nbe.gov.et
          </p>
        </div>
      </section>

      {/* PER-BANK TABLE */}
      <section style={{ background: '#f8fafc', padding: '64px 0 96px' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif font-bold text-slate-950 mb-2"
            style={{ fontSize: 'clamp(22px, 2.8vw, 32px)', letterSpacing: '-0.5px' }}>
            USD · EUR · GBP — all banks compared
          </h2>
          <p className="text-slate-500 mb-8" style={{ fontSize: '14px' }}>
            Sell rate is what you pay when buying foreign currency. Buy rate is what you receive when selling.
          </p>
          <div className="rounded-2xl overflow-hidden border border-slate-200" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <div style={{ height: 4, background: 'linear-gradient(90deg, #1D4ED8, #1E40AF)' }} />
            <div className="hidden lg:grid border-b border-slate-200"
              style={{ gridTemplateColumns: '1fr 100px 100px 100px 100px 100px 100px 110px', padding: '12px 24px', background: '#f8fafc' }}>
              {['Bank','USD Buy','USD Sell','EUR Buy','EUR Sell','GBP Buy','GBP Sell','Verified'].map(h => (
                <p key={h} className="text-xs font-black text-slate-400 uppercase tracking-widest">{h}</p>
              ))}
            </div>
            {/* NBE reference row */}
            <div className="hidden lg:grid items-center border-b-2 border-blue-200"
              style={{ gridTemplateColumns: '1fr 100px 100px 100px 100px 100px 100px 110px', padding: '14px 24px', background: '#eff6ff' }}>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase rounded-full px-2 py-0.5" style={{ background: '#1D4ED8', color: '#fff' }}>NBE</span>
                <p className="font-bold text-blue-900" style={{ fontSize: '13px' }}>Official NBE Indicative</p>
              </div>
              {nbeRow.map((v, i) => <p key={i} className="font-mono font-bold text-blue-700" style={{ fontSize: '14px' }}>{v}</p>)}
              <p className="text-xs font-bold text-blue-700">Daily · Official</p>
            </div>
            {BANK_RATES.length > 0 ? BANK_RATES.map((r: any) => (
              <div key={r.bank}>
                <div className="hidden lg:grid items-center border-b border-slate-100 bg-white hover:bg-slate-50 transition-colors"
                  style={{ gridTemplateColumns: '1fr 100px 100px 100px 100px 100px 100px 110px', padding: '13px 24px' }}>
                  <p className="font-semibold text-slate-800" style={{ fontSize: '14px' }}>{r.bank}</p>
                  <p className="font-mono text-slate-600" style={{ fontSize: '13px' }}>{r.usd_buy ?? '—'}</p>
                  <p className="font-mono font-bold text-slate-800" style={{ fontSize: '14px' }}>{r.usd_sell ?? '—'}</p>
                  <p className="font-mono text-slate-600" style={{ fontSize: '13px' }}>{r.eur_buy ?? '—'}</p>
                  <p className="font-mono font-bold text-slate-800" style={{ fontSize: '14px' }}>{r.eur_sell ?? '—'}</p>
                  <p className="font-mono text-slate-600" style={{ fontSize: '13px' }}>{r.gbp_buy ?? '—'}</p>
                  <p className="font-mono font-bold text-slate-800" style={{ fontSize: '14px' }}>{r.gbp_sell ?? '—'}</p>
                  <p className="text-xs text-slate-400">{r.verified}</p>
                </div>
                <div className="lg:hidden border-b border-slate-100 bg-white" style={{ padding: '14px 16px' }}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-bold text-slate-800 text-sm">{r.bank}</p>
                    <p className="text-xs text-slate-400">{r.verified}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[{ label:'USD sell', val:r.usd_sell??'—' },{ label:'EUR sell', val:r.eur_sell??'—' },{ label:'GBP sell', val:r.gbp_sell??'—' }].map(fx => (
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
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-slate-200"
              style={{ background: '#f8fafc', padding: '14px 24px' }}>
              <p className="text-xs text-slate-400">Rates sourced from individual bank websites · NBE rate from nbe.gov.et · All rates ETB per 1 foreign unit</p>
              <Link href="/institutions?type=bank" className="text-xs font-bold" style={{ color: '#1D4ED8' }}>View all bank profiles →</Link>
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-5 text-center">FX rates for comparison only. Confirm with the institution before any currency exchange.</p>
        </div>
      </section>

      {/* HOW FX WORKS */}
      <section style={{ background: '#ffffff', padding: '96px 0' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif font-bold text-slate-950 mb-10"
            style={{ fontSize: 'clamp(26px, 3vw, 38px)', letterSpacing: '-0.5px' }}>
            Understanding Ethiopian FX rates.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { step:'01', title:'NBE indicative vs bank rate', body:'The NBE publishes a daily indicative rate — the official benchmark. Banks set their own buying and selling rates within an allowed margin. The spread between buy and sell is the bank FX revenue.' },
              { step:'02', title:'Buy rate vs sell rate', body:'The sell rate is what you pay when purchasing foreign currency. The buy rate is what you receive when selling foreign currency to the bank. Sell is always higher.' },
              { step:'03', title:'Diaspora transfers', body:'For remittances, the effective rate includes both the FX rate and any transfer fee. Compare the total cost — not just the headline rate — when choosing between banks and transfer agencies.' },
            ].map(s => (
              <div key={s.step} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-blue-300 hover:shadow-lg transition-all">
                <div style={{ height: 4, background: 'linear-gradient(90deg, #1D4ED8, #1E40AF)' }} />
                <div style={{ padding: '28px 24px' }}>
                  <p className="font-mono font-black mb-3" style={{ fontSize: '32px', color: '#e2e8f0', lineHeight: 1 }}>{s.step}</p>
                  <p className="font-bold text-slate-900 mb-3" style={{ fontSize: '15px' }}>{s.title}</p>
                  <p className="text-sm text-slate-500" style={{ lineHeight: 1.75 }}>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-6">
            <Link href="/diaspora/remittance" className="flex items-center gap-1 text-sm font-bold" style={{ color: '#1D4ED8' }}>
              Compare remittance services <ChevronRight size={13} />
            </Link>
            <Link href="/guides" className="flex items-center gap-1 text-sm font-bold" style={{ color: '#1D4ED8' }}>
              Read all FX guides <ChevronRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* DARK TRUST */}
      <section style={{ background: '#0f172a', padding: '72px 0', borderTop: '1px solid #1e293b' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: '#93c5fd' }}>Source transparency</p>
            <h3 className="font-serif font-bold mb-2"
              style={{ fontSize: 'clamp(22px, 2.5vw, 30px)', color: '#ffffff', letterSpacing: '-0.5px' }}>
              The NBE rate is always labelled. Always.
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: 1.75, maxWidth: 480 }}>
              BirrBank never presents a bank rate as the official rate. The NBE indicative rate is always clearly identified as the regulatory benchmark.
            </p>
          </div>
          <Link href="/banking/money-transfer"
            className="font-bold rounded-full transition-all shrink-0"
            style={{ fontSize: 14, padding: '14px 28px', background: '#1D4ED8', color: '#fff', whiteSpace: 'nowrap' }}>
            Compare money transfer
          </Link>
        </div>
      </section>

      {/* EMAIL CAPTURE */}
      <section style={{ background:'#ffffff', padding:'96px 0' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-serif font-bold text-slate-950 mb-5"
              style={{ fontSize:'clamp(30px, 3.5vw, 42px)', letterSpacing:'-0.5px', lineHeight:1.1 }}>
              Track ETB exchange rates from anywhere in the world.
            </h2>
            <p className="text-slate-500 mb-8" style={{ fontSize:'15px', lineHeight:1.85 }}>
              Weekly FX digest for diaspora and businesses. Know when the rate moves before you transfer.
            </p>
            <ul className="space-y-3 mb-8">
              {['USD, GBP, EUR, SAR and AED vs ETB weekly summary','Best bank buying and selling rates each week','NBE policy changes affecting exchange rates','Cheapest remittance corridors for diaspora'].map(item => (
                <li key={item} className="flex items-center gap-3 text-sm text-slate-600">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><polyline points="20 6 9 17 4 12"/></svg>
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-xs text-slate-500 font-medium pt-5 border-t border-slate-100">Free forever · No credit card · Unsubscribe anytime</p>
          </div>
          <EmailCapture />
        </div>
      </section>

    </main>
  )
}
