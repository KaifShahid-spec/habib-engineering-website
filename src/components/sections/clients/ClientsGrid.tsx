"use client";

import { useState, useMemo } from "react";
import { Building2, MapPin } from "lucide-react";
import { SiteFilter } from "./SiteFilter";

interface ClientsGridProps {
  initialClients: any[];
}

export function ClientsGrid({ initialClients }: ClientsGridProps) {
  const [search, setSearch] = useState("");
  const [cityFilter, setCityFilter] = useState("all");

  // Unique cities nikalne ke liye
  const uniqueCities = useMemo(() => {
    const cities = initialClients.map((c) => c.city).filter(Boolean);
    return Array.from(new Set(cities)).sort();
  }, [initialClients]);

  // Filter logic
  const filteredClients = useMemo(() => {
    return initialClients.filter((client) => {
      const matchSearch = client.name.toLowerCase().includes(search.toLowerCase());
      const matchCity = cityFilter === "all" || client.city === cityFilter;
      return matchSearch && matchCity;
    });
  }, [initialClients, search, cityFilter]);

  return (
    <div className="container mx-auto px-4 mt-8">
      {/* Filter */}
      <SiteFilter
        search={search}
        onSearchChange={setSearch}
        cityFilter={cityFilter}
        onCityChange={setCityFilter}
        uniqueCities={uniqueCities}
      />

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
        {filteredClients.length === 0 ? (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            No clients found matching your search.
          </div>
        ) : (
          filteredClients.map((client) => (
            <div
              key={client.id}
              className="group bg-white rounded-xl border border-slate-200 p-4 transition-all hover:border-primary/50 hover:shadow-md flex flex-col justify-between"
            >
              <div className="flex items-start gap-3">
                <div className="size-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                  <Building2 className="size-5 text-slate-500 group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 leading-tight">
                    {client.name}
                  </h3>
                  {client.city && (
                    <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                      <MapPin className="size-3" /> {client.city}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Count */}
      <div className="text-center mt-10 text-sm text-muted-foreground">
        Showing <span className="font-bold text-slate-900">{filteredClients.length}</span> of {initialClients.length} clients
      </div>
    </div>
  );
}