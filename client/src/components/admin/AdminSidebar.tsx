"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
    LayoutDashboard,
    Inbox,
    FileText,
    FolderKanban,
    Users,
    Settings,
    LogOut
} from "lucide-react";

const menuItems = [
    { icon: LayoutDashboard, label: "Overview", href: "/admin" },
    { icon: Inbox, label: "Signals", href: "/admin/requests" },
    { icon: FileText, label: "Protocols", href: "/admin/quotations" },
    { icon: FolderKanban, label: "Artifacts", href: "/admin/projects" },
    { icon: Users, label: "Entities", href: "/admin/clients" },
    { icon: Settings, label: "Nexus", href: "/admin/settings" },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-80 lg:w-96 h-screen fixed left-0 top-0 border-r border-white/5 bg-[#1B1819] p-12 flex flex-col z-50">
            <div className="flex items-center gap-4 mb-20 group">
                <div className="w-10 h-10 bg-brand-yellow rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-500 shadow-xl shadow-brand-yellow/20">
                    <Image src="/logo.png" alt="Logo" width={20} height={20} />
                </div>
                <span className="text-xl font-black tracking-tighter text-white uppercase italic">V-LAB</span>
            </div>

            <nav className="flex-1 space-y-4">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-6 px-8 py-6 rounded-[2rem] transition-all duration-500 text-[10px] font-black uppercase tracking-[0.2em] relative overflow-hidden group ${isActive
                                    ? "bg-brand-yellow text-black"
                                    : "text-white/40 hover:text-white hover:bg-white/5"
                                }`}
                        >
                            <item.icon className={`w-5 h-5 ${isActive ? "text-black" : "group-hover:text-brand-yellow"} transition-colors`} />
                            {item.label}
                            {isActive && <div className="absolute right-8 w-2 h-2 rounded-full bg-black" />}
                        </Link>
                    );
                })}
            </nav>

            <button className="mt-auto flex items-center gap-6 px-8 py-6 rounded-[2rem] text-white/20 hover:text-red-500 hover:bg-red-500/5 transition-all text-[10px] font-black uppercase tracking-[0.2em] border border-dashed border-white/5">
                <LogOut className="w-5 h-5" />
                Terminate Signal
            </button>
        </aside>
    );
}
