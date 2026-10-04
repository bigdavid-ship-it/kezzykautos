// ==============================================
// KEZZYK AUTOS — Database Types
// ==============================================

export interface Vehicle {
  id: string
  make: string
  model: string
  year: number
  price: number
  mileage: number | null
  transmission: string
  fuel_type: string
  engine: string | null
  body_type: string
  condition: string
  color: string | null
  location: string | null
  description: string | null
  features: string[] | null
  availability: 'Available' | 'Sold' | 'Reserved' | 'Coming Soon'
  featured: boolean
  cover_image_url: string | null
  video_url: string | null
  slug: string
  seo_title: string | null
  seo_description: string | null
  created_at: string
  updated_at: string
}

export interface VehicleMedia {
  id: string
  vehicle_id: string
  url: string
  type: 'image' | 'video'
  sort_order: number
  is_cover: boolean
  alt_text: string | null
  created_at: string
}

export interface Inquiry {
  id: string
  vehicle_id: string | null
  customer_name: string
  customer_email: string | null
  customer_phone: string | null
  message: string
  source: 'contact_form' | 'vehicle_inquiry' | 'whatsapp'
  status: 'NEW' | 'CONTACTED' | 'FOLLOW_UP' | 'CLOSED'
  created_at: string
  updated_at: string
  // Joined data
  vehicle?: Vehicle | null
}

export interface WebsiteSettings {
  id: string
  key: string
  value: string
  category: 'general' | 'hero' | 'about' | 'contact' | 'social' | 'seo' | 'footer'
  updated_at: string
}

// Form types for creating/editing
export interface VehicleFormData {
  make: string
  model: string
  year: number
  price: number
  mileage: number | null
  transmission: string
  fuel_type: string
  engine: string
  body_type: string
  condition: string
  color: string
  location: string
  description: string
  features: string[]
  availability: string
  featured: boolean
  seo_title: string
  seo_description: string
}

export interface InquiryFormData {
  customer_name: string
  customer_email: string
  customer_phone: string
  message: string
  vehicle_id?: string
  source: string
}

// Vehicle with media (joined query result)
export interface VehicleWithMedia extends Vehicle {
  vehicle_media: VehicleMedia[]
}

// Filter/search params
export interface VehicleFilters {
  search?: string
  make?: string
  model?: string
  year?: string
  min_price?: string
  max_price?: string
  body_type?: string
  transmission?: string
  fuel_type?: string
  condition?: string
  availability?: string
  sort?: 'price_asc' | 'price_desc' | 'year_desc' | 'year_asc' | 'newest' | 'oldest'
  page?: number
  per_page?: number
}

// Dashboard stats
export interface DashboardStats {
  total_vehicles: number
  active_vehicles: number
  featured_vehicles: number
  sold_vehicles: number
  total_inquiries: number
  new_inquiries: number
}
