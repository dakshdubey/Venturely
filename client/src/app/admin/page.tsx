"use client";

import { useEffect, useState } from "react";
import api from "@/utils/api";
import { motion } from "framer-motion";
import {
    TrendingUp,
    Users,
    Briefcase,
    CreditCard,
    ArrowRight,
    Shield,
    Zap
} from "lucide-react";
import Link from "next/link";

export default function AdminOverview() {
    const [stats, setStats] = useState({
        requests: 0,
        activeProjects: 0,
        totalRevenue: 250000,
        clients: 12
    });

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const { data: requests } = await api.get("/services/all");
            setStats(prev => ({
                ...prev,
                requests: requests.length,
                activeProjects: requests.filter((r: any) => r.status === 'quoted').length,
            }));
        } catch (error) {
            console.error(error);
        }
    };

    const statCards = [
        { label: "Signal Intake", value: stats.requests, icon: Briefcase, color: "text-brand-yellow" },
        { label: "Deployments", value: stats.activeProjects, icon: TrendingUp, color: "text-brand-yellow" },
        { label: "Capital Scale", value: `₹${stats.totalRevenue.toLocaleString()}`, icon: CreditCard, color: "text-brand-yellow" },
        { label: "Entity Database", value: stats.clients, icon: Users, color: "text-brand-yellow" },
    ];

    return (
        <div className="space-y-16">
            <div className="flex justify-between items-end border-b border-white/5 pb-12">
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-widest text-white/40">
                        System Diagnostic v2.4
                    </div>
                    <h1 className="text-7xl font-extrabold italic text-white tracking-tighter leading-none">Command Center.</h1>
                    <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em] mt-4 italic leading-relaxed">Monitoring global structural deployments and financial throughput</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {statCards.map((stat, idx) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1, duration: 1 }}
                        className="bg-[#2A2728] border border-white/5 rounded-[3.5rem] p-10 group hover:-translate-y-2 transition-all duration-700 cursor-pointer shadow-xl"
                    >
                        <div className="w-12 h-12 rounded-2xl bg-[#1B1819] border border-white/10 flex items-center justify-center mb-8 group-hover:bg-brand-yellow transition-colors">
                            <stat.icon className={`w-6 h-6 ${stat.color} group-hover:text-black transition-colors`} />
                        </div>
                        <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mb-4 italic">{stat.label}</p>
                        <h3 className="text-4xl font-extrabold italic text-white leading-none tracking-tighter">{stat.value}</h3>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 bg-[#2A2728] border border-white/5 rounded-[4rem] p-16 flex flex-col justify-between h-[600px] shadow-2xl relative overflow-hidden">
                    <div className="absolute bottom-0 right-0 p-16 opacity-5">
                        <Shield className="w-64 h-64 text-brand-yellow" />
                    </div>
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-4xl font-extrabold italic text-white leading-none">Yield Analysis.</h3>
                            <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mt-4">Fiscal mapping Q1/2026</p>
                        </div>
                        <div className="flex gap-4">
                            {["1M", "1W", "1D"].map(t => <button key={t} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[9px] font-black hover:bg-brand-yellow hover:text-black transition-all">{t}</button>)}
                        </div>
                    </div>

                    <div className="flex-1 flex items-end gap-2 px-10 py-20 relative z-10">
                        {[30, 45, 40, 85, 55, 75, 90, 100, 60, 40, 95, 80].map((h, i) => (
                            <motion.div
                                key={i}
                                initial={{ height: 0 }}
                                animate={{ height: `${h}%` }}
                                transition={{ delay: i * 0.05 + 0.5, duration: 1.5, ease: "circOut" }}
                                className="flex-1 bg-white/5 hover:bg-brand-yellow transition-all duration-700 rounded-t-xl group relative"
                            >
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-[8px] font-black text-brand-yellow transition-opacity">₹{h}k</div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="flex justify-between text-[10px] font-black text-white/10 uppercase tracking-[0.4em] border-t border-white/5 pt-10">
                        <span>Nexus Point Zero</span>
                        <span>Central Relay</span>
                        <span>Final Edge</span>
                    </div>
                </div>

                <div className="bg-[#2A2728] border border-white/5 rounded-[4rem] p-12 flex flex-col justify-between shadow-2xl">
                    <div className="space-y-12">
                        <h3 className="text-xl font-extrabold text-white uppercase tracking-widest italic border-b border-white/5 pb-8 flex items-center gap-4">
                            <Zap className="w-5 h-5 text-brand-yellow" /> Activity Feed.
                        </h3>
                        <div className="space-y-10">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="flex gap-6 items-start group">
                                    <div className="w-2 h-2 rounded-full bg-brand-yellow/20 group-hover:bg-brand-yellow mt-1 transition-colors" />
                                    <div>
                                        <p className="text-sm font-bold text-white uppercase tracking-tighter leading-none mb-2 group-hover:text-brand-yellow transition-colors cursor-pointer">Protocol Signal Received</p>
                                        <p className="text-[8px] text-white/20 font-black uppercase tracking-[0.3em]">2 mins ago // entity_id: 812</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Link href="/admin/requests" className="button-pill w-full text-center mt-12 flex justify-between items-center group">
                        Manage Queue <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
