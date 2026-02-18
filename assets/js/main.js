(() => {
  // Mobile menu
  const toggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    // Close menu when clicking a link (mobile)
    nav.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Smooth scroll for internal anchors
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // Filtering + search
  const cards = Array.from(document.querySelectorAll("[data-tags]"));
  const filters = Array.from(document.querySelectorAll("[data-filter]"));
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");

  let activeFilter = "all";
  let query = "";

  function normalize(s) {
    return (s || "").toLowerCase().trim();
  }

  function apply() {
    const q = normalize(query);

    cards.forEach(card => {
      const tags = normalize(card.getAttribute("data-tags"));
      const text = normalize(card.innerText);

      const matchFilter = activeFilter === "all" ? true : tags.includes(activeFilter);
      const matchQuery = q.length === 0 ? true : (text.includes(q) || tags.includes(q));

      card.classList.toggle("is-hidden", !(matchFilter && matchQuery));
    });
  }

  filters.forEach(btn => {
    btn.addEventListener("click", () => {
      filters.forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      activeFilter = btn.getAttribute("data-filter") || "all";
      apply();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      query = searchInput.value;
      apply();
    });
  }

  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      query = searchInput ? searchInput.value : "";
      apply();
    });
  }
})();
