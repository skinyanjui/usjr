'use client'

import { useMemo, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Search, HelpCircle, Truck, Container, Sparkles, DollarSign } from 'lucide-react'
import { faqCategories, FaqCategory } from './data'

export default function FAQClient() {
  const [searchTerm, setSearchTerm] = useState('')

  // Pre-compute searchable data structure
  // This runs only once on mount since faqCategories is static
  const searchableData = useMemo(() => {
    return faqCategories.map(category => ({
      ...category,
      faqs: category.faqs.map(faq => ({
        ...faq,
        qLower: faq.question.toLowerCase(),
        aLower: faq.answer.toLowerCase(),
      })),
    }))
  }, [])

  const filteredFAQs = useMemo(() => {
    if (!searchTerm) return faqCategories

    const normalizedTerm = searchTerm.toLowerCase()

    return searchableData
      .map(category => {
        // Find matching FAQs in the pre-computed data
        const matchingFaqs = category.faqs.filter(
          faq => faq.qLower.includes(normalizedTerm) || faq.aLower.includes(normalizedTerm)
        )

        // If no matches in this category, return null to filter it out later
        if (matchingFaqs.length === 0) return null

        // Return a new category object with ONLY the matching FAQs
        // We do NOT map back to remove qLower/aLower to save an iteration/allocation.
        // The extra props don't hurt the rendering components.
        return {
          ...category,
          faqs: matchingFaqs,
        }
      })
      .filter((category): category is (typeof searchableData)[0] => category !== null)
  }, [searchTerm, searchableData])

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
    <div className="mx-auto max-w-5xl px-4">
      {/* Search */}
      <div className="mb-8">
        <div className="relative">
          <Search
            className="text-muted-foreground absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform"
            aria-hidden="true"
          />
          <Input
            placeholder="Search FAQs..."
            aria-label="Search FAQs"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="h-12 pl-10 text-base"
          />
        </div>
      </div>

      {/* FAQ Categories */}
      <div className="space-y-6">
        {filteredFAQs.map(category => {
          const Icon = getIcon(category.icon)
          return (
            <div
              key={category.id}
              id={category.id === 'pricing' ? 'price-match' : undefined}
              className="border-border bg-card overflow-hidden rounded-xl border"
            >
              <div className="border-border bg-muted/30 border-b px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="bg-background border-border flex h-8 w-8 items-center justify-center rounded-lg border">
                    <Icon className="text-foreground h-4 w-4" />
                  </div>
                  <h3 className="text-foreground flex-1 text-lg font-bold">{category.name}</h3>
                  <Badge variant="outline" className="bg-background">
                    {category.faqs.length}
                  </Badge>
                </div>
              </div>
              <div className="px-6">
                <Accordion type="single" collapsible className="w-full">
                  {category.faqs.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`${category.id}-${index}`}
                      id={faq.question.includes('Price Match') ? 'price-match' : undefined}
                      className="border-border last:border-0"
                    >
                      <AccordionTrigger className="hover:text-primary text-foreground py-4 text-left font-medium transition-colors">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
