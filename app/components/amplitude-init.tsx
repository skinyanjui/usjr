"use client";

import * as amplitude from "@amplitude/unified";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const AMPLITUDE_API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

let initPromise: Promise<void> | null = null;

function ensureAmplitudeInit() {
  if (!AMPLITUDE_API_KEY) {
    console.warn("Amplitude API key missing — analytics disabled");
    return null;
  }

  if (!initPromise) {
    initPromise = amplitude.initAll(AMPLITUDE_API_KEY, {
      analytics: { autocapture: true },
      sessionReplay: { sampleRate: 1 },
    });
  }

  return initPromise;
}

export function AmplitudeInit() {
  const pathname = usePathname();
  const homePageTrackedRef = useRef(false);

  useEffect(() => {
    const init = ensureAmplitudeInit();
    if (!init) return;

    void init.then(() => {
      if (pathname !== "/" || homePageTrackedRef.current) return;
      homePageTrackedRef.current = true;
      amplitude.track("Viewed Home Page", { prompt_version: "BA400.4" });
    });
  }, [pathname]);

  return null;
}
