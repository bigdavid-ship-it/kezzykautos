'use client'

import { Button } from '@/components/ui/Button'
import { Navigation } from 'lucide-react'

interface MapProps {
  lat?: number
  lng?: number
  title: string
  address?: string
  className?: string
  showDirections?: boolean
}

export default function MapComponent({ title, address, className = '', showDirections = true }: MapProps) {
  // Use the provided address for the Google Maps search query, or fallback to the title
  const searchQuery = address ? encodeURIComponent(address) : encodeURIComponent(title)
  const mapUrl = `https://maps.google.com/maps?q=${searchQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${searchQuery}`

  return (
    <div className={`relative z-10 w-full overflow-hidden rounded-card flex flex-col ${className}`}>
      <div className="w-full h-[400px] relative bg-bg-elevated animate-pulse">
        <iframe
          width="100%"
          height="100%"
          style={{ border: 0, position: 'absolute', top: 0, left: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={mapUrl}
        ></iframe>
      </div>
      
      {showDirections && (
        <div className="p-4 bg-[#0a0a0a] border-t border-white/5 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div>
            <h3 className="font-bold text-white">{title}</h3>
            {address && <p className="text-sm text-gray-400 mt-1">{address}</p>}
          </div>
          <Button 
            onClick={() => window.open(directionsUrl, '_blank')}
            className="flex items-center gap-2 whitespace-nowrap bg-accent hover:bg-accent/90 text-white w-full sm:w-auto"
          >
            <Navigation className="h-4 w-4" />
            Get Directions
          </Button>
        </div>
      )}
    </div>
  )
}
