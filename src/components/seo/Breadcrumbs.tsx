import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { JsonLd } from "./JsonLd";
import { getBreadcrumbSchema } from "@/lib/seo/schema";
import { cn } from "@/lib/utils";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  light?: boolean; // 👈 Yeh prop add kiya gaya hai
}

export function Breadcrumbs({ items, light = false }: BreadcrumbsProps) {
  // Google ke liye schema items tayar karein
  const schemaItems = [
    { name: "Home", url: "/" },
    ...items.map((item) => ({
      name: item.label,
      url: item.href || "",
    })),
  ].filter((item) => item.url);

  return (
    <>
      {/* Schema for Google */}
      <JsonLd data={getBreadcrumbSchema(schemaItems)} />

      {/* Visual Breadcrumbs for User */}
      <nav aria-label="Breadcrumb" className={cn("mb-6", light ? "text-white/70" : "text-muted-foreground")}>
        <ol className="flex items-center flex-wrap gap-1.5 text-sm">
          <li>
            <Link href="/" className={cn("flex items-center transition-colors", light ? "hover:text-white" : "hover:text-foreground")}>
              <Home className="size-4" />
              <span className="sr-only">Home</span>
            </Link>
          </li>

          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li key={index} className="flex items-center gap-1.5">
                <ChevronRight className="size-4 opacity-50" />
                {isLast || !item.href ? (
                  <span className={cn("font-medium", light ? "text-white" : "text-foreground")} aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <Link href={item.href} className={cn("transition-colors", light ? "hover:text-white" : "hover:text-foreground")}>
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}