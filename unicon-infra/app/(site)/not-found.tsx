"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-dark-radial overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-luxury-gold/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="container-luxury relative text-center py-32">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-display text-[8rem] md:text-[14rem] leading-none text-gold-gradient"
        >
          404
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-display text-2xl md:text-4xl -mt-6"
        >
          This Address Doesn&apos;t Exist — Yet.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-white/50 mt-4 max-w-md mx-auto"
        >
          The page you&apos;re looking for may have been moved, renamed, or is
          still under construction. Let&apos;s get you back on track.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button href="/">Back to Home</Button>
          <Button href="/projects" variant="outline">
            Explore Projects
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
