"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Counter from "@/components/ui/Counter";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

const HIGHLIGHTS = [
  { value: 920, suffix: " sq.km", label: "Greenfield SIR Area" },
  { value: 109, suffix: " km", label: "Ahmedabad Expressway" },
  { value: 100, suffix: "%", label: "Activation Area Ready" },
  { value: 8, suffix: " Lakh+", label: "Projected Jobs" },
];

export default function DholeraSpotlight() {
  return (
    <section className="py-28 md:py-36 bg-black relative overflow-hidden">
      <div className="container-luxury grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <SectionHeading
            eyebrow="Our Focus Right Now"
            title="Building Our Future in Dholera SIR"
            align="left"
          />
          <p className="text-white/60 mt-6 leading-relaxed max-w-lg">
            Unicon Infra&apos;s current focus is India&apos;s first Greenfield
            smart city — Dholera Special Investment Region. Government-backed,
            infrastructure-led and already coming to life, Dholera is where we
            believe the next two decades of Indian real estate growth will be
            written.
          </p>

          <div className="grid grid-cols-2 gap-x-10 gap-y-9 mt-10 max-w-lg">
            {HIGHLIGHTS.map((h) => (
              <div key={h.label} className="flex flex-col">
                <Counter value={h.value} suffix={h.suffix} />
                <p className="text-white/50 text-xs md:text-sm mt-2 uppercase tracking-wider">
                  {h.label}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 mt-10">
            <Button href="/dholera-sir">Explore Dholera SIR</Button>
            <Button href="/dholera-progress" variant="outline">
              Live Progress Room
            </Button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative h-[420px] md:h-[520px] rounded-2xl overflow-hidden gold-border"
        >
          <Image
            src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1200&auto=format&fit=crop"
            alt="Dholera SIR smart city development"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 glass rounded-xl px-5 py-4">
            <p className="text-luxury-gold text-xs uppercase tracking-wider mb-1">
              Delhi-Mumbai Industrial Corridor
            </p>
            <p className="text-white/80 text-sm">
              Think Dholera. Think Unicon — shaping tomorrow&apos;s landmark today.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
