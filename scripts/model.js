let scene, camera, renderer, model;
let scrollProgress = 0, time = 0;
let scrollLocked = false, explosionStarted = false;
let explosionStartTime = 0;

let shakingActive = false;
let pulseActive = false;
let preExplosionPulseTriggered = false;

const fadeOverlay = document.getElementById('fade-overlay');
let fadeStarted = false;

const maxApproachZ = 1.9;
const pulseStartThreshold = 0.25 * maxApproachZ;
const pulseEndThreshold = 0.60 * maxApproachZ;
const preExplosionPulseThreshold = 0.8 * maxApproachZ;
const explosionThreshold = maxApproachZ;

function startExplosion() {
  if (explosionStarted) return;
  scrollLocked = true;
  explosionStartTime = time;
  explosionStarted = true;
  pulseActive = true;
  shakingActive = true;
  console.log('Explosion started at time:', time);
}

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0.4, 4.5);

  renderer = new THREE.WebGLRenderer({ antialias: true, canvas: document.getElementById('three-canvas') });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const directionalLight = new THREE.DirectionalLight(0xffffff, 2.0);
  directionalLight.position.set(0, 5, 0.5);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  const loader = new THREE.GLTFLoader();
  loader.load('model.glb', (gltf) => {
    model = gltf.scene;
    model.rotation.y = 5.1;
    model.castShadow = true;
    model.receiveShadow = true;
    scene.add(model);
    model.position.z = 0;

    model.traverse((child) => {
      if (child.isMesh) {
        const geometry = child.geometry;
        geometry.computeVertexNormals();
        child.castShadow = true;
        child.receiveShadow = true;

        child.material = new THREE.MeshStandardMaterial({ color: 0x808080, roughness: 0.5, metalness: 0.1 });

        const positionsCopy = new Float32Array(geometry.attributes.position.array.length);
        positionsCopy.set(geometry.attributes.position.array);

        const normalsCopy = new Float32Array(geometry.attributes.normal.array.length);
        normalsCopy.set(geometry.attributes.normal.array);

        child.userData.originalData = { positions: positionsCopy, normals: normalsCopy };
        geometry.attributes.position.needsUpdate = true;
      }
    });

    animate();
  });

  window.addEventListener('wheel', (event) => {
    if (!model || scrollLocked) return;

    scrollProgress += event.deltaY * 0.0003;
    scrollProgress = Math.max(0, Math.min(1, scrollProgress));

    if (scrollProgress < 0.25) {
      const t = scrollProgress / 0.25;
      model.position.z = t * pulseStartThreshold;
      pulseActive = false;
      shakingActive = false;
    } else if (scrollProgress < 0.60) {
      const t = (scrollProgress - 0.25) / 0.35;
      model.position.z = pulseStartThreshold + t * (pulseEndThreshold - pulseStartThreshold);
      pulseActive = true;
      shakingActive = true;
    } else if (scrollProgress < 0.9) {
      const t = (scrollProgress - 0.60) / 0.3;
      model.position.z = pulseEndThreshold + t * (preExplosionPulseThreshold - pulseEndThreshold);
      pulseActive = false;
      shakingActive = false;
    } else {
      const t = (scrollProgress - 0.9) / 0.1;
      model.position.z = preExplosionPulseThreshold + t * (explosionThreshold - preExplosionPulseThreshold);
      pulseActive = true;
      shakingActive = true;
    }

    if (!preExplosionPulseTriggered && scrollProgress >= 0.8 && scrollProgress < 0.9) {
      preExplosionPulseTriggered = true;
      setTimeout(() => {
        pulseActive = false;
        shakingActive = false;
      }, 400);
    }
  });
}

function updateModel() {
  if (!model) return;
  if (!explosionStarted && model.position.z >= explosionThreshold) startExplosion();

  model.traverse((child) => {
    if (child.isMesh) {
      const geometry = child.geometry;
      const positions = geometry.attributes.position.array;
      const original = child.userData.originalData;
      if (!original) return;

      const shakeAmplitude = 0.001;
      const shakeFrequency = 100;
      const pulseAmplitude = 0.01;
      const pulseFrequency = 80;

      const isShaking = shakingActive;
      const isPulsing = pulseActive;

      const shakeAmount = isShaking ? shakeAmplitude * Math.sin(time * shakeFrequency) : 0;
      const pulseAmount = isPulsing ? pulseAmplitude * Math.sin(time * pulseFrequency) : 0;

      for (let i = 0; i < positions.length; i += 3) {
        const ox = original.positions[i];
        const oy = original.positions[i + 1];
        const oz = original.positions[i + 2];

        const nx = original.normals[i];
        const ny = original.normals[i + 1];
        const nz = original.normals[i + 2];

        let scatterX = nx;
        let scatterY = ny;
        let scatterZ = nz;

        let amplitude = 0;

        if (scrollLocked) {
          const tExplode = Math.min((time - explosionStartTime) / 1.2, 1);
          const length = Math.sqrt(nx * nx + ny * ny + nz * nz);
          if (length > 0) {
            scatterX = nx / length;
            scatterY = ny / length;
            scatterZ = nz / length;
          } else {
            scatterX = scatterY = scatterZ = 0;
          }
          amplitude = tExplode * tExplode * 20;

          if (tExplode >= 0.5 && !fadeStarted) {
            fadeStarted = true;
            fadeOverlay.style.opacity = '1';
            setTimeout(() => {
              window.location.href = 'era.html';
            }, 500);
          }
        } else {
          amplitude = pulseAmount;
        }

        positions[i] = ox + scatterX * amplitude + shakeAmount;
        positions[i + 1] = oy + scatterY * amplitude + shakeAmount;
        positions[i + 2] = oz + scatterZ * amplitude + shakeAmount;
      }

      geometry.attributes.position.needsUpdate = true;
      geometry.computeVertexNormals();
    }
  });
}

function animate() {
  requestAnimationFrame(animate);
  time += 0.016;
  updateModel();
  renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

try {
  init();
} catch (error) {
  console.error('Ошибка инициализации:', error);
  alert('Ошибка при инициализации сцены.');
}