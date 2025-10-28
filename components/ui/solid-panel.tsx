import { type PropsWithChildren } from 'react'
import clsx from 'clsx'

type SolidPanelColor = 'primary' | 'neutral'

const colorStyles: Record<SolidPanelColor, { background: string; text: string }> = {
  primary: { background: 'bg-primary', text: 'text-primary-foreground' },
  neutral: { background: 'bg-muted', text: 'text-muted-foreground' },
}

export interface SolidPanelProps extends PropsWithChildren {
  color?: SolidPanelColor
  className?: string
  label?: string
}

export function SolidPanel({ color = 'primary', className, label, children }: SolidPanelProps) {
  const palette = colorStyles[color]

  return (
    <div
      className={clsx(
        'flex h-full w-full items-center justify-center rounded-lg border border-border p-6 text-center shadow-sm',
        palette.background,
        palette.text,
        className
      )}
    >
      <div className="space-y-2">
        {label && <p className="text-sm font-semibold tracking-wide uppercase opacity-70">{label}</p>}
        <div className="text-base font-semibold sm:text-lg">{children}</div>
      </div>
    </div>
  )
}
