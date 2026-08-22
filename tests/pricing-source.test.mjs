import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function loadWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set(
    "pricing-test",
    `${process.pid}-${Date.now()}-${Math.random()}`,
  );
  const { default: worker } = await import(workerUrl.href);
  return worker;
}

function workerEnv() {
  return {
    ASSETS: {
      fetch: async () => new Response("Not found", { status: 404 }),
    },
  };
}

async function fetchHomepage(worker) {
  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    workerEnv(),
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

async function estimateAllPricing(worker) {
  const method = "tools/call";
  const name = "estimatePrice";
  const response = await worker.fetch(
    new Request("http://localhost/api/mcp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "MCP-Protocol-Version": "2026-07-28",
        "Mcp-Method": method,
        "Mcp-Name": name,
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method,
        params: {
          name,
          arguments: { loadSize: "unsure" },
          _meta: {
            "io.modelcontextprotocol/protocolVersion": "2026-07-28",
            "io.modelcontextprotocol/clientInfo": {
              name: "USJR pricing parity test",
              version: "1.0.0",
            },
            "io.modelcontextprotocol/clientCapabilities": {},
          },
        },
      }),
    }),
    workerEnv(),
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  const payload = await response.json();
  assert.equal(payload.result?.isError, false);
  return payload.result?.structuredContent?.allTiers ?? [];
}

test("homepage and MCP publish the same planning-price ranges", async () => {
  const worker = await loadWorker();
  const homepageResponse = await fetchHomepage(worker);
  assert.equal(homepageResponse.status, 200);
  const homepage = await homepageResponse.text();
  const mcpTiers = await estimateAllPricing(worker);

  assert.equal(mcpTiers.length, 4, "only the four published pricing tiers should be exposed");

  for (const tier of mcpTiers) {
    assert.equal(typeof tier.range, "string");
    assert.ok(
      homepage.includes(tier.range),
      `homepage should publish the MCP range ${tier.range} for ${tier.label}`,
    );
  }

  assert.ok(
    !mcpTiers.some((tier) => tier.size === "three_quarter_load"),
    "MCP should not publish an unsupported 3/4-load price tier",
  );
});

test("quote form consumes the canonical pricing source", async () => {
  const quoteForm = await readFile(
    new URL("../app/components/quote-section.tsx", import.meta.url),
    "utf8",
  );

  assert.match(
    quoteForm,
    /from "\.\.\/pricing-data";/,
    "quote form should import the shared pricing module",
  );
  assert.match(
    quoteForm,
    /getPublicPricingTier\(/,
    "quote form should resolve price tiers through the canonical pricing helper",
  );
  assert.match(
    quoteForm,
    /formatPriceRange\(/,
    "quote form should format ranges through the canonical pricing helper",
  );

  for (const staleRange of [
    "$75–$150",
    "$200–$300",
    "$350–$450",
    "$425–$550",
    "$500–$650",
  ]) {
    assert.ok(
      !quoteForm.includes(staleRange),
      `quote form must not retain stale hardcoded range ${staleRange}`,
    );
  }
});
