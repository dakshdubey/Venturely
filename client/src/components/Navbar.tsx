"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Navbar() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed top-6 inset-x-0 z-[100] flex justify-center px-6 pointer-events-none">
            <motion.nav
                initial={{ y: -60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-[95vw] pointer-events-auto bg-black/70 backdrop-blur-3xl border border-white/10 rounded-full py-4 px-16 flex items-center justify-between shadow-[0_25px_100px_rgba(0,0,0,0.95)]"
            >
                <div className="flex items-center gap-16">
                    <Link href="/" className="flex items-center gap-6 group">
                        <div className="w-11 h-11 rounded-full flex items-center justify-center bg-white/10 border border-white/5 transition-all duration-500 group-hover:scale-110 shadow-lg relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-tr from-brand-yellow/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <Image src="/logo.png" alt="Logo" width={22} height={22} className="invert opacity-90 relative z-10" />
                        </div>
                        <span className="text-2xl font-black tracking-[0.1em] uppercase italic text-white/95">Venturely.</span>
                    </Link>

                    <div className="hidden lg:flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.5em] text-white/40">
                        <span className="mx-4 text-white/5 font-thin tracking-normal">|</span>
                        <Link href="/services" className="hover:text-white transition-colors">Capability Stack</Link>
                        <span className="mx-4 text-white/5 font-thin tracking-normal">|</span>
                        <Link href="/about" className="hover:text-white transition-colors">Innovation Lab</Link>
                    </div>
                </div>

                <div className="flex items-center gap-12">
                    <Link href="/dashboard" className="hidden sm:block text-[11px] font-black uppercase tracking-[0.5em] text-white/30 hover:text-white transition-colors">Access Nexus</Link>
                    <Link
                        href="/apply"
                        className="px-14 py-3.5 bg-gradient-to-r from-[#8B5CF6] via-[#A855F7] to-[#7C3AED] text-black text-[11px] font-black uppercase tracking-[0.2em] rounded-full shadow-[0_10px_35px_rgba(139,92,246,0.4)] hover:shadow-[0_0_55px_rgba(168,85,247,0.6)] hover:-translate-y-1 active:translate-y-0 transition-all duration-500"
                    >
                        Forge Project
                    </Link>
                </div>
            </motion.nav>
        </div>
    );
}
