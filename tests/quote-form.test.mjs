import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const quoteSection = readFileSync(
  join(root, "app/components/quote-section.tsx"),
  "utf8",
);
const quoteServer = readFileSync(join(root, "lib/quote-server.ts"), "utf8");
const siteChrome = readFileSync(
  join(root, "app/components/site-chrome.tsx"),
  "utf8",
);
const globalsCss = readFileSync(join(root, "app/globals.css"), "utf8");

test("quote form does not force the camera or require three photos", () => {
  assert.doesNotMatch(quoteSection, /capture=["']environment["']/);
  assert.doesNotMatch(
    quoteSection,
    /Add at least 3 photos, or remove them and submit without photos\./,
  );
  assert.match(quoteSection, /Optional · 1–8 if added/);
});

test("quote form keeps submit enabled until sending", () => {
  assert.doesNotMatch(quoteSection, /disabled=\{disabled \|\| !form\.service\}/);
  assert.match(quoteSection, /disabled=\{disabled\}/);
});

test("quote form requires email and exposes stable field ids", () => {
  assert.match(quoteSection, /id=\{quoteFieldIds\.name\}/);
  assert.match(quoteSection, /id=\{quoteFieldIds\.email\}/);
  assert.match(quoteSection, /id=\{quoteFieldIds\.service\}/);
  assert.match(quoteSection, /id=\{quoteFieldIds\.photos\}/);
  assert.match(quoteSection, /className="field-error"/);
  assert.match(quoteSection, /aria-describedby=\{quoteFieldDescribedBy\(/);
  assert.match(
    quoteSection,
    /if \(!\/\^\[\\^\\s@\]\+@\[\\^\\s@\]\+\\.\[\\^\\s@\]\+\$\/\.test\(form\.email\.trim\(\)\)\)/,
  );
  assert.doesNotMatch(quoteSection, /form\.email\.trim\(\)\.length > 0/);
  const emailInput = quoteSection.match(
    /data-quote-field="email"[\s\S]*?\/>/,
  )?.[0];
  assert.ok(emailInput);
  assert.match(emailInput, /\brequired\b/);
});

test("quote form shows photos before service-specific fields", () => {
  const photosIndex = quoteSection.indexOf('id={quoteFieldIds.photos}');
  const progressiveIndex = quoteSection.indexOf('className="quote-progressive"');
  assert.ok(photosIndex > -1);
  assert.ok(progressiveIndex > -1);
  assert.ok(photosIndex < progressiveIndex);
});

test("quote form alert lists linked field errors and avoids first-field focus", () => {
  assert.match(quoteSection, /className="form-alert__errors"/);
  assert.match(quoteSection, /<a href=\{`#\$\{fieldId\}`\}>\{message\}<\/a>/);
  assert.doesNotMatch(
    quoteSection,
    /querySelector<HTMLElement>\(`\[data-quote-field="\$\{firstKey\}"\]`\)/,
  );
});

test("site chrome keeps contact and service quote CTAs on the current page", () => {
  assert.match(siteChrome, /quoteCtaHrefForPath/);
  assert.match(siteChrome, /href=\{quoteHref\}/);
});

test("quote server requires email and allows one photo minimum", () => {
  assert.match(
    quoteServer,
    /function validEmail\(value: string\) \{\s*return \/\^\[\\^\\s@\]\+@\[\\^\\s@\]\+\\.\[\\^\\s@\]\+\$\/\.test\(value\);\s*\}/,
  );
  assert.doesNotMatch(
    quoteServer,
    /if \(!value\.trim\(\)\) \{\s*return true;\s*\}/,
  );
  assert.match(quoteServer, /minimumWhenPresent \?\? 1/);
  assert.match(quoteServer, /Use 1–8 JPG, PNG, or HEIC photos/);
});

test("quote form success card confirms receipt without old request headline", () => {
  assert.match(quoteSection, /We got your quote request/);
  assert.match(
    quoteSection,
    /Check your email for \{result\.reference\}/,
  );
  assert.match(
    quoteSection,
    /Monday&ndash;Saturday, 8&nbsp;a\.m\.&ndash;5&nbsp;p\.m\./,
  );
  assert.doesNotMatch(quoteSection, /Request \{result\.reference\} received/);
  assert.match(quoteSection, /emailPlanningRange\(/);
  assert.match(quoteSection, /planningRange: emailPlanningRange/);
});

test("quote server sends locked customer copy and business lead metadata", () => {
  assert.match(quoteServer, /Your quote request \$\{reference\} \| Uncle Sam Junk Removal/);
  assert.match(quoteServer, /We got your quote request\. This message is not the final price/);
  assert.match(quoteServer, /Monday&ndash;Saturday, 8&nbsp;a\.m\.&ndash;5&nbsp;p\.m\./);
  assert.match(
    quoteServer,
    /Planning range for this kind of job: \$\{planningRange\}/,
  );
  assert.match(
    quoteServer,
    /We'll price it from the photos and access details you sent/,
  );
  assert.doesNotMatch(quoteServer, /Request received/);
  assert.match(quoteServer, /Received: \$\{formatReceivedAtChicago\(receivedAt\)\}/);
  assert.match(quoteServer, /Email customer: \$\{data\.email\}/);
  assert.match(quoteServer, /mailto:\$\{escapeHtml\(data\.email\)\}/);
  assert.match(quoteServer, /planningRange: string/);
});

test("quote form styles meet disabled and border contrast requirements", () => {
  assert.match(globalsCss, /\.button:disabled \{[\s\S]*?color: var\(--ink\);/);
  assert.match(
    globalsCss,
    /form\[aria-busy="true"\] \.button\[type="submit"\]:disabled \{[\s\S]*?cursor: wait;/,
  );
  assert.match(globalsCss, /\.quote-panel input,[\s\S]*?border: 1px solid var\(--muted\);/);
  assert.match(globalsCss, /\.form-choice \{[\s\S]*?border: 1px solid var\(--muted\);/);
  assert.match(
    globalsCss,
    /\.quote-panel \.photo-picker \{[\s\S]*?border: 1\.5px dashed var\(--muted\);/,
  );
});
