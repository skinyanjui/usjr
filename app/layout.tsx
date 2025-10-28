import type React from 'react'
import type { Metadata } from 'next'
import { IBM_Plex_Sans } from 'next/font/google'
import './globals.css'
import Script from 'next/script'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ScrollToTopOnRouteChange } from '@/components/scroll-to-top'
import { ThemeProvider } from '@/components/theme-provider'
import { Analytics } from '@vercel/analytics/next'
import { RoutePrefetcher } from '@/components/route-prefetcher'
import { BreadcrumbsAuto } from '@/components/breadcrumbs'
import { EmergencyBanner } from '@/components/emergency-banner'

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-ibm-plex-sans',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'

export const metadata: Metadata = {
  title: 'Uncle Sam Junk Removal - Professional Junk Removal & Cleaning in Evansville',
  description:
    'Professional junk removal, cleaning & light demolition in Evansville, IN. Same-day service, eco-friendly disposal. Serving Southern Indiana.',
  keywords:
    'junk removal, trash removal, light demolition, haul away service, Evansville Indiana, Southern Indiana, waste management, eco-friendly disposal, Vanderburgh County, get rid of junk, remove old furniture, appliance removal',
  authors: [{ name: 'Uncle Sam Junk Removal' }],
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: 'Uncle Sam Junk Removal - Professional Junk Removal & Cleaning in Evansville',
    description:
      'Locally owned in Evansville, Indiana. Professional junk removal, cleaning, and light demolition services throughout Southern Indiana.',
    type: 'website',
    url: siteUrl,
    siteName: 'Uncle Sam Junk Removal',
    images: ['/opengraph-image'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Uncle Sam Junk Removal - Professional Junk Removal & Cleaning in Evansville',
    description:
      'Locally owned in Evansville, Indiana. Professional junk removal, cleaning, and light demolition services throughout Southern Indiana.',
    images: ['/twitter-image'],
  },
  icons: {
    icon: [
      { url: '/icon.ico', type: 'image/x-icon' },
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180' }],
  },
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${ibmPlexSans.variable} antialiased`} suppressHydrationWarning>
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BD7LEP7D30"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-BD7LEP7D30');
          `}
        </Script>
        {/* Microsoft Clarity tracking code */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "tww7ojgp9h");
          `}
        </Script>
        <link rel="preconnect" href="https://analytics.ahrefs.com" />
      </head>
      <body className="font-sans">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Header />
          <EmergencyBanner />
          <BreadcrumbsAuto />
          <RoutePrefetcher />
          <ScrollToTopOnRouteChange />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
        <Analytics />
        {process.env.NEXT_PUBLIC_AHREFS_KEY ? (
          <Script
            src="https://analytics.ahrefs.com/analytics.js"
            data-key={process.env.NEXT_PUBLIC_AHREFS_KEY}
            strategy="afterInteractive"
          />
        ) : null}
      </body>
    </html>
  )
}
