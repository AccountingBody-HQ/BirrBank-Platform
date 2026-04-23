import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { error } = await supabase
      .schema('birrbank')
      .from('email_subscribers')
      .upsert(
        { email: email.toLowerCase().trim(), is_active: true },
        { onConflict: 'email' }
      )

    if (error) {
      console.error('Subscribe error:', error)
      return NextResponse.json({ error: 'Could not save subscription.' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Subscribe route error:', err)
    return NextResponse.json({ error: 'Server error.' }, { status: 500 })
  }
}
