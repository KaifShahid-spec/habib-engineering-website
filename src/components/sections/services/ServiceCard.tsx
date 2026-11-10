import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ServiceCardProps {
  service: {
    slug: string;
    name: string;
    tagline: string;
    description: string;
    href: string;
    icon: React.ElementType;
  };
}

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <Link
      href={service.href}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-card p-8 transition-all hover:border-primary/50 hover:shadow-lg"
    >
      <div className="absolute right-0 top-0 -mr-4 -mt-4 opacity-5 transition-transform duration-500 group-hover:scale-110 group-hover:opacity-10">
        <Icon className="size-40" />
      </div>

      <div className="relative z-10">
        <div className="mb-6 inline-flex size-14 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          <Icon className="size-7" />
        </div>
        <h3 className="mb-2 text-2xl font-bold tracking-tight group-hover:text-primary transition-colors">
          {service.name}
        </h3>
        <p className="mb-4 text-sm font-medium text-primary/80">
          {service.tagline}
        </p>
        <p className="text-muted-foreground leading-relaxed">
          {service.description}
        </p>
      </div>

      <div className="relative z-10 mt-8 flex items-center text-sm font-semibold text-primary">
        Explore Service <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}