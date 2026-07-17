"use client";

import { motion } from "framer-motion";
import { IconType } from "react-icons";
import {
  HiOutlineChip,
  HiOutlineSun,
  HiOutlineCog,
  HiOutlineTruck,
  HiOutlineLightningBolt,
  HiOutlineBeaker,
} from "react-icons/hi";
import GlassCard from "@/components/ui/GlassCard";

interface Industry {
  icon: IconType;
  title: string;
  description: string;
}

const INDUSTRIES: Industry[] = [
  {
    icon: HiOutlineChip,
    title: "Semiconductors & Electronics",
    description:
      "Anchor investments, including a major Tata semiconductor fabrication project, are positioning Dholera as one of India's emerging chip-manufacturing hubs.",
  },
  {
    icon: HiOutlineSun,
    title: "Renewable Energy",
    description:
      "A large-scale solar park within the region supplies subsidised, round-the-clock green power to industries operating inside the SIR.",
  },
  {
    icon: HiOutlineCog,
    title: "Heavy Engineering & Auto",
    description:
      "Dedicated industrial zones are earmarked for auto & auto-ancillary, heavy engineering, and general manufacturing units.",
  },
  {
    icon: HiOutlineTruck,
    title: "Logistics & Freight",
    description:
      "Proximity to the Dedicated Freight Corridor and DMIC positions Dholera as a natural logistics and export gateway.",
  },
  {
    icon: HiOutlineLightningBolt,
    title: "Defence & Aviation",
    description:
      "Planned zones support defence manufacturing and aviation-linked industries, complementing the upcoming international airport.",
  },
  {
    icon: HiOutlineBeaker,
    title: "Pharma & Biotech",
    description:
      "Pharmaceutical and biotechnology manufacturing form part of Dholera's diversified, self-sustaining industrial ecosystem.",
  },
];

export default function IndustryGrid() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {INDUSTRIES.map((industry, i) => (
        <motion.div
          key={industry.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.08 }}
        >
          <GlassCard className="h-full text-center">
            <div className="w-14 h-14 mx-auto rounded-full gold-border flex items-center justify-center mb-5">
              <industry.icon className="text-luxury-gold" size={26} />
            </div>
            <h3 className="font-display text-lg mb-3">{industry.title}</h3>
            <p className="text-white/55 text-sm leading-relaxed">{industry.description}</p>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
}
