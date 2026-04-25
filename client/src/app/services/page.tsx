"use client";

import Navbar from "@/components/Navbar";
import {
    Play,
    Code,
    Smartphone,
    Palette,
    Target,
    Cpu,
    ShieldCheck,
    Zap
} from "lucide-react";
import { motion } from "framer-motion";
import SmoothScroll from "@/components/SmoothScroll";
import Link from "next/link";

const services = [
    { title: "Web Architecture", description: "Bespoke full-stack web platforms engineered for scale and extreme velocity using Modern Stacks.", price: "Starts ₹15k", icon: Code },
    { title: "Mobile Ecosystems", description: "Native-quality iOS & Android applications with seamless cross-platform protocols.", price: "Starts ₹25k", icon: Smartphone },
    { title: "Interface Narratives", description: "Cinematic UI/UX systems focused on high-conversion visual storytelling and empathy.", price: "Starts ₹10k", icon: Palette },
    { title: "Growth Marketing", description: "Performance-driven digital marketing and SEO protocols to scale your entity's reach.", price: "Starts ₹12k", icon: Target },
    { title: "Cloud Infrastructure", description: "Secure backend protocols, database engineering, and server-side optimization.", price: "Starts ₹20k", icon: Cpu },
    { title: "Technical Consulting", description: "Deep-dive structural audits and strategic tech roadmapping for startups.", price: "Starts ₹8k", icon: ShieldCheck },
];

export default function ServicesPage() {
    return (
        <SmoothScroll>
            <main className="min-h-screen bg-[#1B1819] text-white selection:bg-brand-yellow selection:text-black font-sans architectural-bg overflow-hidden uppercase italic">
                <Navbar />

                <div className="pt-40 pb-20 px-6 md:px-20 max-w-screen-2xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: "circOut" }}
                        className="mb-32"
                    >
                        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/40 mb-10">
                            Service Spectrum
                        </div>
                        <h1 className="text-6xl md:text-[8rem] font-extrabold tracking-tighter leading-[0.9] text-white mb-12 uppercase">Modular <br /> <span className="text-brand-yellow">Stack.</span></h1>
                        <p className="text-white/40 font-bold max-w-2xl text-lg leading-relaxed italic normal-case not-italic tracking-wide">
                            Venturely provides high-velocity tech engineering modules. From core web infrastructure to cinematic mobile experiences, we deploy elite solutions at competitive startup-scale pricing.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-[#2A2728] border border-white/5 rounded-[3.5rem] p-12 group cursor-pointer hover:-translate-y-2 transition-all duration-700 shadow-2xl"
                            >
                                <div className="w-16 h-16 rounded-3xl bg-brand-yellow flex items-center justify-center mb-10 group-hover:rotate-12 transition-transform shadow-lg shadow-brand-yellow/20">
                                    <service.icon className="w-8 h-8 text-black" />
                                </div>
                                <h3 className="text-2xl font-black mb-4 italic transition-colors group-hover:text-brand-yellow uppercase tracking-tighter">{service.title}</h3>
                                <p className="text-white/30 font-bold text-xs leading-relaxed mb-10 normal-case not-italic">{service.description}</p>
                                <div className="flex justify-between items-center pt-8 border-t border-white/5">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-brand-yellow">{service.price}</span>
                                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-brand-yellow group-hover:text-black transition-all">
                                        →
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="mt-60 bg-brand-yellow rounded-[4rem] p-16 md:p-24 text-center border border-black/5 relative overflow-hidden shadow-3xl text-black"
                    >
                        <div className="absolute top-0 right-0 w-80 h-80 bg-black/5 blur-[120px]" />
                        <div className="flex justify-center mb-12">
                            <Zap className="w-16 h-16 animate-bounce" />
                        </div>
                        <h2 className="text-5xl md:text-8xl font-black italic mb-10 tracking-tighter uppercase">Higher Quality. <br /> Lower Friction.</h2>
                        <p className="text-black/60 text-xl font-bold max-w-2xl mx-auto leading-relaxed mb-16 italic normal-case not-italic">
                            "Every digital artifact from our lab is a monument of precision. We've optimized our structural workflows to deliver elite work at prices that empower startups."
                        </p>
                        <Link href="/apply" className="px-16 py-8 bg-black text-white rounded-full text-lg font-black uppercase tracking-widest hover:scale-105 transition-all">Start Your Mission</Link>
                    </motion.div>
                </div>

                <footer className="py-20 px-6 border-t border-white/5 text-center text-[10px] font-black uppercase text-white/10 tracking-[0.6em] italic">
                    © 2026 VENTURELY. GLOBAL TECH ARCHITECTURE. ALL RIGHTS RESERVED.
                </footer>
            </main>
        </SmoothScroll>
    );
}
