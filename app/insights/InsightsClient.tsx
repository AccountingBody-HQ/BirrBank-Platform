"use client"

// ============================================
// INSIGHTS — CLIENT FILTER & SEARCH CONTROLS
// Updates URL search params → triggers server re-fetch
// ============================================

import { useRouter, useSearchParams } from "next/navigation"
import { useState, useCallback, useEffect } from "react"
import { Search, X } from "lucide-react"
import { INSIGHT_TOPICS } from "@/lib/sanity"

export default function InsightsClient() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentTopic = searchParams.get("topic") || "all"
  const currentSearch = searchParams.get("q") || ""

  const [searchInput, setSearchInput] = useState(currentSearch)

  // Keep input in sync if URL changes externally
  useEffect(() => {
    setSearchInput(currentSearch)
  }, [currentSearch])

  // Build new URL with updated params
  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString())
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "" || value === "all") {
          params.delete(key)
        } else {
          params.set(key, value)
        }
      })
      // Reset to page 1 on filter change
      params.delete("page")
      const qs = params.toString()
      router.push("/insights/" + (qs ? "?" + qs : ""), { scroll: false })
    },
    [router, searchParams]
  )

  // Handle topic click
  const handleTopic = (slug: string) => {
    updateParams({ topic: slug === "all" ? null : slug })
  }

  // Handle search submit
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    updateParams({ q: searchInput.trim() || null })
  }

  // Clear search
  const clearSearch = () => {
    setSearchInput("")
    updateParams({ q: null })
  }

  return (
    <div className="space-y-6">
      {/* TOPIC FILTER PILLS */}
      <div className="flex flex-wrap gap-2">
        {INSIGHT_TOPICS.map((topic) => {
          const isActive = currentTopic === topic.slug
          return (
            <button
              key={topic.slug}
              onClick={() => handleTopic(topic.slug)}
              className={
                "px-4 py-2 rounded-full text-sm font-semibold transition-all " +
                (isActive
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800")
              }
            >
              {topic.label}
            </button>
          )
        })}
      </div>

      {/* SEARCH BAR */}
      <form onSubmit={handleSearch} className="relative max-w-md">
        <Search
          size={16}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
        />
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search articles…"
          className="w-full pl-11 pr-10 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
        />
        {searchInput && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={14} />
          </button>
        )}
      </form>

      {/* Active search indicator */}
      {currentSearch && (
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <span>
            Showing results for{" "}
            <span className="font-semibold text-slate-700">&ldquo;{currentSearch}&rdquo;</span>
          </span>
          <button
            onClick={clearSearch}
            className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  )
}
