import Link from "next/link";
import { Twitter, Linkedin, Mail, Droplets } from "lucide-react";

const footerLinks = {
  "Countries": [
    { label: "All Countries",     href: "/countries/" },
    { label: "United Kingdom",    href: "/countries/gb/" },
    { label: "United States",     href: "/countries/us/" },
    { label: "Germany",           href: "/countries/de/" },
    { label: "France",            href: "/countries/fr/" },
    { label: "Singapore",         href: "/countries/sg/" },
    { label: "Compare Countries", href: "/compare/" },
  ],
  "Platform": [
    { label: "EOR Intelligence",  href: "/eor/" },
    { label: "HR Compliance",     href: "/hr-compliance/" },
    { label: "Payroll Tools",     href: "/payroll-tools/" },
    { label: "Insights",          href: "/insights/" },
    { label: "Site Search",       href: "/search/" },
    { label: "AI Assistant",      href: "/ai-assistant/" },
  ],
  "Account": [
    { label: "Pricing",           href: "/pricing/" },
    { label: "Sign Up Free",      href: "/sign-up/" },
    { label: "Sign In",           href: "/sign-in/" },
    { label: "Dashboard",         href: "/dashboard/" },
  ],
  "Company": [
    { label: "About",             href: "/about/" },
    { label: "Contact",           href: "/contact/" },
    { label: "Privacy Policy",    href: "/privacy-policy/" },
    { label: "Terms of Use",      href: "/terms/" },
    { label: "Disclaimer",        href: "/disclaimer/" },
    { label: "Cookie Policy",     href: "/cookie-policy/" },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{backgroundColor: '#020f1f'}} className="text-white">

      {/* Tagline band */}
      <div className="border-b border-white/5">
        <div className="container-hrlake py-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background: 'linear-gradient(135deg, #0369a1 0%, #0d9488 100%)'}}>
                  <Droplets size={17} className="text-white" strokeWidth={2.5} />
                </div>
                <div className="flex items-baseline gap-0">
                  <span className="font-black text-white text-base tracking-tight">HR</span>
                  <span className="font-black text-teal-400 text-base tracking-tight">Lake</span>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                Where global HR knowledge dives deep. Trusted by enterprise HR teams,
                payroll directors, EOR firms, and lawyers worldwide.
              </p>
            </div>
            <div className="lg:max-w-sm w-full">
              <p className="text-xs font-semibold uppercase tracking-widest text-teal-500 mb-2">Stay ahead of changes</p>
              <p className="text-slate-400 text-sm mb-3">Rate changes, new employment laws, compliance alerts — free, once a month.</p>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Your work email"
                  className="flex-1 h-10 px-4 rounded-md bg-white/5 border border-white/10 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-teal-500 transition-colors"
                />
                <button
                  type="submit"
                  className="h-10 px-5 rounded-md text-white text-sm font-semibold transition-all shrink-0 hover:opacity-90"
                  style={{background: 'linear-gradient(135deg, #0369a1 0%, #0d9488 100%)'}}
                >
                  Subscribe
                </button>
              </form>
              <p className="text-xs text-slate-700 mt-2">No spam. Unsubscribe any time.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main links */}
      <div className="container-hrlake py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
                {heading}
              </h4>
              <ul className="space-y-2.5">
                {links.map(({ label, href }) => (
                  <li key={href}>
                    <Link href={href} className="text-sm text-slate-500 hover:text-teal-400 transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="container-hrlake py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <p className="text-xs text-slate-600">&copy; {year} HRLake.com — All rights reserved.</p>
            <div className="flex items-center gap-1">
              <a href="https://twitter.com/hrlake" target="_blank" rel="noopener noreferrer"
                className="w-7 h-7 flex items-center justify-center rounded text-slate-600 hover:text-teal-400 transition-colors" aria-label="Twitter">
                <Twitter size={14} />
              </a>
              <a href="https://linkedin.com/company/hrlake" target="_blank" rel="noopener noreferrer"
                className="w-7 h-7 flex items-center justify-center rounded text-slate-600 hover:text-teal-400 transition-colors" aria-label="LinkedIn">
                <Linkedin size={14} />
              </a>
              <a href="mailto:hello@hrlake.com"
                className="w-7 h-7 flex items-center justify-center rounded text-slate-600 hover:text-teal-400 transition-colors" aria-label="Email">
                <Mail size={14} />
              </a>
            </div>
          </div>
          <p className="text-xs text-slate-700 text-center sm:text-right max-w-md">
            Data is provided for informational purposes only and does not constitute
            professional legal, tax, or payroll advice. Always verify with a qualified adviser.
          </p>
        </div>
      </div>

    </footer>
  );
}
