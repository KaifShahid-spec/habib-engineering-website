import Image from "next/image";

export function TrustedClients() {
  const clients = [
    { name: "CMH LMC & IOD", logo: "/clients/cmh-lmc.png" },
    { name: "Frontier Works Organization (FWO)", logo: "/clients/fwo.png" },
    { name: "Pakistan Armed Forces", logo: "/clients/armed-forces.png" },
    { name: "Punjab Agriculture Food & Drug Authority (PAFDA)", logo: "/clients/pafda.png" },
  ];

  return (
    // 🚨 Background ko white (bg-white) kar diya hai
    <section className="py-16 md:py-24 bg-white border-y">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Heading & Details */}
        <div className="max-w-4xl mb-12">
          <span className="text-primary font-bold tracking-wider uppercase text-base md:text-lg mb-2 block">
            Our Esteemed Clients
          </span>
          {/* 🚨 Text color dark (slate-900) kar diya hai taake white background par dikhe */}
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
            We Worked With
          </h2>
          
          {/* 🚨 Details ka color grey kar diya hai */}
          <div className="space-y-4 text-slate-600 text-base md:text-lg leading-relaxed text-left">
            <p>
              Habib Engineering takes immense pride in serving Pakistan's most critical institutions. Our journey of excellence is built on the trust of government bodies, defense organizations, and industrial giants.
              From powering military hospitals and defense installations to delivering complex infrastructure projects, we have consistently met the stringent quality and security standards required by these prestigious organizations.
              This unwavering trust is a testament to our engineering discipline, reliability, and commitment to national progress.
            </p>
          </div>
        </div>

        {/* Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 items-center justify-items-center">
          {clients.map((client, idx) => (
            <div 
              key={idx} 
              // 🚨 Cards ko light grey background aur border diya hai
              className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100 hover:shadow-md transition-all w-full"
              title={client.name}
            >
              <div className="relative w-32 h-32 md:w-40 md:h-40 mb-4 bg-white rounded-lg p-2 shadow-sm"> 
                <Image
                  src={client.logo}
                  alt={client.name}
                  fill
                  sizes="(max-width: 768px) 150px, 200px"
                  className="object-contain p-2"
                />
              </div>
              {/* 🚨 Client ke naam ka color dark kar diya hai */}
              <p className="text-sm md:text-base font-bold text-slate-800 text-center max-w-[200px]">
                {client.name}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}