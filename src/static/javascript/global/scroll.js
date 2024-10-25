// Global - Animate when scrolling away from the top of the page (also restore when scrolling up)
const scrollFromTop = (() => {
  let siteHeader = document.querySelector(".site-header");
  let lastScrollY = 0;

  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 120) {
      if (currentScrollY > lastScrollY) {
        // Scrolling down
        siteHeader.classList.add("scrolling-down");
      } else {
        // Scrolling up
        siteHeader.classList.remove("scrolling-down");
      }
    }

    lastScrollY = currentScrollY;
  });
})();

// Keyboard tabbing for gsap pinned section (large cta)
// Also addressing a bug when clicking with mouse, the section scrolls into view rather than rerouting the user
const largeCta = document.querySelector(".cta-1--large"),
  preFooter = document.querySelector(".pre-footer");

largeCta?.addEventListener("focus", () => {
  if (largeCta.matches(":focus-visible")) {
    const preFooterTop = preFooter.getBoundingClientRect().top;

    window.scrollTo({
      top: window.scrollY + preFooterTop - window.innerHeight,
      behavior: "smooth",
    });
  }
});

// Fix broken pinning for large-cta
const pinningCorrection = (() => {
  let isHoveringLargeCta = false;
  let scrollTimeout;

  largeCta?.addEventListener("mouseenter", () => {
    isHoveringLargeCta = true;
  });
  largeCta?.addEventListener("mouseleave", () => {
    isHoveringLargeCta = false;
  });

  // Listen for scroll events
  window.addEventListener("scroll", () => {
    if (isHoveringLargeCta) {
      largeCta.classList.add("no-interaction");

      setTimeout(() => {
        largeCta.classList.remove("no-interaction");
      }, 400);
    }
  });
})();
