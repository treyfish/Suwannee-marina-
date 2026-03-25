import Link from 'next/link'
import { Anchor, Phone, MapPin, Clock, ExternalLink } from 'lucide-react'
import {
  BUSINESS_NAME, PHONE, PHONE_HREF, FULL_ADDRESS, MAPS_URL,
  NAV_LINKS, HOURS, FACEBOOK_URL, FOUNDED
} from '@/lib/constants'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-marina-navy text-white">
      {/* Wave top */}
      <div className="w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M0 30C240 60 480 0 720 30C960 60 1200 0 1440 30V60H0V30Z" fill="var(--color-marina-sand)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Anchor size={24} className="text-marina-teal" />
              <span className="font-serif font-bold text-lg">{BUSINESS_NAME}</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              Family-owned full-service marina on the Suwannee River since {FOUNDED}.
              Serving boaters throughout Florida and the Southeast.
            </p>
            <div className="inline-block bg-marina-amber/20 border border-marina-amber/40 text-marina-amber text-xs font-semibold px-3 py-1 rounded-full tracking-wide">
              Mercury Platinum Dealer
            </div>
            <div className="mt-4 flex gap-3">
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <ExternalLink size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-marina-teal transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services#service" className="text-white/60 hover:text-marina-teal transition-colors text-sm">
                  Mercury Service
                </Link>
              </li>
              <li>
                <Link href="/services#storage" className="text-white/60 hover:text-marina-teal transition-colors text-sm">
                  Boat Storage
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Contact & Hours</h3>
            <ul className="space-y-3 text-sm text-white/60">
              <li>
                <a href={PHONE_HREF} className="flex items-center gap-2 hover:text-white transition-colors">
                  <Phone size={14} className="text-marina-teal shrink-0" />
                  {PHONE}
                </a>
              </li>
              <li>
                <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 hover:text-white transition-colors">
                  <MapPin size={14} className="text-marina-teal shrink-0 mt-0.5" />
                  {FULL_ADDRESS}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Clock size={14} className="text-marina-teal shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  {HOURS.map((h) => (
                    <div key={h.day} className="flex justify-between gap-4">
                      <span>{h.day.slice(0, 3)}</span>
                      <span className={h.closed ? 'text-white/30' : ''}>
                        {h.closed ? 'Closed' : `${h.open} – ${h.close}`}
                      </span>
                    </div>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-center text-white/40 text-xs">
          © {year} {BUSINESS_NAME} Inc. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
