export interface PageHeroProps {
  title: string
  description?: string
  eyebrow?: string
}

export function PageHero({ title, description, eyebrow }: PageHeroProps) {
  return (
    <section className="relative border-b border-border bg-gradient-to-b from-muted/30 to-background overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        <div className="text-center">
          {eyebrow && (
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
              {eyebrow}
            </p>
          )}
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl max-w-4xl mx-auto">
            {title}
          </h1>
          {description && (
            <p className="mx-auto max-w-2xl text-base font-medium text-muted-foreground leading-relaxed sm:text-lg">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
