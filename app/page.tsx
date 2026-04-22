'use client'
import Link from 'next/link'
import { TrendingUp, TrendingDown, Building2, Shield, Wheat, BookOpen, ArrowRight, Globe, Zap } from 'lucide-react'

const SAMPLE_RATES = [
  { bank: 'Commercial Bank of Ethiopia', savings: '7.00', fixed12: '8.50', fx: '156.40', badge: 'State' },
  { bank: 'Awash Bank', savings: '9.50', fixed12: '11.00', fx: '157.20', badge: 'Private' },
  { bank: 'Bank of Abyssinia', savings: '9.00', fixed12: '10.50', fx: '157.00', badge: 'Private' },
  { bank: 'Dashen Bank', savings: '8.75', fixed12: '10.25', fx: '156.90', badge: 'Private' },
  { bank: 'Zemen Bank', savings: '9.25', fixed12: '10.75', fx: '157.10', badge: 'Private' },
]

const COMMODITIES = [
  { code: 'LUBPAA2', name: 'Coffee Grade A', price: '43,200', change: '+1.8%', up: true },
  { code: 'WHGS2', name: 'Sesame White', price: '28,500', change: '+0.6%', up: true },
  { code: 'LWBP2', name: 'White Wheat', price: '7,100', change: '-0.4%', up: false },
  { code: 'BRDC3', name: 'Kidney Beans', price: '18,900', change: '+1.2%', up: true },
]

const ESX = [
  { ticker: 'WGAGN', name: 'Wegagen Bank', price: '42.50', change: '+3.2%', up: true },
  { ticker: 'GDAAB', name: 'Gadaa Bank', price: '38.00', change: '+1.8%', up: true },
]

export default function HomePage() {
  return (
    <main style={{ fontFamily: 'Inter, sans-serif', background: '#0F2D52', minHeight: '100vh', color: '#fff' }}>

      {/* Navigation */}
      <nav style={{ background: 'rgba(15,45,82,0.95)', borderBottom: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 32, height: 32, background: 'linear-gradient(135deg, #1A5C38, #2d8a56)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 14 }}>ብ</div>
            <span style={{ fontWeight: 800, fontSize: 20, letterSpacing: '-0.5px' }}>BirrBank</span>
            <span style={{ fontSize: 10, color: '#9A6F00', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginLeft: 4 }}>Beta</span>
          </div>
          <div style={{ display: 'flex', gap: 32, fontSize: 14, fontWeight: 500 }}>
            {['Banking', 'Insurance', 'Markets', 'Commodities', 'Intelligence'].map(item => (
              <Link key={item} href={`/${item.toLowerCase()}`} style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}>
                {item}
              </Link>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <Link href="/sign-in" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 14, padding: '8px 16px' }}>Sign in</Link>
            <Link href="/sign-up" style={{ background: '#1A5C38', color: '#fff', textDecoration: 'none', fontSize: 14, fontWeight: 600, padding: '8px 20px', borderRadius: 8 }}>Get started</Link>
          </div>
        </div>
      </nav>

      {/* Live ticker strip */}
      <div style={{ background: 'rgba(26,92,56,0.2)', borderBottom: '1px solid rgba(26,92,56,0.3)', padding: '8px 0', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'flex', gap: 32, fontSize: 12, color: 'rgba(255,255,255,0.7)', alignItems: 'center' }}>
          <span style={{ color: '#9A6F00', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, fontSize: 10 }}>Live</span>
          {COMMODITIES.map(c => (
            <span key={c.code} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <span style={{ color: 'rgba(255,255,255,0.5)' }}>{c.name}</span>
              <span style={{ fontFamily: 'monospace', fontWeight: 600, color: '#fff' }}>ETB {c.price}</span>
              <span style={{ color: c.up ? '#34d399' : '#f87171', fontSize: 11 }}>{c.change}</span>
            </span>
          ))}
          <span style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ color: 'rgba(255,255,255,0.5)' }}>USD/ETB</span>
            <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>156.40</span>
          </span>
        </div>
      </div>

      {/* Hero */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 24px 60px', display: 'grid', gridTemplateColumns: '1fr 480px', gap: 64, alignItems: 'center' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(26,92,56,0.2)', border: '1px solid rgba(26,92,56,0.4)', borderRadius: 100, padding: '6px 16px', fontSize: 12, color: '#6ee7b7', marginBottom: 24, fontWeight: 600 }}>
            <span style={{ width: 6, height: 6, background: '#34d399', borderRadius: '50%', display: 'inline-block', animation: 'pulse 2s infinite' }}></span>
            214 NBE-regulated entities tracked
          </div>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 56, fontWeight: 700, lineHeight: 1.1, letterSpacing: '-1px', marginBottom: 24, color: '#fff' }}>
            Ethiopia's financial<br />
            <span style={{ color: '#9A6F00' }}>intelligence</span> platform
          </h1>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: 40, maxWidth: 480 }}>
            Compare savings rates across every bank. Track ESX listings. Monitor ECX commodity prices. Access insurance data. All free. All in one place.
          </p>
          <div style={{ display: 'flex', gap: 16 }}>
            <Link href="/banking/savings-rates" style={{ background: '#1A5C38', color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: 16, padding: '14px 32px', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
              Compare savings rates <ArrowRight size={18} />
            </Link>
            <Link href="/markets" style={{ border: '1px solid rgba(255,255,255,0.2)', color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: 16, padding: '14px 28px', borderRadius: 10 }}>
              ESX Markets
            </Link>
          </div>
          <div style={{ display: 'flex', gap: 32, marginTop: 40, paddingTop: 40, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            {[['32', 'Licensed banks'], ['214', 'Institutions covered'], ['5', 'Asset classes']].map(([n, l]) => (
              <div key={l}>
                <p style={{ fontFamily: 'monospace', fontSize: 28, fontWeight: 700, color: '#9A6F00', margin: 0 }}>{n}</p>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', margin: '4px 0 0', textTransform: 'uppercase', letterSpacing: 1 }}>{l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Live rates card */}
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', margin: 0, textTransform: 'uppercase', letterSpacing: 1 }}>Top savings rates</p>
              <p style={{ fontSize: 11, color: '#34d399', margin: '2px 0 0' }}>● Updated today</p>
            </div>
            <Link href="/banking/savings-rates" style={{ fontSize: 12, color: '#6ee7b7', textDecoration: 'none' }}>View all →</Link>
          </div>
          <div style={{ padding: '8px 0' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: '0 16px', padding: '6px 20px', fontSize: 10, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: 1 }}>
              <span>Bank</span><span>Savings</span><span>12M Fixed</span><span>USD/ETB</span>
            </div>
            {SAMPLE_RATES.map((r, i) => (
              <div key={r.bank} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: '0 16px', padding: '10px 20px', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)', alignItems: 'center' }}>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#fff', margin: 0 }}>{r.bank}</p>
                  <span style={{ fontSize: 10, background: 'rgba(154,111,0,0.2)', color: '#d4a017', padding: '1px 6px', borderRadius: 4 }}>{r.badge}</span>
                </div>
                <span style={{ fontFamily: 'monospace', fontSize: 14, fontWeight: 700, color: '#34d399' }}>{r.savings}%</span>
                <span style={{ fontFamily: 'monospace', fontSize: 14, color: '#fff' }}>{r.fixed12}%</span>
                <span style={{ fontFamily: 'monospace', fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>{r.fx}</span>
              </div>
            ))}
          </div>
          <div style={{ padding: '12px 20px', borderTop: '1px solid rgba(255,255,255,0.06)', fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
            Rates sourced from official bank websites · Always verify before applying
          </div>
        </div>
      </section>

      {/* Five Pillars */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: '#6ee7b7', margin: '0 0 12px' }}>Platform coverage</p>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 40, fontWeight: 700, color: '#fff', margin: 0 }}>Five pillars. One platform.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
            {[
              { icon: Building2, label: 'Banking', sub: '176 institutions', items: ['Savings rates', 'Loan comparison', 'FX dashboard', 'Mobile money'], color: '#1A5C38', glow: 'rgba(26,92,56,0.3)', href: '/banking' },
              { icon: Shield, label: 'Insurance', sub: '19 providers', items: ['Motor insurance', 'Life & health', 'Property cover', 'Claims guides'], color: '#be185d', glow: 'rgba(190,24,93,0.2)', href: '/insurance' },
              { icon: TrendingUp, label: 'Markets', sub: 'ESX + bonds', items: ['Listed equities', 'IPO pipeline', 'T-bill yields', 'Investment banks'], color: '#1d4ed8', glow: 'rgba(29,78,216,0.2)', href: '/markets' },
              { icon: Wheat, label: 'Commodities', sub: 'ECX daily', items: ['Coffee grades', 'Sesame varieties', 'Grains & beans', 'Price history'], color: '#92400e', glow: 'rgba(146,64,14,0.2)', href: '/commodities' },
              { icon: BookOpen, label: 'Intelligence', sub: '500+ guides', items: ['Financial guides', 'Regulations', 'AI assistant', 'Diaspora hub'], color: '#5b21b6', glow: 'rgba(91,33,182,0.2)', href: '/guides' },
            ].map(({ icon: Icon, label, sub, items, color, glow, href }) => (
              <Link key={label} href={href} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: 24, textDecoration: 'none', display: 'block', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = `rgba(255,255,255,0.06)`; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)' }}>
                <div style={{ width: 44, height: 44, background: `${color}22`, border: `1px solid ${color}44`, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <Icon size={22} color={color} />
                </div>
                <p style={{ fontWeight: 700, fontSize: 16, color: '#fff', margin: '0 0 4px' }}>{label}</p>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', margin: '0 0 16px' }}>{sub}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {items.map(item => (
                    <li key={item} style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', padding: '3px 0', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ width: 4, height: 4, background: color, borderRadius: '50%', display: 'inline-block', flexShrink: 0 }}></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ESX + Commodities row */}
      <section style={{ background: 'rgba(0,0,0,0.2)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '60px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#fff', margin: 0 }}>ESX Listed Securities</p>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', margin: '2px 0 0' }}>Ethiopian Securities Exchange</p>
              </div>
              <Link href="/markets" style={{ fontSize: 12, color: '#93c5fd', textDecoration: 'none' }}>View all →</Link>
            </div>
            {ESX.map(s => (
              <div key={s.ticker} style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontFamily: 'monospace', fontSize: 13, fontWeight: 700, color: '#93c5fd', margin: 0 }}>{s.ticker}</p>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', margin: '2px 0 0' }}>{s.name}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontFamily: 'monospace', fontSize: 16, fontWeight: 700, color: '#fff', margin: 0 }}>ETB {s.price}</p>
                  <p style={{ fontSize: 12, color: s.up ? '#34d399' : '#f87171', margin: '2px 0 0', display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'flex-end' }}>
                    {s.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />} {s.change}
                  </p>
                </div>
              </div>
            ))}
            <div style={{ padding: '10px 20px', fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>45+ IPO prospectuses under ECMA review</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#fff', margin: 0 }}>ECX Commodity Prices</p>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', margin: '2px 0 0' }}>Ethiopian Commodity Exchange</p>
              </div>
              <Link href="/commodities" style={{ fontSize: 12, color: '#fcd34d', textDecoration: 'none' }}>View all →</Link>
            </div>
            {COMMODITIES.map(c => (
              <div key={c.code} style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontFamily: 'monospace', fontSize: 11, color: '#fcd34d', margin: 0 }}>{c.code}</p>
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#fff', margin: '2px 0 0' }}>{c.name}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontFamily: 'monospace', fontSize: 16, fontWeight: 700, color: '#fff', margin: 0 }}>ETB {c.price}</p>
                  <p style={{ fontSize: 12, color: c.up ? '#34d399' : '#f87171', margin: '2px 0 0' }}>{c.change}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#080f1a', padding: '40px 24px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 28, height: 28, background: '#1A5C38', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 900 }}>ብ</div>
            <span style={{ fontWeight: 700, fontSize: 16 }}>BirrBank</span>
          </div>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', maxWidth: 600, textAlign: 'center', margin: 0 }}>
            BirrBank provides financial information for comparison purposes only. Not a bank, insurer, broker, or financial adviser. Always verify rates directly with the institution before making any financial decision.
          </p>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', margin: 0 }}>© 2026 BirrBank</p>
        </div>
      </footer>

    </main>
  )
}
