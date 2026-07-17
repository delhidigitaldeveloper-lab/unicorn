"use client";

import { motion } from "framer-motion";
import { IconType } from "react-icons";
import {
  HiOutlinePaperAirplane,
  HiOutlineCube,
  HiOutlineTruck,
} from "react-icons/hi";
import GlassCard from "@/components/ui/GlassCard";

interface InfraNode {
  icon: IconType;
  title: string;
  status: string;
  percent: number;
  updated: string;
  points: string[];
}

const NODES: InfraNode[] = [
  {
    icon: HiOutlinePaperAirplane,
    title: "Dholera International Airport",
    status: "~80% construction complete",
    percent: 80,
    updated: "Ministry of Civil Aviation review, Jul 2026",
    points: [
      "Runway, taxiway & ATC tower: fully complete",
      "Passenger terminal building: ~75% complete",
      "Operations targeted for Sep–Oct 2026",
    ],
  },
  {
    icon: HiOutlineCube,
    title: "Dedicated Cargo Hub",
    status: "Integrated into Phase 1 masterplan",
    percent: 70,
    updated: "AAI / DIACL project scope, 2026",
    points: [
      "2,500 sq. m dedicated cargo terminal",
      "Built to serve DSIR's electronics & semiconductor exports",
      "Direct apron access alongside passenger terminal",
    ],
  },
  {
    icon: HiOutlineTruck,
    title: "Multi-Lane Industrial Expressway",
    status: "Inaugurated 31 March 2026",
    percent: 100,
    updated: "NHAI / Bharatmala Pariyojana",
    points: [
      "109 km Ahmedabad–Dholera Expressway, 4 lanes (expandable to 8)",
      "Cuts Ahmedabad–Dholera travel time to under an hour",
      "Direct interchange link to Dholera International Airport",
    ],
  },
];

export default function InfrastructureMatrix() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {NODES.map((node, i) => (
        <motion.div
          key={node.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
        >
          <GlassCard className="h-full flex flex-col">
            <div className="w-14 h-14 rounded-full gold-border flex items-center justify-center mb-5">
              <node.icon className="text-luxury-gold" size={26} />
            </div>
            <h3 className="font-display text-xl mb-1">{node.title}</h3>
            <p className="text-luxury-gold text-xs uppercase tracking-wider mb-4">
              {node.status}
            </p>

            <div className="mb-5">
              <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${node.percent}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.2 }}
                  className="h-full bg-gold-gradient rounded-full"
                />
              </div>
            </div>

            <ul className="space-y-2 text-sm text-white/60 leading-relaxed flex-1">
              {node.points.map((point) => (
                <li key={point} className="flex gap-2">
                  <span className="text-luxury-gold mt-1.5 h-1 w-1 rounded-full bg-luxury-gold shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <p className="text-white/30 text-[11px] uppercase tracking-wider mt-5 pt-4 border-t border-white/10">
              Source: {node.updated}
            </p>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
}
