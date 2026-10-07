import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { VehicleCard } from './VehicleCard'
import { EmptyState } from '@/components/ui/EmptyState'
import { createClient } from '@/lib/supabase/server'
import type { Vehicle } from '@/lib/types/database'

export async function FeaturedVehicles() {
  const supabase = await createClient()
  
  const { data: vehicles } = await supabase
    .from('vehicles')
    .select('*')
    .eq('featured', true)
    .eq('availability', 'Available')
    .order('created_at', { ascending: false })
    .limit(4)

  return (
    <section className="bg-bg-primary py-24 border-t border-white/5">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-sm font-semibold tracking-widest text-accent uppercase mb-3">Featured Collection</h2>
            <h3 className="text-4xl md:text-5xl font-light text-white tracking-tight">Exceptional vehicles, meticulously selected.</h3>
          </div>
          <Link href="/inventory" className="text-white hover:text-accent text-sm font-medium uppercase tracking-wider flex items-center gap-2 transition-colors border-b border-white/20 hover:border-accent pb-1">
            View Inventory <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {!vehicles || vehicles.length === 0 ? (
          <EmptyState
            title="Coming Soon"
            description="Our premium vehicle collection is being prepared."
          />
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-10 md:gap-y-16">
            {vehicles.map((vehicle, index) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle as Vehicle} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
