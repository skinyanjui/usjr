export interface PageHeroProps {
  title: string
  description?: string
  color?: 'primary' | 'neutral'
}

export function PageHero({ title, description, color = 'primary' }: PageHeroProps) {
  const colorMap = {
    primary: 'bg-primary',
    neutral: 'bg-foreground',
  } as const

  const backgroundClass = colorMap[color]

  return (
    <section
      className={`flex min-h-[20vh] items-end md:min-h-[25vh] ${backgroundClass} text-white`}
    >
      <div className="w-full">
        <div className="mx-auto max-w-7xl px-4 py-6 md:py-8">
          <h1 className="mb-2 text-2xl font-bold text-white sm:text-3xl md:text-4xl">{title}</h1>
          {description && (
            <p className="max-w-3xl text-sm text-white/90 sm:text-base md:text-lg">{description}</p>
          )}
        </div>
      </div>
    </section>
  )
}
