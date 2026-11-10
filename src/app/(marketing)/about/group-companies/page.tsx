import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { GroupCards } from "@/components/sections/about/GroupCards";
import { generateMetadata } from "@/lib/seo/metadata";
import { CTA } from "@/components/sections/home/CTA";

export const metadata = generateMetadata({
  title: "Group Companies",
  description: "Explore the Habib Engineering family of companies serving Pakistan's power and infrastructure sectors.",
  path: "/about/group-companies",
});

export default function GroupCompaniesPage() {
  return (
    <>
      <Section bg="muted">
        <SectionHeader
          title="Our Group of Companies"
          description="A family of engineering businesses dedicated to powering Pakistan's growth across the electrical value chain."
        />
        <GroupCards />
      </Section>

      <Section>
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h2 className="text-2xl font-bold">Collective Strength</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Together, our group companies deliver end-to-end electrical infrastructure — from design and
            manufacturing to installation and after-sales support. This integrated model means clients
            work with a single accountable partner at every stage of the project.
          </p>
        </div>
      </Section>

      <CTA />
    </>
  );
}