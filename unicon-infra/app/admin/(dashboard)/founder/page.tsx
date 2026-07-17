"use client";

import { FormEvent, useEffect, useState } from "react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import Banner from "@/components/admin/Banner";
import ImageUploader from "@/components/admin/ImageUploader";
import { TextField, TextAreaField } from "@/components/admin/FormField";
import Button from "@/components/ui/Button";
import { adminApi, ApiError } from "@/lib/admin/api";
import { FounderProfile } from "@/lib/types";

const EMPTY: FounderProfile = { photo: "", name: "", title: "", bio: "", message: "" };

export default function AdminFounderPage() {
  const [founder, setFounder] = useState<FounderProfile>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    adminApi.get<FounderProfile>("/api/admin/founder").then((data) => {
      setFounder(data);
      setLoading(false);
    });
  }, []);

  const update = <K extends keyof FounderProfile>(key: K, value: FounderProfile[K]) =>
    setFounder((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      await adminApi.put("/api/admin/founder", founder);
      setSuccess("Founder profile saved successfully.");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-white/40">Loading...</p>;

  return (
    <div>
      <AdminPageHeader
        title="Founder Page"
        description="Manage the photograph, biography and founder's message shown on the public Founder page (About → Founder)."
      />

      <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
        <Banner type="error" message={error} />
        <Banner type="success" message={success} />

        <div className="glass rounded-2xl p-6 md:p-8 space-y-5">
          <h3 className="font-display text-lg mb-2">Photograph</h3>
          <ImageUploader
            label="Executive Photograph"
            value={founder.photo}
            onChange={(url) => update("photo", url)}
            aspect="aspect-[3/4]"
          />
          <p className="text-white/30 text-xs -mt-2">
            Recommended: a high-resolution portrait, at least 1200×1600px, professionally shot.
          </p>
        </div>

        <div className="glass rounded-2xl p-6 md:p-8 space-y-5">
          <h3 className="font-display text-lg mb-2">Name &amp; Title</h3>
          <TextField
            label="Full Name"
            required
            value={founder.name}
            onChange={(e) => update("name", e.target.value)}
          />
          <TextField
            label="Title"
            required
            placeholder="Founder, Unicon Infra Group"
            value={founder.title}
            onChange={(e) => update("title", e.target.value)}
          />
        </div>

        <div className="glass rounded-2xl p-6 md:p-8 space-y-5">
          <h3 className="font-display text-lg mb-2">Professional Biography</h3>
          <TextAreaField
            label="Biography"
            rows={6}
            required
            value={founder.bio}
            onChange={(e) => update("bio", e.target.value)}
          />
        </div>

        <div className="glass rounded-2xl p-6 md:p-8 space-y-5">
          <h3 className="font-display text-lg mb-2">Founder&apos;s Message</h3>
          <TextAreaField
            label="Message"
            rows={4}
            required
            hint="Shown as a highlighted quote box on the Founder page."
            value={founder.message}
            onChange={(e) => update("message", e.target.value)}
          />
        </div>

        <Button type="submit" className="justify-center">
          {saving ? "Saving..." : "Save Founder Page"}
        </Button>
      </form>
    </div>
  );
}
