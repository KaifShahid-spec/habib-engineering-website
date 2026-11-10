import type { Metadata } from "next";
import { siteConfig } from "./site";

/**
 * Default SEO configuration.
 * Page-level metadata merges over this via `lib/seo/metadata.ts`.
 */

export const defaultKeywords = [
  "Habib Engineering",
  "transformer manufacturer Pakistan",
  "distribution transformer Lahore",
  "power transformer Pakistan",
  "switchgear manufacturer",
  "MEP contractor Pakistan",
  "fire alarm system Pakistan",
  "solar EPC Pakistan",
  "testing and commissioning",
  "turnkey electrical solutions",
];

export const defaultOpenGraph: NonNullable<Metadata["openGraph"]> = {
  type: "website",
  locale: siteConfig.locale,
  url: siteConfig.url,
  siteName: siteConfig.name,
  title: siteConfig.name,
  description: siteConfig.description,
  images: [
    {
      url: "/og-image.jpg",
      width: 1200,
      height: 630,
      alt: siteConfig.name,
    },
  ],
};

export const defaultTwitter: NonNullable<Metadata["twitter"]> = {
  card: "summary_large_image",
  title: siteConfig.name,
  description: siteConfig.description,
  images: ["/og-image.jpg"],
};

export const defaultRobots: NonNullable<Metadata["robots"]> = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: defaultKeywords,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: defaultOpenGraph,
  twitter: defaultTwitter,
  robots: defaultRobots,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

/**
 * Per-route metadata helpers.
 * Usage in a page:
 *   export const metadata = buildMetadata({ title: "About", description: "...", path: "/about" });
 */
export function buildMetadata(input: {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const { title, description, path, image, noIndex } = input;
  const url = path ? `${siteConfig.url}${path}` : siteConfig.url;

  return {
    title,
    description: description ?? siteConfig.description,
    alternates: { canonical: path ?? "/" },
    openGraph: {
      ...defaultOpenGraph,
      title,
      description: description ?? siteConfig.description,
      url,
      images: image ? [{ url: image, width: 1200, height: 630, alt: title }] : defaultOpenGraph.images,
    },
    twitter: {
      ...defaultTwitter,
      title,
      description: description ?? siteConfig.description,
      images: image ? [image] : defaultTwitter.images,
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}