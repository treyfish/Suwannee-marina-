import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Clearance — debt, cleared.',
  description:
    'A premium personal debt tracking dashboard. Watch your interest accrue in real time, compare avalanche vs snowball, and clear your runway.',
  applicationName: 'Clearance',
  authors: [{ name: 'Clearance' }],
  appleWebApp: {
    title: 'Clearance',
    capable: true,
    statusBarStyle: 'black-translucent',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0c10',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="ambient-glow" aria-hidden />
        <div className="relative z-10 min-h-dvh">{children}</div>
      </body>
    </html>
  )
}
