import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { BUSINESS_NAME, FULL_ADDRESS, PHONE } from '@/lib/constants'

export const metadata: Metadata = {
  title: {
    default: 'Suwannee Shores Marina | Full-Service Marina in Old Town, FL',
    template: '%s | Suwannee Shores Marina',
  },
  description:
    'Family-owned full-service marina on the Suwannee River since 1973. Mercury Platinum Dealer offering boat sales, storage, service, fuel, bait & tackle in Old Town, FL.',
  keywords: [
    'marina', 'Suwannee River', 'boat sales', 'Old Town FL', 'Mercury dealer',
    'boat storage', 'outboard motor repair', 'Dixie County', 'boat dealer Florida',
    'Mercury Platinum', 'marina Old Town Florida',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: BUSINESS_NAME,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Marina',
  name: BUSINESS_NAME,
  description: 'Family-owned full-service marina on the Suwannee River since 1973.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '28686 SE Hwy 19',
    addressLocality: 'Old Town',
    addressRegion: 'FL',
    postalCode: '32680',
    addressCountry: 'US',
  },
  telephone: PHONE,
  url: 'https://suwanneeshoresmarinainc.com',
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 29.61,
    longitude: -83.0,
  },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '17:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '08:00', closes: '13:00' },
  ],
  priceRange: '$$',
  hasMap: `https://maps.google.com/?q=${encodeURIComponent(FULL_ADDRESS)}`,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;600;700;800&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
        <Header />
        <main className="pt-16 lg:pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
