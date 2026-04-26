import { NextResponse } from 'next/server'
import { createSupabaseAdminClient } from '@/lib/supabase'

export async function GET() {
  const supabase = createSupabaseAdminClient()
  const today = new Date().toISOString().split('T')[0]

  // NBE official rates for today
  const { data: nbeRates } = await supabase
    .schema('birrbank')
    .from('exchange_rates')
    .select('currency_code, buying_rate, selling_rate, rate_date, last_verified_date')
    .eq('institution_slug', 'nbe')
    .eq('rate_date', today)
    .order('currency_code')

  // All institutions that have FX rates (banks with their own rates)
  const { data: bankRates } = await supabase
    .schema('birrbank')
    .from('exchange_rates')
    .select('institution_slug, currency_code, buying_rate, selling_rate, rate_date, last_verified_date, institutions(name)')
    .neq('institution_slug', 'nbe')
    .eq('rate_date', today)
    .order('institution_slug')

  // Institutions eligible for FX (type=bank with SWIFT)
  const { data: banks } = await supabase
    .schema('birrbank')
    .from('institutions')
    .select('slug, name, swift_code')
    .eq('type', 'bank')
    .eq('is_active', true)
    .not('swift_code', 'is', null)
    .order('name')

  return NextResponse.json({
    nbeRates: nbeRates ?? [],
    bankRates: bankRates ?? [],
    banks: banks ?? [],
    today,
  })
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { action, rates, institution_slug, currency_code, buying_rate, selling_rate } = body
    const supabase = createSupabaseAdminClient()
    const today = new Date().toISOString().split('T')[0]

    if (action === 'save_nbe_rates' && Array.isArray(rates)) {
      for (const r of rates) {
        const { error } = await supabase
          .schema('birrbank')
          .from('exchange_rates')
          .upsert({
            institution_slug: 'nbe',
            currency_code: r.currency_code,
            buying_rate: Number(r.buying_rate),
            selling_rate: Number(r.selling_rate),
            rate_date: today,
            last_verified_date: today,
            source: 'nbe_official',
            country_code: 'ET',
          }, { onConflict: 'institution_slug,currency_code,rate_date' })
        if (error) return NextResponse.json({ error: error.message }, { status: 500 })
      }
      return NextResponse.json({ ok: true, saved: rates.length })
    }

    if (action === 'save_bank_rate') {
      const { error } = await supabase
        .schema('birrbank')
        .from('exchange_rates')
        .upsert({
          institution_slug,
          currency_code,
          buying_rate: Number(buying_rate),
          selling_rate: Number(selling_rate),
          rate_date: today,
          last_verified_date: today,
          source: 'admin_verified',
          country_code: 'ET',
        }, { onConflict: 'institution_slug,currency_code,rate_date' })
      if (error) return NextResponse.json({ error: error.message }, { status: 500 })
      return NextResponse.json({ ok: true })
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
