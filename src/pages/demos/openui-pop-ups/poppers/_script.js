const AUDIO_POP = new Audio("/shared/audio/pop.mp3");
const WORD = "Pop-up";
const START_INDEX = WORD.length / -2 + 0.5;

for (let p = 0; p < WORD.length; p++) {
  const POPUP = Object.assign(document.createElement("button"), {
    popover: "manual",
    className: "balloon",
    id: WORD.charAt(p),
    defaultOpen: true,
    title: `Pop "${WORD.charAt(p)}"`,
    innerHTML: `
      <span class="balloon__content">
        <span class="balloon__letter">${WORD.charAt(p)}</span>
        <span class="balloon__handle"></div>
      </span>
    `,
    style: `
      --index: ${START_INDEX + p};
      --hue: ${Math.random() * 359};
      --bob-speed: ${Math.random() + 0.5};
      --float-speed: ${Math.random() + 0.5};
    `
  });
  document.body.appendChild(POPUP);
  POPUP.addEventListener("click", () => {
    AUDIO_POP.currentTime = 0;
    AUDIO_POP.play();
    POPUP.hidePopover();
    Object.assign(POPUP, {
      style: `
      --index: ${START_INDEX + p};
      --hue: ${Math.random() * 359};
      --bob-speed: ${Math.random() + 0.5};
      --float-speed: ${Math.random() + 0.5};
    `
    });
    requestAnimationFrame(() => POPUP.showPopover());
  });
  // Because defaultopen does not work for some reason?
  POPUP.showPopover();
}
