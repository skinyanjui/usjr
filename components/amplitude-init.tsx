'use client'

import { useEffect } from 'react'
import * as amplitude from '@amplitude/unified'

let hasInitialized = false

export function AmplitudeInit() {
  useEffect(() => {
    if (hasInitialized) {
      return
    }

    hasInitialized = true
    amplitude.initAll('e5645f002bb806cc02c2ae6aaf47c6d9', {
      analytics: { autocapture: true },
    })
  }, [])

  return null
}
