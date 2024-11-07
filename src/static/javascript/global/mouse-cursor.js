import { isSafari } from "../utility.js";

if (window.matchMedia("(pointer: fine) and (hover: hover)").matches) {
  const cursor = document.querySelector(".mouse-cursor"),
    tooltip = document.querySelector(".mouse-cursor__tooltip");

  const workItem = document.querySelectorAll(".work-item"),
    workShowcase = document.querySelectorAll(".work-item__showcase-img"),
    tooltipTargets = document.querySelectorAll(".tooltip-target");

  const imageSources = [];
  workShowcase.forEach((img) => imageSources.push(img.src));

  imageSources.forEach((src) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = "";
    img.classList.add("mouse-cursor__image");
    cursor.appendChild(img);
  });

  let previousX = 0;
  let previousTime = Date.now();
  let inactivityTimeout;

  document.addEventListener("mousemove", (e) => {
    const currentTime = Date.now();
    const timeDelta = currentTime - previousTime;

    const deltaX = e.clientX - previousX;
    const velocity = deltaX / timeDelta;

    previousX = e.clientX;
    previousTime = currentTime;

    const maxRotation = 6; // Maximum rotation angle
    const rotationAngle =
      Math.min(maxRotation, Math.abs(velocity) * maxRotation) *
      Math.sign(velocity);

    cursor.style.translate = `calc(${e.clientX}px - 50%) calc(${e.clientY}px - 50%)`;
    cursor.style.rotate = `${-rotationAngle}deg`;

    clearTimeout(inactivityTimeout);
    inactivityTimeout = setTimeout(() => {
      cursor.style.rotate = `0deg`;
    }, 100); // Adjust this delay if needed
  });

  // Work items mouse cursor images
  workItem.forEach((el, index) => {
    const activeImage = cursor.querySelectorAll(".mouse-cursor__image")[index];

    el.addEventListener("mousemove", () => {
      activeImage.classList.add("show-img");
    });

    el.addEventListener("mouseleave", () => {
      activeImage.classList.remove("show-img");
      activeImage.classList.remove("hide-within");
    });

    // Hide for children elements (logo, badges, cta)
    el.querySelectorAll("img, ul, a").forEach((child) => {
      child.addEventListener("mouseenter", () => {
        activeImage.classList.add("hide-within");
      });

      child.addEventListener("mouseleave", () => {
        activeImage.classList.remove("hide-within");
      });
    });
  });

  // Tootip
  tooltipTargets.forEach((el) => {
    el.addEventListener("mouseover", () => {
      tooltip.classList.add("show-tooltip");
      tooltip.innerHTML = el.getAttribute("data-tooltip-title");
    });

    el.addEventListener("mouseleave", () => {
      tooltip.classList.remove("show-tooltip");
    });
  });

  // Hide Mouse cursor on Safari, choppy transition
  if (isSafari()) {
    cursor.style.display = "none";
  }
}
