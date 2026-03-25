import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'

const cards = [
  {
    title: 'Boat Sales & Brokerage',
    description: 'New and pre-owned sales, financing, and brokerage services to find your perfect vessel.',
    href: '/services#boat-sales',
    bg: 'from-[#0D2B45] to-[#1A5276]',
    illustration: (
      <svg viewBox="0 0 120 80" fill="none" className="w-full h-full opacity-20" aria-hidden="true">
        {/* Boat hull */}
        <path d="M10 55 Q60 35 110 55 L105 65 Q60 72 15 65 Z" fill="white" />
        {/* Cabin */}
        <rect x="42" y="35" width="36" height="20" rx="3" fill="white" />
        <rect x="50" y="27" width="20" height="12" rx="2" fill="white" />
        {/* Mast */}
        <line x1="60" y1="10" x2="60" y2="35" stroke="white" strokeWidth="2" />
        {/* Water */}
        <path d="M0 68 Q30 63 60 68 Q90 73 120 68" stroke="white" strokeWidth="1.5" fill="none" opacity="0.4" />
        <path d="M0 73 Q30 68 60 73 Q90 78 120 73" stroke="white" strokeWidth="1.5" fill="none" opacity="0.3" />
      </svg>
    ),
    accent: '#D4892A',
  },
  {
    title: 'Marina Storage',
    description: 'Dry storage, covered slips, and open slips on the Suwannee River — short or long-term.',
    href: '/services#storage',
    bg: 'from-[#1A7F8E] to-[#0D5C6A]',
    illustration: (
      <svg viewBox="0 0 120 80" fill="none" className="w-full h-full opacity-20" aria-hidden="true">
        {/* Dock platform */}
        <rect x="5" y="48" width="110" height="8" rx="2" fill="white" />
        {/* Dock pilings */}
        {[18, 40, 62, 84, 102].map((x) => (
          <rect key={x} x={x} y="56" width="5" height="20" rx="1" fill="white" />
        ))}
        {/* Boats at dock */}
        <path d="M14 42 Q30 34 46 42 L44 48 Q30 51 16 48 Z" fill="white" />
        <path d="M60 40 Q76 32 92 40 L90 48 Q76 51 62 48 Z" fill="white" />
        {/* Water lines */}
        <path d="M0 64 Q60 59 120 64" stroke="white" strokeWidth="1" fill="none" opacity="0.4" />
        <path d="M0 70 Q60 65 120 70" stroke="white" strokeWidth="1" fill="none" opacity="0.3" />
        {/* Anchor */}
        <circle cx="100" cy="25" r="8" stroke="white" strokeWidth="1.5" fill="none" />
        <line x1="100" y1="17" x2="100" y2="33" stroke="white" strokeWidth="1.5" />
        <line x1="93" y1="30" x2="107" y2="30" stroke="white" strokeWidth="1.5" />
      </svg>
    ),
    accent: '#F0E6D3',
  },
  {
    title: 'Mercury Service & Repair',
    description: 'Mercury Platinum certified technicians for outboard motor service, repairs, and warranty.',
    href: '/services#service',
    photo: '/images/mercury-motor.jpeg',
    accent: '#D4892A',
  },
  {
    title: 'Fuel, Bait & Tackle',
    description: 'On-site fuel dock, live bait, fishing tackle, and marine supplies before you hit the water.',
    href: '/services#supplies',
    bg: 'from-[#1A4A3A] to-[#1A7F8E]',
    illustration: (
      <svg viewBox="0 0 120 80" fill="none" className="w-full h-full opacity-20" aria-hidden="true">
        {/* Fishing rod */}
        <line x1="15" y1="65" x2="100" y2="15" stroke="white" strokeWidth="3" strokeLinecap="round" />
        {/* Reel */}
        <circle cx="22" cy="60" r="7" stroke="white" strokeWidth="2" fill="none" />
        <circle cx="22" cy="60" r="3" fill="white" />
        {/* Fishing line */}
        <path d="M100 15 Q110 20 108 35 Q106 50 95 60" stroke="white" strokeWidth="1" fill="none" strokeDasharray="3 2" />
        {/* Hook */}
        <path d="M95 60 Q100 68 93 72 Q86 75 85 68" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* Fish */}
        <path d="M55 35 Q65 28 72 35 Q65 42 55 35 Z" fill="white" />
        <path d="M55 35 L48 30 L48 40 Z" fill="white" />
        {/* Water */}
        <path d="M0 68 Q30 63 60 68 Q90 73 120 68" stroke="white" strokeWidth="1.5" fill="none" opacity="0.4" />
      </svg>
    ),
    accent: '#1A7F8E',
  },
]

export default function ServicesOverview() {
  return (
    <section className="py-20 bg-marina-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Full-Service Marina"
          subtitle="Everything you need on the water — from buying your first boat to keeping it running perfectly."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 min-h-[260px] flex flex-col justify-end"
            >
              {/* Background — photo or gradient */}
              {card.photo ? (
                <>
                  <img
                    src={card.photo}
                    alt={card.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                </>
              ) : (
                <>
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.bg}`} />
                  <div className="absolute inset-0 p-4">
                    {card.illustration}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </>
              )}

              {/* Content */}
              <div className="relative z-10 p-5">
                <h3 className="font-serif font-bold text-white text-lg mb-1 leading-tight">
                  {card.title}
                </h3>
                <p className="text-white/70 text-xs leading-relaxed mb-3">
                  {card.description}
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-semibold group-hover:gap-2 transition-all" style={{ color: card.accent }}>
                  Learn More <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
