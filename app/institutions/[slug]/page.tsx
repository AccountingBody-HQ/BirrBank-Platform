import Link from 'next/link'
import { notFound } from 'next/navigation'
export const dynamic = 'force-dynamic'

// ─── Placeholder data — replace with Supabase queries in Phase 2 ─────────────
// In production: fetch institution by slug from birrbank.institutions
// then join all related tables for that institution_slug

const INSTITUTIONS: Record<string, {
  name: string; type: string; swift: string; founded: string
  website: string; nbe_licence: string; score: number; badge: string | null
  is_listed_on_esx: boolean; ticker?: string
  savings: { product: string; rate: string; min: string; term: string; sharia: boolean; verified: string }[]
  loans:   { type: string; min_rate: string; max_rate: string; max_tenure: string; verified: string }[]
  digital: { mobile_app: boolean; internet_banking: boolean; ussd: boolean; app_rating: string; swift_enabled: boolean }
  fx:      { usd_sell: string; usd_buy: string; eur_sell: string; gbp_sell: string; verified: string } | null
  stock?:  { price: string; change: string; changePct: string; pe: string; dividend: string; mktCap: string; volume: string }
  about: string
}> = {
  'awash-bank': {
    name: 'Awash Bank', type: 'Private commercial bank', swift: 'AWINETAA',
    founded: '1994', website: 'awashbank.com', nbe_licence: '1994-06-10',
    score: 4.4, badge: 'Largest private bank',
    is_listed_on_esx: false,
    savings: [
      { product: '12-month fixed deposit', rate: '9.50', min: '5,000',  term: '12 months', sharia: false, verified: '22 Apr 2026' },
      { product: '6-month fixed deposit',  rate: '8.75', min: '5,000',  term: '6 months',  sharia: false, verified: '22 Apr 2026' },
      { product: 'Regular savings',        rate: '7.00', min: '500',    term: 'Flexible',  sharia: false, verified: '22 Apr 2026' },
    ],
    loans: [
      { type: 'Personal loan',   min_rate: '14.00', max_rate: '18.00', max_tenure: '60 months',  verified: '20 Apr 2026' },
      { type: 'Home loan',       min_rate: '13.50', max_rate: '16.50', max_tenure: '180 months', verified: '20 Apr 2026' },
      { type: 'Business loan',   min_rate: '14.50', max_rate: '19.00', max_tenure: '84 months',  verified: '20 Apr 2026' },
    ],
    digital: { mobile_app: true, internet_banking: true, ussd: true, app_rating: '4.1', swift_enabled: true },
    fx: { usd_sell: '156.45', usd_buy: '155.85', eur_sell: '169.10', gbp_sell: '197.90', verified: '25 Apr 2026' },
    about: 'Awash Bank is Ethiopia\'s largest private commercial bank by total assets and profitability, with 346+ branches nationwide. Founded in 1994, it has consistently led private banking sector growth and recorded a 9.2 billion ETB profit in its most recent fiscal year.',
  },
  'wegagen-bank': {
    name: 'Wegagen Bank', type: 'Private commercial bank', swift: 'WEGAETAA',
    founded: '1997', website: 'wegagenbank.com', nbe_licence: '1997-01-01',
    score: 3.9, badge: 'First ESX listing',
    is_listed_on_esx: true, ticker: 'WB',
    savings: [
      { product: '12-month fixed deposit', rate: '8.25', min: '5,000', term: '12 months', sharia: false, verified: '19 Apr 2026' },
      { product: 'Regular savings',        rate: '7.00', min: '500',   term: 'Flexible',  sharia: false, verified: '19 Apr 2026' },
    ],
    loans: [
      { type: 'Personal loan',  min_rate: '15.00', max_rate: '19.00', max_tenure: '60 months',  verified: '17 Apr 2026' },
      { type: 'Business loan',  min_rate: '15.50', max_rate: '20.00', max_tenure: '84 months',  verified: '17 Apr 2026' },
    ],
    digital: { mobile_app: true, internet_banking: true, ussd: true, app_rating: '3.8', swift_enabled: true },
    fx: { usd_sell: '156.55', usd_buy: '155.65', eur_sell: '169.20', gbp_sell: '198.00', verified: '23 Apr 2026' },
    stock: { price: '142.50', change: '+2.30', changePct: '+1.64%', pe: '8.2', dividend: '3.4%', mktCap: '4.2B', volume: '124,500' },
    about: 'Wegagen Bank was established in 1997 and became the first Ethiopian bank to list on the Ethiopian Securities Exchange (ESX) in January 2025. It operates a full suite of commercial banking services with strong corporate and SME lending.',
  },
  'commercial-bank-of-ethiopia': {
    name: 'Commercial Bank of Ethiopia', type: 'State-owned bank', swift: 'CBETETAA',
    founded: '1942', website: 'combanketh.et', nbe_licence: '1942-01-01',
    score: 4.1, badge: '~60% market share',
    is_listed_on_esx: false,
    savings: [
      { product: 'Regular savings',        rate: '7.50', min: '50',    term: 'Flexible',  sharia: false, verified: '22 Apr 2026' },
      { product: '12-month fixed deposit', rate: '8.00', min: '1,000', term: '12 months', sharia: false, verified: '22 Apr 2026' },
    ],
    loans: [
      { type: 'Personal loan',  min_rate: '13.00', max_rate: '17.00', max_tenure: '60 months',  verified: '20 Apr 2026' },
      { type: 'Home loan',      min_rate: '12.50', max_rate: '15.50', max_tenure: '180 months', verified: '20 Apr 2026' },
      { type: 'Business loan',  min_rate: '13.50', max_rate: '18.00', max_tenure: '84 months',  verified: '20 Apr 2026' },
    ],
    digital: { mobile_app: true, internet_banking: true, ussd: true, app_rating: '3.9', swift_enabled: true },
    fx: { usd_sell: '156.55', usd_buy: '155.75', eur_sell: '169.30', gbp_sell: '198.10', verified: '25 Apr 2026' },
    about: 'The Commercial Bank of Ethiopia is the country\'s largest and oldest bank, founded in 1942. As a state-owned institution, it holds approximately 60% of the banking sector\'s total assets and operates over 1,800 branches — the widest network of any bank in Ethiopia.',
  },
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
const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)
const CrossIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)

export default async function InstitutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const inst = INSTITUTIONS[slug]
  if (!inst) notFound()

  return (
    <div className="min-h-screen bg-white">

      {/* ══════════════════════════════ HERO ══════════════════════════════════════ */}
      <section className="relative bg-white overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 900px 400px at 55% -80px, rgba(29,78,216,0.04) 0%, transparent 65%)' }} />
        <div className="relative max-w-6xl mx-auto px-8 pt-20 pb-14">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-6">
            <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
            <span>›</span>
            <Link href="/institutions" className="hover:text-slate-600 transition-colors">Institutions</Link>
            <span>›</span>
            <span style={{ color: '#1D4ED8', fontWeight: 700 }}>{inst.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <p className="text-xs font-black uppercase tracking-widest" style={{ color: '#1D4ED8' }}>
                  {inst.type}
                </p>
                {inst.badge && (
                  <span className="text-xs font-bold rounded-full px-3 py-1" style={{ background: '#EFF6FF', color: '#1D4ED8' }}>{inst.badge}</span>
                )}
                {inst.is_listed_on_esx && (
                  <span className="text-xs font-bold rounded-full px-3 py-1" style={{ background: '#EFF6FF', color: '#1D4ED8' }}>
                    ESX: {inst.ticker}
                  </span>
                )}
              </div>
              <h1 className="font-serif font-bold mb-4 text-slate-950" style={{ fontSize: 'clamp(32px, 4vw, 50px)', letterSpacing: '-1.5px', lineHeight: 1.1 }}>
                {inst.name}
              </h1>
              <p className="text-slate-600 mb-6" style={{ fontSize: '15px', lineHeight: 1.8, maxWidth: 540 }}>
                {inst.about}
              </p>
              <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                {[
                  { label: 'Founded', value: inst.founded },
                  { label: 'SWIFT', value: inst.swift },
                  { label: 'NBE licence', value: inst.nbe_licence },
                  { label: 'Website', value: inst.website },
                ].map((d) => (
                  <div key={d.label}>
                    <span className="font-black uppercase tracking-widest text-slate-400">{d.label}: </span>
                    <span className="font-semibold text-slate-600">{d.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Score card */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden" style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>
              <div style={{ height: 4, background: 'linear-gradient(90deg, #1D4ED8, #1E40AF)' }} />
              <div style={{ padding: '28px 24px' }}>
                <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">BirrBank score</p>
                <p className="font-mono font-black mb-1" style={{ fontSize: '52px', color: '#1D4ED8', letterSpacing: '-2px', lineHeight: 1 }}>
                  {inst.score}
                </p>
                <p className="text-xs text-slate-400 mb-6">out of 5.0</p>
                <div className="space-y-2 pt-4 border-t border-slate-100">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Quick facts</p>
                  {[
                    { label: 'Best savings rate', value: `${inst.savings[0]?.rate}%` },
                    { label: 'Mobile app',         value: inst.digital.mobile_app ? 'Yes' : 'No' },
                    { label: 'SWIFT transfers',    value: inst.digital.swift_enabled ? 'Yes' : 'No' },
                    { label: 'App store rating',   value: `${inst.digital.app_rating} / 5` },
                  ].map((f) => (
                    <div key={f.label} className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">{f.label}</span>
                      <span className="font-bold text-slate-700">{f.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ DUAL-VIEW TABS (if ESX listed) ════════════════════════ */}
      {inst.is_listed_on_esx && inst.stock && (
        <section className="border-b border-slate-100" style={{ background: '#EFF6FF', padding: '64px 32px' }}>
          <div className="max-w-6xl mx-auto">
            <div className="rounded-2xl overflow-hidden border border-purple-100" style={{ boxShadow: '0 4px 24px rgba(124,58,237,0.08)' }}>
              <div style={{ height: 4, background: 'linear-gradient(90deg, #7c3aed, #a78bfa)' }} />
              <div style={{ padding: '32px' }}>
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: '#1D4ED8' }}>
                      Dual-view — ESX listed
                    </p>
                    <h2 className="font-serif font-bold text-slate-950" style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', letterSpacing: '-0.8px' }}>
                      {inst.name} — deposit product + investable equity
                    </h2>
                  </div>
                  <Link href={`/markets/${inst.ticker?.toLowerCase()}`}
                    className="inline-flex items-center gap-2 font-bold rounded-full text-sm"
                    style={{ padding: '10px 20px', background: '#1D4ED8', color: '#fff' }}>
                    View on ESX <ArrowRight size={12} />
                  </Link>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: 'Share price',      value: `ETB ${inst.stock.price}`,   sub: inst.stock.changePct },
                    { label: 'Market cap',       value: `ETB ${inst.stock.mktCap}`,  sub: 'Total' },
                    { label: 'P/E ratio',        value: inst.stock.pe,               sub: 'Price/earnings' },
                    { label: 'Dividend yield',   value: inst.stock.dividend,         sub: 'Annual' },
                  ].map((s) => (
                    <div key={s.label} className="bg-white rounded-xl border border-purple-100 text-center" style={{ padding: '20px 12px' }}>
                      <p className="font-mono font-black mb-1" style={{ fontSize: '20px', color: '#1D4ED8', letterSpacing: '-0.5px' }}>{s.value}</p>
                      <p className="text-xs font-bold text-slate-700 mb-0.5">{s.label}</p>
                      <p className="text-xs text-slate-400">{s.sub}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-4">
                  {inst.name} pays you <strong>{inst.savings[0]?.rate}%</strong> to deposit.
                  Its stock yields <strong>{inst.stock.dividend}</strong> dividends.
                  Compare both — deposit product and investable equity — on this page.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════ SAVINGS RATES ════════════════════════════ */}
      {/* NO ADS on rate sections */}
      <section className="border-b border-slate-100 bg-white" style={{ padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Savings & deposits</p>
              <h2 className="font-serif font-bold text-slate-950" style={{ fontSize: 'clamp(22px, 2.8vw, 30px)', letterSpacing: '-1px' }}>
                {inst.name} savings rates
              </h2>
            </div>
            <Link href="/banking/savings-rates" className="inline-flex items-center gap-2 text-sm font-bold shrink-0" style={{ color: '#1D4ED8' }}>
              Compare all banks <ArrowRight />
            </Link>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-200" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <div style={{ height: 4, background: 'linear-gradient(90deg, #1D4ED8, #1E40AF)' }} />
            <div className="hidden sm:grid border-b border-slate-200" style={{ gridTemplateColumns: '1fr 120px 120px 100px 110px', padding: '12px 24px', background: '#f8fafc' }}>
              {['Product', 'Annual rate', 'Min. balance', 'Term', 'Last verified'].map((h) => (
                <p key={h} className="text-xs font-black text-slate-400 uppercase tracking-widest">{h}</p>
              ))}
            </div>
            {inst.savings.map((s, i) => (
              <div key={s.product} className={`border-b border-slate-100 ${i === 0 ? 'bg-blue-50' : 'bg-white hover:bg-slate-50'} transition-colors`}>
                <div className="hidden sm:grid items-center" style={{ gridTemplateColumns: '1fr 120px 120px 100px 110px', padding: i === 0 ? '18px 24px' : '14px 24px' }}>
                  <div>
                    <p className={`font-bold ${i === 0 ? 'text-blue-900' : 'text-slate-800'}`} style={{ fontSize: i === 0 ? '15px' : '14px' }}>{s.product}</p>
                    {s.sharia && <span className="text-xs font-bold rounded-full px-2 py-0.5 mt-0.5 inline-block" style={{ background: '#fef3c7', color: '#92400e' }}>Sharia</span>}
                  </div>
                  <p className={`font-mono font-black ${i === 0 ? 'text-blue-700' : 'text-slate-800'}`} style={{ fontSize: i === 0 ? '24px' : '18px', letterSpacing: '-0.5px' }}>
                    {s.rate}%
                  </p>
                  <p className="font-mono text-slate-600 text-sm">ETB {s.min}</p>
                  <p className="text-slate-500 text-sm">{s.term}</p>
                  <div className="flex items-center gap-1.5">
                    <span style={{ color: '#1D4ED8' }}><ClockIcon /></span>
                    <p className="text-xs text-slate-400">{s.verified}</p>
                  </div>
                </div>
                <div className="sm:hidden flex items-center gap-3" style={{ padding: '14px 16px' }}>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-800 text-sm">{s.product}</p>
                    <p className="text-xs text-slate-400">ETB {s.min} min · {s.term} · verified {s.verified}</p>
                  </div>
                  <p className="font-mono font-black text-slate-800 shrink-0" style={{ fontSize: '20px' }}>{s.rate}%</p>
                </div>
              </div>
            ))}
            <div className="bg-slate-50 border-t border-slate-200" style={{ padding: '12px 24px' }}>
              <p className="text-xs text-slate-400">Rates for comparison only · Verify directly with {inst.name} · BirrBank is not a financial adviser</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ LOAN RATES ════════════════════════════════ */}
      <section className="border-b border-slate-100" style={{ background: '#f8faf8', padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Loans & credit</p>
              <h2 className="font-serif font-bold text-slate-950" style={{ fontSize: 'clamp(22px, 2.8vw, 30px)', letterSpacing: '-1px' }}>
                {inst.name} loan rates
              </h2>
            </div>
            <Link href="/banking/loans" className="inline-flex items-center gap-2 text-sm font-bold shrink-0" style={{ color: '#1D4ED8' }}>
              Compare all banks <ArrowRight />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {inst.loans.map((l) => (
              <div key={l.type} className="bg-white rounded-2xl border border-slate-200 overflow-hidden" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                <div style={{ height: 3, background: '#1D4ED8' }} />
                <div style={{ padding: '24px' }}>
                  <p className="font-bold text-slate-900 mb-4" style={{ fontSize: '15px' }}>{l.type}</p>
                  <div className="flex items-baseline gap-1 mb-1">
                    <p className="font-mono font-black text-slate-950" style={{ fontSize: '28px', letterSpacing: '-1px', lineHeight: 1 }}>{l.min_rate}%</p>
                    <p className="text-sm text-slate-400">– {l.max_rate}%</p>
                  </div>
                  <p className="text-xs text-slate-400 mb-4">Annual interest rate range</p>
                  <div className="space-y-1.5 pt-3 border-t border-slate-100">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Max tenure</span>
                      <span className="font-semibold text-slate-700">{l.max_tenure}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Last verified</span>
                      <span className="font-semibold text-slate-700">{l.verified}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ FX + DIGITAL ═════════════════════════════ */}
      <section className="border-b border-slate-100 bg-white" style={{ padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* FX rates */}
          {inst.fx && (
            <div className="rounded-2xl overflow-hidden border border-slate-200" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
              <div style={{ height: 3, background: '#1D4ED8' }} />
              <div style={{ padding: '28px 24px' }}>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">FX rates</p>
                <div className="space-y-3">
                  {[
                    { label: 'USD sell', value: inst.fx.usd_sell },
                    { label: 'USD buy',  value: inst.fx.usd_buy  },
                    { label: 'EUR sell', value: inst.fx.eur_sell  },
                    { label: 'GBP sell', value: inst.fx.gbp_sell  },
                  ].map((f) => (
                    <div key={f.label} className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-sm text-slate-500 font-medium">{f.label}</span>
                      <span className="font-mono font-bold text-slate-800" style={{ fontSize: '16px' }}>ETB {f.value}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-1.5 mt-4">
                  <span style={{ color: '#1D4ED8' }}><ClockIcon /></span>
                  <p className="text-xs text-slate-400">Verified {inst.fx.verified}</p>
                </div>
                <Link href="/banking/fx-rates" className="inline-flex items-center gap-1.5 text-xs font-bold mt-3" style={{ color: '#1D4ED8' }}>
                  Compare all banks <ArrowRight size={11} />
                </Link>
              </div>
            </div>
          )}

          {/* Digital services */}
          <div className="rounded-2xl overflow-hidden border border-slate-200" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
            <div style={{ height: 3, background: '#1D4ED8' }} />
            <div style={{ padding: '28px 24px' }}>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Digital services</p>
              <div className="space-y-3">
                {[
                  { label: 'Mobile banking app',    value: inst.digital.mobile_app },
                  { label: 'Internet banking',      value: inst.digital.internet_banking },
                  { label: 'USSD (*) banking',      value: inst.digital.ussd },
                  { label: 'SWIFT international',   value: inst.digital.swift_enabled },
                ].map((d) => (
                  <div key={d.label} className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-sm text-slate-500 font-medium">{d.label}</span>
                    <span>{d.value ? <CheckIcon /> : <CrossIcon />}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-slate-500 font-medium">App store rating</span>
                  <span className="font-bold text-slate-700">{inst.digital.app_rating} / 5.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ DARK CTA ══════════════════════════════════ */}
      <section style={{ background: '#0f172a', padding: '72px 32px' }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: '#93c5fd' }}>Compare further</p>
            <h3 className="font-serif font-bold mb-2" style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', color: '#ffffff', letterSpacing: '-0.8px' }}>
              See how {inst.name} compares to all 32 banks.
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.75, maxWidth: 440 }}>
              BirrBank ranks every commercial bank by savings rate, loan rate, digital services and FX competitiveness — all on one comparison page.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link href="/banking/savings-rates" className="font-bold rounded-full text-center"
              style={{ fontSize: 14, padding: '13px 24px', background: '#1D4ED8', color: '#fff', boxShadow: '0 4px 16px rgba(29,78,216,0.25)' }}>
              Compare savings rates
            </Link>
            <Link href="/institutions" className="font-bold rounded-full text-center"
              style={{ fontSize: 14, padding: '13px 24px', border: '1.5px solid #2d6a4f', color: '#94a3b8' }}>
              All institutions
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
