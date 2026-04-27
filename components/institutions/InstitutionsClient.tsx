'use client'
import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Search, X, ChevronRight, TrendingUp, Globe, CreditCard, Building2 } from 'lucide-react'

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
  bank:'Bank', insurer:'Insurer', microfinance:'Microfinance',
  payment_operator:'Payment', money_transfer:'Remittance', fx_bureau:'FX Bureau',
  capital_goods_finance:'Capital Goods', reinsurer:'Reinsurer', investment_bank:'Investment Bank',
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

// Quick links shown at bottom of card per type
const TYPE_QUICK_LINKS: Record<string, { label: string; href: (slug: string) => string }[]> = {
  bank: [
    { label: 'Rates', href: s => `/institutions/${s}#savings` },
    { label: 'Loans', href: s => `/institutions/${s}#loans` },
    { label: 'FX', href: s => `/institutions/${s}#fx` },
  ],
  insurer: [
    { label: 'Profile', href: s => `/institutions/${s}` },
    { label: 'Motor', href: _ => `/insurance/motor` },
    { label: 'Life', href: _ => `/insurance/life` },
  ],
  microfinance: [
    { label: 'Profile', href: s => `/institutions/${s}` },
    { label: 'Loans', href: _ => `/banking/microfinance` },
  ],
  payment_operator: [
    { label: 'Profile', href: s => `/institutions/${s}` },
    { label: 'Compare', href: _ => `/banking/mobile-money` },
  ],
  fx_bureau: [
    { label: 'Profile', href: s => `/institutions/${s}` },
    { label: 'FX rates', href: _ => `/banking/fx-rates` },
  ],
  money_transfer: [
    { label: 'Profile', href: s => `/institutions/${s}` },
    { label: 'Compare', href: _ => `/banking/money-transfer` },
  ],
}

function TypeInitials({ type }: { type: string }) {
  const color = TYPE_COLORS[type] ?? '#64748b'
  const label = TYPE_LABELS[type] ?? type
  const initials = label.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase()
  return (
    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-xs font-black"
      style={{ background: `${color}18`, color, border: `1px solid ${color}30` }}>
      {initials}
    </div>
  )
}

function InstitutionCard({ inst }: { inst: Institution }) {
  const color = TYPE_COLORS[inst.type] ?? '#64748b'
  const typeLabel = TYPE_LABELS[inst.type] ?? inst.type
  const quickLinks = TYPE_QUICK_LINKS[inst.type] ?? [{ label:'Profile', href: (s: string) => `/institutions/${s}` }]
  const isAvailable = inst.coverage_level && inst.coverage_level !== 'basic'

  // Headline metric per type
  let metric: string | null = null
  if (inst.type === 'bank' && inst.branches_count) metric = `${inst.branches_count} branches`
  else if (inst.swift_code) metric = inst.swift_code
  else if (inst.nbe_licence_number) metric = inst.nbe_licence_number
  else if (inst.operational_status) metric = inst.operational_status
  else if (inst.hq_region) metric = inst.hq_region

  const licenceYear = inst.nbe_licence_date
    ? new Date(inst.nbe_licence_date).getFullYear().toString()
    : null

  const coverageCfg = inst.coverage_level === 'full'
    ? { label:'Verified', cls:'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200' }
    : inst.coverage_level === 'partial'
    ? { label:'Partial', cls:'bg-amber-50 text-amber-700 ring-1 ring-amber-200' }
    : { label:'Basic', cls:'bg-slate-100 text-slate-500 ring-1 ring-slate-200' }

  return (
    <div className="group relative bg-white border border-slate-200 hover:border-l-4 hover:border-l-blue-500 hover:border-blue-200 rounded-xl overflow-hidden transition-all duration-200 flex flex-col"
      style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>

      {/* Main link */}
      <Link href={`/institutions/${inst.slug}`} className="flex flex-col gap-3 p-4 flex-1">
        {/* Top row: initials + name + chevron */}
        <div className="flex items-center gap-3">
          <TypeInitials type={inst.type} />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-slate-900 group-hover:text-blue-700 transition-colors truncate text-sm leading-tight">
              {inst.name}
            </p>
            {metric && (
              <p className="text-xs text-slate-400 mt-0.5 truncate font-mono">{metric}</p>
            )}
          </div>
          <ChevronRight size={14} className="text-slate-300 group-hover:text-blue-400 shrink-0 transition-colors" />
        </div>

        {/* Type badge + coverage + year */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-semibold rounded-full px-2.5 py-0.5"
            style={{ background:`${color}15`, color }}>
            {typeLabel}
          </span>
          <div className="flex items-center gap-2">
            {licenceYear && <span className="text-xs text-slate-400">{licenceYear}</span>}
            <span className={`text-xs font-semibold rounded-full px-2.5 py-0.5 ${coverageCfg.cls}`}>
              {coverageCfg.label}
            </span>
          </div>
        </div>
      </Link>

      {/* Quick links — mirrors HRLake country card bottom strip */}
      <div className="border-t border-slate-100 px-4 py-2.5 flex items-center gap-1">
        {quickLinks.map(ql => (
          <Link key={ql.label} href={ql.href(inst.slug)}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-blue-600 transition-colors px-2 py-1 rounded-lg hover:bg-blue-50">
            {ql.label}
          </Link>
        ))}
        {inst.website_url && (
          <a href={inst.website_url} target="_blank" rel="noopener noreferrer"
            className="ml-auto text-xs text-slate-400 hover:text-blue-600 transition-colors px-2 py-1 rounded-lg hover:bg-blue-50 flex items-center gap-1">
            <Globe size={11} /> Web
          </a>
        )}
      </div>
    </div>
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
      {/* Search bar */}
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

      {/* Type filter tabs */}
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

      {/* Results count + clear */}
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-slate-500">
          {filtered.length === 0 ? 'No institutions found'
            : `Showing ${filtered.length} institution${filtered.length !== 1 ? 's' : ''}`}
        </p>
        {(search || type !== 'all') && (
          <button onClick={() => { setSearch(''); setType('all') }}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors">
            Clear filters
          </button>
        )}
      </div>

      {/* Grid */}
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
