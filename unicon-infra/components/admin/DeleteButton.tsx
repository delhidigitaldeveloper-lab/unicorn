"use client";

import { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";

export default function DeleteButton({
  onDelete,
  label = "Delete",
}: {
  onDelete: () => Promise<void> | void;
  label?: string;
}) {
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onDelete();
    } finally {
      setLoading(false);
      setConfirming(false);
    }
  };

  if (confirming) {
    return (
      <span className="inline-flex items-center gap-2">
        <button
          onClick={handleConfirm}
          disabled={loading}
          className="text-xs px-2.5 py-1 rounded-md bg-red-500/20 text-red-400 border border-red-500/40 hover:bg-red-500/30 transition-colors"
        >
          {loading ? "Deleting..." : "Confirm"}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="text-xs px-2.5 py-1 rounded-md border border-white/15 text-white/50 hover:text-white transition-colors"
        >
          Cancel
        </button>
      </span>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-red-400 transition-colors"
      title={label}
    >
      <HiOutlineTrash size={15} />
      {label}
    </button>
  );
}
