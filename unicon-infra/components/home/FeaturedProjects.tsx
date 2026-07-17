import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/projects/ProjectCard";
import Button from "@/components/ui/Button";
import { Project } from "@/lib/types";

export default function FeaturedProjects({ projects }: { projects: Project[] }) {
  return (
    <section className="py-28 md:py-36 bg-luxury-charcoal relative">
      <div className="container-luxury">
        <SectionHeading
          eyebrow="Featured Developments"
          title="Landmark Addresses, Curated for You"
          description="A selection of our most celebrated residences, villas, and commercial spaces — each an architectural statement in its own right."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>

        <div className="flex justify-center mt-14">
          <Button href="/projects">View All Projects</Button>
        </div>
      </div>
    </section>
  );
}
