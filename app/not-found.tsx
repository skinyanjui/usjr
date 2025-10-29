import type { Metadata } from 'next'
import Link from 'next/link'
import { GlassCard } from '@/components/ui/glass-card'
import { SectionHeader } from '@/components/ui/section-header'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: '404 - Page Not Found | Uncle Sam Junk Removal',
  description:
    "The page you're looking for doesn't exist. Find our junk removal and cleaning services for Evansville and the Tri-State area here.",
  robots: 'noindex, nofollow',
}

export default function NotFound() {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center px-4">
      <div className="mx-auto max-w-2xl text-center">
        <SectionHeader
          title="404 - Page Not Found"
          subtitle="The page you're looking for doesn't exist or may have been moved."
        />

        <GlassCard className="mt-8 p-8">
          <h2 className="text-foreground mb-4 text-xl font-semibold">What can you do?</h2>

          <div className="text-muted-foreground mb-8 space-y-4">
            <p>• Check the URL for typos</p>
            <p>• Use our navigation menu to find what you need</p>
            <p>• Visit our homepage to start over</p>
            <p>• Contact us if you think this is an error</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link href="/">Go to Homepage</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/services">View Services</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/quote">Get a Quote</Link>
            </Button>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
