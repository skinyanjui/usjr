import { Button, type ButtonProps } from '@/components/ui/button'
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ThemedButtonProps extends ButtonProps {
  theme?: 'primary' | 'neutral'
  fullWidth?: boolean
}

export const ThemedButton = forwardRef<HTMLButtonElement, ThemedButtonProps>(
  ({ className, theme = 'primary', fullWidth = false, variant = 'default', ...props }, ref) => {
    const getThemeClasses = (theme: NonNullable<ThemedButtonProps['theme']>, variant: string) => {
      const baseClasses = 'font-semibold transition-all duration-200'

      if (variant === 'outline') {
        const outlineMap = {
          primary:
            'border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent',
          neutral:
            'border-foreground text-foreground hover:bg-foreground hover:text-background bg-transparent',
        } as const
        return `${baseClasses} ${outlineMap[theme]}`
      }

      if (variant === 'ghost') {
        const ghostMap = {
          primary: 'text-primary hover:bg-primary/10',
          neutral: 'text-foreground hover:bg-muted',
        } as const
        return `${baseClasses} ${ghostMap[theme]}`
      }

      const solidMap = {
        primary: 'bg-primary hover:bg-primary/90 text-primary-foreground',
        neutral: 'bg-foreground hover:bg-foreground/90 text-background',
      } as const
      return `${baseClasses} ${solidMap[theme]}`
    }

    return (
      <Button
        className={cn(
          getThemeClasses(theme, (variant as string) || 'default'),
          fullWidth && 'w-full',
          className
        )}
        variant={variant}
        ref={ref}
        {...props}
      />
    )
  }
)

ThemedButton.displayName = 'ThemedButton'
