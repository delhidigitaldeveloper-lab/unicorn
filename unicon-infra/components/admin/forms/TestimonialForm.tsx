"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Banner from "@/components/admin/Banner";
import ImageUploader from "@/components/admin/ImageUploader";
import { TextField, TextAreaField, SelectField } from "@/components/admin/FormField";
import { adminApi, ApiError } from "@/lib/admin/api";
import { Testimonial } from "@/lib/types";

type Draft = Omit<Testimonial, "id"> & { id?: string };

const EMPTY: Draft = { name: "", role: "", quote: "", image: "", rating: 5, order: 1 };

export default function TestimonialForm({ testimonial }: { testimonial?: Testimonial }) {
  const router = useRouter();
  const isEdit = Boolean(testimonial);

  const [form, setForm] = useState<Draft>(testimonial ?? EMPTY);
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

    const payload: Omit<Testimonial, "id"> = {
      ...form,
      rating: Number(form.rating),
      order: Number(form.order),
    };

    try {
      if (isEdit && testimonial) {
        await adminApi.put(`/api/admin/testimonials/${testimonial.id}`, payload);
        setSuccess("Testimonial updated.");
      } else {
        await adminApi.post("/api/admin/testimonials", payload);
        setSuccess("Testimonial added.");
        setTimeout(() => router.push("/admin/testimonials"), 800);
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
        <ImageUploader label="Photo" value={form.image} onChange={(url) => update("image", url)} aspect="aspect-square" />
        <TextField label="Full Name" required value={form.name} onChange={(e) => update("name", e.target.value)} />
        <TextField
          label="Role / Description"
          required
          placeholder="Owner, Skyline Residences"
          value={form.role}
          onChange={(e) => update("role", e.target.value)}
        />
        <TextAreaField
          label="Quote"
          required
          rows={4}
          value={form.quote}
          onChange={(e) => update("quote", e.target.value)}
        />
        <div className="grid grid-cols-2 gap-5">
          <SelectField label="Rating" value={form.rating} onChange={(e) => update("rating", Number(e.target.value) as never)}>
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r} className="bg-black">
                {r} Star{r > 1 ? "s" : ""}
              </option>
            ))}
          </SelectField>
          <TextField
            label="Display Order"
            type="number"
            value={form.order}
            onChange={(e) => update("order", Number(e.target.value) as never)}
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button type="submit" className="justify-center">
          {loading ? "Saving..." : isEdit ? "Save Changes" : "Add Testimonial"}
        </Button>
        <Button href="/admin/testimonials" variant="outline">
          Cancel
        </Button>
      </div>
    </form>
  );
}
