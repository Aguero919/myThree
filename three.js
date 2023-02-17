import * as THREE from "three";
import gsap from "gsap";

import "./style.css"

// create sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

// import canvas
const canvas = document.querySelector(".webgl");

// create a scene and a camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, sizes.width/sizes.height, 0.1, 1000 );

camera.position.z = 7;

// create a renderer
const renderer = new THREE.WebGLRenderer( {canvas, antialias: true} );
renderer.setSize(sizes.width, sizes.height);

// add to the scene
scene.add(camera);

// objects and geometry
const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshBasicMaterial( {color: "#ffe100"} );
const cube = new THREE.Mesh( cubeGeometry, material );

scene.add(cube);


// set points for a line
const points = [];
points.push(new THREE.Vector3(-5, 0, 0));
points.push(new THREE.Vector3(0, 5, 0));
points.push(new THREE.Vector3(5, 0, 0));
console.log(points);  // creates a "blue" color arrow pointing above

// geometry for a line
const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

// pink material for a line
const pinkMaterial = new THREE.LineBasicMaterial( {color: "#0000ff", linewidth: 1} );

// create a line
const line = new THREE.Line( lineGeometry, pinkMaterial );
line.position.x = 5;
line.position.y = -5;
line.position.z = -10;
scene.add(line);
console.log(line);

renderer.render( scene, camera );

// animate the cube 
const loop = () => {
    requestAnimationFrame(loop);
    cube.rotation.x += 0.0095;
    cube.rotation.y += 0.0095;
    renderer.render(scene, camera);
}

loop();

// updates the screen
window.addEventListener("resize", () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width/sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
})