import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { getAllGalleryImages, buildPageMetadata } from "@/lib/db/repositories";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("gallery", {
    title: "Gallery",
    description: "Browse photographs of Unicon Infra's residences, villas, commercial towers and townships.",
  });
}

export default async function GalleryPage() {
  const images = await getAllGalleryImages();

  return (
    <>
      <PageHero
        eyebrow="Visual Journey"
        title="A Glimpse Into Our World"
        image="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1600&auto=format&fit=crop"
      />
      <section className="py-24 md:py-32 bg-black">
        <div className="container-luxury">
          <GalleryGrid images={images} />
        </div>
      </section>
    </>
  );
}
