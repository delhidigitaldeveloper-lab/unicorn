"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

export default function ContactCTA() {
  return (
    <section className="relative py-28 md:py-32 bg-black overflow-hidden">
      <div className="absolute inset-0 bg-dark-radial" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[300px] bg-luxury-gold/10 blur-[140px] rounded-full" />

      <div className="container-luxury relative text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="eyebrow mb-5"
        >
          Begin Your Journey
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-display text-3xl md:text-6xl max-w-3xl mx-auto leading-tight"
        >
          Your Extraordinary Address
          <span className="text-gold-gradient"> Awaits.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-white/60 max-w-xl mx-auto mt-6"
        >
          Schedule a private consultation or site visit with our advisory
          team and discover the Unicon Infra difference.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button href="/contact">Schedule Site Visit</Button>
          <Button href="tel:+919876543210" variant="outline">
            Call +91 98765 43210
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
