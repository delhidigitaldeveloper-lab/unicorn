import type { Metadata } from "next";

import "../globals.css";

export const metadata: Metadata = {
  title: "Admin Panel | Unicon Infra",
  description: "Content management panel for the Unicon Infra website.",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white font-body antialiased">{children}</body>
    </html>
  );
}
