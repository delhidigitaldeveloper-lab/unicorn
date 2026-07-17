"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { HiCheckCircle } from "react-icons/hi";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

const BENEFITS = [
  "Prime locations along high-growth infrastructure corridors",
  "Historical price appreciation of 14–22% CAGR across projects",
  "Rental yield support & managed leasing programs",
  "Transparent construction-linked payment plans",
  "Dedicated investment advisory & portfolio reviews",
  "Buy-back assistance for select ready-to-move inventory",
];

export default function InvestmentBenefits() {
  return (
    <section className="py-28 md:py-36 bg-luxury-charcoal relative overflow-hidden">
      <div className="container-luxury grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <SectionHeading
            eyebrow="Investment Benefits"
            title="An Asset That Appreciates in Every Sense"
            align="left"
          />
          <p className="text-white/60 mt-6 leading-relaxed max-w-lg">
            Beyond luxury living, every Unicon Infra property is selected and
            engineered with long-term capital growth in mind.
          </p>

          <ul className="mt-8 space-y-4">
            {BENEFITS.map((benefit, i) => (
              <motion.li
                key={benefit}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex items-start gap-3 text-white/70 text-sm md:text-base"
              >
                <HiCheckCircle className="text-luxury-gold mt-0.5 shrink-0" size={20} />
                {benefit}
              </motion.li>
            ))}
          </ul>

          <div className="mt-10">
            <Button href="/contact">Talk to an Advisor</Button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative h-[460px] md:h-[560px] rounded-2xl overflow-hidden gold-border"
        >
          <Image
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop"
            alt="Investment growth"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
