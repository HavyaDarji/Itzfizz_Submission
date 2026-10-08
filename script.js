document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const car = document.getElementById("car");
  const trail = document.getElementById("trail");
  const letters = gsap.utils.toArray(".value-letter");
  const box1 = document.getElementById("box1");
  const box2 = document.getElementById("box2");
  const box3 = document.getElementById("box3");
  const box4 = document.getElementById("box4");

  let carWidth = car.offsetWidth || 340;
  let letterOffsets = [];

  function updateDimensions() {
    carWidth = car.offsetWidth || 340;
    letterOffsets = letters.map((letter) => letter.getBoundingClientRect().left);
    ScrollTrigger.refresh();
  }

  const getStartX = () => -(car.offsetWidth || 340) * 0.78;
  gsap.set(car, { x: getStartX() });

  updateDimensions();
  window.addEventListener("resize", updateDimensions);

  function getProgressFactor(progress, start, end) {
    if (progress <= start) return 0;
    if (progress >= end) return 1;
    return (progress - start) / (end - start);
  }

  function applyBoxTransform(element, factor, directionY) {
    element.style.opacity = factor;
    element.style.transform = `translateY(${(1 - factor) * directionY}px)`;
  }

  gsap.fromTo(
    car,
    { x: getStartX() },
    {
      scrollTrigger: {
        trigger: ".section",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
        pin: ".track",
        anticipatePin: 1,
        onUpdate: function (self) {
          const progress = self.progress;
          const startX = getStartX();
          const endX = window.innerWidth + 60;
          const currentCarX = startX + progress * (endX - startX);
          const carNoseX = currentCarX + (car.offsetWidth || 340) * 0.45;

          const trailWidth = Math.max(0, Math.min(window.innerWidth, carNoseX));
          gsap.set(trail, { width: trailWidth });

          letters.forEach((letter, i) => {
            const letterX = letterOffsets[i] || letter.getBoundingClientRect().left;
            if (carNoseX >= letterX) {
              letter.classList.add("active");
            } else {
              letter.classList.remove("active");
            }
          });

          const f1 = getProgressFactor(progress, 0.11, 0.27);
          applyBoxTransform(box1, f1, 25);

          const f2 = getProgressFactor(progress, 0.28, 0.44);
          applyBoxTransform(box2, f2, -25);

          const f3 = getProgressFactor(progress, 0.48, 0.64);
          applyBoxTransform(box3, f3, 25);

          const f4 = getProgressFactor(progress, 0.66, 0.82);
          applyBoxTransform(box4, f4, -25);
        },
      },
      x: () => window.innerWidth + 60,
      ease: "none",
    }
  );
});
