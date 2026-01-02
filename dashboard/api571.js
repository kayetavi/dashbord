document.getElementById("damageForm").onsubmit = e => {
  e.preventDefault();

  const temp = Number(document.getElementById("temp").value);
  let result = "No major damage mechanism";

  if (temp > 200) result = "High Temperature Sulfidation";
  if (temp < 60) result = "CO₂ Corrosion";

  document.getElementById("damageResult").innerText =
    "Possible Damage Mechanism: " + result;
};
