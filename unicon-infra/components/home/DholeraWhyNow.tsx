"use client";

import { motion } from "framer-motion";
import { IconType } from "react-icons";
import {
  HiOutlineShieldCheck,
  HiOutlinePaperAirplane,
  HiOutlineChip,
  HiOutlineTrendingUp,
} from "react-icons/hi";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";

interface Reason {
  icon: IconType;
  title: string;
  description: string;
}

const REASONS: Reason[] = [
  {
    icon: HiOutlineShieldCheck,
    title: "Government-Backed",
    description:
      "Planned and governed by DSIRDA under a dedicated state Act, with DICDL executing on the ground.",
  },
  {
    icon: HiOutlinePaperAirplane,
    title: "Infrastructure Live",
    description:
      "The Ahmedabad-Dholera Expressway is operational and the international airport is nearing completion.",
  },
  {
    icon: HiOutlineChip,
    title: "Industrial Anchors",
    description:
      "Major semiconductor and manufacturing investments are already choosing Dholera as their base.",
  },
  {
    icon: HiOutlineTrendingUp,
    title: "Early-Stage Entry",
    description:
      "A rare window to enter a planned megacity before its infrastructure story fully matures.",
  },
];

export default function DholeraWhyNow() {
  return (
    <section className="py-24 md:py-32 bg-luxury-charcoal border-t border-white/5">
      <div className="container-luxury">
        <SectionHeading
          eyebrow="Why Dholera, Why Now"
          title="India's Next Growth Corridor Is Already Under Construction"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {REASONS.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <GlassCard className="h-full text-center">
                <div className="w-14 h-14 mx-auto rounded-full gold-border flex items-center justify-center mb-5">
                  <reason.icon className="text-luxury-gold" size={26} />
                </div>
                <h3 className="font-display text-lg mb-2">{reason.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{reason.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
