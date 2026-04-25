import Link from 'next/link'
import EmailCapture from '@/components/EmailCapture'
export const dynamic = 'force-dynamic'

const INVESTMENT_OPTIONS = [
  {
    title: 'ESX Listed Equities',
    href: '/markets/equities',
    risk: 'Medium-High',
    minInvest: 'ETB 5,000',
    returns: 'Market-driven',
    liquidity: 'Daily trading',
    desc: 'Buy shares in Wegagen Bank, Gadaa Bank, Ethiopian Insurance Corporation and future listings on the Ethiopian Securities Exchange. Diaspora with Ethiopian nationality can open a CSD account and trade.',
    badge: 'Available now',
  },
  {
    title: 'IPO Subscriptions',
    href: '/markets/ipo-pipeline',
    risk: 'Medium-High',
    minInvest: 'Varies by IPO',
    returns: 'Listing price gain',
    liquidity: 'Post-listing only',
    desc: 'Subscribe to shares in upcoming IPOs including Awash Bank, Dashen Bank and Ethio Telecom before they list on the ESX. Apply through a licensed ECMA broker during the subscription window.',
    badge: '45+ in pipeline',
  },
  {
    title: 'NBE Treasury Bills',
    href: '/markets/bonds',
    risk: 'Low',
    minInvest: 'ETB 1,000',
    returns: 'Up to 9.15% p.a.',
    liquidity: 'Held to maturity',
    desc: 'Invest in Ethiopian government T-bills with tenors from 28 days to 364 days. Sovereign risk only — the lowest risk investment in Ethiopia. Purchase through a licensed broker or CBE branch.',
    badge: 'Lowest risk',
  },
  {
    title: 'Fixed Deposit Accounts',
    href: '/banking/savings-rates',
    risk: 'Very Low',
    minInvest: 'ETB 5,000',
    returns: 'Up to 9.50% p.a.',
    liquidity: 'Fixed term',
    desc: 'Open a fixed deposit account at an Ethiopian commercial bank. Requires a diaspora bank account — 12 Ethiopian banks now accept remote account opening for diaspora. Covered by NBE depositor protection.',
    badge: 'Best rate 9.50%',
  },
]

const STEPS = [
  { step: '01', title: 'Confirm your eligibility', body: 'Ethiopian nationals living abroad can invest in ESX-listed shares, T-bills and bank fixed deposits. Foreign nationals of non-Ethiopian origin face restrictions on certain instruments. Confirm your status with an ECMA-licensed broker.' },
  { step: '02', title: 'Open a CSD account for equities', body: 'To hold ESX shares, you need a Central Securities Depository (CSD) account. This can be opened remotely through some licensed brokers using your Ethiopian passport and foreign bank account details.' },
  { step: '03', title: 'Choose a licensed broker', body: 'Only ECMA-licensed brokers can execute ESX trades and T-bill applications on your behalf. As of April 2026, CBE Capital and Wegagen Capital are the primary licensed brokers. Check ecma.gov.et for the current full list.' },
  { step: '04', title: 'Fund your investment account', body: 'Transfer funds via international wire to your broker designated correspondent bank account in Ethiopia. Ensure you use the correct transfer reference and currency. Diaspora transfers are governed by NBE foreign currency regulations.' },
  { step: '05', title: 'Place your investment', body: 'Once funded, instruct your broker to purchase shares, subscribe to a T-bill auction or apply for an IPO allocation. Get confirmation in writing for every transaction.' },
  { step: '06', title: 'Monitor and repatriate returns', body: 'Dividends and T-bill returns are credited to your broker account or designated Ethiopian bank account. Repatriation of investment returns by diaspora investors is permitted under NBE regulations with proper documentation.' },
]

const FAQS = [
  { q: 'Can I invest in Ethiopia without visiting in person?', a: 'For most instruments yes — account opening, funding and trading can be done remotely. Some brokers require an in-person visit for CSD account opening. Check with your chosen broker before starting the process.' },
  { q: 'What taxes apply to diaspora investors?', a: 'Dividend income is subject to 10% withholding tax in Ethiopia. Capital gains tax rules for ESX shares are still being finalised. T-bill interest may be subject to withholding tax. Consult a licensed Ethiopian tax adviser for your specific situation.' },
  { q: 'Can I repatriate my investment returns?', a: 'Yes. NBE regulations permit diaspora investors to repatriate dividends and capital gains with proper documentation. Your broker will guide you through the NBE repatriation process. Keep all transaction records for tax purposes in your country of residence.' },
  { q: 'What is the minimum investment on the ESX?', a: 'There is no official minimum on the ESX but brokers typically require ETB 5,000 to 10,000 as a practical minimum for equity investments. T-bills start at ETB 1,000 and fixed deposits at ETB 5,000 at most banks.' },
]

const ArrowRight = ({ size = 13 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)

const PILLAR = '#1D4ED8'

const RISK_COLORS: Record<string, { bg: string; color: string }> = {
  'Very Low':    { bg: '#dcfce7', color: '#166534' },
  'Low':         { bg: '#dcfce7', color: '#166534' },
  'Medium-High': { bg: '#fef3c7', color: '#92400e' },
}

export default function DiasporaInvestPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ══════════════════════════════ HERO ══════════════════════════════════════ */}
      <section className="relative bg-white overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 900px 500px at 55% -80px, rgba(29,78,216,0.04) 0%, transparent 65%)' }} />
        <div className="relative max-w-6xl mx-auto px-8 pt-20 pb-14">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-6">
            <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
            <span>›</span>
            <Link href="/diaspora" className="hover:text-slate-600 transition-colors">Diaspora</Link>
            <span>›</span>
            <span style={{ color: PILLAR, fontWeight: 700 }}>Invest from Abroad</span>
          </div>
          <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: PILLAR }}>Diaspora · Investing</p>
          <h1 className="font-serif font-bold mb-5 text-slate-950" style={{ fontSize: 'clamp(36px, 4.5vw, 54px)', letterSpacing: '-1.8px', lineHeight: 1.08 }}>
            Invest in Ethiopia<br />
            <span style={{ color: PILLAR }}>from anywhere in the world.</span>
          </h1>
          <p className="text-slate-600 mb-8" style={{ fontSize: '16px', lineHeight: '1.8', maxWidth: '520px' }}>
            Ethiopian stocks, T-bills, IPOs and fixed deposits — all accessible to diaspora
            investors with Ethiopian nationality. Here is exactly how to get started.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/markets/equities" className="font-bold rounded-full transition-all"
              style={{ fontSize: 15, padding: '14px 32px', minWidth: 200, textAlign: 'center', background: PILLAR, color: '#fff', boxShadow: '0 4px 20px rgba(29,78,216,0.20)' }}>
              View ESX equities
            </Link>
            <Link href="/markets/ipo-pipeline" className="font-bold rounded-full transition-all"
              style={{ fontSize: 15, padding: '14px 32px', minWidth: 200, textAlign: 'center', border: '2px solid #1D4ED8', color: PILLAR, background: 'transparent' }}>
              IPO pipeline
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ INVESTMENT OPTIONS ════════════════════════ */}
      <section className="bg-white" style={{ padding: '80px 32px 96px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Investment options</p>
            <h2 className="font-serif font-bold text-slate-950" style={{ fontSize: 'clamp(26px, 3vw, 36px)', letterSpacing: '-1.2px', lineHeight: 1.15 }}>
              What diaspora investors can access.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {INVESTMENT_OPTIONS.map((opt) => (
              <Link key={opt.title} href={opt.href} className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                <div style={{ height: 3, background: PILLAR }} />
                <div style={{ padding: '28px 24px' }}>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <p className="font-bold text-slate-900" style={{ fontSize: '16px' }}>{opt.title}</p>
                    <span className="text-xs font-bold rounded-full px-2 py-0.5 shrink-0" style={{ background: '#dbeafe', color: PILLAR }}>{opt.badge}</span>
                  </div>
                  <p className="text-sm text-slate-500 mb-5" style={{ lineHeight: 1.75 }}>{opt.desc}</p>
                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100">
                    <div>
                      <p className="text-xs text-slate-400 mb-0.5">Risk level</p>
                      <span className="text-xs font-bold rounded-full px-2 py-0.5" style={RISK_COLORS[opt.risk] ?? { bg: '#f1f5f9', color: '#475569' }}>{opt.risk}</span>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 mb-0.5">Min. investment</p>
                      <p className="font-mono font-bold text-slate-800 text-sm">{opt.minInvest}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 mb-0.5">Expected returns</p>
                      <p className="font-bold text-slate-800 text-sm">{opt.returns}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 mb-0.5">Liquidity</p>
                      <p className="font-bold text-slate-800 text-sm">{opt.liquidity}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold mt-4 group-hover:gap-2 transition-all" style={{ color: PILLAR }}>
                    <span>Learn more</span><ArrowRight size={11} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ HOW TO START ═════════════════════════════ */}
      <section className="border-b border-slate-100" style={{ background: '#f9fafb', padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Step by step</p>
            <h2 className="font-serif font-bold text-slate-950" style={{ fontSize: 'clamp(26px, 3vw, 36px)', letterSpacing: '-1.2px', lineHeight: 1.15 }}>
              How to start investing in Ethiopia from abroad.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {STEPS.map((s) => (
              <div key={s.step} className="bg-white rounded-2xl border border-slate-200 overflow-hidden" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                <div style={{ height: 3, background: PILLAR }} />
                <div style={{ padding: '28px 24px' }}>
                  <p className="font-mono font-black mb-3" style={{ fontSize: '32px', color: '#e2e8f0', lineHeight: 1 }}>{s.step}</p>
                  <p className="font-bold text-slate-900 mb-3" style={{ fontSize: '15px' }}>{s.title}</p>
                  <p className="text-sm text-slate-500" style={{ lineHeight: 1.75 }}>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ FAQ ═══════════════════════════════════════ */}
      <section className="border-b border-slate-100 bg-white" style={{ padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">FAQ</p>
            <h2 className="font-serif font-bold text-slate-950" style={{ fontSize: 'clamp(26px, 3vw, 36px)', letterSpacing: '-1.2px', lineHeight: 1.15 }}>
              Common questions from diaspora investors.
            </h2>
          </div>
          <div className="space-y-4">
            {FAQS.map((faq) => (
              <div key={faq.q} className="bg-white rounded-2xl border border-slate-200 overflow-hidden" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                <div style={{ height: 3, background: PILLAR }} />
                <div style={{ padding: '24px 28px' }}>
                  <p className="font-bold text-slate-900 mb-3" style={{ fontSize: '15px' }}>{faq.q}</p>
                  <p className="text-sm text-slate-500" style={{ lineHeight: 1.8 }}>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/markets/how-to-invest" className="inline-flex items-center gap-2 text-sm font-bold" style={{ color: PILLAR }}>
              Full investing guide <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ DARK TRUST ════════════════════════════════ */}
      <section className="border-b border-slate-100" style={{ background: '#0f172a', padding: '72px 32px' }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: '#93c5fd' }}>Important</p>
            <h3 className="font-serif font-bold mb-2" style={{ fontSize: 'clamp(22px, 2.5vw, 30px)', color: '#ffffff', letterSpacing: '-0.8px' }}>
              Information only — not investment advice.
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: 1.75, maxWidth: 480 }}>
              This guide is for information only. BirrBank is not licensed to give investment
              advice, execute trades or manage portfolios. Always use an ECMA-licensed broker
              and consult a qualified financial adviser before investing.
            </p>
          </div>
          <div className="flex flex-col gap-3 shrink-0">
            {[
              { dot: '#22c55e', label: 'ECMA-verified brokers only',  sub: 'We only reference licensed intermediaries' },
              { dot: PILLAR,    label: 'Official sources',             sub: 'ESX, ECMA, NBE and official bank data' },
              { dot: '#94a3b8', label: 'Not investment advice',       sub: 'Always verify with a licensed adviser' },
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
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Diaspora investor updates</p>
            <h2 className="font-serif font-bold text-slate-950 mb-5" style={{ fontSize: 'clamp(30px, 3.5vw, 42px)', letterSpacing: '-1.5px', lineHeight: 1.1 }}>
              ESX and IPO updates,<br />
              <span style={{ color: PILLAR }}>direct to your inbox.</span>
            </h2>
            <p className="text-slate-500 mb-8" style={{ fontSize: '15px', lineHeight: 1.85 }}>
              Weekly digest for diaspora investors — ESX price movements, new IPO announcements,
              T-bill yields and NBE regulatory updates.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'ESX weekly price and volume summary',
                'New IPO prospectus filings and subscription dates',
                'T-bill auction results and yield changes',
                'NBE and ECMA regulatory updates for diaspora investors',
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
