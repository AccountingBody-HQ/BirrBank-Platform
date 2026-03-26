import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseAdminClient } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, data } = body

    // Only process email events we care about
    const relevantEvents = [
      'email.bounced',
      'email.complained',
      'contact.unsubscribed',
    ]

    if (!relevantEvents.includes(type)) {
      return NextResponse.json({ received: true })
    }

    const email = data?.to?.[0] || data?.email
    if (!email) {
      return NextResponse.json({ received: true })
    }

    const supabase = createSupabaseAdminClient()

    let newStatus = ''
    let unsubscribed_at = null

    if (type === 'email.bounced') {
      newStatus = 'bounced'
    } else if (type === 'email.complained') {
      newStatus = 'complained'
    } else if (type === 'contact.unsubscribed') {
      newStatus = 'unsubscribed'
      unsubscribed_at = new Date().toISOString()
    }

    if (!newStatus) {
      return NextResponse.json({ received: true })
    }

    const updateData: any = { status: newStatus }
    if (unsubscribed_at) updateData.unsubscribed_at = unsubscribed_at

    const { error } = await supabase
      .from('email_subscribers')
      .update(updateData)
      .eq('email', email.toLowerCase().trim())
      .eq('platform', 'gpe')

    if (error) {
      console.error('Resend webhook Supabase error:', error)
      return NextResponse.json({ error: 'Failed to update subscriber' }, { status: 500 })
    }

    console.log(`Resend webhook: ${type} for ${email} — status updated to ${newStatus}`)
    return NextResponse.json({ received: true })

  } catch (error) {
    console.error('Resend webhook error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}
