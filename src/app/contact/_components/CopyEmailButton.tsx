"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

/** Copies the public email address to the clipboard and shows a short "Copied" state. */
export function CopyEmailButton({ email, className }: { email: string; className?: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  useEffect(() => {
    if (state === "idle") return;
    const t = window.setTimeout(() => setState("idle"), 2500);
    return () => window.clearTimeout(t);
  }, [state]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
    } catch {
      setState("failed");
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        "group inline-flex min-h-13 items-center justify-center gap-3 rounded-full px-7 text-[0.8125rem] font-semibold tracking-[0.08em] whitespace-nowrap uppercase transition-[background-color,color,transform] duration-200 active:scale-[0.98]",
        state === "copied" ? "bg-sky-200 text-ink" : "bg-white text-ink hover:bg-mist-100",
        className,
      )}
    >
      <Icon name={state === "copied" ? "check" : "copy"} className="size-5 text-brand-600" />
      <span aria-live="polite">
        {state === "copied" ? "Copied" : state === "failed" ? "Copy failed" : "Copy email"}
      </span>
    </button>
  );
}
