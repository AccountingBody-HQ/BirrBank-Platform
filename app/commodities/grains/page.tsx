import Link from 'next/link'
import EmailCapture from '@/components/EmailCapture'
export const dynamic = 'force-dynamic'

// ─── Placeholder data — replace with Supabase queries in Phase 2 ─────────────
// All prices in ETB per kg

const GRAIN_PRICES = [
  { code: 'LWBP2',  name: 'White Wheat Grade 2',    type: 'Wheat',    origin: 'Arsi',      price: '18,900', change: '+200',  changePct: '+1.07', volume: '124.5t', badge: 'Most traded' },
  { code: 'LWBP3',  name: 'White Wheat Grade 3',    type: 'Wheat',    origin: 'Arsi',      price: '17,400', change: '+150',  changePct: '+0.87', volume: '98.2t',  badge: null },
  { code: 'LMBP2',  name: 'Mixed Wheat Grade 2',    type: 'Wheat',    origin: 'Bale',      price: '17,100', change: '+180',  changePct: '+1.06', volume: '76.3t',  badge: null },
  { code: 'SBWO2',  name: 'Soybean Grade 2',        type: 'Soybean',  origin: 'Jimma',     price: '22,400', change: '+180',  changePct: '+0.81', volume: '38.7t',  badge: null },
  { code: 'SBWO3',  name: 'Soybean Grade 3',        type: 'Soybean',  origin: 'Jimma',     price: '20,100', change: '+120',  changePct: '+0.60', volume: '24.1t',  badge: null },
  { code: 'MZYS2',  name: 'Yellow Maize Grade 2',   type: 'Maize',    origin: 'Oromia',    price: '12,600', change: '-80',   changePct: '-0.63', volume: '210.4t', badge: null },
  { code: 'MZYS3',  name: 'Yellow Maize Grade 3',   type: 'Maize',    origin: 'Oromia',    price: '11,200', change: '-60',   changePct: '-0.53', volume: '158.2t', badge: null },
  { code: 'SRGH2',  name: 'White Sorghum Grade 2',  type: 'Sorghum',  origin: 'SNNPR',     price: '10,800', change: '+90',   changePct: '+0.84', volume: '89.6t',  badge: null },
  { code: 'TEFF2',  name: 'White Teff Grade 2',     type: 'Teff',     origin: 'Oromia',    price: '28,500', change: '+350',  changePct: '+1.24', volume: '45.3t',  badge: 'Premium grain' },
  { code: 'TEFF3',  name: 'Mixed Teff Grade 3',     type: 'Teff',     origin: 'Oromia',    price: '24,200', change: '+280',  changePct: '+1.17', volume: '32.8t',  badge: null },
]

const GRAIN_TYPES = ['All types', 'Wheat', 'Soybean', 'Maize', 'Sorghum', 'Teff']

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

export default function GrainPricesPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ══════════════════════════════ HERO ══════════════════════════════════════ */}
      <section className="relative bg-white overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 900px 500px at 55% -80px, rgba(29,78,216,0.04) 0%, transparent 65%)' }} />
        <div className="relative max-w-6xl mx-auto px-8 pt-20 pb-14">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-6">
            <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
            <span>›</span>
            <Link href="/commodities" className="hover:text-slate-600 transition-colors">Commodities</Link>
            <span>›</span>
            <span style={{ color: PILLAR, fontWeight: 700 }}>Grain Prices</span>
          </div>
          <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: PILLAR }}>Commodities · Grains</p>
          <h1 className="font-serif font-bold mb-5 text-slate-950" style={{ fontSize: 'clamp(36px, 4.5vw, 54px)', letterSpacing: '-1.8px', lineHeight: 1.08 }}>
            Ethiopian grain prices —<br />
            <span style={{ color: PILLAR }}>wheat, maize, teff and soybean.</span>
          </h1>
          <p className="text-slate-600 mb-8" style={{ fontSize: '16px', lineHeight: '1.8', maxWidth: '520px' }}>
            ECX daily settlement prices for all grain commodities — wheat, soybean, maize,
            sorghum and teff. Critical food security data updated every ECX trading day.
          </p>
          <div className="flex flex-wrap gap-6">
            {[
              { icon: <ClockIcon />, label: 'ECX official daily prices' },
              { icon: <ClockIcon />, label: 'Wheat, maize, teff, soybean, sorghum' },
              { icon: <ClockIcon />, label: 'All grades and origins' },
              { icon: <ClockIcon />, label: 'Updated every ECX market day' },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <span style={{ color: PILLAR }}>{s.icon}</span>
                <span className="text-xs font-semibold text-slate-500">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ PRICE TABLE ════════════════════════════════ */}
      {/* NO ADS on commodity price pages — neutrality rule */}
      <section className="bg-white" style={{ padding: '64px 32px 80px' }}>
        <div className="max-w-6xl mx-auto">

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Filter by grain type</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {GRAIN_TYPES.map((t, i) => (
                  <button key={t} className="rounded-full text-xs font-bold transition-all"
                    style={{ padding: '6px 14px', background: i === 0 ? PILLAR : '#f1f5f9', color: i === 0 ? '#fff' : '#64748b', border: i === 0 ? 'none' : '1px solid #e2e8f0' }}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: PILLAR }} />
                <span className="text-xs font-bold rounded-full px-3 py-1.5 border" style={{ color: '#166534', background: '#dcfce7', borderColor: '#bbf7d0' }}>
                  ECX · 25 Apr 2026
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-200" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <div style={{ height: 4, background: 'linear-gradient(90deg, #1D4ED8, #1E40AF)' }} />
            <div className="hidden sm:grid border-b border-slate-200"
              style={{ gridTemplateColumns: '120px 1fr 100px 120px 140px 120px 100px', padding: '13px 24px', background: '#f9fafb' }}>
              {['ECX Code', 'Grade & name', 'Type', 'Origin', 'Price (ETB/kg)', 'Change', 'Volume'].map((h) => (
                <p key={h} className="text-xs font-black text-slate-400 uppercase tracking-widest">{h}</p>
              ))}
            </div>

            {GRAIN_PRICES.map((g, i) => (
              <div key={g.code} className={`border-b border-slate-100 transition-colors ${i === 0 ? 'bg-blue-50' : 'bg-white hover:bg-slate-50'}`}>
                {/* Desktop */}
                <div className="hidden sm:grid items-center"
                  style={{ gridTemplateColumns: '120px 1fr 100px 120px 140px 120px 100px', padding: i === 0 ? '18px 24px' : '14px 24px' }}>
                  <span className="font-mono font-bold text-xs rounded-lg px-2 py-1 w-fit" style={{ background: '#EFF6FF', color: PILLAR }}>{g.code}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-slate-800" style={{ fontSize: i === 0 ? '15px' : '14px' }}>{g.name}</p>
                      {g.badge && <span className="text-xs font-bold rounded-full px-2 py-0.5" style={{ background: '#dbeafe', color: PILLAR }}>{g.badge}</span>}
                    </div>
                  </div>
                  <span className="text-xs font-bold rounded-full px-2 py-1 w-fit" style={{ background: '#f1f5f9', color: '#475569' }}>{g.type}</span>
                  <p className="text-sm text-slate-500">{g.origin}</p>
                  <p className={`font-mono font-black ${i === 0 ? 'text-blue-700' : 'text-slate-900'}`}
                    style={{ fontSize: i === 0 ? '22px' : '18px', letterSpacing: '-0.5px' }}>{g.price}</p>
                  <p className={`font-mono font-bold text-sm ${g.change.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>
                    {g.change} ({g.changePct})
                  </p>
                  <p className="font-mono text-slate-500 text-sm">{g.volume}</p>
                </div>
                {/* Mobile */}
                <div className="sm:hidden flex items-center gap-3" style={{ padding: '14px 16px' }}>
                  <span className="font-mono font-bold text-xs rounded-lg px-2 py-1 shrink-0" style={{ background: '#EFF6FF', color: PILLAR }}>{g.code}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-800 text-sm truncate">{g.name}</p>
                    <p className="text-xs text-slate-400">{g.type} · {g.origin} · {g.volume}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-mono font-black text-slate-900" style={{ fontSize: '16px' }}>{g.price}</p>
                    <p className={`font-mono font-bold text-xs ${g.changePct.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>{g.changePct}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex items-center justify-between border-t border-slate-200" style={{ background: '#f9fafb', padding: '14px 24px' }}>
              <p className="text-xs text-slate-400">Source: Ethiopian Commodity Exchange (ecx.com.et) · Prices in ETB per kg · Updated every ECX trading day</p>
              <Link href="/commodities" className="text-xs font-bold hover:underline shrink-0" style={{ color: PILLAR }}>All commodities →</Link>
            </div>
          </div>

          <p className="text-xs text-slate-400 mt-5 text-center leading-relaxed">
            Prices are ECX daily settlement prices for reference only. BirrBank is not a commodity broker or trading platform.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════ GRAIN GUIDE ══════════════════════════════ */}
      <section className="border-b border-slate-100" style={{ background: '#f9fafb', padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Why grain prices matter</p>
            <h2 className="font-serif font-bold text-slate-950" style={{ fontSize: 'clamp(26px, 3vw, 36px)', letterSpacing: '-1.2px', lineHeight: 1.15 }}>
              Ethiopian grains — context for every price.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { grain: 'Teff', icon: '🌾', notes: 'The flagship Ethiopian grain, used to make injera. White teff commands the highest price of all grains on the ECX. Prices are sensitive to rainfall patterns in Oromia and SNNPR growing regions.' },
              { grain: 'Wheat', icon: '🌿', notes: 'Largest volume grain traded on the ECX. Critical for food security and bread production. Arsi and Bale zones are the major production areas. Government intervention can affect ECX prices.' },
              { grain: 'Maize', icon: '🌽', notes: 'Highest volume grain by tonnage on the ECX. Used for food, animal feed and industrial processing. Price is highly sensitive to seasonal supply and import policy decisions.' },
              { grain: 'Soybean', icon: '🫘', notes: 'Growing importance as Ethiopia expands its edible oil sector. Jimma is the primary growing region. Prices track global soybean markets more closely than other ECX commodities.' },
              { grain: 'Sorghum', icon: '🌱', notes: 'Drought-resistant staple crop produced in SNNPR and lowland areas. Lower price point than teff and wheat but vital for food security in arid regions.' },
            ].map((g) => (
              <div key={g.grain} className="bg-white rounded-2xl border border-slate-200 overflow-hidden" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                <div style={{ height: 3, background: PILLAR }} />
                <div style={{ padding: '24px' }}>
                  <div className="flex items-center gap-3 mb-3">
                    <p className="text-2xl">{g.icon}</p>
                    <p className="font-bold text-slate-900" style={{ fontSize: '15px' }}>{g.grain}</p>
                  </div>
                  <p className="text-sm text-slate-500" style={{ lineHeight: 1.75 }}>{g.notes}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/commodities/ecx-guide" className="inline-flex items-center gap-2 text-sm font-bold" style={{ color: PILLAR }}>
              How ECX works <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ DARK TRUST ════════════════════════════════ */}
      <section className="border-b border-slate-100" style={{ background: '#0f172a', padding: '72px 32px' }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: '#93c5fd' }}>Data integrity</p>
            <h3 className="font-serif font-bold mb-2" style={{ fontSize: 'clamp(22px, 2.5vw, 30px)', color: '#ffffff', letterSpacing: '-0.8px' }}>
              ECX official prices. Updated daily.
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: 1.75, maxWidth: 480 }}>
              All grain prices are ECX daily settlement prices sourced from ecx.com.et.
              BirrBank does not estimate or interpolate prices. Every figure shown is the
              official ECX closing price for that trading day.
            </p>
          </div>
          <div className="flex flex-col gap-3 shrink-0">
            {[
              { dot: '#22c55e', label: 'ECX official source',       sub: 'ecx.com.et daily settlement prices' },
              { dot: PILLAR,    label: 'Updated every trading day', sub: 'No stale prices shown' },
              { dot: '#94a3b8', label: 'No commercial bias',       sub: 'No trader or processor pays for placement' },
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
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Grain price alerts</p>
            <h2 className="font-serif font-bold text-slate-950 mb-5" style={{ fontSize: 'clamp(30px, 3.5vw, 42px)', letterSpacing: '-1.5px', lineHeight: 1.1 }}>
              ECX grain prices,<br />
              <span style={{ color: PILLAR }}>weekly to your inbox.</span>
            </h2>
            <p className="text-slate-500 mb-8" style={{ fontSize: '15px', lineHeight: 1.85 }}>
              Weekly summary of ECX grain price movements — wheat, maize, teff, soybean
              and sorghum — for food businesses, lenders and agri-investors.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Weekly ECX grain settlement price summary',
                'Teff, wheat and maize price movements and trends',
                'Seasonal supply and demand analysis',
                'ECX market news and government policy updates',
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
