import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';


var renderer, camera, scene, controls, geometry, material, models, loader, dracoLoader, canvas, light;

canvas = document.querySelector('.webgl')
renderer = new THREE.WebGLRenderer({
    canvas:canvas
});
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);
camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight,0.1,1000);
controls = new OrbitControls(camera, renderer.domElement);
scene = new THREE.Scene();
scene.background = "0x00ff00";

light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2,2,5);
scene.add(light)

camera.position.set(0,5,10);
controls.update();


geometry = new THREE.BoxGeometry(1,1,1);
material = new THREE.MeshBasicMaterial({color:0x12efdb});
models = new THREE.Mesh(geometry, material);

window.addEventListener('resize', function (){
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updatProjectionMatrix();
    
});

// // Instantiate a loader
// loader = new GLTFLoader();

// // // Optional: Provide a DRACOLoader instance to decode compressed mesh data
// // dracoLoader = new DRACOLoader();
// // dracoLoader.setDecoderPath( 'node_modules/three/examples/jsm/libs/draco/' );
// // loader.setDRACOLoader( dracoLoader );

// // Load a glTF resource
// loader.load(
// 	// resource URL
// 	'./models/S0900093JO12.glb',
// 	// called when the resource is loaded
// 	function ( glb ) {
//         const root = glb.scene;
//         root.scale.set(0.5,0.5,0.5);
//         scene.add(root)
// 	},
// 	// called while loading is progressing
// 	function ( xhr ) {

// 		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

// 	},
// 	// called when loading has errors
// 	function ( error ) {

// 		console.log( 'An error occured!' );

// 	}
// );


loader = new GLTFLoader();
loader.load('.../models/S33011AU12.glb',function (glb){
    console.log(glb);
    const root = glb.scene;
    root.scale.set(0.5,0.5,0.5);
    scene.add(root);
}, function(xhr){
    console.log(xhr.loaded/xhr.total * 100 +"% loaded");
    
},function(error){
    console.log("An error occured");
    
}
)


scene.add(models);


function animate(){
    requestAnimationFrame(animate);
    // models.rotation.y -= 0.005;
    renderer.render(scene, camera);
    controls.update();

}

animate()