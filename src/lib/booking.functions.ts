import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const TIMEZONE = "Europe/Paris";
const CALENDAR_ID = "l.ayoub@predictis-mia.com";
const BUSY_CALENDARS = [
  "l.ayoub@predictis-mia.com",
  "c_95b7ec40f18d24d6c4393ffbb7e3d8304c916b0949e5d0268630760f9cd39154@group.calendar.google.com",
];
const SLOT_MINUTES = 30;
const LEAD_TIME_MINUTES = 120;
const DAYS_AHEAD = 21;
const CALENDAR_GATEWAY = "https://connector-gateway.lovable.dev/google_calendar/calendar/v3";
const RESEND_GATEWAY = "https://connector-gateway.lovable.dev/resend/emails";

// Opening hours in Paris local time, per weekday (0 = Sunday).
const OPENING: Record<number, Array<[string, string]>> = {
  1: [["09:00", "19:00"]],
  2: [["09:00", "19:00"]],
  3: [["09:00", "19:00"]],
  4: [["09:00", "19:00"]],
  5: [["09:00", "19:00"]],
  6: [["09:00", "12:00"]],
};

export const projectOptions = [
  { value: "fiscalite", label: "Optimiser ma fiscalité" },
  { value: "retraite", label: "Préparer ma retraite" },
  { value: "credit-immobilier", label: "Financer mon crédit immobilier" },
  { value: "placement-financier", label: "Faire fructifier mon placement financier" },
  { value: "assurance-emprunteur", label: "Renégocier mon assurance emprunteur" },
  { value: "prevoyance", label: "Protéger mes proches avec une solution de prévoyance" },
  { value: "autre", label: "Autre demande" },
] as const;

const projectValues = projectOptions.map((option) => option.value) as [string, ...string[]];

const projectLabels = Object.fromEntries(
  projectOptions.map((option) => [option.value, option.label]),
) as Record<string, string>;

export const bookingSchema = z
  .object({
    nom: z.string().trim().min(2).max(100),
    telephone: z.string().trim().min(8).max(25),
    email: z.string().trim().email().max(255),
    projet: z.enum(projectValues),
    precision: z.string().trim().max(600).optional(),
    slot: z.string().datetime(),
    website: z.string().max(0).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.projet === "autre" && !data.precision) {
      ctx.addIssue({ code: "custom", path: ["precision"], message: "Merci de préciser votre demande." });
    }
  });

function tzOffsetMs(instant: number): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIMEZONE,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(new Date(instant));
  const get = (type: string) => Number(parts.find((part) => part.type === type)?.value ?? "0");
  const asUtc = Date.UTC(
    get("year"),
    get("month") - 1,
    get("day"),
    get("hour") % 24,
    get("minute"),
    get("second"),
  );
  return asUtc - instant;
}

/** Convert a Paris wall-clock time to the matching UTC instant. */
function parisToUtc(year: number, month: number, day: number, hour: number, minute: number): number {
  const guess = Date.UTC(year, month - 1, day, hour, minute);
  const offset = tzOffsetMs(guess - tzOffsetMs(guess));
  return guess - offset;
}

function parisParts(instant: number) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TIMEZONE,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    weekday: "short",
  }).formatToParts(new Date(instant));
  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  return {
    year: Number(get("year")),
    month: Number(get("month")),
    day: Number(get("day")),
    hour: Number(get("hour")) % 24,
    minute: Number(get("minute")),
  };
}

function gatewayHeaders() {
  const lovableApiKey = process.env["LOVABLE_API_KEY"];
  const calendarKey = process.env["GOOGLE_CALENDAR_API_KEY"];
  if (!lovableApiKey || !calendarKey) throw new Error("Calendar service is not configured");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${lovableApiKey}`,
    "X-Connection-Api-Key": calendarKey,
  };
}

type BusyInterval = { start: number; end: number };

async function fetchBusy(timeMin: string, timeMax: string): Promise<BusyInterval[]> {
  const response = await fetch(`${CALENDAR_GATEWAY}/freeBusy`, {
    method: "POST",
    headers: gatewayHeaders(),
    body: JSON.stringify({
      timeMin,
      timeMax,
      timeZone: TIMEZONE,
      items: BUSY_CALENDARS.map((id) => ({ id })),
    }),
  });
  const body = await response.text();
  if (!response.ok) {
    console.error(`freeBusy failed [${response.status}]: ${body}`);
    throw new Error(`freeBusy failed [${response.status}]`);
  }
  const parsed = JSON.parse(body) as {
    calendars?: Record<string, { busy?: Array<{ start: string; end: string }> }>;
  };
  const intervals: BusyInterval[] = [];
  for (const calendar of Object.values(parsed.calendars ?? {})) {
    for (const slot of calendar.busy ?? []) {
      intervals.push({ start: Date.parse(slot.start), end: Date.parse(slot.end) });
    }
  }
  return intervals;
}

function dayKey(year: number, month: number, day: number) {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export const getAvailability = createServerFn({ method: "GET" }).handler(async () => {
  const now = Date.now();
  const earliest = now + LEAD_TIME_MINUTES * 60_000;
  const today = parisParts(now);
  const rangeStart = parisToUtc(today.year, today.month, today.day, 0, 0);
  const rangeEnd = rangeStart + (DAYS_AHEAD + 1) * 24 * 3_600_000;

  const busy = await fetchBusy(new Date(rangeStart).toISOString(), new Date(rangeEnd).toISOString());

  const days: Array<{ date: string; slots: string[] }> = [];

  for (let index = 0; index <= DAYS_AHEAD; index += 1) {
    const probe = parisParts(rangeStart + index * 24 * 3_600_000 + 12 * 3_600_000);
    const weekday = new Date(
      Date.UTC(probe.year, probe.month - 1, probe.day),
    ).getUTCDay();
    const ranges = OPENING[weekday];
    if (!ranges) continue;

    const slots: string[] = [];
    for (const [from, to] of ranges) {
      const [fromHour, fromMinute] = from.split(":").map(Number);
      const [toHour, toMinute] = to.split(":").map(Number);
      const open = parisToUtc(probe.year, probe.month, probe.day, fromHour ?? 9, fromMinute ?? 0);
      const close = parisToUtc(probe.year, probe.month, probe.day, toHour ?? 18, toMinute ?? 0);
      for (let start = open; start + SLOT_MINUTES * 60_000 <= close; start += SLOT_MINUTES * 60_000) {
        const end = start + SLOT_MINUTES * 60_000;
        if (start < earliest) continue;
        const overlaps = busy.some((interval) => start < interval.end && end > interval.start);
        if (overlaps) continue;
        slots.push(new Date(start).toISOString());
      }
    }
    if (slots.length > 0) {
      days.push({ date: dayKey(probe.year, probe.month, probe.day), slots });
    }
  }

  return { timezone: TIMEZONE, slotMinutes: SLOT_MINUTES, days };
});

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

function formatParisDateTime(instant: number) {
  return new Intl.DateTimeFormat("fr-FR", {
    timeZone: TIMEZONE,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(instant));
}

export const bookAppointment = createServerFn({ method: "POST" })
  .validator((data: unknown) => bookingSchema.parse(data))
  .handler(async ({ data }) => {
    const start = Date.parse(data.slot);
    const end = start + SLOT_MINUTES * 60_000;
    if (!Number.isFinite(start) || start < Date.now()) {
      throw new Error("Ce créneau n'est plus disponible.");
    }

    const busy = await fetchBusy(new Date(start).toISOString(), new Date(end).toISOString());
    if (busy.some((interval) => start < interval.end && end > interval.start)) {
      return { ok: false as const, reason: "slot-taken" as const };
    }

    const projectLabel = projectLabels[data.projet] ?? data.projet;
    const details = [
      `Nom : ${data.nom}`,
      `Téléphone : ${data.telephone}`,
      `Email : ${data.email}`,
      `Projet : ${projectLabel}`,
      data.precision ? `Précisions : ${data.precision}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const eventResponse = await fetch(
      `${CALENDAR_GATEWAY}/calendars/${encodeURIComponent(CALENDAR_ID)}/events?sendUpdates=all`,
      {
        method: "POST",
        headers: gatewayHeaders(),
        body: JSON.stringify({
          summary: `RDV patrimoine — ${data.nom}`,
          description: details,
          start: { dateTime: new Date(start).toISOString(), timeZone: TIMEZONE },
          end: { dateTime: new Date(end).toISOString(), timeZone: TIMEZONE },
          attendees: [{ email: data.email, displayName: data.nom }],
          reminders: { useDefault: true },
        }),
      },
    );
    const eventBody = await eventResponse.text();
    if (!eventResponse.ok) {
      console.error(`Calendar event creation failed [${eventResponse.status}]: ${eventBody}`);
      throw new Error(`Calendar event creation failed [${eventResponse.status}]`);
    }

    const lovableApiKey = process.env["LOVABLE_API_KEY"];
    const resendApiKey = process.env["RESEND_API_KEY"];
    if (lovableApiKey && resendApiKey) {
      const rows: Array<[string, string]> = [
        ["Date du rendez-vous", formatParisDateTime(start)],
        ["Nom et prénom", data.nom],
        ["Téléphone", data.telephone],
        ["Email", data.email],
        ["Projet principal", projectLabel],
        ["Précisions", data.precision?.length ? data.precision : "—"],
      ];
      const html = `
        <div style="font-family:Arial,Helvetica,sans-serif;color:#00032e">
          <h2 style="color:#00032e">Nouveau rendez-vous confirmé</h2>
          <table cellpadding="8" style="border-collapse:collapse">
            ${rows
              .map(
                ([label, value]) =>
                  `<tr><td style="background:#f5f6fa;font-weight:bold">${escapeHtml(label)}</td><td>${escapeHtml(value).replace(/\n/g, "<br/>")}</td></tr>`,
              )
              .join("")}
          </table>
        </div>`;

      const mail = await fetch(RESEND_GATEWAY, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${lovableApiKey}`,
          "X-Connection-Api-Key": resendApiKey,
        },
        body: JSON.stringify({
          from: "Site Lamyae Ayoub <contact@lamyaeayoub.fr>",
          to: ["l.ayoub@predictis-mia.com"],
          reply_to: data.email,
          subject: `Rendez-vous — ${data.nom} — ${formatParisDateTime(start)}`,
          html,
        }),
      });
      if (!mail.ok) {
        console.error(`Resend notification failed [${mail.status}]: ${await mail.text()}`);
      }
    }

    return { ok: true as const, start: new Date(start).toISOString() };
  });
