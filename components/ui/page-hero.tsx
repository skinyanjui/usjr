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
      className={`flex min-h-[30vh] items-center md:min-h-[35vh] ${backgroundClass} text-white`}
    >
      <div className="w-full">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <h1 className="mb-6 text-4xl leading-tight font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="max-w-3xl text-lg text-white/90 sm:text-xl md:text-2xl">{description}</p>
          )}
        </div>
      </div>
    </section>
  )
}
