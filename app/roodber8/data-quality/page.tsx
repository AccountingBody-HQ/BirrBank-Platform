export const dynamic = 'force-dynamic'

export default function AdminDataQualityPage() {
  return (
    <div style={{ padding: '32px', minHeight: '100vh', background: '#080d1a' }}>

      <div className="mb-8">
        <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: '#1D4ED8' }}>BirrBank Admin</p>
        <h1 className="font-bold text-white mb-2" style={{ fontSize: '28px', letterSpacing: '-0.5px' }}>Data Quality</h1>
        <p style={{ color: '#475569', fontSize: '14px', maxWidth: '520px' }}>Verify institution data freshness and flag stale rates. Wire to Supabase last_verified_date fields in Phase 2.</p>
      </div>

      <div className="rounded-2xl" style={{ background: '#0d1424', border: '1px solid #f59e0b33', padding: '32px' }}>
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </div>
          <div>
            <p className="font-bold mb-2" style={{ fontSize: '15px', color: '#f59e0b' }}>Phase 2 — Not yet built</p>
            <p style={{ color: '#64748b', fontSize: '13px', lineHeight: 1.7 }}>
              This admin section is queued for Phase 2 development. It will be built once the
              Supabase birrbank schema tables are wired and the public-facing pages are confirmed live.
              See the handover document v3.0 for the full build sequence.
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}
