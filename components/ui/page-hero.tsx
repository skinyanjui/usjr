import Image from "next/image"

export interface PageHeroProps {
  title: string
  description?: string
  imageSrc: string
  priority?: boolean
}

export function PageHero({ title, description, imageSrc, priority = false }: PageHeroProps) {
  return (
    <section className="relative min-h-[40vh] md:min-h-[50vh] flex items-end">
      <Image
        src={imageSrc}
        alt={title}
        fill
        priority={priority}
        sizes="100vw"
        quality={50}
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 py-10 md:py-16">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-3">{title}</h1>
          {description && (
            <p className="text-base sm:text-lg md:text-xl text-gray-100 max-w-3xl">{description}</p>
          )}
        </div>
      </div>
    </section>
  )
}
