import type { Metadata } from 'next'
import Script from 'next/script'
import { Button, PhoneButton } from '@/components/ui/button'
import {
  Star,
  Shield,
  Truck,
  Users,
  Award,
  Clock,
  MapPin,
  Leaf,
  Recycle,
  Phone,
  CheckCircle,
  Sparkles,
} from 'lucide-react'
import { settings } from '@/lib/cms-content'
import { QuoteCtaLink } from '@/components/quote-cta-link'
import { buildCanonicalMetadata } from '@/components/canonical'
import { Box, Container, Flex, Grid, Section, Text, Heading, Badge as RadixBadge } from '@radix-ui/themes'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'

export const metadata: Metadata = {
  title: 'About Uncle Sam Junk Removal | Local Junk Removal & Cleaning Services',
  description:
    'Veteran-owned junk removal & cleaning in Evansville, IN. Licensed, insured, eco-friendly. Serving Southern Indiana & Kentucky tri-state area.',
  keywords:
    'evansville junk removal, trash removal evansville, junk removal henderson ky, newburgh in junk removal, owensboro junk hauling, veteran owned junk removal evansville, women owned cleaning evansville, karcher cleaners, haul away service, get rid of junk, remove old furniture',
  robots: 'index, follow',
  ...buildCanonicalMetadata('/about', baseUrl),
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* SEO: LocalBusiness JSON-LD */}
      <Script id="jsonld-localbusiness" type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: 'Uncle Sam Junk Removal',
          url: 'https://unclesamjunkremoval.com',
          telephone: settings.phoneE164,
          description:
            'Veteran-owned junk removal in Evansville, IN. Professional cleaning by women-owned Karcher Cleaners.',
          foundingDate: '2025',
          founder: {
            '@type': 'Person',
            name: 'Samuel Kinyanjui',
          },
          areaServed: settings.serviceAreas,
          sameAs: Object.values(settings.socialMedia || {}),
          knowsAbout: [
            'junk removal',
            'appliance removal',
            'estate cleanouts',
            'yard waste removal',
            'trash removal',
            'residential cleaning',
            'commercial cleaning',
            'storage unit cleanouts',
            'office cleanouts',
            'restaurant equipment removal',
            'property management turnovers',
            'warehouse fixture removal',
            'holiday tree removal',
            'storm debris cleanup',
          ],
        })}
      </Script>

      {/* Hero Section - Linear.app inspired */}
      <section className="relative border-b border-border bg-card">
        <Container className="mx-auto max-w-7xl px-4 py-20 md:py-28">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 flex justify-center gap-2">
              <RadixBadge size="2" variant="soft" color="blue">
                <Shield className="mr-1 h-3 w-3" />
                Veteran-Owned
              </RadixBadge>
              <RadixBadge size="2" variant="soft" color="purple">
                <Sparkles className="mr-1 h-3 w-3" />
                Woman-Owned Partner
              </RadixBadge>
            </div>
            <Heading size="9" className="mb-6 text-foreground">
              About Uncle Sam Junk Removal
            </Heading>
            <Text size="5" className="text-muted-foreground leading-relaxed">
              Veteran-owned junk removal and professional cleaning serving Evansville, IN and the
              Tri-State with integrity, reliability, and excellence.
            </Text>
          </div>
        </Container>
      </section>

      {/* Our Story - Supabase inspired two-column */}
      <section className="border-b border-border py-20">
        <Container className="mx-auto max-w-7xl px-4">
          <Grid columns={{ initial: '1', md: '2' }} gap="9" align="center">
            <Box>
              <Heading size="8" className="mb-6 text-foreground">
                Our Story
              </Heading>
              <div className="text-muted-foreground space-y-6 text-[15px] leading-relaxed">
                <p>
                  Founded in 2025 by <strong className="text-foreground">Samuel Kinyanjui</strong> — a
                  United States Marine Corps veteran — Uncle Sam Junk Removal serves{' '}
                  <strong className="text-foreground">Evansville, IN</strong> and the Tri-State with
                  dependable, same-day junk removal and light demolition support. We built this company
                  on Marine Corps values: integrity, respect, and service.
                </p>
                <p>
                  Our professional cleaning services are provided by{' '}
                  <a
                    href="https://www.karchercleaners.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline underline-offset-2 transition-all"
                  >
                    <strong>Karcher Cleaners</strong>
                  </a>{' '}
                  — a women-owned company led by{' '}
                  <strong className="text-foreground">Chelsey Karcher</strong>. Together, we deliver
                  spotless homes and businesses with eco-conscious products and consistent, high-quality
                  results.
                </p>
                <p>
                  Whether you need a single item picked up, a full estate cleanout, or recurring office
                  cleaning, we make it easy with clear communication, honest pricing, and friendly, local
                  professionals.
                </p>
              </div>
            </Box>
            <Box className="linear-card p-8">
              <Grid columns="2" gap="4">
                <Box className="rounded-lg bg-muted/30 p-6 text-center">
                  <div className="mb-2 text-4xl font-bold text-foreground">2025</div>
                  <div className="text-sm text-muted-foreground">Founded</div>
                </Box>
                <Box className="rounded-lg bg-muted/30 p-6 text-center">
                  <div className="mb-2 text-4xl font-bold text-foreground">500+</div>
                  <div className="text-sm text-muted-foreground">Satisfied Clients</div>
                </Box>
                <Box className="rounded-lg bg-muted/30 p-6 text-center">
                  <div className="mb-2 text-4xl font-bold text-foreground">9</div>
                  <div className="text-sm text-muted-foreground">Service Areas</div>
                </Box>
                <Box className="rounded-lg bg-muted/30 p-6 text-center">
                  <div className="mb-2 text-4xl font-bold text-foreground">4.9</div>
                  <div className="text-sm text-muted-foreground">Average Rating</div>
                </Box>
              </Grid>
            </Box>
          </Grid>
        </Container>
      </section>

      {/* Service Areas */}
      <section className="border-b border-border bg-muted/30 py-20">
        <Container className="mx-auto max-w-7xl px-4">
          <Grid columns={{ initial: '1', md: '2' }} gap="9">
            <Box>
              <Heading size="8" className="mb-6 text-foreground">
                Proudly Serving Evansville & The Tri-State
              </Heading>
              <Text size="4" className="text-muted-foreground mb-6 leading-relaxed">
                We're based in Evansville and serve nearby communities across Southern Indiana and
                Western Kentucky. Expect on-time arrivals, friendly crews, and efficient service—every
                time.
              </Text>
              <Grid columns="2" gap="3">
                {settings.serviceAreas.map(area => (
                  <Flex key={area} align="center" gap="2">
                    <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                    <Text size="3" className="text-muted-foreground">
                      {area}
                    </Text>
                  </Flex>
                ))}
              </Grid>
            </Box>
            <Box className="linear-card p-8">
              <Heading size="6" className="mb-6 text-foreground">
                What We Do
              </Heading>
              <Grid columns="1" gap="4">
                <Flex align="start" gap="3">
                  <Truck className="mt-1 h-5 w-5 text-primary flex-shrink-0" />
                  <Text size="3" className="text-muted-foreground">
                    Full-service junk removal & curbside pick-ups
                  </Text>
                </Flex>
                <Flex align="start" gap="3">
                  <Shield className="mt-1 h-5 w-5 text-primary flex-shrink-0" />
                  <Text size="3" className="text-muted-foreground">
                    Light demolition, shed, and deck tear-downs
                  </Text>
                </Flex>
                <Flex align="start" gap="3">
                  <Users className="mt-1 h-5 w-5 text-primary flex-shrink-0" />
                  <Text size="3" className="text-muted-foreground">
                    Estate, garage, attic, and hoarding cleanouts
                  </Text>
                </Flex>
                <Flex align="start" gap="3">
                  <Truck className="mt-1 h-5 w-5 text-primary flex-shrink-0" />
                  <Text size="3" className="text-muted-foreground">
                    Commercial, office, and rental turnovers
                  </Text>
                </Flex>
                <Flex align="start" gap="3">
                  <Recycle className="mt-1 h-5 w-5 text-emerald-600 flex-shrink-0" />
                  <Text size="3" className="text-muted-foreground">
                    Appliance, mattress, and furniture recycling
                  </Text>
                </Flex>
                <Flex align="start" gap="3">
                  <Leaf className="mt-1 h-5 w-5 text-emerald-600 flex-shrink-0" />
                  <Text size="3" className="text-muted-foreground">
                    Eco-friendly residential and office cleaning
                  </Text>
                </Flex>
              </Grid>
            </Box>
          </Grid>
        </Container>
      </section>

      {/* Values - Linear cards style */}
      <section className="border-b border-border py-20">
        <Container className="mx-auto max-w-7xl px-4">
          <div className="mb-16 text-center">
            <Heading size="8" className="mb-4 text-foreground">
              Our Values
            </Heading>
            <Text size="5" className="text-muted-foreground">
              The principles that guide everything we do
            </Text>
          </div>

          <Grid columns={{ initial: '1', md: '3' }} gap="6">
            <Box className="linear-card linear-interactive p-8 text-center">
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <Shield className="h-7 w-7 text-primary" />
              </div>
              <Heading size="5" className="mb-4 text-foreground">
                Reliability
              </Heading>
              <Text size="3" className="text-muted-foreground">
                We show up on time, every time. Our customers count on us, and we never let them down.
              </Text>
            </Box>

            <Box className="linear-card linear-interactive p-8 text-center">
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-7 w-7 text-primary" />
              </div>
              <Heading size="5" className="mb-4 text-foreground">
                Community
              </Heading>
              <Text size="3" className="text-muted-foreground">
                We're your neighbors. Supporting local families and businesses is at the heart of what
                we do.
              </Text>
            </Box>

            <Box className="linear-card linear-interactive p-8 text-center">
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <Award className="h-7 w-7 text-primary" />
              </div>
              <Heading size="5" className="mb-4 text-foreground">
                Excellence
              </Heading>
              <Text size="3" className="text-muted-foreground">
                From our first interaction to job completion, we strive for excellence in every detail.
              </Text>
            </Box>
          </Grid>
        </Container>
      </section>

      {/* Why Choose Us */}
      <section className="border-b border-border bg-muted/30 py-20">
        <Container className="mx-auto max-w-7xl px-4">
          <div className="mb-16 text-center">
            <Heading size="8" className="mb-4 text-foreground">
              Why Choose Uncle Sam Junk Removal?
            </Heading>
          </div>

          <Grid columns={{ initial: '1', sm: '2', lg: '4' }} gap="6">
            <Box className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary">
                <Shield className="h-8 w-8 text-primary-foreground" />
              </div>
              <Heading size="4" className="mb-2 text-foreground">
                Licensed & Insured
              </Heading>
              <Text size="2" className="text-muted-foreground">
                Full liability insurance and proper licensing for your peace of mind
              </Text>
            </Box>

            <Box className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary">
                <Clock className="h-8 w-8 text-primary-foreground" />
              </div>
              <Heading size="4" className="mb-2 text-foreground">
                Same-Day Service
              </Heading>
              <Text size="2" className="text-muted-foreground">
                Available 7 days a week for urgent junk removal needs
              </Text>
            </Box>

            <Box className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600">
                <Leaf className="h-8 w-8 text-white" />
              </div>
              <Heading size="4" className="mb-2 text-foreground">
                Eco-Friendly
              </Heading>
              <Text size="2" className="text-muted-foreground">
                We donate, recycle, and dispose responsibly whenever possible
              </Text>
            </Box>

            <Box className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-500">
                <Star className="h-8 w-8 text-white fill-current" />
              </div>
              <Heading size="4" className="mb-2 text-foreground">
                5-Star Service
              </Heading>
              <Text size="2" className="text-muted-foreground">
                Consistently rated 4.9/5 stars by our satisfied customers
              </Text>
            </Box>
          </Grid>
        </Container>
      </section>

      {/* Team - Clean Supabase-style cards */}
      <section className="border-b border-border py-20">
        <Container className="mx-auto max-w-7xl px-4">
          <div className="mb-16 text-center">
            <Heading size="8" className="mb-4 text-foreground">
              Meet Our Team
            </Heading>
            <Text size="5" className="text-muted-foreground">
              The dedicated professionals who make it all happen
            </Text>
          </div>

          <Grid columns={{ initial: '1', md: '3' }} gap="6">
            <Box className="linear-card p-8 text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-3xl font-bold text-primary">
                SK
              </div>
              <Heading size="5" className="mb-2 text-foreground">
                Samuel Kinyanjui
              </Heading>
              <Text size="3" className="mb-3 font-medium text-primary">
                Founder & Owner
              </Text>
              <Text size="2" className="text-muted-foreground">
                United States Marine Corps veteran and founder of Uncle Sam Junk Removal. Samuel leads
                with integrity and a commitment to reliable, professional service.
              </Text>
            </Box>

            <Box className="linear-card p-8 text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-purple-100 text-3xl font-bold text-purple-600">
                CK
              </div>
              <Heading size="5" className="mb-2 text-foreground">
                Chelsey Karcher
              </Heading>
              <Text size="3" className="mb-3 font-medium text-primary">
                Owner,{' '}
                <a
                  href="https://www.karchercleaners.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline underline-offset-2"
                >
                  Karcher Cleaners
                </a>
              </Text>
              <Text size="2" className="text-muted-foreground">
                Leads our women-owned cleaning partner, delivering professional cleaning services with
                exceptional attention to detail.
              </Text>
            </Box>

            <Box className="linear-card p-8 text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
                <Users className="h-10 w-10 text-emerald-600" />
              </div>
              <Heading size="5" className="mb-2 text-foreground">
                Our Local Team
              </Heading>
              <Text size="3" className="mb-3 font-medium text-primary">
                Operations
              </Text>
              <Text size="2" className="text-muted-foreground">
                Friendly professionals serving Evansville and surrounding areas with efficient,
                respectful service.
              </Text>
            </Box>
          </Grid>
        </Container>
      </section>

      {/* CTA Section - Linear gradient style */}
      <section className="relative overflow-hidden bg-foreground py-20 text-background">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
        <Container className="relative mx-auto max-w-4xl px-4 text-center">
          <Heading size="8" className="mb-6">
            Ready to Experience the Uncle Sam Difference?
          </Heading>
          <Text size="5" className="text-background/80 mb-8">
            Join thousands of satisfied customers who trust Uncle Sam Junk Removal for their junk
            removal and cleaning needs.
          </Text>
          <Flex justify="center" gap="3" wrap="wrap">
            <PhoneButton
              href={`tel:${settings.phoneE164}`}
              className="bg-background text-foreground hover:bg-background/90"
            >
              <Phone className="h-4 w-4" /> Call {settings.phone}
            </PhoneButton>
            <Button
              asChild
              className="bg-primary text-primary-foreground hover:brightness-110"
            >
              <QuoteCtaLink location="about-page-cta" label="Get Free Quote">
                Get Free Quote
              </QuoteCtaLink>
            </Button>
          </Flex>
        </Container>
      </section>
    </div>
  )
}
