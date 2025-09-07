'use client'
import type * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
        destructive:
          'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary: 'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        xs: 'h-8 px-2.5 py-1.5 text-xs sm:text-xs has-[>svg]:px-2 [&_svg]:size-3',
        sm: 'h-9 px-3 py-2 text-xs sm:text-sm has-[>svg]:px-2.5 [&_svg]:size-3.5',
        default: 'h-10 px-4 py-2.5 text-sm sm:text-sm md:text-base has-[>svg]:px-3 [&_svg]:size-4',
        lg: 'h-11 px-6 py-3 text-sm sm:text-base md:text-lg has-[>svg]:px-4 [&_svg]:size-4',
        xl: 'h-12 px-8 py-3.5 text-base sm:text-lg md:text-xl has-[>svg]:px-6 [&_svg]:size-5',
        icon: 'size-9 text-sm [&_svg]:size-4',
        'icon-sm': 'size-8 text-xs [&_svg]:size-3.5',
        'icon-lg': 'size-11 text-base [&_svg]:size-5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

const phoneButtonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-semibold transition-colors bg-red-700/35 text-white ring-1 ring-white/30 hover:bg-red-700/45',
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
      className={cn(buttonVariants({ variant, size }), className, 'rounded-lg leading-7')}
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
