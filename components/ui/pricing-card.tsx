import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"
import Link from "next/link"

interface PricingCardProps {
	title: string
	price: string
	description: string
	features: string[]
	popular?: boolean
	color?: "red" | "orange" | "green" | "blue" | "purple" | "teal"
	ctaText?: string
	ctaLink?: string
	className?: string
}

const COLOR_MAP = {
	red: {
		accent: "text-red-700",
		bg: "bg-red-50",
		badge: "bg-red-600 text-white",
		button: "bg-red-700 hover:bg-red-800 text-white",
		check: "text-red-600",
	},
	orange: {
		accent: "text-orange-700",
		bg: "bg-orange-50",
		badge: "bg-orange-600 text-white",
		button: "bg-orange-700 hover:bg-orange-800 text-white",
		check: "text-orange-600",
	},
	green: {
		accent: "text-green-700",
		bg: "bg-green-50",
		badge: "bg-green-600 text-white",
		button: "bg-green-700 hover:bg-green-800 text-white",
		check: "text-green-600",
	},
	blue: {
		accent: "text-blue-700",
		bg: "bg-blue-50",
		badge: "bg-blue-600 text-white",
		button: "bg-blue-700 hover:bg-blue-800 text-white",
		check: "text-blue-600",
	},
	purple: {
		accent: "text-purple-700",
		bg: "bg-purple-50",
		badge: "bg-purple-600 text-white",
		button: "bg-purple-700 hover:bg-purple-800 text-white",
		check: "text-purple-600",
	},
	teal: {
		accent: "text-teal-700",
		bg: "bg-teal-50",
		badge: "bg-teal-600 text-white",
		button: "bg-teal-700 hover:bg-teal-800 text-white",
		check: "text-teal-600",
	},
} as const

export function PricingCard({
	title,
	price,
	description,
	features,
	popular = false,
	color = "red",
	ctaText = "Get Quote",
	ctaLink = "/quote",
	className,
}: PricingCardProps) {
	const c = COLOR_MAP[color]

	return (
		<Card className={cn("relative h-full", className)}>
			{popular && (
				<div className={cn("absolute -top-3 right-3 px-2 py-0.5 rounded-full text-xs font-semibold", c.badge)}>
					Most Popular
				</div>
			)}
			<CardHeader>
				<CardTitle className={cn("text-xl font-bold text-gray-900")}>{title}</CardTitle>
				<div className={cn("text-3xl font-extrabold", c.accent)}>{price}</div>
				<p className="text-sm text-gray-600">{description}</p>
			</CardHeader>
			<CardContent className="space-y-4">
				<ul className="space-y-2">
					{features.map((feature, idx) => (
						<li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
							<Check className={cn("w-4 h-4 mt-0.5", c.check)} />
							<span>{feature}</span>
						</li>
					))}
				</ul>
				<Button asChild className={c.button}>
					<Link href={ctaLink} aria-label={`${ctaText} for ${title}`} title={`${ctaText} for ${title}`}>
						{ctaText}
					</Link>
				</Button>
			</CardContent>
		</Card>
	)
}