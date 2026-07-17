import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import FAQAccordion from "@/components/ui/FAQAccordion";
import Button from "@/components/ui/Button";
import { FAQS } from "@/lib/data";
import { buildPageMetadata } from "@/lib/db/repositories";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("faqs", {
    title: "Frequently Asked Questions",
    description: "Find answers to common questions about buying, financing, and investing in Unicon Infra properties.",
  });
}

export default function FAQsPage() {
  return (
    <>
      <PageHero
        eyebrow="Support"
        title="Frequently Asked Questions"
        image="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop"
        breadcrumb="FAQs"
      />
      <section className="py-24 md:py-32 bg-black">
        <div className="container-luxury">
          <SectionHeading
            eyebrow="Got Questions?"
            title="Everything You Need to Know"
            description="Can't find what you're looking for? Reach out to our team directly."
          />
          <div className="mt-16">
            <FAQAccordion items={FAQS} />
          </div>
          <div className="flex justify-center mt-16">
            <Button href="/contact">Ask Our Team</Button>
          </div>
        </div>
      </section>
    </>
  );
}
