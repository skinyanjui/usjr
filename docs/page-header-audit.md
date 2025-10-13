# Page Header Audit

## Method

- Scanned every `app/**/page.tsx` entry using a Python script to extract hero headings (`PageHero`/`ServicePageTemplate` titles), inline `<h1>` elements, and metadata titles.
- Flagged any headings or metadata titles that appeared more than once so we could review duplicate content at the page level.

## Duplicate findings

- `/html-sitemap`: Displayed the hero heading "Sitemap" twice (hero plus on-page heading). Removed the HTML sitemap page because crawlers only rely on the XML sitemap, which also eliminates the duplicate headings.
- `/quote`: Repeated "Get Your Free Quote Today" as both the hero and a secondary heading. Retitled the secondary heading to "Pick the fastest way to get your quote."
- `/terms`: Repeated "Terms of Service" as both the hero and a body heading. Replaced the body heading with a descriptive summary paragraph instead of a second heading.

## Result

- Re-ran the heading scan after updates and confirmed there are no remaining duplicate page-level headings or titles.
