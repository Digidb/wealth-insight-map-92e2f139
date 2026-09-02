import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const contactSchema = z.object({
  nom: z.string().trim().min(2).max(100),
  telephone: z.string().trim().min(8).max(25),
  email: z.string().trim().email().max(255),
  projet: z.string().trim().min(1).max(120),
  precision: z.string().trim().max(1000).optional(),
});

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export const sendContactRequest = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    const lovableApiKey = process.env["LOVABLE_API_KEY"];
    const resendApiKey = process.env["RESEND_API_KEY"];
    if (!lovableApiKey || !resendApiKey) {
      throw new Error("Email service is not configured");
    }

    const rows: Array<[string, string]> = [
      ["Nom et prénom", data.nom],
      ["Téléphone", data.telephone],
      ["Email", data.email],
      ["Projet principal", data.projet],
      ["Précisions", data.precision?.length ? data.precision : "—"],
    ];

    const html = `
      <div style="font-family:Arial,Helvetica,sans-serif;color:#00032e">
        <h2 style="color:#00032e">Nouvelle demande de rendez-vous</h2>
        <table cellpadding="8" style="border-collapse:collapse">
          ${rows
            .map(
              ([label, value]) =>
                `<tr><td style="background:#f5f6fa;font-weight:bold">${escapeHtml(label)}</td><td>${escapeHtml(value).replace(/\n/g, "<br/>")}</td></tr>`,
            )
            .join("")}
        </table>
      </div>`;

    const response = await fetch("https://connector-gateway.lovable.dev/resend/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${lovableApiKey}`,
        "X-Connection-Api-Key": resendApiKey,
      },
      body: JSON.stringify({
        from: "Site Lamyae Ayoub <onboarding@resend.dev>",
        to: ["l.ayoub@predictis-mia.com"],
        reply_to: data.email,
        subject: `Demande de rendez-vous — ${data.nom}`,
        html,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`Resend request failed [${response.status}]: ${errorBody}`);
      throw new Error(`Resend request failed [${response.status}]: ${errorBody}`);
    }

    return { ok: true } as const;
  });
