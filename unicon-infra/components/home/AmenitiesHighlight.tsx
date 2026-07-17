"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { HiCheckCircle } from "react-icons/hi";
import SectionHeading from "@/components/ui/SectionHeading";

const HIGHLIGHTS = [
  {
    label: "Sky Amenities",
    title: "Infinity Pools & Sky Lounges",
    description:
      "Suspended above the city skyline, our infinity pools and sky lounges offer panoramic views and a resort-like escape without leaving home.",
    points: ["Rooftop infinity pool", "Private sky lounge", "Sunset viewing deck"],
    image:
      "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?q=80&w=1400&auto=format&fit=crop",
  },
  {
    label: "Wellness",
    title: "Spa, Sauna & Fitness Studios",
    description:
      "A dedicated wellness floor featuring a full-service spa, sauna, steam rooms, and a state-of-the-art fitness studio for residents.",
    points: ["Signature spa & sauna", "Personal training studio", "Yoga & meditation deck"],
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1400&auto=format&fit=crop",
  },
  {
    label: "Leisure",
    title: "Private Cinema & Clubhouse",
    description:
      "A members-only clubhouse featuring a private screening room, games lounge, and event spaces for residents to host and unwind.",
    points: ["Private screening room", "Games & billiards lounge", "Event & banquet spaces"],
    image:
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1400&auto=format&fit=crop",
  },
  {
    label: "Security",
    title: "3-Tier Security & Smart Access",
    description:
      "Round-the-clock security with biometric access, smart video intercoms, and 24/7 concierge — because peace of mind is a luxury too.",
    points: ["Biometric smart access", "24/7 manned security", "CCTV-monitored common areas"],
    image:
      "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=1400&auto=format&fit=crop",
  },
];

export default function AmenitiesHighlight() {
  const [active, setActive] = useState(0);
  const current = HIGHLIGHTS[active];

  return (
    <section className="py-28 md:py-36 bg-luxury-charcoal relative overflow-hidden">
      <div className="container-luxury">
        <SectionHeading
          eyebrow="Signature Amenities"
          title="Every Detail, Designed for Living Well"
          description="A closer look at the amenities that set Unicon Infra residences apart."
        />

        <div className="flex flex-wrap items-center justify-center gap-3 mt-14 mb-12">
          {HIGHLIGHTS.map((item, i) => (
            <button
              key={item.label}
              onClick={() => setActive(i)}
              data-cursor-hover
              className={clsx(
                "px-6 py-2.5 rounded-full text-xs uppercase tracking-wider transition-all border",
                active === i
                  ? "bg-gold-gradient text-black border-transparent"
                  : "border-luxury-gold/30 text-white/70 hover:border-luxury-gold hover:text-luxury-gold"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.image}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5 }}
              className="relative h-[340px] md:h-[440px] rounded-2xl overflow-hidden gold-border"
            >
              <Image src={current.image} alt={current.title} fill className="object-cover" />
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="font-display text-2xl md:text-3xl mb-4">{current.title}</h3>
              <p className="text-white/60 leading-relaxed mb-6">{current.description}</p>
              <ul className="space-y-3">
                {current.points.map((point) => (
                  <li key={point} className="flex items-center gap-3 text-white/70 text-sm">
                    <HiCheckCircle className="text-luxury-gold shrink-0" size={18} />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
