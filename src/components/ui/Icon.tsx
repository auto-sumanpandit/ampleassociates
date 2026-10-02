import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Buildings,
  CaretDown,
  Check,
  Clock,
  Compass,
  Copy,
  Envelope,
  FileText,
  Globe,
  House,
  Info,
  Lightning,
  List,
  Lock,
  MapPin,
  ShieldCheck,
  Stack,
  Users,
  Warning,
  X,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";

/** The site's icon set (Phosphor, regular weight). Names are the site's own, so call sites stay stable. */
const icons = {
  arrowRight: ArrowRight,
  arrowUpRight: ArrowUpRight,
  check: Check,
  chevronDown: CaretDown,
  menu: List,
  close: X,
  mapPin: MapPin,
  document: FileText,
  lock: Lock,
  shield: ShieldCheck,
  home: House,
  bolt: Lightning,
  building: Buildings,
  book: BookOpen,
  compass: Compass,
  copy: Copy,
  globe: Globe,
  alert: Warning,
  info: Info,
  mail: Envelope,
  users: Users,
  layers: Stack,
  clock: Clock,
} satisfies Record<string, PhosphorIcon>;

export type IconName = keyof typeof icons;

interface IconProps {
  name: IconName;
  /** Provide a label only when the icon conveys meaning on its own. */
  label?: string;
  className?: string;
}

export function Icon({ name, label, className = "size-5" }: IconProps) {
  const Glyph = icons[name];
  return (
    <Glyph
      weight="regular"
      className={className}
      aria-hidden={label ? undefined : true}
      role={label ? "img" : undefined}
      aria-label={label}
      focusable="false"
    />
  );
}
