import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1,1000)
// camera.position.z = 20
// camera.position.x = 10
// camera.position.y = 10

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio( window.devicePixelRatio )
renderer.setSize( window.innerWidth, window.innerHeight)
camera.position.setZ(30)

// renderer.render( scene, camera)

const geometery = new THREE.TorusGeometry( 10, 3, 16, 100)
// const material = new THREE.MeshBasicMaterial({
//   color: 0xFF6347,
//   wireframe: true
// })
const material = new THREE.MeshStandardMaterial({
  color: 0xFF6347
})
const torus = new THREE.Mesh( geometery, material)

// scene.add(torus)

const sungeo = new THREE.SphereGeometry(10,20,20)
const sun = new THREE.Mesh(sungeo,material)
// scene.add(sun)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(0,0,0)

const ambientLight = new THREE.AmbientLight(0xffffff)

scene.add( pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight);

const gridHelper = new THREE.GridHelper(200,50)
// scene.add( lightHelper, gridHelper)

const controls = new OrbitControls(camera,renderer.domElement)

// //addstar function
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

// //adding 200 stars 
Array(200).fill().forEach(addStar)

// //scene background
// //loading texture 
// const spaceTexture = new THREE.TextureLoader().load('planet.jpg')
scene.background = "black"

// const jeffTexture = new THREE.TextureLoader().load('homer.png')
// const jeff = new THREE.Mesh(
//   new THREE.BoxGeometry(3,3,3),
//   new THREE.MeshBasicMaterial({
//     map: jeffTexture
//   })
// )
// scene.add(jeff)

const planetTexture = new THREE.TextureLoader().load('space.png')
const planet = new THREE.Mesh(
  new THREE.SphereGeometry(5,30,23),
  new THREE.MeshStandardMaterial({
    map: planetTexture,
  })
)
scene.add(planet)

planet.rotation.x += .05


const moonTexture = new THREE.TextureLoader().load('planet.jpg')
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(1,32,32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
  })
)
scene.add(moon)

moon.position.z = 10
moon.position.setX(-5)


function moveCamera(){
  
  // let t = document.body.getBoundingClientRect().top
  

  // moon.rotation.x += .05
  moon.rotation.y += .01
  // moon.rotation.z += .01

  planet.rotation.y += .001

  // jeff.rotation.y += .01
  // jeff.rotation.z += .01

  // camera.position.z = t * -0.1
  // camera.position.x = t * -0.0002
  // camera.position.y = t * -0.0002

}


// document.body.onscroll = moveCamera()

function animate(){
  requestAnimationFrame(animate)

  torus.rotation.x += .01
  torus.rotation.y += .005
  torus.rotation.z += .01
  
  moveCamera()

  controls.update()



  renderer.render(scene,camera)
}

animate()

