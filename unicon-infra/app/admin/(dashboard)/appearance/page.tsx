"use client";

import { FormEvent, useEffect, useState } from "react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import Banner from "@/components/admin/Banner";
import { ColorField, SelectField } from "@/components/admin/FormField";
import Button from "@/components/ui/Button";
import { adminApi, ApiError } from "@/lib/admin/api";
import { SiteSettings, ThemeSettings, ThemeColors } from "@/lib/types";
import { DISPLAY_FONTS, BODY_FONTS, buildGoogleFontsUrl, findFont } from "@/lib/fonts";

const DEFAULT_THEME: ThemeSettings = {
  colors: {
    gold: "#C8A96A",
    goldLight: "#E4CFA0",
    goldDark: "#9C7C43",
    black: "#000000",
    charcoal: "#0A0A0A",
    panel: "#111111",
    ivory: "#F5F2EC",
  },
  fonts: {
    display: "Playfair Display",
    body: "Inter",
  },
};

const COLOR_FIELDS: { key: keyof ThemeColors; label: string; hint?: string }[] = [
  { key: "gold", label: "Primary Accent", hint: "Buttons, links, highlights." },
  { key: "goldLight", label: "Accent — Light", hint: "Used in gradients & hover states." },
  { key: "goldDark", label: "Accent — Dark", hint: "Used in gradients & shadows." },
  { key: "ivory", label: "Ivory / Highlight Text" },
  { key: "black", label: "Background", hint: "Main page background." },
  { key: "charcoal", label: "Charcoal", hint: "Secondary section backgrounds." },
  { key: "panel", label: "Panel", hint: "Cards, glass panels, sidebar." },
];

export default function AdminAppearancePage() {
  const [theme, setTheme] = useState<ThemeSettings>(DEFAULT_THEME);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    adminApi.get<SiteSettings>("/api/admin/settings").then((data) => {
      setTheme(data.theme ?? DEFAULT_THEME);
      setLoading(false);
    });
  }, []);

  // Load the chosen Google Fonts into this admin page too, so the live
  // preview below actually renders in the selected typefaces.
  useEffect(() => {
    if (loading) return;
    const displayFont = findFont(theme.fonts.display, DISPLAY_FONTS);
    const bodyFont = findFont(theme.fonts.body, BODY_FONTS);
    const href = buildGoogleFontsUrl([displayFont, bodyFont]);
    const id = "appearance-preview-fonts";
    let link = document.getElementById(id) as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
    link.href = href;
  }, [theme.fonts.display, theme.fonts.body, loading]);

  const updateColor = (key: keyof ThemeColors, value: string) =>
    setTheme((prev) => ({ ...prev, colors: { ...prev.colors, [key]: value } }));

  const updateFont = (key: keyof ThemeSettings["fonts"], value: string) =>
    setTheme((prev) => ({ ...prev, fonts: { ...prev.fonts, [key]: value } }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      await adminApi.put("/api/admin/settings", { theme });
      setSuccess("Appearance saved. The live site updates on next page load.");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setTheme(DEFAULT_THEME);
    setSuccess("");
    setError("");
  };

  if (loading) return <p className="text-white/40">Loading...</p>;

  return (
    <div>
      <AdminPageHeader
        title="Colors & Fonts"
        description="Customize the color palette and typography used across the public website."
      />

      <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
        <Banner type="error" message={error} />
        <Banner type="success" message={success} />

        <div className="glass rounded-2xl p-6 md:p-8 space-y-5">
          <h3 className="font-display text-lg mb-2">Color Palette</h3>
          <p className="text-white/30 text-xs -mt-2 mb-2">
            These colors control the accent, background and panel colors used everywhere on the
            site — buttons, links, section backgrounds, cards and more.
          </p>
          <div className="grid sm:grid-cols-2 gap-5">
            {COLOR_FIELDS.map((field) => (
              <ColorField
                key={field.key}
                label={field.label}
                hint={field.hint}
                value={theme.colors[field.key]}
                onChange={(v) => updateColor(field.key, v)}
              />
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl p-6 md:p-8 space-y-5">
          <h3 className="font-display text-lg mb-2">Typography</h3>
          <p className="text-white/30 text-xs -mt-2 mb-2">
            Choose the fonts used for headings and body copy across the public website.
          </p>
          <SelectField
            label="Heading / Display Font"
            value={theme.fonts.display}
            onChange={(e) => updateFont("display", e.target.value)}
          >
            {DISPLAY_FONTS.map((f) => (
              <option key={f.name} value={f.name}>
                {f.name}
              </option>
            ))}
          </SelectField>
          <SelectField
            label="Body Font"
            value={theme.fonts.body}
            onChange={(e) => updateFont("body", e.target.value)}
          >
            {BODY_FONTS.map((f) => (
              <option key={f.name} value={f.name}>
                {f.name}
              </option>
            ))}
          </SelectField>

          <div className="rounded-lg border border-white/10 bg-black/40 p-5 space-y-2">
            <p className="text-white/30 text-xs uppercase tracking-wider mb-1">Live Preview</p>
            <p
              style={{ fontFamily: `'${theme.fonts.display}', serif` }}
              className="text-2xl md:text-3xl text-white"
            >
              Redefining Luxury Living
            </p>
            <p
              style={{ fontFamily: `'${theme.fonts.body}', sans-serif` }}
              className="text-sm text-white/60 max-w-md"
            >
              This is how paragraph and body text will look across the public website with the
              selected body font.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <Button type="submit" className="justify-center">
            {saving ? "Saving..." : "Save Appearance"}
          </Button>
          <button
            type="button"
            onClick={handleReset}
            className="text-sm text-white/40 hover:text-white/70 underline underline-offset-4"
          >
            Reset to defaults
          </button>
        </div>
      </form>
    </div>
  );
}
