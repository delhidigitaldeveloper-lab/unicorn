import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ProjectsGrid from "@/components/projects/ProjectsGrid";
import { getAllProjects, buildPageMetadata } from "@/lib/db/repositories";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("projects", {
    title: "Our Projects",
    description:
      "Explore Unicon Infra's portfolio of luxury residences, villas, commercial towers and townships across India.",
  });
}

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <>
      <PageHero
        eyebrow="Our Portfolio"
        title="Projects That Define Skylines"
        image="https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1600&auto=format&fit=crop"
      />
      <section className="py-24 md:py-32 bg-black">
        <div className="container-luxury">
          <ProjectsGrid projects={projects} />
        </div>
      </section>
    </>
  );
}
