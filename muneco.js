document.getElementById("botonRotar").onclick = cambioRotar;
document.getElementById("botonMover").onclick = cambioMover;
document.getElementById("botonEscala").onclick = cambioEscala;


import * as THREE from './three.module.js'
import {
    OrbitControls
} from './OrbitControls.js'
import {
    TransformControls
} from './TransformControls.js'


let scene, camera, renderer;




// Scene

scene = new THREE.Scene()

var loader = new THREE.TextureLoader().load('../sky.jpg', function (texture) {
    scene.background = texture
});


//camera
camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 30000);
camera.position.set(20, 20, 30);



//renderer

renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement)

// añadir geometria
const group = new THREE.Group()


var geometry = new THREE.SphereGeometry(2, 32, 16);
var texture = new THREE.TextureLoader().load('https://thumbs.dreamstime.com/b/patr%C3%B3n-de-textura-nieve-ininterrumpida-una-forma-precipitaci%C3%B3n-consistente-en-peque%C3%B1os-cristales-hielo-sin-fisuras-imagen-fondo-183238776.jpg');
var material = new THREE.MeshBasicMaterial({
    map: texture
});
var sphere = new THREE.Mesh(geometry, material);
//sphere.position.z = 5
group.add(sphere);

var geometry = new THREE.SphereGeometry(3, 32, 16);
var texture = new THREE.TextureLoader().load('https://thumbs.dreamstime.com/b/patr%C3%B3n-de-textura-nieve-ininterrumpida-una-forma-precipitaci%C3%B3n-consistente-en-peque%C3%B1os-cristales-hielo-sin-fisuras-imagen-fondo-183238776.jpg');
var material = new THREE.MeshBasicMaterial({
    map: texture
});
var sphere2 = new THREE.Mesh(geometry, material);
sphere2.position.y = -4
//sphere2.position.z = 5
group.add(sphere2);

//nariz
var geometry = new THREE.ConeGeometry(0.5, 2.5, 23);
var texture = new THREE.TextureLoader().load('https://thumbs.dreamstime.com/b/carrot-abstract-background-macro-texture-35484900.jpg');
var material = new THREE.MeshBasicMaterial({
    map: texture
});
var cone = new THREE.Mesh(geometry, material);
//cone.position.z = 5
cone.position.x = 2
cone.rotation.x = Math.PI / 2
cone.rotation.z = 300

group.add(cone);

//ojo left
var geometry = new THREE.CylinderGeometry(0.2, 0.2, 0.4, 15);
var material = new THREE.MeshBasicMaterial({
    color: 0x000000
});
var cylinder = new THREE.Mesh(geometry, material);
cylinder.position.z = 0.6
cylinder.position.x = 1.6
cylinder.position.y = 1
cylinder.rotation.x = Math.PI / 2
cylinder.rotation.y = 10
cylinder.rotation.z = 300
group.add(cylinder);


//ojo right
var geometry = new THREE.CylinderGeometry(0.2, 0.2, 0.4, 15);
var material = new THREE.MeshBasicMaterial({
    color: 0x000000
});
var cylinder2 = new THREE.Mesh(geometry, material);
cylinder2.position.z = -0.6
cylinder2.position.x = 1.6
cylinder2.position.y = 1
cylinder2.rotation.x = Math.PI / 2
cylinder2.rotation.y = 10
cylinder2.rotation.z = 300
group.add(cylinder2);

group.position.y = 7
scene.add(group)




// crear el suelo
var geometry = new THREE.PlaneGeometry(100, 100);
var texture = new THREE.TextureLoader().load('https://cdna.artstation.com/p/assets/images/images/015/015/050/large/jessica-hughes-asset.jpg?1546718464');
var material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide
});

var floor = new THREE.Mesh(geometry, material);

floor.rotation.x = Math.PI / 2
scene.add(floor);





// controles
let orbit = new OrbitControls(camera, renderer.domElement) // gracias a esto puedo girar la camara y parece que el cubo se mueve y al hacer scrow hace zoom



var tControl = new TransformControls(camera, renderer.domElement)

//para mover el muñeco
tControl.addEventListener('dragging-changed', (e) => {
    orbit.enabled = !e.value
})
tControl.attach(group)
scene.add(tControl)



var texture = new THREE.TextureLoader().load('https://thumbs.dreamstime.com/b/carrot-abstract-background-macro-texture-35484900.jpg');
var material = new THREE.MeshBasicMaterial({
    map: texture
});

// esto es para que el suelo aparezca con cuadros
let helper = new THREE.GridHelper(1000, 100)
scene.add(helper)


tControl.setMode('translate')


//console.log(tControl.position)

window.addEventListener('resize', redimensionar)

function redimensionar() {
    // todo esto es para que cuando agamos la pantalla mas pequeña se ajuste el objeto
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight, )
    renderer.render(scene, camera);

}


//Esto es para mover al muñecom de nieve puede moverse con  arrow keys, si se presiona space sube por el eje 'y'
//Al pulsar 'ctrl' gira el muñeco

//document.onkeydown = function (e){
window.addEventListener("keydown", function (e) {

    //orbit.enabled = false // esto es para desabilitar el movimiento de camra para que no se mueva mietras presionamos las teclas

    if (e.key === 'ArrowLeft') {

        group.position.x -= 0.5
    } else if (e.key === 'ArrowRight') {

        group.position.x += 0.5
    } else if (e.key === 'ArrowDown') {

        group.position.z += 0.5
    } else if (e.key === 'ArrowUp') {

        group.position.z -= 0.5
    } else if (e.Code === 37 || e.keyCode === 40) { // keyCode esta deprecated
        group.position.x -= 0.5
        group.position.z -= 0.5
    }
    // 32 espacio
    if (e.key === 'Control') {
        group.rotation.y += 0.1

    }
    if (e.key === ' ') { // esto es space si en vez de usar e.key usaramos e.code seria e.code=== 'Space'
        group.position.y += 0.1

    }

   // console.log(e)

})

// acceder a la API de pokemon de otra manera

const dataApiPokemon = async () => {

    const res = await fetch('https://pokeapi.co/api/v2/pokemon/')
    const data = await res.json();
    var dataPokemon = data.results.map(dataPok => dataPok)
    console.log(dataPokemon)


    // JSON creado con el proposito de cargar la imagen en un cubo
    let pokedex = {
        "pokemon": [{
                "firstName": "Grookey",
                "url": "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/7/7a/latest/20190816174348/Grookey.png/1200px-Grookey.png"
            },
            {
                "firstName": "Sprigatito",
                "url": "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/e/eb/latest/20220227154237/Sprigatito.png/1200px-Sprigatito.png"
            }
            /*{
              "firstName": "Totodile",
              "url": "https://img2.freepng.es/20190711/gkh/kisspng-totodile-chikorita-croconaw-cyndaquil-video-games-5d277a79c4c994.4102062115628683458061.jpg"
            }*/
        ]
    }

    var img;

    pokedex.pokemon.forEach(element => {
        //console.log(element.firstName + element.url)
        img = element.url;

    });

    //console.log(pokedex.pokemon[0].url)
    //img= pokedex.pokemon[0].url

    //Aqui se carga la ultima imagen del JSON
    var texturePokemon = new THREE.TextureLoader().load(img);


    function changeFoto() {

        img = pokedex.pokemon[0].url;
        var texturePokemon = new THREE.TextureLoader().load(img);

    }


    var geometry = geometry = new THREE.BoxBufferGeometry(100, 100, 100);
    var material = new THREE.MeshBasicMaterial({
        map: texturePokemon
    });
    var foto = new THREE.Mesh(geometry, material);
    foto.position.z = 100
    //foto.rotation.y =20;
    scene.add(foto);

}



// animación
//var posInit = group.getWorldPosition().y
var i = 0;
var animate = function () {
    requestAnimationFrame(animate)


    renderer.render(scene, camera)

    /*if(group.getWorldPosition().y!=posInit){

        //changeFoto()
    }*/

    //console.log(group.getWorldPosition().y)




}



// lamar  a la animacion
animate()


dataApiPokemon();


//Accedemos a la API de pokemon y la convertimos a json para recorrerla
var lista
const url = 'https://pokeapi.co/api/v2/pokemon';
fetch(url)
    .then((resp) => resp.json())
    .then(function (data) {
        var datos = data.results;
        

         lista = JSON.stringify(datos)// convertimos a json

        //console.log(pokemon[0].name)
        console.log(lista)

        
        // })
    })
    .catch(function (error) {
        console.log(error);
    });

   
   


// Mover, rotar o cambiar escala

function cambioRotar() {
    tControl.setMode('rotate')
    console.log("Exito al rotar")
}

function cambioMover() {
    tControl.setMode('translate')
    console.log("Exito al mover")
}

function cambioEscala() {
    tControl.setMode('scale')
    console.log("Exito al cambiar escala")
}





// Para cargar audio
const listener = new THREE.AudioListener();
camera.add(listener)

//This is a audio loader  to load all sound files
const audioLoader = new THREE.AudioLoader()

// Esto es un objeto de audio global no posicional
const backgroundSound = new THREE.Audio(listener);


// load sound file
audioLoader.load('../sounds/Snowland.mp3', function (buffer) {

    backgroundSound.setBuffer(buffer);
    backgroundSound.setLoop(true); // para que se reproduzca la muisca en loop
    backgroundSound.setVolume(0.2); // volume 0 - 1 
    backgroundSound.play(); // esto es para que empiece el sonido nada mas cargar la pagina
})