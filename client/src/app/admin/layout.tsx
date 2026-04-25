import { ReactNode } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-[#1B1819] text-white">
            <AdminSidebar />
            <div className="pl-80 lg:pl-96">
                <header className="h-24 border-b border-white/5 flex items-center justify-between px-12 bg-[#1B1819]/80 backdrop-blur-md sticky top-0 z-40">
                    <div>
                        <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.4em] mb-1">Nexus / Module</p>
                        <h2 className="text-sm font-black uppercase tracking-widest text-white italic">Operational Hub Overview</h2>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="text-right">
                            <p className="text-xs font-black text-white">Super Admin</p>
                            <p className="text-[9px] text-brand-yellow font-black tracking-widest uppercase">Root Signal</p>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse" />
                        </div>
                    </div>
                </header>
                <main className="p-12 lg:p-20">
                    {children}
                </main>
            </div>
        </div>
    );
}
