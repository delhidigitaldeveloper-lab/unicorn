"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import {
  HiOutlineViewGrid,
  HiOutlineOfficeBuilding,
  HiOutlineNewspaper,
  HiOutlineUserGroup,
  HiOutlineUser,
  HiOutlineChatAlt2,
  HiOutlinePhotograph,
  HiOutlineFilm,
  HiOutlineInboxIn,
  HiOutlineLibrary,
  HiOutlineSearchCircle,
  HiOutlineColorSwatch,
  HiOutlineCog,
  HiOutlineLogout,
  HiOutlineExternalLink,
} from "react-icons/hi";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: HiOutlineViewGrid, exact: true },
  { href: "/admin/projects", label: "Projects", icon: HiOutlineOfficeBuilding },
  { href: "/admin/blog", label: "Blog Posts", icon: HiOutlineNewspaper },
  { href: "/admin/team", label: "Team Members", icon: HiOutlineUserGroup },
  { href: "/admin/founder", label: "Founder Page", icon: HiOutlineUser },
  { href: "/admin/testimonials", label: "Testimonials", icon: HiOutlineChatAlt2 },
  { href: "/admin/joint-ventures", label: "Joint Ventures", icon: HiOutlineLibrary },
  { href: "/admin/gallery", label: "Gallery", icon: HiOutlinePhotograph },
  { href: "/admin/videos", label: "Home Videos", icon: HiOutlineFilm },
  { href: "/admin/submissions", label: "Form Submissions", icon: HiOutlineInboxIn },
  { href: "/admin/seo", label: "SEO Settings", icon: HiOutlineSearchCircle },
  { href: "/admin/appearance", label: "Colors & Fonts", icon: HiOutlineColorSwatch },
  { href: "/admin/settings", label: "Site Settings", icon: HiOutlineCog },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside className="w-64 shrink-0 h-screen sticky top-0 flex flex-col bg-luxury-panel border-r border-white/10">
      <div className="px-6 py-6 border-b border-white/10">
        <p className="font-display text-lg tracking-widest">
          UNICON <span className="text-gold-gradient">ADMIN</span>
        </p>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {NAV.map((item) => {
          const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                active
                  ? "bg-luxury-gold/15 text-luxury-gold border border-luxury-gold/30"
                  : "text-white/60 hover:text-white hover:bg-white/5 border border-transparent"
              )}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-white/10 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors"
        >
          <HiOutlineExternalLink size={18} />
          View Live Site
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/60 hover:text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <HiOutlineLogout size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
