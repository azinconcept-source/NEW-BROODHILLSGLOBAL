"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, AlertCircle, LogIn, ShieldCheck } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Errors {
    email?: string;
    password?: string;
    auth?: string;
}

function validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function EditorLoginPage() {
    const router = useRouter();
    const [form, setForm] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState<Errors>({});
    const [touched, setTouched] = useState({ email: false, password: false });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    function validate(): Errors {
        const e: Errors = {};
        if (!form.email.trim()) e.email = "Email is required.";
        else if (!validateEmail(form.email)) e.email = "Enter a valid email address.";
        if (!form.password) e.password = "Password is required.";
        return e;
    }

    function handleBlur(field: "email" | "password") {
        setTouched((p) => ({ ...p, [field]: true }));
        setErrors((prev) => ({ ...prev, [field]: validate()[field] }));
    }

    function handleChange(field: keyof typeof form, value: string) {
        setForm((p) => ({ ...p, [field]: value }));
        if (touched[field]) {
            setErrors((prev) => ({ ...prev, [field]: validate()[field], auth: undefined }));
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const fieldErrors = validate();
        setTouched({ email: true, password: true });
        if (Object.keys(fieldErrors).length > 0) {
            setErrors(fieldErrors);
            return;
        }

        setLoading(true);
        setErrors({});

        const { error } = await supabase.auth.signInWithPassword({
            email: form.email,
            password: form.password,
        });

        setLoading(false);

        if (error) {
            setErrors({ auth: "Invalid credentials. Please check your email and password." });
            return;
        }

        router.push("/editor/dashboard");
    }

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

                    {/* Auth error */}
                    <AnimatePresence>
                        {errors.auth && (
                            <motion.div
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="mb-6 flex items-start gap-3 px-4 py-3.5 bg-red-500/10 border border-red-500/40 rounded-sm text-red-400 text-sm"
                            >
                                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                                {errors.auth}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form onSubmit={handleSubmit} noValidate className="space-y-5">
                        {/* Email */}
                        <div>
                            <label className="block text-xs font-bold tracking-widest uppercase text-[#CCCCCC] mb-2" htmlFor="login-email">
                                Email <span className="text-[#C8DC0A]">*</span>
                            </label>
                            <input
                                id="login-email"
                                type="email"
                                autoComplete="email"
                                value={form.email}
                                onChange={(e) => handleChange("email", e.target.value)}
                                onBlur={() => handleBlur("email")}
                                placeholder="you@broodhillsglobal.com"
                                className={`w-full bg-[#121212] border ${errors.email ? "border-red-500" : "border-[#6B8C14]/40 focus:border-[#C8DC0A]"} rounded-sm px-4 py-3.5 text-white text-sm placeholder:text-[#444] outline-none transition-colors`}
                            />
                            {errors.email && (
                                <p className="flex items-center gap-1.5 mt-2 text-red-400 text-xs">
                                    <AlertCircle size={12} /> {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-xs font-bold tracking-widest uppercase text-[#CCCCCC] mb-2" htmlFor="login-password">
                                Password <span className="text-[#C8DC0A]">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    id="login-password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    value={form.password}
                                    onChange={(e) => handleChange("password", e.target.value)}
                                    onBlur={() => handleBlur("password")}
                                    placeholder="••••••••"
                                    className={`w-full bg-[#121212] border ${errors.password ? "border-red-500" : "border-[#6B8C14]/40 focus:border-[#C8DC0A]"} rounded-sm px-4 pr-12 py-3.5 text-white text-sm placeholder:text-[#444] outline-none transition-colors`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((v) => !v)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6B8C14] hover:text-[#C8DC0A] transition-colors"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="flex items-center gap-1.5 mt-2 text-red-400 text-xs">
                                    <AlertCircle size={12} /> {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-2 flex items-center justify-center gap-2.5 bg-[#C8DC0A] hover:bg-[#6B8C14] disabled:opacity-60 text-black font-bold text-sm tracking-widest uppercase py-4 rounded-full transition-colors"
                        >
                            {loading ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                    Signing in…
                                </>
                            ) : (
                                <>
                                    <LogIn size={16} /> Sign In
                                </>
                            )}
                        </button>
                    </form>
                </motion.div>
            </div>
        </main>
    );
}
