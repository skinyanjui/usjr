"use client"

import dynamic from "next/dynamic"
import { useEffect, useRef, useState } from "react"

const PricingCalculator = dynamic(() => import("@/components/pricing-calculator").then((m) => m.PricingCalculator), {
	ssr: false,
	loading: () => (
		<div className="mt-8 animate-pulse">
			<div className="h-6 w-48 bg-gray-200 rounded mb-4" />
			<div className="h-40 bg-gray-100 rounded" />
		</div>
	),
})

const ContactSection = dynamic(() => import("@/components/contact-section").then((m) => m.ContactSection), {
	ssr: false,
	loading: () => (
		<section className="py-20">
			<div className="max-w-7xl mx-auto px-4">
				<div className="h-8 w-56 bg-gray-200 rounded mb-6 animate-pulse" />
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="h-48 bg-gray-100 rounded animate-pulse" />
					<div className="h-48 bg-gray-100 rounded animate-pulse" />
				</div>
			</div>
		</section>
	),
})

export default function HomeClient() {
	const pricingRef = useRef<HTMLDivElement | null>(null)
	const contactRef = useRef<HTMLDivElement | null>(null)
	const [showPricing, setShowPricing] = useState(false)
	const [showContact, setShowContact] = useState(false)

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						if (entry.target === pricingRef.current) setShowPricing(true)
						if (entry.target === contactRef.current) setShowContact(true)
					}
				}
			},
			{ rootMargin: "200px 0px" }
		)

		if (pricingRef.current) observer.observe(pricingRef.current)
		if (contactRef.current) observer.observe(contactRef.current)

		return () => observer.disconnect()
	}, [])

	return (
		<>
			<section className="py-12 sm:py-16 md:py-20 bg-white">
				<div className="max-w-7xl mx-auto px-4">
					<div className="text-center mb-12">
						<h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">Get Instant Pricing</h2>
						<p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
							Use our interactive calculator to get an immediate estimate for your project. No personal information required.
						</p>
					</div>
					<div ref={pricingRef}>
						{showPricing ? (
							<PricingCalculator />
						) : (
							<div className="mt-8 animate-pulse">
								<div className="h-6 w-48 bg-gray-200 rounded mb-4" />
								<div className="h-40 bg-gray-100 rounded" />
							</div>
						)}
					</div>
				</div>
			</section>
			<div ref={contactRef}>{showContact ? <ContactSection /> : null}</div>
		</>
	)
}
