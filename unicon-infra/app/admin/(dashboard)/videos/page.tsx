"use client";

import { FormEvent, useEffect, useState } from "react";
import { HiOutlinePlus, HiOutlineFilm } from "react-icons/hi";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import Banner from "@/components/admin/Banner";
import { TextField } from "@/components/admin/FormField";
import Button from "@/components/ui/Button";
import DeleteButton from "@/components/admin/DeleteButton";
import { adminApi, ApiError } from "@/lib/admin/api";
import { VideoItem } from "@/lib/types";

function getYoutubeThumbnail(url: string): string | null {
  const watch = url.match(/[?&]v=([A-Za-z0-9_-]{11})/);
  const short = url.match(/youtu\.be\/([A-Za-z0-9_-]{11})/);
  const embed = url.match(/youtube\.com\/embed\/([A-Za-z0-9_-]{11})/);
  const shorts = url.match(/youtube\.com\/shorts\/([A-Za-z0-9_-]{11})/);
  const id = watch?.[1] || short?.[1] || embed?.[1] || shorts?.[1] || null;
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
}

export default function AdminVideosPage() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");

  const load = async () => {
    setLoading(true);
    const data = await adminApi.get<VideoItem[]>("/api/admin/videos");
    setVideos(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!youtubeUrl.trim()) {
      setError("Please paste a YouTube video link first.");
      return;
    }
    if (!getYoutubeThumbnail(youtubeUrl.trim())) {
      setError("That doesn't look like a valid YouTube link.");
      return;
    }
    setSaving(true);
    try {
      await adminApi.post("/api/admin/videos", {
        youtubeUrl: youtubeUrl.trim(),
        order: videos.length + 1,
      });
      setYoutubeUrl("");
      setSuccess("Video added to the home page grid.");
      load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <AdminPageHeader
        title="Home Page Videos"
        description="Add YouTube video links to display as a video grid on the home page. No titles or descriptions needed — just the link."
      />

      <div className="glass rounded-2xl p-6 md:p-8 mb-10">
        <h3 className="font-display text-lg mb-5">Add New Video</h3>
        <Banner type="error" message={error} />
        <Banner type="success" message={success} />
        <form onSubmit={handleAdd} className="flex flex-col md:flex-row gap-4 md:items-end">
          <div className="flex-1">
            <TextField
              label="YouTube Video URL"
              placeholder="https://www.youtube.com/watch?v=XXXXXXXXXXX"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              hint="Works with youtube.com/watch?v=, youtu.be/ and youtube.com/shorts/ links."
            />
          </div>
          <Button type="submit" className="inline-flex items-center gap-2 justify-center md:mb-0">
            <HiOutlinePlus /> {saving ? "Adding..." : "Add Video"}
          </Button>
        </form>
      </div>

      {loading ? (
        <p className="text-white/40">Loading...</p>
      ) : videos.length === 0 ? (
        <div className="glass rounded-2xl p-16 text-center text-white/40">
          <HiOutlineFilm size={32} className="mx-auto mb-3 opacity-50" />
          No videos yet. Add your first YouTube link above — 3 or 4 look great in the home page
          grid.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {videos.map((video) => {
            const thumb = getYoutubeThumbnail(video.youtubeUrl);
            return (
              <div key={video.id} className="glass rounded-xl overflow-hidden group">
                <div className="relative aspect-video bg-black/40">
                  {thumb ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={thumb} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/20">
                      <HiOutlineFilm size={28} />
                    </div>
                  )}
                </div>
                <div className="p-3 flex items-center justify-between gap-2">
                  <p className="text-white/50 text-xs truncate">{video.youtubeUrl}</p>
                  <DeleteButton
                    label=""
                    onDelete={async () => {
                      await adminApi.delete(`/api/admin/videos/${video.id}`);
                      load();
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
