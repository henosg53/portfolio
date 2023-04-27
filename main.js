import * as THREE from 'three'
import "./style.css"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { gsap } from 'gsap'

//Scene
const scene = new THREE.Scene()

//create our sphere
const geometry = new THREE.SphereGeometry(3,64,64) //(radius,widthSegment,heightSegment)
const material = new THREE.MeshStandardMaterial({
  color:'#006f83',
  roughness: .5
})
const mesh = new THREE.Mesh(geometry,material)
scene.add(mesh)

//Sizes
const sizes = {
  width : window.innerWidth,
  height : window.innerHeight
}

//Light
const light = new THREE.PointLight(0xffffff, 1, 100)
light.position.set(0,10,-20) //(x,y,z)
light.intensity = 1.5
scene.add(light)
// const lightHelper = new THREE.PointLightHelper(light);
// scene.add(lightHelper)

//Camera
const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, .1, 1000) //(fieldOfView, aspectRatio)
camera.position.z = 20
scene.add(camera)


//Renderer
const canvas = document.querySelector('.bg')
const renderer = new THREE.WebGL1Renderer({canvas})
renderer.setSize(sizes.width,sizes.height)
renderer.setPixelRatio(2)
renderer.render(scene,camera)

//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
// controls.enablePan = false
// controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 5

function addStar(){
  const geometery = new THREE.SphereGeometry(.25,24,24)
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff
  })
  const star = new THREE.Mesh( geometery, material)

  const [x,y,z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(200))
  star.position.set(x,y,z)
  scene.add(star)
}
function addPlanets(){
  const geometery = new THREE.SphereGeometry(6,24,24)
  const material = new THREE.MeshStandardMaterial({
    color: 0xFF6347
  })
  const star = new THREE.Mesh( geometery, material)

  const [x,y,z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(200))
  star.position.set(x,y,z)
  scene.add(star)
}

function addTorus(){
  const geometery = new THREE.TorusGeometry(5,3,16,100)
  const material = new THREE.MeshStandardMaterial({
    color: 0xFF6347
  })
  const torus = new THREE.Mesh( geometery, material)

  const [x,y,z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(200))
  torus.position.set(x,y,z)
  scene.add(torus)
}



// //adding 200 stars 
Array(200).fill().forEach(addStar)
Array(30).fill().forEach(addPlanets)
// Array(5).fill().forEach(addTorus)




//Resize
window.addEventListener('resize', () => {
  //update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  //update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width / sizes.height)
})

const loop = () =>{
  // mesh.position.x += .1
  // mesh.position.z += .1
  // mesh.position.x -= .05

  controls.update()
  renderer.render( scene, camera)
  window.requestAnimationFrame(loop)
}
loop()

//TimeLine Magic
const t1 = gsap.timeline({defaults: {duration: .5} })
t1.fromTo(mesh.scale, {z:0, x:0, y:0}, {z:1,x:1,y:1})
t1.fromTo("nav", { y: "-100%" }, {y:"0%"})
t1.fromTo(".title",{ opacity:0 },{opacity:1})
// t1.fromTo(".title",{ opacity:1 },{opacity:0})
// t1.fromTo(".title",{ x:'inherit' },{x:"-100%"})
t1.fromTo(".bio",{ opacity:0 },{opacity:1})
// t1.fromTo(".bio",{ display:"visible" },{opacity:"hidden"})
t1.fromTo(".jk",{ opacity:0 },{opacity:1})

//Mouse Animation Color
let mouseDown = false
let rgb = []

window.addEventListener("mousedown",()=>(mouseDown = true))
window.addEventListener("mouseup",()=>(mouseDown = false))
window.addEventListener("mousemove",(e)=>{
  if(mouseDown){
    rgb = [
      Math.round((e.pageX/sizes.width) * 255),
      Math.round((e.pageX/sizes.width) * 255),
      150
    ]
    //
    let newColor = new THREE.Color(`rgb(${rgb.join(",")})`)
    gsap.to(mesh.material.color, {r:newColor.r, g:newColor.g, b:newColor.b})
    console.log(rgb)
  }
})


function work1(){
  

  const workTexture = new THREE.TextureLoader().load('shegersalesls.png')
  const geometry = new THREE.BoxGeometry( 5, 5, 5 );
  const material = new THREE.MeshBasicMaterial( {  map: workTexture} );
  const cube = new THREE.Mesh( geometry, material );
  // const btn = document.querySelector('#btn')
  // t1.fromTo('#btn',{ visibility:'hidden' },{visibility:'visible'})

  cube.position.z = -8
  scene.add( cube,btn );
 
  cube.addEventListener('d', (e) => {
    if(1){
      console.log("button clicked")
    }
    
  })

}
function work2(){
  const workTexture = new THREE.TextureLoader().load('thedavls.png')
  const geometry = new THREE.BoxGeometry( 5, 5, 5 );
  const material = new THREE.MeshBasicMaterial( {  map: workTexture} );
  const cube = new THREE.Mesh( geometry, material );
  scene.add( cube );


}
function work3(){
  const workTexture = new THREE.TextureLoader().load('shegersalesls.png')
  const geometry = new THREE.BoxGeometry( 5, 5, 5 );
 
  const material = new THREE.MeshBasicMaterial({map: workTexture} );
  const cube = new THREE.Mesh( geometry, material );
  scene.add( cube );
  cube.position.z = 8

}
function text(){
  const geometry = new TextGeometry( 'Hello three.js!', {
		font: font,
		size: 80,
		height: 5,
		curveSegments: 12,
		bevelEnabled: true,
		bevelThickness: 10,
		bevelSize: 8,
		bevelOffset: 0,
		bevelSegments: 5
	} );
}

const moreButton = document.querySelector('.jk')
moreButton.addEventListener('click',()=>{
  window.scrollBy({
    top: window.innerHeight,
    left: 0,
    behavior: 'smooth'
  })
})

const workButton = document.querySelector('#works')
workButton.addEventListener('click',()=>{
  
  window.scrollBy({
    top: window.innerHeight * 3.1,
    left: 0,
    behavior: 'smooth'
  })
 console.log('Work button')
//  scene.remove(mesh)
//  scene.remove(mesh)
// //  controls.autoRotate = false
// window.addEventListener('mousemove',()=>(controls.autoRotate= false))
//  work1()
//  work2()
//  work3()
 
//   t1.fromTo(".title",{ opacity:1 },{opacity:0})
//   t1.fromTo(".bio",{ opacity:1 },{opacity:0})
//   t1.fromTo(".jk",{ opacity:1 },{opacity:0})
})

const contactButton = document.querySelector('#contact')
// contactButton.addEventListener('click',()=>{
//   navigator.clipboard.writeText("smtn") //copy to clipboard
// })
contactButton.addEventListener('click',()=>{
  window.scrollBy({
    top: window.innerHeight*5,
    left: 0,
    behavior: 'smooth'
  })
})