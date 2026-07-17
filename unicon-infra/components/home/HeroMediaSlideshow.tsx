"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";

export interface HeroSlide {
  video: string;
  poster: string;
  label: string;
}

const SLIDE_DURATION = 7000; // ms each scene stays on screen before cross-dissolving to the next

export default function HeroMediaSlideshow({ slides }: { slides: HeroSlide[] }) {
  const [active, setActive] = useState(0);
  const [muted, setMuted] = useState(true);
  const [ready, setReady] = useState<boolean[]>(() => slides.map(() => false));
  const [failed, setFailed] = useState<boolean[]>(() => slides.map(() => false));
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [slides.length]);

  const toggleMute = () => {
    const video = videoRefs.current[active];
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  const markReady = (i: number) =>
    setReady((prev) => {
      if (prev[i]) return prev;
      const next = [...prev];
      next[i] = true;
      return next;
    });

  const markFailed = (i: number) =>
    setFailed((prev) => {
      if (prev[i]) return prev;
      const next = [...prev];
      next[i] = true;
      return next;
    });

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-black">
      {slides.map((slide, i) => {
        const isActive = i === active;
        const showVideo = ready[i] && !failed[i];
        return (
          <div
            key={slide.video}
            className="absolute inset-0 transition-opacity ease-in-out"
            style={{ opacity: isActive ? 1 : 0, transitionDuration: "1600ms" }}
            aria-hidden={!isActive}
          >
            {/* Poster fallback — covers the gap before the video can play,
                and stands in permanently if the footage hasn't been added yet. */}
            <div
              className="absolute inset-0 bg-cover bg-center scale-105 transition-opacity duration-1000"
              style={{
                backgroundImage: `url(${slide.poster})`,
                opacity: showVideo ? 0 : 1,
              }}
            />

            {!failed[i] && (
              <video
                ref={(el) => {
                  videoRefs.current[i] = el;
                }}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
                style={{ opacity: ready[i] ? 1 : 0 }}
                src={slide.video}
                poster={slide.poster}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                onCanPlay={() => markReady(i)}
                onError={() => markFailed(i)}
              />
            )}
          </div>
        );
      })}

      {/* Scene label — bottom-left, cross-fades with each transition */}
      <div className="absolute bottom-24 left-6 md:left-10 z-20">
        {slides.map((slide, i) => (
          <p
            key={slide.video}
            className="absolute bottom-0 left-0 text-white/50 text-[11px] tracking-[0.25em] uppercase transition-opacity duration-700 whitespace-nowrap"
            style={{ opacity: i === active ? 1 : 0 }}
          >
            {slide.label}
          </p>
        ))}
      </div>

      {/* Progress indicators — double as manual slide selectors */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((slide, i) => (
          <button
            key={slide.video}
            onClick={() => setActive(i)}
            aria-label={`Show ${slide.label}`}
            data-cursor-hover
            className="relative h-1 w-7 md:w-9 rounded-full bg-white/20 overflow-hidden"
          >
            {i === active ? (
              <motion.span
                key={`${slide.video}-${active}`}
                className="absolute inset-0 bg-luxury-gold origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
              />
            ) : null}
          </button>
        ))}
      </div>

      {/* Mute toggle for the active clip */}
      {ready[active] && !failed[active] && (
        <button
          onClick={toggleMute}
          data-cursor-hover
          aria-label={muted ? "Unmute video" : "Mute video"}
          className="absolute bottom-8 right-6 md:right-10 z-20 w-11 h-11 rounded-full glass flex items-center justify-center text-luxury-gold hover:border-luxury-gold transition-colors"
        >
          {muted ? <HiVolumeOff size={18} /> : <HiVolumeUp size={18} />}
        </button>
      )}
    </div>
  );
}
