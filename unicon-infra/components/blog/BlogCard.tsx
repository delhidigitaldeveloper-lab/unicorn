"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { HiArrowUpRight } from "react-icons/hi2";
import { BlogPost } from "@/lib/types";

export default function BlogCard({ post, index = 0 }: { post: BlogPost; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
      className="group"
    >
      <Link href={`/blog/${post.slug}`} data-cursor-hover>
        <div className="relative h-56 rounded-2xl overflow-hidden gold-border">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-[1.2s] group-hover:scale-110"
          />
          <span className="absolute top-4 left-4 glass px-3 py-1 rounded-full text-[11px] uppercase tracking-wider text-luxury-gold">
            {post.category}
          </span>
        </div>
        <div className="mt-5">
          <p className="text-white/40 text-xs">
            {new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
            {" · "}
            {post.readTime}
          </p>
          <h3 className="font-display text-xl mt-2 group-hover:text-luxury-gold transition-colors">
            {post.title}
          </h3>
          <p className="text-white/50 text-sm mt-2 line-clamp-2">{post.excerpt}</p>
          <span className="inline-flex items-center gap-1.5 text-luxury-gold text-xs uppercase tracking-wide mt-4">
            Read More
            <HiArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
