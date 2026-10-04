import dynamic from 'next/dynamic'
import { MapPin } from 'lucide-react'

// Dynamically import the map to avoid SSR issues with Leaflet window object
const MapComponent = dynamic(() => import('./MapComponent'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] bg-bg-surface border border-border rounded-card flex flex-col items-center justify-center text-text-secondary">
      <MapPin className="w-8 h-8 mb-2 animate-pulse text-accent" />
      <p>Loading interactive map...</p>
    </div>
  )
})

interface MapProps {
  lat: number
  lng: number
  title: string
  address?: string
  className?: string
  showDirections?: boolean
}

export function Map(props: MapProps) {
  return <MapComponent {...props} />
}
