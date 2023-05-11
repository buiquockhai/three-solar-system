import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import stars from "../img/stars.jpg";
import sunTexture from "../img/sun.jpg";
import mercuryTexture from "../img/mercury.jpg";
import venusTexture from "../img/venus.jpg";
import earthTexture from "../img/earth.jpg";
import marsTexture from "../img/mars.jpg";
import jupiterTexture from "../img/jupiter.jpg";
import saturnTexture from "../img/saturn.jpg";
import saturnRingTexture from "../img/saturn-ring.png";
import uranusTexture from "../img/uranus.jpg";
import uranusRingTexture from "../img/uranus-ring.png";
import neptuneTexture from "../img/neptune.jpg";

const createPlanetOrbit = (radius) => {
  const geometry = new THREE.RingGeometry(radius, radius - 0.1, 100, 1, 0, 10);
  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = 0.5 * Math.PI;
  return mesh;
};

const createPlanet = ({
  textureLoader,
  radius,
  widthSegment = 100,
  heightSegment = 100,
  texture,
  position,
  rotation,
}) => {
  const geometry = new THREE.SphereGeometry(
    radius,
    widthSegment,
    heightSegment
  );
  const material = new THREE.MeshStandardMaterial({
    map: textureLoader.load(texture),
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.x = position;
  mesh.rotation.x = rotation;
  return mesh;
};

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(-90, 140, 140);
camera.lookAt(100, 100, 100);

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 2, 500);
scene.add(pointLight);

const textureLoader = new THREE.TextureLoader();

// sun
const sunGeometry = new THREE.SphereGeometry(16, 300, 300);
const subMaterial = new THREE.MeshBasicMaterial({
  map: textureLoader.load(sunTexture),
});
const sun = new THREE.Mesh(sunGeometry, subMaterial);
scene.add(sun);

// mercury
const mercury = createPlanet({
  textureLoader,
  radius: 3,
  texture: mercuryTexture,
  position: 28,
  rotation: 0.1 * Math.PI,
});
const mercuryObj = new THREE.Object3D();
mercuryObj.add(mercury);
scene.add(mercuryObj);
scene.add(createPlanetOrbit(28));

// venus
const venus = createPlanet({
  textureLoader,
  radius: 3.4,
  texture: venusTexture,
  position: 48,
  rotation: 0.1 * Math.PI,
});
const venusObj = new THREE.Object3D();
venusObj.add(venus);
scene.add(venusObj);
scene.add(createPlanetOrbit(48));

// earth
const earth = createPlanet({
  textureLoader,
  radius: 7,
  texture: earthTexture,
  position: 80,
  rotation: 0.2 * Math.PI,
});
const earthObj = new THREE.Object3D();
earthObj.add(earth);
scene.add(earthObj);
scene.add(createPlanetOrbit(80));

// mars
const mars = createPlanet({
  textureLoader,
  radius: 6,
  texture: marsTexture,
  position: 100,
  rotation: -0.15 * Math.PI,
});
const marsObj = new THREE.Object3D();
marsObj.add(mars);
scene.add(marsObj);
scene.add(createPlanetOrbit(100));

// jupiter
const jupiter = createPlanet({
  textureLoader,
  radius: 15,
  texture: jupiterTexture,
  position: 150,
  rotation: -0.1 * Math.PI,
});
const jupiterObj = new THREE.Object3D();
jupiterObj.add(jupiter);
scene.add(jupiterObj);
scene.add(createPlanetOrbit(150));

// saturn
const saturn = createPlanet({
  textureLoader,
  radius: 11,
  texture: saturnTexture,
  position: 200,
  rotation: 0.2 * Math.PI,
});
const saturnObj = new THREE.Object3D();
saturnObj.add(saturn);
scene.add(saturnObj);
scene.add(createPlanetOrbit(200));
const saturnRingGeometry = new THREE.RingGeometry(12, 20, 100);
const saturnRingMaterial = new THREE.MeshBasicMaterial({
  map: textureLoader.load(saturnRingTexture),
  side: THREE.DoubleSide,
});
const saturnRing = new THREE.Mesh(saturnRingGeometry, saturnRingMaterial);
saturnRing.rotation.x = 0.5 * Math.PI;
saturn.add(saturnRing);

// uranus
const uranus = createPlanet({
  textureLoader,
  radius: 6,
  texture: uranusTexture,
  position: 260,
  rotation: 0.05 * Math.PI,
});
const uranusObj = new THREE.Object3D();
uranusObj.add(uranus);
scene.add(uranusObj);
scene.add(createPlanetOrbit(260));
const uranusRingGeometry = new THREE.RingGeometry(8, 9, 100);
const uranusRingMaterial = new THREE.MeshBasicMaterial({
  map: textureLoader.load(uranusRingTexture),
  side: THREE.DoubleSide,
});
const uranusRing = new THREE.Mesh(uranusRingGeometry, uranusRingMaterial);
uranus.add(uranusRing);

// neptune
const neptune = createPlanet({
  textureLoader,
  radius: 5.5,
  texture: neptuneTexture,
  position: 320,
  rotation: -0.5 * Math.PI,
});
const neptuneObj = new THREE.Object3D();
neptuneObj.add(neptune);
scene.add(neptuneObj);
scene.add(createPlanetOrbit(320));

const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
  stars,
  stars,
  stars,
  stars,
  stars,
  stars,
]);

const animate = () => {
  sun.rotateY(0.005);
  mercury.rotateY(0.005);
  mercuryObj.rotateY(0.02);
  venus.rotateY(0.004);
  venusObj.rotateY(0.01);
  earth.rotateY(0.003);
  earthObj.rotateY(0.008);
  mars.rotateY(0.003);
  marsObj.rotateY(0.006);
  jupiter.rotateY(0.003);
  jupiterObj.rotateY(0.0055);
  saturn.rotateY(0.003);
  saturnObj.rotateY(0.0065);
  uranus.rotateZ(0.0035);
  uranusObj.rotateY(0.0045);
  neptune.rotateY(0.0025);
  neptuneObj.rotateY(0.0035);
  renderer.render(scene, camera);
};

renderer.setAnimationLoop(animate);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
