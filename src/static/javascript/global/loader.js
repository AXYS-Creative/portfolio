document.addEventListener("DOMContentLoaded", () => {
  const loader = document.querySelector(".loader");

  window.addEventListener("load", () => {
    loader.classList.remove("site-loading");
  });
});
