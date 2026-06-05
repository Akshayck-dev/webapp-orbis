import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";

export const metadata = {
  title: "Admin Dashboard | WebApp Orbis",
  description: "WebApp Orbis Admin Control Panel",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FCFCFC] text-[#17204E] flex">
      {/* Sidebar - Fixed width 64 (16rem / 256px) */}
      <Sidebar />
      
      {/* Main Content Area - offset by sidebar width */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-1 p-8 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
