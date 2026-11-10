"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProjectFilterProps {
  search: string; onSearchChange: (value: string) => void;
  sectorFilter: string; onSectorChange: (value: string) => void; uniqueSectors: string[];
  locationFilter: string; onLocationChange: (value: string) => void; uniqueLocations: string[];
}

export function ProjectFilter({ search, onSearchChange, sectorFilter, onSectorChange, uniqueSectors, locationFilter, onLocationChange, uniqueLocations }: ProjectFilterProps) {
  return (
    <div className="flex flex-col md:flex-row items-stretch gap-3 mb-8 bg-card p-3 rounded-2xl border shadow-sm">
      <div className="relative w-full md:flex-1">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input placeholder="Search projects..." value={search} onChange={(e) => onSearchChange(e.target.value)} className="pl-10 h-11 bg-slate-50/50 border-slate-200 rounded-xl" />
      </div>
      <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
        <Select value={sectorFilter} onValueChange={(val) => onSectorChange(val || "all")}>
          <SelectTrigger className="w-full sm:w-[160px] h-11 bg-slate-50/50 border-slate-200 rounded-xl">
            <SelectValue placeholder="All Sectors" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sectors</SelectItem>
            {uniqueSectors.map((sector) => <SelectItem key={sector} value={sector}>{sector}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={locationFilter} onValueChange={(val) => onLocationChange(val || "all")}>
          <SelectTrigger className="w-full sm:w-[160px] h-11 bg-slate-50/50 border-slate-200 rounded-xl">
            <SelectValue placeholder="All Locations" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            {uniqueLocations.map((loc) => <SelectItem key={loc} value={loc}>{loc}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}