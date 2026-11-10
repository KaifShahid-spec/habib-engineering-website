import Link from "next/link";
import { FileText, Download, ShieldCheck, Factory } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Downloads",
  description: "Download Habib Engineering company profile, catalogs, and certifications.",
};

export default function DownloadsPage() {
  // Yahan humne files ki list banayi hai
  const downloads = [
    {
      title: "Company Profile 2025",
      description: "Complete overview of Habib Engineering, our products, projects, and group companies.",
      icon: Factory,
      fileUrl: "/downloads/habib-engineering-profile.pdf", // 🚨 Ye file public/downloads mein honi chahiye
      fileSize: "PDF (5 MB)",
      available: true, // Ye file mojood hai
    },
    {
      title: "Product Catalogue",
      description: "Detailed specifications for transformers, switchgear, and cable management systems.",
      icon: FileText,
      fileUrl: "#",
      fileSize: "PDF (Coming Soon)",
      available: false, // Abhi nahi hai
    },
    {
      title: "ISO Certifications",
      description: "Official ISO 9001, 14001, and 45001 certificates and compliance documents.",
      icon: ShieldCheck,
      fileUrl: "#",
      fileSize: "PDF (Coming Soon)",
      available: false, // Abhi nahi hai
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-5xl">
      
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
          Downloads & Resources
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Access our company profile, product catalogs, and technical documentation in PDF format.
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {downloads.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex flex-col bg-card border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Icon className="size-6 text-primary" />
              </div>

              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground mb-6 flex-1">
                {item.description}
              </p>

              <div className="pt-4 border-t flex items-center justify-between mt-auto">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {item.fileSize}
                </span>

                {item.available ? (
                  <Button asChild size="sm" className="rounded-full">
                    <a href={item.fileUrl} download>
                      <Download className="mr-2 size-4" /> Download
                    </a>
                  </Button>
                ) : (
                  <Button disabled size="sm" variant="secondary" className="rounded-full opacity-70">
                    Coming Soon
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}