const siteHeader = document.querySelector(".site-header"),
  navMenu = document.querySelector(".nav-menu"),
  menuBtn = document.querySelector(".menu-btn"),
  skipToContent = document.querySelector("#skip-to-content"),
  contentStart = document.querySelector("#content-start");

const navLinks = document.querySelectorAll(".nav-link"),
  navFooterLinks = document.querySelectorAll(".nav-footer-link"),
  tabElementsPage = document.querySelectorAll(".tab-element-page"),
  tabElementsNav = document.querySelectorAll(".tab-element-nav");

tabElementsNav.forEach((elem) => elem.setAttribute("tabIndex", "-1"));

const toggleNav = () => {
  const isNavOpen = navMenu.getAttribute("aria-hidden") === "true";

  siteHeader.classList.toggle("nav-active");

  navMenu.setAttribute("aria-hidden", !isNavOpen);
  menuBtn.setAttribute("aria-expanded", isNavOpen);
  menuBtn.setAttribute(
    "aria-label",
    isNavOpen ? "Close navigation menu" : "Open navigation menu"
  );

  // Update tabindex for tabElementsPage and tabElementsNav
  tabElementsPage.forEach((el) =>
    el.setAttribute("tabindex", isNavOpen ? "-1" : "0")
  );
  tabElementsNav.forEach((el) =>
    el.setAttribute("tabindex", isNavOpen ? "0" : "-1")
  );

  document.body.style.overflowY = isNavOpen ? "hidden" : "auto";
};

const closeNav = () => {
  navMenu.setAttribute("aria-hidden", "true");
  menuBtn.setAttribute("aria-expanded", "false");

  siteHeader.classList.remove("nav-active");

  // Reset tabindex for tabElementsPage and tabElementsNav
  tabElementsPage.forEach((el) => el.setAttribute("tabindex", "0"));
  tabElementsNav.forEach((el) => el.setAttribute("tabindex", "-1"));

  document.body.style.overflowY = "auto";
};

[...navLinks, ...navFooterLinks].forEach((link) => {
  if (!link.classList.contains("prevent-nav-close")) {
    link.addEventListener("click", closeNav);
  }
});

menuBtn.addEventListener("click", toggleNav);

skipToContent.addEventListener("click", () => {
  contentStart.focus();
});
