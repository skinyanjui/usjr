import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, User, ArrowRight, Leaf, Sparkles } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { settings } from '@/lib/cms-content'
import { PageHero } from '@/components/ui/page-hero'
import { buildCanonicalMetadata } from '@/components/canonical'
import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'

export const metadata: Metadata = {
  title: 'Cleaning & Junk Removal Blog | Tips & Guides | Uncle Sam Junk Removal',
  description:
    'Expert cleaning tips, junk removal guides, and home improvement advice for Evansville homeowners. Natural cleaning solutions and professional insights.',
  keywords:
    'cleaning tips, junk removal guides, natural cleaning, Evansville home improvement, eco-friendly cleaning, decluttering advice',
  openGraph: {
    title: 'Cleaning & Junk Removal Blog | Uncle Sam Junk Removal',
    description:
      'Expert cleaning tips, junk removal guides, and home improvement advice for Evansville homeowners.',
    url: `${baseUrl}/blog`,
    siteName: 'Uncle Sam Junk Removal',
    type: 'website',
    images: [
      {
        url: `${baseUrl}/spring-cleaning-natural.png`,
        width: 1200,
        height: 630,
        alt: 'Uncle Sam Junk Removal Blog - Cleaning & Junk Removal Tips',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cleaning & Junk Removal Blog | Uncle Sam Junk Removal',
    description:
      'Expert cleaning tips, junk removal guides, and home improvement advice for Evansville homeowners.',
    images: [`${baseUrl}/spring-cleaning-natural.png`],
  },
  ...buildCanonicalMetadata('/blog', baseUrl),
}

export default function BlogPage() {
  const blogPosts = [
    {
      slug: 'spring-cleaning-checklist-southern-indiana',
      title: 'Ultimate Spring Cleaning Checklist for Southern Indiana Homes',
      excerpt:
        'Complete spring cleaning guide for Southern Indiana residents. Room-by-room checklist, eco-friendly tips, and professional cleaning services.',
      author: 'Sarah Johnson, Cleaning Specialist',
      date: 'March 1, 2024',
      readTime: '12 min read',
      category: 'Spring Cleaning',
      image: '/spring-cleaning-natural.png',
      featured: true,
    },
    {
      slug: 'appliance-disposal-recycling-guide',
      title: 'Appliance Disposal & Recycling Guide for Evansville Residents',
      excerpt:
        'Learn how to properly dispose of old appliances in Evansville, IN. Recycling options, environmental benefits, and professional removal services.',
      author: 'Mike Thompson, Environmental Specialist',
      date: 'November 20, 2024',
      readTime: '10 min read',
      category: 'Appliance Disposal',
      image: '/appliance-removal-evansville.png',
      featured: true,
    },
    {
      slug: 'junk-removal-cost-tri-state',
      title: 'How much does junk removal cost in the Tri-State? (full breakdown)',
      excerpt:
        'Complete pricing guide for junk removal services in Evansville, Henderson, and surrounding areas. Learn what factors affect cost and how to get the best value.',
      author: 'Uncle Sam Team',
      date: 'January 15, 2025',
      readTime: '8 min read',
      category: 'Pricing Guide',
      image: '/junk-removal-pricing.png',
    },
    {
      slug: 'evansville-garage-cleanout-48-hours',
      title: 'Evansville garage cleanout in 48 hours: checklist & timeline',
      excerpt:
        'Step-by-step guide to completely clean out your garage in just 48 hours. Includes sorting strategies, disposal options, and organization tips for Evansville residents.',
      author: 'Uncle Sam Team',
      date: 'January 12, 2025',
      readTime: '6 min read',
      category: 'How-To Guide',
      image: '/organized-garage-cleanout.png',
    },
    {
      slug: 'hot-tub-removal-what-to-know',
      title: 'Hot tub removal: what to know before we arrive',
      excerpt:
        'Essential preparation steps for hot tub removal including electrical disconnection, access requirements, and disposal options. Make your hot tub removal smooth and safe.',
      author: 'Uncle Sam Team',
      date: 'January 8, 2025',
      readTime: '5 min read',
      category: 'Service Guide',
      image: '/hot-tub-removal-checklist.png',
    },
    {
      slug: 'property-manager-turnover-playbook',
      title: 'Property manager turnover playbook: trash-out to broom clean',
      excerpt:
        'Complete guide for property managers handling tenant turnovers. From initial assessment to final cleanup, streamline your process and reduce vacancy time.',
      author: 'Uncle Sam Team',
      date: 'January 6, 2025',
      readTime: '10 min read',
      category: 'Property Management',
      image: '/rental-turnover-cleanup.png',
    },
    // New posts
    {
      slug: 'evansville-junk-removal-tips',
      title: 'Essential Junk Removal Tips for Evansville Residents',
      excerpt:
        'Local expert tips for efficient, cost-effective junk removal in Evansville, IN. From preparation to disposal, make your cleanout a success.',
      author: 'Uncle Sam Team',
      date: 'January 28, 2025',
      readTime: '8 min read',
      category: 'Local Guide',
      image: '/junk-removal-evansville.png',
      featured: true,
    },
    {
      slug: 'mattress-disposal-evansville',
      title: 'Mattress disposal in Evansville: recycling, costs, and pickup options',
      excerpt:
        'What to do with an old mattress in Evansville. Recycling programs, professional pickup, and cost ranges to expect.',
      author: 'Uncle Sam Team',
      date: 'January 20, 2025',
      readTime: '6 min read',
      category: 'Mattress Removal',
      image: '/mattress-removal-evansville.png',
    },
    {
      slug: 'shed-removal-guide-evansville',
      title: 'Shed removal in Evansville: permit tips, pricing, and timeline',
      excerpt:
        "From permits to pricing, here's how to plan a smooth shed removal in Evansville, including timeline expectations.",
      author: 'Uncle Sam Team',
      date: 'January 22, 2025',
      readTime: '7 min read',
      category: 'Light Demolition',
      image: '/shed-removal-evansville.png',
    },
    {
      slug: 'estate-cleanout-guide',
      title: 'Estate cleanout guide: compassionate planning and donation options',
      excerpt:
        'A step-by-step guide to planning an estate cleanout with sensitivity, including donation and recycling strategies.',
      author: 'Uncle Sam Team',
      date: 'January 24, 2025',
      readTime: '9 min read',
      category: 'Estate Cleanouts',
      image: '/estate-cleanout-evansville.png',
    },
    {
      slug: 'yard-waste-disposal-evansville',
      title: 'Yard waste disposal in Evansville: composting and pickup basics',
      excerpt:
        'Brush, leaves, and limbs: the simplest, most eco-friendly ways to handle yard waste in Evansville.',
      author: 'Uncle Sam Team',
      date: 'January 26, 2025',
      readTime: '6 min read',
      category: 'Yard Waste',
      image: '/yard-waste-removal-evansville.png',
    },
  ]

  const featuredPosts = blogPosts.filter(post => post.featured).slice(0, 1)
  const regularPosts = blogPosts.filter(post => !post.featured)

  // Structured data for the blog page
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Uncle Sam Junk Removal Blog',
    description:
      'Expert cleaning tips, junk removal guides, and home improvement advice for Evansville homeowners.',
    url: `${baseUrl}/blog`,
    publisher: {
      '@type': 'Organization',
      name: 'Uncle Sam Junk Removal',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/icon-512.png`,
      },
    },
    mainEntity: blogPosts.slice(0, 5).map(post => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      url: `${baseUrl}/blog/${post.slug}`,
      datePublished: new Date(post.date).toISOString(),
      author: {
        '@type': 'Person',
        name: post.author,
      },
      image: {
        '@type': 'ImageObject',
        url: `${baseUrl}${post.image}`,
      },
    })),
  }

  return (
    <main className="min-h-screen">
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <PageHero
        title="Cleaning & Junk Removal Blog"
        description="Expert tips, guides, and professional insights for Evansville homeowners"
        align="center"
      />
      <section className="bg-gradient-to-b from-gray-50 to-white pt-16 pb-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <div className="mb-4 flex justify-center gap-2">
              <Badge className="border-green-200 bg-green-100 text-green-800">
                <Leaf className="mr-1 h-3 w-3" />
                Natural Cleaning
              </Badge>
              <Badge className="border-blue-200 bg-blue-100 text-blue-800">
                <Sparkles className="mr-1 h-3 w-3" />
                Professional Tips
              </Badge>
            </div>
            {/* Remove duplicate H1 for accessibility (already provided by PageHero) */}
            <p className="mb-6 text-lg text-gray-600 sm:text-xl">
              Expert tips, guides, and insights from Uncle Sam Junk Removal's professional team
            </p>
            <p className="text-base text-gray-600 sm:text-lg">
              Natural cleaning solutions and professional advice for Evansville homeowners and
              businesses
            </p>
          </div>

          {/* Featured Posts */}
          {featuredPosts.length > 0 && (
            <div className="mb-16">
              <h2 className="mb-8 text-2xl font-bold text-gray-900">Featured Articles</h2>
              <div className="space-y-8">
                {featuredPosts.map((post, index) => (
                  <Card
                    key={post.slug}
                    className="glass overflow-hidden border-2 border-green-200 transition-all duration-300 hover:scale-105"
                  >
                    <div className="relative aspect-video overflow-hidden bg-gray-200">
                      <Image
                        src={post.image || '/placeholder.svg'}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 1200px"
                        quality={50}
                        priority={index < 1}
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-green-600 text-white">
                          <Sparkles className="mr-1 h-3 w-3" />
                          Featured
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-white/90 text-gray-800">{post.category}</Badge>
                      </div>
                    </div>

                    <CardHeader>
                      <CardTitle className="line-clamp-2 text-xl font-bold text-gray-900 transition-colors hover:text-green-600">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </CardTitle>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <p className="mb-4 line-clamp-3 text-gray-600">{post.excerpt}</p>
                      <Link href={`/blog/${post.slug}`}>
                        <Button
                          variant="outline"
                          className="group border-green-800 bg-transparent text-green-800 hover:bg-green-800 hover:text-white"
                          aria-label={`Read ${post.title}`}
                          title={`Read ${post.title}`}
                        >
                          Read: {post.title}
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Regular Posts */}
          <div className="mb-16">
            <h2 className="mb-8 text-2xl font-bold text-gray-900">All Articles</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {regularPosts.map(post => (
                <Card
                  key={post.slug}
                  className="glass overflow-hidden transition-all duration-300 hover:scale-105"
                >
                  <div className="relative aspect-video overflow-hidden bg-gray-200">
                    <Image
                      src={post.image || '/placeholder.svg'}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      quality={50}
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge
                        className={`${post.category.includes('Cleaning') ? 'bg-green-600' : 'bg-red-600'} text-white`}
                      >
                        {post.category}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="line-clamp-2 text-xl font-bold text-gray-900 transition-colors hover:text-green-600">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </CardTitle>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <p className="mb-4 line-clamp-3 text-gray-600">{post.excerpt}</p>
                    <Link href={`/blog/${post.slug}`}>
                      <Button
                        variant="outline"
                        className={`${
                          post.category.includes('Cleaning')
                            ? 'border-green-700 text-green-700 hover:bg-green-700'
                            : 'border-red-700 text-red-700 hover:bg-red-700'
                        } group bg-transparent hover:text-white`}
                        aria-label={`Read ${post.title}`}
                        title={`Read ${post.title}`}
                      >
                        Read: {post.title}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="mx-auto max-w-3xl rounded-2xl bg-gradient-to-r from-green-50 to-blue-50 p-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Need Professional Cleaning or Junk Removal?
              </h2>
              <p className="mb-6 text-gray-600">
                Our team provides expert cleaning and junk removal services throughout Evansville
                using only natural, eco-friendly products. Get your free quote today!
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Button className="bg-green-600 px-8 py-3 font-semibold text-white hover:bg-green-700">
                  📞 Call {settings.phone}
                </Button>
                <Link href="/quote">
                  <Button
                    variant="outline"
                    className="border-green-800 bg-transparent px-8 py-3 font-semibold text-green-800 hover:bg-green-800 hover:text-white"
                  >
                    Get Free Quote
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
