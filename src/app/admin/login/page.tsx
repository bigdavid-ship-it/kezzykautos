"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Lock } from 'lucide-react'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/admin')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-bg-surface border border-border rounded-xl shadow-xl p-6 sm:p-8">
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
            <Lock className="w-6 h-6 text-accent" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-center mb-8 text-text-primary">Admin Login</h1>
        
        <form onSubmit={handleLogin} className="space-y-5">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="admin@kezzykautos.com"
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
          />
          
          {error && (
            <p className="text-sm text-accent text-center bg-accent/10 py-2 rounded-md">
              {error}
            </p>
          )}
          
          <Button 
            type="submit" 
            className="w-full mt-6" 
            isLoading={loading}
          >
            Sign In
          </Button>
        </form>
      </div>
    </div>
  )
}
