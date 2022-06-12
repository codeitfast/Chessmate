//import {Ground} from './ground.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var focus = {x: 0, z: 0}
const avatars = []

camera.position.z = 5;
camera.position.y = 10
camera.position.x = 5
camera.lookAt(0,0,0)



class Ground{
  constructor(x, y, z, color){
    this.x = x
    this.y = y
    this.z = z
  }
  add(){
    this.geometry = new THREE.BoxGeometry()
    this.material = new THREE.MeshBasicMaterial({color: 0x707070})
    if(this.x % 2 === this.z % 2){
      this.material = new THREE.MeshBasicMaterial({color: 0x505050})
    }

    this.mesh = new THREE.Mesh( this.geometry, this.material)
    this.mesh.position.set(
      this.x,
      this.y,
      this.z
    )
    scene.add(this.mesh)
  }
}

class Avatar{
  constructor(x, y, z, health){
    this.x = x
    this.y = y
    this.z = z
    this.health = health
  }
  add(){
    this.geometry = new THREE.BoxGeometry(1,2,1)
    this.material = new THREE.MeshBasicMaterial({color: 0xff000f})
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.mesh.position.set(
      this.x,
      this.y,
      this.z
    )
    scene.add(this.mesh)
  }
}



var grounds = []
for(var x = 0; x < 10; x++){
  for(var z = 0; z < 10; z++){
    var ground = new Ground(x, 0, z)
    grounds.push(ground)
    ground.add()
  }
}

const avatar = new Avatar(5,1,2)
avatar.add()


const focusCube = ()=>{
  for(var i = 0; i < grounds.length; i++){
    if(grounds[i].x == focus.x && grounds[i].z == focus.z){
      
      grounds[i].mesh.material = new THREE.MeshBasicMaterial({color: 0x0000ff})
    }else{
      grounds[i].mesh.material = grounds[i].material
    }
  }
}


const updateGoto = (x,y,z)=>{  
  /*var one = Math.random()<.5? 1: 0
  //var two = Math.random()<.5? 1: 0
  var two = 0
  var three = Math.random()<.5? 1: 0*/

  if(Math.random() < .5){
    var one = Math.random()<.5? 1: -1
    var three = 0
  }else{
    var one = 0
    var three = Math.random()<.5? 1: -1
  }

  var two = 0

  return ([x + one, y + two, z + three])
}

let timer = 0

const animate = () => {
  timer ++
	requestAnimationFrame( animate );
	renderer.render( scene, camera );

  avatar.mesh.position.x += (avatar.x - avatar.mesh.position.x)/10
  avatar.mesh.position.y += (avatar.y - avatar.mesh.position.y)/10
  avatar.mesh.position.z += (avatar.z - avatar.mesh.position.z)/10

  if(timer % 100 === 0){
    [avatar.x, avatar.y, avatar.z] = updateGoto(avatar.x, avatar.y, avatar.z)
  }

  for(let i = 0; i < avatars.length; i++){
    avatars[i].mesh.position.x += (avatars[i].x - avatars[i].mesh.position.x)/10
    avatars[i].mesh.position.y += (avatars[i].y - avatars[i].mesh.position.y)/10
    avatars[i].mesh.position.z += (avatars[i].z - avatars[i].mesh.position.z)/10

    if(timer % 100 === 0){
      [avatars[i].x, avatars[i].y, avatars[i].z] = updateGoto(avatars[i].x, avatars[i].y, avatars[i].z)
    }
  }
  
  focusCube()
  
}
animate();



window.addEventListener('keydown', (event)=>{
  console.log(event.key)
  if(event.key == "ArrowLeft"){
    focus.x -= 1
  }
  if(event.key == "ArrowRight"){
    focus.x += 1
  }
  if(event.key == "ArrowUp"){
    focus.z -= 1
  }
  if(event.key == "ArrowDown"){
    focus.z += 1
  }

  if(event.key == " "){
    var newAvatar = new Avatar(focus.x, 1, focus.z)
    newAvatar.add()
    avatars.push(newAvatar)
  }
})