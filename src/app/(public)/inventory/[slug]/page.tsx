import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  Phone,
  ShieldCheck,
  Calendar,
  Gauge,
  Cog,
  Fuel,
  Car,
  Palette,
  MapPin,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { VehicleGallery } from '@/components/public/VehicleGallery'
import { VehicleSpecs } from '@/components/public/VehicleSpecs'
import { Badge } from '@/components/ui/Badge'
import { formatPrice, getWhatsAppUrl, CONTACT } from '@/lib/constants'
import { formatMileage } from '@/lib/utils'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const supabase = await createClient()
  const { data: vehicle } = await supabase
    .from('vehicles')
    .select('make, model, year, seo_title, seo_description, cover_image_url')
    .eq('slug', params.slug)
    .single()

  if (!vehicle) {
    return {
      title: 'Vehicle Not Found | Kezzyk Autos',
    }
  }

  const title = vehicle.seo_title || `${vehicle.year} ${vehicle.make} ${vehicle.model} | Kezzyk Autos`
  const description = vehicle.seo_description || `Check out this ${vehicle.year} ${vehicle.make} ${vehicle.model} at Kezzyk Autos. Premium cars, trusted deals.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: vehicle.cover_image_url ? [vehicle.cover_image_url] : [],
    },
  }
}

export default async function VehicleDetailsPage({
  params,
}: {
  params: { slug: string }
}) {
  const supabase = await createClient()

  // Fetch vehicle details with media
  const { data: vehicle, error } = await supabase
    .from('vehicles')
    .select(`
      *,
      vehicle_media (*)
    `)
    .eq('slug', params.slug)
    .single()

  if (error || !vehicle) {
    // If not found, gracefully return 404
    notFound()
  }

  const isSold = vehicle.availability === 'Sold'
  const vehicleName = `${vehicle.year} ${vehicle.make} ${vehicle.model}`

  const keySpecs = [
    { icon: Calendar, label: 'Year', value: vehicle.year?.toString() },
    { icon: Gauge, label: 'Mileage', value: vehicle.mileage ? formatMileage(vehicle.mileage) : null },
    { icon: Cog, label: 'Transmission', value: vehicle.transmission },
    { icon: Fuel, label: 'Fuel', value: vehicle.fuel_type },
    { icon: Car, label: 'Body', value: vehicle.body_type },
    { icon: Palette, label: 'Color', value: vehicle.color },
  ].filter((s) => s.value)

  return (
    <div className="min-h-screen bg-bg-primary pb-24">
      {/* Breadcrumb */}
      <div className="section-container py-6">
        <nav className="flex items-center gap-2 text-sm text-gray-500 min-w-0">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/inventory" className="hover:text-white transition-colors">Inventory</Link>
          <span>/</span>
          <span className="text-white truncate">{vehicleName}</span>
        </nav>
      </div>

      <div className="section-container">
        <div className="grid gap-10 lg:gap-14 lg:grid-cols-[minmax(0,1fr)_400px]">
          {/* Left: Gallery */}
          <div className="min-w-0 animate-fade-in-up">
            <VehicleGallery
              media={vehicle.vehicle_media || []}
              coverImage={vehicle.cover_image_url}
              vehicleName={vehicleName}
            />
          </div>

          {/* Right: Info panel */}
          <aside
            className="min-w-0 animate-fade-in-up"
            style={{ animationFillMode: 'both', animationDelay: '0.15s' }}
          >
            <div className="lg:sticky lg:top-24 space-y-8">
              {/* Badges + Title */}
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {vehicle.condition && <Badge variant="default">{vehicle.condition}</Badge>}
                  {vehicle.featured && <Badge variant="accent">Featured</Badge>}
                  {isSold ? (
                    <Badge variant="sold">Sold</Badge>
                  ) : (
                    <Badge variant={vehicle.availability === 'Reserved' ? 'accent' : 'success'}>
                      {vehicle.availability}
                    </Badge>
                  )}
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold text-white leading-tight break-words">
                  {vehicleName}
                </h1>
                <p className="text-3xl font-bold text-accent">{formatPrice(vehicle.price)}</p>
              </div>

              {/* Key specs — 2 columns, icon + label + value */}
              {keySpecs.length > 0 && (
                <div className="grid grid-cols-2 gap-x-6 gap-y-5 py-8 border-y border-white/10">
                  {keySpecs.map((spec) => (
                    <div key={spec.label} className="flex items-start gap-3 min-w-0">
                      <spec.icon className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">{spec.label}</p>
                        <p className="text-sm font-medium text-white break-words">{spec.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {vehicle.location && (
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <MapPin className="h-5 w-5 text-accent shrink-0" />
                  {vehicle.location}
                </div>
              )}

              {/* CTAs */}
              <div className="space-y-3">
                <a
                  href={isSold ? '#' : getWhatsAppUrl(`Hello Kezzyk Autos, I'm interested in the ${vehicleName}.`)}
                  target={isSold ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  aria-disabled={isSold}
                  className={`w-full h-14 px-6 rounded-button font-semibold flex items-center justify-center gap-3 transition-colors ${
                    isSold
                      ? 'bg-bg-elevated text-text-muted cursor-not-allowed pointer-events-none'
                      : 'bg-[#25D366] text-white hover:bg-[#1ebe5a]'
                  }`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  {isSold ? 'Vehicle Sold' : 'Enquire on WhatsApp'}
                </a>

                <a
                  href={isSold ? '#' : `tel:${CONTACT.phone}`}
                  aria-disabled={isSold}
                  className={`w-full h-14 px-6 rounded-button font-medium flex items-center justify-center gap-3 border transition-colors ${
                    isSold
                      ? 'border-border text-text-muted cursor-not-allowed pointer-events-none'
                      : 'border-white/20 text-white hover:bg-white/5 hover:border-white/40'
                  }`}
                >
                  <Phone className="w-5 h-5" />
                  Call Dealer
                </a>
              </div>

              {/* Trust */}
              <ul className="space-y-3 pt-2">
                {[
                  'Fully inspected & certified',
                  'Transparent pricing, no hidden fees',
                  'Nationwide delivery available',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-gray-400">
                    <ShieldCheck className="w-4 h-4 text-accent shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        {/* Tabs — full width below, like O.N.E */}
        <div className="mt-16 lg:mt-20">
          <VehicleSpecs vehicle={vehicle} />
        </div>
      </div>
    </div>
  )
}
