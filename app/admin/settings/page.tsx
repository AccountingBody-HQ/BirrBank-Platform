import { Settings, Database, Mail, Key, Globe, Shield } from 'lucide-react'

export default function AdminSettingsPage() {
  return (
    <div className="p-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Admin Settings</h1>
        <p className="text-slate-400 text-sm">Platform configuration and environment overview</p>
      </div>

      {/* Environment status */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center gap-3">
          <Key size={16} className="text-blue-400" />
          <h2 className="text-white font-bold">Environment Variables</h2>
          <span className="text-slate-500 text-xs">Vercel production config</span>
        </div>
        <div className="divide-y divide-slate-800">
          {[
            { key: 'NEXT_PUBLIC_SUPABASE_URL',      service: 'Supabase',     required: true },
            { key: 'NEXT_PUBLIC_SUPABASE_ANON_KEY', service: 'Supabase',     required: true },
            { key: 'SUPABASE_SERVICE_ROLE_KEY',     service: 'Supabase',     required: true },
            { key: 'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY', service: 'Clerk',    required: true },
            { key: 'CLERK_SECRET_KEY',              service: 'Clerk',        required: true },
            { key: 'RESEND_API_KEY',                service: 'Resend',       required: true },
            { key: 'ADMIN_EMAIL',                   service: 'Admin',        required: true },
            { key: 'NEXT_PUBLIC_SANITY_PROJECT_ID', service: 'Sanity',       required: true },
            { key: 'NEXT_PUBLIC_SANITY_DATASET',    service: 'Sanity',       required: true },
            { key: 'OPENAI_API_KEY',                service: 'OpenAI',       required: true },
            { key: 'LEMON_SQUEEZY_WEBHOOK_SECRET',  service: 'Lemon Squeezy',required: false },
          ].map(item => (
            <div key={item.key} className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <code className="text-blue-300 text-xs font-mono">{item.key}</code>
                <span className="text-slate-500 text-xs">{item.service}</span>
              </div>
              <div className="flex items-center gap-2">
                {item.required && (
                  <span className="text-xs bg-slate-800 text-slate-400 border border-slate-700 px-2 py-0.5 rounded-full">Required</span>
                )}
                <span className="text-xs text-slate-500">Set in Vercel → Settings → Environment Variables</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Platform info */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">

        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-800 flex items-center gap-3">
            <Database size={16} className="text-teal-400" />
            <h2 className="text-white font-bold">Database</h2>
          </div>
          <div className="px-6 py-5 space-y-3">
            {[
              { label: 'Provider',  value: 'Supabase (PostgreSQL)' },
              { label: 'Region',    value: 'Sydney (ap-southeast-2)' },
              { label: 'Schema',    value: 'public + hrlake' },
              { label: 'Auth',      value: 'Row Level Security enabled' },
            ].map(row => (
              <div key={row.label} className="flex items-center justify-between">
                <span className="text-slate-500 text-sm">{row.label}</span>
                <span className="text-slate-200 text-sm font-medium">{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-800 flex items-center gap-3">
            <Globe size={16} className="text-blue-400" />
            <h2 className="text-white font-bold">Hosting & Deployment</h2>
          </div>
          <div className="px-6 py-5 space-y-3">
            {[
              { label: 'Host',       value: 'Vercel' },
              { label: 'Framework',  value: 'Next.js 16 (Turbopack)' },
              { label: 'Deploys',    value: 'Auto on git push to main' },
              { label: 'Domain',     value: 'hrlake.com (pending DNS)' },
            ].map(row => (
              <div key={row.label} className="flex items-center justify-between">
                <span className="text-slate-500 text-sm">{row.label}</span>
                <span className="text-slate-200 text-sm font-medium">{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-800 flex items-center gap-3">
            <Mail size={16} className="text-amber-400" />
            <h2 className="text-white font-bold">Email</h2>
          </div>
          <div className="px-6 py-5 space-y-3">
            {[
              { label: 'Provider',       value: 'Resend' },
              { label: 'From address',   value: 'onboarding@resend.dev (pre-DNS)' },
              { label: 'Admin inbox',    value: 'info@accountingbody.com' },
              { label: 'Post-DNS from',  value: 'noreply@hrlake.com' },
            ].map(row => (
              <div key={row.label} className="flex items-center justify-between">
                <span className="text-slate-500 text-sm">{row.label}</span>
                <span className="text-slate-200 text-sm font-medium">{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-800 flex items-center gap-3">
            <Shield size={16} className="text-emerald-400" />
            <h2 className="text-white font-bold">Auth & Payments</h2>
          </div>
          <div className="px-6 py-5 space-y-3">
            {[
              { label: 'Auth provider',  value: 'Clerk' },
              { label: 'Payments',       value: 'Lemon Squeezy' },
              { label: 'Admin gate',     value: 'Cookie-based password' },
              { label: 'Errors',         value: 'Sentry' },
            ].map(row => (
              <div key={row.label} className="flex items-center justify-between">
                <span className="text-slate-500 text-sm">{row.label}</span>
                <span className="text-slate-200 text-sm font-medium">{row.value}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Pre-launch checklist */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center gap-3">
          <Settings size={16} className="text-blue-400" />
          <h2 className="text-white font-bold">Pre-Launch Checklist</h2>
        </div>
        <div className="divide-y divide-slate-800">
          {[
            'Clerk production keys added to Vercel environment variables',
            'Cloudflare DNS cutover: hrlake.com → Vercel',
            'Resend webhook updated to hrlake.com after DNS',
            'Test email capture on live domain',
            'Test Clerk sign-in and sign-up on live domain',
            'Verify all canonical tags pointing to hrlake.com',
            'Confirm Sanity articles rendering correctly',
            'Search Console: submit sitemap',
            'Test on mobile (375px width minimum)',
          ].map((item, i) => (
            <div key={i} className="px-6 py-4 flex items-center gap-4">
              <div className="w-5 h-5 rounded border border-slate-600 shrink-0" />
              <span className="text-slate-300 text-sm">{item}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
