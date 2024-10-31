import { isSafari } from "../utility.js";

if (window.matchMedia("(pointer: fine) and (hover: hover)").matches) {
  const cursor = document.querySelector(".mouse-cursor"),
    tooltip = document.querySelector(".mouse-cursor__tooltip");

  const workItem = document.querySelectorAll(".work-item"),
    workShowcase = document.querySelectorAll(".work-item__showcase-img"),
    workItemLogo = document.querySelectorAll(".work-item__logo"),
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

  // Work Items Images
  workItem.forEach((el, index) => {
    const activeImage = cursor.querySelectorAll(".mouse-cursor__image")[index];

    el.addEventListener("mousemove", () => {
      cursor.classList.add("show-cursor");
      activeImage.classList.add("show-img");
    });

    el.addEventListener("mouseleave", () => {
      cursor.classList.remove("show-cursor");
      activeImage.classList.remove("show-img");
    });
  });

  workItem.forEach((item) => {
    // Add the class when entering any child element
    item.querySelectorAll("img, ul, a").forEach((child) => {
      child.addEventListener("mouseenter", () => {
        cursor.classList.add("cursor-contrast");
      });

      // Remove the class when leaving any child element
      child.addEventListener("mouseleave", () => {
        cursor.classList.remove("cursor-contrast");
      });
    });

    // Ensure the class is removed when leaving the entire work item
    item.addEventListener("mouseleave", () => {
      cursor.classList.remove("cursor-contrast");
    });
  });

  // Tootip
  tooltipTargets.forEach((el) => {
    // let hideTooltipTimeout;

    el.addEventListener("mouseover", () => {
      // clearTimeout(hideTooltipTimeout);
      tooltip.classList.add("show-tooltip");
      tooltip.innerHTML = el.getAttribute("data-tooltip-title");
    });

    el.addEventListener("mouseleave", () => {
      tooltip.classList.remove("show-tooltip");
      // hideTooltipTimeout = setTimeout(() => {
      // tooltip.innerHTML = "";
      // }, 2000);
    });
  });

  // Hide Mouse cursor on Safari ... glitched the animation

  if (isSafari()) {
    cursor.style.display = "none";
    // cursor.style.transition = "none"; // Not working

    // workShowcase.forEach((img) => (img.style.transition = "none"));
  }
}
