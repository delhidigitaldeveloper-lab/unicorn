import SectionHeading from "@/components/ui/SectionHeading";

const AWARDS = [
  "Real Estate Excellence Award 2025",
  "Best Luxury Residential Project — NCR",
  "Green Building Certification — LEED Gold",
  "Developer of the Year 2024",
  "Iconic Township Award 2023",
  "Best Commercial Development — Cyber City",
  "Architectural Digest Recognition",
  "Times Realty Icons 2022",
];

export default function AwardsMarquee() {
  const track = [...AWARDS, ...AWARDS];

  return (
    <section className="py-20 md:py-24 bg-black border-y border-luxury-gold/15 overflow-hidden">
      <div className="container-luxury mb-10">
        <SectionHeading eyebrow="Recognition" title="Awards & Accolades" />
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10" />

        <div className="marquee-track">
          {track.map((award, i) => (
            <div
              key={award + i}
              className="flex items-center gap-3 px-8 md:px-12 shrink-0"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold" />
              <span className="text-white/50 whitespace-nowrap text-sm md:text-base uppercase tracking-wide">
                {award}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
