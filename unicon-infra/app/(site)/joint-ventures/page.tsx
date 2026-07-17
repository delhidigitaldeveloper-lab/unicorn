import type { Metadata } from "next";
import Image from "next/image";
import { HiOutlineExternalLink, HiOutlineBadgeCheck } from "react-icons/hi";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { getAllJointVentures, buildPageMetadata } from "@/lib/db/repositories";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("joint-ventures", {
    title: "Joint Ventures",
    description:
      "Meet the capital, construction and design partners Unicon Infra collaborates with to deliver landmark developments across India.",
  });
}

const PRINCIPLES = [
  {
    title: "Shared Vision",
    text: "We partner only with firms who share our uncompromising standard for design and quality.",
  },
  {
    title: "Aligned Capital",
    text: "Institutional-grade financial structuring that protects every stakeholder in the development.",
  },
  {
    title: "Proven Execution",
    text: "Decades of combined delivery experience across residential, commercial and township-scale projects.",
  },
];

export default async function JointVenturesPage() {
  const ventures = await getAllJointVentures();

  return (
    <>
      <PageHero
        eyebrow="Our Partners"
        title="Built On Trusted Partnerships"
        image="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1600&auto=format&fit=crop"
        breadcrumb="Joint Ventures"
      />

      <section className="py-24 md:py-32 bg-black">
        <div className="container-luxury">
          <SectionHeading
            eyebrow="Collaborative Excellence"
            title="The Partners Behind Every Landmark"
            description="Every Unicon Infra development is the product of carefully chosen alliances — capital partners, construction leaders and design studios who share our commitment to enduring quality."
          />

          {ventures.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
              {ventures.map((jv) => (
                <div
                  key={jv.id}
                  className="glass group relative rounded-2xl p-8 text-center transition-all duration-500 hover:border-luxury-gold/60 hover:shadow-gold-lg hover:-translate-y-1.5"
                >
                  <div className="mx-auto mb-6 relative w-24 h-24 rounded-full overflow-hidden gold-border bg-luxury-charcoal">
                    {jv.logo ? (
                      <Image
                        src={jv.logo}
                        alt={jv.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <HiOutlineBadgeCheck className="text-luxury-gold/50" size={32} />
                      </div>
                    )}
                  </div>

                  <h3 className="font-display text-xl mb-3">{jv.name}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{jv.description}</p>

                  {jv.website && (
                    <a
                      href={jv.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor-hover
                      className="inline-flex items-center gap-1.5 mt-5 text-xs uppercase tracking-wider text-luxury-gold hover:text-white transition-colors"
                    >
                      Visit Website <HiOutlineExternalLink size={14} />
                    </a>
                  )}

                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gold-gradient opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500" />
                </div>
              ))}
            </div>
          ) : (
            <div className="glass rounded-2xl p-16 text-center text-white/40 mt-16">
              Partner profiles coming soon.
            </div>
          )}
        </div>
      </section>

      <section className="py-24 md:py-28 bg-luxury-charcoal border-y border-luxury-gold/15">
        <div className="container-luxury">
          <SectionHeading eyebrow="Why We Partner" title="What We Look For in an Alliance" />
          <div className="grid md:grid-cols-3 gap-10 mt-16">
            {PRINCIPLES.map((p, i) => (
              <div key={p.title} className="relative">
                <p className="font-display text-5xl text-luxury-gold/20 mb-3">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="font-display text-lg mb-2">{p.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-black text-center">
        <div className="container-luxury">
          <SectionHeading
            eyebrow="Partner With Us"
            title="Explore a Joint Venture With Unicon Infra"
            description="We're always open to conversations with capital partners, landowners and construction leaders who share our vision for exceptional real estate."
          />
          <div className="mt-10">
            <Button href="/contact">Start a Conversation</Button>
          </div>
        </div>
      </section>
    </>
  );
}
