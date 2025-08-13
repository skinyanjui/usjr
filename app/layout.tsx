import type React from "react"
import type { Metadata } from "next"
import { IBM_Plex_Sans } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-ibm-plex-sans",
})

export const metadata: Metadata = {
  title: "Uncle Sam Junk Removal - Professional Junk Removal & Dumpster Rental in Evansville",
  description:
    "Locally owned in Evansville, Indiana. Professional junk removal and dumpster rental services. Free estimates, eco-friendly disposal, and reliable service throughout Southern Indiana.",
  keywords:
    "junk removal, dumpster rental, Evansville Indiana, Southern Indiana, waste management, eco-friendly disposal, Vanderburgh County",
  authors: [{ name: "Uncle Sam Junk Removal" }],
  openGraph: {
    title: "Uncle Sam Junk Removal - Professional Junk Removal & Dumpster Rental in Evansville",
    description:
      "Locally owned in Evansville, Indiana. Professional junk removal and dumpster rental services throughout Southern Indiana.",
    type: "website",
  },
    generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${ibmPlexSans.variable} antialiased`}>
      <body className="font-sans">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
