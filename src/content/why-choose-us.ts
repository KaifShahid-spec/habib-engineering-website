/**
 * Differentiation points and key numbers shown on /about/why-choose-us
 * and the home page trust bar.
 */
import type { LucideIcon } from "lucide-react";
import {
  Factory,
  ShieldCheck,
  Clock,
  Users,
  Award,
  Wrench,
  MapPin,
  Headphones,
} from "lucide-react";

export type Differentiator = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const differentiators: Differentiator[] = [
  {
    title: "In-House Manufacturing",
    description:
      "We design, wind and test our own transformers — no middlemen, no imported delays, full quality control end-to-end.",
    icon: Factory,
  },
  {
    title: "40 Years of Experience",
    description:
      "Since 1985, we have delivered more than 500 projects across Pakistan's toughest industries.",
    icon: Award,
  },
  {
    title: "ISO Certified",
    description:
      "ISO 9001, 14001 and 45001 certified — quality, environmental and safety management audited annually.",
    icon: ShieldCheck,
  },
  {
    title: "On-Time Delivery",
    description:
      "Realistic schedules, transparent progress reporting, and penalties-backed commitments.",
    icon: Clock,
  },
  {
    title: "In-House Testing",
    description:
      "FAT performed at our facility with calibrated instrumentation and third-party witness on request.",
    icon: Wrench,
  },
  {
    title: "Lifetime Support",
    description:
      "LTSA contracts, spare parts inventory and emergency overhaul for as long as you own the equipment.",
    icon: Headphones,
  },
  {
    title: "Experienced Team",
    description:
      "PEC-registered engineers with deep expertise in power, industrial and healthcare electrical systems.",
    icon: Users,
  },
  {
    title: "Nationwide Presence",
    description:
      "Projects delivered in Lahore, Karachi, Islamabad, Gwadar and beyond — with rapid site response.",
    icon: MapPin,
  },
];

/**
 * Key numbers — used in the TrustBar / Counters section.
 * ⚠️ TODO: verify with client before publishing.
 */
export type Stat = {
  value: string;
  label: string;
  suffix?: string;
};

export const stats: Stat[] = [
  { value: "40", suffix: "+", label: "Years of Experience" },
  { value: "500", suffix: "+", label: "Projects Delivered" },
  { value: "45", suffix: "+", label: "Clients Served" },
  { value: "3", label: "ISO Certifications" },
];

/**
 * Certifications strip — used on home page TrustBar.
 * ⚠️ Only include those with a real certificate on file.
 */
export type Certification = {
  name: string;
  shortName: string;
  description: string;
  year?: string;
};

export const certifications: Certification[] = [
  {
    name: "ISO 9001:2015",
    shortName: "ISO 9001",
    description: "Quality Management System",
    year: "2015",
  },
  {
    name: "ISO 14001:2015",
    shortName: "ISO 14001",
    description: "Environmental Management System",
    year: "2015",
  },
  {
    name: "ISO 45001:2018",
    shortName: "ISO 45001",
    description: "Occupational Health & Safety",
    year: "2018",
  },
  // ⚠️ The following two were mentioned in PDF but certificates not on file.
  // Enable only after client provides proof:
  // { name: "ISO 17025", shortName: "ISO 17025", description: "Testing & Calibration Labs" },
  // { name: "PEC Registered", shortName: "PEC", description: "Pakistan Engineering Council" },
];