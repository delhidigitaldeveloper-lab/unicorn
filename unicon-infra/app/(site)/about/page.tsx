import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import Counter from "@/components/ui/Counter";
import { STATS } from "@/lib/data";
import { getAllTeamMembers, buildPageMetadata } from "@/lib/db/repositories";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("about", {
    title: "About Us",
    description:
      "Learn about Unicon Infra's journey since 2007 — building India's most iconic luxury residences, villas and commercial landmarks.",
  });
}

const MILESTONES = [
  { year: "2007", title: "Foundation", text: "Unicon Infra founded with a vision to redefine luxury living in North India." },
  { year: "2012", title: "First Landmark", text: "Delivered our first premium residential tower, setting new benchmarks in design." },
  { year: "2016", title: "Commercial Expansion", text: "Entered Grade-A commercial development with Unicon Business Bay." },
  { year: "2021", title: "Township Vision", text: "Launched our first integrated township spanning 45 acres." },
  { year: "2026", title: "18 Years Strong", text: "42+ projects delivered, 6,500+ families housed, and counting." },
];

export default async function AboutPage() {
  const team = await getAllTeamMembers();

  return (
    <>
      <PageHero
        eyebrow="About Unicon Infra"
        title="Building Legacies, One Landmark at a Time"
        image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop"
      />

      <section className="py-28 md:py-32 bg-black">
        <div className="container-luxury grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative h-[420px] md:h-[520px] rounded-2xl overflow-hidden gold-border">
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
              alt="Unicon Infra story"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <SectionHeading eyebrow="Our Story" title="Two Decades in the Making" align="left" />
            <p className="text-white/60 mt-6 leading-relaxed">
              Unicon Infra began in 2007 with a simple but ambitious idea:
              India deserved real estate that matched the world&apos;s finest
              addresses. What started as a single residential project has
              grown into a portfolio of 42+ landmark developments spanning
              residences, villas, commercial towers, and integrated townships.
            </p>
            <p className="text-white/60 mt-4 leading-relaxed">
              Today, our in-house design studio, engineering team, and
              investment advisory work in lockstep to deliver properties that
              are as sound an investment as they are a joy to live in.
            </p>
            <div className="grid grid-cols-2 gap-8 mt-10">
              <div>
                <p className="font-display text-3xl text-gold-gradient">Mission</p>
                <p className="text-white/50 text-sm mt-2">
                  To craft architecturally significant spaces that elevate
                  everyday living and long-term value.
                </p>
              </div>
              <div>
                <p className="font-display text-3xl text-gold-gradient">Vision</p>
                <p className="text-white/50 text-sm mt-2">
                  To be India&apos;s most trusted name in luxury real estate
                  by 2030.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-luxury-charcoal border-y border-luxury-gold/15">
        <div className="container-luxury grid grid-cols-2 lg:grid-cols-4 gap-10">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <Counter value={stat.value} suffix={stat.suffix} />
              <p className="text-white/50 text-xs md:text-sm mt-2 uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-28 md:py-36 bg-black">
        <div className="container-luxury">
          <SectionHeading eyebrow="Our Journey" title="Milestones That Shaped Us" />
          <div className="mt-16 relative max-w-3xl mx-auto">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-luxury-gold/25 md:-translate-x-1/2" />
            <div className="space-y-12">
              {MILESTONES.map((m, i) => (
                <div
                  key={m.year}
                  className={`relative flex md:justify-between items-start gap-6 pl-12 md:pl-0 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="absolute left-2.5 md:left-1/2 top-1 w-3 h-3 rounded-full bg-luxury-gold md:-translate-x-1/2" />
                  <div className="md:w-[45%]">
                    <GlassCard>
                      <p className="text-gold-gradient font-display text-2xl mb-2">{m.year}</p>
                      <h3 className="font-display text-xl mb-2">{m.title}</h3>
                      <p className="text-white/55 text-sm">{m.text}</p>
                    </GlassCard>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-28 md:py-36 bg-luxury-charcoal">
        <div className="container-luxury">
          <SectionHeading eyebrow="Leadership" title="The People Behind the Vision" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {team.map((member) => (
              <div key={member.id} className="text-center group">
                <div className="relative h-72 rounded-2xl overflow-hidden gold-border mb-5">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <h3 className="font-display text-lg">{member.name}</h3>
                <p className="text-luxury-gold text-xs uppercase tracking-wide mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
