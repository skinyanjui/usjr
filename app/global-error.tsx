'use client'

import { useEffect } from 'react'
import { AlertTriangle, Home } from 'lucide-react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log critical error to monitoring service
    console.error('Global application error:', error)
  }, [error])

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
          <div className="text-center">
            <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
              <AlertTriangle className="h-10 w-10 text-red-600 dark:text-red-400" />
            </div>

            <h1 className="mb-4 text-4xl font-bold text-foreground">
              Critical Error
            </h1>

            <p className="mb-8 text-lg text-muted-foreground">
              A critical error occurred. We apologize for the inconvenience.
            </p>

            {error.digest && (
              <p className="mb-8 text-xs text-muted-foreground">
                Error ID: {error.digest}
              </p>
            )}

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <button
                onClick={reset}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700"
              >
                Try Again
              </button>

              <a
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              >
                <Home className="h-4 w-4" />
                Go Home
              </a>
            </div>

            <p className="mt-8 text-sm text-muted-foreground">
              If this problem persists, please call us at{' '}
              <a
                href="tel:8124019022"
                className="font-semibold text-primary hover:underline"
              >
                (812) 401-9022
              </a>
            </p>
          </div>
        </div>
      </body>
    </html>
  )
}
