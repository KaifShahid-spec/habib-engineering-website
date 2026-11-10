import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck } from "lucide-react";

export function Hero() {
  return (
    // 🚨 py-20 se py-16 kar diya hai taake khali jagah kam ho
    <section className="relative overflow-hidden bg-slate-150 py-16 md:py-24 lg:py-32">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/hero-bg.avif" 
          alt="Industrial Electrical" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-900/90 to-slate-900/40" />
      </div>

      <div className="container relative z-20 mx-auto px-4 md:px-6">
        <div className="max-w-4xl space-y-6 md:space-y-8">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/50 px-4 py-1.5 text-xs md:text-sm text-slate-300 backdrop-blur-sm">
            <ShieldCheck className="size-4 text-primary" />
            <span className="font-semibold tracking-wide"> HABIB ENGINEERING</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl lg:leading-[1.1]">
            Powering Pakistan's Industry <br className="hidden md:block" />
            <span className="block mt-2 text-transparent bg-clip-text bg-linear-to-r from-primary to-emerald-400">
              Since 1985
            </span>
          </h1>

          {/* Description */}
          <p className="max-w-2xl text-base md:text-lg lg:text-xl text-slate-300 leading-relaxed">
            Leading manufacturer of distribution & power transformers, MV/LV switchgear, and turnkey electrical solutions. We deliver reliable, internationally certified engineering products for the most demanding industrial sectors across Pakistan.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2 md:pt-4">
            <Button asChild size="lg" className="h-12 md:h-14 px-6 md:px-8 text-sm md:text-base rounded-full shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)] transition-transform hover:scale-105">
              <Link href="/contact/request-quote">
                Request a Quote <ArrowRight className="ml-2 size-4 md:size-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 md:h-14 px-6 md:px-8 text-sm md:text-base rounded-full border-slate-600 text-white hover:bg-slate-800 bg-transparent backdrop-blur-sm">
              <Link href="/products">Explore Products</Link>
            </Button>
          </div>

          {/* Stats (Thora compact kiya hai) */}
          <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-slate-800 mt-8">
            <div>
              <p className="text-2xl md:text-3xl font-bold text-white">40+</p>
              <p className="text-xs md:text-sm text-slate-400 mt-1">Years Experience</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold text-white">500+</p>
              <p className="text-xs md:text-sm text-slate-400 mt-1">Projects Delivered</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold text-white">45+</p>
              <p className="text-xs md:text-sm text-slate-400 mt-1">Clients Served</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold text-white">24/7</p>
              <p className="text-xs md:text-sm text-slate-400 mt-1">Support Available</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}