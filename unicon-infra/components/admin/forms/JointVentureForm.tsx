"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Banner from "@/components/admin/Banner";
import ImageUploader from "@/components/admin/ImageUploader";
import { TextField, TextAreaField } from "@/components/admin/FormField";
import { adminApi, ApiError } from "@/lib/admin/api";
import { JointVenture } from "@/lib/types";

type Draft = Omit<JointVenture, "id"> & { id?: string };

const EMPTY: Draft = { name: "", logo: "", description: "", website: "", order: 1 };

export default function JointVentureForm({ venture }: { venture?: JointVenture }) {
  const router = useRouter();
  const isEdit = Boolean(venture);

  const [form, setForm] = useState<Draft>(venture ?? EMPTY);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const update = <K extends keyof Draft>(key: K, value: Draft[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const payload: Omit<JointVenture, "id"> = { ...form, order: Number(form.order) };

    try {
      if (isEdit && venture) {
        await adminApi.put(`/api/admin/joint-ventures/${venture.id}`, payload);
        setSuccess("Joint venture updated.");
      } else {
        await adminApi.post("/api/admin/joint-ventures", payload);
        setSuccess("Joint venture added.");
        setTimeout(() => router.push("/admin/joint-ventures"), 800);
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-xl">
      <Banner type="error" message={error} />
      <Banner type="success" message={success} />

      <div className="glass rounded-2xl p-6 md:p-8 space-y-5">
        <ImageUploader
          label="Company Logo"
          value={form.logo}
          onChange={(url) => update("logo", url)}
          aspect="aspect-square"
        />
        <TextField
          label="Company Name"
          required
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
        />
        <TextAreaField
          label="Description"
          required
          rows={4}
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          hint="A short paragraph about the partnership — 1-3 sentences works best."
        />
        <TextField
          label="Website (optional)"
          type="url"
          value={form.website}
          onChange={(e) => update("website", e.target.value)}
          placeholder="https://"
        />
        <TextField
          label="Display Order"
          type="number"
          value={form.order}
          onChange={(e) => update("order", Number(e.target.value) as never)}
        />
      </div>

      <div className="flex items-center gap-4">
        <Button type="submit" className="justify-center">
          {loading ? "Saving..." : isEdit ? "Save Changes" : "Add Partner"}
        </Button>
        <Button href="/admin/joint-ventures" variant="outline">
          Cancel
        </Button>
      </div>
    </form>
  );
}
