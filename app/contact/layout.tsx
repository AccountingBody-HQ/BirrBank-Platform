import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | BirrBank',
  description: 'Get in touch with the BirrBank team. Report a data error, request an institution update, or ask a question about our Ethiopian financial intelligence platform.',
  alternates: {
    canonical: 'https://birrbank.com/contact',
  },
  openGraph: {
    title: 'Contact Us | BirrBank',
    description: 'Report a data error or ask a question about BirrBank — Ethiopia\'s financial comparison platform.',
    url: 'https://birrbank.com/contact',
    siteName: 'BirrBank',
    type: 'website',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
