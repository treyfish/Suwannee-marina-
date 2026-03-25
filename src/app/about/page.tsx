import type { Metadata } from 'next'
import { Anchor, Users, Award, MapPin } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import WaveDivider from '@/components/ui/WaveDivider'
import { HISTORY_MILESTONES, FOUNDED, OWNER } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Our Story',
  description: `Learn about Suwannee Shores Marina — family-owned since ${FOUNDED} by ${OWNER} on the Suwannee River in Old Town, FL.`,
}

const stats = [
  { value: `${new Date().getFullYear() - FOUNDED}+`, label: 'Years in Business', icon: Anchor },
  { value: '5★', label: 'Customer Rating', icon: Award },
  { value: 'Platinum', label: 'Mercury Dealer Status', icon: Award },
  { value: 'SE', label: 'Regional Service Area', icon: MapPin },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-marina-navy py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6">
            A Family Legacy Since {FOUNDED}
          </h1>
          <p className="text-white/70 text-lg leading-relaxed">
            For over fifty years, Suwannee Shores Marina has been more than a business — it&apos;s been a gathering place for boaters, fishermen, and families who call the Suwannee River home.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-marina-teal">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-white text-center">
            {stats.map(({ value, label, icon: Icon }) => (
              <div key={label}>
                <Icon size={24} className="mx-auto mb-2 text-white/60" />
                <div className="font-serif text-3xl font-bold">{value}</div>
                <div className="text-white/70 text-sm mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider fill="var(--color-marina-white)" />

      {/* Our Story */}
      <section className="py-20 bg-marina-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading title="Our Story" centered={false} />
              <div className="space-y-4 text-marina-slate/80 leading-relaxed">
                <p>
                  Suwannee Shores Marina opened in {FOUNDED} on the banks of the Suwannee River in Old Town, Florida — and from day one, it was built around a simple idea: treat every customer the way you&apos;d want to be treated yourself.
                </p>
                <p>
                  Today, under the ownership of <strong>{OWNER}</strong>, that same philosophy drives everything we do. Whether you&apos;re buying your first boat, bringing in a motor for repair, or picking up bait before an early morning on the river — you&apos;ll always be met by people who genuinely know their craft and care about getting it right.
                </p>
                <p>
                  Our technicians are among the best in the region for Mercury outboard motors, and our Platinum dealership status reflects years of commitment to training, service quality, and customer satisfaction.
                </p>
                <p>
                  We&apos;re proud to serve boaters across Florida and throughout the Southeast — and even prouder that so many of them have been coming back for decades.
                </p>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden min-h-[380px]">
              <img
                src="/images/marina-building.png"
                alt="Suwannee Shores Marina building in Old Town, Florida"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="relative z-10 p-6 flex flex-col justify-end min-h-[380px]">
                <div className="mt-auto">
                  <div className="text-marina-teal text-xs font-semibold uppercase tracking-widest mb-1">Old Town, Florida</div>
                  <div className="text-white font-serif font-bold text-xl">Suwannee Shores Marina</div>
                  <div className="text-white/60 text-sm mt-1">Serving boaters since 1973</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider fill="var(--color-marina-sand)" />

      {/* History Timeline */}
      <section className="py-20 bg-marina-sand">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Our History" subtitle="Key milestones in over 50 years of serving the Suwannee River community." />

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-marina-teal/30 hidden sm:block" />

            <div className="space-y-8">
              {HISTORY_MILESTONES.map((milestone, i) => (
                <div key={milestone.year} className="sm:flex gap-6 items-start">
                  {/* Dot + Year */}
                  <div className="shrink-0 flex sm:flex-col items-center gap-3 sm:gap-1 mb-3 sm:mb-0">
                    <div className="relative z-10 w-12 h-12 bg-marina-navy rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md">
                      {milestone.year}
                    </div>
                  </div>
                  {/* Content */}
                  <div className={`bg-white rounded-xl p-6 shadow-sm flex-1 border-l-4 ${i % 2 === 0 ? 'border-marina-teal' : 'border-marina-amber'}`}>
                    <h3 className="font-serif font-bold text-marina-navy text-lg mb-2">{milestone.title}</h3>
                    <p className="text-marina-slate/70 text-sm leading-relaxed">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <WaveDivider fill="var(--color-marina-navy)" flip />

      {/* Mercury Section */}
      <section className="py-20 bg-marina-navy">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block bg-marina-amber/20 border border-marina-amber/40 text-marina-amber text-xs font-semibold px-3 py-1 rounded-full tracking-wide mb-6">
            Mercury Platinum Dealership
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-6">
            Certified Mercury Expertise
          </h2>
          <p className="text-white/70 text-lg leading-relaxed mb-8">
            Achieving Mercury Platinum status isn&apos;t easy — it requires meeting rigorous standards for sales performance, technical training, facility quality, and customer satisfaction. We&apos;re proud to hold this distinction and to offer our customers the full backing of Mercury Marine&apos;s warranty and support network.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Factory Certified Technicians', 'Full Warranty Support', 'Genuine Mercury Parts', 'Sales & Service', 'All Engine Lines'].map((tag) => (
              <span key={tag} className="bg-white/10 border border-white/20 text-white/80 text-sm px-4 py-2 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
