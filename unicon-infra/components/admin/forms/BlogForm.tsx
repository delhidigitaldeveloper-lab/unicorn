"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Banner from "@/components/admin/Banner";
import ImageUploader from "@/components/admin/ImageUploader";
import { TextField, TextAreaField } from "@/components/admin/FormField";
import { adminApi, ApiError } from "@/lib/admin/api";
import { BlogPost } from "@/lib/types";

type BlogDraft = Omit<BlogPost, "id"> & { id?: string };

const EMPTY_POST: BlogDraft = {
  slug: "",
  title: "",
  category: "",
  author: "Team Unicon",
  date: new Date().toISOString().slice(0, 10),
  readTime: "5 min read",
  coverImage: "",
  excerpt: "",
  content: [],
  published: true,
};

function slugify(text: string) {
  return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function BlogForm({ post }: { post?: BlogPost }) {
  const router = useRouter();
  const isEdit = Boolean(post);

  const [form, setForm] = useState<BlogDraft>(post ?? EMPTY_POST);
  const [contentText, setContentText] = useState((post?.content ?? []).join("\n\n"));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const update = <K extends keyof BlogDraft>(key: K, value: BlogDraft[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const payload: Omit<BlogPost, "id"> = {
      ...form,
      slug: form.slug || slugify(form.title),
      content: contentText
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean),
    };

    try {
      if (isEdit && post) {
        await adminApi.put(`/api/admin/blog/${post.id}`, payload);
        setSuccess("Post updated successfully.");
      } else {
        await adminApi.post("/api/admin/blog", payload);
        setSuccess("Post created successfully.");
        setTimeout(() => router.push("/admin/blog"), 800);
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
        <h3 className="font-display text-lg mb-2">Post Details</h3>
        <TextField label="Title" required value={form.title} onChange={(e) => update("title", e.target.value)} />
        <div className="grid md:grid-cols-2 gap-5">
          <TextField
            label="Slug (URL)"
            placeholder="auto-generated-from-title"
            value={form.slug}
            onChange={(e) => update("slug", slugify(e.target.value))}
          />
          <TextField label="Category" required value={form.category} onChange={(e) => update("category", e.target.value)} />
          <TextField label="Author" value={form.author} onChange={(e) => update("author", e.target.value)} />
          <TextField
            label="Publish Date"
            type="date"
            value={form.date}
            onChange={(e) => update("date", e.target.value)}
          />
          <TextField label="Read Time" value={form.readTime} onChange={(e) => update("readTime", e.target.value)} />
          <div className="flex items-center gap-3 pt-6">
            <input
              id="published"
              type="checkbox"
              checked={form.published}
              onChange={(e) => update("published", e.target.checked)}
              className="w-4 h-4 accent-[#c8a96a]"
            />
            <label htmlFor="published" className="text-sm text-white/70">
              Published (visible on the live site)
            </label>
          </div>
        </div>
      </div>

      <div className="glass rounded-2xl p-6 md:p-8 space-y-5">
        <h3 className="font-display text-lg mb-2">Content</h3>
        <TextAreaField
          label="Excerpt"
          required
          rows={2}
          value={form.excerpt}
          onChange={(e) => update("excerpt", e.target.value)}
        />
        <TextAreaField
          label="Body"
          required
          rows={10}
          value={contentText}
          onChange={(e) => setContentText(e.target.value)}
          hint="Separate paragraphs with a blank line."
        />
      </div>

      <div className="glass rounded-2xl p-6 md:p-8">
        <h3 className="font-display text-lg mb-4">Cover Image</h3>
        <ImageUploader label="Cover Image" value={form.coverImage} onChange={(url) => update("coverImage", url)} />
      </div>

      <div className="flex items-center gap-4">
        <Button type="submit" className="justify-center">
          {loading ? "Saving..." : isEdit ? "Save Changes" : "Publish Post"}
        </Button>
        <Button href="/admin/blog" variant="outline">
          Cancel
        </Button>
      </div>
    </form>
  );
}
