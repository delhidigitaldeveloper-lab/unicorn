"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { HiOutlineTrash, HiOutlinePlus } from "react-icons/hi";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import Banner from "@/components/admin/Banner";
import ImageUploader from "@/components/admin/ImageUploader";
import { TextField, SelectField } from "@/components/admin/FormField";
import Button from "@/components/ui/Button";
import DeleteButton from "@/components/admin/DeleteButton";
import { adminApi, ApiError } from "@/lib/admin/api";
import { GalleryImage } from "@/lib/types";

const CATEGORIES = ["Residential", "Villas", "Commercial", "Township"] as const;

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [src, setSrc] = useState("");
  const [label, setLabel] = useState("");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("Residential");

  const load = async () => {
    setLoading(true);
    const data = await adminApi.get<GalleryImage[]>("/api/admin/gallery");
    setImages(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!src) {
      setError("Please upload or paste an image URL first.");
      return;
    }
    setSaving(true);
    try {
      await adminApi.post("/api/admin/gallery", {
        src,
        label: label || "Untitled",
        category,
        order: images.length + 1,
      });
      setSrc("");
      setLabel("");
      setSuccess("Image added to gallery.");
      load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <AdminPageHeader title="Gallery" description="Manage photos shown on the public Gallery page." />

      <div className="glass rounded-2xl p-6 md:p-8 mb-10">
        <h3 className="font-display text-lg mb-5">Add New Image</h3>
        <Banner type="error" message={error} />
        <Banner type="success" message={success} />
        <form onSubmit={handleAdd} className="grid md:grid-cols-2 gap-6">
          <ImageUploader label="Image" value={src} onChange={setSrc} />
          <div className="space-y-5">
            <TextField label="Label" placeholder="Unicon Skyline Residences" value={label} onChange={(e) => setLabel(e.target.value)} />
            <SelectField label="Category" value={category} onChange={(e) => setCategory(e.target.value as never)}>
              {CATEGORIES.map((c) => (
                <option key={c} value={c} className="bg-black">
                  {c}
                </option>
              ))}
            </SelectField>
            <Button type="submit" className="w-full justify-center inline-flex items-center gap-2">
              <HiOutlinePlus /> {saving ? "Adding..." : "Add to Gallery"}
            </Button>
          </div>
        </form>
      </div>

      {loading ? (
        <p className="text-white/40">Loading...</p>
      ) : images.length === 0 ? (
        <div className="glass rounded-2xl p-16 text-center text-white/40">No images yet. Add your first one above.</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {images.map((img) => (
            <div key={img.id} className="glass rounded-xl overflow-hidden group">
              <div className="relative aspect-video">
                <Image src={img.src} alt={img.label} fill className="object-cover" unoptimized />
              </div>
              <div className="p-3 flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-white text-xs truncate">{img.label}</p>
                  <p className="text-white/40 text-[10px] uppercase tracking-wide">{img.category}</p>
                </div>
                <DeleteButton
                  label=""
                  onDelete={async () => {
                    await adminApi.delete(`/api/admin/gallery/${img.id}`);
                    load();
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
