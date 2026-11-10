import { createServerClient } from "@/lib/supabase/server";
import { ContactForm } from "@/components/forms/ContactForm"; 
import { Phone, Mail, Factory, Building2, Clock } from "lucide-react";

export const metadata = {
  title: "Contact Us",
  description: "Get in touch with Habib Engineering for transformers, switchgear, and engineering solutions.",
};

export default async function ContactPage() {
  const supabase = await createServerClient();
  
  const { data: settingsData } = await supabase.from("settings").select("*");
  
  const settings = (settingsData || []).reduce((acc: Record<string, string>, curr: any) => {
    if (curr.key && curr.value) {
      let cleanValue = String(curr.value);
      if (cleanValue.startsWith('"') && cleanValue.endsWith('"')) {
        cleanValue = cleanValue.slice(1, -1);
      }
      acc[curr.key] = cleanValue;
    }
    return acc;
  }, {});

  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-6xl mb-24">
      
      <div className="mb-12">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
          Get in Touch
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Whether you have a technical inquiry or need a quote for your next project, our team is ready to assist you.
        </p>
      </div>

      {/* Contact Info Cards (Top Row) */}
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        {/* Phone */}
        <div className="bg-card border rounded-2xl p-6 flex items-start gap-4 shadow-sm">
          <div className="size-12 bg-slate-100 rounded-full flex items-center justify-center shrink-0">
            <Phone className="size-5 text-slate-700" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-slate-900 mb-1">Phone</h3>
            <div className="flex flex-col gap-1">
              {settings.company_phone_1 && (
                <a href={`tel:${settings.company_phone_1}`} className="text-sm font-medium text-slate-600 hover:text-primary transition-colors whitespace-nowrap">
                  {settings.company_phone_1}
                </a>
              )}
              {settings.company_phone_2 && (
                <a href={`tel:${settings.company_phone_2}`} className="text-sm font-medium text-slate-600 hover:text-primary transition-colors whitespace-nowrap">
                  {settings.company_phone_2}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="bg-card border rounded-2xl p-6 flex items-center gap-4 shadow-sm">
          <div className="size-12 bg-slate-100 rounded-full flex items-center justify-center shrink-0">
            <Mail className="size-5 text-slate-700" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900">Email</h3>
            <p className="text-sm text-muted-foreground break-all">
              {settings.company_email || "info@habibengineering.com"}
            </p>
          </div>
        </div>
      </div>

      {/* Address & Hours Cards (Second Row) */}
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        {/* Head Office Address */}
        <div className="bg-card border rounded-2xl p-6 flex items-start gap-4 shadow-sm">
          <div className="size-12 bg-slate-100 rounded-full flex items-center justify-center shrink-0">
            <Building2 className="size-5 text-slate-700" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900">Head Office</h3>
            <p className="text-sm text-muted-foreground">
              {settings.head_office_address || "Plaza # 163/CC1, 1st Floor, T Block, DHA, Phase 8, Lahore."}
            </p>
          </div>
        </div>

        {/* Working Hours */}
        <div className="bg-card border rounded-2xl p-6 flex items-center gap-4 shadow-sm">
          <div className="size-12 bg-slate-100 rounded-full flex items-center justify-center shrink-0">
            <Clock className="size-5 text-slate-700" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900">Working Hours</h3>
            <p className="text-sm text-muted-foreground">Mon-Sat, 9:00 AM – 6:00 PM (PKT)</p>
          </div>
        </div>
      </div>

      {/* Factory Address Card (Full Width) */}
      <div className="bg-card border rounded-2xl p-6 flex items-start gap-4 shadow-sm mb-4">
        <div className="size-12 bg-slate-100 rounded-full flex items-center justify-center shrink-0">
          <Factory className="size-5 text-slate-700" />
        </div>
        <div>
          <h3 className="font-bold text-slate-900">Factory</h3>
          <p className="text-sm text-muted-foreground">
            {settings.factory_address || "Plot 59, Block B, Military Accounts Housing Society (near Khaki Shah Darbar / Missile Chowk), Lahore."}
          </p>
        </div>
      </div>

      {/* Form & Maps Section */}
      <div className="grid lg:grid-cols-2 gap-8 mt-12">
        
        {/* Left Side: Message Form */}
        <div>
          <div className="bg-card border rounded-2xl p-6 md:p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Send us a Message</h2>
            <p className="text-sm text-muted-foreground mb-6">Fill out the form below and we'll get back to you within 24 hours.</p>
            <ContactForm /> 
          </div>
        </div>

        {/* Right Side: Maps */}
        <div className="space-y-8">
          
          {/* Head Office Map */}
          <div>
            <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Building2 className="size-4 text-primary" /> Head Office Location
            </h3>
            <div className="h-[250px] rounded-xl overflow-hidden border shadow-sm">
              <iframe 
                src="https://www.google.com/maps?q=Plaza+163+CC1,+T+Block,+DHA+Phase+8,+Lahore,+Pakistan&output=embed"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Head Office Location"
              ></iframe>
            </div>
          </div>

          {/* Factory Map (UPDATED) */}
          <div>
            <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Factory className="size-4 text-primary" /> Factory Location
            </h3>
            <div className="h-[250px] rounded-xl overflow-hidden border shadow-sm">
              <iframe 
                // 🚨 Naya address yahan dala hai
                src="https://www.google.com/maps?q=Plot+59,+Block+B,+Military+Accounts+Housing+Society,+Lahore,+Pakistan&output=embed"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Factory Location"
              ></iframe>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}