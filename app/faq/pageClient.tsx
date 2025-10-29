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
      accent: 'text-primary',
      success: 'text-foreground',
      warning: 'text-foreground',
      info: 'text-foreground',
      // Legacy color mapping for backward compatibility
      blue: 'text-primary',
      red: 'text-primary',
      orange: 'text-primary',
      green: 'text-primary',
      purple: 'text-primary',
    }
    return colors[color as keyof typeof colors] || colors.accent
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
    <div className="mx-auto max-w-7xl px-4">
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="relative">
            <Search
              className="text-muted-foreground absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform"
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
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="border-border bg-muted/30 mt-12">
        <CardContent className="p-8 text-center">
          <h3 className="text-foreground mb-4 text-2xl font-bold">Still Have Questions?</h3>
          <p className="text-muted-foreground mb-6">
            Can't find the answer you're looking for? Our friendly team is here to help with any
            questions about our services.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={`tel:${settings.phoneE164}`}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-6 py-2.5 text-base font-semibold text-white transition-colors hover:bg-gray-900"
            >
              <Phone className="h-4 w-4" />
              Call {settings.phone}
            </Link>
            <Link
              href="/quote"
              prefetch
              className="border-border text-primary inline-flex items-center justify-center gap-2 rounded-lg border px-6 py-2.5 text-base font-semibold transition-colors hover:bg-gray-900 dark:hover:bg-gray-900/30"
            >
              Get Free Quote
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
