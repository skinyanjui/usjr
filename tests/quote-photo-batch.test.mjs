import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const quoteServer = readFileSync(join(root, "lib/quote-server.ts"), "utf8");
const quoteSection = readFileSync(
  join(root, "app/components/quote-section.tsx"),
  "utf8",
);

test("quote photo handler sends one batched email, not per-image emails", () => {
  assert.match(quoteServer, /collectPhotoFiles/);
  assert.match(quoteServer, /photoAttachments/);
  assert.match(quoteServer, /All photos from this upload are attached/);
  assert.doesNotMatch(
    quoteServer,
    /Photo \$\{index\} of \$\{total\}/,
  );
  assert.doesNotMatch(
    quoteServer,
    /quote-photo\/\$\{reference\}\/\$\{index\}/,
  );
});

test("quote request accepts multipart photos on the business email", () => {
  assert.match(quoteServer, /multipart\/form-data/);
  assert.match(quoteServer, /photosSent: attachments\.length/);
  assert.match(quoteServer, /Photos attached: \$\{attachments\.length\}/);
  assert.match(quoteServer, /project photo/);
});

test("quote form submits photos with the quote payload in one request", () => {
  assert.match(quoteSection, /body\.append\("payload"/);
  assert.match(quoteSection, /body\.append\("photo"/);
  assert.match(quoteSection, /submitQuoteRequest/);
  assert.doesNotMatch(
    quoteSection,
    /await sendPhotos\(payload\.reference, photos\)/,
  );
});
