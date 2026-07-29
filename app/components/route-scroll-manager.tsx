"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function scrollToRouteDestination() {
  const hash = window.location.hash;

  if (hash) {
    let targetId = hash.slice(1);

    try {
      targetId = decodeURIComponent(targetId);
    } catch {
      // Keep the literal hash value when it is not URI encoded.
    }

    const target = document.getElementById(targetId);

    if (target) {
      target.scrollIntoView({ block: "start", behavior: "auto" });
      return;
    }
  }

  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
}

export function RouteScrollManager() {
  const pathname = usePathname();

  useEffect(() => {
    const frame = window.requestAnimationFrame(scrollToRouteDestination);

    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    function resetSameRouteLink(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const source = event.target;

      if (!(source instanceof Element)) {
        return;
      }

      const link = source.closest<HTMLAnchorElement>("a[href]");

      if (!link || link.target === "_blank" || link.hasAttribute("download")) {
        return;
      }

      const destination = new URL(link.href, window.location.href);

      if (
        destination.origin !== window.location.origin ||
        destination.hash ||
        !["http:", "https:"].includes(destination.protocol)
      ) {
        return;
      }

      const frame = window.requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      });
      window.setTimeout(() => window.cancelAnimationFrame(frame), 250);
    }

    document.addEventListener("click", resetSameRouteLink);

    return () => document.removeEventListener("click", resetSameRouteLink);
  }, []);

  return null;
}
