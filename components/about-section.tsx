import { Button } from "@/components/ui/button"
import { Star, Users, Truck, Award } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function AboutSection() {
  const stats = [
    {
      icon: <Users className="h-8 w-8 text-red-600" />,
      number: "5000+",
      label: "Happy Customers",
    },
    {
      icon: <Truck className="h-8 w-8 text-red-600" />,
      number: "10000+",
      label: "Jobs Completed",
    },
    {
      icon: <Star className="h-8 w-8 text-red-600" />,
      number: "4.9",
      label: "Star Rating",
    },
    {
      icon: <Award className="h-8 w-8 text-red-600" />,
      number: "15+",
      label: "Years Experience",
    },
  ]

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">About Uncle Sam Junk Removal</h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-6 leading-relaxed">
              We are a locally owned and operated junk removal and dumpster rental company serving Evansville, Indiana and
              surrounding areas. Our mission is to provide reliable, professional, and eco-friendly waste removal
              services.
            </p>
            <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed">
              With over 15 years of experience, we've built our reputation on honest pricing, punctual service, and
              exceptional customer care. We're not just removing junk – we're helping our community stay clean and
              organized.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-6 sm:px-8 py-3 rounded-full font-semibold">
                <Link href="/quote">Get Free Quote</Link>
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
            <div className="relative w-full h-80 md:h-[28rem]">
              <Image
                src="/placeholder-q941w.png"
                alt="Uncle Sam Junk Removal team"
                fill
                className="object-cover rounded-2xl shadow-2xl"
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={50}
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-red-600 text-white p-6 rounded-2xl glass">
              <h3 className="text-2xl font-bold mb-2">Locally Owned</h3>
              <p className="text-red-100">Serving Austin since 2008</p>
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
