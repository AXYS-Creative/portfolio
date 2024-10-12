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

// Keyboard tabbing for gsap pinned section (large cta)

const largeCta = document.querySelector(".cta-1--large"),
  preFooter = document.querySelector(".pre-footer");

largeCta.addEventListener("focus", () => {
  const preFooterTop = preFooter.getBoundingClientRect().top;

  window.scrollTo({
    top: window.scrollY + preFooterTop - window.innerHeight,
    behavior: "smooth",
  });
});
