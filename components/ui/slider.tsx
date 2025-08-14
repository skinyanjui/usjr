'use client'

import * as React from "react"
import { cn } from "@/lib/utils"

interface SliderProps {
  id?: string
  labelId?: string
  thumbLabel?: string
  value: number[]
  onValueChange: (value: number[]) => void
  min?: number
  max?: number
  step?: number
  className?: string
}

export function Slider({ id, labelId, thumbLabel, value, onValueChange, min = 0, max = 100, step = 1, className }: SliderProps) {
  const currentValue = Array.isArray(value) ? Number(value[0] ?? min) : Number((value as unknown as number) ?? min)

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const next = Number(event.target.value)
    onValueChange([next])
  }

  return (
    <div className={cn("relative", className)}>
      <input
        type="range"
        id={id}
        aria-labelledby={labelId}
        aria-label={thumbLabel}
        min={min}
        max={max}
        step={step}
        value={currentValue}
        onChange={handleChange}
        className="w-full h-2 cursor-pointer appearance-none rounded-lg bg-gray-200 accent-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
      />
    </div>
  )
}