"use client";

import { useEffect } from "react";

export function McpAttributionTracker() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("ref") !== "mcp") return;

    const conversionId = params.get("mcp_trace")?.trim() || "";
    const source = (params.get("mcp_source")?.trim().toLowerCase() || "unknown").slice(
      0,
      80,
    );
    if (!/^[a-zA-Z0-9._:-]{8,80}$/.test(conversionId)) return;
    if (!/^[a-z0-9._:-]{1,80}$/.test(source)) return;

    const storageKey = `usjr:mcp-open:${conversionId}`;
    try {
      if (window.sessionStorage.getItem(storageKey)) return;
      window.sessionStorage.setItem(storageKey, "1");
    } catch {
      // Continue without deduplication if storage is unavailable.
    }

    const payload = JSON.stringify({
      event: "quote_link_opened",
      conversionId,
      source,
    });

    if (navigator.sendBeacon) {
      navigator.sendBeacon(
        "/api/mcp/telemetry",
        new Blob([payload], { type: "application/json" }),
      );
      return;
    }

    void fetch("/api/mcp/telemetry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true,
    }).catch(() => undefined);
  }, []);

  return null;
}
