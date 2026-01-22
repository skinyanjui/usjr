export interface PageHeroProps {
  title: string
  description?: string
  eyebrow?: string
}

export function PageHero({ title, description, eyebrow }: PageHeroProps) {
  return (
    <section className="relative border-b border-border bg-background overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="text-center">
          {eyebrow && (
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary">
              {eyebrow}
            </p>
          )}
          <h1 className="mb-6 text-4xl font-bold tracking-tighter text-foreground sm:text-5xl lg:text-6xl max-w-4xl mx-auto">
            {title}
          </h1>
          {description && (
            <p className="mx-auto max-w-2xl text-lg font-medium text-muted-foreground leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
