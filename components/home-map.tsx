"use client"

import dynamic from "next/dynamic"

const ClientLeafletMap = dynamic(() => import("./leaflet-map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[260px] sm:h-[320px] md:h-[380px] lg:h-[460px] bg-gray-100" />
  ),
})

export function HomeMap() {
  return (
    <section className="relative z-0 w-full">
      <div className="relative z-0 w-full h-[260px] sm:h-[320px] md:h-[380px] lg:h-[460px]">
        <ClientLeafletMap />
      </div>
    </section>
  )
}

