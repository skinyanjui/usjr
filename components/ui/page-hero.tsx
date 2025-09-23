const themeConfig = {
  slate: {
    gradient: 'from-slate-900 via-slate-800 to-slate-900',
    accent: 'text-slate-200',
  },
  red: {
    gradient: 'from-red-900 via-red-800 to-red-900',
    accent: 'text-red-100',
  },
  blue: {
    gradient: 'from-blue-900 via-blue-800 to-blue-900',
    accent: 'text-blue-100',
  },
  green: {
    gradient: 'from-emerald-900 via-emerald-800 to-emerald-900',
    accent: 'text-emerald-100',
  },
  orange: {
    gradient: 'from-orange-900 via-orange-800 to-orange-900',
    accent: 'text-orange-100',
  },
  purple: {
    gradient: 'from-purple-900 via-purple-800 to-purple-900',
    accent: 'text-purple-100',
  },
  teal: {
    gradient: 'from-teal-900 via-teal-800 to-teal-900',
    accent: 'text-teal-100',
  },
} as const

export interface PageHeroProps {
  title: string
  description?: string
  theme?: keyof typeof themeConfig
  align?: 'left' | 'center'
}

export function PageHero({ title, description, theme = 'slate', align = 'left' }: PageHeroProps) {
  const themeStyles = themeConfig[theme] ?? themeConfig.slate
  const isCentered = align === 'center'

  return (
    <section
      className={`relative overflow-hidden bg-gradient-to-br ${themeStyles.gradient} py-12 text-white sm:py-16`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_55%)]" />
      <div className="absolute inset-0 opacity-20 mix-blend-overlay">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_40%,rgba(255,255,255,0.08)_70%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4">
        <div className={isCentered ? 'text-center' : 'text-left'}>
          <h1 className="text-3xl font-bold sm:text-5xl md:text-6xl">{title}</h1>
          {description && (
            <p
              className={`mt-4 max-w-3xl text-base sm:text-lg md:text-xl ${
                isCentered ? 'mx-auto' : ''
              } ${themeStyles.accent}`}
            >
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
