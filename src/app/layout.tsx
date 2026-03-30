import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Anatomy of a Website — Learn Every Part',
  description: 'An interactive skeleton website that labels and explains every common section of a modern website.',
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
      <body className="font-sans">
        {/* ── FULL PAGE WRAPPER ── */}
        <div className="section-outline !m-2 !border-slate-300 min-h-screen flex flex-col">
          <span className="label-tag !bg-slate-600">html / body</span>
          <p className="section-desc !bottom-auto !top-8 !left-auto !right-8">
            The root wrapper — everything lives inside here
          </p>

          <Header />

          {/* ── MAIN CONTENT ── */}
          <main className="flex-1">
            {children}
          </main>

          <Footer />
        </div>
      </body>
    </html>
  )
}
