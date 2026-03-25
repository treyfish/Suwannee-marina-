import type { Metadata } from 'next'
import { Ship, Anchor, Wrench, Fuel, BookOpen, CheckCircle, Phone } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import WaveDivider from '@/components/ui/WaveDivider'
import { STORAGE_OPTIONS, PHONE_HREF, PHONE } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Boat sales, brokerage, financing, Mercury Platinum service, dry storage, covered and open slips, fuel, bait, tackle, and safety classes at Suwannee Shores Marina.',
}

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-marina-navy py-20" id="top">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-marina-teal/20 border border-marina-teal/40 text-marina-teal text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            Full-Service Marina
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6">
            Our Services
          </h1>
          <p className="text-white/70 text-lg leading-relaxed">
            From buying your first boat to maintaining it for years to come — we have everything you need right here on the Suwannee River.
          </p>
        </div>
      </section>

      <WaveDivider fill="var(--color-marina-white)" />

      {/* Boat Sales */}
      <section className="py-20 bg-marina-white" id="boat-sales">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-14 h-14 bg-marina-teal/10 rounded-xl flex items-center justify-center mb-6">
                <Ship size={30} className="text-marina-teal" />
              </div>
              <SectionHeading
                title="Boat Sales, Brokerage & Financing"
                centered={false}
              />
              <p className="text-marina-slate/80 leading-relaxed mb-6">
                Whether you&apos;re buying your first boat or upgrading to something bigger, Suwannee Shores Marina has you covered. We offer new and pre-owned boat sales, full brokerage services to help you sell your current vessel, and flexible financing options to make ownership accessible.
              </p>
              <ul className="space-y-2 mb-8">
                {[
                  'New boat sales',
                  'Pre-owned and used boat inventory',
                  'Boat brokerage — we help you sell',
                  'Financing available on-site',
                  'Trade-ins accepted',
                  'Expert guidance from experienced staff',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-marina-slate">
                    <CheckCircle size={18} className="text-marina-teal shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={PHONE_HREF}
                className="inline-flex items-center gap-2 bg-marina-amber text-white px-6 py-3 rounded-md font-semibold hover:bg-amber-600 transition-colors"
              >
                <Phone size={18} />
                Call About Inventory
              </a>
            </div>
            <div className="relative rounded-2xl overflow-hidden min-h-[360px]">
              <img
                src="/images/marina-building.png"
                alt="Suwannee Shores Marina dealership"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="relative z-10 p-6 flex flex-col justify-end min-h-[360px]">
                <div className="mt-auto">
                  <div className="text-marina-amber text-xs font-semibold uppercase tracking-widest mb-1">New &amp; Pre-Owned</div>
                  <div className="text-white font-serif font-bold text-xl">Boats for Every Budget</div>
                  <div className="text-white/60 text-sm mt-1">Financing available on-site</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider fill="var(--color-marina-navy)" flip />

      {/* Mercury */}
      <section className="py-20 bg-marina-navy" id="service">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative rounded-2xl overflow-hidden min-h-[360px]">
              <img
                src="/images/mercury-motor.jpeg"
                alt="Mercury outboard engine at Suwannee Shores Marina"
                className="w-full h-full object-cover absolute inset-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="relative z-10 p-6 flex flex-col justify-end h-full min-h-[360px]">
                <div className="mt-auto">
                  <div className="flex items-center gap-2 mb-1">
                    <Wrench size={16} className="text-marina-amber" />
                    <div className="text-marina-amber text-xs font-semibold uppercase tracking-widest">Mercury Platinum Certified</div>
                  </div>
                  <div className="text-white font-serif font-bold text-xl">Expert Engine Service</div>
                  <div className="text-white/70 text-sm mt-1">Sales · Service · Warranty · Parts</div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-block bg-marina-amber/20 border border-marina-amber/40 text-marina-amber text-xs font-semibold px-3 py-1 rounded-full tracking-wide mb-6">
                Mercury Platinum Dealership
              </div>
              <SectionHeading
                title="Outboard Motor Service & Repair"
                centered={false}
                light
              />
              <p className="text-white/70 leading-relaxed mb-6">
                Our technicians are Mercury Platinum certified, meaning they meet the highest standards for outboard motor service. Whether it&apos;s routine maintenance, warranty work, or a complex repair — we have the expertise and tools to get you back on the water.
              </p>
              <ul className="space-y-2 mb-8">
                {[
                  'Mercury outboard sales, service & warranty',
                  'All major outboard motor brands serviced',
                  'Preventative maintenance packages',
                  'Bilge and sewage pumping',
                  'Boat operation & safety instruction classes',
                  'Genuine Mercury parts and accessories',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-white/80">
                    <CheckCircle size={18} className="text-marina-teal shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={PHONE_HREF}
                className="inline-flex items-center gap-2 bg-marina-amber text-white px-6 py-3 rounded-md font-semibold hover:bg-amber-600 transition-colors"
              >
                <Phone size={18} />
                Schedule Service
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-12 bg-marina-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-marina-teal text-xs font-semibold uppercase tracking-widest text-center mb-6">Our Showroom</p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { src: '/images/mercury-showroom-2.jpg', alt: 'Mercury outboard engine lineup' },
              { src: '/images/mercury-showroom-3.jpg', alt: 'Mercury engines on stands in showroom' },
              { src: '/images/mercury-showroom-4.jpg', alt: 'Mercury 75 years display with engine inventory' },
            ].map(({ src, alt }) => (
              <div key={src} className="rounded-xl overflow-hidden aspect-square">
                <img src={src} alt={alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider fill="var(--color-marina-sand)" />

      {/* Storage */}
      <section className="py-20 bg-marina-sand" id="storage">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Boat Storage Options"
            subtitle="Secure storage solutions on the Suwannee River — choose the option that fits your needs and budget."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STORAGE_OPTIONS.map((option, i) => (
              <div
                key={option.type}
                className={`rounded-xl p-6 border ${i === 1 ? 'bg-marina-navy text-white border-marina-teal' : 'bg-white border-gray-100 shadow-sm'}`}
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${i === 1 ? 'bg-marina-teal/20' : 'bg-marina-teal/10'}`}>
                  <Anchor size={24} className="text-marina-teal" />
                </div>
                {i === 1 && (
                  <div className="text-marina-amber text-xs font-semibold uppercase tracking-wider mb-2">Most Popular</div>
                )}
                <h3 className={`font-serif font-bold text-xl mb-2 ${i === 1 ? 'text-white' : 'text-marina-navy'}`}>
                  {option.type}
                </h3>
                <p className={`text-sm leading-relaxed mb-4 ${i === 1 ? 'text-white/70' : 'text-marina-slate/70'}`}>
                  {option.description}
                </p>
                <ul className="space-y-2">
                  {option.features.map((feature) => (
                    <li key={feature} className={`flex items-center gap-2 text-sm ${i === 1 ? 'text-white/80' : 'text-marina-slate'}`}>
                      <CheckCircle size={14} className="text-marina-teal shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href={PHONE_HREF}
                  className={`mt-6 block text-center py-2.5 rounded-md text-sm font-semibold transition-colors ${
                    i === 1
                      ? 'bg-marina-amber text-white hover:bg-amber-600'
                      : 'border border-marina-teal text-marina-teal hover:bg-marina-teal hover:text-white'
                  }`}
                >
                  Call for Rates
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider fill="var(--color-marina-white)" />

      {/* Fuel, Bait & Supplies */}
      <section className="py-20 bg-marina-white" id="supplies">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Fuel, Bait, Tackle & Supplies"
            subtitle="Everything you need before heading out — right here at the marina."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Fuel, title: 'Fuel Dock', desc: 'On-site fuel dock with gasoline for your outboard motor. Convenient and quick before hitting the river.' },
              { icon: Anchor, title: 'Live Bait', desc: 'Fresh live bait stocked regularly — perfect for fishing the Suwannee River and surrounding waters.' },
              { icon: Ship, title: 'Tackle', desc: 'A solid selection of fishing tackle for freshwater and saltwater species found in the Suwannee River region.' },
              { icon: BookOpen, title: 'Marine Supplies', desc: 'Safety gear, oils, cleaners, accessories, and essential supplies to keep your boat ready.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-marina-sand rounded-xl p-6">
                <div className="w-12 h-12 bg-marina-teal/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon size={24} className="text-marina-teal" />
                </div>
                <h3 className="font-serif font-bold text-marina-navy text-lg mb-2">{title}</h3>
                <p className="text-marina-slate/70 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-marina-teal">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl font-bold text-white mb-4">Have Questions About Our Services?</h2>
          <p className="text-white/80 mb-8">Give us a call — our team is happy to help with anything you need.</p>
          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-2 bg-white text-marina-teal hover:bg-marina-sand px-8 py-4 rounded-md font-bold text-lg transition-colors shadow-md"
          >
            <Phone size={22} />
            {PHONE}
          </a>
        </div>
      </section>
    </>
  )
}
