"use client"

import { Menu, User, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function AdminHeader({ onMenuClick }: { onMenuClick: () => void }) {
  const router = useRouter()
  const supabase = createClient()
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setEmail(user.email ?? null)
      }
    }
    getUser()
  }, [supabase])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  return (
    <header className="h-16 bg-bg-surface border-b border-border flex items-center justify-between px-4 sm:px-6 shrink-0">
      <button 
        onClick={onMenuClick}
        className="md:hidden p-2 -ml-2 text-text-secondary hover:text-text-primary rounded-lg"
      >
        <Menu className="w-6 h-6" />
      </button>
      
      <div className="hidden md:block" />
      
      <div className="flex items-center gap-4">
        {email && (
          <span className="hidden sm:inline-block text-body-sm text-text-secondary">
            {email}
          </span>
        )}
        <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent">
          <User className="w-4 h-4" />
        </div>
        <Button variant="ghost" size="sm" onClick={handleLogout} className="px-2" title="Logout">
          <LogOut className="w-5 h-5" />
        </Button>
      </div>
    </header>
  )
}
