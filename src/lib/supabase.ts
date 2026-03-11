import { createClient } from "@supabase/supabase-js";
import { auth } from '@clerk/nextjs/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const createServerSupabaseClient = () => {
    return createClient(
        supabaseUrl,
        supabaseAnonKey,
        {
            global: {
                async fetch(url, options = {}) {
                    const clerkToken = await (await auth()).getToken({ template: 'supabase' });

                    const headers = new Headers(options?.headers);
                    if (clerkToken) {
                        headers.set('Authorization', `Bearer ${clerkToken}`);
                    }

                    return fetch(url, {
                        ...options,
                        headers,
                    });
                },
            },
        }
    );
};

export const createBrowserSupabaseClient = (getToken: () => Promise<string | null>) => {
    return createClient(
        supabaseUrl,
        supabaseAnonKey,
        {
            global: {
                async fetch(url, options = {}) {
                    const clerkToken = await getToken();

                    const headers = new Headers(options?.headers);
                    if (clerkToken) {
                        headers.set('Authorization', `Bearer ${clerkToken}`);
                    }

                    return fetch(url, {
                        ...options,
                        headers,
                    });
                },
            },
        }
    );
};

// ... keep existing types below

// ── Types ────────────────────────────────────────────────────
export type Priority =
    | "Global Priority"
    | "National Priority"
    | "Company Priority"
    | "Local Priority";

export type PostStatus = "Published" | "Draft" | "Archived";

export interface Post {
    id: string;
    slug: string;
    title: string;
    priority: Priority;
    category: string;
    status: PostStatus;
    excerpt: string | null;
    content: string | null;
    featured_image: string | null;
    reading_time: string | null;
    author_email: string | null;
    published_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface PostAnalytics {
    id: string;
    post_id: string;
    views: number;
    unique_visitors: number;
    last_viewed_at: string | null;
}

export interface Comment {
    id: string;
    post_id: string;
    author_name: string;
    author_email: string | null;
    content: string;
    is_approved: boolean;
    created_at: string;
}

export interface WaitlistSubmission {
    id: string;
    name: string;
    company: string;
    email: string;
    created_at: string;
}
