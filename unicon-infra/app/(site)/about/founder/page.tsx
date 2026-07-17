import type { Metadata } from "next";
import Image from "next/image";
import { FaQuoteLeft } from "react-icons/fa";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { getFounder, buildPageMetadata } from "@/lib/db/repositories";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("founder", {
    title: "Our Founder",
    description:
      "Meet Mr. Dinesh Baral, Founder of Unicon Infra Group and a leading real estate investment strategist in the Dholera SIR corridor.",
  });
}

export default async function FounderPage() {
  const founder = await getFounder();
  const bioParagraphs = founder.bio.split("\n").filter(Boolean);

  return (
    <>
      <PageHero
        eyebrow="About Unicon Infra"
        title="Meet Our Founder"
        breadcrumb="Founder"
        image="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1600&auto=format&fit=crop"
      />

      <section className="py-28 md:py-32 bg-black">
        <div className="container-luxury grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative h-[460px] md:h-[600px] rounded-2xl overflow-hidden gold-border max-w-md mx-auto lg:mx-0 w-full">
            {founder.photo ? (
              <Image
                src={founder.photo}
                alt={founder.name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-white/20 text-sm">
                Photograph coming soon
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          </div>

          <div>
            <SectionHeading eyebrow="Leadership" title="The Vision Behind Unicon Infra" align="left" />
            <h3 className="font-display text-2xl md:text-3xl mt-8 text-gold-gradient">
              {founder.name}
            </h3>
            <p className="text-luxury-gold text-xs uppercase tracking-[0.25em] mt-2">
              {founder.title}
            </p>

            <div className="mt-6 space-y-4">
              {bioParagraphs.map((para, i) => (
                <p key={i} className="text-white/60 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>

            <div className="mt-10">
              <Button href="/contact" variant="outline">
                Connect With Our Team
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-28 md:py-36 bg-luxury-charcoal border-y border-luxury-gold/15 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-luxury-gold/5 blur-[140px] rounded-full pointer-events-none" />

        <div className="container-luxury relative">
          <SectionHeading eyebrow="In His Words" title="Founder's Message" />

          <div className="mt-14 max-w-3xl mx-auto glass rounded-2xl md:rounded-3xl p-10 md:p-14 text-center gold-border">
            <FaQuoteLeft className="text-luxury-gold/50 text-3xl mx-auto mb-6" />
            <p className="font-display text-xl md:text-3xl leading-relaxed text-white/90 italic">
              &ldquo;{founder.message}&rdquo;
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <span className="w-8 h-[1px] bg-luxury-gold/50" />
              <p className="text-luxury-gold text-xs uppercase tracking-[0.25em]">
                {founder.name}
              </p>
              <span className="w-8 h-[1px] bg-luxury-gold/50" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
