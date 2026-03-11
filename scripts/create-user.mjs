// Creates the editor user in Supabase Auth
// Run with:  bun run scripts/create-user.mjs

const SUPABASE_URL = "https://mgkgqwnfoepuznlflqbr.supabase.co";
const ANON_KEY = "sb_publishable_uzHeta182chaSLDSti-sHg_f1dlPxVH";

// Try to sign up the user
const res = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        apikey: ANON_KEY,
        Authorization: `Bearer ${ANON_KEY}`,
    },
    body: JSON.stringify({
        email: "info@broodhillsglobal.com",
        password: "Broodhills200984?",
        data: { role: "admin" },
    }),
});

const json = await res.json();

if (json.error || json.msg) {
    const msg = json.error?.message || json.msg || JSON.stringify(json);
    if (msg.toLowerCase().includes("already")) {
        console.log("ℹ️  User already exists — good to go!");
    } else {
        console.error("❌ Sign-up error:", msg);
        console.log("👉 Please create the user manually in the Supabase Dashboard:");
        console.log("   Authentication → Users → Add User");
        console.log("   Email: info@broodhillsglobal.com");
        console.log("   Password: Broodhills200984?");
    }
} else if (json.user) {
    console.log("✅ User created:", json.user.email);
    console.log("ℹ️  Check your Supabase dashboard if email confirmation is required.");
} else {
    console.log("Response:", JSON.stringify(json, null, 2));
}
