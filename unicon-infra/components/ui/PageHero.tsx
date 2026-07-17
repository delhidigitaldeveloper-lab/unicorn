"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { HiChevronRight } from "react-icons/hi";

export default function PageHero({
  eyebrow,
  title,
  image,
  breadcrumb,
}: {
  eyebrow: string;
  title: string;
  image: string;
  breadcrumb?: string;
}) {
  return (
    <section className="relative h-[55vh] min-h-[420px] flex items-end overflow-hidden">
      <Image src={image} alt={title} fill priority className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />

      <div className="container-luxury relative pb-16 md:pb-20">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="eyebrow mb-4"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="font-display text-4xl md:text-6xl max-w-3xl"
        >
          {title}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center gap-2 text-xs text-white/50 mt-6 uppercase tracking-wider"
        >
          <Link href="/" className="hover:text-luxury-gold transition-colors">
            Home
          </Link>
          <HiChevronRight />
          <span className="text-luxury-gold">{breadcrumb || eyebrow}</span>
        </motion.div>
      </div>
    </section>
  );
}
