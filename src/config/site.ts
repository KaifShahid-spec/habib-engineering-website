/**
 * Central site configuration.
 * All hard-coded company info lives here so it's easy to update in one place.
 *
 * ⚠️ TODO (client se confirm karein):
 *  - phone: PDF mein 2 numbers hain (0326 844 2292 aur +92 300 44 12 321)
 *  - email: actual inbox confirm karein
 *  - factory address: "Mezayal Chowk" vs "Missile Chowk" (PDF inconsistency)
 *  - domain: habibengineering.com.pk ya koi aur?
 *  - socials: LinkedIn/Facebook/YouTube URLs
 */
export const siteConfig = {
  name: "Habib Engineering",
  shortName: "Habib Eng",
  legalName: "Habib Engineering Works (Pvt.) Ltd.",
  tagline: "Powering Pakistan's Industry Since 1985",
  description:
    "Habib Engineering — manufacturer of distribution & power transformers, switchgear, and turnkey electrical solutions for oil & gas, power, healthcare and industrial sectors in Pakistan.",

  url: "https://habibengineering.com", // TODO: confirm
  locale: "en_PK",
  timezone: "Asia/Karachi",
  currency: "PKR",

  foundedYear: 1985,

  // Primary contact (shown in header/footer)
  phone: "0326 84 42 292", // TODO: confirm
  phoneSecondary: "0300 44 12 321", // TODO: confirm
  email: "info@habibengineering.com.pk", // TODO: confirm
  emailSales: "sales@habibengineering.com.pk", // TODO: confirm
  whatsapp: "03268442292", // wa.me format (no + sign)

  headOffice: {
    label: "Head Office",
    line1: "DHA Phase 8",
    line2: "",
    city: "Lahore",
    province: "Punjab",
    country: "Pakistan",
    postalCode: "",
    mapUrl: "", // TODO: Google Maps embed URL
  },

  factory: {
    label: "Factory",
    line1: "Missile Chowk", // TODO: "Missile Chowk" bhi likha tha PDF mein
    line2: "",
    city: "Lahore",
    province: "Punjab",
    country: "Pakistan",
    postalCode: "",
    mapUrl: "", // TODO
  },

  workingHours: "Mon–Sat, 9:00 AM – 6:00 PM (PKT)",
  responseTime: "Within 24 hours",

  socials: {
    linkedin: "", // TODO
    facebook: "", // TODO
    youtube: "", // TODO
    instagram: "", // TODO
  },

  // Primary site navigation (Header + Footer fallback)
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Products", href: "/products" },
    { label: "Services", href: "/services" },
    { label: "Industries", href: "/industries" },
    { label: "Projects", href: "/projects" },
    { label: "Clients", href: "/clients" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],

  // CTA config
  cta: {
    primaryLabel: "Request Quote",
    primaryHref: "/contact/request-quote",
    secondaryLabel: "Contact Us",
    secondaryHref: "/contact",
  },

  // Footer quick links
  footerLinks: {
    company: [
      { label: "About Us", href: "/about" },
      { label: "Certifications", href: "/about/certifications" },
      { label: "Group Companies", href: "/about/group-companies" },
      { label: "Why Choose Us", href: "/about/why-choose-us" },
    ],
    resources: [
      { label: "Downloads", href: "/downloads" },
      { label: "Blog", href: "/blog" },
      { label: "Projects", href: "/projects" },
      { label: "Clients", href: "/clients" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms" },
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;