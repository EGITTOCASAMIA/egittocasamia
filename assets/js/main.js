// Mobile menu toggle
const burger = document.getElementById("burger");
const menu = document.getElementById("mobileMenu");

if (burger && menu) {
  burger.addEventListener("click", () => {
    const isOpen = burger.getAttribute("aria-expanded") === "true";
    burger.setAttribute("aria-expanded", String(!isOpen));
    menu.hidden = isOpen;
  });

  // close menu when clicking a link
  menu.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      burger.setAttribute("aria-expanded", "false");
      menu.hidden = true;
    });
  });
}
