import { processSteps } from "@/content/services";
import { CheckCircle2 } from "lucide-react";

export function ProcessSteps() {
  return (
    <div className="relative mx-auto max-w-4xl">
      {/* Vertical Line */}
      <div className="absolute left-4 top-0 h-full w-0.5 bg-muted md:left-1/2 md:-ml-0.5" />

      <div className="space-y-12">
        {processSteps.map((step, index) => {
          const isEven = index % 2 === 0;

          return (
            <div key={step.number} className="relative flex flex-col md:flex-row md:items-center">
              {/* Mobile View: Left aligned */}
              <div className="md:hidden flex items-start gap-4">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold z-10">
                  {step.number}
                </div>
                <div className="pb-8">
                  <h3 className="text-lg font-bold">{step.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>

              {/* Desktop View: Alternating Left/Right */}
              <div className="hidden md:flex w-full items-center justify-between">
                {/* Left Side */}
                <div className={`w-[45%] ${isEven ? "text-right pr-8" : "order-3 text-left pl-8"}`}>
                  <h3 className="text-xl font-bold">{step.title}</h3>
                  <p className="mt-2 text-muted-foreground">{step.description}</p>
                </div>

                {/* Center Circle */}
                <div className="absolute left-1/2 -translate-x-1/2 flex size-10 items-center justify-center rounded-full border-4 border-background bg-primary text-primary-foreground font-bold shadow-sm z-10">
                  {step.number}
                </div>

                {/* Right Side (Empty Placeholder for alternating) */}
                <div className={`w-[45%] ${isEven ? "order-3" : "order-1"}`} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}