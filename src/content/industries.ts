/**
 * Industry verticals served by Habib Engineering.
 * Used on /industries, home page strip, and product pages.
 */
import type { LucideIcon } from "lucide-react";
import {
  Fuel,
  Zap,
  Hospital,
  Train,
  Factory,
  GraduationCap,
} from "lucide-react";

export type Industry = {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  highlights: string[];
  /** Tailwind gradient token for card background */
  accent: string;
};

export const industries: Industry[] = [
  {
    slug: "oil-gas",
    name: "Oil & Gas",
    shortName: "Oil & Gas",
    tagline: "Rugged power for harsh environments",
    description:
      "Explosion-proof panels, flameproof transformers and hazardous-area electrical systems for upstream, midstream and downstream operations.",
    icon: Fuel,
    highlights: [
      "Flameproof & explosion-proof panels",
      "Hazardous-area lighting systems",
      "Remote-site power distribution",
      "SCADA-ready instrumentation",
    ],
    accent: "from-amber-500/10 to-orange-500/10",
  },
  {
    slug: "power",
    name: "Power Generation & Distribution",
    shortName: "Power",
    tagline: "Grid-grade reliability",
    description:
      "Distribution and power transformers, MV switchgear, and complete substation packages for utilities, IPPs and captive power plants.",
    icon: Zap,
    highlights: [
      "Up to 40 MVA power transformers",
      "132 kV grid substations",
      "Substation automation",
      "Protection & control panels",
    ],
    accent: "from-yellow-500/10 to-amber-500/10",
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    shortName: "Healthcare",
    tagline: "Zero-downtime power for patient care",
    description:
      "Hospital-grade electrical systems, medical gas pipelines, nurse-call and fire-safety solutions for hospitals and diagnostic centers.",
    icon: Hospital,
    highlights: [
      "Isolated power systems (IPS)",
      "Nurse-call & bed-head panels",
      "Medical gas pipeline systems",
      "Redundant UPS & generators",
    ],
    accent: "from-emerald-500/10 to-teal-500/10",
  },
  {
    slug: "infrastructure",
    name: "Infrastructure & Transport",
    shortName: "Infrastructure",
    tagline: "Built for scale and safety",
    description:
      "Traction power, tunnel lighting, airport and railway electrical systems engineered for 24/7 operation.",
    icon: Train,
    highlights: [
      "Traction power systems",
      "Tunnel and underpass lighting",
      "Airport & rail electrical packages",
      "High-mast & street lighting",
    ],
    accent: "from-blue-500/10 to-indigo-500/10",
  },
  {
    slug: "industrial",
    name: "Industrial & Manufacturing",
    shortName: "Industrial",
    tagline: "Process continuity, by design",
    description:
      "Complete factory electrification — from incoming substations to motor control centres and industrial automation.",
    icon: Factory,
    highlights: [
      "Motor control centres (MCC)",
      "Cement, textile & steel plants",
      "Power factor correction",
      "Variable frequency drives",
    ],
    accent: "from-slate-500/10 to-zinc-500/10",
  },
  {
    slug: "education",
    name: "Education",
    shortName: "Education",
    tagline: "Safe, efficient campuses",
    description:
      "Electrical and low-voltage systems for universities, schools and research facilities — including security and access control.",
    icon: GraduationCap,
    highlights: [
      "Campus-wide LV distribution",
      "CCTV & access control",
      "Fire alarm & PA systems",
      "Energy-efficient lighting",
    ],
    accent: "from-purple-500/10 to-fuchsia-500/10",
  },
];

export const industryBySlug = (slug: string) =>
  industries.find((i) => i.slug === slug);