'use client'
import { useState, useEffect } from 'react'

const PILLARS = [
  { key: 'banking',      label: 'Banking',       color: '#1D4ED8' },
  { key: 'insurance',    label: 'Insurance',      color: '#8b5cf6' },
  { key: 'markets',      label: 'Markets',        color: '#22c55e' },
  { key: 'commodities',  label: 'Commodities',    color: '#f59e0b' },
  { key: 'regulations',  label: 'Regulations',    color: '#ef4444' },
  { key: 'diaspora',     label: 'Diaspora',       color: '#06b6d4' },
  { key: 'intelligence', label: 'Intelligence',   color: '#f97316' },
]

const CONTENT_TYPES: Record<string, { label: string; pillars: string[] }> = {
  bank_review:         { label: 'Bank Review',          pillars: ['banking']                          },
  rate_guide:          { label: 'Rate Guide',            pillars: ['banking']                          },
  insurance_guide:     { label: 'Insurance Guide',       pillars: ['insurance']                        },
  market_analysis:     { label: 'Market Analysis',       pillars: ['markets']                          },
  commodity_report:    { label: 'Commodity Report',      pillars: ['commodities']                      },
  ipo_guide:           { label: 'IPO Guide',             pillars: ['markets']                          },
  diaspora_guide:      { label: 'Diaspora Guide',        pillars: ['diaspora']                         },
  regulatory_update:   { label: 'Regulatory Update',     pillars: ['regulations']                      },
  investment_guide:    { label: 'Investment Guide',      pillars: ['markets', 'banking']               },
  loan_guide:          { label: 'Loan Guide',            pillars: ['banking']                          },
  fx_guide:            { label: 'FX Guide',              pillars: ['banking', 'diaspora']              },
  savings_guide:       { label: 'Savings Guide',         pillars: ['banking']                          },
  ecx_guide:           { label: 'ECX Guide',             pillars: ['commodities']                      },
  esx_guide:           { label: 'ESX Guide',             pillars: ['markets']                          },
  financial_explainer: { label: 'Financial Explainer',   pillars: ['banking','insurance','markets','commodities','regulations','diaspora','intelligence'] },
}

const LENGTHS = [
  { key: 'short',    label: 'Short',    sub: '500-650 words'   },
  { key: 'standard', label: 'Standard', sub: '900-1100 words'  },
  { key: 'deep',     label: 'Deep',     sub: '1800-2200 words' },
]

function wordCount(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length
}

function Loader() {
  return (
    <div className="space-y-3 animate-pulse">
      {[...Array(4)].map((_,i) => <div key={i} className="h-14 rounded-xl" style={{ background: '#0d1424' }} />)}
    </div>
  )
}

export default function ContentFactoryPage() {
  const [pillar,      setPillar]      = useState('banking')
  const [contentType, setContentType] = useState('bank_review')
  const [topic,       setTopic]       = useState('')
  const [institution, setInstitution] = useState('')
  const [length,      setLength]      = useState('standard')
  const [generating,  setGenerating]  = useState(false)
  const [saving,      setSaving]      = useState(false)
  const [msg,         setMsg]         = useState('')
  const [result,      setResult]      = useState<any>(null)
  const [institutions, setInstitutions] = useState<any[]>([])
  const [guides,      setGuides]      = useState<any[]>([])
  const [loadingGuides, setLoadingGuides] = useState(true)
  const [tab,         setTab]         = useState(0)

  // Load institutions for dropdown
  useEffect(() => {
    fetch('/api/birrbank-institutions')
      .then(r => r.json())
      .then(d => setInstitutions(d.institutions ?? []))
  }, [])

  // Load existing guides
  const loadGuides = () => {
    setLoadingGuides(true)
    fetch('/api/birrbank-institutions') // reuse institutions endpoint for now
      .then(() => setLoadingGuides(false))
  }

  useEffect(() => { loadGuides() }, [])

  // Filter content types to current pillar
  const availableTypes = Object.entries(CONTENT_TYPES).filter(([, v]) =>
    v.pillars.includes(pillar)
  )

  // Reset content type when pillar changes
  function handlePillarChange(p: string) {
    setPillar(p)
    const available = Object.entries(CONTENT_TYPES).filter(([, v]) => v.pillars.includes(p))
    if (available.length > 0) setContentType(available[0][0])
  }

  async function generate() {
    if (!topic.trim()) { setMsg('Topic is required.'); return }
    setGenerating(true); setResult(null); setMsg('')
    const res = await fetch('/api/birrbank-content-factory', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'generate',
        pillar,
        contentType,
        topic: topic.trim(),
        institutionName: institution || undefined,
        length,
      }),
    })
    const d = await res.json()
    setGenerating(false)
    if (d.ok) setResult(d)
    else setMsg('Error: ' + d.error)
  }

  async function saveGuide() {
    if (!result) return
    setSaving(true); setMsg('')
    const inst = institutions.find((i: any) => i.name === institution || i.slug === institution)
    const res = await fetch('/api/birrbank-content-factory', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'save_guide',
        title: result.title,
        pillar,
        contentType,
        body: result.content,
        summary: result.summary,
        keywords: result.keywords,
        institutionSlug: inst?.slug || null,
      }),
    })
    const d = await res.json()
    setSaving(false)
    if (d.ok) { setMsg('Guide saved to Supabase guides table. Slug: ' + d.slug); setResult(null); setTopic('') }
    else setMsg('Error: ' + d.error)
  }

  const pillarColor = PILLARS.find(p => p.key === pillar)?.color ?? '#1D4ED8'

  return (
    <div style={{ padding: '32px', minHeight: '100vh', background: '#080d1a' }}>

      <div className="mb-8">
        <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: '#1D4ED8' }}>BirrBank Admin</p>
        <h1 className="font-bold text-white mb-1" style={{ fontSize: '28px', letterSpacing: '-0.5px' }}>Content Factory</h1>
        <p style={{ color: '#475569', fontSize: '14px' }}>
          AI-powered guide and article generation for all 5 pillars. 15 content types. Saves directly to the Supabase guides table.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 p-1 rounded-xl" style={{ background: '#0d1424', border: '1px solid #1a2238', width: 'fit-content' }}>
        {['Generate', 'Recent Guides'].map((t, i) => (
          <button key={t} onClick={() => setTab(i)}
            className="font-bold rounded-lg text-sm transition-all"
            style={{ padding: '8px 20px', background: tab === i ? '#1D4ED8' : 'transparent', color: tab === i ? '#fff' : '#475569' }}>
            {t}
          </button>
        ))}
      </div>

      {tab === 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Config panel */}
          <div className="space-y-5">

            {msg && (
              <div className="rounded-xl px-4 py-3 text-sm font-semibold"
                style={{ background: msg.startsWith('Error') ? 'rgba(239,68,68,0.1)' : 'rgba(34,197,94,0.1)', color: msg.startsWith('Error') ? '#ef4444' : '#22c55e', border: '1px solid ' + (msg.startsWith('Error') ? 'rgba(239,68,68,0.2)' : 'rgba(34,197,94,0.2)') }}>
                {msg}
              </div>
            )}

            {/* Pillar */}
            <div className="rounded-2xl" style={{ background: '#0d1424', border: '1px solid #1a2238', padding: '20px' }}>
              <p style={{ color: '#475569', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>Pillar</p>
              <div className="grid grid-cols-2 gap-1.5">
                {PILLARS.map(p => (
                  <button key={p.key} onClick={() => handlePillarChange(p.key)}
                    className="rounded-lg text-xs font-bold text-left px-3 py-2 transition-all"
                    style={{
                      background: pillar === p.key ? p.color + '20' : 'transparent',
                      color: pillar === p.key ? p.color : '#475569',
                      border: '1px solid ' + (pillar === p.key ? p.color + '60' : '#1a2238'),
                    }}>
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Content type */}
            <div className="rounded-2xl" style={{ background: '#0d1424', border: '1px solid #1a2238', padding: '20px' }}>
              <p style={{ color: '#475569', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>Content Type</p>
              <div className="space-y-1">
                {availableTypes.map(([key, val]) => (
                  <button key={key} onClick={() => setContentType(key)}
                    className="w-full text-left rounded-lg px-3 py-2 text-xs font-semibold transition-all"
                    style={{
                      background: contentType === key ? pillarColor + '15' : 'transparent',
                      color: contentType === key ? pillarColor : '#475569',
                      borderLeft: contentType === key ? '2px solid ' + pillarColor : '2px solid transparent',
                    }}>
                    {val.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Length */}
            <div className="rounded-2xl" style={{ background: '#0d1424', border: '1px solid #1a2238', padding: '20px' }}>
              <p style={{ color: '#475569', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>Length</p>
              <div className="grid grid-cols-3 gap-1.5">
                {LENGTHS.map(l => (
                  <button key={l.key} onClick={() => setLength(l.key)}
                    className="rounded-lg text-center py-2.5 transition-all"
                    style={{
                      background: length === l.key ? '#1D4ED8' : 'transparent',
                      border: '1px solid ' + (length === l.key ? '#1D4ED8' : '#1a2238'),
                    }}>
                    <p className="text-xs font-bold" style={{ color: length === l.key ? '#fff' : '#475569' }}>{l.label}</p>
                    <p style={{ fontSize: '10px', color: length === l.key ? 'rgba(255,255,255,0.6)' : '#334155' }}>{l.sub}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Topic + output */}
          <div className="lg:col-span-2 space-y-5">

            {/* Topic input */}
            <div className="rounded-2xl" style={{ background: '#0d1424', border: '1px solid #1a2238', padding: '20px 24px' }}>
              <p className="font-bold text-white mb-4" style={{ fontSize: '15px' }}>Article Topic</p>
              <div className="space-y-3">
                <div>
                  <p style={{ color: '#475569', fontSize: '11px', marginBottom: '4px' }}>Topic *</p>
                  <input value={topic} onChange={e => setTopic(e.target.value)}
                    placeholder="e.g. Best savings rates in Ethiopia 2025, How to invest on ESX, Awash Bank full review"
                    className="w-full rounded-xl text-sm text-white"
                    style={{ background: '#080d1a', border: '1px solid #1a2238', padding: '10px 14px', outline: 'none' }} />
                </div>
                <div>
                  <p style={{ color: '#475569', fontSize: '11px', marginBottom: '4px' }}>Institution (optional — for bank/insurer reviews)</p>
                  <select value={institution} onChange={e => setInstitution(e.target.value)}
                    className="w-full rounded-xl text-sm text-white"
                    style={{ background: '#080d1a', border: '1px solid #1a2238', padding: '10px 14px', outline: 'none' }}>
                    <option value="">No specific institution</option>
                    {institutions.map((i: any) => (
                      <option key={i.slug} value={i.name}>{i.name}</option>
                    ))}
                  </select>
                </div>
                <button onClick={generate} disabled={generating || !topic.trim()}
                  className="w-full font-bold rounded-xl text-sm transition-all"
                  style={{
                    background: topic.trim() ? pillarColor : '#1a2238',
                    color: topic.trim() ? '#fff' : '#334155',
                    padding: '11px 24px',
                    opacity: generating ? 0.7 : 1,
                  }}>
                  {generating ? 'Generating article...' : 'Generate Article'}
                </button>
              </div>
            </div>

            {generating && (
              <div className="rounded-2xl p-8 text-center" style={{ background: '#0d1424', border: '1px solid #1a2238' }}>
                <div className="w-8 h-8 rounded-full border-2 border-t-transparent mx-auto mb-3 animate-spin"
                  style={{ borderColor: pillarColor, borderTopColor: 'transparent' }} />
                <p style={{ color: '#475569', fontSize: '13px' }}>AI is writing your article...</p>
                <p style={{ color: '#334155', fontSize: '11px', marginTop: '4px' }}>This may take 30-60 seconds</p>
              </div>
            )}

            {result && !generating && (
              <div className="space-y-4">
                {/* Stats bar */}
                <div className="rounded-xl px-4 py-3 flex items-center justify-between" style={{ background: '#0d1424', border: '1px solid rgba(34,197,94,0.2)' }}>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span className="text-xs font-bold" style={{ color: '#22c55e' }}>Generated</span>
                    </div>
                    <span style={{ color: '#334155', fontSize: '12px' }}>{wordCount(result.content)} words</span>
                    <span style={{ color: '#334155', fontSize: '12px' }}>{result.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={saveGuide} disabled={saving}
                      className="font-bold rounded-lg text-xs"
                      style={{ background: '#22c55e', color: '#fff', padding: '6px 14px', opacity: saving ? 0.6 : 1 }}>
                      {saving ? 'Saving...' : 'Save to Supabase'}
                    </button>
                    <button onClick={() => { setResult(null); setTopic('') }}
                      className="font-bold rounded-lg text-xs"
                      style={{ background: '#1a2238', color: '#64748b', padding: '6px 12px' }}>
                      Discard
                    </button>
                  </div>
                </div>

                {/* Article preview */}
                <div className="rounded-2xl" style={{ background: '#0d1424', border: '1px solid #1a2238', padding: '24px', maxHeight: '600px', overflowY: 'auto' }}>
                  <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed" style={{ color: '#94a3b8' }}>
                    {result.content}
                  </pre>
                </div>

                {/* Summary + keywords */}
                {(result.summary || result.keywords) && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {result.summary && (
                      <div className="rounded-xl p-3" style={{ background: '#0d1424', border: '1px solid #1a2238' }}>
                        <p style={{ color: '#475569', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>Search Summary</p>
                        <p style={{ color: '#64748b', fontSize: '12px', lineHeight: 1.6 }}>{result.summary}</p>
                      </div>
                    )}
                    {result.keywords && (
                      <div className="rounded-xl p-3" style={{ background: '#0d1424', border: '1px solid #1a2238' }}>
                        <p style={{ color: '#475569', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>Keywords</p>
                        <div className="flex flex-wrap gap-1.5">
                          {result.keywords.split(',').map((k: string) => (
                            <span key={k} className="text-xs font-semibold px-2 py-0.5 rounded"
                              style={{ background: 'rgba(29,78,216,0.1)', color: '#1D4ED8' }}>
                              {k.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {tab === 1 && (
        <div className="rounded-2xl" style={{ background: '#0d1424', border: '1px solid #1a2238', padding: '24px' }}>
          <p className="font-bold text-white mb-2" style={{ fontSize: '15px' }}>Recent Guides</p>
          <p style={{ color: '#475569', fontSize: '13px' }}>
            Guides saved from Content Factory appear in the Supabase <span className="font-mono" style={{ color: '#1D4ED8' }}>birrbank.guides</span> table
            and are served on the public <a href="/guides" target="_blank" style={{ color: '#1D4ED8' }}>/guides</a> page.
          </p>
        </div>
      )}
    </div>
  )
}
