import Sidebar from "@/components/admin/Sidebar";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-black text-white font-body">
      <Sidebar />
      <main className="flex-1 min-w-0 px-6 md:px-10 py-8 md:py-10">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
