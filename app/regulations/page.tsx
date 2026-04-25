import Link from 'next/link'
import EmailCapture from '@/components/EmailCapture'
export const dynamic = 'force-dynamic'

// ─── Placeholder data — replace with Supabase queries in Phase 2 ─────────────

const REGULATIONS = [
  { code: 'NBE/BPR/001/2024', title: 'Minimum Capital Requirements for Commercial Banks', issuer: 'NBE', category: 'Banking', date: '15 Jan 2024', status: 'Active', summary: 'Sets the minimum paid-up capital requirement for commercial banks at ETB 5 billion, with a phased compliance timeline ending December 2026.' },
  { code: 'NBE/BPR/002/2024', title: 'Interest Rate Corridor Framework', issuer: 'NBE', category: 'Banking', date: '01 Mar 2024', status: 'Active', summary: 'Establishes the NBE policy rate corridor, setting the floor for savings deposit rates and the ceiling for lending rates across all commercial banks.' },
  { code: 'NBE/FXD/001/2024', title: 'Foreign Exchange Retention Rules for Exporters', issuer: 'NBE', category: 'FX & Trade', date: '29 Jul 2024', status: 'Active', summary: 'Requires exporters to retain 50% of foreign currency earnings in Ethiopia for a minimum of 28 days before conversion, replacing the previous 100% surrender requirement.' },
  { code: 'ECMA/DIR/001/2025', title: 'ESX Trading Rules and Membership Requirements', issuer: 'ECMA', category: 'Capital Markets', date: '10 Jan 2025', status: 'Active', summary: 'Defines the rules for trading on the Ethiopian Securities Exchange, membership categories, broker licensing requirements and investor eligibility criteria.' },
  { code: 'ECMA/DIR/002/2025', title: 'IPO Prospectus Disclosure Requirements', issuer: 'ECMA', category: 'Capital Markets', date: '15 Feb 2025', status: 'Active', summary: 'Sets mandatory disclosure standards for companies filing IPO prospectuses with ECMA, including financial statement requirements, risk factor disclosures and management background.' },
  { code: 'NBE/INS/001/2024', title: 'Motor Insurance Minimum Premium Schedule', issuer: 'NBE', category: 'Insurance', date: '01 Apr 2024', status: 'Active', summary: 'Establishes minimum third-party motor insurance premiums by vehicle category. All NBE-licensed insurers must charge at or above the minimum schedule.' },
  { code: 'NBE/PAY/001/2024', title: 'Mobile Money Interoperability Directive', issuer: 'NBE', category: 'Payments', date: '20 Jun 2024', status: 'Active', summary: 'Requires all NBE-licensed mobile money operators to achieve technical interoperability, allowing transfers between TeleBirr, CBEBirr, Amole and other platforms.' },
  { code: 'NBE/MFI/001/2024', title: 'Microfinance Interest Rate Cap', issuer: 'NBE', category: 'Microfinance', date: '01 Jan 2024', status: 'Active', summary: 'Sets the maximum interest rate that NBE-licensed microfinance institutions may charge on loans at 18% per annum, replacing previous institution-specific rate schedules.' },
  { code: 'ECMA/DIR/003/2025', title: 'Diaspora Investor Participation in ESX', issuer: 'ECMA', category: 'Capital Markets', date: '01 Mar 2025', status: 'Active', summary: 'Clarifies the eligibility, account opening process and repatriation rights for Ethiopian diaspora investors participating in the ESX and T-bill market.' },
  { code: 'NBE/BPR/003/2025', title: 'Digital Banking Licensing Framework', issuer: 'NBE', category: 'Banking', date: '15 Apr 2025', status: 'Active', summary: 'Introduces a new licensing category for digital-only banks in Ethiopia, setting capital, technology and governance requirements for applicants.' },
  { code: 'NBE/FXD/002/2025', title: 'NBE Foreign Exchange Market Reform', issuer: 'NBE', category: 'FX & Trade', date: '29 Jul 2025', status: 'Active', summary: 'Introduces a managed float exchange rate regime replacing the previous crawling peg. Commercial banks may now set buying and selling rates within a band around the NBE reference rate.' },
  { code: 'ECX/GRD/001/2025', title: 'Updated Coffee Grading Standards', issuer: 'ECX', category: 'Commodities', date: '01 Sep 2025', status: 'Active', summary: 'Revises coffee grading criteria including moisture content limits, defect counts and cup quality scores for all washed and natural process grade categories.' },
]

const CATEGORIES = ['All', 'Banking', 'Capital Markets', 'FX & Trade', 'Insurance', 'Payments', 'Microfinance', 'Commodities']
const ISSUERS = ['All issuers', 'NBE', 'ECMA', 'ECX']

const ArrowRight = ({ size = 13 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)

const ClockIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
)

const CATEGORY_COLORS: Record<string, { bg: string; color: string }> = {
  'Banking':        { bg: '#dbeafe', color: '#1D4ED8' },
  'Capital Markets': { bg: '#ede9fe', color: '#6d28d9' },
  'FX & Trade':     { bg: '#fef3c7', color: '#92400e' },
  'Insurance':      { bg: '#fee2e2', color: '#991b1b' },
  'Payments':       { bg: '#dcfce7', color: '#166534' },
  'Microfinance':   { bg: '#fce7f3', color: '#9d174d' },
  'Commodities':    { bg: '#ffedd5', color: '#9a3412' },
}

const PILLAR = '#1D4ED8'

export default function RegulationsPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ══════════════════════════════ HERO ══════════════════════════════════════ */}
      <section className="relative bg-white overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 900px 500px at 55% -80px, rgba(29,78,216,0.04) 0%, transparent 65%)' }} />
        <div className="relative max-w-6xl mx-auto px-8 pt-20 pb-14">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-6">
            <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
            <span>›</span>
            <span style={{ color: PILLAR, fontWeight: 700 }}>Regulations</span>
          </div>
          <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: PILLAR }}>Intelligence · Regulations</p>
          <h1 className="font-serif font-bold mb-5 text-slate-950" style={{ fontSize: 'clamp(36px, 4.5vw, 54px)', letterSpacing: '-1.8px', lineHeight: 1.08 }}>
            NBE and ECMA directives —<br />
            <span style={{ color: PILLAR }}>every regulation tracked.</span>
          </h1>
          <p className="text-slate-600 mb-8" style={{ fontSize: '16px', lineHeight: '1.8', maxWidth: '520px' }}>
            Every directive, circular and proclamation from the National Bank of Ethiopia,
            Ethiopian Capital Markets Authority and Ethiopian Commodity Exchange —
            summarised and searchable in plain English.
          </p>
          <div className="flex flex-wrap gap-6">
            {[
              { icon: <ClockIcon />, label: 'NBE, ECMA and ECX directives' },
              { icon: <ClockIcon />, label: 'Plain-English summaries' },
              { icon: <ClockIcon />, label: 'All financial sectors covered' },
              { icon: <ClockIcon />, label: 'Updated on every new issuance' },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <span style={{ color: PILLAR }}>{s.icon}</span>
                <span className="text-xs font-semibold text-slate-500">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ REGULATIONS TABLE ═════════════════════════ */}
      <section className="bg-white" style={{ padding: '64px 32px 80px' }}>
        <div className="max-w-6xl mx-auto">

          {/* Filters */}
          <div className="flex flex-col gap-4 mb-8">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Filter by category</p>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((c, i) => (
                  <button key={c} className="rounded-full text-xs font-bold transition-all"
                    style={{ padding: '6px 14px', background: i === 0 ? PILLAR : '#f1f5f9', color: i === 0 ? '#fff' : '#64748b', border: i === 0 ? 'none' : '1px solid #e2e8f0' }}>
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {ISSUERS.map((s, i) => (
                  <button key={s} className="rounded-full text-xs font-bold transition-all"
                    style={{ padding: '5px 12px', background: i === 0 ? '#0f172a' : '#f1f5f9', color: i === 0 ? '#fff' : '#64748b', border: i === 0 ? 'none' : '1px solid #e2e8f0' }}>
                    {s}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <ClockIcon />
                <span>Showing {REGULATIONS.length} directives · Most recent first</span>
              </div>
            </div>
          </div>

          {/* Cards */}
          <div className="space-y-4">
            {REGULATIONS.map((reg) => {
              const catStyle = CATEGORY_COLORS[reg.category] ?? { bg: '#f1f5f9', color: '#475569' }
              return (
                <div key={reg.code} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-md transition-all" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                  <div style={{ height: 3, background: PILLAR }} />
                  <div style={{ padding: '24px 28px' }}>
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3 flex-wrap">
                        <code className="text-xs font-mono font-bold rounded-lg px-2 py-1" style={{ background: '#f1f5f9', color: '#475569' }}>{reg.code}</code>
                        <span className="text-xs font-bold rounded-full px-2 py-0.5" style={{ background: catStyle.bg, color: catStyle.color }}>{reg.category}</span>
                        <span className="text-xs font-bold rounded-full px-2 py-0.5" style={{ background: '#dcfce7', color: '#166534' }}>{reg.status}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs font-bold rounded-full px-2 py-0.5" style={{ background: '#EFF6FF', color: PILLAR }}>{reg.issuer}</span>
                        <div className="flex items-center gap-1 text-xs text-slate-400">
                          <ClockIcon />
                          <span>{reg.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="font-bold text-slate-900 mb-2" style={{ fontSize: '15px' }}>{reg.title}</p>
                    <p className="text-sm text-slate-500" style={{ lineHeight: 1.8 }}>{reg.summary}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <p className="text-xs text-slate-400 mt-8 text-center leading-relaxed">
            Summaries are for reference only. Always read the full directive from the official issuer before making compliance or investment decisions.
            BirrBank is not a legal adviser.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════ ISSUER GUIDE ═════════════════════════════ */}
      <section className="border-b border-slate-100" style={{ background: '#f9fafb', padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Regulatory bodies</p>
            <h2 className="font-serif font-bold text-slate-950" style={{ fontSize: 'clamp(26px, 3vw, 36px)', letterSpacing: '-1.2px', lineHeight: 1.15 }}>
              Who regulates Ethiopian finance.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { issuer: 'NBE', full: 'National Bank of Ethiopia', url: 'nbe.gov.et', desc: 'The central bank and primary financial regulator. Licenses and supervises commercial banks, insurance companies, microfinance institutions and payment operators. Issues all banking, insurance and forex directives.', coverage: 'Banks, Insurance, MFIs, Payments, FX' },
              { issuer: 'ECMA', full: 'Ethiopian Capital Markets Authority', url: 'ecma.gov.et', desc: 'Established in 2021 to regulate the Ethiopian capital markets. Oversees the ESX securities exchange, licenses brokers and investment advisers, and reviews all IPO prospectuses before listing approval.', coverage: 'ESX equities, Bonds, IPOs, Brokers' },
              { issuer: 'ECX', full: 'Ethiopian Commodity Exchange', url: 'ecx.com.et', desc: 'Operates the official commodity exchange for agricultural products. Sets grading standards, trading rules and membership requirements. All coffee, sesame and grain exports must trade through ECX.', coverage: 'Coffee, Sesame, Grains, Beans' },
            ].map((r) => (
              <div key={r.issuer} className="bg-white rounded-2xl border border-slate-200 overflow-hidden" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                <div style={{ height: 3, background: PILLAR }} />
                <div style={{ padding: '28px 24px' }}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono font-black text-lg rounded-lg px-3 py-1" style={{ background: '#EFF6FF', color: PILLAR }}>{r.issuer}</span>
                    <div>
                      <p className="font-bold text-slate-900" style={{ fontSize: '14px' }}>{r.full}</p>
                      <p className="text-xs text-slate-400">{r.url}</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 mb-4" style={{ lineHeight: 1.75 }}>{r.desc}</p>
                  <div className="pt-3 border-t border-slate-100">
                    <p className="text-xs text-slate-400 mb-1">Covers</p>
                    <p className="text-xs font-semibold text-slate-600">{r.coverage}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ DARK TRUST ════════════════════════════════ */}
      <section className="border-b border-slate-100" style={{ background: '#0f172a', padding: '72px 32px' }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: '#93c5fd' }}>Data integrity</p>
            <h3 className="font-serif font-bold mb-2" style={{ fontSize: 'clamp(22px, 2.5vw, 30px)', color: '#ffffff', letterSpacing: '-0.8px' }}>
              Sourced directly from NBE, ECMA and ECX.
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: 1.75, maxWidth: 480 }}>
              All directives are sourced from official regulator websites and gazette notices.
              BirrBank does not paraphrase unofficially — every summary is based on the
              published directive text. Always read the full original document.
            </p>
          </div>
          <div className="flex flex-col gap-3 shrink-0">
            {[
              { dot: '#22c55e', label: 'Official regulator sources',  sub: 'NBE, ECMA and ECX official publications' },
              { dot: PILLAR,    label: 'Updated on new issuances',    sub: 'Added within 7 days of publication' },
              { dot: '#94a3b8', label: 'Not legal advice',            sub: 'Always read the full directive text' },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-3 rounded-xl" style={{ background: '#1e293b', border: '1px solid #334155', padding: '14px 20px' }}>
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: s.dot }} />
                <div>
                  <span className="text-sm font-semibold" style={{ color: '#93c5fd' }}>{s.label}</span>
                  <p className="text-xs mt-0.5" style={{ color: '#64748b' }}>{s.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ EMAIL CAPTURE ════════════════════════════ */}
      <section className="bg-white" style={{ padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Regulatory alerts</p>
            <h2 className="font-serif font-bold text-slate-950 mb-5" style={{ fontSize: 'clamp(30px, 3.5vw, 42px)', letterSpacing: '-1.5px', lineHeight: 1.1 }}>
              New directives and regulation changes,<br />
              <span style={{ color: PILLAR }}>direct to your inbox.</span>
            </h2>
            <p className="text-slate-500 mb-8" style={{ fontSize: '15px', lineHeight: 1.85 }}>
              Get notified when NBE, ECMA or ECX publish a new directive that affects
              banking, capital markets, insurance or commodity trading in Ethiopia.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'New NBE banking and insurance directives',
                'ECMA capital markets rules and IPO policy updates',
                'ECX grading standard and trading rule changes',
                'NBE foreign exchange and remittance policy updates',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-slate-600">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
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
