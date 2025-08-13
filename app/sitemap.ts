import type { MetadataRoute } from "next"
import fs from "node:fs"
import path from "node:path"

const baseUrl = "https://unclesamjunkremoval.com"

function pathExists(p: string): boolean {
  try {
    fs.accessSync(p, fs.constants.F_OK)
    return true
  } catch {
    return false
  }
}

function getDirMtime(filePath: string): Date {
  try {
    const stat = fs.statSync(filePath)
    return stat.mtime
  } catch {
    return new Date()
  }
}

function listRouteSlugs(segment: string): { slug: string; lastModified: Date }[] {
  const dir = path.join(process.cwd(), "app", segment)
  if (!pathExists(dir)) return []

  const entries = fs.readdirSync(dir, { withFileTypes: true })
  return entries
    .filter((e) => e.isDirectory())
    .map((e) => {
      const pageFile = path.join(dir, e.name, "page.tsx")
      return {
        slug: e.name,
        lastModified: getDirMtime(pageFile),
      }
    })
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // Top-level pages
  const topLevel: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/quote`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/services`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/cleaning`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/compare`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/emergency`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
  ]

  // Services subpages
  const services = listRouteSlugs("services").map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: s.lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }))

  // Cleaning subpages
  const cleaning = listRouteSlugs("cleaning").map((s) => ({
    url: `${baseUrl}/cleaning/${s.slug}`,
    lastModified: s.lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  // Location pages
  const locations = listRouteSlugs("locations").map((s) => ({
    url: `${baseUrl}/locations/${s.slug}`,
    lastModified: s.lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }))

  // Blog posts
  const blog = listRouteSlugs("blog").map((s) => ({
    url: `${baseUrl}/blog/${s.slug}`,
    lastModified: s.lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...topLevel, ...services, ...cleaning, ...locations, ...blog]
}
