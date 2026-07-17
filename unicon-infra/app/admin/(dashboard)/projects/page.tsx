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
import { Project } from "@/lib/types";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const data = await adminApi.get<Project[]>("/api/admin/projects");
    setProjects(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const columns: DataTableColumn<Project>[] = [
    {
      header: "Project",
      render: (p) => (
        <div className="flex items-center gap-3">
          <div className="relative w-14 h-10 rounded-md overflow-hidden shrink-0 bg-white/5">
            {p.coverImage && (
              <Image src={p.coverImage} alt={p.name} fill className="object-cover" unoptimized />
            )}
          </div>
          <div>
            <p className="text-white">{p.name}</p>
            <p className="text-white/40 text-xs">{p.location}</p>
          </div>
        </div>
      ),
    },
    { header: "Category", render: (p) => <span className="text-white/60">{p.category}</span> },
    { header: "Status", render: (p) => <span className="text-luxury-gold text-xs">{p.status}</span> },
    { header: "Price", render: (p) => <span className="text-white/60">{p.priceRange}</span> },
    {
      header: "Actions",
      render: (p) => (
        <div className="flex items-center gap-4">
          <Link
            href={`/admin/projects/${p.id}`}
            className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-luxury-gold transition-colors"
          >
            <HiOutlinePencil size={15} /> Edit
          </Link>
          <DeleteButton
            onDelete={async () => {
              await adminApi.delete(`/api/admin/projects/${p.id}`);
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
        title="Projects"
        description="Manage every project listing shown on the public site."
        action={
          <Button href="/admin/projects/new" className="!py-2.5 inline-flex items-center gap-2">
            <HiOutlinePlus /> Add Project
          </Button>
        }
      />
      {loading ? (
        <p className="text-white/40">Loading...</p>
      ) : (
        <DataTable columns={columns} rows={projects} emptyMessage="No projects yet. Add your first one." />
      )}
    </div>
  );
}
