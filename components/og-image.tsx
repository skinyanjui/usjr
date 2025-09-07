import React from 'react'

type OgImageLine = {
  text: string
  fontSize: number
  fontWeight?: number
}

export type OgImageLayoutProps = {
  lines: OgImageLine[]
  backgroundColor?: string
  foregroundColor?: string
  padding?: number
  letterSpacing?: number
  lineHeight?: number
  textTransform?: 'uppercase' | 'none'
}

export function OgImageLayout({
  lines,
  backgroundColor = 'rgb(204,39,39)',
  foregroundColor = 'white',
  padding = 64,
  letterSpacing = 1,
  lineHeight = 1.05,
  textTransform = 'uppercase',
}: OgImageLayoutProps) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: backgroundColor,
        color: foregroundColor,
        padding,
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textTransform,
          textAlign: 'center',
          lineHeight,
          letterSpacing,
        }}
      >
        {lines.map((line, index) => (
          <div key={index} style={{ fontSize: line.fontSize, fontWeight: line.fontWeight ?? 900 }}>
            {line.text}
          </div>
        ))}
      </div>
    </div>
  )
}
