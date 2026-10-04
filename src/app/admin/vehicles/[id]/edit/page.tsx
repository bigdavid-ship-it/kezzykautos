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
    .select(`
      *,
      vehicle_media (*)
    `)
    .eq('id', params.id)
    .single()

  if (error || !vehicle) {
    notFound()
  }

  // Format data for the form
  const initialData = {
    ...vehicle,
    // Add media to initial data so MediaUploader can render it
    media: vehicle.vehicle_media?.map((m: any) => ({
      id: m.id,
      url: m.url,
      isCover: vehicle.cover_image_url === m.url,
    })) || []
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
