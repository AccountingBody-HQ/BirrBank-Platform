import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service — BirrBank',
  description: 'Terms and conditions for using BirrBank.com.',
}

export default function TermsPage() {
  return (
    <main className="bg-white flex-1">
      <section className="relative overflow-hidden" style={{ background:'#0f172a' }}>
        <div className="absolute inset-0" style={{ background:'radial-gradient(ellipse at 60% 0%, rgba(29,78,216,0.18) 0%, transparent 60%)' }} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-20">
          <div className="max-w-3xl">
            <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6">
              <Link href="/" className="hover:text-slate-200 transition-colors">Home</Link>
              <span>›</span>
              <span className="text-slate-300">Terms of Service</span>
            </nav>
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8"
              style={{ background:'rgba(29,78,216,0.15)', border:'1px solid rgba(29,78,216,0.3)' }}>
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <span className="text-blue-300 text-xs font-semibold tracking-wide">Legal</span>
            </div>
            <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white leading-[1.08] mb-6" style={{ letterSpacing:'-0.025em' }}>
              Terms of Service
            </h1>
            <p className="text-slate-400 text-sm">Last updated: April 2026</p>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <div className="grid lg:grid-cols-4 gap-16">
            <div className="hidden lg:block">
              <div className="sticky top-8 space-y-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Contents</p>
                {[
                  ['#acceptance',            'Acceptance'],
                  ['#the-platform',          'The platform'],
                  ['#accounts',              'Accounts'],
                  ['#acceptable-use',        'Acceptable use'],
                  ['#data-accuracy',         'Data accuracy'],
                  ['#intellectual-property', 'Intellectual property'],
                  ['#liability',             'Liability'],
                  ['#termination',           'Termination'],
                  ['#changes',               'Changes'],
                  ['#governing-law',         'Governing law'],
                ].map(([href, label]) => (
                  <a key={href} href={href} className="block text-sm text-slate-500 hover:text-blue-600 py-1 transition-colors">{label}</a>
                ))}
              </div>
            </div>

            <div className="lg:col-span-3 prose prose-slate max-w-none">
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-12 not-prose">
                <p className="text-blue-800 text-sm leading-relaxed">
                  Please read these Terms of Service carefully before using BirrBank.com. By accessing or using the platform, you agree to be bound by these terms. If you do not agree, please do not use the platform.
                </p>
              </div>

              <h2 id="acceptance">1. Acceptance of terms</h2>
              <p>By accessing BirrBank.com (&quot;the platform&quot;, &quot;we&quot;, &quot;us&quot;), you agree to these Terms of Service and our <Link href="/privacy-policy">Privacy Policy</Link>. These terms apply to all users of the platform.</p>

              <h2 id="the-platform">2. The platform</h2>
              <p>BirrBank is a financial intelligence and reference platform providing Ethiopian financial data — including savings rates, FX rates, insurance premiums, ESX market data, ECX commodity prices, and related tools. The platform is operated by AccountingBody HQ.</p>
              <p>We reserve the right to modify, suspend, or discontinue any part of the platform at any time. We will endeavour to provide reasonable notice of significant changes.</p>

              <h2 id="accounts">3. Accounts</h2>
              <p>Some features require you to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. You must notify us immediately of any unauthorised use of your account.</p>
              <p>You must provide accurate and complete information when creating your account. You must be at least 18 years old to create an account.</p>

              <h2 id="acceptable-use">4. Acceptable use</h2>
              <p>You agree not to use the platform to:</p>
              <ul>
                <li>Scrape, copy, or systematically extract data from the platform without our written permission</li>
                <li>Attempt to gain unauthorised access to any part of the platform or its infrastructure</li>
                <li>Use the platform in any way that violates applicable law or regulation</li>
                <li>Resell, sublicense, or redistribute platform data or content without our written permission</li>
                <li>Use automated tools to access the platform at a rate that disrupts normal service</li>
                <li>Attempt to reverse engineer any part of the platform</li>
              </ul>
              <p>We reserve the right to suspend or terminate accounts that violate these terms without notice.</p>

              <h2 id="data-accuracy">5. Data accuracy and disclaimer</h2>
              <p>We make every reasonable effort to ensure the accuracy of data on the platform. All data is sourced from official publications — NBE circulars, ECX settlement reports, ESX end-of-day files, and official insurer and institution websites.</p>
              <p>However, financial data changes frequently. We cannot guarantee that all data is current or complete at any given time. The platform is a research and reference tool — it is not professional financial, investment, insurance, or legal advice.</p>
              <p>Please read our full <Link href="/disclaimer">Data Accuracy Disclaimer</Link>. You should always verify critical decisions with a qualified professional.</p>

              <h2 id="intellectual-property">6. Intellectual property</h2>
              <p>All content on the platform — including but not limited to the design, layout, text, graphics, and data compilations — is owned by or licensed to AccountingBody HQ and is protected by copyright and other intellectual property laws.</p>
              <p>You may access and use the platform for your own personal or internal business purposes. You may not reproduce, distribute, or create derivative works from platform content without our written permission.</p>
              <p>Underlying financial data (savings rates, FX rates, commodity prices) is sourced from public official publications. Our compilation, structuring, and presentation of that data is our intellectual property.</p>

              <h2 id="liability">7. Limitation of liability</h2>
              <p>To the fullest extent permitted by law, BirrBank and AccountingBody HQ shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the platform or reliance on data provided.</p>
              <p>Nothing in these terms excludes or limits liability for death or personal injury caused by negligence, fraud, or any other liability that cannot be excluded by law.</p>

              <h2 id="termination">8. Termination</h2>
              <p>We may suspend or terminate your account at any time if you breach these terms or if we believe your account is being used fraudulently or in a way that harms other users or the platform.</p>
              <p>You may delete your account at any time from your dashboard. Upon deletion, your personal data will be removed in accordance with our <Link href="/privacy-policy">Privacy Policy</Link>.</p>

              <h2 id="changes">9. Changes to these terms</h2>
              <p>We may update these terms from time to time. We will notify registered users of significant changes by email. Continued use of the platform after changes take effect constitutes acceptance of the updated terms.</p>

              <h2 id="governing-law">10. Governing law</h2>
              <p>These terms are governed by the laws of England and Wales. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of England and Wales.</p>

              <hr />
              <p>If you have any questions about these terms, please <Link href="/contact">contact us</Link>.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
