import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { industries } from "@/content/industries";
import { generateMetadata } from "@/lib/seo/metadata";
import { CTA } from "@/components/sections/home/CTA";

export const metadata = generateMetadata({
  title: "Industries We Serve",
  description: "Habib Engineering delivers power and electrical solutions for oil & gas, power, healthcare, infrastructure, industrial, and education sectors across Pakistan.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <Section>
        <SectionHeader
          title="Industries We Serve"
          description="Engineering-grade solutions built for the unique demands of each sector we work in."
        />

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {industries.map((ind) => {
            const Icon = ind.icon;
            return (
              <Link
                key={ind.slug}
                href={`/industries/${ind.slug}`}
                className={`group relative overflow-hidden rounded-2xl border bg-gradient-to-br ${ind.accent} p-6 transition-all hover:shadow-lg hover:border-primary/50`}
              >
                <div className="mb-4 inline-flex size-14 items-center justify-center rounded-xl bg-background text-primary shadow-sm">
                  <Icon className="size-7" />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {ind.name}
                </h3>
                <p className="text-sm font-medium text-primary/80 mb-3">
                  {ind.tagline}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                  {ind.description}
                </p>
                <div className="flex items-center text-sm font-semibold text-primary">
                  Learn more <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </Section>

      <CTA />
    </>
  );
}