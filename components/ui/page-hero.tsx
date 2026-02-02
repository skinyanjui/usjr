export interface PageHeroProps {
  title: string
  description?: string
  eyebrow?: string
}

export function PageHero({ title, description, eyebrow }: PageHeroProps) {
  return (
    <section className="border-border from-muted/30 to-background relative overflow-hidden border-b bg-gradient-to-b">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        <div className="text-center">
          {eyebrow && (
            <p className="text-primary mb-3 text-xs font-semibold tracking-widest uppercase">
              {eyebrow}
            </p>
          )}
          <h1 className="text-foreground mx-auto mb-4 max-w-4xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="text-muted-foreground mx-auto max-w-2xl text-base leading-relaxed font-medium sm:text-lg">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
