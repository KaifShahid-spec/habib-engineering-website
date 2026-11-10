import { notFound } from "next/navigation";
import { serviceBySlug, services } from "@/content/services";
import { ServiceDetail } from "@/components/sections/services/ServiceDetail"; // 👈 Shared Component Import
import { generateMetadata as buildMeta } from "@/lib/seo/metadata";

type Props = {
  params: Promise<{ slug: string }>;
};

// Next.js ko batata hai ke kaunse pages static generate karne hain (SEO ke liye acha hai)
export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = serviceBySlug(slug);

  if (!service) return { title: "Service not found" };

  return buildMeta({
    title: service.name,
    description: service.description,
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = serviceBySlug(slug);

  // Agar service nahi mili toh 404 page dikhayein
  if (!service) {
    notFound();
  }

  // 👇 Saara UI ab shared component handle karega
  return <ServiceDetail slug={slug} />;
}