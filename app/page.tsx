import Link from 'next/link'
import { ArrowRight, TrendingUp, TrendingDown, ChevronRight } from 'lucide-react'
export const dynamic = 'force-dynamic'

const RATES = [
  { bank: 'Awash Bank', rate: '9.50', type: '12M Fixed', badge: 'Highest Rate', badgeColor: '#1A5C38' },
  { bank: 'Zemen Bank', rate: '9.25', type: '12M Fixed', badge: 'Premium', badgeColor: '#0F2D52' },
  { bank: 'Bank of Abyssinia', rate: '9.00', type: '12M Fixed', badge: null, badgeColor: null },
  { bank: 'Dashen Bank', rate: '8.75', type: 'Savings', badge: null, badgeColor: null },
  { bank: 'CBE', rate: '7.00', type: 'Savings', badge: 'State Bank', badgeColor: '#6b7280' },
]

const COMMODITIES = [
  { name: 'Coffee Grade A', price: '43,200', change: '+1.8%', up: true },
  { name: 'Sesame White', price: '28,500', change: '+0.6%', up: true },
  { name: 'White Wheat', price: '7,100', change: '-0.4%', up: false },
]

const CATEGORIES = [
  { title: 'Savings Accounts', desc: 'Compare rates from 32 banks. Find the best return on your deposit.', href: '/banking/savings-rates', icon: '🏦', stat: 'Up to 11% p.a.' },
  { title: 'FX & Transfers', desc: 'Best rates to send money home or exchange foreign currency.', href: '/banking/fx-rates', icon: '💱', stat: '62 money transfer agencies' },
  { title: 'ESX Markets', desc: 'Track listed equities, IPO pipeline and T-bill yields on the Ethiopian Securities Exchange.', href: '/markets', icon: '📈', stat: '45+ IPOs in pipeline' },
  { title: 'Insurance', desc: 'Compare motor, life, health and property insurance from 18 providers.', href: '/insurance', icon: '🛡️', stat: 'First comparison in Ethiopia' },
  { title: 'Commodity Prices', desc: 'Live ECX prices for coffee, sesame, grains and beans. Updated daily.', href: '/commodities', icon: '☕', stat: 'Ethiopia: world's 5th coffee producer' },
  { title: 'Diaspora Hub', desc: 'Invest in Ethiopian stocks from abroad. Send money home cheaply. Open diaspora accounts.', href: '/diaspora', icon: '🌍', stat: '$5bn+ annual remittances' },
]

export default function HomePage() {
  return (
    <div style={{ background: '#f8faf9', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>

      {/* Hero — green, clean, Wise-style */}
      <section style={{ background: 'linear-gradient(135deg, #1A5C38 0%, #0d3d25 100%)', padding: '72px 24px 80px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.15)', borderRadius: 100, padding: '6px 16px', fontSize: 13, color: '#d1fae5', marginBottom: 28, fontWeight: 500 }}>
            <span style={{ width: 6, height: 6, background: '#6ee7b7', borderRadius: '50%', display: 'inline-block' }}></span>
            214 NBE-regulated institutions tracked · Updated daily
          </div>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 52, fontWeight: 700, color: '#ffffff', margin: '0 0 20px', lineHeight: 1.15, letterSpacing: '-0.5px' }}>
            Find the best financial<br />products in Ethiopia
          </h1>
          <p style={{ fontSize: 19, color: 'rgba(255,255,255,0.8)', margin: '0 0 40px', maxWidth: 560, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.6 }}>
            Compare savings rates, FX rates, insurance, ESX stocks and commodity prices — all in one place. Free.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/banking/savings-rates" style={{ background: '#ffffff', color: '#1A5C38', textDecoration: 'none', fontWeight: 700, fontSize: 16, padding: '14px 28px', borderRadius: 10, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              Compare savings rates <ArrowRight size={18} />
            </Link>
            <Link href="/banking/fx-rates" style={{ background: 'rgba(255,255,255,0.12)', color: '#ffffff', textDecoration: 'none', fontWeight: 600, fontSize: 16, padding: '14px 28px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.2)' }}>
              FX rates today
            </Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div style={{ background: '#ffffff', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'center', gap: 64 }}>
          {[['32', 'Licensed banks'], ['214', 'Institutions covered'], ['5', 'Financial pillars'], ['Free', 'Always']].map(([n, l]) => (
            <div key={l} style={{ textAlign: 'center', padding: '20px 0' }}>
              <p style={{ fontFamily: 'Georgia, serif', fontSize: 28, fontWeight: 700, color: '#1A5C38', margin: 0 }}>{n}</p>
              <p style={{ fontSize: 12, color: '#6b7280', margin: '2px 0 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Top savings rates */}
      <section style={{ padding: '56px 24px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: '#1A5C38', margin: '0 0 6px' }}>Updated today</p>
              <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 32, fontWeight: 700, color: '#111827', margin: 0 }}>Top savings rates right now</h2>
            </div>
            <Link href="/banking/savings-rates" style={{ color: '#1A5C38', textDecoration: 'none', fontWeight: 600, fontSize: 14, display: 'flex', alignItems: 'center', gap: 4 }}>
              See all 32 banks <ChevronRight size={16} />
            </Link>
          </div>
          <div style={{ background: '#ffffff', borderRadius: 16, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '0 24px', padding: '12px 24px', background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#9ca3af' }}>Bank</span>
              <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#9ca3af' }}>Product</span>
              <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#9ca3af' }}>Rate p.a.</span>
            </div>
            {RATES.map((r, i) => (
              <div key={r.bank} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '0 24px', padding: '16px 24px', borderBottom: i < RATES.length - 1 ? '1px solid #f3f4f6' : 'none', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 40, height: 40, background: '#f0fdf4', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🏦</div>
                  <div>
                    <p style={{ fontWeight: 600, color: '#111827', margin: 0, fontSize: 15 }}>{r.bank}</p>
                    {r.badge && <span style={{ fontSize: 11, fontWeight: 600, color: r.badgeColor, background: r.badgeColor + '15', padding: '2px 8px', borderRadius: 100 }}>{r.badge}</span>}
                  </div>
                </div>
                <span style={{ fontSize: 14, color: '#6b7280' }}>{r.type}</span>
                <span style={{ fontFamily: 'monospace', fontSize: 22, fontWeight: 700, color: '#1A5C38' }}>{r.rate}%</span>
              </div>
            ))}
            <div style={{ padding: '12px 24px', background: '#f9fafb', borderTop: '1px solid #e5e7eb', fontSize: 12, color: '#9ca3af' }}>
              Rates sourced from official bank websites. Last verified today. Always confirm directly with the bank.
            </div>
          </div>
        </div>
      </section>

      {/* Product category cards — NerdWallet style */}
      <section style={{ padding: '0 24px 64px', background: '#f8faf9' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 32, fontWeight: 700, color: '#111827', margin: '0 0 8px' }}>Explore all financial products</h2>
          <p style={{ fontSize: 16, color: '#6b7280', margin: '0 0 32px' }}>Everything covered. One platform.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {CATEGORIES.map(cat => (
              <Link key={cat.title} href={cat.href} style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: 14, padding: 24, textDecoration: 'none', display: 'block', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#1A5C38'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(26,92,56,0.1)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.boxShadow = 'none' }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{cat.icon}</div>
                <h3 style={{ fontWeight: 700, fontSize: 17, color: '#111827', margin: '0 0 8px' }}>{cat.title}</h3>
                <p style={{ fontSize: 14, color: '#6b7280', margin: '0 0 16px', lineHeight: 1.5 }}>{cat.desc}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#1A5C38' }}>{cat.stat}</span>
                  <ChevronRight size={16} color="#1A5C38" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Commodities strip */}
      <section style={{ background: '#0d3d25', padding: '48px 24px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: '#6ee7b7', margin: '0 0 4px' }}>ECX Live</p>
              <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 24, fontWeight: 700, color: '#ffffff', margin: 0 }}>Today's commodity prices</h2>
            </div>
            <Link href="/commodities" style={{ color: '#6ee7b7', textDecoration: 'none', fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
              Full ECX data <ChevronRight size={16} />
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {COMMODITIES.map(c => (
              <div key={c.name} style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 12, padding: '16px 20px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', margin: '0 0 4px' }}>{c.name}</p>
                <p style={{ fontFamily: 'monospace', fontSize: 22, fontWeight: 700, color: '#ffffff', margin: '0 0 4px' }}>ETB {c.price}</p>
                <p style={{ fontSize: 13, color: c.up ? '#34d399' : '#f87171', margin: 0, display: 'flex', alignItems: 'center', gap: 4 }}>
                  {c.change}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust section */}
      <section style={{ background: '#ffffff', padding: '56px 24px', borderTop: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40, textAlign: 'center' }}>
          {[
            { icon: '✓', title: 'NBE verified data', desc: 'All institution data sourced directly from the National Bank of Ethiopia registry and official bank websites.' },
            { icon: '⚡', title: 'Updated daily', desc: 'FX rates, savings rates and commodity prices are refreshed every day. Every rate shows a last-verified date.' },
            { icon: '🆓', title: 'Free forever', desc: 'BirrBank is permanently free for consumers. No paywalls, no premium tiers, no subscription required.' },
          ].map(item => (
            <div key={item.title}>
              <div style={{ width: 48, height: 48, background: '#f0fdf4', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, margin: '0 auto 16px' }}>{item.icon}</div>
              <h3 style={{ fontWeight: 700, fontSize: 17, color: '#111827', margin: '0 0 8px' }}>{item.title}</h3>
              <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
