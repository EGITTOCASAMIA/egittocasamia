// EGITTO CASA MIA — main.js
(function () {
  const burger = document.querySelector("[data-burger]");
  const drawer = document.querySelector("[data-drawer]");

  if (burger && drawer) {
    burger.addEventListener("click", () => {
      const isOpen = drawer.getAttribute("data-open") === "true";
      drawer.setAttribute("data-open", String(!isOpen));
      drawer.style.display = isOpen ? "none" : "block";
      burger.setAttribute("aria-expanded", String(!isOpen));
    });

    // default closed on load (safe)
    drawer.style.display = "none";
    drawer.setAttribute("data-open", "false");
    burger.setAttribute("aria-expanded", "false");
  }
})();
