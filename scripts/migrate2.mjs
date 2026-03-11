// Migration via the `postgres` package (supports SSL)
// Run with:  bun run scripts/migrate2.mjs

import postgres from "postgres";

const sql = postgres(
    "postgresql://postgres:N2%404RVeT%40nVtJJt@db.mgkgqwnfoepuznlflqbr.supabase.co:5432/postgres",
    { ssl: "require", max: 1 }
);

const steps = [
    // POSTS TABLE
    sql`CREATE TABLE IF NOT EXISTS public.posts (
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

    sql`CREATE OR REPLACE FUNCTION public.set_updated_at()
      RETURNS TRIGGER LANGUAGE plpgsql AS $$
      BEGIN NEW.updated_at = now(); RETURN NEW; END;
      $$`,

    sql`DROP TRIGGER IF EXISTS posts_updated_at ON public.posts`,

    sql`CREATE TRIGGER posts_updated_at
      BEFORE UPDATE ON public.posts
      FOR EACH ROW EXECUTE FUNCTION public.set_updated_at()`,

    // POST ANALYTICS
    sql`CREATE TABLE IF NOT EXISTS public.post_analytics (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id         uuid NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
    views           bigint NOT NULL DEFAULT 0,
    unique_visitors bigint NOT NULL DEFAULT 0,
    last_viewed_at  timestamptz,
    UNIQUE (post_id)
  )`,

    // COMMENTS
    sql`CREATE TABLE IF NOT EXISTS public.comments (
    id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id      uuid NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
    author_name  text NOT NULL,
    author_email text,
    content      text NOT NULL,
    is_approved  boolean NOT NULL DEFAULT false,
    created_at   timestamptz NOT NULL DEFAULT now()
  )`,

    // RLS
    sql`ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY`,
    sql`ALTER TABLE public.post_analytics ENABLE ROW LEVEL SECURITY`,
    sql`ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY`,

    sql`DROP POLICY IF EXISTS "Public can read published posts" ON public.posts`,
    sql`DROP POLICY IF EXISTS "Auth users full access on posts" ON public.posts`,
    sql`DROP POLICY IF EXISTS "Anon can upsert analytics" ON public.post_analytics`,
    sql`DROP POLICY IF EXISTS "Auth can read analytics" ON public.post_analytics`,
    sql`DROP POLICY IF EXISTS "Anon can insert comments" ON public.comments`,
    sql`DROP POLICY IF EXISTS "Public can read approved comments" ON public.comments`,
    sql`DROP POLICY IF EXISTS "Auth can manage comments" ON public.comments`,

    sql`CREATE POLICY "Public can read published posts" ON public.posts FOR SELECT USING (status = 'Published')`,
    sql`CREATE POLICY "Auth users full access on posts" ON public.posts FOR ALL TO authenticated USING (true) WITH CHECK (true)`,
    sql`CREATE POLICY "Anon can upsert analytics" ON public.post_analytics FOR ALL TO anon USING (true) WITH CHECK (true)`,
    sql`CREATE POLICY "Auth can read analytics" ON public.post_analytics FOR SELECT TO authenticated USING (true)`,
    sql`CREATE POLICY "Anon can insert comments" ON public.comments FOR INSERT TO anon WITH CHECK (true)`,
    sql`CREATE POLICY "Public can read approved comments" ON public.comments FOR SELECT USING (is_approved = true)`,
    sql`CREATE POLICY "Auth can manage comments" ON public.comments FOR ALL TO authenticated USING (true) WITH CHECK (true)`,
];

let i = 0;
for (const step of steps) {
    i++;
    try {
        await step;
        console.log(`✅ Step ${i}/${steps.length}`);
    } catch (err) {
        console.error(`❌ Step ${i} failed:`, err.message);
        await sql.end();
        process.exit(1);
    }
}

// Seed posts
try {
    await sql`INSERT INTO public.posts (slug,title,priority,category,status,excerpt,featured_image,reading_time,author_email,published_at,content)
  VALUES
  (
    'energy-west-africa-expansion',
    'Broodhills Global Expands Offshore Operations in West Africa with New Strategic Partners',
    'Global Priority','Operations','Published',
    'Broodhills Global Services announces a landmark expansion into deepwater offshore fields across three West African nations.',
    'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1400&q=80',
    '6 min read','info@broodhillsglobal.com','2026-03-04T10:45:00+01:00',
    '<p>In a landmark move, Broodhills Global Services formalised partnerships across Nigeria, Ghana, and Senegal.</p><h2>A Region of Immense Opportunity</h2><p>West Africa is one of the most significant energy frontiers in the world.</p><blockquote>We are building the institutional infrastructure that will underpin West Africa''s energy independence for decades to come.</blockquote>'
  ),
  (
    'annual-results-2025',
    'Broodhills Global: Annual Results 2025 — Record Growth in Energy Trade and Infrastructure Deployment',
    'National Priority','Financial Results','Published',
    'Broodhills Global Services reports record full-year 2025 results, with trading volumes up 42% and EBITDA exceeding forecast by 18%.',
    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1400&q=80',
    '8 min read','info@broodhillsglobal.com','2026-02-28T08:15:00+01:00',
    '<p>Full-year 2025 revenues reached $2.4 billion — a 38% increase — with EBITDA of $420 million.</p><h2>Financial Highlights</h2><p>Strong price realisation in energy trading drove results.</p><blockquote>2025 was the year Broodhills moved from promise to proof.</blockquote>'
  ),
  (
    'new-investment-framework-2026',
    'Broodhills Global Board of Directors Approves New Investment Framework for 2026',
    'Company Priority','Governance','Published',
    'The Board formally approved the 2026 Investment Framework, outlining capital allocation priorities for $680m across the portfolio.',
    'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=1400&q=80',
    '5 min read','info@broodhillsglobal.com','2026-02-25T16:30:00+01:00',
    '<p>The 2026 Investment Framework defines how $680 million in capital will be deployed.</p><blockquote>This framework is a statement of intent about the kind of company Broodhills aspires to be.</blockquote>'
  ),
  (
    'decarbonized-supply-chain-milestone',
    'Sustainability at the Core: Broodhills Global Achieves Milestone in Decarbonized Supply Chain Initiatives',
    'Local Priority','Sustainability','Published',
    'Broodhills Global has reached a key decarbonisation milestone — 60% of supply chain partners now certified low-carbon.',
    'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1400&q=80',
    '7 min read','info@broodhillsglobal.com','2026-02-20T11:00:00+01:00',
    '<p>60% of active supply chain partners have achieved verified low-carbon certification under the Supplier Sustainability Programme.</p><blockquote>A supply chain is only as clean as its weakest link.</blockquote>'
  )
  ON CONFLICT (slug) DO NOTHING`;
    console.log(`✅ Seed: 4 posts inserted (or already exist)`);
} catch (err) {
    console.error("❌ Seed failed:", err.message);
}

await sql.end();
console.log("\n🎉 Migration complete!");
