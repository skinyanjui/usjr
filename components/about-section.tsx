import { Button } from '@/components/ui/button'
import { Star, Users, Truck, Award, Shield, MapPin } from 'lucide-react'
import { QuoteCtaLink } from '@/components/quote-cta-link'

export function AboutSection() {
  const stats = [
    {
      icon: <Users className="h-8 w-8 text-gray-900" />,
      number: '5000+',
      label: 'Happy Customers',
    },
    {
      icon: <Truck className="h-8 w-8 text-gray-900" />,
      number: '500+',
      label: 'Satisfied Clients',
    },
    {
      icon: <Star className="h-8 w-8 text-gray-900" />,
      number: '4.9',
      label: 'Star Rating',
    },
    {
      icon: <Award className="h-8 w-8 text-gray-900" />,
      number: '2025',
      label: 'Founded',
    },
  ]

  return (
    <section id="about" className="bg-card py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <h2 className="text-foreground mb-6 text-3xl font-bold sm:text-4xl md:text-5xl">
              About Uncle Sam Junk Removal
            </h2>
            <p className="text-muted-foreground mb-6 text-lg leading-relaxed sm:text-xl">
              Veteran-owned and locally operated in <strong>Evansville, IN</strong>, we handle junk
              removal, light demolition, and full cleanouts with same-day availability and honest,
              upfront pricing.
            </p>
            <p className="text-muted-foreground mb-6 text-base leading-relaxed sm:text-lg">
              Founded in 2025 by <strong>Samuel Kinyanjui</strong> (United States Marine Corps), our
              team brings dependable service to Evansville, Newburgh, Henderson, Owensboro,
              Boonville, and Princeton.
            </p>
            <p className="text-muted-foreground mb-8 text-base leading-relaxed sm:text-lg">
              Professional cleaning is provided by{' '}
              <a href="https://www.karchercleaners.com/" target="_blank" rel="noopener noreferrer">
                <strong>Karcher Cleaners</strong>
              </a>{' '}
              — women-owned and led by
              <strong> Chelsey Karcher</strong> — ensuring spotless homes and offices with
              eco-conscious products.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                asChild
                className="w-full rounded-full bg-gray-900 px-6 py-3 font-semibold text-white hover:bg-gray-900 sm:w-auto sm:px-8"
              >
                <QuoteCtaLink location="about-section" label="Get Free Quote">
                  Get Free Quote
                </QuoteCtaLink>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full rounded-full border-gray-300 bg-transparent px-6 py-3 font-semibold text-gray-900 hover:bg-gray-900 sm:w-auto sm:px-8"
              >
                <a href="/about" title="About Uncle Sam Junk Removal in Evansville">
                  About our company
                </a>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="glass inline-flex items-center gap-3 rounded-2xl bg-gray-900 p-6 text-white">
              <Shield className="h-6 w-6" />
              <div>
                <h3 className="text-2xl font-bold">Veteran-Owned</h3>
                <p className="text-gray-900">Founded in 2025 in Evansville</p>
              </div>
            </div>
            <div className="text-muted-foreground mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-900" /> Evansville, IN
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-900" /> Newburgh, IN
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-900" /> Henderson, KY
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-900" /> Owensboro, KY
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-900" /> Boonville, IN
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-900" /> Princeton, IN
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="glass rounded-2xl p-6 text-center">
              <div className="mb-4 flex justify-center">{stat.icon}</div>
              <div className="text-foreground mb-2 text-3xl font-bold">{stat.number}</div>
              <div className="text-muted-foreground font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
