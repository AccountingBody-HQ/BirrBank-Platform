import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Search — Institutions, Rates and Financial Guides | BirrBank',
  description: 'Search BirrBank for any Ethiopian bank, insurer, microfinance institution, FX rate, or financial guide. All 278 NBE-regulated entities in one place.',
  alternates: {
    canonical: 'https://birrbank.com/search',
  },
  robots: {
    index: false,
  },
}

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
