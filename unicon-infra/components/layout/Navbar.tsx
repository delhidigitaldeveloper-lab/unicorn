"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiMenuAlt4,
  HiX,
  HiChevronDown,
  HiChevronRight,
  HiOutlinePhone,
  HiOutlineMail,
} from "react-icons/hi";
import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { NAV_LINKS } from "@/lib/data";
import { SiteSettings } from "@/lib/types";
import Button from "@/components/ui/Button";

export default function Navbar({ settings }: { settings: SiteSettings }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMobileSubmenu(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const [brandFirst, ...brandRestParts] = (settings.siteName || "Unicon Infra").split(" ");
  const brandRest = brandRestParts.join(" ");

  const socialLinks = [
    { icon: FaInstagram, href: settings.social.instagram },
    { icon: FaFacebookF, href: settings.social.facebook },
    { icon: FaLinkedinIn, href: settings.social.linkedin },
    { icon: FaYoutube, href: settings.social.youtube },
  ].filter((item) => item.href);

  return (
    <>
      {/* Utility top bar */}
      <div
        className={`hidden lg:block fixed top-0 left-0 right-0 z-50 bg-black/80 border-b border-white/5 overflow-hidden transition-all duration-500 ${
          scrolled ? "max-h-0 opacity-0" : "max-h-12 opacity-100"
        }`}
      >
        <div className="container-luxury flex items-center justify-between h-10 text-xs text-white/50">
          <div className="flex items-center gap-6">
            {settings.phone && (
              <a
                href={`tel:${settings.phone}`}
                className="flex items-center gap-2 hover:text-luxury-gold transition-colors"
                data-cursor-hover
              >
                <HiOutlinePhone className="text-luxury-gold" size={14} />
                {settings.phone}
              </a>
            )}
            {settings.email && (
              <a
                href={`mailto:${settings.email}`}
                className="flex items-center gap-2 hover:text-luxury-gold transition-colors"
                data-cursor-hover
              >
                <HiOutlineMail className="text-luxury-gold" size={14} />
                {settings.email}
              </a>
            )}
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/dholera-sir"
              data-cursor-hover
              className="flex items-center gap-2 rounded-full border border-luxury-gold/40 px-3.5 py-1 uppercase tracking-[0.15em] text-[10px] text-luxury-gold hover:bg-luxury-gold hover:text-black transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold animate-pulse" />
              Now Focused on Dholera SIR
            </Link>
            {socialLinks.length > 0 && (
              <div className="flex items-center gap-3">
                {socialLinks.map(({ icon: Icon, href }, i) => (
                  <a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-hover
                    className="hover:text-luxury-gold transition-colors"
                  >
                    <Icon size={12} />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "top-0 py-3 glass-strong shadow-glass" : "lg:top-10 top-0 py-5 md:py-6 bg-gradient-to-b from-black/70 to-transparent lg:bg-none"
        }`}
      >
        <nav className="container-luxury flex items-center justify-between">
          <Link href="/" className="flex items-center shrink-0" data-cursor-hover>
            {settings.logo ? (
              <span className="relative h-9 md:h-11 w-32 md:w-40 block">
                <Image
                  src={settings.logo}
                  alt={settings.siteName || "Logo"}
                  fill
                  className="object-contain object-left"
                  unoptimized
                  priority
                />
              </span>
            ) : (
              <span className="font-display text-xl md:text-2xl tracking-widest">
                {brandFirst} {brandRest && <span className="text-gold-gradient">{brandRest}</span>}
              </span>
            )}
          </Link>

          <ul className="hidden xl:flex items-center bg-gold-gradient rounded-full p-1 shadow-gold">
            {NAV_LINKS.map((link) => {
              const hasChildren = "children" in link && link.children && link.children.length > 0;
              const isActive =
                pathname === link.href ||
                (hasChildren && link.children!.some((child) => pathname === child.href));

              return (
                <li key={link.href} className={hasChildren ? "relative group/nav" : "relative"}>
                  <Link
                    href={link.href}
                    data-cursor-hover
                    className={`flex items-center gap-1 whitespace-nowrap px-4 2xl:px-5 py-2.5 rounded-full text-[12px] 2xl:text-[13px] tracking-[0.1em] uppercase font-semibold transition-colors relative group ${
                      isActive ? "text-black" : "text-black/75 hover:text-black"
                    }`}
                  >
                    {link.label}
                    {hasChildren && (
                      <HiChevronDown
                        size={12}
                        className="transition-transform duration-300 group-hover/nav:rotate-180"
                      />
                    )}
                    <span
                      className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-[2px] bg-black rounded-full transition-all duration-300 ${
                        isActive ? "w-5" : "w-0 group-hover:w-5"
                      }`}
                    />
                  </Link>

                  {hasChildren && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-5 opacity-0 invisible translate-y-2 group-hover/nav:opacity-100 group-hover/nav:visible group-hover/nav:translate-y-0 transition-all duration-300 z-50">
                      <div className="glass-strong rounded-2xl p-2 min-w-[260px] shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gold-gradient" />
                        {link.children!.map((child) => {
                          const childActive = pathname === child.href;
                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              data-cursor-hover
                              className={`flex items-center justify-between gap-3 rounded-xl px-4 py-3.5 text-sm tracking-wide transition-colors group/item ${
                                childActive
                                  ? "text-luxury-gold bg-white/5"
                                  : "text-white/75 hover:text-luxury-gold hover:bg-white/5"
                              }`}
                            >
                              {child.label}
                              <HiChevronRight
                                size={14}
                                className="opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300"
                              />
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="hidden xl:flex items-center gap-4">
            {settings.phone && (
              <a
                href={`tel:${settings.phone}`}
                data-cursor-hover
                aria-label="Call us"
                className="w-11 h-11 flex items-center justify-center rounded-full gold-border text-luxury-gold hover:bg-luxury-gold hover:text-black transition-all shrink-0"
              >
                <HiOutlinePhone size={17} />
              </a>
            )}
            <Button href="/contact" variant="outline" className="!py-2.5 !px-6 text-xs">
              Book a Visit
            </Button>
          </div>

          <button
            className="xl:hidden relative z-[60] w-11 h-11 flex items-center justify-center rounded-full gold-border text-luxury-gold"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            data-cursor-hover
          >
            {open ? <HiX size={20} /> : <HiMenuAlt4 size={20} />}
          </button>
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm xl:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[86%] max-w-sm bg-luxury-charcoal border-l border-luxury-gold/20 flex flex-col xl:hidden overflow-y-auto"
            >
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-luxury-gold/10 blur-[100px] rounded-full pointer-events-none" />

              <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/10 relative">
                <span className="font-display text-xl tracking-widest">
                  {brandFirst} {brandRest && <span className="text-gold-gradient">{brandRest}</span>}
                </span>
              </div>

              <nav className="flex-1 px-6 py-6">
                <ul className="space-y-1">
                  {NAV_LINKS.map((link, i) => {
                    const hasChildren = "children" in link && link.children && link.children.length > 0;
                    const expanded = mobileSubmenu === link.href;
                    const isActive =
                      pathname === link.href ||
                      (hasChildren && link.children!.some((child) => pathname === child.href));

                    return (
                      <motion.li
                        key={link.href}
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + i * 0.05, duration: 0.4 }}
                        className="border-b border-white/5"
                      >
                        {hasChildren ? (
                          <>
                            <button
                              onClick={() => setMobileSubmenu(expanded ? null : link.href)}
                              className={`flex items-center justify-between w-full py-4 font-display text-lg transition-colors ${
                                isActive ? "text-luxury-gold" : "text-white hover:text-luxury-gold"
                              }`}
                            >
                              <span className="flex items-center gap-3">
                                <span className="text-luxury-gold/50 text-xs font-body">
                                  {String(i + 1).padStart(2, "0")}
                                </span>
                                {link.label}
                              </span>
                              <HiChevronDown
                                size={18}
                                className={`transition-transform duration-300 ${expanded ? "rotate-180 text-luxury-gold" : ""}`}
                              />
                            </button>
                            <AnimatePresence>
                              {expanded && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="overflow-hidden"
                                >
                                  <div className="flex flex-col gap-1 pb-4 pl-9">
                                    {link.children!.map((child) => (
                                      <Link
                                        key={child.href}
                                        href={child.href}
                                        className={`py-2 text-sm transition-colors ${
                                          pathname === child.href
                                            ? "text-luxury-gold"
                                            : "text-white/60 hover:text-luxury-gold"
                                        }`}
                                      >
                                        {child.label}
                                      </Link>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </>
                        ) : (
                          <Link
                            href={link.href}
                            className={`flex items-center gap-3 py-4 font-display text-lg transition-colors ${
                              isActive ? "text-luxury-gold" : "text-white hover:text-luxury-gold"
                            }`}
                          >
                            <span className="text-luxury-gold/50 text-xs font-body">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            {link.label}
                          </Link>
                        )}
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              <div className="px-6 pb-8 pt-2 space-y-5">
                <Button href="/contact" variant="primary" className="w-full justify-center">
                  Book a Visit
                </Button>

                <div className="flex flex-col gap-3 text-sm text-white/50">
                  {settings.phone && (
                    <a href={`tel:${settings.phone}`} className="flex items-center gap-3 hover:text-luxury-gold transition-colors">
                      <HiOutlinePhone className="text-luxury-gold" size={16} />
                      {settings.phone}
                    </a>
                  )}
                  {settings.email && (
                    <a href={`mailto:${settings.email}`} className="flex items-center gap-3 hover:text-luxury-gold transition-colors">
                      <HiOutlineMail className="text-luxury-gold" size={16} />
                      {settings.email}
                    </a>
                  )}
                </div>

                {socialLinks.length > 0 && (
                  <div className="flex gap-3 pt-2">
                    {socialLinks.map(({ icon: Icon, href }, i) => (
                      <a
                        key={i}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 flex items-center justify-center rounded-full gold-border text-luxury-gold hover:bg-luxury-gold hover:text-black transition-all"
                      >
                        <Icon size={14} />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
