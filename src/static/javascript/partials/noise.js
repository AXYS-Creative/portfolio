import { isSafari, isFirefox, isTouchDevice } from "../utility.js";

if (isTouchDevice || isSafari() || isFirefox()) {
  const specularLightings = document.querySelectorAll("feSpecularLighting");

  specularLightings.forEach((lighting) => {
    lighting.setAttribute("surfaceScale", "40");
  });
}
