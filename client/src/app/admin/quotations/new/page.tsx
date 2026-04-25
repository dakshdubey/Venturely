"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import api from "@/utils/api";
import { motion } from "framer-motion";
import { Plus, Trash2, Send, ChevronLeft, Zap } from "lucide-react";
import Link from "next/link";

export default function NewQuotationPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const requestId = searchParams.get("requestId");
    const clientEmail = searchParams.get("email");
    const clientName = searchParams.get("name");
    const serviceType = searchParams.get("service");

    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState([{ description: serviceType || "", amount: 0 }]);

    const addItem = () => setItems([...items, { description: "", amount: 0 }]);
    const removeItem = (idx: number) => setItems(items.filter((_, i) => i !== idx));
    const updateItem = (idx: number, field: string, value: any) => {
        const newItems = [...items];
        (newItems[idx] as any)[field] = value;
        setItems(newItems);
    };

    const total = items.reduce((sum, item) => sum + Number(item.amount), 0);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await api.post("/quotations", {
                requestId,
                clientEmail,
                clientName,
                amount: total,
                breakdown: items
            });
            router.push("/admin/requests");
        } catch (error) {
            alert("Transmission failure.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-16">
            <Link href="/admin/requests" className="inline-flex items-center gap-3 text-white/20 hover:text-white transition-colors group text-[10px] font-black uppercase tracking-[0.4em] italic mb-8">
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-all" /> Return to Queue
            </Link>

            <div className="bg-[#2A2728] border border-white/5 rounded-[4rem] p-16 flex flex-col lg:flex-row justify-between items-end gap-16 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-16 opacity-5">
                    <Zap className="w-60 h-60 text-brand-yellow" />
                </div>
                <div className="lg:w-2/3 space-y-6">
                    <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-widest text-brand-yellow">
                        Quotation Forge Protocol
                    </div>
                    <h1 className="text-7xl font-extrabold italic text-white tracking-tighter leading-none">Forge <br /> <span className="text-white/20">Protocol.</span></h1>
                    <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em] italic">ENTITY: {clientName} // RELAY: {clientEmail}</p>
                </div>
                <div className="text-right">
                    <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mb-6 italic">Total Resource Allocation</p>
                    <p className="text-8xl font-serif italic text-brand-yellow leading-none tracking-tighter">₹{total.toLocaleString()}</p>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-12"
            >
                <div className="bg-[#2A2728] border border-white/5 rounded-[4rem] p-16 space-y-12">
                    {items.map((item, idx) => (
                        <div key={idx} className="grid grid-cols-12 gap-12 items-end pb-12 border-b border-white/5 group">
                            <div className="col-span-8 space-y-6">
                                <label className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em] italic pl-2">Module Description 0{idx + 1}</label>
                                <input
                                    type="text"
                                    placeholder="Define structural parameters..."
                                    className="w-full bg-[#1B1819] border border-white/5 rounded-3xl px-8 py-6 text-2xl font-bold text-white focus:outline-none focus:border-brand-yellow transition-all"
                                    value={item.description}
                                    onChange={(e) => updateItem(idx, "description", e.target.value)}
                                />
                            </div>
                            <div className="col-span-3 space-y-6">
                                <label className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em] italic pl-2">Resource Allocation (₹)</label>
                                <input
                                    type="number"
                                    placeholder="0"
                                    className="w-full bg-[#1B1819] border border-white/5 rounded-3xl px-8 py-6 text-2xl font-bold text-brand-yellow focus:outline-none focus:border-brand-yellow transition-all"
                                    value={item.amount}
                                    onChange={(e) => updateItem(idx, "amount", e.target.value)}
                                />
                            </div>
                            <div className="col-span-1 flex items-center justify-center mb-6">
                                {items.length > 1 && (
                                    <button onClick={() => removeItem(idx)} className="w-12 h-12 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center">
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}

                    <button
                        onClick={addItem}
                        className="w-full py-8 bg-white/5 border border-dashed border-white/10 rounded-[3rem] text-white/40 hover:bg-white/5 hover:text-white hover:border-white transition-all text-[11px] font-black uppercase tracking-[0.5em] italic flex items-center justify-center gap-6"
                    >
                        <Plus className="w-6 h-6" /> Ingest Logic Module
                    </button>
                </div>

                <div className="flex justify-end pt-12">
                    <button
                        disabled={loading}
                        onClick={handleSubmit}
                        className="button-pill !py-8 !px-20 text-lg flex items-center gap-8 group"
                    >
                        {loading ? "TRANSMITTING..." : <>TRANSMIT FORGE RESULTS <Send className="w-6 h-6 group-hover:translate-x-2 transition-transform" /></>}
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
