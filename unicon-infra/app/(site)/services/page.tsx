import type { Metadata } from "next";
import {
  HiOutlineHome,
  HiOutlineOfficeBuilding,
  HiOutlineViewGridAdd,
  HiOutlinePencilAlt,
  HiOutlineShieldCheck,
  HiOutlineChartBar,
} from "react-icons/hi";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import { SERVICES } from "@/lib/data";
import { buildPageMetadata } from "@/lib/db/repositories";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("services", {
    title: "Our Services",
    description:
      "From luxury residential development to investment advisory — explore the full range of services offered by Unicon Infra.",
  });
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  home: HiOutlineHome,
  building: HiOutlineOfficeBuilding,
  layout: HiOutlineViewGridAdd,
  brush: HiOutlinePencilAlt,
  shield: HiOutlineShieldCheck,
  chart: HiOutlineChartBar,
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What We Do"
        title="Comprehensive Real Estate Excellence"
        image="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop"
      />

      <section className="py-24 md:py-32 bg-black">
        <div className="container-luxury">
          <SectionHeading
            eyebrow="Our Services"
            title="End-to-End Expertise, Under One Roof"
            description="From the first concept sketch to long-term facility management, our teams collaborate to deliver a seamless experience."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {SERVICES.map((service) => {
              const Icon = ICON_MAP[service.icon] ?? HiOutlineHome;
              return (
                <GlassCard key={service.title} className="h-full">
                  <div className="w-14 h-14 rounded-full gold-border flex items-center justify-center mb-6">
                    <Icon className="text-luxury-gold" size={26} />
                  </div>
                  <h3 className="font-display text-xl mb-3">{service.title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{service.description}</p>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-28 bg-luxury-charcoal">
        <div className="container-luxury">
          <SectionHeading eyebrow="Our Process" title="How We Bring Your Vision to Life" />
          <div className="grid md:grid-cols-4 gap-8 mt-16">
            {[
              { step: "01", title: "Consultation", text: "Understanding your goals, budget and lifestyle requirements." },
              { step: "02", title: "Design & Planning", text: "Our studio crafts bespoke architectural and interior concepts." },
              { step: "03", title: "Construction", text: "Rigorous quality control across every stage of development." },
              { step: "04", title: "Handover & Beyond", text: "Seamless possession and ongoing property management support." },
            ].map((item) => (
              <div key={item.step} className="relative">
                <p className="font-display text-5xl text-luxury-gold/20 mb-3">{item.step}</p>
                <h3 className="font-display text-lg mb-2">{item.title}</h3>
                <p className="text-white/55 text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-black text-center">
        <div className="container-luxury">
          <SectionHeading
            eyebrow="Get Started"
            title="Let's Discuss Your Next Address"
            description="Speak with our advisory team about any of our services, tailored to your goals."
          />
          <div className="mt-10">
            <Button href="/contact">Contact Our Team</Button>
          </div>
        </div>
      </section>
    </>
  );
}
