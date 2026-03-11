"use server";

import { createClient } from "@supabase/supabase-js";

// Use the anon key — analytics table allows anon writes via RLS
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function trackView(postId: string) {
    try {
        // Try to update existing row
        const { data: existing } = await supabase
            .from("post_analytics")
            .select("id, views")
            .eq("post_id", postId)
            .single();

        if (existing) {
            await supabase
                .from("post_analytics")
                .update({
                    views: existing.views + 1,
                    last_viewed_at: new Date().toISOString(),
                })
                .eq("post_id", postId);
        } else {
            await supabase.from("post_analytics").insert({
                post_id: postId,
                views: 1,
                unique_visitors: 1,
                last_viewed_at: new Date().toISOString(),
            });
        }
    } catch {
        // Fire-and-forget — never break the page on analytics errors
    }
}
