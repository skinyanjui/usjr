import type * as React from 'react'

import { cn } from '@/lib/utils'

export type CardProps = React.ComponentProps<'div'>

export const CARD_SPACING = {
  header: 'px-6 pb-4',
  content: 'px-6 py-4',
  footer: 'px-6 pt-4',
  gap: 'space-y-4',
} as const

function Card({ className, ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      className={cn(
        'bg-card text-card-foreground rounded-lg border shadow-sm',
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn('flex flex-col space-y-1.5 px-6 py-6', className)}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<'h3'>) {
  return (
    <h3
      data-slot="card-title"
      className={cn('font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="card-description"
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-content"
      className={cn('p-6 pt-0', className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn('flex items-center p-6 pt-0', className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-action"
      className={cn('flex items-center justify-end p-6 pt-0', className)}
      {...props}
    />
  )
}


export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent }
