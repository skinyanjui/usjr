'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Search, HelpCircle, Truck, Container, Sparkles, DollarSign, Phone } from 'lucide-react'
import { faqCategories } from './data'
import { settings } from '@/lib/cms-content'

export default function FAQClient() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredFAQs = useMemo(() => {
    return faqCategories
      .map(category => ({
        ...category,
        faqs: category.faqs.filter(
          faq =>
            faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
        ),
      }))
      .filter(category => category.faqs.length > 0)
  }, [searchTerm])

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'text-blue-600',
      red: 'text-red-600',
      orange: 'text-orange-600',
      green: 'text-green-600',
      purple: 'text-purple-600',
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  const getIcon = (name: string) => {
    switch (name) {
      case 'HelpCircle':
        return HelpCircle
      case 'Truck':
        return Truck
      case 'Container':
        return Container
      case 'Sparkles':
        return Sparkles
      case 'DollarSign':
        return DollarSign
      default:
        return HelpCircle
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl">
          Frequently Asked Questions
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-gray-600 sm:text-xl">
          Find answers to common questions about our junk removal, dumpster rental, and cleaning
          services in Evansville and Southern Indiana.
        </p>
      </div>

      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="relative">
            <Search
              className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-500"
              aria-hidden="true"
            />
            <Input
              placeholder="Search frequently asked questions..."
              aria-label="Search FAQs"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-8">
        {filteredFAQs.map(category => {
          const Icon = getIcon(category.icon)
          return (
            <Card key={category.id} id={category.id === 'pricing' ? 'price-match' : undefined}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Icon className={`h-6 w-6 ${getColorClasses(category.color)}`} />
                  {category.name}
                  <Badge variant="outline">{category.faqs.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {category.faqs.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`${category.id}-${index}`}
                      id={faq.question.includes('Price Match') ? 'price-match' : undefined}
                    >
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

      <Card className="mt-12 border-blue-200 bg-blue-50">
        <CardContent className="p-8 text-center">
          <h3 className="mb-4 text-2xl font-bold text-gray-900">Still Have Questions?</h3>
          <p className="mb-6 text-gray-600">
            Can't find the answer you're looking for? Our friendly team is here to help with any
            questions about our services.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href={`tel:${settings.phoneE164}`}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-red-700"
            >
              <Phone className="h-4 w-4" />
              Call {settings.phone}
            </Link>
            <Link
              href="/quote"
              prefetch
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-800 px-6 py-3 font-semibold text-red-800 transition-colors hover:bg-red-100"
            >
              Get Free Quote
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
