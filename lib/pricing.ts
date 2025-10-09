export type JunkRemovalTier = {
  id: 'single' | 'quarter' | 'half' | 'three-quarter' | 'full'
  name: string
  price: string
}

export const junkRemovalTiers: JunkRemovalTier[] = [
  { id: 'single', name: 'Single Item', price: 'From $89-149' },
  { id: 'quarter', name: '¼ Truck Load', price: 'From $179-249' },
  { id: 'half', name: '½ Truck Load', price: 'From $289-389' },
  { id: 'three-quarter', name: '¾ Truck Load', price: 'From $389-489' },
  { id: 'full', name: 'Full Truck Load', price: 'From $489-649' },
]
