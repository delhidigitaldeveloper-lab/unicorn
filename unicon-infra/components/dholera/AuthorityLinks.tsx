"use client";

import { motion } from "framer-motion";
import { IconType } from "react-icons";
import {
  HiOutlineScale,
  HiOutlineBuildingOffice,
  HiOutlineGlobeAlt,
  HiOutlineArrowUpRight,
} from "react-icons/hi2";
import GlassCard from "@/components/ui/GlassCard";

interface AuthorityLink {
  icon: IconType;
  label: string;
  name: string;
  description: string;
  href: string;
}

const LINKS: AuthorityLink[] = [
  {
    icon: HiOutlineScale,
    label: "Regulatory",
    name: "RERA Gujarat Portal",
    description:
      "Verify project registration numbers, promoter details and complaint status directly with the Gujarat Real Estate Regulatory Authority.",
    href: "https://gujrera.gujarat.gov.in/",
  },
  {
    icon: HiOutlineBuildingOffice,
    label: "Implementing Authority",
    name: "Dholera Industrial City Development Ltd. (DICDL)",
    description:
      "The joint Centre–State SPV overseeing Dholera SIR's activation area, land allotment and industrial infrastructure rollout.",
    href: "https://dholera.gujarat.gov.in/",
  },
  {
    icon: HiOutlineGlobeAlt,
    label: "State Government",
    name: "Gujarat SIR Development Updates",
    description:
      "Official Gujarat Government resources tracking Special Investment Region policy, incentives and milestone announcements.",
    href: "https://gsem.gujarat.gov.in/Home/DholeraSIR",
  },
];

export default function AuthorityLinks() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {LINKS.map((link, i) => (
        <motion.a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor-hover
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
          className="block h-full"
        >
          <GlassCard className="h-full flex flex-col">
            <div className="flex items-start justify-between mb-5">
              <div className="w-14 h-14 rounded-full gold-border flex items-center justify-center">
                <link.icon className="text-luxury-gold" size={26} />
              </div>
              <HiOutlineArrowUpRight className="text-white/30 group-hover:text-luxury-gold transition-colors" size={20} />
            </div>
            <p className="text-luxury-gold text-xs uppercase tracking-wider mb-2">
              {link.label}
            </p>
            <h3 className="font-display text-lg mb-3">{link.name}</h3>
            <p className="text-white/55 text-sm leading-relaxed flex-1">
              {link.description}
            </p>
            <span className="text-luxury-gold text-xs uppercase tracking-wider mt-5 inline-flex items-center gap-1">
              Visit Official Portal <HiOutlineArrowUpRight size={14} />
            </span>
          </GlassCard>
        </motion.a>
      ))}
    </div>
  );
}
