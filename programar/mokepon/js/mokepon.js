const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonMascotaJugador = document.getElementById('boton-mascota')
sectionReiniciar.style.display = 'none'
const botonReiniciar = document.getElementById('boton-reiniciar')

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const spanMascotaJugador = document.getElementById('mascota-jugador')

const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')
const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const contenedorAtaques = document.getElementById('contenedorAtaques') 

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

let mokepones = []
let ataqueJugador = []
let ataqueEnemigo = []
let ataquesDefEnemigo = []
let opcionDeMokepones
let inputHipodoge
let inputCapipepo
let inputRatigueya
let mascotaJugador
let mascotaJugadorObjeto
let ataquesMokepon
let ataquesMokeponEnemigo
let botonFuego
let botonAgua
let botonTierra
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let emojiJugador
let emojiEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = './assets/mokemap.webp'

class Mokepon {
    constructor(nombre, foto, vida, fotoMapa, x = 10, y = 10) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        // dibujo en canvas
        this.x = x
        this.y = y
        this.ancho = 40
        this.alto = 40
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }
    pintarMokepon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto,
        )
    }
}
// Characters I want: Ahsoka, Vader, Din Djarin, Bo-Katan, Rex, Fives
let hipodoge = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodoge.png')
let capipepo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/capipepo.png')
let ratigueya = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/ratigueya.png')
let hipodogeEnemigo = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodoge.png', 80, 120)
let capipepoEnemigo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/capipepo.png', 150, 95)
let ratigueyaEnemigo = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/ratigueya.png', 200, 190)

hipodoge.ataques.push(
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🌱', id: 'boton-tierra' },
)

capipepo.ataques.push(
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    
)

ratigueya.ataques.push(
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🌱', id: 'boton-tierra' },
)

mokepones.push(hipodoge,capipepo,ratigueya)

function iniciarJuego() {
    
    sectionSeleccionarAtaque.style.display = 'none'
    sectionVerMapa.style.display = 'none'

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>
        `
    contenedorTarjetas.innerHTML += opcionDeMokepones

     inputHipodoge = document.getElementById('Hipodoge')
     inputCapipepo = document.getElementById('Capipepo')
     inputRatigueya = document.getElementById('Ratigueya')

    })
    
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)


    
    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function seleccionarMascotaJugador() {
    
    sectionSeleccionarMascota.style.display = 'none'
    
    
    // sectionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'flex'
    
    
    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJugador = inputHipodoge.id
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    } else {
        alert('Selecciona una mascota')
    }

    inicarMapa()

    extraerAtaques(mascotaJugador)
    seleccionarMascotaEnemigo()
}

function extraerAtaques(mascotaJugador) {
    let ataques
    for(let i = 0; i < mokepones.length; i++) {
        if(mascotaJugador === mokepones[i].nombre){
            ataques = mokepones[i].ataques
        }
    }
    mostrarAtaques(ataques)
}



function mostrarAtaques(ataques) {

    ataques.forEach(element => {
        ataquesMokepon = `<button id=${element.id} class="boton-de-ataque BAtaque">${element.nombre}</button>`

        contenedorAtaques.innerHTML += ataquesMokepon
    })

    botonFuego = document.getElementById('boton-fuego')
    botonAgua = document.getElementById('boton-agua')
    botonTierra = document.getElementById('boton-tierra')
    botones = document.querySelectorAll('.BAtaque')
}

function secuenciaAtaque() {
    asignarAtaquesEnemigo()
    // 💧 🔥 🌱
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if(e.target.textContent === '🔥') {
                ataqueJugador.push('FUEGO')
                console.log('Jugador: ', ataqueJugador)
                boton.style.background = '#112f58'
            } else if (e.target.textContent === '💧') {
                ataqueJugador.push('AGUA')
                console.log('Jugador: ', ataqueJugador)
                boton.style.background = '#112f58'
            } else {
                ataqueJugador.push('TIERRA')
                console.log('Jugador: ', ataqueJugador)
                boton.style.background = '#112f58'
            }
            ataqueAleatorioEnemigo()
            
            boton.disabled = true
        })
    })
}
function seleccionarMascotaEnemigo() {
    let mascotaAleatoria = aleatorio(0, mokepones.length - 1)

    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatoria].nombre
    ataquesMokeponEnemigo = mokepones[mascotaAleatoria].ataques
    secuenciaAtaque()
}
function asignarAtaquesEnemigo() {
    ataquesMokeponEnemigo.forEach(ataque => {
        if(ataque.nombre === '💧') {
            ataquesDefEnemigo.push('AGUA')
        } else if(ataque.nombre === '🔥') {
            ataquesDefEnemigo.push('FUEGO')
        } else if(ataque.nombre === '🌱') {
            ataquesDefEnemigo.push('TIERRA')
        }
    })
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(0, ataquesDefEnemigo.length - 1)

    ataqueEnemigo.push((ataquesDefEnemigo.splice(ataqueAleatorio, 1))[0])
    
    iniciarPelea()
}

function iniciarPelea() {
    if(ataqueJugador.length === 5) {
        combate()
    }
}

function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {
    // ❗✅🟡
    for(let i = 0; i < ataqueJugador.length; i++) {
        indexAmbosOponentes(i, i)
        if(ataqueJugador[i] === ataqueEnemigo[i]) {
            emojiJugador = '🟡'
            emojiEnemigo = '🟡'
            crearMensaje("EMPATE", emojiEnemigo, emojiJugador)
        } else if (ataqueJugador[i] == 'FUEGO' && ataqueEnemigo[i] == 'TIERRA') {
            emojiJugador = '✅'
            emojiEnemigo = '❗'
            crearMensaje("GANASTE", emojiEnemigo, emojiJugador)
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        } else if (ataqueJugador[i] == 'TIERRA' && ataqueEnemigo[i] == 'AGUA') {
            emojiJugador = '✅'
            emojiEnemigo = '❗'
            crearMensaje("GANASTE", emojiEnemigo, emojiJugador)
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
            spanVidasEnemigo.innerHTML = victoriasEnemigo
            
        } else if (ataqueJugador[i] == 'AGUA' && ataqueEnemigo[i] == 'FUEGO') {
            emojiJugador = '✅'
            emojiEnemigo = '❗'
            crearMensaje("GANASTE", emojiEnemigo, emojiJugador)
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
            spanVidasEnemigo.innerHTML = victoriasEnemigo
             
        } else {
            emojiJugador = '❗'
            emojiEnemigo = '✅'
            crearMensaje("PERDISTE", emojiEnemigo, emojiJugador)
            victoriasEnemigo++
            spanVidasJugador.innerHTML = victoriasJugador
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
    }

    revisarVictorias()
}

function revisarVictorias() {
    if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal("FELICITACIONES! Ganaste :)")
    } else if(victoriasJugador === victoriasEnemigo){
        crearMensajeFinal("¡Empate! ¿Quieres intentarlo otra vez?")
    } else {
        crearMensajeFinal('Lo siento, perdiste :(')
    }
}

function crearMensaje(resultado, emojiE, emojiJ) {
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = emojiJ + ' ' + indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo + ' ' + emojiE

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal) {
    
    
    sectionMensajes.innerHTML = resultadoFinal

    
    botonFuego.disabled = true
    
    botonAgua.disabled = true
    
    botonTierra.disabled = true

    
    sectionReiniciar.style.display = 'block'
}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function pintarCanvas() {
    mascotaJugadorObjeto.x += mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y += mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height,
    )
    mascotaJugadorObjeto.pintarMokepon()
    hipodogeEnemigo.pintarMokepon()
    capipepoEnemigo.pintarMokepon()
    ratigueyaEnemigo.pintarMokepon()
}

function inicarMapa() {
    mapa.width = 600
    mapa.height = 500
    mascotaJugadorObjeto = obtenerObjectoMascota(mascotaJugador)
    intervalo = setInterval(pintarCanvas, 50)
    
    window.addEventListener('keydown', sePresionoUnaTecla)
    window.addEventListener('keyup', detenerMovimiento)
}

function sePresionoUnaTecla(evento) {
    switch (evento.key) {
        case 'ArrowUp':
            moverPersonajeUP()
            break
        case 'ArrowDown':
            moverPersonajeDOWN()
            break
        case 'ArrowLeft':
            moverPersonajeLEFT()
            break
        case 'ArrowRight':
            moverPersonajeRIGHT()
            break
        default:
            break
    }


}

function detenerMovimiento() {
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function moverPersonajeUP() {
    mascotaJugadorObjeto.velocidadY = -5
    pintarCanvas()
}
function moverPersonajeDOWN() {
    mascotaJugadorObjeto.velocidadY = 5
    pintarCanvas()
}
function moverPersonajeLEFT() {
    mascotaJugadorObjeto.velocidadX = -5
    pintarCanvas()
}
function moverPersonajeRIGHT() {
    mascotaJugadorObjeto.velocidadX = 5
    pintarCanvas()
}

function obtenerObjectoMascota(mascotaJugador) {
    for(let i = 0; i < mokepones.length; i++) {
        if(mascotaJugador === mokepones[i].nombre){
            return mokepones[i]
        }
    }
}

window.addEventListener('load', iniciarJuego)
