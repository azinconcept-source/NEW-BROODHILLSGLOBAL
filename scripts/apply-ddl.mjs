// Apply DDL via Supabase Management API
// Run with: bun run scripts/apply-ddl.mjs

const PROJECT_REF = "mgkgqwnfoepuznlflqbr";
const SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1na2dxd25mb2VwdXpubGZscWJyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjA0OTQ5MiwiZXhwIjoyMDg3NjI1NDkyfQ.lvGpo2Pz9Wad5rzpSce8rPg3Aa3wRRuMMynO4QGYm3g";
const SUPABASE_URL = "https://mgkgqwnfoepuznlflqbr.supabase.co";

const FULL_SQL = `
-- ============================================================
-- POSTS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.posts (
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
);

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

DROP TRIGGER IF EXISTS posts_updated_at ON public.posts;
CREATE TRIGGER posts_updated_at BEFORE UPDATE ON public.posts
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============================================================
-- POST ANALYTICS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.post_analytics (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id         uuid NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  views           bigint NOT NULL DEFAULT 0,
  unique_visitors bigint NOT NULL DEFAULT 0,
  last_viewed_at  timestamptz,
  UNIQUE (post_id)
);

-- ============================================================
-- COMMENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.comments (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id      uuid NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  author_name  text NOT NULL,
  author_email text,
  content      text NOT NULL,
  is_approved  boolean NOT NULL DEFAULT false,
  created_at   timestamptz NOT NULL DEFAULT now()
);

-- ============================================================
-- RLS
-- ============================================================
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read published posts" ON public.posts;
DROP POLICY IF EXISTS "Auth users full access on posts" ON public.posts;
DROP POLICY IF EXISTS "Anon can upsert analytics" ON public.post_analytics;
DROP POLICY IF EXISTS "Auth can read analytics" ON public.post_analytics;
DROP POLICY IF EXISTS "Anon can insert comments" ON public.comments;
DROP POLICY IF EXISTS "Public can read approved comments" ON public.comments;
DROP POLICY IF EXISTS "Auth can manage comments" ON public.comments;

CREATE POLICY "Public can read published posts" ON public.posts FOR SELECT USING (status = 'Published');
CREATE POLICY "Auth users full access on posts" ON public.posts FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Anon can upsert analytics" ON public.post_analytics FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Auth can read analytics" ON public.post_analytics FOR SELECT TO authenticated USING (true);
CREATE POLICY "Anon can insert comments" ON public.comments FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Public can read approved comments" ON public.comments FOR SELECT USING (is_approved = true);
CREATE POLICY "Auth can manage comments" ON public.comments FOR ALL TO authenticated USING (true) WITH CHECK (true);
`;

// Try Supabase Management REST API
async function tryManagementAPI() {
    console.log("Trying Management API...");
    const res = await fetch(`https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${SERVICE_KEY}`,
        },
        body: JSON.stringify({ query: FULL_SQL }),
    });
    const text = await res.text();
    return { ok: res.ok, status: res.status, text };
}

// Try executing via a function we create using the Supabase client
async function tryRpcExec() {
    console.log("Trying to execute via Admin REST with service role...");
    // First create a temporary function
    const createFnRes = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_ddl`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            apikey: SERVICE_KEY,
            Authorization: `Bearer ${SERVICE_KEY}`,
        },
        body: JSON.stringify({ sql: FULL_SQL }),
    });
    const text = await createFnRes.text();
    return { ok: createFnRes.ok, status: createFnRes.status, text };
}

// Try each approach
const mgmt = await tryManagementAPI();
console.log("Management API result:", mgmt.status, mgmt.text.slice(0, 300));

if (!mgmt.ok) {
    const rpc = await tryRpcExec();
    console.log("RPC result:", rpc.status, rpc.text.slice(0, 300));
}

// Now seed posts via REST (tables should exist if DDL succeeded)
console.log("\n📤 Attempting to seed posts...");
const seedRes = await fetch(`${SUPABASE_URL}/rest/v1/posts`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        apikey: SERVICE_KEY,
        Authorization: `Bearer ${SERVICE_KEY}`,
        Prefer: "resolution=ignore-duplicates,return=minimal",
    },
    body: JSON.stringify([
        {
            slug: "energy-west-africa-expansion",
            title: "Broodhills Global Expands Offshore Operations in West Africa with New Strategic Partners",
            priority: "Global Priority", category: "Operations", status: "Published",
            excerpt: "Broodhills Global Services announces a landmark expansion into deepwater offshore fields across three West African nations.",
            featured_image: "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1400&q=80",
            reading_time: "6 min read", author_email: "info@broodhillsglobal.com",
            published_at: "2026-03-04T10:45:00+01:00",
            content: "<p>In a landmark move, Broodhills Global Services formalised partnerships across Nigeria, Ghana, and Senegal.</p><h2>A Region of Immense Opportunity</h2><p>West Africa is one of the most strategically significant energy frontiers in the world.</p><blockquote>We are not simply entering a market. We are building the institutional infrastructure that will underpin West Africa's energy independence for decades to come.</blockquote>",
        },
        {
            slug: "annual-results-2025",
            title: "Broodhills Global: Annual Results 2025 — Record Growth in Energy Trade and Infrastructure Deployment",
            priority: "National Priority", category: "Financial Results", status: "Published",
            excerpt: "Record full-year 2025 results, with energy trading volumes up 42% and EBITDA exceeding forecast by 18%.",
            featured_image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1400&q=80",
            reading_time: "8 min read", author_email: "info@broodhillsglobal.com",
            published_at: "2026-02-28T08:15:00+01:00",
            content: "<p>Full-year 2025 revenues reached $2.4 billion — a 38% increase over the prior year.</p><h2>Financial Highlights</h2><p>The results were driven by strong price realisation in the company's energy trading division.</p><blockquote>2025 was the year Broodhills moved from promise to proof.</blockquote>",
        },
        {
            slug: "new-investment-framework-2026",
            title: "Broodhills Global Board of Directors Approves New Investment Framework for 2026",
            priority: "Company Priority", category: "Governance", status: "Published",
            excerpt: "The Board formally approved the 2026 Investment Framework, outlining capital allocation priorities.",
            featured_image: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=1400&q=80",
            reading_time: "5 min read", author_email: "info@broodhillsglobal.com",
            published_at: "2026-02-25T16:30:00+01:00",
            content: "<p>The 2026 Investment Framework defines how $680 million in capital will be deployed across the portfolio.</p><blockquote>This framework is a statement of intent about the kind of company Broodhills aspires to be.</blockquote>",
        },
        {
            slug: "decarbonized-supply-chain-milestone",
            title: "Sustainability at the Core: Broodhills Global Achieves Milestone in Decarbonized Supply Chain Initiatives",
            priority: "Local Priority", category: "Sustainability", status: "Published",
            excerpt: "60% of supply chain partners now have verified low-carbon certification under the Supplier Sustainability Programme.",
            featured_image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1400&q=80",
            reading_time: "7 min read", author_email: "info@broodhillsglobal.com",
            published_at: "2026-02-20T11:00:00+01:00",
            content: "<p>60% of active supply chain partners have achieved verified low-carbon certification.</p><blockquote>A supply chain is only as clean as its weakest link.</blockquote>",
        },
    ]),
});

const seedStatus = seedRes.status;
const seedText = await seedRes.text();

if (seedStatus === 201 || seedStatus === 200 || seedStatus === 204) {
    console.log("✅ Posts seeded successfully!");
} else if (seedText.includes("does not exist") || seedText.includes("schema cache")) {
    console.log("⚠️  Tables not yet created. Please run supabase_migration.sql in the Supabase Dashboard SQL Editor.");
    console.log("   URL: https://supabase.com/dashboard/project/mgkgqwnfoepuznlflqbr/sql/new");
} else {
    console.log(`Seed response [${seedStatus}]:`, seedText.slice(0, 400));
}
