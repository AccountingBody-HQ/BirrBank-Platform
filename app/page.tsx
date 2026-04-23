import Link from 'next/link'
import EmailCapture from '@/components/EmailCapture'

export const dynamic = 'force-dynamic'

// ─── STATIC DATA (replace with Supabase queries once schema is live) ──────────
const FX = [
  { pair: 'USD / ETB', rate: '156.42', change: '+0.18', up: true },
  { pair: 'EUR / ETB', rate: '169.85', change: '+0.31', up: true },
  { pair: 'GBP / ETB', rate: '198.20', change: '-0.12', up: false },
  { pair: 'SAR / ETB', rate: '41.71', change: '+0.05', up: true },
  { pair: 'AED / ETB', rate: '42.60', change: '+0.04', up: true },
  { pair: 'CNY / ETB', rate: '21.54', change: '-0.09', up: false },
]

const RATES = [
  { bank: 'Awash Bank', product: '12-month fixed deposit', rate: '9.50', best: true },
  { bank: 'Bank of Abyssinia', product: '12-month fixed deposit', rate: '9.00', best: false },
  { bank: 'Zemen Bank', product: '12-month fixed deposit', rate: '9.25', best: false },
  { bank: 'Dashen Bank', product: '6-month fixed deposit', rate: '8.75', best: false },
  { bank: 'Oromia International Bank', product: 'Savings account', rate: '8.50', best: false },
  { bank: 'Commercial Bank of Ethiopia', product: 'Savings account', rate: '7.00', best: false },
]

const MARKET = [
  { ticker: 'WEGB', name: 'Wegagen Bank', price: '142.50', change: '+2.3%', up: true },
  { ticker: 'GDAB', name: 'Gadaa Bank', price: '98.00', change: '+0.8%', up: true },
  { ticker: 'ETHM', name: 'Ethio Telecom', price: '215.00', change: '-0.4%', up: false },
]

const COMMODITIES = [
  { code: 'Coffee (Grade A)', region: 'Yirgacheffe', price: '18,000', unit: 'ETB/qt', change: '+131', up: true },
  { code: 'Sesame (White)', region: 'Humera', price: '14,400', unit: 'ETB/qt', change: '+14,400', up: true },
  { code: 'Wheat', region: 'LWBP2', price: '18,131', unit: 'ETB/qt', change: '+931', up: true },
]

const PILLARS = [
  {
    label: 'Banking',
    amharic: 'ባንኪንግ',
    count: '214',
    unit: 'institutions',
    stat: 'Best rate: 9.50% p.a.',
    href: '/banking',
    desc: '32 banks · 55 MFIs · 27 payment operators · 62 money transfer agencies',
  },
  {
    label: 'Insurance',
    amharic: 'ኢንሹራንስ',
    count: '18',
    unit: 'insurers',
    stat: 'First in Ethiopia',
    href: '/insurance',
    desc: 'Motor · Life · Health · Property · Agricultural · Micro-insurance',
  },
  {
    label: 'Markets',
    amharic: 'ገበያ',
    count: '45+',
    unit: 'IPOs in pipeline',
    stat: 'ESX live',
    href: '/markets',
    desc: 'ESX equities · IPO pipeline · T-bills · Corporate bonds · Brokers',
  },
  {
    label: 'Commodities',
    amharic: 'ሸቀጦች',
    count: '11',
    unit: 'ECX products',
    stat: 'Live ECX prices',
    href: '/commodities',
    desc: 'Coffee · Sesame · Wheat · Beans · Chickpeas · Soybean · Maize',
  },
  {
    label: 'Intelligence',
    amharic: 'መረጃ',
    count: '500+',
    unit: 'guides',
    stat: 'NBE · ECMA · ECX',
    href: '/guides',
    desc: 'Guides · Regulations tracker · AI assistant · Diaspora hub · News',
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen" style={{ background: '#F8F9FA', fontFamily: 'var(--font-inter)' }}>

      {/* ── FX TICKER STRIP ─────────────────────────────────────────────────── */}
      <div style={{ background: '#0A1628', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-6 overflow-x-auto no-scrollbar">
            {FX.map(f => (
              <div key={f.pair} className="flex items-center gap-2 shrink-0">
                <span style={{ color: '#64748B', fontSize: 11, fontWeight: 600, letterSpacing: '0.05em' }}>{f.pair}</span>
                <span style={{ color: '#F1F5F9', fontSize: 12, fontWeight: 700, fontFamily: 'var(--font-mono, monospace)' }}>{f.rate}</span>
                <span style={{ color: f.up ? '#10B981' : '#EF4444', fontSize: 11, fontWeight: 600 }}>
                  {f.up ? '▲' : '▼'} {f.change}
                </span>
              </div>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-2 shrink-0 ml-6">
            <span style={{ width: 6, height: 6, background: '#10B981', borderRadius: '50%', display: 'inline-block' }}></span>
            <span style={{ color: '#475569', fontSize: 11, fontWeight: 500 }}>NBE rates · Updated daily</span>
          </div>
        </div>
      </div>

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section style={{
        background: 'linear-gradient(160deg, #0F2D52 0%, #0A1628 50%, #0D1F3C 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Grid texture */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.03,
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }} />
        {/* Glow */}
        <div style={{
          position: 'absolute', top: -200, left: '50%', transform: 'translateX(-50%)',
          width: 800, height: 400,
          background: 'radial-gradient(ellipse, rgba(26,92,56,0.25) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* ── LEFT: HEADLINE + META ──────────────────────────────────────── */}
            <div>
              {/* Label */}
              <div className="flex items-center gap-3 mb-8">
                <div style={{ width: 28, height: 2, background: '#1A5C38' }} />
                <span style={{ color: '#6EE7B7', fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                  Ethiopia&apos;s Financial Operating System
                </span>
              </div>

              {/* Amharic + English headline */}
              <div className="mb-3">
                <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: 15, fontWeight: 400, letterSpacing: '0.05em', marginBottom: 6 }}>
                  ብርባንክ
                </p>
                <h1 style={{
                  fontFamily: 'var(--font-playfair)',
                  fontSize: 'clamp(36px, 5vw, 62px)',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  lineHeight: 1.05,
                  letterSpacing: '-1.5px',
                  marginBottom: 0,
                }}>
                  Every rate.<br />
                  Every bank.<br />
                  <span style={{ color: '#4ADE80' }}>One platform.</span>
                </h1>
              </div>

              <p style={{ color: '#94A3B8', fontSize: 16, lineHeight: 1.75, maxWidth: 420, marginBottom: 36, marginTop: 20 }}>
                Compare savings rates, track ESX markets, monitor ECX commodity prices and access insurance data across 214 NBE-regulated institutions — free, always.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 mb-12">
                <Link href="/banking/savings-rates" style={{
                  background: '#1A5C38', color: '#fff', fontWeight: 700,
                  padding: '14px 28px', borderRadius: 8, fontSize: 14,
                  textDecoration: 'none', letterSpacing: '0.01em',
                  boxShadow: '0 0 32px rgba(26,92,56,0.4)',
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                }}>
                  Compare savings rates
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </Link>
                <Link href="/markets" style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: '#E2E8F0', fontWeight: 600,
                  padding: '14px 28px', borderRadius: 8, fontSize: 14,
                  textDecoration: 'none',
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                }}>
                  ESX markets
                </Link>
              </div>

              {/* Trust row */}
              <div className="flex flex-wrap items-center gap-6">
                {[
                  { label: 'Data from', value: 'NBE · ESX · ECX' },
                  { label: 'Institutions', value: '214 regulated' },
                  { label: 'Cost', value: 'Free forever' },
                ].map(t => (
                  <div key={t.label} className="flex items-center gap-2">
                    <div style={{ width: 3, height: 3, background: '#1A5C38', borderRadius: '50%' }} />
                    <span style={{ color: '#64748B', fontSize: 12 }}>{t.label}: </span>
                    <span style={{ color: '#CBD5E1', fontSize: 12, fontWeight: 600 }}>{t.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT: LIVE RATES CARD ────────────────────────────────────── */}
            <div>
              <div style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 16,
                overflow: 'hidden',
                backdropFilter: 'blur(20px)',
              }}>
                {/* Card header */}
                <div style={{
                  padding: '16px 20px',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <div>
                    <p style={{ color: '#6EE7B7', fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 2 }}>
                      Live data
                    </p>
                    <p style={{ color: '#F1F5F9', fontSize: 14, fontWeight: 700 }}>Best savings rates today</p>
                  </div>
                  <div style={{
                    background: 'rgba(26,92,56,0.2)',
                    border: '1px solid rgba(26,92,56,0.3)',
                    borderRadius: 20,
                    padding: '4px 10px',
                    display: 'flex', alignItems: 'center', gap: 5,
                  }}>
                    <span style={{ width: 5, height: 5, background: '#10B981', borderRadius: '50%', display: 'inline-block' }} />
                    <span style={{ color: '#6EE7B7', fontSize: 10, fontWeight: 700 }}>NBE verified</span>
                  </div>
                </div>

                {/* Rates rows */}
                <div>
                  {RATES.map((r, i) => (
                    <div key={r.bank} style={{
                      padding: '14px 20px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 14,
                      borderBottom: i < RATES.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                      background: r.best ? 'rgba(26,92,56,0.15)' : 'transparent',
                    }}>
                      <div style={{
                        width: 28, height: 28, borderRadius: 6, flexShrink: 0,
                        background: r.best ? '#1A5C38' : 'rgba(255,255,255,0.06)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 10, fontWeight: 800, color: r.best ? '#fff' : '#475569',
                      }}>
                        {r.best ? (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                        ) : (i + 1)}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ color: r.best ? '#F1F5F9' : '#94A3B8', fontSize: 13, fontWeight: 700, marginBottom: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.bank}</p>
                        <p style={{ color: r.best ? '#6EE7B7' : '#475569', fontSize: 10, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{r.product}</p>
                      </div>
                      <div style={{
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: r.best ? 22 : 18,
                        fontWeight: 900,
                        color: r.best ? '#4ADE80' : '#CBD5E1',
                        letterSpacing: '-0.5px',
                        flexShrink: 0,
                      }}>
                        {r.rate}%
                      </div>
                    </div>
                  ))}
                </div>

                {/* Card footer */}
                <div style={{
                  padding: '12px 20px',
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'rgba(0,0,0,0.1)',
                }}>
                  <p style={{ color: '#475569', fontSize: 11 }}>Sourced from official bank websites</p>
                  <Link href="/banking/savings-rates" style={{ color: '#4ADE80', fontSize: 11, fontWeight: 700, textDecoration: 'none' }}>
                    All 32 banks →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── STAT BAR ────────────────────────────────────────────────────── */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.15)' }}>
          <div className="max-w-7xl mx-auto px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-px" style={{ background: 'rgba(255,255,255,0.04)' }}>
            {[
              { value: '214', label: 'Regulated institutions' },
              { value: '9.50%', label: 'Best savings rate' },
              { value: '45+', label: 'IPOs in ESX pipeline' },
              { value: '11', label: 'ECX commodity prices' },
            ].map(s => (
              <div key={s.label} style={{ padding: '16px 24px', background: '#0A1628' }}>
                <p style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: 24, fontWeight: 900, color: '#F1F5F9', letterSpacing: '-1px', marginBottom: 2 }}>
                  {s.value}
                </p>
                <p style={{ color: '#475569', fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MARKETS + COMMODITIES STRIP ─────────────────────────────────────── */}
      <section style={{ background: '#0F172A', borderBottom: '1px solid #1E293B' }}>
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-wrap items-center gap-8">

          {/* ESX */}
          <div>
            <p style={{ color: '#475569', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>
              ESX — Ethiopian Securities Exchange
            </p>
            <div className="flex items-center gap-6">
              {MARKET.map(m => (
                <div key={m.ticker} className="flex items-center gap-2">
                  <span style={{ color: '#64748B', fontSize: 11, fontWeight: 700 }}>{m.ticker}</span>
                  <span style={{ color: '#E2E8F0', fontSize: 12, fontWeight: 700, fontFamily: 'monospace' }}>{m.price}</span>
                  <span style={{ color: m.up ? '#10B981' : '#EF4444', fontSize: 11 }}>{m.change}</span>
                </div>
              ))}
              <Link href="/markets" style={{ color: '#3B82F6', fontSize: 11, fontWeight: 600, textDecoration: 'none' }}>IPO pipeline →</Link>
            </div>
          </div>

          <div style={{ width: 1, height: 36, background: '#1E293B' }} />

          {/* ECX */}
          <div>
            <p style={{ color: '#475569', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>
              ECX — Ethiopian Commodity Exchange
            </p>
            <div className="flex items-center gap-6">
              {COMMODITIES.map(c => (
                <div key={c.code} className="flex items-center gap-2">
                  <span style={{ color: '#64748B', fontSize: 11, fontWeight: 700 }}>{c.code}</span>
                  <span style={{ color: '#E2E8F0', fontSize: 12, fontWeight: 700, fontFamily: 'monospace' }}>{c.price} {c.unit}</span>
                  <span style={{ color: c.up ? '#10B981' : '#EF4444', fontSize: 11 }}>▲ {c.change}</span>
                </div>
              ))}
              <Link href="/commodities" style={{ color: '#3B82F6', fontSize: 11, fontWeight: 600, textDecoration: 'none' }}>All prices →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FIVE PILLARS ─────────────────────────────────────────────────────── */}
      <section style={{ background: '#F8F9FA', padding: '80px 0' }}>
        <div className="max-w-7xl mx-auto px-6">

          <div className="mb-12">
            <p style={{ color: '#1A5C38', fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12 }}>
              Full market coverage
            </p>
            <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#0F172A', letterSpacing: '-1px', lineHeight: 1.1 }}>
              Ethiopia&apos;s complete<br />financial universe
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-px" style={{ background: '#E2E8F0', border: '1px solid #E2E8F0', borderRadius: 12, overflow: 'hidden' }}>
            {PILLARS.map((pillar, i) => (
              <Link key={pillar.label} href={pillar.href} style={{ textDecoration: 'none', display: 'block' }}>
                <div style={{
                  background: '#FFFFFF',
                  padding: '28px 24px',
                  height: '100%',
                  transition: 'background 0.15s',
                  cursor: 'pointer',
                }}
                  className="hover:bg-green-50 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span style={{ color: '#94A3B8', fontSize: 11, fontWeight: 600, letterSpacing: '0.05em' }}>{String(i + 1).padStart(2, '0')}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-green-600" style={{ transition: 'stroke 0.15s' }}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  </div>

                  <p style={{ color: '#94A3B8', fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', marginBottom: 4 }}>{pillar.amharic}</p>
                  <p style={{ color: '#0F172A', fontSize: 16, fontWeight: 800, marginBottom: 4, letterSpacing: '-0.3px' }}>{pillar.label}</p>

                  <div style={{ marginBottom: 12 }}>
                    <span style={{ fontFamily: 'monospace', fontSize: 22, fontWeight: 900, color: '#1A5C38', letterSpacing: '-0.5px' }}>{pillar.count}</span>
                    <span style={{ color: '#94A3B8', fontSize: 11, fontWeight: 500, marginLeft: 4 }}>{pillar.unit}</span>
                  </div>

                  <p style={{ color: '#64748B', fontSize: 11, lineHeight: 1.7 }}>{pillar.desc}</p>

                  <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid #F1F5F9' }}>
                    <span style={{ color: '#1A5C38', fontSize: 11, fontWeight: 700 }}>{pillar.stat}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY TRUST BIRRBANK ───────────────────────────────────────────────── */}
      <section style={{ background: '#0F2D52', padding: '80px 0' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p style={{ color: '#6EE7B7', fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12 }}>
                Data integrity
              </p>
              <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 800, color: '#F1F5F9', letterSpacing: '-1px', lineHeight: 1.15, marginBottom: 20 }}>
                Every figure has a source.<br />Every rate has a date.
              </h2>
              <p style={{ color: '#64748B', fontSize: 15, lineHeight: 1.8, maxWidth: 420 }}>
                BirrBank sources all institution data directly from the National Bank of Ethiopia registry and official bank websites. Every rate displayed carries a last-verified timestamp. Stale data is flagged automatically.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-px" style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }}>
              {[
                { label: 'Official source', detail: 'All institution data from the NBE registry', icon: '🏛' },
                { label: 'Daily verification', detail: 'FX rates updated every business day at 09:00 EAT', icon: '📅' },
                { label: 'Rate timestamps', detail: 'Every rate shows its last-verified date — always', icon: '🕐' },
                { label: 'Free forever', detail: 'No paywalls, no premium tiers, no subscriptions', icon: '∞' },
              ].map(item => (
                <div key={item.label} style={{ padding: '20px 24px', background: 'rgba(255,255,255,0.02)', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>{item.icon}</span>
                  <div>
                    <p style={{ color: '#E2E8F0', fontSize: 13, fontWeight: 700, marginBottom: 3 }}>{item.label}</p>
                    <p style={{ color: '#475569', fontSize: 12, lineHeight: 1.6 }}>{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── DIASPORA BAND ────────────────────────────────────────────────────── */}
      <section style={{ background: '#1A5C38', padding: '56px 0' }}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p style={{ color: '#6EE7B7', fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8 }}>
              Ethiopian diaspora
            </p>
            <h3 style={{ fontFamily: 'var(--font-playfair)', fontSize: 28, fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.5px', lineHeight: 1.2 }}>
              Sending money home?<br />Investing in Ethiopian stocks?
            </h3>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link href="/diaspora/remittance" style={{ background: '#fff', color: '#1A5C38', fontWeight: 700, padding: '12px 24px', borderRadius: 8, fontSize: 13, textDecoration: 'none', whiteSpace: 'nowrap' }}>
              Remittance comparison
            </Link>
            <Link href="/diaspora" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontWeight: 600, padding: '12px 24px', borderRadius: 8, fontSize: 13, textDecoration: 'none', whiteSpace: 'nowrap' }}>
              Diaspora hub →
            </Link>
          </div>
        </div>
      </section>

      {/* ── EMAIL CAPTURE ────────────────────────────────────────────────────── */}
      <section style={{ background: '#F8F9FA', padding: '80px 0', borderTop: '1px solid #E2E8F0' }}>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p style={{ color: '#1A5C38', fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12 }}>
              Weekly intelligence
            </p>
            <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 800, color: '#0F172A', letterSpacing: '-1px', lineHeight: 1.15, marginBottom: 16 }}>
              The Ethiopian financial<br />week, summarised.
            </h2>
            <p style={{ color: '#64748B', fontSize: 15, lineHeight: 1.8, maxWidth: 420, marginBottom: 24 }}>
              Once a week — the most important rate changes, ESX movements, NBE directives and commodity price shifts, delivered to your inbox.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                'Best savings rate changes across all 32 banks',
                'FX movements — USD, EUR, GBP, SAR, AED vs ETB',
                'ESX market updates and new IPO announcements',
                'ECX commodity price movements and export data',
                'New NBE and ECMA directives',
              ].map(item => (
                <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, color: '#475569', fontSize: 13 }}>
                  <span style={{ color: '#1A5C38', fontWeight: 800, fontSize: 14, marginTop: 1, flexShrink: 0 }}>→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <EmailCapture />
          </div>
        </div>
      </section>

      {/* ── DISCLAIMER ───────────────────────────────────────────────────────── */}
      <div style={{ background: '#F1F5F9', borderTop: '1px solid #E2E8F0', padding: '16px 24px', textAlign: 'center' }}>
        <p style={{ color: '#94A3B8', fontSize: 11, lineHeight: 1.6, maxWidth: 640, margin: '0 auto' }}>
          BirrBank provides financial information for comparison purposes only. We are not a bank, insurer, broker or financial adviser. Always verify rates directly with the institution before making any financial decision.
        </p>
      </div>

    </div>
  )
}
