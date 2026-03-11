"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard, FileText, MessageSquare, LogOut, Bell,
    TrendingUp, Eye, PlusCircle, ChevronRight, X, Pencil, Trash2,
    Signal, Save, AlertTriangle, Users, Mail,
} from "lucide-react";
import Link from "next/link";
import { supabase, type Post, type Priority, type PostStatus, type WaitlistSubmission } from "@/lib/supabase";

const PRIORITIES: Priority[] = ["Global Priority", "National Priority", "Company Priority", "Local Priority"];
const STATUSES: PostStatus[] = ["Published", "Draft", "Archived"];

const PRIORITY_COLORS: Record<string, string> = {
    "Global Priority": "bg-red-600/20 text-red-400 border-red-600/30",
    "National Priority": "bg-blue-600/20 text-blue-400 border-blue-600/30",
    "Company Priority": "bg-[#C8DC0A]/15 text-[#C8DC0A] border-[#C8DC0A]/30",
    "Local Priority": "bg-[#6B8C14]/20 text-[#6B8C14] border-[#6B8C14]/30",
};

interface Stats {
    posts: number;
    views: number;
    comments: number;
}

interface PostForm {
    title: string;
    slug: string;
    priority: Priority;
    category: string;
    status: PostStatus;
    excerpt: string;
    content: string;
    featured_image: string;
    reading_time: string;
}

const EMPTY_FORM: PostForm = {
    title: "", slug: "", priority: "Company Priority", category: "General",
    status: "Draft", excerpt: "", content: "", featured_image: "", reading_time: "5 min read",
};

function slugify(s: string) {
    return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function EditorDashboardPage() {
    const router = useRouter();
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);
    const [waitlists, setWaitlists] = useState<WaitlistSubmission[]>([]);
    const [stats, setStats] = useState<Stats>({ posts: 0, views: 0, comments: 0 });
    const [loading, setLoading] = useState(true);

    // Modal state
    const [modal, setModal] = useState<"create" | "edit" | "delete" | null>(null);
    const [form, setForm] = useState<PostForm>(EMPTY_FORM);
    const [editId, setEditId] = useState<string | null>(null);
    const [deletePost, setDeletePost] = useState<Post | null>(null);
    const [saving, setSaving] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    const loadData = useCallback(async () => {
        const [{ data: postsData }, { data: analyticsData }, { data: commentsData }, { data: waitlistData }] = await Promise.all([
            supabase.from("posts").select("*").order("created_at", { ascending: false }),
            supabase.from("post_analytics").select("views"),
            supabase.from("comments").select("id", { count: "exact", head: true }),
            supabase.from("waitlist_submissions").select("*").order("created_at", { ascending: false }),
        ]);

        setPosts(postsData ?? []);
        setWaitlists(waitlistData ?? []);
        const totalViews = (analyticsData ?? []).reduce((sum, r) => sum + (r.views ?? 0), 0);
        setStats({
            posts: (postsData ?? []).filter(p => p.status === "Published").length,
            views: totalViews,
            comments: commentsData?.length ?? 0,
        });
    }, []);

    useEffect(() => {
        async function init() {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.push("/editor/login");
                return;
            }
            setUserEmail(session.user.email ?? null);
            await loadData();
            setLoading(false);
        }
        init();
    }, [router, loadData]);

    async function handleLogout() {
        await supabase.auth.signOut();
        router.push("/editor/login");
    }

    // ── Create ──
    function openCreate() {
        setForm(EMPTY_FORM);
        setFormError(null);
        setModal("create");
    }

    // ── Edit ──
    function openEdit(post: Post) {
        setForm({
            title: post.title,
            slug: post.slug,
            priority: post.priority,
            category: post.category,
            status: post.status,
            excerpt: post.excerpt ?? "",
            content: post.content ?? "",
            featured_image: post.featured_image ?? "",
            reading_time: post.reading_time ?? "5 min read",
        });
        setEditId(post.id);
        setFormError(null);
        setModal("edit");
    }

    // ── Delete ──
    function openDelete(post: Post) {
        setDeletePost(post);
        setModal("delete");
    }

    async function confirmDelete() {
        if (!deletePost) return;
        setSaving(true);
        await supabase.from("posts").delete().eq("id", deletePost.id);
        await loadData();
        setSaving(false);
        setModal(null);
        setDeletePost(null);
    }

    // ── Save (create or edit) ──
    async function handleSave() {
        if (!form.title.trim()) { setFormError("Title is required."); return; }
        if (!form.slug.trim()) { setFormError("Slug is required."); return; }
        setSaving(true);
        setFormError(null);

        const payload = {
            ...form,
            published_at: form.status === "Published" ? new Date().toISOString() : null,
            author_email: userEmail,
        };

        let error;
        if (modal === "create") {
            ({ error } = await supabase.from("posts").insert(payload));
        } else {
            ({ error } = await supabase.from("posts").update(payload).eq("id", editId!));
        }

        setSaving(false);
        if (error) { setFormError(error.message); return; }
        await loadData();
        setModal(null);
    }

    if (loading || !userEmail) return null;

    const statCards = [
        { label: "Published Posts", value: stats.posts, delta: "Live on site", icon: FileText },
        { label: "Total Views", value: stats.views.toLocaleString(), delta: "All time", icon: Eye },
        { label: "Comments", value: stats.comments, delta: "All comments", icon: MessageSquare },
        { label: "Articles (Total)", value: posts.length, delta: `${posts.filter(p => p.status === "Draft").length} drafts`, icon: TrendingUp },
        { label: "Waitlist Signups", value: waitlists.length, delta: "Total signups", icon: Users },
    ];

    return (
        <main className="min-h-[calc(100vh-130px)] bg-[#050505] text-white flex">
            {/* ── Sidebar ── */}
            <aside className="hidden lg:flex flex-col w-64 bg-[#0A0A0A] border-r border-[#6B8C14]/20 py-8 px-5">
                <div className="flex items-center gap-3 mb-10 px-1">
                    <img
                        src="https://res.cloudinary.com/dycc51iwn/image/upload/v1772463804/broodhills_2_oiovoo_e_background_removal_f_png_trm008.png"
                        alt="Logo" width={38} height={38} className="brightness-110"
                    />
                    <div>
                        <p className="text-[13px] font-[900] text-white uppercase tracking-tight" style={{ fontFamily: "'Times New Roman', serif" }}>BROODHILLS</p>
                        <p className="text-[9px] font-bold text-[#00AEEF] tracking-[0.3em] uppercase">CMS Dashboard</p>
                    </div>
                </div>

                <nav className="flex-1 space-y-1">
                    {[
                        { icon: LayoutDashboard, label: "Dashboard", active: true },
                        { icon: FileText, label: "Articles", active: false },
                        { icon: MessageSquare, label: "Comments", active: false },
                    ].map(({ icon: Icon, label, active }) => (
                        <button
                            key={label}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-medium transition-colors ${active
                                ? "bg-[#C8DC0A]/10 text-[#C8DC0A] border border-[#C8DC0A]/20"
                                : "text-[#CCCCCC] hover:bg-[#121212] hover:text-white"}`}
                        >
                            <Icon size={16} /> {label}
                        </button>
                    ))}
                </nav>

                <div className="border-t border-[#6B8C14]/20 pt-5 space-y-3">
                    <div className="flex items-center gap-3 px-2">
                        <div className="w-9 h-9 rounded-full bg-[#C8DC0A] flex items-center justify-center text-black font-bold text-xs shrink-0">
                            {userEmail.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                            <p className="text-white text-xs font-semibold truncate">{userEmail}</p>
                            <p className="text-[#C8DC0A] text-[10px] uppercase tracking-widest font-bold">Editor</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[#CCCCCC] hover:text-red-400 text-sm transition-colors rounded-sm hover:bg-red-400/5"
                    >
                        <LogOut size={15} /> Sign out
                    </button>
                </div>
            </aside>

            {/* ── Main ── */}
            <div className="flex-1 overflow-auto">
                {/* Top bar */}
                <div className="h-16 border-b border-[#6B8C14]/20 bg-[#0A0A0A] flex items-center justify-between px-8 sticky top-0 z-10">
                    <div>
                        <h1 className="text-sm font-semibold text-white">Dashboard</h1>
                        <p className="text-[#555] text-xs">{new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="relative p-2 text-[#CCCCCC] hover:text-[#C8DC0A] transition-colors">
                            <Bell size={18} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#C8DC0A] rounded-full" />
                        </button>
                        <Link href="/blog" className="hidden sm:flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-black bg-[#C8DC0A] hover:bg-[#6B8C14] px-4 py-2 rounded-full transition-colors">
                            <Eye size={13} /> View Site
                        </Link>
                    </div>
                </div>

                {/* Body */}
                <div className="p-8 max-w-[1100px]">
                    {/* Welcome */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-10">
                        <h2 className="text-2xl font-bold text-white mb-1">Welcome back, <span className="text-[#C8DC0A]">Editor</span></h2>
                        <p className="text-[#CCCCCC] text-sm">Manage news, articles, and editorial content for Broodhills Global.</p>
                    </motion.div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
                        {statCards.map(({ label, value, delta, icon: Icon }, i) => (
                            <motion.div
                                key={label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: i * 0.08 }}
                                className="bg-[#0A0A0A] border border-[#6B8C14]/20 rounded-sm p-5 hover:border-[#C8DC0A]/30 transition-colors"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <p className="text-[#CCCCCC] text-xs uppercase tracking-widest font-semibold">{label}</p>
                                    <div className="w-7 h-7 rounded-full bg-[#C8DC0A]/10 flex items-center justify-center">
                                        <Icon size={13} className="text-[#C8DC0A]" />
                                    </div>
                                </div>
                                <p className="text-2xl font-bold text-white mb-1">{value}</p>
                                <p className="text-xs text-[#6B8C14] flex items-center gap-1">
                                    <TrendingUp size={10} /> {delta}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Articles Table */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="text-lg font-bold text-white">All Articles</h3>
                            <button
                                onClick={openCreate}
                                className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-black bg-[#C8DC0A] hover:bg-[#6B8C14] px-4 py-2 rounded-full transition-colors"
                            >
                                <PlusCircle size={13} /> New Article
                            </button>
                        </div>

                        <div className="border border-[#6B8C14]/20 rounded-sm overflow-hidden">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-[#121212] border-b border-[#6B8C14]/20">
                                        <th className="text-left px-5 py-3.5 text-[#CCCCCC] text-xs font-bold uppercase tracking-wider">Title</th>
                                        <th className="text-left px-5 py-3.5 text-[#CCCCCC] text-xs font-bold uppercase tracking-wider hidden md:table-cell">Priority</th>
                                        <th className="text-left px-5 py-3.5 text-[#CCCCCC] text-xs font-bold uppercase tracking-wider hidden sm:table-cell">Category</th>
                                        <th className="text-left px-5 py-3.5 text-[#CCCCCC] text-xs font-bold uppercase tracking-wider">Status</th>
                                        <th className="px-5 py-3.5 text-right text-[#CCCCCC] text-xs font-bold uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {posts.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="px-5 py-10 text-center text-[#555] text-sm">
                                                No articles yet. Create your first article above.
                                            </td>
                                        </tr>
                                    ) : (
                                        posts.map((post) => (
                                            <tr key={post.id} className="border-b border-[#6B8C14]/10 hover:bg-[#121212] transition-colors">
                                                <td className="px-5 py-4 text-white font-medium max-w-[200px] truncate">{post.title}</td>
                                                <td className="px-5 py-4 hidden md:table-cell">
                                                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${PRIORITY_COLORS[post.priority] ?? "bg-[#C8DC0A]/15 text-[#C8DC0A] border-[#C8DC0A]/30"}`}>
                                                        <Signal size={8} /> {post.priority}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-4 text-[#CCCCCC] text-xs hidden sm:table-cell">{post.category}</td>
                                                <td className="px-5 py-4">
                                                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${post.status === "Published" ? "bg-[#C8DC0A]/15 text-[#C8DC0A]"
                                                        : post.status === "Archived" ? "bg-red-500/10 text-red-400"
                                                            : "bg-[#CCCCCC]/10 text-[#CCCCCC]"
                                                        }`}>
                                                        {post.status}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-4">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button
                                                            onClick={() => openEdit(post)}
                                                            className="p-1.5 text-[#6B8C14] hover:text-[#C8DC0A] transition-colors"
                                                            aria-label="Edit post"
                                                        >
                                                            <Pencil size={14} />
                                                        </button>
                                                        <button
                                                            onClick={() => openDelete(post)}
                                                            className="p-1.5 text-[#6B8C14] hover:text-red-400 transition-colors"
                                                            aria-label="Delete post"
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>
                                                        <Link href={`/blog/${post.slug}`} target="_blank" className="p-1.5 text-[#6B8C14] hover:text-[#C8DC0A] transition-colors">
                                                            <ChevronRight size={14} />
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>

                    {/* ── Waitlist Submissions Table ── */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="mt-10">
                        <div className="flex items-center justify-between mb-5">
                            <div className="flex items-center gap-3">
                                <h3 className="text-lg font-bold text-white">Waitlist Submissions</h3>
                                <span className="px-2.5 py-0.5 bg-[#C8DC0A]/15 text-[#C8DC0A] text-xs font-bold rounded-full border border-[#C8DC0A]/30">
                                    {waitlists.length} total
                                </span>
                            </div>
                            <button
                                onClick={() => {
                                    const csv = ["#,Name,Company,Email,Date", ...waitlists.map((w, i) =>
                                        `${i + 1},"${w.name}","${w.company}","${w.email}","${new Date(w.created_at).toLocaleDateString("en-GB")}"`
                                    )].join("\n");
                                    const a = document.createElement("a");
                                    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
                                    a.download = "waitlist-submissions.csv";
                                    a.click();
                                }}
                                className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C8DC0A] border border-[#C8DC0A]/30 hover:bg-[#C8DC0A]/10 px-4 py-2 rounded-full transition-colors"
                            >
                                <Mail size={12} /> Export CSV
                            </button>
                        </div>

                        <div className="border border-[#6B8C14]/20 rounded-sm overflow-hidden">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-[#121212] border-b border-[#6B8C14]/20">
                                        <th className="text-left px-4 py-3.5 text-[#CCCCCC] text-xs font-bold uppercase tracking-wider w-10">#</th>
                                        <th className="text-left px-4 py-3.5 text-[#CCCCCC] text-xs font-bold uppercase tracking-wider">Name</th>
                                        <th className="text-left px-4 py-3.5 text-[#CCCCCC] text-xs font-bold uppercase tracking-wider hidden sm:table-cell">Company</th>
                                        <th className="text-left px-4 py-3.5 text-[#CCCCCC] text-xs font-bold uppercase tracking-wider">Email</th>
                                        <th className="text-left px-4 py-3.5 text-[#CCCCCC] text-xs font-bold uppercase tracking-wider hidden md:table-cell">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {waitlists.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="px-5 py-10 text-center text-[#555] text-sm">
                                                No waitlist signups yet. They will appear here when someone joins.
                                            </td>
                                        </tr>
                                    ) : (
                                        waitlists.map((w, idx) => (
                                            <tr key={w.id} className="border-b border-[#6B8C14]/10 hover:bg-[#121212] transition-colors">
                                                <td className="px-4 py-3.5 text-[#555] text-xs font-mono">{idx + 1}</td>
                                                <td className="px-4 py-3.5 text-white font-medium">{w.name}</td>
                                                <td className="px-4 py-3.5 text-[#CCCCCC] text-xs hidden sm:table-cell">{w.company}</td>
                                                <td className="px-4 py-3.5">
                                                    <a href={`mailto:${w.email}`} className="text-[#C8DC0A] hover:underline text-xs">{w.email}</a>
                                                </td>
                                                <td className="px-4 py-3.5 text-[#CCCCCC] text-xs hidden md:table-cell">
                                                    {new Date(w.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* ── Create / Edit Modal ── */}
            <AnimatePresence>
                {(modal === "create" || modal === "edit") && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
                        onClick={() => setModal(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="bg-[#0A0A0A] border border-[#6B8C14]/30 rounded-sm w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between p-6 border-b border-[#6B8C14]/20">
                                <h2 className="text-white font-bold text-lg">{modal === "create" ? "New Article" : "Edit Article"}</h2>
                                <button onClick={() => setModal(null)} className="text-[#555] hover:text-white transition-colors"><X size={18} /></button>
                            </div>

                            <div className="p-6 space-y-5">
                                {formError && (
                                    <div className="flex items-start gap-2 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-sm text-red-400 text-sm">
                                        <AlertTriangle size={14} className="mt-0.5 shrink-0" /> {formError}
                                    </div>
                                )}

                                {/* Title */}
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-[#CCCCCC] mb-2">Title *</label>
                                    <input
                                        type="text"
                                        value={form.title}
                                        onChange={(e) => setForm(f => ({
                                            ...f,
                                            title: e.target.value,
                                            slug: modal === "create" ? slugify(e.target.value) : f.slug,
                                        }))}
                                        placeholder="Article title"
                                        className="w-full bg-[#121212] border border-[#6B8C14]/40 focus:border-[#C8DC0A] rounded-sm px-4 py-3 text-white text-sm placeholder:text-[#444] outline-none transition-colors"
                                    />
                                </div>

                                {/* Slug */}
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-[#CCCCCC] mb-2">Slug *</label>
                                    <input
                                        type="text"
                                        value={form.slug}
                                        onChange={(e) => setForm(f => ({ ...f, slug: e.target.value }))}
                                        placeholder="url-friendly-slug"
                                        className="w-full bg-[#121212] border border-[#6B8C14]/40 focus:border-[#C8DC0A] rounded-sm px-4 py-3 text-white text-sm placeholder:text-[#444] outline-none transition-colors font-mono"
                                    />
                                </div>

                                {/* Priority + Status row */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest text-[#CCCCCC] mb-2">Priority</label>
                                        <select
                                            value={form.priority}
                                            onChange={(e) => setForm(f => ({ ...f, priority: e.target.value as Priority }))}
                                            className="w-full bg-[#121212] border border-[#6B8C14]/40 focus:border-[#C8DC0A] rounded-sm px-4 py-3 text-white text-sm outline-none transition-colors"
                                        >
                                            {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest text-[#CCCCCC] mb-2">Status</label>
                                        <select
                                            value={form.status}
                                            onChange={(e) => setForm(f => ({ ...f, status: e.target.value as PostStatus }))}
                                            className="w-full bg-[#121212] border border-[#6B8C14]/40 focus:border-[#C8DC0A] rounded-sm px-4 py-3 text-white text-sm outline-none transition-colors"
                                        >
                                            {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                    </div>
                                </div>

                                {/* Category + Reading time */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest text-[#CCCCCC] mb-2">Category</label>
                                        <input
                                            type="text"
                                            value={form.category}
                                            onChange={(e) => setForm(f => ({ ...f, category: e.target.value }))}
                                            placeholder="Operations"
                                            className="w-full bg-[#121212] border border-[#6B8C14]/40 focus:border-[#C8DC0A] rounded-sm px-4 py-3 text-white text-sm placeholder:text-[#444] outline-none transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest text-[#CCCCCC] mb-2">Reading Time</label>
                                        <input
                                            type="text"
                                            value={form.reading_time}
                                            onChange={(e) => setForm(f => ({ ...f, reading_time: e.target.value }))}
                                            placeholder="5 min read"
                                            className="w-full bg-[#121212] border border-[#6B8C14]/40 focus:border-[#C8DC0A] rounded-sm px-4 py-3 text-white text-sm placeholder:text-[#444] outline-none transition-colors"
                                        />
                                    </div>
                                </div>

                                {/* Featured Image */}
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-[#CCCCCC] mb-2">Featured Image URL</label>
                                    <input
                                        type="url"
                                        value={form.featured_image}
                                        onChange={(e) => setForm(f => ({ ...f, featured_image: e.target.value }))}
                                        placeholder="https://..."
                                        className="w-full bg-[#121212] border border-[#6B8C14]/40 focus:border-[#C8DC0A] rounded-sm px-4 py-3 text-white text-sm placeholder:text-[#444] outline-none transition-colors"
                                    />
                                </div>

                                {/* Excerpt */}
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-[#CCCCCC] mb-2">Excerpt</label>
                                    <textarea
                                        value={form.excerpt}
                                        onChange={(e) => setForm(f => ({ ...f, excerpt: e.target.value }))}
                                        placeholder="Short summary shown in cards and listings..."
                                        rows={3}
                                        className="w-full bg-[#121212] border border-[#6B8C14]/40 focus:border-[#C8DC0A] rounded-sm px-4 py-3 text-white text-sm placeholder:text-[#444] outline-none transition-colors resize-none"
                                    />
                                </div>

                                {/* Content (HTML) */}
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-[#CCCCCC] mb-2">Content (HTML)</label>
                                    <textarea
                                        value={form.content}
                                        onChange={(e) => setForm(f => ({ ...f, content: e.target.value }))}
                                        placeholder="<p>Article content in HTML...</p>"
                                        rows={8}
                                        className="w-full bg-[#121212] border border-[#6B8C14]/40 focus:border-[#C8DC0A] rounded-sm px-4 py-3 text-white text-sm placeholder:text-[#444] outline-none transition-colors resize-none font-mono"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-3 p-6 border-t border-[#6B8C14]/20">
                                <button
                                    onClick={() => setModal(null)}
                                    className="px-5 py-2.5 text-[#CCCCCC] hover:text-white border border-[#6B8C14]/30 hover:border-[#6B8C14]/60 rounded-full text-sm transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={saving}
                                    className="flex items-center gap-2 px-6 py-2.5 bg-[#C8DC0A] hover:bg-[#6B8C14] disabled:opacity-60 text-black font-bold text-sm tracking-wider uppercase rounded-full transition-colors"
                                >
                                    {saving ? <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" /> : <Save size={14} />}
                                    {modal === "create" ? "Publish" : "Save Changes"}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Delete Confirm Modal ── */}
            <AnimatePresence>
                {modal === "delete" && deletePost && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
                        onClick={() => setModal(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="bg-[#0A0A0A] border border-red-500/30 rounded-sm w-full max-w-sm p-8"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto mb-5">
                                <Trash2 size={20} className="text-red-400" />
                            </div>
                            <h2 className="text-white font-bold text-lg text-center mb-2">Delete Article?</h2>
                            <p className="text-[#CCCCCC] text-sm text-center mb-6 leading-relaxed">
                                "{deletePost.title}" will be permanently deleted. This action cannot be undone.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setModal(null)}
                                    className="flex-1 py-3 text-[#CCCCCC] hover:text-white border border-[#6B8C14]/30 rounded-full text-sm transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    disabled={saving}
                                    className="flex-1 py-3 bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white font-bold text-sm rounded-full transition-colors flex items-center justify-center gap-2"
                                >
                                    {saving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Trash2 size={14} />}
                                    Delete
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
