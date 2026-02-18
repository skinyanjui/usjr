import { Clock, Truck, Recycle, MapPin } from 'lucide-react'
import {
  LocationFeature,
  LocationOffer,
  LocationStory,
} from '@/components/ui/location-page-template'

export interface LocationData {
  locationName: string
  state: string
  tagline: string
  theme: 'primary'
  features: LocationFeature[]
  landmarks: string[]
  neighborhoods?: string[]
  offers: LocationOffer[]
  stories: LocationStory[]
  serviceGuarantee: {
    title: string
    description: string
  }
  disposalNote?: string
  driveTime?: string
}

export const locationData: Record<string, LocationData> = {
  evansville: {
    locationName: 'Evansville',
    state: 'Indiana',
    tagline:
      'Local experts serving Evansville since 2025 with same-day service, transparent pricing, and eco-friendly disposal',
    theme: 'primary',
    features: [
      {
        icon: Clock,
        title: 'Same-Day Service Across Evansville',
        description:
          'Call by 2 PM for same-day pickup. We serve from McCutchanville to downtown, with average response times under 3 hours for urgent requests.',
      },
      {
        icon: Truck,
        title: 'Deep Local Knowledge',
        description:
          'We know every Evansville neighborhood, from the historic Riverside district to new developments in the East Side. Our routes are optimized for efficiency and cost savings.',
      },
      {
        icon: Recycle,
        title: 'Local Environmental Partnerships',
        description:
          'We partner with Evansville Recycling Center, Habitat ReStore, and local charities to divert 68% of collected materials from landfills - keeping Evansville clean.',
      },
      {
        icon: MapPin,
        title: 'No Travel Fees Within City Limits',
        description:
          "Unlike regional companies, we don't charge travel fees for service within Evansville city limits. What we quote is what you pay - guaranteed.",
      },
    ],
    landmarks: [
      'Downtown Evansville',
      'University of Evansville',
      'Eastland Mall',
      'Wesselman Woods',
      'Angel Mounds',
      'Ford Center',
      'Mesker Park Zoo',
      'Tropicana Evansville',
    ],
    neighborhoods: [
      "Haynie's Corner",
      'Jacobsville',
      'Lincolnshire',
      'McCutchanville',
      'North Park',
      'Riverside',
      'Stringtown',
      'West Side',
    ],
    offers: [
      {
        title: 'University Discount',
        discount: '15% Off',
        description: 'Students, faculty, and UE staff with valid ID',
        validFrom: new Date().toISOString(),
        validThrough: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year
      },
      {
        title: 'Curbside Special',
        discount: 'Save $35',
        description: 'Items staged at curb for easy pickup',
        validFrom: new Date().toISOString(),
        validThrough: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(), // 90 days
      },
      {
        title: 'Neighbor Referral',
        discount: '$25 Credit',
        description: 'For each Evansville neighbor you refer',
        validFrom: new Date().toISOString(),
        validThrough: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year
      },
    ],
    stories: [
      {
        title: 'Jacobsville Estate Cleanout',
        description:
          'After my father passed, we had 40+ years of items to clear from his Jacobsville home. Uncle Sam handled everything with sensitivity and donated usable items to local charities.',
        author: 'Patricia M.',
        location: 'Jacobsville',
      },
      {
        title: 'UE Student Move-Out',
        description:
          'Moving out of our UE apartment with tons of furniture and study materials. They came same-day, sorted recyclables, and charged exactly what they quoted.',
        author: 'Kevin L.',
        location: 'University Area',
      },
      {
        title: 'Downtown Office Cleanout',
        description:
          'Our Main Street office renovation needed all furniture and equipment removed overnight. Uncle Sam coordinated after-hours service and recycled our old electronics properly.',
        author: 'Anderson & Associates',
        location: 'Downtown',
      },
    ],
    serviceGuarantee: {
      title: 'Service Guarantee',
      description:
        "If we can't provide same-day service when promised, we'll take $25 off your total - our commitment to reliable Evansville service.",
    },
  },

  newburgh: {
    locationName: 'Newburgh',
    state: 'Indiana',
    tagline:
      "Expert junk removal for Newburgh's historic charm with careful handling and prompt service",
    theme: 'primary',
    driveTime: '15-minute drive from Evansville',
    neighborhoods: [
      'Historic Downtown Newburgh',
      'Chandler',
      'Lynnville',
      'Tennyson',
      'Yankeetown',
      'Elberfeld',
    ],
    features: [
      {
        icon: Clock,
        title: 'Quick Response Time',
        description:
          '15-minute drive from Evansville - fast service to Newburgh with same-day availability when you call by 2 PM.',
      },
      {
        icon: Truck,
        title: 'Historic District Friendly',
        description:
          "Careful handling in Newburgh's historic neighborhoods with narrow streets and protected architecture.",
      },
      {
        icon: Recycle,
        title: 'Warrick County Compliant',
        description:
          'Following all local disposal regulations and working with Warrick County Solid Waste Management for proper recycling.',
      },
      {
        icon: MapPin,
        title: 'Local Area Expertise',
        description:
          'Regular service to Newburgh with knowledge of local access routes and neighborhood specifics.',
      },
    ],
    landmarks: [
      'Historic Downtown Newburgh',
      'Newburgh Riverfront',
      'Castle High School',
      'Newburgh Town Hall',
      'Ohio River Scenic Byway',
      'Newburgh Museum',
      'Friedman Park',
      'Newburgh Lock and Dam',
    ],
    offers: [
      {
        title: 'Historic District Special',
        discount: 'Save $20',
        description: 'Careful removal in historic areas',
      },
      {
        title: 'Riverfront Pickup',
        discount: 'No Extra Fees',
        description: 'Service to waterfront properties',
      },
      {
        title: 'Same-Day Service',
        discount: 'Available',
        description: 'Call by 2 PM for same-day pickup',
      },
    ],
    stories: [
      {
        title: 'Historic Home Renovation',
        description:
          'Renovating our 1890s home required careful removal of old fixtures and debris. Uncle Sam protected our original hardwood floors and worked around our tight schedule.',
        author: 'Rebecca T.',
        location: 'Historic District',
      },
      {
        title: 'Riverfront Property Cleanout',
        description:
          'Our Ohio River property had decades of accumulated items in the basement. They handled everything professionally and recycled what they could.',
        author: 'James H.',
        location: 'Riverfront',
      },
      {
        title: 'Castle High School Project',
        description:
          'Needed quick cleanout for our office space. Uncle Sam came same-day and helped us donate usable furniture to local families.',
        author: 'Mary K.',
        location: 'Near Castle High',
      },
    ],
    serviceGuarantee: {
      title: 'Historic Care Guarantee',
      description:
        'We guarantee careful handling of historic properties and will repair any damage caused by our team during removal.',
    },
    disposalNote:
      'We work with Warrick County Solid Waste Management for proper disposal and recycling of all materials collected in Newburgh.',
  },

  'new-harmony-in': {
    locationName: 'New Harmony',
    state: 'Indiana',
    tagline:
      "Respectful junk removal for New Harmony's historic preservation with careful handling and community focus",
    theme: 'primary',
    neighborhoods: [
      'Historic District',
      'Near Harmonie State Park',
      'Poseyville',
      'Crossville',
      'Solitude',
    ],
    features: [
      {
        icon: Clock,
        title: 'Prompt Scheduling',
        description:
          'Same-day when available or next-day guaranteed service to preserve your timeline while respecting historic district guidelines.',
      },
      {
        icon: Truck,
        title: 'Careful Historic Handling',
        description:
          'We protect historic architecture and navigate tight alleys during removal, ensuring no damage to valuable period features.',
      },
      {
        icon: Recycle,
        title: 'Preservation-Focused Disposal',
        description:
          'Donations and recycling prioritized to reduce landfill impact while supporting local preservation efforts.',
      },
      {
        icon: MapPin,
        title: 'Posey County Expertise',
        description:
          'Following local disposal rules and supporting preservation efforts throughout Posey County.',
      },
    ],
    landmarks: [
      'Historic New Harmony District',
      'Harmonie State Park',
      'Atheneum Visitor Center',
      'Roofless Church',
      'Wabash River Overlook',
      'Historic District',
      "Working Men's Institute",
      "Thrall's Opera House",
    ],
    offers: [
      {
        title: 'Historic Preservation Discount',
        discount: '10% Off',
        description: 'For registered historic properties',
      },
      {
        title: 'State Park Visitor Special',
        discount: 'Save $15',
        description: 'Show park pass for discount',
      },
      {
        title: 'Community Donation Bonus',
        discount: 'Extra $10 Off',
        description: 'When items donated locally',
      },
    ],
    stories: [
      {
        title: 'Historic Inn Renovation',
        description:
          'Our bed & breakfast needed careful cleanout during restoration. Uncle Sam worked around our guests and protected all original architectural details.',
        author: 'Caroline M.',
        location: 'Historic District',
      },
      {
        title: 'State Park Cabin Cleanout',
        description:
          'Family cabin near Harmonie State Park had years of accumulated items. They sorted everything and donated usable items to local families.',
        author: 'David R.',
        location: 'Near State Park',
      },
      {
        title: 'Atheneum Event Prep',
        description:
          "Needed quick space clearing for our community event. Professional service that respected our historic venue's requirements.",
        author: 'New Harmony Events',
        location: 'Historic Center',
      },
    ],
    serviceGuarantee: {
      title: 'Historic Preservation Guarantee',
      description:
        'We guarantee no damage to historic features and will coordinate with preservation requirements for registered properties.',
    },
    disposalNote:
      'We follow local disposal rules and support preservation efforts in New Harmony while coordinating with Posey County guidelines.',
  },

  boonville: {
    locationName: 'Boonville',
    state: 'Indiana',
    tagline:
      'Reliable junk removal for Boonville and rural Warrick County with specialized farm and large property service',
    theme: 'primary',
    driveTime: '25-minute drive from Evansville',
    neighborhoods: [
      'Downtown Boonville',
      'Scales Lake Area',
      'Yankeetown',
      'Elberfeld',
      'Tennyson',
    ],
    features: [
      {
        icon: Clock,
        title: 'Rural Property Specialist',
        description:
          '25-minute drive from Evansville with regular service to Boonville and expertise in large rural property cleanouts.',
      },
      {
        icon: Truck,
        title: 'Farm Equipment Experience',
        description:
          'Experienced with larger rural properties, farm equipment removal, and agricultural cleanout projects throughout Warrick County.',
      },
      {
        icon: Recycle,
        title: 'County Compliant Disposal',
        description:
          'Following all Warrick County disposal and recycling guidelines with proper handling of agricultural and rural waste.',
      },
      {
        icon: MapPin,
        title: 'Warrick County Coverage',
        description:
          'Comprehensive coverage throughout Warrick County with no hidden travel fees for rural properties.',
      },
    ],
    landmarks: [
      'Historic Downtown Boonville',
      'Warrick County Courthouse',
      'Boonville High School',
      'Scales Lake Park',
      'Warrick County Museum',
      'Boonville Country Club',
      'Yankeetown Nature Preserve',
      'Ohio River Access',
    ],
    offers: [
      {
        title: 'Rural Property Discount',
        discount: 'Save $50',
        description: 'For properties over 2 acres in Warrick County',
      },
      {
        title: 'Farm Equipment Removal',
        discount: 'Specialized Service',
        description: 'Expert handling of agricultural items',
      },
      {
        title: 'Multi-Building Special',
        discount: 'Save $25',
        description: 'When cleaning multiple outbuildings',
      },
    ],
    stories: [
      {
        title: 'Century Farm Cleanout',
        description:
          'Our family farm had generations of equipment and materials in multiple buildings. Uncle Sam handled everything efficiently and recycled tons of metal properly.',
        author: 'Robert S.',
        location: 'Rural Warrick County',
      },
      {
        title: 'Courthouse Square Business',
        description:
          "Renovating our historic downtown storefront required careful debris removal. Professional service that respected our building's character.",
        author: 'Linda B.',
        location: 'Downtown Boonville',
      },
      {
        title: 'Lake Property Cleanup',
        description:
          'Our Scales Lake property needed major cleanout after storm damage. They sorted everything and donated usable items to local charities.',
        author: 'Michael W.',
        location: 'Scales Lake Area',
      },
    ],
    serviceGuarantee: {
      title: 'Rural Service Guarantee',
      description:
        'We guarantee same professional service to rural properties with no hidden fees for distance or difficult access.',
    },
    disposalNote:
      'We specialize in rural property cleanouts, farm equipment removal, and large-scale projects throughout Warrick County.',
  },

  'henderson-ky': {
    locationName: 'Henderson',
    state: 'Kentucky',
    tagline:
      'Cross-state professional junk removal from Indiana to Henderson, KY with licensed Kentucky service',
    theme: 'primary',
    neighborhoods: [
      'Downtown Henderson',
      'North Henderson',
      'East Henderson',
      'Geneva',
      'Alves',
      'Five Points Area',
    ],
    features: [
      {
        icon: Clock,
        title: 'Kentucky Licensed Service',
        description:
          'Licensed to operate in Kentucky with cross-state expertise - just across the river from our Evansville base.',
      },
      {
        icon: Truck,
        title: 'Henderson County Compliant',
        description:
          'Following all Henderson County disposal regulations and working with local Kentucky waste management facilities.',
      },
      {
        icon: Recycle,
        title: 'Cross-State Recycling',
        description:
          'Coordinating recycling between Indiana and Kentucky facilities to ensure maximum environmental benefit.',
      },
      {
        icon: MapPin,
        title: 'River City Connection',
        description:
          'Regular service across the Ohio River with optimized routes for efficient Henderson County coverage.',
      },
    ],
    landmarks: [
      'Downtown Henderson',
      'Henderson Community College',
      'Audubon State Park',
      'Central Park',
      'Henderson County Courthouse',
      'John James Audubon Museum',
      'Ellis Park Racing',
      'Henderson Riverfront',
    ],
    offers: [
      {
        title: 'Kentucky Resident Special',
        discount: 'Save $30',
        description: 'Cross-state service discount',
      },
      {
        title: 'Riverfront Property',
        discount: 'No Travel Fees',
        description: 'Service to waterfront properties',
      },
      {
        title: 'Audubon Park Discount',
        discount: '10% Off',
        description: 'Near state park properties',
      },
    ],
    stories: [
      {
        title: 'Ellis Park Event Cleanup',
        description:
          'After our racing season event, we needed quick cleanup of hospitality areas. Uncle Sam coordinated across state lines seamlessly.',
        author: 'Track Management',
        location: 'Ellis Park',
      },
      {
        title: 'Henderson Riverfront Home',
        description:
          'Our Ohio River home renovation generated lots of debris. Professional cross-state service with proper Kentucky disposal.',
        author: 'Susan L.',
        location: 'Riverfront District',
      },
      {
        title: 'HCC Campus Project',
        description:
          'College renovation project needed reliable cleanout service. They handled our timeline and recycled everything possible.',
        author: 'Facilities Team',
        location: 'Henderson Community College',
      },
    ],
    serviceGuarantee: {
      title: 'Cross-State Service Guarantee',
      description:
        'We guarantee the same professional service standards across state lines with full Kentucky licensing and compliance.',
    },
    disposalNote:
      'Licensed to operate in Kentucky - following all Henderson County disposal regulations and coordinating with local waste management.',
  },

  'mount-carmel-il': {
    locationName: 'Mount Carmel',
    state: 'Illinois',
    tagline:
      'Illinois junk removal service with Wabash Valley expertise and agricultural property specialization',
    theme: 'primary',
    neighborhoods: [
      'Downtown Mount Carmel',
      'Grayville',
      'Keensburg',
      'Carmi Area',
      'Norris City',
    ],
    features: [
      {
        icon: Clock,
        title: 'Wabash Valley Service',
        description:
          'Regular cross-state service to Mount Carmel with scheduling that accommodates Illinois disposal requirements.',
      },
      {
        icon: Truck,
        title: 'Agricultural Property Expertise',
        description:
          'Experience with farm properties and agricultural equipment throughout the Wabash Valley region.',
      },
      {
        icon: Recycle,
        title: 'Illinois Compliant Disposal',
        description:
          'Following Illinois disposal regulations with coordination between Indiana and Illinois recycling facilities.',
      },
      {
        icon: MapPin,
        title: 'Wabash County Coverage',
        description:
          'Serving Wabash County, Illinois with knowledge of local access routes and regulations.',
      },
    ],
    landmarks: [
      'Wabash River',
      'Wabash Valley College',
      'Mount Carmel City Park',
      'Downtown Mount Carmel',
      'Wabash River Bridge',
      'Illinois Oil Field Museum',
      'Beall Woods State Park',
      'Historic Downtown District',
    ],
    offers: [
      {
        title: 'Illinois Cross-State',
        discount: 'Save $25',
        description: 'Regular service discount for Illinois',
      },
      {
        title: 'Wabash Valley Special',
        discount: 'No Travel Fees',
        description: 'Regular route properties',
      },
      {
        title: 'Agricultural Discount',
        discount: 'Save $40',
        description: 'Farm and agricultural properties',
      },
    ],
    stories: [
      {
        title: 'Wabash Valley Farm',
        description:
          'Our family farm operation needed cleanout of multiple buildings. Uncle Sam handled cross-state service professionally and recycled all metal properly.',
        author: 'Tom F.',
        location: 'Rural Wabash County',
      },
      {
        title: 'Downtown Business Renovation',
        description:
          'Historic building renovation required careful debris removal. Professional service that worked with our Illinois contractors.',
        author: 'City Hardware',
        location: 'Downtown Mount Carmel',
      },
      {
        title: 'College Housing Project',
        description:
          'Wabash Valley College housing cleanout needed quick, reliable service. They coordinated with our schedule perfectly.',
        author: 'Campus Housing',
        location: 'Near WVC',
      },
    ],
    serviceGuarantee: {
      title: 'Cross-State Reliability',
      description:
        'We guarantee reliable cross-state service with full Illinois compliance and no surprise fees for distance.',
    },
    disposalNote:
      'Licensed for Illinois service - following all Wabash County regulations with coordination between state recycling facilities.',
  },

  'mount-vernon-in': {
    locationName: 'Mount Vernon',
    state: 'Indiana',
    tagline:
      'Posey County junk removal headquarters with local expertise and comprehensive rural service',
    theme: 'primary',
    neighborhoods: [
      'Downtown Mount Vernon',
      'Poseyville',
      'Griffin',
      'Wadesville',
      'Hovey Lake Area',
    ],
    features: [
      {
        icon: Clock,
        title: 'Posey County Hub',
        description:
          'Central location for Posey County service with same-day availability and knowledge of all local routes.',
      },
      {
        icon: Truck,
        title: 'Rural and Riverfront Specialist',
        description:
          'Experience with rural properties and Ohio River access challenges throughout Posey County.',
      },
      {
        icon: Recycle,
        title: 'County Seat Service',
        description:
          'Working with Posey County officials for proper disposal and supporting local environmental initiatives.',
      },
      {
        icon: MapPin,
        title: 'Hovey Lake Area Expert',
        description:
          'Regular service to waterfront and recreational properties around Hovey Lake and the Ohio River.',
      },
    ],
    landmarks: [
      'Posey County Courthouse',
      'Hovey Lake',
      'Mount Vernon Riverfront',
      'Alex Karras Park',
      'Ohio River Access',
      'Historic Downtown',
      'Posey County Airport',
      'Riverfront Park',
    ],
    offers: [
      {
        title: 'County Seat Discount',
        discount: 'Save $20',
        description: 'Central Posey County properties',
      },
      {
        title: 'Hovey Lake Special',
        discount: 'No Access Fees',
        description: 'Recreational property service',
      },
      {
        title: 'Riverfront Property',
        discount: 'Save $15',
        description: 'Ohio River properties',
      },
    ],
    stories: [
      {
        title: 'Hovey Lake Cabin',
        description:
          'Our family lake cabin needed major cleanout after decades of use. Uncle Sam handled access challenges and recycled everything possible.',
        author: 'Jennifer P.',
        location: 'Hovey Lake',
      },
      {
        title: 'Courthouse Square Business',
        description:
          'Renovating our historic downtown office space required careful removal of old fixtures. Professional service in tight quarters.',
        author: 'Law Office',
        location: 'Downtown Mount Vernon',
      },
      {
        title: 'Riverfront Home Project',
        description:
          'Flood damage cleanup needed quick response. They sorted damaged items and helped us reclaim our Ohio River home.',
        author: 'Mark D.',
        location: 'Riverfront',
      },
    ],
    serviceGuarantee: {
      title: 'Posey County Promise',
      description:
        'As your county seat service provider, we guarantee prompt response and community-focused service.',
    },
    disposalNote:
      'Working with Posey County officials for proper disposal coordination and supporting local environmental initiatives.',
  },

  'owensboro-ky': {
    locationName: 'Owensboro',
    state: 'Kentucky',
    tagline:
      'Western Kentucky junk removal with Daviess County expertise and cross-state professional service',
    theme: 'primary',
    neighborhoods: [
      'Downtown Owensboro',
      'South Owensboro',
      'East Owensboro',
      'Hillcrest',
      'Deer Valley',
      'Audubon Area',
    ],
    features: [
      {
        icon: Clock,
        title: 'Daviess County Service',
        description:
          'Regular service to Owensboro and Daviess County with advance scheduling for optimal efficiency.',
      },
      {
        icon: Truck,
        title: 'Kentucky Licensed Professional',
        description:
          'Licensed Kentucky operation with experience in Western Kentucky disposal requirements and regulations.',
      },
      {
        icon: Recycle,
        title: 'Regional Recycling Network',
        description:
          'Coordinating with Western Kentucky recycling facilities and regional waste management systems.',
      },
      {
        icon: MapPin,
        title: 'Ohio River Valley Expert',
        description:
          'Serving the greater Owensboro area with knowledge of regional access and disposal options.',
      },
    ],
    landmarks: [
      'Downtown Owensboro',
      'Owensboro Community College',
      'Smothers Park',
      'Ohio River Waterfront',
      'Western Kentucky Botanical Garden',
      'Owensboro Museum of Fine Art',
      'Daviess County Courthouse',
      'Bluegrass Music Hall of Fame',
    ],
    offers: [
      {
        title: 'Daviess County Special',
        discount: 'Save $35',
        description: 'Regular Western Kentucky service',
      },
      {
        title: 'Waterfront Property',
        discount: 'No Travel Fees',
        description: 'Ohio River properties',
      },
      {
        title: 'Advance Booking Discount',
        discount: 'Save $20',
        description: 'Schedule 2+ days ahead',
      },
    ],
    stories: [
      {
        title: 'Smothers Park Event',
        description:
          'Community festival cleanup required quick response after our riverfront event. Professional service that kept our timeline.',
        author: 'Event Committee',
        location: 'Smothers Park',
      },
      {
        title: 'Victorian District Home',
        description:
          'Renovating our historic Owensboro home generated careful removal needs. They protected original features throughout.',
        author: 'Elizabeth R.',
        location: 'Historic District',
      },
      {
        title: 'OCC Campus Project',
        description:
          'College renovation needed reliable cleanout service. Cross-state coordination worked perfectly for our project.',
        author: 'Facilities Management',
        location: 'Owensboro Community College',
      },
    ],
    serviceGuarantee: {
      title: 'Western Kentucky Commitment',
      description:
        'We guarantee professional Western Kentucky service with advance scheduling and no surprise distance fees.',
    },
    disposalNote:
      'Licensed Kentucky service for Daviess County with coordination to regional waste management and recycling facilities.',
  },

  princeton: {
    locationName: 'Princeton',
    state: 'Indiana',
    tagline:
      'Gibson County junk removal with rural expertise and agricultural property specialization',
    theme: 'primary',
    neighborhoods: [
      'Downtown Princeton',
      'Oakland City',
      'Haubstadt',
      'Fort Branch',
      'Patoka',
    ],
    features: [
      {
        icon: Clock,
        title: 'Gibson County Hub',
        description:
          'Regular service to Princeton and Gibson County with same-day availability for urgent agricultural and residential needs.',
      },
      {
        icon: Truck,
        title: 'Agricultural Specialist',
        description:
          'Experience with farm properties, agricultural equipment, and rural property challenges throughout Gibson County.',
      },
      {
        icon: Recycle,
        title: 'County Compliant Service',
        description:
          'Following Gibson County disposal guidelines with focus on agricultural waste and rural property recycling.',
      },
      {
        icon: MapPin,
        title: 'Rural Route Expert',
        description:
          'Knowledge of rural Gibson County roads and access challenges for efficient service delivery.',
      },
    ],
    landmarks: [
      'Gibson County Courthouse',
      'Princeton Community Park',
      'Toyota Manufacturing',
      'Downtown Princeton',
      'Gibson County Airport',
      'Patoka River Access',
      'Princeton City Park',
      'Historic Town Square',
    ],
    offers: [
      {
        title: 'Gibson County Discount',
        discount: 'Save $25',
        description: 'Local county residents',
      },
      {
        title: 'Agricultural Property',
        discount: 'Save $45',
        description: 'Farm and rural properties',
      },
      {
        title: 'Toyota Employee Special',
        discount: '10% Off',
        description: 'Show employee ID for discount',
      },
    ],
    stories: [
      {
        title: 'Gibson County Farm',
        description:
          'Multi-generational farm needed cleanout of equipment sheds and outbuildings. Professional service that understood agricultural needs.',
        author: 'Miller Family Farm',
        location: 'Rural Gibson County',
      },
      {
        title: 'Princeton Downtown Renovation',
        description:
          'Historic courthouse square building renovation required careful debris removal. Respected our timeline and building character.',
        author: 'Main Street Business',
        location: 'Downtown Princeton',
      },
      {
        title: 'Toyota Area Residential',
        description:
          'New home construction cleanup needed quick service. Professional team that worked around our schedule.',
        author: 'New Residents',
        location: 'Near Toyota Plant',
      },
    ],
    serviceGuarantee: {
      title: 'Gibson County Reliability',
      description:
        'We guarantee reliable Gibson County service with agricultural expertise and no hidden fees for rural access.',
    },
    disposalNote:
      'Experience with Gibson County regulations and agricultural property requirements throughout the rural service area.',
  },
}
