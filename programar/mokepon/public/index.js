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

const ipLocal = 'http://192.168.1.9'

let jugadorId = null
let enemigoId = null
let mokepones = []
let mokeponesEnemigos = []
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
let anchoDelMapa = window.innerWidth - 20
let alturaDelMapa

const anchoMaximoDelMapa = 350

if(anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa
}

alturaDelMapa = anchoDelMapa * (600 / 800);

mapa.width = anchoDelMapa
mapa.height = alturaDelMapa

let teclasPresionadas = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
}

class Mokepon {
    constructor(nombre, foto, vida, fotoMapa, id = null) {
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        // dibujo en canvas
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
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

const HIPODOGE_ATAQUES = [
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🌱', id: 'boton-tierra' },
]
const CAPIPEPO_ATAQUES = [
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
]
const RATIGUEYA_ATAQUES = [
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🌱', id: 'boton-tierra' },
]

hipodoge.ataques.push(...HIPODOGE_ATAQUES)

capipepo.ataques.push(...CAPIPEPO_ATAQUES)

ratigueya.ataques.push(...RATIGUEYA_ATAQUES)

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

    unirseAlJuego()
}

function unirseAlJuego() {
    fetch(`${ipLocal}:8080/unirse`)
        .then(function(res) {
            if(res.ok){
                res.text()
                    .then(function(respuesta) {
                        jugadorId = respuesta
                    })
            }
        })
}

function seleccionarMascotaJugador() {
    
    
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
        return
    }

    sectionSeleccionarMascota.style.display = 'none'
    
    sectionVerMapa.style.display = 'flex'
    
    seleccionarMokepon(mascotaJugador)
    
    inicarMapa()

    extraerAtaques(mascotaJugador)
}

function seleccionarMokepon(mascotaJugador) {
    fetch(`${ipLocal}:8080/mokepon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })
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
                boton.style.background = '#112f58'
                boton.disabled = true
            } else if (e.target.textContent === '💧') {
                ataqueJugador.push('AGUA')
                boton.style.background = '#112f58'
                boton.disabled = true
            } else {
                ataqueJugador.push('TIERRA')
                boton.style.background = '#112f58'
                boton.disabled = true
            }
            if(ataqueJugador.length === 5) {
                enviarAtaques()
            }
            
        })
    })
}

function enviarAtaques() {
    fetch(`${ipLocal}:8080/mokepon/${jugadorId}/ataques`, {
        method:'post',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })

    intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques() {
    fetch(`${ipLocal}:8080/mokepon/${enemigoId}/ataques`)
        .then(function (res) {
            if(res.ok) {
                res.json()
                    .then(function({ ataques }){
                        if(ataques.length === 5) {
                            ataqueEnemigo = ataques
                            combate()
                        }
                    })
            }
        })
}

function seleccionarMascotaEnemigo(enemigo) {
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
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
    clearInterval(intervalo)
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

    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)
    mokeponesEnemigos.forEach((mokepon) => {
        mokepon.pintarMokepon()
        revisarColision(mokepon)
    })
}

function enviarPosicion(x, y) {
    fetch(`${ipLocal}:8080/mokepon/${jugadorId}/posicion`, {
        method: 'post',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            x,
            y,
        })
    })
    .then(function (res) {
        if(res.ok) {
            res.json()
                .then(function ({ enemigos } ) {
                    mokeponesEnemigos = enemigos.map((enemigo) => {
                        let mokeponEnemigo = null
                        const mokeponNombre = enemigo.mokepon.nombre || ""

                        if(mokeponNombre === "Hipodoge"){
                            mokeponEnemigo = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodoge.png', enemigo.id)
                        } else if(mokeponNombre == "Capipepo") {
                            mokeponEnemigo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/capipepo.png', enemigo.id)
                        } else if(mokeponNombre == "Ratigueya") {
                            mokeponEnemigo = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/ratigueya.png', enemigo.id)
                        }
                        
                        mokeponEnemigo.x = enemigo.x
                        mokeponEnemigo.y = enemigo.y
                        return mokeponEnemigo
                    })
                })
        }
    })
}

function inicarMapa() {
    mascotaJugadorObjeto = obtenerObjectoMascota(mascotaJugador)
    intervalo = setInterval(pintarCanvas, 50)
    
    window.addEventListener('keydown', sePresionoUnaTecla)
    window.addEventListener('keyup', detenerMovimiento)
    mapa.addEventListener('click', clickTarget)
}

function sePresionoUnaTecla(evento) {
    teclasPresionadas[evento.key] = true
    actualizarVelocidad()
}

function actualizarVelocidad() {
    mascotaJugadorObjeto.velocidadX = (teclasPresionadas.ArrowRight - teclasPresionadas.ArrowLeft) * 5;
    mascotaJugadorObjeto.velocidadY = (teclasPresionadas.ArrowDown - teclasPresionadas.ArrowUp) * 5;
}

function detenerMovimiento(evento) {
    if(evento != undefined) {
        teclasPresionadas[evento.key] = false
        actualizarVelocidad()
    }
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

function clickTarget(evento) {
    console.log(evento.offsetX, evento.offsetY)
}

function revisarColision(enemigo) {

    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x
    
    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = mascotaJugadorObjeto.x
    
    if(
        abajoMascota < arribaEnemigo ||
        arribaMascota >  abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
        ) {
        return
    }
    // Al principio estas variables entran como 'undefined'
    // Así que la primera vez abría de inmediato el combate
    if(enemigo.x != undefined && enemigo.y != undefined) {
        clearInterval(intervalo)
        detenerMovimiento()
        console.log("Movimiento detectado")
    
        enemigoId = enemigo.id
        sectionSeleccionarAtaque.style.display = 'flex'
        sectionVerMapa.style.display = 'none'
        seleccionarMascotaEnemigo(enemigo)
    }
}

window.addEventListener('load', iniciarJuego)
