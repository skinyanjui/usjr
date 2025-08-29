"use client"
import { MapPin } from "lucide-react"

export default function LeafletMap() {

  return (
    <div className="w-full h-full relative">
      <iframe
        src="https://www.openstreetmap.org/export/embed.html?bbox=-88.2,-37.5,-86.8,38.5&layer=mapnik&marker=37.9716,-87.5711"
        className="w-full h-full border-0"
        title="Service Area Map - Evansville and Southern Indiana"
        loading="lazy"
      />

      {/* Location overlay for better UX */}
      <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-sm">
        <div className="flex items-center gap-1 text-xs font-medium text-gray-700">
          <MapPin className="w-3 h-3 text-red-600" />
          <span>Service Area</span>
        </div>
        <div className="text-xs text-gray-600 mt-1">Evansville & 50mi radius</div>
      </div>
    </div>
  )
}
