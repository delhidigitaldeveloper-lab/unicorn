"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { HiOutlineLockClosed, HiExclamationCircle } from "react-icons/hi";
import Button from "@/components/ui/Button";

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid credentials.");
        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black bg-dark-radial px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <p className="font-display text-2xl tracking-widest mb-2">
            UNICON <span className="text-gold-gradient">ADMIN</span>
          </p>
          <p className="text-white/40 text-sm">Sign in to manage your site content</p>
        </div>

        <form onSubmit={handleSubmit} className="glass-strong rounded-2xl p-8 space-y-5">
          <div className="w-14 h-14 rounded-full gold-border flex items-center justify-center mx-auto mb-2">
            <HiOutlineLockClosed className="text-luxury-gold" size={24} />
          </div>

          <input
            required
            name="email"
            type="email"
            placeholder="Email Address"
            className="w-full bg-white/5 border border-white/15 focus:border-luxury-gold rounded-lg px-4 py-3 text-sm outline-none transition-colors placeholder:text-white/30"
          />
          <input
            required
            name="password"
            type="password"
            placeholder="Password"
            className="w-full bg-white/5 border border-white/15 focus:border-luxury-gold rounded-lg px-4 py-3 text-sm outline-none transition-colors placeholder:text-white/30"
          />

          {error && (
            <p className="flex items-center gap-2 text-red-400 text-xs">
              <HiExclamationCircle /> {error}
            </p>
          )}

          <Button type="submit" className="w-full justify-center">
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <p className="text-center text-white/30 text-xs mt-6">
          Default login: admin@uniconinfra.com / Admin@123 — change this in your .env file.
        </p>
      </div>
    </div>
  );
}
