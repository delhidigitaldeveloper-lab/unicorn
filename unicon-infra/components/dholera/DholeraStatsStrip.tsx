"use client";

import Counter from "@/components/ui/Counter";

const DHOLERA_STATS = [
  { value: 920, suffix: " sq.km", label: "Total SIR Area" },
  { value: 22, suffix: "", label: "Villages Encompassed" },
  { value: 100, suffix: " km", label: "SW of Ahmedabad" },
  { value: 8, suffix: " Lakh+", label: "Projected Jobs" },
];

export default function DholeraStatsStrip() {
  return (
    <section className="py-20 bg-black border-y border-luxury-gold/15 relative">
      <div className="container-luxury grid grid-cols-2 lg:grid-cols-4 gap-10">
        {DHOLERA_STATS.map((stat) => (
          <div key={stat.label} className="text-center">
            <Counter value={stat.value} suffix={stat.suffix} />
            <p className="text-white/50 text-xs md:text-sm mt-2 uppercase tracking-wider">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
