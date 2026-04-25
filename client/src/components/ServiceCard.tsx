"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
    title: string;
    description: string;
    price: string;
    icon: LucideIcon;
    index: number;
}

export default function ServiceCard({ title, description, price, icon: Icon, index }: ServiceCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.8, ease: "circOut" }}
            viewport={{ once: true }}
            className="border-r border-b border-black/10 p-12 group relative flex flex-col justify-between aspect-square hover:bg-[#f3f2ef] transition-colors duration-700"
        >
            <div>
                <div className="text-[10px] font-black text-black/20 uppercase tracking-[0.4em] mb-12">System Module 0{index + 1}</div>
                <h3 className="text-4xl md:text-5xl font-light text-black mb-8 leading-tight font-serif italic">{title}</h3>
                <p className="text-black/50 text-sm font-medium leading-relaxed max-w-[280px]">
                    {description}
                </p>
            </div>

            <div className="flex items-end justify-between">
                <div className="text-[10px] font-black text-black uppercase tracking-widest">Base Rate: {price}</div>
                <div className="w-10 h-10 border border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-500">
                    →
                </div>
            </div>
        </motion.div>
    );
}
