import { createClient } from
"https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
  "https://apmmvovefgywogzcnvmr.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwbW12b3ZlZmd5d29nemNudm1yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjczNDA4ODQsImV4cCI6MjA4MjkxNjg4NH0.B0KRW0-OoV_11E_ism4_3xwusP85syna3UMy3kZy3gU"
);

const form = document.getElementById("damageForm");
const resultBox = document.getElementById("damageResult");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const material = document.getElementById("material").value;
  const temp = Number(document.getElementById("temp").value);

  const env = document
    .getElementById("env")
    .value
    .replace("₂", "2")
    .toUpperCase()
    .trim();

  const { data, error } = await supabase
    .from("api571_rules")
    .select("*")
    .eq("material", material)
    .lte("min_temp", temp)
    .gte("max_temp", temp);

  if (error || !data || data.length === 0) {
    resultBox.innerHTML =
      "<b>No dominant damage mechanism found (API 571)</b>";
    return;
  }

  const matches = data.filter(r =>
    r.environment.toUpperCase().includes(env)
  );

  if (matches.length === 0) {
    resultBox.innerHTML =
      "<b>No dominant damage mechanism found (API 571)</b>";
    return;
  }

  resultBox.innerHTML = `
    <h4>Possible Damage Mechanism(s)</h4>
    <ul>
      ${matches.map(r => `<li>${r.damage}</li>`).join("")}
    </ul>
  `;
});
