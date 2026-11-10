import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { industryBySlug, industries } from "@/content/industries";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { generateMetadata as buildMeta } from "@/lib/seo/metadata";
import { CTA } from "@/components/sections/home/CTA";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return industries.map((ind) => ({ slug: ind.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const industry = industryBySlug(slug);

  if (!industry) return { title: "Industry not found" };

  return buildMeta({
    title: industry.name,
    description: industry.description,
    path: `/industries/${industry.slug}`,
  });
}

export default async function IndustryDetailPage({ params }: Props) {
  const { slug } = await params;
  const industry = industryBySlug(slug);

  if (!industry) notFound();

  const Icon = industry.icon;
  // Related industries (exclude current)
  const related = industries.filter((i) => i.slug !== industry.slug).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <Section bg="muted">
        <Breadcrumbs
          items={[
            { label: "Industries", href: "/industries" },
            { label: industry.shortName },
          ]}
        />
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <div className={`inline-flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br ${industry.accent} text-primary`}>
              <Icon className="size-8" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
              {industry.name}
            </h1>
            <p className="text-xl text-primary font-medium">{industry.tagline}</p>
            <p className="text-muted-foreground leading-relaxed text-lg">
              {industry.description}
            </p>
            <div className="pt-2">
              <Button asChild size="lg">
                <Link href="/contact/request-quote">
                  Discuss Your Project <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className={`rounded-2xl border bg-gradient-to-br ${industry.accent} p-8`}>
            <h3 className="font-bold text-lg mb-4">What we deliver</h3>
            <ul className="space-y-3">
              {industry.highlights.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="size-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-foreground">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Related Industries */}
      <Section>
        <SectionHeader
          title="Other Industries We Serve"
          description="Our engineering capabilities extend across multiple sectors."
        />
        <div className="grid md:grid-cols-3 gap-6">
          {related.map((r) => {
            const RIcon = r.icon;
            return (
              <Link
                key={r.slug}
                href={`/industries/${r.slug}`}
                className="group rounded-xl border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-md"
              >
                <div className="mb-3 inline-flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <RIcon className="size-5" />
                </div>
                <h3 className="font-bold group-hover:text-primary transition-colors">
                  {r.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {r.tagline}
                </p>
              </Link>
            );
          })}
        </div>
      </Section>

      <CTA />
    </>
  );
}