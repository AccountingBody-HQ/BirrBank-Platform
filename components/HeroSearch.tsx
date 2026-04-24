'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const PLACEHOLDERS = [
  'Search savings rates across 32 banks...',
  'Check USD to ETB exchange rate...',
  'Compare motor insurance providers...',
  'Track ESX listed equities...',
  'Find cheapest way to send money home...',
  'Compare CBE vs Awash Bank...',
]

export default function HeroSearch() {
  const router = useRouter()
  const [query, setQuery]       = useState('')
  const [current, setCurrent]   = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting]   = useState(false)
  const [paused, setPaused]       = useState(false)

  useEffect(() => {
    if (paused) return
    const target = PLACEHOLDERS[current]
    if (!deleting && displayed.length < target.length) {
      const t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 45)
      return () => clearTimeout(t)
    }
    if (!deleting && displayed.length === target.length) {
      const t = setTimeout(() => setDeleting(true), 2200)
      return () => clearTimeout(t)
    }
    if (deleting && displayed.length > 0) {
      const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 22)
      return () => clearTimeout(t)
    }
    if (deleting && displayed.length === 0) {
      setDeleting(false)
      setCurrent((c) => (c + 1) % PLACEHOLDERS.length)
    }
  }, [displayed, deleting, current, paused])

  function handleFocus() { setPaused(true) }
  function handleBlur()  { if (!query) setPaused(false) }

  function handleSearch() {
    if (query.trim()) router.push('/search?q=' + encodeURIComponent(query.trim()))
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <div style={{ maxWidth: 480 }}>
      <div
        className="flex items-center gap-3 bg-white rounded-2xl"
        style={{ border: '2px solid #1A5C38', boxShadow: '0 4px 24px rgba(26,92,56,0.15)', padding: '6px 6px 6px 18px' }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKey}
          placeholder={displayed}
          className="flex-1 bg-transparent outline-none text-slate-800 placeholder-slate-400"
          style={{ fontSize: 14, fontWeight: 500 }}
        />
        <button
          onClick={handleSearch}
          className="font-bold rounded-xl text-white shrink-0 transition-opacity hover:opacity-90"
          style={{ background: '#1A5C38', fontSize: 14, padding: '10px 20px' }}
        >
          Search
        </button>
      </div>
      <p className="text-xs text-slate-400 mt-2 ml-1">
        Try: <span className="text-slate-500 font-medium">&quot;best savings rate&quot;</span> &cdot; <span className="text-slate-500 font-medium">&quot;USD pto ETB&quot;</span> &cdot; <span className="text-slate-500 font-medium">&quot;CBE mortgage&quot;</span>
      </p>
    </div>
  )
}
