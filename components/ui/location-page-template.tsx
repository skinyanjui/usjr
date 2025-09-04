import { Button } from "@/components/ui/button"
import { MapPin, LucideIcon } from "lucide-react"
import { settings } from "@/lib/cms-content"
import { PageHero } from "@/components/ui/page-hero"

export interface LocationFeature {
  icon: LucideIcon
  title: string
  description: string
}

export interface LocationOffer {
  title: string
  discount: string
  description: string
}

export interface LocationStory {
  title: string
  description: string
  author: string
  location: string
}

export interface LocationPageTemplateProps {
  locationName: string
  state: string
  tagline: string
  theme: "red" | "blue" | "green" | "orange" | "purple" | "teal"
  features: LocationFeature[]
  landmarks?: string[]
  neighborhoods?: string[]
  offers?: LocationOffer[]
  stories?: LocationStory[]
  serviceGuarantee?: {
    title: string
    description: string
  }
  disposalNote?: string
  ctaPrimary?: string
  ctaSecondary?: string
}

const themeConfig = {
  red: {
    gradient: "from-red-50 to-white",
    primary: "text-red-600",
    button: "bg-red-600 hover:bg-red-700",
    outline: "border-red-800 text-red-800 hover:bg-red-800",
    accent: "bg-red-50",
    accentText: "text-red-800",
    accentTextLight: "text-red-700"
  },
  blue: {
    gradient: "from-blue-50 to-white",
    primary: "text-blue-600",
    button: "bg-blue-600 hover:bg-blue-700",
    outline: "border-blue-800 text-blue-800 hover:bg-blue-800",
    accent: "bg-blue-50",
    accentText: "text-blue-800",
    accentTextLight: "text-blue-700"
  },
  green: {
    gradient: "from-green-50 to-white",
    primary: "text-green-600",
    button: "bg-green-600 hover:bg-green-700",
    outline: "border-green-800 text-green-800 hover:bg-green-800",
    accent: "bg-green-50",
    accentText: "text-green-800",
    accentTextLight: "text-green-700"
  },
  orange: {
    gradient: "from-orange-50 to-white",
    primary: "text-orange-600",
    button: "bg-orange-600 hover:bg-orange-700",
    outline: "border-orange-800 text-orange-800 hover:bg-orange-800",
    accent: "bg-orange-50",
    accentText: "text-orange-800",
    accentTextLight: "text-orange-700"
  },
  purple: {
    gradient: "from-purple-50 to-white",
    primary: "text-purple-600",
    button: "bg-purple-600 hover:bg-purple-700",
    outline: "border-purple-800 text-purple-800 hover:bg-purple-800",
    accent: "bg-purple-50",
    accentText: "text-purple-800",
    accentTextLight: "text-purple-700"
  },
  teal: {
    gradient: "from-teal-50 to-white",
    primary: "text-teal-600",
    button: "bg-teal-600 hover:bg-teal-700",
    outline: "border-teal-800 text-teal-800 hover:bg-teal-800",
    accent: "bg-teal-50",
    accentText: "text-teal-800",
    accentTextLight: "text-teal-700"
  }
}

export function LocationPageTemplate({
  locationName,
  state,
  tagline,
  theme,
  features,
  landmarks = [],
  neighborhoods = [],
  offers = [],
  stories = [],
  serviceGuarantee,
  disposalNote,
  ctaPrimary = `📞 Call ${settings.phone}`,
  ctaSecondary = "Text Photos for Instant Quote"
}: LocationPageTemplateProps) {
  const colors = themeConfig[theme]
  
  return (
    <main className="min-h-screen">
      <PageHero 
        title={`Professional Junk Removal in ${locationName}, ${state}`}
        description={tagline}
        imageSrc="/junk-removal-evansville.png" 
        priority 
      />

      {/* Local Expertise Section */}
      <section className={`py-16 bg-gradient-to-b ${colors.gradient}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {locationName}'s Trusted Junk Removal Experts Since 2016
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Local experts serving {locationName} with comprehensive junk removal services. 
              We know every neighborhood and provide efficient, affordable service you can trust.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Why {locationName} Chooses Uncle Sam Junk Removal
              </h3>
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <feature.icon className={`w-6 h-6 ${colors.primary} mt-1 flex-shrink-0`} />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button className={`${colors.button} text-white w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold`}>
                  {ctaPrimary}
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className={`${colors.outline} hover:text-white w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold bg-transparent`}
                >
                  <a href={`sms:${settings.phoneE164}`}>{ctaSecondary}</a>
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Comprehensive {locationName} Service Areas
              </h3>
              
              {neighborhoods.length > 0 && (
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {neighborhoods.map((neighborhood) => (
                    <div key={neighborhood} className="flex items-center gap-2">
                      <MapPin className={`w-4 h-4 ${colors.primary}`} />
                      <span className="text-gray-700">{neighborhood}</span>
                    </div>
                  ))}
                </div>
              )}
              
              {landmarks.length > 0 && (
                <div className={neighborhoods.length > 0 ? "pt-6 border-t border-gray-200" : ""}>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    {neighborhoods.length > 0 ? "Landmark Areas We Regularly Service" : `${locationName} Landmarks We Service`}
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                    {landmarks.map((landmark) => (
                      <div key={landmark}>• {landmark}</div>
                    ))}
                  </div>
                </div>
              )}

              {serviceGuarantee && (
                <div className={`mt-6 p-4 ${colors.accent} rounded-lg`}>
                  <h4 className={`font-semibold ${colors.accentText} mb-2`}>
                    {serviceGuarantee.title}
                  </h4>
                  <p className={`text-sm ${colors.accentTextLight}`}>
                    {serviceGuarantee.description}
                  </p>
                </div>
              )}

              {disposalNote && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Local Disposal Info</h4>
                  <p className="text-sm text-gray-600">{disposalNote}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Local Success Stories */}
      {stories.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Real {locationName} Success Stories
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {stories.map((story, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">{story.title}</h3>
                  <p className="text-gray-600 mb-3">{story.description}</p>
                  <p className="text-sm text-gray-500">- {story.author}, {story.location}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Special Location Offers */}
      {offers.length > 0 && (
        <section className={`py-16 ${colors.accent}`}>
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Exclusive {locationName} Offers
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Special pricing for our local {locationName} neighbors - because community matters.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {offers.map((offer, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="font-semibold text-gray-900 mb-2">{offer.title}</h3>
                  <p className={`${colors.primary} font-bold text-xl mb-2`}>{offer.discount}</p>
                  <p className="text-sm text-gray-600">{offer.description}</p>
                </div>
              ))}
            </div>

            <div className={`bg-gradient-to-r from-${theme}-100 to-${theme === 'red' ? 'orange' : theme === 'blue' ? 'indigo' : theme === 'green' ? 'emerald' : theme === 'orange' ? 'yellow' : theme === 'purple' ? 'pink' : 'cyan'}-100 rounded-lg p-6`}>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Ready to Clean Up {locationName}?
              </h3>
              <p className="text-gray-700 mb-4">
                Join hundreds of satisfied {locationName} customers who trust Uncle Sam Junk Removal
              </p>
              <Button className={`${colors.button} text-white px-8 py-3 font-semibold`}>
                Get Your Free {locationName} Quote Today
              </Button>
            </div>
          </div>
        </section>
      )}
    </main>
  )
}