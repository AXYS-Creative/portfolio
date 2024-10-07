gsap.registerPlugin(ScrollTrigger);

let responsiveGsap = gsap.matchMedia();

responsiveGsap.add(
  {
    maxSm: "(max-width: 480px)",
    maxMd: "(max-width: 768px)",
    maxXl: "(max-width: 1200px)",
    minMd: "(min-width: 769px)",
  },
  (context) => {
    let { maxSm, maxMd, maxXl, minMd } = context.conditions;

    // TEMPLATE TWEEN - SCRUB
    gsap.fromTo(
      ".showreel-slider:first-of-type",
      { x: "5%" },
      {
        x: "-5%",
        scrollTrigger: {
          trigger: ".showreel",
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
          // markers: true,
        },
      }
    );
    gsap.fromTo(
      ".showreel-slider:last-of-type",
      { x: "-5%" },
      {
        x: "5%",
        scrollTrigger: {
          trigger: ".showreel",
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
          // markers: true,
        },
      }
    );

    // GLOBAL - Easily toggle an 'animate' class on any element with '.gsap-animate' class
    const globalGenerateAnimate = (() => {
      const targetElements = document.querySelectorAll(".gsap-animate");

      targetElements.forEach((targetElem) => {
        gsap.to(targetElem, {
          scrollTrigger: {
            trigger: targetElem,
            start: "top 98%",
            end: "bottom top",
            onEnter: () => targetElem.classList.add("animate"),
            onLeave: () => targetElem.classList.remove("animate"),
            onEnterBack: () => targetElem.classList.add("animate"),
            onLeaveBack: () => targetElem.classList.remove("animate"),
          },
        });
      });

      // GAME CHANGER!!!
      // Refresh ScrollTrigger instances on page load and resize
      window.addEventListener("load", () => {
        ScrollTrigger.refresh();
      });

      // Greater than 520 so it doesn't refresh on  mobile(dvh)
      if (window.innerWidth > 520) {
        window.addEventListener("resize", () => {
          ScrollTrigger.refresh();
        });
      }
    })();

    // Handle color contrast for header elements against a light background -- figure out why it's not working
    // const colorContrast = (() => {
    //   gsap.to(".header-logo", {
    //     scrollTrigger: {
    //       trigger: ".invert-colors",
    //       start: "top 8%",
    //       end: "bottom top",
    //       onEnter: () => targetElem.classList.add("swap-color"),
    //       onLeave: () => targetElem.classList.remove("swap-color"),
    //       onEnterBack: () => targetElem.classList.add("swap-color"),
    //       onLeaveBack: () => targetElem.classList.remove("swap-color"),
    //       markers: true,
    //     },
    //   });
    // })();
  }
);
