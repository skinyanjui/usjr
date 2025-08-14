export interface FAQ {
  question: string
  answer: string
}

export interface FAQSectionProps {
  title?: string
  faqs: FAQ[]
}

export function FAQSection({ title = "Frequently Asked Questions", faqs }: FAQSectionProps) {
  return (
    <section className="py-8">
      <div className="mx-auto max-w-4xl px-4">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">{title}</h2>
        <div className="space-y-4">
          {faqs.map((item, idx) => (
            <details key={idx} className="rounded-md border p-4">
              <summary className="cursor-pointer text-base font-semibold text-gray-900">{item.question}</summary>
              <p className="mt-2 text-sm text-gray-700">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}