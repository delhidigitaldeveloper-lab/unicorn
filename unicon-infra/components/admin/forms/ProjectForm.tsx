"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { HiOutlineTrash, HiOutlinePlus } from "react-icons/hi";
import Button from "@/components/ui/Button";
import Banner from "@/components/admin/Banner";
import ImageUploader from "@/components/admin/ImageUploader";
import { TextField, TextAreaField, SelectField } from "@/components/admin/FormField";
import { adminApi, ApiError } from "@/lib/admin/api";
import { Project } from "@/lib/types";

type ProjectDraft = Omit<Project, "id"> & { id?: string };

const EMPTY_PROJECT: ProjectDraft = {
  slug: "",
  name: "",
  location: "",
  category: "Residential",
  status: "Ongoing",
  priceRange: "",
  coverImage: "",
  gallery: [],
  shortDescription: "",
  description: "",
  amenities: [],
  specifications: [],
  area: "",
  units: "",
  possession: "",
  lat: 28.4595,
  lng: 77.0726,
  order: 1,
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function ProjectForm({ project }: { project?: Project }) {
  const router = useRouter();
  const isEdit = Boolean(project);

  const [form, setForm] = useState<ProjectDraft>(project ?? EMPTY_PROJECT);
  const [galleryText, setGalleryText] = useState((project?.gallery ?? []).join("\n"));
  const [amenitiesText, setAmenitiesText] = useState((project?.amenities ?? []).join("\n"));
  const [specs, setSpecs] = useState(project?.specifications ?? []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const update = <K extends keyof ProjectDraft>(key: K, value: ProjectDraft[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const addSpec = () => setSpecs((prev) => [...prev, { label: "", value: "" }]);
  const updateSpec = (index: number, field: "label" | "value", value: string) =>
    setSpecs((prev) => prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)));
  const removeSpec = (index: number) => setSpecs((prev) => prev.filter((_, i) => i !== index));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const payload: Omit<Project, "id"> = {
      ...form,
      slug: form.slug || slugify(form.name),
      gallery: galleryText.split("\n").map((s) => s.trim()).filter(Boolean),
      amenities: amenitiesText.split("\n").map((s) => s.trim()).filter(Boolean),
      specifications: specs.filter((s) => s.label && s.value),
      lat: Number(form.lat),
      lng: Number(form.lng),
      order: Number(form.order),
    };

    try {
      if (isEdit && project) {
        await adminApi.put(`/api/admin/projects/${project.id}`, payload);
        setSuccess("Project updated successfully.");
      } else {
        await adminApi.post("/api/admin/projects", payload);
        setSuccess("Project created successfully.");
        setTimeout(() => router.push("/admin/projects"), 800);
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Banner type="error" message={error} />
      <Banner type="success" message={success} />

      <div className="glass rounded-2xl p-6 md:p-8 space-y-5">
        <h3 className="font-display text-lg mb-2">Basic Information</h3>
        <div className="grid md:grid-cols-2 gap-5">
          <TextField
            label="Project Name"
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
          />
          <TextField
            label="Slug (URL)"
            placeholder="auto-generated-from-name"
            value={form.slug}
            onChange={(e) => update("slug", slugify(e.target.value))}
            hint="Used in the URL: /projects/your-slug"
          />
          <TextField
            label="Location"
            required
            value={form.location}
            onChange={(e) => update("location", e.target.value)}
          />
          <TextField
            label="Price Range"
            required
            placeholder="₹3.2 Cr – ₹8.5 Cr"
            value={form.priceRange}
            onChange={(e) => update("priceRange", e.target.value)}
          />
          <SelectField
            label="Category"
            value={form.category}
            onChange={(e) => update("category", e.target.value as Project["category"])}
          >
            {["Residential", "Villas", "Commercial", "Township"].map((c) => (
              <option key={c} value={c} className="bg-black">
                {c}
              </option>
            ))}
          </SelectField>
          <SelectField
            label="Status"
            value={form.status}
            onChange={(e) => update("status", e.target.value as Project["status"])}
          >
            {["Ongoing", "Completed", "Upcoming"].map((s) => (
              <option key={s} value={s} className="bg-black">
                {s}
              </option>
            ))}
          </SelectField>
          <TextField label="Area" value={form.area} onChange={(e) => update("area", e.target.value)} />
          <TextField label="Units" value={form.units} onChange={(e) => update("units", e.target.value)} />
          <TextField
            label="Possession"
            value={form.possession}
            onChange={(e) => update("possession", e.target.value)}
          />
          <TextField
            label="Display Order"
            type="number"
            value={form.order}
            onChange={(e) => update("order", Number(e.target.value) as never)}
          />
        </div>
      </div>

      <div className="glass rounded-2xl p-6 md:p-8 space-y-5">
        <h3 className="font-display text-lg mb-2">Description</h3>
        <TextAreaField
          label="Short Description"
          required
          rows={2}
          value={form.shortDescription}
          onChange={(e) => update("shortDescription", e.target.value)}
        />
        <TextAreaField
          label="Full Description"
          required
          rows={5}
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
        />
      </div>

      <div className="glass rounded-2xl p-6 md:p-8 space-y-5">
        <h3 className="font-display text-lg mb-2">Media</h3>
        <ImageUploader
          label="Cover Image"
          value={form.coverImage}
          onChange={(url) => update("coverImage", url)}
        />
        <TextAreaField
          label="Gallery Images"
          rows={5}
          value={galleryText}
          onChange={(e) => setGalleryText(e.target.value)}
          hint="One image URL per line. Upload images via the Gallery section, then paste the URLs here."
        />
      </div>

      <div className="glass rounded-2xl p-6 md:p-8 space-y-5">
        <h3 className="font-display text-lg mb-2">Amenities</h3>
        <TextAreaField
          label="Amenities"
          rows={6}
          value={amenitiesText}
          onChange={(e) => setAmenitiesText(e.target.value)}
          hint="One amenity per line."
        />
      </div>

      <div className="glass rounded-2xl p-6 md:p-8 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg">Specifications</h3>
          <button
            type="button"
            onClick={addSpec}
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wide text-luxury-gold hover:text-luxury-goldLight"
          >
            <HiOutlinePlus size={14} /> Add Row
          </button>
        </div>
        {specs.length === 0 && <p className="text-white/30 text-sm">No specifications added yet.</p>}
        {specs.map((spec, i) => (
          <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-3 items-center">
            <input
              placeholder="Label (e.g. Flooring)"
              value={spec.label}
              onChange={(e) => updateSpec(i, "label", e.target.value)}
              className="bg-white/5 border border-white/15 focus:border-luxury-gold rounded-lg px-3 py-2.5 text-sm outline-none placeholder:text-white/30"
            />
            <input
              placeholder="Value (e.g. Italian Marble)"
              value={spec.value}
              onChange={(e) => updateSpec(i, "value", e.target.value)}
              className="bg-white/5 border border-white/15 focus:border-luxury-gold rounded-lg px-3 py-2.5 text-sm outline-none placeholder:text-white/30"
            />
            <button
              type="button"
              onClick={() => removeSpec(i)}
              className="text-white/40 hover:text-red-400 p-2"
            >
              <HiOutlineTrash size={16} />
            </button>
          </div>
        ))}
      </div>

      <div className="glass rounded-2xl p-6 md:p-8 space-y-5">
        <h3 className="font-display text-lg mb-2">Map Coordinates</h3>
        <div className="grid md:grid-cols-2 gap-5">
          <TextField
            label="Latitude"
            type="number"
            step="any"
            value={form.lat}
            onChange={(e) => update("lat", Number(e.target.value) as never)}
          />
          <TextField
            label="Longitude"
            type="number"
            step="any"
            value={form.lng}
            onChange={(e) => update("lng", Number(e.target.value) as never)}
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button type="submit" className="justify-center">
          {loading ? "Saving..." : isEdit ? "Save Changes" : "Create Project"}
        </Button>
        <Button href="/admin/projects" variant="outline">
          Cancel
        </Button>
      </div>
    </form>
  );
}
