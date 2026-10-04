'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { formatPrice } from '@/lib/constants'
import { cn } from '@/lib/utils'
import type { Vehicle } from '@/lib/types/database'

interface VehicleCardProps {
  vehicle: Vehicle
  index?: number
}

export function VehicleCard({ vehicle, index = 0 }: VehicleCardProps) {
  const isSold = vehicle.availability === 'Sold'

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.15 }}
    >
      <Link
        href={`/inventory/${vehicle.slug}`}
        className={cn(
          'group block',
          isSold && 'opacity-75'
        )}
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[#1a1a1a]">
          {vehicle.cover_image_url ? (
            vehicle.cover_image_url.match(/\.(mp4|webm|ogg)$/i) ? (
              <video
                src={vehicle.cover_image_url}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                muted
                playsInline
                autoPlay
                loop
              />
            ) : (
              <Image
                src={vehicle.cover_image_url}
                alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="50vw"
              />
            )
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-700">
              <span className="text-sm font-medium uppercase tracking-widest">No Image</span>
            </div>
          )}
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
        </div>

        {/* Content */}
        <div className="pt-3 md:pt-5">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1 md:gap-4">
            <h3 className="text-sm md:text-xl font-light tracking-tight text-white group-hover:text-accent transition-colors line-clamp-2">
              {vehicle.year} {vehicle.make} <span className="font-medium">{vehicle.model}</span>
            </h3>
            <span className="text-sm md:text-lg font-semibold md:font-medium text-accent md:text-white whitespace-nowrap">
              {formatPrice(vehicle.price)}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-xs md:text-sm text-gray-400 font-light mt-2">
            <span>{vehicle.transmission}</span>
            <span className="w-1 h-1 rounded-full bg-gray-600" />
            <span>{vehicle.fuel_type}</span>
            {vehicle.mileage && (
              <>
                <span className="w-1 h-1 rounded-full bg-gray-600" />
                <span>{vehicle.mileage.toLocaleString()} km</span>
              </>
            )}
          </div>
          <p className="sm:hidden text-[11px] text-gray-500 mt-1 truncate">
            {vehicle.transmission} · {vehicle.fuel_type}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}
