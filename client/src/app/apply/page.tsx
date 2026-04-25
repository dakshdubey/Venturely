"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import api from "@/utils/api";
import SmoothScroll from "@/components/SmoothScroll";
import { Send, CheckCircle2, Target, Zap, Globe, Sparkles } from "lucide-react";

export default function ApplyPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        serviceType: "Web Platform",
        budget: "",
        description: "",
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        try {
            await api.post("/services/apply", formData);
            setStatus("success");
        } catch (error) {
            setStatus("error");
        }
    };

    if (status === "success") {
        return (
            <div className="min-h-screen bg-[#1B1819] text-white flex items-center justify-center p-6 architectural-bg font-sans italic uppercase">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-[#2A2728] p-24 rounded-[4rem] text-center border border-white/5 max-w-2xl shadow-3xl"
                >
                    <div className="w-24 h-24 bg-brand-yellow rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-brand-yellow/30">
                        <CheckCircle2 className="w-12 h-12 text-black" />
                    </div>
                    <h1 className="text-6xl font-black text-white italic tracking-tighter mb-8">Protocol <br /> Ingested.</h1>
                    <p className="text-white/40 text-lg normal-case not-italic font-bold mb-12 leading-relaxed">
                        Our tactical review team is now analyzing your structural brief. We will broadcast a response to <span className="text-brand-yellow">{formData.email}</span> within 24 operational hours.
                    </p>
                    <button
                        onClick={() => setStatus("idle")}
                        className="px-12 py-6 bg-brand-yellow text-black font-black uppercase tracking-widest rounded-full hover:scale-105 transition-all text-xs"
                    >
                        Return to Nexus
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <SmoothScroll>
            <main className="min-h-screen bg-[#1B1819] text-white selection:bg-brand-yellow selection:text-black font-sans architectural-bg overflow-hidden uppercase italic pb-40">
                <Navbar />

                <div className="pt-40 px-6 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-24"
                    >
                        <div className="inline-flex items-center gap-2 px-6 py-2 bg-white/5 border border-white/10 rounded-full text-[9px] font-black tracking-[0.4em] mb-10 text-brand-yellow">
                            Operational Intake
                        </div>
                        <h1 className="text-6xl md:text-[8rem] font-extrabold tracking-tighter leading-none mb-10 italic uppercase">Apply for <br /> <span className="text-brand-yellow">Forge.</span></h1>
                        <p className="text-white/30 text-lg italic normal-case not-italic font-bold">
                            Deploy your structural requirements to our tactical development lab.
                        </p>
                    </motion.div>

                    <motion.form
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="bg-[#2A2728] p-12 md:p-20 rounded-[4rem] border border-white/5 shadow-3xl space-y-12"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] pl-4">Full Identity</label>
                                <input
                                    required
                                    type="text"
                                    placeholder="ARCHITECT NAME"
                                    className="w-full bg-[#1B1819] border border-white/5 rounded-3xl px-8 py-5 text-lg font-bold text-white focus:outline-none focus:border-brand-yellow transition-all"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] pl-4">Transmission Relay</label>
                                <input
                                    required
                                    type="email"
                                    placeholder="SECURE_EMAIL@NEXUS.COM"
                                    className="w-full bg-[#1B1819] border border-white/5 rounded-3xl px-8 py-5 text-lg font-bold text-white focus:outline-none focus:border-brand-yellow transition-all"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] pl-4">Module Target</label>
                                <select
                                    className="w-full bg-[#1B1819] border border-white/5 rounded-3xl px-8 py-5 text-lg font-black text-brand-yellow focus:outline-none focus:border-brand-yellow appearance-none cursor-pointer"
                                    value={formData.serviceType}
                                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                                >
                                    <option>Web Platform</option>
                                    <option>Mobile System</option>
                                    <option>UI/UX Set</option>
                                    <option>Growth Marketing</option>
                                    <option>Cloud Infrastructure</option>
                                </select>
                            </div>
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] pl-4">Capital Allocation</label>
                                <input
                                    type="text"
                                    placeholder="TARGET BUDGET (₹)"
                                    className="w-full bg-[#1B1819] border border-white/5 rounded-3xl px-8 py-5 text-lg font-bold text-white focus:outline-none focus:border-brand-yellow transition-all"
                                    value={formData.budget}
                                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] pl-4">Project Manifesto</label>
                            <textarea
                                required
                                rows={6}
                                placeholder="DESCRIBE THE STRUCTURAL MISSION..."
                                className="w-full bg-[#1B1819] border border-white/5 rounded-[2.5rem] px-8 py-8 text-lg font-bold text-white focus:outline-none focus:border-brand-yellow transition-all"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>

                        <button
                            disabled={status === "loading"}
                            type="submit"
                            className="w-full py-8 bg-brand-yellow text-black text-xl font-black rounded-full flex items-center justify-center gap-6 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-3xl shadow-brand-yellow/20 disabled:opacity-50"
                        >
                            {status === "loading" ? "TRANSMITTING..." : <>TRANSMIT BRIEF <Send className="w-6 h-6" /></>}
                        </button>

                        {status === "error" && (
                            <p className="text-red-500 text-center text-[10px] font-black tracking-widest mt-4">CONNECTION REJECTED: RETRANSMIT SIGNAL</p>
                        )}
                    </motion.form>
                </div>
            </main>
        </SmoothScroll>
    );
}
