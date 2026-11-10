import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { defaultMetadata } from "@/config/seo";

/**
 * Generates metadata for a page.
 * Use this in any page.tsx:
 * export const metadata = generateMetadata({ title: "Contact Us", path: "/contact" });
 */
export function generateMetadata({
  title,
  description,
  path = "/",
  image,
  noIndex = false,
}: {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${siteConfig.url}${path}`;
  const ogImage = image || "/og-image.jpg"; // Placeholder in public/ folder

  return {
    ...defaultMetadata,
    title,
    description: description || siteConfig.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      ...defaultMetadata.openGraph,
      title: `${title} | ${siteConfig.name}`,
      description: description || siteConfig.description,
      url,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: `${title} | ${siteConfig.name}`,
      description: description || siteConfig.description,
      images: [ogImage],
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}