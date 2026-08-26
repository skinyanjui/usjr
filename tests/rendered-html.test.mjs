import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;
const publicRoot = fileURLToPath(new URL("../public", import.meta.url));

const serviceSlugs = [
  "junk-removal",
  "furniture-removal",
  "cleaning",
  "estate-cleanouts",
  "appliance-removal",
  "light-demolition",
  "garage-cleanout",
  "hot-tub-removal",
  "mattress-removal",
  "shed-removal",
  "yard-waste-removal",
  "storage-unit-cleanouts",
  "office-cleanouts",
  "restaurant-equipment-removal",
  "property-management-turnovers",
  "warehouse-fixture-removal",
  "holiday-tree-removal",
  "storm-debris-cleanup",
];

const locationSlugs = [
  "evansville-in",
  "newburgh-in",
  "henderson-ky",
  "owensboro-ky",
  "boonville-in",
  "princeton-in",
  "mount-carmel-il",
  "mount-vernon-in",
  "new-harmony-in",
];

const legalRoutes = ["/privacy", "/terms", "/accessibility"];

const contentRoutes = [
  "/",
  "/contact",
  "/about",
  "/faq",
  "/junk-removal-vs-dumpster",
  "/services",
  ...serviceSlugs.map((slug) => `/services/${slug}`),
  "/locations",
  ...locationSlugs.map((slug) => `/locations/${slug}`),
  ...legalRoutes,
];

function getTagAttribute(tag, attribute) {
  return tag.match(new RegExp(`\\b${attribute}=["']([^"']*)["']`, "i"))?.[1];
}

async function loadWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set(
    "test",
    `${process.pid}-${Date.now()}-${Math.random()}`,
  );
  const { default: worker } = await import(workerUrl.href);
  return worker;
}

async function render(worker, path, accept = "text/html") {
  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept },
    }),
    workerEnv(),
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

function workerEnv(overrides = {}) {
  return {
    ASSETS: {
      fetch: async (request) => {
        const url = new URL(
          typeof request === "string" ? request : request.url,
        );
        const relativePath = decodeURIComponent(url.pathname).replace(
          /^\/+/,
          "",
        );
        if (
          !relativePath ||
          relativePath.includes("\0") ||
          path.isAbsolute(relativePath) ||
          relativePath.split(/[\\/]/).includes("..")
        ) {
          return new Response("Not found", { status: 404 });
        }

        const filePath = path.resolve(publicRoot, relativePath);
        if (
          filePath !== publicRoot &&
          !filePath.startsWith(`${publicRoot}${path.sep}`)
        ) {
          return new Response("Not found", { status: 404 });
        }

        try {
          const body = await readFile(filePath);
          const contentType = filePath.endsWith(".txt")
            ? "text/plain; charset=utf-8"
            : filePath.endsWith(".json")
              ? "application/json; charset=utf-8"
              : filePath.endsWith(".svg")
                ? "image/svg+xml"
                : filePath.endsWith(".webp")
                  ? "image/webp"
                  : "application/octet-stream";
          return new Response(body, {
            status: 200,
            headers: { "Content-Type": contentType },
          });
        } catch {
          return new Response("Not found", { status: 404 });
        }
      },
    },
    ...overrides,
  };
}

test("renders development preview metadata", async () => {
  const worker = await loadWorker();
  const response = await render(worker, "/");

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  assert.match(await response.text(), developmentPreviewMeta);
});

test("renders every public content route", async () => {
  const worker = await loadWorker();

  assert.equal(contentRoutes.length, 37);

  for (const route of contentRoutes) {
    const response = await render(worker, route);
    const body = await response.text();

    assert.equal(response.status, 200, `${route} should return 200`);
    assert.match(
      response.headers.get("content-type") ?? "",
      /^text\/html\b/i,
      `${route} should return HTML`,
    );
    assert.match(body, /<title>[^<]+<\/title>/i, `${route} needs a title`);
    assert.match(
      body,
      /<link[^>]+\brel=["']canonical["'][^>]*>/i,
      `${route} needs a canonical URL`,
    );
    assert.match(
      body,
      /<meta(?=[^>]*\bname=["']viewport["'])[^>]*>/i,
      `${route} needs responsive viewport metadata`,
    );
  }
});

test("publishes unique titles, descriptions, canonicals, and one H1 per page", async () => {
  const worker = await loadWorker();
  const titles = new Set();
  const descriptions = new Set();

  for (const route of contentRoutes) {
    const response = await render(worker, route);
    const body = await response.text();
    const title = body.match(/<title>([^<]+)<\/title>/i)?.[1];
    const descriptionTag = body.match(
      /<meta(?=[^>]*\bname=["']description["'])[^>]*>/i,
    )?.[0];
    const canonicalTag = body.match(
      /<link(?=[^>]*\brel=["']canonical["'])[^>]*>/i,
    )?.[0];
    const description = descriptionTag
      ? getTagAttribute(descriptionTag, "content")
      : undefined;
    const canonical = canonicalTag
      ? getTagAttribute(canonicalTag, "href")
      : undefined;
    const expectedCanonical = `https://unclesamjunkremoval.com${
      route === "/" ? "/" : route
    }`;
    const h1Count = [...body.matchAll(/<h1\b/gi)].length;

    assert.ok(title, `${route} needs a readable title`);
    assert.ok(description, `${route} needs a meta description`);
    assert.equal(canonical, expectedCanonical, `${route} canonical should be exact`);
    assert.equal(h1Count, 1, `${route} should have exactly one H1`);
    assert.ok(!titles.has(title), `${route} title should be unique`);
    assert.ok(
      !descriptions.has(description),
      `${route} meta description should be unique`,
    );

    titles.add(title);
    descriptions.add(description);
  }
});

test("keeps visible FAQs and FAQ structured data together", async () => {
  const worker = await loadWorker();
  const faqSchemaRoutes = [
    "/",
    "/faq",
    "/locations",
    ...locationSlugs.map((slug) => `/locations/${slug}`),
    "/services/storm-debris-cleanup",
    "/services/garage-cleanout",
    "/services/appliance-removal",
    "/services/furniture-removal",
    "/services/office-cleanouts",
    "/services/restaurant-equipment-removal",
  ];
  const visibleFaqRoutes = [
    ...faqSchemaRoutes,
    ...serviceSlugs.map((slug) => `/services/${slug}`),
    "/about",
    "/junk-removal-vs-dumpster",
  ];

  for (const route of [...new Set(visibleFaqRoutes)]) {
    const response = await render(worker, route);
    const body = await response.text();

    assert.match(body, /<details\b/i, `${route} needs visible FAQ content`);
  }

  for (const route of faqSchemaRoutes) {
    const response = await render(worker, route);
    const body = await response.text();

    assert.match(
      body,
      /"@type":"FAQPage"/i,
      `${route} needs matching FAQ structured data`,
    );
  }

  const aboutBody = await (await render(worker, "/about")).text();
  assert.doesNotMatch(
    aboutBody,
    /"@type":"FAQPage"/i,
    "/about should not publish FAQPage schema",
  );
  assert.doesNotMatch(
    aboutBody,
    /"@type":"LocalBusiness"/i,
    "/about should not clone LocalBusiness",
  );
  assert.match(aboutBody, /"@type":"AboutPage"/i);

  const dumpsterBody = await (
    await render(worker, "/junk-removal-vs-dumpster")
  ).text();
  assert.doesNotMatch(
    dumpsterBody,
    /"@type":"FAQPage"/i,
    "/junk-removal-vs-dumpster should not publish FAQPage schema",
  );
});

test("publishes complete, dated legal pages", async () => {
  const worker = await loadWorker();
  const requiredContent = new Map([
    [
      "/privacy",
      ["Privacy Policy", "How this website’s quote flow works", "July 29, 2026"],
    ],
    [
      "/terms",
      [
        "Terms of Service",
        "Prohibited and specialty materials",
        "only when it was disclosed and accepted",
      ],
    ],
    [
      "/accessibility",
      ["Accessibility Statement", "WCAG", "Alternative ways to access our services"],
    ],
  ]);

  for (const [route, phrases] of requiredContent) {
    const response = await render(worker, route);
    const body = await response.text();

    assert.equal(response.status, 200);
    for (const phrase of phrases) {
      assert.ok(body.includes(phrase), `${route} should include ${phrase}`);
    }
  }
});

test("renders the mega menu, focused popular services, and live quote form", async () => {
  const worker = await loadWorker();
  const response = await render(worker, "/");
  const body = await response.text();

  assert.equal(response.status, 200);
  assert.match(body, /id=["']services-mega-menu["']/i);
  assert.match(body, /Popular service/i);
  assert.match(body, /Shed Removal/i);
  assert.match(body, /Most requested/i);
  assert.match(body, /18(?:<!-- -->)? services for homes and businesses/i);
  assert.match(body, /Furniture Removal/i);
  assert.match(
    body,
    /class=["']brand-mark__top["']>US<\/span><span class=["']brand-mark__bottom["']>JR<\/span>/i,
  );
  assert.match(body, /Get my free quote/i);
  assert.match(body, /securely emailed to our local team/i);
  assert.doesNotMatch(body, /Step 1 of 1/i);
  assert.match(body, /Preferred pickup date or urgency/i);
  assert.match(body, /Approximate quantity or load size/i);
  assert.match(body, /Stairs, elevator, or difficult access/i);
  assert.match(body, /Preferred contact method/i);
  assert.match(body, /Photos usually help us price faster/i);
  assert.match(
    body,
    /<img[^>]+src=["']\/hero-junk-v3\.webp["']/i,
    "the hero should load the checked-in WebP directly",
  );
  assert.equal(
    [...body.matchAll(/\bdata-popular-service=["'][^"']+["']/gi)].length,
    6,
    "the homepage should show six focused popular-service cards",
  );
});

test("keeps veteran ownership and Evansville identity in the footer, not the hero", async () => {
  const worker = await loadWorker();
  const response = await render(worker, "/");
  const body = await response.text();
  const hero = body.match(/<section class=["']hero["'][\s\S]*?<\/section>/i)?.[0];
  const footer = body.match(/<footer class=["']site-footer["'][\s\S]*?<\/footer>/i)?.[0];

  assert.ok(hero, "homepage should render a hero");
  assert.ok(footer, "homepage should render a footer");
  assert.doesNotMatch(hero, /Veteran-owned|Evansville, Indiana/i);
  assert.match(footer, /Veteran-owned/i);
  assert.match(footer, /Evansville, Indiana/i);
});

test("orders the homepage around a low-friction quote journey", async () => {
  const worker = await loadWorker();
  const response = await render(worker, "/");
  const body = await response.text();
  const expectedOrder = [
    "services",
    "quote",
    "how-it-works",
    "pricing",
    "areas",
    "commercial",
    "faq",
  ];
  let previousIndex = -1;

  for (const id of expectedOrder) {
    const index = body.search(new RegExp(`\\bid=["']${id}["']`, "i"));
    assert.ok(index > previousIndex, `#${id} should appear in journey order`);
    previousIndex = index;
  }
});

test("validates and delivers quote requests through the server-side email endpoint", async () => {
  const worker = await loadWorker();
  const invalidResponse = await worker.fetch(
    new Request("http://localhost/api/quote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "http://localhost",
      },
      body: JSON.stringify({
        name: "S",
        phone: "12",
        location: "",
        service: "Unknown",
      }),
    }),
    workerEnv(),
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(invalidResponse.status, 400);

  const tooFastResponse = await worker.fetch(
    new Request("http://localhost/api/quote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "http://localhost",
      },
      body: JSON.stringify({
        submissionId: "too-fast-submission",
        name: "Jordan Taylor",
        phone: "(812) 555-0199",
        email: "jordan@example.com",
        address: "Evansville, IN",
        service: "Shed Removal",
        urgency: "flexible",
        quantity: "Full trailer load",
        placement: "outdoor",
        preferredContact: "text",
        consent: true,
        company: "",
        startedAt: Date.now(),
      }),
    }),
    workerEnv(),
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(tooFastResponse.status, 400);

  const originalFetch = globalThis.fetch;
  const resendPayloads = [];

  globalThis.fetch = async (input, init) => {
    assert.equal(input, "https://api.resend.com/emails");
    assert.equal(init?.method, "POST");
    assert.match(String(init?.headers?.Authorization), /^Bearer /);
    resendPayloads.push(JSON.parse(String(init?.body)));
    return Response.json({ id: "email_test" }, { status: 200 });
  };

  try {
    const response = await worker.fetch(
      new Request("http://localhost/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: "http://localhost",
        },
        body: JSON.stringify({
          submissionId: "test-submission-jordan-taylor",
          name: "Jordan Taylor",
          phone: "(812) 555-0199",
          email: "jordan@example.com",
          address: "Evansville, IN",
          service: "Shed Removal",
          urgency: "flexible",
          preferredDate: "",
          quantity: "Full trailer load",
          placement: "outdoor",
          access: ["Limited truck access"],
          heavyMaterials: false,
          dismantling: true,
          heavyDetails: "An 8 by 12 wood shed.",
          preferredContact: "text",
          conditionalDetails: {
            Dimensions: "8 by 12 feet",
            Material: "Wood",
          },
          notes: "Clear backyard access.",
          consent: true,
          company: "",
          source: "test",
          startedAt: Date.now() - 3_000,
        }),
      }),
      workerEnv({
        QUOTE_TO_EMAIL: "unclesamjunkremoval@gmail.com",
        RESEND_API_KEY: "re_test",
        RESEND_FROM_EMAIL:
          "Uncle Sam Quotes <quotes@unclesamjunkremoval.com>",
        RESEND_INBOUND_EMAIL: "karaiveluu.resend.app",
      }),
      {
        waitUntil() {},
        passThroughOnException() {},
      },
    );

    assert.equal(response.status, 200);
    const responseBody = await response.json();
    assert.equal(responseBody.ok, true);
    assert.match(responseBody.reference, /^USJR-[A-F0-9]{8}$/);
    assert.equal(responseBody.confirmationSent, true);
    assert.equal(resendPayloads.length, 2);
    assert.equal(
      resendPayloads[0].to[0],
      "unclesamjunkremoval@gmail.com",
    );
    assert.equal(resendPayloads[1].to[0], "jordan@example.com");
    assert.match(resendPayloads[0].subject, /Shed Removal/);
    assert.match(resendPayloads[0].text, /8 by 12 wood shed/i);
    for (const payload of resendPayloads) {
      assert.equal(
        payload.from,
        "Uncle Sam Quotes <quotes@unclesamjunkremoval.com>",
      );
      assert.doesNotMatch(payload.from, /no-?reply/i);
      assert.match(payload.reply_to, /@karaiveluu\.resend\.app$/i);
    }
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("allows the Sites quote client and rejects unsigned inbound email webhooks", async () => {
  const worker = await loadWorker();
  const optionsResponse = await worker.fetch(
    new Request("http://localhost/api/quote", {
      method: "OPTIONS",
      headers: {
        Origin: "https://uncle-sam-junk-removal.bigafrica.chatgpt.site",
      },
    }),
    workerEnv(),
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(optionsResponse.status, 204);
  assert.equal(
    optionsResponse.headers.get("access-control-allow-origin"),
    "https://uncle-sam-junk-removal.bigafrica.chatgpt.site",
  );

  const unsignedWebhook = await worker.fetch(
    new Request("http://localhost/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "email.received" }),
    }),
    workerEnv({ RESEND_WEBHOOK_SECRET: "whsec_test" }),
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(unsignedWebhook.status, 401);
});

test("prefills the quote form from service and location detail pages", async () => {
  const worker = await loadWorker();
  const serviceResponse = await render(worker, "/services/shed-removal");
  const locationResponse = await render(worker, "/locations/evansville-in");
  const serviceBody = await serviceResponse.text();
  const locationBody = await locationResponse.text();

  assert.match(serviceBody, /href=["']\/\?service=Shed\+Removal#quote["']/i);
  assert.match(
    locationBody,
    /href=["']\/\?location=Evansville%2C\+IN#quote["']/i,
  );
});

test("adds browser security headers to rendered pages", async () => {
  const worker = await loadWorker();
  const response = await render(worker, "/");

  assert.match(
    response.headers.get("content-security-policy") ?? "",
    /frame-ancestors 'none'/i,
  );
  assert.equal(response.headers.get("x-frame-options"), "DENY");
  assert.equal(
    response.headers.get("referrer-policy"),
    "strict-origin-when-cross-origin",
  );
  assert.match(
    response.headers.get("permissions-policy") ?? "",
    /camera=\(self\)/i,
  );
});

test("keeps every internal page and section link resolvable", async () => {
  const worker = await loadWorker();
  const renderedPages = new Map();
  const knownRoutes = new Set([...contentRoutes, "/sitemap.xml"]);

  for (const route of contentRoutes) {
    const response = await render(worker, route);
    renderedPages.set(route, await response.text());
  }

  for (const [sourceRoute, body] of renderedPages) {
    const hrefs = [
      ...body.matchAll(/<a\b[^>]*\bhref=["']([^"']+)["'][^>]*>/gi),
    ].map((match) => match[1]);

    for (const href of hrefs) {
      if (/^tel:/i.test(href)) {
        assert.equal(
          href,
          "tel:+18126101657",
          `${sourceRoute} should use the published phone number`,
        );
        continue;
      }

      if (/^sms:/i.test(href)) {
        assert.match(
          href,
          /^sms:\+18126101657(?:\?|$)/i,
          `${sourceRoute} should use the published text number`,
        );
        continue;
      }

      if (/^mailto:/i.test(href)) {
        assert.match(
          href,
          /^mailto:unclesamjunkremoval@gmail\.com(?:\?|$)/i,
          `${sourceRoute} should use the published email address`,
        );
        continue;
      }

      if (!href.startsWith("/") && !href.startsWith("#")) {
        continue;
      }

      const resolved = new URL(href, `http://localhost${sourceRoute}`);
      const targetRoute = resolved.pathname;
      assert.ok(
        knownRoutes.has(targetRoute),
        `${sourceRoute} links to missing route ${targetRoute}`,
      );

      if (resolved.hash) {
        const targetBody = renderedPages.get(targetRoute);
        const id = resolved.hash.slice(1);
        assert.match(
          targetBody,
          new RegExp(`\\bid=["']${id}["']`, "i"),
          `${sourceRoute} links to missing section ${resolved.hash} on ${targetRoute}`,
        );
      }
    }
  }
});

test("publishes complete sitemap and robots directives", async () => {
  const worker = await loadWorker();
  const sitemapResponse = await render(worker, "/sitemap.xml", "application/xml");
  const sitemapBody = await sitemapResponse.text();

  assert.equal(sitemapResponse.status, 200);
  for (const route of contentRoutes) {
    const canonicalPath = route === "/" ? "" : route;
    assert.ok(
      sitemapBody.includes(`https://unclesamjunkremoval.com${canonicalPath}`),
      `sitemap should include ${route}`,
    );
  }

  const robotsResponse = await render(worker, "/robots.txt", "text/plain");
  const robotsBody = await robotsResponse.text();

  assert.equal(robotsResponse.status, 200);
  assert.match(robotsBody, /Allow:\s*\//i);
  assert.match(robotsBody, /Disallow:\s*\/api\//i);
  for (const userAgent of [
    "OAI-SearchBot",
    "GPTBot",
    "ClaudeBot",
    "PerplexityBot",
    "Google-Extended",
    "Applebot-Extended",
    "Meta-ExternalAgent",
  ]) {
    assert.match(
      robotsBody,
      new RegExp(`User-Agent:\\s*${userAgent}`, "i"),
      `robots.txt should explicitly allow ${userAgent}`,
    );
  }
  assert.match(
    robotsBody,
    /Sitemap:\s*https:\/\/unclesamjunkremoval\.com\/sitemap\.xml/i,
  );
});

test("permanently redirects the legacy URL set into the redesign", async () => {
  const worker = await loadWorker();
  const redirects = new Map([
    ["/pricing", "/#pricing"],
    ["/quote", "/#quote"],
    ["/cleaning/deep-clean", "/services/cleaning"],
    ["/locations/evansville", "/locations/evansville-in"],
    [
      "/blog/shed-removal-guide-evansville",
      "/services/shed-removal",
    ],
    [
      "/blog/winter-storm-cleanup-guide-tri-state",
      "/services/storm-debris-cleanup",
    ],
  ]);

  for (const [source, destination] of redirects) {
    const response = await render(worker, source);
    assert.equal(response.status, 308, `${source} should redirect permanently`);
    assert.equal(
      response.headers.get("location"),
      `http://localhost${destination}`,
      `${source} should redirect to ${destination}`,
    );
  }
});

test("publishes concise and full AI-readable site indexes", async () => {
  const worker = await loadWorker();
  const summaryResponse = await render(worker, "/llms.txt", "text/plain");
  const fullResponse = await render(worker, "/llms-full.txt", "text/plain");
  const summary = await summaryResponse.text();
  const full = await fullResponse.text();

  assert.equal(summaryResponse.status, 200);
  assert.equal(fullResponse.status, 200);
  assert.match(summaryResponse.headers.get("content-type") ?? "", /^text\/plain/i);
  assert.match(fullResponse.headers.get("content-type") ?? "", /^text\/plain/i);
  assert.match(summary, /Uncle Sam Junk Removal/);
  assert.match(summary, /services\/shed-removal/);
  assert.match(full, /### Furniture Removal/);
  assert.match(full, /### Shed Removal/);
  assert.match(full, /locations\/evansville-in/);
  assert.match(full, /locations\/new-harmony-in/);
});

test("uses fluid type and mobile-friendly form controls", async () => {
  const css = await readFile(
    new URL("../app/globals.css", import.meta.url),
    "utf8",
  );

  assert.match(css, /--text-hero:\s*clamp\(/);
  assert.match(css, /--text-section:\s*clamp\(/);
  assert.match(css, /\.quote-panel input,[\s\S]*?font-size:\s*16px;/);
  assert.match(css, /@media\s*\(max-width:\s*860px\)/);
  assert.match(css, /@media\s*\(max-width:\s*600px\)/);
  assert.match(css, /@media\s*\(max-width:\s*420px\)/);
  assert.match(css, /overflow-x:\s*clip;/);
  assert.match(
    css,
    /\.quick-service-picker > div\s*\{[\s\S]*?grid-template-columns:\s*1fr 1fr;/,
  );
});

test("resets internal page navigation to the top while preserving section links", async () => {
  const source = await readFile(
    new URL("../app/components/route-scroll-manager.tsx", import.meta.url),
    "utf8",
  );

  assert.match(source, /usePathname/);
  assert.match(source, /window\.location\.hash/);
  assert.match(source, /destination\.hash/);
  assert.match(source, /window\.scrollTo\(\{\s*top:\s*0/);
  assert.match(source, /scrollIntoView\(\{\s*block:\s*"start"/);
});

test("ships Beacon contact/storm and locked about/faq/dumpster hubs", async () => {
  const worker = await loadWorker();

  const contact = await render(worker, "/contact");
  const contactBody = await contact.text();
  assert.equal(contact.status, 200);
  assert.match(
    contactBody,
    /<title>Contact Uncle Sam Junk Removal \| Evansville, IN<\/title>/i,
  );
  assert.match(
    contactBody,
    /<h1[^>]*>Contact Uncle Sam Junk Removal<\/h1>/i,
  );
  assert.match(contactBody, /"@type":"ContactPage"/i);

  const storm = await render(worker, "/services/storm-debris-cleanup");
  const stormBody = await storm.text();
  assert.equal(storm.status, 200);
  assert.match(
    stormBody,
    /<title>Storm Damage Cleanup &amp; Debris Removal \| Evansville Tri-State<\/title>/i,
  );
  assert.match(
    stormBody,
    /<h1[^>]*>Storm damage cleanup and debris removal<\/h1>/i,
  );

  const about = await render(worker, "/about");
  const aboutBody = await about.text();
  assert.equal(about.status, 200);
  assert.match(
    aboutBody,
    /<title>About Uncle Sam Junk Removal \| Evansville, IN<\/title>/i,
  );
  assert.match(aboutBody, /<h1[^>]*>About Uncle Sam Junk Removal<\/h1>/i);
  assert.match(aboutBody, /"@type":"AboutPage"/i);
  assert.doesNotMatch(aboutBody, /"@type":"LocalBusiness"/i);
  assert.doesNotMatch(aboutBody, /AggregateRating/i);

  const faq = await render(worker, "/faq");
  const faqBody = await faq.text();
  assert.equal(faq.status, 200);
  assert.match(
    faqBody,
    /<title>Junk Removal FAQs \| Uncle Sam Junk Removal<\/title>/i,
  );
  assert.match(faqBody, /<h1[^>]*>Junk removal questions, answered<\/h1>/i);
  assert.match(faqBody, /"@type":"FAQPage"/i);
  assert.match(
    faqBody,
    /Is Evansville city heavy trash free for my address\?/i,
  );
  assert.doesNotMatch(faqBody, /How does pricing work\?/i);
  assert.doesNotMatch(faqBody, /What items can you take\?/i);
  assert.match(faqBody, /href=["']\/junk-removal-vs-dumpster["']/i);
  assert.match(faqBody, /href=["']\/locations["']/i);

  const homeBody = await (await render(worker, "/")).text();
  function faqPageQuestions(html) {
    return [
      ...html.matchAll(/"@type":"Question"[\s\S]*?"name":"([^"]+)"/g),
    ].map((match) => match[1]);
  }
  const homeQuestions = faqPageQuestions(homeBody);
  const hubQuestions = faqPageQuestions(faqBody);
  assert.equal(homeQuestions.length, 8, "homepage keeps its eight FAQPage questions");
  assert.equal(hubQuestions.length, 10, "/faq hub publishes ten unique FAQPage questions");
  const overlap = homeQuestions.filter((question) =>
    hubQuestions.includes(question),
  );
  assert.deepEqual(
    overlap,
    [],
    "homepage and /faq must not emit the same FAQPage Question names",
  );

  const dumpster = await render(worker, "/junk-removal-vs-dumpster");
  const dumpsterBody = await dumpster.text();
  assert.equal(dumpster.status, 200);
  assert.match(
    dumpsterBody,
    /<title>Junk Removal vs a Dumpster \| Evansville Tri-State<\/title>/i,
  );
  assert.match(
    dumpsterBody,
    /<h1[^>]*>Junk removal vs renting a dumpster<\/h1>/i,
  );

  const newburgh = await render(worker, "/locations/newburgh-in");
  const newburghBody = await newburgh.text();
  assert.match(
    newburghBody,
    /<title>Garage Cleanout &amp; Junk Removal in Newburgh, IN \| Uncle Sam Junk Removal<\/title>/i,
  );
  assert.match(
    newburghBody,
    /<h1[^>]*>Garage cleanout and junk removal in Newburgh, IN\.<\/h1>/i,
  );
  assert.match(newburghBody, /not an Evansville page with the city name swapped/i);
  assert.doesNotMatch(newburghBody, /Does city heavy trash stop in the fall\?/i);
  assert.match(newburghBody, /Do I need to be home\?/i);

  const evansville = await render(worker, "/locations/evansville-in");
  const evansvilleBody = await evansville.text();
  assert.match(
    evansvilleBody,
    /<title>Junk Removal Evansville, IN \| East Side to Downtown Pickup<\/title>/i,
  );
  assert.match(
    evansvilleBody,
    /<h1[^>]*>Junk removal in Evansville, from downtown to the east side\.<\/h1>/i,
  );
  assert.match(evansvilleBody, /Does city heavy trash stop in the fall\?/i);
  assert.match(evansvilleBody, /Do I need to be home\?/i);

  const henderson = await render(worker, "/locations/henderson-ky");
  const hendersonBody = await henderson.text();
  assert.match(
    hendersonBody,
    /<h1[^>]*>Henderson junk removal on a Kentucky route, not an Evansville daily loop\.<\/h1>/i,
  );
  assert.doesNotMatch(
    hendersonBody,
    /<h1[^>]*>Junk removal in Henderson, KY\.<\/h1>/i,
  );

  const owensboro = await render(worker, "/locations/owensboro-ky");
  const owensboroBody = await owensboro.text();
  assert.match(
    owensboroBody,
    /<h1[^>]*>Owensboro junk removal farther downriver than Henderson\.<\/h1>/i,
  );

  const princeton = await render(worker, "/locations/princeton-in");
  const princetonBody = await princeton.text();
  assert.match(
    princetonBody,
    /<h1[^>]*>Princeton junk removal when the Gibson County truck is running\.<\/h1>/i,
  );
});

test("near-duplicate GSC URLs are not city-name-swap templates", async () => {
  const worker = await loadWorker();
  const cityTokens =
    /evansville|henderson|owensboro|princeton|newburgh|boonville|kentucky|indiana|\bin\b|\bky\b/gi;

  function normalize(text) {
    return text
      .toLowerCase()
      .replace(cityTokens, "")
      .replace(/[^a-z0-9]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  async function pageBits(path) {
    const body = await (await render(worker, path)).text();
    const title = body.match(/<title>([^<]+)<\/title>/i)?.[1] ?? "";
    const h1 = body.match(/<h1[^>]*>([^<]+)<\/h1>/i)?.[1] ?? "";
    const local = body.match(
      /Local service[\s\S]*?<h2[^>]*>([\s\S]*?)<\/h2>[\s\S]*?<p class=["']detail-lead["']>([\s\S]*?)<\/p>/i,
    );
    const about = body.match(
      /About this service[\s\S]*?<h2[^>]*>([\s\S]*?)<\/h2>[\s\S]*?<p class=["']detail-lead["']>([\s\S]*?)<\/p>/i,
    );
    const first = `${local?.[1] ?? about?.[1] ?? ""} ${local?.[2] ?? about?.[2] ?? ""}`;
    return {
      title: normalize(title),
      h1: normalize(h1),
      first: normalize(first),
    };
  }

  const locationPages = await Promise.all(
    [
      "/locations/evansville-in",
      "/locations/henderson-ky",
      "/locations/owensboro-ky",
      "/locations/princeton-in",
    ].map(pageBits),
  );
  const locationH1s = new Set(locationPages.map((page) => page.h1));
  const locationFirsts = new Set(locationPages.map((page) => page.first));
  assert.equal(
    locationH1s.size,
    locationPages.length,
    "location H1s must stay unique after stripping city tokens",
  );
  assert.equal(
    locationFirsts.size,
    locationPages.length,
    "location first sections must stay unique after stripping city tokens",
  );

  const servicePages = await Promise.all(
    [
      "/services/appliance-removal",
      "/services/furniture-removal",
      "/services/office-cleanouts",
      "/services/restaurant-equipment-removal",
    ].map(pageBits),
  );
  const serviceH1s = new Set(servicePages.map((page) => page.h1));
  const serviceFirsts = new Set(servicePages.map((page) => page.first));
  assert.equal(
    serviceH1s.size,
    servicePages.length,
    "service H1s must stay unique after stripping city tokens",
  );
  assert.equal(
    serviceFirsts.size,
    servicePages.length,
    "service first sections must stay unique after stripping city tokens",
  );
});
