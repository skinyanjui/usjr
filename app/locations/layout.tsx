import type React from 'react'
import { RelatedServices } from '@/components/related-services'

export default function LocationsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <RelatedServices />
    </>
  )
}
