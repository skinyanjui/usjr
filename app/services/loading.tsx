import { Loader2 } from 'lucide-react'

export default function ServicesLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
          <p className="text-muted-foreground mt-4 text-sm">
            Loading service details...
          </p>
        </div>
      </div>
    </div>
  )
}
