"use client";

import { useEffect, useState } from "react";
import api from "@/utils/api";
import { motion } from "framer-motion";
import {
    Package,
    Clock,
    CheckCircle2,
    FileDown,
    ExternalLink,
    MessageCircle,
    ArrowRight
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ClientDashboard() {
    const [project, setProject] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProject();
    }, []);

    const fetchProject = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const { data: userData } = await api.get("/auth/me");
            setProject({
                title: "E-Commerce Rebranding",
                status: "in_progress",
                progress: 65,
                updates: [
                    { text: "System architecture mapped and validated.", time: "2 hours ago" },
                    { text: "UI Modular system approved by commander.", time: "2 days ago" },
                    { text: "Initial probe launched.", time: "5 days ago" }
                ],
                files: [
                    { name: "Brand_Protocol.pdf", size: "2.4 MB" },
                    { name: "Logic_Pack.zip", size: "15 MB" }
                ]
            });
        } catch (error) {
            console.error("Nexus Auth Denied:", error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "pending": return <Clock className="w-5 h-5 text-brand-yellow" />;
            case "in_progress": return <Package className="w-5 h-5 text-brand-yellow animate-pulse" />;
            case "completed": return <CheckCircle2 className="w-5 h-5 text-green-400" />;
            default: return null;
        }
    };

    if (loading) return <div className="min-h-screen bg-[#1B1819] flex items-center justify-center text-brand-yellow font-black tracking-[0.5em] uppercase animate-pulse">Initializing Nexus...</div>;

    return (
        <main className="min-h-screen bg-[#1B1819] p-6 lg:p-20 architectural-bg">
            <div className="max-w-7xl mx-auto space-y-12">
                {/* Header */}
                <header className="flex justify-between items-center bg-[#2A2728] border border-white/5 px-12 py-8 rounded-[3rem]">
                    <div className="flex items-center gap-4">
                        <Image src="/logo.png" alt="Logo" width={32} height={32} className="invert brightness-200" />
                        <span className="text-2xl font-black tracking-tighter text-white italic">VENTURELY</span>
                    </div>
                    <div className="flex items-center gap-10">
                        <Link href="/" className="text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors">Abort to Home</Link>
                        <button className="button-pill !py-3 !px-8 text-[10px]">Sign Out</button>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Info */}
                    <div className="lg:col-span-2 space-y-12">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-[#2A2728] border border-white/5 p-16 rounded-[4rem] relative overflow-hidden group shadow-2xl"
                        >
                            <div className="absolute top-0 right-0 p-16 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Package className="w-60 h-60 text-brand-yellow" />
                            </div>
                            <div className="flex items-center gap-3 mb-8">
                                <span className="text-[10px] font-black text-brand-yellow uppercase tracking-[0.4em]">Active Deployment</span>
                                <div className="flex-1 h-[1px] bg-white/5" />
                            </div>
                            <h1 className="text-6xl font-black text-white italic tracking-tighter mb-6">{project.title}</h1>
                            <div className="flex items-center gap-4 mb-16">
                                <div className="flex items-center gap-3 px-6 py-2 bg-white/5 rounded-full border border-white/10">
                                    {getStatusIcon(project.status)}
                                    <span className="text-[10px] font-black text-white uppercase tracking-widest">{project.status.replace('_', ' ')}</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.4em] text-white/40">
                                    <span>Structural Integrity</span>
                                    <span>{project.progress}%</span>
                                </div>
                                <div className="w-full h-4 bg-[#1B1819] rounded-full overflow-hidden p-1 border border-white/5">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${project.progress}%` }}
                                        transition={{ duration: 1.5, ease: "circOut" }}
                                        className="h-full bg-brand-yellow rounded-full shadow-[0_0_20px_rgba(255,209,0,0.4)]"
                                    />
                                </div>
                            </div>
                        </motion.div>

                        <div className="bg-[#2A2728] border border-white/5 p-16 rounded-[4rem] space-y-12">
                            <h3 className="text-2xl font-black text-white mb-8 flex items-center gap-4 uppercase italic">
                                <Clock className="w-6 h-6 text-brand-yellow" /> Transmission History
                            </h3>
                            <div className="space-y-12 relative">
                                <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-white/5" />
                                {project.updates.map((update: any, idx: number) => (
                                    <div key={idx} className="relative pl-12 group">
                                        <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-[#1B1819] border-4 border-brand-yellow/20 group-hover:border-brand-yellow transition-all z-10" />
                                        <p className="text-xl font-bold text-white group-hover:text-brand-yellow transition-all">{update.text}</p>
                                        <p className="text-[10px] text-white/20 uppercase tracking-widest mt-2 font-black italic">{update.time}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-12">
                        <div className="bg-[#2A2728] border border-white/5 p-12 rounded-[4rem]">
                            <h3 className="text-xl font-black text-white mb-10 flex items-center gap-4 uppercase italic">
                                <FileDown className="w-5 h-5 text-brand-yellow" /> Digital Artifacts
                            </h3>
                            <div className="space-y-6">
                                {project.files.map((file: any, idx: number) => (
                                    <div key={idx} className="p-6 bg-[#1B1819] border border-white/5 rounded-3xl flex items-center justify-between hover:border-brand-yellow transition-all cursor-pointer group">
                                        <div>
                                            <p className="text-sm font-black text-white group-hover:text-brand-yellow transition-all">{file.name}</p>
                                            <p className="text-[10px] text-white/20 uppercase tracking-widest mt-1">{file.size}</p>
                                        </div>
                                        <ExternalLink className="w-5 h-5 text-white/10 group-hover:text-white" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-brand-yellow p-12 rounded-[4rem] group shadow-2xl shadow-brand-yellow/10">
                            <h3 className="text-2xl font-black text-black mb-4 uppercase italic">Direct Relay</h3>
                            <p className="text-black/60 font-bold text-sm mb-12 leading-relaxed">Need structural changes? Connect with your dedicated nexus commander.</p>
                            <button className="w-full py-6 bg-black text-white font-black rounded-full flex items-center justify-center gap-4 hover:scale-[1.02] transition-all">
                                <MessageCircle className="w-5 h-5" /> START SECURE CHAT
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
