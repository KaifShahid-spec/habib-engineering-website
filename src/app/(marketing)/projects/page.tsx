import { getProjects } from "@/lib/queries/projects";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { generateMetadata } from "@/lib/seo/metadata";
import { CTA } from "@/components/sections/home/CTA";
import { ProjectsGrid } from "./projects-grid";

export const metadata = generateMetadata({
  title: "Projects",
  description: "Explore our portfolio of completed projects across Pakistan.",
  path: "/projects",
});

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <Section>
        <SectionHeader
          title="Our Projects"
          description="A track record of delivering reliable power infrastructure across Pakistan's toughest sectors."
        />
        <ProjectsGrid projects={projects} />
      </Section>
      <CTA />
    </>
  );
}