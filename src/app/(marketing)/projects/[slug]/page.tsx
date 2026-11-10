import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getProjectBySlug } from "@/lib/queries/projects";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { generateMetadata as buildMeta } from "@/lib/seo/metadata";
import { CTA } from "@/components/sections/home/CTA";
import { Building2, MapPin, Calendar, ArrowRight, ImageIcon, CheckCircle2, ShieldCheck, Zap, Wrench, Factory, Clock } from "lucide-react";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };

  return buildMeta({
    title: project.title,
    description: project.description || `Case study: ${project.title} for ${project.client_name}.`,
    path: `/projects/${project.slug}`,
    image: project.image_url || undefined,
  });
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  // 🚨 Default Case Study (Agar Database mein details na hon toh ye 6 points show honge)
  const defaultHighlights = [
    {
      title: "End-to-End EPC Delivery",
      description: "Complete responsibility from design, procurement, and fabrication to installation and commissioning.",
      icon: Building2,
    },
    {
      title: "Compliance with IEC/ISO",
      description: "All equipment and installations strictly follow international safety and quality standards.",
      icon: ShieldCheck,
    },
    {
      title: "Power Distribution Systems",
      description: "High-capacity transformers and switchgear engineered for reliable, uninterrupted power supply.",
      icon: Zap,
    },
    {
      title: "Turnkey Execution",
      description: "Seamless integration of mechanical, electrical, and plumbing systems under one contract.",
      icon: Wrench,
    },
    {
      title: "Industrial-Grade Equipment",
      description: "Manufactured using premium raw materials for durability and long-term operational efficiency.",
      icon: Factory,
    },
    {
      title: "On-Time Handover",
      description: "Structured project management ensuring all milestones are met within the agreed timeline.",
      icon: Clock,
    },
  ];

  return (
    <>
      <Section>
        <Breadcrumbs
          items={[
            { label: "Projects", href: "/projects" },
            { label: project.title },
          ]}
        />

        <div className="grid lg:grid-cols-5 gap-10 mt-6">
          {/* Left: Project Image */}
          <div className="lg:col-span-3">
            <div className="relative w-full aspect-video md:aspect-4/3 bg-slate-100 rounded-2xl border shadow-sm overflow-hidden flex items-center justify-center">
              {project.image_url ? (
                <Image
                  src={project.image_url}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-slate-400">
                  <ImageIcon className="size-16 mb-3 opacity-40" />
                  <span className="text-sm font-medium uppercase tracking-wider">Image Pending</span>
                </div>
              )}
            </div>
          </div>

          {/* Right: Project Info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <span className="inline-block bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
                {project.sector || "Project"}
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
                {project.title}
              </h1>
            </div>

            <div className="rounded-2xl border bg-slate-50 p-6 space-y-5">
              <div className="flex items-start gap-4">
                <div className="bg-white p-2 rounded-lg shadow-sm">
                  <Building2 className="size-5 text-primary shrink-0" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase">Client</p>
                  <p className="font-semibold text-slate-900">{project.client_name || "N/A"}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-white p-2 rounded-lg shadow-sm">
                  <MapPin className="size-5 text-primary shrink-0" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase">Location</p>
                  <p className="font-semibold text-slate-900">{project.location || "N/A"}</p>
                </div>
              </div>
              {project.completion_year && (
                <div className="flex items-start gap-4">
                  <div className="bg-white p-2 rounded-lg shadow-sm">
                    <Calendar className="size-5 text-primary shrink-0" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase">Year</p>
                    <p className="font-semibold text-slate-900">{project.completion_year}</p>
                  </div>
                </div>
              )}
              <div className="flex items-start gap-4">
                <div className="bg-white p-2 rounded-lg shadow-sm">
                  <div className="size-5 flex items-center justify-center text-primary font-bold">#</div>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase">Sector</p>
                  <p className="font-semibold text-slate-900">{project.sector || "N/A"}</p>
                </div>
              </div>
            </div>

            <Button asChild size="lg" className="w-full h-14 text-base rounded-xl">
              <Link href="/contact/request-quote">
                Start a Similar Project <ArrowRight className="ml-2 size-5" />
              </Link>
            </Button>
          </div>
        </div>

        {/* 🚨 Case Study Section */}
        <div className="mt-16 max-w-4xl">
          <div className="flex items-center gap-3 mb-6 border-b pb-4">
            <CheckCircle2 className="size-6 text-primary" />
            <h2 className="text-2xl font-bold text-slate-900">Project Case Study</h2>
          </div>
          
          {/* Agar database mein description hai toh wo show hogi, warna default */}
          <p className="text-lg text-slate-600 leading-relaxed mb-10">
            {project.scope_of_work || project.description || "Habib Engineering successfully executed this project by delivering end-to-end electrical infrastructure. Our team managed the complete lifecycle — from initial design and procurement to installation and final commissioning — ensuring that all systems met the highest standards of reliability and safety."}
          </p>
          
          {/* 🚨 6 Professional Highlights (Hamesha show honge, chahe database mein details ho ya na ho) */}
          <div className="grid sm:grid-cols-2 gap-4">
            {defaultHighlights.map((highlight, index) => {
              const Icon = highlight.icon;
              return (
                <div key={index} className="flex items-start gap-4 p-5 rounded-xl border bg-card hover:shadow-sm transition-shadow">
                  <div className="bg-primary/10 p-2 rounded-lg shrink-0 mt-0.5">
                    <Icon className="size-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">{highlight.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{highlight.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Section>
      <CTA />
    </>
  );
}