import { root } from "../utility.js";

const strap = document.querySelector(".strap");

const updateIconWidth = () => {
  let strapWidth = strap.getBoundingClientRect().width;
  root.style.setProperty("--strap-width", `${strapWidth}px`);
};

updateIconWidth();
window.addEventListener("resize", updateIconWidth);
