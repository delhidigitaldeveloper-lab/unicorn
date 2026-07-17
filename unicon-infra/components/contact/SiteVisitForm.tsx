"use client";

import { FormEvent, useState } from "react";
import { HiCheckCircle, HiExclamationCircle } from "react-icons/hi";
import Button from "@/components/ui/Button";

export default function SiteVisitForm({ projectName }: { projectName?: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "site-visit",
          name: formData.get("name"),
          phone: formData.get("phone"),
          email: formData.get("email"),
          project: projectName,
          message: formData.get("message"),
        }),
      });

      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or call us directly.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <HiCheckCircle className="text-luxury-gold mx-auto mb-4" size={40} />
        <p className="text-white font-display text-lg">Thank You!</p>
        <p className="text-white/50 text-sm mt-2">
          Our advisory team will reach out to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        required
        name="name"
        type="text"
        placeholder="Full Name"
        className="w-full bg-white/5 border border-white/15 focus:border-luxury-gold rounded-lg px-4 py-3 text-sm outline-none transition-colors placeholder:text-white/30"
      />
      <input
        required
        name="phone"
        type="tel"
        placeholder="Phone Number"
        className="w-full bg-white/5 border border-white/15 focus:border-luxury-gold rounded-lg px-4 py-3 text-sm outline-none transition-colors placeholder:text-white/30"
      />
      <input
        required
        name="email"
        type="email"
        placeholder="Email Address"
        className="w-full bg-white/5 border border-white/15 focus:border-luxury-gold rounded-lg px-4 py-3 text-sm outline-none transition-colors placeholder:text-white/30"
      />
      <textarea
        name="message"
        rows={3}
        placeholder="Preferred date / message (optional)"
        className="w-full bg-white/5 border border-white/15 focus:border-luxury-gold rounded-lg px-4 py-3 text-sm outline-none transition-colors placeholder:text-white/30 resize-none"
      />
      {error && (
        <p className="flex items-center gap-2 text-red-400 text-xs">
          <HiExclamationCircle /> {error}
        </p>
      )}
      <Button type="submit" className="w-full justify-center">
        {loading ? "Submitting..." : "Request Site Visit"}
      </Button>
    </form>
  );
}
