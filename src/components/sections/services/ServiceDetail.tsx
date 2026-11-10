import Link from "next/link";
import { Section } from "@/components/ui/section";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { CTA } from "@/components/sections/home/CTA";
import { notFound } from "next/navigation";
import { serviceBySlug } from "@/content/services";

export function ServiceDetail({ slug }: { slug: string }) {
  const service = serviceBySlug(slug);

  if (!service) {
    notFound();
  }

  const Icon = service.icon;

  return (
    <>
      {/* 🚨 Hero Section - Ab White/Default hai */}
      <Section bg="default" className="py-20 border-b">
        <Breadcrumbs
          items={[
            { label: "Services", href: "/services" },
            { label: service.name, href: `/services/${service.slug}` },
          ]}
        />
        
        <div className="max-w-4xl mt-8">
          <div className="mb-6 inline-flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Icon className="size-8" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 text-slate-900">
            {service.name}
          </h1>
          <p className="text-xl md:text-2xl text-primary font-medium mb-6">
            {service.tagline}
          </p>
          <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
            {service.description}
          </p>
          <div className="mt-8">
            <Button asChild size="lg" className="shadow-md">
              <Link href="/contact/request-quote">
                Request a Quote <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* Service Highlights */}
      <Section bg="muted">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center text-slate-900">What's Included</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {service.highlights.map((item, i) => (
              <div key={i} className="rounded-2xl border bg-white p-6 flex flex-col items-start hover:shadow-md transition-shadow">
                <div className="mb-4 p-3 rounded-full bg-emerald-500/10 text-emerald-600">
                  <CheckCircle2 className="size-6" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-slate-900">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <CTA />
    </>
  );
}