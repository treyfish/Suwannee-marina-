import Link from 'next/link'
import { Phone, ChevronDown } from 'lucide-react'
import { PHONE, PHONE_HREF, FOUNDED } from '@/lib/constants'

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-marina-navy">
      {/* Building background photo */}
      <img
        src="/images/marina-building.png"
        alt="Suwannee Shores Marina building"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      {/* Dark overlay so text stays readable */}
      <div className="absolute inset-0 bg-marina-navy/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-marina-navy/80 via-transparent to-marina-navy/30" />

      {/* Animated wave at bottom */}
      <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full">
          <path d="M0 50C240 100 480 0 720 50C960 100 1200 0 1440 50V100H0V50Z" fill="#FAFAF8" fillOpacity="0.05" />
          <path d="M0 70C360 30 720 100 1080 60C1260 40 1380 80 1440 70V100H0V70Z" fill="#FAFAF8" fillOpacity="0.08" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-marina-teal/20 border border-marina-teal/40 text-marina-teal text-sm font-medium px-4 py-1.5 rounded-full mb-6">
          <span className="w-2 h-2 bg-marina-teal rounded-full animate-pulse" />
          Family Owned &amp; Operated Since {FOUNDED}
        </div>

        {/* Headline */}
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6">
          Your Gateway to the{' '}
          <span className="text-marina-teal">Suwannee River</span>
        </h1>

        <p className="text-white/70 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Full-service marina in Old Town, Florida — offering boat sales, storage,
          Mercury certified service, fuel, bait, and tackle for over 50 years.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/services"
            className="w-full sm:w-auto bg-marina-amber hover:bg-amber-600 text-white px-8 py-4 rounded-md font-semibold text-lg transition-colors shadow-lg"
          >
            Explore Our Services
          </Link>
          <a
            href={PHONE_HREF}
            className="w-full sm:w-auto flex items-center justify-center gap-2 border-2 border-white/40 hover:border-white text-white hover:bg-white/10 px-8 py-4 rounded-md font-semibold text-lg transition-colors"
          >
            <Phone size={20} />
            Call {PHONE}
          </a>
        </div>

        {/* Scroll hint */}
        <div className="mt-16 flex justify-center animate-bounce">
          <ChevronDown size={28} className="text-white/40" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
