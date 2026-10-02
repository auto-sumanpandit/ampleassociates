"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

/** Must match INTERESTS in worker/index.js. */
const interests = [
  "Ample Cozy Homes",
  "Investing through Back2Nepal",
  "Education",
  "Energy",
  "Property development",
  "Partnership or project proposal",
  "Something else",
];

type Status = "idle" | "sending" | "sent" | "error";
type Errors = Partial<Record<"name" | "email" | "country" | "message", string>>;

const noopSubscribe = () => () => {};

const label = "text-[0.6875rem] font-semibold tracking-[0.12em] text-ink-muted uppercase";
const input =
  "mt-2 block min-h-13 w-full rounded-xl border border-line bg-white px-4 text-base text-ink transition-[border-color,box-shadow] placeholder:text-ink-soft focus:border-brand-600 focus:shadow-[0_0_0_3px_var(--color-mist-100)] focus:outline-none aria-[invalid=true]:border-danger";

/**
 * Contact form. Posts to /api/contact (handled by the Cloudflare Worker), which
 * emails the enquiry to the team. Works without JavaScript too: the Worker then
 * redirects back here with ?sent=1 or ?error=1.
 */
export function ContactForm({ email }: { email: string | null }) {
  const [submitStatus, setStatus] = useState<Status>("idle");
  const [dismissed, setDismissed] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const startedAt = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  // Without JavaScript the Worker redirects back with ?sent=1 or ?error=1; read it after hydration.
  const search = useSyncExternalStore(
    noopSubscribe,
    () => window.location.search,
    () => "",
  );
  const params = new URLSearchParams(search);
  const fromRedirect: Status = params.get("sent") === "1" ? "sent" : params.get("error") === "1" ? "error" : "idle";
  const status: Status = submitStatus !== "idle" || dismissed ? submitStatus : fromRedirect;

  useEffect(() => {
    if (startedAt.current) startedAt.current.value = String(Date.now());
  }, []);

  useEffect(() => {
    if (status === "sent" || status === "error") statusRef.current?.focus();
  }, [status]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    setErrors({});
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form).entries())),
      });
      const body = (await res.json().catch(() => ({}))) as { ok?: boolean; errors?: Errors };
      if (res.ok && body.ok) {
        form.reset();
        setStatus("sent");
      } else if (body.errors) {
        setErrors(body.errors);
        setStatus("idle");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="flex flex-col items-start gap-4 rounded-3xl bg-white p-8 shadow-lift focus:outline-none md:p-10"
      >
        <span className="inline-flex size-14 items-center justify-center rounded-full bg-brand-600 text-white">
          <Icon name="check" className="size-7" />
        </span>
        <h3 className="text-heading-sm font-semibold text-ink">Thank you. Your message is on its way.</h3>
        <p className="leading-relaxed text-ink-muted">
          It has been sent to our team, who will reply to the email address you gave.
        </p>
        <button
          type="button"
          onClick={() => {
            window.history.replaceState(null, "", "/contact/#enquiry");
            setDismissed(true);
            setStatus("idle");
          }}
          className="text-sm font-semibold text-brand-600 underline-offset-4 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  const fieldError = (k: keyof Errors) =>
    errors[k] ? (
      <p id={`${k}-error`} className="mt-2 text-sm text-danger">
        {errors[k]}
      </p>
    ) : null;

  return (
    <form
      action="/api/contact"
      method="post"
      onSubmit={onSubmit}
      noValidate={false}
      className="rounded-3xl bg-white p-6 shadow-lift sm:p-8 md:p-10"
    >
      {status === "error" && (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          className="mb-6 flex gap-3 rounded-2xl bg-danger-bg p-4 text-sm text-danger focus:outline-none"
        >
          <Icon name="alert" className="mt-0.5 size-5 shrink-0" />
          <p>
            Sorry, your message could not be sent. Please try again in a moment
            {email && (
              <>
                , or email us at{" "}
                <a href={`mailto:${email}`} className="font-semibold underline">
                  {email}
                </a>
              </>
            )}
            .
          </p>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={label}>
            Your name
          </label>
          <input
            id="cf-name"
            name="name"
            required
            maxLength={100}
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={input}
          />
          {fieldError("name")}
        </div>
        <div>
          <label htmlFor="cf-email" className={label}>
            Email
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={input}
          />
          {fieldError("email")}
        </div>
        <div>
          <label htmlFor="cf-country" className={label}>
            Country <span className="font-normal tracking-normal normal-case">(optional)</span>
          </label>
          <input
            id="cf-country"
            name="country"
            maxLength={80}
            autoComplete="country-name"
            aria-invalid={Boolean(errors.country)}
            className={input}
          />
          {fieldError("country")}
        </div>
        <div>
          <label htmlFor="cf-interest" className={label}>
            I am interested in
          </label>
          <select id="cf-interest" name="interest" defaultValue={interests[0]} className={cn(input, "pr-10")}>
            {interests.map((i) => (
              <option key={i}>{i}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="cf-message" className={label}>
            Message
          </label>
          <textarea
            id="cf-message"
            name="message"
            required
            minLength={10}
            maxLength={4000}
            rows={6}
            placeholder="Tell us what you would like to know, and the best time to reply."
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={cn(input, "py-3 leading-relaxed")}
          />
          {fieldError("message")}
        </div>
      </div>

      {/* Spam checks: bots fill the hidden field, and the form records when it was opened. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="cf-website">Website</label>
        <input id="cf-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <input ref={startedAt} type="hidden" name="startedAt" />

      <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-sm leading-relaxed text-ink-muted">
          We use your details only to reply to you. See our{" "}
          <Link href="/privacy-policy/" className="text-brand-600 underline underline-offset-2">
            Privacy Policy
          </Link>
          .
        </p>
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex min-h-13 shrink-0 items-center justify-center gap-3 rounded-full bg-brand-600 px-7 text-[0.8125rem] font-semibold tracking-[0.08em] text-white uppercase shadow-glow transition-colors hover:bg-brand-800 disabled:cursor-wait disabled:opacity-70"
        >
          {status === "sending" ? "Sending…" : "Send message"}
          <span className="-mr-4 inline-flex size-8 items-center justify-center rounded-full bg-white text-brand-600 transition-transform group-hover:translate-x-0.5">
            <Icon name="arrowRight" className="size-4" />
          </span>
        </button>
      </div>
    </form>
  );
}
