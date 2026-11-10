import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { services } from "@/content/services";
import { ServiceCard } from "@/components/sections/services/ServiceCard";
import { generateMetadata } from "@/lib/seo/metadata";
import { CTA } from "@/components/sections/home/CTA";
import { ProcessSteps } from "@/components/sections/services/ProcessSteps";

export const metadata = generateMetadata({
  title: "Engineering Services",
  description: "Turnkey electrical solutions, MEP, fire & security, solar EPC, testing & commissioning, and after-sales support.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <Section>
        <SectionHeader
          title="Our Services"
          description="From concept to commissioning — complete engineering solutions for Pakistan's critical infrastructure."
        />
        
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </Section>

      {/* Process Steps */}
      <Section bg="muted">
        <SectionHeader
          title="How We Work"
          description="A structured engineering process ensures every project is delivered on time and to specification."
        />
        <ProcessSteps />
      </Section>

      <CTA />
    </>
  );
}