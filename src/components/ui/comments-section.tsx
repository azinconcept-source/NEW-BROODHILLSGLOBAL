"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, User, Mail, AlertCircle } from "lucide-react";

interface Comment {
    id: string;
    name: string;
    email: string;
    body: string;
    timestamp: Date;
}

interface FormErrors {
    name?: string;
    email?: string;
    body?: string;
}

function maskEmail(email: string): string {
    const [local, domain] = email.split("@");
    if (!domain) return email;
    const visible = local.slice(0, 2);
    return `${visible}***@${domain}`;
}

function formatRelativeTime(date: Date): string {
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function getInitials(name: string): string {
    return name
        .split(" ")
        .slice(0, 2)
        .map((n) => n[0])
        .join("")
        .toUpperCase();
}

function validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function CommentsSection() {
    const [comments, setComments] = useState<Comment[]>([]);
    const [form, setForm] = useState({ name: "", email: "", body: "" });
    const [errors, setErrors] = useState<FormErrors>({});
    const [submitted, setSubmitted] = useState(false);
    const [touched, setTouched] = useState({ name: false, email: false, body: false });

    function validateField(field: keyof typeof form, value: string): string | undefined {
        if (field === "name") {
            if (!value.trim()) return "Full name is required.";
            if (value.trim().length < 2) return "Name must be at least 2 characters.";
        }
        if (field === "email") {
            if (!value.trim()) return "Email address is required.";
            if (!validateEmail(value)) return "Please enter a valid email address.";
        }
        if (field === "body") {
            if (!value.trim()) return "Comment cannot be empty.";
            if (value.trim().length < 10) return "Comment must be at least 10 characters.";
        }
        return undefined;
    }

    function handleChange(field: keyof typeof form, value: string) {
        setForm((prev) => ({ ...prev, [field]: value }));
        if (touched[field]) {
            const error = validateField(field, value);
            setErrors((prev) => ({ ...prev, [field]: error }));
        }
    }

    function handleBlur(field: keyof typeof form) {
        setTouched((prev) => ({ ...prev, [field]: true }));
        const error = validateField(field, form[field]);
        setErrors((prev) => ({ ...prev, [field]: error }));
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const newErrors: FormErrors = {
            name: validateField("name", form.name),
            email: validateField("email", form.email),
            body: validateField("body", form.body),
        };
        setErrors(newErrors);
        setTouched({ name: true, email: true, body: true });

        if (Object.values(newErrors).some(Boolean)) return;

        const newComment: Comment = {
            id: Date.now().toString(),
            name: form.name.trim(),
            email: form.email.trim(),
            body: form.body.trim(),
            timestamp: new Date(),
        };

        setComments((prev) => [newComment, ...prev]);
        setForm({ name: "", email: "", body: "" });
        setTouched({ name: false, email: false, body: false });
        setErrors({});
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
    }

    return (
        <section className="py-16 border-t border-[#6B8C14]/30 mt-12">
            {/* Header */}
            <div className="flex items-center gap-3 mb-10">
                <MessageSquare size={22} className="text-[#C8DC0A]" />
                <h2 className="text-2xl font-bold text-white">
                    Comments
                    {comments.length > 0 && (
                        <span className="ml-2 text-lg font-normal text-[#CCCCCC]">({comments.length})</span>
                    )}
                </h2>
            </div>

            {/* Success Banner */}
            <AnimatePresence>
                {submitted && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mb-8 bg-[#C8DC0A]/10 border border-[#C8DC0A]/40 rounded-sm px-5 py-4 flex items-center gap-3 text-[#C8DC0A] text-sm font-medium"
                    >
                        <div className="w-2 h-2 rounded-full bg-[#C8DC0A] shrink-0" />
                        Your comment has been posted successfully.
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Comment Form */}
            <form onSubmit={handleSubmit} noValidate className="mb-14">
                <div className="grid md:grid-cols-2 gap-5 mb-5">
                    {/* Full Name */}
                    <div>
                        <label className="block text-xs font-semibold tracking-widest uppercase text-[#CCCCCC] mb-2" htmlFor="comment-name">
                            Full Name <span className="text-[#C8DC0A]">*</span>
                        </label>
                        <div className="relative">
                            <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B8C14]" />
                            <input
                                id="comment-name"
                                type="text"
                                value={form.name}
                                onChange={(e) => handleChange("name", e.target.value)}
                                onBlur={() => handleBlur("name")}
                                placeholder="e.g. James Adeyemi"
                                className={`w-full bg-[#121212] border ${errors.name ? "border-red-500" : "border-[#6B8C14]/40 focus:border-[#C8DC0A]"} rounded-sm pl-10 pr-4 py-3.5 text-white text-sm placeholder:text-[#444] outline-none transition-colors`}
                            />
                        </div>
                        {errors.name && (
                            <p className="flex items-center gap-1.5 mt-2 text-red-400 text-xs">
                                <AlertCircle size={12} /> {errors.name}
                            </p>
                        )}
                    </div>

                    {/* Email Address */}
                    <div>
                        <label className="block text-xs font-semibold tracking-widest uppercase text-[#CCCCCC] mb-2" htmlFor="comment-email">
                            Email Address <span className="text-[#C8DC0A]">*</span>
                        </label>
                        <div className="relative">
                            <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B8C14]" />
                            <input
                                id="comment-email"
                                type="email"
                                value={form.email}
                                onChange={(e) => handleChange("email", e.target.value)}
                                onBlur={() => handleBlur("email")}
                                placeholder="your@email.com"
                                className={`w-full bg-[#121212] border ${errors.email ? "border-red-500" : "border-[#6B8C14]/40 focus:border-[#C8DC0A]"} rounded-sm pl-10 pr-4 py-3.5 text-white text-sm placeholder:text-[#444] outline-none transition-colors`}
                            />
                        </div>
                        {errors.email && (
                            <p className="flex items-center gap-1.5 mt-2 text-red-400 text-xs">
                                <AlertCircle size={12} /> {errors.email}
                            </p>
                        )}
                    </div>
                </div>

                {/* Comment Body */}
                <div className="mb-6">
                    <label className="block text-xs font-semibold tracking-widest uppercase text-[#CCCCCC] mb-2" htmlFor="comment-body">
                        Comment <span className="text-[#C8DC0A]">*</span>
                    </label>
                    <textarea
                        id="comment-body"
                        value={form.body}
                        onChange={(e) => handleChange("body", e.target.value)}
                        onBlur={() => handleBlur("body")}
                        placeholder="Share your thoughts on this article…"
                        rows={5}
                        className={`w-full bg-[#121212] border ${errors.body ? "border-red-500" : "border-[#6B8C14]/40 focus:border-[#C8DC0A]"} rounded-sm px-4 py-3.5 text-white text-sm placeholder:text-[#444] outline-none transition-colors resize-none`}
                    />
                    {errors.body && (
                        <p className="flex items-center gap-1.5 mt-2 text-red-400 text-xs">
                            <AlertCircle size={12} /> {errors.body}
                        </p>
                    )}
                    <p className="mt-1.5 text-[#555] text-xs">
                        {form.body.length} / min 10 characters · Your email will not be displayed publicly.
                    </p>
                </div>

                <button
                    type="submit"
                    className="flex items-center gap-2.5 px-8 py-3.5 bg-[#C8DC0A] hover:bg-[#6B8C14] text-black font-bold text-sm tracking-widest uppercase rounded-full transition-colors"
                >
                    Post Comment <Send size={15} />
                </button>
            </form>

            {/* Comments List */}
            {comments.length === 0 ? (
                <div className="text-center py-12 border border-[#6B8C14]/20 rounded-sm">
                    <MessageSquare size={32} className="mx-auto text-[#333] mb-3" />
                    <p className="text-[#555] text-sm">No comments yet. Be the first to share your thoughts.</p>
                </div>
            ) : (
                <div className="space-y-5">
                    <AnimatePresence mode="popLayout">
                        {comments.map((comment) => (
                            <motion.div
                                key={comment.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.35 }}
                                className="flex gap-4 p-6 bg-[#121212] border border-[#6B8C14]/20 rounded-sm hover:border-[#6B8C14]/40 transition-colors"
                            >
                                {/* Avatar */}
                                <div className="shrink-0 w-11 h-11 rounded-full bg-[#C8DC0A] flex items-center justify-center text-black font-bold text-sm">
                                    {getInitials(comment.name)}
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3">
                                        <span className="text-white font-semibold text-sm">{comment.name}</span>
                                        <span className="text-[#555] text-xs hidden sm:block">·</span>
                                        <span className="text-[#555] text-xs font-mono">{maskEmail(comment.email)}</span>
                                        <span className="text-[#555] text-xs hidden sm:block">·</span>
                                        <span className="text-[#CCCCCC] text-xs">{formatRelativeTime(comment.timestamp)}</span>
                                    </div>
                                    <p className="text-[#CCCCCC] text-sm leading-relaxed whitespace-pre-wrap">{comment.body}</p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </section>
    );
}
