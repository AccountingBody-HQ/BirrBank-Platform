import { NextResponse } from 'next/server'
import { createSupabaseAdminClient } from '@/lib/supabase'

export async function GET() {
  const supabase = createSupabaseAdminClient()

  const { data: institutions, error } = await supabase
    .schema('birrbank')
    .from('institutions')
    .select('slug, name, type, is_active, swift_code, website_url, coverage_level, nbe_licence_date, last_data_update')
    .order('type')
    .order('name')

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const { count: activeCount } = await supabase
    .schema('birrbank')
    .from('institutions')
    .select('slug', { count: 'exact', head: true })
    .eq('is_active', true)

  return NextResponse.json({ institutions: institutions ?? [], activeCount: activeCount ?? 0 })
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { action, slug, name, type, swift_code, website_url, is_active, nbe_licence_date } = body
    const supabase = createSupabaseAdminClient()
    const today = new Date().toISOString().split('T')[0]

    const ALLOWED_TYPES = new Set([
      'bank','insurer','microfinance','payment_operator',
      'money_transfer','fx_bureau','capital_lease','reinsurer'
    ])

    if (action === 'add_institution') {
      if (!slug || !name || !type) {
        return NextResponse.json({ error: 'slug, name and type are required' }, { status: 400 })
      }
      if (!ALLOWED_TYPES.has(type)) {
        return NextResponse.json({ error: 'Invalid institution type' }, { status: 400 })
      }
      const { error } = await supabase
        .schema('birrbank')
        .from('institutions')
        .insert({
          slug,
          name,
          type,
          swift_code: swift_code || null,
          website_url: website_url || null,
          is_active: false,
          coverage_level: 'none',
          country_code: 'ET',
          nbe_licence_date: nbe_licence_date || null,
          last_data_update: today,
        })
      if (error) return NextResponse.json({ error: error.message }, { status: 500 })
      return NextResponse.json({ ok: true })
    }

    if (action === 'toggle_active' && slug) {
      const { data: current } = await supabase
        .schema('birrbank')
        .from('institutions')
        .select('is_active, coverage_level')
        .eq('slug', slug)
        .single()

      const newActive = !current?.is_active
      const newCoverage = newActive && current?.coverage_level === 'none' ? 'partial' : current?.coverage_level

      const { error } = await supabase
        .schema('birrbank')
        .from('institutions')
        .update({ is_active: newActive, coverage_level: newCoverage })
        .eq('slug', slug)
      if (error) return NextResponse.json({ error: error.message }, { status: 500 })
      return NextResponse.json({ ok: true, is_active: newActive })
    }

    if (action === 'update_institution' && slug) {
      const updates: Record<string, unknown> = { last_data_update: today }
      if (website_url !== undefined) updates.website_url = website_url
      if (swift_code !== undefined) updates.swift_code = swift_code
      if (nbe_licence_date !== undefined) updates.nbe_licence_date = nbe_licence_date
      if (is_active !== undefined) updates.is_active = is_active

      const { error } = await supabase
        .schema('birrbank')
        .from('institutions')
        .update(updates)
        .eq('slug', slug)
      if (error) return NextResponse.json({ error: error.message }, { status: 500 })
      return NextResponse.json({ ok: true })
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
