import { ThemeSettings } from "@/lib/types";
import { hexToRgbTriplet } from "@/lib/theme";
import { DISPLAY_FONTS, BODY_FONTS, findFont, buildGoogleFontsUrl } from "@/lib/fonts";

// Renders the current admin-configured colors and fonts as CSS custom
// properties on :root, plus the Google Fonts stylesheet link needed to
// actually load the chosen typefaces. Meant to be placed inside <head> of
// the public site's root layout. Because the values come from the site
// settings (read fresh on every request), any change made in
// /admin/appearance takes effect immediately without a rebuild.
export default function ThemeStyleInjector({ theme }: { theme: ThemeSettings }) {
  const colors = theme?.colors;
  const displayFont = findFont(theme?.fonts?.display, DISPLAY_FONTS);
  const bodyFont = findFont(theme?.fonts?.body, BODY_FONTS);
  const fontsHref = buildGoogleFontsUrl([displayFont, bodyFont]);

  const css = `:root {
  --color-gold: ${hexToRgbTriplet(colors?.gold, "200 169 106")};
  --color-gold-light: ${hexToRgbTriplet(colors?.goldLight, "228 207 160")};
  --color-gold-dark: ${hexToRgbTriplet(colors?.goldDark, "156 124 67")};
  --color-black: ${hexToRgbTriplet(colors?.black, "0 0 0")};
  --color-charcoal: ${hexToRgbTriplet(colors?.charcoal, "10 10 10")};
  --color-panel: ${hexToRgbTriplet(colors?.panel, "17 17 17")};
  --color-ivory: ${hexToRgbTriplet(colors?.ivory, "245 242 236")};
  --font-display: '${displayFont.name}', serif;
  --font-body: '${bodyFont.name}', sans-serif;
}`;

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="stylesheet" href={fontsHref} />
      {/* eslint-disable-next-line react/no-danger */}
      <style dangerouslySetInnerHTML={{ __html: css }} />
    </>
  );
}
