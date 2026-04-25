"use client";

import { motion } from "framer-motion";
import { Play, Code, Smartphone, Palette, MoveRight, Activity } from "lucide-react";
import Navbar from "@/components/Navbar";
import HorizontalProjects from "@/components/HorizontalProjects";
import SmoothScroll from "@/components/SmoothScroll";
import CircularGallery from "@/components/CircularGallery";
import Link from "next/link";
import Image from "next/image";
import StaggerText from "@/components/StaggerText";

const services = [
  { title: "Web Architecture", desc: "Complex SaaS ecosystems and high-load web platforms architected with React & Next.js.", img: "https://images.unsplash.com/photo-1547658719-da2b51169166", price: "Starts ₹15,000" },
  { title: "Mobile Systems", desc: "High-end native-quality applications with absolute structural integrity across iOS/Android.", img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c", price: "Starts ₹25,000" },
  { title: "UI/UX Dynamics", desc: "Cinematic, high-fidelity visual design protocols that maximize user retention and brand equity.", img: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c", price: "Starts ₹10,000" }
];

const galleryItems = [
  { image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f", text: "Nexus Web" },
  { image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c", text: "Fin App" },
  { image: "https://images.unsplash.com/photo-1558655146-d09347e92766", text: "Kinetics" },
  { image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c", text: "Logic" },
  { image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085", text: "Terminal" },
  { image: "https://images.unsplash.com/photo-1504868584819-f8e90526354a", text: "Data Viz" },
];

export default function Home() {
  return (
    <SmoothScroll>
      <main className="text-white selection:bg-brand-yellow selection:text-black min-h-screen font-sans architectural-bg overflow-hidden uppercase italic relative">
        <Navbar />

        {/* Status Badge */}
        <div className="fixed bottom-10 left-10 z-[100] hidden lg:flex items-center gap-4 bg-black/40 backdrop-blur-3xl border border-white/5 px-6 py-3 rounded-full shadow-2xl transition-all hover:border-brand-yellow/50 group cursor-help">
          <Activity className="w-4 h-4 text-brand-yellow animate-pulse" />
          <div className="flex flex-col">
            <span className="text-[8px] font-black tracking-[0.3em] text-white/40 leading-none">System Status</span>
            <span className="text-[10px] font-black text-brand-yellow leading-tight">STABLE / OPTIMAL</span>
          </div>
        </div>

        {/* Elite Cinematic Hero */}
        <section className="relative h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden">
          <div className="absolute inset-0 z-0 scale-110 opacity-10">
            <Image
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2000"
              fill
              alt="Code Nexus"
              className="object-cover grayscale brightness-[0.4] blur-[3px]"
              priority
            />
          </div>

          <div className="max-w-[100rem] space-y-12 relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.8em] text-white/50 mx-auto backdrop-blur-xl mt-20"
            >
              <span className="w-2 h-2 rounded-full bg-brand-yellow shadow-[0_0_15px_#FFD100]" /> High-End Tech Lab
            </motion.div>

            <h1 className="text-6xl md:text-[11rem] font-black tracking-tighter leading-[0.85] text-white italic drop-shadow-2xl max-w-7xl mx-auto">
              <StaggerText text="Think Big. Build Better." />
            </h1>

            <p className="text-white/40 font-bold max-w-3xl mx-auto text-base leading-relaxed md:text-2xl normal-case not-italic tracking-tight drop-shadow-lg">
              Professional Web & App Development for those who demand excellence. <br />
              Elite execution. Startup-friendly pricing. Absolute structural integrity.
            </p>

            <div className="flex flex-wrap justify-center gap-8 mt-20">
              <Link href="/apply" className="button-pill !text-xs !py-8 !px-20 flex items-center gap-6 group hover:translate-y-[-10px]">
                Forge Your Project <MoveRight className="w-6 h-6 group-hover:translate-x-4 transition-transform duration-700" />
              </Link>
              <Link href="/services" className="px-14 py-8 border border-white/10 rounded-full text-[11px] font-black uppercase tracking-[0.5em] hover:bg-white/5 backdrop-blur-sm transition-all duration-500 hover:border-brand-yellow/30">
                View Capability Stack
              </Link>
            </div>
          </div>
        </section>

        {/* Global Sections */}
        <section className="py-40 px-6 max-w-screen-2xl mx-auto">
          <div className="glass-card border-white/10 relative overflow-hidden group">
            <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-brand-yellow/[0.04] blur-[180px] rounded-full group-hover:scale-110 transition-transform duration-1000" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center relative z-10">
              <div className="space-y-16">
                <div className="space-y-8">
                  <p className="text-brand-yellow text-[11px] font-black uppercase tracking-[1em] opacity-60">Corporate Mission</p>
                  <h2 className="text-6xl md:text-[10rem] font-black text-white leading-none tracking-tighter italic uppercase">Alpha <span className="text-brand-yellow">Work.</span> <br /> Beta Prices.</h2>
                </div>
                <div className="space-y-12 text-white/40 text-xl md:text-3xl leading-relaxed font-bold normal-case not-italic">
                  <p>
                    Venturely is the tactical benchmark for mid-to-large scale digital artifacts. We bridge the gap between boutique design quality and scalable enterprise engineering.
                  </p>
                  <div className="p-14 bg-white/[0.01] border-l-8 border-brand-yellow rounded-tr-[4rem] rounded-br-[4rem] italic backdrop-blur-3xl">
                    <p className="text-brand-yellow/80 leading-relaxed tracking-tight">
                      "We provide higher structural quality at a fraction of the traditional agency burn rate. Precision is our only currency."
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative h-[800px] w-full rounded-[4rem] overflow-hidden border border-white/10 group shadow-3xl">
                <Image
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1200"
                  fill
                  alt="Agency Tech"
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/20 transition-all duration-1000 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-brand-yellow flex items-center justify-center cursor-pointer shadow-[0_0_50px_#FFD100]">
                    <Play className="w-12 h-12 text-black fill-black ml-2" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-40 md:py-64 px-6 max-w-screen-2xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-20 mb-32">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[1em] text-brand-yellow mb-10 underline decoration-4 underline-offset-[16px]">Tactical Engineering</p>
              <h2 className="text-7xl md:text-[12rem] font-black text-white tracking-tighter italic uppercase leading-none">The Stack.</h2>
            </div>
            <Link href="/services" className="button-pill !py-8 !px-20 !text-[11px]">Explore Lab Spectrum</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 relative z-20">
            {services.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -20, rotateY: 2, rotateX: -2 }}
                className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[5rem] overflow-hidden group cursor-pointer shadow-[0_40px_100px_rgba(0,0,0,0.8)] hover:border-brand-yellow/30 transition-all duration-700"
              >
                <div className="relative h-96 w-full overflow-hidden">
                  <Image
                    src={`${item.img}?auto=format&fit=crop&q=80&w=800`}
                    fill
                    alt={item.title}
                    className="object-cover group-hover:scale-125 transition-transform duration-1000 grayscale group-hover:grayscale-0 shadow-inner"
                  />
                  <div className="absolute top-10 left-10 bg-brand-yellow text-black text-[11px] font-black py-2.5 px-8 rounded-full shadow-2xl tracking-widest">{item.price}</div>
                </div>
                <div className="p-16 space-y-10 relative">
                  <h3 className="text-4xl font-black text-white italic transition-all group-hover:text-brand-yellow group-hover:translate-x-4 tracking-tighter">{item.title}</h3>
                  <p className="text-white/30 text-base leading-relaxed font-bold normal-case not-italic">{item.desc}</p>
                  <button className="w-full py-7 bg-white/5 border border-white/10 rounded-full text-[11px] font-black uppercase tracking-[0.6em] hover:bg-brand-yellow hover:text-black hover:scale-105 transition-all duration-500 shadow-2xl">Deploy Module</button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Innovation Spectrum */}
        <section className="py-20 md:py-40">
          <div className="px-6 mb-20 max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="space-y-4">
              <p className="text-[11px] font-black uppercase tracking-[1em] text-brand-yellow opacity-60 italic">Interactive Nexus</p>
              <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-none">Innovation <br /> <span className="text-white/10">Spectrum.</span></h2>
            </div>
            <div className="max-w-md text-white/30 text-right font-bold text-sm tracking-tight normal-case not-italic">
              Explore our diverse lab outputs through a non-linear curvature. <br /> Drag to rotate the artifact sphere.
            </div>
          </div>

          <div className="h-[700px] w-full relative">
            <CircularGallery
              items={galleryItems}
              bend={3}
              textColor="#FFD100"
              borderRadius={0.1}
              scrollEase={0.02}
            />
          </div>
        </section>

        <HorizontalProjects />

        {/* Footer */}
        <footer className="py-64 px-6 border-t border-white/5 architectural-bg italic relative overflow-hidden">
          <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-40 items-end relative z-10">
            <div className="space-y-16">
              <div className="flex items-center gap-8">
                <div className="w-24 h-24 bg-white/5 rounded-[2.5rem] flex items-center justify-center border border-white/10 overflow-hidden shadow-2xl group cursor-pointer hover:rotate-12 transition-transform duration-500">
                  <Image src="/logo.png" alt="Logo" width={48} height={48} className="invert brightness-200 group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-5xl font-black tracking-tighter uppercase italic text-white drop-shadow-2xl">Venturely.</span>
              </div>
              <p className="text-lg font-bold text-white/20 max-w-sm leading-relaxed uppercase tracking-[0.4em] normal-case not-italic">
                The premier benchmark for architectural digital artifacts. Shipped at absolute velocity.
              </p>
            </div>

            <div className="text-center hidden lg:block">
              <h2 className="text-[25rem] font-black tracking-tighter text-white/[0.01] uppercase select-none leading-none -mb-32">AGENTIC</h2>
            </div>

            <div className="flex flex-col items-end gap-20">
              <div className="flex gap-20 text-[14px] font-black uppercase tracking-[0.8em] text-white/20">
                <Link href="#" className="hover:text-brand-yellow transition-colors underline underline-offset-8">HQ</Link>
                <Link href="#" className="hover:text-brand-yellow transition-colors">Behance</Link>
              </div>
              <p className="text-[12px] font-black text-white/5 uppercase tracking-[1.5em]">© 2026 VENTURELY DIGITAL. ALL PROTOCOLS NOMINAL.</p>
            </div>
          </div>
        </footer>
      </main>
    </SmoothScroll>
  );
}
