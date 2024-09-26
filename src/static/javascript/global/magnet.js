let mqMouse = window.matchMedia("(hover: hover) and (pointer: fine)");

if (mqMouse.matches) {
  const magnetEffect = () => {
    document.querySelectorAll(".magnet").forEach((el) =>
      el.addEventListener("mousemove", function (e) {
        console.log("yee");
        const pos = this.getBoundingClientRect();
        const mx = e.clientX - pos.left - pos.width / 2;
        const my = e.clientY - pos.top - pos.height / 2;

        this.style.transform = `translate(${mx * 0.48}px, ${my * 0.48}px)`;

        if (this.classList.contains("magnet-weak")) {
          this.style.transform = `translate(${mx * 0.12}px, ${my * 0.12}px)`;
        }

        if (this.classList.contains("magnet-strong")) {
          this.style.transform = `translate(${mx * 0.96}px, ${my * 0.96}px)`;
        }

        if (this.classList.contains("magnet-wide-btn")) {
          this.style.transform = `translate(${mx * 0.48}px, ${my * 0.96}px)`;
        }
      })
    );

    document.querySelectorAll(".magnet").forEach((el) =>
      el.addEventListener("mouseleave", function () {
        this.style.transform = "translate(0, 0)";
      })
    );
  };

  const magnetText = (() => {
    document.querySelectorAll(".magnet-text").forEach((element) => {
      const words = element.innerText.split(" ");
      const wrappedWords = words.map((word) => {
        const wrappedLetters = word
          .split("")
          .map((letter) => `<span class="magnet">${letter}</span>`)
          .join("");
        return `<span class="word">${wrappedLetters}</span>`;
      });
      element.innerHTML = wrappedWords.join(" ");
    });
  })();

  magnetEffect();
}
