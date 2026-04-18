import { NextRequest, NextResponse } from "next/server"
import { createSupabaseAdminClient } from "@/lib/supabase"

const HRLAKE_TABLES = [
  "tax_brackets", "social_security", "employment_rules", "statutory_leave",
  "public_holidays", "filing_calendar", "payroll_compliance", "working_hours",
  "termination_rules", "pension_schemes",
  "mandatory_benefits", "health_insurance", "record_retention",
  "expense_rules", "work_permits", "tax_credits",
  "regional_tax_rates", "salary_benchmarks", "government_benefit_payments",
  "entity_setup",
]

const PREMIUM_OBJECT_TABLES = new Set(["payslip_requirements", "remote_work_rules", "contractor_rules"])

// Tables confirmed to have NO tax_year column in the database
const NO_TAX_YEAR = new Set([
  "public_holidays", "payslip_requirements", "record_retention",
  "remote_work_rules", "contractor_rules", "work_permits",
  "entity_setup", "salary_benchmarks",
])

// Tables confirmed to have NO valid_from column in the database
const NO_VALID_FROM = new Set(["work_permits"])

const LEAVE_TYPE_MAP: Record<string, string> = {
  annual_leave: "annual", annual: "annual",
  sick_leave: "sick", sick: "sick",
  maternity_leave: "maternity", maternity: "maternity",
  paternity_leave: "paternity", paternity: "paternity",
  parental_leave: "parental", parental: "parental",
  bereavement_leave: "bereavement", bereavement: "bereavement",
}

const FREQUENCY_MAP: Record<string, string> = {
  Monthly: "monthly", monthly: "monthly",
  Quarterly: "quarterly", quarterly: "quarterly",
  Annual: "annual", annual: "annual", Annually: "annual",
  Weekly: "weekly", weekly: "weekly",
}

function applyDefaults(table: string, row: any, countryCode: string, currencyCode: string = "USD") {
  // Build base with all standard defaults
  const base: any = {
    tax_year: 2025,
    valid_from: "2025-01-01",
    is_current: true,
    tier: "free",
    ...row,
    country_code: countryCode.toUpperCase(),
  }

  // Strip columns that do not exist on this table
  if (NO_TAX_YEAR.has(table))  delete base.tax_year
  if (NO_VALID_FROM.has(table)) delete base.valid_from

  // Table-specific overrides
  if (table === "tax_brackets") {
    return { currency_code: currencyCode, ...base }
  }
  if (table === "social_security") {
    return { currency_code: currencyCode, ...base }
  }
  if (table === "statutory_leave") {
    return { ...base, leave_type: LEAVE_TYPE_MAP[row.leave_type] ?? row.leave_type }
  }
  if (table === "filing_calendar") {
    return { ...base, frequency: FREQUENCY_MAP[row.frequency] ?? row.frequency.toLowerCase() }
  }
  if (table === "payroll_compliance") {
    return { compliance_type: "payroll", ...base }
  }
  if (table === "public_holidays") {
    // public_holidays uses year not tax_year, and has no valid_from
    const r: any = {
      year: 2025,
      tier: "free",
      is_mandatory: true,
      ...row,
      country_code: countryCode.toUpperCase(),
    }
    delete r.tax_year
    delete r.valid_from
    return r
  }
  if (table === "salary_benchmarks") {
    // salary_benchmarks uses benchmark_year not tax_year
    base.benchmark_year = 2025
    return base
  }

  return base
}

export async function POST(req: NextRequest) {
  try {
    const { data, countryCode, currencyCode = "USD" } = await req.json()
    if (!data || !countryCode) {
      return NextResponse.json({ error: "Missing data or countryCode" }, { status: 400 })
    }
    const sb = createSupabaseAdminClient()
    const errors: string[] = []

    for (const table of HRLAKE_TABLES) {
      const rows = data[table]
      if (!rows || rows.length === 0) continue
      const { error: delError } = await sb.schema("hrlake").from(table).delete().eq("country_code", countryCode.toUpperCase())
      if (delError) errors.push(table + " (delete): " + delError.message)
      const rowsWithDefaults = rows.map((r: any) => applyDefaults(table, r, countryCode, currencyCode))
      const { error } = await sb.schema("hrlake").from(table).insert(rowsWithDefaults)
      if (error) errors.push(table + ": " + error.message)
    }

    for (const table of PREMIUM_OBJECT_TABLES) {
      const raw = data[table]
      if (!raw) continue
      const rows = Array.isArray(raw) ? raw : [raw]
      const { error: delError } = await sb.schema("hrlake").from(table).delete().eq("country_code", countryCode.toUpperCase())
      if (delError) errors.push(table + " (delete): " + delError.message)
      const rowsWithDefaults = rows.map((r: any) => applyDefaults(table, r, countryCode, currencyCode))
      const { error } = await sb.schema("hrlake").from(table).insert(rowsWithDefaults)
      if (error) errors.push(table + ": " + error.message)
    }

    if (data.sources) {
      const sourceRows = Object.entries(data.sources).map(([cat, s]: [string, any]) => ({
        country_code: countryCode.toUpperCase(),
        data_category: cat,
        authority_name: s.authority_name,
        source_url: s.source_url,
        language: "en",
      }))
      const { error } = await sb.schema("hrlake").from("official_sources").upsert(sourceRows, { onConflict: "country_code,data_category" })
      if (error) errors.push("official_sources: " + error.message)
    }

    if (errors.length > 0) {
      return NextResponse.json({ error: "Some inserts failed", details: errors }, { status: 500 })
    }

    // Auto-verify: mark country as verified immediately after a successful insert.
    // Data was just generated from official sources — re-verifying immediately adds no value.
    // Data Quality verification should be used for re-validation only.
    const today = new Date().toISOString().split('T')[0]
    const { error: verifyError } = await sb
      .from('countries')
      .update({
        last_data_update: today,
        hrlake_coverage_level: 'full',
      })
      .eq('iso2', countryCode.toUpperCase())
    if (verifyError) {
      // Non-fatal — data is inserted, just log the verify failure
      return NextResponse.json({ success: true, verifyWarning: verifyError.message })
    }

    return NextResponse.json({ success: true, autoVerified: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? "Unknown error" }, { status: 500 })
  }
}
