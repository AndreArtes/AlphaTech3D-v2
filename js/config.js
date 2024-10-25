import * as THREE from '../three/build/three.module.js';
import { OrbitControls } from '../three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from '../three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from '../three/examples/jsm/loaders/DRACOLoader.js';



// pointed canvas in HTML
const canvas = document.querySelector('.webgl');

//New Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color("white")

//AxisHelper

// const AxisHelper = new THREE.AxesHelper(50)
// scene.add(AxisHelper)




//light setup
const directionLight = new THREE.DirectionalLight("white",3)
const ambiantLight = new THREE.AmbientLight( 0x404040, 20); // soft white light
const hemisphereLight = new THREE.HemisphereLight("white","brown",5)
const directionLightHelper = new THREE.DirectionalLightHelper(directionLight,10,"black")

directionLight.position.set(0,70,0)
scene.add(directionLight, ambiantLight,hemisphereLight,directionLightHelper);



//camera init
const screenSize = {width: window.innerWidth, height: window.innerHeight}
const camera = new THREE.PerspectiveCamera(10,screenSize.width/screenSize.height,5,10000)
// const cameraHelper = new THREE.CameraHelper(camera)

camera.position.set(0,50,400)
scene.add(camera)



//renderer entry
const renderer = new THREE.WebGLRenderer({
    canvas:canvas,
    
    antialias: true
});
renderer.setSize(screenSize.width,screenSize.height)
renderer.setPixelRatio(window.devicePixelRatio)
renderer.shadowMap.enabled = true
renderer.gammaOutput = true

//Orbits controler
const controls = new OrbitControls(camera, renderer.domElement);
controls.autoRotate = true
controls.zoomToCursor = true
controls._controlActive = false
controls._performCursorZoom = true




//GLTF - GLB 2.0 Loader
const loader = new GLTFLoader()
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('./three/exemples/jsm/libs/draco/')
loader.setDRACOLoader(dracoLoader)

loader.load('../models/FauteuilNoir.glb',function(glb){ 
    const glbModel = glb.scene
    glbModel.castShadow = true
    glbModel.position.set(0,-25,0)
    glbModel.rotation.set(0,5,0)
    glbModel.receiveShadow=true
    glbModel.castShadow=true
    glbModel.environment=true
    glbModel.reflectivity = 5    
    scene.add(glbModel)
},function(xhr){
    console.log(xhr.loaded/xhr.total*100+"% loaded")
},function(error){
    console.log("An erreror happened");   
});


//Window size updater
window.addEventListener('resize', function (){
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width, height)
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
}
);

// function animation Loop
function animate(){
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
    controls.update()
}
    
    
animate()

