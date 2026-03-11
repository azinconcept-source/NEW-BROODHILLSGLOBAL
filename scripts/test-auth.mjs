// Test: attempt to sign in with the created user
const SUPABASE_URL = "https://mgkgqwnfoepuznlflqbr.supabase.co";
const ANON_KEY = "sb_publishable_uzHeta182chaSLDSti-sHg_f1dlPxVH";

const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        apikey: ANON_KEY,
        Authorization: `Bearer ${ANON_KEY}`,
    },
    body: JSON.stringify({
        email: "info@broodhillsglobal.com",
        password: "Broodhills200984?",
    }),
});

const json = await res.json();

if (json.access_token) {
    console.log("✅ Sign-in successful! Auth is working.");
    console.log("   User ID:", json.user?.id);
} else {
    const msg = json.error_description || json.error || JSON.stringify(json);
    console.log("❌ Sign-in failed:", msg);
    if (msg.includes("confirm")) {
        console.log("\n👉 Action required: Disable email confirmation in Supabase:");
        console.log("   1. Go to https://supabase.com/dashboard/project/mgkgqwnfoepuznlflqbr/auth/providers");
        console.log("   2. Scroll to 'Email' section");
        console.log("   3. Turn OFF 'Confirm email' toggle");
        console.log("   4. Then also confirm the existing user in Authentication → Users");
    }
}
