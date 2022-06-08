import * as THREE from './three.module.js'
import {TransformControls} from './TransformControls.js'


const scene = new THREE.Scene()
scene.add(new THREE.AxesHelper(5))

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.z = 2

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshNormalMaterial()

const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

const controls = new TransformControls(camera, renderer.domElement)
controls.attach(cube)
scene.add(controls)

window.addEventListener('keydown', function (event) {
    switch (event.code) {
        case 'KeyG':
            controls.setMode('translate')
            break
        case 'KeyR':
            controls.setMode('rotate')
            break
        case 'KeyS':
            controls.setMode('scale')
            break
    }
})

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

function render() {
    renderer.render(scene, camera)
}

