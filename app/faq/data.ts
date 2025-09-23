export type FaqItem = { question: string; answer: string }
export type FaqCategory = {
  id: string
  name: string
  icon: 'HelpCircle' | 'Truck' | 'Container' | 'Sparkles' | 'DollarSign'
  color: 'blue' | 'red' | 'orange' | 'green' | 'purple'
  faqs: FaqItem[]
}

export const faqCategories: FaqCategory[] = [
  {
    id: 'general',
    name: 'General Questions',
    icon: 'HelpCircle',
    color: 'blue',
    faqs: [
      {
        question: 'What areas do you serve?',
        answer:
          "We provide comprehensive junk removal and cleaning services throughout Southern Indiana and Western Kentucky. Our primary service area includes Evansville, Newburgh, Henderson KY, Owensboro KY, Boonville, Princeton, Mount Vernon, New Harmony, and all surrounding communities within 50 miles of Evansville. We're fully licensed in both Indiana and Kentucky, with deep local knowledge of disposal regulations, recycling facilities, and donation centers in each area. Our local expertise means we know the most efficient routes, understand local permit requirements, and have established relationships with area recycling centers and charitable organizations.",
      },
      {
        question: 'Do you serve Henderson, Kentucky?',
        answer:
          "Absolutely! We're fully licensed and insured to operate in Kentucky and have been serving Henderson and Henderson County for over 5 years. Our Kentucky operations follow all state disposal regulations, and we've built strong partnerships with local facilities including Henderson County Recycling Center and local Habitat for Humanity locations. We understand Kentucky's specific requirements for construction debris disposal, appliance recycling, and hazardous material handling. Since Henderson is just across the river from our Evansville base, we typically offer same-day service and don't charge additional travel fees for Henderson city limits.",
      },
      {
        question: 'Can you provide service to Owensboro?',
        answer:
          "Yes, we regularly serve Owensboro and all of Daviess County. While Owensboro is at the edge of our service area (approximately 45 minutes from our Evansville headquarters), we've completed hundreds of successful projects there, from residential cleanouts to commercial property management. For Owensboro service, we recommend scheduling 24-48 hours in advance to ensure optimal timing and crew availability. We've established relationships with local Owensboro donation centers and recycling facilities, so your items are disposed of responsibly within the community when possible. Travel time is included in our standard pricing for Daviess County residents.",
      },
      {
        question: 'Do you handle rural properties around Boonville?',
        answer:
          'Rural properties are actually our specialty! Having grown up in Southern Indiana, we understand the unique challenges of rural property cleanouts in Warrick County and surrounding areas. We regularly handle farm equipment removal, barn cleanouts, large-scale property clearing, and multi-generational estate cleanouts. Our trucks are equipped to navigate unpaved roads, and our team has experience with everything from old farm machinery to decades of accumulated materials. For properties over 2 acres, we offer volume-based pricing that often results in significant savings compared to our standard rates. We also understand rural disposal challenges and can coordinate with county facilities for proper agricultural waste disposal.',
      },
      {
        question: 'Are you licensed and insured?',
        answer:
          "Yes, Uncle Sam Junk Removal is fully licensed and comprehensively insured with coverage specifically designed for junk removal and cleaning services. We carry $1 million in general liability insurance, workers' compensation for all team members, and bonding for in-home services. Our licensing includes waste hauling permits in both Indiana and Kentucky, business licenses in all municipalities we serve, and certifications for handling specific materials like appliances and electronics. We can provide certificate of insurance to property managers, HOAs, or commercial clients upon request. All insurance and licensing information is verified annually and kept current with state requirements.",
      },
      {
        question: 'Do you offer same-day or emergency service?',
        answer:
          "Same-day service is available throughout our coverage area for calls received before 2 PM, Monday through Saturday. We understand that emergencies don't follow schedules, so we also provide priority emergency response for situations like storm damage cleanup, illegal dumping removal, last-minute estate cleanouts before property sales, and urgent move-out situations. Our emergency response typically targets a 2-4 hour window during business hours. After-hours emergency service (evenings and Sundays) is available with a $75 emergency fee, but we'll waive this fee for storm damage or other qualifying emergency situations. We keep crews on standby during severe weather season specifically for storm cleanup needs.",
      },
      {
        question: 'How do you determine pricing?',
        answer:
          "Our pricing is based on a comprehensive assessment system we've refined over 8+ years in business. The primary factors include: volume of materials (measured in truck loads), type and weight of items (furniture vs. construction debris), labor complexity (basement vs. curbside pickup), disposal fees (which vary by material type), and any special handling requirements. We provide transparent, upfront pricing with a written estimate before any work begins. Unlike many competitors, our price includes all labor, loading, hauling, disposal fees, cleanup, and even covers potential disposal fee increases that might occur between estimate and service. We never add hidden fees, fuel surcharges, or surprise costs. Our volume-based pricing often results in better value for larger cleanouts compared to hourly rates.",
      },
      {
        question: 'What is your cancellation or rescheduling policy?',
        answer:
          "We offer flexible cancellation and rescheduling because we understand that life happens. You can cancel or reschedule up to 24 hours before your appointment at no charge - just call or text us. For same-day cancellations (less than 24 hours notice), there may be a $25 dispatch fee to cover route planning and crew scheduling, since we've already committed resources to your job. However, we waive this fee for emergencies, weather issues, or other circumstances beyond your control. We'd much rather reschedule than have you feel pressured to proceed when it's not convenient. Our scheduling system allows easy rescheduling online or via phone, and we'll work with your calendar to find the best alternative date.",
      },
      {
        question: 'Do you provide arrival windows?',
        answer:
          "Yes! We provide precise 2-hour arrival windows and use real-time GPS tracking to keep you informed. You'll receive a confirmation text the evening before your service with your arrival window, and we'll send another text when our crew is 30 minutes away with an updated ETA. If we're running behind due to traffic, weather, or a previous job taking longer than expected, we'll proactively contact you with updates rather than leaving you guessing. Our dispatch system allows us to provide accurate ETAs, and if we're more than 15 minutes late to your window, we'll offer a service discount. We respect your time and understand that waiting around all day isn't an option for busy families and professionals.",
      },
    ],
  },
  {
    id: 'junk-removal',
    name: 'Junk Removal',
    icon: 'Truck',
    color: 'red',
    faqs: [
      {
        question: 'What items can you remove?',
        answer:
          "We handle virtually all household and business items including furniture, appliances, electronics, mattresses, construction debris, yard waste, hot tubs, exercise equipment, and office furniture. Our experience includes specialized items like piano removal, gun safes, playground equipment, and even small buildings like sheds or gazebos. We cannot legally remove hazardous materials (paint, chemicals, fuels), medical waste, asbestos-containing materials, or liquids. However, we can provide referrals to licensed hazardous waste disposal services. Our team has handled everything from single-item pickups to complete estate cleanouts involving decades of accumulated belongings. If you're unsure about an item, send us a photo via text and we'll provide immediate guidance on removal options.",
      },
      {
        question: 'Do I need to be present during pickup?',
        answer:
          "While you don't need to be present if items are clearly marked and easily accessible, we generally recommend being available for the best experience. When you're present, you can point out specific items, clarify any questions about what stays or goes, ensure valuable items aren't accidentally removed, and do a final walkthrough to confirm everything was handled to your satisfaction. If you can't be present, we can work with clear written instructions, photos of items to be removed, and detailed access information. Many customers prefer to be there for the first 10-15 minutes to point everything out, then leave while we do the heavy lifting. For security reasons, we require someone 18+ to be present for interior work if items aren't pre-staged outside.",
      },
      {
        question: 'How quickly can you remove my junk?',
        answer:
          'Most junk removal jobs are completed the same day you call. Large jobs may require scheduling, but we typically complete all work within 24-48 hours.',
      },
      {
        question: 'What happens to my junk after removal?',
        answer:
          "Environmental responsibility is core to our mission. We follow a strict waste diversion hierarchy: First, we identify items suitable for donation to local charities like Habitat for Humanity ReStore, Goodwill, local churches, and women's shelters. Second, we separate recyclable materials (metals, electronics, cardboard) for processing at certified facilities including Evansville Recycling Center and EWASTE+ for electronics. Third, we compost organic yard waste when possible. Only after these options are exhausted do we dispose of remaining materials at licensed waste facilities. We maintain detailed tracking of our diversion rates (currently 68% of collected materials are diverted from landfills) and can provide donation receipts when requested. Our partnerships with local environmental groups keep us informed of new recycling opportunities.",
      },
      {
        question: 'Do you work with local Evansville recycling centers?',
        answer:
          "Absolutely! We've built strong partnerships with Evansville-area recycling and disposal facilities over our 8+ years of operation. Our primary partners include Evansville Recycling Center on SE Riverside Drive for metals and select electronics, EWASTE+ for comprehensive electronics recycling including TVs and computers, Habitat for Humanity ReStore locations for building materials and furniture, and multiple Goodwill locations for household items and clothing. We also work with specialized facilities for specific materials: auto recyclers for car parts, scrap dealers for industrial metals, and textile recyclers for large fabric items. These local partnerships allow us to keep materials in the community when possible and often result in cost savings we pass on to customers.",
      },
      {
        question: 'Can you remove construction debris in Warrick County?',
        answer:
          "Yes, we handle construction debris throughout Warrick County including Boonville area. We're familiar with local disposal requirements and work with county-approved facilities.",
      },
      {
        question: 'Do you remove hazardous materials?',
        answer:
          'No. We cannot accept paint, chemicals, oils, fuels, asbestos, biohazards, or pressurized tanks. We can refer you to local hazardous waste programs for proper disposal.',
      },
    ],
  },
  {
    id: 'cleaning',
    name: 'Cleaning Services',
    icon: 'Sparkles',
    color: 'green',
    faqs: [
      {
        question: 'What cleaning products do you use?',
        answer:
          "We exclusively use professional-grade, eco-friendly cleaning products that are safe for families, pets, and the environment. Our product selection includes EPA-certified green cleaners, plant-based degreasers, non-toxic disinfectants, and biodegradable floor cleaners. We avoid harsh chemicals like bleach, ammonia, or phosphates that can trigger allergies or respiratory issues. For clients with specific sensitivities, we can use fragrance-free formulations or even products you provide. Our cleaning arsenal includes specialized products for different surfaces: natural stone cleaners for granite and marble, wood-safe polishes for furniture, and stainless steel cleaners that don't leave streaks. All products meet or exceed EPA standards for environmental safety and human health.",
      },
      {
        question: 'Do you bring your own supplies?',
        answer:
          "Yes, we bring all necessary cleaning supplies and equipment. You don't need to provide anything unless you have specific product preferences.",
      },
      {
        question: 'How often should I schedule cleaning services?',
        answer:
          "The optimal cleaning frequency depends on your lifestyle, household size, pets, and personal preferences. Based on our 8+ years of experience, here's what we typically recommend: Weekly service for busy families with children, multiple pets, or anyone who prefers consistently pristine conditions. Bi-weekly service (our most popular option) works well for most households and provides excellent value while maintaining cleanliness. Monthly service suits light-use homes, single occupants, or those who maintain regular daily cleaning but want deep cleaning support. One-time service is perfect for move-ins/outs, post-construction cleanup, or seasonal deep cleans. We can always adjust frequency based on your experience - many clients start monthly and upgrade to bi-weekly once they experience the difference professional cleaning makes.",
      },
      {
        question: 'Are your cleaners background checked?',
        answer:
          'Yes, all our cleaning staff undergo thorough background checks and are bonded and insured for your peace of mind.',
      },
      {
        question: 'Do you offer move-in/move-out cleaning?',
        answer:
          'Yes. We provide detailed move-in/move-out cleaning including inside appliances, cabinets, and hard-to-reach areas. Quotes are free and customized to your space.',
      },
    ],
  },
  {
    id: 'pricing',
    name: 'Pricing & Payment',
    icon: 'DollarSign',
    color: 'purple',
    faqs: [
      {
        question: 'How much do your services cost?',
        answer:
          'Our pricing reflects quality service with transparent, competitive rates: Junk removal typically ranges $89-$649 depending on volume and material type, with most residential jobs falling between $159-$389. Dumpster rental ranges $299-$599 including delivery, pickup, and disposal fees (no hidden charges). Cleaning services range $99-$399 based on home size and service level, with our popular bi-weekly residential cleaning averaging $179. We provide detailed, written estimates that break down all costs including labor, disposal fees, and any special handling charges. Unlike many competitors, our prices include everything - no fuel surcharges, no disposal fee increases, no surprise add-ons. We also offer package discounts for customers using multiple services and seasonal promotions that can reduce costs significantly.',
      },
      {
        question: 'Do you offer a Price Match Guarantee?',
        answer:
          'Yes. We match any written local competitor’s quote for the same service and scope. Text a photo or PDF of the quote to (812) 610-1657 with your address and preferred date for verification.',
      },
      {
        question: 'What payment methods do you accept?',
        answer:
          'We accept all major payment methods for your convenience: cash, personal or business checks, and all major credit cards including Visa, MasterCard, American Express, and Discover. For recurring cleaning services, we can set up automatic billing to your preferred card. Payment is due upon completion of service, and we never require payment upfront (a red flag with some competitors). For large commercial projects over $1,000, we can arrange net-15 payment terms with approved credit. Our invoicing system provides detailed receipts that break down services performed, materials disposed of, and any applicable discounts or promotions applied.',
      },
      {
        question: 'Do you charge for estimates?',
        answer:
          "Absolutely not! All estimates are completely free with no obligation, no pressure, and no fine print. We believe you should know exactly what you're paying before committing to any service. Our estimates include detailed breakdowns of labor, disposal fees, and any special handling requirements. For most junk removal jobs, we can provide accurate estimates via text photos, but we're always happy to visit in person for complex projects. Unlike some competitors who charge 'assessment fees' or 'quote fees,' we only make money when we provide value to you. Our free estimates are valid for 30 days and include detailed explanations of our process, timeline, and what's included in your service.",
      },
      {
        question: 'Are there any hidden fees?',
        answer:
          "Never! Transparent pricing is fundamental to our business model. Our quotes include everything: labor, equipment, hauling, disposal fees, cleanup, protective materials for your property, and even potential disposal fee increases that might occur between quote and service. Unlike many competitors, we don't add fuel surcharges, weekend fees, weight overages (unless extreme), or last-minute 'disposal fee adjustments.' The price we quote is the price you pay, period. Our detailed estimates clearly break down what's included so there are never surprises. The only additional charge you might encounter is if you add significant items to the job after we arrive, and even then, we'll get your approval before proceeding.",
      },
      {
        question: 'Should I tip the crew?',
        answer:
          "Tips are never required or expected, but they're always genuinely appreciated when customers feel we've provided exceptional service. Our crew members are fairly compensated with competitive wages and benefits, so you should never feel obligated to tip. However, many customers choose to tip for particularly challenging jobs (like multi-story furniture removal), going above and beyond service, or when our team works in difficult conditions. If you'd like to tip, you can do so in cash directly to the crew or add it to your credit card payment. Typical tips range from $10-50 depending on job size and complexity. Many customers also show appreciation by leaving positive reviews, which helps our business grow and allows us to maintain our quality standards.",
      },
      {
        question: 'Do you offer discounts for multiple services?',
        answer:
          'Yes! We offer significant package discounts when you combine our services. For example, customers who book both junk removal and cleaning services save 15% on the cleaning portion. Estate cleanout customers who also need ongoing cleaning services receive 20% off their first three cleaning sessions. Dumpster rental customers who also need junk removal service get preferred pricing on both. We also offer seasonal promotions, military/veteran discounts (10% off), senior citizen discounts (10% off for 65+), and special rates for repeat customers. Property managers and real estate agents working multiple properties receive volume pricing. Our goal is to reward customer loyalty and make our comprehensive services more accessible.',
      },
      {
        question: 'What makes Uncle Sam Junk Removal different from competitors?',
        answer:
          "Our difference lies in genuine local expertise, environmental responsibility, and customer-first policies. As longtime Southern Indiana residents, we understand local regulations, have established relationships with recycling centers and charities, and know the most efficient routes. We divert 68% of collected materials from landfills through our donation and recycling partnerships. Unlike many competitors, we never require upfront payment, we include all fees in our quotes (no surprises), and we offer a comprehensive price match guarantee. Our team undergoes background checks and extensive training. We're fully licensed in both Indiana and Kentucky, carry comprehensive insurance, and have maintained an A+ BBB rating. Most importantly, we treat every customer's property as if it were our own family's home.",
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
