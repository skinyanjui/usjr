"use client"

import { useMemo, useState } from "react"
import { MapPin } from "lucide-react"
import { GlassCard } from "@/components/ui/glass-card"

const SUPPORTED_ZIPS = [
  "47708","47710","47711","47712","47713","47714","47715","47720", // Evansville
  "47630", // Newburgh
  "42420", // Henderson, KY
  "47601", // Boonville
  "47670", // Princeton
  "42301", // Owensboro, KY
]

export function ServiceArea() {
  const [zip, setZip] = useState("")
  const [result, setResult] = useState<null | "yes" | "maybe" | "no">(null)

  const handleCheck = () => {
    if (zip.trim().length < 5) {
      setResult(null)
      return
    }
    if (SUPPORTED_ZIPS.includes(zip.trim())) {
      setResult("yes")
    } else {
      // light heuristic: outside list but could still be inside 50mi radius
      setResult("maybe")
    }
  }

  const message = useMemo(() => {
    switch (result) {
      case "yes":
        return "Yes! We serve your area. Same-day service may be available."
      case "maybe":
        return "We likely cover your area. Text us your zip for confirmation."
      case "no":
        return "Sorry, that zip appears outside our standard area. Please contact us to confirm."
      default:
        return "Enter your zip code to check coverage."
    }
  }, [result])

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2">Service Area</h2>
            <p className="text-base sm:text-lg text-gray-600 mb-6">We serve Evansville and Southern Indiana within ~50 miles.</p>
            <ul className="text-gray-700 grid grid-cols-2 gap-2 text-sm mb-6">
              <li>• Evansville, IN</li>
              <li>• Newburgh, IN</li>
              <li>• Henderson, KY</li>
              <li>• Boonville, IN</li>
              <li>• Owensboro, KY</li>
              <li>• Princeton, IN</li>
            </ul>
            <div className="flex gap-2">
              <input
                value={zip}
                onChange={(e) => setZip(e.target.value.replace(/[^0-9]/g, "").slice(0, 5))}
                placeholder="Enter ZIP"
                aria-label="ZIP code"
                className="px-3 py-2 border border-gray-300 rounded-md w-32"
              />
              <button type="button" onClick={handleCheck} className="px-4 py-2 bg-red-600 text-white rounded-md font-semibold">Check</button>
            </div>
            <p className="text-sm text-gray-600 mt-2">{message}</p>
            <p className="text-xs text-gray-500 mt-1">Some services may be location-limited (e.g., dumpsters).</p>
          </div>

          <GlassCard variant="white" className="p-0 overflow-hidden">
            <div className="bg-white">
              <div className="flex items-center gap-2 px-4 py-3 border-b">
                <MapPin className="w-4 h-4 text-red-600" />
                <span className="text-sm font-semibold">Coverage Map (OpenStreetMap)</span>
              </div>
              <div className="p-0">
                {/* OpenStreetMap embed centered on Evansville, IN */}
                <div className="aspect-[3/2] w-full">
                  <iframe
                    title="Service Area Map"
                    className="w-full h-full border-0"
                    src={
                      "https://www.openstreetmap.org/export/embed.html?bbox=" +
                      encodeURIComponent([
                        -88.1, // min lon
                        37.6,  // min lat
                        -87.0, // max lon
                        38.3,  // max lat
                      ].join(",")) +
                      "&layer=mapnik&marker=" + encodeURIComponent([37.9716, -87.5711].join(","))
                    }
                  />
                </div>
                <div className="px-4 py-2 text-xs text-gray-500">
                  <a
                    className="underline"
                    href="https://www.openstreetmap.org/?mlat=37.9716&mlon=-87.5711#map=11/37.9716/-87.5711"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View larger map on OpenStreetMap
                  </a>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  )
}
