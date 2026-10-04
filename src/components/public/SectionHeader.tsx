import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  accentWord?: string
  align?: 'left' | 'center'
  className?: string
  action?: React.ReactNode
}

export function SectionHeader({
  title,
  subtitle,
  accentWord,
  align = 'left',
  className,
  action,
}: SectionHeaderProps) {
  // If accentWord is provided, split and highlight it
  const renderTitle = () => {
    if (!accentWord) return title
    const parts = title.split(accentWord)
    if (parts.length === 1) return title
    return (
      <>
        {parts[0]}
        <span className="text-accent">{accentWord}</span>
        {parts[1]}
      </>
    )
  }

  return (
    <div
      className={cn(
        'flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 md:mb-10',
        align === 'center' && 'items-center text-center md:flex-col md:items-center',
        className
      )}
    >
      <div>
        <h2 className="text-display-sm md:text-display-md text-text-primary">
          {renderTitle()}
        </h2>
        {subtitle && (
          <p className="text-body text-text-secondary mt-2 max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>
      {action}
    </div>
  )
}
