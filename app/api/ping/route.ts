import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export const runtime = "nodejs"

export async function GET() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    // Lightweight query — just enough to keep Supabase awake
    await supabase.from("countries").select("id").limit(1)
    return NextResponse.json({ ok: true, ts: new Date().toISOString() })
  } catch (err) {
    console.error("Ping failed:", err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
