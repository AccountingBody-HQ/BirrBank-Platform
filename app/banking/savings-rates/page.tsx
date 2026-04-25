import Link from 'next/link'
import EmailCapture from '@/components/EmailCapture'
export const dynamic = 'force-dynamic'

// ─── Placeholder data — replace with Supabase queries in Phase 2 ─────────────
// All rates stored as percentages (9.50 = 9.50% annual). Never decimals.

const SAVINGS_RATES = [
  { rank: 1,  bank: 'Awash Bank',              type: 'Fixed 12M',  rate: '9.50', min: '5,000',   sharia: false, verified: '22 Apr 2026', badge: 'Best rate' },
  { rank: 2,  bank: 'Zemen Bank',               type: 'Fixed 12M',  rate: '9.25', min: '10,000',  sharia: false, verified: '22 Apr 2026', badge: null },
  { rank: 3,  bank: 'Bank of Abyssinia',         type: 'Fixed 12M',  rate: '9.00', min: '5,000',   sharia: false, verified: '21 Apr 2026', badge: null },
  { rank: 4,  bank: 'Dashen Bank',               type: 'Regular',    rate: '8.75', min: '500',     sharia: false, verified: '21 Apr 2026', badge: null },
  { rank: 5,  bank: 'Oromia International',       type: 'Regular',    rate: '8.50', min: '500',     sharia: false, verified: '20 Apr 2026', badge: null },
  { rank: 6,  bank: 'Nib International Bank',     type: 'Fixed 12M',  rate: '8.50', min: '5,000',   sharia: false, verified: '20 Apr 2026', badge: null },
  { rank: 7,  bank: 'Wegagen Bank',              type: 'Regular',    rate: '8.25', min: '500',     sharia: false, verified: '19 Apr 2026', badge: null },
  { rank: 8,  bank: 'Hibret Bank',               type: 'Regular',    rate: '8.25', min: '500',     sharia: false, verified: '19 Apr 2026', badge: null },
  { rank: 9,  bank: 'Abay Bank',                 type: 'Fixed 12M',  rate: '8.00', min: '2,000',   sharia: false, verified: '18 Apr 2026', badge: null },
  { rank: 10, bank: 'Bunna International',        type: 'Regular',    rate: '8.00', min: '500',     sharia: false, verified: '18 Apr 2026', badge: null },
  { rank: 11, bank: 'Hijra Bank',                type: 'Mudarabah',  rate: '7.75', min: '1,000',   sharia: true,  verified: '17 Apr 2026', badge: 'Sharia' },
  { rank: 12, bank: 'ZamZam Bank',               type: 'Mudarabah',  rate: '7.75', min: '1,000',   sharia: true,  verified: '17 Apr 2026', badge: 'Sharia' },
  { rank: 13, bank: 'Commercial Bank of Ethiopia', type: 'Regular',   rate: '7.50', min: '50',      sharia: false, verified: '22 Apr 2026', badge: 'Most branches' },
  { rank: 14, bank: 'Cooperative Bank of Oromia', type: 'Regular',   rate: '7.50', min: '200',     sharia: false, verified: '16 Apr 2026', badge: null },
  { rank: 15, bank: 'Lion International Bank',    type: 'Regular',    rate: '7.25', min: '500',     sharia: false, verified: '16 Apr 2026', badge: null },
  { rank: 16, bank: 'Berhan Bank',               type: 'Regular',    rate: '7.25', min: '500',     sharia: false, verified: '15 Apr 2026', badge: null },
  { rank: 17, bank: 'Enat Bank',                 type: 'Regular',    rate: '7.00', min: '500',     sharia: false, verified: '15 Apr 2026', badge: null },
  { rank: 18, bank: 'Gadaa Bank',                type: 'Regular',    rate: '7.00', min: '500',     sharia: false, verified: '14 Apr 2026', badge: 'ESX listed' },
  { rank: 19, bank: 'Amhara Bank',               type: 'Regular',    rate: '7.00', min: '300',     sharia: false, verified: '14 Apr 2026', badge: null },
  { rank: 20, bank: 'Sidama Bank',               type: 'Regular',    rate: '6.75', min: '300',     sharia: false, verified: '13 Apr 2026', badge: null },
]

const ACCOUNT_TYPES = ['All types', 'Regular savings', 'Fixed 12M', 'Sharia-compliant']

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

export default function SavingsRatesPage() {
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
            <span style={{ color: '#1D4ED8' }}>Ethiopia — all 32 banks.</span>
          </h1>
          <p className="text-slate-600 mb-8" style={{ fontSize: '16px', lineHeight: '1.8', maxWidth: '520px' }}>
            Every commercial bank savings and fixed deposit rate, verified from official
            sources and updated weekly. Filter by account type or Sharia-compliance.
          </p>

          {/* Key stats bar */}
          <div className="flex flex-wrap gap-6">
            {[
              { icon: <ShieldIcon />, label: '32 banks compared' },
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
      {/* NO ADS ON THIS PAGE — comparison integrity rule */}
      <section className="bg-white" style={{ padding: '64px 32px 96px' }}>
        <div className="max-w-6xl mx-auto">

          {/* Filter bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Filter by account type</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {ACCOUNT_TYPES.map((t, i) => (
                  <button
                    key={t}
                    className="rounded-full text-xs font-bold transition-all"
                    style={{
                      padding: '6px 14px',
                      background: i === 0 ? '#1D4ED8' : '#f1f5f9',
                      color:      i === 0 ? '#fff'     : '#64748b',
                      border:     i === 0 ? 'none'     : '1px solid #e2e8f0',
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ClockIcon />
              <span>Showing {SAVINGS_RATES.length} institutions · Sorted by rate (high to low)</span>
            </div>
          </div>

          {/* Table */}
          <div className="rounded-2xl overflow-hidden border border-slate-200" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <div style={{ height: 4, background: 'linear-gradient(90deg, #1D4ED8, #1E40AF)' }} />

            {/* Table header */}
            <div
              className="hidden sm:grid border-b border-slate-200"
              style={{ gridTemplateColumns: '44px 1fr 140px 120px 120px 110px', padding: '13px 24px', background: '#f8fafc' }}
            >
              {['#', 'Bank', 'Account type', 'Min. balance', 'Annual rate', 'Last verified'].map((h) => (
                <p key={h} className="text-xs font-black text-slate-400 uppercase tracking-widest">{h}</p>
              ))}
            </div>

            {/* Rows */}
            {SAVINGS_RATES.map((r) => (
              <div
                key={r.rank}
                className={`border-b border-slate-100 transition-colors ${r.rank === 1 ? 'bg-blue-50' : 'bg-white hover:bg-slate-50'}`}
              >
                {/* Desktop row */}
                <div
                  className="hidden sm:grid items-center"
                  style={{ gridTemplateColumns: '44px 1fr 140px 120px 120px 110px', padding: r.rank === 1 ? '18px 24px' : '14px 24px' }}
                >
                  {/* Rank */}
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

                  {/* Bank name + badge */}
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className={`font-bold ${r.rank === 1 ? 'text-blue-900' : 'text-slate-800'}`}
                        style={{ fontSize: r.rank === 1 ? '15px' : '14px' }}>
                        {r.bank}
                      </p>
                      {r.badge && (
                        <span
                          className="text-xs font-bold rounded-full px-2 py-0.5"
                          style={
                            r.badge === 'Sharia'
                              ? { background: '#fef3c7', color: '#92400e' }
                              : r.badge === 'Best rate'
                              ? { background: '#dbeafe', color: '#1D4ED8' }
                              : { background: '#eff6ff', color: '#1e40af' }
                          }
                        >
                          {r.badge}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Account type */}
                  <p className="text-sm text-slate-500">{r.type}</p>

                  {/* Min balance */}
                  <p className="text-sm font-mono text-slate-600">ETB {r.min}</p>

                  {/* Rate — the dominant number */}
                  <p
                    className={`font-mono font-black ${r.rank === 1 ? 'text-blue-700' : 'text-slate-800'}`}
                    style={{ fontSize: r.rank === 1 ? '26px' : '20px', letterSpacing: '-1px' }}
                  >
                    {r.rate}%
                  </p>

                  {/* Last verified */}
                  <div className="flex items-center gap-1.5">
                    <span style={{ color: '#1D4ED8' }}><ClockIcon /></span>
                    <p className="text-xs text-slate-400 font-medium">{r.verified}</p>
                  </div>
                </div>

                {/* Mobile row */}
                <div className="sm:hidden flex items-center gap-3" style={{ padding: '14px 16px' }}>
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black shrink-0"
                    style={r.rank === 1 ? { background: '#1D4ED8', color: '#fff' } : { background: '#f1f5f9', color: '#94a3b8' }}
                  >
                    {r.rank}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="font-bold text-slate-800 text-sm truncate">{r.bank}</p>
                      {r.badge && (
                        <span className="text-xs font-bold rounded-full px-2 py-0.5 shrink-0"
                          style={r.badge === 'Sharia' ? { background: '#fef3c7', color: '#92400e' } : { background: '#dbeafe', color: '#1D4ED8' }}>
                          {r.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400">{r.type} · ETB {r.min} min · verified {r.verified}</p>
                  </div>
                  <p className="font-mono font-black text-slate-800 shrink-0" style={{ fontSize: '20px', letterSpacing: '-1px' }}>
                    {r.rate}%
                  </p>
                </div>
              </div>
            ))}

            {/* Table footer */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-slate-200 bg-slate-50" style={{ padding: '14px 24px' }}>
              <p className="text-xs text-slate-400">
                Showing {SAVINGS_RATES.length} of 32 banks · Rates sourced from official bank websites and NBE registry · Sorted by rate (high to low)
              </p>
              <Link href="/institutions" className="text-xs font-bold hover:underline shrink-0" style={{ color: '#1D4ED8' }}>
                View all 214 institutions →
              </Link>
            </div>
          </div>

          {/* Disclaimer — required on every rate page */}
          <p className="text-xs text-slate-400 mt-5 text-center leading-relaxed">
            Rates are for comparison purposes only and may change without notice.
            Always verify the current rate directly with the institution before opening an account.
            BirrBank is not a bank or financial adviser.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════ HOW TO CHOOSE ════════════════════════════ */}
      <section className="border-b border-y border-slate-100" style={{ background: '#f8faf8', padding: '96px 32px' }}>
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
            <Link
              href="/guides"
              className="inline-flex items-center gap-2 text-sm font-bold"
              style={{ color: '#1D4ED8' }}
            >
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
              BirrBank's rate freshness rule: any rate older than 7 days is automatically
              flagged. Stale data is the fastest way to destroy trust — and we never allow it.
            </p>
          </div>
          <div className="flex flex-col gap-3 shrink-0">
            <div className="flex items-center gap-3 rounded-xl" style={{ background: '#1e293b', border: '1px solid #1e293b', padding: '14px 20px' }}>
              <span className="w-2 h-2 rounded-full bg-green-400 shrink-0" />
              <span className="text-sm font-semibold" style={{ color: '#94a3b8' }}>Verified within 7 days — <span style={{ color: '#93c5fd' }}>Live</span></span>
            </div>
            <div className="flex items-center gap-3 rounded-xl" style={{ background: '#1e293b', border: '1px solid #1e293b', padding: '14px 20px' }}>
              <span className="w-2 h-2 rounded-full shrink-0" style={{ background: '#f59e0b' }} />
              <span className="text-sm font-semibold" style={{ color: '#94a3b8' }}>7–14 days old — <span style={{ color: '#f59e0b' }}>Check recommended</span></span>
            </div>
            <div className="flex items-center gap-3 rounded-xl" style={{ background: '#1e293b', border: '1px solid #1e293b', padding: '14px 20px' }}>
              <span className="w-2 h-2 rounded-full shrink-0" style={{ background: '#ef4444' }} />
              <span className="text-sm font-semibold" style={{ color: '#94a3b8' }}>14+ days old — <span style={{ color: '#ef4444' }}>Being updated</span></span>
            </div>
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
              Weekly digest of every savings rate change across all 32 banks.
              Be the first to know when a bank raises — or cuts — its rate.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Rate changes across all 32 commercial banks',
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
