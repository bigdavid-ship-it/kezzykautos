'use client'

import { createContext, useContext, ReactNode, useState, useEffect } from 'react'
import { getSettings, type WebsiteSettings } from '@/lib/settings'

const SettingsContext = createContext<WebsiteSettings | null>(null)

export function SettingsProvider({ 
  children, 
  settings: initialSettings 
}: { 
  children: ReactNode, 
  settings: WebsiteSettings | null 
}) {
  const [settings, setSettings] = useState<WebsiteSettings | null>(initialSettings)

  useEffect(() => {
    async function fetchLatestSettings() {
      const freshSettings = await getSettings()
      if (freshSettings) {
        setSettings(freshSettings)
      }
    }
    fetchLatestSettings()
  }, [])

  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  return useContext(SettingsContext)
}
