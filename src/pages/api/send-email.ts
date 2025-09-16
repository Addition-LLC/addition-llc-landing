// src/pages/api/send-email.ts
import type { APIRoute } from "astro";
import { Resend } from "resend";

export const prerender = false;

const resend = new Resend(import.meta.env.RESEND_API_KEY);

/* ---------- helpers for pretty, email-safe HTML ---------- */
const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
const dash = (s?: string) => (s && s.trim() ? esc(s) : "—");

const pill = (text: string) =>
  `<span style="display:inline-block;padding:4px 10px;border-radius:9999px;background:#F1EEFF;color:#4C1D95;font-size:12px;line-height:1;margin:0 6px 6px 0;">${esc(
    text
  )}</span>`;

const ynPill = (val?: string) => {
  const yes = String(val).toLowerCase() === "true";
  return `<span style="display:inline-block;padding:4px 10px;border-radius:8px;background:${
    yes ? "#DCFCE7" : "#F3F4F6"
  };color:${yes ? "#166534" : "#374151"};font-size:12px;line-height:1;">${
    yes ? "Yes" : "No"
  }</span>`;
};

const sectionHeading = (text: string) =>
  `<tr><td style="padding:16px 0 8px 0;color:#111827;font-weight:700;font-size:14px;border-top:1px solid #E5E7EB">${esc(
    text
  )}</td></tr>`;

const kv = (label: string, valueHTML: string) => `
<tr>
  <td style="padding:6px 0;">
    <div style="color:#6B7280;font-size:12px;margin-bottom:4px;">${esc(label)}</div>
    <div style="color:#111827;font-size:14px;line-height:20px;">${valueHTML}</div>
  </td>
</tr>
`;

function buildEmailHTML(values: any, logoUrl: string) {
  const types = (values.projectType || []) as string[];
  const projectTypeHTML = types.length ? types.map(pill).join("") : "—";

  const featuresList = values.features
    ? String(values.features)
        .split(",")
        .map((s: string) => s.trim())
        .filter(Boolean)
        .map((f: string) => `<li>${esc(f)}</li>`)
        .join("")
    : "";

  const featuresHTML = featuresList
    ? `<ul style="padding-left:18px;margin:0;color:#111827;font-size:14px;line-height:20px;">${featuresList}</ul>`
    : "—";

  const loomHTML = values.loomVideoLink
    ? `<a href="${esc(values.loomVideoLink)}" style="color:#6D28D9;text-decoration:none;">${esc(
        values.loomVideoLink
      )}</a>`
    : "—";

  const year = new Date().getFullYear();

  // use HTML entities instead of unicode glyphs inside nested template expressions
  const timeline = `${dash(values.startDate)} &rarr; ${dash(values.endDate)}`;
  const contactCombined = `${dash(values.contactName)} &bull; ${dash(values.contactInfo)}`;

  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#F3F4F6;">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#F3F4F6;padding:24px 0;">
      <tr>
        <td align="center">
          <table role="presentation" cellpadding="0" cellspacing="0" width="640" style="background:#FFFFFF;border:1px solid #E5E7EB;border-radius:12px;">
            <tr>
              <td style="padding:24px 24px 12px 24px;text-align:center;border-bottom:1px solid #EFEFEF">
                <img src="${esc(
                  logoUrl
                )}" alt="Addition+" width="120" style="display:inline-block;height:auto;border:none;outline:none;text-decoration:none;">
              </td>
            </tr>
            <tr>
              <td style="padding:0 24px 8px 24px;text-align:center;">
                <div style="font-size:18px;color:#111827;font-weight:700;margin-top:8px;">New Project Requirements Submission</div>
                <div style="font-size:13px;color:#6B7280;margin-top:4px;">
                  From ${dash(values.contactName)} &lt;${dash(values.email)}&gt;
                </div>
              </td>
            </tr>

            <tr>
              <td style="padding:16px 24px 24px 24px;">
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%">

                  ${sectionHeading("Project Overview")}
                  ${kv("Project / Company", dash(values.projectName))}
                  ${kv("Description", dash(values.projectDescription))}
                  ${kv("Project Type(s)", projectTypeHTML)}

                  ${sectionHeading("Scope & Features")}
                  ${kv("Features", featuresHTML)}
                  ${kv("Target Users", dash(values.targetUserBase))}
                  ${kv("User Problem", dash(values.userProblem))}
                  ${kv("Target Age Range", dash(values.targetAgeRange))}

                  ${sectionHeading("Design & Technical")}
                  ${kv("Preferred Tech Stack", dash(values.preferredTechStack))}
                  ${kv("Design Guidelines", dash(values.designGuidelines))}
                  ${kv("Technical Requirements", dash(values.technicalRequirements))}

                  ${sectionHeading("Timeline & Ops")}
                  ${kv("Timeline", "${timeline}")}
                  ${kv("Maintenance Plan", dash(values.maintenancePlan))}
                  ${kv("User Training Required", ynPill(values.userTrainingRequired))}
                  ${kv("3rd-party Integration", ynPill(values.thirdPartyIntegration))}
                  ${kv("3rd-party Services", dash(values.thirdPartyServices))}

                  ${sectionHeading("Competition")}
                  ${kv("Competitors", dash(values.competitors))}
                  ${kv("Differentiation", dash(values.competitiveDifferentiation))}

                  ${sectionHeading("Links")}
                  ${kv("Loom Video", loomHTML)}

                  ${sectionHeading("Contact")}
                  ${kv("Name / Contact", "${contactCombined}")}

                </table>

                <div style="margin-top:20px;padding-top:12px;border-top:1px solid #E5E7EB;color:#9CA3AF;font-size:12px;text-align:center;">
                  © ${year} Addition+. Generated by the Addition+ request form.
                </div>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

/* ----------------------------- API handler ----------------------------- */
export const POST: APIRoute = async ({ request }) => {
  try {
    const form = await request.formData();

    const values = {
      email: String(form.get("email") || ""),
      projectName: String(form.get("projectName") || ""),
      projectDescription: String(form.get("projectDescription") || ""),
      loomVideoLink: String(form.get("loomVideoLink") || ""),
      targetUserBase: String(form.get("targetUserBase") || ""),
      userProblem: String(form.get("userProblem") || ""),
      targetAgeRange: String(form.get("targetAgeRange") || ""),
      projectType: form.getAll("projectType").map(String),
      features: String(form.get("features") || ""),
      preferredTechStack: String(form.get("preferredTechStack") || ""),
      designGuidelines: String(form.get("designGuidelines") || ""),
      technicalRequirements: String(form.get("technicalRequirements") || ""),
      startDate: String(form.get("startDate") || ""),
      endDate: String(form.get("endDate") || ""),
      maintenancePlan: String(form.get("maintenancePlan") || ""),
      userTrainingRequired: String(form.get("userTrainingRequired") || ""),
      thirdPartyIntegration: String(form.get("thirdPartyIntegration") || ""),
      thirdPartyServices: String(form.get("thirdPartyServices") || ""),
      competitors: String(form.get("competitors") || ""),
      competitiveDifferentiation: String(form.get("competitiveDifferentiation") || ""),
      contactName: String(form.get("contactName") || ""),
      contactInfo: String(form.get("contactInfo") || ""),
    };

    const LOGO_URL =
      import.meta.env.PUBLIC_LOGO_URL || "https://additionplus.ai/Logo.svg";

    const html = buildEmailHTML(values, LOGO_URL);

    const text = [
      `New Project Requirements Submission`,
      ``,
      `From: ${values.contactName || "—"} <${values.email || "—"}>`,
      `Project: ${values.projectName || "—"}`,
      `Types: ${(values.projectType || []).join(", ") || "—"}`,
      `Features: ${values.features || "—"}`,
      `Description: ${values.projectDescription || "—"}`,
      `Target Users: ${values.targetUserBase || "—"}`,
      `User Problem: ${values.userProblem || "—"}`,
      `Age Range: ${values.targetAgeRange || "—"}`,
      `Preferred Stack: ${values.preferredTechStack || "—"}`,
      `Design Guidelines: ${values.designGuidelines || "—"}`,
      `Technical Requirements: ${values.technicalRequirements || "—"}`,
      `Timeline: ${values.startDate || "—"} -> ${values.endDate || "—"}`,
      `Maintenance: ${values.maintenancePlan || "—"}`,
      `Training: ${values.userTrainingRequired || "—"}`,
      `3P Integration: ${values.thirdPartyIntegration || "—"}`,
      `3P Services: ${values.thirdPartyServices || "—"}`,
      `Competitors: ${values.competitors || "—"}`,
      `Differentiation: ${values.competitiveDifferentiation || "—"}`,
      `Loom: ${values.loomVideoLink || "—"}`,
      `Contact: ${values.contactName || "—"} • ${values.contactInfo || "—"}`,
    ].join("\n");

    const { error } = await resend.emails.send({
      from: "Addition Forms <forms@additionplus.ai>",
      to: ["odolbiniyam@gmail.com"],
      replyTo: values.email || undefined,
      subject: `New Project: ${values.projectName || "Submission"}`,
      html,
      text,
    });

    if (error) {
      return new Response(
        JSON.stringify({ ok: false, error: error.message }),
        { status: 500 }
      );
    }
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (e: any) {
    return new Response(
      JSON.stringify({ ok: false, error: e?.message ?? "Unknown error" }),
      { status: 500 }
    );
  }
};
