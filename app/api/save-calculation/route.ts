import { auth } from '@clerk/nextjs/server'
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  const body = await req.json()
  const { country_code, gross_salary, period, label, calculation_result } = body

  if (!country_code || !gross_salary || !calculation_result) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { error } = await supabase
    .from('saved_calculations')
    .insert({
      user_id: userId,
      country_code: country_code.toUpperCase(),
      gross_salary,
      label: label || `${country_code.toUpperCase()} — ${new Date().toLocaleDateString('en-GB')}`,
      calculation_result,
    })

  if (error) {
    console.error('Save calculation error:', error)
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
