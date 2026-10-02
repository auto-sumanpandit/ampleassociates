/**
 * Edge entry for the static site (Cloudflare Workers static assets).
 *
 * 1. One canonical form for every URL: https, without "www" (301 for anything else).
 * 2. POST /api/contact: the contact form. Sends the enquiry by email through the
 *    CONTACT_EMAIL binding, which can only deliver to the verified Email Routing
 *    destination set in wrangler.jsonc (pramod@ampleedu.com).
 * 3. Everything else is served from the static build (dist/), where _headers and
 *    _redirects still apply.
 */
import { EmailMessage } from "cloudflare:email";

const FROM = { name: "Ample Associates website", email: "website@ampleassociates.com" };
const INTERESTS = [
  "Ample Cozy Homes",
  "Investing through Back2Nepal",
  "Education",
  "Energy",
  "Property development",
  "Partnership or project proposal",
  "Something else",
];
const LIMITS = { name: 100, email: 200, country: 80, message: 4000 };
const MIN_FILL_MS = 3000;

const worker = {
  async fetch(request, env) {
    const url = new URL(request.url);
    let redirect = false;
    if (url.hostname.startsWith("www.")) {
      url.hostname = url.hostname.slice(4);
      redirect = true;
    }
    if (url.protocol === "http:") {
      url.protocol = "https:";
      redirect = true;
    }
    if (redirect) return Response.redirect(url.toString(), 301);

    if (url.pathname === "/api/contact" || url.pathname === "/api/contact/") {
      return handleContact(request, env, url);
    }
    return env.ASSETS.fetch(request);
  },
};

export default worker;

async function handleContact(request, env, url) {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: { Allow: "POST" } });
  }
  const wantsJson = (request.headers.get("accept") ?? "").includes("application/json");
  const reply = (status, body) =>
    wantsJson
      ? Response.json(body, { status, headers: { "Cache-Control": "no-store" } })
      : Response.redirect(`${url.origin}/contact/?${body.ok ? "sent=1" : "error=1"}#enquiry`, 303);

  // Same-origin only.
  const origin = request.headers.get("origin");
  if (origin && origin !== url.origin) return reply(403, { ok: false, error: "forbidden" });

  // A few submissions per minute per visitor.
  if (env.CONTACT_LIMITER) {
    const ip = request.headers.get("cf-connecting-ip") ?? "unknown";
    const { success } = await env.CONTACT_LIMITER.limit({ key: ip });
    if (!success) return reply(429, { ok: false, error: "rate_limited" });
  }

  let data;
  try {
    const type = request.headers.get("content-type") ?? "";
    data = type.includes("application/json")
      ? await request.json()
      : Object.fromEntries((await request.formData()).entries());
  } catch {
    return reply(400, { ok: false, error: "invalid" });
  }

  const field = (k) => (typeof data[k] === "string" ? data[k].trim() : "");
  const name = oneLine(field("name"));
  const email = oneLine(field("email"));
  const country = oneLine(field("country"));
  const interest = INTERESTS.includes(field("interest")) ? field("interest") : "Something else";
  const message = field("message");

  // Bots: the hidden "website" field must stay empty and the form must take a few seconds to fill.
  const startedAt = Number(field("startedAt"));
  if (field("website") || (startedAt && Date.now() - startedAt < MIN_FILL_MS)) {
    return reply(200, { ok: true }); // pretend success, send nothing
  }

  const errors = {};
  if (!name || name.length > LIMITS.name) errors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > LIMITS.email)
    errors.email = "Please enter a valid email address.";
  if (country.length > LIMITS.country) errors.country = "Please shorten the country.";
  if (message.length < 10 || message.length > LIMITS.message)
    errors.message = "Please write a message of at least 10 characters.";
  if (Object.keys(errors).length) return reply(422, { ok: false, error: "validation", errors });

  const text = [
    `New enquiry from the Ample Associates website`,
    ``,
    `Name:     ${name}`,
    `Email:    ${email}`,
    `Country:  ${country || "Not given"}`,
    `Interest: ${interest}`,
    ``,
    `Message:`,
    message,
    ``,
    `--`,
    `Sent from ${url.origin}/contact/ on ${new Date().toUTCString()}.`,
    `Reply to this email to answer ${name} directly.`,
  ].join("\n");

  const raw = mime({
    from: FROM,
    to: env.CONTACT_TO,
    replyTo: { name, email },
    subject: `Website enquiry: ${interest} (${name})`,
    text,
  });

  try {
    await env.CONTACT_EMAIL.send(new EmailMessage(FROM.email, env.CONTACT_TO, raw));
  } catch (err) {
    console.error("contact send failed", err);
    return reply(502, { ok: false, error: "send_failed" });
  }
  return reply(200, { ok: true });
}

/** Strips line breaks so user input can never add email headers. */
function oneLine(s) {
  return s.replace(/[\r\n]+/g, " ").trim();
}

function encodeWord(s) {
  return /^[\x20-\x7e]*$/.test(s) ? s : `=?UTF-8?B?${b64(s)}?=`;
}

function address({ name, email }) {
  return `${encodeWord(name.replace(/["\\]/g, ""))} <${email}>`;
}

function b64(s) {
  const bytes = new TextEncoder().encode(s);
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin);
}

function mime({ from, to, replyTo, subject, text }) {
  const body = b64(text).replace(/.{1,76}/g, "$&\r\n");
  return [
    `From: ${address(from)}`,
    `To: ${to}`,
    `Reply-To: ${address(replyTo)}`,
    `Subject: ${encodeWord(subject)}`,
    `Date: ${new Date().toUTCString()}`,
    `Message-ID: <${crypto.randomUUID()}@ampleassociates.com>`,
    `MIME-Version: 1.0`,
    `Content-Type: text/plain; charset=UTF-8`,
    `Content-Transfer-Encoding: base64`,
    ``,
    body,
  ].join("\r\n");
}
