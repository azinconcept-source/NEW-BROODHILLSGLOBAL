"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { SignIn } from "@clerk/nextjs";

export default function EditorLoginPage() {

    return (
        <main className="min-h-[calc(100vh-130px)] bg-[#000000] flex">
            {/* ── Left Panel (Brand) ── */}
            <div className="hidden lg:flex flex-col justify-between w-[45%] bg-[#0A0A0A] border-r border-[#6B8C14]/20 p-14 relative overflow-hidden">
                <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#C8DC0A]/5 blur-3xl pointer-events-none" />
                <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-[#C8DC0A]/3 blur-3xl pointer-events-none" />

                {/* Logo */}
                <div className="flex items-center gap-3 relative z-10">
                    <img
                        src="https://res.cloudinary.com/dycc51iwn/image/upload/v1772463804/broodhills_2_oiovoo_e_background_removal_f_png_trm008.png"
                        alt="Broodhills Logo"
                        width={52}
                        height={52}
                        className="brightness-110"
                    />
                    <div className="flex flex-col">
                        <span className="text-[22px] font-[900] tracking-[-0.02em] text-white leading-none uppercase" style={{ fontFamily: "'Times New Roman', serif" }}>
                            BROODHILLS
                        </span>
                        <span className="text-[10px] font-[800] tracking-[0.45em] text-[#00AEEF] leading-none mt-1 uppercase">
                            GLOBAL SERVICES
                        </span>
                    </div>
                </div>

                {/* Main copy */}
                <div className="relative z-10">
                    <h1 className="text-4xl font-bold leading-tight text-white mb-5 tracking-tight">
                        Editorial &amp;<br />
                        <span className="text-[#C8DC0A]">Content Hub</span>
                    </h1>
                    <p className="text-[#CCCCCC] text-base leading-relaxed mb-10">
                        Securely manage news, press releases, and editorial content for Broodhills Global Services.
                    </p>

                    <div className="p-5 bg-[#121212] border border-[#C8DC0A]/20 rounded-sm">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-9 h-9 rounded-full bg-[#C8DC0A]/10 border border-[#C8DC0A]/30 flex items-center justify-center shrink-0">
                                <ShieldCheck size={16} className="text-[#C8DC0A]" />
                            </div>
                            <div>
                                <p className="text-white font-semibold text-sm">Editor Access</p>
                                <p className="text-[#CCCCCC] text-xs mt-0.5 leading-relaxed">Create, edit, publish, and delete editorial content.</p>
                            </div>
                        </div>
                        <p className="text-[#555] text-xs leading-relaxed">
                            Full access to post management, analytics, and comment moderation.
                        </p>
                    </div>
                </div>

                <p className="text-[#444] text-xs relative z-10">
                    © 2026 Broodhills Global Services. Restricted access — authorised personnel only.
                </p>
            </div>

            {/* ── Right Panel (Form) ── */}
            <div className="flex-1 flex items-center justify-center px-6 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-[440px]"
                >
                    {/* Mobile logo */}
                    <div className="flex items-center gap-3 mb-10 lg:hidden">
                        <img
                            src="https://res.cloudinary.com/dycc51iwn/image/upload/v1772463804/broodhills_2_oiovoo_e_background_removal_f_png_trm008.png"
                            alt="Broodhills Logo"
                            width={44}
                            height={44}
                        />
                        <span className="text-xl font-bold text-white uppercase tracking-tight" style={{ fontFamily: "'Times New Roman', serif" }}>BROODHILLS</span>
                    </div>

                    <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Sign in to dashboard</h2>
                    <p className="text-[#CCCCCC] text-sm mb-10">Authorised editors and administrators only.</p>

                    <div className="flex justify-center w-full">
                        <SignIn routing="hash" fallbackRedirectUrl="/editor/dashboard" signUpFallbackRedirectUrl="/editor/dashboard" />
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
