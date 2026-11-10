/**
 * Static company content.
 * Source: Habib Engineering company profile PDF.
 * ⚠️ Client se final copy approve karayein.
 */

export const companyIntro = {
  heading: "Engineering Excellence Since 1985",
  subheading:
    "Four decades of powering Pakistan's industry with reliable transformers, switchgear, and turnkey electrical solutions.",
  body: [
    "Habib Engineering is a Lahore-based manufacturer and EPC contractor serving Pakistan's power, oil & gas, healthcare, infrastructure and industrial sectors since 1985.",
    "From our state-of-the-art manufacturing facility, we design, build, test and commission distribution and power transformers, LV/MV switchgear, and complete electrical systems for some of the country's most demanding projects.",
    "We are ISO 9001, ISO 14001 and ISO 45001 certified, and are registered with the Pakistan Engineering Council (PEC) and the Engineer-in-Chief's branch for turnkey electrical works.",
  ],
} as const;

export const vision = {
  title: "Our Vision",
  body:
    "To be Pakistan's most trusted engineering partner for power and infrastructure — delivering world-class quality, on time, every time.",
} as const;

export const mission = {
  title: "Our Mission",
  body:
    "To engineer reliable, efficient and safe electrical solutions that power Pakistan's growth — backed by in-house manufacturing, rigorous testing, and lifetime after-sales support.",
} as const;

export type CoreValue = {
  title: string;
  description: string;
};

export const coreValues: CoreValue[] = [
  {
    title: "Quality Without Compromise",
    description:
      "Every transformer, panel and installation is tested against international standards before it leaves our facility.",
  },
  {
    title: "Safety First",
    description:
      "ISO 45001-aligned practices protect our teams, our clients, and the communities where we work.",
  },
  {
    title: "Engineering Integrity",
    description:
      "We specify what a project actually needs — not what is easiest to sell. Our recommendations are honest and technical.",
  },
  {
    title: "On-Time Delivery",
    description:
      "40 years of project discipline means we plan realistically, communicate early, and deliver when we say we will.",
  },
  {
    title: "Lifetime Support",
    description:
      "Our relationship continues after commissioning through LTSA contracts, spares and overhaul services.",
  },
  {
    title: "Local Roots, Global Standards",
    description:
      "Pakistani engineering talent, international-grade processes and quality systems.",
  },
];

export type Milestone = {
  year: string;
  title: string;
  description: string;
};

export const milestones: Milestone[] = [
  {
    year: "1985",
    title: "Founded in Lahore",
    description:
      "Habib Engineering begins as a transformer repair and rewinding workshop.",
  },
  {
    year: "1995",
    title: "In-house Manufacturing",
    description:
      "First dedicated transformer manufacturing facility commissioned.",
  },
  {
    year: "2005",
    title: "Turnkey EPC",
    description:
      "Expanded into complete electrical EPC — panels, cabling, testing & commissioning.",
  },
  {
    year: "2012",
    title: "ISO Certification",
    description:
      "Achieved ISO 9001 and ISO 14001 — formalized quality and environmental management.",
  },
  {
    year: "2020",
    title: "Safety Milestone",
    description:
      "ISO 45001 certification for occupational health and safety management.",
  },
  {
    year: "2024",
    title: "500+ Projects Delivered",
    description:
      "Crossed 500 projects across oil & gas, power, healthcare and infrastructure.",
  },
];

export type Leader = {
  name: string;
  role: string;
  bio: string;
};

// ⚠️ TODO: names + bios client se confirm karein
export const leadership: Leader[] = [
  {
    name: "TBD — Managing Director",
    role: "Managing Director",
    bio: "TODO: 2–3 sentence bio from client.",
  },
  {
    name: "TBD — Technical Director",
    role: "Technical Director",
    bio: "TODO: 2–3 sentence bio from client.",
  },
  {
    name: "TBD — Operations Head",
    role: "Head of Operations",
    bio: "TODO: 2–3 sentence bio from client.",
  },
];