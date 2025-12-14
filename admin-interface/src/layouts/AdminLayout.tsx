import { ReactNode } from "react";
import { Sidebar } from "../components/Sidebar";

interface AdminLayoutProps {
  children: ReactNode;
  title?: string;
}

export function AdminLayout({ children, title }: AdminLayoutProps) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
         {/* Top Header */}
         <header className="flex h-16 items-center justify-between border-b bg-white px-8">
            <div className="flex items-center gap-4">
               <h1 className="text-xl font-bold text-gray-800">{title || "Dashboard"}</h1>
               <span className="text-gray-400">▼</span>
            </div>

            <div className="flex items-center gap-4">
                <input 
                  type="text" 
                  placeholder="Search anything..." 
                  className="rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 text-sm outline-none focus:border-primary w-64"
                />
                <button className="flex items-center gap-2 rounded-full bg-black px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-gray-800">
                    <span>Add new product</span>
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white text-black text-xs">+</span>
                </button>
            </div>
         </header>

        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
