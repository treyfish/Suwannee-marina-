'use client'

import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const navLinks = ['Home', 'About', 'Services', 'Portfolio', 'Blog', 'Contact']

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="section-outline !m-3 !mt-10 bg-[--color-section-nav]">
      <span className="label-tag">Header / Navbar</span>
      <p className="section-desc">
        Fixed at top. Contains logo, navigation links, and call-to-action. Stays visible as you scroll.
      </p>

      <div className="pt-10 pb-8 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* LOGO */}
          <div className="relative border-2 border-dashed border-indigo-300 rounded px-4 py-2">
            <span className="absolute -top-2 left-2 bg-indigo-100 text-indigo-700 text-[10px] font-mono font-bold px-1 rounded">
              LOGO
            </span>
            <span className="text-xl font-bold text-slate-800">
              &#123; YourBrand &#125;
            </span>
          </div>

          {/* NAV LINKS — Desktop */}
          <nav className="hidden md:flex relative border-2 border-dashed border-indigo-300 rounded px-4 py-2 gap-6">
            <span className="absolute -top-2 left-2 bg-indigo-100 text-indigo-700 text-[10px] font-mono font-bold px-1 rounded">
              NAV LINKS
            </span>
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* CTA BUTTON */}
          <div className="hidden md:block relative border-2 border-dashed border-indigo-300 rounded px-1 py-1">
            <span className="absolute -top-2 left-2 bg-indigo-100 text-indigo-700 text-[10px] font-mono font-bold px-1 rounded">
              CTA BUTTON
            </span>
            <button className="bg-slate-800 text-white text-sm font-semibold px-5 py-2 rounded-md hover:bg-slate-700 transition">
              Get Started
            </button>
          </div>

          {/* HAMBURGER — Mobile */}
          <button
            className="md:hidden relative border-2 border-dashed border-indigo-300 rounded p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span className="absolute -top-2 left-1 bg-indigo-100 text-indigo-700 text-[10px] font-mono font-bold px-1 rounded">
              HAMBURGER
            </span>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {mobileOpen && (
          <div className="md:hidden mt-4 relative border-2 border-dashed border-indigo-300 rounded p-4">
            <span className="absolute -top-2 left-2 bg-indigo-100 text-indigo-700 text-[10px] font-mono font-bold px-1 rounded">
              MOBILE MENU
            </span>
            <div className="flex flex-col gap-3 pt-2">
              {navLinks.map((link) => (
                <a key={link} href="#" className="text-sm font-medium text-slate-600 hover:text-slate-900">
                  {link}
                </a>
              ))}
              <button className="bg-slate-800 text-white text-sm font-semibold px-5 py-2 rounded-md mt-2">
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
