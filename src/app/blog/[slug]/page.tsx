"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { motion } from "framer-motion";
import { createBrowserSupabaseClient, type Post } from "@/lib/supabase";
import { useAuth } from "@clerk/nextjs";
import { trackView } from "@/app/actions/track-view";
import CommentsSection from "@/components/ui/comments-section";
import { Clock, Calendar, ArrowLeft, Share2, ChevronRight, Signal } from "lucide-react";

const PRIORITY_COLORS: Record<string, string> = {
    "Global Priority": "bg-red-600 text-white",
    "National Priority": "bg-blue-600 text-white",
    "Company Priority": "bg-[#C8DC0A] text-black",
    "Local Priority": "bg-[#6B8C14] text-white",
};

export default function BlogPostPage() {
    const { slug } = useParams<{ slug: string }>();
    const [post, setPost] = useState<Post | null>(null);
    const [related, setRelated] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const { getToken } = useAuth();

    useEffect(() => {
        if (!slug) return;

        async function load() {
            const supabase = createBrowserSupabaseClient(getToken);
            const { data } = await supabase
                .from("posts")
                .select("*")
                .eq("slug", slug)
                .eq("status", "Published")
                .single();

            if (!data) {
                setLoading(false);
                return;
            }
            setPost(data);

            // Track view (fire-and-forget)
            trackView(data.id);

            // Fetch related posts
            const { data: rel } = await supabase
                .from("posts")
                .select("*")
                .eq("status", "Published")
                .neq("id", data.id)
                .limit(2);
            setRelated(rel ?? []);
            setLoading(false);
        }
        load();
    }, [slug]);

    if (loading) {
        return (
            <main className="min-h-screen bg-[#000000] text-white flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-[#C8DC0A]/30 border-t-[#C8DC0A] rounded-full animate-spin" />
            </main>
        );
    }

    if (!post) {
        return notFound();
    }

    const priorityClass =
        PRIORITY_COLORS[post.priority] ?? "bg-[#C8DC0A] text-black";

    const formattedDate = post.published_at
        ? new Date(post.published_at).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        }).toUpperCase()
        : "";

    return (
        <main className="min-h-screen bg-[#000000] text-white">
            {/* ── Breadcrumb ── */}
            <div className="border-b border-[#6B8C14]/20 bg-[#000000]">
                <div className="container max-w-[1400px] mx-auto px-8 py-4 flex items-center gap-2 text-xs text-[#CCCCCC]">
                    <Link href="/" className="hover:text-[#C8DC0A] transition-colors">Home</Link>
                    <ChevronRight size={12} className="text-[#555]" />
                    <Link href="/blog" className="hover:text-[#C8DC0A] transition-colors">Blog</Link>
                    <ChevronRight size={12} className="text-[#555]" />
                    <span className="text-[#CCCCCC] truncate max-w-[200px]">{post.category}</span>
                </div>
            </div>

            {/* ── Hero ── */}
            <section className="relative h-[60vh] flex items-end overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <motion.img
                        initial={{ scale: 1.08 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1.5 }}
                        src={post.featured_image ?? ""}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/10" />
                </div>

                <div className="container max-w-[900px] mx-auto px-8 relative z-10 pb-14">
                    <motion.div
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.7 }}
                    >
                        {/* Priority + Category badges */}
                        <div className="flex items-center gap-3 flex-wrap mb-5">
                            <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.15em] uppercase px-4 py-1.5 rounded-full ${priorityClass}`}>
                                <Signal size={11} />
                                {post.priority}
                            </span>
                            <span className="inline-block bg-white/10 text-white text-[11px] font-bold tracking-[0.12em] uppercase px-4 py-1.5 rounded-full backdrop-blur-sm">
                                {post.category}
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight mb-6">
                            {post.title}
                        </h1>

                        {/* Meta Row */}
                        <div className="flex flex-wrap items-center gap-5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#C8DC0A] flex items-center justify-center text-black font-bold text-sm shrink-0">
                                    BG
                                </div>
                                <div>
                                    <p className="text-white font-semibold text-sm">Broodhills Global</p>
                                    <p className="text-[#CCCCCC] text-xs">{post.priority}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-[#CCCCCC]">
                                <span className="flex items-center gap-1.5"><Calendar size={12} /> {formattedDate}</span>
                                <span className="text-[#444]">·</span>
                                <span className="flex items-center gap-1.5"><Clock size={12} /> {post.reading_time}</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── Article Body ── */}
            <section className="py-14 bg-[#000000]">
                <div className="container max-w-[760px] mx-auto px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="prose-broodhills"
                        dangerouslySetInnerHTML={{ __html: post.content ?? "" }}
                    />

                    {/* Share Row */}
                    <div className="mt-12 pt-8 border-t border-[#6B8C14]/30 flex items-center gap-3 flex-wrap">
                        <Share2 size={14} className="text-[#6B8C14]" />
                        <span className="text-xs text-[#CCCCCC] uppercase tracking-widest font-semibold">Share this article</span>
                        {["LinkedIn", "X (Twitter)", "Email"].map((platform) => (
                            <button
                                key={platform}
                                className="text-xs text-[#CCCCCC] border border-[#6B8C14]/30 px-3 py-1.5 rounded-full hover:border-[#C8DC0A]/50 hover:text-[#C8DC0A] transition-colors"
                            >
                                {platform}
                            </button>
                        ))}
                    </div>

                    {/* Comments Section */}
                    <CommentsSection />
                </div>
            </section>

            {/* ── Related Articles ── */}
            {related.length > 0 && (
                <section className="py-14 border-t border-[#6B8C14]/20 bg-[#000000]">
                    <div className="container max-w-[1400px] mx-auto px-8">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-bold">Related Articles</h2>
                            <Link href="/blog" className="flex items-center gap-2 text-[#C8DC0A] text-xs font-bold uppercase tracking-widest hover:text-white transition-colors">
                                View all <ChevronRight size={14} />
                            </Link>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            {related.map((rel) => (
                                <Link
                                    key={rel.id}
                                    href={`/blog/${rel.slug}`}
                                    className="group flex gap-5 p-5 border border-[#6B8C14]/30 rounded-sm hover:border-[#C8DC0A]/40 hover:bg-[#121212] transition-all"
                                >
                                    <div className="w-24 h-20 shrink-0 overflow-hidden rounded-sm">
                                        <img
                                            src={rel.featured_image ?? ""}
                                            alt={rel.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <div>
                                        <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${PRIORITY_COLORS[rel.priority] ?? "bg-[#C8DC0A] text-black"}`}>
                                            <Signal size={9} /> {rel.priority}
                                        </span>
                                        <p className="text-white text-sm font-semibold leading-snug mt-1.5 group-hover:text-[#C8DC0A] transition-colors line-clamp-2">
                                            {rel.title}
                                        </p>
                                        <p className="text-[#CCCCCC] text-xs mt-2">{rel.category}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── Back Link ── */}
            <div className="py-8 border-t border-[#6B8C14]/20 bg-[#000000]">
                <div className="container max-w-[1400px] mx-auto px-8">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-sm text-[#CCCCCC] hover:text-[#C8DC0A] transition-colors"
                    >
                        <ArrowLeft size={16} /> Back to all articles
                    </Link>
                </div>
            </div>

            {/* ── Prose Styles ── */}
            <style jsx global>{`
        .prose-broodhills p { color: #cccccc; font-size: 17px; line-height: 1.85; margin-bottom: 1.5rem; }
        .prose-broodhills h2 { color: #C8DC0A; font-size: 26px; font-weight: 700; letter-spacing: -0.02em; margin-top: 2.5rem; margin-bottom: 1rem; }
        .prose-broodhills h3 { color: #ffffff; font-size: 20px; font-weight: 700; margin-top: 2rem; margin-bottom: 0.75rem; }
        .prose-broodhills blockquote { border-left: 3px solid #C8DC0A; margin: 2rem 0; padding: 1rem 1.5rem; background: #121212; color: #ffffff; font-size: 18px; font-weight: 600; font-style: italic; line-height: 1.6; }
        .prose-broodhills a { color: #C8DC0A; text-decoration: underline; text-underline-offset: 3px; }
        .prose-broodhills ul { list-style: none; padding-left: 0; }
        .prose-broodhills ul li { padding-left: 1.5rem; position: relative; color: #cccccc; margin-bottom: 0.5rem; }
        .prose-broodhills ul li::before { content: "—"; position: absolute; left: 0; color: #C8DC0A; }
      `}</style>
        </main>
    );
}
