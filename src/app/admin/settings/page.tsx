'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import { Input, Textarea } from '@/components/ui/Input'
import { getSettings, updateSettings } from '@/lib/settings'

const settingsSchema = z.object({
  contactEmail: z.string().email(),
  contactPhone: z.string().min(10),
  address: z.string().min(5),
  whatsappNumber: z.string().min(10),
  tiktokUrl: z.string().url().or(z.literal('')),
  facebookUrl: z.string().url().or(z.literal('')),
  mapLatitude: z.string().or(z.literal('')),
  mapLongitude: z.string().or(z.literal('')),
})

type SettingsFormData = z.infer<typeof settingsSchema>

export default function AdminSettingsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      contactEmail: '',
      contactPhone: '',
      address: '',
      whatsappNumber: '',
      tiktokUrl: '',
      facebookUrl: '',
      mapLatitude: '',
      mapLongitude: '',
    },
  })

  useEffect(() => {
    async function loadSettings() {
      const data = await getSettings()
      if (data) {
        reset({
          contactEmail: data.contact_email || '',
          contactPhone: data.contact_phone || '',
          address: data.address || '',
          whatsappNumber: data.whatsapp_number || '',
          tiktokUrl: data.tiktok_url || '',
          facebookUrl: data.facebook_url || '',
          mapLatitude: data.map_latitude || '',
          mapLongitude: data.map_longitude || '',
        })
      }
      setIsLoading(false)
    }
    loadSettings()
  }, [reset])

  const onSubmit = async (data: SettingsFormData) => {
    setIsSubmitting(true)
    try {
      let finalLat = data.mapLatitude;
      let finalLng = data.mapLongitude;

      // Auto-geocode the physical address!
      if (data.address) {
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(data.address)}&format=json&limit=1`);
          const geocodeData = await res.json();
          if (geocodeData && geocodeData.length > 0) {
            finalLat = geocodeData[0].lat;
            finalLng = geocodeData[0].lon;
          }
        } catch (e) {
          console.error('Geocoding failed:', e);
        }
      }

      await updateSettings({
        contact_email: data.contactEmail,
        contact_phone: data.contactPhone,
        address: data.address,
        whatsapp_number: data.whatsappNumber,
        tiktok_url: data.tiktokUrl,
        facebook_url: data.facebookUrl,
        map_latitude: finalLat,
        map_longitude: finalLng,
      })
      alert('Settings saved successfully!')
    } catch (error) {
      console.error(error)
      alert('Failed to save settings')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return <div className="p-8 text-center text-text-secondary">Loading settings...</div>
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-display-sm font-bold text-text-primary">Settings</h1>
        <p className="text-text-secondary mt-1">Manage website configuration</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="bg-bg-surface border border-border rounded-card p-6">
          <h3 className="text-subheading text-text-primary mb-6">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Email Address" {...register('contactEmail')} error={errors.contactEmail?.message} />
            <Input label="Phone Number" {...register('contactPhone')} error={errors.contactPhone?.message} />
            <Input label="WhatsApp Number (for API)" {...register('whatsappNumber')} error={errors.whatsappNumber?.message} helperText="Include country code without +, e.g. 2347060665260" />
            <div className="md:col-span-2">
              <Textarea label="Physical Address" {...register('address')} error={errors.address?.message} />
            </div>
          </div>
        </div>

        <div className="bg-bg-surface border border-border rounded-card p-6">
          <h3 className="text-subheading text-text-primary mb-6">Social Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="TikTok URL" {...register('tiktokUrl')} error={errors.tiktokUrl?.message} />
            <Input label="Facebook URL" {...register('facebookUrl')} error={errors.facebookUrl?.message} />
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" isLoading={isSubmitting}>
            Save Settings
          </Button>
        </div>
      </form>
    </div>
  )
}
