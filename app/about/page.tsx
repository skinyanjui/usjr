import type { Metadata } from "next"
import Script from "next/script"
import { Button } from "@/components/ui/button"
import { Star, Shield, Truck, Users, Award, Clock, MapPin, Leaf, Recycle } from "lucide-react"
import { settings } from "@/lib/cms-content"
import { PageHero } from "@/components/ui/page-hero"
import { QuoteCtaLink } from "@/components/quote-cta-link"

export const metadata: Metadata = {
  title: "About Uncle Sam Junk Removal | Local Junk Removal & Cleaning Services",
  description:
    "Uncle Sam Junk Removal is a veteran-owned junk removal and dumpster rental company in Evansville, IN. Founded in 2025 by Marine Corps veteran Samuel Kinyanjui. Professional cleaning by women-owned Karcher Cleaners, led by Chelsey Karcher. Serving Evansville, Newburgh, Henderson, Owensboro, Boonville, and Princeton. Licensed & insured.",
  keywords:
    "evansville junk removal, evansville dumpster rental, junk removal henderson ky, newburgh in junk removal, owensboro junk hauling, veteran owned junk removal evansville, women owned cleaning evansville, karcher cleaners",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <PageHero title="About Uncle Sam Junk Removal" description="Veteran-owned junk removal, dumpster rental, and professional cleaning in Evansville, IN and the Tri-State." imageSrc="/junk-removal-evansville.png" priority />

      {/* SEO: LocalBusiness JSON-LD */}
      <Script id="jsonld-localbusiness" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Uncle Sam Junk Removal",
          url: "https://unclesamjunkremoval.com",
          telephone: settings.phoneE164,
          description:
            "Veteran-owned junk removal and dumpster rental in Evansville, IN. Professional cleaning by women-owned Karcher Cleaners.",
          foundingDate: "2025",
          founder: {
            "@type": "Person",
            name: "Samuel Kinyanjui",
          },
          areaServed: settings.serviceAreas,
          sameAs: Object.values(settings.socialMedia || {}),
          knowsAbout: [
            "junk removal",
            "dumpster rental",
            "appliance removal",
            "estate cleanouts",
            "yard waste removal",
            "trash removal",
            "residential cleaning",
            "commercial cleaning",
          ],
        })}
      </Script>

      {/* Our Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded in 2025 by <strong>Samuel Kinyanjui</strong> — a United States Marine Corps veteran — Uncle Sam
                  Junk Removal serves <strong>Evansville, IN</strong> and the Tri-State with dependable, same-day junk
                  removal and dumpster rental. We built this company on Marine Corps values: integrity, respect, and
                  service.
                </p>
                <p>
                  Our professional cleaning services are provided by <a href="https://www.karchercleaners.com/" target="_blank" rel="noopener noreferrer"><strong>Karcher Cleaners</strong></a> — a
                  women-owned company led by <strong>Chelsey Karcher</strong>. Together, we deliver spotless homes and
                  businesses with eco-conscious products and consistent, high-quality results.
                </p>
                <p>
                  Whether you need a single item picked up, a full estate cleanout, or recurring office cleaning, we make
                  it easy with clear communication, honest pricing, and friendly, local professionals.
                </p>
              </div>
            </div>
            <div className="glass rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">2025</div>
                  <div className="text-gray-600">Founded</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">500+</div>
                  <div className="text-gray-600">Satisfied Clients</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local Service Areas */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Proudly Serving Evansville & The Tri-State</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We’re based in Evansville and serve nearby communities across Southern Indiana and Western Kentucky.
                Expect on-time arrivals, friendly crews, and efficient service—every time.
              </p>
              <ul className="grid sm:grid-cols-2 gap-3 text-gray-700">
                {settings.serviceAreas.map((area) => (
                  <li key={area} className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-red-600" />
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">What We Do</h3>
              <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-700">
                <div className="flex items-start gap-3">
                  <Truck className="w-5 h-5 text-blue-600 mt-0.5" />
                  <span>Full-service junk removal & curbside pick-ups</span>
                </div>
                <div className="flex items-start gap-3">
                  <Truck className="w-5 h-5 text-blue-600 mt-0.5" />
                  <span>Small dumpster rental options</span>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-red-600 mt-0.5" />
                  <span>Estate, garage, attic, and hoarding cleanouts</span>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-green-600 mt-0.5" />
                  <span>Commercial, office, and rental turnovers</span>
                </div>
                <div className="flex items-start gap-3">
                  <Recycle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <span>Appliance, mattress, and furniture recycling</span>
                </div>
                <div className="flex items-start gap-3">
                  <Leaf className="w-5 h-5 text-emerald-600 mt-0.5" />
                  <span>Eco-friendly residential and office cleaning</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass rounded-2xl p-8 text-center">
              <Shield className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">Reliability</h3>
              <p className="text-gray-600">
                We show up on time, every time. Our customers count on us, and we never let them down.
              </p>
            </div>

            <div className="glass rounded-2xl p-8 text-center">
              <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">Community</h3>
              <p className="text-gray-600">
                We're your neighbors. Supporting local families and businesses is at the heart of what we do.
              </p>
            </div>

            <div className="glass rounded-2xl p-8 text-center">
              <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">Excellence</h3>
              <p className="text-gray-600">
                From our first interaction to job completion, we strive for excellence in every detail.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Why Choose Uncle Sam Junk Removal?</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="font-bold mb-2">Licensed & Insured</h3>
              <p className="text-gray-600 text-sm">
                Full liability insurance and proper licensing for your peace of mind
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold mb-2">Same-Day Service</h3>
              <p className="text-gray-600 text-sm">Available 7 days a week for urgent junk removal needs</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold mb-2">Eco-Friendly</h3>
              <p className="text-gray-600 text-sm">We donate, recycle, and dispose responsibly whenever possible</p>
            </div>

            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="font-bold mb-2">5-Star Service</h3>
              <p className="text-gray-600 text-sm">Consistently rated 4.9/5 stars by our satisfied customers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">The dedicated professionals who make it all happen</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass rounded-2xl p-8 text-center">
              <h3 className="text-xl font-bold mb-2">Samuel Kinyanjui</h3>
              <p className="text-red-600 font-medium mb-3">Founder & Owner</p>
              <p className="text-gray-600 text-sm">
                United States Marine Corps veteran and founder of Uncle Sam Junk Removal. Samuel leads with integrity and a
                commitment to reliable, professional service.
              </p>
            </div>

            <div className="glass rounded-2xl p-8 text-center">
              <h3 className="text-xl font-bold mb-2">Chelsey Karcher</h3>
              <p className="text-green-600 font-medium mb-3">Owner, <a href="https://www.karchercleaners.com/" target="_blank" rel="noopener noreferrer" className="underline">Karcher Cleaners</a></p>
              <p className="text-gray-600 text-sm">
                Leads our women-owned cleaning partner, delivering professional cleaning services with exceptional
                attention to detail.
              </p>
            </div>

            <div className="glass rounded-2xl p-8 text-center">
              <h3 className="text-xl font-bold mb-2">Our Local Team</h3>
              <p className="text-blue-600 font-medium mb-3">Operations</p>
              <p className="text-gray-600 text-sm">
                Friendly professionals serving Evansville and surrounding areas with efficient, respectful service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-red-700 via-rose-600 to-orange-500 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Experience the Uncle Sam Difference?</h2>
          <p className="text-xl text-white/85 mb-8">
            Join thousands of satisfied customers who trust Uncle Sam Junk Removal for their junk removal and cleaning
            needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white/10 text-white hover:bg-white/20 border border-white/30 backdrop-blur px-8 py-3 rounded-full font-semibold text-lg">
              📞 {settings.phone}
            </Button>
            <Button asChild variant="outline" className="bg-white text-red-700 hover:bg-gray-100 border-transparent px-8 py-3 rounded-full font-semibold text-lg">
              <QuoteCtaLink location="about-page-cta" label="Get Free Quote">Get Free Quote</QuoteCtaLink>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
