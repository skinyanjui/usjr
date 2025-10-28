export interface PageHeroProps {
  title: string
  description?: string
  color?: 'accent' | 'neutral'
}

export function PageHero({ title, description, color = 'accent' }: PageHeroProps) {
  const colorMap = {
    accent: 'bg-red-700 dark:bg-red-900',
    neutral: 'bg-slate-800 dark:bg-slate-900',
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
            <p className="max-w-3xl text-sm text-white sm:text-base md:text-lg">{description}</p>
          )}
        </div>
      </div>
    </section>
  )
}
