import Link from 'next/link'
import { Phone } from 'lucide-react'
import { PHONE, PHONE_HREF } from '@/lib/constants'

export default function CTABanner() {
  return (
    <section className="py-16 bg-marina-teal">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
          Ready to Hit the Water?
        </h2>
        <p className="text-white/80 text-lg mb-8">
          Call us or stop by — we&apos;re open Tuesday through Saturday on the Suwannee River.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={PHONE_HREF}
            className="flex items-center gap-2 bg-white text-marina-teal hover:bg-marina-sand px-8 py-4 rounded-md font-bold text-lg transition-colors shadow-md"
          >
            <Phone size={22} />
            {PHONE}
          </a>
          <Link
            href="/contact"
            className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-md font-semibold text-lg transition-colors"
          >
            Get Directions &amp; Hours
          </Link>
        </div>
      </div>
    </section>
  )
}
