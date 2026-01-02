function showSection(id) {
  document.querySelectorAll(".section").forEach(sec => {
    sec.classList.remove("active");
  });
  document.getElementById(id).classList.add("active");
}

document.getElementById("btn-damage").onclick = () =>
  showSection("section-damage");

document.getElementById("btn-thickness").onclick = () =>
  showSection("section-thickness");

document.getElementById("btn-design").onclick = () =>
  showSection("section-design");
