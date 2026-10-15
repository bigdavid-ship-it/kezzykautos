'use client'

import { useEffect, useState } from 'react'
import { VehicleCard } from './VehicleCard'
import type { Vehicle } from '@/lib/types/database'

interface ShuffledVehicleGridProps {
  vehicles: Vehicle[]
  limit?: number
}

function shuffle<T>(items: T[]): T[] {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

// Shuffles in the visitor's browser so every page load gets a new order,
// even though the surrounding page is cached on the server.
export function ShuffledVehicleGrid({ vehicles, limit = 4 }: ShuffledVehicleGridProps) {
  const [ordered, setOrdered] = useState(vehicles)

  useEffect(() => {
    setOrdered(shuffle(vehicles))
  }, [vehicles])

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-10 md:gap-y-16">
      {ordered.slice(0, limit).map((vehicle, index) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} index={index} />
      ))}
    </div>
  )
}
