export interface PageHeroProps {
  title: string
  description?: string
  eyebrow?: string
}

export function PageHero({ title, description, eyebrow }: PageHeroProps) {
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="text-center">
          {eyebrow && (
            <p className="mb-4 text-sm font-medium uppercase tracking-wide text-muted-foreground">
              {eyebrow}
            </p>
          )}
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
