import { auth, clerkClient } from "@clerk/nextjs/server"
import { createSupabaseAdminClient } from "@/lib/supabase"
import { NextResponse } from "next/server"

export async function DELETE() {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: "Unauthorised" }, { status: 401 })

  try {
    const supabase = createSupabaseAdminClient()

    await supabase.schema("birrbank").from("ai_conversations").delete().eq("user_id", userId)

    const clerk = await clerkClient()
    await clerk.users.deleteUser(userId)

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Delete account error:", err)
    return NextResponse.json({ error: "Failed to delete account" }, { status: 500 })
  }
}
