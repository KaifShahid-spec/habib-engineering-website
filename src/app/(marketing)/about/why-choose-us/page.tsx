import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { differentiators, stats } from "@/content/why-choose-us";
import { generateMetadata } from "@/lib/seo/metadata";
import { CTA } from "@/components/sections/home/CTA";
import { Award, Briefcase, Users, ShieldCheck } from "lucide-react";

export const metadata = generateMetadata({
  title: "Why Choose Us",
  description: "Four decades of experience, ISO certification, and in-house manufacturing — see why Pakistan's top industries trust Habib Engineering.",
  path: "/about/why-choose-us",
});

export default function WhyChooseUsPage() {
  const statsWithIcons = [
    { ...stats[0], icon: Award },
    { ...stats[1], icon: Briefcase },
    { ...stats[2], icon: Users },
    { ...stats[3], icon: ShieldCheck },
  ];

  return (
    <>
      {/* 1. "What Sets Us Apart" Section (Details Left-Aligned) */}
      <Section>
        <SectionHeader
          title="What Sets Us Apart"
          description="Every project we deliver is backed by four decades of engineering discipline."
        />

        {/* 🚨 Details ko left-aligned (text-left) kiya hai */}
        <div className="max-w-4xl mx-auto mb-12 text-left space-y-4">
          <p className="text-lg text-slate-600 leading-relaxed">
            At Habib Engineering, we don't just supply equipment — we engineer complete power solutions. From the initial feasibility study to the final commissioning, our in-house team ensures that every transformer, switchgear panel, and electrical system is built to perform under the toughest conditions.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed">
            Our four-decade legacy is built on three pillars: uncompromising quality, on-time delivery, and lifelong customer support. That's why Pakistan's leading hospitals, defense installations, and industrial giants trust us with their most critical infrastructure.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {differentiators.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex gap-4 p-6 rounded-xl border bg-card hover:border-primary/50 hover:shadow-md transition-all">
                <div className="shrink-0 flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* 2. Stats Section (Ab White Cards Hain) */}
      <section className="relative py-20 bg-slate-50 border-y">
        <div className="container relative z-10 mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {statsWithIcons.map((stat, i) => {
              const Icon = stat.icon;
              return (
                // 🚨 Cards ab white (bg-white) hain aur shadow hai
                <div 
                  key={i} 
                  className="flex flex-col items-center justify-center text-center p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300"
                >
                  <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="size-6 text-primary" />
                  </div>
                  <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-2">
                    {stat.value}{stat.suffix}
                  </h3>
                  <p className="text-xs md:text-sm font-semibold text-slate-500 uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. CTA */}
      <CTA />
    </>
  );
}