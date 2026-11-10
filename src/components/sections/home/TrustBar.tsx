import { ShieldCheck, Award, Users, Briefcase } from "lucide-react";

export function TrustBar() {
  const certs = [
    { name: "ISO 9001:2015", label: "Quality Management", desc: "Consistent quality standards" },
    { name: "ISO 14001:2015", label: "Environmental", desc: "Eco-friendly manufacturing" },
    { name: "ISO 45001:2018", label: "Health & Safety", desc: "Safe working conditions" },
    { name: "PEC Registered", label: "Pakistan Eng. Council", desc: "Official engineering body" },
  ];

  const stats = [
    { value: "40+", label: "Years Experience", icon: Award, desc: "Serving since 1985" },
    { value: "500+", label: "Projects Delivered", icon: Briefcase, desc: "Across Pakistan" },
    { value: "45+", label: "Clients Served", icon: Users, desc: "Including MES & FWO" },
    { value: "10+", label: "ISO Certifications", icon: ShieldCheck, desc: "Internationally certified" },
  ];

  return (
    // 🚨 bg-slate-900 lagaya hai taake agar image load na ho toh bhi white na dikhe
    <section className="relative overflow-hidden py-16 md:py-24 border-b bg-slate-900">
      
      {/* 🚨 Background Image - z-0 aur opacity-50 */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/certifications-bg.png" 
          alt="Certifications Background" 
          className="w-full h-full object-cover opacity-50"
        />
        {/* Dark Overlay taake text white saaf nazar aaye */}
        <div className="absolute inset-0 bg-slate-950/60" />
      </div>

      {/* 🚨 Content z-10 par hai */}
      <div className="container relative z-10 mx-auto px-4 max-w-6xl">
        
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">
            Trusted Certifications
          </h2>
          <p className="text-sm md:text-base text-slate-200 max-w-2xl mx-auto">
            We maintain international standards for quality, safety, and environmental management.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {certs.map((cert, idx) => (
            <div 
              key={idx} 
              // 🚨 Cards wapas bilkul white (bg-white)
              className="flex flex-col items-center text-center p-5 bg-white rounded-xl shadow-lg border border-slate-100 hover:shadow-xl hover:border-primary/30 transition-all duration-300"
            >
              <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <ShieldCheck className="size-5 text-primary" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">{cert.name}</h3>
              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mt-1">{cert.label}</p>
              <p className="text-xs text-slate-400 mt-2">{cert.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">
            Our Track Record
          </h2>
          <p className="text-sm md:text-base text-slate-200 max-w-2xl mx-auto">
            Delivering reliable power infrastructure across Pakistan's toughest sectors.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div 
                key={idx} 
                className="flex flex-col items-center text-center p-5 bg-slate-800 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-700"
              >
                <Icon className="size-5 text-primary mb-2" />
                <p className="text-2xl md:text-3xl font-extrabold text-white mb-1">{stat.value}</p>
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                <p className="text-xs text-slate-500 mt-2">{stat.desc}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}