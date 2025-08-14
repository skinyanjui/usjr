import type * as React from "react"

import { cn } from "@/lib/utils"

export type CardProps = React.ComponentProps<"div">

export const CARD_SPACING = {
  header: "px-6 pb-4",
  content: "px-6 py-4",
  footer: "px-6 pt-4",
  gap: "space-y-4",
} as const

function Card({ className, ...props }: CardProps) {
  return (
    s }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-content" className={cn("px-6 py-4 space-y-4 text-black", className)} {...props} />
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="card-footer" className={cn("flex items-center px-6 py-4 [.border-t]:pt-4", className)} {...props} />
  )
}

export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent }
