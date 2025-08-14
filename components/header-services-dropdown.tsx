"use client"

import Link from "next/link"

interface ServicesDropdownProps {
	servicesMenuId: string
	onMouseEnter: () => void
	onMouseLeave: () => void
}

export default function ServicesDropdown({ servicesMenuId, onMouseEnter, onMouseLeave }: ServicesDropdownProps) {
	return (
		<div
			id={servicesMenuId}
			role="menu"
			aria-labelledby={servicesMenuId}
			className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 w:[500px] w-[500px] bg-white rounded-lg shadow-xl border border-gray-200 py-6 z-50"
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			<div className="grid grid-cols-3 gap-6 px-6">
				<div>
					<h4 className="font-bold text-red-600 mb-3 text-sm">JUNK REMOVAL</h4>
					<Link href="/services/junk-removal" prefetch={false} className="block py-1 text-gray-600 hover:text-red-600 transition-colors text-xs" role="menuitem">
						General Junk Removal
					</Link>
					<Link href="/services/dumpster-rental" prefetch={false} className="block py-1 text-gray-600 hover:text-red-600 transition-colors text-xs" role="menuitem">
						Dumpster Rental
					</Link>
					<Link href="/services/hot-tub-removal" prefetch={false} className="block py-1 text-gray-600 hover:text-red-600 transition-colors text-xs" role="menuitem">
						Hot Tub Removal
					</Link>
					<Link href="/services/appliance-removal" prefetch={false} className="block py-1 text-gray-600 hover:text-red-600 transition-colors text-xs" role="menuitem">
						Appliance Removal
					</Link>
					<Link href="/services/garage-cleanout" prefetch={false} className="block py-1 text-gray-600 hover:text-red-600 transition-colors text-xs" role="menuitem">
						Garage Cleanouts
					</Link>
					<Link href="/services/estate-cleanouts" prefetch={false} className="block py-1 text-gray-600 hover:text-red-600 transition-colors text-xs" role="menuitem">
						Estate Cleanouts
					</Link>
					<div className="border-t border-gray-200 mt-3 pt-3">
						<Link href="/compare" prefetch={false} className="block py-1 text-blue-600 hover:text-blue-700 transition-colors text-xs font-medium" role="menuitem">
							Compare Services
						</Link>
						<Link href="/emergency" prefetch={false} className="block py-1 text-red-600 hover:text-red-700 transition-colors text-xs font-medium" role="menuitem">
							Emergency Service
						</Link>
					</div>
				</div>
				<div>
					<h4 className="font-bold text-green-600 mb-3 text-sm">CLEANING</h4>
					<Link href="/cleaning/residential" prefetch={false} className="block py-1 text-gray-600 hover:text-green-600 transition-colors text-xs" role="menuitem">
						Residential Cleaning
					</Link>
					<Link href="/cleaning/commercial" prefetch={false} className="block py-1 text-gray-600 hover:text-green-600 transition-colors text-xs" role="menuitem">
						Commercial Cleaning
					</Link>
					<Link href="/cleaning/deep-clean" prefetch={false} className="block py-1 text-gray-600 hover:text-green-600 transition-colors text-xs" role="menuitem">
						Deep Cleaning
					</Link>
					<Link href="/cleaning/recurring" prefetch={false} className="block py-1 text-gray-600 hover:text-green-600 transition-colors text-xs" role="menuitem">
						Recurring Cleaning
					</Link>
					<Link href="/cleaning/move-in-move-out" prefetch={false} className="block py-1 text-gray-600 hover:text-green-600 transition-colors text-xs" role="menuitem">
						Move-In/Move-Out
					</Link>
					<Link href="/cleaning/specialty" prefetch={false} className="block py-1 text-gray-600 hover:text-green-600 transition-colors text-xs" role="menuitem">
						Specialty Cleaning
					</Link>
				</div>
				<div>
					<h4 className="font-bold text-blue-600 mb-3 text-sm">LOCATIONS</h4>
					<Link href="/locations/evansville" prefetch={false} className="block py-1 text-gray-600 hover:text-blue-600 transition-colors text-xs" role="menuitem">
						Evansville, IN
					</Link>
					<Link href="/locations/newburgh" prefetch={false} className="block py-1 text-gray-600 hover:text-blue-600 transition-colors text-xs" role="menuitem">
						Newburgh, IN
					</Link>
					<Link href="/locations/henderson-ky" prefetch={false} className="block py-1 text-gray-600 hover:text-blue-600 transition-colors text-xs" role="menuitem">
						Henderson, KY
					</Link>
					<Link href="/locations/owensboro-ky" prefetch={false} className="block py-1 text-gray-600 hover:text-blue-600 transition-colors text-xs" role="menuitem">
						Owensboro, KY
					</Link>
					<Link href="/locations/boonville" prefetch={false} className="block py-1 text-gray-600 hover:text-blue-600 transition-colors text-xs" role="menuitem">
						Boonville, IN
					</Link>
					<Link href="/locations/princeton" prefetch={false} className="block py-1 text-gray-600 hover:text-blue-600 transition-colors text-xs" role="menuitem">
						Princeton, IN
					</Link>
				</div>
			</div>
		</div>
	)
}
