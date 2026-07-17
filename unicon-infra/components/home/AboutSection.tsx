"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { HiArrowUpRight } from "react-icons/hi2";
import SectionHeading from "@/components/ui/SectionHeading";

export default function AboutSection() {
  return (
    <section className="relative py-28 md:py-36 bg-black overflow-hidden">
      <div className="container-luxury grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="relative h-[420px] md:h-[560px] rounded-2xl overflow-hidden gold-border">
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
              alt="Unicon Infra architecture"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-8 -right-6 md:-right-10 glass-strong rounded-2xl p-6 w-48 md:w-56">
            <p className="font-display text-4xl text-gold-gradient">18+</p>
            <p className="text-white/60 text-xs mt-1 uppercase tracking-wide">
              Years crafting landmark addresses
            </p>
          </div>
        </motion.div>

        <div>
          <SectionHeading
            eyebrow="About Unicon Infra"
            title="Two Decades of Uncompromising Craftsmanship"
            align="left"
          />
          <p className="text-white/60 mt-6 leading-relaxed">
            Founded in 2007, Unicon Infra has grown into one of North India&apos;s
            most trusted names in luxury real estate. From ultra-premium
            residences to integrated townships, every development we undertake
            is guided by a single philosophy — architecture should elevate the
            way people live, work, and gather.
          </p>
          <p className="text-white/60 mt-4 leading-relaxed">
            Our in-house design studio, global material partnerships, and
            relentless attention to detail have earned the trust of over
            6,500 families and enterprises across India.
          </p>

          <div className="grid grid-cols-2 gap-6 mt-10">
            {[
              { label: "RERA Registered Projects", value: "100%" },
              { label: "On-Time Delivery Rate", value: "96%" },
            ].map((item) => (
              <div key={item.label} className="border-l border-luxury-gold/30 pl-4">
                <p className="font-display text-2xl text-gold-gradient">{item.value}</p>
                <p className="text-white/50 text-xs mt-1">{item.label}</p>
              </div>
            ))}
          </div>

          <Link
            href="/about"
            data-cursor-hover
            className="inline-flex items-center gap-2 mt-10 text-luxury-gold uppercase text-sm tracking-wider group"
          >
            Discover Our Story
            <HiArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
