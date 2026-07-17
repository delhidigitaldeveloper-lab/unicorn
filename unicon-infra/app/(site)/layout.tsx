import type { Metadata } from "next";

import "../globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CursorEffect from "@/components/layout/CursorEffect";
import PageLoader from "@/components/layout/PageLoader";
import ThemeStyleInjector from "@/components/layout/ThemeStyleInjector";
import { getSiteSettings } from "@/lib/db/repositories";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const name = settings.siteName || "Unicon Infra";

  return {
    metadataBase: new URL("https://www.uniconinfra.com"),
    title: {
      default: `${name} | Premium Luxury Real Estate`,
      template: `%s | ${name}`,
    },
    description:
      "Unicon Infra crafts India's most exclusive luxury residences, villas, commercial towers and townships — where architecture meets art.",
    keywords: [
      "luxury real estate",
      "Unicon Infra",
      "luxury apartments Gurugram",
      "premium villas India",
      "luxury property developer",
    ],
    icons: {
      icon: settings.siteIcon || "/favicon.ico",
    },
    openGraph: {
      title: `${name} | Premium Luxury Real Estate`,
      description: "Redefining luxury living with iconic residences, villas & townships.",
      url: "https://www.uniconinfra.com",
      siteName: name,
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} | Premium Luxury Real Estate`,
      description: "Redefining luxury living with iconic residences, villas & townships.",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <html lang="en">
      <head>
        <ThemeStyleInjector theme={settings.theme} />
      </head>
      <body className="bg-black text-white font-body antialiased selection:bg-luxury-gold selection:text-black">
        <PageLoader />
        <CursorEffect />
        <Navbar settings={settings} />
        <main>{children}</main>
        <Footer settings={settings} />
      </body>
    </html>
  );
}
