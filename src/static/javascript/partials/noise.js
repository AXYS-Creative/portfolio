const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

const noise = document.querySelector(".noise-bg");

if (isTouchDevice) {
  const specularLightings = document.querySelectorAll("feSpecularLighting");

  specularLightings.forEach((lighting) => {
    lighting.setAttribute("surfaceScale", "40");
  });
}
