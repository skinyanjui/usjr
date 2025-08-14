"use client"

import dynamic from "next/dynamic"
import { useEffect, useRef, useState } from "react"

const QuoteFormStandalone = dynamic(
	() => import("@/components/quote-form-standalone").then((m) => m.QuoteFormStandalone),
	{
		ssr: false,
		loading: () => (
			<div className="max-w-4xl mx-auto">
				<div className="p-6 sm:p-8 border rounded-lg bg-white animate-pulse">
					<div className="h-6 w-56 bg-gray-200 rounded mb-4" />
					<div className="space-y-3">
						<div className="h-10 bg-gray-100 rounded" />
						<div className="h-10 bg-gray-100 rounded" />
						<div className="h-10 bg-gray-100 rounded" />
					</div>
				</div>
			</div>
		),
	}
)

export default function QuoteFormClient() {
	const triggerRef = useRef<HTMLDivElement | null>(null)
	const [showForm, setShowForm] = useState(false)

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						setShowForm(true)
					}
				}
			},
			{ rootMargin: "200px 0px" }
		)

		if (triggerRef.current) observer.observe(triggerRef.current)
		return () => observer.disconnect()
	}, [])

	return <div ref={triggerRef}>{showForm ? <QuoteFormStandalone /> : null}</div>
}
