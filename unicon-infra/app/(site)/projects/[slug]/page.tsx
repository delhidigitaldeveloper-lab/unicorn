import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HiOutlineLocationMarker, HiCheckCircle } from "react-icons/hi";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import ProjectGallery from "@/components/projects/ProjectGallery";
import ProjectCard from "@/components/projects/ProjectCard";
import MapEmbed from "@/components/contact/MapEmbed";
import SiteVisitForm from "@/components/contact/SiteVisitForm";
import { getAllProjects, getProjectBySlug } from "@/lib/db/repositories";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.shortDescription,
  };
}

export default async function ProjectDetailsPage({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);
  if (!project) return notFound();

  const allProjects = await getAllProjects();
  const related = allProjects.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={project.category}
        title={project.name}
        image={project.coverImage}
        breadcrumb={project.name}
      />

      <section className="py-20 bg-black border-b border-white/10">
        <div className="container-luxury flex flex-wrap gap-8 justify-between items-center">
          <div className="flex items-center gap-2 text-white/60">
            <HiOutlineLocationMarker className="text-luxury-gold" />
            {project.location}
          </div>
          {[
            { label: "Price", value: project.priceRange },
            { label: "Area", value: project.area },
            { label: "Units", value: project.units },
            { label: "Possession", value: project.possession },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-white/40 text-xs uppercase tracking-wide">{item.label}</p>
              <p className="text-luxury-gold font-display text-lg mt-1">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 md:py-28 bg-black">
        <div className="container-luxury grid lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <SectionHeading eyebrow="Overview" title="About This Development" align="left" />
            <p className="text-white/60 leading-relaxed mt-6">{project.description}</p>

            <h3 className="font-display text-2xl mt-14 mb-6">Amenities</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {project.amenities.map((amenity) => (
                <div
                  key={amenity}
                  className="flex items-center gap-3 glass rounded-xl px-4 py-3 text-sm text-white/70"
                >
                  <HiCheckCircle className="text-luxury-gold shrink-0" />
                  {amenity}
                </div>
              ))}
            </div>

            <h3 className="font-display text-2xl mt-14 mb-6">Specifications</h3>
            <div className="divide-y divide-white/10 gold-border rounded-xl overflow-hidden">
              {project.specifications.map((spec) => (
                <div key={spec.label} className="flex justify-between px-6 py-4 text-sm">
                  <span className="text-white/50">{spec.label}</span>
                  <span className="text-white">{spec.value}</span>
                </div>
              ))}
            </div>

            <h3 className="font-display text-2xl mt-14 mb-6">Gallery</h3>
            <ProjectGallery images={[project.coverImage, ...project.gallery]} />

            <h3 className="font-display text-2xl mt-14 mb-6">Location</h3>
            <MapEmbed lat={project.lat} lng={project.lng} label={project.name} />
          </div>

          <div>
            <GlassCard className="sticky top-28">
              <h3 className="font-display text-xl mb-2">Enquire About This Project</h3>
              <p className="text-white/50 text-sm mb-6">
                Schedule a private site visit or request a callback from our
                advisory team.
              </p>
              <SiteVisitForm projectName={project.name} />
            </GlassCard>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-luxury-charcoal">
        <div className="container-luxury">
          <SectionHeading eyebrow="Explore More" title="Other Developments You May Like" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {related.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </div>
          <div className="flex justify-center mt-14">
            <Button href="/projects" variant="outline">
              View All Projects
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
