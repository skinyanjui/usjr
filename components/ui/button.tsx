'use client'
import type * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

const phoneButtonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-semibold transition-colors bg-black text-white hover:bg-gray-800 border border-transparent',
  {
    variants: {
      size: {
        xs: 'h-8 px-3 py-1.5 text-xs [&_svg]:size-3',
        sm: 'h-9 px-4 py-2 text-xs sm:text-sm [&_svg]:size-3.5',
        default: 'h-10 px-5 py-2.5 text-sm sm:text-base [&_svg]:size-4',
        lg: 'h-11 px-6 py-3 text-sm sm:text-base md:text-lg [&_svg]:size-4',
        xl: 'h-12 px-8 py-3.5 text-base sm:text-lg md:text-xl [&_svg]:size-5',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  type,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...(asChild ? {} : { type: type ?? 'button' })}
      {...props}
    />
  )
}

function PhoneButton({
  className,
  size,
  children,
  href,
  ...props
}: React.ComponentProps<'a'> &
  VariantProps<typeof phoneButtonVariants> & {
    href: string
  }) {
  return (
    <a href={href} className={cn(phoneButtonVariants({ size }), className)} {...props}>
      {children}
    </a>
  )
}

export type ButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }

export { Button, buttonVariants, PhoneButton, phoneButtonVariants }
