// ============================================
// GLOBALPAYROLLEXPERT — INSIGHTS LISTING PAGE
// /insights/ — Articles from Sanity CMS
// Shows only articles tagged to globalpayrollexpert
// ============================================

import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, BookOpen } from "lucide-react"
import { getInsightArticles, getInsightCount } from "@/lib/sanity"
import { getBreadcrumbStructuredData, jsonLd } from "@/lib/structured-data"
import InsightsClient from "./InsightsClient"
import EmailCapture from "@/components/EmailCapture"

// --- METADATA ---
export const metadata: Metadata = {
  title: "Insights — Global Payroll Analysis & Intelligence",
  description:
    "Expert analysis on global payroll, employment law, EOR strategy, tax compliance, and HR policy. In-depth articles for payroll professionals and global employers.",
  alternates: {
    canonical: "https://globalpayrollexpert.com/insights/",
  },
  openGraph: {
    title: "Insights — Global Payroll Analysis & Intelligence",
    description:
      "Expert analysis on global payroll, employment law, EOR strategy, tax compliance, and HR policy.",
    url: "https://globalpayrollexpert.com/insights/",
    type: "website",
  },
}

// --- HELPER: FORMAT DATE ---
function formatDate(dateString: string): string {
  try {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  } catch {
    return ""
  }
}

// --- PAGE ---
export default async function InsightsPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string; q?: string; page?: string }>
}) {
  const params = await searchParams
  const topic = params.topic || "all"
  const search = params.q || ""
  const page = parseInt(params.page || "1", 10)
  const perPage = 12
  const offset = (page - 1) * perPage

  // Fetch articles and count in parallel
  const [articles, totalCount] = await Promise.all([
    getInsightArticles({ topic, search, limit: perPage, offset }),
    getInsightCount({ topic, search }),
  ])

  const totalPages = Math.ceil(totalCount / perPage)

  // Breadcrumb structured data
  const breadcrumbData = getBreadcrumbStructuredData([
    { name: "Home", href: "/" },
    { name: "Insights", href: "/insights/" },
  ])

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbData) }}
      />

      {/* ══════ HEADER ══════ */}
      <section className="bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-6">
              <BookOpen size={13} className="text-blue-400" />
              <span className="text-blue-300 text-xs font-semibold tracking-wide">
                Intelligence
              </span>
            </div>
            <h1
              className="font-serif text-4xl lg:text-5xl font-bold text-white leading-tight mb-5"
              style={{ letterSpacing: "-0.025em" }}
            >
              Global payroll insights.
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed max-w-2xl">
              Expert analysis on payroll regulations, employment law changes, EOR
              strategy, tax compliance, and HR policy across 195 jurisdictions.
            </p>
          </div>
        </div>
      </section>

      {/* ══════ FILTERS + ARTICLES ══════ */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          {/* Client-side filters and search */}
          <InsightsClient />

          {/* Article count */}
          <div className="mt-8 mb-8">
            <p className="text-sm text-slate-500">
              {totalCount === 0
                ? "No articles found"
                : totalCount === 1
                ? "1 article"
                : totalCount + " articles"}
              {search ? ` matching "${search}"` : ""}
              {topic !== "all" ? ` in ${topic.replace("-", " ")}` : ""}
            </p>
          </div>

          {/* Article grid */}
          {articles.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <Link
                  key={article._id}
                  href={"/insights/" + article.slug?.current + "/"}
                  className="group bg-white border border-slate-200 hover:border-blue-300 hover:shadow-lg rounded-2xl overflow-hidden transition-all duration-200 flex flex-col"
                >
                  <div className="h-1.5 bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="p-7 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      {article.category && (
                        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                          {article.category}
                        </span>
                      )}
                      {article.publishedAt && (
                        <span className="text-xs text-slate-400">
                          {formatDate(article.publishedAt)}
                        </span>
                      )}
                    </div>
                    <h2 className="font-bold text-slate-900 text-lg mb-3 leading-snug group-hover:text-blue-700 transition-colors">
                      {article.title}
                    </h2>
                    {article.excerpt && (
                      <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 flex-1">
                        {article.excerpt}
                      </p>
                    )}
                    <div className="mt-6 flex items-center gap-1.5 text-blue-600 text-sm font-semibold group-hover:gap-2.5 transition-all">
                      Read article <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <BookOpen size={40} className="text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-800 mb-2">
                No articles found
              </h3>
              <p className="text-slate-500 text-sm max-w-md mx-auto">
                {search
                  ? "Try a different search term or clear the filters."
                  : "Articles will appear here once published in the CMS."}
              </p>
            </div>
          )}

          {/* ══════ PAGINATION ══════ */}
          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              {page > 1 && (
                <PaginationLink
                  page={page - 1}
                  topic={topic}
                  search={search}
                  label="Previous"
                />
              )}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <PaginationLink
                  key={p}
                  page={p}
                  topic={topic}
                  search={search}
                  label={String(p)}
                  isActive={p === page}
                />
              ))}
              {page < totalPages && (
                <PaginationLink
                  page={page + 1}
                  topic={topic}
                  search={search}
                  label="Next"
                />
              )}
            </div>
          )}
        </div>
      </section>

      {/* ══════ EMAIL CAPTURE ══════ */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: "#0d1f3c" }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 80% 50%, rgba(30,111,255,0.12) 0%, transparent 60%)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
                Stay Informed
              </p>
              <h2
                className="font-serif text-3xl lg:text-4xl font-bold text-white leading-tight tracking-tight mb-6"
              >
                Get the latest payroll
                <br />
                intelligence delivered.
              </h2>
              <p className="text-slate-400 leading-relaxed text-lg max-w-md">
                Rate changes, employment law updates, and compliance alerts — once
                a month, direct to your inbox.
              </p>
            </div>
            <div>
              <EmailCapture
                source="insights"
                variant="dark"
                title="Subscribe to updates"
                subtitle="Join thousands of payroll professionals."
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// --- PAGINATION LINK COMPONENT ---
function PaginationLink({
  page,
  topic,
  search,
  label,
  isActive,
}: {
  page: number
  topic: string
  search: string
  label: string
  isActive?: boolean
}) {
  const params = new URLSearchParams()
  if (topic && topic !== "all") params.set("topic", topic)
  if (search) params.set("q", search)
  if (page > 1) params.set("page", String(page))
  const qs = params.toString()
  const href = "/insights/" + (qs ? "?" + qs : "")

  return (
    <Link
      href={href}
      className={
        "px-4 py-2 rounded-lg text-sm font-semibold transition-all " +
        (isActive
          ? "bg-blue-600 text-white"
          : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800")
      }
    >
      {label}
    </Link>
  )
}
