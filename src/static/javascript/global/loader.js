document.addEventListener("DOMContentLoaded", () => {
  const loader = document.querySelector(".loader");

  // const minDisplayTime = 1600;
  const minDisplayTime = 0;
  const startTime = Date.now();

  window.addEventListener("load", () => {
    const elapsedTime = Date.now() - startTime;
    const remainingTime = minDisplayTime - elapsedTime;

    if (remainingTime > 0) {
      setTimeout(() => {
        loader.classList.remove("site-loading");
      }, remainingTime);
    } else {
      loader.classList.remove("site-loading");
    }
  });
});
