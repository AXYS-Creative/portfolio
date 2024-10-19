import { root } from "../utility.js";

let currentScroll = 0;

const initializeMarquee = (selector, duration) => {
  if (gsap) {
    return gsap.utils.toArray(selector).map((elem) =>
      gsap
        .to(elem, {
          xPercent: -50,
          repeat: -1,
          duration: duration,
          ease: "linear",
        })
        .totalProgress(0.5)
    );
  }
};

window.addEventListener("scroll", () => {
  const isScrollingDown = window.scrollY > currentScroll;

  const adjustTimeScale = (tweens) => {
    tweens.forEach((tween, index) =>
      gsap.to(tween, {
        timeScale: (index % 2 === 0) === isScrollingDown ? 1 : -1,
      })
    );
  };

  adjustTimeScale(marqueeTweens);

  currentScroll = window.scrollY;
});

const marqueeTweens = initializeMarquee(
  ".marquee-inner",
  window.innerWidth > 768 ? 16 : 12
);

// Work Gallery Carousel
const carouselHandler = (() => {
  const cubicEase = getComputedStyle(root).getPropertyValue("--cubic-ease"),
    carouselFigureGap =
      getComputedStyle(root).getPropertyValue("--carousel-gap");

  // Convert the gap to a number from string
  const gapValue = parseFloat(carouselFigureGap);

  // Select all carousel sliders
  const sliders = document.querySelectorAll(".carousel-slider");

  sliders.forEach((slider) => {
    const sliderFigure = slider.querySelector(".carousel-slider__figure");
    const sliderFigureWidth = sliderFigure.getBoundingClientRect().width;
    const sliderWidth = slider.scrollWidth / 2;

    const step = sliderFigureWidth + gapValue;

    let currentOffset = 0;

    // Set initial transition for each slider
    slider.style.transition = `transform 0.8s ${cubicEase}`;

    const moveSlider = () => {
      currentOffset -= step;

      if (Math.abs(currentOffset) >= sliderWidth + step) {
        slider.style.transition = "none";
        currentOffset = 0;

        slider.style.transform = `translateX(${currentOffset}px)`;

        slider.offsetHeight; // Trigger reflow

        slider.style.transition = `transform 1.2s ${cubicEase}`;
      } else {
        slider.style.transform = `translateX(${currentOffset}px)`;
      }
    };

    // Move each slider at intervals
    setInterval(moveSlider, 2400);
  });
})();
