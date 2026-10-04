'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { VehicleMedia } from '@/lib/types/database'

interface VehicleGalleryProps {
  media: VehicleMedia[]
  coverImage?: string | null
  vehicleName: string
}

export function VehicleGallery({ media, coverImage, vehicleName }: VehicleGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  // Build images array: cover image first, then media images
  const images = [
    ...(coverImage ? [{ url: coverImage, alt: vehicleName }] : []),
    ...media
      .filter((m) => m.type === 'image')
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((m) => ({ url: m.url, alt: m.alt_text || vehicleName })),
  ]

  // Remove duplicates (cover might also be in media)
  const uniqueImages = images.filter(
    (img, index, self) => index === self.findIndex((i) => i.url === img.url)
  )

  if (uniqueImages.length === 0) {
    return (
      <div className="aspect-[16/9] bg-bg-elevated rounded-card flex items-center justify-center">
        <div className="text-center text-text-muted">
          <svg className="w-20 h-20 mx-auto mb-3 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-body-sm">No images available</p>
        </div>
      </div>
    )
  }

  const goToNext = () => setActiveIndex((prev) => (prev + 1) % uniqueImages.length)
  const goToPrev = () => setActiveIndex((prev) => (prev - 1 + uniqueImages.length) % uniqueImages.length)

  return (
    <>
      {/* Main Image */}
      <div className="relative group">
        <div
          className="relative aspect-[16/9] bg-bg-elevated rounded-card overflow-hidden cursor-pointer"
          onClick={() => setIsLightboxOpen(true)}
        >
          <Image
            src={uniqueImages[activeIndex].url}
            alt={uniqueImages[activeIndex].alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 60vw"
            priority
          />

          {/* Zoom icon overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
            <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        {/* Nav arrows */}
        {uniqueImages.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); goToPrev() }}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-bg-primary/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-bg-primary"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); goToNext() }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-bg-primary/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-bg-primary"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Image counter */}
        {uniqueImages.length > 1 && (
          <div className="absolute bottom-3 right-3 px-3 py-1 bg-bg-primary/70 backdrop-blur-sm rounded-full text-caption text-text-secondary">
            {activeIndex + 1} / {uniqueImages.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {uniqueImages.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-hide pb-1">
          {uniqueImages.map((img, index) => (
            <button
              key={img.url}
              onClick={() => setActiveIndex(index)}
              className={cn(
                'relative w-20 h-14 md:w-24 md:h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-colors',
                index === activeIndex
                  ? 'border-accent'
                  : 'border-transparent hover:border-border-light'
              )}
              aria-label={`View image ${index + 1}`}
            >
              <Image
                src={img.url}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="96px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Close button */}
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Image */}
          <div
            className="relative w-full h-full max-w-5xl max-h-[85vh] m-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={uniqueImages[activeIndex].url}
              alt={uniqueImages[activeIndex].alt}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>

          {/* Lightbox navigation */}
          {uniqueImages.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); goToPrev() }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goToNext() }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                aria-label="Next"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-body-sm text-white">
            {activeIndex + 1} / {uniqueImages.length}
          </div>
        </div>
      )}
    </>
  )
}
