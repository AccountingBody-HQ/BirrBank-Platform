import { NextResponse } from 'next/server'
import { createSupabaseAdminClient } from '@/lib/supabase'

export async function GET() {
  const supabase = createSupabaseAdminClient()

  const { data: rates } = await supabase
    .schema('birrbank')
    .from('savings_rates')
    .select('id, institution_slug, account_type, annual_rate, minimum_balance_etb, is_sharia_compliant, is_current, last_verified_date, institutions(name)')
    .eq('is_current', true)
    .order('annual_rate', { ascending: false })

  const { data: institutions } = await supabase
    .schema('birrbank')
    .from('institutions')
    .select('slug, name')
    .in('type', ['bank', 'microfinance'])
    .eq('is_active', true)
    .order('name')

  return NextResponse.json({
    rates: rates ?? [],
    institutions: institutions ?? [],
  })
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { action, institution_slug, account_type, annual_rate, minimum_balance_etb, is_sharia_compliant, id } = body
    const supabase = createSupabaseAdminClient()
    const today = new Date().toISOString().split('T')[0]

    if (action === 'save_rate') {
      if (!institution_slug || !account_type || annual_rate === undefined) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
      }

      if (id) {
        // Update existing row
        const { error } = await supabase
          .schema('birrbank')
          .from('savings_rates')
          .update({
            annual_rate: Number(annual_rate),
            minimum_balance_etb: minimum_balance_etb ? Number(minimum_balance_etb) : null,
            is_sharia_compliant: Boolean(is_sharia_compliant),
            last_verified_date: today,
          })
          .eq('id', id)
        if (error) return NextResponse.json({ error: error.message }, { status: 500 })
      } else {
        // Insert new row — mark any existing current row as not current first
        await supabase
          .schema('birrbank')
          .from('savings_rates')
          .update({ is_current: false })
          .eq('institution_slug', institution_slug)
          .eq('account_type', account_type)
          .eq('is_current', true)

        const { error } = await supabase
          .schema('birrbank')
          .from('savings_rates')
          .insert({
            institution_slug,
            account_type,
            annual_rate: Number(annual_rate),
            minimum_balance_etb: minimum_balance_etb ? Number(minimum_balance_etb) : null,
            is_sharia_compliant: Boolean(is_sharia_compliant),
            is_current: true,
            last_verified_date: today,
            country_code: 'ET',
          })
        if (error) return NextResponse.json({ error: error.message }, { status: 500 })
      }
      return NextResponse.json({ ok: true })
    }

    if (action === 'verify_rate' && id) {
      const { error } = await supabase
        .schema('birrbank')
        .from('savings_rates')
        .update({ last_verified_date: today })
        .eq('id', id)
      if (error) return NextResponse.json({ error: error.message }, { status: 500 })
      return NextResponse.json({ ok: true })
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
