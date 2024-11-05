export const root = document.documentElement;

// Get Current Year for Copyright
const getCurrentYear = (() => {
  const yearText = document.querySelector(".year-text");
  const currentYear = new Date().getFullYear();

  yearText.innerHTML = currentYear;
  yearText.setAttribute("datetime", currentYear);
})();

// Fetch local time
const getLocalTime = (() => {
  const timeElement = document.querySelector("[data-timezone]");

  const timezone = timeElement.getAttribute("data-timezone");

  const updateTime = () => {
    const now = new Date();
    const options = {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
      // second: "2-digit",
      hour12: true, // Toggle for 12 hour vs 24 hour clock
    };
    const timeString = new Intl.DateTimeFormat([], options).format(now);
    const isoString = now.toISOString();

    timeElement.textContent = `${timeString}`;
    timeElement.setAttribute("datetime", isoString);
  };

  updateTime();

  setInterval(updateTime, 1000);
})();

// Check if touch device
export const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

// Check if Safari
export const isSafari = () => {
  let ua = navigator.userAgent.toLowerCase();
  return ua.indexOf("safari") !== -1 && ua.indexOf("chrome") === -1;
};

/**
 * Custom classes for Safari. Add any element’s class to the array below.
 * This class will now have a customizable 'safari-styles' class you can target.
 */
const safariClasses = (() => {
  const elementList = [".magnet", ".social-media-link", ".header-logo"];

  if (isSafari()) {
    elementList.forEach((element) => {
      const elements = document.querySelectorAll(element);

      elements.forEach((el) => {
        el.classList.add("safari-styles");
      });
    });
  }
})();

// Check if Firefox
export const isFirefox = () => {
  let ua = navigator.userAgent.toLowerCase();
  return ua.indexOf("firefox") !== -1;
};

// Lenis
export const lenis = new Lenis();

const handleLenis = (() => {
  lenis.on("scroll", (e) => {
    console.log(e);
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
})();
