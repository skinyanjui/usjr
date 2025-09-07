import Image from 'next/image'

export interface PageHeroProps {
  title: string
  description?: string
  imageSrc: string
  priority?: boolean
}

export function PageHero({ title, description, imageSrc, priority = false }: PageHeroProps) {
  return (
    <section className="relative flex min-h-[40vh] items-end md:min-h-[50vh]">
      <Image
        src={imageSrc}
        alt={title}
        fill
        priority={priority}
        sizes="100vw"
        quality={50}
        unoptimized
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 w-full">
        <div className="mx-auto max-w-7xl px-4 py-10 md:py-16">
          <h1 className="mb-3 text-3xl font-bold text-white sm:text-5xl md:text-6xl">{title}</h1>
          {description && (
            <p className="max-w-3xl text-base text-white sm:text-lg md:text-xl">{description}</p>
          )}
        </div>
      </div>
    </section>
  )
}
