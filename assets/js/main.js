(function () {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".mobile-menu");

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      menu.hidden = expanded;
    });

    // Chiudi menu quando clicchi un link
    menu.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (!a) return;
      toggle.setAttribute("aria-expanded", "false");
      menu.hidden = true;
    });
  }

  // Smooth scroll per anchor interni (senza eventi scroll pesanti)
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, { passive: false });
  });
})();
