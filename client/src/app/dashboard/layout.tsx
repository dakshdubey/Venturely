import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="bg-[#1B1819] min-h-screen text-white font-sans overflow-x-hidden selection:bg-brand-yellow selection:text-black">
            {children}
        </div>
    );
}
