'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export function DeleteVehicleButton({ id, vehicleName }: { id: string, vehicleName: string }) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to permanently delete the ${vehicleName}? This action cannot be undone.`)) {
      return
    }

    setIsDeleting(true)
    try {
      const supabase = createClient()
      
      const { error } = await supabase
        .from('vehicles')
        .delete()
        .eq('id', id)

      if (error) throw error

      router.refresh()
    } catch (error: any) {
      console.error('Error deleting vehicle:', error)
      alert(`Failed to delete vehicle: ${error.message}`)
      setIsDeleting(false)
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="p-2 text-text-muted hover:text-status-error transition-colors disabled:opacity-50"
      title="Delete"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  )
}
