import React from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  href?: string
  children: React.ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold tracking-wide uppercase transition-all duration-300 rounded-button focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary:
      'bg-accent text-white hover:bg-accent-hover active:bg-accent-dark shadow-md hover:shadow-glow',
    secondary:
      'bg-bg-elevated text-text-primary border border-border hover:border-border-light hover:bg-bg-hover',
    outline:
      'border border-accent text-accent hover:bg-accent hover:text-white',
    ghost:
      'text-text-secondary hover:text-text-primary hover:bg-bg-elevated',
    accent:
      'bg-gradient-accent text-white hover:shadow-glow-strong',
  }

  const sizes = {
    sm: 'text-body-sm px-3 py-1.5 gap-1.5',
    md: 'text-body px-5 py-2.5 gap-2',
    lg: 'text-body-lg px-7 py-3.5 gap-2.5',
  }

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      {children}
    </button>
  )
}
