import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { VisionMission } from "@/components/sections/about/VisionMission";
import { CoreValues } from "@/components/sections/about/CoreValues";
import { companyIntro, milestones } from "@/content/company";
import { generateMetadata } from "@/lib/seo/metadata";
import { CTA } from "@/components/sections/home/CTA";
import { CheckCircle2 } from "lucide-react";

export const metadata = generateMetadata({
  title: "About Us",
  description: "Learn about Habib Engineering's 40-year journey, vision, mission, and core values.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      {/* 1. Intro Section (Simple & Left Aligned - No Box) */}
      <Section bg="muted">
        <div className="max-w-4xl mx-auto">
          
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 text-slate-900 text-left">
            {companyIntro.heading}
          </h1>
          
          <p className="text-xl text-slate-600 mb-8 font-medium text-left">
            {companyIntro.subheading}
          </p>
          
          <div className="space-y-4 text-slate-600 text-base md:text-lg leading-relaxed text-left">
            {companyIntro.body.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          
        </div>
      </Section>

      {/* 2. Vision & Mission */}
      <Section>
        <VisionMission />
      </Section>

      {/* 3. Core Values */}
      <Section bg="muted">
        <SectionHeader 
          title="Our Core Values" 
          description="The principles that guide our engineering and business decisions."
        />
        <CoreValues />
      </Section>

      {/* 4. Timeline / Milestones */}
      <Section>
        <SectionHeader 
          title="Our Journey" 
          description="Four decades of engineering excellence."
        />
        <div className="max-w-3xl mx-auto space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-linear-to-b before:from-transparent before:via-slate-300 before:to-transparent">
          {milestones.map((milestone, index) => (
            <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-100 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                <CheckCircle2 className="size-5" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border bg-card shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between space-x-2 mb-1">
                  <div className="font-bold text-primary">{milestone.year}</div>
                </div>
                <div className="text-slate-900 font-bold">{milestone.title}</div>
                <div className="text-slate-500 text-sm mt-1">{milestone.description}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <CTA />
    </>
  );
}