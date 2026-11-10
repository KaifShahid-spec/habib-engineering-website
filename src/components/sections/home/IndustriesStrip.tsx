import Link from "next/link";
import { industries } from "@/content/industries";
import { SectionHeader } from "@/components/ui/section-header";
import { Section } from "@/components/ui/section";

export function IndustriesStrip() {
  return (
    <div className="relative overflow-hidden bg-slate-900">
      
      {/* 🚨 Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/industries-bg.jpg" // 🚨 yahan .png kar diya hai
          alt="Industries Background"
          className="w-full h-full object-cover opacity-40" // Opacity barha di taake saaf nazar aaye
        />
        {/* Dark Overlay taake text padha jaye */}
        <div className="absolute inset-0 bg-slate-950/60" />
      </div>

      <div className="relative z-10">
        <Section className="py-16 md:py-24 bg-transparent"> {/* bg="default" hata diya */}
          
          {/* Header (Text White kar diya) */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
              Industries We Serve
            </h2>
            <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto">
              Delivering reliable power infrastructure across Pakistan's most critical sectors.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {industries.map((ind) => {
              const Icon = ind.icon;
              return (
                <Link
                  key={ind.slug}
                  href={`/industries/${ind.slug}`}
                  // Cards ko Glass effect diya hai
                  className="group flex flex-col items-center justify-center p-4 md:p-6 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm hover:border-primary/50 hover:bg-white/20 hover:shadow-md transition-all text-center"
                >
                  <div className="p-2 md:p-3 rounded-full bg-primary/20 text-primary mb-2 md:mb-3 group-hover:bg-primary group-hover:text-white transition-colors">
                    <Icon className="size-5 md:size-6" />
                  </div>
                  <span className="text-xs md:text-sm font-semibold text-white group-hover:text-primary transition-colors">
                    {ind.shortName}
                  </span>
                </Link>
              );
            })}
          </div>
        </Section>
      </div>
    </div>
  );
}