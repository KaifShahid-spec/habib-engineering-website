import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, PhoneCall } from "lucide-react";
import { siteConfig } from "@/config/site";

export function CTA() {
  return (
    // 🚨 Yahan bg-primary ki jagah ek Light Green (bg-emerald-600) lagaya hai
    <section className="py-16 md:py-24 relative overflow-hidden bg-green-900 text-white">
      
      {/* Halka sa dark overlay taake text clear nazar aaye */}
      <div className="absolute inset-0 bg-black/10" />
      
      <div className="container relative z-10 mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 md:mb-6 drop-shadow-sm">
          Ready to Power Your Next Project?
        </h2>
        <p className="text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-8 md:mb-10 text-emerald-50">
          Whether you need a custom transformer, a complete substation, or a turnkey electrical solution — our engineering team is ready to help.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
          {/* Primary Button (White) */}
          <Button asChild size="lg" variant="secondary" className="h-12 md:h-14 px-6 md:px-8 text-sm md:text-base w-full sm:w-auto font-bold text-emerald-700 hover:bg-emerald-50 border-none">
            <Link href="/contact/request-quote">
              Request a Quote <ArrowRight className="ml-2 size-4 md:size-5" />
            </Link>
          </Button>
          
          {/* Outline Button (White) */}
          <Button asChild variant="outline" size="lg" className="h-12 md:h-14 px-6 md:px-8 text-sm md:text-base w-full sm:w-auto border-white/40 text-white hover:bg-white/10 bg-transparent backdrop-blur-sm">
            <a href={`tel:${siteConfig.phone}`}>
              <PhoneCall className="mr-2 size-4 md:size-5" /> Call Us Now
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}