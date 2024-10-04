// Global - Animate when scrolling away from the top of the page (also restore when scrolling up)
const scrollFromTop = (() => {
  let siteHeader = document.querySelector(".site-header");
  let lastScrollY = 0;

  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 120) {
      siteHeader.classList.add("away-from-top");

      if (currentScrollY > lastScrollY) {
        // Scrolling down
        siteHeader.classList.add("scrolling-down");
      } else {
        // Scrolling up
        siteHeader.classList.remove("scrolling-down");
      }
    } else {
      siteHeader.classList.remove("away-from-top"); // Restore on scroll up
    }

    lastScrollY = currentScrollY;
  });
})();
