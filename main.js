import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';

import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';
// scene
const scene = new THREE.Scene();

// camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);

// renderer
const renderer = new THREE.WebGLRenderer({
  // select the DOM element to use
  canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);
renderer.render(scene, camera);

// objects
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({color: 0xFF6347, wireframe: true});
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

const torusgeometry = new THREE.TorusGeometry(10, 3, 16, 100);
const torusmaterial = new THREE.MeshStandardMaterial({color: 0xFF6347, wireframe: true});
const torus1 = new THREE.Mesh(torusgeometry, torusmaterial);
torus1.position.set(-4.5, 0, 55);
scene.add(torus1);

// lights
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Mouse Controls
// const controls = new OrbitControls(camera, renderer.domElement);

// Space background
/// Star method to randomly generate a star
function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color:0xffffff});
  const star = new THREE.Mesh(geometry, material);
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);
}
Array(250).fill().forEach(addStar);

// Import texture for space
const spaceTexture = new THREE.TextureLoader().load('/Assets/Images/cyber-grid.png');
scene.background = spaceTexture;

// grid for background
// const gridgeometry = new THREE.PlaneGeometry( 1, 1 );
// const gridmaterial = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide, wireframe: true} );
// const plane = new THREE.Mesh( gridgeometry, gridmaterial );
// plane.wireframeLinewidth = 4;
// scene.add( plane );

// heart
const x = 0, y = 0;

const heartShape = new THREE.Shape();

heartShape.moveTo( x + 5, y + 5 );
heartShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
heartShape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
heartShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
heartShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
heartShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
heartShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );

const heartGeometry = new THREE.ShapeGeometry( heartShape );
const heartMaterial = new THREE.MeshBasicMaterial( { color: 0xFF6347 } );
const heartMesh = new THREE.Mesh( heartGeometry, heartMaterial ) ;
scene.add( heartMesh );
// const cube = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshStandardMaterial({color: 0xFF6347, wireframe: true}))
// scene.add(cube);

// Moon
// const moonTexture = new THREE.TextureLoader().load('/Assets/Images/moon.jpg');
// const normalTexture = new THREE.TextureLoader().load('/Assets/Images/normal.jpg');
const moon = new THREE.Mesh(new THREE.SphereGeometry(3, 32, 32), new THREE.MeshStandardMaterial({color: 0xFF6347, wireframe: true}))
scene.add(moon);
moon.position.set(-4.5, 0, 27);
console.log(moon);

heartMesh.position.z = -11;
heartMesh.position.x = 2;

// Ring
const ringgeometry = new THREE.RingGeometry( 1, 5, 45 );
const ringmaterial = new THREE.MeshBasicMaterial( { color: 0xffff00, side: THREE.DoubleSide, wireframe: true} );
const ringmesh = new THREE.Mesh( ringgeometry, ringmaterial );
ringmesh.position.set(4, 0, 41);
scene.add( ringmesh );
// Camera Controls
function moveCamera(){
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  // heartMesh.rotation.y += 0.01;
  heartMesh.rotation.z -= 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}
document.body.onscroll = moveCamera
moveCamera();

// Animation
function animate(){
  requestAnimationFrame(animate);
  torus.rotation.x += 0.001;
  torus.rotation.y += 0.0005;
  torus.rotation.z += 0.001;

  ringmesh.rotation.x += 0.001;
  ringmesh.rotation.y += 0.0005;
  ringmesh.rotation.z += 0.001;
  // controls.update();
  renderer.render(scene, camera);
}

animate();
