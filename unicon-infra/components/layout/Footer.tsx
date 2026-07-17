"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
  HiArrowUp,
  HiArrowRight,
  HiCheckCircle,
} from "react-icons/hi";
import { NAV_LINKS } from "@/lib/data";
import { SiteSettings } from "@/lib/types";
import Button from "@/components/ui/Button";

export default function Footer({ settings }: { settings: SiteSettings }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [brandFirst, ...brandRestParts] = (settings.siteName || "Unicon Infra").split(" ");
  const brandRest = brandRestParts.join(" ");

  const handleSubscribe = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "brochure", email }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const socialLinks = [
    { icon: FaInstagram, href: settings.social.instagram, label: "Instagram" },
    { icon: FaFacebookF, href: settings.social.facebook, label: "Facebook" },
    { icon: FaLinkedinIn, href: settings.social.linkedin, label: "LinkedIn" },
    { icon: FaYoutube, href: settings.social.youtube, label: "YouTube" },
  ].filter((item) => item.href);

  const mapsHref = settings.address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(settings.address)}`
    : undefined;

  return (
    <footer className="relative bg-black border-t border-luxury-gold/15 pt-0 pb-8 overflow-hidden">
      <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[900px] h-[420px] bg-luxury-gold/5 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gold-gradient opacity-60 pointer-events-none" />

      {/* CTA strip */}
      <div className="container-luxury relative pt-16 md:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-strong rounded-3xl px-8 py-10 md:px-14 md:py-12 grid lg:grid-cols-[1.3fr_1fr] gap-8 items-center relative overflow-hidden"
        >
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-luxury-gold/10 blur-[90px] rounded-full pointer-events-none" />
          <div className="relative">
            <p className="eyebrow mb-3">Speak To An Advisor</p>
            <h3 className="font-display text-2xl md:text-4xl leading-tight">
              Ready to Invest in Dholera SIR?
            </h3>
            <p className="text-white/55 text-sm md:text-base mt-3 max-w-lg">
              Get a personalised walkthrough of Unicon Infra&apos;s Dholera opportunities —
              plot options, pricing and the current infrastructure timeline.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row lg:justify-end gap-3 relative">
            <Button href="/dholera-sir" variant="outline" className="justify-center whitespace-nowrap">
              Explore Dholera SIR
            </Button>
            <Button href="/contact" className="justify-center whitespace-nowrap">
              Enquire Now
            </Button>
          </div>
        </motion.div>
      </div>

      <div className="container-luxury relative mt-14 md:mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-14 border-b border-white/10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center" data-cursor-hover>
              {settings.logo ? (
                <span className="relative h-10 w-36 block">
                  <Image
                    src={settings.logo}
                    alt={settings.siteName || "Logo"}
                    fill
                    className="object-contain object-left"
                    unoptimized
                  />
                </span>
              ) : (
                <span className="font-display text-2xl tracking-widest">
                  {brandFirst} {brandRest && <span className="text-gold-gradient">{brandRest}</span>}
                </span>
              )}
            </Link>
            <p className="text-white/50 text-sm mt-5 leading-relaxed max-w-sm">
              {settings.tagline ||
                "Crafting India's most exclusive residences, villas, commercial towers and townships."}
            </p>

            {/* Newsletter */}
            <form onSubmit={handleSubscribe} className="mt-7 max-w-sm">
              <p className="text-white/70 text-xs uppercase tracking-[0.15em] mb-3">
                Get Dholera SIR Updates
              </p>
              {status === "done" ? (
                <p className="flex items-center gap-2 text-luxury-gold text-sm">
                  <HiCheckCircle size={18} /> You&apos;re subscribed. Thank you!
                </p>
              ) : (
                <div className="flex items-center gap-2 bg-white/5 border border-white/15 focus-within:border-luxury-gold rounded-full pl-5 pr-1.5 py-1.5 transition-colors">
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="flex-1 bg-transparent text-sm outline-none placeholder:text-white/30 min-w-0"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    data-cursor-hover
                    className="w-9 h-9 shrink-0 flex items-center justify-center rounded-full bg-gold-gradient text-black hover:shadow-gold transition-all disabled:opacity-60"
                    disabled={status === "loading"}
                  >
                    <HiArrowRight size={15} />
                  </button>
                </div>
              )}
              {status === "error" && (
                <p className="text-red-400 text-xs mt-2">Something went wrong. Please try again.</p>
              )}
            </form>

            {socialLinks.length > 0 && (
              <div className="flex gap-3 mt-7">
                {socialLinks.map(({ icon: Icon, href, label }, i) => (
                  <a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    data-cursor-hover
                    className="w-9 h-9 flex items-center justify-center rounded-full gold-border text-luxury-gold hover:text-black hover:bg-luxury-gold transition-all"
                  >
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Explore */}
          <div>
            <h4 className="eyebrow mb-5">Explore</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-luxury-gold text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Dholera SIR */}
          <div>
            <h4 className="eyebrow mb-5">Dholera SIR</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/dholera-sir" className="text-white/60 hover:text-luxury-gold text-sm transition-colors">
                  About Dholera SIR
                </Link>
              </li>
              <li>
                <Link href="/dholera-progress" className="text-white/60 hover:text-luxury-gold text-sm transition-colors">
                  Live Progress Room
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-white/60 hover:text-luxury-gold text-sm transition-colors">
                  All Projects
                </Link>
              </li>
              <li>
                <Link href="/joint-ventures" className="text-white/60 hover:text-luxury-gold text-sm transition-colors">
                  Joint Ventures
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-white/60 hover:text-luxury-gold text-sm transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-white/60 hover:text-luxury-gold text-sm transition-colors">
                  Journal
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="text-white/60 hover:text-luxury-gold text-sm transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="eyebrow mb-5">Contact</h4>
            <ul className="space-y-4 text-sm text-white/60">
              {settings.address && (
                <li>
                  <a
                    href={mapsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 hover:text-luxury-gold transition-colors"
                  >
                    <HiOutlineLocationMarker className="text-luxury-gold mt-0.5 shrink-0" />
                    {settings.address}
                  </a>
                </li>
              )}
              {settings.phone && (
                <li>
                  <a
                    href={`tel:${settings.phone}`}
                    className="flex items-center gap-3 hover:text-luxury-gold transition-colors"
                  >
                    <HiOutlinePhone className="text-luxury-gold shrink-0" />
                    {settings.phone}
                  </a>
                </li>
              )}
              {settings.email && (
                <li>
                  <a
                    href={`mailto:${settings.email}`}
                    className="flex items-center gap-3 hover:text-luxury-gold transition-colors"
                  >
                    <HiOutlineMail className="text-luxury-gold shrink-0" />
                    {settings.email}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 text-xs text-white/40">
          <p>
            © {new Date().getFullYear()} {settings.siteName || "Unicon Infra"}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-luxury-gold transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-conditions" className="hover:text-luxury-gold transition-colors">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>

      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        data-cursor-hover
        className={`hidden md:flex fixed bottom-8 right-8 z-40 w-11 h-11 items-center justify-center rounded-full gold-border bg-black/60 backdrop-blur text-luxury-gold hover:bg-luxury-gold hover:text-black transition-all duration-300 ${
          showTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
        }`}
      >
        <HiArrowUp size={18} />
      </button>
    </footer>
  );
}
