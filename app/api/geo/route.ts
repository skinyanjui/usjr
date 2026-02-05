import { type NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const latitude = request.headers.get('x-vercel-ip-latitude')
  const longitude = request.headers.get('x-vercel-ip-longitude')

  return NextResponse.json({
    latitude: latitude ? parseFloat(latitude) : null,
    longitude: longitude ? parseFloat(longitude) : null,
  })
}
