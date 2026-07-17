"use client";

import { FormEvent, useState } from "react";
import { HiCheckCircle, HiExclamationCircle } from "react-icons/hi";
import Button from "@/components/ui/Button";
import { Project } from "@/lib/types";

export default function ContactForm({ projects }: { projects: Project[] }) {
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
          type: "contact",
          name: formData.get("name"),
          phone: formData.get("phone"),
          email: formData.get("email"),
          project: formData.get("project"),
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
      <div className="text-center py-14">
        <HiCheckCircle className="text-luxury-gold mx-auto mb-4" size={48} />
        <p className="font-display text-2xl">Thank You for Reaching Out!</p>
        <p className="text-white/50 mt-2">
          One of our advisors will contact you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <input
          required
          name="name"
          type="text"
          placeholder="Full Name"
          className="w-full bg-white/5 border border-white/15 focus:border-luxury-gold rounded-lg px-4 py-3.5 text-sm outline-none transition-colors placeholder:text-white/30"
        />
        <input
          required
          name="phone"
          type="tel"
          placeholder="Phone Number"
          className="w-full bg-white/5 border border-white/15 focus:border-luxury-gold rounded-lg px-4 py-3.5 text-sm outline-none transition-colors placeholder:text-white/30"
        />
      </div>
      <input
        required
        name="email"
        type="email"
        placeholder="Email Address"
        className="w-full bg-white/5 border border-white/15 focus:border-luxury-gold rounded-lg px-4 py-3.5 text-sm outline-none transition-colors placeholder:text-white/30"
      />
      <select
        required
        name="project"
        defaultValue=""
        className="w-full bg-white/5 border border-white/15 focus:border-luxury-gold rounded-lg px-4 py-3.5 text-sm outline-none transition-colors text-white/70"
      >
        <option value="" disabled className="bg-black">
          Interested Project
        </option>
        {projects.map((p) => (
          <option key={p.slug} value={p.name} className="bg-black">
            {p.name}
          </option>
        ))}
        <option value="General Enquiry" className="bg-black">
          General Enquiry
        </option>
      </select>
      <textarea
        name="message"
        rows={4}
        placeholder="Your Message"
        className="w-full bg-white/5 border border-white/15 focus:border-luxury-gold rounded-lg px-4 py-3.5 text-sm outline-none transition-colors placeholder:text-white/30 resize-none"
      />
      {error && (
        <p className="flex items-center gap-2 text-red-400 text-xs">
          <HiExclamationCircle /> {error}
        </p>
      )}
      <Button type="submit" className="w-full justify-center">
        {loading ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
