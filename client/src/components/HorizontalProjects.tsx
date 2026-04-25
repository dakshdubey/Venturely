"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ChevronRight, ChevronLeft, ArrowRight } from "lucide-react";

const projects = [
    { title: "Fin Nexus Hub", category: "Mobile System", img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c" },
    { title: "Elite SaaS v4", category: "Web Ecosystem", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f" },
    { title: "Brand Kinetics", category: "UI/UX Protocol", img: "https://images.unsplash.com/photo-1558655146-d09347e92766" },
    { title: "Logic Probe", category: "Backend Core", img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c" },
];

export default function HorizontalProjects() {
    const targetRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"]
    });

    useEffect(() => {
        return scrollYProgress.onChange((v) => {
            setActiveIndex(Math.floor(v * projects.length));
        });
    }, [scrollYProgress]);

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

    const scrollToIndex = (index: number) => {
        if (!targetRef.current) return;
        const offsetTop = targetRef.current.offsetTop;
        const scrollHeight = targetRef.current.scrollHeight;
        const viewportHeight = window.innerHeight;

        const targetY = offsetTop + (index / projects.length) * (scrollHeight - viewportHeight);

        window.scrollTo({
            top: targetY,
            behavior: "smooth"
        });
    };

    return (
        <section ref={targetRef} className="relative h-[200vh] bg-[#1B1819] border-t border-white/5 px-0">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <motion.div style={{ x }} className="flex gap-32 px-32">
                    <div className="flex-shrink-0 w-[600px] flex flex-col justify-center border-r border-white/5 pr-32">
                        <p className="text-[11px] font-black text-brand-yellow uppercase tracking-[1em] mb-8 italic opacity-60">Elite Archive</p>
                        <h2 className="text-7xl md:text-9xl font-black italic text-white leading-[0.8] tracking-tighter mb-12 uppercase">
                            Selected <br /> <span className="text-white/10">Artifacts.</span>
                        </h2>
                        <p className="text-sm font-bold text-white/30 uppercase tracking-[0.5em] leading-relaxed italic border-t border-white/5 pt-12">
                            Superior Web & App deployments produced at absolute velocity.
                        </p>

                        <div className="flex gap-6 mt-16">
                            <button
                                onClick={() => scrollToIndex(Math.max(activeIndex - 1, 0))}
                                className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-yellow hover:text-black transition-all duration-500 shadow-3xl group"
                                aria-label="Previous"
                            >
                                <ChevronLeft className="w-8 h-8 group-hover:-translate-x-1 transition-transform" />
                            </button>
                            <button
                                onClick={() => scrollToIndex(Math.min(activeIndex + 1, projects.length))}
                                className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-yellow hover:text-black transition-all duration-500 shadow-3xl group"
                                aria-label="Next"
                            >
                                <ChevronRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>

                        <div className="flex gap-3 mt-10">
                            {projects.map((_, i) => (
                                <div key={i} className={`h-1 transition-all duration-700 ${activeIndex === i ? 'w-12 bg-brand-yellow' : 'w-4 bg-white/10'}`} />
                            ))}
                        </div>
                    </div>

                    {projects.map((project, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 0.98, y: -10 }}
                            className="group relative h-[650px] w-[950px] overflow-hidden rounded-[5rem] bg-[#2A2728] border border-white/5 cursor-pointer shadow-[0_50px_120px_rgba(0,0,0,0.7)] hover:border-brand-yellow/30 transition-all duration-700"
                            onClick={() => scrollToIndex(i + 1)}
                        >
                            <Image
                                src={`${project.img}?auto=format&fit=crop&q=80&w=1200`}
                                alt={project.title}
                                fill
                                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                                unoptimized
                            />
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent p-20 pt-40">
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-brand-yellow font-black uppercase tracking-[0.8em] text-[11px] mb-6">Module {i + 1} / {project.category}</p>
                                        <h3 className="text-6xl md:text-7xl font-black italic text-white leading-none tracking-tighter uppercase">{project.title}</h3>
                                    </div>
                                    <div className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-brand-yellow group-hover:text-black transition-all duration-700">
                                        <ArrowRight className="w-8 h-8" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* Final Call Offset */}
                    <div className="flex-shrink-0 w-[400px]" />
                </motion.div>
            </div>
        </section>
    );
}
