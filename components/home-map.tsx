"use client"

import dynamic from "next/dynamic"

const ClientGoogleMap = dynamic(() => import("./google-map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[260px] sm:h-[320px] md:h-[380px] lg:h-[460px] bg-gray-100" />
  ),
})

export function HomeMap() {
  return (
    <section className="w-full">
      <div className="w-full h-[260px] sm:h-[320px] md:h-[380px] lg:h-[460px]">
        <ClientGoogleMap />
      </div>
    </section>
  )
}

