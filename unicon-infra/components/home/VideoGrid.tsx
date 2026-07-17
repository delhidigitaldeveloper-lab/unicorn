"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { VideoItem } from "@/lib/types";

function getYoutubeEmbedUrl(url: string): string | null {
  const watch = url.match(/[?&]v=([A-Za-z0-9_-]{11})/);
  const short = url.match(/youtu\.be\/([A-Za-z0-9_-]{11})/);
  const embed = url.match(/youtube\.com\/embed\/([A-Za-z0-9_-]{11})/);
  const shorts = url.match(/youtube\.com\/shorts\/([A-Za-z0-9_-]{11})/);
  const id = watch?.[1] || short?.[1] || embed?.[1] || shorts?.[1] || null;
  return id ? `https://www.youtube.com/embed/${id}` : null;
}

export default function VideoGrid({ videos }: { videos: VideoItem[] }) {
  const embeddable = videos
    .map((v) => ({ id: v.id, src: getYoutubeEmbedUrl(v.youtubeUrl) }))
    .filter((v): v is { id: string; src: string } => Boolean(v.src));

  if (embeddable.length === 0) return null;

  // Cap at 4 for a clean, intentional grid.
  const displayed = embeddable.slice(0, 4);
  const cols =
    displayed.length === 1
      ? "grid-cols-1 max-w-2xl mx-auto"
      : displayed.length === 2
      ? "grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto"
      : displayed.length === 3
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";

  return (
    <section className="py-28 md:py-36 bg-black relative overflow-hidden">
      <div className="container-luxury">
        <SectionHeading
          eyebrow="In Motion"
          title="Our Latest Videos"
          description="A closer look at our developments, milestones, and moments — straight from our video library."
        />

        <div className={`mt-16 grid gap-6 md:gap-8 ${cols}`}>
          {displayed.map((video, i) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="rounded-2xl overflow-hidden gold-border bg-white/[0.02] hover:shadow-2xl hover:shadow-luxury-gold/10 transition-shadow duration-300"
            >
              <iframe
                src={video.src}
                className="w-full aspect-video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                title="Unicon Infra video"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
