import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import AuthorityLinks from "@/components/dholera/AuthorityLinks";
import InfrastructureMatrix from "@/components/dholera/InfrastructureMatrix";
import { buildPageMetadata } from "@/lib/db/repositories";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("dholera-progress", {
    title: "Dholera Progress Room | Government-Backed Infrastructure Tracker",
    description:
      "Track India's first Greenfield smart megacity with verified links to the RERA Gujarat Portal, DICDL and Gujarat Government SIR updates, plus a live matrix on the Dholera Airport, Cargo Hub and Expressway.",
  });
}

export default function DholeraProgressPage() {
  return (
    <>
      <PageHero
        eyebrow="Government-Backed Tracker"
        title="The Official Blueprint: Tracking India's First Smart Megacity."
        image="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1600&auto=format&fit=crop"
        breadcrumb="Dholera Progress Room"
      />

      {/* Intro */}
      <section className="py-24 md:py-32 bg-black">
        <div className="container-luxury">
          <SectionHeading
            eyebrow="Dholera Special Investment Region"
            title="One Room. Every Verified Milestone."
            description="Dholera SIR is India's first Greenfield smart city under the Delhi-Mumbai Industrial Corridor. Rather than relying on secondhand claims, this room routes you straight to the government bodies and live infrastructure data that define its progress — so every investment decision starts from primary sources."
          />
        </div>
      </section>

      {/* Official Authority Links */}
      <section className="py-24 md:py-32 bg-luxury-charcoal border-t border-white/5">
        <div className="container-luxury">
          <SectionHeading
            eyebrow="🔗 Official Authority Links"
            title="High-Authority Tracking Nodes"
            description="Direct routing to the regulatory and implementing bodies governing Dholera SIR — no intermediaries, no reseller portals."
          />
          <div className="mt-16">
            <AuthorityLinks />
          </div>
        </div>
      </section>

      {/* Live Infrastructure Matrix */}
      <section className="py-24 md:py-32 bg-black border-t border-white/5">
        <div className="container-luxury">
          <SectionHeading
            eyebrow="📈 Live Infrastructure Matrix"
            title="Airport, Cargo & Expressway Progress"
            description="A running log of the three infrastructure pillars unlocking Dholera SIR — updated as official bodies release new milestones."
          />
          <div className="mt-16">
            <InfrastructureMatrix />
          </div>
          <p className="text-white/30 text-xs text-center mt-10 max-w-2xl mx-auto leading-relaxed">
            Figures are drawn from public government and ministry updates and are indicative.
            Always cross-check current status via the official portals linked above before making
            a purchase decision.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-luxury-charcoal border-t border-white/5">
        <div className="container-luxury text-center">
          <SectionHeading
            eyebrow="Invest With Confidence"
            title="Explore Unicon Infra's Dholera Opportunities"
            description="See how our RERA-registered developments align with Dholera SIR's activation roadmap."
          />
          <div className="flex justify-center gap-4 mt-10 flex-wrap">
            <Button href="/projects">View Projects</Button>
            <Button href="/contact" variant="outline">
              Talk to Our Team
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
