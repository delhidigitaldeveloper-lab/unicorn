"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { HiPlay, HiPause } from "react-icons/hi";
import SectionHeading from "@/components/ui/SectionHeading";

export default function VideoShowcase() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <section className="py-28 md:py-36 bg-black relative overflow-hidden">
      <div className="container-luxury">
        <SectionHeading
          eyebrow="Cinematic Walkthrough"
          title="Experience Unicon Infra in Motion"
          description="Step inside our flagship developments and see the craftsmanship, scale, and detail that define every Unicon Infra address."
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative mt-16 rounded-2xl md:rounded-3xl overflow-hidden gold-border aspect-video max-w-5xl mx-auto"
        >
          {!failed ? (
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              src="/videos/showcase.mp4"
              poster="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop"
              loop
              muted
              playsInline
              preload="metadata"
              onError={() => setFailed(true)}
              onEnded={() => setPlaying(false)}
            />
          ) : (
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop"
              alt="Unicon Infra showcase"
              fill
              className="object-cover"
            />
          )}

          <div className="absolute inset-0 bg-black/20" />

          <button
            onClick={togglePlay}
            data-cursor-hover
            aria-label={playing ? "Pause video" : "Play video"}
            className="absolute inset-0 flex items-center justify-center group"
          >
            <span className="w-20 h-20 md:w-24 md:h-24 rounded-full glass-strong flex items-center justify-center text-luxury-gold group-hover:scale-110 group-hover:border-luxury-gold transition-all duration-300">
              {playing ? <HiPause size={34} /> : <HiPlay size={34} className="ml-1" />}
            </span>
          </button>
        </motion.div>

        <p className="text-center text-white/30 text-xs mt-6">
          Add your own walkthrough film at{" "}
          <code className="text-luxury-gold/60">public/videos/showcase.mp4</code>
        </p>
      </div>
    </section>
  );
}
