"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { HiOutlineUpload, HiOutlineX } from "react-icons/hi";
import { uploadImage, ApiError } from "@/lib/admin/api";

export default function ImageUploader({
  label,
  value,
  onChange,
  aspect = "aspect-video",
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  aspect?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const url = await uploadImage(file);
      onChange(url);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">{label}</label>

      <div className={`relative ${aspect} rounded-xl overflow-hidden border border-white/15 bg-white/5`}>
        {value ? (
          <Image src={value} alt={label} fill className="object-cover" unoptimized />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/30 text-sm">
            No image selected
          </div>
        )}

        {uploading && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-luxury-gold text-sm">
            Uploading...
          </div>
        )}

        {value && !uploading && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/70 flex items-center justify-center text-white/70 hover:text-red-400"
          >
            <HiOutlineX size={14} />
          </button>
        )}
      </div>

      <div className="flex items-center gap-3 mt-3">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-luxury-gold/40 text-luxury-gold text-xs uppercase tracking-wide hover:border-luxury-gold transition-colors"
        >
          <HiOutlineUpload size={14} />
          Upload Image
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
        <span className="text-white/30 text-xs">or paste a URL below</span>
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://... or /uploads/..."
        className="w-full mt-2 bg-white/5 border border-white/15 focus:border-luxury-gold rounded-lg px-3 py-2 text-xs outline-none transition-colors placeholder:text-white/30"
      />

      {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
    </div>
  );
}
