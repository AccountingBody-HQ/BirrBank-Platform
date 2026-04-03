import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import { Globe, CheckCircle, AlertCircle, XCircle } from 'lucide-react'

async function getCoverageData() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { data: countries } = await supabase
      .from('countries')
      .select('iso2, name, hrlake_coverage_level, last_data_update')
      .eq('is_active', true)
      .order('name')

    const { data: brackets } = await supabase
      .schema('hrlake').from('tax_brackets')
      .select('country_code').eq('is_current', true)

    const { data: ss } = await supabase
      .schema('hrlake').from('social_security')
      .select('country_code').eq('is_current', true)

    const { data: rules } = await supabase
      .schema('hrlake').from('employment_rules')
      .select('country_code').eq('is_current', true)

    const bracketCodes = new Set((brackets ?? []).map((r: any) => r.country_code))
    const ssCodes     = new Set((ss      ?? []).map((r: any) => r.country_code))
    const rulesCodes  = new Set((rules   ?? []).map((r: any) => r.country_code))

    return (countries ?? []).map((c: any) => {
      const has_tax   = bracketCodes.has(c.iso2)
      const has_ss    = ssCodes.has(c.iso2)
      const has_rules = rulesCodes.has(c.iso2)
      const score     = [has_tax, has_ss, has_rules].filter(Boolean).length
      const status    = score === 3 ? 'full' : score > 0 ? 'partial' : 'none'
      return { ...c, has_tax, has_ss, has_rules, score, status }
    })
  } catch (e) {
    console.error('getCoverageData error:', e)
    return []
  }
}

export default async function CoverageMapPage() {
  const countries = await getCoverageData()
  const full    = countries.filter((c: any) => c.status === 'full')
  const partial = countries.filter((c: any) => c.status === 'partial')
  const none    = countries.filter((c: any) => c.status === 'none')
  const total   = countries.length

  const pct = (n: number) => total > 0 ? Math.round((n / total) * 100) : 0

  return (
    <div className="p-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Coverage Map</h1>
        <p className="text-slate-400 text-sm">Data coverage status across all active countries</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Countries',  value: total,          color: 'text-blue-400',    bg: 'bg-blue-600/10 border-blue-600/20' },
          { label: 'Full Coverage',    value: full.length,    color: 'text-emerald-400', bg: 'bg-emerald-600/10 border-emerald-600/20' },
          { label: 'Partial Coverage', value: partial.length, color: 'text-amber-400',   bg: 'bg-amber-600/10 border-amber-600/20' },
          { label: 'No Data',          value: none.length,    color: 'text-red-400',     bg: 'bg-red-600/10 border-red-600/20' },
        ].map(card => (
          <div key={card.label} className={`border rounded-2xl p-5 ${card.bg}`}>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-3">{card.label}</p>
            <p className={`text-3xl font-black ${card.color}`}>{card.value}</p>
          </div>
        ))}
      </div>

      {/* Progress bars */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8">
        <h2 className="text-white font-bold mb-5">Coverage breakdown</h2>
        <div className="space-y-4">
          {[
            { label: 'Full coverage',    count: full.length,    pct: pct(full.length),    color: 'bg-emerald-500' },
            { label: 'Partial coverage', count: partial.length, pct: pct(partial.length), color: 'bg-amber-500' },
            { label: 'No data',          count: none.length,    pct: pct(none.length),    color: 'bg-red-500' },
          ].map(row => (
            <div key={row.label}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-slate-300 text-sm">{row.label}</span>
                <span className="text-slate-400 text-xs">{row.count} countries · {row.pct}%</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className={`h-full ${row.color} rounded-full transition-all`} style={{ width: `${row.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Country tables by status */}
      {[
        { title: 'Full Coverage', icon: CheckCircle, iconColor: 'text-emerald-400', items: full,    emptyMsg: 'No fully covered countries yet' },
        { title: 'Partial Coverage', icon: AlertCircle, iconColor: 'text-amber-400', items: partial, emptyMsg: 'No partial countries' },
        { title: 'No Data', icon: XCircle, iconColor: 'text-red-400', items: none, emptyMsg: 'All countries have some data' },
      ].map(section => (
        <div key={section.title} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-slate-800 flex items-center gap-3">
            <section.icon size={16} className={section.iconColor} />
            <h2 className="text-white font-bold">{section.title}</h2>
            <span className="text-slate-500 text-xs">({section.items.length})</span>
          </div>
          {section.items.length === 0 ? (
            <p className="px-6 py-4 text-slate-500 text-sm">{section.emptyMsg}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-800">
                    <th className="text-left px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Country</th>
                    <th className="text-center px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Tax</th>
                    <th className="text-center px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">SS</th>
                    <th className="text-center px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Rules</th>
                    <th className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Last Updated</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {section.items.map((c: any) => (
                    <tr key={c.iso2} className="hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-3">
                          <img src={`https://flagcdn.com/20x15/${c.iso2.toLowerCase()}.png`} alt={c.name} width={20} height={15} className="rounded-sm" />
                          <span className="text-white text-sm font-semibold">{c.name}</span>
                          <span className="text-slate-500 text-xs">{c.iso2}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">{c.has_tax   ? '✅' : '❌'}</td>
                      <td className="px-4 py-3 text-center">{c.has_ss    ? '✅' : '❌'}</td>
                      <td className="px-4 py-3 text-center">{c.has_rules ? '✅' : '❌'}</td>
                      <td className="px-4 py-3 text-slate-400 text-xs">
                        {c.last_data_update
                          ? new Date(c.last_data_update).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
                          : '—'}
                      </td>
                      <td className="px-4 py-3">
                        <Link href={`/admin/data-quality/${c.iso2.toLowerCase()}`} className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors">
                          Verify
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
