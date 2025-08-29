import { Button } from "@/components/ui/button"
import { Star, Users, Truck, Award, Shield, MapPin } from "lucide-react"
import { QuoteCtaLink } from "@/components/quote-cta-link"

export function AboutSection() {
  const stats = [
    {
      icon: <Users className="h-8 w-8 text-red-600" />,
      number: "5000+",
      label: "Happy Customers",
    },
    {
      icon: <Truck className="h-8 w-8 text-red-600" />,
      number: "500+",
      label: "Satisfied Clients",
    },
    {
      icon: <Star className="h-8 w-8 text-red-600" />,
      number: "4.9",
      label: "Star Rating",
    },
    {
      icon: <Award className="h-8 w-8 text-red-600" />,
      number: "2025",
      label: "Founded",
    },
  ]

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">About Uncle Sam Junk Removal</h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-6 leading-relaxed">
              Veteran-owned and locally operated in <strong>Evansville, IN</strong>, we handle junk removal and dumpster
              rentals with same-day availability and honest, upfront pricing.
            </p>
            <p className="text-base sm:text-lg text-gray-600 mb-6 leading-relaxed">
              Founded in 2025 by <strong>Samuel Kinyanjui</strong> (United States Marine Corps), our team brings
              dependable service to Evansville, Newburgh, Henderson, Owensboro, Boonville, and Princeton.
            </p>
            <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed">
              Professional cleaning is provided by <a href="https://www.karchercleaners.com/" target="_blank" rel="noopener noreferrer"><strong>Karcher Cleaners</strong></a> — women-owned and led by
              <strong> Chelsey Karcher</strong> — ensuring spotless homes and offices with eco-conscious products.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-6 sm:px-8 py-3 rounded-full font-semibold">
                <QuoteCtaLink location="about-section" label="Get Free Quote">Get Free Quote</QuoteCtaLink>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full sm:w-auto border-red-800 text-red-800 hover:bg-red-100 px-6 sm:px-8 py-3 rounded-full font-semibold bg-transparent"
              >
                <a href="/about" title="About Uncle Sam Junk Removal in Evansville">
                  About our company
                </a>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="bg-red-600 text-white p-6 rounded-2xl glass inline-flex items-center gap-3">
              <Shield className="h-6 w-6" />
              <div>
                <h3 className="text-2xl font-bold">Veteran-Owned</h3>
                <p className="text-red-100">Founded in 2025 in Evansville</p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-red-600" /> Evansville, IN</div>
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-red-600" /> Newburgh, IN</div>
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-red-600" /> Henderson, KY</div>
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-red-600" /> Owensboro, KY</div>
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-red-600" /> Boonville, IN</div>
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-red-600" /> Princeton, IN</div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center glass rounded-2xl p-6">
              <div className="mb-4 flex justify-center">{stat.icon}</div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
