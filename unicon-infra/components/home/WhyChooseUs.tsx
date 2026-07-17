"use client";

import { motion } from "framer-motion";
import {
  HiOutlineBadgeCheck,
  HiOutlineSparkles,
  HiOutlineShieldCheck,
  HiOutlineClock,
} from "react-icons/hi";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";

const FEATURES = [
  {
    icon: HiOutlineBadgeCheck,
    title: "Proven Track Record",
    description: "42+ landmark projects delivered across residential, commercial and township categories.",
  },
  {
    icon: HiOutlineSparkles,
    title: "Bespoke Design Studio",
    description: "In-house architects and interior designers crafting every detail from facade to fixtures.",
  },
  {
    icon: HiOutlineShieldCheck,
    title: "100% RERA Compliant",
    description: "Complete legal transparency and regulatory compliance across every development.",
  },
  {
    icon: HiOutlineClock,
    title: "On-Time Possession",
    description: "96% on-time delivery rate — because your timelines matter as much as ours.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-28 md:py-36 bg-black relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-luxury-gold/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container-luxury relative">
        <SectionHeading
          eyebrow="Why Unicon Infra"
          title="Excellence Built Into Every Foundation"
          description="From the first blueprint to the final handover, our commitment to quality never wavers."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <GlassCard className="h-full text-center">
                <div className="w-14 h-14 mx-auto rounded-full gold-border flex items-center justify-center mb-5">
                  <feature.icon className="text-luxury-gold" size={26} />
                </div>
                <h3 className="font-display text-xl mb-3">{feature.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{feature.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
