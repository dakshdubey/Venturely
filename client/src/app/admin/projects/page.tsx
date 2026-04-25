"use client";

import { useEffect, useState } from "react";
import api from "@/utils/api";
import { motion } from "framer-motion";
import {
    FolderKanban,
    Upload,
    Plus,
    MoreVertical
} from "lucide-react";

export default function AdminProjectsPage() {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setProjects([
            { id: 1, title: "E-Commerce Rebranding", client: "Elon Musk", status: "in_progress", progress: 65 },
            { id: 2, title: "AI Dashboard Concept", client: "Jeff Bezos", status: "pending", progress: 0 },
            { id: 3, title: "Mobile Game UI", client: "Satya Nadella", status: "completed", progress: 100 },
        ]);
        setLoading(false);
    }, []);

    return (
        <div className="space-y-20">
            <div className="flex justify-between items-end border-b border-white/5 pb-12">
                <div>
                    <h1 className="text-6xl font-serif italic text-white leading-none">Deployment Queue.</h1>
                    <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] mt-6 italic">Monitoring active structural artifacts</p>
                </div>
                <button className="button-pill !py-5 !px-10 flex items-center gap-4">
                    <Plus className="w-5 h-5" /> New Deployment
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {projects.map((project, idx) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1, duration: 1 }}
                        className="bg-[#2A2728] border border-white/5 p-12 rounded-[4rem] group hover:-translate-y-2 transition-all duration-700 cursor-pointer"
                    >
                        <div className="flex justify-between items-start mb-12">
                            <div className="w-16 h-16 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center p-4">
                                <FolderKanban className={`w-8 h-8 ${project.status === 'completed' ? 'text-green-500' : 'text-brand-yellow'}`} />
                            </div>
                            <button className="text-white/10 hover:text-white transition-colors">
                                <MoreVertical className="w-6 h-6" />
                            </button>
                        </div>

                        <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-2">{project.title}</h3>
                        <p className="text-[10px] text-white/20 font-black uppercase tracking-[0.4em] mb-12 italic">{project.client}</p>

                        <div className="space-y-6">
                            <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.5em] text-white/40">
                                <span>Phase Progress</span>
                                <span>{project.progress}%</span>
                            </div>
                            <div className="w-full h-4 bg-[#1B1819] rounded-full overflow-hidden p-1">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${project.progress}%` }}
                                    transition={{ duration: 1.5, ease: "circOut" }}
                                    className="h-full bg-brand-yellow rounded-full shadow-[0_0_15px_rgba(255,209,0,0.3)]"
                                />
                            </div>
                        </div>

                        <div className="mt-12">
                            <button className="w-full py-5 bg-white/5 border border-white/5 rounded-full text-[10px] font-black text-white hover:bg-brand-yellow hover:text-black transition-all uppercase tracking-widest flex items-center justify-center gap-4">
                                <Upload className="w-4 h-4" /> Push Artifacts
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
