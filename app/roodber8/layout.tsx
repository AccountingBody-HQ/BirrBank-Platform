'use client'
import { Suspense } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard, ShieldCheck, Sparkles,
  BarChart3, Settings, LogOut, ExternalLink,
  ChevronRight, RefreshCw, TrendingUp, Coffee
} from 'lucide-react'

const NAV = [
  { href: '/roodber8',                      exact: true,  icon: LayoutDashboard, label: 'Command Centre',      sub: 'Overview & actions'         },
  { href: '/roodber8/institution-manager',  exact: false, icon: BarChart3,       label: 'Institution Manager', sub: 'Add and manage institutions' },
  { href: '/roodber8/rate-updater',         exact: false, icon: RefreshCw,       label: 'Rate Updater',        sub: 'Update rates and prices'     },
  { href: '/roodber8/data-quality',         exact: false, icon: ShieldCheck,     label: 'Data Quality',        sub: 'Verify institution data'     },
  { href: '/roodber8/content-factory',      exact: false, icon: Sparkles,        label: 'Content Factory',     sub: 'AI article generation'       },
  { href: '/roodber8/securities',           exact: false, icon: TrendingUp,      label: 'Securities',          sub: 'ESX equities and IPOs'       },
  { href: '/roodber8/commodities',          exact: false, icon: Coffee,          label: 'Commodities',         sub: 'ECX prices and grades'       },
  { href: '/roodber8/settings',             exact: false, icon: Settings,        label: 'Settings',            sub: 'Config & environment'        },
]

function isActive(pathname: string, href: string, exact: boolean) {
  if (exact) return pathname === href
  return pathname === href || pathname.startsWith(href + '/')
}

function getBreadcrumb(pathname: string) {
  const map: Record<string, string> = {
    '/admin':                      'Command Centre',
    '/admin/institution-manager':  'Institution Manager',
    '/admin/rate-updater':         'Rate Updater',
    '/admin/data-quality':         'Data Quality',
    '/admin/content-factory':      'Content Factory',
    '/admin/securities':           'Securities',
    '/admin/commodities':          'Commodities',
    '/admin/settings':             'Settings',
  }
  const base  = '/' + pathname.split('/').slice(1, 3).join('/')
  const label = map[base] ?? 'Admin'
  const parts = pathname.split('/')
  const isDetail = parts.length > 3
  return { label, isDetail, detail: isDetail ? parts[3]?.toUpperCase() : null }
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router   = useRouter()
  const crumb    = getBreadcrumb(pathname)

  async function handleLogout() {
    await fetch('/api/admin-logout', { method: 'POST' })
    router.push('/roodber8-login')
  }

  return (
    <div className="min-h-screen flex" style={{ background: '#080d1a' }}>

      {/* SIDEBAR */}
      <aside className="w-64 shrink-0 flex flex-col border-r" style={{ background: '#0d1424', borderColor: '#1a2238' }}>

        {/* Logo */}
        <div className="px-5 py-5 border-b" style={{ borderColor: '#1a2238' }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: '#1D4ED8' }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="5" width="20" height="14" rx="3"/><line x1="2" y1="10" x2="22" y2="10"/>
              </svg>
            </div>
            <div>
              <p className="text-white font-bold text-sm tracking-tight">BirrBank</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <p className="text-xs font-semibold" style={{ color: '#34d399' }}>Admin Console</p>
              </div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {NAV.map(item => {
            const active = isActive(pathname, item.href, item.exact)
            return (
              <Link key={item.href} href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all relative"
                style={{
                  background:  active ? 'rgba(29,78,216,0.12)' : 'transparent',
                  borderLeft:  active ? '2px solid #1D4ED8'    : '2px solid transparent',
                }}>
                {active && (
                  <div className="absolute inset-0 rounded-xl pointer-events-none"
                    style={{ background: 'linear-gradient(90deg,rgba(29,78,216,0.06),transparent)' }} />
                )}
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all"
                  style={{ background: active ? '#1D4ED8' : 'rgba(255,255,255,0.04)' }}>
                  <item.icon size={15} style={{ color: active ? '#ffffff' : '#475569' }} />
                </div>
                <div className="relative">
                  <p className="text-sm font-semibold" style={{ color: active ? '#ffffff' : '#64748b' }}>
                    {item.label}
                  </p>
                  <p className="text-xs" style={{ color: active ? 'rgba(255,255,255,0.45)' : '#334155' }}>
                    {item.sub}
                  </p>
                </div>
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="px-3 py-4 border-t space-y-0.5" style={{ borderColor: '#1a2238' }}>
          <a href="https://birrbank.com"
            target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-between px-3 py-2.5 rounded-xl transition-all"
            style={{ background: 'rgba(255,255,255,0.02)' }}>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-xs font-semibold" style={{ color: '#475569' }}>View Live Platform</span>
            </div>
            <ExternalLink size={11} style={{ color: '#1e293b' }} />
          </a>
          <button onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl transition-all w-full text-left"
            style={{ background: 'transparent' }}>
            <LogOut size={14} style={{ color: '#ef4444' }} />
            <span className="text-xs font-semibold" style={{ color: '#ef4444' }}>Log out</span>
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Topbar */}
        <header className="h-12 shrink-0 flex items-center px-6 border-b"
          style={{ background: '#0d1424', borderColor: '#1a2238' }}>
          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold" style={{ color: '#334155' }}>Admin</span>
            <ChevronRight size={12} style={{ color: '#1e293b' }} />
            <span className="font-semibold" style={{ color: '#64748b' }}>{crumb.label}</span>
            {crumb.isDetail && crumb.detail && (
              <>
                <ChevronRight size={12} style={{ color: '#1e293b' }} />
                <span className="font-bold text-white">{crumb.detail}</span>
              </>
            )}
          </div>
          <div className="ml-auto flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-xs font-bold" style={{ color: '#34d399' }}>Build: Green</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          <Suspense fallback={
            <div className="p-8 space-y-4 animate-pulse">
              <div className="h-8 w-64 rounded-xl" style={{ background: '#0d1424' }} />
              <div className="h-4 w-96 rounded-lg" style={{ background: '#0d1424' }} />
              <div className="grid grid-cols-4 gap-4 mt-6">
                {[...Array(4)].map((_,i) => (
                  <div key={i} className="h-28 rounded-2xl" style={{ background: '#0d1424' }} />
                ))}
              </div>
              <div className="h-64 rounded-2xl mt-4" style={{ background: '#0d1424' }} />
            </div>
          }>
            {children}
          </Suspense>
        </main>
      </div>
    </div>
  )
}
