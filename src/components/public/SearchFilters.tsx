'use client'

import React, { useState, useCallback } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { Search, SlidersHorizontal } from 'lucide-react'
import { Input, Select } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { VEHICLE_BODY_TYPES } from '@/lib/constants'

interface SearchFiltersProps {
  resultCount: number
}

const MAKE_OPTIONS = [
  { value: 'Toyota', label: 'Toyota' },
  { value: 'Honda', label: 'Honda' },
  { value: 'Mercedes-Benz', label: 'Mercedes-Benz' },
  { value: 'Lexus', label: 'Lexus' },
  { value: 'BMW', label: 'BMW' },
  { value: 'Land Rover', label: 'Land Rover' },
]

const YEAR_OPTIONS = Array.from({ length: 20 }, (_, i) => {
  const year = new Date().getFullYear() - i
  return { value: year.toString(), label: year.toString() }
})

const PRICE_OPTIONS = [
  { value: '0-5000000', label: 'Under â‚¦5M' },
  { value: '5000000-10000000', label: 'â‚¦5M - â‚¦10M' },
  { value: '10000000-20000000', label: 'â‚¦10M - â‚¦20M' },
  { value: '20000000-50000000', label: 'â‚¦20M - â‚¦50M' },
  { value: '50000000-999999999', label: 'Above â‚¦50M' },
]

export function SearchFilters({ resultCount }: SearchFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)
  const [search, setSearch] = useState(searchParams.get('search') || '')
  
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(name, value)
      } else {
        params.delete(name)
      }
      return params.toString()
    },
    [searchParams]
  )

  const handleFilterChange = (name: string, value: string) => {
    router.push(pathname + '?' + createQueryString(name, value))
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleFilterChange('search', search)
  }

  const clearFilters = () => {
    router.push(pathname)
    setSearch('')
  }

  const currentMake = searchParams.get('make') || ''
  const currentModel = searchParams.get('model') || ''
  const currentYear = searchParams.get('year') || ''
  const currentPrice = searchParams.get('price') || ''
  const currentBodyType = searchParams.get('body_type') || ''

  return (
    <div className="space-y-8 mb-12">
      {/* Search & Filter Bar */}
      <div>
        <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 pointer-events-none" />
            <Input
              placeholder="Search make or model..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 h-14 text-base"
            />
          </div>
          
          <div className="hidden md:flex items-center gap-3">
            <div className="w-44">
              <Select
                options={[{ value: '', label: 'Any Make' }, ...MAKE_OPTIONS]}
                value={currentMake}
                onChange={(e) => handleFilterChange('make', e.target.value)}
                className="h-14"
              />
            </div>
            <div className="w-36">
              <Select
                options={[{ value: '', label: 'Any Year' }, ...YEAR_OPTIONS]}
                value={currentYear}
                onChange={(e) => handleFilterChange('year', e.target.value)}
                className="h-14"
              />
            </div>
            <div className="w-48">
              <Select
                options={[{ value: '', label: 'Any Price' }, ...PRICE_OPTIONS]}
                value={currentPrice}
                onChange={(e) => handleFilterChange('price', e.target.value)}
                className="h-14"
              />
            </div>
            <Button type="submit" className="h-14 px-8">Search</Button>
          </div>

          <div className="md:hidden flex gap-3">
            <Button type="submit" className="flex-1 h-12">Search</Button>
            <Button 
              type="button" 
              variant="outline"
              className="h-12 w-12 px-0"
              aria-label="More filters"
              onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
            >
              <SlidersHorizontal className="w-5 h-5" />
            </Button>
          </div>
        </form>

        {/* Mobile Filters Drawer */}
        {isMobileFiltersOpen && (
          <div className="md:hidden pt-6 mt-6 border-t border-white/10 space-y-5">
            <Select
              label="Make"
              options={[{ value: '', label: 'Any Make' }, ...MAKE_OPTIONS]}
              value={currentMake}
              onChange={(e) => handleFilterChange('make', e.target.value)}
            />
            <Select
              label="Year"
              options={[{ value: '', label: 'Any Year' }, ...YEAR_OPTIONS]}
              value={currentYear}
              onChange={(e) => handleFilterChange('year', e.target.value)}
            />
            <Select
              label="Price Range"
              options={[{ value: '', label: 'Any Price' }, ...PRICE_OPTIONS]}
              value={currentPrice}
              onChange={(e) => handleFilterChange('price', e.target.value)}
            />
            <Button type="button" variant="outline" onClick={clearFilters} className="w-full h-12">
              Clear All Filters
            </Button>
          </div>
        )}
      </div>

      {/* Body type chips â€” swipeable on mobile */}
      <div className="-mx-4 px-4 md:mx-0 md:px-0 overflow-x-auto scrollbar-hide">
        <div className="flex gap-3 w-max md:w-auto md:flex-wrap">
          {['', ...VEHICLE_BODY_TYPES.slice(0, 6)].map((type) => {
            const active = currentBodyType === type
            return (
              <button
                key={type || 'all'}
                type="button"
                onClick={() => handleFilterChange('body_type', type)}
                className={
                  'h-10 px-5 rounded-full text-sm font-medium whitespace-nowrap border transition-colors ' +
                  (active
                    ? 'bg-accent border-accent text-white'
                    : 'border-white/10 text-gray-400 hover:text-white hover:border-white/30')
                }
              >
                {type || 'All'}
              </button>
            )
          })}
        </div>
      </div>

      {/* Result count */}
      <div className="flex items-center justify-between border-t border-white/10 pt-6">
        <p className="text-sm text-gray-400">
          <span className="text-white font-medium">{resultCount}</span> {resultCount === 1 ? 'vehicle' : 'vehicles'} found
        </p>
        {(currentMake || currentYear || currentPrice || currentBodyType || searchParams.get('search')) && (
          <button type="button" onClick={clearFilters} className="text-sm text-accent hover:text-accent-hover transition-colors">
            Clear filters
          </button>
        )}
      </div>
    </div>
  )
}
