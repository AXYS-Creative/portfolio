gsap.registerPlugin(ScrollTrigger);

let responsiveGsap = gsap.matchMedia();

responsiveGsap.add(
  {
    maxSm: "(max-width: 480px)",
    maxMd: "(max-width: 768px)",
    maxXl: "(max-width: 1200px)",
    maxXxl: "(max-width: 1512px)",
    minMd: "(min-width: 769px)",
  },
  (context) => {
    let { maxSm, maxMd, maxXl, maxXxl, minMd } = context.conditions;

    // SCOPED - Only for one work gallery instance per page
    const workGalleryAnimation = (() => {
      gsap.fromTo(
        ".showreel-slider:first-of-type",
        { x: "5%" },
        {
          x: "-5%",
          ease: "linear",
          scrollTrigger: {
            trigger: ".showreel",
            start: "top bottom",
            end: "100% top",
            scrub: 0.8,
          },
        }
      );
      gsap.fromTo(
        ".showreel-slider:last-of-type",
        { x: "-5%" },
        {
          x: "5%",
          ease: "linear",
          scrollTrigger: {
            trigger: ".showreel",
            start: "top bottom",
            end: "100% top",
            scrub: 0.8,
          },
        }
      );
    })();

    // SCOPED - Only for one 'get in touch' instance per page
    const getInTouchAnimations = (() => {
      // Pinning
      gsap.to(".get-in-touch", {
        scrollTrigger: {
          trigger: ".get-in-touch",
          pin: true,
          start: "top top",
          end: "+=100%",
        },
      });

      // Scaling
      gsap.fromTo(
        ".gsap-scale",
        {
          scale: 1.25,
        },
        {
          scale: 1,
          scrollTrigger: {
            trigger: ".get-in-touch",
            scrub: 0.5,
            start: "top top",
            end: "+=100%",
          },
        }
      );

      // Text Sliding
      let slideDistance = "12%";
      let filterBlur = maxSm ? 4 : 10;

      gsap.fromTo(
        ".bg-text span:nth-of-type(odd)",
        { x: `${slideDistance}`, filter: `blur(${filterBlur})px` },
        {
          x: `-${slideDistance}`,
          filter: "blur(0px)",
          ease: "linear",
          scrollTrigger: {
            trigger: ".get-in-touch",
            start: "top bottom",
            end: "100% top",
            scrub: 1.2,
          },
        }
      );
      gsap.fromTo(
        ".bg-text span:nth-of-type(even)",
        { x: `-${slideDistance}`, filter: `blur(${filterBlur})px` },
        {
          x: `${slideDistance}`,
          filter: "blur(0px)",
          ease: "linear",
          scrollTrigger: {
            trigger: ".get-in-touch",
            start: "top bottom",
            end: "100% top",
            scrub: 1.2,
          },
        }
      );

      // Button rotating
      gsap.fromTo(
        ".large-cta-wrapper",
        {
          rotate: maxSm ? "64deg" : "50deg",
          scale: 1.25,
          filter: `blur(${filterBlur / 2})px`,
        },
        {
          rotate: "0deg",
          scale: 1,
          filter: "blur(0px)",
          ease: "linear",
          scrollTrigger: {
            trigger: ".get-in-touch",
            start: "top bottom",
            end: "50% top",
            scrub: 1.5,
          },
        }
      );
    })();

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
    })();

    // GLOBAL - Temporarily add mix-blend-mod to any element. Partially global, per one .invert-colors element per page
    const colorSwap = (() => {
      const targetElements = document.querySelectorAll(".color-swap");

      targetElements.forEach((el) => {
        gsap.to(el, {
          scrollTrigger: {
            trigger: ".invert-colors",
            start: maxSm ? "top 64px" : maxXxl ? "top 84px" : "top 88px",
            end: maxSm ? "bottom 40px" : "bottom 56px",
            onEnter: () => el.classList.add("swap-color"),
            onLeave: () => el.classList.remove("swap-color"),
            onEnterBack: () => el.classList.add("swap-color"),
            onLeaveBack: () => el.classList.remove("swap-color"),
            // markers: true,
          },
        });
      });
    })();

    // Game Changer! Keep in mind the scope of IIFE might affect whether it refreshes.
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
  }
);
