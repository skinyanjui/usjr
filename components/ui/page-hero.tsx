export interface PageHeroProps {
  title: string
  description?: string
  color?: 'red' | 'blue' | 'green' | 'orange' | 'purple' | 'teal' | 'slate'
}

export function PageHero({ title, description, color = 'blue' }: PageHeroProps) {
  const colorMap = {
    red: 'bg-red-700',
    blue: 'bg-blue-700',
    green: 'bg-green-700',
    orange: 'bg-orange-600',
    purple: 'bg-purple-700',
    teal: 'bg-teal-700',
    slate: 'bg-slate-800',
  } as const

  const backgroundClass = colorMap[color] ?? colorMap.blue

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
