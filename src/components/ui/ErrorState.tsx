import { AlertTriangle } from 'lucide-react'
import { Button } from './Button'

interface ErrorStateProps {
  title?: string
  message?: string
  retry?: () => void
  className?: string
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'We encountered an error. Please try again.',
  retry,
  className,
}: ErrorStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-16 px-4 text-center ${className || ''}`}>
      <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4">
        <AlertTriangle className="w-7 h-7 text-accent" />
      </div>
      <h3 className="text-heading text-text-primary mb-2">{title}</h3>
      <p className="text-body text-text-secondary max-w-md mb-6">{message}</p>
      {retry && (
        <Button variant="secondary" onClick={retry}>
          Try Again
        </Button>
      )}
    </div>
  )
}
