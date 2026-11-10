import { coreValues } from "@/content/company";
import { ShieldCheck } from "lucide-react";

export function CoreValues() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {coreValues.map((value, index) => (
        <div 
          key={index} 
          className="group relative rounded-xl border bg-card p-6 hover:border-primary/50 hover:shadow-md transition-all duration-300"
        >
          <div className="mb-4 inline-flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            <ShieldCheck className="size-6" />
          </div>
          <h4 className="mb-2 text-lg font-semibold">{value.title}</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {value.description}
          </p>
        </div>
      ))}
    </div>
  );
}