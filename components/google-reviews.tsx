'use client'

export function GoogleReviews() {
  return (
    <section className="bg-white px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-3xl font-bold text-gray-900">See What Our Customers Say</h2>
          <p className="text-lg text-gray-600">Read verified reviews from our Google Business Profile</p>
        </div>

        <div className="overflow-hidden rounded-lg border border-gray-200 bg-gray-50 shadow-sm">
          {/* Elfsight Google Reviews Widget */}
          <div className="mx-auto max-w-4xl p-6">
            <script src="https://static.elfsight.com/platform/platform.js" data-use-service-core defer></script>
            <div className="elfsight-app-ae6bd45d-9f5a-4ad3-95e7-f4f8c3b6d2a1" data-elfsight-app-lazy></div>
          </div>

          {/* Fallback: Direct link to Google Reviews */}
          <div className="border-t border-gray-200 bg-white px-6 py-4 text-center">
            <a
              href="https://www.google.com/maps/search/?api=1&query=Uncle+Sam+Junk+Removal+Evansville"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-800 hover:text-blue-900 font-semibold transition-colors"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              View All Reviews on Google
            </a>
          </div>
        </div>

        {/* Alternative: Manual embed placeholder */}
        <noscript>
          <div className="mt-8 rounded-lg border border-gray-200 bg-white p-8 text-center">
            <h3 className="mb-4 text-xl font-bold text-gray-900">Customer Reviews</h3>
            <p className="mb-4 text-gray-600">Please enable JavaScript to see our Google Reviews widget, or visit our Google Business Profile directly.</p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Uncle+Sam+Junk+Removal+Evansville"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-lg bg-blue-800 px-6 py-3 font-semibold text-white hover:bg-blue-900 transition-colors"
            >
              Read Reviews on Google
            </a>
          </div>
        </noscript>
      </div>
    </section>
  )
}
