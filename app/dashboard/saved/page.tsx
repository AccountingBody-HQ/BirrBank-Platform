import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { BookmarkCheck, ArrowLeft, ArrowRight, Building2, TrendingUp } from 'lucide-react'

export const dynamic = "force-dynamic"

export const metadata = {
  title: 'Saved Comparisons | BirrBank',
  description: 'Your saved institution comparisons and rate searches.',
}

export default async function SavedComparisonsPage() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  return (
    <main className="bg-white flex-1">

      {/* Header */}
      <div className="relative overflow-hidden border-b border-slate-800" style={{ background: '#0f172a' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
          <Link href="/dashboard"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm font-medium transition-colors mb-6">
            <ArrowLeft size={15} /> Back to dashboard
          </Link>
          <h1 className="font-serif font-bold text-white" style={{ fontSize: 'clamp(22px, 3vw, 32px)' }}>
            Saved Comparisons
          </h1>
          <p className="text-slate-400 text-sm mt-1">Your saved institution comparisons and rate searches</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">

        <div className="bg-white border border-slate-200 rounded-2xl p-16 text-center">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: '#eff6ff' }}>
            <BookmarkCheck size={28} style={{ color: '#1D4ED8' }} />
          </div>
          <h2 className="text-lg font-bold text-slate-700 mb-2">No saved comparisons yet</h2>
          <p className="text-slate-400 text-sm mb-8 max-w-sm mx-auto">
            Browse institutions and rate comparisons across BirrBank and save them here for quick access.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/banking/savings-rates"
              className="inline-flex items-center gap-2 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
              style={{ background: '#1D4ED8' }}>
              <TrendingUp size={15} /> Compare savings rates
            </Link>
            <Link href="/institutions"
              className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:border-blue-300 text-slate-700 font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors">
              <Building2 size={15} /> Browse institutions <ArrowRight size={13} />
            </Link>
          </div>
        </div>

      </div>
    </main>
  )
}
