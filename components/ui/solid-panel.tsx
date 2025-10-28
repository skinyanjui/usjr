import { type PropsWithChildren } from 'react'
import clsx from 'clsx'

type SolidPanelColor = 'accent' | 'neutral' | 'success' | 'warning' | 'info'

const colorStyles: Record<SolidPanelColor, { background: string; text: string }> = {
  accent: { background: 'bg-red-600 dark:bg-red-700', text: 'text-white' },
  neutral: { background: 'bg-slate-600 dark:bg-slate-700', text: 'text-white' },
  success: { background: 'bg-green-600 dark:bg-green-700', text: 'text-white' },
  warning: { background: 'bg-orange-600 dark:bg-orange-700', text: 'text-white' },
  info: { background: 'bg-blue-600 dark:bg-blue-700', text: 'text-white' },
}

export interface SolidPanelProps extends PropsWithChildren {
  color?: SolidPanelColor
  className?: string
  label?: string
}

export function SolidPanel({ color = 'accent', className, label, children }: SolidPanelProps) {
  const palette = colorStyles[color]

  return (
    <div
      className={clsx(
        'flex h-full w-full items-center justify-center rounded-lg border border-white/40 p-6 text-center shadow-sm',
        palette.background,
        palette.text,
        className
      )}
    >
      <div className="space-y-2">
        {label && <p className="text-sm font-semibold tracking-wide uppercase">{label}</p>}
        <div className="text-base font-semibold sm:text-lg">{children}</div>
      </div>
    </div>
  )
}
