import Link from 'next/link'
import SavingsRatesTable from '@/components/SavingsRatesTable'
import EmailCapture from '@/components/EmailCapture'
import { createSupabaseAdminClient } from '@/lib/supabase'
export const dynamic = 'force-dynamic'

const ACCOUNT_TYPE_LABELS: Record<string, string> = {
  regular_savings:   'Regular savings',
  fixed_deposit_3m:  'Fixed 3M',
  fixed_deposit_6m:  'Fixed 6M',
  fixed_deposit_12m: 'Fixed 12M',
  fixed_deposit_24m: 'Fixed 24M',
  current:           'Current',
  diaspora:          'Diaspora',
  youth:             'Youth savings',
  women:             'Women savings',
}

const ArrowRight = ({ size = 13 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)

const ShieldIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
)

const ClockIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
)

function staleness(dateStr: string): 'fresh' | 'warn' | 'stale' {
  const days = Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000)
  if (days <= 7)  return 'fresh'
  if (days <= 14) return 'warn'
  return 'stale'
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

function formatMin(val: number) {
  return val.toLocaleString('en-ET')
}

export default async function SavingsRatesPage() {
  const supabase = createSupabaseAdminClient()

  const { data: ratesData } = await supabase
    .schema('birrbank')
    .from('savings_rates')
    .select('annual_rate, account_type, minimum_balance_etb, is_sharia_compliant, last_verified_date, institution_slug, institutions(name, is_listed_on_esx)')
    .eq('is_current', true)
    .order('annual_rate', { ascending: false })

  const { count: bankCount } = await supabase
    .schema('birrbank')
    .from('institutions')
    .select('count', { count: 'exact', head: true })
    .eq('type', 'bank')
    .eq('is_active', true)

  const SAVINGS_RATES = (ratesData ?? []).map((r: any, i: number) => {
    const isESX    = r.institutions?.is_listed_on_esx ?? false
    const isSharia = r.is_sharia_compliant
    const badge    = i === 0 ? 'Best rate' : isSharia ? 'Sharia' : isESX ? 'ESX listed' : null
    return {
      rank:     i + 1,
      bank:     r.institutions?.name ?? r.institution_slug,
      type:     ACCOUNT_TYPE_LABELS[r.account_type] ?? r.account_type,
      typeKey:  r.account_type,
      rate:     Number(r.annual_rate).toFixed(2),
      min:      formatMin(Number(r.minimum_balance_etb ?? 0)),
      sharia:   isSharia,
      verified: formatDate(r.last_verified_date),
      freshness: staleness(r.last_verified_date),
      badge,
    }
  })

  const totalBanks = bankCount ?? 32

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
            <span style={{ color: '#1D4ED8', fontWeight: 700 }}>Savings Rates</span>
          </div>

          <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: '#1D4ED8' }}>
            Banking · Savings rates
          </p>
          <h1
            className="font-serif font-bold mb-5 text-slate-950"
            style={{ fontSize: 'clamp(36px, 4.5vw, 54px)', letterSpacing: '-1.8px', lineHeight: 1.08 }}
          >
            Best savings rates in<br />
            <span style={{ color: '#1D4ED8' }}>Ethiopia — all {totalBanks} banks.</span>
          </h1>
          <p className="text-slate-600 mb-8" style={{ fontSize: '16px', lineHeight: '1.8', maxWidth: '520px' }}>
            Every commercial bank savings and fixed deposit rate, verified from official
            sources and updated weekly. Filter by account type or Sharia-compliance.
          </p>

          <div className="flex flex-wrap gap-6">
            {[
              { icon: <ShieldIcon />, label: totalBanks + ' banks compared' },
              { icon: <ClockIcon />,  label: 'Updated this week' },
              { icon: <ShieldIcon />, label: 'NBE-verified institutions only' },
              { icon: <ClockIcon />,  label: 'Last verified dates on every row' },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <span style={{ color: '#1D4ED8' }}>{s.icon}</span>
                <span className="text-xs font-semibold text-slate-500">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ COMPARISON TABLE ══════════════════════════ */}
      <section className="bg-white" style={{ padding: '64px 32px 96px' }}>
        <div className="max-w-6xl mx-auto">

          <SavingsRatesTable rates={SAVINGS_RATES} totalBanks={totalBanks} />

          <p className="text-xs text-slate-400 mt-5 text-center leading-relaxed">
            Rates are for comparison purposes only and may change without notice.
            Always verify the current rate directly with the institution before opening an account.
            BirrBank is not a bank or financial adviser.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════ HOW TO CHOOSE ════════════════════════════ */}
      <section className="border-b border-y border-slate-100" style={{ background: '#f9fafb', padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Guide</p>
            <h2
              className="font-serif font-bold text-slate-950"
              style={{ fontSize: 'clamp(26px, 3vw, 36px)', letterSpacing: '-1.2px', lineHeight: 1.15 }}
            >
              How to choose the best savings account.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                title: 'Compare the annual rate',
                body: 'The annual percentage rate (APR) is the core metric. A difference of 1% on ETB 100,000 is ETB 1,000 per year — meaningful over a 12-month fixed deposit term.',
              },
              {
                step: '02',
                title: 'Check the minimum balance',
                body: 'Some banks require ETB 10,000+ to access their best rates. CBE requires as little as ETB 50. Match your available capital to the right product tier.',
              },
              {
                step: '03',
                title: 'Consider Sharia compliance',
                body: 'Hijra Bank and ZamZam Bank offer Mudarabah accounts — profit-sharing products that are fully Sharia-compliant and competitively priced against conventional savings.',
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
          <div className="mt-8">
            <Link href="/guides" className="inline-flex items-center gap-2 text-sm font-bold" style={{ color: '#1D4ED8' }}>
              Read all banking guides <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ DARK TRUST ════════════════════════════════ */}
      <section className="border-b border-slate-100" style={{ background: '#0f172a', padding: '72px 32px' }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: '#93c5fd' }}>Data integrity</p>
            <h3 className="font-serif font-bold mb-2" style={{ fontSize: 'clamp(22px, 2.5vw, 30px)', color: '#ffffff', letterSpacing: '-0.8px' }}>
              Every rate has a verified date. Always.
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: 1.75, maxWidth: 480 }}>
              BirrBank rate freshness rule: any rate older than 7 days is automatically
              flagged. Stale data is the fastest way to destroy trust — and we never allow it.
            </p>
          </div>
          <div className="flex flex-col gap-3 shrink-0">
            {[
              { color: '#22c55e', label: 'Verified within 7 days', status: 'Live', statusColor: '#93c5fd' },
              { color: '#f59e0b', label: '7–14 days old', status: 'Check recommended', statusColor: '#f59e0b' },
              { color: '#ef4444', label: '14+ days old', status: 'Being updated', statusColor: '#ef4444' },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-3 rounded-xl" style={{ background: '#1e293b', border: '1px solid #334155', padding: '14px 20px' }}>
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: s.color }} />
                <span className="text-sm font-semibold" style={{ color: '#94a3b8' }}>
                  {s.label} — <span style={{ color: s.statusColor }}>{s.status}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ EMAIL CAPTURE ════════════════════════════ */}
      <section className="bg-white" style={{ padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Rate alerts</p>
            <h2
              className="font-serif font-bold text-slate-950 mb-5"
              style={{ fontSize: 'clamp(30px, 3.5vw, 42px)', letterSpacing: '-1.5px', lineHeight: 1.1 }}
            >
              Get notified when<br />
              <span style={{ color: '#1D4ED8' }}>savings rates change.</span>
            </h2>
            <p className="text-slate-500 mb-8" style={{ fontSize: '15px', lineHeight: 1.85 }}>
              Weekly digest of every savings rate change across all {totalBanks} banks.
              Be the first to know when a bank raises — or cuts — its rate.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Rate changes across all ' + totalBanks + ' commercial banks',
                'New fixed deposit products and limited-time offers',
                'Sharia-compliant product updates',
                'NBE minimum rate directive changes',
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
