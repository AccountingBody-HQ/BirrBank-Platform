'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleLogin() {
    setLoading(true)
    setError('')
    const res = await fetch('/api/admin-auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (res.ok) {
      router.push('/admin')
    } else {
      setError('Invalid password')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#080d1a' }}>
      <div className="w-full max-w-sm">
        <div className="rounded-2xl overflow-hidden" style={{ background: '#0d1424', border: '1px solid #1a2238' }}>
          <div style={{ height: 4, background: 'linear-gradient(90deg, #1D4ED8, #1E40AF)' }} />
          <div style={{ padding: '40px 36px' }}>

            {/* Logo */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: '#1D4ED8' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="3"/><line x1="2" y1="10" x2="22" y2="10"/>
                </svg>
              </div>
              <div>
                <p className="font-bold text-white" style={{ fontSize: '15px' }}>BirrBank Admin</p>
                <p className="text-xs" style={{ color: '#475569' }}>Secure access only</p>
              </div>
            </div>

            <p className="font-bold mb-6" style={{ color: '#94a3b8', fontSize: '13px' }}>Enter admin password to continue</p>

            <div className="space-y-4">
              <input
                type="password"
                placeholder="Admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full rounded-xl text-white font-mono"
                style={{
                  background: '#080d1a',
                  border: '1px solid #1a2238',
                  padding: '12px 16px',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />

              {error && (
                <p className="text-xs font-bold" style={{ color: '#ef4444' }}>{error}</p>
              )}

              <button
                onClick={handleLogin}
                disabled={loading || !password}
                className="w-full rounded-xl font-bold transition-all"
                style={{
                  padding: '13px',
                  fontSize: '14px',
                  background: loading || !password ? '#1e293b' : '#1D4ED8',
                  color: loading || !password ? '#475569' : '#ffffff',
                  cursor: loading || !password ? 'not-allowed' : 'pointer',
                }}
              >
                {loading ? 'Verifying...' : 'Sign in'}
              </button>
            </div>

            <p className="text-xs text-center mt-6" style={{ color: '#334155' }}>
              BirrBank Platform · Admin Console
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
