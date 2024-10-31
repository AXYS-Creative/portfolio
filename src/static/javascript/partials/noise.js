import { isSafari, isTouchDevice } from "../utility.js";

if (isTouchDevice || isSafari()) {
  const specularLightings = document.querySelectorAll("feSpecularLighting");

  specularLightings.forEach((lighting) => {
    lighting.setAttribute("surfaceScale", "40");
  });
}
