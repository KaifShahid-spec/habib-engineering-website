import { Section } from "@/components/ui/section";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { generateMetadata } from "@/lib/seo/metadata";
import { ShieldCheck, Clock, Users } from "lucide-react";

export const metadata = generateMetadata({
  title: "Request a Quote",
  description: "Get a detailed quotation for transformers, switchgear, and turnkey electrical solutions. Response within 1–2 business days.",
  path: "/contact/request-quote",
});

export default function RequestQuotePage() {
  return (
    <Section bg="muted" className="py-12 md:py-20">
      {/* 🚨 Mobile par 1 column, Desktop par 3 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start max-w-6xl mx-auto">
        
        {/* Left Side — Trust Info (Mobile par form ke upar aayega) */}
        <div className="lg:col-span-1 space-y-6 md:space-y-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">Request a Quote</h1>
            <p className="text-muted-foreground text-sm md:text-base">
              Tell us about your project and requirements. Our sales team will prepare a detailed quotation within 1–2 business days.
            </p>
          </div>

          {/* 🚨 Ye 3 points wapas yahan aa gaye hain (Trust Info ke andar) */}
          <div className="space-y-4 bg-white p-4 md:p-6 rounded-xl border shadow-sm">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-md bg-primary/10 text-primary shrink-0">
                <ShieldCheck className="size-5" />
              </div>
              <div>
                <p className="font-semibold text-sm">No Obligation</p>
                <p className="text-xs text-muted-foreground">Quotes are free and non-binding.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-md bg-primary/10 text-primary shrink-0">
                <Clock className="size-5" />
              </div>
              <div>
                <p className="font-semibold text-sm">Fast Response</p>
                <p className="text-xs text-muted-foreground">Most quotes within 24–48 hours.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-md bg-primary/10 text-primary shrink-0">
                <Users className="size-5" />
              </div>
              <div>
                <p className="font-semibold text-sm">Expert Team</p>
                <p className="text-xs text-muted-foreground">Reviewed by our senior engineers.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side — Quote Form */}
        <div className="lg:col-span-2 bg-card border rounded-2xl p-4 md:p-8 shadow-sm w-full overflow-hidden">
          <QuoteForm />
        </div>

      </div>
    </Section>
  );
}