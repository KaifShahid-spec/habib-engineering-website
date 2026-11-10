import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock, Factory, ArrowRight } from "lucide-react";
import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import { siteConfig } from "@/config/site";
import { createServerClient } from "@/lib/supabase/server";

export async function Footer() {
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
    <footer className="bg-slate-950 text-slate-300 py-12 md:py-16 border-t border-slate-800">
      <div className="container mx-auto px-4 max-w-6xl">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          
          {/* Column 1: Brand Info Box */}
          <div>
            <div className="bg-white/5 border border-slate-800 p-5 rounded-2xl flex flex-col gap-4">
              
              <div className="flex items-center gap-3">
                <div className="bg-white p-1.5 rounded-lg shrink-0">
                  <div className="relative h-8 w-10 md:h-10 md:w-12">
                    <Image 
                      src="/logo.png" 
                      alt="Habib Engineering" 
                      fill 
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-contain"
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-base md:text-lg font-black tracking-tighter text-white leading-none">
                    HABIB
                  </span>
                  <span className="text-sm md:text-base font-black tracking-tighter text-slate-400 leading-none mt-1">
                    ENGINEERING
                  </span>
                </div>
              </div>

              <p className="text-sm text-slate-400 leading-relaxed">
                Powering Pakistan's industry since 1985. We manufacture distribution & power transformers, switchgear, and deliver turnkey electrical solutions for critical sectors.
              </p>

              {/* Icons ko yahan se hata diya hai taake neechay aayen */}
            </div>
          </div>

          {/* Column 2: Company Links */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-wider mb-6 text-sm">Company</h3>
            <ul className="space-y-3">
              {[
                { name: "About Us", href: "/about" },
                { name: "Certifications", href: "/about/certifications" },
                { name: "Group Companies", href: "/about/group-companies" },
                { name: "Why Choose Us", href: "/about/why-choose-us" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-primary transition-colors flex items-center gap-2 group">
                    <ArrowRight className="size-3 -ml-4 opacity-0 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources Links */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-wider mb-6 text-sm">Resources</h3>
            <ul className="space-y-3">
              {[
                { name: "Downloads", href: "/downloads" },
                { name: "Blog", href: "/blog" },
                { name: "Projects", href: "/projects" },
                { name: "Clients", href: "/clients" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-primary transition-colors flex items-center gap-2 group">
                    <ArrowRight className="size-3 -ml-4 opacity-0 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-wider mb-6 text-sm">Contact Us</h3>
            <ul className="space-y-4">
              <li>
                <a href="https://www.google.com/maps/search/?api=1&query=Plaza+163+CC1,+T+Block,+DHA+Phase+8,+Lahore,+Pakistan" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-sm text-slate-400 hover:text-primary transition-colors group">
                  <MapPin className="size-5 shrink-0 text-slate-500 group-hover:text-primary transition-colors mt-0.5" />
                  <span>
                    <span className="font-semibold text-slate-300">Head Office:</span><br />
                    {settings.head_office_address || "Plaza # 163/CC1, 1st Floor, T Block, DHA, Phase 8, Lahore."}
                  </span>
                </a>
              </li>
              <li>
                <a href="https://www.google.com/maps/search/?api=1&query=Plot+59,+Block+B,+Military+Accounts+Housing+Society,+Lahore,+Pakistan" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-sm text-slate-400 hover:text-primary transition-colors group">
                  <Factory className="size-5 shrink-0 text-slate-500 group-hover:text-primary transition-colors mt-0.5" />
                  <span>
                    <span className="font-semibold text-slate-300">Factory:</span><br />
                    {settings.factory_address || "Plot 59, Block B, Military Accounts Housing Society, Lahore."}
                  </span>
                </a>
              </li>
              <li>
                <a href={`tel:${settings.company_phone_1 || siteConfig.phone}`} className="flex items-center gap-3 text-sm text-slate-400 hover:text-primary transition-colors group">
                  <Phone className="size-5 shrink-0 text-slate-500 group-hover:text-primary transition-colors" />
                  <span>{settings.company_phone_1 || siteConfig.phone}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${settings.company_email || siteConfig.email}`} className="flex items-center gap-3 text-sm text-slate-400 hover:text-primary transition-colors group">
                  <Mail className="size-5 shrink-0 text-slate-500 group-hover:text-primary transition-colors" />
                  <span className="break-all">{settings.company_email || siteConfig.email}</span>
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <Clock className="size-5 shrink-0 text-slate-500" />
                <span>Mon-Sat, 9:00 AM – 6:00 PM (PKT)</span>
              </li>
            </ul>
          </div>

        </div>

        {/* 🚨 Bottom Bar (Icons Yahan Aayenge) */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4">
          
          {/* Left Side: Copyright & Social Icons */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <p className="text-xs text-slate-500 order-2 sm:order-1">
              © {new Date().getFullYear()} Habib Engineering. All rights reserved.
            </p>
            
            {/* 🚨 Social Icons (Tick wali jagah) */}
            <div className="flex gap-4.5 order-1 sm:order-2">
              {/* Facebook */}
              <a 
                href="https://www.facebook.com/share/1EC6EesH45/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center size-8 bg-[#1877F2] text-white rounded-full hover:scale-110 transition-transform"
                aria-label="Facebook"
              >
                <FaFacebook className="size-4" />
              </a>
              {/* Instagram */}
              <a 
                href="https://www.instagram.com/habib_engineering" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center size-8 text-white rounded-full hover:scale-110 transition-transform bg-linear-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]"
                aria-label="Instagram"
              >
                <FaInstagram className="size-4" />
              </a>
              {/* LinkedIn */}
              <a 
                href={settings.linkedin_url || "#"} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center size-8 bg-[#0A66C2] text-white rounded-full hover:scale-110 transition-transform"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="size-4" />
              </a>
            </div>
          </div>

          {/* Right Side: Legal Links */}
          <div className="flex gap-6 order-3">
            <Link href="/privacy-policy" className="text-xs text-slate-500 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-slate-500 hover:text-white transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}