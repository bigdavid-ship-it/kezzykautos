'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, Search } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Inventory', href: '/inventory' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-bg-primary/95 backdrop-blur supports-[backdrop-filter]:bg-bg-primary/80 border-b border-white/10">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 max-w-7xl">
          <Link href="/" className="flex items-center">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center h-10 w-10">
                <Image
                  src="/images/logo.png"
                  alt="Kezzyk Autos Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-black text-lg tracking-wider text-white">
                  KEZZYK<span className="text-accent">AUTOS</span>
                </span>
                <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-white opacity-70 mt-0.5">
                  Premium Deals
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href))
              
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative py-2 text-sm font-medium tracking-wide transition-colors",
                    isActive 
                      ? "text-white after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-0.5 after:bg-accent after:rounded-full" 
                      : "text-gray-400 hover:text-white"
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/inventory" className="inline-flex min-w-0 items-center justify-center gap-2 rounded-md text-center text-sm font-medium leading-tight transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent h-9 w-9 text-gray-300 hover:text-white">
              <Search className="h-5 w-5" />
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center gap-2">
            <Link href="/inventory" className="inline-flex min-w-0 items-center justify-center gap-2 rounded-md text-center text-sm font-medium leading-tight transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-white/5 h-9 w-9 text-gray-300">
              <Search className="h-5 w-5" />
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex min-w-0 items-center justify-center gap-2 rounded-md text-center text-sm font-medium leading-tight transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-white/5 h-9 w-9 text-gray-300"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          'fixed inset-0 top-16 z-40 bg-bg-primary lg:hidden transition-all duration-300',
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        )}
      >
        <nav className="flex flex-col px-6 pt-8">
          {navLinks.map((link, i) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href))
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{ transitionDelay: isOpen ? `${i * 50}ms` : '0ms' }}
                className={cn(
                  'flex items-center justify-between py-5 border-b border-white/10 text-2xl font-light tracking-tight transition-all duration-300',
                  isOpen ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
                  isActive ? 'text-accent' : 'text-white hover:text-accent'
                )}
              >
                {link.label}
                <span className="text-sm text-gray-600">0{i + 1}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </>
  )
}
