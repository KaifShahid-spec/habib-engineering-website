"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SiteFilterProps {
  search: string; onSearchChange: (value: string) => void;
  cityFilter: string; onCityChange: (value: string) => void; uniqueCities: string[];
}

export function SiteFilter({ search, onSearchChange, cityFilter, onCityChange, uniqueCities }: SiteFilterProps) {
  return (
    <div className="flex flex-col md:flex-row items-stretch gap-3 mb-8 bg-card p-3 rounded-2xl border shadow-sm">
      <div className="relative w-full md:flex-1">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input placeholder="Search clients by name..." value={search} onChange={(e) => onSearchChange(e.target.value)} className="pl-10 h-11 bg-slate-50/50 border-slate-200 rounded-xl" />
      </div>
      <div className="w-full md:w-[200px]">
        <Select value={cityFilter} onValueChange={(value) => onCityChange(value ?? "all")}>
          <SelectTrigger className="w-full h-11 bg-slate-50/50 border-slate-200 rounded-xl">
            <SelectValue placeholder="All Cities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Cities</SelectItem>
            {uniqueCities.map((city) => <SelectItem key={city} value={city}>{city}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}