import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { AmplitudeAnalytics } from "./components/amplitude-analytics";
import { McpAttributionTracker } from "./components/mcp-attribution-tracker";
import { RouteScrollManager } from "./components/route-scroll-manager";
import { WebMcpQuoteBridge } from "./components/webmcp-quote-bridge";
import { WebMcpRoutingTools } from "./components/webmcp-routing-tools";
import { WebMcpTools } from "./components/webmcp-tools";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://unclesamjunkremoval.com"),
  title: {
    default: "Junk Removal Evansville, IN | Uncle Sam Junk Removal",
    template: "%s | Uncle Sam Junk Removal",
  },
  description:
    "Veteran-owned junk and furniture removal, cleaning, estate cleanouts, appliance hauling, debris cleanup, and light demolition in the Evansville Tri-State.",
  keywords: [
    "junk removal Evansville",
    "junk hauling Evansville IN",
    "same day junk removal",
    "furniture removal Evansville IN",
    "couch removal Evansville",
    "estate cleanout Evansville",
    "light demolition Evansville",
    "shed removal Evansville IN",
    "shed demolition Evansville",
    "appliance removal Evansville",
    "garage cleanout Evansville",
    "junk removal Newburgh IN",
    "junk removal Henderson KY",
    "junk removal Owensboro KY",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Junk Removal Evansville & the Tri-State",
    description:
      "Veteran-owned junk and furniture removal, cleaning, cleanouts, hauling, and light demolition across nine Tri-State communities.",
    type: "website",
    locale: "en_US",
    url: "https://unclesamjunkremoval.com",
    images: [
      {
        url: "https://unclesamjunkremoval.com/hero-junk-v3.webp",
        width: 1024,
        height: 1024,
        alt: "Uncle Sam Junk Removal truck",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Junk Removal Evansville & the Tri-State",
    description:
      "Veteran-owned junk and furniture removal, cleanouts, cleaning, and light demolition serving the Evansville Tri-State.",
    images: ["https://unclesamjunkremoval.com/hero-junk-v3.webp"],
  },
  other: {
    "theme-color": "#102a43",
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
        <AmplitudeAnalytics />
        <WebMcpTools />
        <WebMcpRoutingTools />
        <WebMcpQuoteBridge />
        <McpAttributionTracker />
        <RouteScrollManager />
        {children}
      </body>
    </html>
  );
}
