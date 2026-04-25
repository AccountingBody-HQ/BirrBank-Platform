export const dynamic = 'force-dynamic'

const STATS = [
  { label: 'Institutions',     value: '214',  sub: 'NBE-regulated',      color: '#1D4ED8' },
  { label: 'Tables',           value: '30',   sub: 'birrbank schema',    color: '#1D4ED8' },
  { label: 'Sub-pages live',   value: '40+',  sub: 'All pillars',        color: '#22c55e' },
  { label: 'Supabase status',  value: 'Phase 2', sub: 'Not yet wired',   color: '#f59e0b' },
]

const QUICK_LINKS = [
  { label: 'Institution Manager', href: '/roodber8/institution-manager', desc: 'Add and manage all 214 NBE-regulated institutions' },
  { label: 'Rate Updater',        href: '/roodber8/rate-updater',        desc: 'Update savings, loan and FX rates across all banks' },
  { label: 'Data Quality',        href: '/roodber8/data-quality',        desc: 'Verify institution data and rate freshness' },
  { label: 'Content Factory',     href: '/roodber8/content-factory',     desc: 'AI-powered article and guide generation' },
  { label: 'Securities',          href: '/roodber8/securities',          desc: 'Manage ESX listings and IPO pipeline data' },
  { label: 'Commodities',         href: '/roodber8/commodities',         desc: 'Update ECX coffee, sesame and grain prices' },
]

const CHECKLIST = [
  { task: 'All 32 banks fully populated in Supabase',          done: false },
  { task: 'Rate Updater admin tab operational and tested',      done: false },
  { task: 'NBE daily FX rate import working',                   done: false },
  { task: 'Homepage savings rate table pulling from Supabase',  done: false },
  { task: 'Admin authentication tested end-to-end',             done: true  },
  { task: 'RLS policies on all 30 birrbank tables',             done: false },
  { task: 'Last-verified timestamps on all rate rows',          done: false },
  { task: 'Disclaimer on every page footer',                    done: false },
  { task: 'Clerk production keys (pk_live_*)',                  done: false },
  { task: 'Supabase upgraded to Pro',                           done: false },
  { task: 'Vercel upgraded to Pro',                             done: false },
  { task: 'Mobile tested at 375px minimum width',               done: false },
  { task: 'Canonical tags pointing to birrbank.com',            done: false },
  { task: 'Google Search Console sitemap submitted',            done: false },
]

export default function AdminPage() {
  const done = CHECKLIST.filter(c => c.done).length
  const total = CHECKLIST.length
  const pct = Math.round((done / total) * 100)

  return (
    <div style={{ padding: '32px', minHeight: '100vh', background: '#080d1a' }}>

      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: '#1D4ED8' }}>BirrBank Admin</p>
        <h1 className="font-bold text-white mb-1" style={{ fontSize: '28px', letterSpacing: '-0.5px' }}>Command Centre</h1>
        <p style={{ color: '#475569', fontSize: '14px' }}>Platform overview and pre-launch checklist · Handover v3.0</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STATS.map((s) => (
          <div key={s.label} className="rounded-2xl" style={{ background: '#0d1424', border: '1px solid #1a2238', padding: '20px 24px' }}>
            <p className="font-mono font-black mb-1" style={{ fontSize: '28px', color: s.color, letterSpacing: '-1px', lineHeight: 1 }}>{s.value}</p>
            <p className="font-bold text-white mb-0.5" style={{ fontSize: '13px' }}>{s.label}</p>
            <p style={{ color: '#334155', fontSize: '11px' }}>{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Quick links */}
        <div className="rounded-2xl" style={{ background: '#0d1424', border: '1px solid #1a2238', padding: '24px' }}>
          <p className="font-bold text-white mb-5" style={{ fontSize: '15px' }}>Admin sections</p>
          <div className="space-y-2">
            {QUICK_LINKS.map((l) => (
              <a key={l.href} href={l.href}
                className="flex items-start justify-between gap-3 rounded-xl transition-all"
                style={{ padding: '12px 16px', background: 'rgba(255,255,255,0.02)', border: '1px solid #1a2238' }}>
                <div>
                  <p className="font-bold text-white" style={{ fontSize: '13px' }}>{l.label}</p>
                  <p style={{ color: '#475569', fontSize: '11px', marginTop: '2px' }}>{l.desc}</p>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: '2px', flexShrink: 0 }}>
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Pre-launch checklist */}
        <div className="rounded-2xl" style={{ background: '#0d1424', border: '1px solid #1a2238', padding: '24px' }}>
          <div className="flex items-center justify-between mb-5">
            <p className="font-bold text-white" style={{ fontSize: '15px' }}>Pre-launch checklist</p>
            <span className="font-mono font-black text-sm" style={{ color: pct === 100 ? '#22c55e' : '#f59e0b' }}>{done}/{total}</span>
          </div>
          {/* Progress bar */}
          <div className="rounded-full mb-5" style={{ height: 4, background: '#1a2238' }}>
            <div className="rounded-full h-full transition-all" style={{ width: pct + '%', background: pct === 100 ? '#22c55e' : '#1D4ED8' }} />
          </div>
          <div className="space-y-2">
            {CHECKLIST.map((c) => (
              <div key={c.task} className="flex items-start gap-3">
                <div className="w-4 h-4 rounded flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: c.done ? '#22c55e' : 'transparent', border: c.done ? 'none' : '1.5px solid #334155' }}>
                  {c.done && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  )}
                </div>
                <p style={{ fontSize: '12px', color: c.done ? '#64748b' : '#94a3b8', lineHeight: 1.5, textDecoration: c.done ? 'line-through' : 'none' }}>{c.task}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Critical rules */}
      <div className="mt-6 rounded-2xl" style={{ background: '#0d1424', border: '1px solid #ef444433', padding: '24px' }}>
        <p className="font-bold mb-4" style={{ fontSize: '13px', color: '#ef4444' }}>Critical rules — never violate</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            'Never rename middleware.ts',
            'All tables use .schema("birrbank")',
            'force-dynamic on every page with live data',
            'Rates stored as percentages — 9.50 not 0.095',
            'Never hardcode counts — always from Supabase count()',
            'No ads on comparison tables, calculators, FX, securities, commodities',
            'SERVICE_ROLE_KEY server-side only — never in NEXT_PUBLIC_*',
            'params in [slug] pages must be awaited — Next.js 16 requirement',
          ].map((rule) => (
            <div key={rule} className="flex items-start gap-2">
              <span style={{ color: '#ef4444', fontSize: '12px', marginTop: '1px' }}>·</span>
              <p style={{ fontSize: '12px', color: '#64748b' }}>{rule}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
