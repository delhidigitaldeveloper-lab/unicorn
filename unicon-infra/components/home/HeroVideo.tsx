"use client";

import { useEffect, useRef, useState } from "react";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";

export default function HeroVideo({
  src = "/videos/hero.mp4",
  poster = "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1920&auto=format&fit=crop",
}: {
  src?: string;
  poster?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onCanPlay = () => setVideoReady(true);
    const onError = () => setVideoFailed(true);
    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("error", onError);
    return () => {
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("error", onError);
    };
  }, []);

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setMuted(videoRef.current.muted);
  };

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-black">
      {/* Poster / fallback image — always present underneath, covers the gap
          before the video can play and stands in permanently if the video
          fails to load (e.g. no file has been added yet). */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105 transition-opacity duration-1000"
        style={{
          backgroundImage: `url(${poster})`,
          opacity: videoReady && !videoFailed ? 0 : 1,
        }}
      />

      {!videoFailed && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          style={{ opacity: videoReady ? 1 : 0 }}
          src={src}
          poster={poster}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />
      )}

      {/* Mute / unmute control — only useful once a real video with audio is added */}
      {videoReady && !videoFailed && (
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
