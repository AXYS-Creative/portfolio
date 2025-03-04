gsap.registerPlugin(ScrollTrigger);

let responsiveGsap = gsap.matchMedia();

let markers = {
  startColor: "white",
  endColor: "white",
  indent: 96,
};

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

    // Goal Oriented
    {
      const emojis = document.querySelector(".goal-oriented__emojis");

      if (emojis) {
        gsap.to(emojis, {
          scrollTrigger: {
            trigger: ".goal-oriented__paragraph-textblock-1",
            start: "-100% center",
            end: "bottom center",
            onEnter: () => emojis.classList.add("animate-1"),
            onLeave: () => emojis.classList.remove("animate-1"),
            onEnterBack: () => emojis.classList.add("animate-1"),
            onLeaveBack: () => emojis.classList.remove("animate-1"),
          },
        });
        gsap.to(emojis, {
          scrollTrigger: {
            trigger: ".goal-oriented__paragraph-textblock-2",
            start: "top center",
            end: "bottom center",
            onEnter: () => emojis.classList.add("animate-2"),
            onLeave: () => emojis.classList.remove("animate-2"),
            onEnterBack: () => emojis.classList.add("animate-2"),
            onLeaveBack: () => emojis.classList.remove("animate-2"),
          },
        });
        gsap.to(emojis, {
          scrollTrigger: {
            trigger: ".goal-oriented__paragraph-textblock-3",
            start: "top center",
            end: "200% center",
            onEnter: () => emojis.classList.add("animate-3"),
            onLeave: () => {
              emojis.classList.remove("animate-3");
              emojis.classList.add("animate-complete");
            },
            onEnterBack: () => {
              emojis.classList.remove("animate-complete");
              emojis.classList.add("animate-3");
            },
            onLeaveBack: () => emojis.classList.remove("animate-3"),
          },
        });
      }
    }

    // SCOPED - Work gallery (one instance)
    {
      const showreel = document.querySelector(".showreel-slider");
      const gallerAssetDistance = maxSm ? 24 : 6;

      if (showreel) {
        gsap.fromTo(
          ".showreel-slider:first-of-type",
          { x: `${gallerAssetDistance}%` },
          {
            x: `-${gallerAssetDistance}%`,
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
          { x: `-${gallerAssetDistance}%` },
          {
            x: `${gallerAssetDistance}%`,
            ease: "linear",
            scrollTrigger: {
              trigger: ".showreel",
              start: "top bottom",
              end: "100% top",
              scrub: 0.8,
            },
          }
        );
      }
    }

    // SCOPED - Get in touch section (one instance)
    {
      const getInTouchSection = document.querySelector(".get-in-touch");

      const pinDuration = "+=100%";
      // const pinDuration = "+=50%";
      const slideDuration = "100%";
      // const slideDuration = "50%";
      const showBtnDuration = "50%";
      // const showBtnDuration = "25%";

      if (getInTouchSection) {
        // Pinning
        gsap.to(".get-in-touch", {
          scrollTrigger: {
            trigger: ".get-in-touch",
            pin: true,
            start: "top top",
            end: pinDuration,
            // markers: markers,
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
              end: pinDuration,
            },
          }
        );

        // Text Sliding
        const slideDistance = "18%";
        const filterBlur = maxSm ? 4 : 10;

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
              end: `${slideDuration} top`,
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
              end: `${slideDuration} top`,
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
              end: `${showBtnDuration} top`,
              scrub: 1.5,
            },
          }
        );

        // Availability fading
        gsap.fromTo(
          ".availability-wrapper",
          {
            filter: `blur(${filterBlur / 2})px`,
            opacity: 0,
          },
          {
            filter: "blur(0px)",
            opacity: 1,
            ease: "linear",
            scrollTrigger: {
              trigger: ".get-in-touch",
              start: "100% bottom",
              end: `${showBtnDuration} top`,
              scrub: 1.5,
            },
          }
        );

        // ScrollTrigger Refresh
        if (window.innerWidth > 520) {
          window.addEventListener("resize", () => {
            ScrollTrigger.refresh();
          });
        }
      }
    }

    // GLOBAL - Easily toggle an 'animate' class on any element with '.gsap-animate' class
    {
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
    }

    // GLOBAL - Temporarily add mix-blend-mod to any element. Partially global, per one .invert-colors element per page
    {
      const targetElements = document.querySelectorAll(".color-swap"),
        invertColorsTarget = document.querySelector(".invert-colors");

      if (invertColorsTarget) {
        targetElements.forEach((el) => {
          gsap.to(el, {
            scrollTrigger: {
              trigger: invertColorsTarget,
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
      }
    }

    // Social Media posts - Animating each letter per word via 'character-split' utility class.
    const characterSplit = (() => {
      const spanCharactersInSentence = (words) => {
        const text = words.textContent || words.innerText;
        words.setAttribute("aria-label", text); // Provide the full text for screen readers
        const wordsArray = text.split(" "); // Split the text into words

        const wrappedWords = wordsArray
          .map((word) => {
            const wrappedLetters = word
              .split("")
              .map(
                (letter) =>
                  `<span class="character-split__letter" data-letter="${letter}">${letter}</span>`
              )
              .join("");

            return `<span class="character-split__word">${wrappedLetters}</span>`;
          })
          .join(
            '<span class="character-split__space" aria-hidden="true"> </span>'
          ); // Join words with space span

        words.innerHTML = wrappedWords;
      };

      const splitCharactersGlobally = (globalClass) => {
        const sentences = document.querySelectorAll(globalClass);
        sentences.forEach((sentence) => spanCharactersInSentence(sentence));
      };

      splitCharactersGlobally(".character-split");
    })();

    // Refresh ScrollTrigger instances on page load and resize
    window.addEventListener("load", () => {
      ScrollTrigger.refresh();
    });

    // Only run the logic on non-touch, non-mobile devices
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      window.addEventListener("resize", () => {
        ScrollTrigger.refresh();
      });
    }
  }
);

// Complete Animation Hover and Focus
const completeAnimationHoverFocus = (() => {
  const animationElements = document.querySelectorAll(".full-animation");

  const animationNames = ["logo-interaction"];

  animationElements.forEach((el) => {
    const addAnimation = () => {
      el.classList.add("fully-animate");
    };

    const removeAnimation = (event) => {
      if (animationNames.includes(event.animationName)) {
        el.classList.remove("fully-animate");
      }
    };

    el.addEventListener("mouseenter", addAnimation);
    el.addEventListener("focus", addAnimation);
    el.addEventListener("animationend", removeAnimation);
  });
})();

// .classic-link hover animation
const classicLinkHover = (() => {
  document.querySelectorAll(".classic-link").forEach((el) => {
    const text = el.textContent;
    const tooltip = el.getAttribute("data-tooltip-title") || "";
    el.setAttribute("aria-label", `${text}${tooltip ? ` ${tooltip}` : ""}`);

    // Wrap all letter groups inside a single span with the class "text-content"
    el.innerHTML =
      `<span class="classic-link__content">` +
      Array.from(text)
        .map((char) => {
          if (char === " ") {
            return `<span class="letter-group space" aria-hidden="true"> </span>`;
          }
          return `
            <span class="letter-group">
              <span class="letter" data-title="${char}">${char}</span>
            </span>
          `;
        })
        .join("") +
      `</span>`;

    el.addEventListener("mouseenter", () => el.classList.add("hover"));
  });
})();
