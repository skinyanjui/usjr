import Link from "next/link"
import { NAV } from "@/lib/nav"
import { PageHero } from "@/components/ui/page-hero"

export default function HtmlSitemapPage() {
	const topLevel = NAV.filter((i) => i.href && !["Get Quote"].includes(i.label))
	const services = NAV.find((i) => i.label === "Services")?.children ?? []
	const locations = NAV.find((i) => i.label === "Locations")?.children ?? []

	return (
		<div className="min-h-screen bg-gray-50">
			<PageHero title="Sitemap" description="Browse all pages on our site" imageSrc="/junk-removal-evansville.png" priority />
			<div className="pt-8 pb-16 max-w-5xl mx-auto px-4">
				<h1 className="text-3xl sm:text-4xl font-bold mb-6">Sitemap</h1>
				<p className="text-gray-600 mb-8">Browse all pages on our site. For search engines, see <Link href="/sitemap.xml" className="text-red-700 underline">the XML sitemap</Link>.</p>

				<section className="mb-10">
					<h2 className="text-xl font-semibold mb-3">Top Pages</h2>
					<ul className="list-disc pl-6 space-y-1">
						{topLevel.map((item) => (
							<li key={item.label}>
								<Link href={item.href!} className="text-red-700 hover:underline">{item.label}</Link>
							</li>
						))}
						<li>
							<Link href="/quote" className="text-red-700 hover:underline">Get Quote</Link>
						</li>
					</ul>
				</section>

				<section className="mb-10">
					<h2 className="text-xl font-semibold mb-3">Services</h2>
					<ul className="list-disc pl-6 space-y-1">
						{services.map((s) => (
							<li key={s.href}>
								<Link href={s.href!} className="text-red-700 hover:underline">{s.label}</Link>
							</li>
						))}
					</ul>
				</section>

				<section>
					<h2 className="text-xl font-semibold mb-3">Locations</h2>
					<ul className="list-disc pl-6 space-y-1">
						{locations.map((l) => (
							<li key={l.href}>
								<Link href={l.href!} className="text-red-700 hover:underline">{l.label}</Link>
							</li>
						))}
					</ul>
				</section>
			</div>
		</div>
	)
}