import Link from "next/link";
import { ArrowRight, MapPin, Building2, Calendar } from "lucide-react";
import { LazyImage } from "@/components/shared/LazyImage";
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    slug: string;
    client_name: string | null;
    sector: string | null;
    location: string | null;
    completion_year: number | null;
    scope_of_work: string | null;
    image_url: string | null; // 🚨 Yahan database wala column name use kiya hai
  };
}

export function ProjectCard({ project }: ProjectCardProps) {
  // Agar database mein image hai toh wo dikhao, warna ye Unsplash wali achi image dikhao
  const imageUrl = project.image_url || "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop";

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border bg-card transition-all hover:shadow-lg"
    >
      {/* Image */}
      <div className="relative aspect-4/3 overflow-hidden bg-muted">
        <LazyImage
          src={imageUrl}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge className="bg-primary/90 text-primary-foreground hover:bg-primary">
            {project.sector || "Project"}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2 mb-3">
          {project.title}
        </h3>

        <div className="space-y-1.5 text-sm text-muted-foreground mb-4 flex-1">
          {project.client_name && (
            <div className="flex items-center gap-2">
              <Building2 className="size-4 shrink-0 text-primary/70" />
              <span className="font-medium text-foreground">{project.client_name}</span>
            </div>
          )}
          {project.location && (
            <div className="flex items-center gap-2">
              <MapPin className="size-4 shrink-0 text-primary/70" />
              <span>{project.location}</span>
            </div>
          )}
          {project.completion_year && (
            <div className="flex items-center gap-2">
              <Calendar className="size-4 shrink-0 text-primary/70" />
              <span>Completed in {project.completion_year}</span>
            </div>
          )}
        </div>

        <div className="mt-auto pt-4 border-t flex items-center text-sm font-semibold text-primary">
          View Case Study <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}