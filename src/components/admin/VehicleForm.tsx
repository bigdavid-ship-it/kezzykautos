'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Save, Upload, Star, Trash2, ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input, Select, Textarea } from '@/components/ui/Input'
import { MediaUploader } from '@/components/admin/MediaUploader'
import { createClient } from '@/lib/supabase/client'
import { generateSlug } from '@/lib/constants'

// Reference lists for Kezzyk Autos
const LISTING_CONDITIONS = [
  { value: 'new', label: 'New' },
  { value: 'used', label: 'Used' },
  { value: 'foreign_used', label: 'Foreign Used' },
]

const VEHICLE_TRANSMISSIONS = ['Automatic', 'Manual', 'CVT', 'Semi-Auto']
const VEHICLE_FUEL_TYPES = ['Petrol', 'Diesel', 'Hybrid', 'Electric']
const VEHICLE_BODY_TYPES = ['Sedan', 'SUV', 'Coupe', 'Pickup', 'Convertible', 'Hatchback', 'Van']
const VEHICLE_DRIVE_TYPES = ['FWD', 'RWD', 'AWD', '4WD']
const NIGERIAN_LOCATIONS = ['Lagos', 'Abuja', 'Port Harcourt', 'Kano', 'Ibadan', 'Enugu', 'Kaduna']
const VEHICLE_FEATURES = [
  'Air Conditioning', 'Bluetooth', 'Backup Camera', 'Navigation System',
  'Leather Seats', 'Sunroof', 'Heated Seats', 'Parking Sensors',
  'Cruise Control', 'Keyless Entry', 'Push Start', 'Alloy Wheels'
]

export function VehicleForm({ initialData }: { initialData?: any }) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [images, setImages] = useState<any[]>(initialData?.media || [])
  const [showSeo, setShowSeo] = useState(false)

  const [form, setForm] = useState<any>({
    title: initialData?.title || '',
    make: initialData?.make || '',
    model: initialData?.model || '',
    year: initialData?.year || '',
    price: initialData?.price || '',
    previous_price: initialData?.previous_price || '',
    condition: initialData?.condition || '',
    location: initialData?.location || '',
    status: initialData?.status || 'draft',
    featured: initialData?.featured || false,
    negotiable: initialData?.negotiable || false,
    description: initialData?.description || '',
    seo_title: initialData?.seo_title || '',
    seo_description: initialData?.seo_description || '',
    features: initialData?.features || [],
    specifications: initialData?.specifications || {},
    availability: initialData?.availability || 'Available',
  })

  const updateField = (key: string, value: any) => setForm((prev: any) => ({ ...prev, [key]: value }))
  const updateSpec = (key: string, value: any) => setForm((prev: any) => ({
    ...prev, specifications: { ...(prev.specifications || {}), [key]: value }
  }))
  const toggleFeature = (feature: string) => {
    setForm((prev: any) => ({
      ...prev,
      features: prev.features?.includes(feature)
        ? prev.features.filter((f: string) => f !== feature)
        : [...(prev.features || []), feature],
    }))
  }

  const handleSave = async (status: string) => {
    if (!form.make || !form.model || !form.year) {
      alert('Make, Model, and Year are required')
      return
    }

    setSaving(true)
    try {
      const supabase = createClient()
      const slug = generateSlug(form.make, form.model, form.year)

      // 1. Upload any new images to Supabase Storage
      const processedImages = await Promise.all(
        images.map(async (img) => {
          if (img.isNew && img.file) {
            const fileExt = img.file.name.split('.').pop()
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
            
            const { error: uploadError, data } = await supabase.storage
              .from('vehicles')
              .upload(fileName, img.file)
              
            if (uploadError) {
              console.error('Upload error:', uploadError)
              throw new Error(`Failed to upload image: ${uploadError.message}`)
            }
            
            const { data: publicUrlData } = supabase.storage
              .from('vehicles')
              .getPublicUrl(fileName)
              
            return { ...img, url: publicUrlData.publicUrl, isNew: false, file: undefined }
          }
          return img
        })
      )

      // Find the image marked as cover, or fallback to the first one
      const coverImage = processedImages.find(img => img.isCover) || processedImages[0]

      let finalPayload: any = {
        ...form,
        slug,
        // Set the primary image URL
        cover_image_url: coverImage ? coverImage.url : null,
        // Save ALL image URLs into the gallery array
        gallery: processedImages.map(img => img.url),
        // Flatten specifications into top-level columns to match DB
        // Using safe defaults instead of null to prevent NOT NULL constraint errors
        mileage: form.specifications?.mileage || 0,
        transmission: form.specifications?.transmission || 'Automatic',
        fuel_type: form.specifications?.fuel_type || 'Petrol',
        engine: form.specifications?.engine || '',
        body_type: form.specifications?.body_type || 'Sedan',
        color: form.specifications?.color || '',
      }

      // Drop fields that do not exist in the Supabase schema
      delete finalPayload.status
      delete finalPayload.previous_price
      delete finalPayload.negotiable
      delete finalPayload.specifications
      delete finalPayload.title

      // Clean empty strings for numeric/optional fields
      if (finalPayload.price === '' || finalPayload.price == null) finalPayload.price = 0
      if (finalPayload.year === '' || finalPayload.year == null) finalPayload.year = new Date().getFullYear()
      if (!finalPayload.condition) finalPayload.condition = 'Nigerian Used'
      if (!finalPayload.location) finalPayload.location = 'Lagos'
      if (!finalPayload.availability) finalPayload.availability = 'Available'
      
      if (initialData?.id) {
        // Update existing
        const { error } = await supabase
          .from('vehicles')
          .update(finalPayload)
          .eq('id', initialData.id)
        if (error) throw error
      } else {
        // Create new
        const { error } = await supabase
          .from('vehicles')
          .insert(finalPayload)
        if (error) throw error
      }

      router.push('/admin/vehicles')
      router.refresh()
    } catch (error: any) {
      console.error('Error saving vehicle:', error)
      alert(`Failed to save vehicle: ${error.message || JSON.stringify(error)}`)
    } finally {
      setSaving(false)
    }
  }

  const specs = form.specifications || {}

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-end gap-3 mb-6">
        <Button variant="outline" className="border-border text-text-primary" onClick={() => handleSave('draft')} disabled={saving}>
          Save as Draft
        </Button>
        <Button onClick={() => handleSave('published')} disabled={saving} className="bg-accent hover:bg-accent/90 text-white">
          <Save className="h-4 w-4 mr-2" /> {saving ? 'Saving...' : 'Publish Vehicle'}
        </Button>
      </div>

      {/* Basic Info */}
      <section className="bg-bg-surface border border-border rounded-card p-6 space-y-5">
        <h2 className="text-lg font-semibold text-text-primary">Basic Information</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="md:col-span-2 space-y-2">
            <Input label="Listing Title (Optional)" value={form.title} onChange={e => updateField('title', e.target.value)} placeholder="e.g. Pristine Toyota Camry 2019" />
          </div>
          <div className="space-y-2">
            <Input label="Make *" value={form.make} onChange={e => updateField('make', e.target.value)} placeholder="e.g. Toyota" />
          </div>
          <div className="space-y-2">
            <Input label="Model *" value={form.model} onChange={e => updateField('model', e.target.value)} placeholder="e.g. Camry" />
          </div>
          <div className="space-y-2">
            <Input type="number" label="Year *" value={form.year} onChange={e => updateField('year', Number(e.target.value))} placeholder="e.g. 2019" />
          </div>
          <div className="space-y-2">
            <Select 
              label="Condition" 
              value={form.condition} 
              onChange={e => updateField('condition', e.target.value)}
              options={LISTING_CONDITIONS}
            />
          </div>
          <div className="space-y-2">
            <Input type="number" label="Price (₦)" value={form.price} onChange={e => updateField('price', Number(e.target.value))} placeholder="0" />
          </div>
          <div className="space-y-2">
            <Input type="number" label="Previous Price (₦)" value={form.previous_price} onChange={e => updateField('previous_price', Number(e.target.value))} placeholder="Show as strikethrough" />
          </div>
          <div className="space-y-2">
            <Select 
              label="Availability" 
              value={form.availability} 
              onChange={e => updateField('availability', e.target.value)}
              options={[{label: 'Available', value: 'Available'}, {label: 'Sold', value: 'Sold'}, {label: 'Reserved', value: 'Reserved'}]}
            />
          </div>
          <div className="space-y-2">
            <Select 
              label="Location" 
              value={form.location} 
              onChange={e => updateField('location', e.target.value)}
              options={NIGERIAN_LOCATIONS.map(l => ({ label: l, value: l }))}
            />
          </div>
          <div className="flex flex-wrap items-center gap-6 md:col-span-2 pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.negotiable} onChange={e => updateField('negotiable', e.target.checked)} className="rounded border-border bg-bg-input text-accent focus:ring-accent" />
              <span className="text-sm text-text-secondary">Negotiable Price</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.featured} onChange={e => updateField('featured', e.target.checked)} className="rounded border-border bg-bg-input text-accent focus:ring-accent" />
              <span className="text-sm text-text-secondary">Featured on Homepage</span>
            </label>
          </div>
        </div>
        <div className="space-y-2 mt-4">
          <Textarea label="Detailed Description" value={form.description} onChange={e => updateField('description', e.target.value)} className="min-h-[120px]" placeholder="Describe the vehicle in detail..." />
        </div>
      </section>

      {/* Specifications */}
      <section className="bg-bg-surface border border-border rounded-card p-6 space-y-5">
        <h2 className="text-lg font-semibold text-text-primary">Specifications</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Input type="number" label="Mileage (km)" value={specs.mileage || ''} onChange={e => updateSpec('mileage', Number(e.target.value))} />
          </div>
          <div className="space-y-2">
            <Select label="Transmission" value={specs.transmission || ''} onChange={e => updateSpec('transmission', e.target.value)} options={VEHICLE_TRANSMISSIONS.map(t => ({ label: t, value: t }))} />
          </div>
          <div className="space-y-2">
            <Select label="Fuel Type" value={specs.fuel_type || ''} onChange={e => updateSpec('fuel_type', e.target.value)} options={VEHICLE_FUEL_TYPES.map(t => ({ label: t, value: t }))} />
          </div>
          <div className="space-y-2">
            <Input label="Engine" value={specs.engine || ''} onChange={e => updateSpec('engine', e.target.value)} placeholder="e.g. 3.5L V6" />
          </div>
          <div className="space-y-2">
            <Select label="Body Type" value={specs.body_type || ''} onChange={e => updateSpec('body_type', e.target.value)} options={VEHICLE_BODY_TYPES.map(t => ({ label: t, value: t }))} />
          </div>
          <div className="space-y-2">
            <Input label="Color" value={specs.color || ''} onChange={e => updateSpec('color', e.target.value)} placeholder="e.g. Black" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-bg-surface border border-border rounded-card p-6 space-y-4">
        <h2 className="text-lg font-semibold text-text-primary">Key Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {VEHICLE_FEATURES.map(f => (
            <label key={f} className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-bg-elevated transition-colors border border-transparent hover:border-white/5">
              <input type="checkbox" checked={form.features?.includes(f) || false} onChange={() => toggleFeature(f)} className="rounded border-border bg-bg-input text-accent focus:ring-accent" />
              <span className="text-sm text-text-secondary">{f}</span>
            </label>
          ))}
        </div>
      </section>

      {/* SEO Settings */}
      <section className="bg-bg-surface border border-border rounded-card overflow-hidden">
        <button type="button" onClick={() => setShowSeo(!showSeo)} className="w-full p-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors">
          <h2 className="text-lg font-semibold text-text-primary">SEO Settings</h2>
          {showSeo ? <ChevronUp className="h-5 w-5 text-text-secondary" /> : <ChevronDown className="h-5 w-5 text-text-secondary" />}
        </button>
        {showSeo && (
          <div className="px-6 pb-6 space-y-4 border-t border-white/5 pt-4">
            <div className="space-y-2">
              <Input label="SEO Title" value={form.seo_title || ''} onChange={e => updateField('seo_title', e.target.value)} placeholder="Custom page title for search engines" />
            </div>
            <div className="space-y-2">
              <Textarea label="SEO Description" value={form.seo_description || ''} onChange={e => updateField('seo_description', e.target.value)} placeholder="Custom meta description" />
            </div>
          </div>
        )}
      </section>

      {/* Media */}
      <section className="bg-bg-surface border border-border rounded-card p-6 space-y-4">
        <h2 className="text-lg font-semibold text-text-primary">Media Gallery</h2>
        <MediaUploader
          initialMedia={images}
          onMediaChange={setImages}
        />
      </section>

      {/* Bottom Actions */}
      <div className="flex flex-wrap justify-end gap-3 pb-8">
        <Button variant="outline" className="border-border text-text-primary" onClick={() => router.push('/admin/vehicles')}>Cancel</Button>
        <Button onClick={() => handleSave('published')} disabled={saving} className="bg-accent hover:bg-accent/90 text-white">
          <Save className="h-4 w-4 mr-2" /> {saving ? 'Saving...' : 'Publish Vehicle'}
        </Button>
      </div>
    </div>
  )
}
