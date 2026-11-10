/**
 * Service categories and details.
 * Used on /services and its sub-pages.
 */
import type { LucideIcon } from "lucide-react";
import {
  Building2,
  Wrench,
  ShieldCheck,
  Sun,
  FlaskConical,
  LifeBuoy,
} from "lucide-react";

export type ServiceHighlight = {
  title: string;
  description: string;
};

export type Service = {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  /** Route href for the service detail page */
  href: string;
  highlights: ServiceHighlight[];
};

export const services: Service[] = [
  {
    slug: "turnkey-solutions",
    name: "Turnkey Electrical Solutions",
    shortName: "Turnkey",
    tagline: "Design, build, test, commission",
    description:
      "End-to-end EPC delivery — from concept and detailed design to manufacturing, installation, testing and handover. One contract, one accountable partner.",
    icon: Building2,
    href: "/services/turnkey-solutions",
    highlights: [
      {
        title: "Single-source accountability",
        description:
          "Design, supply, installation and commissioning under one contract.",
      },
      {
        title: "Fast-track delivery",
        description:
          "In-house manufacturing shortens lead times vs. imports.",
      },
      {
        title: "Defect-free handover",
        description:
          "Structured FAT, SAT and SIT protocols before energization.",
      },
    ],
  },
  {
    slug: "mep",
    name: "MEP — Mechanical, Electrical, Plumbing",
    shortName: "MEP",
    tagline: "Complete building services",
    description:
      "Integrated MEP design and installation for commercial, healthcare and industrial buildings — HVAC, power, lighting, plumbing and fire-fighting.",
    icon: Wrench,
    href: "/services/mep",
    highlights: [
      {
        title: "Integrated design",
        description:
          "MEP coordinated in BIM to eliminate clashes before site work.",
      },
      {
        title: "Energy efficiency",
        description:
          "ASHRAE-compliant HVAC and LED lighting design.",
      },
      {
        title: "Compliance",
        description:
          "All works aligned with PEC and local building codes.",
      },
    ],
  },
  {
    slug: "fire-security",
    name: "Fire & Security Systems",
    shortName: "Fire & Security",
    tagline: "Life safety and asset protection",
    description:
      "Addressable fire alarm, CCTV, public address, access control and nurse-call systems — engineered for hospitals, plants and public buildings.",
    icon: ShieldCheck,
    href: "/services/fire-security",
    highlights: [
      {
        title: "Addressable fire alarm",
        description:
          "NFPA 72-compliant detection and suppression integration.",
      },
      {
        title: "CCTV & access control",
        description:
          "IP-based video surveillance with central management.",
      },
      {
        title: "Nurse-call systems",
        description:
          "Hospital-grade patient-staff communication systems.",
      },
    ],
  },
  {
    slug: "solar",
    name: "Solar EPC",
    shortName: "Solar",
    tagline: "Clean power for industry",
    description:
      "On-grid, off-grid and hybrid solar PV systems — from feasibility and net-metering to commissioning and O&M.",
    icon: Sun,
    href: "/services/solar",
    highlights: [
      {
        title: "Net-metering support",
        description:
          "Complete NEPRA-approved net-metering documentation and commissioning.",
      },
      {
        title: "Hybrid systems",
        description:
          "Solar + battery + grid integration for 24/7 uptime.",
      },
      {
        title: "O&M contracts",
        description:
          "Annual maintenance and performance guarantees.",
      },
    ],
  },
  {
    slug: "testing-commissioning",
    name: "Testing & Commissioning",
    shortName: "T&C",
    tagline: "Proven before it powers on",
    description:
      "Factory Acceptance Tests (FAT), Site Acceptance Tests (SAT), and System Integration Tests (SIT) — with full documentation and third-party witness.",
    icon: FlaskConical,
    href: "/services/testing-commissioning",
    highlights: [
      {
        title: "FAT at our facility",
        description:
          "Full-load transformer testing with calibrated instruments.",
      },
      {
        title: "SAT on site",
        description:
          "Pre-energization checks, protection coordination, load testing.",
      },
      {
        title: "Complete documentation",
        description:
          "Test reports, as-built drawings and O&M manuals.",
      },
    ],
  },
  {
    slug: "after-sales",
    name: "After-Sales Support",
    shortName: "After Sales",
    tagline: "For the life of your asset",
    description:
      "Long-Term Service Agreements (LTSA), transformer overhaul, spares management and 24/7 emergency response.",
    icon: LifeBuoy,
    href: "/services/after-sales",
    highlights: [
      {
        title: "LTSA contracts",
        description:
          "Annual maintenance with guaranteed response times.",
      },
      {
        title: "Overhaul & rewinding",
        description:
          "In-house transformer overhaul and rewinding services.",
      },
      {
        title: "Spares management",
        description:
          "Critical spares held in stock for rapid replacement.",
      },
    ],
  },
];

export const serviceBySlug = (slug: string) =>
  services.find((s) => s.slug === slug);

/**
 * Engineering process steps (shown on services pages).
 */
export type ProcessStep = {
  number: number;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    number: 1,
    title: "Consult",
    description:
      "We listen to load requirements, constraints and timelines. Site survey and technical brief.",
  },
  {
    number: 2,
    title: "Design",
    description:
      "Detailed engineering, single-line diagrams, load calculations and equipment sizing.",
  },
  {
    number: 3,
    title: "Manufacture",
    description:
      "In-house production with strict QA — raw material to finished assembly.",
  },
  {
    number: 4,
    title: "Test",
    description:
      "Factory Acceptance Testing with client witness and calibrated instruments.",
  },
  {
    number: 5,
    title: "Install & Commission",
    description:
      "Site installation, SAT and SIT, followed by structured handover.",
  },
  {
    number: 6,
    title: "Support",
    description:
      "LTSA, spares, and 24/7 emergency response for the life of the asset.",
  },
];