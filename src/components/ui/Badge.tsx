import { cn } from '@/lib/utils'

interface BadgeProps {
  variant?: 'default' | 'accent' | 'success' | 'sold' | 'outline'
  size?: 'sm' | 'md'
  children: React.ReactNode
  className?: string
}

export function Badge({
  variant = 'default',
  size = 'sm',
  children,
  className,
}: BadgeProps) {
  const variants = {
    default: 'bg-bg-elevated text-text-secondary border border-border',
    accent: 'bg-accent/10 text-accent border border-accent/20',
    success: 'bg-status-success/10 text-status-success border border-status-success/20',
    sold: 'bg-status-sold/10 text-status-sold border border-status-sold/20',
    outline: 'border border-border text-text-secondary',
  }

  const sizes = {
    sm: 'text-caption px-2 py-0.5',
    md: 'text-body-sm px-3 py-1',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-badge whitespace-nowrap',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  )
}
