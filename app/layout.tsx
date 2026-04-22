// ============================================
// HRLAKE — ROOT LAYOUT
// GTM, Clerk, Fonts, Metadata, Nav, Footer
// ============================================

import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Navigation from '@/components/BirrBankNav'
import Footer from '@/components/BirrBankFooter'
import { createClient } from '@supabase/supabase-js'
import './globals.css'
import CookieConsent from '@/components/CookieConsent'

// --- FONT ---
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  weight: ['400', '600', '700', '800', '900'],
})

// --- DEFAULT METADATA ---
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.BIRRBANK_SITE_URL || 'https://birrbank.com'
  ),
  title: {
    default: "BirrBank — Ethiopia's Financial Intelligence Platform",
    template: '%s | HRLake',
  },
  description:
    'The deep source for global HR intelligence. Employer costs, tax brackets, employment law, and payroll compliance data — updated from official government sources.',
  keywords: [
    'global payroll',
    'employer of record',
    'EOR',
    'payroll calculator',
    'employment law',
    'HR compliance',
    'international payroll',
    'employer costs',
  ],
  authors: [{ name: 'BirrBank' }],
  creator: 'BirrBank',
  publisher: 'BirrBank',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://birrbank.com',
    siteName: 'BirrBank',
    title: "BirrBank — Ethiopia's Financial Intelligence Platform",
    description:
      'Employer costs, tax brackets, employment law, and compliance data for every country.',
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'HRLake',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "BirrBank — Ethiopia's Financial Intelligence Platform",
    description:
      'Employer costs, tax brackets, employment law, and compliance data for every country.',
    images: ['/og-default.png'],
  },
  verification: {
    google: "Ke1xcsC2rYKaBT_PbROsCHNgOJ8s3IjRNyzQuI6JBt4",
  },
  alternates: {
    canonical: 'https://birrbank.com',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/favicon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/favicon-192.png', sizes: '192x192', type: 'image/png' }],
  },
}

// --- GTM SNIPPET HELPERS ---
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID

function GoogleTagManagerHead() {
  if (!GTM_ID) return null
  return (
    <>
      {/* Google Consent Mode v2 — must run BEFORE GTM loads */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  functionality_storage: 'granted',
  security_storage: 'granted',
  wait_for_update: 500
});
`,
        }}
      />
      {/* GTM loader */}
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
        }}
      />
    </>
  )
}

function GoogleTagManagerBody() {
  if (!GTM_ID) return null
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  )
}

// --- ROOT LAYOUT ---
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <ClerkProvider>
      <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
        <head>
          <GoogleTagManagerHead />
        </head>
        <body className="bg-white font-sans antialiased">
          <GoogleTagManagerBody />
          <Navigation />
          {children}
          <Footer />
          <Analytics />
          <SpeedInsights />
          <CookieConsent />
        </body>
      </html>
    </ClerkProvider>
  )
}