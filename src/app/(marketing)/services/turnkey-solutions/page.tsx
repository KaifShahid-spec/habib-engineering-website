import { ServiceDetail } from "@/components/sections/services/ServiceDetail";
import { serviceBySlug } from "@/content/services";
import { generateMetadata as buildMeta } from "@/lib/seo/metadata";
import { notFound } from "next/navigation";

const slug = "turnkey-solutions";

export async function generateMetadata() {
  const service = serviceBySlug(slug);
  if (!service) return { title: "Service Not Found" };
  return buildMeta({
    title: service.name,
    description: service.description,
    path: `/services/${slug}`,
  });
}

export default function TurnkeyPage() {
  const service = serviceBySlug(slug);
  if (!service) notFound();
  return <ServiceDetail slug={slug} />;
}