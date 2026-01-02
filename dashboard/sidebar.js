function showSection(id) {
  document.querySelectorAll(".section").forEach(sec => {
    sec.classList.remove("active");
  });
  document.getElementById(id).classList.add("active");
}

/* BUTTONS */
document.getElementById("btn-damage").onclick = () =>
  showSection("section-damage");

document.getElementById("btn-thickness").onclick = () =>
  showSection("section-thickness");

document.getElementById("btn-design").onclick = () =>
  showSection("section-design");

/* LI ITEMS */
document.getElementById("li-criteria").onclick = () =>
  showSection("section-criteria");

document.getElementById("li-corrosion").onclick = () =>
  showSection("section-corrosion");

document.getElementById("li-fluid").onclick = () =>
  showSection("section-fluid");

document.getElementById("li-inventory").onclick = () =>
  showSection("section-inventory");

document.getElementById("li-stat").onclick = () =>
  showSection("section-stat");

document.getElementById("li-piping").onclick = () =>
  showSection("section-piping");

document.getElementById("li-vessel").onclick = () =>
  showSection("section-vessel");
