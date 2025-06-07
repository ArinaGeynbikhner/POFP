document.addEventListener("DOMContentLoaded", () => {
  // первый
  const container = document.querySelector(".equalizer-circle");
  const numDots = 300;
  const dots = [];

  // второй
  const containerInner = document.querySelector(".equalizer-circle-inner");
  const numDotsInner = 200;

  // третий
  const containerMiddle = document.querySelector(".equalizer-circle-middle");
  const numDotsMiddle = 250;
  const dotsMiddle = [];

  // создает точки для первого
  if (container) {
    const radius = container.clientWidth * 0.5 * 0.9;
    for (let i = 0; i < numDots; i++) {
      const dot = document.createElement("div");
      dot.classList.add("equalizer-dot");
      const angle = (i / numDots) * Math.PI * 2;
      const x = 50 + (radius / container.clientWidth) * 100 * Math.cos(angle);
      const y = 50 + (radius / container.clientHeight) * 100 * Math.sin(angle);
      dot.style.left = `${x}%`;
      dot.style.top = `${y}%`;
      container.appendChild(dot);
      dots.push(dot);
    }
  }

  // для второго
  if (containerInner) {
    const radiusInner = containerInner.clientWidth * 0.5 * 0.85;
    for (let i = 0; i < numDotsInner; i++) {
      const dot = document.createElement("div");
      dot.classList.add("equalizer-dot");
      const angle = (i / numDotsInner) * Math.PI * 2;
      const x = 50 + (radiusInner / containerInner.clientWidth) * 100 * Math.cos(angle);
      const y = 50 + (radiusInner / containerInner.clientHeight) * 100 * Math.sin(angle);
      dot.style.left = `${x}%`;
      dot.style.top = `${y}%`;
      containerInner.appendChild(dot);
      dots.push(dot);
    }
  }

 // для третьего
  if (containerMiddle) {
    const radiusMiddle = containerMiddle.clientWidth * 0.5 * 0.87;
    for (let i = 0; i < numDotsMiddle; i++) {
      const dot = document.createElement("div");
      dot.classList.add("equalizer-dot");
      const angle = (i / numDotsMiddle) * Math.PI * 2;
      const x = 50 + (radiusMiddle / containerMiddle.clientWidth) * 100 * Math.cos(angle);
      const y = 50 + (radiusMiddle / containerMiddle.clientHeight) * 100 * Math.sin(angle);
      dot.style.left = `${x}%`;
      dot.style.top = `${y}%`;
      containerMiddle.appendChild(dot);
      dotsMiddle.push(dot);
    }
  }

  // анимация
  function animate() {
    // первый
    if (container) {
      const radius = container.clientWidth * 0.5 * 0.9;
      dots.slice(0, numDots).forEach((dot, i) => {
        const angle = (i / numDots) * Math.PI * 2;
        const x = 50 + (radius / container.clientWidth) * 100 * Math.cos(angle);
        const y = 50 + (radius / container.clientHeight) * 100 * Math.sin(angle);
        const jump = Math.random() * 2.0 - 1.0;
        dot.style.left = `${x}%`;
        dot.style.top = `${y}%`;
        dot.style.transform = `translate(-50%, -50%) translateY(${jump}vw)`;
      });
    }

    // второй
    if (containerInner) {
      const radiusInner = containerInner.clientWidth * 0.5 * 0.80;
      dots.slice(numDots).forEach((dot, i) => {
        const angle = (i / numDotsInner) * Math.PI * 2;
        const x = 50 + (radiusInner / containerInner.clientWidth) * 100 * Math.cos(angle);
        const y = 50 + (radiusInner / containerInner.clientHeight) * 100 * Math.sin(angle);
        const jump = Math.random() * 0.5 - 1.0;
        dot.style.left = `${x}%`;
        dot.style.top = `${y}%`;
        dot.style.transform = `translate(-50%, -50%) translateY(${jump}vw)`;
      });
    }

    // третий
    if (containerMiddle) {
      const radiusMiddle = containerMiddle.clientWidth * 0.5 * 0.87;
      dotsMiddle.forEach((dot, i) => {
        const angle = (i / numDotsMiddle) * Math.PI * 2;
        const x = 50 + (radiusMiddle / containerMiddle.clientWidth) * 100 * Math.cos(angle);
        const y = 50 + (radiusMiddle / containerMiddle.clientHeight) * 100 * Math.sin(angle);
        const jump = Math.random() * 0.7 - 0.5; 
        dot.style.left = `${x}%`;
        dot.style.top = `${y}%`;
        dot.style.transform = `translate(-50%, -50%) translateY(${jump}vw)`;
      });
    }

    requestAnimationFrame(() => setTimeout(animate, 100));
  }

  // плей
  if (dots.length) {
    animate();
  }
});