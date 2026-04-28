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
  USD:'US Dollar', GBP:'Pound Sterling', EUR:'Euro', SAR:'Saudi Riyal',
  AED:'UAE Dirham', CNY:'Chinese Yuan', INR:'Indian Rupee', CHF:'Swiss Franc',
  JPY:'Japanese Yen', CAD:'Canadian Dollar', AUD:'Australian Dollar',
  KES:'Kenyan Shilling', DJF:'Djibouti Franc', DKK:'Danish Krone',
  NOK:'Norwegian Krone', SEK:'Swedish Krona', KWD:'Kuwaiti Dinar',
  ZAR:'South African Rand',
}

function fmt(val: number | null) {
  if (val == null) return '\u2014'
  return Number(val).toFixed(4)
}
function fmt2(val: number | null) {
  if (val == null) return '\u2014'
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
      .limit(40),
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
  const NBE_RATES = Object.values(nbeMap).sort((a: any, b: any) => a.currency_code.localeCompare(b.currency_code))
  const nbeDate = NBE_RATES[0]?.rate_date ?? null

  // Dedupe bank rates
  const bankMap: Record<string, any> = {}
  for (const r of (bankRatesRes.data ?? [])) {
    const slug = r.institution_slug
    if (!bankMap[slug]) bankMap[slug] = { bank: (r as any).institutions?.name ?? slug, verified: formatDate(r.rate_date) }
    if (!bankMap[slug][r.currency_code.toLowerCase() + '_buy']) {
      bankMap[slug][r.currency_code.toLowerCase() + '_buy'] = fmt2(r.buying_rate)
      bankMap[slug][r.currency_code.toLowerCase() + '_sell'] = fmt2(r.selling_rate)
    }
  }
  const BANK_RATES = Object.values(bankMap)

  const nbeUSD = nbeMap['USD'], nbeEUR = nbeMap['EUR'], nbeGBP = nbeMap['GBP']
  const nbeRow = [
    fmt2(nbeUSD?.buying_rate ?? null), fmt2(nbeUSD?.selling_rate ?? null),
    fmt2(nbeEUR?.buying_rate ?? null), fmt2(nbeEUR?.selling_rate ?? null),
    fmt2(nbeGBP?.buying_rate ?? null), fmt2(nbeGBP?.selling_rate ?? null),
  ]

  const displayDate = nbeDate
    ? new Date(nbeDate).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })
    : new Date().toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })

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
            Banking &#8212; FX Rates
          </div>
          <h1 className="font-serif font-bold text-white mb-4"
            style={{ fontSize: 'clamp(32px, 4vw, 52px)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
            Ethiopian FX rates &#8212; NBE official &amp; all banks.
          </h1>
          <p className="text-slate-400 mb-10" style={{ fontSize: '16px', lineHeight: 1.8, maxWidth: '520px' }}>
            The National Bank of Ethiopia publishes indicative rates daily at 09:30 EAT. All rates are ETB per 1 foreign currency unit.
          </p>
          <div className="grid grid-cols-3 mt-2 pt-8 border-t border-slate-800">
            {[
              { value: String(NBE_RATES.length), label: 'Currencies tracked' },
              { value: 'Daily', label: 'NBE update frequency' },
              { value: String(BANK_RATES.length || 0), label: 'Banks with FX data' },
            ].map(s => (
              <div key={s.label} className="text-center py-6 border-r border-slate-800 last:border-r-0">
                <div className="font-mono font-black text-white mb-1" style={{ fontSize: 'clamp(22px, 3vw, 36px)', letterSpacing: '-1px' }}>{s.value}</div>
                <div className="text-xs font-semibold text-slate-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN RATES TABLE */}
      <section style={{ background: '#ffffff', padding: '64px 0 80px' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* NBE TABLE */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h2 className="font-serif font-bold text-slate-950" style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', letterSpacing: '-0.5px' }}>
                NBE indicative rates
              </h2>
              <p className="text-slate-500 mt-1" style={{ fontSize: '13px' }}>Official weighted average published by the National Bank of Ethiopia</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="w-2 h-2 bg-emerald-500 rounded-full" />
              <span className="text-xs font-bold text-slate-600 bg-slate-100 rounded-full px-3 py-1.5">
                {displayDate}
              </span>
            </div>
          </div>

          {NBE_RATES.length > 0 ? (
            <div className="rounded-2xl overflow-hidden border border-slate-200" style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}>
              <div style={{ height: 4, background: 'linear-gradient(90deg, #1D4ED8, #1E40AF)' }} />
              <table className="w-full">
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                    <th className="text-left text-xs font-black text-slate-400 uppercase tracking-widest" style={{ padding: '12px 20px' }}>Currency</th>
                    <th className="text-left text-xs font-black text-slate-400 uppercase tracking-widest hidden sm:table-cell" style={{ padding: '12px 16px' }}>Code</th>
                    <th className="text-right text-xs font-black text-slate-400 uppercase tracking-widest" style={{ padding: '12px 20px' }}>Buying (ETB)</th>
                    <th className="text-right text-xs font-black text-slate-400 uppercase tracking-widest" style={{ padding: '12px 20px' }}>Selling (ETB)</th>
                    <th className="text-right text-xs font-black text-slate-400 uppercase tracking-widest hidden md:table-cell" style={{ padding: '12px 20px' }}>Spread</th>
                  </tr>
                </thead>
                <tbody>
                  {NBE_RATES.map((r: any, i: number) => {
                    const spread = r.buying_rate && r.selling_rate
                      ? (Number(r.selling_rate) - Number(r.buying_rate)).toFixed(4)
                      : '\u2014'
                    return (
                      <tr key={r.currency_code}
                        style={{ borderBottom: i < NBE_RATES.length - 1 ? '1px solid #f1f5f9' : 'none', background: i % 2 === 0 ? '#ffffff' : '#fafbfc' }}>
                        <td style={{ padding: '13px 20px' }}>
                          <span className="font-semibold text-slate-800" style={{ fontSize: '14px' }}>
                            {CURRENCY_NAMES[r.currency_code] ?? r.currency_code}
                          </span>
                        </td>
                        <td className="hidden sm:table-cell" style={{ padding: '13px 16px' }}>
                          <span className="font-mono font-black text-xs rounded px-2 py-0.5" style={{ background: '#1D4ED8', color: '#fff' }}>
                            {r.currency_code}
                          </span>
                        </td>
                        <td className="text-right" style={{ padding: '13px 20px' }}>
                          <span className="font-mono font-bold text-slate-700" style={{ fontSize: '14px' }}>{fmt(r.buying_rate)}</span>
                        </td>
                        <td className="text-right" style={{ padding: '13px 20px' }}>
                          <span className="font-mono font-black text-slate-950" style={{ fontSize: '15px' }}>{fmt(r.selling_rate)}</span>
                        </td>
                        <td className="text-right hidden md:table-cell" style={{ padding: '13px 20px' }}>
                          <span className="font-mono text-slate-400" style={{ fontSize: '13px' }}>{spread}</span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              <div className="flex items-center justify-between border-t border-slate-100" style={{ background: '#f8fafc', padding: '12px 20px' }}>
                <p className="text-xs text-slate-400">Source: National Bank of Ethiopia &#8212; nbe.gov.et</p>
                <p className="text-xs text-slate-400">All rates ETB per 1 foreign unit</p>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 text-center py-12">
              <p className="text-slate-500 text-sm">NBE rates are published at 09:30 EAT each business day.</p>
            </div>
          )}

          {/* BANK COMPARISON TABLE */}
          <div className="mt-16">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <h2 className="font-serif font-bold text-slate-950" style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', letterSpacing: '-0.5px' }}>
                  USD, EUR &amp; GBP &#8212; all banks compared
                </h2>
                <p className="text-slate-500 mt-1" style={{ fontSize: '13px' }}>Sell rate is what you pay when buying foreign currency. Buy rate is what you receive when selling.</p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-200" style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}>
              <div style={{ height: 4, background: 'linear-gradient(90deg, #1D4ED8, #1E40AF)' }} />
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                      <th className="text-left text-xs font-black text-slate-400 uppercase tracking-widest" style={{ padding: '12px 20px', minWidth: 180 }}>Bank</th>
                      <th className="text-right text-xs font-black text-slate-400 uppercase tracking-widest" style={{ padding: '12px 16px' }}>USD Buy</th>
                      <th className="text-right text-xs font-black text-slate-400 uppercase tracking-widest" style={{ padding: '12px 16px' }}>USD Sell</th>
                      <th className="text-right text-xs font-black text-slate-400 uppercase tracking-widest" style={{ padding: '12px 16px' }}>EUR Buy</th>
                      <th className="text-right text-xs font-black text-slate-400 uppercase tracking-widest" style={{ padding: '12px 16px' }}>EUR Sell</th>
                      <th className="text-right text-xs font-black text-slate-400 uppercase tracking-widest" style={{ padding: '12px 16px' }}>GBP Buy</th>
                      <th className="text-right text-xs font-black text-slate-400 uppercase tracking-widest" style={{ padding: '12px 16px' }}>GBP Sell</th>
                      <th className="text-right text-xs font-black text-slate-400 uppercase tracking-widest" style={{ padding: '12px 16px' }}>Updated</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* NBE reference row */}
                    <tr style={{ background: '#eff6ff', borderBottom: '2px solid #bfdbfe' }}>
                      <td style={{ padding: '13px 20px' }}>
                        <div className="flex items-center gap-2">
                          <span className="font-black text-xs rounded-full px-2 py-0.5" style={{ background: '#1D4ED8', color: '#fff' }}>NBE</span>
                          <span className="font-bold text-blue-900" style={{ fontSize: '13px' }}>Official NBE Indicative</span>
                        </div>
                      </td>
                      {nbeRow.map((v, i) => (
                        <td key={i} className="text-right" style={{ padding: '13px 16px' }}>
                          <span className="font-mono font-bold text-blue-700" style={{ fontSize: '14px' }}>{v}</span>
                        </td>
                      ))}
                      <td className="text-right" style={{ padding: '13px 16px' }}>
                        <span className="text-xs font-bold text-blue-600">Daily</span>
                      </td>
                    </tr>
                    {BANK_RATES.length > 0 ? BANK_RATES.map((r: any, i: number) => (
                      <tr key={r.bank} style={{ borderBottom: '1px solid #f1f5f9', background: i % 2 === 0 ? '#ffffff' : '#fafbfc' }}>
                        <td style={{ padding: '13px 20px' }}>
                          <span className="font-semibold text-slate-800" style={{ fontSize: '14px' }}>{r.bank}</span>
                        </td>
                        <td className="text-right" style={{ padding: '13px 16px' }}><span className="font-mono text-slate-600" style={{ fontSize: '13px' }}>{r.usd_buy ?? '\u2014'}</span></td>
                        <td className="text-right" style={{ padding: '13px 16px' }}><span className="font-mono font-bold text-slate-800" style={{ fontSize: '14px' }}>{r.usd_sell ?? '\u2014'}</span></td>
                        <td className="text-right" style={{ padding: '13px 16px' }}><span className="font-mono text-slate-600" style={{ fontSize: '13px' }}>{r.eur_buy ?? '\u2014'}</span></td>
                        <td className="text-right" style={{ padding: '13px 16px' }}><span className="font-mono font-bold text-slate-800" style={{ fontSize: '14px' }}>{r.eur_sell ?? '\u2014'}</span></td>
                        <td className="text-right" style={{ padding: '13px 16px' }}><span className="font-mono text-slate-600" style={{ fontSize: '13px' }}>{r.gbp_buy ?? '\u2014'}</span></td>
                        <td className="text-right" style={{ padding: '13px 16px' }}><span className="font-mono font-bold text-slate-800" style={{ fontSize: '14px' }}>{r.gbp_sell ?? '\u2014'}</span></td>
                        <td className="text-right" style={{ padding: '13px 16px' }}><span className="text-xs text-slate-400">{r.verified}</span></td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={8} className="text-center py-10">
                          <p className="text-sm text-slate-400">Per-bank rates are updated daily. Check back soon.</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-slate-100" style={{ background: '#f8fafc', padding: '12px 20px' }}>
                <p className="text-xs text-slate-400">Rates sourced from individual bank websites &#8212; NBE rate from nbe.gov.et &#8212; All rates ETB per 1 foreign unit</p>
                <Link href="/institutions?type=bank" className="text-xs font-bold shrink-0" style={{ color: '#1D4ED8' }}>View all bank profiles &#8594;</Link>
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-4 text-center">FX rates for comparison only. Confirm with the institution before any currency exchange.</p>
          </div>
        </div>
      </section>

      {/* EMAIL CAPTURE */}
      <section style={{ background:'#f8fafc', padding:'96px 0', borderTop: '1px solid #e2e8f0' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-serif font-bold text-slate-950 mb-5"
              style={{ fontSize:'clamp(28px, 3vw, 40px)', letterSpacing:'-0.5px', lineHeight:1.1 }}>
              Track ETB exchange rates from anywhere in the world.
            </h2>
            <p className="text-slate-500 mb-8" style={{ fontSize:'15px', lineHeight:1.85 }}>
              Weekly FX digest for diaspora and businesses. Know when the rate moves before you transfer.
            </p>
          </div>
          <EmailCapture />
        </div>
      </section>

    </main>
  )
}
