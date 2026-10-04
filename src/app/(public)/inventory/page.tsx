'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { VehicleCard } from '@/components/public/VehicleCard'
import { SearchFilters } from '@/components/public/SearchFilters'
import { VehicleGridSkeleton } from '@/components/ui/LoadingState'
import { Button } from '@/components/ui/Button'
import { Select } from '@/components/ui/Input'
import { motion } from 'framer-motion'
import type { Vehicle } from '@/lib/types/database'

// Note: Next.js 14 does not allow `export const metadata` in a 'use client' file.
// If you need SEO metadata, consider moving the fetching logic to a Server Component 
// or creating a separate layout.tsx / page wrapper.

const ITEMS_PER_PAGE = 12

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest Added' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'year_desc', label: 'Year: Newest' },
]

function InventoryContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createClient()

  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Params
  const search = searchParams.get('search') || ''
  const make = searchParams.get('make') || ''
  const year = searchParams.get('year') || ''
  const price = searchParams.get('price') || ''
  const bodyType = searchParams.get('body_type') || ''
  const sort = searchParams.get('sort') || 'newest'
  const page = parseInt(searchParams.get('page') || '1', 10)

  const fetchVehicles = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      let query = supabase
        .from('vehicles')
        .select('*', { count: 'exact' })

      // Apply filters
      if (search) {
        query = query.or(`make.ilike.%${search}%,model.ilike.%${search}%`)
      }
      if (make) {
        query = query.eq('make', make)
      }
      if (year) {
        query = query.eq('year', parseInt(year))
      }
      if (price) {
        const [min, max] = price.split('-')
        if (min && max) {
          query = query.gte('price', parseInt(min, 10)).lte('price', parseInt(max, 10))
        }
      }
      if (bodyType) {
        query = query.eq('body_type', bodyType)
      }

      // Apply sorting
      if (sort === 'price_asc') {
        query = query.order('price', { ascending: true })
      } else if (sort === 'price_desc') {
        query = query.order('price', { ascending: false })
      } else if (sort === 'year_desc') {
        query = query.order('year', { ascending: false })
      } else {
        query = query.order('created_at', { ascending: false })
      }

      // Apply pagination
      const from = (page - 1) * ITEMS_PER_PAGE
      const to = from + ITEMS_PER_PAGE - 1
      query = query.range(from, to)

      const { data, error, count } = await query

      if (error) {
        if (error.code === '42P01') {
          throw new Error('Database tables are not set up yet.')
        }
        throw error
      }

      setVehicles(data as Vehicle[])
      setTotalCount(count || 0)
    } catch (err: any) {
      console.error('Error fetching vehicles:', err)
      setError(err.message || 'Failed to load vehicles. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }, [supabase, search, make, year, price, bodyType, sort, page])

  useEffect(() => {
    fetchVehicles()
  }, [fetchVehicles])

  useEffect(() => {
    document.title = 'Inventory | Kezzyk Autos'
  }, [])

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) params.set('sort', value)
    else params.delete('sort')
    params.set('page', '1') // Reset to page 1 on sort change
    router.push(pathname + '?' + params.toString())
  }

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', newPage.toString())
    router.push(pathname + '?' + params.toString())
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

  return (
    <main className="min-h-screen bg-bg-primary pb-32">
      <div className="section-container pt-16 md:pt-24 lg:pt-32">
        {/* Hero Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 border-b border-white/5 pb-16"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-white mb-6 tracking-tighter">
            Our <span className="font-medium text-accent">Inventory.</span>
          </h1>
          <p className="text-xl md:text-2xl font-light text-gray-400 max-w-2xl leading-relaxed">
            A curated selection of the world's most exceptional vehicles.
          </p>
        </motion.div>

        {/* Filters */}
        <SearchFilters resultCount={totalCount} />

        {/* Sort Controls */}
        <div className="flex justify-end mb-6">
          <div className="w-full md:w-64">
            <Select
              options={SORT_OPTIONS}
              value={sort}
              onChange={(e) => handleSortChange(e.target.value)}
              className="py-2"
            />
          </div>
        </div>

        {/* Content Area */}
        {error ? (
          <div className="bg-[#101010] border border-accent/20 rounded-2xl p-8 text-center">
            <p className="text-accent mb-4">{error}</p>
            <Button onClick={() => fetchVehicles()} variant="outline">
              Try Again
            </Button>
          </div>
        ) : isLoading ? (
          <VehicleGridSkeleton count={ITEMS_PER_PAGE} />
        ) : vehicles.length === 0 ? (
          <div className="py-24 md:py-32 text-center max-w-md mx-auto">
            <h3 className="text-2xl font-light text-white mb-4">
              No vehicles match your filters
            </h3>
            <p className="text-gray-400 leading-relaxed mb-10">
              Try adjusting your search or clearing filters to see the full collection.
            </p>
            <Button onClick={() => router.push(pathname)} className="h-12 px-8">
              Clear All Filters
            </Button>
          </div>
        ) : (
          <>
            {/* Vehicle Grid */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-10 md:gap-y-16 mb-16">
              {vehicles.map((vehicle, index) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} index={index} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <span className="text-text-secondary text-body px-4">
                  Page {page} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  )
}

export default function InventoryPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-bg-primary pt-32 pb-16"><VehicleGridSkeleton count={8} /></div>}>
      <InventoryContent />
    </React.Suspense>
  )
}
