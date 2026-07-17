"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { HiArrowUpRight as ArrowIcon } from "react-icons/hi2";
import { Project } from "@/lib/types";

export default function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <Link href={`/projects/${project.slug}`} data-cursor-hover>
        <div className="relative h-[420px] rounded-2xl overflow-hidden gold-border">
          <Image
            src={project.coverImage}
            alt={project.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

          <span className="absolute top-5 left-5 glass px-3 py-1 rounded-full text-[11px] uppercase tracking-wider text-luxury-gold">
            {project.status}
          </span>

          <div className="absolute bottom-0 left-0 right-0 p-6">
            <p className="flex items-center gap-1.5 text-white/60 text-xs mb-2">
              <HiOutlineLocationMarker className="text-luxury-gold" />
              {project.location}
            </p>
            <h3 className="font-display text-2xl text-white mb-2 group-hover:text-luxury-gold transition-colors">
              {project.name}
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-luxury-gold text-sm">{project.priceRange}</span>
              <span className="w-9 h-9 rounded-full border border-luxury-gold/40 flex items-center justify-center group-hover:bg-luxury-gold group-hover:text-black transition-all">
                <ArrowIcon size={16} />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
