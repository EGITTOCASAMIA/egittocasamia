(function () {
  const burger = document.querySelector("[data-burger]");
  const menu = document.querySelector("[data-mobilemenu]");
  if (burger && menu) {
    burger.addEventListener("click", () => {
      const open = menu.getAttribute("data-open") === "true";
      menu.setAttribute("data-open", (!open).toString());
      menu.style.display = open ? "none" : "block";
      burger.setAttribute("aria-expanded", (!open).toString());
    });
  }

  // year
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // smooth scroll for same-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (!id || id.length < 2) return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      // close mobile menu after click
      if (menu && menu.getAttribute("data-open") === "true") {
        menu.setAttribute("data-open", "false");
        menu.style.display = "none";
        if (burger) burger.setAttribute("aria-expanded", "false");
      }
    });
  });
})();
