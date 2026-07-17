"use client";

import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { GalleryImage } from "@/lib/types";

const CATEGORIES = ["All", "Residential", "Villas", "Commercial", "Township"] as const;

export default function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [active, setActive] = useState<(typeof CATEGORIES)[number]>("All");
  const [index, setIndex] = useState(-1);

  const filtered =
    active === "All" ? images : images.filter((img) => img.category === active);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-center gap-3 mb-14">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            data-cursor-hover
            className={clsx(
              "px-6 py-2.5 rounded-full text-xs uppercase tracking-wider transition-all border",
              active === cat
                ? "bg-gold-gradient text-black border-transparent"
                : "border-luxury-gold/30 text-white/70 hover:border-luxury-gold hover:text-luxury-gold"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-white/40 py-20">No images in this category yet.</p>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
          {filtered.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setIndex(i)}
              data-cursor-hover
              className="relative w-full mb-5 rounded-2xl overflow-hidden gold-border group block break-inside-avoid"
              style={{ aspectRatio: i % 3 === 0 ? "3/4" : "4/3" }}
            >
              <Image
                src={img.src}
                alt={img.label}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                unoptimized={img.src.startsWith("/uploads/")}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-end p-4 opacity-0 group-hover:opacity-100">
                <span className="text-white text-sm font-medium">{img.label}</span>
              </div>
            </button>
          ))}
        </div>
      )}

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={filtered.map((img) => ({ src: img.src }))}
      />
    </div>
  );
}
