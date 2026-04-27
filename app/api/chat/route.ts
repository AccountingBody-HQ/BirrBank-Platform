import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { createSupabaseAdminClient } from "@/lib/supabase";

export const runtime = "nodejs"
export const maxDuration = 60

const SYSTEM_PROMPT = `You are BirrBank AI - a specialist Ethiopian financial intelligence assistant. You ONLY answer questions within the following domains:

TOPICS YOU COVER:
- Ethiopian banking (savings rates, loan rates, FX rates, mobile banking, SWIFT transfers)
- Insurance in Ethiopia (motor, life, health, property premiums and claims)
- Ethiopian capital markets (ESX equities, T-bills, bonds, IPO pipeline)
- ECX commodity prices (coffee, sesame, grains and other commodities)
- Remittances and diaspora banking (sending money to Ethiopia, opening accounts, investing from abroad)
- NBE (National Bank of Ethiopia) regulations, licences and directives
- Microfinance institutions and their loan products
- Payment operators and mobile money (TeleBirr, CBE Birr, HelloCash etc.)
- FX bureaux and official exchange rates

IF A QUESTION IS OUTSIDE THESE TOPICS: Politely decline and explain that BirrBank AI specialises exclusively in Ethiopian financial services and NBE-regulated institutions. Suggest the user visit a general-purpose AI for other topics.

WHEN ANSWERING:
- ALWAYS use the live verified database data provided in your context first - it is current and accurate
- Cite exact rates and figures from the database - never guess when database data is available
- Always note that rates change and users should verify directly with the institution
- Always recommend consulting a qualified financial professional for specific situations
- Your users are Ethiopian consumers, diaspora investors, businesses, and financial professionals - be clear and precise
- All monetary values are in Ethiopian Birr (ETB) unless otherwise specified`;

async function fetchInstitutionData(supabase: ReturnType<typeof createSupabaseAdminClient>) {
  const [savingsRes, fxRes, loanRes] = await Promise.all([
    supabase.schema("birrbank").from("savings_rates")
      .select("institution_slug, account_type, annual_rate, minimum_balance_etb, is_sharia_compliant")
      .eq("is_current", true)
      .order("annual_rate", { ascending: false })
      .limit(10),
    supabase.schema("birrbank").from("exchange_rates")
      .select("institution_slug, currency_code, buying_rate, selling_rate")
      .eq("is_current", true)
      .in("currency_code", ["USD", "EUR", "GBP"])
      .limit(15),
    supabase.schema("birrbank").from("loan_rates")
      .select("institution_slug, loan_type, min_rate, max_rate, max_tenure_months")
      .eq("is_current", true)
      .order("min_rate", { ascending: true })
      .limit(10),
  ]);
  return {
    savingsRates: savingsRes.data || [],
    exchangeRates: fxRes.data || [],
    loanRates: loanRes.data || [],
  };
}

function buildFinancialContext(data: {
  savingsRates: any[];
  exchangeRates: any[];
  loanRates: any[];
}): string {
  const { savingsRates, exchangeRates, loanRates } = data;
  if (!savingsRates.length && !exchangeRates.length && !loanRates.length) return "";

  let ctx = "\n\nVERIFIED LIVE BIRRBANK DATA (use this data - it is current and verified):\n";

  if (savingsRates.length > 0) {
    ctx += "Top Savings Rates (ETB):\n";
    savingsRates.forEach((r: any) => {
      const sharia = r.is_sharia_compliant ? " [Sharia-compliant]" : "";
      const min = r.minimum_balance_etb ? ` min ETB ${r.minimum_balance_etb}` : "";
      ctx += `  ${r.institution_slug} - ${r.account_type}: ${r.annual_rate}%${sharia}${min}\n`;
    });
  }

  if (exchangeRates.length > 0) {
    ctx += "FX Rates (buying / selling):\n";
    exchangeRates.forEach((r: any) => {
      ctx += `  ${r.institution_slug} - ${r.currency_code}: buy ${r.buying_rate} / sell ${r.selling_rate}\n`;
    });
  }

  if (loanRates.length > 0) {
    ctx += "Loan Rates:\n";
    loanRates.forEach((r: any) => {
      const tenure = r.max_tenure_months ? ` up to ${r.max_tenure_months} months` : "";
      ctx += `  ${r.institution_slug} - ${r.loan_type}: ${r.min_rate}% - ${r.max_rate}%${tenure}\n`;
    });
  }

  return ctx;
}

export async function POST(req: NextRequest) {
  try {
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const supabase = createSupabaseAdminClient();
    const { message, history = [] } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }
    if (message.length > 500) {
      return NextResponse.json({ error: "Message too long. Maximum 500 characters." }, { status: 400 });
    }
    if (!Array.isArray(history)) {
      return NextResponse.json({ error: "Invalid history" }, { status: 400 });
    }
    if (history.length > 20) {
      return NextResponse.json({ error: "History too long" }, { status: 400 });
    }

    const financialData = await fetchInstitutionData(supabase);
    const financialContext = buildFinancialContext(financialData);

    const messages: Anthropic.MessageParam[] = [
      ...history.slice(-10).map((m: any) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
      { role: "user", content: message },
    ];

    const stream = await anthropic.messages.stream({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1500,
      system: SYSTEM_PROMPT + financialContext,
      messages,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          if (
            chunk.type === "content_block_delta" &&
            chunk.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(chunk.delta.text));
          }
        }
        controller.close();
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Chat failed. Please try again." },
      { status: 500 }
    );
  }
}
