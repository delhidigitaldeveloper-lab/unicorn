// Curated Google Font choices for the Admin "Colors & Fonts" page.
// Keep this list reasonably short and hand-picked so every option looks good
// with the site's luxury aesthetic. `weights` is passed straight into the
// Google Fonts CSS2 API url (wght@...).

export interface FontOption {
  name: string;
  weights: string;
}

export const DISPLAY_FONTS: FontOption[] = [
  { name: "Playfair Display", weights: "400;500;600;700;800" },
  { name: "Cormorant Garamond", weights: "400;500;600;700" },
  { name: "Marcellus", weights: "400" },
  { name: "Cinzel", weights: "400;500;600;700" },
  { name: "Prata", weights: "400" },
  { name: "Libre Baskerville", weights: "400;700" },
  { name: "Fraunces", weights: "400;500;600;700" },
];

export const BODY_FONTS: FontOption[] = [
  { name: "Inter", weights: "300;400;500;600;700" },
  { name: "Poppins", weights: "300;400;500;600;700" },
  { name: "Lato", weights: "300;400;700" },
  { name: "Manrope", weights: "300;400;500;600;700" },
  { name: "Nunito Sans", weights: "300;400;600;700" },
  { name: "Work Sans", weights: "300;400;500;600;700" },
  { name: "Jost", weights: "300;400;500;600" },
];

export function findFont(name: string | undefined, list: FontOption[]): FontOption {
  return list.find((f) => f.name === name) ?? list[0];
}

/** Builds a single Google Fonts CSS2 stylesheet URL for the given fonts. */
export function buildGoogleFontsUrl(fonts: FontOption[]): string {
  const params = fonts
    .map((f) => `family=${f.name.replace(/ /g, "+")}:wght@${f.weights}`)
    .join("&");
  return `https://fonts.googleapis.com/css2?${params}&display=swap`;
}
