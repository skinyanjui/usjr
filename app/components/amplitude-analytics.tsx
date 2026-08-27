"use client";

import * as amplitude from "@amplitude/unified";
import { useEffect } from "react";

let hasInitialized = false;

export function AmplitudeAnalytics() {
  useEffect(() => {
    if (hasInitialized) return;
    hasInitialized = true;

    const key = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;
    if (!key) {
      console.warn("Amplitude API key missing — analytics disabled");
      return;
    }

    amplitude.initAll(key, {
      analytics: { autocapture: true },
      sessionReplay: { sampleRate: 1 },
    });
    amplitude.track("Viewed Home Page", { prompt_version: "BA400.4" }); // helps improve this setup flow — safe to remove once you've verified the event lands
  }, []);

  return null;
}
