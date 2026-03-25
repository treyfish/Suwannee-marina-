import Link from 'next/link'
import { Ship, Anchor, Wrench, Fuel, ArrowRight } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import { SERVICES_OVERVIEW } from '@/lib/constants'

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Ship, Anchor, Wrench, Fuel,
}

export default function ServicesOverview() {
  return (
    <section className="py-20 bg-marina-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Full-Service Marina"
          subtitle="Everything you need on the water — from buying your first boat to keeping it running perfectly."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES_OVERVIEW.map((service) => {
            const Icon = iconMap[service.iconName] ?? Anchor
            return (
              <Link
                key={service.title}
                href={service.href}
                className="group bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md hover:border-marina-teal/30 transition-all duration-200"
              >
                <div className="w-12 h-12 bg-marina-teal/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-marina-teal/20 transition-colors">
                  <Icon size={24} className="text-marina-teal" />
                </div>
                <h3 className="font-serif font-bold text-marina-navy text-lg mb-2">{service.title}</h3>
                <p className="text-marina-slate/70 text-sm leading-relaxed mb-4">{service.description}</p>
                <span className="inline-flex items-center gap-1 text-marina-teal text-sm font-medium group-hover:gap-2 transition-all">
                  Learn More <ArrowRight size={14} />
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
