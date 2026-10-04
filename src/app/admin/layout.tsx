"use client"

import { usePathname } from 'next/navigation'
import Sidebar from '@/components/admin/Sidebar'
import AdminHeader from '@/components/admin/AdminHeader'
import { useState } from 'react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLogin = pathname === '/admin/login'
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  if (isLogin) {
    return <div className="min-h-screen bg-bg-primary text-text-primary">{children}</div>
  }
  
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary flex">
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <div className={`fixed inset-y-0 left-0 z-50 transform md:translate-x-0 transition duration-200 ease-in-out md:static md:block ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>
      
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 sm:p-6 overflow-auto bg-bg-primary">
          {children}
        </main>
      </div>
    </div>
  )
}
