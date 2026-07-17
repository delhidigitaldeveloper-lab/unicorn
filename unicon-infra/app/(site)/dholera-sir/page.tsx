import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import DholeraStatsStrip from "@/components/dholera/DholeraStatsStrip";
import PillarGrid from "@/components/dholera/PillarGrid";
import IndustryGrid from "@/components/dholera/IndustryGrid";
import WhyInvestDholera from "@/components/dholera/WhyInvestDholera";
import { buildPageMetadata } from "@/lib/db/repositories";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("dholera-sir", {
    title: "Dholera SIR | India's First Greenfield Smart City",
    description:
      "Explore Dholera Special Investment Region — India's first Greenfield smart city on the Delhi-Mumbai Industrial Corridor. Master plan, infrastructure, industries and why Unicon Infra is focused here.",
  });
}

export default function DholeraSirPage() {
  return (
    <>
      <PageHero
        eyebrow="India's First Greenfield Smart City"
        title="Dholera SIR: Gujarat's Global Manufacturing & Innovation Hub"
        image="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1600&auto=format&fit=crop"
        breadcrumb="Dholera SIR"
      />

      {/* Overview */}
      <section className="py-28 md:py-32 bg-black">
        <div className="container-luxury grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeading eyebrow="Overview" title="About Dholera SIR" align="left" />
            <p className="text-white/60 mt-6 leading-relaxed">
              Dholera Special Investment Region is a Greenfield industrial smart
              city planned approximately 100 km southwest of Ahmedabad —
              envisioned as India&apos;s most attractive destination for
              manufacturing and industrial development. Under the Special
              Investment Region Act, 2009, the Gujarat Government established a
              dedicated regional development authority, the Dholera Special
              Investment Region Development Authority (DSIRDA), to plan and
              govern the region.
            </p>
            <p className="text-white/60 mt-4 leading-relaxed">
              Spanning roughly 920 sq. km across 22 villages of Dholera taluka,
              the city sits strategically between Ahmedabad, Vadodara, Rajkot
              and Bhavnagar — positioning it for ease of doing business and
              seamless industrial logistics. It is India&apos;s first
              Platinum-rated Greenfield industrial city, built around
              sustainability, digitisation and innovation as its guiding
              pillars.
            </p>
            <div className="mt-8">
              <Button href="/dholera-progress" variant="outline">
                Track Live Infrastructure Progress
              </Button>
            </div>
          </div>
          <div className="relative h-[420px] md:h-[520px] rounded-2xl overflow-hidden gold-border">
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
              alt="Dholera Special Investment Region masterplan city"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <DholeraStatsStrip />

      {/* Governance & implementation */}
      <section className="py-28 md:py-32 bg-luxury-charcoal">
        <div className="container-luxury">
          <SectionHeading
            eyebrow="Governance"
            title="A Sovereign Framework, Not a Private Bet"
            description="Two dedicated government bodies plan, fund and deliver Dholera SIR — a level of institutional backing rare in Indian real estate."
          />
          <div className="grid md:grid-cols-2 gap-8 mt-16 max-w-4xl mx-auto">
            <div className="glass rounded-2xl p-8">
              <h3 className="font-display text-xl mb-3 text-gold-gradient">DSIRDA</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                The Dholera Special Investment Region Development Authority
                plans and develops DSIR, and administers all government land
                within the region under the SIR Act, 2009.
              </p>
            </div>
            <div className="glass rounded-2xl p-8">
              <h3 className="font-display text-xl mb-3 text-gold-gradient">DICDL</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Dholera Industrial City Development Ltd. is the Special Purpose
                Vehicle jointly formed by the Central Government (NICDC Trust)
                and the Gujarat Government (DSIRDA) to implement the project on
                the ground.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Infrastructure pillars */}
      <section className="py-28 md:py-32 bg-black">
        <div className="container-luxury">
          <SectionHeading
            eyebrow="Infrastructure Pillars"
            title="The Backbone Being Built Today"
            description="Four connected infrastructure pillars are transforming Dholera from a master plan into a living, working city."
          />
          <div className="mt-16">
            <PillarGrid />
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-28 md:py-32 bg-luxury-charcoal">
        <div className="container-luxury">
          <SectionHeading
            eyebrow="Industrial Ecosystem"
            title="A Self-Sustaining Economic Engine"
            description="Dholera is designed as a complete ecosystem — economic drivers, utility & logistics infrastructure, and social infrastructure including education and healthcare, all in one plan."
          />
          <div className="mt-16">
            <IndustryGrid />
          </div>
        </div>
      </section>

      <WhyInvestDholera />

      {/* CTA */}
      <section className="py-24 md:py-32 bg-black border-t border-white/5">
        <div className="container-luxury text-center">
          <SectionHeading
            eyebrow="Unicon Infra in Dholera"
            title="Think Dholera. Think Unicon."
            description="We're shaping tomorrow's landmark today — bringing Unicon Infra's design and delivery standards to India's most ambitious smart city."
          />
          <div className="flex justify-center gap-4 mt-10 flex-wrap">
            <Button href="/contact">Enquire About Dholera Opportunities</Button>
            <Button href="/dholera-progress" variant="outline">
              View the Progress Room
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
