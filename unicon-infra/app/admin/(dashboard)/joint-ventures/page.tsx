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
import { JointVenture } from "@/lib/types";

export default function AdminJointVenturesPage() {
  const [ventures, setVentures] = useState<JointVenture[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const data = await adminApi.get<JointVenture[]>("/api/admin/joint-ventures");
    setVentures(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const columns: DataTableColumn<JointVenture>[] = [
    {
      header: "Partner",
      render: (v) => (
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 bg-white/5 border border-white/10">
            {v.logo && <Image src={v.logo} alt={v.name} fill className="object-cover" unoptimized />}
          </div>
          <p className="text-white">{v.name}</p>
        </div>
      ),
    },
    {
      header: "Description",
      render: (v) => <span className="text-white/50 line-clamp-1 max-w-xs block">{v.description}</span>,
    },
    { header: "Order", render: (v) => <span className="text-white/40">{v.order}</span> },
    {
      header: "Actions",
      render: (v) => (
        <div className="flex items-center gap-4">
          <Link
            href={`/admin/joint-ventures/${v.id}`}
            className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-luxury-gold transition-colors"
          >
            <HiOutlinePencil size={15} /> Edit
          </Link>
          <DeleteButton
            onDelete={async () => {
              await adminApi.delete(`/api/admin/joint-ventures/${v.id}`);
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
        title="Joint Ventures"
        description="Manage the partner companies shown on the public Joint Ventures page."
        action={
          <Button href="/admin/joint-ventures/new" className="!py-2.5 inline-flex items-center gap-2">
            <HiOutlinePlus /> Add Partner
          </Button>
        }
      />
      {loading ? (
        <p className="text-white/40">Loading...</p>
      ) : (
        <DataTable columns={columns} rows={ventures} emptyMessage="No joint venture partners yet." />
      )}
    </div>
  );
}
