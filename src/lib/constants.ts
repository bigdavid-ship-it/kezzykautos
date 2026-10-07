// ==============================================
// KEZZYK AUTOS — Shared Constants
// ==============================================

export const SITE_CONFIG = {
  name: 'Kezzyk Autos',
  tagline: 'Premium Cars. Trusted Deals.',
  description:
    'Kezzyk Autos — your trusted destination for premium vehicles. Quality cars, transparent pricing, and exceptional service.',
  agency: 'Cintiq Web Solutions',
  agencyUrl: 'https://cintiqwebsolutions.com',
} as const

// Contact info — [DEV PLACEHOLDER] Replace with confirmed client details before launch
export const CONTACT = {
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+2347060665260',
  // [DEV PLACEHOLDER] — awaiting confirmed phone number
  phone: '+2347060665260',
  // [DEV PLACEHOLDER] — awaiting confirmed email
  email: 'info@kezzykautos.com',
  // [DEV PLACEHOLDER] — awaiting confirmed address
  address: 'Lagos, Nigeria',
} as const

export const SOCIAL_LINKS = {

  tiktok: 'https://tiktok.com/@kezzykautos',
  facebook: 'https://facebook.com/kezzykautos',
} as const


export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Inventory', href: '/inventory' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
] as const

export const ADMIN_NAV_LINKS = [
  { label: 'Dashboard', href: '/admin', icon: 'LayoutDashboard' },
  { label: 'Vehicles', href: '/admin/vehicles', icon: 'Car' },
  { label: 'Orders & Inquiries', href: '/admin/inquiries', icon: 'MessageSquare' },
  { label: 'Customers', href: '/admin/customers', icon: 'Users' },
  { label: 'Media Library', href: '/admin/media', icon: 'Image' },
  { label: 'Website Content', href: '/admin/content', icon: 'FileText' },
  { label: 'Settings', href: '/admin/settings', icon: 'Settings' },
] as const

export const VEHICLE_TRANSMISSIONS = ['Automatic', 'Manual'] as const
export const VEHICLE_FUEL_TYPES = ['Petrol', 'Diesel', 'Hybrid', 'Electric'] as const
export const VEHICLE_BODY_TYPES = ['Sedan', 'SUV', 'Coupe', 'Truck', 'Van', 'Hatchback', 'Convertible', 'Wagon', 'Sport'] as const
export const VEHICLE_CONDITIONS = ['New', 'Foreign Used', 'Nigerian Used'] as const
export const VEHICLE_AVAILABILITY = ['Available', 'Sold', 'Reserved', 'Coming Soon'] as const


export const INQUIRY_STATUSES = ['NEW', 'CONTACTED', 'FOLLOW_UP', 'CLOSED'] as const

export const getWhatsAppUrl = (vehicleName?: string) => {
  const phone = CONTACT.whatsapp.replace(/[^0-9]/g, '')
  const message = vehicleName
    ? `Hello Kezzyk Autos, I'm interested in the ${vehicleName} listed on your website. Please I'd like more information about it.`
    : `Hello Kezzyk Autos, I'd like to inquire about your available vehicles.`
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}


export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}


export const generateSlug = (make: string, model: string, year: number): string => {
  return `${make}-${model}-${year}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}
