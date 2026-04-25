import Link from 'next/link'
import EmailCapture from '@/components/EmailCapture'
export const dynamic = 'force-dynamic'

// ─── Placeholder data — replace with Supabase queries in Phase 2 ─────────────

const FEATURED_GUIDES = [
  {
    slug: 'best-savings-rate-ethiopia-2026',
    title: 'Best savings rates in Ethiopia — complete guide 2026',
    excerpt: 'A full comparison of savings and fixed deposit rates across all 32 commercial banks, with analysis of which account type suits each saver.',
    pillar: 'Banking',
    pillarColor: '#1A5C38',
    readTime: '8 min read',
    published: '22 Apr 2026',
  },
  {
    slug: 'how-to-invest-esx-ethiopia',
    title: 'How to invest in the Ethiopian Securities Exchange (ESX)',
    excerpt: 'Step-by-step guide to opening a brokerage account, understanding listed equities, and participating in IPOs on the ESX from Ethiopia or abroad.',
    pillar: 'Markets',
    pillarColor: '#7c3aed',
    readTime: '10 min read',
    published: '20 Apr 2026',
  },
  {
    slug: 'cheapest-way-send-money-ethiopia',
    title: 'Cheapest way to send money to Ethiopia in 2026',
    excerpt: 'A corridor-by-corridor comparison of transfer fees, FX rates and speed for every major remittance provider serving the Ethiopian diaspora.',
    pillar: 'Diaspora',
    pillarColor: '#0891b2',
    readTime: '6 min read',
    published: '18 Apr 2026',
  },
  {
    slug: 'motor-insurance-ethiopia-guide',
    title: 'Motor insurance in Ethiopia — what the law requires',
    excerpt: 'Third-party motor insurance is mandatory in Ethiopia. This guide covers minimum requirements, how premiums are calculated and how to compare providers.',
    pillar: 'Insurance',
    pillarColor: '#1d4ed8',
    readTime: '5 min read',
    published: '15 Apr 2026',
  },
  {
    slug: 'ecx-commodity-exchange-guide',
    title: 'How the Ethiopian Commodity Exchange works',
    excerpt: 'A plain-language explanation of the ECX — how coffee, sesame and grain prices are discovered, who trades, and what the prices mean for farmers and exporters.',
    pillar: 'Commodities',
    pillarColor: '#d97706',
    readTime: '7 min read',
    published: '12 Apr 2026',
  },
  {
    slug: 'nbe-directives-explained',
    title: 'NBE directives explained — what they mean for your money',
    excerpt: 'The National Bank of Ethiopia regularly issues directives that affect savings rates, loan limits and FX policy. This guide explains the key directives in plain language.',
    pillar: 'Regulations',
    pillarColor: '#dc2626',
    readTime: '9 min read',
    published: '10 Apr 2026',
  },
]

const CATEGORIES = [
  { label: 'Banking',      href: '/guides?pillar=banking',      color: '#1A5C38', bg: '#e6f4ed', count: '120+' },
  { label: 'Markets',      href: '/guides?pillar=markets',      color: '#7c3aed', bg: '#f5f3ff', count: '80+'  },
  { label: 'Insurance',    href: '/guides?pillar=insurance',    color: '#1d4ed8', bg: '#eff6ff', count: '60+'  },
  { label: 'Commodities',  href: '/guides?pillar=commodities',  color: '#d97706', bg: '#fffbeb', count: '40+'  },
  { label: 'Diaspora',     href: '/guides?pillar=diaspora',     color: '#0891b2', bg: '#ecfeff', count: '50+'  },
  { label: 'Regulations',  href: '/guides?pillar=regulations',  color: '#dc2626', bg: '#fef2f2', count: '70+'  },
]

const RECENT_REGULATIONS = [
  { title: 'NBE Directive No. FXD/75/2024 — Foreign Exchange Fees Summary', regulator: 'NBE', date: '15 Mar 2026', category: 'FX Policy' },
  { title: 'ECMA Licensing Requirements for Investment Banks — Updated',     regulator: 'ECMA', date: '02 Mar 2026', category: 'Capital Markets' },
  { title: 'NBE Minimum Savings Rate Directive — Q1 2026 Update',           regulator: 'NBE', date: '18 Feb 2026', category: 'Deposit Rates' },
]

const ArrowRight = ({ size = 13 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)

const PILLAR = '#0891b2'

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ══════════════════════════════ HERO ══════════════════════════════════════ */}
      <section className="relative bg-white overflow-hidden border-b border-slate-100">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 900px 500px at 55% -80px, rgba(8,145,178,0.04) 0%, transparent 65%)' }}
        />
        <div className="relative max-w-6xl mx-auto px-8 pt-20 pb-12">
          <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: PILLAR }}>Intelligence</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            <div>
              <h1
                className="font-serif font-bold mb-5 text-slate-950"
                style={{ fontSize: 'clamp(38px, 4.5vw, 56px)', letterSpacing: '-1.8px', lineHeight: 1.08 }}
              >
                Ethiopian finance,<br />
                <span style={{ color: PILLAR }}>explained clearly.</span>
              </h1>
              <p className="text-slate-600 mb-8" style={{ fontSize: '16px', lineHeight: '1.8', maxWidth: '440px' }}>
                500+ guides covering banking, insurance, capital markets, commodities
                and regulations — written in plain language for every level of financial knowledge.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/ai-assistant"
                  className="font-bold rounded-full transition-all"
                  style={{ fontSize: 15, padding: '14px 32px', minWidth: 200, textAlign: 'center', background: PILLAR, color: '#fff', boxShadow: '0 4px 20px rgba(8,145,178,0.25)' }}
                >
                  Ask the AI assistant
                </Link>
                <Link
                  href="/regulations"
                  className="font-bold rounded-full transition-all"
                  style={{ fontSize: 15, padding: '14px 32px', minWidth: 200, textAlign: 'center', border: `2px solid ${PILLAR}`, color: PILLAR, background: 'transparent' }}
                >
                  Regulations tracker
                </Link>
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: '500+', label: 'Guides published',   sub: 'All 5 pillars' },
                { value: 'AI',   label: 'Assistant',          sub: 'Ethiopian finance specialist' },
                { value: 'Free', label: 'Always',             sub: 'No paywall ever' },
              ].map((s) => (
                <div key={s.label} className="bg-white rounded-2xl border border-slate-200 text-center" style={{ padding: '20px 12px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                  <p className="font-mono font-black mb-1" style={{ fontSize: '20px', letterSpacing: '-1px', color: PILLAR }}>{s.value}</p>
                  <p className="font-semibold text-slate-700 mb-0.5" style={{ fontSize: '11px' }}>{s.label}</p>
                  <p className="text-slate-400" style={{ fontSize: '10px' }}>{s.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ GUIDE CATEGORIES ═════════════════════════ */}
      <section className="border-b border-slate-100" style={{ background: '#f8faf8', padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Browse by topic</p>
            <h2 className="font-serif font-bold text-slate-950" style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', letterSpacing: '-1.2px', lineHeight: 1.1 }}>
              Every corner of Ethiopian finance, covered.
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.label}
                href={cat.href}
                className="group bg-white rounded-2xl border border-slate-200 hover:shadow-lg transition-all duration-200 text-center overflow-hidden"
                style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
              >
                <div style={{ height: 3, background: cat.color }} />
                <div style={{ padding: '24px 16px' }}>
                  <div className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center" style={{ background: cat.bg }}>
                    <p className="font-mono font-black" style={{ fontSize: '16px', color: cat.color }}>{cat.count}</p>
                  </div>
                  <p className="font-bold text-slate-800 mb-1" style={{ fontSize: '13px' }}>{cat.label}</p>
                  <div className="flex items-center justify-center gap-1 text-xs font-bold group-hover:gap-2 transition-all" style={{ color: '#1A5C38' }}>
                    <span>Browse</span><ArrowRight size={10} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ FEATURED GUIDES ══════════════════════════ */}
      <section className="border-b border-slate-100 bg-white" style={{ padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Featured guides</p>
              <h2 className="font-serif font-bold text-slate-950" style={{ fontSize: 'clamp(24px, 3vw, 34px)', letterSpacing: '-1px', lineHeight: 1.15 }}>
                Most read this week
              </h2>
            </div>
            <Link href="/guides" className="inline-flex items-center gap-2 text-sm font-bold shrink-0" style={{ color: '#1A5C38' }}>
              All 500+ guides <ArrowRight />
            </Link>
          </div>

          {/* Top featured guide — large */}
          <div className="mb-6">
            <Link
              href={`/guides/${FEATURED_GUIDES[0].slug}`}
              className="group block bg-white rounded-2xl border border-slate-200 hover:shadow-xl transition-all duration-200 overflow-hidden"
              style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
            >
              <div style={{ height: 4, background: FEATURED_GUIDES[0].pillarColor }} />
              <div className="grid grid-cols-1 lg:grid-cols-3" style={{ padding: '36px 36px' }}>
                <div className="lg:col-span-2 pr-0 lg:pr-12">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-bold rounded-full px-3 py-1" style={{ background: '#e6f4ed', color: '#1A5C38' }}>
                      {FEATURED_GUIDES[0].pillar}
                    </span>
                    <span className="text-xs text-slate-400">{FEATURED_GUIDES[0].readTime}</span>
                    <span className="text-xs text-slate-400">{FEATURED_GUIDES[0].published}</span>
                  </div>
                  <h3 className="font-serif font-bold text-slate-950 mb-4 group-hover:text-green-800 transition-colors"
                    style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', letterSpacing: '-0.8px', lineHeight: 1.2 }}>
                    {FEATURED_GUIDES[0].title}
                  </h3>
                  <p className="text-slate-500 mb-6" style={{ fontSize: '15px', lineHeight: 1.8 }}>{FEATURED_GUIDES[0].excerpt}</p>
                  <div className="inline-flex items-center gap-2 text-sm font-bold group-hover:gap-3 transition-all" style={{ color: '#1A5C38' }}>
                    <span>Read guide</span><ArrowRight size={13} />
                  </div>
                </div>
                <div className="hidden lg:flex items-center justify-center" style={{ background: '#f8faf8', borderRadius: 16, padding: '32px' }}>
                  <div className="text-center">
                    <p className="font-mono font-black mb-1" style={{ fontSize: '48px', color: '#1A5C38', letterSpacing: '-2px', lineHeight: 1 }}>9.50%</p>
                    <p className="text-sm font-bold text-slate-600">Best rate today</p>
                    <p className="text-xs text-slate-400 mt-1">Awash Bank · 12M fixed</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Remaining guides grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURED_GUIDES.slice(1).map((g) => (
              <Link
                key={g.slug}
                href={`/guides/${g.slug}`}
                className="group bg-white rounded-2xl border border-slate-200 hover:shadow-xl transition-all duration-200 overflow-hidden flex flex-col"
                style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
              >
                <div style={{ height: 3, background: g.pillarColor }} />
                <div className="flex flex-col flex-1" style={{ padding: '28px 24px' }}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold rounded-full px-2 py-0.5" style={{ background: '#f1f5f9', color: '#475569' }}>
                      {g.pillar}
                    </span>
                    <span className="text-xs text-slate-400">{g.readTime}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-3 flex-1 group-hover:text-green-800 transition-colors leading-snug" style={{ fontSize: '15px' }}>
                    {g.title}
                  </h3>
                  <p className="text-slate-500 text-xs mb-4 leading-relaxed line-clamp-3">{g.excerpt}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <span className="text-xs text-slate-400">{g.published}</span>
                    <div className="flex items-center gap-1 text-xs font-bold group-hover:gap-2 transition-all" style={{ color: '#1A5C38' }}>
                      <span>Read</span><ArrowRight size={11} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ AI ASSISTANT CTA ═════════════════════════ */}
      <section className="border-b border-slate-100" style={{ background: '#f8faf8', padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="rounded-2xl overflow-hidden border border-cyan-100" style={{ boxShadow: '0 4px 24px rgba(8,145,178,0.08)' }}>
            <div style={{ height: 4, background: `linear-gradient(90deg, ${PILLAR}, #22d3ee)` }} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div style={{ padding: '48px 40px' }}>
                <span className="text-xs font-black uppercase tracking-widest rounded-full px-3 py-1.5 inline-block mb-5"
                  style={{ background: '#ecfeff', color: PILLAR }}>
                  AI-powered
                </span>
                <h2 className="font-serif font-bold text-slate-950 mb-4"
                  style={{ fontSize: 'clamp(24px, 3vw, 34px)', letterSpacing: '-1px', lineHeight: 1.15 }}>
                  Ask anything about<br />Ethiopian finance.
                </h2>
                <p className="text-slate-600 mb-6" style={{ fontSize: '15px', lineHeight: 1.8 }}>
                  The BirrBank AI assistant is trained on Ethiopian banking regulations,
                  NBE directives, ESX market data and ECX commodity prices.
                  Ask it anything — in English or Amharic.
                </p>
                <Link
                  href="/ai-assistant"
                  className="inline-flex items-center gap-2 font-bold rounded-full transition-all"
                  style={{ fontSize: 15, padding: '14px 28px', background: PILLAR, color: '#fff', boxShadow: '0 4px 16px rgba(8,145,178,0.25)' }}
                >
                  Open AI assistant <ArrowRight size={14} />
                </Link>
              </div>
              <div className="hidden lg:block" style={{ background: '#ecfeff', padding: '48px 40px' }}>
                <div className="space-y-3">
                  {[
                    '"Which bank has the best 12-month fixed deposit rate?"',
                    '"How do I open an ESX brokerage account from the UK?"',
                    '"What does the NBE directive on FX fees mean for me?"',
                    '"Compare TeleBirr vs HelloCash for small businesses."',
                  ].map((q) => (
                    <div key={q} className="bg-white rounded-xl border border-cyan-100 text-sm text-slate-600 font-medium"
                      style={{ padding: '12px 16px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                      {q}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ RECENT REGULATIONS ═══════════════════════ */}
      <section className="border-b border-slate-100 bg-white" style={{ padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Regulations tracker</p>
              <h2 className="font-serif font-bold text-slate-950" style={{ fontSize: 'clamp(22px, 2.8vw, 32px)', letterSpacing: '-1px', lineHeight: 1.15 }}>
                Recent NBE and ECMA directives
              </h2>
            </div>
            <Link href="/regulations" className="inline-flex items-center gap-2 text-sm font-bold shrink-0" style={{ color: '#1A5C38' }}>
              Full regulations library <ArrowRight />
            </Link>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-200" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
            <div style={{ height: 4, background: 'linear-gradient(90deg, #dc2626, #f87171)' }} />
            {RECENT_REGULATIONS.map((reg, i) => (
              <Link
                key={reg.title}
                href="/regulations"
                className="flex items-center justify-between gap-4 border-b border-slate-100 bg-white hover:bg-slate-50 transition-colors"
                style={{ padding: '18px 24px' }}
              >
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <span className="text-xs font-black rounded-full px-2 py-1 shrink-0 mt-0.5"
                    style={{ background: reg.regulator === 'NBE' ? '#e6f4ed' : '#f5f3ff', color: reg.regulator === 'NBE' ? '#1A5C38' : '#7c3aed' }}>
                    {reg.regulator}
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-800 text-sm leading-snug truncate">{reg.title}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-slate-400">{reg.date}</span>
                      <span className="text-xs font-medium rounded-md px-2 py-0.5" style={{ background: '#fef2f2', color: '#dc2626' }}>{reg.category}</span>
                    </div>
                  </div>
                </div>
                <ArrowRight size={13} />
              </Link>
            ))}
            <div className="flex items-center justify-between bg-slate-50 border-t border-slate-200" style={{ padding: '14px 24px' }}>
              <p className="text-xs text-slate-400">Sources: NBE (nbe.gov.et) · ECMA (ecma.gov.et) · ECX (ecx.com.et)</p>
              <Link href="/regulations" className="text-xs font-bold hover:underline shrink-0" style={{ color: '#1A5C38' }}>
                All directives →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ DARK TRUST ════════════════════════════════ */}
      <section className="border-b border-slate-100" style={{ background: '#0a1f14', padding: '72px 32px' }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: '#4ade80' }}>Editorial standard</p>
            <h3 className="font-serif font-bold mb-2" style={{ fontSize: 'clamp(22px, 2.5vw, 30px)', color: '#ffffff', letterSpacing: '-0.8px' }}>
              Every guide is written from official sources.
            </h3>
            <p style={{ color: '#6b9e7e', fontSize: '15px', lineHeight: 1.75, maxWidth: 520 }}>
              BirrBank guides cite NBE directives, ECMA filings and official institution
              data — not opinion or speculation. Every claim is traceable to a primary source.
            </p>
          </div>
          <Link
            href="/ai-assistant"
            className="font-bold rounded-full transition-all shrink-0"
            style={{ fontSize: 14, padding: '14px 28px', background: '#1A5C38', color: '#fff', whiteSpace: 'nowrap', boxShadow: '0 4px 20px rgba(26,92,56,0.3)' }}
          >
            Try the AI assistant →
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════ EMAIL CAPTURE ════════════════════════════ */}
      <section className="bg-white" style={{ padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Weekly intelligence</p>
            <h2 className="font-serif font-bold text-slate-950 mb-5" style={{ fontSize: 'clamp(30px, 3.5vw, 42px)', letterSpacing: '-1.5px', lineHeight: 1.1 }}>
              The sharpest Ethiopian<br />
              <span style={{ color: '#1A5C38' }}>finance digest, weekly.</span>
            </h2>
            <p className="text-slate-500 mb-8" style={{ fontSize: '15px', lineHeight: 1.85 }}>
              New guides, regulation updates and market intelligence —
              distilled into one clean weekly email.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'New guides across all 5 pillars every week',
                'Regulation alerts when NBE or ECMA publish new directives',
                'AI assistant updates and new capabilities',
                'Curated market intelligence for investors and businesses',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-slate-600">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A5C38" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-xs text-slate-500 font-medium pt-5 border-t border-slate-100">
              Free forever · No credit card · Unsubscribe anytime
            </p>
          </div>
          <EmailCapture />
        </div>
      </section>

    </div>
  )
}
