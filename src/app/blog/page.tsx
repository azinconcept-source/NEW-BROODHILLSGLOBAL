"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { createBrowserSupabaseClient, type Post } from "@/lib/supabase";
import { useAuth } from "@clerk/nextjs";
import { Clock, ArrowRight, Signal } from "lucide-react";

const PRIORITY_COLORS: Record<string, string> = {
    "Global Priority": "bg-red-600 text-white",
    "National Priority": "bg-blue-600 text-white",
    "Company Priority": "bg-[#C8DC0A] text-black",
    "Local Priority": "bg-[#6B8C14] text-white",
};

function PriorityBadge({ priority }: { priority: string }) {
    const cls = PRIORITY_COLORS[priority] ?? "bg-[#C8DC0A] text-black";
    return (
        <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.12em] uppercase px-3 py-1 rounded-full ${cls}`}>
            <Signal size={9} /> {priority}
        </span>
    );
}

export default function BlogIndexPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const { getToken } = useAuth();

    useEffect(() => {
        const supabase = createBrowserSupabaseClient(getToken);
        supabase
            .from("posts")
            .select("*")
            .eq("status", "Published")
            .order("published_at", { ascending: false })
            .then(({ data }) => {
                setPosts(data ?? []);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <main className="min-h-screen bg-[#000000] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-[#C8DC0A]/30 border-t-[#C8DC0A] rounded-full animate-spin" />
            </main>
        );
    }

    const [featured, ...rest] = posts;

    const formatDate = (iso: string | null) =>
        iso
            ? new Date(iso).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
            }).toUpperCase()
            : "";

    return (
        <main className="min-h-screen bg-[#000000] text-white">
            {/* ── Hero Banner ── */}
            <section className="relative h-[55vh] flex items-end overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src={featured?.featured_image ?? ""}
                        alt="Blog hero"
                        className="w-full h-full object-cover brightness-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                </div>

                <div className="container relative z-10 pb-14 max-w-[1400px] mx-auto px-8">
                    <motion.div
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.7 }}
                    >
                        <span className="inline-block bg-[#C8DC0A] text-black text-[11px] font-bold tracking-[0.15em] uppercase px-4 py-1.5 rounded-full mb-5">
                            Insights &amp; News
                        </span>
                        <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight max-w-3xl">
                            Stories that shape the energy future
                        </h1>
                    </motion.div>
                </div>
            </section>

            {/* ── Featured Post ── */}
            {featured && (
                <section className="py-16 bg-[#000000]">
                    <div className="container max-w-[1400px] mx-auto px-8">
                        <p className="font-meta text-[#C8DC0A] mb-6 text-[12px]">Featured post</p>

                        <Link href={`/blog/${featured.slug}`} className="group block">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                                className="grid md:grid-cols-2 gap-8 rounded-sm border border-[#6B8C14]/30 overflow-hidden hover:border-[#C8DC0A]/50 transition-colors"
                            >
                                <div className="relative aspect-[16/9] overflow-hidden">
                                    <img
                                        src={featured.featured_image ?? ""}
                                        alt={featured.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                                <div className="p-8 flex flex-col justify-center">
                                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                                        <PriorityBadge priority={featured.priority} />
                                        <span className="inline-block bg-[#333] text-white text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded-full">
                                            {featured.category}
                                        </span>
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-4 group-hover:text-[#C8DC0A] transition-colors">
                                        {featured.title}
                                    </h2>
                                    <p className="text-[#CCCCCC] leading-relaxed mb-6 text-sm">{featured.excerpt}</p>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-[#CCCCCC] text-xs mt-0.5">
                                                {formatDate(featured.published_at)} &nbsp;·&nbsp; {featured.reading_time}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2 text-[#C8DC0A] text-sm font-bold uppercase tracking-wider group-hover:gap-3 transition-all">
                                            Read <ArrowRight size={16} />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    </div>
                </section>
            )}

            {/* ── All Posts Grid ── */}
            <section className="py-12 bg-[#000000] border-t border-[#6B8C14]/20">
                <div className="container max-w-[1400px] mx-auto px-8">
                    <div className="flex items-center justify-between mb-10">
                        <h2 className="text-2xl font-bold">Latest Articles</h2>
                        <span className="text-[#CCCCCC] text-sm">{posts.length} articles</span>
                    </div>

                    {rest.length === 0 ? (
                        <p className="text-[#555] text-sm">No additional articles at this time.</p>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {rest.map((post, idx) => (
                                <motion.div
                                    key={post.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className="group flex flex-col h-full rounded-sm border border-[#6B8C14]/30 overflow-hidden hover:border-[#C8DC0A]/50 transition-all hover:bg-[#121212]"
                                    >
                                        <div className="relative aspect-[16/9] overflow-hidden">
                                            <img
                                                src={post.featured_image ?? ""}
                                                alt={post.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                            <div className="absolute top-3 left-3">
                                                <PriorityBadge priority={post.priority} />
                                            </div>
                                        </div>

                                        <div className="p-6 flex flex-col flex-1">
                                            <p className="text-[#CCCCCC] text-[11px] font-semibold uppercase tracking-[0.08em] mb-3">
                                                {formatDate(post.published_at)}
                                            </p>
                                            <h3 className="text-white text-lg font-bold leading-snug mb-3 group-hover:text-[#C8DC0A] transition-colors line-clamp-3">
                                                {post.title}
                                            </h3>
                                            <p className="text-[#CCCCCC] text-sm leading-relaxed line-clamp-2 flex-1">
                                                {post.excerpt}
                                            </p>
                                            <div className="mt-5 pt-4 border-t border-[#6B8C14]/20 flex items-center justify-between">
                                                <span className="text-[#C8DC0A] text-xs font-semibold">{post.category}</span>
                                                <span className="text-[#CCCCCC] text-xs flex items-center gap-1.5">
                                                    <Clock size={12} /> {post.reading_time}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
