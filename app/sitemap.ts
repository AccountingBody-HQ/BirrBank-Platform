import { MetadataRoute } from 'next'
import { createSupabaseAdminClient } from '@/lib/supabase'
import { sanityClient } from '@/lib/sanity'

const BASE_URL = 'https://birrbank.com'

const STATIC_PAGES: MetadataRoute.Sitemap = [
  { url: BASE_URL,                                lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
  { url: `${BASE_URL}/banking`,                   lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
  { url: `${BASE_URL}/banking/savings-rates`,     lastModified: new Date(), changeFrequency: 'daily',   priority: 0.9 },
  { url: `${BASE_URL}/banking/fx-rates`,          lastModified: new Date(), changeFrequency: 'daily',   priority: 0.9 },
  { url: `${BASE_URL}/banking/loans`,             lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
  { url: `${BASE_URL}/banking/mobile-money`,      lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
  { url: `${BASE_URL}/banking/microfinance`,      lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
  { url: `${BASE_URL}/banking/money-transfer`,    lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
  { url: `${BASE_URL}/insurance`,                 lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
  { url: `${BASE_URL}/insurance/motor`,           lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.7 },
  { url: `${BASE_URL}/insurance/life`,            lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.7 },
  { url: `${BASE_URL}/insurance/health`,          lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.7 },
  { url: `${BASE_URL}/insurance/property`,        lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.7 },
  { url: `${BASE_URL}/insurance/claims-guide`,    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  { url: `${BASE_URL}/markets`,                   lastModified: new Date(), changeFrequency: 'daily',   priority: 0.8 },
  { url: `${BASE_URL}/markets/equities`,          lastModified: new Date(), changeFrequency: 'daily',   priority: 0.8 },
  { url: `${BASE_URL}/markets/ipo-pipeline`,      lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.7 },
  { url: `${BASE_URL}/markets/bonds`,             lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.7 },
  { url: `${BASE_URL}/markets/how-to-invest`,     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  { url: `${BASE_URL}/commodities`,               lastModified: new Date(), changeFrequency: 'daily',   priority: 0.8 },
  { url: `${BASE_URL}/commodities/coffee`,        lastModified: new Date(), changeFrequency: 'daily',   priority: 0.8 },
  { url: `${BASE_URL}/commodities/sesame`,        lastModified: new Date(), changeFrequency: 'daily',   priority: 0.7 },
  { url: `${BASE_URL}/commodities/grains`,        lastModified: new Date(), changeFrequency: 'daily',   priority: 0.7 },
  { url: `${BASE_URL}/commodities/ecx-guide`,     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  { url: `${BASE_URL}/diaspora`,                  lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
  { url: `${BASE_URL}/diaspora/remittance`,       lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.7 },
  { url: `${BASE_URL}/diaspora/invest`,           lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.7 },
  { url: `${BASE_URL}/diaspora/bank-account`,     lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.7 },
  { url: `${BASE_URL}/institutions`,              lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
  { url: `${BASE_URL}/regulations`,              lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.7 },
  { url: `${BASE_URL}/guides`,                    lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.7 },
  { url: `${BASE_URL}/ai-assistant`,              lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  { url: `${BASE_URL}/about`,                     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  { url: `${BASE_URL}/contact`,                   lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.4 },
  { url: `${BASE_URL}/search`,                    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  { url: `${BASE_URL}/privacy-policy`,            lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.2 },
  { url: `${BASE_URL}/terms`,                     lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.2 },
  { url: `${BASE_URL}/disclaimer`,                lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.2 },
  { url: `${BASE_URL}/cookie-policy`,             lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.2 },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createSupabaseAdminClient()

  // Institution detail pages
  const { data: institutions } = await supabase
    .schema('birrbank')
    .from('institutions')
    .select('slug, last_data_update')
    .eq('is_active', true)
    .order('slug')

  const institutionPages: MetadataRoute.Sitemap = (institutions ?? []).map((inst) => ({
    url:             `${BASE_URL}/institutions/${inst.slug}`,
    lastModified:    inst.last_data_update ? new Date(inst.last_data_update) : new Date(),
    changeFrequency: 'weekly' as const,
    priority:        0.7,
  }))

  // Sanity guide pages
  let guidePages: MetadataRoute.Sitemap = []
  try {
    const articles = await sanityClient.fetch<{ slug: string; updatedAt: string }[]>(
      `*[_type == "article" && "birrbank" in showOnSites && defined(slug.current)]
       | order(_updatedAt desc)
       { "slug": slug.current, "updatedAt": _updatedAt }`
    )
    guidePages = articles.map(a => ({
      url:             `${BASE_URL}/guides/${a.slug}`,
      lastModified:    a.updatedAt ? new Date(a.updatedAt) : new Date(),
      changeFrequency: 'monthly' as const,
      priority:        0.7,
    }))
  } catch (e) {
    console.error('Sitemap: Sanity fetch failed', e)
  }

  return [
    ...STATIC_PAGES,
    ...institutionPages,
    ...guidePages,
  ]
}
