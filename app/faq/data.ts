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
          "We provide comprehensive junk removal and cleaning services throughout Southern Indiana and Western Kentucky. Our primary service area includes Evansville, Newburgh, Henderson KY, Owensboro KY, Boonville, Princeton, Mount Vernon, New Harmony, and all surrounding communities within 50 miles of Evansville. We're fully licensed in both Indiana and Kentucky, with deep local knowledge of disposal regulations, recycling facilities, and donation centers in each area. Our local expertise means we know the most efficient routes, understand local permit requirements, and have established relationships with area recycling centers and charitable organizations.",
      },
      {
        question: "Do you serve Henderson, Kentucky?",
        answer:
          "Absolutely! We're fully licensed and insured to operate in Kentucky and have been serving Henderson and Henderson County for over 5 years. Our Kentucky operations follow all state disposal regulations, and we've built strong partnerships with local facilities including Henderson County Recycling Center and local Habitat for Humanity locations. We understand Kentucky's specific requirements for construction debris disposal, appliance recycling, and hazardous material handling. Since Henderson is just across the river from our Evansville base, we typically offer same-day service and don't charge additional travel fees for Henderson city limits.",
      },
      {
        question: "Can you provide service to Owensboro?",
        answer:
          "Yes, we regularly serve Owensboro and all of Daviess County. While Owensboro is at the edge of our service area (approximately 45 minutes from our Evansville headquarters), we've completed hundreds of successful projects there, from residential cleanouts to commercial property management. For Owensboro service, we recommend scheduling 24-48 hours in advance to ensure optimal timing and crew availability. We've established relationships with local Owensboro donation centers and recycling facilities, so your items are disposed of responsibly within the community when possible. Travel time is included in our standard pricing for Daviess County residents.",
      },
      {
        question: "Do you handle rural properties around Boonville?",
        answer:
          "Rural properties are actually our specialty! Having grown up in Southern Indiana, we understand the unique challenges of rural property cleanouts in Warrick County and surrounding areas. We regularly handle farm equipment removal, barn cleanouts, large-scale property clearing, and multi-generational estate cleanouts. Our trucks are equipped to navigate unpaved roads, and our team has experience with everything from old farm machinery to decades of accumulated materials. For properties over 2 acres, we offer volume-based pricing that often results in significant savings compared to our standard rates. We also understand rural disposal challenges and can coordinate with county facilities for proper agricultural waste disposal.",
      },
      {
        question: "Are you licensed and insured?",
        answer:
          "Yes, Uncle Sam Junk Removal is fully licensed and comprehensively insured with coverage specifically designed for junk removal and cleaning services. We carry $1 million in general liability insurance, workers' compensation for all team members, and bonding for in-home services. Our licensing includes waste hauling permits in both Indiana and Kentucky, business licenses in all municipalities we serve, and certifications for handling specific materials like appliances and electronics. We can provide certificate of insurance to property managers, HOAs, or commercial clients upon request. All insurance and licensing information is verified annually and kept current with state requirements.",
      },
      {
        question: "Do you offer same-day or emergency service?",
        answer:
          "Same-day service is available throughout our coverage area for calls received before 2 PM, Monday through Saturday. We understand that emergencies don't follow schedules, so we also provide priority emergency response for situations like storm damage cleanup, illegal dumping removal, last-minute estate cleanouts before property sales, and urgent move-out situations. Our emergency response typically targets a 2-4 hour window during business hours. After-hours emergency service (evenings and Sundays) is available with a $75 emergency fee, but we'll waive this fee for storm damage or other qualifying emergency situations. We keep crews on standby during severe weather season specifically for storm cleanup needs.",
      },
      {
        question: "How do you determine pricing?",
        answer:
          "Our pricing is based on a comprehensive assessment system we've refined over 8+ years in business. The primary factors include: volume of materials (measured in truck loads), type and weight of items (furniture vs. construction debris), labor complexity (basement vs. curbside pickup), disposal fees (which vary by material type), and any special handling requirements. We provide transparent, upfront pricing with a written estimate before any work begins. Unlike many competitors, our price includes all labor, loading, hauling, disposal fees, cleanup, and even covers potential disposal fee increases that might occur between estimate and service. We never add hidden fees, fuel surcharges, or surprise costs. Our volume-based pricing often results in better value for larger cleanouts compared to hourly rates.",
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
          "We handle virtually all household and business items including furniture, appliances, electronics, mattresses, construction debris, yard waste, hot tubs, exercise equipment, and office furniture. Our experience includes specialized items like piano removal, gun safes, playground equipment, and even small buildings like sheds or gazebos. We cannot legally remove hazardous materials (paint, chemicals, fuels), medical waste, asbestos-containing materials, or liquids. However, we can provide referrals to licensed hazardous waste disposal services. Our team has handled everything from single-item pickups to complete estate cleanouts involving decades of accumulated belongings. If you're unsure about an item, send us a photo via text and we'll provide immediate guidance on removal options.",
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
          "Environmental responsibility is core to our mission. We follow a strict waste diversion hierarchy: First, we identify items suitable for donation to local charities like Habitat for Humanity ReStore, Goodwill, local churches, and women's shelters. Second, we separate recyclable materials (metals, electronics, cardboard) for processing at certified facilities including Evansville Recycling Center and EWASTE+ for electronics. Third, we compost organic yard waste when possible. Only after these options are exhausted do we dispose of remaining materials at licensed waste facilities. We maintain detailed tracking of our diversion rates (currently 68% of collected materials are diverted from landfills) and can provide donation receipts when requested. Our partnerships with local environmental groups keep us informed of new recycling opportunities.",
      },
      {
        question: "Do you work with local Evansville recycling centers?",
        answer:
          "Absolutely! We've built strong partnerships with Evansville-area recycling and disposal facilities over our 8+ years of operation. Our primary partners include Evansville Recycling Center on SE Riverside Drive for metals and select electronics, EWASTE+ for comprehensive electronics recycling including TVs and computers, Habitat for Humanity ReStore locations for building materials and furniture, and multiple Goodwill locations for household items and clothing. We also work with specialized facilities for specific materials: auto recyclers for car parts, scrap dealers for industrial metals, and textile recyclers for large fabric items. These local partnerships allow us to keep materials in the community when possible and often result in cost savings we pass on to customers.",
      },
      {
        question: "Can you remove construction debris in Warrick County?",
        answer:
          "Yes, we handle construction debris throughout Warrick County including Boonville area. We're familiar with local disposal requirements and work with county-approved facilities.",
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
          "We offer four dumpster sizes to match your project needs: 10-yard (perfect for bathroom remodels, small cleanouts, holds about 3 pickup truck loads), 15-yard (ideal for kitchen remodels, small roofing projects, holds about 4.5 pickup truck loads), 20-yard (great for whole-room remodels, large cleanouts, holds about 6 pickup truck loads), and 30-yard (perfect for major renovations, new construction, holds about 9 pickup truck loads). Our experienced team can assess your project and recommend the optimal size based on material type and scope. We've found that choosing the right size upfront saves money and prevents the need for multiple containers or overage fees. If you're unsure, we can start with a smaller size and upgrade if needed.",
      },
      {
        question: "How long can I keep the dumpster?",
        answer:
          "Our standard rental period is 7 days for residential projects and up to 14 days for construction projects, with flexible extensions available. We understand that projects don't always go according to schedule, so we offer daily extension rates that are much more affordable than competitors' weekly minimums. For long-term projects (30+ days), we can arrange special pricing. Most customers find 7 days sufficient for home cleanouts, while renovations typically need 10-14 days. We'll work with your timeline - just give us 24 hours notice if you need an extension or are ready for early pickup. Weather delays, permit issues, or contractor schedules never result in rush fees from us.",
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
          "We exclusively use professional-grade, eco-friendly cleaning products that are safe for families, pets, and the environment. Our product selection includes EPA-certified green cleaners, plant-based degreasers, non-toxic disinfectants, and biodegradable floor cleaners. We avoid harsh chemicals like bleach, ammonia, or phosphates that can trigger allergies or respiratory issues. For clients with specific sensitivities, we can use fragrance-free formulations or even products you provide. Our cleaning arsenal includes specialized products for different surfaces: natural stone cleaners for granite and marble, wood-safe polishes for furniture, and stainless steel cleaners that don't leave streaks. All products meet or exceed EPA standards for environmental safety and human health.",
      },
      {
        question: "Do you bring your own supplies?",
        answer:
          "Yes, we bring all necessary cleaning supplies and equipment. You don't need to provide anything unless you have specific product preferences.",
      },
      {
        question: "How often should I schedule cleaning services?",
        answer:
          "The optimal cleaning frequency depends on your lifestyle, household size, pets, and personal preferences. Based on our 8+ years of experience, here's what we typically recommend: Weekly service for busy families with children, multiple pets, or anyone who prefers consistently pristine conditions. Bi-weekly service (our most popular option) works well for most households and provides excellent value while maintaining cleanliness. Monthly service suits light-use homes, single occupants, or those who maintain regular daily cleaning but want deep cleaning support. One-time service is perfect for move-ins/outs, post-construction cleanup, or seasonal deep cleans. We can always adjust frequency based on your experience - many clients start monthly and upgrade to bi-weekly once they experience the difference professional cleaning makes.",
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
          "Our pricing reflects quality service with transparent, competitive rates: Junk removal typically ranges $89-$649 depending on volume and material type, with most residential jobs falling between $159-$389. Dumpster rental ranges $299-$599 including delivery, pickup, and disposal fees (no hidden charges). Cleaning services range $99-$399 based on home size and service level, with our popular bi-weekly residential cleaning averaging $179. We provide detailed, written estimates that break down all costs including labor, disposal fees, and any special handling charges. Unlike many competitors, our prices include everything - no fuel surcharges, no disposal fee increases, no surprise add-ons. We also offer package discounts for customers using multiple services and seasonal promotions that can reduce costs significantly.",
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
