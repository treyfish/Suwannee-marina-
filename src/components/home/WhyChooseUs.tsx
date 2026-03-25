import { CheckCircle } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import { FOUNDED } from '@/lib/constants'

const reasons = [
  `Over ${new Date().getFullYear() - FOUNDED} years of family ownership and expertise`,
  'Mercury Platinum Dealership — certified sales, service & warranty',
  'Knowledgeable technicians specializing in outboard motors',
  'Serving boaters throughout Florida and the Southeast',
  'Full-service marina: storage, fuel, bait, tackle, and supplies',
  'Financing available on new and pre-owned boats',
]

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-marina-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <SectionHeading
              title="Why Boaters Trust Us"
              subtitle={`Since ${FOUNDED}, Suwannee Shores Marina has built a reputation for honest service, skilled technicians, and genuine care for every customer.`}
              centered={false}
            />

            <ul className="space-y-3 mb-8">
              {reasons.map((reason) => (
                <li key={reason} className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-marina-teal shrink-0 mt-0.5" />
                  <span className="text-marina-slate">{reason}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Mercury Photo + Badge */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <div className="relative">
                <img
                  src="/images/mercury-showroom-3.jpg"
                  alt="Mercury outboard engine showroom at Suwannee Shores Marina"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-marina-navy/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-marina-amber text-xs font-semibold uppercase tracking-widest mb-1">Authorized Dealer</div>
                  <div className="text-white font-serif font-bold text-xl">Mercury Platinum Dealership</div>
                </div>
              </div>
              <div className="bg-marina-navy p-6">
                <p className="text-white/70 text-sm leading-relaxed mb-4">
                  As a Mercury Platinum dealer, we maintain the highest standards in outboard motor
                  sales, service, and warranty support. Our certified technicians are experts in
                  all Mercury engine lines.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Sales', 'Service', 'Warranty', 'Parts'].map((tag) => (
                    <span key={tag} className="bg-marina-teal/20 border border-marina-teal/40 text-marina-teal text-xs px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-marina-teal/10 rounded-full -z-10" />
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-marina-amber/10 rounded-full -z-10" />
          </div>
        </div>
      </div>
    </section>
  )
}
