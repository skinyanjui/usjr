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

export type DumpsterRentalTier = {
  id: '10' | '20' | '30' | '40'
  name: string
  price: string
}

export const dumpsterRentalTiers: DumpsterRentalTier[] = [
  { id: '10', name: '10 Yard Dumpster', price: 'From $299/week' },
  { id: '20', name: '20 Yard Dumpster', price: 'From $399/week' },
  { id: '30', name: '30 Yard Dumpster', price: 'From $499/week' },
  { id: '40', name: '40 Yard Dumpster', price: 'From $599/week' },
]
