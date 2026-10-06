'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { formatMileage } from '@/lib/utils'
import { formatPrice as formatNaira } from '@/lib/constants'
import type { Vehicle } from '@/lib/types/database'
import {
  Calendar,
  Gauge,
  Fuel,
  Cog,
  Car,
  Palette,
  MapPin,
  Zap,
  Shield,
  CircleDot,
} from 'lucide-react'

interface VehicleSpecsProps {
  vehicle: Vehicle
}

const tabs = ['Overview', 'Specifications', 'Features'] as const
type Tab = (typeof tabs)[number]

export function VehicleSpecs({ vehicle }: VehicleSpecsProps) {
  const [activeTab, setActiveTab] = useState<Tab>('Overview')

  const specs = [
    { icon: Calendar, label: 'Year', value: vehicle.year?.toString() },
    { icon: Gauge, label: 'Mileage', value: vehicle.mileage ? `${formatMileage(vehicle.mileage)}` : 'N/A' },
    { icon: Cog, label: 'Transmission', value: vehicle.transmission },
    { icon: Fuel, label: 'Fuel Type', value: vehicle.fuel_type },
    { icon: Zap, label: 'Engine', value: vehicle.engine || 'N/A' },
    { icon: Car, label: 'Body Type', value: vehicle.body_type },
    { icon: Shield, label: 'Condition', value: vehicle.condition },
    { icon: Palette, label: 'Exterior Color', value: vehicle.color || 'N/A' },
    { icon: Palette, label: 'Interior Color', value: vehicle.interior_color || 'N/A' },
    { icon: MapPin, label: 'Location', value: vehicle.location || 'N/A' },
    { icon: CircleDot, label: 'Availability', value: vehicle.availability },
  ].filter((s) => s.value && s.value !== 'N/A')

  return (
    <div>
      {/* Tab Navigation */}
      <div className="inline-flex p-1.5 mb-10 rounded-xl bg-bg-surface border border-white/10 max-w-full overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              'relative px-6 py-3 rounded-lg text-sm font-medium whitespace-nowrap transition-colors',
              activeTab === tab ? 'text-white' : 'text-gray-400 hover:text-white'
            )}
          >
            {activeTab === tab && (
              <motion.span
                layoutId="activeTab"
                className="absolute inset-0 rounded-lg bg-accent"
                transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
              />
            )}
            <span className="relative z-10">{tab}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[200px]">
        {activeTab === 'Overview' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {vehicle.description ? (
              <p className="text-body text-text-secondary leading-relaxed whitespace-pre-line">
                {vehicle.description}
              </p>
            ) : (
              <p className="text-body text-text-muted italic">
                No description available for this vehicle.
              </p>
            )}
          </motion.div>
        )}

        {activeTab === 'Specifications' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6"
          >
            {specs.map((spec) => (
              <div
                key={spec.label}
                className="flex items-center justify-between border-b border-white/5 pb-4"
              >
                <div className="flex items-center gap-3">
                  <spec.icon className="w-5 h-5 text-gray-500" />
                  <span className="text-sm font-light text-gray-400">{spec.label}</span>
                </div>
                <span className="text-sm font-medium text-white">{spec.value}</span>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === 'Features' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {vehicle.features && vehicle.features.length > 0 ? (
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {vehicle.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-4 py-2"
                  >
                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full shrink-0" />
                    <span className="text-gray-300 font-light">{feature}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-body text-text-muted italic">
                No features listed for this vehicle.
              </p>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}
