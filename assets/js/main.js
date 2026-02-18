(function () {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Mobile menu
  const burger = document.querySelector(".burger");
  const mobile = document.querySelector(".mobile");

  function closeMobile() {
    if (!burger || !mobile) return;
    burger.setAttribute("aria-expanded", "false");
    mobile.style.display = "none";
    mobile.setAttribute("aria-hidden", "true");
  }

  function openMobile() {
    if (!burger || !mobile) return;
    burger.setAttribute("aria-expanded", "true");
    mobile.style.display = "block";
    mobile.setAttribute("aria-hidden", "false");
  }

  if (burger && mobile) {
    closeMobile();
    burger.addEventListener("click", () => {
      const expanded = burger.getAttribute("aria-expanded") === "true";
      expanded ? closeMobile() : openMobile();
    });

    // close when clicking a link
    mobile.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => closeMobile());
    });

    // close on resize to desktop
    window.addEventListener("resize", () => {
      if (window.innerWidth > 980) closeMobile();
    });
  }

  // Search + filters (client-side)
  const q = document.getElementById("q");
  const searchBtn = document.getElementById("searchBtn");
  const cards = Array.from(document.querySelectorAll(".card"));
  const filterButtons = Array.from(document.querySelectorAll(".filter"));

  let activeFilter = "all";

  function normalize(s) {
    return (s || "").toLowerCase().trim();
  }

  function matchesFilter(card) {
    if (activeFilter === "all") return true;
    const tags = normalize(card.getAttribute("data-tags"));
    return tags.includes(activeFilter);
  }

  function matchesQuery(card, query) {
    if (!query) return true;
    const title = normalize(card.getAttribute("data-title"));
    const text = normalize(card.innerText);
    return title.includes(query) || text.includes(query);
  }

  function apply() {
    const query = normalize(q?.value);
    cards.forEach((card) => {
      const ok = matchesFilter(card) && matchesQuery(card, query);
      card.style.display = ok ? "" : "none";
    });
  }

  if (q) {
    q.addEventListener("input", apply);
    q.addEventListener("keydown", (e) => {
      if (e.key === "Enter") apply();
    });
  }
  if (searchBtn) searchBtn.addEventListener("click", apply);

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      activeFilter = btn.getAttribute("data-filter") || "all";

      filterButtons.forEach((b) => b.classList.remove("filter--active"));
      if (activeFilter !== "all") btn.classList.add("filter--active");

      // If reset
      if (activeFilter === "all") {
        filterButtons.forEach((b) => b.classList.remove("filter--active"));
      }

      apply();
    });
  });
})();
