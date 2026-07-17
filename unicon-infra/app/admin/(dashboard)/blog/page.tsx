"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { HiOutlinePlus, HiOutlinePencil } from "react-icons/hi";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import DataTable, { DataTableColumn } from "@/components/admin/DataTable";
import DeleteButton from "@/components/admin/DeleteButton";
import Button from "@/components/ui/Button";
import { adminApi } from "@/lib/admin/api";
import { BlogPost } from "@/lib/types";

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const data = await adminApi.get<BlogPost[]>("/api/admin/blog");
    setPosts(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const columns: DataTableColumn<BlogPost>[] = [
    {
      header: "Post",
      render: (p) => (
        <div className="flex items-center gap-3">
          <div className="relative w-14 h-10 rounded-md overflow-hidden shrink-0 bg-white/5">
            {p.coverImage && <Image src={p.coverImage} alt={p.title} fill className="object-cover" unoptimized />}
          </div>
          <div>
            <p className="text-white">{p.title}</p>
            <p className="text-white/40 text-xs">{p.category}</p>
          </div>
        </div>
      ),
    },
    { header: "Author", render: (p) => <span className="text-white/60">{p.author}</span> },
    { header: "Date", render: (p) => <span className="text-white/60">{p.date}</span> },
    {
      header: "Status",
      render: (p) => (
        <span className={p.published ? "text-luxury-gold text-xs" : "text-white/30 text-xs"}>
          {p.published ? "Published" : "Draft"}
        </span>
      ),
    },
    {
      header: "Actions",
      render: (p) => (
        <div className="flex items-center gap-4">
          <Link
            href={`/admin/blog/${p.id}`}
            className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-luxury-gold transition-colors"
          >
            <HiOutlinePencil size={15} /> Edit
          </Link>
          <DeleteButton
            onDelete={async () => {
              await adminApi.delete(`/api/admin/blog/${p.id}`);
              load();
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <AdminPageHeader
        title="Blog Posts"
        description="Publish and manage articles for the site journal."
        action={
          <Button href="/admin/blog/new" className="!py-2.5 inline-flex items-center gap-2">
            <HiOutlinePlus /> New Post
          </Button>
        }
      />
      {loading ? (
        <p className="text-white/40">Loading...</p>
      ) : (
        <DataTable columns={columns} rows={posts} emptyMessage="No blog posts yet. Write your first one." />
      )}
    </div>
  );
}
