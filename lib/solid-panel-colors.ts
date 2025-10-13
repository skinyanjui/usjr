export const solidPanelColors = [
  'red',
  'blue',
  'green',
  'orange',
  'purple',
  'teal',
  'slate',
] as const

export type SolidPanelColor = (typeof solidPanelColors)[number]
