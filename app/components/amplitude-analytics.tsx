"use client";

import * as amplitude from "@amplitude/unified";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

let hasInitialized = false;
let hasTrackedHomePage = false;

export function AmplitudeAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

    if (!hasInitialized) {
      hasInitialized = true;
      if (!key) {
        console.warn("Amplitude API key missing — analytics disabled");
      } else {
        amplitude.initAll(key, {
          analytics: { autocapture: true },
          sessionReplay: { sampleRate: 1 },
        });
      }
    }

    if (!key) return;

    if (pathname === "/" && !hasTrackedHomePage) {
      hasTrackedHomePage = true;
      amplitude.track("Viewed Home Page", { prompt_version: "BA400.4" }); // helps improve this setup flow — safe to remove once you've verified the event lands
    }
  }, [pathname]);

  return null;
}
