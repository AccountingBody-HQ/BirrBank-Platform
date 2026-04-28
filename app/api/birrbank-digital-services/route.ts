import { NextResponse } from 'next/server'
import { createSupabaseAdminClient } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { action, institution_slug, has_mobile_app, has_internet_banking, has_ussd, has_swift, mobile_money_platform, app_store_rating } = body
    const supabase = createSupabaseAdminClient()

    if (action === 'save_digital_services') {
      if (!institution_slug) {
        return NextResponse.json({ error: 'Missing institution_slug' }, { status: 400 })
      }
      const { error } = await supabase
        .schema('birrbank')
        .from('digital_services')
        .upsert({
          institution_slug,
          has_mobile_app: Boolean(has_mobile_app),
          has_internet_banking: Boolean(has_internet_banking),
          has_ussd: Boolean(has_ussd),
          has_swift: Boolean(has_swift),
          mobile_money_platform: mobile_money_platform ?? null,
          app_store_rating: app_store_rating ? Number(app_store_rating) : null,
        }, { onConflict: 'institution_slug' })
      if (error) return NextResponse.json({ error: error.message }, { status: 500 })
      return NextResponse.json({ ok: true })
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
