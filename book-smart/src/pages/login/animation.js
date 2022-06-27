import { createAnimation } from "https://cdn.jsdelivr.net/npm/@ionic/core@latest/dist/esm/index.mjs";

const animation = createAnimation()
  .addElement(document.querySelector(".square"))
  .duration(1500)
  .iterations(Infinity)
  .fromTo("transform", "translateX(0px)", "translateX(100px)")
  .fromTo("opacity", "1", "0.2");

document.querySelector("#play").addEventListener("click", () => {
  animation.play();
});

document.querySelector("#pause").addEventListener("click", () => {
  animation.pause();
});

document.querySelector("#stop").addEventListener("click", () => {
  animation.stop();
});
