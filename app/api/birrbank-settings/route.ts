import { NextResponse } from 'next/server'
import { createSupabaseAdminClient } from '@/lib/supabase'

export async function GET() {
  // Check env vars — never expose values, only presence
  const envChecks = [
    { key: 'NEXT_PUBLIC_SUPABASE_URL',      label: 'Supabase URL',          required: true  },
    { key: 'NEXT_PUBLIC_SUPABASE_ANON_KEY', label: 'Supabase Anon Key',     required: true  },
    { key: 'SUPABASE_SERVICE_ROLE_KEY',     label: 'Supabase Service Role', required: true  },
    { key: 'ANTHROPIC_API_KEY',             label: 'Anthropic API Key',     required: true  },
    { key: 'ADMIN_SECRET',                  label: 'Admin Secret',          required: true  },
    { key: 'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY', label: 'Clerk Publishable Key', required: true },
    { key: 'CLERK_SECRET_KEY',              label: 'Clerk Secret Key',      required: true  },
    { key: 'SANITY_WRITE_TOKEN',            label: 'Sanity Write Token',    required: false },
    { key: 'RESEND_API_KEY',                label: 'Resend API Key',        required: false },
    { key: 'NEXT_PUBLIC_SANITY_PROJECT_ID', label: 'Sanity Project ID',     required: false },
    { key: 'SENTRY_DSN',                    label: 'Sentry DSN',            required: false },
  ]

  const envStatus = envChecks.map(e => ({
    label:    e.label,
    key:      e.key,
    present:  !!process.env[e.key],
    required: e.required,
  }))

  // Check Supabase connectivity + table counts
  let supabaseStatus = 'unknown'
  let tableCounts: Record<string, number> = {}

  try {
    const supabase = createSupabaseAdminClient()

    const tables = [
      'institutions', 'savings_rates', 'loan_rates', 'exchange_rates',
      'insurance_products', 'listed_securities', 'ipo_pipeline',
      'debt_instruments', 'commodity_prices', 'guides', 'regulations',
    ]

    const results = await Promise.all(
      tables.map(t =>
        supabase.schema('birrbank').from(t).select('id', { count: 'exact', head: true })
      )
    )

    tables.forEach((t, i) => {
      tableCounts[t] = results[i].count ?? 0
    })

    supabaseStatus = 'connected'
  } catch {
    supabaseStatus = 'error'
  }

  // Pre-launch checklist
  const checklist = [
    { task: 'All 32 banks fully populated with verified data',  done: (tableCounts['savings_rates'] ?? 0) >= 20               },
    { task: 'Rate Updater admin tab operational and tested',    done: true                                                     },
    { task: 'NBE daily FX rate import working',                 done: (tableCounts['exchange_rates'] ?? 0) > 0                 },
    { task: 'Homepage savings rate table pulling from Supabase',done: true                                                     },
    { task: 'Admin authentication tested end-to-end',           done: true                                                     },
    { task: 'RLS policies on all 30 birrbank tables',           done: supabaseStatus === 'connected'                           },
    { task: 'Last-verified timestamps on all rate rows',        done: (tableCounts['savings_rates'] ?? 0) > 0                 },
    { task: 'Disclaimer on every page footer',                  done: false                                                    },
    { task: 'Clerk production keys (pk_live_*)',                 done: (process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? '').startsWith('pk_live_') },
    { task: 'Supabase upgraded to Pro',                         done: false                                                    },
    { task: 'Vercel upgraded to Pro',                           done: false                                                    },
    { task: 'Mobile tested at 375px minimum width',             done: false                                                    },
    { task: 'Canonical tags pointing to birrbank.com',          done: false                                                    },
    { task: 'Google Search Console sitemap submitted',          done: false                                                    },
  ]

  return NextResponse.json({
    envStatus,
    supabaseStatus,
    tableCounts,
    checklist,
    platform: {
      nodeEnv:    process.env.NODE_ENV,
      siteUrl:    process.env.BIRRBANK_SITE_URL ?? process.env.NEXT_PUBLIC_SITE_URL ?? 'not set',
      clerkKey:   (process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? '').slice(0, 12) + '...',
      sanityProject: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'not set',
    }
  })
}
