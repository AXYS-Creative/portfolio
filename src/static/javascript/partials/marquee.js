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

//
// Work Gallery Carousel
//
const carouselHandler = (() => {
  const cubicEase = getComputedStyle(root).getPropertyValue("--cubic-ease"),
    carouselGap = getComputedStyle(root).getPropertyValue("--carousel-gap");

  const gapValue = parseFloat(carouselGap); // Convert the gap to a number from string with 'px'

  const sliders = document.querySelectorAll(".carousel-slider");

  let intervalIds = []; // Array to store all interval IDs
  let isPlaying = true;

  sliders.forEach((slider, index) => {
    const figuresCount =
      slider.querySelectorAll(".carousel-slider__figure").length / 2;

    const sliderFigure = slider.querySelector(".carousel-slider__figure");
    const sliderFigureWidth = sliderFigure.getBoundingClientRect().width;
    const step = sliderFigureWidth + gapValue;
    const sliderWidth =
      sliderFigureWidth * figuresCount + gapValue * (figuresCount - 2);

    let currentOffset = 0;
    const direction = index % 2 === 0 ? -1 : 1; // Reverse direction for even-indexed sliders

    // Set initial transition
    slider.style.transition = `transform 1.8s ${cubicEase}`;

    const moveSlider = () => {
      currentOffset += direction * step; // Apply direction to offset

      // Adjust reset logic based on slider width and step
      if (Math.abs(currentOffset) >= sliderWidth + step) {
        slider.style.transition = "none";
        currentOffset = 0;
        slider.style.transform = `translateX(${currentOffset}px)`;
        slider.offsetHeight; // This snaps the reset vs vintage rewind
        slider.style.transition = `transform 1.8s ${cubicEase}`;
      } else {
        slider.style.transform = `translateX(${currentOffset}px)`;
      }
    };

    intervalIds[index] = setInterval(moveSlider, 2400);

    // Set up the button handler once
    if (index === 0) {
      const carouselBtn = document.querySelector(".carousel__btn");
      carouselBtn.addEventListener("click", () => {
        isPlaying = !isPlaying;
        carouselBtn.classList.toggle("paused", !isPlaying);
        carouselBtn.setAttribute(
          "aria-label",
          isPlaying ? "Pause carousel" : "Play carousel"
        );
        carouselBtn.setAttribute("aria-pressed", isPlaying ? "false" : "true");

        if (isPlaying) {
          // Restart all sliders using their original moveSlider functions
          sliders.forEach((_, i) => {
            intervalIds[i] = setInterval(
              document.querySelector(`.carousel-slider:nth-child(${i + 1})`)
                .__moveSlider,
              2400
            );
          });
        } else {
          // Stop all sliders
          intervalIds.forEach((id) => clearInterval(id));
          intervalIds = [];
        }
      });
    }

    // Store the moveSlider function on the slider element for later use
    slider.__moveSlider = moveSlider;
  });
})();
