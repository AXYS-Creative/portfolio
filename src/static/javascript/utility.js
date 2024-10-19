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
