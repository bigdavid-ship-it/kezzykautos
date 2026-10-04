import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'Kezzyk Autos | Premium Cars. Trusted Deals.',
    template: '%s | Kezzyk Autos',
  },
  description:
    'Kezzyk Autos — your trusted destination for premium vehicles. Quality cars, transparent pricing, and exceptional service.',
  keywords: ['cars', 'automobiles', 'dealership', 'premium cars', 'Kezzyk Autos', 'trusted deals', 'Nigeria'],
  authors: [{ name: 'Cintiq Web Solutions' }],
  creator: 'Cintiq Web Solutions',
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    siteName: 'Kezzyk Autos',
    title: 'Kezzyk Autos | Premium Cars. Trusted Deals.',
    description:
      'Kezzyk Autos — your trusted destination for premium vehicles. Quality cars, transparent pricing, and exceptional service.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kezzyk Autos | Premium Cars. Trusted Deals.',
    description:
      'Kezzyk Autos — your trusted destination for premium vehicles. Quality cars, transparent pricing, and exceptional service.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

import { createClient } from '@/lib/supabase/server'
import { SettingsProvider } from '@/components/providers/SettingsProvider'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: settings } = await supabase.from('settings').select('*').eq('id', 1).single()

  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        <SettingsProvider settings={settings}>
          {children}
        </SettingsProvider>
      </body>
    </html>
  )
}
