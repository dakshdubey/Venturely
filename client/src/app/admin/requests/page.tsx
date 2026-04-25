"use client";

import { useEffect, useState } from "react";
import api from "@/utils/api";
import { motion, AnimatePresence } from "framer-motion";
import {
    BadgeCheck,
    XCircle,
    FilePlus2,
    ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function RequestsPage() {
    const [requests, setRequests] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const { data } = await api.get("/services/all");
            setRequests(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id: number, status: string) => {
        try {
            await api.patch(`/services/${id}/status`, { status });
            fetchRequests();
        } catch (error) {
            alert("Error updating status");
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "pending": return "text-brand-yellow/40 border-white/10";
            case "reviewed": return "text-brand-yellow border-brand-yellow/30";
            case "quoted": return "text-white border-white";
            case "rejected": return "text-white/10 border-dashed border-white/5";
            default: return "text-white/40 border-white/10";
        }
    };

    return (
        <div className="space-y-20">
            <div className="flex justify-between items-end border-b border-white/5 pb-12">
                <div>
                    <h1 className="text-6xl font-black italic text-white tracking-tighter">Inbound Signal.</h1>
                    <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] mt-6 italic">Strategic architectural intake queue</p>
                </div>
                <div className="text-[10px] font-black text-brand-yellow uppercase tracking-[0.3em] font-mono">
                    ACTIVE_THREADS: {requests.length}
                </div>
            </div>

            <div className="bg-[#2A2728] border border-white/5 rounded-[3rem] overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-white/5 border-b border-white/5 text-[10px] uppercase font-black tracking-[0.4em] text-white/20">
                        <tr>
                            <th className="px-12 py-10">Entity</th>
                            <th className="px-12 py-10">Module</th>
                            <th className="px-12 py-10">Scale</th>
                            <th className="px-12 py-10">Protocol State</th>
                            <th className="px-12 py-10 text-right">Command</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        <AnimatePresence>
                            {requests.map((request, idx) => (
                                <motion.tr
                                    key={request.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="hover:bg-white/5 transition-colors group"
                                >
                                    <td className="px-12 py-12">
                                        <div className="flex flex-col">
                                            <span className="text-2xl font-black italic text-white tracking-tighter">{request.name}</span>
                                            <span className="text-[10px] font-black text-white/20 uppercase tracking-widest mt-2">{request.email}</span>
                                        </div>
                                    </td>
                                    <td className="px-12 py-12">
                                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-yellow">{request.serviceType}</div>
                                    </td>
                                    <td className="px-12 py-12">
                                        <div className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">{request.budget}</div>
                                    </td>
                                    <td className="px-12 py-12">
                                        <span className={`px-4 py-2 border rounded-full text-[9px] font-black uppercase tracking-widest transition-colors ${getStatusColor(request.status)}`}>
                                            {request.status}
                                        </span>
                                    </td>
                                    <td className="px-12 py-12 text-right">
                                        <div className="flex justify-end gap-6 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                            {request.status === 'pending' && (
                                                <button
                                                    onClick={() => updateStatus(request.id, 'reviewed')}
                                                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-yellow hover:text-black transition-all"
                                                >
                                                    <BadgeCheck className="w-5 h-5" />
                                                </button>
                                            )}
                                            {request.status !== 'quoted' && (
                                                <Link
                                                    href={`/admin/quotations/new?requestId=${request.id}&email=${request.email}&name=${request.name}&service=${request.serviceType}`}
                                                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all"
                                                >
                                                    <FilePlus2 className="w-5 h-5" />
                                                </Link>
                                            )}
                                            <button
                                                onClick={() => updateStatus(request.id, 'rejected')}
                                                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
                                            >
                                                <XCircle className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
