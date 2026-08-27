"use client";

import * as amplitude from "@amplitude/unified";
import type {
  ChangeEvent,
  FormEvent,
  ReactNode,
} from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { popularServiceSlugs } from "../home-data";
import { formatPriceRange, getPublicPricingTier } from "../pricing-data";
import {
  emailAddress,
  phoneDisplay,
  phoneHref,
  services,
} from "../site-data";

const quoteServiceEvent = "uncle-sam:quote-service";
const quoteFieldIds = {
  name: "quote-name",
  phone: "quote-phone",
  email: "quote-email",
  address: "quote-address",
  service: "quote-service",
  quantity: "quote-quantity",
  preferredDate: "quote-preferredDate",
  photos: "quote-photos",
  consent: "quote-consent",
} as const;

type QuoteFieldKey = keyof typeof quoteFieldIds;

function quoteFieldDescribedBy(
  field: QuoteFieldKey,
  hasError: boolean,
): string | undefined {
  return hasError ? `${quoteFieldIds[field]}-error` : undefined;
}
const maxPhotos = 8;
const maxPhotoBytes = 3_500_000;
const acceptedPhotoTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/heic",
  "image/heif",
]);
const acceptedPhotoExtensions = /\.(jpe?g|png|heic|heif)$/i;

type Urgency =
  | "today"
  | "within-2-3-days"
  | "choose-date"
  | "flexible";
type Placement = "indoor" | "outdoor" | "both" | "unsure";
type ContactMethod = "call" | "text" | "email";
type ServiceKind =
  | "furniture"
  | "shed"
  | "appliances"
  | "cleanouts"
  | "debris"
  | "other";

type FormState = {
  access: string[];
  address: string;
  applianceDisconnected: string;
  applianceFloor: string;
  applianceType: string;
  cleanoutLoad: string;
  cleanoutOccupancy: string;
  cleanoutRooms: string;
  company: string;
  consent: boolean;
  debrisMaterial: string;
  debrisVolume: string;
  dismantling: boolean;
  email: string;
  furnitureItemType: string;
  furnitureQuantity: string;
  furnitureStairs: string;
  heavyDetails: string;
  heavyMaterials: boolean;
  name: string;
  notes: string;
  phone: string;
  placement: Placement;
  preferredContact: ContactMethod;
  preferredDate: string;
  quantity: string;
  service: string;
  shedAccess: string;
  shedContents: string;
  shedDimensions: string;
  shedMaterial: string;
  urgency: Urgency;
};

type PhotoItem = {
  file: File;
  id: string;
  originalName: string;
  previewUrl: string;
};

type PhotoStatus = {
  progress: number;
  state: "waiting" | "uploading" | "sent" | "failed";
};

type SubmitResult = {
  confirmationSent: boolean;
  photosSent: number;
  photosTotal: number;
  reference: string;
};

type QuoteServiceLinkProps = {
  ariaLabel?: string;
  children: ReactNode;
  className?: string;
  service: string;
};

type QuoteSectionProps = {
  initialLocation?: string;
  initialService?: string;
};

const urgencyOptions: Array<{ label: string; value: Urgency }> = [
  { label: "Today", value: "today" },
  { label: "Within 2–3 days", value: "within-2-3-days" },
  { label: "Choose a date", value: "choose-date" },
  { label: "Flexible", value: "flexible" },
];

const placementOptions: Array<{ label: string; value: Placement }> = [
  { label: "Indoor", value: "indoor" },
  { label: "Outdoor", value: "outdoor" },
  { label: "Both", value: "both" },
  { label: "Not sure", value: "unsure" },
];

const contactOptions: Array<{
  label: string;
  value: ContactMethod;
}> = [
  { label: "Call", value: "call" },
  { label: "Text", value: "text" },
  { label: "Email", value: "email" },
];

const quantityOptions = [
  "Single item",
  "A few items",
  "¼ trailer load",
  "½ trailer load",
  "¾ trailer load",
  "Full trailer load",
  "Not sure",
];

const accessOptions = [
  "Stairs",
  "Elevator",
  "Long carry",
  "Narrow doorway",
  "Limited truck access",
];

function initialForm(
  initialLocation: string,
  initialService: string,
): FormState {
  return {
    access: [],
    address: initialLocation,
    applianceDisconnected: "",
    applianceFloor: "",
    applianceType: "",
    cleanoutLoad: "",
    cleanoutOccupancy: "",
    cleanoutRooms: "",
    company: "",
    consent: false,
    debrisMaterial: "",
    debrisVolume: "",
    dismantling: false,
    email: "",
    furnitureItemType: "",
    furnitureQuantity: "",
    furnitureStairs: "",
    heavyDetails: "",
    heavyMaterials: false,
    name: "",
    notes: "",
    phone: "",
    placement: "unsure",
    preferredContact: "text",
    preferredDate: "",
    quantity: "",
    service: initialService,
    shedAccess: "",
    shedContents: "",
    shedDimensions: "",
    shedMaterial: "",
    urgency: "flexible",
  };
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

function serviceKind(service: string): ServiceKind {
  if (
    /Furniture|Mattress|Restaurant Equipment|Warehouse Fixture/i.test(
      service,
    )
  ) {
    return "furniture";
  }
  if (/Shed|Light Demolition|Hot Tub/i.test(service)) {
    return "shed";
  }
  if (/Appliance/i.test(service)) {
    return "appliances";
  }
  if (/Cleanout|Cleaning|Turnover/i.test(service)) {
    return "cleanouts";
  }
  if (/Yard Waste|Storm Debris/i.test(service)) {
    return "debris";
  }
  return "other";
}

const publicPricingSizeForQuantity: Record<string, string> = {
  "Single item": "single_item",
  "A few items": "single_item",
  "¼ trailer load": "quarter_load",
  "½ trailer load": "half_load",
  "Full trailer load": "full_load",
};

function planningRange(service: string, quantity: string) {
  const kind = serviceKind(service);
  if (kind === "shed" || kind === "debris") {
    return "Photos needed for the most useful planning range.";
  }
  if (quantity === "¾ trailer load") {
    return "Add photos for the most useful ¾-load planning range.";
  }

  const tier = getPublicPricingTier(
    publicPricingSizeForQuantity[quantity] || "",
  );
  if (tier) {
    return `Planning range: about ${formatPriceRange(tier.low, tier.high)}.`;
  }
  return "Choose a load size or add photos for a useful planning range.";
}

function trackAmplitudeQuoteEvent(
  event: string,
  properties: Record<string, string | number | boolean | undefined>,
) {
  try {
    if (event === "quote_form_started") {
      const props: Record<string, string> = {};
      if (typeof properties.source === "string") {
        props.source = properties.source;
      }
      amplitude.track("Started Quote", props);
      return;
    }

    if (event === "quote_submitted") {
      const props: Record<string, string | number> = {};
      if (typeof properties.service === "string") {
        props.service = properties.service;
      }
      if (typeof properties.photo_count === "number") {
        props.photo_count = properties.photo_count;
      }
      if (typeof properties.photos_delivered === "number") {
        props.photos_delivered = properties.photos_delivered;
      }
      amplitude.track("Submitted Quote", props);
    }
  } catch {
    // Amplitude may be uninitialized; keep quote analytics non-blocking.
  }
}

function trackQuoteEvent(
  event: string,
  properties: Record<string, string | number | boolean | undefined> = {},
) {
  if (typeof window === "undefined") {
    return;
  }

  const analyticsWindow = window as typeof window & {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
    plausible?: (
      event: string,
      options?: { props: Record<string, unknown> },
    ) => void;
  };

  analyticsWindow.dataLayer?.push({ event, ...properties });
  analyticsWindow.gtag?.("event", event, properties);
  analyticsWindow.plausible?.(event, { props: properties });
  trackAmplitudeQuoteEvent(event, properties);
}

function randomId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random()}`;
}

function ChoiceButton({
  active,
  children,
  disabled,
  onClick,
}: {
  active: boolean;
  children: ReactNode;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className="form-choice"
      aria-pressed={active}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
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
      reject(new Error("This browser could not prepare that photo."));
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
    if (file.size <= maxPhotoBytes) {
      return file;
    }
    throw new Error(
      `${file.name} is over 3.5 MB. Choose a smaller HEIC photo.`,
    );
  }

  try {
    const image = await loadImage(file);
    const scale = Math.min(
      1,
      1600 / Math.max(image.naturalWidth, image.naturalHeight),
    );
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
    const context = canvas.getContext("2d");
    if (!context) {
      throw new Error("Photo preparation is unavailable.");
    }
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", 0.78),
    );
    if (!blob) {
      throw new Error("Photo preparation failed.");
    }

    const compressed = new File(
      [blob],
      file.name.replace(/\.(png|jpe?g)$/i, "") + ".jpg",
      {
        type: "image/jpeg",
        lastModified: file.lastModified,
      },
    );

    if (compressed.size <= maxPhotoBytes) {
      return compressed.size < file.size || file.size > maxPhotoBytes
        ? compressed
        : file;
    }
  } catch {
    if (file.size <= maxPhotoBytes) {
      return file;
    }
  }

  throw new Error(
    `${file.name} is too large to prepare. Choose a photo under 3.5 MB.`,
  );
}

function isAcceptedPhoto(file: File) {
  return (
    acceptedPhotoTypes.has(file.type.toLowerCase()) ||
    acceptedPhotoExtensions.test(file.name)
  );
}

export function QuoteServiceLink({
  ariaLabel,
  children,
  className,
  service,
}: QuoteServiceLinkProps) {
  return (
    <a
      className={className}
      href="#quote"
      data-quote-service={service}
      aria-label={ariaLabel}
      onClick={() => {
        window.dispatchEvent(
          new CustomEvent<string>(quoteServiceEvent, { detail: service }),
        );
      }}
    >
      {children}
    </a>
  );
}

export function QuoteSection({
  initialLocation = "",
  initialService = "",
}: QuoteSectionProps) {
  const [form, setForm] = useState(() =>
    initialForm(initialLocation, initialService),
  );
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [photoStatuses, setPhotoStatuses] = useState<
    Record<string, PhotoStatus>
  >({});
  const [isPreparingPhotos, setIsPreparingPhotos] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<SubmitResult | null>(null);
  const startedAtRef = useRef(Date.now());
  const startedRef = useRef(false);
  const photoUrlsRef = useRef<string[]>([]);
  const statusRef = useRef<HTMLDivElement>(null);
  const submissionIdRef = useRef(randomId());

  const popularServices = useMemo(
    () =>
      popularServiceSlugs
        .map((slug) => services.find((service) => service.slug === slug))
        .filter(
          (service): service is (typeof services)[number] =>
            service !== undefined,
        ),
    [],
  );
  const otherServices = services.filter(
    (service) => !popularServiceSlugs.includes(service.slug),
  );
  const kind = serviceKind(form.service);
  const disabled = isSubmitting || Boolean(result);

  useEffect(() => {
    photoUrlsRef.current = photos
      .map((photo) => photo.previewUrl)
      .filter(Boolean);
  }, [photos]);

  useEffect(
    () => () => {
      for (const url of photoUrlsRef.current) {
        URL.revokeObjectURL(url);
      }
    },
    [],
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedService = params.get("service")?.trim() || "";
    const requestedLocation = params.get("location")?.trim() || "";

    const frame = window.requestAnimationFrame(() => {
      setForm((current) => ({
        ...current,
        address:
          requestedLocation.length > 0 && requestedLocation.length <= 160
            ? requestedLocation
            : current.address,
        service: services.some(
          (service) => service.quoteValue === requestedService,
        )
          ? requestedService
          : current.service,
      }));
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    function selectRequestedService(event: Event) {
      const serviceName = (event as CustomEvent<string>).detail;
      if (!services.some((service) => service.quoteValue === serviceName)) {
        return;
      }
      setField("service", serviceName);
      trackQuoteEvent("quote_service_selected", {
        service: serviceName,
        source: "service-card",
      });
    }

    window.addEventListener(quoteServiceEvent, selectRequestedService);
    return () =>
      window.removeEventListener(quoteServiceEvent, selectRequestedService);
  }, []);

  useEffect(() => {
    if (result) {
      statusRef.current?.focus();
    }
  }, [result]);

  useEffect(() => {
    if (Object.keys(fieldErrors).length > 0 || formError) {
      statusRef.current?.focus();
    }
  }, [fieldErrors, formError]);

  function markStarted() {
    if (startedRef.current) {
      return;
    }
    startedRef.current = true;
    trackQuoteEvent("quote_form_started", { source: "homepage" });
  }

  function setField<Key extends keyof FormState>(
    key: Key,
    value: FormState[Key],
  ) {
    setForm((current) => ({ ...current, [key]: value }));
    setFormError("");
    setFieldErrors((current) => {
      if (!current[String(key)]) {
        return current;
      }
      const next = { ...current };
      delete next[String(key)];
      return next;
    });
  }

  function chooseService(service: string) {
    markStarted();
    setField("service", service);
    trackQuoteEvent("quote_service_selected", {
      service,
      source: "quote-form",
    });
  }

  function toggleAccess(access: string) {
    markStarted();
    setField(
      "access",
      form.access.includes(access)
        ? form.access.filter((item) => item !== access)
        : [...form.access, access],
    );
  }

  async function addPhotos(event: ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(event.target.files || []);
    event.target.value = "";
    if (selected.length === 0) {
      return;
    }

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
        const previewable =
          file.type === "image/jpeg" || file.type === "image/png";
        prepared.push({
          file,
          id: randomId(),
          originalName: original.name,
          previewUrl: previewable ? URL.createObjectURL(file) : "",
        });
      }
      setPhotos((current) => [...current, ...prepared]);
      setPhotoStatuses((current) => ({
        ...current,
        ...Object.fromEntries(
          prepared.map((photo) => [
            photo.id,
            { progress: 0, state: "waiting" as const },
          ]),
        ),
      }));
      trackQuoteEvent("quote_photos_added", {
        count: prepared.length,
        total: photos.length + prepared.length,
      });
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : "Could not prepare those photos.",
      );
    } finally {
      setIsPreparingPhotos(false);
    }
  }

  function removePhoto(id: string) {
    const photo = photos.find((item) => item.id === id);
    if (photo?.previewUrl) {
      URL.revokeObjectURL(photo.previewUrl);
    }
    setPhotos((current) => current.filter((item) => item.id !== id));
    setPhotoStatuses((current) => {
      const next = { ...current };
      delete next[id];
      return next;
    });
  }

  function conditionalDetails() {
    if (kind === "furniture") {
      return {
        "Item type": form.furnitureItemType,
        "Item quantity": form.furnitureQuantity,
        "Floor / stairs": form.furnitureStairs,
      };
    }
    if (kind === "shed") {
      return {
        Dimensions: form.shedDimensions,
        Material: form.shedMaterial,
        Contents: form.shedContents,
        "Removal access": form.shedAccess,
      };
    }
    if (kind === "appliances") {
      return {
        "Appliance type": form.applianceType,
        Floor: form.applianceFloor,
        "Disconnected status": form.applianceDisconnected,
      };
    }
    if (kind === "cleanouts") {
      return {
        "Rooms / areas": form.cleanoutRooms,
        "Estimated load": form.cleanoutLoad,
        Occupancy: form.cleanoutOccupancy,
      };
    }
    if (kind === "debris") {
      return {
        "Material type": form.debrisMaterial,
        "Estimated volume": form.debrisVolume,
      };
    }
    return {};
  }

  function validate() {
    const errors: Record<string, string> = {};
    if (form.name.trim().length < 2) {
      errors.name = "Enter your name.";
    }
    if (form.phone.replace(/\D/g, "").length < 7) {
      errors.phone = "Enter a valid phone number.";
    }
    if (
      form.email.trim().length > 0 &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
    ) {
      errors.email = "Enter a valid email address.";
    }
    if (form.address.trim().length < 2) {
      errors.address = "Enter the pickup city, ZIP code, or address.";
    }
    if (!form.service) {
      errors.service = "Choose a service.";
    }
    if (!form.quantity) {
      errors.quantity = "Choose an approximate quantity.";
    }
    if (form.urgency === "choose-date" && !form.preferredDate) {
      errors.preferredDate = "Choose a preferred date.";
    }
    if (photos.length > maxPhotos) {
      errors.photos =
        "Use 1–8 JPG, PNG, or HEIC photos smaller than 3.5 MB each.";
    }
    if (!form.consent) {
      errors.consent = "Confirm that we may contact you about this request.";
    }
    return errors;
  }

  function markPhotos(
    selectedPhotos: PhotoItem[],
    status: PhotoStatus,
  ) {
    setPhotoStatuses((current) => {
      const next = { ...current };
      for (const photo of selectedPhotos) {
        next[photo.id] = status;
      }
      return next;
    });
  }

  function uploadPhotoBatch(
    selectedPhotos: PhotoItem[],
    reference: string,
  ) {
    return new Promise<number>((resolve, reject) => {
      const body = new FormData();
      body.append("reference", reference);
      body.append("name", form.name);
      body.append("email", form.email);
      for (const photo of selectedPhotos) {
        body.append("photo", photo.file, photo.file.name);
      }

      const request = new XMLHttpRequest();
      request.open("POST", quoteApiUrl("/api/quote/photo"));
      request.upload.onprogress = (event) => {
        if (!event.lengthComputable) {
          return;
        }
        const progress = Math.min(
          99,
          Math.round((event.loaded / event.total) * 100),
        );
        markPhotos(selectedPhotos, { progress, state: "uploading" });
      };
      request.onerror = () => {
        markPhotos(selectedPhotos, { progress: 0, state: "failed" });
        reject(new Error("Photo upload failed."));
      };
      request.onload = () => {
        let payload: { error?: string; ok?: boolean; photosSent?: number } =
          {};
        try {
          payload = JSON.parse(request.responseText) as typeof payload;
        } catch {
          // The status check below handles non-JSON failures.
        }
        if (
          request.status >= 200 &&
          request.status < 300 &&
          payload.ok
        ) {
          markPhotos(selectedPhotos, { progress: 100, state: "sent" });
          resolve(payload.photosSent ?? selectedPhotos.length);
          return;
        }
        markPhotos(selectedPhotos, { progress: 0, state: "failed" });
        reject(new Error(payload.error || "Photo upload failed."));
      };
      markPhotos(selectedPhotos, { progress: 1, state: "uploading" });
      request.send(body);
    });
  }

  async function sendPhotos(
    reference: string,
    selectedPhotos: PhotoItem[],
  ) {
    if (selectedPhotos.length === 0) {
      return 0;
    }

    try {
      return await uploadPhotoBatch(selectedPhotos, reference);
    } catch {
      // Failed photos remain retryable in the success panel.
      return 0;
    }
  }

  function submitQuoteRequest(payload: Record<string, unknown>) {
    if (photos.length === 0) {
      return fetch(quoteApiUrl("/api/quote"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).then(async (response) => {
        const body = (await response.json().catch(() => ({}))) as {
          confirmationSent?: boolean;
          error?: string;
          ok?: boolean;
          photosSent?: number;
          reference?: string;
        };
        return { response, body };
      });
    }

    return new Promise<{
      response: { ok: boolean; status: number };
      body: {
        confirmationSent?: boolean;
        error?: string;
        ok?: boolean;
        photosSent?: number;
        reference?: string;
      };
    }>((resolve, reject) => {
      const body = new FormData();
      body.append("payload", JSON.stringify(payload));
      for (const photo of photos) {
        body.append("photo", photo.file, photo.file.name);
      }

      const request = new XMLHttpRequest();
      request.open("POST", quoteApiUrl("/api/quote"));
      request.upload.onprogress = (event) => {
        if (!event.lengthComputable) {
          return;
        }
        const progress = Math.min(
          99,
          Math.round((event.loaded / event.total) * 100),
        );
        markPhotos(photos, { progress, state: "uploading" });
      };
      request.onerror = () => {
        markPhotos(photos, { progress: 0, state: "failed" });
        reject(new Error("We could not send your request. Please call or text us."));
      };
      request.onload = () => {
        let parsed: {
          confirmationSent?: boolean;
          error?: string;
          ok?: boolean;
          photosSent?: number;
          reference?: string;
        } = {};
        try {
          parsed = JSON.parse(request.responseText) as typeof parsed;
        } catch {
          // The status check below handles non-JSON failures.
        }

        const ok =
          request.status >= 200 &&
          request.status < 300 &&
          Boolean(parsed.ok) &&
          Boolean(parsed.reference);

        if (ok) {
          markPhotos(photos, { progress: 100, state: "sent" });
        } else {
          markPhotos(photos, { progress: 0, state: "failed" });
        }

        resolve({
          response: { ok: request.status >= 200 && request.status < 300, status: request.status },
          body: parsed,
        });
      };
      markPhotos(photos, { progress: 1, state: "uploading" });
      request.send(body);
    });
  }

  async function submitQuote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting || result) {
      return;
    }

    markStarted();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setFormError("");
      trackQuoteEvent("quote_validation_error", {
        error_count: Object.keys(errors).length,
        first_field: Object.keys(errors)[0],
      });
      return;
    }

    setIsSubmitting(true);
    setFormError("");
    setFieldErrors({});
    trackQuoteEvent("quote_submit_attempt", {
      contact_method: form.preferredContact,
      photo_count: photos.length,
      service: form.service,
      urgency: form.urgency,
    });

    try {
      const { response, body: payload } = await submitQuoteRequest({
        ...form,
        conditionalDetails: conditionalDetails(),
        source: window.location.hostname.endsWith(".chatgpt.site")
          ? "openai-sites"
          : "canonical-website",
        startedAt: startedAtRef.current,
        submissionId: submissionIdRef.current,
      });

      if (!response.ok || !payload.ok || !payload.reference) {
        throw new Error(
          payload.error ||
            "We could not send your request. Please call or text us.",
        );
      }

      const photosSent =
        photos.length > 0 ? (payload.photosSent ?? photos.length) : 0;
      setResult({
        confirmationSent: payload.confirmationSent !== false,
        photosSent,
        photosTotal: photos.length,
        reference: payload.reference,
      });
      trackQuoteEvent("quote_submitted", {
        photo_count: photos.length,
        photos_delivered: photosSent,
        service: form.service,
      });
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please call or text us.",
      );
      trackQuoteEvent("quote_delivery_error", {
        photo_count: photos.length,
        service: form.service,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function retryFailedPhotos() {
    if (!result) {
      return;
    }
    const failed = photos.filter(
      (photo) => photoStatuses[photo.id]?.state === "failed",
    );
    if (failed.length === 0) {
      return;
    }

    setIsSubmitting(true);
    const sent = await sendPhotos(result.reference, failed);
    setResult((current) =>
      current
        ? { ...current, photosSent: current.photosSent + sent }
        : current,
    );
    setIsSubmitting(false);
  }

  const fallbackMessage = [
    "Hi Uncle Sam Junk Removal — I’d like a free quote.",
    `Name: ${form.name}`,
    `Phone: ${form.phone}`,
    `Email: ${form.email}`,
    `Pickup: ${form.address}`,
    `Service: ${form.service}`,
    `Timing: ${form.urgency}`,
    `Quantity: ${form.quantity}`,
  ].join("\n");
  const failedPhotoCount = result
    ? result.photosTotal - result.photosSent
    : 0;

  return (
    <section className="section section--quote" id="quote">
      <div className="shell quote-layout">
        <div className="quote-copy">
          <p className="eyebrow">Free, no-pressure quote</p>
          <h2>Show us what needs to go.</h2>
          <p>
            Share the job basics and optional photos. We’ll follow up to
            confirm availability and the final onsite price.
          </p>
          <ul className="quote-reassurance" aria-label="Quote reassurance">
            <li>No payment required</li>
            <li>No obligation to book</li>
            <li>Your price comes before the work</li>
          </ul>
          <div className="contact-card">
            <span>Prefer to talk?</span>
            <a href={`tel:${phoneHref}`}>{phoneDisplay}</a>
            <small>Call or text for current availability.</small>
          </div>
        </div>

        <div className="quote-panel">
          {result ? (
            <div
              className="quote-success"
              role="status"
              aria-live="polite"
              tabIndex={-1}
              ref={statusRef}
            >
              <span className="quote-success__badge">Received</span>
              <h3>Request {result.reference} received.</h3>
              <p>
                We normally respond as soon as possible during business
                hours.
              </p>
              <dl className="quote-summary">
                <div>
                  <dt>Project</dt>
                  <dd>{form.service}</dd>
                </div>
                <div>
                  <dt>Timing</dt>
                  <dd>
                    {urgencyOptions.find(
                      (option) => option.value === form.urgency,
                    )?.label || form.urgency}
                    {form.preferredDate
                      ? ` · ${form.preferredDate}`
                      : ""}
                  </dd>
                </div>
                <div>
                  <dt>Size</dt>
                  <dd>{form.quantity}</dd>
                </div>
                <div>
                  <dt>Pickup area</dt>
                  <dd>{form.address}</dd>
                </div>
              </dl>
              {result.photosTotal > 0 && (
                <div className="photo-delivery-summary">
                  <strong>
                    {result.photosSent} of {result.photosTotal} photos sent
                  </strong>
                  {failedPhotoCount > 0 && (
                    <>
                      <p>
                        Your request is safe. Retry the {failedPhotoCount} photo
                        {failedPhotoCount === 1 ? "" : "s"} that did not finish.
                      </p>
                      <button
                        type="button"
                        className="button button--ghost"
                        disabled={isSubmitting}
                        onClick={retryFailedPhotos}
                      >
                        {isSubmitting ? "Retrying…" : "Retry failed photos"}
                      </button>
                    </>
                  )}
                </div>
              )}
              {!result.confirmationSent && (
                <p className="quote-success__notice">
                  The team received your request, but the confirmation email
                  could not be delivered.
                </p>
              )}
              <div className="quote-ready__actions">
                <a className="button" href={`tel:${phoneHref}`}>
                  Urgent? Call now
                </a>
                <a
                  className="button button--ghost"
                  href={`sms:${phoneHref}`}
                >
                  Text the team
                </a>
              </div>
            </div>
          ) : (
            <>
              <div className="quote-panel__intro">
                <strong>Request your free quote</strong>
                <p>
                  One compact form. Relevant questions appear as you choose.
                </p>
              </div>

              <form
                onSubmit={submitQuote}
                onInput={markStarted}
                aria-busy={isSubmitting}
                noValidate
              >
                <label className="form-honeypot" aria-hidden="true">
                  <span>Company website</span>
                  <input
                    type="text"
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.company}
                    onChange={(event) =>
                      setField("company", event.target.value)
                    }
                  />
                </label>

                <div className="quote-form-section">
                  <div className="quote-form-section__heading">
                    <span>Contact</span>
                    <small>How can we reach you?</small>
                  </div>
                  <div className="form-grid">
                    <label>
                      <span>Your name</span>
                      <input
                        id={quoteFieldIds.name}
                        data-quote-field="name"
                        type="text"
                        autoComplete="name"
                        placeholder="First and last name"
                        value={form.name}
                        aria-invalid={Boolean(fieldErrors.name)}
                        aria-describedby={quoteFieldDescribedBy(
                          "name",
                          Boolean(fieldErrors.name),
                        )}
                        disabled={disabled}
                        onChange={(event) =>
                          setField("name", event.target.value)
                        }
                        required
                      />
                      {fieldErrors.name ? (
                        <p
                          className="field-error"
                          id={`${quoteFieldIds.name}-error`}
                        >
                          {fieldErrors.name}
                        </p>
                      ) : null}
                    </label>
                    <label>
                      <span>Phone number</span>
                      <input
                        id={quoteFieldIds.phone}
                        data-quote-field="phone"
                        type="tel"
                        autoComplete="tel"
                        inputMode="tel"
                        placeholder="(812) 555-0123"
                        value={form.phone}
                        aria-invalid={Boolean(fieldErrors.phone)}
                        aria-describedby={quoteFieldDescribedBy(
                          "phone",
                          Boolean(fieldErrors.phone),
                        )}
                        disabled={disabled}
                        onChange={(event) =>
                          setField("phone", event.target.value)
                        }
                        required
                      />
                      {fieldErrors.phone ? (
                        <p
                          className="field-error"
                          id={`${quoteFieldIds.phone}-error`}
                        >
                          {fieldErrors.phone}
                        </p>
                      ) : null}
                    </label>
                  </div>
                  <div className="form-grid">
                    <label>
                      <span>Email address</span>
                      <input
                        id={quoteFieldIds.email}
                        data-quote-field="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={form.email}
                        aria-invalid={Boolean(fieldErrors.email)}
                        aria-describedby={quoteFieldDescribedBy(
                          "email",
                          Boolean(fieldErrors.email),
                        )}
                        disabled={disabled}
                        onChange={(event) =>
                          setField("email", event.target.value)
                        }
                      />
                      {fieldErrors.email ? (
                        <p
                          className="field-error"
                          id={`${quoteFieldIds.email}-error`}
                        >
                          {fieldErrors.email}
                        </p>
                      ) : null}
                    </label>
                    <label>
                      <span>Pickup city, ZIP, or address</span>
                      <input
                        id={quoteFieldIds.address}
                        data-quote-field="address"
                        type="text"
                        autoComplete="street-address"
                        placeholder="Evansville, IN"
                        value={form.address}
                        aria-invalid={Boolean(fieldErrors.address)}
                        aria-describedby={quoteFieldDescribedBy(
                          "address",
                          Boolean(fieldErrors.address),
                        )}
                        disabled={disabled}
                        onChange={(event) =>
                          setField("address", event.target.value)
                        }
                        required
                      />
                      {fieldErrors.address ? (
                        <p
                          className="field-error"
                          id={`${quoteFieldIds.address}-error`}
                        >
                          {fieldErrors.address}
                        </p>
                      ) : null}
                    </label>
                  </div>
                </div>

                <div className="quote-form-section">
                  <div className="quote-form-section__heading">
                    <span>What needs to go?</span>
                    <small>Pick the closest match.</small>
                  </div>
                  <fieldset className="quick-service-picker">
                    <legend>Popular services</legend>
                    <div>
                      {popularServices.map((service) => (
                        <ChoiceButton
                          key={service.slug}
                          active={form.service === service.quoteValue}
                          disabled={disabled}
                          onClick={() => chooseService(service.quoteValue)}
                        >
                          {service.name}
                        </ChoiceButton>
                      ))}
                    </div>
                  </fieldset>
                  <label>
                    <span>All services</span>
                    <select
                      id={quoteFieldIds.service}
                      data-quote-field="service"
                      value={form.service}
                      aria-invalid={Boolean(fieldErrors.service)}
                      aria-describedby={quoteFieldDescribedBy(
                        "service",
                        Boolean(fieldErrors.service),
                      )}
                      disabled={disabled}
                      onChange={(event) => chooseService(event.target.value)}
                      required
                    >
                      <option value="" disabled>
                        Choose a service
                      </option>
                      <optgroup label="Popular services">
                        {popularServices.map((service) => (
                          <option
                            key={service.slug}
                            value={service.quoteValue}
                          >
                            {service.name}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="More services">
                        {otherServices.map((service) => (
                          <option
                            key={service.slug}
                            value={service.quoteValue}
                          >
                            {service.name}
                          </option>
                        ))}
                        <option value="Something else">Something else</option>
                      </optgroup>
                    </select>
                    {fieldErrors.service ? (
                      <p
                        className="field-error"
                        id={`${quoteFieldIds.service}-error`}
                      >
                        {fieldErrors.service}
                      </p>
                    ) : null}
                  </label>
                </div>

                <div className="quote-form-section">
                  <div className="quote-form-section__heading">
                    <span>Photos</span>
                    <small>Optional · 1–8 if added</small>
                  </div>
                  <p className="photo-help">
                    Photos usually help us price faster—but you can submit
                    without them.
                  </p>
                  <label
                    className={`photo-picker ${
                      fieldErrors.photos ? "photo-picker--error" : ""
                    }`}
                  >
                    <input
                      id={quoteFieldIds.photos}
                      data-quote-field="photos"
                      type="file"
                      accept="image/jpeg,image/png,image/heic,image/heif,.jpg,.jpeg,.png,.heic,.heif"
                      multiple
                      aria-invalid={Boolean(fieldErrors.photos)}
                      aria-describedby={quoteFieldDescribedBy(
                        "photos",
                        Boolean(fieldErrors.photos),
                      )}
                      disabled={
                        disabled ||
                        isPreparingPhotos ||
                        photos.length >= maxPhotos
                      }
                      onChange={addPhotos}
                    />
                    <span aria-hidden="true">＋</span>
                    <strong>
                      {isPreparingPhotos
                        ? "Preparing photos…"
                        : "Take or choose photos"}
                    </strong>
                    <small>JPG, PNG, or HEIC · up to 3.5 MB each</small>
                  </label>
                  {fieldErrors.photos ? (
                    <p
                      className="field-error"
                      id={`${quoteFieldIds.photos}-error`}
                    >
                      {fieldErrors.photos}
                    </p>
                  ) : null}
                  {photos.length > 0 && (
                    <div className="photo-preview-grid">
                      {photos.map((photo) => {
                        const status = photoStatuses[photo.id];
                        return (
                          <div className="photo-preview" key={photo.id}>
                            {photo.previewUrl ? (
                              // A local blob preview cannot use next/image.
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={photo.previewUrl}
                                alt={`Preview of ${photo.originalName}`}
                              />
                            ) : (
                              <div
                                className="photo-preview__heic"
                                aria-label={`${photo.originalName} HEIC photo`}
                              >
                                HEIC
                              </div>
                            )}
                            <button
                              type="button"
                              aria-label={`Remove ${photo.originalName}`}
                              disabled={isSubmitting}
                              onClick={() => removePhoto(photo.id)}
                            >
                              ×
                            </button>
                            <small>
                              {status?.state === "uploading"
                                ? `${status.progress}%`
                                : status?.state === "sent"
                                  ? "Sent"
                                  : status?.state === "failed"
                                    ? "Retry needed"
                                    : "Ready"}
                            </small>
                            {status?.state === "uploading" && (
                              <span
                                className="photo-progress"
                                style={{
                                  "--photo-progress": `${status.progress}%`,
                                } as React.CSSProperties}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div
                  className="quote-progressive"
                  hidden={!form.service}
                  aria-hidden={!form.service}
                >
                  <div className="quote-form-section">
                    <div className="quote-form-section__heading">
                      <span>Timing &amp; size</span>
                      <small>Estimates are okay.</small>
                    </div>
                    <fieldset className="choice-fieldset">
                      <legend>Preferred pickup date or urgency</legend>
                      <div className="choice-grid choice-grid--four">
                        {urgencyOptions.map((option) => (
                          <ChoiceButton
                            key={option.value}
                            active={form.urgency === option.value}
                            disabled={disabled}
                            onClick={() =>
                              setField("urgency", option.value)
                            }
                          >
                            {option.label}
                          </ChoiceButton>
                        ))}
                      </div>
                    </fieldset>
                    {form.urgency === "choose-date" && (
                      <label>
                        <span>Preferred date</span>
                        <input
                          id={quoteFieldIds.preferredDate}
                          data-quote-field="preferredDate"
                          type="date"
                          value={form.preferredDate}
                          min={new Date().toISOString().slice(0, 10)}
                          aria-invalid={Boolean(
                            fieldErrors.preferredDate,
                          )}
                          aria-describedby={quoteFieldDescribedBy(
                            "preferredDate",
                            Boolean(fieldErrors.preferredDate),
                          )}
                          disabled={disabled}
                          onChange={(event) =>
                            setField("preferredDate", event.target.value)
                          }
                          required
                        />
                        {fieldErrors.preferredDate ? (
                          <p
                            className="field-error"
                            id={`${quoteFieldIds.preferredDate}-error`}
                          >
                            {fieldErrors.preferredDate}
                          </p>
                        ) : null}
                      </label>
                    )}
                    <label>
                      <span>Approximate quantity or load size</span>
                      <select
                        id={quoteFieldIds.quantity}
                        data-quote-field="quantity"
                        value={form.quantity}
                        aria-invalid={Boolean(fieldErrors.quantity)}
                        aria-describedby={quoteFieldDescribedBy(
                          "quantity",
                          Boolean(fieldErrors.quantity),
                        )}
                        disabled={disabled}
                        onChange={(event) =>
                          setField("quantity", event.target.value)
                        }
                        required
                      >
                        <option value="" disabled>
                          Choose the closest estimate
                        </option>
                        {quantityOptions.map((option) => (
                          <option key={option}>{option}</option>
                        ))}
                      </select>
                      {fieldErrors.quantity ? (
                        <p
                          className="field-error"
                          id={`${quoteFieldIds.quantity}-error`}
                        >
                          {fieldErrors.quantity}
                        </p>
                      ) : null}
                    </label>
                    <div className="planning-range" aria-live="polite">
                      <strong>Planning range</strong>
                      <span>
                        {planningRange(form.service, form.quantity)}
                      </span>
                      <small>
                        Photos and onsite conditions determine the final price.
                        You approve it before work begins.
                      </small>
                    </div>
                  </div>

                  <div className="quote-form-section">
                    <div className="quote-form-section__heading">
                      <span>Location &amp; access</span>
                      <small>Helps us plan labor and equipment.</small>
                    </div>
                    <fieldset className="choice-fieldset">
                      <legend>Are the items indoor or outdoor?</legend>
                      <div className="choice-grid choice-grid--four">
                        {placementOptions.map((option) => (
                          <ChoiceButton
                            key={option.value}
                            active={form.placement === option.value}
                            disabled={disabled}
                            onClick={() =>
                              setField("placement", option.value)
                            }
                          >
                            {option.label}
                          </ChoiceButton>
                        ))}
                      </div>
                    </fieldset>
                    <fieldset className="choice-fieldset">
                      <legend>
                        Stairs, elevator, or difficult access{" "}
                        <small>Choose any</small>
                      </legend>
                      <div className="choice-grid choice-grid--access">
                        {accessOptions.map((access) => (
                          <ChoiceButton
                            key={access}
                            active={form.access.includes(access)}
                            disabled={disabled}
                            onClick={() => toggleAccess(access)}
                          >
                            {access}
                          </ChoiceButton>
                        ))}
                      </div>
                    </fieldset>
                    <div className="toggle-grid">
                      <label className="check-card">
                        <input
                          type="checkbox"
                          checked={form.heavyMaterials}
                          disabled={disabled}
                          onChange={(event) =>
                            setField(
                              "heavyMaterials",
                              event.target.checked,
                            )
                          }
                        />
                        <span>
                          <strong>Heavy materials</strong>
                          <small>
                            Concrete, tile, dirt, safes, or similar
                          </small>
                        </span>
                      </label>
                      <label className="check-card">
                        <input
                          type="checkbox"
                          checked={form.dismantling}
                          disabled={disabled}
                          onChange={(event) =>
                            setField("dismantling", event.target.checked)
                          }
                        />
                        <span>
                          <strong>Dismantling required</strong>
                          <small>Items cannot be carried out as-is</small>
                        </span>
                      </label>
                    </div>
                    {(form.heavyMaterials || form.dismantling) && (
                      <label>
                        <span>Heavy materials or dismantling details</span>
                        <input
                          type="text"
                          placeholder="What material or what needs taken apart?"
                          value={form.heavyDetails}
                          disabled={disabled}
                          onChange={(event) =>
                            setField("heavyDetails", event.target.value)
                          }
                        />
                      </label>
                    )}
                  </div>

                  <div className="quote-form-section quote-conditional">
                    <div className="quote-form-section__heading">
                      <span>{form.service} details</span>
                      <small>Only the relevant questions.</small>
                    </div>
                    {kind === "furniture" && (
                      <div className="form-grid">
                        <label>
                          <span>Item type</span>
                          <input
                            type="text"
                            placeholder="Couch, mattress, desks…"
                            value={form.furnitureItemType}
                            disabled={disabled}
                            onChange={(event) =>
                              setField(
                                "furnitureItemType",
                                event.target.value,
                              )
                            }
                          />
                        </label>
                        <label>
                          <span>Quantity</span>
                          <input
                            type="text"
                            placeholder="Example: 3 pieces"
                            value={form.furnitureQuantity}
                            disabled={disabled}
                            onChange={(event) =>
                              setField(
                                "furnitureQuantity",
                                event.target.value,
                              )
                            }
                          />
                        </label>
                        <label>
                          <span>Floor and stairs</span>
                          <input
                            type="text"
                            placeholder="First floor, one flight…"
                            value={form.furnitureStairs}
                            disabled={disabled}
                            onChange={(event) =>
                              setField(
                                "furnitureStairs",
                                event.target.value,
                              )
                            }
                          />
                        </label>
                      </div>
                    )}
                    {kind === "shed" && (
                      <div className="form-grid">
                        <label>
                          <span>Dimensions</span>
                          <input
                            type="text"
                            placeholder="Example: 8 × 12 ft"
                            value={form.shedDimensions}
                            disabled={disabled}
                            onChange={(event) =>
                              setField(
                                "shedDimensions",
                                event.target.value,
                              )
                            }
                          />
                        </label>
                        <label>
                          <span>Material</span>
                          <input
                            type="text"
                            placeholder="Wood, metal, resin…"
                            value={form.shedMaterial}
                            disabled={disabled}
                            onChange={(event) =>
                              setField("shedMaterial", event.target.value)
                            }
                          />
                        </label>
                        <label>
                          <span>Contents</span>
                          <input
                            type="text"
                            placeholder="Empty or what remains inside"
                            value={form.shedContents}
                            disabled={disabled}
                            onChange={(event) =>
                              setField("shedContents", event.target.value)
                            }
                          />
                        </label>
                        <label>
                          <span>Access</span>
                          <input
                            type="text"
                            placeholder="Gate width, slope, distance…"
                            value={form.shedAccess}
                            disabled={disabled}
                            onChange={(event) =>
                              setField("shedAccess", event.target.value)
                            }
                          />
                        </label>
                      </div>
                    )}
                    {kind === "appliances" && (
                      <div className="form-grid">
                        <label>
                          <span>Appliance type</span>
                          <input
                            type="text"
                            placeholder="Refrigerator, washer…"
                            value={form.applianceType}
                            disabled={disabled}
                            onChange={(event) =>
                              setField("applianceType", event.target.value)
                            }
                          />
                        </label>
                        <label>
                          <span>Floor</span>
                          <input
                            type="text"
                            placeholder="Garage, basement…"
                            value={form.applianceFloor}
                            disabled={disabled}
                            onChange={(event) =>
                              setField("applianceFloor", event.target.value)
                            }
                          />
                        </label>
                        <label>
                          <span>Disconnection status</span>
                          <select
                            value={form.applianceDisconnected}
                            disabled={disabled}
                            onChange={(event) =>
                              setField(
                                "applianceDisconnected",
                                event.target.value,
                              )
                            }
                          >
                            <option value="">Choose</option>
                            <option>Disconnected</option>
                            <option>Still connected</option>
                            <option>Not sure</option>
                          </select>
                        </label>
                      </div>
                    )}
                    {kind === "cleanouts" && (
                      <div className="form-grid">
                        <label>
                          <span>Rooms or areas</span>
                          <input
                            type="text"
                            placeholder="Garage and two bedrooms…"
                            value={form.cleanoutRooms}
                            disabled={disabled}
                            onChange={(event) =>
                              setField("cleanoutRooms", event.target.value)
                            }
                          />
                        </label>
                        <label>
                          <span>Approximate load</span>
                          <input
                            type="text"
                            placeholder="Half trailer, not sure…"
                            value={form.cleanoutLoad}
                            disabled={disabled}
                            onChange={(event) =>
                              setField("cleanoutLoad", event.target.value)
                            }
                          />
                        </label>
                        <label>
                          <span>Occupied or vacant?</span>
                          <select
                            value={form.cleanoutOccupancy}
                            disabled={disabled}
                            onChange={(event) =>
                              setField(
                                "cleanoutOccupancy",
                                event.target.value,
                              )
                            }
                          >
                            <option value="">Choose</option>
                            <option>Occupied</option>
                            <option>Vacant</option>
                            <option>Partially occupied</option>
                          </select>
                        </label>
                      </div>
                    )}
                    {kind === "debris" && (
                      <div className="form-grid">
                        <label>
                          <span>Material type</span>
                          <input
                            type="text"
                            placeholder="Branches, lumber, shingles…"
                            value={form.debrisMaterial}
                            disabled={disabled}
                            onChange={(event) =>
                              setField("debrisMaterial", event.target.value)
                            }
                          />
                        </label>
                        <label>
                          <span>Estimated volume</span>
                          <input
                            type="text"
                            placeholder="Pickup bed, trailer load…"
                            value={form.debrisVolume}
                            disabled={disabled}
                            onChange={(event) =>
                              setField("debrisVolume", event.target.value)
                            }
                          />
                        </label>
                      </div>
                    )}
                    {kind === "other" && (
                      <p className="quote-conditional__prompt">
                        Use the notes and photos below to show us the scope.
                      </p>
                    )}
                  </div>

                  <div className="quote-form-section">
                    <div className="quote-form-section__heading">
                      <span>Final details</span>
                      <small>Choose how we should respond.</small>
                    </div>
                    <fieldset className="choice-fieldset">
                      <legend>Preferred contact method</legend>
                      <div className="choice-grid choice-grid--three">
                        {contactOptions.map((option) => (
                          <ChoiceButton
                            key={option.value}
                            active={
                              form.preferredContact === option.value
                            }
                            disabled={disabled}
                            onClick={() =>
                              setField(
                                "preferredContact",
                                option.value,
                              )
                            }
                          >
                            {option.label}
                          </ChoiceButton>
                        ))}
                      </div>
                    </fieldset>
                    <label>
                      <span>
                        Anything else? <small>Optional</small>
                      </span>
                      <textarea
                        rows={3}
                        maxLength={2000}
                        placeholder="Parking notes, item condition, timing constraints, or other helpful details."
                        value={form.notes}
                        disabled={disabled}
                        onChange={(event) =>
                          setField("notes", event.target.value)
                        }
                      />
                    </label>
                    <label className="consent-check">
                      <input
                        id={quoteFieldIds.consent}
                        data-quote-field="consent"
                        type="checkbox"
                        checked={form.consent}
                        aria-invalid={Boolean(fieldErrors.consent)}
                        aria-describedby={quoteFieldDescribedBy(
                          "consent",
                          Boolean(fieldErrors.consent),
                        )}
                        disabled={disabled}
                        onChange={(event) =>
                          setField("consent", event.target.checked)
                        }
                      />
                      <span>
                        I agree that Uncle Sam Junk Removal may call, text, or
                        email me about this service request at the contact
                        information provided. Consent is not a condition of
                        purchase.
                      </span>
                    </label>
                    {fieldErrors.consent ? (
                      <p
                        className="field-error"
                        id={`${quoteFieldIds.consent}-error`}
                      >
                        {fieldErrors.consent}
                      </p>
                    ) : null}
                  </div>
                </div>

                {(Object.keys(fieldErrors).length > 0 || formError) && (
                  <div
                    className="form-alert"
                    role="alert"
                    tabIndex={-1}
                    ref={statusRef}
                  >
                    <strong>Please check the form.</strong>
                    {Object.keys(fieldErrors).length > 0 ? (
                      <ul className="form-alert__errors">
                        {Object.entries(fieldErrors).map(([key, message]) => {
                          const fieldId =
                            quoteFieldIds[key as QuoteFieldKey] ?? key;
                          return (
                            <li key={key}>
                              <a href={`#${fieldId}`}>{message}</a>
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      <span>{formError}</span>
                    )}
                    <div>
                      <a
                        href={`sms:${phoneHref}?body=${encodeURIComponent(
                          fallbackMessage,
                        )}`}
                      >
                        Text instead
                      </a>
                      <a
                        href={`mailto:${emailAddress}?subject=${encodeURIComponent(
                          "Junk removal quote request",
                        )}&body=${encodeURIComponent(fallbackMessage)}`}
                      >
                        Email instead
                      </a>
                    </div>
                  </div>
                )}

                <button
                  className="button button--full"
                  type="submit"
                  disabled={disabled}
                >
                  {isSubmitting
                    ? photos.length > 0
                      ? "Sending request and photos…"
                      : "Sending request…"
                    : "Get my free quote"}
                </button>
                <p className="form-disclaimer">
                  Your request is securely emailed to our local team. We use
                  these details only to respond about your project.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
