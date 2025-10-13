import { type PropsWithChildren } from 'react'
import clsx from 'clsx'
import { SolidPanelColor } from '@/lib/solid-panel-colors'

const colorStyles: Record<SolidPanelColor, { background: string; text: string }> = {
  red: { background: 'bg-red-200', text: 'text-red-900' },
  blue: { background: 'bg-blue-200', text: 'text-blue-900' },
  green: { background: 'bg-green-200', text: 'text-green-900' },
  orange: { background: 'bg-orange-200', text: 'text-orange-900' },
  purple: { background: 'bg-purple-200', text: 'text-purple-900' },
  teal: { background: 'bg-teal-200', text: 'text-teal-900' },
  slate: { background: 'bg-slate-200', text: 'text-slate-900' },
}

export interface SolidPanelProps extends PropsWithChildren {
  color?: SolidPanelColor
  className?: string
  label?: string
}

export function SolidPanel({ color = 'blue', className, label, children }: SolidPanelProps) {
  const palette = colorStyles[color] ?? colorStyles.blue

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
