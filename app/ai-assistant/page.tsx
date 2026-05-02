import { auth } from "@clerk/nextjs/server";
import type { Metadata } from 'next'
import { createSupabaseAdminClient } from "@/lib/supabase";
import AiChatClient from "./AiChatClient";

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: 'BirrBank AI - Ethiopian Financial Intelligence Assistant',
  description: 'Get instant answers on Ethiopian banking rates, FX, insurance, ESX markets, and NBE-regulated institutions. Powered by live verified data.',
  alternates: { canonical: 'https://birrbank.com/ai-assistant' },
  openGraph: {
    title: 'BirrBank AI - Ethiopian Financial Intelligence Assistant',
    description: 'Get instant answers on Ethiopian banking rates, FX, insurance, ESX markets, and NBE-regulated institutions.',
    url: 'https://birrbank.com/ai-assistant',
    siteName: 'BirrBank',
    type: 'website',
  },
}

async function getUsageData(userId: string) {
  const supabase = createSupabaseAdminClient();
  const usageRes = await supabase
    .schema("birrbank")
    .from("ai_conversations")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .gte("created_at", new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString());
  return { monthlyUsage: usageRes.count || 0 };
}

export default async function AiAssistantPage() {
  const { userId } = await auth();
  let monthlyUsage = 0;
  if (userId) {
    const data = await getUsageData(userId);
    monthlyUsage = data.monthlyUsage;
  }
  return (
    <AiChatClient
      userId={userId || null}
      monthlyUsage={monthlyUsage}
      freeAnonLimit={9999}
      freeUserLimit={9999}
    />
  );
}
