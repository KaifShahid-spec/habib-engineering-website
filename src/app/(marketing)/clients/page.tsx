import { getClients } from "@/lib/queries/clients";
import { ClientsGrid } from "@/components/sections/clients/ClientsGrid";

export const metadata = {
  title: "Our Clients",
  description: "Trusted by Pakistan's leading organizations.",
};

export default async function ClientsPage() {
  const clients = await getClients();

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Header Section */}
      <div className="bg-white border-b py-16 md:py-24">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
            Trusted by Pakistan's Leading Organisations
          </h1>
          <p className="text-lg text-muted-foreground">
            From national utilities to private industrial groups — our transformers, switchgear, and electrical systems power businesses across the country.
          </p>
        </div>
      </div>

      {/* Client Component */}
      <ClientsGrid initialClients={clients || []} />
    </div>
  );
}