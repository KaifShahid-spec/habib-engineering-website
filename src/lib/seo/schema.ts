import { siteConfig } from "@/config/site";

/**
 * JSON-LD Structured Data Generators.
 * Ye Google ko batata hai ke aapki website kis baare mein hai.
 * Usage: <JsonLd data={getOrganizationSchema()} /> (from components/seo/JsonLd.tsx)
 */

// 1. Organization (Home page, About page)
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    description: siteConfig.description,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.headOffice.line1,
      addressLocality: siteConfig.headOffice.city,
      addressCountry: siteConfig.headOffice.country,
    },
    sameAs: [
      siteConfig.socials.linkedin,
      siteConfig.socials.facebook,
      siteConfig.socials.youtube,
    ].filter(Boolean),
  };
}

// 2. LocalBusiness (Contact page, Home page)
export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    image: `${siteConfig.url}/og-image.jpg`,
    "@id": siteConfig.url,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.headOffice.line1,
      addressLocality: siteConfig.headOffice.city,
      addressRegion: siteConfig.headOffice.province,
      addressCountry: siteConfig.headOffice.country,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "18:00",
    },
  };
}

// 3. Product (Product detail pages)
export function getProductSchema(product: {
  name: string;
  description: string;
  image?: string;
  category: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image || `${siteConfig.url}/og-image.jpg`,
    category: product.category,
    url: product.url,
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    // Agar price nahi hai (B2B quote based), toh offers mein sirf availability rakhein
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "PKR",
    },
  };
}

// 4. Breadcrumbs (Har page ke top par)
export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  };
}

// 5. Article (Blog posts)
export function getArticleSchema(post: {
  title: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  url: string;
  authorName: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: post.image || `${siteConfig.url}/og-image.jpg`,
    datePublished: post.datePublished,
    dateModified: post.dateModified || post.datePublished,
    author: {
      "@type": "Person",
      name: post.authorName,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": post.url,
    },
  };
}