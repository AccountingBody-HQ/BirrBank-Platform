'use client'
import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Search, X, ChevronRight } from 'lucide-react'

type CoverageLevel = 'full' | 'partial' | 'basic'
interface Institution {
  slug: string; name: string; type: string; swift_code: string | null
  website_url: string | null; coverage_level: CoverageLevel | null
  nbe_licence_date: string | null; nbe_licence_number: string | null
  branches_count: number | null; operational_status: string | null
  hq_region: string | null; service_type: string | null
  phone: string | null; email: string | null; is_active: boolean
}

const TYPE_LABELS: Record<string,string> = {
  all:'All', bank:'Banks', insurer:'Insurance', microfinance:'Microfinance',
  payment_operator:'Payment', money_transfer:'Remittance', fx_bureau:'FX Bureaux',
  capital_goods_finance:'Capital Goods', reinsurer:'Reinsurer', investment_bank:'Investment',
}
const TYPE_COLORS: Record<string,string> = {
  bank:'#1D4ED8', insurer:'#8b5cf6', microfinance:'#06b6d4',
  payment_operator:'#f59e0b', money_transfer:'#ec4899', fx_bureau:'#10b981',
  capital_goods_finance:'#f97316', reinsurer:'#64748b', investment_bank:'#64748b',
}
const TYPE_TABS = [
  { value:'all', label:'All' }, { value:'bank', label:'Banks' },
  { value:'microfinance', label:'Microfinance' }, { value:'insurer', label:'Insurance' },
  { value:'payment_operator', label:'Payment' }, { value:'money_transfer', label:'Remittance' },
  { value:'fx_bureau', label:'FX Bureaux' }, { value:'capital_goods_finance', label:'Capital Goods' },
]

function InstitutionCard({ inst }: { inst: Institution }) {
  const color = TYPE_COLORS[inst.type] ?? '#64748b'
  const typeLabel = TYPE_LABELS[inst.type] ?? inst.type
  let metric: string | null = null
  if (inst.type === 'bank' && inst.branches_count) metric = `${inst.branches_count} branches`
  else if (inst.nbe_licence_number) metric = inst.nbe_licence_number
  else if (inst.operational_status) metric = inst.operational_status
  const licenceYear = inst.nbe_licence_date ? new Date(inst.nbe_licence_date).getFullYear().toString() : null
  return (
    <Link href={`/institutions/${inst.slug}`}
      className="group bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col">
      <div style={{ height: 4, background: `linear-gradient(90deg, ${color}, #1E40AF)` }} />
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-start justify-between gap-2 mb-3">
          <p className="font-bold text-slate-900 text-sm leading-snug group-hover:text-blue-700 transition-colors flex-1">{inst.name}</p>
          <ChevronRight size={14} className="text-slate-300 group-hover:text-blue-400 shrink-0 mt-0.5 transition-colors" />
        </div>
        <div className="flex items-center gap-2 flex-wrap mb-3">
          <span className="text-xs font-bold rounded-full px-2 py-0.5"
            style={{ background: `${color}18`, color }}>{typeLabel}</span>
          {metric && <span className="text-xs text-slate-400 font-medium truncate">{metric}</span>}
        </div>
        <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
          {licenceYear ? <span className="text-xs text-slate-400">Est. {licenceYear}</span> : <span />}
          <span className="text-xs font-bold rounded-full px-2 py-0.5"
            style={inst.coverage_level === 'full'
              ? { background:'#dcfce7', color:'#16a34a' }
              : inst.coverage_level === 'partial'
              ? { background:'#fef3c7', color:'#92400e' }
              : { background:'#f1f5f9', color:'#64748b' }}>
            {inst.coverage_level === 'full' ? 'Verified' : inst.coverage_level === 'partial' ? 'Partial' : 'Basic'}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default function InstitutionsClient({ institutions }: { institutions: Institution[] }) {
  const searchParams = useSearchParams()
  const typeParam = searchParams.get('type') ?? 'all'
  const [search, setSearch] = useState('')
  const [type, setType] = useState(typeParam)

  useEffect(() => { setType(typeParam) }, [typeParam])

  const filtered = useMemo(() => {
    let result = [...institutions]
    if (search.trim()) {
      const q = search.trim().toLowerCase()
      result = result.filter(i =>
        i.name.toLowerCase().includes(q) ||
        (i.swift_code?.toLowerCase().includes(q) ?? false) ||
        (i.nbe_licence_number?.toLowerCase().includes(q) ?? false)
      )
    }
    if (type !== 'all') result = result.filter(i => i.type === type)
    return result.sort((a, b) => a.name.localeCompare(b.name))
  }, [institutions, search, type])

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search institutions, SWIFT codes, licence numbers..."
            className="w-full pl-11 pr-10 py-3 bg-white border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all" />
          {search && (
            <button onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
              <X size={15} />
            </button>
          )}
        </div>
      </div>
      <div className="relative mb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="flex gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {TYPE_TABS.map(tab => (
            <button key={tab.value} onClick={() => setType(tab.value)}
              className="px-4 py-2 rounded-full text-sm font-semibold transition-all shrink-0"
              style={type === tab.value
                ? { background:'#1D4ED8', color:'#fff' }
                : { background:'#fff', color:'#475569', border:'1px solid #e2e8f0' }}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-slate-500">
          {filtered.length === 0 ? 'No institutions found' : `Showing ${filtered.length} institution${filtered.length !== 1 ? 's' : ''}`}
        </p>
        {(search || type !== 'all') && (
          <button onClick={() => { setSearch(''); setType('all') }}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors">
            Clear filters
          </button>
        )}
      </div>
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(inst => <InstitutionCard key={inst.slug} inst={inst} />)}
        </div>
      ) : (
        <div className="text-center py-24 text-slate-400">
          <p className="text-5xl mb-4">🏦</p>
          <p className="font-semibold text-slate-600 text-lg">No institutions match your search</p>
          <p className="text-sm mt-2">Try a different name or filter</p>
        </div>
      )}
    </div>
  )
}
