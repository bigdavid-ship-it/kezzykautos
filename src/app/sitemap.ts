import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://kezzykautos.com' // Replace with actual domain
  
  // Base routes
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/inventory`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  try {
    const supabase = await createClient()
    const { data: vehicles } = await supabase
      .from('vehicles')
      .select('slug, updated_at')

    if (vehicles) {
      const vehicleRoutes: MetadataRoute.Sitemap = vehicles.map((vehicle) => ({
        url: `${baseUrl}/inventory/${vehicle.slug}`,
        lastModified: new Date(vehicle.updated_at),
        changeFrequency: 'daily',
        priority: 0.7,
      }))
      
      return [...routes, ...vehicleRoutes]
    }
  } catch (error) {
    console.error('Sitemap generation error:', error)
  }

  return routes
}
