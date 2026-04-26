'use client'
import { useState, useEffect } from 'react'

function Loader() {
  return (
    <div className="space-y-3 animate-pulse">
      {[...Array(4)].map((_, i) => <div key={i} className="h-14 rounded-xl" style={{ background: '#0d1424' }} />)}
    </div>
  )
}

function Check({ ok, label }: { ok: boolean; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-5 h-5 rounded flex items-center justify-center shrink-0"
        style={{ background: ok ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)', border: '1px solid ' + (ok ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)') }}>
        {ok ? (
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        ) : (
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        )}
      </div>
      <span style={{ color: ok ? '#94a3b8' : '#ef4444', fontSize: '12px', textDecoration: ok ? 'none' : 'none' }}>{label}</span>
    </div>
  )
}

export default function SettingsPage() {
  const [data, setData]       = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/birrbank-settings')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false) })
  }, [])

  if (loading) return (
    <div style={{ padding: '32px', minHeight: '100vh', background: '#080d1a' }}>
      <div className="mb-8">
        <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: '#1D4ED8' }}>BirrBank Admin</p>
        <h1 className="font-bold text-white mb-1" style={{ fontSize: '28px', letterSpacing: '-0.5px' }}>Settings</h1>
      </div>
      <Loader />
    </div>
  )

  const { envStatus = [], supabaseStatus, tableCounts = {}, checklist = [], platform = {} } = data ?? {}
  const envOk      = envStatus.filter((e: any) => e.present && e.required).length
  const envTotal   = envStatus.filter((e: any) => e.required).length
  const checkDone  = checklist.filter((c: any) => c.done).length
  const checkTotal = checklist.length
  const checkPct   = Math.round((checkDone / checkTotal) * 100)

  return (
    <div style={{ padding: '32px', minHeight: '100vh', background: '#080d1a' }}>

      <div className="mb-8">
        <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: '#1D4ED8' }}>BirrBank Admin</p>
        <h1 className="font-bold text-white mb-1" style={{ fontSize: '28px', letterSpacing: '-0.5px' }}>Settings</h1>
        <p style={{ color: '#475569', fontSize: '14px' }}>Platform configuration, environment variables, Supabase status and pre-launch checklist.</p>
      </div>

      {/* Status summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Supabase',     value: supabaseStatus === 'connected' ? 'Connected' : 'Error', color: supabaseStatus === 'connected' ? '#22c55e' : '#ef4444', sub: 'birrbank schema' },
          { label: 'Env Vars',     value: envOk + '/' + envTotal,  color: envOk === envTotal ? '#22c55e' : '#f59e0b', sub: 'required keys set'  },
          { label: 'Launch Ready', value: checkPct + '%',           color: checkPct === 100 ? '#22c55e' : checkPct >= 50 ? '#f59e0b' : '#ef4444', sub: checkDone + ' of ' + checkTotal + ' done' },
          { label: 'Environment',  value: platform.nodeEnv ?? '—',  color: platform.nodeEnv === 'production' ? '#22c55e' : '#f59e0b', sub: 'Node environment' },
        ].map(s => (
          <div key={s.label} className="rounded-2xl" style={{ background: '#0d1424', border: '1px solid #1a2238', padding: '20px 24px' }}>
            <p className="font-mono font-black mb-1" style={{ fontSize: '22px', color: s.color, letterSpacing: '-1px', lineHeight: 1 }}>{s.value}</p>
            <p className="font-bold text-white mb-0.5" style={{ fontSize: '13px' }}>{s.label}</p>
            <p style={{ color: '#334155', fontSize: '11px' }}>{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Environment Variables */}
        <div className="rounded-2xl" style={{ background: '#0d1424', border: '1px solid #1a2238', padding: '24px' }}>
          <p className="font-bold text-white mb-1" style={{ fontSize: '15px' }}>Environment Variables</p>
          <p style={{ color: '#475569', fontSize: '12px', marginBottom: '16px' }}>Presence check only — values are never exposed.</p>
          <div className="space-y-3">
            <p style={{ color: '#334155', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Required</p>
            {envStatus.filter((e: any) => e.required).map((e: any) => (
              <Check key={e.key} ok={e.present} label={e.label + (e.present ? ' — set' : ' — MISSING')} />
            ))}
            <p style={{ color: '#334155', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '12px' }}>Optional</p>
            {envStatus.filter((e: any) => !e.required).map((e: any) => (
              <Check key={e.key} ok={e.present} label={e.label + (e.present ? ' — set' : ' — not set')} />
            ))}
          </div>
        </div>

        {/* Pre-launch checklist */}
        <div className="rounded-2xl" style={{ background: '#0d1424', border: '1px solid #1a2238', padding: '24px' }}>
          <div className="flex items-center justify-between mb-3">
            <p className="font-bold text-white" style={{ fontSize: '15px' }}>Pre-Launch Checklist</p>
            <span className="font-mono font-black text-sm" style={{ color: checkPct === 100 ? '#22c55e' : '#f59e0b' }}>{checkDone}/{checkTotal}</span>
          </div>
          <div className="rounded-full mb-5" style={{ height: 4, background: '#1a2238' }}>
            <div className="rounded-full h-full transition-all" style={{ width: checkPct + '%', background: checkPct === 100 ? '#22c55e' : '#1D4ED8' }} />
          </div>
          <div className="space-y-2.5">
            {checklist.map((c: any) => (
              <Check key={c.task} ok={c.done} label={c.task} />
            ))}
          </div>
        </div>

        {/* Supabase table counts */}
        <div className="rounded-2xl" style={{ background: '#0d1424', border: '1px solid #1a2238', padding: '24px' }}>
          <p className="font-bold text-white mb-1" style={{ fontSize: '15px' }}>Supabase Table Counts</p>
          <p style={{ color: '#475569', fontSize: '12px', marginBottom: '16px' }}>Live row counts from birrbank schema.</p>
          <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #1a2238' }}>
            <table className="w-full text-xs">
              <thead><tr style={{ background: '#080d1a' }}>
                <th className="px-3 py-2 text-left font-bold" style={{ color: '#475569' }}>Table</th>
                <th className="px-3 py-2 text-right font-bold" style={{ color: '#475569' }}>Rows</th>
                <th className="px-3 py-2 text-right font-bold" style={{ color: '#475569' }}>Status</th>
              </tr></thead>
              <tbody>
                {Object.entries(tableCounts).map(([table, count]: [string, any]) => (
                  <tr key={table} style={{ borderTop: '1px solid #1a2238' }}>
                    <td className="px-3 py-2 font-mono" style={{ color: '#64748b' }}>{table}</td>
                    <td className="px-3 py-2 text-right font-mono font-bold" style={{ color: count > 0 ? '#22c55e' : '#ef4444' }}>{count}</td>
                    <td className="px-3 py-2 text-right">
                      <span className="text-xs font-bold px-1.5 py-0.5 rounded"
                        style={{ color: count > 0 ? '#22c55e' : '#ef4444', background: count > 0 ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)' }}>
                        {count > 0 ? 'seeded' : 'empty'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Platform info */}
        <div className="space-y-4">
          <div className="rounded-2xl" style={{ background: '#0d1424', border: '1px solid #1a2238', padding: '24px' }}>
            <p className="font-bold text-white mb-4" style={{ fontSize: '15px' }}>Platform Info</p>
            <div className="space-y-3">
              {[
                { label: 'Framework',       value: 'Next.js 16.2 (App Router)'          },
                { label: 'Database',        value: 'Supabase · birrbank schema'          },
                { label: 'AI Model',        value: 'claude-sonnet-4-20250514'            },
                { label: 'Auth (public)',    value: 'Clerk — ' + (platform.clerkKey ?? '—') },
                { label: 'Auth (admin)',     value: 'SHA-256 cookie — middleware.ts'      },
                { label: 'CMS',             value: 'Sanity · project ' + (platform.sanityProject ?? '—') },
                { label: 'Deployment',      value: 'Vercel (upgrade to Pro before DNS)'  },
                { label: 'Email',           value: 'Resend — pending DNS cutover'        },
              ].map(row => (
                <div key={row.label} className="flex items-start justify-between gap-4">
                  <span style={{ color: '#475569', fontSize: '12px', minWidth: '120px' }}>{row.label}</span>
                  <span className="font-mono text-right" style={{ color: '#94a3b8', fontSize: '11px' }}>{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Critical rules */}
          <div className="rounded-2xl" style={{ background: '#0d1424', border: '1px solid #ef444433', padding: '20px 24px' }}>
            <p className="font-bold mb-3" style={{ fontSize: '13px', color: '#ef4444' }}>Critical Rules</p>
            <div className="space-y-1.5">
              {[
                'Never rename middleware.ts',
                'All tables use .schema("birrbank")',
                'force-dynamic on every page with live data',
                'Rates stored as percentages — 9.50 not 0.095',
                'SERVICE_ROLE_KEY server-side only',
                'Never hardcode counts — always from count()',
                'params in [slug] pages must be awaited',
                'No ads on comparison tables or calculators',
              ].map(rule => (
                <div key={rule} className="flex items-start gap-2">
                  <span style={{ color: '#ef4444', fontSize: '12px' }}>·</span>
                  <p style={{ color: '#64748b', fontSize: '11px' }}>{rule}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
