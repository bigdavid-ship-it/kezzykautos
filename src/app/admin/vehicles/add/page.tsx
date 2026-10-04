import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { VehicleForm } from '@/components/admin/VehicleForm'

export const metadata = {
  title: 'Add Vehicle | Kezzyk Autos Admin',
}

export default function AddVehiclePage() {
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
          <h1 className="text-display-sm font-bold text-text-primary">Add Vehicle</h1>
          <p className="text-text-secondary mt-1">Add a new vehicle to your inventory</p>
        </div>
      </div>

      <VehicleForm />
    </div>
  )
}
