"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaYoutube } from "react-icons/fa";
import SectionHeading from "@/components/ui/SectionHeading";

/**
 * Renders a raw third-party embed snippet (e.g. from SnapWidget, Elfsight,
 * LightWidget, or Instagram's own embed.js code) and makes sure any
 * <script> tags inside it actually execute — browsers ignore scripts
 * injected via innerHTML, so we re-create and re-append them manually.
 */
function RawEmbed({ html }: { html: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = html;

    const scripts = Array.from(container.querySelectorAll("script"));
    scripts.forEach((oldScript) => {
      const newScript = document.createElement("script");
      Array.from(oldScript.attributes).forEach((attr) =>
        newScript.setAttribute(attr.name, attr.value)
      );
      newScript.text = oldScript.textContent || "";
      oldScript.parentNode?.replaceChild(newScript, oldScript);
    });
  }, [html]);

  return <div ref={containerRef} className="w-full [&_iframe]:w-full" />;
}

export default function SocialShowcase({
  youtubeVideoId,
  instagramEmbedCode,
}: {
  youtubeVideoId?: string | null;
  instagramEmbedCode?: string;
}) {
  const hasInstagram = Boolean(instagramEmbedCode && instagramEmbedCode.trim());
  const hasYoutube = Boolean(youtubeVideoId);

  if (!hasInstagram && !hasYoutube) return null;

  return (
    <section className="py-28 md:py-36 bg-black relative overflow-hidden">
      <div className="container-luxury">
        <SectionHeading
          eyebrow="Live From Our Socials"
          title="Follow The Journey"
          description="Our latest reels and videos, pulled straight from Instagram and YouTube — no manual updates needed."
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-start">
          {hasInstagram && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center w-full"
            >
              <div className="w-full max-w-sm rounded-2xl overflow-hidden gold-border bg-white/[0.02] p-1">
                <RawEmbed html={instagramEmbedCode as string} />
              </div>
            </motion.div>
          )}

          {hasYoutube && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="flex flex-col items-center w-full"
            >
              <div className="w-full rounded-2xl overflow-hidden gold-border bg-white/[0.02]">
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeVideoId}`}
                  className="w-full aspect-video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  title="Latest YouTube Video"
                />
              </div>
              <a
                href={`https://www.youtube.com/watch?v=${youtubeVideoId}`}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="mt-5 inline-flex items-center gap-2 text-sm text-white/60 hover:text-luxury-gold transition-colors"
              >
                <FaYoutube size={16} />
                Watch on YouTube
              </a>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
