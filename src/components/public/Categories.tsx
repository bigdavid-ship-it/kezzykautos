'use client'

import Link from 'next/link'
import { Car, Sparkles, Wrench, CircleDot, Bike, Package } from 'lucide-react'

const categories = [
  { id: 'vehicles', name: 'Vehicles', slug: '/inventory', icon: <Car className="h-8 w-8" />, desc: 'Cars, SUVs, Trucks' },
  { id: 'accessories', name: 'Accessories', slug: '/inventory', icon: <Sparkles className="h-8 w-8" />, desc: 'Enhance your ride' },
  { id: 'spare-parts', name: 'Spare Parts', slug: '/inventory', icon: <Wrench className="h-8 w-8" />, desc: 'Genuine replacements' },
  { id: 'tyres-rims', name: 'Tyres & Rims', slug: '/inventory', icon: <CircleDot className="h-8 w-8" />, desc: 'Premium wheels' },
  { id: 'motorcycles', name: 'Motorcycles', slug: '/inventory', icon: <Bike className="h-8 w-8" />, desc: 'Two-wheel thrill' },
  { id: 'other', name: 'Other', slug: '/inventory', icon: <Package className="h-8 w-8" />, desc: 'More products' },
]

export function Categories() {
  return (
    <section className="bg-bg-primary py-16">
      <div className="container mx-auto px-4">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-white">Choose a Category</h2>
          <p className="mt-1 text-sm text-gray-400">Tap any category to browse vehicles, parts, accessories and more.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.slug}
              className="group bg-bg-elevated rounded-xl p-5 text-center hover:bg-bg-hover hover:border-accent/30 border border-white/5 transition-all duration-300"
            >
              <div className="flex justify-center mb-3 text-accent">
                {category.icon}
              </div>
              <h3 className="text-white font-semibold text-sm mb-1">{category.name}</h3>
              <p className="text-gray-500 text-xs line-clamp-1">{category.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
