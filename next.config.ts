import type { NextConfig } from "next";
import { legacyRedirects } from "./lib/legacy-redirects";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "base-uri 'self'; connect-src 'self' https://unclesamjunkremoval.com https://*.amplitude.com; default-src 'self'; font-src 'self' data:; form-action 'self' https://unclesamjunkremoval.com; frame-ancestors 'none'; img-src 'self' blob: data: https://unclesamjunkremoval.com; object-src 'none'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'",
          },
          {
            key: "Permissions-Policy",
            value:
              "camera=(self), microphone=(), geolocation=(), payment=(), usb=()",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      ...legacyRedirects.map((redirect) => ({
        ...redirect,
        permanent: true,
      })),
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.unclesamjunkremoval.com",
          },
        ],
        destination: "https://unclesamjunkremoval.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
