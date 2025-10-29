'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, Home, RefreshCcw } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to monitoring service (e.g., Sentry)
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
          <AlertTriangle className="h-8 w-8 text-destructive" />
        </div>

        <h1 className="mb-4 text-4xl font-bold">Something went wrong!</h1>

        <p className="text-muted-foreground mb-2 text-lg">
          We encountered an unexpected error while loading this page.
        </p>

        {error.message && (
          <p className="text-muted-foreground mb-8 text-sm">
            Error: {error.message}
          </p>
        )}

        {error.digest && (
          <p className="text-muted-foreground mb-8 text-xs">
            Error ID: {error.digest}
          </p>
        )}

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <RefreshCcw className="h-4 w-4" />
            Try Again
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-6 py-3 text-sm font-semibold transition-colors hover:bg-muted"
          >
            <Home className="h-4 w-4" />
            Go Home
          </Link>
        </div>

        <p className="text-muted-foreground mt-8 text-sm">
          If this problem persists, please{' '}
          <Link href="/quote" className="text-primary hover:underline">
            contact us
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
