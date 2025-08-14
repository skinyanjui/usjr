import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export interface LocationPageTemplateProps {
  locationName: string
  state: string
  tagline?: string
  theme?: string
  features?: { icon?: any; title: string; description: string }[]
  landmarks?: string[]
  neighborhoods?: string[]
  children?: React.ReactNode
}

export function LocationPageTemplate({ locationName, state, tagline, features = [], landmarks = [], neighborhoods = [], children }: LocationPageTemplateProps) {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">{locationName}, {state}</h1>
          {tagline ? <p className="mt-2 text-gray-600">{tagline}</p> : null}
        </header>

        {features.length ? (
          <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {features.map((f, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {f.icon ? <f.icon className="h-4 w-4" /> : null}
                    <span>{f.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{f.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : null}

        {(landmarks.length || neighborhoods.length) ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {landmarks.length ? (
              <Card>
                <CardHeader>
                  <CardTitle>Local Landmarks</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-inside list-disc space-y-1 text-sm text-gray-700">
                    {landmarks.map((l) => (
                      <li key={l}>{l}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ) : null}
            {neighborhoods.length ? (
              <Card>
                <CardHeader>
                  <CardTitle>Neighborhoods</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-inside list-disc space-y-1 text-sm text-gray-700">
                    {neighborhoods.map((n) => (
                      <li key={n}>{n}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ) : null}
          </div>
        ) : null}

        {children}
      </div>
    </section>
  )
}