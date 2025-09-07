'use client'

import dynamic from 'next/dynamic'

const ClientLeafletMap = dynamic(() => import('./leaflet-map'), {
  ssr: false,
  loading: () => (
    <div className="h-[260px] w-full bg-gray-100 sm:h-[320px] md:h-[380px] lg:h-[460px]" />
  ),
})

export function HomeMap() {
  return (
    <section className="relative z-0 w-full">
      <div className="relative z-0 h-[260px] w-full sm:h-[320px] md:h-[380px] lg:h-[460px]">
        <ClientLeafletMap />
      </div>
    </section>
  )
}
