import type { Metadata } from "next"
import Link from "next/link"
import { GlassCard } from "@/components/ui/glass-card"
import { SectionHeader } from "@/components/ui/section-header"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Page Not Found | Uncle Sam Junk Removal",
  description: "The page you're looking for doesn't exist. Find our junk removal and cleaning services here.",
  robots: "noindex, nofollow",
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <SectionHeader
          title="404 - Page Not Found"
          subtitle="The page you're looking for doesn't exist or may have been moved."
        />
        
        <GlassCard className="p-8 mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">What can you do?</h2>
          
          <div className="space-y-4 text-gray-700 mb-8">
            <p>• Check the URL for typos</p>
            <p>• Use our navigation menu to find what you need</p>
            <p>• Visit our homepage to start over</p>
            <p>• Contact us if you think this is an error</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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