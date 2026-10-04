import React from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-body-sm font-medium text-text-secondary mb-1.5"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full bg-bg-input border border-border rounded-input px-4 py-2.5',
            'text-text-primary placeholder:text-text-muted',
            'transition-colors duration-200',
            'focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error && 'border-accent focus:border-accent focus:ring-accent',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-caption text-accent">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-caption text-text-muted">{helperText}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-body-sm font-medium text-text-secondary mb-1.5"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            'w-full bg-bg-input border border-border rounded-input px-4 py-2.5',
            'text-text-primary placeholder:text-text-muted',
            'transition-colors duration-200 resize-y min-h-[100px]',
            'focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error && 'border-accent',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-caption text-accent">{error}</p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: { value: string; label: string }[]
  placeholder?: string
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-body-sm font-medium text-text-secondary mb-1.5"
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={inputId}
          className={cn(
            'w-full bg-bg-input border border-border rounded-input px-4 py-2.5',
            'text-text-primary appearance-none',
            'transition-colors duration-200',
            'focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error && 'border-accent',
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" className="text-text-muted">
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="mt-1 text-caption text-accent">{error}</p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'
