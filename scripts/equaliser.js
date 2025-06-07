document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".equalizer-circle");
  const numDots = 300; // количество дотов
  const radius = container.clientWidth * 0.5 * 0.9; 
  const dots = [];

  for (let i = 0; i < numDots; i++) {
    const dot = document.createElement("div");
    dot.classList.add("equalizer-dot");

    const angle = (i / numDots) * Math.PI * 2;
    const x = radius * Math.cos(angle) + container.clientWidth / 2;
    const y = radius * Math.sin(angle) + container.clientHeight / 2;

    dot.style.left = `${x}px`;
    dot.style.top = `${y}px`;

    container.appendChild(dot);
    dots.push({ el: dot });
  }

  // анимация дотиков
  function animate() {
    dots.forEach(dot => {
      const jump = Math.random() * 1.5 - 0.75; 
      dot.el.style.transform = `translate(-50%, calc(-50% + ${jump}vw))`;
    });
    requestAnimationFrame(() => {
      setTimeout(animate, 100);
    });
  }

  animate();
});

