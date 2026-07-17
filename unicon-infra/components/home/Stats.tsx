import Counter from "@/components/ui/Counter";
import { STATS } from "@/lib/data";

export default function Stats() {
  return (
    <section className="py-20 bg-black border-y border-luxury-gold/15 relative">
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
  );
}
