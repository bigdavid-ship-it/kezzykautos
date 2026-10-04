import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Car, MessageSquare, Settings, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const links = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Vehicles', href: '/admin/vehicles', icon: Car },
  { name: 'Inquiries', href: '/admin/inquiries', icon: MessageSquare },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
]

export default function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname()

  return (
    <div className="w-64 h-full bg-bg-surface border-r border-border flex flex-col">
      <div className="h-16 flex items-center justify-between px-6 border-b border-border shrink-0">
        <span className="text-xl font-bold bg-gradient-accent bg-clip-text text-transparent">Kezzyk Autos</span>
        <button onClick={onClose} className="md:hidden text-text-secondary hover:text-text-primary">
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {links.map((link) => {
            const isActive = pathname === link.href
            const Icon = link.icon
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={onClose}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-body-sm font-medium transition-colors',
                  isActive 
                    ? 'bg-accent/10 text-accent' 
                    : 'text-text-secondary hover:bg-bg-hover hover:text-text-primary'
                )}
              >
                <Icon className="w-5 h-5" />
                {link.name}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
