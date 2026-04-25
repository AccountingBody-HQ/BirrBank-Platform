import Link from 'next/link'
import EmailCapture from '@/components/EmailCapture'
export const dynamic = 'force-dynamic'

const STEPS = [
  { step: '01', title: 'Get an NBE-verified National ID', body: 'You need a valid Ethiopian National ID or passport to open a brokerage account. Foreign nationals in the diaspora can use their passport. Make sure your name matches exactly across all documents.' },
  { step: '02', title: 'Open a Central Securities Depository (CSD) account', body: 'The CSD is the official registry of share ownership in Ethiopia. You must open a CSD account before you can hold any ESX-listed shares. This is done through a licensed broker or directly via the ESX portal at esx.et.' },
  { step: '03', title: 'Choose a licensed broker', body: 'Only ECMA-licensed brokers can execute trades on the ESX. As of April 2026, licensed brokers include CBE Capital, Wegagen Capital and a small number of others. Check ecma.gov.et for the current full list.' },
  { step: '04', title: 'Fund your brokerage account', body: 'Transfer funds from your Ethiopian bank account to your brokerage account. Diaspora investors can fund via international wire transfer to a designated correspondent bank account. Minimum amounts vary by broker.' },
  { step: '05', title: 'Place a buy order', body: 'Once funded, you can place a buy order through your broker platform or by contacting them directly. Specify the ticker, number of shares and the maximum price you are willing to pay. Orders are matched on the ESX trading system.' },
  { step: '06', title: 'Monitor your portfolio', body: 'After purchase, your shares are held in your CSD account. You can track prices on BirrBank or directly on esx.et. Dividends are paid directly to your registered bank account when declared by the company.' },
]

const FAQS = [
  { q: 'Can diaspora Ethiopians buy ESX shares?', a: 'Yes. Diaspora investors with Ethiopian nationality can open a CSD account and buy shares through a licensed broker. You will need a valid Ethiopian passport and a foreign currency account at an authorised bank to fund your account.' },
  { q: 'What is the minimum amount to invest?', a: 'There is no official minimum share purchase on the ESX, but brokers typically set their own minimums — often ETB 5,000 to ETB 10,000. For T-bills, the NBE minimum is ETB 1,000 for short tenors.' },
  { q: 'Are there taxes on share gains in Ethiopia?', a: 'Dividend income is subject to a 10% withholding tax in Ethiopia. Capital gains tax rules for ESX-listed shares are still being developed by the Ethiopian Revenue and Customs Authority. Consult a licensed tax adviser for your specific situation.' },
  { q: 'How liquid is the ESX?', a: 'As of April 2026, only 3 companies are listed on the ESX and daily trading volumes are modest. You may not always be able to sell quickly at your desired price. The ESX is expected to become more liquid as the IPO pipeline converts to listings.' },
  { q: 'What is the difference between an IPO and buying on the ESX?', a: 'An IPO is when shares are offered to the public for the first time at a fixed price. After listing, shares trade on the ESX at market prices set by supply and demand. IPO allocations are often oversubscribed — you may receive fewer shares than you applied for.' },
]

const CONCEPTS = [
  { term: 'ESX',           def: 'Ethiopian Securities Exchange — the official stock exchange of Ethiopia, launched in January 2025. Regulated by ECMA.' },
  { term: 'ECMA',          def: 'Ethiopian Capital Markets Authority — the regulatory body overseeing the ESX, brokers, and IPO prospectuses. Equivalent to the SEC in the US.' },
  { term: 'CSD',           def: 'Central Securities Depository — the official registry that records who owns which shares. You must have a CSD account to hold ESX shares.' },
  { term: 'IPO',           def: 'Initial Public Offering — when a company offers shares to the public for the first time. The price is fixed during the IPO; after listing it floats freely.' },
  { term: 'P/E ratio',     def: 'Price-to-Earnings ratio — share price divided by annual earnings per share. A lower P/E can indicate a cheaper stock relative to its earnings power.' },
  { term: 'Dividend yield', def: 'Annual dividend per share divided by share price, expressed as a percentage. Tells you how much income you receive per ETB invested.' },
]

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

const PILLAR = '#1D4ED8'

export default function HowToInvestPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ══════════════════════════════ HERO ══════════════════════════════════════ */}
      <section className="relative bg-white overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 900px 500px at 55% -80px, rgba(29,78,216,0.04) 0%, transparent 65%)' }} />
        <div className="relative max-w-6xl mx-auto px-8 pt-20 pb-14">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-6">
            <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
            <span>›</span>
            <Link href="/markets" className="hover:text-slate-600 transition-colors">Markets</Link>
            <span>›</span>
            <span style={{ color: PILLAR, fontWeight: 700 }}>How to Invest</span>
          </div>
          <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: PILLAR }}>Markets · Beginner guide</p>
          <h1 className="font-serif font-bold mb-5 text-slate-950" style={{ fontSize: 'clamp(36px, 4.5vw, 54px)', letterSpacing: '-1.8px', lineHeight: 1.08 }}>
            How to invest in Ethiopian<br />
            <span style={{ color: PILLAR }}>stocks — a plain-language guide.</span>
          </h1>
          <p className="text-slate-600 mb-8" style={{ fontSize: '16px', lineHeight: '1.8', maxWidth: '520px' }}>
            The Ethiopian Securities Exchange opened in 2024. Here is exactly how to open
            an account, choose a broker and buy your first ESX-listed shares — step by step.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/markets/equities" className="font-bold rounded-full transition-all" style={{ fontSize: 15, padding: '14px 32px', minWidth: 200, textAlign: 'center', background: PILLAR, color: '#fff', boxShadow: '0 4px 20px rgba(29,78,216,0.20)' }}>
              View listed equities
            </Link>
            <Link href="/markets/ipo-pipeline" className="font-bold rounded-full transition-all" style={{ fontSize: 15, padding: '14px 32px', minWidth: 200, textAlign: 'center', border: '2px solid #1D4ED8', color: PILLAR, background: 'transparent' }}>
              IPO pipeline
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ STEPS ════════════════════════════════════ */}
      <section className="bg-white" style={{ padding: '80px 32px 96px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Step by step</p>
            <h2 className="font-serif font-bold text-slate-950" style={{ fontSize: 'clamp(26px, 3vw, 36px)', letterSpacing: '-1.2px', lineHeight: 1.15 }}>
              6 steps to your first ESX investment.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {STEPS.map((s) => (
              <div key={s.step} className="bg-white rounded-2xl border border-slate-200 overflow-hidden" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                <div style={{ height: 3, background: PILLAR }} />
                <div style={{ padding: '28px 24px' }}>
                  <p className="font-mono font-black mb-3" style={{ fontSize: '36px', color: '#e2e8f0', lineHeight: 1 }}>{s.step}</p>
                  <p className="font-bold text-slate-900 mb-3" style={{ fontSize: '15px' }}>{s.title}</p>
                  <p className="text-sm text-slate-500" style={{ lineHeight: 1.75 }}>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ KEY CONCEPTS ══════════════════════════════ */}
      <section className="border-b border-slate-100" style={{ background: '#f9fafb', padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Key concepts</p>
            <h2 className="font-serif font-bold text-slate-950" style={{ fontSize: 'clamp(26px, 3vw, 36px)', letterSpacing: '-1.2px', lineHeight: 1.15 }}>
              Terms every new ESX investor should know.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {CONCEPTS.map((c) => (
              <div key={c.term} className="bg-white rounded-2xl border border-slate-200 overflow-hidden" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                <div style={{ height: 3, background: PILLAR }} />
                <div style={{ padding: '24px' }}>
                  <p className="font-mono font-black mb-2" style={{ fontSize: '18px', color: PILLAR }}>{c.term}</p>
                  <p className="text-sm text-slate-500" style={{ lineHeight: 1.75 }}>{c.def}</p>
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
              Common questions from new investors.
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
            <Link href="/guides" className="inline-flex items-center gap-2 text-sm font-bold" style={{ color: PILLAR }}>
              Read all investing guides <ArrowRight />
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
              BirrBank is a guide, not a broker.
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: 1.75, maxWidth: 480 }}>
              This guide is for information only. BirrBank is not licensed to give investment
              advice, execute trades, or manage portfolios. Always use an ECMA-licensed broker
              and consult a qualified financial adviser before investing.
            </p>
          </div>
          <div className="flex flex-col gap-3 shrink-0">
            {[
              { dot: '#22c55e', label: 'ECMA-verified brokers only',  sub: 'We only reference licensed intermediaries' },
              { dot: PILLAR,    label: 'Official sources',             sub: 'ESX, ECMA and NBE data only' },
              { dot: '#94a3b8', label: 'No investment advice',        sub: 'Information and comparison only' },
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
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Investor updates</p>
            <h2 className="font-serif font-bold text-slate-950 mb-5" style={{ fontSize: 'clamp(30px, 3.5vw, 42px)', letterSpacing: '-1.5px', lineHeight: 1.1 }}>
              New IPOs and ESX updates,<br />
              <span style={{ color: PILLAR }}>straight to your inbox.</span>
            </h2>
            <p className="text-slate-500 mb-8" style={{ fontSize: '15px', lineHeight: 1.85 }}>
              Weekly digest for retail investors. Know when IPO windows open,
              when new companies list, and when broker access changes.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'New IPO announcements and subscription dates',
                'ESX weekly price and volume summary',
                'New broker licences and platform updates',
                'NBE and ECMA regulatory changes for investors',
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
