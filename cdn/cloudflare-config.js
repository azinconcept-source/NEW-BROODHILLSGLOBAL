// ============================================================
// BroodhillsGlobal — Cloudflare CDN Configuration
// Apply these settings in Cloudflare Dashboard or via API
// ============================================================

/**
 * SETUP STEPS:
 * 1. Go to dash.cloudflare.com → Add site: broodhillsglobal.com
 * 2. Update your domain's nameservers to Cloudflare's
 * 3. Apply the settings below via Dashboard or Cloudflare API
 */

// ── DNS Records ───────────────────────────────────────────
const DNS_RECORDS = [
  { type: "A",     name: "@",   content: "YOUR_SERVER_IP",  proxied: true  },
  { type: "A",     name: "www", content: "YOUR_SERVER_IP",  proxied: true  },
  { type: "CNAME", name: "api", content: "www.broodhillsglobal.com", proxied: true },
  // MX records (not proxied — email must bypass CDN)
  { type: "MX",    name: "@",   content: "mail.broodhillsglobal.com", priority: 10, proxied: false },
];

// ── SSL/TLS Settings ──────────────────────────────────────
const SSL_SETTINGS = {
  mode: "Full (strict)",          // Requires valid SSL cert on origin
  minTLSVersion: "1.2",
  opportunisticEncryption: true,
  automaticHTTPS: true,           // HSTS
  hstsMaxAge: 31536000,
  hstsIncludeSubdomains: true,
  hstsPreload: true,
  alwaysUseHTTPS: true,
};

// ── Performance Settings ──────────────────────────────────
const PERFORMANCE_SETTINGS = {
  speedBrain: true,               // Prefetch resources
  rocketLoader: false,            // Disable — can break scripts; test first
  mirage: true,                   // Lazy-load images on mobile
  polish: "Lossless",             // Optimise images (lossy available)
  webP: true,                     // Convert images to WebP
  http2Prioritization: true,
  earlyHints: true,               // 103 Early Hints
  zeroRTT: true,                  // 0-RTT resumption (TLS 1.3)
  brotli: true,
};

// ── Caching Settings ──────────────────────────────────────
const CACHE_SETTINGS = {
  cacheLevel: "Aggressive",
  browserCacheTTL: 14400,         // 4 hours (Cloudflare respects origin Cache-Control)
  edgeCacheTTL: 86400,            // 1 day at edge for static
  bypassCacheOnCookie: "session_id|wordpress_logged_in", // Don't cache logged-in users
};

// ── Page Rules ────────────────────────────────────────────
const PAGE_RULES = [
  {
    url: "www.broodhillsglobal.com/api/*",
    settings: {
      cacheLevel: "Bypass",       // Never cache API responses
      disablePerformance: false,
    }
  },
  {
    url: "www.broodhillsglobal.com/*.js",
    settings: {
      cacheLevel: "Cache Everything",
      edgeCacheTTL: 2592000,      // 30 days for hashed JS
      browserCacheTTL: 31536000,
    }
  },
  {
    url: "www.broodhillsglobal.com/*.css",
    settings: {
      cacheLevel: "Cache Everything",
      edgeCacheTTL: 2592000,
      browserCacheTTL: 31536000,
    }
  },
];

// ── Firewall / Security Rules ─────────────────────────────
const FIREWALL_RULES = [
  {
    name: "Block bad bots",
    expression: `(cf.client.bot) and not (cf.verified_bot_category in {"Search Engine Crawlers" "Monitoring & Analytics"})`,
    action: "block",
  },
  {
    name: "Rate limit login page",
    expression: `(http.request.uri.path eq "/login" and http.request.method eq "POST")`,
    action: "managed_challenge",
  },
  {
    name: "Allow Googlebot",
    expression: `(cf.verified_bot_category eq "Search Engine Crawlers")`,
    action: "allow",
  },
];

// ── Workers (optional edge caching logic) ─────────────────
const EDGE_WORKER = `
// Cloudflare Worker for custom cache logic
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);

  // Skip cache for POST, auth, admin routes
  if (request.method !== 'GET' || url.pathname.startsWith('/api/') || url.pathname.startsWith('/admin/')) {
    return fetch(request);
  }

  const cache = caches.default;
  let response = await cache.match(request);

  if (!response) {
    response = await fetch(request);
    const newResponse = new Response(response.body, response);

    // Set aggressive cache for static assets
    if (/\\.(js|css|woff2|png|webp|avif)$/.test(url.pathname)) {
      newResponse.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    }

    event.waitUntil(cache.put(request, newResponse.clone()));
    return newResponse;
  }

  return response;
}
`;

// ── Cloudflare API Setup Script ───────────────────────────
const SETUP_INSTRUCTIONS = `
CLOUDFLARE SETUP INSTRUCTIONS
==============================

OPTION A: Dashboard (Recommended for first setup)
--------------------------------------------------
1. dash.cloudflare.com → "Add a Site" → broodhillsglobal.com → Free/Pro plan
2. DNS: Add A records pointing to your server IP with Proxy (orange cloud) ON
3. SSL/TLS → Overview → Set to "Full (strict)"
4. SSL/TLS → Edge Certificates:
   - Always Use HTTPS: ON
   - HTTP Strict Transport Security (HSTS): Enable (max-age=1year, subdomains, preload)
   - Minimum TLS: 1.2
   - TLS 1.3: ON
5. Speed → Optimization:
   - Early Hints: ON
   - Brotli: ON
   - Polish: Lossless + WebP
6. Caching → Configuration:
   - Caching Level: Standard
   - Browser Cache TTL: 4 hours
7. Security → Settings:
   - Security Level: Medium
   - Bot Fight Mode: ON

OPTION B: Cloudflare API
--------------------------
CF_API_TOKEN="your_api_token"
ZONE_ID="your_zone_id"   # Found in the Dashboard → Overview → right sidebar

# Example: Set SSL mode to Full (strict)
curl -X PATCH "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/ssl" \\
  -H "Authorization: Bearer $CF_API_TOKEN" \\
  -H "Content-Type: application/json" \\
  --data '{"value":"strict"}'

# Purge cache after deployment:
curl -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/purge_cache" \\
  -H "Authorization: Bearer $CF_API_TOKEN" \\
  -H "Content-Type: application/json" \\
  --data '{"purge_everything":true}'

PERFORMANCE VERIFICATION
--------------------------
After setup, verify with:
- GTmetrix:     https://gtmetrix.com
- WebPageTest:  https://www.webpagetest.org
- PageSpeed:    https://pagespeed.web.dev
- SSL Test:     https://www.ssllabs.com/ssltest/analyze.html?d=broodhillsglobal.com
`;

console.log(SETUP_INSTRUCTIONS);
