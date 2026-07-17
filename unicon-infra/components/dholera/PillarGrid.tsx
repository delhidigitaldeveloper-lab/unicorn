"use client";

import { motion } from "framer-motion";
import { IconType } from "react-icons";
import {
  HiOutlinePaperAirplane,
  HiOutlineTruck,
  HiOutlineViewGrid,
  HiOutlineOfficeBuilding,
} from "react-icons/hi";
import GlassCard from "@/components/ui/GlassCard";

interface Pillar {
  icon: IconType;
  title: string;
  description: string;
}

const PILLARS: Pillar[] = [
  {
    icon: HiOutlinePaperAirplane,
    title: "Dholera International Airport",
    description:
      "A greenfield international airport being developed northeast of the SIR, with environmental and site clearances already secured and on-ground construction well underway.",
  },
  {
    icon: HiOutlineTruck,
    title: "Ahmedabad–Dholera Expressway",
    description:
      "A 109 km, access-controlled expressway (4 lanes, expandable to 8) linking Ahmedabad directly to Dholera SIR, cutting commute times to under an hour.",
  },
  {
    icon: HiOutlineViewGrid,
    title: "MRTS & Rail Corridor",
    description:
      "A planned metro/rail transit corridor sharing the expressway's right-of-way, designed for seamless rail-road transition between Ahmedabad and Dholera.",
  },
  {
    icon: HiOutlineOfficeBuilding,
    title: "Activation Area (TP2)",
    description:
      "A 22.5 sq. km zone with smart roads, underground utilities and 24x7 power & water already in place — the operational core where industries are live today.",
  },
];

export default function PillarGrid() {
  return (
    <div className="grid sm:grid-cols-2 gap-6">
      {PILLARS.map((pillar, i) => (
        <motion.div
          key={pillar.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
        >
          <GlassCard className="h-full">
            <div className="w-14 h-14 rounded-full gold-border flex items-center justify-center mb-5">
              <pillar.icon className="text-luxury-gold" size={26} />
            </div>
            <h3 className="font-display text-xl mb-3">{pillar.title}</h3>
            <p className="text-white/55 text-sm leading-relaxed">{pillar.description}</p>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
}
