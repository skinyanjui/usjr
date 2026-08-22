"use client";

import { useEffect } from "react";
import { WEBMCP_QUOTE_DRAFT_EVENT } from "./webmcp-tools";

type QuoteDraft = {
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  service?: string;
  urgency?: string;
  preferredDate?: string;
  quantity?: string;
  notes?: string;
};

function setNativeValue(
  element: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
  value: string,
) {
  const prototype =
    element instanceof HTMLTextAreaElement
      ? HTMLTextAreaElement.prototype
      : element instanceof HTMLSelectElement
        ? HTMLSelectElement.prototype
        : HTMLInputElement.prototype;
  const setter = Object.getOwnPropertyDescriptor(prototype, "value")?.set;
  if (setter) setter.call(element, value);
  else element.value = value;
  element.dispatchEvent(new Event("input", { bubbles: true }));
  element.dispatchEvent(new Event("change", { bubbles: true }));
}

function field(selector: string) {
  return document.querySelector<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >(`#quote ${selector}`);
}

function clickChoice(label: string) {
  const buttons = Array.from(
    document.querySelectorAll<HTMLButtonElement>("#quote button.form-choice"),
  );
  const target = buttons.find(
    (button) => button.textContent?.trim().toLowerCase() === label.toLowerCase(),
  );
  target?.click();
}

function urgencyLabel(value?: string) {
  const labels: Record<string, string> = {
    today: "Today",
    "within-2-3-days": "Within 2–3 days",
    "choose-date": "Choose a date",
    flexible: "Flexible",
  };
  return value ? labels[value] : undefined;
}

export function WebMcpQuoteBridge() {
  useEffect(() => {
    function applyDraft(event: Event) {
      const draft = (event as CustomEvent<QuoteDraft>).detail || {};

      const writes: Array<[string, string | undefined]> = [
        ['[data-quote-field="name"]', draft.name],
        ['[data-quote-field="phone"]', draft.phone],
        ['[data-quote-field="email"]', draft.email],
        ['[data-quote-field="address"]', draft.address],
        ['[data-quote-field="service"]', draft.service],
        ['[data-quote-field="quantity"]', draft.quantity],
      ];

      for (const [selector, value] of writes) {
        if (!value) continue;
        const element = field(selector);
        if (element) setNativeValue(element, value);
      }

      const timing = urgencyLabel(draft.urgency);
      if (timing) clickChoice(timing);

      if (draft.preferredDate) {
        window.requestAnimationFrame(() => {
          const preferredDate = field('[data-quote-field="preferredDate"]');
          if (preferredDate) setNativeValue(preferredDate, draft.preferredDate || "");
        });
      }

      if (draft.notes) {
        const notes = field("textarea");
        if (notes) setNativeValue(notes, draft.notes);
      }

      // Intentionally never touch the consent checkbox or submit button.
      document
        .querySelector<HTMLElement>('#quote [data-quote-field="name"]')
        ?.focus({ preventScroll: true });
    }

    window.addEventListener(WEBMCP_QUOTE_DRAFT_EVENT, applyDraft);
    return () =>
      window.removeEventListener(WEBMCP_QUOTE_DRAFT_EVENT, applyDraft);
  }, []);

  return null;
}
