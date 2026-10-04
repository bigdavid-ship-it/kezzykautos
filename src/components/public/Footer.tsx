'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react'
import { CONTACT, SOCIAL_LINKS, getWhatsAppUrl } from '@/lib/constants'

import { useSettings } from '@/components/providers/SettingsProvider'

const QUICK_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/inventory', label: 'Inventory' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
]

const SUPPORT_LINKS = [
  { href: '/contact', label: 'Contact Us' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms & Conditions' },
]

export function Footer() {
  const year = new Date().getFullYear()
  const settings = useSettings()

  const fallbackContact = CONTACT
  const fallbackSocial = SOCIAL_LINKS

  const tiktok = settings ? settings.tiktok_url : fallbackSocial.tiktok
  const facebook = settings ? settings.facebook_url : fallbackSocial.facebook
  const phone = settings ? settings.contact_phone : fallbackContact.phone
  const email = settings ? settings.contact_email : fallbackContact.email
  const address = settings ? settings.address : fallbackContact.address

  return (
    <footer className="bg-bg-primary border-t border-white/10">
      <div className="section-container py-16 md:py-20">
        {/* Brand row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 pb-12 border-b border-white/10">
          <div className="space-y-5 max-w-sm">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10">
                <Image src="/images/logo.png" alt="Kezzyk Autos Logo" fill className="object-contain" />
              </div>
              <span className="font-black tracking-wider text-white text-lg">
                KEZZYK<span className="text-accent">AUTOS</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Premium Cars. Trusted Deals. Quality vehicles, transparent pricing and exceptional service.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {tiktok && (
              <a
                href={tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-accent transition-colors"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
              </a>
            )}
            {facebook && (
              <a
                href={facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-accent transition-colors"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
            )}
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-accent transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Link columns — 2 per row on mobile so the footer isn't one long list */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 py-12">
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 font-medium mb-5">Explore</h3>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-gray-300 hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 font-medium mb-5">Support</h3>
            <ul className="space-y-3">
              {SUPPORT_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-gray-300 hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-2">
            <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 font-medium mb-5">Get in Touch</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              <li className="flex items-center gap-3 text-sm text-gray-300">
                <Phone className="h-4 w-4 text-accent shrink-0" />
                <a href={`tel:${phone}`} className="hover:text-accent transition-colors">{phone}</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-300">
                <Mail className="h-4 w-4 text-accent shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-accent transition-colors break-all">{email}</a>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-300 sm:col-span-2">
                <MapPin className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <span>{address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-3 text-center">
          <p className="text-xs text-gray-500">© {year} Kezzyk Autos. All rights reserved.</p>
          <p className="text-[11px] text-gray-600">
            Designed &amp; Developed by{' '}
            <a
              href="https://dave-s-portfolio-ten.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent-hover font-medium transition-colors"
            >
              Ezeilo David Chisom
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
