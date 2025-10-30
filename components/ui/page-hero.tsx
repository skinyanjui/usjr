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
      className={`flex min-h-[20vh] items-center md:min-h-[25vh] ${backgroundClass} text-white`}
    >
      <div className="w-full">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-8">
          <h1 className="mb-4 text-3xl leading-tight font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="max-w-3xl text-base text-white/90 sm:text-lg md:text-xl">{description}</p>
          )}
        </div>
      </div>
    </section>
  )
}
