'use client'

import { useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

// A browser is counted at most once per 24 hours
const STORAGE_KEY = 'kezzyk_last_visit_counted'
const COOLDOWN_MS = 24 * 60 * 60 * 1000

// Crawlers / headless browsers that execute JavaScript (e.g. Googlebot)
const BOT_PATTERN = /bot|crawl|spider|slurp|crawling|headless|lighthouse|pagespeed|preview|facebookexternalhit|whatsapp|telegram|vercel/i

export function VisitorTracker() {
  useEffect(() => {
    const trackVisit = async () => {
      try {
        // 1. Don't count local development — it shares the live database
        const host = window.location.hostname
        if (host === 'localhost' || host === '127.0.0.1' || host.endsWith('.local')) return

        // 2. Don't count bots and automated browsers
        if (navigator.webdriver || BOT_PATTERN.test(navigator.userAgent)) return

        // 3. Count each browser once per 24 hours (persists across tabs and restarts)
        const last = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10)
        if (Date.now() - last < COOLDOWN_MS) return

        const supabase = createClient()

        // 4. Don't count logged-in admins browsing the public site
        const { data: { session } } = await supabase.auth.getSession()
        if (session) return

        // Mark before the request so parallel tabs/re-renders don't double count
        localStorage.setItem(STORAGE_KEY, Date.now().toString())
        await supabase.rpc('increment_visitor')
      } catch (e) {
        // Silent fail for tracking (e.g. localStorage blocked in private mode)
      }
    }

    trackVisit()
  }, [])

  return null
}
