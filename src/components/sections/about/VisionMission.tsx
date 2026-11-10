import { vision, mission } from "@/content/company";
import { Target, Eye } from "lucide-react";

export function VisionMission() {
  return (
    <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
      {/* Vision Card */}
      <div className="relative overflow-hidden rounded-2xl border bg-card p-8 shadow-sm">
        <div className="absolute right-0 top-0 p-8 opacity-5">
          <Eye className="size-32" />
        </div>
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center justify-center rounded-lg bg-primary/10 p-3 text-primary">
            <Eye className="size-6" />
          </div>
          <h3 className="text-2xl font-bold tracking-tight">{vision.title}</h3>
          <p className="text-muted-foreground leading-relaxed">
            {vision.body}
          </p>
        </div>
      </div>

      {/* Mission Card */}
      <div className="relative overflow-hidden rounded-2xl border bg-card p-8 shadow-sm">
        <div className="absolute right-0 top-0 p-8 opacity-5">
          <Target className="size-32" />
        </div>
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center justify-center rounded-lg bg-primary/10 p-3 text-primary">
            <Target className="size-6" />
          </div>
          <h3 className="text-2xl font-bold tracking-tight">{mission.title}</h3>
          <p className="text-muted-foreground leading-relaxed">
            {mission.body}
          </p>
        </div>
      </div>
    </div>
  );
}