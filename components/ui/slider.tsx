"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cn } from "@/lib/utils"

export interface SliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
	value?: number[]
	onValueChange?: (values: number[]) => void
	max?: number
	min?: number
	step?: number
	className?: string
	id?: string
	labelId?: string
	thumbLabel?: string
}

export const Slider = React.forwardRef<HTMLSpanElement, SliderProps>(
	(
		{
			className,
			value,
			onValueChange,
			max = 100,
			min = 0,
			step = 1,
			id,
			labelId,
			thumbLabel,
			...props
		},
		ref
	) => {
		return (
			<SliderPrimitive.Root
				ref={ref}
				id={id}
				aria-labelledby={labelId}
				value={value}
				onValueChange={onValueChange}
				max={max}
				min={min}
				step={step}
				className={cn("relative flex w-full touch-none select-none items-center", className)}
				{...props}
			>
				<SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray-200">
					<SliderPrimitive.Range className="absolute h-full bg-red-600" />
				</SliderPrimitive.Track>
				<SliderPrimitive.Thumb
					className="block h-5 w-5 rounded-full border-2 border-white bg-red-600 ring-2 ring-red-300 transition-colors focus:outline-none focus:ring-4 disabled:pointer-events-none disabled:opacity-50"
					aria-label={thumbLabel}
				/>
			</SliderPrimitive.Root>
		)
	}
)
Slider.displayName = "Slider"