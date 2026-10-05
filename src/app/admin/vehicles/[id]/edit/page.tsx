import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { VehicleForm } from '@/components/admin/VehicleForm'

export const metadata = {
  title: 'Edit Vehicle | Kezzyk Autos Admin',
}

export default async function EditVehiclePage({
  params,
}: {
  params: { id: string }
}) {
  const supabase = await createClient()
  
  const { data: vehicle, error } = await supabase
    .from('vehicles')
    .select('*')
    .eq('id', params.id)
    .single()

  if (error || !vehicle) {
    notFound()
  }

  // Build the media array from the gallery column
  const galleryUrls = vehicle.gallery || []
  if (vehicle.cover_image_url && !galleryUrls.includes(vehicle.cover_image_url)) {
    galleryUrls.unshift(vehicle.cover_image_url) // Ensure cover is in the list
  }

  // Format data for the form
  const initialData = {
    ...vehicle,
    media: galleryUrls.map((url: string, index: number) => ({
      id: `media-${index}`,
      url: url,
      isCover: vehicle.cover_image_url === url,
    }))
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4">
        <Link 
          href="/admin/vehicles"
          className="p-2 -ml-2 text-text-secondary hover:text-text-primary rounded-full hover:bg-bg-elevated transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-display-sm font-bold text-text-primary">Edit Vehicle</h1>
          <p className="text-text-secondary mt-1">
            Editing {vehicle.year} {vehicle.make} {vehicle.model}
          </p>
        </div>
      </div>

      <VehicleForm initialData={initialData} />
    </div>
  )
}
