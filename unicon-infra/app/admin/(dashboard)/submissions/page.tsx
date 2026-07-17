"use client";

import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import DataTable, { DataTableColumn } from "@/components/admin/DataTable";
import DeleteButton from "@/components/admin/DeleteButton";
import { adminApi } from "@/lib/admin/api";
import { ContactSubmission, SubmissionType } from "@/lib/types";

const FILTERS: { label: string; value: SubmissionType | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Contact Form", value: "contact" },
  { label: "Site Visit", value: "site-visit" },
  { label: "Brochure Requests", value: "brochure" },
];

export default function AdminSubmissionsPage() {
  const [items, setItems] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<SubmissionType | "all">("all");

  const load = async () => {
    setLoading(true);
    const data = await adminApi.get<ContactSubmission[]>("/api/admin/submissions");
    setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(
    () => (filter === "all" ? items : items.filter((s) => s.type === filter)),
    [items, filter]
  );

  const columns: DataTableColumn<ContactSubmission>[] = [
    {
      header: "From",
      render: (s) => (
        <div>
          <p className={clsx("text-white", !s.read && "font-semibold")}>{s.name}</p>
          <p className="text-white/40 text-xs flex items-center gap-3 mt-0.5">
            <span className="flex items-center gap-1">
              <HiOutlineMail size={12} /> {s.email}
            </span>
            {s.phone && (
              <span className="flex items-center gap-1">
                <HiOutlinePhone size={12} /> {s.phone}
              </span>
            )}
          </p>
        </div>
      ),
    },
    {
      header: "Type",
      render: (s) => (
        <span className="text-xs uppercase tracking-wide text-luxury-gold">
          {s.type.replace("-", " ")}
        </span>
      ),
    },
    { header: "Project", render: (s) => <span className="text-white/60">{s.project || "—"}</span> },
    {
      header: "Message",
      render: (s) => <p className="text-white/50 text-sm max-w-xs truncate">{s.message || "—"}</p>,
    },
    {
      header: "Received",
      render: (s) => (
        <span className="text-white/40 text-xs">
          {new Date(s.createdAt).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
      ),
    },
    {
      header: "Actions",
      render: (s) => (
        <div className="flex items-center gap-4">
          <button
            onClick={async () => {
              await adminApi.patch(`/api/admin/submissions/${s.id}`, { read: !s.read });
              load();
            }}
            className="text-xs text-white/50 hover:text-luxury-gold transition-colors"
          >
            {s.read ? "Mark Unread" : "Mark Read"}
          </button>
          <DeleteButton
            onDelete={async () => {
              await adminApi.delete(`/api/admin/submissions/${s.id}`);
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
        title="Form Submissions"
        description="Contact form, site visit and brochure requests from your website."
      />

      <div className="flex flex-wrap gap-2 mb-6">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={clsx(
              "px-4 py-2 rounded-full text-xs uppercase tracking-wide border transition-colors",
              filter === f.value
                ? "bg-gold-gradient text-black border-transparent"
                : "border-white/15 text-white/60 hover:border-luxury-gold hover:text-luxury-gold"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-white/40">Loading...</p>
      ) : (
        <DataTable columns={columns} rows={filtered} emptyMessage="No submissions yet." />
      )}
    </div>
  );
}
