import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="text-center">
        <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
        <p className="text-muted-foreground mt-4 text-sm">Loading...</p>
      </div>
    </div>
  )
}
