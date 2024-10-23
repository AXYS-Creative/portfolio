// Textarea max character count
const textareaCount = (() => {
  const textarea = document.getElementById("message");
  const charCountLabel = document.querySelector(".remaining-characters");
  const maxLength = textarea.maxLength;

  charCountLabel.textContent = maxLength;

  textarea.addEventListener("input", () => {
    const remaining = maxLength - textarea.value.length;
    charCountLabel.textContent = remaining;
  });
})();
