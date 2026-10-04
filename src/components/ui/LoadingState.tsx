interface LoadingStateProps {
  message?: string
  className?: string
}

export function LoadingState({ message = 'Loading...', className }: LoadingStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-16 ${className || ''}`}>
      <div className="relative w-12 h-12 mb-4">
        <div className="absolute inset-0 rounded-full border-2 border-border" />
        <div className="absolute inset-0 rounded-full border-2 border-accent border-t-transparent animate-spin" />
      </div>
      <p className="text-text-secondary text-body-sm">{message}</p>
    </div>
  )
}

export function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12' }

  return (
    <div className={`${sizes[size]} relative`}>
      <div className="absolute inset-0 rounded-full border-2 border-border" />
      <div className="absolute inset-0 rounded-full border-2 border-accent border-t-transparent animate-spin" />
    </div>
  )
}

// Skeleton loaders for cards
export function VehicleCardSkeleton() {
  return (
    <div className="bg-bg-surface border border-border rounded-card overflow-hidden animate-pulse">
      <div className="aspect-[16/10] bg-bg-elevated" />
      <div className="p-4 space-y-3">
        <div className="h-5 bg-bg-elevated rounded w-3/4" />
        <div className="flex gap-2">
          <div className="h-4 bg-bg-elevated rounded w-16" />
          <div className="h-4 bg-bg-elevated rounded w-16" />
          <div className="h-4 bg-bg-elevated rounded w-16" />
        </div>
        <div className="flex justify-between items-center pt-2">
          <div className="h-6 bg-bg-elevated rounded w-1/3" />
          <div className="h-8 bg-bg-elevated rounded w-24" />
        </div>
      </div>
    </div>
  )
}

export function VehicleGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-10 md:gap-y-16">
      {Array.from({ length: count }).map((_, i) => (
        <VehicleCardSkeleton key={i} />
      ))}
    </div>
  )
}
