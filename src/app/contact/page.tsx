import type { Metadata } from 'next'
import { Phone, MapPin, Clock, ExternalLink } from 'lucide-react'
import ContactForm from '@/components/contact/ContactForm'
import WaveDivider from '@/components/ui/WaveDivider'
import {
  PHONE, PHONE_HREF, FULL_ADDRESS, ADDRESS, CITY_STATE_ZIP,
  MAPS_URL, HOURS, FACEBOOK_URL
} from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Contact Suwannee Shores Marina — call (352) 542-7482 or visit us at 28686 SE Hwy 19, Old Town, FL. Open Tuesday through Saturday.',
}

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-marina-navy py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-white/70 text-lg">
            Stop by, give us a call, or send us a message — we&apos;re here to help.
          </p>
        </div>
      </section>

      <WaveDivider fill="var(--color-marina-white)" />

      {/* Main content */}
      <section className="py-20 bg-marina-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

            {/* Info column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Phone */}
              <div>
                <h2 className="font-serif text-xl font-bold text-marina-navy mb-4">Get In Touch</h2>
                <a
                  href={PHONE_HREF}
                  className="flex items-center gap-3 group text-marina-navy hover:text-marina-teal transition-colors mb-3"
                >
                  <div className="w-10 h-10 bg-marina-teal/10 rounded-lg flex items-center justify-center group-hover:bg-marina-teal/20 transition-colors">
                    <Phone size={18} className="text-marina-teal" />
                  </div>
                  <div>
                    <div className="font-semibold text-lg">{PHONE}</div>
                    <div className="text-marina-slate/60 text-xs">Tap to call</div>
                  </div>
                </a>
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group text-marina-navy hover:text-marina-teal transition-colors"
                >
                  <div className="w-10 h-10 bg-marina-teal/10 rounded-lg flex items-center justify-center group-hover:bg-marina-teal/20 transition-colors">
                    <ExternalLink size={18} className="text-marina-teal" />
                  </div>
                  <div>
                    <div className="font-semibold">Facebook</div>
                    <div className="text-marina-slate/60 text-xs">Suwannee Shores Marina Inc</div>
                  </div>
                </a>
              </div>

              {/* Address */}
              <div>
                <h2 className="font-serif text-xl font-bold text-marina-navy mb-4">Location</h2>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 group text-marina-navy hover:text-marina-teal transition-colors"
                >
                  <div className="w-10 h-10 bg-marina-teal/10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-marina-teal/20 transition-colors mt-0.5">
                    <MapPin size={18} className="text-marina-teal" />
                  </div>
                  <div>
                    <div className="font-semibold">{ADDRESS}</div>
                    <div className="text-marina-slate/70">{CITY_STATE_ZIP}</div>
                    <div className="text-marina-teal text-xs mt-1 font-medium">Get Directions →</div>
                  </div>
                </a>
              </div>

              {/* Hours */}
              <div>
                <h2 className="font-serif text-xl font-bold text-marina-navy mb-4 flex items-center gap-2">
                  <Clock size={20} className="text-marina-teal" />
                  Hours of Operation
                </h2>
                <div className="bg-marina-sand rounded-xl p-4 space-y-1.5">
                  {HOURS.map((h) => (
                    <div key={h.day} className="flex justify-between text-sm">
                      <span className="font-medium text-marina-navy">{h.day}</span>
                      <span className={h.closed ? 'text-marina-slate/40' : 'text-marina-slate'}>
                        {h.closed ? 'Closed' : `${h.open} – ${h.close}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Form column */}
            <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
              <h2 className="font-serif text-2xl font-bold text-marina-navy mb-2">Send Us a Message</h2>
              <p className="text-marina-slate/60 text-sm mb-6">
                Fill out the form below and we&apos;ll get back to you as soon as we can.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-marina-sand py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-marina-navy mb-6 text-center">Find Us on the Suwannee River</h2>
          <div className="rounded-2xl overflow-hidden shadow-md aspect-video bg-marina-navy/5 flex items-center justify-center">
            {/* Map placeholder — replace src with real embed URL */}
            <div className="text-center p-8">
              <MapPin size={48} className="text-marina-teal mx-auto mb-4" />
              <p className="font-semibold text-marina-navy mb-2">{FULL_ADDRESS}</p>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-marina-teal hover:text-marina-navy font-medium text-sm transition-colors"
              >
                Open in Google Maps →
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
