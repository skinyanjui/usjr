"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, HelpCircle, Truck, Container, Sparkles, DollarSign, Phone } from "lucide-react"
import { faqCategories } from "./data"
import { settings } from "@/lib/cms-content"
import { trackQuoteClick } from "@/lib/quoteTracking"

export default function FAQClient() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredFAQs = useMemo(() => {
    return faqCategories
      .map((category) => ({
        ...category,
        faqs: category.faqs.filter(
          (faq) =>
            faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      }))
      .filter((category) => category.faqs.length > 0)
  }, [searchTerm])

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "text-blue-600",
      red: "text-red-600",
      orange: "text-orange-600",
      green: "text-green-600",
      purple: "text-purple-600",
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  const getIcon = (name: string) => {
    switch (name) {
      case "HelpCircle":
        return HelpCircle
      case "Truck":
        return Truck
      case "Container":
        return Container
      case "Sparkles":
        return Sparkles
      case "DollarSign":
        return DollarSign
      default:
        return HelpCircle
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
          Find answers to common questions about our junk removal, dumpster rental, and cleaning services in
          Evansville and Southern Indiana.
        </p>
      </div>

      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" aria-hidden="true" />
            <Input
              placeholder="Search frequently asked questions..."
              aria-label="Search FAQs"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-8">
        {filteredFAQs.map((category) => {
          const Icon = getIcon(category.icon)
          return (
            <Card key={category.id} id={category.id === "pricing" ? "price-match" : undefined}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Icon className={`w-6 h-6 ${getColorClasses(category.color)}`} />
                  {category.name}
                  <Badge variant="outline">{category.faqs.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {category.faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`${category.id}-${index}`} id={faq.question.includes("Price Match") ? "price-match" : undefined}>
                      <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                      <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="mt-12 bg-blue-50 border-blue-200">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Still Have Questions?</h3>
          <p className="text-gray-600 mb-6">
            Can't find the answer you're looking for? Our friendly team is here to help with any questions about our
            services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`tel:${settings.phoneE164}`}
              className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <Phone className="w-4 h-4" />
              Call {settings.phone}
            </Link>
            <Link
              href="/quote"
              prefetch
              onClick={() => trackQuoteClick({ location: "faq", label: "Get Free Quote", destination: "/quote" })}
              className="inline-flex items-center justify-center gap-2 border border-red-800 text-red-800 hover:bg-red-100 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Get Free Quote
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}