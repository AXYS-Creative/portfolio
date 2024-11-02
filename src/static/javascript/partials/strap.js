import { root } from "../utility.js";

const strap = document.querySelector(".strap"),
  strapIcon = document.querySelector(".strap-icon");

const updateIconWidth = () => {
  let strapWidth = strap.getBoundingClientRect().width;
  root.style.setProperty("--strap-width", `${strapWidth}px`);
};

updateIconWidth(); // Invoke on page load
window.addEventListener("resize", updateIconWidth); // Invoke on window resize

// Strap hover
strap.addEventListener("mousemove", () => {
  strapIcon.classList.add("strap-hover");
});

strap.addEventListener("mouseleave", () => {
  strapIcon.classList.remove("strap-hover");
});

// Strap focus-within
strap.addEventListener("focusin", () => {
  strapIcon.classList.add("strap-hover");
});

strap.addEventListener("focusout", () => {
  strapIcon.classList.remove("strap-hover");
});
