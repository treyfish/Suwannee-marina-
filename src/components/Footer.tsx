import { Globe, Link2, Mail, MapPin, Phone, Share2 } from 'lucide-react'

const footerLinks = {
  Company: ['About', 'Careers', 'Press', 'Blog'],
  Support: ['Help Center', 'FAQ', 'Contact', 'Status'],
  Legal: ['Privacy', 'Terms', 'Cookies', 'Licenses'],
}

export default function Footer() {
  return (
    <footer className="section-outline !m-3 bg-[--color-section-footer] text-white">
      <span className="label-tag !bg-amber-500 !text-slate-900">Footer</span>
      <p className="section-desc !bg-slate-700 !text-slate-300">
        Bottom of every page. Links, contact info, social media, legal, and copyright.
      </p>

      <div className="pt-12 pb-6 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

            {/* BRAND COLUMN */}
            <div className="relative border-2 border-dashed border-slate-500 rounded p-4">
              <span className="absolute -top-2 left-2 bg-slate-600 text-amber-400 text-[10px] font-mono font-bold px-1 rounded">
                BRAND INFO
              </span>
              <h3 className="text-lg font-bold mb-2 mt-2">&#123; YourBrand &#125;</h3>
              <p className="text-sm text-slate-400 mb-4">
                A short tagline about what you do goes here.
              </p>
              {/* SOCIAL ICONS */}
              <div className="relative border border-dashed border-slate-500 rounded p-2 inline-flex gap-3">
                <span className="absolute -top-2 left-2 bg-slate-600 text-amber-400 text-[10px] font-mono font-bold px-1 rounded">
                  SOCIAL ICONS
                </span>
                <Globe size={18} className="text-slate-400 hover:text-white cursor-pointer transition mt-2" />
                <Share2 size={18} className="text-slate-400 hover:text-white cursor-pointer transition mt-2" />
                <Link2 size={18} className="text-slate-400 hover:text-white cursor-pointer transition mt-2" />
              </div>
            </div>

            {/* LINK COLUMNS */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title} className="relative border-2 border-dashed border-slate-500 rounded p-4">
                <span className="absolute -top-2 left-2 bg-slate-600 text-amber-400 text-[10px] font-mono font-bold px-1 rounded">
                  LINK COLUMN
                </span>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-3 mt-2">{title}</h4>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-slate-400 hover:text-white transition">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* CONTACT BAR */}
          <div className="relative border-2 border-dashed border-slate-500 rounded p-4 mb-6">
            <span className="absolute -top-2 left-2 bg-slate-600 text-amber-400 text-[10px] font-mono font-bold px-1 rounded">
              CONTACT INFO
            </span>
            <div className="flex flex-wrap gap-6 text-sm text-slate-400 mt-1">
              <span className="flex items-center gap-2"><Phone size={14} /> (555) 123-4567</span>
              <span className="flex items-center gap-2"><Mail size={14} /> hello@yourbrand.com</span>
              <span className="flex items-center gap-2"><MapPin size={14} /> 123 Main Street, Anytown USA</span>
            </div>
          </div>

          {/* COPYRIGHT BAR */}
          <div className="relative border-t border-slate-600 pt-4">
            <div className="relative border-2 border-dashed border-slate-500 rounded p-3 inline-block">
              <span className="absolute -top-2 left-2 bg-slate-600 text-amber-400 text-[10px] font-mono font-bold px-1 rounded">
                COPYRIGHT
              </span>
              <p className="text-xs text-slate-500 mt-1">&copy; 2026 YourBrand. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
