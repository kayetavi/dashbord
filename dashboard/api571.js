import { createClient } from
  "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// ✅ SUPABASE CLIENT
const supabase = createClient(
  "https://apmmvovefgywogzcnvmr.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwbW12b3ZlZmd5d29nemNudm1yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjczNDA4ODQsImV4cCI6MjA4MjkxNjg4NH0.B0KRW0-OoV_11E_ism4_3xwusP85syna3UMy3kZy3gU"
);

const form = document.getElementById("damageForm");
const resultBox = document.getElementById("damageResult");

// ✅ FORM SUBMIT
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const material = document.getElementById("material").value;
  const temp = Number(document.getElementById("temp").value);
  const env = document.getElementById("env").value;

  resultBox.innerHTML = "Checking API 571 rules...";

  // 🔍 SUPABASE QUERY (Material + Temperature ONLY)
  const { data, error } = await supabase
    .from("api571_rules")
    .select("*")
    .eq("material", material)
    .lte("min_temp", temp)
    .gte("max_temp", temp);

  console.log("SUPABASE DATA →", data);
  console.log("ERROR →", error);

  if (error || !data || data.length === 0) {
    resultBox.innerHTML =
      "<b>No dominant damage mechanism found (API 571)</b>";
    return;
  }

  // ✅ ENVIRONMENT NORMALIZATION
  const envNorm = env
    .toUpperCase()
    .replace("₂", "2")
    .trim();

  // ✅ ENVIRONMENT MATCH
  const matches = data.filter(r =>
    r.environment
      .toUpperCase()
      .replace("₂", "2")
      .includes(envNorm)
  );

  if (matches.length === 0) {
    resultBox.innerHTML =
      "<b>No dominant damage mechanism found (API 571)</b>";
    return;
  }

  // ✅ DISPLAY RESULT
  resultBox.innerHTML = `
    <h4>Potential Damage Mechanism(s) – API 571</h4>
    <ul>
      ${matches.map(r => `
        <li>
          <b>${r.damage}</b><br/>
          <small>
            Material: ${r.material} |
            Temp: ${r.min_temp}–${r.max_temp} °C |
            Environment: ${r.environment}
          </small>
        </li>
      `).join("")}
    </ul>
  `;
});
