import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";

const groupCompanies = [
  {
    name: "Habib Transformers & Switchgears",
    description: "Core manufacturing unit for oil-immersed, dry-type transformers and MV/LV switchgear.",
    href: "/products",
  },
  {
    name: "Habib Engineering & Corporation",
    description: "Turnkey EPC contracting, MEP services, and electrical infrastructure delivery.",
    href: "/services",
  },
  {
    name: "Habib Lights",
    description: "Industrial and commercial LED lighting solutions for energy-efficient illumination.",
    href: "/products/led-lighting", // 🚨 Lights page ka link
  },
  {
    name: "Multi Engineering",
    description: "Diversified engineering solutions and services across industrial sectors.",
    href: "#", // 🚨 No link
  },
  {
    name: "Jahanzaib Constructions",
    description: "Civil and infrastructure construction for commercial and industrial projects.",
    href: "#", // 🚨 No link
  },
];

export function GroupCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {groupCompanies.map((company, index) => (
        <Link 
          key={index} 
          href={company.href}
          className={`group flex flex-col justify-between rounded-xl border bg-card p-6 transition-all ${
            company.href !== "#" ? "hover:border-primary hover:shadow-md cursor-pointer" : "cursor-default"
          }`}
        >
          <div>
            <div className="mb-4 inline-flex size-12 items-center justify-center rounded-lg bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
              <Building2 className="size-6" />
            </div>
            <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
              {company.name}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {company.description}
            </p>
          </div>
          
          {/* 🚨 "Learn more" sirf tab dikhega jab link ho */}
          {company.href !== "#" && (
            <div className="mt-6 flex items-center text-sm font-semibold text-primary">
              Learn more <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
            </div>
          )}
        </Link>
      ))}
    </div>
  );
}