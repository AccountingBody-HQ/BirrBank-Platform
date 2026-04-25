import Link from 'next/link'
import EmailCapture from '@/components/EmailCapture'
export const dynamic = 'force-dynamic'

const CLAIM_TYPES = [
  {
    type: 'Motor insurance claim',
    href: '/insurance/motor',
    steps: [
      { step: '01', title: 'Stop and secure the scene', body: 'Do not move vehicles unless they are a danger to traffic. Turn on hazard lights. Call the police — a police report is mandatory for all motor claims in Ethiopia regardless of fault.' },
      { step: '02', title: 'Collect evidence at the scene', body: 'Photograph all vehicles, the road, traffic signs and any injuries. Get the name, phone number, licence plate and insurance details of all other parties. Get contact details from any witnesses.' },
      { step: '03', title: 'Get the police report', body: 'Obtain a copy of the police accident report (DA Form). This is required by all insurers. Do not accept a verbal police clearance — get the stamped document.' },
      { step: '04', title: 'Notify your insurer within 48 hours', body: 'Call your insurer claims line within 48 hours of the accident. Provide your policy number, accident date, location and a brief description. Late notification can result in a reduced or rejected claim.' },
      { step: '05', title: 'Submit the claims documents', body: 'Required documents: police report, your driving licence, vehicle registration (Libretto), insurance certificate, repair estimate from an approved garage, and completed claims form from your insurer.' },
      { step: '06', title: 'Vehicle assessment and settlement', body: 'Your insurer will appoint a loss assessor to inspect the vehicle. For third-party claims, the insurer settles directly with the claimant. For comprehensive claims, repair is authorised at an approved garage or a cash settlement is offered.' },
    ],
  },
  {
    type: 'Health insurance claim',
    href: '/insurance/health',
    steps: [
      { step: '01', title: 'Use a network hospital where possible', body: 'Treatment at an in-network hospital is cashless — the insurer pays the hospital directly. Keep your insurance card with you at all times. Confirm the hospital is in-network before admission for planned procedures.' },
      { step: '02', title: 'Get pre-authorisation for planned procedures', body: 'Elective surgery, specialist referrals and high-cost diagnostics require pre-authorisation from your insurer. Call the claims line before the procedure. Emergency treatment does not require pre-authorisation.' },
      { step: '03', title: 'Collect all receipts and documents', body: 'For reimbursement claims, keep all original receipts, prescription records, lab reports and the treating doctor notes. Copies are not accepted by most Ethiopian insurers — originals are required.' },
      { step: '04', title: 'Submit within the claims window', body: 'Most health insurance policies in Ethiopia require claims to be submitted within 90 days of treatment. Submit the completed claims form with all original documents to your insurer branch or via the designated email.' },
      { step: '05', title: 'Track your claim status', body: 'Get a claim reference number when you submit. Most insurers process health claims within 15 to 30 working days. Follow up if you have not received a response within that window.' },
    ],
  },
  {
    type: 'Life insurance claim',
    href: '/insurance/life',
    steps: [
      { step: '01', title: 'Notify the insurer promptly', body: 'Contact the insurer as soon as possible after the death of the policyholder. Most policies require notification within 30 days. The insurer will provide a claims pack with all required documents.' },
      { step: '02', title: 'Obtain the death certificate', body: 'A certified copy of the death certificate from the kebele or woreda administration is required. If death occurred in hospital, get the hospital death certificate as well. Both may be required.' },
      { step: '03', title: 'Prepare the claims documents', body: 'Required documents typically include: original policy document, certified death certificate, national ID of the deceased and the beneficiary, and a completed claims form. Additional documents may be required for accidental death.' },
      { step: '04', title: 'Submit and await assessment', body: 'Submit all original documents to the insurer. The insurer will assess the claim and may appoint an investigator for large claims or suspicious circumstances. Standard claims are settled within 30 to 60 days.' },
    ],
  },
]

const DOCUMENT_CHECKLIST = [
  { category: 'Motor claims',  docs: ['Police accident report (DA Form)', 'Driving licence', 'Vehicle registration (Libretto)', 'Insurance certificate', 'Repair estimate from approved garage', 'Completed claims form', 'Photos of damage'] },
  { category: 'Health claims', docs: ['Completed claims form', 'Original medical receipts', 'Prescription records', 'Lab and diagnostic reports', 'Treating doctor notes', 'Hospital admission and discharge summary', 'Insurance card copy'] },
  { category: 'Life claims',   docs: ['Original policy document', 'Certified death certificate', 'Hospital death certificate (if applicable)', 'National ID of deceased', 'National ID of beneficiary', 'Completed claims form', 'Beneficiary bank account details'] },
]

const ArrowRight = ({ size = 13 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)

const PILLAR = '#1D4ED8'

export default function ClaimsGuidePage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ══════════════════════════════ HERO ══════════════════════════════════════ */}
      <section className="relative bg-white overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 900px 500px at 55% -80px, rgba(29,78,216,0.04) 0%, transparent 65%)' }} />
        <div className="relative max-w-6xl mx-auto px-8 pt-20 pb-14">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-6">
            <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
            <span>›</span>
            <Link href="/insurance" className="hover:text-slate-600 transition-colors">Insurance</Link>
            <span>›</span>
            <span style={{ color: PILLAR, fontWeight: 700 }}>Claims Guide</span>
          </div>
          <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: PILLAR }}>Insurance · Claims</p>
          <h1 className="font-serif font-bold mb-5 text-slate-950" style={{ fontSize: 'clamp(36px, 4.5vw, 54px)', letterSpacing: '-1.8px', lineHeight: 1.08 }}>
            How to make an insurance claim<br />
            <span style={{ color: PILLAR }}>in Ethiopia — step by step.</span>
          </h1>
          <p className="text-slate-600 mb-8" style={{ fontSize: '16px', lineHeight: '1.8', maxWidth: '520px' }}>
            Motor, health and life insurance claims — exactly what to do, what documents
            to collect and how to avoid common mistakes that delay or reduce your payout.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="#motor" className="font-bold rounded-full transition-all"
              style={{ fontSize: 15, padding: '14px 32px', background: PILLAR, color: '#fff', boxShadow: '0 4px 20px rgba(29,78,216,0.20)' }}>
              Motor claims
            </Link>
            <Link href="#health" className="font-bold rounded-full transition-all"
              style={{ fontSize: 15, padding: '14px 32px', border: '2px solid #1D4ED8', color: PILLAR, background: 'transparent' }}>
              Health claims
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ CLAIM TYPE STEPS ══════════════════════════ */}
      {CLAIM_TYPES.map((ct, ci) => (
        <section
          key={ct.type}
          id={ct.type.split(' ')[0].toLowerCase()}
          className="border-b border-slate-100"
          style={{ background: ci % 2 === 0 ? '#ffffff' : '#f9fafb', padding: '96px 32px' }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Step by step</p>
                <h2 className="font-serif font-bold text-slate-950" style={{ fontSize: 'clamp(26px, 3vw, 36px)', letterSpacing: '-1.2px', lineHeight: 1.15 }}>
                  {ct.type}
                </h2>
              </div>
              <Link href={ct.href} className="inline-flex items-center gap-2 text-sm font-bold shrink-0" style={{ color: PILLAR }}>
                Compare {ct.type.split(' ')[0].toLowerCase()} products <ArrowRight />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {ct.steps.map((s) => (
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
      ))}

      {/* ══════════════════════════════ DOCUMENT CHECKLIST ════════════════════════ */}
      <section className="border-b border-slate-100" style={{ background: '#f9fafb', padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Document checklist</p>
            <h2 className="font-serif font-bold text-slate-950" style={{ fontSize: 'clamp(26px, 3vw, 36px)', letterSpacing: '-1.2px', lineHeight: 1.15 }}>
              Documents required for each claim type.
            </h2>
            <p className="text-slate-500 mt-3" style={{ fontSize: '15px', lineHeight: 1.75, maxWidth: 520 }}>
              Missing documents are the most common reason for delayed or rejected claims.
              Use this checklist before submitting.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {DOCUMENT_CHECKLIST.map((cat) => (
              <div key={cat.category} className="bg-white rounded-2xl border border-slate-200 overflow-hidden" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                <div style={{ height: 3, background: PILLAR }} />
                <div style={{ padding: '28px 24px' }}>
                  <p className="font-bold text-slate-900 mb-5" style={{ fontSize: '15px' }}>{cat.category}</p>
                  <ul className="space-y-2.5">
                    {cat.docs.map((doc) => (
                      <li key={doc} className="flex items-start gap-2.5 text-sm text-slate-600">
                        <div className="w-4 h-4 rounded border-2 shrink-0 mt-0.5" style={{ borderColor: PILLAR }} />
                        {doc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ TIPS ══════════════════════════════════════ */}
      <section className="border-b border-slate-100 bg-white" style={{ padding: '96px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Common mistakes</p>
            <h2 className="font-serif font-bold text-slate-950" style={{ fontSize: 'clamp(26px, 3vw, 36px)', letterSpacing: '-1.2px', lineHeight: 1.15 }}>
              Why claims get delayed or rejected in Ethiopia.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { title: 'Late notification', body: 'Most policies require notification within 48 hours for motor claims and 30 days for life claims. Missing this window gives the insurer grounds to reduce or reject your claim. Always notify immediately.' },
              { title: 'Missing original documents', body: 'Ethiopian insurers require original documents — not photocopies or scanned PDFs. For health claims especially, keep all original receipts from the moment of treatment.' },
              { title: 'Moving the vehicle before police arrival', body: 'Moving vehicles after a motor accident before the police arrive and document the scene can void your claim. Wait for the police unless the vehicle is a danger to other road users.' },
              { title: 'Using a non-approved garage', body: 'For motor comprehensive claims, repairs must be done at an insurer-approved garage. Using your own mechanic without approval means the insurer can refuse to pay the repair costs.' },
            ].map((tip) => (
              <div key={tip.title} className="bg-white rounded-2xl border border-slate-200 overflow-hidden" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                <div style={{ height: 3, background: '#ef4444' }} />
                <div style={{ padding: '24px 28px' }}>
                  <p className="font-bold text-slate-900 mb-2" style={{ fontSize: '15px' }}>{tip.title}</p>
                  <p className="text-sm text-slate-500" style={{ lineHeight: 1.8 }}>{tip.body}</p>
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
            <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: '#93c5fd' }}>About this guide</p>
            <h3 className="font-serif font-bold mb-2" style={{ fontSize: 'clamp(22px, 2.5vw, 30px)', color: '#ffffff', letterSpacing: '-0.8px' }}>
              Information only — not legal advice.
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: 1.75, maxWidth: 480 }}>
              This guide is based on standard practice across NBE-licensed insurers in Ethiopia.
              Individual policy terms vary. Always read your policy document and contact your
              insurer directly for claim-specific guidance. BirrBank is not a legal or insurance adviser.
            </p>
          </div>
          <div className="flex flex-col gap-3 shrink-0">
            {[
              { dot: '#22c55e', label: 'Based on NBE-licensed insurer practice', sub: 'Researched from official insurer documents' },
              { dot: PILLAR,    label: 'Updated quarterly',                       sub: 'Reviewed when policy terms change' },
              { dot: '#94a3b8', label: 'Not legal advice',                       sub: 'Always verify with your own insurer' },
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
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Insurance alerts</p>
            <h2 className="font-serif font-bold text-slate-950 mb-5" style={{ fontSize: 'clamp(30px, 3.5vw, 42px)', letterSpacing: '-1.5px', lineHeight: 1.1 }}>
              Policy changes and new products,<br />
              <span style={{ color: PILLAR }}>direct to your inbox.</span>
            </h2>
            <p className="text-slate-500 mb-8" style={{ fontSize: '15px', lineHeight: 1.85 }}>
              Get notified when insurers update their claims processes, when NBE changes
              mandatory cover requirements, or when new insurance products launch.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Claims process updates from all 18 NBE-licensed insurers',
                'New motor, health and life product launches',
                'NBE insurance regulation and directive changes',
                'Mandatory cover requirement updates',
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
