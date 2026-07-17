"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { HiOutlinePlus, HiOutlinePencil, HiStar } from "react-icons/hi";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import DataTable, { DataTableColumn } from "@/components/admin/DataTable";
import DeleteButton from "@/components/admin/DeleteButton";
import Button from "@/components/ui/Button";
import { adminApi } from "@/lib/admin/api";
import { Testimonial } from "@/lib/types";

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const data = await adminApi.get<Testimonial[]>("/api/admin/testimonials");
    setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const columns: DataTableColumn<Testimonial>[] = [
    {
      header: "Person",
      render: (t) => (
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 bg-white/5">
            {t.image && <Image src={t.image} alt={t.name} fill className="object-cover" unoptimized />}
          </div>
          <div>
            <p className="text-white">{t.name}</p>
            <p className="text-white/40 text-xs">{t.role}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Quote",
      render: (t) => <p className="text-white/60 text-sm max-w-xs truncate">{t.quote}</p>,
    },
    {
      header: "Rating",
      render: (t) => (
        <div className="flex gap-0.5">
          {Array.from({ length: t.rating }).map((_, i) => (
            <HiStar key={i} className="text-luxury-gold" size={13} />
          ))}
        </div>
      ),
    },
    {
      header: "Actions",
      render: (t) => (
        <div className="flex items-center gap-4">
          <Link
            href={`/admin/testimonials/${t.id}`}
            className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-luxury-gold transition-colors"
          >
            <HiOutlinePencil size={15} /> Edit
          </Link>
          <DeleteButton
            onDelete={async () => {
              await adminApi.delete(`/api/admin/testimonials/${t.id}`);
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
        title="Testimonials"
        description="Manage reviews shown in the homepage carousel."
        action={
          <Button href="/admin/testimonials/new" className="!py-2.5 inline-flex items-center gap-2">
            <HiOutlinePlus /> Add Testimonial
          </Button>
        }
      />
      {loading ? (
        <p className="text-white/40">Loading...</p>
      ) : (
        <DataTable columns={columns} rows={items} emptyMessage="No testimonials yet." />
      )}
    </div>
  );
}
