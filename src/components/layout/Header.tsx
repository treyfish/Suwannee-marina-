'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useCallback } from 'react'
import { Menu, Phone, Anchor } from 'lucide-react'
import { NAV_LINKS, PHONE, PHONE_HREF } from '@/lib/constants'
import { cn } from '@/lib/utils'
import MobileMenu from './MobileMenu'

export default function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-30 transition-all duration-300',
          scrolled
            ? 'bg-marina-navy/95 backdrop-blur-md shadow-lg'
            : 'bg-marina-navy'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <Anchor
                size={28}
                className="text-marina-teal group-hover:text-marina-amber transition-colors"
              />
              <div className="leading-tight">
                <div className="text-white font-serif font-bold text-base lg:text-lg">
                  Suwannee Shores
                </div>
                <div className="text-marina-teal text-xs font-medium tracking-wider uppercase">
                  Marina
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-4 py-2 rounded-md text-sm font-medium transition-colors',
                    pathname === link.href
                      ? 'text-white bg-white/10'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <a
              href={PHONE_HREF}
              className="hidden md:flex items-center gap-2 bg-marina-amber hover:bg-amber-600 text-white px-4 py-2 rounded-md text-sm font-semibold transition-colors"
            >
              <Phone size={16} />
              {PHONE}
            </a>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden text-white p-2 rounded-md hover:bg-white/10 transition-colors"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={menuOpen} onClose={closeMenu} />
    </>
  )
}
