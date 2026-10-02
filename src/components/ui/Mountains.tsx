import { cn } from "@/lib/cn";

/**
 * Layered Himalayan silhouette with Machhapuchhre (Fishtail) right of centre.
 * `hero` sits under light heroes; `dark` is a quiet ridge for navy panels and the footer.
 */
export function Mountains({ variant = "hero", className }: { variant?: "hero" | "dark"; className?: string }) {
  if (variant === "dark") {
    return (
      <svg
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        className={cn("pointer-events-none block w-full", className)}
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M0 200L180 120L380 160L640 80L820 140L980 60L1160 140L1350 100L1440 150V200H0Z"
          fill="#ffffff"
          fillOpacity="0.04"
        />
        <path
          d="M0 200L240 150L480 175L760 110L890 30L940 70L970 20L1080 125L1300 160L1440 180V200H0Z"
          fill="#ffffff"
          fillOpacity="0.05"
        />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 1440 280"
      preserveAspectRatio="none"
      className={cn("pointer-events-none block w-full", className)}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M0 280L140 180L320 220L520 140L720 200L930 110L1080 190L1260 130L1440 220V280H0Z" fill="#e4e7ff" />
      <path
        d="M0 280L180 200L380 240L640 160L820 210L980 120L1160 210L1350 170L1440 230V280H0Z"
        fill="#a9c7ff"
        fillOpacity="0.4"
      />
      <path
        d="M0 280L240 220L480 250L760 170L890 70L940 120L970 60L1080 190L1300 230L1440 260V280H0Z"
        fill="#005bb3"
        fillOpacity="0.6"
      />
      <path d="M0 280L120 250L340 265L580 225L780 255L920 200L1060 245L1240 215L1440 260V280H0Z" fill="#262e52" />
    </svg>
  );
}
