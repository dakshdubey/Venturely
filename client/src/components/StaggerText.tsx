"use client";

import { motion } from "framer-motion";

interface StaggerTextProps {
    text: string;
    className?: string;
    once?: boolean;
}

export default function StaggerText({ text, className = "", once = true }: StaggerTextProps) {
    const words = text.split(" ");

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
        }),
    };

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring" as const,
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            y: 20,
        },
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once }}
            className={`block ${className}`}
        >
            {words.map((word, index) => (
                <motion.span
                    variants={child}
                    key={index}
                    className="inline-block whitespace-nowrap mr-[0.2em] last:mr-0"
                >
                    {word}
                </motion.span>
            ))}
        </motion.div>
    );
}
