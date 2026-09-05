"use client";

import * as amplitude from "@amplitude/unified";
import type { ChangeEvent, ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { formatPriceRange, getPublicPricingTier } from "../pricing-data";
import { phoneDisplay, phoneHref, services } from "../site-data";
import styles from "./quote-engine.module.css";

const quoteServiceEvent = "uncle-sam:quote-service";
const maxPhotos = 8;
const maxPhotoBytes = 3_500_000;

const acceptedPhotoTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/heic",
  "image/heif",
]);
const acceptedPhotoExtensions = /\.(jpe?g|png|heic|heif)$/i;

type JobType =
  | "items"
  | "appliances"
  | "garage"
  | "property"
  | "special"
  | "debris";
type PickupLocation =
  | "curb"
  | "garage"
  | "inside"
  | "basement"
  | "upstairs"
  | "backyard";
type Timing = "today" | "within-2-3-days" | "choose-date" | "flexible";
type ContactMethod = "call" | "text" | "email";
type PublicLoadSize = "single_item" | "quarter_load" | "half_load" | "full_load";

type ItemDefinition = {
  id: string;
  name: string;
  volume: number;
  fee?: number;
};

type SizeChoice = {
  id: string;
  label: string;
  detail: string;
  loadSize?: PublicLoadSize;
  review?: boolean;
  fill: 1 | 2 | 3 | 4;
};

type PhotoItem = {
  file: File;
  id: string;
  name: string;
  previewUrl: string;
};

type QuoteView = {
  cta: string;
  confidence: number;
  confidenceLabel: string;
  high?: number;
  loadLabel: string;
  low?: number;
  mode: "empty" | "details" | "zip" | "location" | "estimate" | "review";
  note: string;
  price: string;
  title: string;
};

const jobTiles: Array<{
  id: JobType;
  label: string;
  detail: string;
  icon: "sofa" | "appliance" | "garage" | "home" | "heavy";
}> = [
  { id: "items", label: "A few items", detail: "Furniture + household", icon: "sofa" },
  { id: "appliances", label: "Appliances", detail: "Fridge, washer + more", icon: "appliance" },
  { id: "garage", label: "Garage / storage", detail: "Mixed clutter + boxes", icon: "garage" },
  { id: "property", label: "Whole property", detail: "Estate + cleanout", icon: "home" },
  { id: "special", label: "Big / awkward", detail: "Hot tub, shed, piano, safe", icon: "heavy" },
];

const itemsCatalog: ItemDefinition[] = [
  { id: "sofa", name: "Sofa / couch", volume: 50 },
  { id: "sectional", name: "Sectional", volume: 80, fee: 10 },
  { id: "recliner", name: "Recliner", volume: 25 },
  { id: "mattress", name: "Mattress", volume: 30, fee: 25 },
  { id: "dresser", name: "Dresser", volume: 24 },
  { id: "table", name: "Table", volume: 24 },
  { id: "tv", name: "TV", volume: 8, fee: 8 },
  { id: "boxes", name: "Bags / boxes", volume: 16 },
];

const applianceCatalog: ItemDefinition[] = [
  { id: "fridge", name: "Refrigerator", volume: 30, fee: 45 },
  { id: "washer", name: "Washer", volume: 18, fee: 10 },
  { id: "dryer", name: "Dryer", volume: 20, fee: 10 },
  { id: "stove", name: "Range / stove", volume: 20, fee: 10 },
  { id: "dishwasher", name: "Dishwasher", volume: 14, fee: 10 },
  { id: "freezer", name: "Freezer", volume: 28, fee: 35 },
  { id: "microwave", name: "Microwave", volume: 5, fee: 5 },
  { id: "ac", name: "Window A/C", volume: 5, fee: 15 },
];

const garageSizes: SizeChoice[] = [
  { id: "small", label: "Small corner", detail: "A few boxes + pieces", loadSize: "single_item", fill: 1 },
  { id: "quarter", label: "About ¼ full", detail: "Compact pickup-sized pile", loadSize: "quarter_load", fill: 2 },
  { id: "half", label: "About ½ full", detail: "Bulky pieces + boxes", loadSize: "half_load", fill: 3 },
  { id: "full", label: "Mostly full", detail: "Major garage cleanout", loadSize: "full_load", fill: 4 },
];

const propertySizes: SizeChoice[] = [
  { id: "rooms-1-2", label: "1–2 rooms", detail: "Partial cleanout", loadSize: "half_load", fill: 1 },
  { id: "rooms-3-5", label: "3–5 rooms", detail: "Small-home cleanout", loadSize: "full_load", fill: 2 },
  { id: "rooms-6-plus", label: "6+ rooms", detail: "Large property", review: true, fill: 3 },
  { id: "estate", label: "Whole estate", detail: "House + garage", review: true, fill: 4 },
];

const specialItems = [
  { id: "hot-tub", label: "Hot tub", service: "Hot Tub Removal" },
  { id: "shed", label: "Shed", service: "Shed Removal" },
  { id: "piano", label: "Piano", service: "Something else" },
  { id: "safe", label: "Safe", service: "Something else" },
  { id: "other", label: "Something else", service: "Something else" },
] as const;

const debrisChoices = [
  { id: "drywall", label: "Drywall / light demo", detail: "Sheetrock + trim" },
  { id: "wood", label: "Lumber / fencing", detail: "Wood + decking" },
  { id: "shingles", label: "Roof shingles", detail: "Weight-aware" },
  { id: "concrete", label: "Concrete / brick / dirt", detail: "Dense material" },
] as const;

const debrisAmounts = [
  { value: "buckets", label: "About 5 buckets", loadSize: "single_item" as PublicLoadSize },
  { value: "wheelbarrow", label: "1 wheelbarrow", loadSize: "single_item" as PublicLoadSize },
  { value: "quarter", label: "¼ pickup bed", loadSize: "quarter_load" as PublicLoadSize },
  { value: "half", label: "½ pickup bed", loadSize: "half_load" as PublicLoadSize },
  { value: "full", label: "1 pickup bed", loadSize: "full_load" as PublicLoadSize },
];

const pickupLocations: Array<{
  id: PickupLocation;
  label: string;
  icon: string;
  placement: "indoor" | "outdoor";
  adjustment: number;
}> = [
  { id: "curb", label: "Curb", icon: "↘", placement: "outdoor", adjustment: -25 },
  { id: "garage", label: "Garage", icon: "▤", placement: "indoor", adjustment: 0 },
  { id: "inside", label: "Inside", icon: "⌂", placement: "indoor", adjustment: 20 },
  { id: "basement", label: "Basement", icon: "↓", placement: "indoor", adjustment: 55 },
  { id: "upstairs", label: "Upstairs", icon: "↑", placement: "indoor", adjustment: 55 },
  { id: "backyard", label: "Backyard", icon: "◇", placement: "outdoor", adjustment: 30 },
];

const timingOptions: Array<{ id: Timing; label: string }> = [
  { id: "today", label: "Today" },
  { id: "within-2-3-days", label: "2–3 days" },
  { id: "choose-date", label: "Choose date" },
  { id: "flexible", label: "Flexible" },
];

const extraOptions = [
  { id: "stairs", label: "Extra stairs", adjustment: 35 },
  { id: "long-carry", label: "Long carry", adjustment: 25 },
  { id: "tight-doorway", label: "Tight doorway", adjustment: 25 },
  { id: "limited-access", label: "Truck can’t park close", adjustment: 30 },
  { id: "disassembly", label: "Needs disassembly", adjustment: 45 },
  { id: "hazard", label: "Needles / chemicals", adjustment: 0 },
] as const;

type ExtraId = (typeof extraOptions)[number]["id"];

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

function randomId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random()}`;
}

function quoteApiUrl(path: string) {
  if (
    typeof window !== "undefined" &&
    window.location.hostname.endsWith(".chatgpt.site")
  ) {
    return `https://unclesamjunkremoval.com${path}`;
  }
  return path;
}

function trackQuoteEvent(
  event: string,
  properties: Record<string, string | number | boolean | undefined> = {},
) {
  if (typeof window === "undefined") return;

  try {
    amplitude.track(event, properties);
  } catch {
    // Analytics must never block the quote flow.
  }

  const analyticsWindow = window as typeof window & {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
    plausible?: (event: string, options?: { props: Record<string, unknown> }) => void;
  };
  analyticsWindow.dataLayer?.push({ event, ...properties });
  analyticsWindow.gtag?.("event", event, properties);
  analyticsWindow.plausible?.(event, { props: properties });
}

function jobForService(service: string): JobType {
  if (/Appliance/i.test(service)) return "appliances";
  if (/Garage|Storage Unit/i.test(service)) return "garage";
  if (/Estate|Office Cleanout|Property Management Turnover/i.test(service)) return "property";
  if (/Hot Tub|Shed/i.test(service)) return "special";
  if (/Light Demolition|Yard Waste|Storm Debris/i.test(service)) return "debris";
  return "items";
}

function serviceForJob(job: JobType | null, special: string) {
  if (job === "appliances") return "Appliance Removal";
  if (job === "garage") return "Garage Cleanout";
  if (job === "property") return "Estate Cleanouts";
  if (job === "debris") return "Light Demolition";
  if (job === "special") {
    return specialItems.find((item) => item.id === special)?.service || "Something else";
  }
  return "Junk Removal";
}

function JobIcon({ kind }: { kind: (typeof jobTiles)[number]["icon"] }) {
  const common = { className: styles.icon, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7 };
  if (kind === "sofa") {
    return <svg {...common}><path d="M5 11h14v7H5z"/><path d="M7 11V8.5A2.5 2.5 0 0 1 9.5 6h5A2.5 2.5 0 0 1 17 8.5V11M7 18v2M17 18v2"/></svg>;
  }
  if (kind === "appliance") {
    return <svg {...common}><rect x="6" y="3" width="12" height="18" rx="2"/><path d="M6 9h12M9 6h1"/></svg>;
  }
  if (kind === "garage") {
    return <svg {...common}><path d="M4 10 12 4l8 6v10H4z"/><path d="M7 13h10M7 16h10M7 19h10"/></svg>;
  }
  if (kind === "home") {
    return <svg {...common}><path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10.5V20h13v-9.5M9 20v-6h6v6"/></svg>;
  }
  return <svg {...common}><path d="M12 3 3 19h18L12 3Z"/><path d="M12 9v4M12 16.5h.01"/></svg>;
}

function CameraIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M4 7h4l1.4-2h5.2L16 7h4v12H4z" />
      <circle cx="12" cy="13" r="3.2" />
    </svg>
  );
}

function loadImage(file: File) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    const objectUrl = URL.createObjectURL(file);
    image.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Could not prepare that photo."));
    };
    image.src = objectUrl;
  });
}

async function compressPhoto(file: File) {
  if (
    file.type === "image/heic" ||
    file.type === "image/heif" ||
    /\.hei[cf]$/i.test(file.name)
  ) {
    if (file.size <= maxPhotoBytes) return file;
    throw new Error(`${file.name} is over 3.5 MB.`);
  }

  try {
    const image = await loadImage(file);
    const scale = Math.min(1, 1600 / Math.max(image.naturalWidth, image.naturalHeight));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Photo preparation is unavailable.");
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.78));
    if (!blob) throw new Error("Photo preparation failed.");
    const compressed = new File(
      [blob],
      file.name.replace(/\.(png|jpe?g)$/i, "") + ".jpg",
      { type: "image/jpeg", lastModified: file.lastModified },
    );
    if (compressed.size <= maxPhotoBytes) {
      return compressed.size < file.size || file.size > maxPhotoBytes ? compressed : file;
    }
  } catch {
    if (file.size <= maxPhotoBytes) return file;
  }
  throw new Error(`${file.name} is too large. Choose a photo under 3.5 MB.`);
}

function isAcceptedPhoto(file: File) {
  return acceptedPhotoTypes.has(file.type.toLowerCase()) || acceptedPhotoExtensions.test(file.name);
}

function adjustRange(low: number, high: number, adjustment: number) {
  return {
    low: Math.max(89, Math.round(low + adjustment)),
    high: Math.max(119, Math.round(high + adjustment)),
  };
}

function rangeForVolume(volume: number): PublicLoadSize | "review" {
  if (volume <= 50) return "single_item";
  if (volume <= 115) return "quarter_load";
  if (volume <= 225) return "half_load";
  if (volume <= 450) return "full_load";
  return "review";
}

function StepLabel({ active, done, children }: { active: boolean; done: boolean; children: ReactNode }) {
  return <span className={cx(styles.step, active && styles.stepActive, done && styles.stepDone)}>{children}</span>;
}

export function QuoteEngine() {
  const sectionRef = useRef<HTMLElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const whereRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const startedAtRef = useRef(Date.now());
  const startedRef = useRef(false);
  const submissionIdRef = useRef(randomId());
  const previewUrlsRef = useRef<string[]>([]);

  const [job, setJob] = useState<JobType | null>(null);
  const [items, setItems] = useState<Record<string, number>>({});
  const [size, setSize] = useState("");
  const [special, setSpecial] = useState("");
  const [debris, setDebris] = useState("");
  const [debrisAmount, setDebrisAmount] = useState("");
  const [zip, setZip] = useState("");
  const [pickupLocation, setPickupLocation] = useState<PickupLocation | null>(null);
  const [timing, setTiming] = useState<Timing>("within-2-3-days");
  const [preferredDate, setPreferredDate] = useState("");
  const [extras, setExtras] = useState<ExtraId[]>([]);
  const [extrasOpen, setExtrasOpen] = useState(false);
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [isPreparingPhotos, setIsPreparingPhotos] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [preferredContact, setPreferredContact] = useState<ContactMethod>("text");
  const [consent, setConsent] = useState(false);
  const [company, setCompany] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reference, setReference] = useState("");
  const [dockExpanded, setDockExpanded] = useState(false);
  const [dockVisible, setDockVisible] = useState(false);

  const catalog = job === "appliances" ? applianceCatalog : itemsCatalog;
  const totalItems = Object.values(items).reduce((sum, count) => sum + count, 0);

  useEffect(() => {
    previewUrlsRef.current = photos.map((photo) => photo.previewUrl).filter(Boolean);
  }, [photos]);

  useEffect(
    () => () => {
      for (const url of previewUrlsRef.current) URL.revokeObjectURL(url);
    },
    [],
  );

  useEffect(() => {
    const target = sectionRef.current;
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => setDockVisible(entry.isIntersecting && !reference),
      { rootMargin: "220px 0px 220px 0px", threshold: 0 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [reference]);

  useEffect(() => {
    function applyService(service: string) {
      if (!services.some((item) => item.quoteValue === service)) return;
      const nextJob = jobForService(service);
      setJob(nextJob);
      setItems({});
      setSize("");
      setDebris("");
      setDebrisAmount("");
      if (service === "Hot Tub Removal") setSpecial("hot-tub");
      else if (service === "Shed Removal") setSpecial("shed");
      else setSpecial("");
      markStarted("service-link");
      requestAnimationFrame(() => sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
    }

    const params = new URLSearchParams(window.location.search);
    const requestedService = params.get("service")?.trim() || "";
    const requestedLocation = params.get("location")?.trim() || "";
    if (requestedService) applyService(requestedService);
    if (/^\d{5}$/.test(requestedLocation)) setZip(requestedLocation);
    else if (requestedLocation) setAddress(requestedLocation.slice(0, 160));

    const listener = (event: Event) => applyService((event as CustomEvent<string>).detail);
    window.addEventListener(quoteServiceEvent, listener);
    return () => window.removeEventListener(quoteServiceEvent, listener);
  }, []);

  function markStarted(source = "quote-engine") {
    if (startedRef.current) return;
    startedRef.current = true;
    trackQuoteEvent("Started Quote", { source });
  }

  function chooseJob(nextJob: JobType) {
    markStarted();
    setJob(nextJob);
    setItems({});
    setSize("");
    setSpecial("");
    setDebris("");
    setDebrisAmount("");
    setFormError("");
    trackQuoteEvent("Selected Quote Job", { job_type: nextJob });
  }

  function changeItem(id: string, change: number) {
    markStarted();
    setItems((current) => {
      const next = Math.max(0, (current[id] || 0) + change);
      const updated = { ...current };
      if (next === 0) delete updated[id];
      else updated[id] = next;
      return updated;
    });
  }

  function toggleExtra(id: ExtraId) {
    markStarted();
    setExtras((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  const selectedSize = useMemo(() => {
    const source = job === "property" ? propertySizes : garageSizes;
    return source.find((item) => item.id === size) || null;
  }, [job, size]);

  const itemMetrics = useMemo(() => {
    let volume = 0;
    let fees = 0;
    for (const [id, count] of Object.entries(items)) {
      const item = catalog.find((candidate) => candidate.id === id);
      if (!item) continue;
      volume += item.volume * count;
      fees += (item.fee || 0) * count;
    }
    return { fees, volume };
  }, [catalog, items]);

  const detailsReady = useMemo(() => {
    if (!job) return false;
    if (job === "items" || job === "appliances") return totalItems > 0;
    if (job === "garage" || job === "property") return Boolean(size);
    if (job === "special") return Boolean(special);
    return Boolean(debris && debrisAmount);
  }, [job, totalItems, size, special, debris, debrisAmount]);

  const zipReady = /^\d{5}$/.test(zip);
  const whereReady = detailsReady && zipReady && Boolean(pickupLocation);
  const hazardReview = extras.includes("hazard");

  const baseLoadSize = useMemo<PublicLoadSize | "review" | null>(() => {
    if (!job || !detailsReady) return null;
    if (job === "items" || job === "appliances") return rangeForVolume(itemMetrics.volume);
    if (job === "garage" || job === "property") {
      if (selectedSize?.review) return "review";
      return selectedSize?.loadSize || null;
    }
    if (job === "special") return "review";
    if (job === "debris") {
      if (debris === "concrete" || debris === "shingles" || debrisAmount === "full") return "review";
      return debrisAmounts.find((item) => item.value === debrisAmount)?.loadSize || "review";
    }
    return null;
  }, [job, detailsReady, itemMetrics.volume, selectedSize, debris, debrisAmount]);

  const manualReview = Boolean(baseLoadSize === "review" || hazardReview);

  const quote = useMemo<QuoteView>(() => {
    const fallback: QuoteView = {
      cta: "Start",
      confidence: 0,
      confidenceLabel: "Not started",
      loadLabel: "—",
      mode: "empty",
      note: "",
      price: "Choose a job",
      title: "Your estimate",
    };
    if (!job) return fallback;
    if (!detailsReady) {
      return { ...fallback, cta: "Add details", mode: "details", price: "Add details", title: "Your estimate" };
    }

    const loadLabel = baseLoadSize === "review"
      ? "Photo review"
      : getPublicPricingTier(baseLoadSize || "")?.label || "—";

    if (!zipReady) {
      return { ...fallback, cta: "Add ZIP", loadLabel, mode: "zip", price: "Add ZIP" };
    }
    if (!pickupLocation) {
      return { ...fallback, cta: "Choose location", loadLabel, mode: "location", price: "Choose location" };
    }

    let confidence = 66;
    if (job === "items" || job === "appliances") confidence += 8;
    if (photos.length) confidence += Math.min(20, photos.length * 5);
    if (job === "garage" || job === "property") confidence -= 5;
    if (job === "debris") confidence -= 8;
    if (manualReview) confidence -= 15;
    confidence = Math.max(30, Math.min(95, confidence));
    const confidenceLabel = confidence >= 82 ? "High" : confidence >= 60 ? "Medium" : "Review";

    if (manualReview || !baseLoadSize || baseLoadSize === "review") {
      return {
        cta: photos.length ? "Request review" : "Add photos",
        confidence,
        confidenceLabel,
        loadLabel,
        mode: "review",
        note: photos.length ? "Photos added" : "Photos required",
        price: "Review required",
        title: "Photo review",
      };
    }

    const tier = getPublicPricingTier(baseLoadSize);
    if (!tier) return fallback;
    const locationAdjustment = pickupLocations.find((item) => item.id === pickupLocation)?.adjustment || 0;
    const extrasAdjustment = extraOptions
      .filter((option) => extras.includes(option.id))
      .reduce((sum, option) => sum + option.adjustment, 0);
    const timingAdjustment = timing === "today" ? 45 : 0;
    const itemFees = job === "items" || job === "appliances" ? itemMetrics.fees : 0;
    const adjusted = adjustRange(tier.low, tier.high, locationAdjustment + extrasAdjustment + timingAdjustment + itemFees);

    return {
      cta: "Request pickup",
      confidence,
      confidenceLabel,
      high: adjusted.high,
      loadLabel: tier.label,
      low: adjusted.low,
      mode: "estimate",
      note: photos.length ? "Photos included" : "Add photos to tighten range",
      price: formatPriceRange(adjusted.low, adjusted.high),
      title: confidence >= 82 ? "High-confidence estimate" : "Estimated range",
    };
  }, [job, detailsReady, baseLoadSize, zipReady, pickupLocation, photos.length, manualReview, extras, timing, itemMetrics.fees]);

  const stage = !detailsReady ? 1 : !whereReady ? 2 : 3;
  const photoRequired = quote.mode === "review";
  const contactVisible = whereReady && (!photoRequired || photos.length > 0);
  const service = serviceForJob(job, special);

  const quantityLabel = useMemo(() => {
    if (!job) return "";
    if (job === "items" || job === "appliances") return `${totalItems} item${totalItems === 1 ? "" : "s"} · ${quote.loadLabel}`;
    if (job === "garage" || job === "property") return selectedSize?.label || "";
    if (job === "special") return specialItems.find((item) => item.id === special)?.label || "";
    return debrisAmounts.find((item) => item.value === debrisAmount)?.label || "";
  }, [job, totalItems, quote.loadLabel, selectedSize, special, debrisAmount]);

  function selectedItemSummary() {
    const source = job === "appliances" ? applianceCatalog : itemsCatalog;
    return Object.entries(items)
      .map(([id, count]) => {
        const item = source.find((candidate) => candidate.id === id);
        return item ? `${item.name} × ${count}` : "";
      })
      .filter(Boolean)
      .join(", ");
  }

  function conditionalDetails() {
    const details: Record<string, string> = {
      "Job type": jobTiles.find((tile) => tile.id === job)?.label || (job === "debris" ? "Construction debris" : ""),
      "Pickup position": pickupLocations.find((item) => item.id === pickupLocation)?.label || "",
    };
    if (job === "items" || job === "appliances") details["Selected items"] = selectedItemSummary();
    if (job === "garage" || job === "property") details["Visual size"] = selectedSize?.label || "";
    if (job === "special") details["Specialty item"] = specialItems.find((item) => item.id === special)?.label || "";
    if (job === "debris") {
      details["Material"] = debrisChoices.find((item) => item.id === debris)?.label || "";
      details["Rough amount"] = debrisAmounts.find((item) => item.value === debrisAmount)?.label || "";
    }
    if (quote.low && quote.high) details["Planning estimate"] = formatPriceRange(quote.low, quote.high);
    return Object.fromEntries(Object.entries(details).filter(([, value]) => value));
  }

  async function addPhotos(event: ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(event.target.files || []);
    event.target.value = "";
    if (!selected.length) return;
    markStarted();
    setFormError("");
    if (photos.length + selected.length > maxPhotos) {
      setFormError(`Choose no more than ${maxPhotos} photos.`);
      return;
    }
    if (selected.some((file) => !isAcceptedPhoto(file))) {
      setFormError("Use JPG, PNG, or HEIC photos.");
      return;
    }

    setIsPreparingPhotos(true);
    try {
      const prepared: PhotoItem[] = [];
      for (const original of selected) {
        const file = await compressPhoto(original);
        const previewable = file.type === "image/jpeg" || file.type === "image/png";
        prepared.push({
          file,
          id: randomId(),
          name: original.name,
          previewUrl: previewable ? URL.createObjectURL(file) : "",
        });
      }
      setPhotos((current) => [...current, ...prepared]);
      trackQuoteEvent("Added Quote Photos", { count: prepared.length, total: photos.length + prepared.length });
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Could not prepare those photos.");
    } finally {
      setIsPreparingPhotos(false);
    }
  }

  function removePhoto(id: string) {
    const photo = photos.find((item) => item.id === id);
    if (photo?.previewUrl) URL.revokeObjectURL(photo.previewUrl);
    setPhotos((current) => current.filter((item) => item.id !== id));
  }

  function scrollNext() {
    if (!job) {
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (!detailsReady) {
      detailsRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    if (!whereReady) {
      whereRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (photoRequired && photos.length === 0) {
      photoRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    contactRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function validateContact() {
    if (name.trim().length < 2) return "Add your name.";
    if (phone.replace(/\D/g, "").length < 7) return "Add a valid mobile number.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return "Add a valid email.";
    if (address.trim().length < 2) return "Add the pickup street address.";
    if (timing === "choose-date" && !preferredDate) return "Choose a pickup date.";
    if (photoRequired && photos.length === 0) return "Add at least one photo for review.";
    if (!consent) return "Confirm we may contact you about this request.";
    return "";
  }

  async function submitQuote() {
    if (isSubmitting || reference) return;
    markStarted();
    const error = validateContact();
    if (error) {
      setFormError(error);
      return;
    }

    const location = pickupLocations.find((item) => item.id === pickupLocation);
    const access = [
      location?.label || "",
      ...extraOptions.filter((option) => extras.includes(option.id)).map((option) => option.label),
    ].filter(Boolean);
    const fullAddress = address.includes(zip) ? address.trim() : `${address.trim()}, ${zip}`;
    const payload = {
      submissionId: submissionIdRef.current,
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      address: fullAddress,
      service,
      urgency: timing,
      preferredDate,
      quantity: quantityLabel || quote.loadLabel,
      placement: location?.placement || "unsure",
      access,
      heavyMaterials: job === "debris" || job === "special",
      dismantling: extras.includes("disassembly") || special === "hot-tub" || special === "shed",
      heavyDetails: hazardReview ? "Safety / hazardous-material review requested." : "",
      preferredContact,
      conditionalDetails: conditionalDetails(),
      notes: "",
      consent,
      company,
      source: window.location.hostname.endsWith(".chatgpt.site") ? "openai-sites" : "canonical-website",
      startedAt: startedAtRef.current,
    };

    setIsSubmitting(true);
    setFormError("");
    trackQuoteEvent("Quote Submit Attempt", {
      job_type: job || undefined,
      photo_count: photos.length,
      quote_mode: quote.mode,
      service,
    });

    try {
      let response: Response;
      if (photos.length) {
        const body = new FormData();
        body.append("payload", JSON.stringify(payload));
        for (const photo of photos) body.append("photo", photo.file, photo.file.name);
        response = await fetch(quoteApiUrl("/api/quote"), { method: "POST", body });
      } else {
        response = await fetch(quoteApiUrl("/api/quote"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      const result = (await response.json().catch(() => ({}))) as { error?: string; ok?: boolean; reference?: string };
      if (!response.ok || !result.ok || !result.reference) {
        throw new Error(result.error || "We could not send your request. Please call or text us.");
      }
      setReference(result.reference);
      setDockVisible(false);
      trackQuoteEvent("Submitted Quote", {
        job_type: job || undefined,
        photo_count: photos.length,
        quote_mode: quote.mode,
        service,
      });
    } catch (submitError) {
      setFormError(submitError instanceof Error ? submitError.message : "Something went wrong. Please call or text us.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (reference) {
    return (
      <section className={styles.section} id="quote" ref={sectionRef}>
        <div className={styles.shell}>
          <div className={styles.success} role="status">
            <span className={styles.successBadge}>Received</span>
            <h2>Request {reference}</h2>
            <div className={styles.successGrid}>
              <div><span>Job</span><strong>{service}</strong></div>
              <div><span>Pickup</span><strong>{zip}</strong></div>
              <div><span>Estimate</span><strong>{quote.mode === "estimate" ? quote.price : "Photo review"}</strong></div>
            </div>
            <div className={styles.successActions}>
              <a className={styles.primaryButton} href={`tel:${phoneHref}`}>Call {phoneDisplay}</a>
              <a className={styles.secondaryButton} href={`sms:${phoneHref}`}>Text the team</a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section} id="quote" ref={sectionRef}>
      <div className={styles.shell}>
        <div className={styles.topline}>
          <div className={styles.stepper} aria-label="Quote progress">
            <StepLabel active={stage === 1} done={stage > 1}>Job</StepLabel>
            <i />
            <StepLabel active={stage === 2} done={stage > 2}>Where</StepLabel>
            <i />
            <StepLabel active={stage === 3} done={false}>Finish</StepLabel>
          </div>
          <span className={styles.freeBadge}><i /> Free estimate</span>
        </div>

        <div className={styles.heading}>
          <p>Instant estimate</p>
          <h2>What needs to go?</h2>
          <span>Pick the closest match.</span>
        </div>

        <div className={styles.layout}>
          <div className={styles.flow}>
            <div className={styles.panel}>
              <div className={styles.panelHead}>
                <div><span className={styles.stepNumber}>1</span><strong>Job</strong></div>
                <small>{job ? jobTiles.find((tile) => tile.id === job)?.label || "Construction debris" : "Choose one"}</small>
              </div>
              <div className={styles.panelBody}>
                <div className={styles.jobGrid}>
                  {jobTiles.map((tile) => (
                    <button
                      type="button"
                      key={tile.id}
                      className={cx(styles.jobCard, job === tile.id && styles.activeCard)}
                      aria-pressed={job === tile.id}
                      onClick={() => chooseJob(tile.id)}
                    >
                      <span className={styles.iconBox}><JobIcon kind={tile.icon} /></span>
                      <span><strong>{tile.label}</strong><small>{tile.detail}</small></span>
                    </button>
                  ))}
                </div>
                <button type="button" className={styles.debrisLink} onClick={() => chooseJob("debris")}>Construction or renovation debris →</button>

                {job && (
                  <div className={styles.details} ref={detailsRef}>
                    <div className={styles.detailsHead}>
                      <strong>
                        {job === "items" ? "What are we taking?" :
                          job === "appliances" ? "Which appliances?" :
                          job === "garage" ? "How full is it?" :
                          job === "property" ? "How much are we clearing?" :
                          job === "special" ? "What is it?" : "What kind of debris?"}
                      </strong>
                      <span>{(job === "items" || job === "appliances") && totalItems ? `${totalItems} selected` : ""}</span>
                    </div>

                    {(job === "items" || job === "appliances") && (
                      <div className={styles.itemGrid}>
                        {catalog.map((item) => {
                          const count = items[item.id] || 0;
                          return (
                            <div key={item.id} className={cx(styles.itemCard, count > 0 && styles.itemSelected)}>
                              <div className={styles.itemTop}>
                                <div><strong>{item.name}</strong><small>{job === "appliances" ? "Appliance" : "Common item"}</small></div>
                                {!count && <button type="button" onClick={() => changeItem(item.id, 1)} aria-label={`Add ${item.name}`}>+</button>}
                              </div>
                              {count > 0 && (
                                <div className={styles.quantity}>
                                  <button type="button" onClick={() => changeItem(item.id, -1)}>−</button>
                                  <strong>{count}</strong>
                                  <button type="button" onClick={() => changeItem(item.id, 1)}>+</button>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {(job === "garage" || job === "property") && (
                      <div className={styles.sizeGrid}>
                        {(job === "property" ? propertySizes : garageSizes).map((choice) => (
                          <button
                            type="button"
                            key={choice.id}
                            className={cx(styles.sizeCard, size === choice.id && styles.activeCard)}
                            onClick={() => { markStarted(); setSize(choice.id); }}
                          >
                            <span className={styles.loadVisual} aria-hidden="true">
                              {[1, 2, 3, 4].map((bar) => <i key={bar} className={bar <= choice.fill ? styles.filledBar : ""} />)}
                            </span>
                            <strong>{choice.label}</strong>
                            <small>{choice.detail}</small>
                          </button>
                        ))}
                      </div>
                    )}

                    {job === "special" && (
                      <>
                        <div className={styles.reviewStrip}><i /> Photo review</div>
                        <div className={styles.specialGrid}>
                          {specialItems.map((item) => (
                            <button
                              type="button"
                              key={item.id}
                              className={cx(styles.specialCard, special === item.id && styles.activeCard)}
                              onClick={() => { markStarted(); setSpecial(item.id); }}
                            >
                              <strong>{item.label}</strong>
                            </button>
                          ))}
                        </div>
                      </>
                    )}

                    {job === "debris" && (
                      <div className={styles.debrisBlock}>
                        <div className={styles.debrisGrid}>
                          {debrisChoices.map((choice) => (
                            <button
                              type="button"
                              key={choice.id}
                              className={cx(styles.debrisCard, debris === choice.id && styles.activeCard)}
                              onClick={() => { markStarted(); setDebris(choice.id); }}
                            >
                              <strong>{choice.label}</strong>
                              <small>{choice.detail}</small>
                            </button>
                          ))}
                        </div>
                        <label className={styles.amountField}>
                          <span>Rough amount</span>
                          <select value={debrisAmount} onChange={(event) => { markStarted(); setDebrisAmount(event.target.value); }}>
                            <option value="">Choose amount</option>
                            {debrisAmounts.map((amount) => <option key={amount.value} value={amount.value}>{amount.label}</option>)}
                          </select>
                        </label>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {detailsReady && (
              <div className={styles.panel} ref={whereRef}>
                <div className={styles.panelHead}>
                  <div><span className={styles.stepNumber}>2</span><strong>Where & when</strong></div>
                  <small>{whereReady ? `${pickupLocations.find((item) => item.id === pickupLocation)?.label} · ${zip}` : "Add location"}</small>
                </div>
                <div className={styles.panelBody}>
                  <div className={styles.whereGrid}>
                    <label className={styles.zipField}>
                      <span>Pickup ZIP</span>
                      <div>
                        <input
                          value={zip}
                          inputMode="numeric"
                          autoComplete="postal-code"
                          maxLength={5}
                          placeholder="47715"
                          onChange={(event) => {
                            markStarted();
                            setZip(event.target.value.replace(/\D/g, "").slice(0, 5));
                          }}
                        />
                        {zipReady && <b aria-label="Valid ZIP">✓</b>}
                      </div>
                    </label>

                    <fieldset className={styles.locationFieldset}>
                      <legend>Where is the junk?</legend>
                      <div className={styles.locationGrid}>
                        {pickupLocations.map((location) => (
                          <button
                            type="button"
                            key={location.id}
                            className={cx(styles.locationCard, pickupLocation === location.id && styles.activeCard)}
                            onClick={() => { markStarted(); setPickupLocation(location.id); }}
                          >
                            <span>{location.icon}</span>
                            <strong>{location.label}</strong>
                          </button>
                        ))}
                      </div>
                    </fieldset>
                  </div>

                  <div className={styles.timingRow}>
                    <strong>When</strong>
                    {timingOptions.map((option) => (
                      <button
                        type="button"
                        key={option.id}
                        className={cx(styles.chip, timing === option.id && styles.chipActive)}
                        onClick={() => { markStarted(); setTiming(option.id); }}
                      >
                        {option.label}
                      </button>
                    ))}
                    {timing === "choose-date" && <input type="date" value={preferredDate} onChange={(event) => setPreferredDate(event.target.value)} className={styles.dateInput} />}
                  </div>

                  <div className={cx(styles.extrasBlock, extrasOpen && styles.extrasOpen)}>
                    <button type="button" className={styles.extrasToggle} onClick={() => setExtrasOpen((open) => !open)}>
                      <span>Anything that makes pickup harder?</span>
                      <span>{extras.length ? `${extras.length} added` : "None"} <b>⌄</b></span>
                    </button>
                    <div className={styles.extrasGrid}>
                      {extraOptions.map((option) => (
                        <label key={option.id} className={cx(styles.extraCard, extras.includes(option.id) && styles.extraActive)}>
                          <input type="checkbox" checked={extras.includes(option.id)} onChange={() => toggleExtra(option.id)} />
                          <span>{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {whereReady && (
              <div className={styles.panel} ref={photoRef}>
                <div className={styles.panelHead}>
                  <div><span className={styles.stepNumber}>3</span><strong>Photos</strong></div>
                  <small>{photoRequired ? "Required" : "Optional"}</small>
                </div>
                <div className={styles.panelBody}>
                  <label className={styles.photoPicker}>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/heic,image/heif,.jpg,.jpeg,.png,.heic,.heif"
                      multiple
                      disabled={isPreparingPhotos || photos.length >= maxPhotos}
                      onChange={addPhotos}
                    />
                    <span className={styles.cameraBox}><CameraIcon /></span>
                    <strong>{isPreparingPhotos ? "Preparing photos…" : photoRequired ? "Add photos for review" : "Add photos"}</strong>
                    <small>{photoRequired ? "Item + access path" : "Tighter estimate in seconds"}</small>
                  </label>
                  {photos.length > 0 && (
                    <div className={styles.photoGrid}>
                      {photos.map((photo) => (
                        <div className={styles.photoThumb} key={photo.id}>
                          {photo.previewUrl ? <img src={photo.previewUrl} alt="Selected junk" /> : <span>{photo.name}</span>}
                          <button type="button" aria-label={`Remove ${photo.name}`} onClick={() => removePhoto(photo.id)}>×</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {contactVisible && (
              <div className={styles.panel} ref={contactRef}>
                <div className={styles.panelHead}>
                  <div><span className={styles.stepNumber}>✓</span><strong>{quote.mode === "review" ? "Request review" : "Request pickup"}</strong></div>
                  <small>No payment now</small>
                </div>
                <div className={styles.panelBody}>
                  <input
                    className={styles.honeypot}
                    aria-hidden="true"
                    tabIndex={-1}
                    autoComplete="off"
                    value={company}
                    onChange={(event) => setCompany(event.target.value)}
                  />
                  <div className={styles.contactGrid}>
                    <input value={name} autoComplete="name" placeholder="Name" onChange={(event) => setName(event.target.value)} />
                    <input value={phone} type="tel" inputMode="tel" autoComplete="tel" placeholder="Mobile number" onChange={(event) => setPhone(event.target.value)} />
                    <input value={email} type="email" autoComplete="email" placeholder="Email" onChange={(event) => setEmail(event.target.value)} />
                    <input value={address} autoComplete="street-address" placeholder="Pickup street address" onChange={(event) => setAddress(event.target.value)} />
                  </div>
                  <div className={styles.contactPreference}>
                    <span>Prefer</span>
                    {(["text", "call", "email"] as ContactMethod[]).map((method) => (
                      <button type="button" key={method} className={cx(styles.chip, preferredContact === method && styles.chipActive)} onClick={() => setPreferredContact(method)}>
                        {method[0].toUpperCase() + method.slice(1)}
                      </button>
                    ))}
                  </div>
                  <label className={styles.consentRow}>
                    <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} />
                    <span>Contact me about this pickup.</span>
                  </label>
                  <button type="button" className={styles.submitButton} disabled={isSubmitting} onClick={submitQuote}>
                    {isSubmitting ? "Sending…" : quote.mode === "review" ? "Request review" : "Request pickup"}
                  </button>
                </div>
              </div>
            )}

            {formError && <div className={styles.error} role="alert">{formError}</div>}
          </div>

          <aside className={styles.quoteCard} aria-live="polite">
            <div className={styles.quoteTop}>
              <span>{quote.title}</span>
              <strong className={styles.quotePrice}>{quote.price}</strong>
              <small>{quote.note}</small>
              <div className={styles.confidenceTrack}><i style={{ width: `${quote.confidence}%` }} /></div>
            </div>
            <dl className={styles.quoteMeta}>
              <div><dt>Job</dt><dd>{job ? jobTiles.find((tile) => tile.id === job)?.label || "Construction debris" : "—"}</dd></div>
              <div><dt>Load</dt><dd>{detailsReady ? quote.loadLabel : "—"}</dd></div>
              <div><dt>Pickup</dt><dd>{whereReady ? `${pickupLocations.find((item) => item.id === pickupLocation)?.label} · ${zip}` : zipReady ? "Choose location" : "—"}</dd></div>
              <div><dt>When</dt><dd>{timingOptions.find((option) => option.id === timing)?.label}</dd></div>
            </dl>
            <div className={cx(styles.quoteStatus, quote.mode === "estimate" && styles.quoteStatusGood, quote.mode === "review" && styles.quoteStatusReview)}>
              {quote.mode === "estimate" ? "Estimate ready." : quote.mode === "review" ? "Add photos for review." : quote.cta === "Start" ? "Choose the kind of job." : quote.cta}
            </div>
            <div className={styles.quoteFooter}>
              <button type="button" className={styles.submitButton} onClick={scrollNext}>{quote.cta}</button>
              <span>Labor · loading · hauling · standard disposal</span>
            </div>
          </aside>
        </div>
      </div>

      <div className={cx(styles.mobileDock, dockVisible && styles.mobileDockVisible, dockExpanded && styles.mobileDockExpanded)}>
        <div className={styles.mobileDockInner}>
          <div className={styles.mobileDockBar}>
            <button type="button" className={styles.mobileQuoteButton} onClick={() => setDockExpanded((open) => !open)} aria-expanded={dockExpanded}>
              <span>{quote.title}</span>
              <strong>{quote.price}</strong>
            </button>
            <button type="button" className={styles.mobileCta} onClick={scrollNext}>{quote.cta}</button>
          </div>
          <div className={styles.mobileDetails}>
            <div><span>Job</span><strong>{job ? jobTiles.find((tile) => tile.id === job)?.label || "Construction debris" : "—"}</strong></div>
            <div><span>Load</span><strong>{detailsReady ? quote.loadLabel : "—"}</strong></div>
            <div><span>Pickup</span><strong>{whereReady ? `${pickupLocations.find((item) => item.id === pickupLocation)?.label} · ${zip}` : "—"}</strong></div>
            <div><span>Confidence</span><strong>{quote.confidenceLabel}</strong></div>
          </div>
        </div>
      </div>
    </section>
  );
}
