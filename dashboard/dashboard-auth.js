import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
  "https://apmmvovefgywogzcnvmr.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwbW12b3ZlZmd5d29nemNudm1yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjczNDA4ODQsImV4cCI6MjA4MjkxNjg4NH0.B0KRW0-OoV_11E_ism4_3xwusP85syna3UMy3kZy3gU"
);

// 🔐 Protect dashboard
const { data } = await supabase.auth.getSession();

if (!data.session) {
  // ❌ Not logged in → go to login
  window.location.href = "../login/";
} else {
  // ✅ Logged in → show email
  const emailEl = document.getElementById("userEmail");
  if (emailEl) {
    emailEl.innerText = data.session.user.email;
  }
}

// 🚪 Logout
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    await supabase.auth.signOut();
    window.location.href = "../login/";
  });
}
