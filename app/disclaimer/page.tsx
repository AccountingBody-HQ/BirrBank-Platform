import Link from 'next/link'

export const metadata = {
  title: 'Disclaimer — BirrBank',
  description: 'Data accuracy disclaimer and limitation of liability for BirrBank.com.',
}

export default function DisclaimerPage() {
  return (
    <main className="bg-white flex-1">

      {/* HERO */}
      <section className="relative overflow-hidden" style={{background:"#0f172a"}}>
        <div className="absolute inset-0" style={{background: 'radial-gradient(ellipse at 60% 0%, rgba(29,78,216,0.18) 0%, transparent 60%)'}} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-20">
          <div className="max-w-3xl">
            <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6">
              <a href="/" className="hover:text-slate-200 transition-colors">Home</a>
              <span>›</span>
              <span className="text-slate-300">Disclaimer</span>
            </nav>
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8" style={{background:"rgba(29,78,216,0.15)",border:"1px solid rgba(29,78,216,0.3)"}}>
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <span className="text-blue-300 text-xs font-semibold tracking-wide">Legal</span>
            </div>
            <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white leading-[1.08] mb-6" style={{letterSpacing: '-0.025em'}}>
              Disclaimer
            </h1>
            <p className="text-slate-400 text-sm">Last updated: April 2026</p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <div className="grid lg:grid-cols-4 gap-16">

            {/* Sticky nav */}
            <div className="hidden lg:block">
              <div className="sticky top-8 space-y-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Contents</p>
                {[
                  ['#not-professional-advice', 'Not professional advice'],
                  ['#data-accuracy',           'Data accuracy'],
                  ['#rate-changes',            'Rate changes'],
                  ['#jurisdictional-variation','Jurisdictional variation'],
                  ['#no-liability',            'No liability'],
                  ['#corrections',             'Corrections'],
                  ['#professional-advice',     'Seek professional advice'],
                ].map(([href, label]) => (
                  <a key={href} href={href} className="block text-sm text-slate-500 hover:text-blue-600 py-1 transition-colors">
                    {label}
                  </a>
                ))}
              </div>
            </div>

            {/* Body */}
            <div className="lg:col-span-3 prose prose-slate max-w-none">

              {/* Prominent warning box */}
              <div className="bg-amber-50 border border-amber-300 rounded-2xl p-6 mb-12 not-prose">
                <p className="text-amber-900 font-bold text-sm mb-2">Important — please read</p>
                <p className="text-amber-800 text-sm leading-relaxed">
                  BirrBank is a research and reference platform. The data, rates, and guides on this site are provided for informational purposes only. They do not constitute professional financial, investment, insurance, tax, or legal advice. Always consult a qualified professional before making decisions based on this data.
                </p>
              </div>

              <h2 id="not-professional-advice">1. Not professional advice</h2>
              <p>The information on BirrBank.com — including savings rates, FX rates, insurance premiums, ESX market data, ECX commodity prices, and all other content — is provided for general informational and reference purposes only.</p>
              <p>This information does not constitute and must not be relied upon as professional financial advice, investment advice, insurance advice, tax advice, or any other form of professional advice. No adviser-client relationship is created by your use of this platform.</p>

              <h2 id="data-accuracy">2. Data accuracy</h2>
              <p>We invest significant effort in sourcing, verifying, and maintaining the data on this platform. All data is sourced directly from official publications — NBE circulars, ECX settlement reports, ESX end-of-day files, and official insurer and institution websites.</p>
              <p>Despite these efforts, we cannot guarantee that all data on this platform is accurate, complete, or current at any given moment. Financial data changes frequently, and varies significantly depending on individual circumstances.</p>
              <p>Data on this platform may contain errors, omissions, or inaccuracies. We are not responsible for any consequences arising from reliance on inaccurate data.</p>

              <h2 id="rate-changes">3. Rate and threshold changes</h2>
              <p>Tax rates, social security contribution rates, minimum wages, and other payroll thresholds change regularly — sometimes mid-year following budget announcements or emergency legislation. There may be a period between a change being announced and our data being updated.</p>
              <p>You should always verify current rates directly with the relevant government authority or tax agency before relying on them for payroll purposes.</p>

              <h2 id="jurisdictional-variation">4. Jurisdictional and circumstantial variation</h2>
              <p>Payroll rules and tax obligations frequently vary by:</p>
              <ul>
                <li>Employment category (employee vs worker vs contractor)</li>
                <li>Industry sector</li>
                <li>Company size</li>
                <li>Region or state within a country</li>
                <li>Individual circumstances (residency status, age, disability, pension membership)</li>
                <li>Collective agreements and union contracts</li>
              </ul>
              <p>The data on this platform represents general national-level rules. It may not reflect the specific rules that apply to your situation. Always consider individual circumstances when applying this data.</p>

              <h2 id="no-liability">5. Limitation of liability</h2>
              <p>BirrBank.com and AccountingBody HQ expressly disclaim all liability for any loss, damage, cost, or expense — whether direct, indirect, consequential, or otherwise — arising from:</p>
              <ul>
                <li>Reliance on any data, calculation, or information provided on this platform</li>
                <li>Errors, omissions, or inaccuracies in platform data</li>
                <li>Changes in financial data, rates, or regulations that have not yet been reflected in the platform</li>
                <li>The application of general data to specific individual or business circumstances</li>
                <li>Any financial, investment, insurance, or compliance decision made using this platform</li>
              </ul>
              <p>This disclaimer does not exclude liability for death or personal injury caused by negligence, or any other liability that cannot be excluded under applicable law.</p>

              <h2 id="corrections">6. Reporting data errors</h2>
              <p>We take data quality seriously. If you believe any data on this platform is incorrect, out of date, or misleading, please <Link href="/contact">report it using our data correction form</Link>. We review all correction requests and verify them against official sources before updating.</p>
              <p>Reporting a potential error does not create any liability on our part for any period during which the data may have been inaccurate.</p>

              <h2 id="professional-advice">7. Seek qualified professional advice</h2>
              <p>For any payroll, tax, employment law, or compliance decision — particularly one with significant financial or legal consequences — you should seek advice from a qualified professional in the relevant jurisdiction, such as:</p>
              <ul>
                <li>A qualified financial adviser or investment broker</li>
                <li>A chartered accountant or tax adviser</li>
                <li>An insurance professional or actuary</li>
                <li>An ECMA-licensed securities broker</li>
                <li>The NBE, ECMA, ECX or ESX directly</li>
              </ul>
              <p>BirrBank is a starting point for research — not a substitute for expert advice.</p>

              <hr />
              <p>Questions about this disclaimer? <Link href="/contact">Contact us</Link>. For our full terms of service, see the <Link href="/terms">Terms of Service</Link>.</p>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
