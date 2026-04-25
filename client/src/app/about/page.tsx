"use client";

import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import SmoothScroll from "@/components/SmoothScroll";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Code, Cpu, Zap, Target, Layers } from "lucide-react";

export default function AboutPage() {
    return (
        <SmoothScroll>
            <main className="min-h-screen bg-[#1B1819] text-white selection:bg-brand-yellow selection:text-black font-sans architectural-bg overflow-hidden uppercase italic">
                <Navbar />

                <div className="pt-40 pb-40 px-6 md:px-20 max-w-screen-2xl mx-auto space-y-40">
                    {/* Manifesto Pivot */}
                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1.2 }}
                            className="space-y-12"
                        >
                            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/40">
                                The Dev Lab
                            </div>
                            <h1 className="text-7xl md:text-[8rem] font-extrabold tracking-tighter leading-[0.85] text-white uppercase italic">Modern <br /> <span className="text-brand-yellow">Artifacts.</span></h1>
                            <p className="text-xl font-bold text-white/40 leading-relaxed max-w-xl italic normal-case not-italic tracking-wide">
                                Venturely is a high-performance technology laboratory bridging the gap between cinematic design and modular software engineering since 2026.
                            </p>
                            <div className="flex gap-10">
                                <div className="text-center">
                                    <p className="text-4xl font-black text-brand-yellow">₹15k+</p>
                                    <p className="text-[9px] text-white/20 uppercase tracking-widest mt-2">Base Budget</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-4xl font-black text-brand-yellow">200+</p>
                                    <p className="text-[9px] text-white/20 uppercase tracking-widest mt-2">Cycles Shipped</p>
                                </div>
                            </div>
                        </motion.div>
                        <div className="relative h-[650px] rounded-[4rem] overflow-hidden border border-white/10 group shadow-3xl">
                            <Image
                                src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1200"
                                fill
                                alt="Dev Team"
                                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                            />
                        </div>
                    </section>

                    {/* Tech Principles */}
                    <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: Code, title: "Precision", body: "Every line of code is architected with structural integrity and performance as the primary directive." },
                            { icon: Layers, title: "Efficiency", body: "We use automated modular workflows to deliver high-end tech at significantly reduced costs." },
                            { icon: Target, title: "Velocity", body: "High-performance execution cycles that ship complex digital artifacts at extreme startup speed." }
                        ].map((item, i) => (
                            <div key={i} className="bg-[#2A2728] border border-white/5 p-14 rounded-[3.5rem] space-y-8 group shadow-2xl">
                                <div className="w-16 h-16 rounded-3xl bg-brand-yellow flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-brand-yellow/20">
                                    <item.icon className="w-8 h-8 text-black" />
                                </div>
                                <h3 className="text-3xl font-black italic uppercase tracking-tighter">{item.title}</h3>
                                <p className="text-white/30 font-bold text-sm leading-relaxed normal-case not-italic">{item.body}</p>
                            </div>
                        ))}
                    </section>

                    {/* Call to Forge */}
                    <section className="bg-brand-yellow rounded-[4rem] p-16 md:p-24 text-black flex flex-col md:flex-row justify-between items-center gap-12 shadow-3xl">
                        <div className="md:w-2/3 space-y-6">
                            <h2 className="text-5xl md:text-8xl font-black tracking-tighter italic uppercase leading-none">Forge Your Mission.</h2>
                            <p className="text-black/50 font-bold text-xl normal-case not-italic">Premium development without the enterprise price tag.</p>
                        </div>
                        <Link href="/apply" className="px-16 py-8 bg-black text-white rounded-full text-lg font-black uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-5 group">
                            Apply Now <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </section>
                </div>

                <footer className="py-20 px-6 border-t border-white/5 text-center text-[10px] font-black uppercase text-white/10 tracking-[0.6em] italic">
                    © 2026 VENTURELY. ALL SYSTEMS NOMINAL.
                </footer>
            </main>
        </SmoothScroll>
    );
}
