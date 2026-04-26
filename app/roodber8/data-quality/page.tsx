'use client'
import { useState, useEffect, useCallback } from 'react'

const VERIFY_GROUPS = [
  { key: 'rates',     label: 'Savings & Deposits', color: '#3b82f6', desc: 'Annual rates, fixed deposits, minimum balances' },
  { key: 'loans',     label: 'Loans & Credit',     color: '#10b981', desc: 'Loan rates, tenures, collateral requirements'   },
  { key: 'fx',        label: 'Foreign Exchange',   color: '#f59e0b', desc: 'FX rates, currency coverage, fee structures'    },
  { key: 'insurance', label: 'Insurance Products', color: '#ec4899', desc: 'Premiums, coverage, product types'              },
  { key: 'digital',   label: 'Digital & Mobile',   color: '#a78bfa', desc: 'App ratings, USSD, internet banking'           },
  { key: 'transfers', label: 'Transfers & Remittance', color: '#06b6d4', desc: 'Destinations, fees, processing times'      },
  { key: 'profile',   label: 'Institution Profile', color: '#f97316', desc: 'SWIFT, website, NBE licence, leadership'      },
]

function staleness(dateStr: string | null): { label: string; color: string; bg: string } {
  if (!dateStr) return { label: 'Never verified', color: '#ef4444', bg: 'rgba(239,68,68,0.1)' }
  const days = Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000)
  if (days <= 7)  return { label: days === 0 ? 'Today' : days + 'd ago', color: '#22c55e', bg: 'rgba(34,197,94,0.1)'  }
  if (days <= 14) return { label: days + 'd ago',                         color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' }
  return             { label: days + 'd ago',                              color: '#ef4444', bg: 'rgba(239,68,68,0.1)'  }
}

function StaleBadge({ date }: { date: string | null }) {
  const s = staleness(date)
  return (
    <span className="text-xs font-bold px-2 py-0.5 rounded-full"
      style={{ color: s.color, background: s.bg }}>{s.label}</span>
  )
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { color: string; bg: string }> = {
    correct:      { color: '#22c55e', bg: 'rgba(34,197,94,0.1)'   },
    incorrect:    { color: '#ef4444', bg: 'rgba(239,68,68,0.1)'   },
    stale:        { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)'  },
    unverifiable: { color: '#64748b', bg: 'rgba(100,116,139,0.1)' },
  }
  const c = map[status] ?? map.unverifiable
  return (
    <span className="text-xs font-bold px-2 py-0.5 rounded-full capitalize"
      style={{ color: c.color, background: c.bg }}>{status}</span>
  )
}

function Loader() {
  return (
    <div className="space-y-3 animate-pulse">
      {[...Array(5)].map((_, i) => <div key={i} className="h-14 rounded-xl" style={{ background: '#0d1424' }} />)}
    </div>
  )
}

export default function DataQualityPage() {
  const [institutions, setInstitutions] = useState<any[]>([])
  const [loading, setLoading]           = useState(true)
  const [selected, setSelected]         = useState('')
  const [filter, setFilter]             = useState('')
  const [activeGroup, setActiveGroup]   = useState<string | null>(null)
  const [verifying, setVerifying]       = useState(false)
  const [cooldown, setCooldown]         = useState(0)
  const [results, setResults]           = useState<Record<string, any>>({})
  const [msg, setMsg]                   = useState('')

  useEffect(() => {
    fetch('/api/birrbank-institutions')
      .then(r => r.json())
      .then(d => { setInstitutions(d.institutions ?? []); setLoading(false) })
  }, [])

  // Cooldown timer
  useEffect(() => {
    if (cooldown <= 0) return
    const t = setTimeout(() => setCooldown(c => c - 1), 1000)
    return () => clearTimeout(t)
  }, [cooldown])

  const selectedInst = institutions.find((i: any) => i.slug === selected)

  async function runVerify(groupKey: string) {
    if (!selected || verifying || cooldown > 0) return
    setVerifying(true); setActiveGroup(groupKey); setMsg('')

    const res = await fetch('/api/verify-institution', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        institutionSlug: selected,
        institutionName: selectedInst?.name,
        institutionType: selectedInst?.type,
        group: groupKey,
        currentData: {},
      }),
    })
    const d = await res.json()
    setVerifying(false)
    setCooldown(65)

    if (d.ok) {
      setResults(prev => ({ ...prev, [groupKey]: d.result }))
    } else {
      setMsg('Error: ' + d.error)
    }
  }

  const filtered = institutions.filter((i: any) =>
    !filter || i.name.toLowerCase().includes(filter.toLowerCase())
  )

  // Summary stats
  const staleCount    = institutions.filter((i: any) => {
    if (!i.last_data_update) return true
    const days = Math.floor((Date.now() - new Date(i.last_data_update).getTime()) / 86400000)
    return days > 14
  }).length
  const amberCount    = institutions.filter((i: any) => {
    if (!i.last_data_update) return false
    const days = Math.floor((Date.now() - new Date(i.last_data_update).getTime()) / 86400000)
    return days > 7 && days <= 14
  }).length
  const verifiedCount = institutions.filter((i: any) => {
    if (!i.last_data_update) return false
    const days = Math.floor((Date.now() - new Date(i.last_data_update).getTime()) / 86400000)
    return days <= 7
  }).length

  return (
    <div style={{ padding: '32px', minHeight: '100vh', background: '#080d1a' }}>

      <div className="mb-8">
        <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: '#1D4ED8' }}>BirrBank Admin</p>
        <h1 className="font-bold text-white mb-1" style={{ fontSize: '28px', letterSpacing: '-0.5px' }}>Data Quality</h1>
        <p style={{ color: '#475569', fontSize: '14px' }}>
          Verify institution data against official sources. Green = verified within 7 days. Amber = 7-14 days. Red = overdue.
        </p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Verified',  value: verifiedCount, color: '#22c55e', sub: 'Within 7 days'   },
          { label: 'Stale',     value: amberCount,    color: '#f59e0b', sub: '7-14 days old'   },
          { label: 'Overdue',   value: staleCount,    color: '#ef4444', sub: 'Over 14 days'     },
        ].map(s => (
          <div key={s.label} className="rounded-2xl" style={{ background: '#0d1424', border: '1px solid #1a2238', padding: '20px 24px' }}>
            <p className="font-mono font-black mb-1" style={{ fontSize: '28px', color: s.color, letterSpacing: '-1px', lineHeight: 1 }}>{s.value}</p>
            <p className="font-bold text-white mb-0.5" style={{ fontSize: '13px' }}>{s.label}</p>
            <p style={{ color: '#334155', fontSize: '11px' }}>{s.sub}</p>
          </div>
        ))}
      </div>

      {msg && (
        <div className="rounded-xl px-4 py-3 text-sm font-semibold mb-5"
          style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)' }}>
          {msg}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Institution list */}
        <div className="rounded-2xl" style={{ background: '#0d1424', border: '1px solid #1a2238', padding: '20px' }}>
          <p className="font-bold text-white mb-3" style={{ fontSize: '14px' }}>Select Institution</p>
          <input placeholder="Search..." value={filter} onChange={e => setFilter(e.target.value)}
            className="w-full rounded-xl text-sm text-white mb-3"
            style={{ background: '#080d1a', border: '1px solid #1a2238', padding: '8px 12px', outline: 'none' }} />

          {loading ? <Loader /> : (
            <div className="space-y-1 max-h-96 overflow-y-auto pr-1">
              {filtered.map((inst: any) => (
                <button key={inst.slug} onClick={() => { setSelected(inst.slug); setResults({}) }}
                  className="w-full text-left rounded-xl px-3 py-2.5 transition-all"
                  style={{
                    background: selected === inst.slug ? 'rgba(29,78,216,0.12)' : 'transparent',
                    borderLeft: selected === inst.slug ? '2px solid #1D4ED8' : '2px solid transparent',
                  }}>
                  <p className="font-semibold text-sm" style={{ color: selected === inst.slug ? '#fff' : '#94a3b8' }}>{inst.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs capitalize" style={{ color: '#334155' }}>{inst.type}</span>
                    <StaleBadge date={inst.last_data_update} />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Verification groups */}
        <div className="lg:col-span-2 space-y-4">
          {!selected ? (
            <div className="rounded-2xl flex items-center justify-center" style={{ background: '#0d1424', border: '1px solid #1a2238', minHeight: '300px' }}>
              <div className="text-center">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{ background: 'rgba(29,78,216,0.1)', border: '1px solid rgba(29,78,216,0.2)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <p className="font-bold text-white mb-1" style={{ fontSize: '15px' }}>Select an institution</p>
                <p style={{ color: '#334155', fontSize: '13px' }}>Choose an institution from the list to run verification checks.</p>
              </div>
            </div>
          ) : (
            <>
              {/* Selected institution header */}
              <div className="rounded-2xl" style={{ background: '#0d1424', border: '1px solid #1a2238', padding: '20px 24px' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-white" style={{ fontSize: '16px' }}>{selectedInst?.name}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs capitalize font-semibold" style={{ color: '#475569' }}>{selectedInst?.type}</span>
                      <span style={{ color: '#1a2238' }}>·</span>
                      <StaleBadge date={selectedInst?.last_data_update} />
                      <span style={{ color: '#1a2238' }}>·</span>
                      <span className="text-xs font-semibold capitalize" style={{ color: selectedInst?.coverage_level === 'full' ? '#22c55e' : selectedInst?.coverage_level === 'partial' ? '#f59e0b' : '#475569' }}>
                        {selectedInst?.coverage_level ?? 'none'} coverage
                      </span>
                    </div>
                  </div>
                  {cooldown > 0 && (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)' }}>
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span className="text-xs font-bold" style={{ color: '#f59e0b' }}>Cooldown {cooldown}s</span>
                    </div>
                  )}
                </div>
              </div>

              {/* 7 verification group cards */}
              <div className="space-y-3">
                {VERIFY_GROUPS.map(group => {
                  const result    = results[group.key]
                  const isRunning = verifying && activeGroup === group.key
                  const canRun    = !verifying && cooldown === 0

                  return (
                    <div key={group.key} className="rounded-2xl" style={{ background: '#0d1424', border: '1px solid #1a2238', padding: '20px 24px' }}>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                            style={{ background: group.color + '18', border: '1px solid ' + group.color + '44' }}>
                            <div className="w-2.5 h-2.5 rounded-full" style={{ background: group.color }} />
                          </div>
                          <div>
                            <p className="font-bold text-white" style={{ fontSize: '13px' }}>{group.label}</p>
                            <p style={{ color: '#475569', fontSize: '11px', marginTop: '1px' }}>{group.desc}</p>
                          </div>
                        </div>
                        <button onClick={() => runVerify(group.key)}
                          disabled={!canRun || isRunning}
                          className="font-bold rounded-xl text-xs shrink-0 transition-all"
                          style={{
                            background: canRun ? group.color : '#1a2238',
                            color: canRun ? '#fff' : '#334155',
                            padding: '7px 16px',
                            opacity: isRunning ? 0.7 : 1,
                          }}>
                          {isRunning ? 'Verifying...' : 'Verify'}
                        </button>
                      </div>

                      {isRunning && (
                        <div className="mt-4 rounded-xl p-4 text-center" style={{ background: '#080d1a', border: '1px solid #1a2238' }}>
                          <div className="w-6 h-6 rounded-full border-2 border-t-transparent mx-auto mb-2 animate-spin"
                            style={{ borderColor: group.color, borderTopColor: 'transparent' }} />
                          <p style={{ color: '#475569', fontSize: '12px' }}>Searching official sources...</p>
                        </div>
                      )}

                      {result && !isRunning && (
                        <div className="mt-4 space-y-3">
                          {/* Summary */}
                          <div className="rounded-xl p-3" style={{ background: '#080d1a', border: '1px solid #1a2238' }}>
                            <div className="flex items-center gap-2 mb-2">
                              <StatusBadge status={result.overall_status} />
                              <span style={{ color: '#334155', fontSize: '11px' }}>Verified {result.verified_at}</span>
                            </div>
                            <p style={{ color: '#64748b', fontSize: '12px', lineHeight: 1.6 }}>{result.summary}</p>
                          </div>

                          {/* Findings */}
                          {result.findings?.length > 0 && (
                            <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #1a2238' }}>
                              <table className="w-full" style={{ fontSize: '11px' }}>
                                <thead>
                                  <tr style={{ background: '#080d1a' }}>
                                    {['Field', 'Current', 'Official Source', 'Status', 'Source'].map(h => (
                                      <th key={h} className="px-3 py-2 text-left font-bold" style={{ color: '#475569' }}>{h}</th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  {result.findings.map((f: any, i: number) => (
                                    <tr key={i} style={{ borderTop: '1px solid #1a2238' }}>
                                      <td className="px-3 py-2 font-mono font-bold" style={{ color: '#64748b' }}>{f.field}</td>
                                      <td className="px-3 py-2" style={{ color: '#94a3b8' }}>{String(f.current_value ?? '—')}</td>
                                      <td className="px-3 py-2 font-semibold" style={{ color: f.status === 'incorrect' ? '#ef4444' : '#22c55e' }}>{String(f.verified_value ?? '—')}</td>
                                      <td className="px-3 py-2"><StatusBadge status={f.status} /></td>
                                      <td className="px-3 py-2" style={{ maxWidth: '120px' }}>
                                        {f.source ? (
                                          <a href={f.source} target="_blank" rel="noopener noreferrer"
                                            className="hover:underline" style={{ color: '#1D4ED8' }}>
                                            {f.source.replace('https://', '').split('/')[0]}
                                          </a>
                                        ) : <span style={{ color: '#334155' }}>—</span>}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
