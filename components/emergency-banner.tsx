import { AlertTriangle, Clock, Phone } from "lucide-react"

export function EmergencyBanner() {
  return (
    <section className="py-4 bg-red-50 border-y border-red-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="flex items-center gap-2 text-red-700 font-semibold">
            <AlertTriangle className="w-4 h-4" /> Emergency Services
          </div>
          <p className="text-sm text-red-800">
            Storm damage, last-minute move-outs, illegal dumping, flooded basements. Availability varies by service. After-hours fee may apply.
          </p>
          <a href="tel:+18126101657" className="ml-auto inline-flex items-center gap-1 text-red-800 font-semibold">
            <Phone className="w-4 h-4" /> Call (812) 610-1657
          </a>
        </div>
      </div>
    </section>
  )
}
