'use client'

import { useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export function VisitorTracker() {
  useEffect(() => {
    // Only track once per session
    if (!sessionStorage.getItem('visited')) {
      sessionStorage.setItem('visited', 'true')
      
      const trackVisit = async () => {
        try {
          const supabase = createClient()
          await supabase.rpc('increment_visitor')
        } catch (e) {
          // Silent fail for tracking
        }
      }
      
      trackVisit()
    }
  }, [])

  return null
}
