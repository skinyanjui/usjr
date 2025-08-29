import type React from "react"
import type { Metadata } from "next"
import { IBM_Plex_Sans } from "next/font/google"
import "./globals.css"
import "leaflet/dist/leaflet.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HomeMap } from "@/components/home-map"
import { ScrollToTopOnRouteChange } from "@/components/scroll-to-top"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@vercel/analytics/next"
import { RoutePrefetcher } from "@/components/route-prefetcher"
import { Canonical } from "@/components/canonical"
import { BreadcrumbsAuto } from "@/components/breadcrumbs"

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-ibm-plex-sans",
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://unclesamjunkremoval.com"

export const metadata: Metadata = {
  title: "Uncle Sam Junk Removal - Professional Junk Removal & Dumpster Rental in Evansville",
  description:
    "Locally owned in Evansville, Indiana. Professional junk removal and dumpster rental services. Free estimates, eco-friendly disposal, and reliable service throughout Southern Indiana.",
  keywords:
    "junk removal, dumpster rental, Evansville Indiana, Southern Indiana, waste management, eco-friendly disposal, Vanderburgh County",
  authors: [{ name: "Uncle Sam Junk Removal" }],
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Uncle Sam Junk Removal - Professional Junk Removal & Dumpster Rental in Evansville",
    description:
      "Locally owned in Evansville, Indiana. Professional junk removal and dumpster rental services throughout Southern Indiana.",
    type: "website",
    url: siteUrl,
    siteName: "Uncle Sam Junk Removal",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Uncle Sam Junk Removal - Professional Junk Removal & Dumpster Rental in Evansville",
    description:
      "Locally owned in Evansville, Indiana. Professional junk removal and dumpster rental services throughout Southern Indiana.",
    images: ["/twitter-image"],
  },
  icons: {
    icon: [
      { url: "/icon.ico", type: "image/x-icon" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${ibmPlexSans.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script src="https://analytics.ahrefs.com/analytics.js" data-key="HzFgroT+3yowD6SFZ/ihvw" async></script>
      </head>
      <body className="font-sans">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Canonical />
          <Header />
          <BreadcrumbsAuto />
          <RoutePrefetcher />
          <ScrollToTopOnRouteChange />
          <main>{children}</main>
          <HomeMap />
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
