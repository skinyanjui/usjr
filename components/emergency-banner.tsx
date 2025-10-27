import Link from 'next/link'

export function EmergencyBanner() {
  return (
    <div className="bg-gradient-to-r from-orange-600 to-red-600 px-4 py-3">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3 text-white">
          <svg
            className="h-6 w-6 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <p className="text-sm md:text-base font-semibold">
            <span className="font-bold">Emergency Service Available:</span> Storm cleanup, urgent
            junk removal & same-day response
          </p>
        </div>
        <Link
          href="/emergency"
          className="whitespace-nowrap rounded-lg bg-white px-4 py-3 text-sm font-bold text-orange-600 hover:bg-gray-100 transition-colors min-h-[48px] flex items-center"
        >
          Get Help Now →
        </Link>
      </div>
    </div>
  )
}
