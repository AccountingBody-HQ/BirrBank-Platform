import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createSupabaseAdminClient } from '@/lib/supabase'
import { User, Building2, ArrowRight, BookmarkCheck, TrendingUp, Shield, MessageSquare } from 'lucide-react'
import DeleteAccountButton from '@/components/DeleteAccountButton'

export const dynamic = "force-dynamic"

export const metadata = {
  title: 'Dashboard | BirrBank',
  description: 'Your BirrBank account dashboard.',
}

async function getAiUsage(userId: string) {
  try {
    const supabase = createSupabaseAdminClient()
    const { count } = await supabase
      .schema('birrbank')
      .from('ai_conversations')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId)
      .gte('created_at', new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString())
    return count || 0
  } catch {
    return 0
  }
}

async function getInstitutionCount() {
  try {
    const supabase = createSupabaseAdminClient()
    const { count } = await supabase
      .schema('birrbank')
      .from('institutions')
      .select('id', { count: 'exact', head: true })
      .eq('is_active', true)
    return count || 0
  } catch {
    return 0
  }
}

export default async function DashboardPage() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  const user = await currentUser()
  const [aiUsage, institutionCount] = await Promise.all([
    getAiUsage(userId),
    getInstitutionCount(),
  ])

  const firstName = user?.firstName || user?.emailAddresses?.[0]?.emailAddress?.split('@')[0] || 'there'

  return (
    <main className="bg-white flex-1">

      {/* Header */}
      <div className="relative overflow-hidden border-b border-slate-800" style={{ background: '#0f172a' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-1">Welcome back</p>
              <h1 className="font-serif font-bold text-white" style={{ fontSize: 'clamp(22px, 3vw, 32px)' }}>
                {firstName}
              </h1>
            </div>
            <span className="inline-flex items-center gap-2 bg-slate-800 border border-slate-700 text-slate-400 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
              Free Account
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { icon: MessageSquare, label: 'AI Questions This Month', value: aiUsage.toString(),        sub: '10 free per month' },
            { icon: Building2,     label: 'Active Institutions',     value: institutionCount.toString(), sub: 'NBE-regulated entities' },
            { icon: TrendingUp,    label: 'Pillars Covered',         value: '5',                        sub: 'Banking, Insurance, Markets, Commodities, Diaspora' },
            { icon: Shield,        label: 'Your Plan',               value: 'Free',                     sub: 'Intelligence tier coming soon' },
          ].map(s => (
            <div key={s.label} className="bg-white border border-slate-200 rounded-2xl p-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: '#eff6ff', color: '#1D4ED8' }}>
                <s.icon size={18} />
              </div>
              <div className="text-2xl font-black text-slate-900">{s.value}</div>
              <div className="text-sm font-semibold text-slate-700 mt-0.5">{s.label}</div>
              <div className="text-xs text-slate-400 mt-0.5">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Two column layout */}
        <div className="grid lg:grid-cols-2 gap-8">

          {/* Saved comparisons */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
            <div className="px-7 py-5 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-bold text-slate-900">Saved Comparisons</h2>
              <Link href="/dashboard/saved"
                className="text-sm font-semibold hover:text-blue-700 flex items-center gap-1" style={{ color: '#1D4ED8' }}>
                View all <ArrowRight size={13} />
              </Link>
            </div>
            <div className="px-7 py-12 text-center">
              <BookmarkCheck size={32} className="text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 text-sm font-medium mb-1">No saved comparisons yet</p>
              <p className="text-slate-400 text-xs mb-4">Save institution comparisons and rate searches to access them here</p>
              <Link href="/institutions"
                className="inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: '#1D4ED8' }}>
                Browse institutions <ArrowRight size={13} />
              </Link>
            </div>
          </div>

          {/* Quick links */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
            <div className="px-7 py-5 border-b border-slate-100">
              <h2 className="font-bold text-slate-900">Quick Access</h2>
            </div>
            <div className="divide-y divide-slate-100">
              {[
                { href: '/banking/savings-rates', icon: TrendingUp,    label: 'Savings Rates',        sub: 'Best rates across all Ethiopian banks' },
                { href: '/banking/fx-rates',      icon: Shield,        label: 'FX Rates',             sub: 'NBE and bank foreign exchange rates' },
                { href: '/institutions',          icon: Building2,     label: 'All Institutions',     sub: `${institutionCount} NBE-regulated entities` },
                { href: '/ai-assistant',          icon: MessageSquare, label: 'BirrBank AI',          sub: 'Ask anything about Ethiopian finance' },
              ].map(item => (
                <Link key={item.href} href={item.href}
                  className="px-7 py-4 flex items-center gap-4 hover:bg-slate-50 transition-colors group">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: '#eff6ff', color: '#1D4ED8' }}>
                    <item.icon size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-slate-800 text-sm group-hover:text-blue-700 transition-colors">{item.label}</div>
                    <div className="text-slate-400 text-xs mt-0.5">{item.sub}</div>
                  </div>
                  <ArrowRight size={14} className="text-slate-300 group-hover:text-blue-500 transition-colors shrink-0" />
                </Link>
              ))}
            </div>
          </div>

        </div>

        {/* Account Settings */}
        <div className="mt-8">
          <DeleteAccountButton />
        </div>

      </div>
    </main>
  )
}
