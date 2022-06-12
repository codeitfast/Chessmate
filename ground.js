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

export {Ground};