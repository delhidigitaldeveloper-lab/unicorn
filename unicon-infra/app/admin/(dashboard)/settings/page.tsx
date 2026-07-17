"use client";

import { FormEvent, useEffect, useState } from "react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import Banner from "@/components/admin/Banner";
import ImageUploader from "@/components/admin/ImageUploader";
import { TextField, TextAreaField } from "@/components/admin/FormField";
import Button from "@/components/ui/Button";
import { adminApi, ApiError } from "@/lib/admin/api";
import { SiteSettings } from "@/lib/types";

const EMPTY: SiteSettings = {
  siteName: "",
  tagline: "",
  phone: "",
  email: "",
  address: "",
  siteIcon: "",
  logo: "",
  social: { instagram: "", facebook: "", linkedin: "", youtube: "" },
  instagramEmbedCode: "",
  youtubeChannelUrl: "",
  theme: {
    colors: {
      gold: "#C8A96A",
      goldLight: "#E4CFA0",
      goldDark: "#9C7C43",
      black: "#000000",
      charcoal: "#0A0A0A",
      panel: "#111111",
      ivory: "#F5F2EC",
    },
    fonts: { display: "Playfair Display", body: "Inter" },
  },
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    adminApi.get<SiteSettings>("/api/admin/settings").then((data) => {
      setSettings(data);
      setLoading(false);
    });
  }, []);

  const update = <K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) =>
    setSettings((prev) => ({ ...prev, [key]: value }));

  const updateSocial = (key: keyof SiteSettings["social"], value: string) =>
    setSettings((prev) => ({ ...prev, social: { ...prev.social, [key]: value } }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      await adminApi.put("/api/admin/settings", settings);
      setSuccess("Settings saved successfully.");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-white/40">Loading...</p>;

  return (
    <div>
      <AdminPageHeader
        title="Site Settings"
        description="Site icon, contact information and social media links used across the site."
      />

      <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
        <Banner type="error" message={error} />
        <Banner type="success" message={success} />

        <div className="glass rounded-2xl p-6 md:p-8 space-y-5">
          <h3 className="font-display text-lg mb-2">Branding</h3>
          <ImageUploader
            label="Logo (Navbar & Footer)"
            value={settings.logo}
            onChange={(url) => update("logo", url)}
            aspect="aspect-[3/1]"
          />
          <p className="text-white/30 text-xs -mt-2">
            Recommended: a transparent PNG or SVG, roughly 400×130px (wide format).
            If left empty, the site name is shown as styled text instead.
          </p>
          <ImageUploader
            label="Site Icon / Favicon"
            value={settings.siteIcon}
            onChange={(url) => update("siteIcon", url)}
            aspect="aspect-square"
          />
          <p className="text-white/30 text-xs -mt-2">
            Recommended: a square PNG or ICO, at least 512×512px. Note: browsers cache favicons
            aggressively, so you may need a hard refresh to see changes.
          </p>
          <TextField label="Site Name" required value={settings.siteName} onChange={(e) => update("siteName", e.target.value)} />
          <TextField label="Tagline" value={settings.tagline} onChange={(e) => update("tagline", e.target.value)} />
        </div>

        <div className="glass rounded-2xl p-6 md:p-8 space-y-5">
          <h3 className="font-display text-lg mb-2">Contact Information</h3>
          <TextField label="Phone Number" required value={settings.phone} onChange={(e) => update("phone", e.target.value)} />
          <TextField label="Email Address" required type="email" value={settings.email} onChange={(e) => update("email", e.target.value)} />
          <TextAreaField label="Office Address" rows={2} value={settings.address} onChange={(e) => update("address", e.target.value)} />
        </div>

        <div className="glass rounded-2xl p-6 md:p-8 space-y-5">
          <h3 className="font-display text-lg mb-2">Social Media Links</h3>
          <TextField
            label="Instagram"
            placeholder="https://instagram.com/yourhandle"
            value={settings.social.instagram}
            onChange={(e) => updateSocial("instagram", e.target.value)}
          />
          <TextField
            label="Facebook"
            placeholder="https://facebook.com/yourpage"
            value={settings.social.facebook}
            onChange={(e) => updateSocial("facebook", e.target.value)}
          />
          <TextField
            label="LinkedIn"
            placeholder="https://linkedin.com/company/yourcompany"
            value={settings.social.linkedin}
            onChange={(e) => updateSocial("linkedin", e.target.value)}
          />
          <TextField
            label="YouTube"
            placeholder="https://youtube.com/@yourchannel"
            value={settings.social.youtube}
            onChange={(e) => updateSocial("youtube", e.target.value)}
          />
        </div>

        <div className="glass rounded-2xl p-6 md:p-8 space-y-5">
          <h3 className="font-display text-lg mb-2">Home Page: Auto-Updating YouTube Video</h3>
          <p className="text-white/40 text-xs -mt-2">
            Add your channel once. The home page always shows your{" "}
            <span className="text-white/60">latest upload</span> automatically — no API key
            needed, and nothing to update when you post a new video.
          </p>
          <TextField
            label="YouTube Channel"
            placeholder="https://www.youtube.com/@yourchannel"
            value={settings.youtubeChannelUrl ?? ""}
            onChange={(e) => update("youtubeChannelUrl", e.target.value)}
            hint="Paste your channel URL (e.g. youtube.com/@yourchannel), your @handle, or your Channel ID (starts with UC...)."
          />
        </div>

        <div className="glass rounded-2xl p-6 md:p-8 space-y-5">
          <h3 className="font-display text-lg mb-2">Home Page: Auto-Updating Instagram Feed</h3>
          <p className="text-white/40 text-xs -mt-2">
            Instagram doesn&apos;t offer a free public API, so this uses a free widget service
            instead. One-time setup:
          </p>
          <ol className="text-white/40 text-xs list-decimal list-inside space-y-1 -mt-2">
            <li>
              Go to{" "}
              <a
                href="https://snapwidget.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-luxury-gold/70 hover:text-luxury-gold underline"
              >
                snapwidget.com
              </a>{" "}
              and sign up for a free account.
            </li>
            <li>Click &quot;Create a Widget&quot; → choose Instagram → connect or enter your @handle.</li>
            <li>Pick the &quot;Reels&quot; or grid layout, then open &quot;Get Code&quot;.</li>
            <li>Copy the full embed code shown and paste it below.</li>
          </ol>
          <TextAreaField
            label="Instagram Widget Embed Code"
            rows={4}
            placeholder='<iframe src="https://snapwidget.com/embed/XXXXXX" class="snapwidget-widget" allowtransparency="true" frameborder="0" scrolling="no" style="border:none; overflow:hidden; width:100%;"></iframe>'
            value={settings.instagramEmbedCode ?? ""}
            onChange={(e) => update("instagramEmbedCode", e.target.value)}
            hint="Whatever the widget service gives you, paste it here exactly as copied. New posts on Instagram will show up automatically."
          />
        </div>

        <Button type="submit" className="justify-center">
          {saving ? "Saving..." : "Save Settings"}
        </Button>
      </form>
    </div>
  );
}
