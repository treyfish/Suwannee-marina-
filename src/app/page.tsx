import {
  ChevronDown, Star, ArrowRight, Check, Quote,
  Zap, Shield, Users, Globe, ChevronRight,
  HelpCircle, Mail, BarChart3, Heart, Rocket, Eye
} from 'lucide-react'

export default function Home() {
  return (
    <div className="space-y-0">

      {/* ════════════════════════════════════════
          1. HERO SECTION
          ════════════════════════════════════════ */}
      <section className="section-outline !m-3 bg-[--color-section-hero] min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
        <span className="label-tag">Hero Section</span>
        <p className="section-desc">
          First thing visitors see. Big headline, subtext, and a call-to-action. Sets the tone for the entire site.
        </p>

        <div className="max-w-3xl mt-8">
          {/* BADGE */}
          <div className="relative inline-block border-2 border-dashed border-blue-300 rounded-full px-4 py-1 mb-6">
            <span className="absolute -top-3 left-2 bg-blue-100 text-blue-700 text-[10px] font-mono font-bold px-1 rounded">
              BADGE
            </span>
            <span className="text-xs font-semibold text-blue-700 flex items-center gap-1">
              <Rocket size={12} /> New Feature Available
            </span>
          </div>

          {/* HEADLINE */}
          <div className="relative border-2 border-dashed border-blue-300 rounded p-4 mb-4">
            <span className="absolute -top-2 left-2 bg-blue-100 text-blue-700 text-[10px] font-mono font-bold px-1 rounded">
              HEADLINE (h1)
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight mt-2">
              The Main Headline
              <span className="block text-blue-600">Goes Right Here</span>
            </h1>
          </div>

          {/* SUBHEADLINE */}
          <div className="relative border-2 border-dashed border-blue-300 rounded p-3 mb-6">
            <span className="absolute -top-2 left-2 bg-blue-100 text-blue-700 text-[10px] font-mono font-bold px-1 rounded">
              SUBHEADLINE (p)
            </span>
            <p className="text-lg text-slate-600 mt-2">
              A supporting sentence that explains your value proposition. Keep it short, clear, and benefit-focused.
            </p>
          </div>

          {/* CTA BUTTONS */}
          <div className="relative border-2 border-dashed border-blue-300 rounded p-4 inline-flex gap-4 flex-wrap justify-center">
            <span className="absolute -top-2 left-2 bg-blue-100 text-blue-700 text-[10px] font-mono font-bold px-1 rounded">
              CTA BUTTONS
            </span>
            <button className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition mt-2">
              Primary Action
            </button>
            <button className="bg-white text-slate-700 font-semibold px-6 py-3 rounded-lg border border-slate-300 hover:bg-slate-50 transition mt-2">
              Secondary Action
            </button>
          </div>
        </div>

        {/* SCROLL INDICATOR */}
        <div className="relative border-2 border-dashed border-blue-300 rounded p-2 mt-10 inline-block">
          <span className="absolute -top-2 left-2 bg-blue-100 text-blue-700 text-[10px] font-mono font-bold px-1 rounded">
            SCROLL CUE
          </span>
          <ChevronDown size={24} className="text-slate-400 animate-bounce mt-2" />
        </div>
      </section>

      {/* ════════════════════════════════════════
          2. SOCIAL PROOF / TRUST BAR
          ════════════════════════════════════════ */}
      <section className="section-outline !m-3 bg-white py-8 px-6">
        <span className="label-tag">Social Proof / Trust Bar</span>
        <p className="section-desc">
          Builds credibility fast. Logos of partners, clients, or press mentions.
        </p>
        <div className="max-w-5xl mx-auto pt-8">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-slate-400 mb-6">
            Trusted by leading companies
          </p>
          <div className="flex flex-wrap justify-center gap-8 items-center">
            {['Acme Co', 'Globex', 'Initech', 'Umbrella', 'Wonka'].map((name) => (
              <div key={name} className="relative border-2 border-dashed border-slate-200 rounded px-6 py-3">
                <span className="absolute -top-2 left-2 bg-slate-100 text-slate-500 text-[10px] font-mono font-bold px-1 rounded">
                  LOGO
                </span>
                <span className="text-lg font-bold text-slate-300 mt-1 block">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          3. FEATURES / SERVICES GRID
          ════════════════════════════════════════ */}
      <section className="section-outline !m-3 bg-[--color-section-features] py-16 px-6">
        <span className="label-tag">Features / Services Grid</span>
        <p className="section-desc">
          Showcases what you offer. Usually 3-6 cards in a grid, each with an icon, title, and description.
        </p>

        <div className="max-w-6xl mx-auto pt-8">
          {/* SECTION HEADING */}
          <div className="relative border-2 border-dashed border-emerald-400 rounded p-4 text-center mb-10 max-w-2xl mx-auto">
            <span className="absolute -top-2 left-2 bg-emerald-100 text-emerald-700 text-[10px] font-mono font-bold px-1 rounded">
              SECTION HEADING
            </span>
            <h2 className="text-3xl font-bold text-slate-900 mt-2">Why Choose Us</h2>
            <p className="text-slate-600 mt-2">A subtitle that adds context to the section heading.</p>
          </div>

          {/* CARD GRID */}
          <div className="relative border-2 border-dashed border-emerald-400 rounded p-4">
            <span className="absolute -top-2 left-2 bg-emerald-100 text-emerald-700 text-[10px] font-mono font-bold px-1 rounded">
              CARD GRID (3-col)
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              {[
                { icon: <Zap size={24} />, title: 'Feature One', desc: 'A short explanation of this feature and why it matters to the user.' },
                { icon: <Shield size={24} />, title: 'Feature Two', desc: 'Another benefit. Keep these scannable — visitors skim, not read.' },
                { icon: <Users size={24} />, title: 'Feature Three', desc: 'Third value prop. Three cards is the most common pattern.' },
                { icon: <Globe size={24} />, title: 'Feature Four', desc: 'Some sites use 4 or 6 cards. Even numbers balance well.' },
                { icon: <Eye size={24} />, title: 'Feature Five', desc: 'Icons make features scannable at a glance.' },
                { icon: <Heart size={24} />, title: 'Feature Six', desc: 'Six cards fill a nice 3x2 or 2x3 grid layout.' },
              ].map((item) => (
                <div key={item.title} className="relative border-2 border-dashed border-emerald-300 rounded-lg p-5 bg-white">
                  <span className="absolute -top-2 left-2 bg-emerald-50 text-emerald-600 text-[10px] font-mono font-bold px-1 rounded">
                    CARD
                  </span>
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 mb-3 mt-2">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          4. STATS / NUMBERS SECTION
          ════════════════════════════════════════ */}
      <section className="section-outline !m-3 bg-[--color-section-stats] py-14 px-6">
        <span className="label-tag">Stats / Numbers Section</span>
        <p className="section-desc">
          Hard numbers build trust. Usually 3-4 key metrics displayed prominently.
        </p>
        <div className="max-w-4xl mx-auto pt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: '10K+', label: 'Users' },
              { number: '99.9%', label: 'Uptime' },
              { number: '50+', label: 'Countries' },
              { number: '4.9/5', label: 'Rating' },
            ].map((stat) => (
              <div key={stat.label} className="relative border-2 border-dashed border-purple-300 rounded p-4 text-center bg-white">
                <span className="absolute -top-2 left-2 bg-purple-100 text-purple-700 text-[10px] font-mono font-bold px-1 rounded">
                  STAT
                </span>
                <BarChart3 size={20} className="mx-auto text-purple-400 mb-2 mt-2" />
                <p className="text-3xl font-extrabold text-slate-900">{stat.number}</p>
                <p className="text-sm text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          5. SPLIT CONTENT (Text + Image)
          ════════════════════════════════════════ */}
      <section className="section-outline !m-3 bg-white py-16 px-6">
        <span className="label-tag">Split Content Section</span>
        <p className="section-desc">
          Two-column layout: text on one side, image/visual on the other. Very common for &quot;About&quot; or feature deep-dives.
        </p>
        <div className="max-w-6xl mx-auto pt-8 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* TEXT SIDE */}
          <div className="relative border-2 border-dashed border-slate-300 rounded p-6">
            <span className="absolute -top-2 left-2 bg-slate-100 text-slate-600 text-[10px] font-mono font-bold px-1 rounded">
              TEXT COLUMN
            </span>
            <h2 className="text-3xl font-bold text-slate-900 mb-4 mt-2">A Deeper Look at Something</h2>
            <p className="text-slate-600 mb-4">
              This is where you go deeper on a topic. Explain a key feature, your story, or a process.
              The two-column split keeps things visual and easy to scan.
            </p>
            <ul className="space-y-2 mb-6">
              {['Benefit point one', 'Benefit point two', 'Benefit point three'].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-slate-700">
                  <Check size={16} className="text-green-500 shrink-0" /> {item}
                </li>
              ))}
            </ul>
            <div className="relative border-2 border-dashed border-slate-300 rounded p-2 inline-block">
              <span className="absolute -top-2 left-2 bg-slate-100 text-slate-600 text-[10px] font-mono font-bold px-1 rounded">
                INLINE CTA
              </span>
              <button className="text-sm font-semibold text-blue-600 flex items-center gap-1 mt-1">
                Learn more <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* IMAGE SIDE */}
          <div className="relative border-2 border-dashed border-slate-300 rounded p-6">
            <span className="absolute -top-2 left-2 bg-slate-100 text-slate-600 text-[10px] font-mono font-bold px-1 rounded">
              IMAGE / VISUAL
            </span>
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg h-64 flex items-center justify-center mt-2">
              <span className="text-slate-400 font-mono text-sm">600 x 400 image placeholder</span>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          6. TESTIMONIALS
          ════════════════════════════════════════ */}
      <section className="section-outline !m-3 bg-[--color-section-testimonials] py-16 px-6">
        <span className="label-tag">Testimonials Section</span>
        <p className="section-desc">
          Social proof from real users. Quotes, names, and star ratings build trust and credibility.
        </p>
        <div className="max-w-5xl mx-auto pt-8">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-10">What People Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Jane Doe', role: 'CEO, Acme', quote: 'This product changed how we work. The team is incredibly responsive.' },
              { name: 'John Smith', role: 'Developer', quote: 'I was skeptical at first, but the results speak for themselves.' },
              { name: 'Sarah Lee', role: 'Designer', quote: 'Beautiful, intuitive, and a joy to use every single day.' },
            ].map((t) => (
              <div key={t.name} className="relative border-2 border-dashed border-violet-300 rounded-lg p-5 bg-white">
                <span className="absolute -top-2 left-2 bg-violet-100 text-violet-700 text-[10px] font-mono font-bold px-1 rounded">
                  TESTIMONIAL CARD
                </span>
                <Quote size={20} className="text-violet-300 mb-2 mt-3" />
                <p className="text-sm text-slate-600 italic mb-4">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-1 mb-2">
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="relative border-t border-slate-100 pt-2 mt-2">
                  <p className="text-sm font-semibold text-slate-800">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          7. CTA BANNER
          ════════════════════════════════════════ */}
      <section className="section-outline !m-3 bg-[--color-section-cta] py-14 px-6">
        <span className="label-tag">CTA Banner</span>
        <p className="section-desc">
          A bold, focused call-to-action. Usually one headline + one button. Drives conversions.
        </p>
        <div className="max-w-3xl mx-auto text-center pt-8">
          <div className="relative border-2 border-dashed border-amber-400 rounded p-8 bg-white">
            <span className="absolute -top-2 left-2 bg-amber-100 text-amber-700 text-[10px] font-mono font-bold px-1 rounded">
              CTA CONTENT
            </span>
            <h2 className="text-3xl font-bold text-slate-900 mb-3 mt-2">Ready to Get Started?</h2>
            <p className="text-slate-600 mb-6">Join thousands of satisfied users. No credit card required.</p>
            <button className="bg-amber-500 text-white font-bold px-8 py-3 rounded-lg text-lg hover:bg-amber-600 transition">
              Start Free Trial
            </button>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          8. FAQ / ACCORDION
          ════════════════════════════════════════ */}
      <section className="section-outline !m-3 bg-[--color-section-faq] py-16 px-6">
        <span className="label-tag">FAQ Section</span>
        <p className="section-desc">
          Answers common questions. Reduces support load and helps visitors make decisions.
        </p>
        <div className="max-w-3xl mx-auto pt-8">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-10">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: 'What is this section for?', a: 'FAQs address objections and answer common questions so visitors don\'t have to contact you.' },
              { q: 'How many questions should I include?', a: 'Usually 4-8 questions. Focus on real questions your users actually ask.' },
              { q: 'Should these be expandable?', a: 'Yes — accordion-style (click to expand) is the most common UX pattern for FAQs.' },
              { q: 'Where does this section go?', a: 'Usually near the bottom, after features and testimonials but before the final CTA.' },
            ].map((faq) => (
              <div key={faq.q} className="relative border-2 border-dashed border-rose-300 rounded-lg p-4 bg-white">
                <span className="absolute -top-2 left-2 bg-rose-100 text-rose-700 text-[10px] font-mono font-bold px-1 rounded">
                  FAQ ITEM
                </span>
                <div className="flex items-start gap-3 mt-2">
                  <HelpCircle size={20} className="text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-900">{faq.q}</p>
                    <p className="text-sm text-slate-600 mt-1">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          9. NEWSLETTER / EMAIL SIGNUP
          ════════════════════════════════════════ */}
      <section className="section-outline !m-3 bg-[--color-section-newsletter] py-14 px-6">
        <span className="label-tag">Newsletter Signup</span>
        <p className="section-desc">
          Captures emails for marketing. Usually a simple input + button combo.
        </p>
        <div className="max-w-2xl mx-auto text-center pt-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Stay in the Loop</h2>
          <p className="text-slate-600 mb-6">Get updates delivered to your inbox. No spam, unsubscribe anytime.</p>

          <div className="relative border-2 border-dashed border-emerald-400 rounded p-4 inline-block">
            <span className="absolute -top-2 left-2 bg-emerald-100 text-emerald-700 text-[10px] font-mono font-bold px-1 rounded">
              FORM INPUT + SUBMIT
            </span>
            <div className="flex gap-2 mt-2">
              <div className="relative border border-dashed border-emerald-300 rounded">
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="px-4 py-2.5 rounded-lg border border-slate-200 text-sm w-64 bg-white"
                  readOnly
                />
              </div>
              <button className="bg-emerald-600 text-white font-semibold px-5 py-2.5 rounded-lg text-sm hover:bg-emerald-700 transition flex items-center gap-1">
                <Mail size={14} /> Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          KEY / LEGEND
          ════════════════════════════════════════ */}
      <section className="section-outline !m-3 bg-white py-12 px-6">
        <span className="label-tag !bg-slate-800">Legend / Guide</span>
        <div className="max-w-4xl mx-auto pt-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">How to Read This Page</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-3 rounded bg-slate-50">
              <div className="w-3 h-3 mt-1 border-2 border-dashed border-slate-400 rounded shrink-0"></div>
              <div>
                <p className="font-semibold text-sm text-slate-800">Dashed borders</p>
                <p className="text-xs text-slate-500">Show the boundaries of each component or section</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded bg-slate-50">
              <div className="label-tag !relative !top-0 !left-0 !text-[9px]">TAG</div>
              <div>
                <p className="font-semibold text-sm text-slate-800">Dark labels</p>
                <p className="text-xs text-slate-500">Name the component (Hero, Nav, CTA, Card, etc.)</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded bg-slate-50">
              <div className="w-6 h-4 bg-blue-100 rounded shrink-0 mt-0.5"></div>
              <div>
                <p className="font-semibold text-sm text-slate-800">Background colors</p>
                <p className="text-xs text-slate-500">Each section has a unique color so you can see where one ends and the next begins</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded bg-slate-50">
              <span className="font-mono text-xs text-slate-500 shrink-0 mt-0.5">abc</span>
              <div>
                <p className="font-semibold text-sm text-slate-800">Monospace descriptions</p>
                <p className="text-xs text-slate-500">Explain what each section does and why it exists</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
