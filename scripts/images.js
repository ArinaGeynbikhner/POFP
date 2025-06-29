const wrappers = [...Array(9)].map((_, i) => document.getElementById('wrapper' + (i + 1)));
const descriptions = [...Array(9)].map((_, i) => document.getElementById('desc' + (i + 1)));
const connectionLinesSvg = document.getElementById('connectionLines');
const fadeOverlay = document.getElementById('fadeOverlay');

const startRotations = [90, 90, -90, 90, 90, -90, 90, -90, 90];
const startZ = -300;

const finalPositionsHorizontal = [
  { x: -28, y: -130, z: 400 },
  { x: -10, y: 150, z: 400 },
  { x: 15, y: -120, z: 410 },
  { x: -28, y: -130, z: 400 },
  { x: 15, y: -180, z: 410 },
  { x: 3, y: 80, z: 400 },
  { x: -28, y: -150, z: 400 },
  { x: 20, y: -160, z: 410 },
  { x: 10, y: 130, z: 400 }
];

const finalPositionsVertical = [
  { x: -17, y: -50, z: 600 },
  { x: -7, y: 65, z: 700 },
  { x: 3, y: -70, z: 650 },
  { x: -17, y: -50, z: 600 },
  { x: 3, y: -70, z: 650 },
  { x: -7, y: 40, z: 700 },
  { x: -17, y: -50, z: 600 },
  { x: 3, y: -70, z: 650 },
  { x: 3, y: 60, z: 650 }
];

let finalPositions = finalPositionsHorizontal;
let scrollProgress = 0;

const connections = [
  { from: { idx: 0, corner: 'br' }, to: { idx: 1, corner: 'tl' } },
  { from: { idx: 1, corner: 'br' }, to: { idx: 2, corner: 'bl' } },
  { from: { idx: 2, corner: 'br' }, to: { idx: 5, corner: 'tl' } },
  { from: { idx: 5, corner: 'br' }, to: { idx: 8, corner: 'tl' } },
  { from: { idx: 3, corner: 'br' }, to: { idx: 4, corner: 'tl' } },
  { from: { idx: 4, corner: 'br' }, to: { idx: 6, corner: 'tl' } },
  { from: { idx: 6, corner: 'br' }, to: { idx: 7, corner: 'tl' } },
  { from: { idx: 7, corner: 'br' }, to: { idx: 0, corner: 'tl' } },
];

function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function getCornerPosition(wrapper, rect, corner) {
  if (!wrapper || !rect) return { x: 0, y: 0 };
  const rectBounds = rect.getBoundingClientRect();
  const wrapperBounds = wrapper.getBoundingClientRect();
  const width = rectBounds.width;
  const height = rectBounds.height;
  const centerX = wrapperBounds.left + wrapperBounds.width / 2;
  const centerY = wrapperBounds.top + wrapperBounds.height / 2;

  let x, y;
  switch (corner) {
    case 'tl': x = centerX - width / 2; y = centerY - height / 2; break;
    case 'tr': x = centerX + width / 2; y = centerY - height / 2; break;
    case 'bl': x = centerX - width / 2; y = centerY + height / 2; break;
    case 'br': x = centerX + width / 2; y = centerY + height / 2; break;
    default: x = centerX; y = centerY;
  }
  return { x, y };
}

function updateScene() {
  if (connectionLinesSvg) {
    connectionLinesSvg.innerHTML = '';
  }

  wrappers.forEach((wrapper, i) => {
    if (!wrapper) return; // Skip if wrapper is null
    const delays = i * 0.1;
    const localProgress = Math.min(Math.max((scrollProgress - delays) / 0.3, 0), 1);
    const eased = easeInOut(localProgress);
    const vw = window.innerWidth / 100;

    const pos = finalPositions[i];
    const posX = pos.x * vw * eased;
    const posY = pos.y || 0;
    const posZ = startZ + (pos.z - startZ) * eased;

    let rotateY = startRotations[i];
    if (eased > 0.7) {
      const rotationProgress = (eased - 0.7) / 0.3;
      rotateY = startRotations[i] * (1 - rotationProgress);
    }

    wrapper.style.transform = `translate3d(${posX}px, ${posY}px, ${posZ}px) rotateY(${rotateY}deg)`;

    if (localProgress > 0) wrapper.classList.add('visible');
    else wrapper.classList.remove('visible');

    const rect = wrapper.querySelector('.rect');
    if (rect) {
      if (localProgress > 0.85) rect.classList.add('show');
      else rect.classList.remove('show');
    }

    if (descriptions[i]) {
      if (localProgress > 0.95 && localProgress < 1.05 && !wrapper.classList.contains('fade')) {
        descriptions[i].classList.add('show');
      } else if (wrapper.classList.contains('fade')) {
        setTimeout(() => {
          descriptions[i].classList.remove('show');
        }, 500);
      } else {
        descriptions[i].classList.remove('show');
      }
    }

    if (localProgress >= 1.0) {
      setTimeout(() => {
        wrapper.classList.add('fade');
        // Trigger fade overlay and redirect for wrapper9
        if (i === 8 && wrapper.classList.contains('fade') && fadeOverlay) {
          fadeOverlay.classList.add('fade-in');
          setTimeout(() => {
            window.location.href = 'index.html';
          }, 1000); // Match the CSS transition duration
        }
      }, 100);
    } else {
      wrapper.classList.remove('fade');
    }
  });

  connections.forEach((conn) => {
    const fromWrapper = wrappers[conn.from.idx];
    const toWrapper = wrappers[conn.to.idx];
    const fromRect = fromWrapper?.querySelector('.rect');
    const toRect = toWrapper?.querySelector('.rect');

    if (
      fromWrapper && toWrapper &&
      fromWrapper.classList.contains('visible') &&
      toWrapper.classList.contains('visible') &&
      !fromWrapper.classList.contains('fade') &&
      !toWrapper.classList.contains('fade')
    ) {
      const fromPos = getCornerPosition(fromWrapper, fromRect, conn.from.corner);
      const toPos = getCornerPosition(toWrapper, toRect, conn.to.corner);

      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('class', 'connection-line show');
      line.setAttribute('x1', fromPos.x);
      line.setAttribute('y1', fromPos.y);
      line.setAttribute('x2', toPos.x);
      line.setAttribute('y2', toPos.y);
      connectionLinesSvg.appendChild(line);
    }
  });
}

function updateFinalPositions() {
  finalPositions = window.innerHeight > window.innerWidth
    ? finalPositionsVertical
    : finalPositionsHorizontal;
  document.body.classList.toggle('vertical', window.innerHeight > window.innerWidth);
  updateScene();
}

window.addEventListener('resize', updateFinalPositions);
window.addEventListener('orientationchange', updateFinalPositions);

window.addEventListener('wheel', (e) => {
  if (e.deltaY > 0) {
    scrollProgress += e.deltaY * 0.0005;
    scrollProgress = Math.min(scrollProgress, 2);
    updateScene();
  }
});

let touchStartY = null;
window.addEventListener('touchstart', (e) => {
  touchStartY = e.touches[0].clientY;
});
window.addEventListener('touchmove', (e) => {
  if (touchStartY !== null) {
    const delta = touchStartY - e.touches[0].clientY;
    if (delta > 0) {
      scrollProgress += delta * 0.001;
      scrollProgress = Math.min(scrollProgress, 2);
      updateScene();
    }
    touchStartY = e.touches[0].clientY;
  }
});

updateFinalPositions();