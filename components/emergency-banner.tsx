import { AlertTriangle, Phone } from 'lucide-react'
import { settings } from '@/lib/cms-content'

export function EmergencyBanner() {
  return (
    <section className="border-y border-red-100 bg-red-50 py-4">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2 font-semibold text-red-700">
            <AlertTriangle className="h-4 w-4" /> Emergency Services
          </div>
          <p className="text-sm text-red-800">
            Storm damage, last-minute move-outs, illegal dumping, flooded basements. Availability
            varies by service. After-hours fee may apply.
          </p>
          <a
            href={`tel:${settings.phoneE164}`}
            className="ml-auto inline-flex items-center gap-1 font-semibold text-red-800"
          >
            <Phone className="h-4 w-4" /> Call {settings.phone}
          </a>
        </div>
      </div>
    </section>
  )
}
