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
import { TeamMember } from "@/lib/types";

export default function AdminTeamPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const data = await adminApi.get<TeamMember[]>("/api/admin/team");
    setTeam(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const columns: DataTableColumn<TeamMember>[] = [
    {
      header: "Member",
      render: (m) => (
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 bg-white/5">
            {m.image && <Image src={m.image} alt={m.name} fill className="object-cover" unoptimized />}
          </div>
          <p className="text-white">{m.name}</p>
        </div>
      ),
    },
    { header: "Role", render: (m) => <span className="text-white/60">{m.role}</span> },
    { header: "Order", render: (m) => <span className="text-white/40">{m.order}</span> },
    {
      header: "Actions",
      render: (m) => (
        <div className="flex items-center gap-4">
          <Link
            href={`/admin/team/${m.id}`}
            className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-luxury-gold transition-colors"
          >
            <HiOutlinePencil size={15} /> Edit
          </Link>
          <DeleteButton
            onDelete={async () => {
              await adminApi.delete(`/api/admin/team/${m.id}`);
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
        title="Team Members"
        description="Manage leadership profiles shown on the About page."
        action={
          <Button href="/admin/team/new" className="!py-2.5 inline-flex items-center gap-2">
            <HiOutlinePlus /> Add Member
          </Button>
        }
      />
      {loading ? (
        <p className="text-white/40">Loading...</p>
      ) : (
        <DataTable columns={columns} rows={team} emptyMessage="No team members yet." />
      )}
    </div>
  );
}
