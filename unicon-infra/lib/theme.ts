// Converts a "#rrggbb" (or shorthand "#rgb") hex color into a space-separated
// "r g b" triplet, which is the format Tailwind expects for its
// `rgb(var(--x) / <alpha-value>)` opacity-aware color pattern. Falls back to
// `fallback` (also an "r g b" triplet) if the input isn't a valid hex color.
export function hexToRgbTriplet(hex: string | undefined | null, fallback = "0 0 0"): string {
  if (!hex) return fallback;
  const clean = hex.trim().replace(/^#/, "");
  const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
  if (!/^[0-9a-fA-F]{6}$/.test(full)) return fallback;
  const value = parseInt(full, 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `${r} ${g} ${b}`;
}
