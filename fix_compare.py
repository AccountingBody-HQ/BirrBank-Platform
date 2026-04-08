
content = open("/workspaces/HRLake-Platform/app/compare/page.tsx").read()

old_meta = """export const metadata = {
  title: 'Country Comparison Tool — Employer Cost Side-by-Side | HRLake',
  description: 'Compare employer costs, tax rates, and employment law side-by-side for any two countries. Free HR and payroll comparison tool for global hiring decisions.',
}"""

new_meta = """export const metadata = {
  title: 'Country Comparison Tool — Employer Cost Side-by-Side | HRLake',
  description: 'Compare employer costs, tax rates, and employment law side-by-side for any two countries. Free HR and payroll comparison tool for global hiring decisions.',
  alternates: { canonical: 'https://hrlake.com/compare/' },
  openGraph: {
    title: 'Country Comparison Tool — Employer Cost Side-by-Side | HRLake',
    description: 'Compare employer costs, tax rates, and employment law side-by-side for any two countries. Free HR and payroll comparison tool for global hiring decisions.',
    url: 'https://hrlake.com/compare/',
    siteName: 'HRLake',
    type: 'website',
  },
}"""

content = content.replace(old_meta, new_meta)

old_filter = ".order('name', { ascending: true })"
new_filter = """.eq('is_active', true)
    .order('name', { ascending: true })"""
content = content.replace(old_filter, new_filter)

old_import = "import { getComparisonStructuredData, jsonLd } from '@/lib/structured-data'"
new_import = "import { getComparisonStructuredData, getBreadcrumbStructuredData, jsonLd } from '@/lib/structured-data'"
content = content.replace(old_import, new_import)

old_script = "      <script"
new_script = """      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(getBreadcrumbStructuredData([
          { name: 'Home', href: 'https://hrlake.com' },
          { name: 'Compare Countries', href: 'https://hrlake.com/compare/' },
        ])) }}
      />
      <script"""
content = content.replace(old_script, new_script, 1)

open("/workspaces/HRLake-Platform/app/compare/page.tsx", "w").write(content)
print("Done")
