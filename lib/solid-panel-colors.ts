export const solidPanelColors = ['primary', 'neutral'] as const

export type SolidPanelColor = (typeof solidPanelColors)[number]
