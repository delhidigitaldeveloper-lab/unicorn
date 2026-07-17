"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineDownload, HiCheckCircle, HiExclamationCircle } from "react-icons/hi";
import Button from "@/components/ui/Button";

export default function BrochureCTA() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "brochure",
          email: formData.get("email"),
        }),
      });
      if (!res.ok) throw new Error();
      // TODO: once submitted, trigger the actual brochure PDF download,
      // e.g. window.open('/brochure.pdf', '_blank');
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 md:py-28 bg-luxury-charcoal">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-strong rounded-3xl p-10 md:p-16 grid lg:grid-cols-2 gap-10 items-center relative overflow-hidden"
        >
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-luxury-gold/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative">
            <div className="w-14 h-14 rounded-full gold-border flex items-center justify-center mb-6">
              <HiOutlineDownload className="text-luxury-gold" size={26} />
            </div>
            <h3 className="font-display text-2xl md:text-4xl mb-4">
              Download Our Complete Portfolio Brochure
            </h3>
            <p className="text-white/60 leading-relaxed max-w-md">
              Get detailed floor plans, pricing, specifications, and
              amenities for every Unicon Infra development — delivered
              straight to your inbox.
            </p>
          </div>

          <div className="relative">
            {submitted ? (
              <div className="text-center py-6">
                <HiCheckCircle className="text-luxury-gold mx-auto mb-3" size={36} />
                <p className="text-white font-display text-lg">Check Your Inbox!</p>
                <p className="text-white/50 text-sm mt-2">
                  Your brochure has been sent to your email address.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  required
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 bg-white/5 border border-white/15 focus:border-luxury-gold rounded-lg px-5 py-4 text-sm outline-none transition-colors placeholder:text-white/30"
                />
                <Button type="submit" className="justify-center whitespace-nowrap">
                  {loading ? "Sending..." : "Get Brochure"}
                </Button>
              </form>
            )}
            {error && (
              <p className="flex items-center gap-2 text-red-400 text-xs mt-3">
                <HiExclamationCircle /> {error}
              </p>
            )}
            <p className="text-white/30 text-xs mt-4">
              We respect your privacy. Read our{" "}
              <a href="/privacy-policy" className="text-luxury-gold/70 hover:text-luxury-gold underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
