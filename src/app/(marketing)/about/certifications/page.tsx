import { createServerClient } from "@/lib/supabase/server";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { Award, CheckCircle2, ShieldCheck, FileCheck } from "lucide-react";
import { generateMetadata } from "@/lib/seo/metadata";
import { CTA } from "@/components/sections/home/CTA";

export const metadata = generateMetadata({
  title: "Certifications & Approvals",
  description: "Habib Engineering is ISO certified and approved by leading authorities in Pakistan.",
  path: "/about/certifications",
});

export default async function CertificationsPage() {
  const supabase = await createServerClient();
  
  // Database se saara active data fetch karein
  const { data: certifications } = await supabase
    .from("certifications")
    .select("*")
    .eq("is_active", true)
    .order("kind", { ascending: true })
    .order("title");

  // Data ko categories mein divide karein
  const isoCerts = certifications?.filter(c => c.kind === 'iso') || [];
  const approvals = certifications?.filter(c => c.kind === 'approval') || [];
  const registrations = certifications?.filter(c => c.kind === 'registration') || [];

  return (
    <>
      {/* 1. ISO Certifications Section */}
      <Section bg="muted">
        <SectionHeader
          title="Our Certifications"
          description="We maintain international standards of quality, environmental responsibility, and occupational health & safety."
        />
        
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {isoCerts.map((cert) => (
            <Card key={cert.id} className="text-center hover:border-primary/50 transition-colors">
              <CardContent className="p-8 space-y-4">
                <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Award className="size-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{cert.title}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{cert.issuing_authority}</p>
                </div>
                {cert.issue_date && (
                  <p className="text-xs font-semibold text-primary/80 bg-primary/5 py-1 px-3 rounded-full inline-block">
                    Since {new Date(cert.issue_date).getFullYear()}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* 2. Approvals & Registrations Section */}
      <Section>
        <div className="max-w-5xl mx-auto space-y-12">
          
          {/* Approvals */}
          {approvals.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck className="size-8 text-primary" />
                <h2 className="text-2xl font-bold">Approved & Registered With</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {approvals.map((cert) => (
                  <div key={cert.id} className="flex items-start gap-3 p-4 rounded-lg border bg-card">
                    <CheckCircle2 className="size-5 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-sm">{cert.title}</h3>
                      {cert.issuing_authority && <p className="text-xs text-muted-foreground mt-1">{cert.issuing_authority}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Registrations */}
          {registrations.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <FileCheck className="size-8 text-primary" />
                <h2 className="text-2xl font-bold">Registrations</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {registrations.map((cert) => (
                  <div key={cert.id} className="flex items-start gap-4 p-5 rounded-lg border bg-card">
                    <div className="bg-primary/10 p-2 rounded-full shrink-0">
                      <FileCheck className="size-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold">{cert.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{cert.issuing_authority}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* What These Mean for You */}
          <div className="max-w-3xl mx-auto pt-8 border-t">
            <h2 className="text-2xl font-bold text-center mb-6">What These Mean for You</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Consistent product quality, audited annually",
                "Environmentally responsible manufacturing",
                "Safe working conditions for our teams and your site",
                "Compliance with international procurement standards",
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-lg border bg-card">
                  <CheckCircle2 className="size-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">{point}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </Section>

      <CTA />
    </>
  );
}