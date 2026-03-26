'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X, ArrowRight, Globe, FileText, Loader2 } from 'lucide-react'

interface Country {
  iso2: string
  name: string
  flag_emoji: string
  region: string
  currency_code: string
  gpe_coverage_level: string
}

interface Article {
  title: string
  slug: string
  publishedAt: string
  excerpt: string
  category: string
}

interface SearchResults {
  countries: Country[]
  articles: Article[]
}

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debouncedValue
}

interface SearchBarProps {
  variant?: 'hero' | 'nav'
  placeholder?: string
  className?: string
}

export default function SearchBar({
  variant = 'hero',
  placeholder,
  className = '',
}: SearchBarProps) {
  const router = useRouter()
  const isHero = variant === 'hero'
  const defaultPlaceholder = isHero ? 'Search any country, guide, or topic…' : 'Search countries…'

  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResults | null>(null)
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)

  const debouncedQuery = useDebounce(query, 220)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!debouncedQuery || debouncedQuery.length < 2) {
      setResults(null)
      setOpen(false)
      return
    }
    let cancelled = false
    setLoading(true)
    fetch('/api/search?q=' + encodeURIComponent(debouncedQuery))
      .then(r => r.json())
      .then((data: SearchResults) => {
        if (!cancelled) { setResults(data); setOpen(true); setActiveIndex(-1) }
      })
      .catch(() => { if (!cancelled) setResults(null) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [debouncedQuery])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const flatItems = [
    ...(results?.countries.slice(0, 5).map(c => ({ type: 'country' as const, data: c })) ?? []),
    ...(results?.articles.slice(0, 3).map(a => ({ type: 'article' as const, data: a })) ?? []),
  ]

  const navigate = useCallback((item: typeof flatItems[0]) => {
    setOpen(false); setQuery('')
    if (item.type === 'country') router.push('/countries/' + (item.data as Country).iso2.toLowerCase() + '/')
    else router.push('/insights/' + (item.data as Article).slug + '/')
  }, [router])

  const submitSearch = useCallback(() => {
    if (!query.trim()) return
    setOpen(false)
    router.push('/search/?q=' + encodeURIComponent(query.trim()))
  }, [query, router])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open || flatItems.length === 0) { if (e.key === 'Enter') submitSearch(); return }
    if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIndex(i => Math.min(i + 1, flatItems.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIndex(i => Math.max(i - 1, -1)) }
    else if (e.key === 'Enter') { e.preventDefault(); if (activeIndex >= 0) navigate(flatItems[activeIndex]); else submitSearch() }
    else if (e.key === 'Escape') { setOpen(false); setActiveIndex(-1) }
  }

  const hasResults = results && (results.countries.length > 0 || results.articles.length > 0)
  const noResults = results && results.countries.length === 0 && results.articles.length === 0

  return (
    <div ref={containerRef} className={'relative ' + className}>

      {/* ── Input ── */}
      {isHero ? (
        <div className="relative group">
          <div className="absolute inset-0 rounded-2xl bg-blue-500/20 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <div className="relative flex items-center bg-white rounded-2xl shadow-2xl shadow-black/30 overflow-hidden border-2 border-transparent focus-within:border-blue-400 transition-all duration-200">
            <div className="flex items-center justify-center w-14 h-14 shrink-0">
              {loading
                ? <Loader2 size={18} className="animate-spin text-blue-500" />
                : <Search size={18} className="text-slate-400" />
              }
            </div>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => { if (results && debouncedQuery.length >= 2) setOpen(true) }}
              placeholder={placeholder ?? defaultPlaceholder}
              className="flex-1 py-4 pr-4 text-base font-medium text-slate-900 placeholder:text-slate-400 bg-transparent outline-none"
              autoComplete="off"
              aria-label="Search"
            />
            {query && (
              <button
                onClick={() => { setQuery(''); setResults(null); setOpen(false); inputRef.current?.focus() }}
                className="flex items-center justify-center w-8 h-8 mr-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors shrink-0"
              >
                <X size={15} />
              </button>
            )}
            <button
              onClick={submitSearch}
              className="m-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-sm font-bold rounded-xl transition-colors shrink-0"
            >
              Search
            </button>
          </div>
        </div>
      ) : (
        <div className="relative flex items-center bg-slate-800/80 hover:bg-slate-800 focus-within:bg-slate-800 rounded-xl border border-slate-700 focus-within:border-blue-500 transition-all duration-200 overflow-hidden">
          <div className="flex items-center justify-center w-9 h-9 shrink-0 ml-1">
            {loading
              ? <Loader2 size={14} className="animate-spin text-blue-400" />
              : <Search size={14} className="text-slate-400" />
            }
          </div>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => { if (results && debouncedQuery.length >= 2) setOpen(true) }}
            placeholder={placeholder ?? defaultPlaceholder}
            className="flex-1 py-2 pr-2 text-sm font-medium text-white placeholder:text-slate-500 bg-transparent outline-none"
            autoComplete="off"
            aria-label="Search"
          />
          {query && (
            <button
              onClick={() => { setQuery(''); setResults(null); setOpen(false); inputRef.current?.focus() }}
              className="flex items-center justify-center w-7 h-7 mr-1.5 rounded-lg hover:bg-slate-700 text-slate-500 hover:text-slate-300 transition-colors shrink-0"
            >
              <X size={13} />
            </button>
          )}
        </div>
      )}

      {/* ── Dropdown ── */}
      {open && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl shadow-black/25 border border-slate-150 overflow-hidden z-50">

          {results && results.countries.length > 0 && (
            <div>
              <div className="flex items-center gap-2 px-4 pt-3 pb-1.5 border-b border-slate-50">
                <Globe size={10} className="text-blue-500" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Countries</span>
              </div>
              {results.countries.slice(0, 5).map((country, i) => {
                const isActive = activeIndex === i
                return (
                  <button
                    key={country.iso2}
                    onClick={() => navigate({ type: 'country', data: country })}
                    onMouseEnter={() => setActiveIndex(i)}
                    className={'w-full flex items-center gap-3 px-4 py-2.5 transition-colors text-left ' + (isActive ? 'bg-blue-50' : 'hover:bg-slate-50')}
                  >
                    <img
                      src={'https://flagcdn.com/20x15/' + country.iso2.toLowerCase() + '.png'}
                      alt={country.name}
                      width={20} height={15}
                      className="rounded-sm shadow-sm shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className={'font-semibold text-sm ' + (isActive ? 'text-blue-700' : 'text-slate-800')}>{country.name}</div>
                      <div className="text-[11px] text-slate-400">{country.region} · {country.currency_code}</div>
                    </div>
                    <ArrowRight size={12} className={'shrink-0 transition-all ' + (isActive ? 'text-blue-400 opacity-100' : 'text-slate-200 opacity-0')} />
                  </button>
                )
              })}
            </div>
          )}

          {results && results.articles.length > 0 && (
            <div className={results.countries.length > 0 ? 'border-t border-slate-100' : ''}>
              <div className="flex items-center gap-2 px-4 pt-3 pb-1.5 border-b border-slate-50">
                <FileText size={10} className="text-indigo-500" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Articles</span>
              </div>
              {results.articles.slice(0, 3).map((article, i) => {
                const flatIdx = (results.countries.slice(0, 5).length) + i
                const isActive = activeIndex === flatIdx
                return (
                  <button
                    key={article.slug}
                    onClick={() => navigate({ type: 'article', data: article })}
                    onMouseEnter={() => setActiveIndex(flatIdx)}
                    className={'w-full flex items-start gap-3 px-4 py-2.5 transition-colors text-left ' + (isActive ? 'bg-blue-50' : 'hover:bg-slate-50')}
                  >
                    <div className="mt-0.5 shrink-0 bg-indigo-50 rounded-md p-1.5">
                      <FileText size={11} className="text-indigo-500" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className={'font-semibold text-sm leading-snug ' + (isActive ? 'text-blue-700' : 'text-slate-800')}>{article.title}</div>
                      {article.category && <div className="text-[11px] text-indigo-400 font-medium mt-0.5">{article.category}</div>}
                    </div>
                  </button>
                )
              })}
            </div>
          )}

          {noResults && (
            <div className="px-5 py-5 text-center">
              <p className="text-slate-500 text-sm">No results for <span className="font-semibold text-slate-700">"{query}"</span></p>
              <p className="text-slate-400 text-xs mt-0.5">Try a country name or ISO code</p>
            </div>
          )}

          {hasResults && (
            <button
              onClick={submitSearch}
              className="w-full flex items-center justify-between px-4 py-2.5 border-t border-slate-100 bg-slate-50 hover:bg-blue-50 transition-colors text-xs font-bold text-blue-600 group"
            >
              <span>View all results for "{query}"</span>
              <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          )}
        </div>
      )}
    </div>
  )
}
