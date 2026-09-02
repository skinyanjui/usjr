export const BUSINESS_TIME_ZONE = "America/Chicago";

const CALLBACK_OPEN_MINUTES = 8 * 60;
const CALLBACK_LAST_START_MINUTES = 16 * 60 + 30;
const CALLBACK_HOLD_MINUTES = 30;

type ChicagoParts = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  weekday: number;
};

function padTwo(value: number) {
  return String(value).padStart(2, "0");
}

function getChicagoParts(date: Date): ChicagoParts {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: BUSINESS_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    weekday: "short",
  }).formatToParts(date);

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";

  const weekdayMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  return {
    year: Number(get("year")),
    month: Number(get("month")),
    day: Number(get("day")),
    hour: Number(get("hour")),
    minute: Number(get("minute")),
    weekday: weekdayMap[get("weekday")] ?? 0,
  };
}

export function dateFromChicagoWallTime(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
) {
  let utcMs = Date.UTC(year, month - 1, day, hour + 6, minute);

  for (let attempt = 0; attempt < 6; attempt += 1) {
    const parts = getChicagoParts(new Date(utcMs));
    const diffMinutes =
      (year - parts.year) * 525_600 +
      (month - parts.month) * 43_200 +
      (day - parts.day) * 1_440 +
      (hour - parts.hour) * 60 +
      (minute - parts.minute);

    if (diffMinutes === 0) {
      break;
    }

    utcMs += diffMinutes * 60_000;
  }

  return new Date(utcMs);
}

function addChicagoDays(from: Date, days: number) {
  const parts = getChicagoParts(from);
  const anchor = dateFromChicagoWallTime(
    parts.year,
    parts.month,
    parts.day,
    12,
    0,
  );
  return new Date(anchor.getTime() + days * 86_400_000);
}

function nextMondayEightAmAfter(from: Date) {
  for (let dayOffset = 0; dayOffset <= 7; dayOffset += 1) {
    const day = addChicagoDays(from, dayOffset);
    const parts = getChicagoParts(day);
    if (parts.weekday !== 1) {
      continue;
    }

    const candidate = dateFromChicagoWallTime(
      parts.year,
      parts.month,
      parts.day,
      8,
      0,
    );
    if (candidate > from) {
      return candidate;
    }
  }

  throw new Error("Could not find the next Monday 8:00 a.m. CT callback slot.");
}

function roundUpToThirtyMinutes(date: Date) {
  const parts = getChicagoParts(date);
  let { year, month, day, hour, minute } = parts;

  if (minute > 0 && minute <= 30) {
    minute = 30;
  } else if (minute > 30) {
    minute = 0;
    hour += 1;
  }

  if (hour >= 24) {
    const nextDay = addChicagoDays(date, 1);
    const nextParts = getChicagoParts(nextDay);
    return dateFromChicagoWallTime(
      nextParts.year,
      nextParts.month,
      nextParts.day,
      0,
      0,
    );
  }

  return dateFromChicagoWallTime(year, month, day, hour, minute);
}

export function computeCallbackHoldWindow(receivedAt: Date) {
  const parts = getChicagoParts(receivedAt);
  const minutes = parts.hour * 60 + parts.minute;
  const isSunday = parts.weekday === 0;
  const isMonSat = parts.weekday >= 1 && parts.weekday <= 6;
  const inWindow =
    isMonSat &&
    minutes >= CALLBACK_OPEN_MINUTES &&
    minutes <= CALLBACK_LAST_START_MINUTES;

  let start: Date;

  if (isSunday || (isMonSat && minutes > CALLBACK_LAST_START_MINUTES)) {
    start = nextMondayEightAmAfter(receivedAt);
  } else if (isMonSat && minutes < CALLBACK_OPEN_MINUTES) {
    start = dateFromChicagoWallTime(
      parts.year,
      parts.month,
      parts.day,
      8,
      0,
    );
  } else if (inWindow) {
    const afterBuffer = new Date(
      receivedAt.getTime() + CALLBACK_HOLD_MINUTES * 60_000,
    );
    start = roundUpToThirtyMinutes(afterBuffer);
    const startParts = getChicagoParts(start);
    const startMinutes = startParts.hour * 60 + startParts.minute;
    if (
      startMinutes > CALLBACK_LAST_START_MINUTES ||
      startParts.weekday === 0
    ) {
      start = nextMondayEightAmAfter(receivedAt);
    }
  } else {
    start = nextMondayEightAmAfter(receivedAt);
  }

  const end = new Date(start.getTime() + CALLBACK_HOLD_MINUTES * 60_000);
  return { start, end };
}

export function formatGoogleCalendarChicago(date: Date) {
  const parts = getChicagoParts(date);
  return `${parts.year}${padTwo(parts.month)}${padTwo(parts.day)}T${padTwo(parts.hour)}${padTwo(parts.minute)}00`;
}

export function businessDateString(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: BUSINESS_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const values = Object.fromEntries(
    parts
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, part.value]),
  );

  return `${values.year}-${values.month}-${values.day}`;
}

export function isIsoDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const candidate = new Date(Date.UTC(year, month - 1, day));
  return (
    candidate.getUTCFullYear() === year &&
    candidate.getUTCMonth() === month - 1 &&
    candidate.getUTCDate() === day
  );
}

export function isPastBusinessDate(value: string, now = new Date()) {
  return isIsoDate(value) && value < businessDateString(now);
}

export function formatReceivedAtChicago(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: BUSINESS_TIME_ZONE,
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).formatToParts(date);

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";

  const dayPeriod = get("dayPeriod").toLowerCase();
  const period = dayPeriod.startsWith("a") ? "a.m." : "p.m.";

  return `${get("month")} ${get("day")}, ${get("year")}, ${get("hour")}:${get("minute")} ${period} CT`;
}
