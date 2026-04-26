import Link from 'next/link'
import EmailCapture from '@/components/EmailCapture'
import { createSupabaseAdminClient } from '@/lib/supabase'
export const dynamic = 'force-dynamic'

const PILLAR = '#1D4ED8'
const ArrowRight = ({ size = 13 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)

const SUB_CATEGORIES = [
  { label: 'Send Money Home', href: '/banking/money-transfer', desc: 'Compare remittance fees and exchange rates across all major transfer services.', stat: 'Cheapest routes' },
  { label: 'Invest from Abroad', href: '/diaspora/invest', desc: 'Buy Ethiopian stocks on the ESX and participate in IPOs from anywhere in the world.', stat: 'ESX investing' },
  { label: 'Open a Bank Account', href: '/diaspora/bank-account', desc: 'How to open a diaspora account at Ethiopian banks — requirements and process.', stat: 'Step-by-step guide' },
  { label: 'Track ETB Rates', href: '/banking/fx-rates', desc: 'Live NBE indicative rates and per-bank buying and selling rates for USD, GBP, EUR.', stat: 'Updated daily' },
]

export default async function DiasporaPage() {
  const supabase = createSupabaseAdminClient()
  const today = new Date().toISOString().split('T')[0]

  const { data: fxData } = await supabase.schema('birrbank').from('exchange_rates').select('currency_code, buying_rate, selling_rate').eq('institution_slug', 'nbe').eq('rate_date', today).in('currency_code', ['USD', 'GBP', 'EUR', 'SAR'])
  const { data: ipoData } = await supabase.schema('birrbank').from('ipo_pipeline').select('company_name, status').neq('status', 'listed').neq('status', 'withdrawn').limit(3)
  const { count: ipoCount } = await supabase.schema('birrbank').from('ipo_pipeline').select('count', { count: 'exact', head: true }).neq('status', 'listed').neq('status', 'withdrawn')

  const fxMap: Record<string, any> = {}
  for (const r of (fxData ?? [])) { fxMap[r.currency_code] = r }
  const ipos = ipoData ?? []

  const CURRENCY_NAMES: Record<string, string> = { USD: 'US Dollar', GBP: 'British Pound', EUR: 'Euro', SAR: 'Saudi Riyal' }

  return (
    <div className="min-h-screen bg-white">
      <section className="relative bg-white overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 900px 500px at 55% -80px, rgba(29,78,216,0.04) 0%, transparent 65%)' }} />
        <div className="relative max-w-6xl mx-auto px-8 pt-20 pb-12">
          <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: PILLAR }}>Diaspora Hub</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            <div>
              <h1 className="font-serif font-bold mb-5 text-slate-950" style={{ fontSize: 'clamp(38px, 4.5vw, 56px)', letterSpacing: '-1.8px', lineHeight: 1.08 }}>
                Ethiopian financial services<br /><span style={{ color: PILLAR }}>for the global diaspora.</span>
              </h1>
              <p className="text-slate-600 mb-8" style={{ fontSize: '16px', lineHeight: '1.8', maxWidth: '440px' }}>
                Send money home cheaply, invest in Ethiopian stocks from abroad, open a diaspora
                bank account and track ETB exchange rates — all in one place.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/banking/money-transfer" className="font-bold rounded-full transition-all"
                  style={{ fontSize: 15, padding: '14px 32px', minWidth: 200, textAlign: 'center', background: PILLAR, color: '#fff', boxShadow: '0 4px 20px rgba(29,78,216,0.20)' }}>
                  Compare remittance fees
                </Link>
                <Link href="/banking/fx-rates" className="font-bold rounded-full transition-all"
                  style={{ fontSize: 15, padding: '14px 32px', minWidth: 200, textAlign: 'center', border: '2px solid #1D4ED8', color: PILLAR, background: 'transparent' }}>
                  Check ETB rates
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {['USD','GBP','EUR','SAR'].map((ccy) => {
                const r = fxMap[ccy]
                return (
                  <div key={ccy} className="bg-white rounded-2xl border border-slate-200 text-center" style={{ padding: '16px 12px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                    <div className="inline-flex items-center rounded-lg mb-2" style={{ background: PILLAR, padding: '3px 10px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 800, color: '#fff', letterSpacing: '1px' }}>{ccy}</span>
                    </div>
                    <p className="font-mono font-black text-slate-950" style={{ fontSize: '22px', letterSpacing: '-1px', lineHeight: 1, color: PILLAR }}>
                      {r ? Number(r.selling_rate).toFixed(2) : '—'}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">ETB sell · {CURRENCY_NAMES[ccy]}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-100" style={{ background: '#f9fafb', padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">What we cover</p>
            <h2 className="font-serif font-bold text-slate-950" style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', letterSpacing: '-1.2px', lineHeight: 1.1 }}>
              Everything the Ethiopian diaspora needs.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SUB_CATEGORIES.map((cat) => (
              <Link key={cat.label} href={cat.href}
                className="group bg-white rounded-2xl border border-slate-200 hover:shadow-xl transition-all duration-200 flex flex-col overflow-hidden"
                style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                <div style={{ height: 3, background: PILLAR }} />
                <div style={{ padding: '24px' }}>
                  <p className="font-bold text-slate-900 mb-2" style={{ fontSize: '15px' }}>{cat.label}</p>
                  <p className="text-slate-500 text-xs mb-4" style={{ lineHeight: '1.7' }}>{cat.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400">{cat.stat}</span>
                    <div className="flex items-center gap-1 text-xs font-bold group-hover:gap-2 transition-all" style={{ color: PILLAR }}>
                      <span>Go</span><ArrowRight size={11} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {ipos.length > 0 && (
        <section className="border-b border-slate-100 bg-white" style={{ padding: '96px 32px' }}>
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">IPO pipeline</p>
                <h2 className="font-serif font-bold text-slate-950" style={{ fontSize: 'clamp(22px, 2.8vw, 32px)', letterSpacing: '-1px', lineHeight: 1.15 }}>
                  {ipoCount ?? 0}+ upcoming ESX listings
                </h2>
              </div>
              <Link href="/markets/ipo-pipeline" className="inline-flex items-center gap-2 text-sm font-bold shrink-0" style={{ color: PILLAR }}>
                Full pipeline <ArrowRight />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {ipos.map((ipo: any) => (
                <div key={ipo.company_name} className="bg-white rounded-2xl border border-slate-200 overflow-hidden" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                  <div style={{ height: 3, background: PILLAR }} />
                  <div style={{ padding: '24px' }}>
                    <p className="font-bold text-slate-900 mb-2" style={{ fontSize: '15px' }}>{ipo.company_name}</p>
                    <span className="text-xs font-bold rounded-full px-2 py-0.5" style={{ background: '#fef3c7', color: '#92400e' }}>
                      {ipo.status === 'review' ? 'Under review' : ipo.status.charAt(0).toUpperCase() + ipo.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-white" style={{ padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Diaspora alerts</p>
            <h2 className="font-serif font-bold text-slate-950 mb-5" style={{ fontSize: 'clamp(30px, 3.5vw, 42px)', letterSpacing: '-1.5px', lineHeight: 1.1 }}>
              ETB rate and remittance updates,<br /><span style={{ color: PILLAR }}>direct to your inbox.</span>
            </h2>
            <p className="text-slate-500 mb-8" style={{ fontSize: '15px', lineHeight: 1.85 }}>Weekly digest for the Ethiopian diaspora — FX rates, remittance fees, IPO alerts and investment opportunities.</p>
            <p className="text-xs text-slate-500 font-medium pt-5 border-t border-slate-100">Free forever · No credit card · Unsubscribe anytime</p>
          </div>
          <EmailCapture />
        </div>
      </section>
    </div>
  )
}
