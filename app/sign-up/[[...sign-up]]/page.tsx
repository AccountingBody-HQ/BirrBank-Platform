import { SignUp } from '@clerk/nextjs'

export const metadata = {
  title: 'Create Account',
  description: 'Create your free GlobalPayrollExpert account.',
}

export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center px-4"
      style={{background: 'radial-gradient(ellipse at 60% 0%, rgba(30,111,255,0.08) 0%, transparent 60%), #020817'}}>
      <div className="w-full max-w-md flex flex-col items-center">

        {/* Logo */}
        <div className="mb-8 flex flex-col items-center">
          <div className="flex items-center gap-2.5 mb-3">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#3b82f6" strokeWidth="2"/>
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="#3b82f6" strokeWidth="2"/>
            </svg>
            <span className="text-white font-bold text-lg tracking-tight">GlobalPayrollExpert</span>
          </div>
          <div className="h-px w-12 bg-blue-500/40" />
        </div>

        <SignUp
          appearance={{
            layout: {
              showOptionalFields: false,
            },
            elements: {
              rootBox: 'w-full',
              card: 'bg-slate-900 border border-slate-800 shadow-2xl rounded-2xl w-full',
              headerTitle: 'text-white font-bold text-xl',
              headerSubtitle: 'text-slate-400 text-sm',
              socialButtonsBlockButton: 'bg-slate-800 border border-slate-700 text-white hover:bg-slate-700 rounded-xl font-medium',
              socialButtonsBlockButtonText: 'text-white font-medium text-sm',
              dividerLine: 'bg-slate-700',
              dividerText: 'text-slate-500 text-xs',
              formFieldLabel: 'text-slate-300 text-sm font-medium',
              formFieldInput: 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500 rounded-lg',
              formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl',
              footerActionLink: 'text-blue-400 hover:text-blue-300 font-medium',
              footerActionText: 'text-slate-500 text-sm',
              identityPreviewText: 'text-white',
              identityPreviewEditButton: 'text-blue-400',
              formFieldInputShowPasswordButton: 'text-slate-400',
              alertText: 'text-red-400 text-sm',
              formResendCodeLink: 'text-blue-400',
              footer: 'hidden',
              internal: 'hidden',
            },
          }}
        />
      </div>
    </main>
  )
}
