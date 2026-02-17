(function () {
  // Mobile menu
  const burger = document.getElementById("burger");
  const mobileMenu = document.getElementById("mobileMenu");

  if (burger && mobileMenu) {
    burger.addEventListener("click", () => {
      const isOpen = burger.getAttribute("aria-expanded") === "true";
      burger.setAttribute("aria-expanded", String(!isOpen));
      mobileMenu.hidden = isOpen;
    });

    // Close menu when clicking a link
    mobileMenu.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        burger.setAttribute("aria-expanded", "false");
        mobileMenu.hidden = true;
      });
    });
  }

  // Tabs (itinerari)
  const tabs = document.querySelectorAll(".tab");
  const panels = {
    disponibili: document.getElementById("panel-disponibili"),
    inarrivo: document.getElementById("panel-inarrivo"),
  };

  tabs.forEach((t) => {
    t.addEventListener("click", () => {
      tabs.forEach((x) => x.classList.remove("active"));
      t.classList.add("active");

      const key = t.dataset.tab;
      Object.values(panels).forEach((p) => p && p.classList.remove("active"));
      if (panels[key]) panels[key].classList.add("active");
    });
  });

  // Modal
  const modalTriggers = document.querySelectorAll("[data-open-modal]");
  modalTriggers.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-open-modal");
      const modal = document.getElementById(id);
      if (modal && typeof modal.showModal === "function") modal.showModal();
    });
  });

  document.querySelectorAll("[data-close-modal]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const dialog = btn.closest("dialog");
      if (dialog) dialog.close();
    });
  });

  // Chips filter (demo: evidenzia cards per tag)
  const chips = document.querySelectorAll(".chip");
  const allTagItems = document.querySelectorAll("[data-tags]");
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const tag = chip.dataset.filter;

      // toggle active
      const isActive = chip.classList.contains("active");
      chips.forEach((c) => c.classList.remove("active"));

      if (isActive) {
        // reset
        allTagItems.forEach((el) => (el.style.opacity = "1"));
        return;
      }

      chip.classList.add("active");
      allTagItems.forEach((el) => {
        const tags = (el.getAttribute("data-tags") || "").toLowerCase();
        el.style.opacity = tags.includes(tag) ? "1" : ".35";
      });
    });
  });

  // Mini “search” (non naviga: scrolla alla sezione più vicina e highlight)
  const searchBtn = document.getElementById("searchBtn");
  const q = document.getElementById("q");

  function doSearch() {
    const term = (q?.value || "").trim().toLowerCase();
    if (!term) return;

    // Semplice: cerca nel testo delle card e le mette in evidenza
    const cards = document.querySelectorAll(".card, .wide-card, .small-card, .it-card");
    let foundAny = false;

    cards.forEach((c) => {
      const text = (c.innerText || "").toLowerCase();
      if (text.includes(term)) {
        c.style.outline = "3px solid rgba(212,175,55,.55)";
        c.style.outlineOffset = "4px";
        foundAny = true;
      } else {
        c.style.outline = "none";
      }
    });

    if (foundAny) {
      document.getElementById("guide")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  if (searchBtn) searchBtn.addEventListener("click", doSearch);
  if (q) q.addEventListener("keydown", (e) => {
    if (e.key === "Enter") doSearch();
  });
})();
