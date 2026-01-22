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
import { faqCategories } from './data'

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

  const getIcon = (name: string) => {
    switch (name) {
      case 'HelpCircle': return HelpCircle
      case 'Truck': return Truck
      case 'Container': return Container
      case 'Sparkles': return Sparkles
      case 'DollarSign': return DollarSign
      default: return HelpCircle
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
            className="pl-10 h-12 text-base"
          />
        </div>
      </div>

      {/* FAQ Categories */}
      <div className="space-y-6">
        {filteredFAQs.map(category => {
          const Icon = getIcon(category.icon)
          return (
            <div key={category.id} id={category.id === 'pricing' ? 'price-match' : undefined} className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="border-b border-border bg-muted/30 px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-background border border-border">
                    <Icon className="h-4 w-4 text-foreground" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground flex-1">{category.name}</h3>
                  <Badge variant="outline" className="bg-background">{category.faqs.length}</Badge>
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
                      <AccordionTrigger className="text-left py-4 hover:text-primary transition-colors text-foreground font-medium">
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
