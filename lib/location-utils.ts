// City coordinates for distance calculation
export const CITY_COORDINATES: Record<string, { lat: number; lng: number }> = {
  Evansville: { lat: 37.9716, lng: -87.5711 },
  Newburgh: { lat: 37.9445, lng: -87.4053 },
  Henderson: { lat: 37.8361, lng: -87.59 },
  Owensboro: { lat: 37.7742, lng: -87.1114 },
  Boonville: { lat: 38.0489, lng: -87.2736 },
  Princeton: { lat: 38.3556, lng: -87.5681 },
  'Mount Carmel': { lat: 38.4106, lng: -87.7614 },
  'Mount Vernon': { lat: 37.9325, lng: -87.8947 },
  'New Harmony': { lat: 38.1292, lng: -87.9347 },
}

const DEG2RAD = Math.PI / 180

export function getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371 // Radius of the Earth in km
  const dLat = (lat2 - lat1) * DEG2RAD
  const dLon = (lon2 - lon1) * DEG2RAD
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * DEG2RAD) *
      Math.cos(lat2 * DEG2RAD) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

export function findClosestCityIndex(userLat: number, userLng: number, locations: string[]): number {
  let closestIndex = 0
  let minDistance = Infinity

  locations.forEach((location, index) => {
    // Extract city name (e.g. "Evansville, IN" -> "Evansville")
    const cityName = (location.split(',')[0] || '').trim()
    const coords = CITY_COORDINATES[cityName] || CITY_COORDINATES[location]

    if (coords) {
      const distance = getDistance(userLat, userLng, coords.lat, coords.lng)
      if (distance < minDistance) {
        minDistance = distance
        closestIndex = index
      }
    }
  })

  return closestIndex
}
