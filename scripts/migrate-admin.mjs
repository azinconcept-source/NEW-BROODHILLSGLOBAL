// Full migration + user confirmation using service role key
// Run with: bun run scripts/migrate-admin.mjs

const SUPABASE_URL = "https://mgkgqwnfoepuznlflqbr.supabase.co";
const SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1na2dxd25mb2VwdXpubGZscWJyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjA0OTQ5MiwiZXhwIjoyMDg3NjI1NDkyfQ.lvGpo2Pz9Wad5rzpSce8rPg3Aa3wRRuMMynO4QGYm3g";

const headers = {
    "Content-Type": "application/json",
    apikey: SERVICE_KEY,
    Authorization: `Bearer ${SERVICE_KEY}`,
    Prefer: "return=representation",
};

// ── Helper: run a SQL statement via the pg-meta / rpc approach ──
// Supabase exposes a REST RPC endpoint for custom functions.
// We'll create a sql_exec function first via the Supabase REST API
// using the pg extension via Management API.
// NOTE: Supabase Management API uses a DIFFERENT base URL.
// We'll instead use the supabase-js admin client approach.

async function pgQuery(sql) {
    // Use Supabase's internal pg-meta query endpoint
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
        method: "POST",
        headers,
        body: JSON.stringify({ sql }),
    });
    if (!res.ok) {
        const t = await res.text();
        throw new Error(t);
    }
    return res.json();
}

// ── Step 1: Try to create the exec_sql helper via REST (may already exist) ──

// We'll use the Supabase query endpoint directly
// The Management API v1 endpoint is at api.supabase.com/v1/projects/{ref}/...
// But that requires a personal access token, not service role key.

// BEST APPROACH: Use the Data API to POST raw SQL via the supabase-js admin client
// which sends to /rest/v1/rpc/<function>. We need to check if we have
// a query function. Let's try the pg_meta endpoint instead.

const MGT_URL = "https://mgkgqwnfoepuznlflqbr.supabase.co";

async function runSQL(sql) {
    // Supabase exposes internal pg-meta at /pg/query for service_role
    const res = await fetch(`${MGT_URL}/pg/query`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${SERVICE_KEY}`,
        },
        body: JSON.stringify({ query: sql }),
    });
    const text = await res.text();
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${text}`);
    return text;
}

const SQL_STEPS = [
    // POSTS TABLE
    `CREATE TABLE IF NOT EXISTS public.posts (
    id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    slug          text NOT NULL UNIQUE,
    title         text NOT NULL,
    priority      text NOT NULL DEFAULT 'Company Priority'
                    CHECK (priority IN ('Global Priority','National Priority','Company Priority','Local Priority')),
    category      text NOT NULL DEFAULT 'General',
    status        text NOT NULL DEFAULT 'Draft'
                    CHECK (status IN ('Published','Draft','Archived')),
    excerpt       text,
    content       text,
    featured_image text,
    reading_time  text,
    author_email  text,
    published_at  timestamptz,
    created_at    timestamptz NOT NULL DEFAULT now(),
    updated_at    timestamptz NOT NULL DEFAULT now()
  )`,

    `CREATE OR REPLACE FUNCTION public.set_updated_at()
   RETURNS TRIGGER LANGUAGE plpgsql AS $$
   BEGIN NEW.updated_at = now(); RETURN NEW; END; $$`,

    `DROP TRIGGER IF EXISTS posts_updated_at ON public.posts`,

    `CREATE TRIGGER posts_updated_at BEFORE UPDATE ON public.posts
   FOR EACH ROW EXECUTE FUNCTION public.set_updated_at()`,

    // POST ANALYTICS
    `CREATE TABLE IF NOT EXISTS public.post_analytics (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id         uuid NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
    views           bigint NOT NULL DEFAULT 0,
    unique_visitors bigint NOT NULL DEFAULT 0,
    last_viewed_at  timestamptz,
    UNIQUE (post_id)
  )`,

    // COMMENTS
    `CREATE TABLE IF NOT EXISTS public.comments (
    id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id      uuid NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
    author_name  text NOT NULL,
    author_email text,
    content      text NOT NULL,
    is_approved  boolean NOT NULL DEFAULT false,
    created_at   timestamptz NOT NULL DEFAULT now()
  )`,

    // RLS
    `ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY`,
    `ALTER TABLE public.post_analytics ENABLE ROW LEVEL SECURITY`,
    `ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY`,

    `DROP POLICY IF EXISTS "Public can read published posts" ON public.posts`,
    `DROP POLICY IF EXISTS "Auth users full access on posts" ON public.posts`,
    `DROP POLICY IF EXISTS "Anon can upsert analytics" ON public.post_analytics`,
    `DROP POLICY IF EXISTS "Auth can read analytics" ON public.post_analytics`,
    `DROP POLICY IF EXISTS "Anon can insert comments" ON public.comments`,
    `DROP POLICY IF EXISTS "Public can read approved comments" ON public.comments`,
    `DROP POLICY IF EXISTS "Auth can manage comments" ON public.comments`,

    `CREATE POLICY "Public can read published posts" ON public.posts FOR SELECT USING (status = 'Published')`,
    `CREATE POLICY "Auth users full access on posts" ON public.posts FOR ALL TO authenticated USING (true) WITH CHECK (true)`,
    `CREATE POLICY "Anon can upsert analytics" ON public.post_analytics FOR ALL TO anon USING (true) WITH CHECK (true)`,
    `CREATE POLICY "Auth can read analytics" ON public.post_analytics FOR SELECT TO authenticated USING (true)`,
    `CREATE POLICY "Anon can insert comments" ON public.comments FOR INSERT TO anon WITH CHECK (true)`,
    `CREATE POLICY "Public can read approved comments" ON public.comments FOR SELECT USING (is_approved = true)`,
    `CREATE POLICY "Auth can manage comments" ON public.comments FOR ALL TO authenticated USING (true) WITH CHECK (true)`,
];

let i = 0;
let migrationOk = false;
for (const sql of SQL_STEPS) {
    i++;
    try {
        await runSQL(sql);
        console.log(`✅ Step ${i}/${SQL_STEPS.length}`);
        migrationOk = true;
    } catch (err) {
        console.error(`❌ Step ${i} failed:`, err.message.slice(0, 200));
        // If pg/query doesn't exist, break and report
        if (err.message.includes("404") || err.message.includes("Cannot")) {
            console.log("\n⚠️  /pg/query endpoint not available. Will try REST batch insert for seed data only.");
            break;
        }
    }
}

// ── SEED POSTS via REST API (works with service role regardless) ──
console.log("\n📤 Seeding posts via REST...");

const seedRes = await fetch(`${SUPABASE_URL}/rest/v1/posts`, {
    method: "POST",
    headers: { ...headers, Prefer: "resolution=ignore-duplicates,return=minimal" },
    body: JSON.stringify([
        {
            slug: "energy-west-africa-expansion",
            title: "Broodhills Global Expands Offshore Operations in West Africa with New Strategic Partners",
            priority: "Global Priority",
            category: "Operations",
            status: "Published",
            excerpt: "Broodhills Global Services announces a landmark expansion into deepwater offshore fields across three West African nations, formalising partnerships with regional energy operators.",
            featured_image: "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1400&q=80",
            reading_time: "6 min read",
            author_email: "info@broodhillsglobal.com",
            published_at: "2026-03-04T10:45:00+01:00",
            content: "<p>In a landmark move, Broodhills Global Services formalised partnerships across Nigeria, Ghana, and Senegal.</p><h2>A Region of Immense Opportunity</h2><p>West Africa is one of the most strategically significant energy frontiers in the world.</p><blockquote>We are not simply entering a market. We are building the institutional infrastructure that will underpin West Africa's energy independence for decades to come.</blockquote><h2>Key Partnership Highlights</h2><p>The three new joint ventures span a combined acreage of over 4,200 square kilometres in proven deepwater hydrocarbon plays.</p>",
        },
        {
            slug: "annual-results-2025",
            title: "Broodhills Global: Annual Results 2025 — Record Growth in Energy Trade and Infrastructure Deployment",
            priority: "National Priority",
            category: "Financial Results",
            status: "Published",
            excerpt: "Broodhills Global Services reports record full-year 2025 results, with energy trading volumes up 42% and EBITDA exceeding forecast by 18%, driven by disciplined capital deployment.",
            featured_image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1400&q=80",
            reading_time: "8 min read",
            author_email: "info@broodhillsglobal.com",
            published_at: "2026-02-28T08:15:00+01:00",
            content: "<p>Full-year 2025 revenues reached $2.4 billion — a 38% increase over the prior year.</p><h2>Financial Highlights</h2><p>The results were driven by strong price realisation in the company's energy trading division.</p><blockquote>2025 was the year Broodhills moved from promise to proof.</blockquote>",
        },
        {
            slug: "new-investment-framework-2026",
            title: "Broodhills Global Board of Directors Approves New Investment Framework for 2026",
            priority: "Company Priority",
            category: "Governance",
            status: "Published",
            excerpt: "The Board of Directors has formally approved the 2026 Investment Framework, outlining capital allocation priorities, risk thresholds, and new criteria for project sanctioning.",
            featured_image: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=1400&q=80",
            reading_time: "5 min read",
            author_email: "info@broodhillsglobal.com",
            published_at: "2026-02-25T16:30:00+01:00",
            content: "<p>The 2026 Investment Framework defines how $680 million in capital will be deployed across the portfolio.</p><blockquote>This framework is a statement of intent about the kind of company Broodhills aspires to be.</blockquote>",
        },
        {
            slug: "decarbonized-supply-chain-milestone",
            title: "Sustainability at the Core: Broodhills Global Achieves Milestone in Decarbonized Supply Chain Initiatives",
            priority: "Local Priority",
            category: "Sustainability",
            status: "Published",
            excerpt: "Broodhills Global has reached a key decarbonisation milestone — 60% of its supply chain partners have now achieved verified low-carbon certification.",
            featured_image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1400&q=80",
            reading_time: "7 min read",
            author_email: "info@broodhillsglobal.com",
            published_at: "2026-02-20T11:00:00+01:00",
            content: "<p>60% of active supply chain partners have achieved verified low-carbon certification under the Supplier Sustainability Programme.</p><blockquote>A supply chain is only as clean as its weakest link.</blockquote>",
        },
    ]),
});

if (seedRes.ok || seedRes.status === 201) {
    console.log("✅ Posts seeded (or already exist)");
} else {
    const t = await seedRes.text();
    // Table might not exist yet — that's OK, will be created by the SQL migration
    if (t.includes("does not exist") || t.includes("relation")) {
        console.log("⚠️  Posts table not yet created. Run supabase_migration.sql in the Supabase SQL Editor first.");
    } else {
        console.log("Seed response:", t.slice(0, 300));
    }
}

// ── CONFIRM USER EMAIL via Admin API ──
console.log("\n🔑 Confirming user email...");

// Find the user by email
const usersRes = await fetch(`${SUPABASE_URL}/auth/v1/admin/users?page=1&per_page=50`, {
    headers: {
        apikey: SERVICE_KEY,
        Authorization: `Bearer ${SERVICE_KEY}`,
    },
});

const usersJson = await usersRes.json();
const user = (usersJson.users ?? []).find(u => u.email === "info@broodhillsglobal.com");

if (!user) {
    console.log("⚠️  User not found in auth.users");
} else if (user.email_confirmed_at) {
    console.log("✅ User email already confirmed!");
} else {
    // Confirm email by updating user
    const confirmRes = await fetch(`${SUPABASE_URL}/auth/v1/admin/users/${user.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            apikey: SERVICE_KEY,
            Authorization: `Bearer ${SERVICE_KEY}`,
        },
        body: JSON.stringify({ email_confirm: true }),
    });

    if (confirmRes.ok) {
        console.log("✅ User email confirmed! info@broodhillsglobal.com can now log in.");
    } else {
        const t = await confirmRes.text();
        console.error("❌ Confirmation failed:", t.slice(0, 200));
    }
}

// ── FINAL: Test Sign-in ──
console.log("\n🔐 Testing sign-in...");
const signinRes = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        apikey: SERVICE_KEY,
        Authorization: `Bearer ${SERVICE_KEY}`,
    },
    body: JSON.stringify({
        email: "info@broodhillsglobal.com",
        password: "Broodhills200984?",
    }),
});
const signinJson = await signinRes.json();
if (signinJson.access_token) {
    console.log("✅ Sign-in test PASSED — auth is fully working!");
} else {
    console.log("❌ Sign-in test failed:", signinJson.error_description || signinJson.error || JSON.stringify(signinJson));
}

console.log("\n✨ Done!");
