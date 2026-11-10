"use client";

import { useState, useMemo } from "react";
import { SiteFilter } from "./SiteFilter";
import { EmptyState } from "@/components/ui/empty-state";
import { Building2, MapPin, SearchX } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LazyImage } from "@/components/shared/LazyImage";

interface Client {
  id: string;
  name: string;
  sector: string | null;
  city: string | null;
  logo_url: string | null;
}

interface ClientTableProps {
  clients: Client[];
}

export function ClientTable({ clients }: ClientTableProps) {
  const [search, setSearch] = useState("");
  const [cityFilter, setCityFilter] = useState("all");

  // Extract unique cities for the filter dropdown
  const uniqueCities = useMemo(() => {
    const cities = clients.map((c) => c.city).filter(Boolean) as string[];
    return Array.from(new Set(cities)).sort();
  }, [clients]);

  // Filter clients based on search and city
  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      const matchesSearch = client.name.toLowerCase().includes(search.toLowerCase());
      const matchesCity = cityFilter === "all" || client.city === cityFilter;
      return matchesSearch && matchesCity;
    });
  }, [clients, search, cityFilter]);

  return (
    <div>
      <SiteFilter
        search={search}
        onSearchChange={setSearch}
        cityFilter={cityFilter}
        onCityChange={setCityFilter}
        uniqueCities={uniqueCities}
      />

      {filteredClients.length === 0 ? (
        <EmptyState
          icon={<SearchX className="h-10 w-10 text-muted-foreground" />}
          title="No clients found"
          description="Try adjusting your search or filters to find what you're looking for."
        />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredClients.map((client) => (
            <div
              key={client.id}
              className="group flex flex-col items-center justify-center rounded-xl border bg-card p-6 text-center transition-all hover:border-primary/50 hover:shadow-md"
            >
              {/* Logo / Placeholder */}
              <div className="relative mb-4 flex h-16 w-full items-center justify-center">
                {client.logo_url ? (
                  <LazyImage
                    src={client.logo_url}
                    alt={`${client.name} logo`}
                    width={120}
                    height={60}
                    className="max-h-16 w-auto object-contain grayscale transition-all group-hover:grayscale-0"
                  />
                ) : (
                  <div className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    <Building2 className="size-6" />
                  </div>
                )}
              </div>

              {/* Name */}
              <h3 className="text-sm font-semibold line-clamp-2">{client.name}</h3>

              {/* Details */}
              <div className="mt-3 flex flex-col items-center gap-1.5">
                {client.sector && (
                  <Badge variant="secondary" className="text-[10px] font-normal px-2 py-0.5">
                    {client.sector}
                  </Badge>
                )}
                {client.city && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="size-3" />
                    {client.city}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Summary (optional) */}
      <div className="mt-8 text-center text-sm text-muted-foreground">
        Showing {filteredClients.length} of {clients.length} clients
      </div>
    </div>
  );
}