"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { HiArrowDown } from "react-icons/hi";
import Button from "@/components/ui/Button";
import HeroMediaSlideshow, { HeroSlide } from "./HeroMediaSlideshow";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

const HERO_SLIDES: HeroSlide[] = [
  {
    video: "/videos/hero-abcd-building.mp4",
    poster:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1920&auto=format&fit=crop",
    label: "The ABCD Building",
  },
  {
    video: "/videos/hero-dholera-expressway.mp4",
    poster:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1920&auto=format&fit=crop",
    label: "Ahmedabad–Dholera Expressway",
  },
  {
    video: "/videos/hero-unicon-gates.mp4",
    poster:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1920&auto=format&fit=crop",
    label: "Unicon Infra Project Gates",
  },
];

const wordReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.3 + i * 0.12, duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero() {
  const headline = [
    { text: "Invest", gold: false },
    { text: "in", gold: false },
    { text: "India's", gold: false },
    { text: "1st", gold: true },
    { text: "Platinum-Rated", gold: true },
    { text: "Greenfield", gold: false },
    { text: "Smart", gold: true },
    { text: "City.", gold: true },
  ];
  const pillars = ["Elegance", "Trust", "Guaranteed Appreciation"];

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Layer 1: cinematic drone-footage background, cross-dissolving between
          the ABCD Building, the Ahmedabad–Dholera Expressway and the Unicon
          Infra project gates (falls back to poster images automatically for
          any clip not yet added under /public/videos/) */}
      <HeroMediaSlideshow slides={HERO_SLIDES} />

      {/* Layer 2: subtle floating gold particles for cinematic depth */}
      <HeroScene particleCount={500} />

      {/* Layer 3: gradient scrim for text legibility over any footage */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black z-[2]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 z-[2]" />

      <div className="container-luxury relative z-10 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="eyebrow mb-6"
        >
          IGBC Platinum-Rated · Ahmedabad–Dholera Smart City
        </motion.p>

        <h1 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.15] flex flex-wrap justify-center gap-x-3 gap-y-1 max-w-5xl mx-auto">
          {headline.map((word, i) => (
            <motion.span
              key={`${word.text}-${i}`}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={wordReveal}
              className={word.gold ? "text-gold-gradient" : ""}
            >
              {word.text}
            </motion.span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.9 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-white/60 text-sm md:text-base tracking-[0.15em] uppercase"
        >
          {pillars.map((pillar, i) => (
            <span key={pillar} className="flex items-center gap-x-4">
              {pillar}
              {i < pillars.length - 1 && (
                <span className="w-1 h-1 rounded-full bg-luxury-gold/60" />
              )}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.35, duration: 0.9 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button href="/projects">Explore Projects</Button>
          <Button href="/contact" variant="outline">
            Book a Site Visit
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/40"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
        >
          <HiArrowDown />
        </motion.div>
      </motion.div>
    </section>
  );
}
