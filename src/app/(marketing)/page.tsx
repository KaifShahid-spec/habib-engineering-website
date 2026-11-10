import { Hero } from "@/components/sections/home/Hero";
import { TrustedClients } from "@/components/sections/home/TrustedClients"; // 🚨 Pehle
import { FeaturedProducts } from "@/components/sections/home/FeaturedProducts";
import { TrustBar } from "@/components/sections/home/TrustBar";
import { IndustriesStrip } from "@/components/sections/home/IndustriesStrip";
import { CTA } from "@/components/sections/home/CTA";
import { generateMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { getOrganizationSchema, getLocalBusinessSchema } from "@/lib/seo/schema";

export const metadata = generateMetadata({
  title: "Home",
  description: "Habib Engineering — manufacturer of transformers, switchgear, and turnkey electrical solutions in Pakistan.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={getOrganizationSchema()} />
      <JsonLd data={getLocalBusinessSchema()} />
      
      <Hero />
      
      {/* 🚨 Trusted Clients ab Products se pehle hai */}
      <TrustedClients /> 
      <FeaturedProducts />
      <TrustBar />
      <IndustriesStrip />
      <CTA />
    </>
  );
}