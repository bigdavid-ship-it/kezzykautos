import { Metadata } from 'next'
import { Hero } from '@/components/public/Hero'
import { FeaturedVehicles } from '@/components/public/FeaturedVehicles'
import { CTASection } from '@/components/public/CTASection'

export const metadata: Metadata = {
  title: 'Kezzyk Autos | Premium Cars. Trusted Deals.',
  description:
    'Kezzyk Autos — your trusted destination for premium vehicles in Nigeria. Quality cars, transparent pricing, and exceptional service.',
}

export const revalidate = 60

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedVehicles />
      <CTASection />
    </>
  )
}
