'use client'
import { useState } from 'react'
import Link from 'next/link'
import EmailCapture from '@/components/EmailCapture'
export const dynamic = 'force-dynamic'

/* ─── Data ────────────────────────────────────────────────────────────────── */

const SAVINGS = [
  { rank: 1, bank: 'Awash Bank',          product: '12-month fixed',  rate: '9.50', badge: 'Best rate' },
  { rank: 2, bank: 'Zemen Bank',           product: '12-month fixed',  rate: '9.25', badge: null },
  { rank: 3, bank: 'Bank of Abyssinia',    product: '12-month fixed',  rate: '9.00', badge: null },
  { rank: 4, bank: 'Dashen Bank',          product: 'Savings account', rate: '8.75', badge: null },
  { rank: 5, bank: 'Oromia International', product: 'Savings account', rate: '8.50', badge: null },
]

const FX = [
  { pair: 'USD / ETB', rate: '156.40', change: '+0.32', up: true  },
  { pair: 'GBP / ETB', rate: '197.85', change: '+0.18', up: true  },
  { pair: 'EUR / ETB', rate: '169.82', change: '−0.14', up: false },
  { pair: 'SAR / ETB', rate: '41.71',  change: '+0.09', up: true  },
  { pair: 'AED / ETB', rate: '42.60',  change: '+0.11', up: true  },
]

const ESX = [
  { ticker: 'WGAGN', name: 'Wegagen Bank',  price: '28.50', change: '+1.24%', up: true  },
  { ticker: 'GDAAB', name: 'Goh Betoch',    price: '15.80', change: '+0.83%', up: true  },
  { ticker: 'CBEGN', name: 'CBE Shares',    price: '45.20', change: '−0.32%', up: false },
  { ticker: 'AWAGN', name: 'Awash Intl',    price: '22.75', change: '−0.12%', up: false },
  { ticker: 'ABYGN', name: 'Abyssinia Bk',  price: '32.10', change: '+0.52%', up: true  },
]

const PILLAR_CARDS = [
  { label: 'Insurance',    stat: '18 providers',   href: '/insurance',   desc: 'Motor · Life · Health · Property · Agricultural', icon: 'Insurance'    },
  { label: 'Markets',      stat: '45+ IPOs',        href: '/markets',     desc: 'ESX equities · IPO pipeline · T-bill yields',     icon: 'Markets'      },
  { label: 'Commodities',  stat: 'Live ECX prices', href: '/commodities', desc: 'Coffee · Sesame · Grains · Beans',                icon: 'Commodities'  },
  { label: 'Intelligence', stat: '500+ guides',     href: '/guides',      desc: 'Guides · Regulations · AI assistant · Diaspora',  icon: 'Intelligence' },
]

const LIVE_DATA = [
  { label: 'Best savings rate',    value: '9.50%',  sub: 'Awash Bank · 12-month',  trend: 'up'   },
  { label: 'USD / ETB',            value: '156.40', sub: 'CBE official · Today',    trend: 'up'   },
  { label: 'EUR / ETB',            value: '169.82', sub: 'CBE official · Today',    trend: 'down' },
  { label: 'Institutions tracked', value: '214',    sub: 'NBE-regulated',           trend: null   },
  { label: 'IPOs in pipeline',     value: '45+',    sub: 'ESX registered',          trend: null   },
]

/* ─── Icons ───────────────────────────────────────────────────────────────── */

const PILLAR_ICONS: Record<string, React.ReactNode> = {
  Banking:      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A5C38" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="3"/><line x1="2" y1="10" x2="22" y2="10"/></svg>,
  Insurance:    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A5C38" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Markets:      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A5C38" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  Commodities:  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A5C38" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22V12M12 12C12 6 7 4 7 4s5 2 5 8z"/><path d="M12 12C12 6 17 4 17 4s-5 2-5 8z"/><line x1="8" y1="22" x2="16" y2="22"/></svg>,
  Intelligence: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A5C38" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
}

const ArrowRight = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)

/* ─── Interactive hero card ────────────────────────────────────────────────── */

type Tab = 'Savings' | 'FX rates' | 'ESX'

function HeroCard() {
  const [tab, setTab] = useState<Tab>('Savings')

  return (
    <div
      className="bg-white rounded-2xl border border-slate-200 overflow-hidden"
      style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.09),0 4px 16px rgba(0,0,0,0.04)' }}
    >
      {/* Tab bar */}
      <div className="border-b border-slate-100 px-4 flex items-center justify-between">
        <div className="flex">
          {(['Savings', 'FX rates', 'ESX'] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="px-4 py-4 text-xs font-bold transition-all"
              style={{
                color:        tab === t ? '#1A5C38'   : '#94a3b8',
                borderBottom: tab === t ? '2px solid #1A5C38' : '2px solid transparent',
                background:   'transparent',
                cursor:       'pointer',
              }}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1.5 bg-green-50 border border-green-100 rounded-full px-3 py-1.5">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
          <span className="text-green-700 text-xs font-bold">Live</span>
        </div>
      </div>

      {/* ── Savings tab ── */}
      {tab === 'Savings' && (
        <div className="divide-y divide-slate-50">
          {SAVINGS.map((r) => (
            <div
              key={r.rank}
              className={`flex items-center gap-4 ${r.rank === 1 ? 'bg-green-50' : 'bg-white'}`}
              style={{ padding: '14px 20px' }}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black shrink-0 ${r.rank === 1 ? 'text-white' : 'bg-slate-100 text-slate-500'}`}
                style={r.rank === 1 ? { background: '#1A5C38' } : {}}
              >
                {r.rank === 1 ? (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                ) : r.rank}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`font-bold text-sm truncate ${r.rank === 1 ? 'text-green-900' : 'text-slate-800'}`}>{r.bank}</p>
                <p className={`text-xs mt-0.5 ${r.rank === 1 ? 'text-green-600 font-bold uppercase tracking-wide' : 'text-slate-400'}`}>{r.badge || r.product}</p>
              </div>
              <span className={`font-mono font-black ${r.rank === 1 ? 'text-green-700 text-2xl' : 'text-slate-900 text-xl'}`} style={{ letterSpacing: '-1px' }}>{r.rate}%</span>
            </div>
          ))}
        </div>
      )}

      {/* ── FX tab ── */}
      {tab === 'FX rates' && (
        <div className="divide-y divide-slate-50">
          {FX.map((f) => (
            <div key={f.pair} className="flex items-center gap-4 bg-white" style={{ padding: '14px 20px' }}>
              <div className="flex-1">
                <p className="font-bold text-sm text-slate-900">{f.pair}</p>
                <p className="text-xs text-slate-400 mt-0.5">CBE official rate</p>
              </div>
              <span className="font-mono font-black text-slate-900 text-xl" style={{ letterSpacing: '-0.5px' }}>{f.rate}</span>
              <span
                className="text-xs font-bold w-14 text-right"
                style={{ color: f.up ? '#16a34a' : '#dc2626' }}
              >
                {f.change}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* ── ESX tab ── */}
      {tab === 'ESX' && (
        <div className="divide-y divide-slate-50">
          {ESX.map((e) => (
            <div key={e.ticker} className="flex items-center gap-4 bg-white" style={{ padding: '14px 20px' }}>
              <div
                className="shrink-0 rounded-lg flex items-center justify-center bg-slate-100 text-slate-700"
                style={{ width: 36, height: 36, fontSize: '10px', fontWeight: 800, letterSpacing: '0px' }}
              >
                {e.ticker.slice(0, 3)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm text-slate-900 truncate">{e.name}</p>
                <p className="text-xs text-slate-400 mt-0.5">{e.ticker}</p>
              </div>
              <span className="font-mono font-black text-slate-900 text-base">{e.price}</span>
              <span
                className="text-xs font-bold w-14 text-right"
                style={{ color: e.up ? '#16a34a' : '#dc2626' }}
              >
                {e.change}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
        <p className="text-xs text-slate-400">
          {tab === 'Savings'  && 'Official bank websites · NBE registry'}
          {tab === 'FX rates' && 'Commercial Bank of Ethiopia · Today'}
          {tab === 'ESX'      && 'Ethiopia Securities Exchange · Today'}
        </p>
        <Link
          href={tab === 'Savings' ? '/banking/savings-rates' : tab === 'FX rates' ? '/banking/fx-rates' : '/markets/equities'}
          className="text-xs font-bold"
          style={{ color: '#1A5C38' }}
        >
          {tab === 'Savings'  && 'See all 32 banks →'}
          {tab === 'FX rates' && 'Full FX dashboard →'}
          {tab === 'ESX'      && 'All ESX listings →'}
        </Link>
      </div>
    </div>
  )
}

/* ─── Page ────────────────────────────────────────────────────────────────── */

const BTN   = 'font-bold rounded-full transition-all'
const BTN_SZ = { fontSize: 16, padding: '15px 34px' }

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ════════════════════════════════════════ HERO ══════════════════════════════════════════ */}
      <section className="relative bg-white overflow-hidden border-b border-slate-100">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 900px 600px at 40% -80px,rgba(26,92,56,0.05) 0%,transparent 70%)' }}
        />

        <div className="relative max-w-6xl mx-auto px-8 pt-24 pb-16">
          <div className="grid grid-cols-2 gap-16 items-center">

            {/* ── Left: the product number ── */}
            <div>
              {/* Live label */}
              <div className="inline-flex items-center gap-2 mb-8">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-black uppercase tracking-widest text-slate-500">Best savings rate in Ethiopia · Today</span>
              </div>

              {/* THE NUMBER — this is the product */}
              <div className="mb-5 leading-none">
                <span
                  className="font-mono font-black text-slate-950"
                  style={{ fontSize: '108px', letterSpacing: '-5px', lineHeight: 1 }}
                >
                  9.50
                </span>
                <span
                  className="font-mono font-black"
                  style={{ fontSize: '60px', letterSpacing: '-3px', color: '#1A5C38', lineHeight: 1 }}
                >
                  %
                </span>
              </div>

              {/* Context line */}
              <p className="font-serif font-bold text-slate-700 mb-1" style={{ fontSize: '20px', letterSpacing: '-0.5px' }}>
                Awash Bank · 12-month fixed deposit
              </p>
              <p className="text-slate-400 mb-10" style={{ fontSize: '14px' }}>
                NBE licensed · Verified today ·{' '}
                <Link href="/banking/savings-rates" className="font-bold" style={{ color: '#1A5C38' }}>
                  Compare all 32 banks →
                </Link>
              </p>

              {/* CTAs */}
              <div className="flex gap-3 mb-10">
                <Link
                  href="/banking/savings-rates"
                  className={BTN}
                  style={{ ...BTN_SZ, background: '#1A5C38', color: '#fff', boxShadow: '0 4px 24px rgba(26,92,56,0.25)' }}
                >
                  Compare savings rates
                </Link>
                <Link
                  href="/markets"
                  className={BTN}
                  style={{ ...BTN_SZ, border: '2px solid #1A5C38', color: '#1A5C38', background: 'transparent' }}
                >
                  Explore markets
                </Link>
              </div>

              {/* 3 trust anchors — tight, not a section */}
              <div className="flex items-center gap-6 pt-8 border-t border-slate-100">
                {[
                  { dot: 'bg-green-500', text: '214 institutions' },
                  { dot: 'bg-slate-300', text: 'NBE regulated'   },
                  { dot: 'bg-slate-300', text: 'Free forever'     },
                ].map(({ dot, text }) => (
                  <div key={text} className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${dot} shrink-0`} />
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: interactive card ── */}
            <div>
              <HeroCard />
            </div>
          </div>
        </div>

        {/* ── Live data strip ── */}
        <div className="max-w-6xl mx-auto px-8 pb-20">
          <div
            className="grid grid-cols-5 border border-slate-200 rounded-2xl overflow-hidden bg-white"
            style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}
          >
            {LIVE_DATA.map((d, i) => (
              <div
                key={d.label}
                className="px-6 py-5"
                style={{ borderRight: i < LIVE_DATA.length - 1 ? '1px solid #f1f5f9' : 'none' }}
              >
                <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">{d.label}</p>
                <div className="flex items-baseline gap-1.5 mb-1">
                  <p className="font-mono font-black text-slate-950" style={{ fontSize: '24px', letterSpacing: '-1px', lineHeight: 1 }}>
                    {d.value}
                  </p>
                  {d.trend === 'up' && (
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
                  )}
                  {d.trend === 'down' && (
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                  )}
                </div>
                <p className="text-xs text-slate-400 font-medium">{d.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════ PILLARS ═════════════════════════════════════════ */}
      <section className="border-b border-slate-100" style={{ background: '#f8faf8', padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">

          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Full market coverage</p>
              <h2 className="font-serif font-bold text-slate-950" style={{ fontSize: '42px', letterSpacing: '-1.5px', lineHeight: 1.1 }}>
                Everything in Ethiopia's<br />financial market
              </h2>
            </div>
            <p className="text-slate-400 text-sm font-medium pb-1">214 institutions · 5 pillars</p>
          </div>

          {/* Featured banking card */}
          <Link
            href="/banking"
            className="group block bg-white rounded-2xl border border-slate-200 hover:border-green-200 hover:shadow-2xl transition-all duration-300 mb-4 overflow-hidden"
            style={{ boxShadow: '0 4px 32px rgba(0,0,0,0.06)' }}
          >
            <div className="grid grid-cols-2">
              <div style={{ padding: '48px 52px' }}>
                <div className="flex items-center gap-3 mb-7">
                  <div className="bg-slate-50 rounded-xl flex items-center justify-center group-hover:bg-green-50 transition-colors shrink-0" style={{ width: 44, height: 44 }}>
                    {PILLAR_ICONS['Banking']}
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest text-slate-400">Banking</span>
                  <span className="flex items-center gap-1.5 text-xs font-bold" style={{ color: '#1A5C38' }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    Updated today
                  </span>
                </div>
                <p className="font-serif font-bold text-slate-950 mb-5" style={{ fontSize: '32px', letterSpacing: '-1px', lineHeight: 1.2 }}>
                  Compare every bank<br />in Ethiopia
                </p>
                <p className="text-slate-500 mb-9" style={{ fontSize: '15px', lineHeight: 1.8 }}>
                  Savings rates, FX rates, loan products and mobile money across every
                  NBE-licensed institution — verified daily from official bank websites.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['32 commercial banks', '55 MFIs', '27 payment operators', '62 transfer agencies'].map((chip) => (
                    <span
                      key={chip}
                      className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-full text-xs font-semibold text-slate-600"
                      style={{ padding: '7px 14px' }}
                    >
                      <span className="w-1 h-1 rounded-full bg-green-500 shrink-0" />
                      {chip}
                    </span>
                  ))}
                </div>
              </div>

              <div
                className="border-l border-slate-100 flex flex-col justify-center relative overflow-hidden"
                style={{ padding: '48px 52px', background: '#f8faf8' }}
              >
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 280px 280px at 50% 45%,rgba(26,92,56,0.05) 0%,transparent 70%)' }} />
                <div className="relative">
                  <p className="text-xs font-black uppercase tracking-widest text-green-600 mb-5">Top savings rate · Today</p>
                  <p className="font-mono font-black text-slate-950 leading-none mb-3" style={{ fontSize: '80px', letterSpacing: '-4px' }}>
                    9.50<span style={{ fontSize: '40px', color: '#1A5C38' }}>%</span>
                  </p>
                  <p className="text-slate-600 font-semibold mb-1" style={{ fontSize: '14px' }}>Awash Bank · 12-month fixed deposit</p>
                  <p className="text-xs text-slate-400 mb-10">NBE verified · Updated today</p>
                  <div className="inline-flex items-center gap-2 text-sm font-bold group-hover:gap-3 transition-all" style={{ color: '#1A5C38' }}>
                    <span>Compare all 32 banks</span>
                    <ArrowRight />
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* 4 smaller cards */}
          <div className="grid grid-cols-4 gap-4">
            {PILLAR_CARDS.map((p) => (
              <Link
                key={p.label}
                href={p.href}
                className="group bg-white rounded-2xl border border-slate-200 hover:border-green-300 hover:shadow-lg transition-all duration-200 flex flex-col"
                style={{ padding: '32px 28px', boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}
              >
                <div className="bg-slate-50 rounded-xl flex items-center justify-center group-hover:bg-green-50 transition-colors shrink-0 mb-5" style={{ width: 44, height: 44 }}>
                  {PILLAR_ICONS[p.icon]}
                </div>
                <p className="font-bold text-slate-900 mb-2" style={{ fontSize: '15px' }}>{p.label}</p>
                <p className="text-slate-400 leading-relaxed flex-1 mb-6" style={{ fontSize: '12px', lineHeight: '1.7' }}>{p.desc}</p>
                <div className="flex items-center gap-1 text-xs font-bold mt-auto group-hover:gap-2 transition-all" style={{ color: '#1A5C38' }}>
                  <span>{p.stat}</span>
                  <ArrowRight />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════ TRUST ═══════════════════════════════════════════ */}
      <section className="bg-white border-b border-slate-100" style={{ padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Why trust BirrBank</p>
            <h2 className="font-serif font-bold text-slate-950 mb-5" style={{ fontSize: '42px', letterSpacing: '-1.5px' }}>
              Built on verified data
            </h2>
            <p className="text-slate-400 mx-auto" style={{ fontSize: '16px', lineHeight: 1.7, maxWidth: '460px' }}>
              No affiliate commissions. No sponsored placements. The best rate is always ranked first.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {[
              {
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A5C38" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>,
                tag:      'NBE verified',
                headline: '214 licensed institutions. Zero approximations.',
                body:     "Every institution verified against the National Bank of Ethiopia's official registry. We list only what NBE licenses — no unlicensed operators, no grey-market services.",
              },
              {
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A5C38" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
                tag:      'Updated daily',
                headline: 'Every rate shows a verified date.',
                body:     'Stale data is automatically flagged. Any rate older than 7 days appears with a warning badge. You always know exactly how fresh the data is before making a decision.',
              },
              {
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A5C38" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
                tag:      'No commercial bias',
                headline: 'No affiliate commissions. No sponsored placements.',
                body:     'BirrBank earns nothing from the institutions it lists. The best rate is always #1 regardless of who offers it. Permanently free for every Ethiopian.',
              },
            ].map(({ icon, tag, headline, body }) => (
              <div key={tag} className="border border-slate-100 rounded-2xl" style={{ padding: '40px 36px' }}>
                <div className="w-12 h-12 bg-green-50 border border-green-100 rounded-2xl flex items-center justify-center mb-7">{icon}</div>
                <p className="text-xs font-black uppercase tracking-widest text-green-600 mb-3">{tag}</p>
                <h3 className="font-bold text-slate-900 mb-4" style={{ fontSize: '18px', lineHeight: 1.35 }}>{headline}</h3>
                <p className="text-slate-500 leading-relaxed" style={{ fontSize: '14px', lineHeight: '1.8' }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════ EMAIL ═══════════════════════════════════════════ */}
      <section className="border-b border-slate-100" style={{ background: '#f8faf8', padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-2 gap-20 items-center">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Weekly intelligence</p>
            <h2 className="font-serif font-bold text-slate-950 mb-5" style={{ fontSize: '42px', letterSpacing: '-1.5px', lineHeight: '1.1' }}>
              The best rates.<br />
              <span style={{ color: '#1A5C38' }}>Direct to your inbox.</span>
            </h2>
            <p className="text-slate-500 mb-8" style={{ fontSize: '16px', lineHeight: '1.8' }}>
              Once a week — no noise, no promotions. Just the sharpest moves across
              savings rates, FX, ESX markets and ECX commodity prices.
            </p>
            <ul className="space-y-3">
              {[
                'Savings rate changes across all 32 banks',
                'FX movements — USD, GBP, SAR, AED vs ETB',
                'ESX market updates and new IPO announcements',
                'ECX price movements for coffee and sesame',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-slate-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <EmailCapture />
        </div>
      </section>

    </div>
  )
}
