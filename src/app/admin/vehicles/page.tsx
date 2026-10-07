export const dynamic = 'force-dynamic'
export const revalidate = 0

import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { formatPrice } from '@/lib/constants'
import { formatDate } from '@/lib/utils'
import { Plus, Edit2, Trash2, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import { DeleteVehicleButton } from '@/components/admin/DeleteVehicleButton'

export const metadata = {
  title: 'Manage Vehicles | Kezzyk Autos Admin',
}

export default async function AdminVehiclesPage() {
  const supabase = await createClient()
  
  const { data: vehicles, error } = await supabase
    .from('vehicles')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-display-sm font-bold text-text-primary">Vehicles</h1>
          <p className="text-text-secondary mt-1">Manage your inventory</p>
        </div>
        <Link href="/admin/vehicles/add" className="inline-flex items-center justify-center font-medium transition-all duration-200 rounded-button focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary disabled:opacity-50 disabled:cursor-not-allowed bg-accent text-white hover:bg-accent-hover active:bg-accent-dark shadow-md hover:shadow-glow text-body px-5 py-2.5 gap-2">
          <Plus className="w-4 h-4 mr-2" />
          Add Vehicle
        </Link>
      </div>

      <div className="bg-bg-surface border border-border rounded-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-bg-elevated/50">
                <th className="p-4 text-body-sm font-medium text-text-secondary">Vehicle</th>
                <th className="p-4 text-body-sm font-medium text-text-secondary">Price</th>
                <th className="p-4 text-body-sm font-medium text-text-secondary">Status</th>
                <th className="p-4 text-body-sm font-medium text-text-secondary">Added</th>
                <th className="p-4 text-body-sm font-medium text-text-secondary text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {error ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-status-error">
                    Failed to load vehicles. Error: {error.message}
                  </td>
                </tr>
              ) : vehicles?.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-text-muted">
                    No vehicles found. Add your first vehicle to get started.
                  </td>
                </tr>
              ) : (
                vehicles?.map((vehicle) => (
                  <tr key={vehicle.id} className="border-b border-border hover:bg-bg-elevated/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded bg-bg-primary overflow-hidden shrink-0 relative">
                          {vehicle.cover_image_url ? (
                            vehicle.cover_image_url.match(/\.(mp4|webm|ogg)$/i) ? (
                              <video src={`${vehicle.cover_image_url}#t=0.001`} className="w-full h-full object-cover" muted playsInline preload="metadata" />
                            ) : (
                              <Image src={vehicle.cover_image_url} alt="" fill className="object-cover" />
                            )
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-text-muted text-xs">No img</div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-text-primary">
                            {vehicle.year} {vehicle.make} {vehicle.model}
                          </div>
                          <div className="text-caption text-text-secondary">
                            {vehicle.condition} • {vehicle.transmission}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-medium text-text-primary">
                      {formatPrice(vehicle.price)}
                    </td>
                    <td className="p-4">
                      <Badge variant={
                        vehicle.availability === 'Available' ? 'success' :
                        vehicle.availability === 'Reserved' ? 'accent' : 'sold'
                      }>
                        {vehicle.availability}
                      </Badge>
                      {vehicle.featured && (
                        <Badge variant="outline" className="ml-2">Featured</Badge>
                      )}
                    </td>
                    <td className="p-4 text-body-sm text-text-secondary">
                      {formatDate(vehicle.created_at)}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <a 
                          href={`/inventory/${vehicle.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-text-muted hover:text-text-primary transition-colors"
                          title="View on site"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                        <Link 
                          href={`/admin/vehicles/${vehicle.id}/edit`}
                          className="p-2 text-text-muted hover:text-accent transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <DeleteVehicleButton id={vehicle.id} vehicleName={`${vehicle.year} ${vehicle.make} ${vehicle.model}`} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
