import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getProducts } from "@/lib/queries/products";
import { getProjects } from "@/lib/queries/projects";
import { getBlogPosts } from "@/lib/queries/blog";
import { getCategories } from "@/lib/queries/categories";
import { industries } from "@/content/industries";
import { services } from "@/content/services";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  // Fetch dynamic data
  const [products, projects, posts, categories] = await Promise.all([
    getProducts(),
    getProjects(),
    getBlogPosts(),
    getCategories(),
  ]);

  // Static Pages
  const staticPages = [
    "",
    "/about",
    "/about/certifications",
    "/about/group-companies",
    "/about/why-choose-us",
    "/products",
    "/services",
    "/industries",
    "/projects",
    "/clients",
    "/blog",
    "/downloads",
    "/contact",
    "/contact/request-quote",
    "/privacy-policy",
    "/terms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Dynamic: Categories
  const categoryPages = categories.map((cat) => ({
    url: `${baseUrl}/products/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Dynamic: Products
  const productPages = products.map((prod: any) => ({
    url: `${baseUrl}/products/${prod.categories?.slug || "uncategorized"}/${prod.slug}`,
    lastModified: new Date(prod.updated_at || prod.created_at),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Dynamic: Projects
  const projectPages = projects.map((proj) => ({
    url: `${baseUrl}/projects/${proj.slug}`,
    lastModified: new Date(proj.created_at),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Dynamic: Blog Posts
  const blogPages = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updated_at || post.published_at || post.created_at),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Static content from TS files: Industries & Services
  const industryPages = industries.map((ind) => ({
    url: `${baseUrl}/industries/${ind.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const servicePages = services.map((srv) => ({
    url: `${baseUrl}${srv.href}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...categoryPages,
    ...productPages,
    ...projectPages,
    ...blogPages,
    ...industryPages,
    ...servicePages,
  ];
}