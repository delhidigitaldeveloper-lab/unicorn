"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Banner from "@/components/admin/Banner";
import ImageUploader from "@/components/admin/ImageUploader";
import { TextField } from "@/components/admin/FormField";
import { adminApi, ApiError } from "@/lib/admin/api";
import { TeamMember } from "@/lib/types";

type Draft = Omit<TeamMember, "id"> & { id?: string };

const EMPTY: Draft = { name: "", role: "", image: "", order: 1 };

export default function TeamMemberForm({ member }: { member?: TeamMember }) {
  const router = useRouter();
  const isEdit = Boolean(member);

  const [form, setForm] = useState<Draft>(member ?? EMPTY);
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

    const payload: Omit<TeamMember, "id"> = { ...form, order: Number(form.order) };

    try {
      if (isEdit && member) {
        await adminApi.put(`/api/admin/team/${member.id}`, payload);
        setSuccess("Team member updated.");
      } else {
        await adminApi.post("/api/admin/team", payload);
        setSuccess("Team member added.");
        setTimeout(() => router.push("/admin/team"), 800);
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
        <TextField label="Role / Title" required value={form.role} onChange={(e) => update("role", e.target.value)} />
        <TextField
          label="Display Order"
          type="number"
          value={form.order}
          onChange={(e) => update("order", Number(e.target.value) as never)}
        />
      </div>

      <div className="flex items-center gap-4">
        <Button type="submit" className="justify-center">
          {loading ? "Saving..." : isEdit ? "Save Changes" : "Add Member"}
        </Button>
        <Button href="/admin/team" variant="outline">
          Cancel
        </Button>
      </div>
    </form>
  );
}
