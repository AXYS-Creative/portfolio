const noise = document.querySelector(".noise-bg");

document.addEventListener("DOMContentLoaded", () => {
  const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

  if (isTouchDevice) {
    const specularLightings = document.querySelectorAll("feSpecularLighting");

    specularLightings.forEach((lighting) => {
      lighting.setAttribute("surfaceScale", "40");
    });
  }
});
