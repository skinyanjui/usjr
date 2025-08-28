import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Star, Shield, Truck, Users, Award, Clock } from "lucide-react"
import { settings } from "@/lib/cms-content"
import { PageHero } from "@/components/ui/page-hero"
import { QuoteCtaLink } from "@/components/quote-cta-link"

export const metadata: Metadata = {
  title: "About Uncle Sam Junk Removal | Local Junk Removal & Cleaning Services",
  description:
    "Learn about Uncle Sam Junk Removal—founded in 2025 by Marine Corps veteran Samuel Kinyanjui. Cleaning by Karcher Cleaners, a women-owned company led by Chelsey Karcher. Licensed & insured.",
  keywords:
    "about uncle sam junk removal, evansville junk removal company, local cleaning service, veteran owned, karcher cleaners, women owned business",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <PageHero title="About Uncle Sam Junk Removal" description="Evansville's trusted partner for junk removal, dumpster rental, and professional cleaning services. Veteran-owned, founded in 2025." imageSrc="/junk-removal-evansville.png" priority />

      {/* Our Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded in 2025 by <strong>Samuel Kinyanjui</strong> — a United States Marine Corps veteran — Uncle Sam
                  Junk Removal was built with a simple mission: help our neighbors in Evansville and Southern Indiana
                  reclaim their spaces with reliable, professional service.
                </p>
                <p>
                  Today, we deliver fast, friendly junk removal and dumpster services with integrity, respect, and
                  transparent pricing.
                </p>
                <p>
                  Our professional cleaning services are proudly provided by <strong>Cleaning by Karcher Cleaners</strong>
                  — a women-owned company led by <strong>Chelsey Karcher</strong>.
                </p>
              </div>
            </div>
            <div className="glass rounded-2xl p-8">
              <img
                src="/placeholder-bd22o.png"
                alt="Uncle Sam Junk Removal team and trucks"
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">2025</div>
                  <div className="text-gray-600">Founded</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">10,000+</div>
                  <div className="text-gray-600">Jobs Completed</div>
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
              <img
                src="/professional-business-owner.png"
                alt="Samuel Kinyanjui, Founder & Owner"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold mb-2">Samuel Kinyanjui</h3>
              <p className="text-red-600 font-medium mb-3">Founder & Owner</p>
              <p className="text-gray-600 text-sm">
                United States Marine Corps veteran and founder of Uncle Sam Junk Removal. Samuel leads with integrity and a
                commitment to reliable, professional service.
              </p>
            </div>

            <div className="glass rounded-2xl p-8 text-center">
              <img
                src="/professional-woman-business-owner.png"
                alt="Chelsey Karcher, Owner of Cleaning by Karcher Cleaners"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold mb-2">Chelsey Karcher</h3>
              <p className="text-green-600 font-medium mb-3">Owner, Cleaning by Karcher Cleaners</p>
              <p className="text-gray-600 text-sm">
                Leads our women-owned cleaning partner, delivering professional cleaning services with exceptional
                attention to detail.
              </p>
            </div>

            <div className="glass rounded-2xl p-8 text-center">
              <img
                src="/placeholder-4la9z.png"
                alt="Our Local Team"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
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
      <section className="py-16 bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Experience the Uncle Sam Difference?</h2>
          <p className="text-xl text-red-100 mb-8">
            Join thousands of satisfied customers who trust Uncle Sam Junk Removal for their junk removal and cleaning
            needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-red-600 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold text-lg">
              📞 {settings.phone}
            </Button>
            <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-red-600 px-8 py-3 rounded-full font-semibold text-lg bg-transparent">
              <QuoteCtaLink location="about-page-cta" label="Get Free Quote">Get Free Quote</QuoteCtaLink>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
