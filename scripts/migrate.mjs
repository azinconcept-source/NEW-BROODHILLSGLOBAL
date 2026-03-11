// Migration via Bun's native SQL (no extra packages needed)
// Run with: bun run scripts/migrate.mjs

import { SQL } from "bun";

const db = new SQL("postgresql://postgres:N2%404RVeT%40nVtJJt@db.mgkgqwnfoepuznlflqbr.supabase.co:5432/postgres");

const steps = [
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

    // TRIGGER FUNCTION
    `CREATE OR REPLACE FUNCTION public.set_updated_at()
   RETURNS TRIGGER LANGUAGE plpgsql AS $$
   BEGIN NEW.updated_at = now(); RETURN NEW; END;
   $$`,

    `DROP TRIGGER IF EXISTS posts_updated_at ON public.posts`,

    `CREATE TRIGGER posts_updated_at
     BEFORE UPDATE ON public.posts
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

    // Drop + recreate policies (idempotent)
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

    // SEED
    `INSERT INTO public.posts (slug,title,priority,category,status,excerpt,featured_image,reading_time,author_email,published_at,content)
   VALUES
   ('energy-west-africa-expansion',
    'Broodhills Global Expands Offshore Operations in West Africa with New Strategic Partners',
    'Global Priority','Operations','Published',
    'Broodhills Global Services announces a landmark expansion into deepwater offshore fields across three West African nations, formalising partnerships with regional energy operators.',
    'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1400&q=80',
    '6 min read','info@broodhillsglobal.com','2026-03-04T10:45:00+01:00',
    '<p>In a landmark move that signals Broodhills Global Services'' deepening commitment to West African energy markets, the company announced today the formalisation of strategic partnerships.</p><h2>A Region of Immense Opportunity</h2><p>West Africa continues to be one of the most strategically significant energy frontiers in the world.</p><blockquote>We are not simply entering a market. We are building the institutional infrastructure that will underpin West Africa''s energy independence for decades to come.</blockquote>'),
   ('annual-results-2025',
    'Broodhills Global: Annual Results 2025 — Record Growth in Energy Trade and Infrastructure Deployment',
    'National Priority','Financial Results','Published',
    'Broodhills Global Services reports record full-year 2025 results, with energy trading volumes up 42% and EBITDA exceeding forecast by 18%.',
    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1400&q=80',
    '8 min read','info@broodhillsglobal.com','2026-02-28T08:15:00+01:00',
    '<p>Broodhills Global Services today reported its strongest annual results since inception, with revenues reaching $2.4 billion.</p><h2>Financial Highlights</h2><p>Strong price realisation in energy trading drove results.</p><blockquote>2025 was the year Broodhills moved from promise to proof.</blockquote>'),
   ('new-investment-framework-2026',
    'Broodhills Global Board of Directors Approves New Investment Framework for 2026',
    'Company Priority','Governance','Published',
    'The Board of Directors has formally approved the 2026 Investment Framework, outlining capital allocation priorities.',
    'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=1400&q=80',
    '5 min read','info@broodhillsglobal.com','2026-02-25T16:30:00+01:00',
    '<p>The 2026 Investment Framework defines how $680 million in capital will be deployed.</p><blockquote>This framework is a statement of intent about the kind of company Broodhills aspires to be.</blockquote>'),
   ('decarbonized-supply-chain-milestone',
    'Sustainability at the Core: Broodhills Global Achieves Milestone in Decarbonized Supply Chain Initiatives',
    'Local Priority','Sustainability','Published',
    'Broodhills Global has reached a key decarbonisation milestone — 60% of supply chain partners now have verified low-carbon certification.',
    'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1400&q=80',
    '7 min read','info@broodhillsglobal.com','2026-02-20T11:00:00+01:00',
    '<p>60% of active supply chain partners have achieved verified low-carbon certification under the Supplier Sustainability Programme.</p><blockquote>A supply chain is only as clean as its weakest link.</blockquote>')
   ON CONFLICT (slug) DO NOTHING`,
];

let i = 0;
for (const sql of steps) {
    i++;
    try {
        await db.unsafe(sql);
        console.log(`✅ Step ${i}/${steps.length} done`);
    } catch (err) {
        console.error(`❌ Step ${i} failed:`, err.message);
        process.exit(1);
    }
}

await db.end();
console.log("\n🎉 Migration complete!");
