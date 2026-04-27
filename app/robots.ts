import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/dashboard/',
          '/sign-in/',
          '/sign-up/',
          '/roodber8/',
        ],
      },
    ],
    sitemap: 'https://birrbank.com/sitemap.xml',
  }
}
