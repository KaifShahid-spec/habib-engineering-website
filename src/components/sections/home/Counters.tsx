import { stats } from "@/content/why-choose-us";

export function Counters() {
  return (
    <section className="py-12 md:py-16 bg-slate-900 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
          {stats.map((stat) => (
            <div key={stat.label} className="space-y-1 md:space-y-2">
              <h3 className="text-3xl md:text-5xl font-extrabold tracking-tighter text-primary">
                {stat.value}{stat.suffix}
              </h3>
              <p className="text-xs md:text-sm font-medium text-slate-400 uppercase tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}