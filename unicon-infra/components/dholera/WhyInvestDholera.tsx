"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { HiCheckCircle } from "react-icons/hi";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

const REASONS = [
  "India's first Greenfield smart city, planned and governed under a dedicated state Act",
  "Node on the Delhi-Mumbai Industrial Corridor (DMIC) with direct freight-corridor access",
  "Clear, digitised land titles and enforced town-planning schemes across activated zones",
  "Government-backed SPV (DICDL) ensuring transparent, phase-wise infrastructure delivery",
  "Multi-modal connectivity: expressway, greenfield airport and planned rail transit in one corridor",
  "Diversified industrial base — semiconductors, renewables, auto, logistics, pharma & defence",
];

export default function WhyInvestDholera() {
  return (
    <section className="py-28 md:py-36 bg-luxury-charcoal relative overflow-hidden">
      <div className="container-luxury grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative h-[420px] md:h-[520px] rounded-2xl overflow-hidden gold-border order-2 lg:order-1"
        >
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop"
            alt="Dholera SIR master-planned infrastructure"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        </motion.div>

        <div className="order-1 lg:order-2">
          <SectionHeading
            eyebrow="Why Dholera SIR"
            title="A Rare, Government-Backed Growth Story"
            align="left"
          />
          <p className="text-white/60 mt-6 leading-relaxed max-w-lg">
            Dholera isn&apos;t a private township betting on speculation — it&apos;s a
            sovereign infrastructure project with a legislated development authority,
            a dedicated implementing SPV, and capital already deployed on the ground.
          </p>

          <ul className="mt-8 space-y-4">
            {REASONS.map((reason, i) => (
              <motion.li
                key={reason}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex items-start gap-3 text-white/70 text-sm md:text-base"
              >
                <HiCheckCircle className="text-luxury-gold mt-0.5 shrink-0" size={20} />
                {reason}
              </motion.li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-4 mt-10">
            <Button href="/dholera-progress">See Live Progress</Button>
            <Button href="/contact" variant="outline">
              Talk to an Advisor
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
