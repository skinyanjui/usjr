import { ImageResponse } from 'next/og'
import { OgImageLayout } from '@/components/og-image'

export const alt = 'Uncle Sam Junk Removal'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <OgImageLayout
        lines={[
          { text: 'Uncle Sam', fontSize: 180 },
          { text: 'Junk Removal', fontSize: 160 },
        ]}
      />
    ),
    { ...size }
  )
}
