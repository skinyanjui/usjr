# Page Header Audit

## Method

- Scanned every `app/**/page.tsx` entry using a Python script to extract hero headings (`PageHero`/`ServicePageTemplate` titles), inline `<h1>` elements, and metadata titles.
- Flagged any headings or metadata titles that appeared more than once so we could review duplicate content at the page level.

## Duplicate findings

- `/html-sitemap`: Displayed the hero heading "Sitemap" twice (hero plus on-page heading). Kept the hero and replaced the in-page `<h1>` with section headings so the hierarchy flows from the hero without duplicate wording.
- `/quote`: Repeated "Get Your Free Quote Today" as both the hero and a secondary heading. Retitled the secondary heading to "Pick the fastest way to get your quote."
- `/terms`: Repeated "Terms of Service" as both the hero and a body heading. Introduced a distinct "Service terms overview" `<h2>` with supporting copy to keep the hero unique while maintaining a clear heading structure.

## Result

- Re-ran the heading scan after updates and confirmed there are no remaining duplicate page-level headings or titles.
