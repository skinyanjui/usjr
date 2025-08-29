export type FaqItem = { question: string; answer: string }
export type FaqCategory = {
  id: string
  name: string
  icon: "HelpCircle" | "Truck" | "Container" | "Sparkles" | "DollarSign"
  color: "blue" | "red" | "orange" | "green" | "purple"
  faqs: FaqItem[]
}

export const faqCategories: FaqCategory[] = [
  {
    id: "general",
    name: "General Questions",
    icon: "HelpCircle",
    color: "blue",
    faqs: [
      {
        question: "What areas do you serve?",
        answer:
          "We serve Evansville, Newburgh, Henderson KY, Owensboro KY, Boonville, Princeton, and all of Southern Indiana. We also provide service to surrounding areas within 50 miles of Evansville.",
      },
      {
        question: "Are you licensed and insured?",
        answer:
          "Yes, Uncle Sam Junk Removal is fully licensed and insured. We carry general liability insurance and workers' compensation to protect both our team and your property.",
      },
      {
        question: "Do you offer same-day or emergency service?",
        answer:
          "Yes. Same-day service is available in most cases. For emergencies (storm damage, last-minute move-outs, illegal dumping), we target a 2-hour response when possible. After-hours fees may apply.",
      },
      {
        question: "How do you determine pricing?",
        answer:
          "Our pricing is based on the volume of items, type of materials, labor required, and disposal fees. We provide upfront, transparent pricing with no hidden fees.",
      },
      {
        question: "What is your cancellation or rescheduling policy?",
        answer:
          "You can cancel or reschedule up to 24 hours before your appointment at no charge. Same-day cancellations may incur a $25 dispatch fee to cover route planning.",
      },
      {
        question: "Do you provide arrival windows?",
        answer:
          "Yes. We provide a 2-hour arrival window and will send a text when we are 30 minutes away. If we're delayed due to traffic, we'll keep you updated.",
      },
    ],
  },
  {
    id: "junk-removal",
    name: "Junk Removal",
    icon: "Truck",
    color: "red",
    faqs: [
      {
        question: "What items can you remove?",
        answer:
          "We remove furniture, appliances, electronics, mattresses, construction debris, yard waste, hot tubs, and most household items. We cannot remove hazardous materials, chemicals, or liquids.",
      },
      {
        question: "Do I need to be present during pickup?",
        answer:
          "You don't need to be present if items are easily accessible and you've provided clear instructions. However, we recommend being available for any questions or final walkthrough.",
      },
      {
        question: "How quickly can you remove my junk?",
        answer:
          "Most junk removal jobs are completed the same day you call. Large jobs may require scheduling, but we typically complete all work within 24-48 hours.",
      },
      {
        question: "What happens to my junk after removal?",
        answer:
          "We prioritize eco-friendly disposal. Items are donated when possible, recycled when appropriate, and only sent to landfills as a last resort. We provide donation receipts upon request when available from our partners.",
      },
      {
        question: "Do you remove hazardous materials?",
        answer:
          "No. We cannot accept paint, chemicals, oils, fuels, asbestos, biohazards, or pressurized tanks. We can refer you to local hazardous waste programs for proper disposal.",
      },
    ],
  },
  {
    id: "dumpster",
    name: "Dumpster Rental",
    icon: "Container",
    color: "orange",
    faqs: [
      {
        question: "What sizes of dumpsters do you offer?",
        answer:
          "We offer 10-yard, 15-yard, 20-yard, and 30-yard dumpsters. Our team can help you choose the right size based on your project needs.",
      },
      {
        question: "How long can I keep the dumpster?",
        answer:
          "Standard rental period is 7-14 days. Extended rentals are available for an additional daily fee. We're flexible with timing to accommodate your project schedule.",
      },
      {
        question: "What can't go in the dumpster?",
        answer:
          "Hazardous materials, chemicals, paint, batteries, tires, and liquids cannot be placed in dumpsters. We provide a complete list of prohibited items with every rental.",
      },
      {
        question: "Do you need permits for dumpster placement?",
        answer:
          "Permits are typically required for street placement but not for private property. We can help coordinate permits if needed, though permit fees are additional.",
      },
      {
        question: "Do you protect driveways and surfaces?",
        answer:
          "Yes. We place protective boards under roll-offs to minimize surface contact and recommend a flat, sturdy placement area.",
      },
    ],
  },
  {
    id: "cleaning",
    name: "Cleaning Services",
    icon: "Sparkles",
    color: "green",
    faqs: [
      {
        question: "What cleaning products do you use?",
        answer:
          "We use eco-friendly, natural cleaning products that are safe for families, pets, and the environment. All products are non-toxic and biodegradable.",
      },
      {
        question: "Do you bring your own supplies?",
        answer:
          "Yes, we bring all necessary cleaning supplies and equipment. You don't need to provide anything unless you have specific product preferences.",
      },
      {
        question: "How often should I schedule cleaning services?",
        answer:
          "This depends on your needs. We offer weekly, bi-weekly, monthly, and one-time cleaning services. Most residential clients prefer bi-weekly service.",
      },
      {
        question: "Are your cleaners background checked?",
        answer:
          "Yes, all our cleaning staff undergo thorough background checks and are bonded and insured for your peace of mind.",
      },
      {
        question: "Do you offer move-in/move-out cleaning?",
        answer:
          "Yes. We provide detailed move-in/move-out cleaning including inside appliances, cabinets, and hard-to-reach areas. Quotes are free and customized to your space.",
      },
    ],
  },
  {
    id: "pricing",
    name: "Pricing & Payment",
    icon: "DollarSign",
    color: "purple",
    faqs: [
      {
        question: "How much do your services cost?",
        answer:
          "Junk removal: $89-$649, Dumpster rental: $299-$599, Cleaning: $99-$399. Final pricing depends on specific requirements. We provide free estimates for all services.",
      },
      {
        question: "Do you offer a Price Match Guarantee?",
        answer:
          "Yes. We match any written local competitor’s quote for the same service and scope. Text a photo or PDF of the quote to (812) 610-1657 with your address and preferred date for verification.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept cash, check, and all major credit cards (Visa, MasterCard, American Express, Discover). Payment is due upon completion of service.",
      },
      {
        question: "Do you charge for estimates?",
        answer:
          "No, all estimates are completely free with no obligation. We provide detailed, written estimates for all services.",
      },
      {
        question: "Are there any hidden fees?",
        answer:
          "No hidden fees ever. Our pricing includes labor, hauling, disposal fees, and cleanup. The price we quote is the price you pay.",
      },
      {
        question: "Should I tip the crew?",
        answer:
          "Tips are never required but always appreciated for exceptional service. If you'd like to tip, you can do so in cash or add it to your card payment.",
      },
    ],
  },
]

export function getAllFaqs(): FaqItem[] {
  const flat: FaqItem[] = []
  for (const category of faqCategories) {
    for (const faq of category.faqs) {
      flat.push(faq)
    }
  }
  return flat
}
