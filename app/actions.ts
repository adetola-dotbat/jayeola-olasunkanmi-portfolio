"use server";

import { headers } from "next/headers";
import { profile } from "@/content/profile";
import { type ContactField, type ContactState, isContactFormEnabled, validateContact } from "@/lib/contact";

// Best-effort, per-instance rate limit: 5 messages per IP per 10 minutes.
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > LIMIT;
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

export async function sendContactMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const values: Record<ContactField, string> = {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
  };

  // Spam traps: a hidden field humans never fill, and a minimum time on the page.
  const honeypot = String(formData.get("company") ?? "");
  const startedAt = Number(formData.get("startedAt") ?? 0);
  if (honeypot || (startedAt && Date.now() - startedAt < 2500)) {
    return { status: "success", message: "Thanks, your message has been sent." };
  }

  const errors = validateContact(values);
  if (Object.keys(errors).length) {
    return { status: "error", message: "Please fix the highlighted fields.", errors, values };
  }

  if (!isContactFormEnabled()) {
    return {
      status: "error",
      message: `Messaging is not available right now. Please email ${profile.email} directly.`,
      values,
    };
  }

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return {
      status: "error",
      message: `Too many messages in a short time. Please try again later or email ${profile.email}.`,
      values,
    };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>",
        to: [process.env.CONTACT_TO_EMAIL || profile.email],
        reply_to: values.email,
        subject: `Portfolio message from ${values.name}`,
        text: `${values.message}\n\n— ${values.name} <${values.email}>`,
        html: `<p>${escapeHtml(values.message).replace(/\n/g, "<br>")}</p><p>— ${escapeHtml(values.name)} &lt;${escapeHtml(values.email)}&gt;</p>`,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`Email provider responded ${res.status}`);
  } catch (error) {
    console.error("Contact form delivery failed", error);
    return {
      status: "error",
      message: `Your message could not be sent. Please try again or email ${profile.email} directly.`,
      values,
    };
  }

  return { status: "success", message: "Thanks, your message has been sent. I'll reply by email." };
}
