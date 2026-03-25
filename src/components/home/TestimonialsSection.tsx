import { Star } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import { TESTIMONIALS } from '@/lib/constants'

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-marina-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="What Our Customers Say"
          subtitle="Rated 5 stars across Marinalife and Yellow Pages — here's what boaters say about us."
          light
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.author}
              className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} className="text-marina-amber fill-marina-amber" />
                ))}
              </div>

              <blockquote className="text-white/80 text-sm leading-relaxed mb-6 border-l-2 border-marina-teal pl-4 italic">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              <div>
                <div className="text-white font-semibold text-sm">{testimonial.author}</div>
                <div className="text-white/40 text-xs">{testimonial.location}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
