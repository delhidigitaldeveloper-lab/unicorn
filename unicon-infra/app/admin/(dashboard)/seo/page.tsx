"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiChevronDown, HiCheckCircle } from "react-icons/hi";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { TextField, TextAreaField } from "@/components/admin/FormField";
import ImageUploader from "@/components/admin/ImageUploader";
import Button from "@/components/ui/Button";
import { adminApi, ApiError } from "@/lib/admin/api";
import { SeoSetting } from "@/lib/types";

function SeoRow({ seo }: { seo: SeoSetting }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(seo);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const update = <K extends keyof SeoSetting>(key: K, value: SeoSetting[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    setSaving(true);
    setError("");
    setSaved(false);
    try {
      await adminApi.put(`/api/admin/seo/${form.page}`, form);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="glass rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left"
      >
        <div>
          <p className="font-display text-lg">{seo.label}</p>
          <p className="text-white/40 text-xs mt-0.5 truncate max-w-md">{form.title}</p>
        </div>
        <motion.span animate={{ rotate: open ? 180 : 0 }} className="text-luxury-gold">
          <HiChevronDown size={20} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 space-y-5 border-t border-white/10 pt-6">
              <TextField label="Meta Title" value={form.title} onChange={(e) => update("title", e.target.value)} />
              <TextAreaField
                label="Meta Description"
                rows={2}
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
              />
              <TextField
                label="Keywords"
                hint="Comma-separated"
                value={form.keywords}
                onChange={(e) => update("keywords", e.target.value)}
              />
              <ImageUploader label="Social Share Image (og:image)" value={form.ogImage} onChange={(url) => update("ogImage", url)} />

              {error && <p className="text-red-400 text-xs">{error}</p>}

              <div className="flex items-center gap-3">
                <Button type="button" onClick={handleSave} className="!py-2.5">
                  {saving ? "Saving..." : "Save SEO"}
                </Button>
                {saved && (
                  <span className="flex items-center gap-1.5 text-luxury-gold text-xs">
                    <HiCheckCircle /> Saved
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AdminSeoPage() {
  const [items, setItems] = useState<SeoSetting[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi.get<SeoSetting[]>("/api/admin/seo").then((data) => {
      setItems(data);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <AdminPageHeader
        title="SEO Settings"
        description="Fine-tune the meta title, description, keywords and social share image for each page."
      />

      {loading ? (
        <p className="text-white/40">Loading...</p>
      ) : (
        <div className="space-y-4 max-w-3xl">
          {items.map((seo) => (
            <SeoRow key={seo.page} seo={seo} />
          ))}
        </div>
      )}
    </div>
  );
}
