"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import api from "@/utils/api";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await api.post("/auth/login", { email, password });
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            if (data.user.role === "admin" || data.user.role === "super_admin") {
                router.push("/admin");
            } else {
                router.push("/dashboard");
            }
        } catch (error) {
            alert("Relay failed. Verify credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center px-6 bg-[#1B1819] architectural-bg">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-lg p-16 bg-[#2A2728] border border-white/5 rounded-[4rem] text-center"
            >
                <Link href="/" className="inline-flex items-center gap-3 mb-12 group">
                    <Image src="/logo.png" alt="Logo" width={40} height={40} className="invert brightness-200" />
                    <span className="text-2xl font-black text-white italic uppercase tracking-tighter">VENTURELY</span>
                </Link>

                <h2 className="text-5xl font-extrabold text-white tracking-tighter mb-12">Portal Access.</h2>

                <form onSubmit={handleLogin} className="space-y-8 text-left">
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] pl-2">01 // Relay Address</label>
                        <div className="relative">
                            <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                            <input
                                required
                                type="email"
                                placeholder="commander@venturely.com"
                                className="w-full bg-[#1B1819] border border-white/5 rounded-2xl pl-16 pr-8 py-5 text-white focus:outline-none focus:border-brand-yellow transition-all font-bold"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] pl-2">02 // Verification Code</label>
                        <div className="relative">
                            <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                            <input
                                required
                                type="password"
                                placeholder="••••••••"
                                className="w-full bg-[#1B1819] border border-white/5 rounded-2xl pl-16 pr-8 py-5 text-white focus:outline-none focus:border-brand-yellow transition-all font-bold"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        disabled={loading}
                        className="button-pill w-full !py-6 text-sm flex justify-center items-center gap-4 group"
                    >
                        {loading ? "Authenticating..." : <>Initialize Session <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" /></>}
                    </button>
                </form>

                <div className="mt-12 text-center text-[10px] font-black uppercase tracking-widest">
                    <Link href="/apply" className="text-white/20 hover:text-brand-yellow transition-colors underline underline-offset-8">
                        Create project identity
                    </Link>
                </div>
            </motion.div>
        </main>
    );
}
