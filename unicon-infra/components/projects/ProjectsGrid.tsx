"use client";

import { useState } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import ProjectCard from "@/components/projects/ProjectCard";
import { Project } from "@/lib/types";

const CATEGORIES = ["All", "Residential", "Villas", "Commercial", "Township"] as const;

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<(typeof CATEGORIES)[number]>("All");

  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            data-cursor-hover
            className={clsx(
              "px-6 py-2.5 rounded-full text-xs uppercase tracking-wider transition-all border",
              active === cat
                ? "bg-gold-gradient text-black border-transparent"
                : "border-luxury-gold/30 text-white/70 hover:border-luxury-gold hover:text-luxury-gold"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <p className="text-center text-white/50 py-20">No projects found in this category.</p>
      )}
    </div>
  );
}
