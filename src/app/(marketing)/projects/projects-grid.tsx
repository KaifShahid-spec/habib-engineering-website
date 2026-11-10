"use client";

import { useState, useMemo } from "react";
import { ProjectCard } from "@/components/sections/projects/ProjectCard";
import { ProjectFilter } from "@/components/sections/projects/ProjectFilter";

export function ProjectsGrid({ projects }: { projects: any[] }) {
  const [search, setSearch] = useState("");
  const [sector, setSector] = useState("all");
  const [location, setLocation] = useState("all");

  const uniqueSectors = useMemo(() => Array.from(new Set(projects.map(p => p.sector))).sort(), [projects]);
  const uniqueLocations = useMemo(() => Array.from(new Set(projects.map(p => p.location))).sort(), [projects]);

  const filtered = useMemo(() => {
    return projects.filter(p => {
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.client_name.toLowerCase().includes(search.toLowerCase());
      const matchSector = sector === "all" || p.sector === sector;
      const matchLocation = location === "all" || p.location === location;
      return matchSearch && matchSector && matchLocation;
    });
  }, [projects, search, sector, location]);

  return (
    <>
      <ProjectFilter
        search={search} onSearchChange={setSearch}
        sectorFilter={sector} onSectorChange={setSector} uniqueSectors={uniqueSectors}
        locationFilter={location} onLocationChange={setLocation} uniqueLocations={uniqueLocations}
      />
      
      {filtered.length === 0 ? (
        <p className="text-center text-muted-foreground py-10">No projects match your filters.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </>
  );
}