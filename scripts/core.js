document.querySelector("#start").addEventListener("click",start)
const arrPos = document.querySelectorAll(".ficha")

const O = "fichaO"
const X = "fichaX"
const t = 500

const GANADOR = "Has ganado"
const PERDEDOR = "Has perdido"
const EMPATE = "Tenemos un empate"

let turno = O;
let dificultad = 3  //1,2,3

function start() {
    for (const pos of arrPos) {
        pos.classList.remove(O)
        pos.classList.remove(X)
    }
    activarFichas()
}

function jugarO(e) {
    let pos = e.target
    if (!pos.classList.contains(O) && !pos.classList.contains(X)) {
        pos.classList.add(O)
        desactivarFichas()

        if (evaluarGanador(O)) {
            // HA GANADO O
            ALERT.showAlert(GANADOR)
        } else {
            if (obtenerPosDisp().length > 0) {
                // SEGUIR JUGANDO
                jugarX()
            } else {
                ALERT.showAlert(EMPATE)
            }
        }
    }
}

async function jugarX() {
    const jugarX = new Promise ((resolve) => {
        setTimeout(() => {
            jugada:switch (dificultad) {
                case 1:
                    jugarFacil(X)
                    break jugada
                    
                case 2:
                    // JUGADA DEL BOT DIFICULTAD 2 (MEDIO) [JUGADA A LA DEFENSIVA]
                    arrPosCriticas = obtenerPosCritica(O)
                    if (arrPosCriticas.length > 0) {
                        for (const pos of arrPosCriticas) {
                            if (!pos.classList.contains(X)) {
                                pos.classList.add(X)
                                break jugada
                            }
                        }
                    }
                    jugarFacil(X)
                    break jugada

                case 3:
                    // JUGADA DEL BOT DIFICULTAD 3 (DIFICIL) [JUGADA CON INTENCION DE GANAR EN ULTIMA FICHA]
                    arrPosDeseable = obtenerPosCritica(X)
                    if (arrPosDeseable.length > 0) {
                        for (const pos of arrPosDeseable) {
                            if (!pos.classList.contains(O)) {
                                pos.classList.add(X)
                                break jugada
                            }
                        }
                    }
                    // JUGADA DEL BOT DIFICULTAD 2 (MEDIO) [JUGADA A LA DEFENSIVA]
                    arrPosCriticas = obtenerPosCritica(O)
                    if (arrPosCriticas.length > 0) {
                        for (const pos of arrPosCriticas) {
                            if (!pos.classList.contains(X)) {
                                pos.classList.add(X)
                                break jugada
                            }
                        }
                    }
                    // JUGADA DEL BOT DIFICULTAD 3 (DIFICIL) [JUGADA CON INTENCION DE GANAR EN SEGUNDA FICHA]
                    arrSegundaPos = obtenerSegundaPos(X)
                    if (arrSegundaPos.length > 0) {
                        for (const pos of arrPosDeseable) {
                            if (!pos.classList.contains(O)) {
                                pos.classList.add(X)
                                break jugada
                            }
                        }
                    }
                    jugarFacil(X)
                    break jugada
            }

            if (evaluarGanador(X)) {
                // HA GANADO X
                ALERT.showAlert(PERDEDOR)
            } else {
                if (obtenerPosDisp().length > 0) {
                    // SEGUIR JUGANDO
                    activarFichas()
                } else {
                    ALERT.showAlert(EMPATE)
                }
            }
            resolve
        }, t);
    })
    await jugarX
}

function jugarFacil(ficha) {
    // JUGADA DEL BOT DIFICULTAD 1 (FACIL) [JUGADA ALEATORIA]
    arrPosDisp = obtenerPosDisp()
    let posRand = Math.random() * 100
    posRand = posRand.toFixed(0) % arrPosDisp.length
    arrPosDisp[posRand].classList.add(ficha)
}

function jugarMedio() {
    // 
}

function Dificil() {
    // 
}

function evaluarGanador(ficha) {
    // CAPTAR POSICIONES
    const pos11 = document.querySelector("#pos11").classList.contains(ficha)
    const pos12 = document.querySelector("#pos12").classList.contains(ficha)
    const pos13 = document.querySelector("#pos13").classList.contains(ficha)
    const pos21 = document.querySelector("#pos21").classList.contains(ficha)
    const pos22 = document.querySelector("#pos22").classList.contains(ficha)
    const pos23 = document.querySelector("#pos23").classList.contains(ficha)
    const pos31 = document.querySelector("#pos31").classList.contains(ficha)
    const pos32 = document.querySelector("#pos32").classList.contains(ficha)
    const pos33 = document.querySelector("#pos33").classList.contains(ficha)

    // EVALUAR SI GANÓ O
    if ((pos11 && pos12 && pos13) ||
        (pos11 && pos21 && pos31) ||
        (pos11 && pos22 && pos33) ||
        (pos12 && pos22 && pos32) ||
        (pos13 && pos22 && pos31) ||
        (pos13 && pos23 && pos33) ||
        (pos21 && pos22 && pos23) ||
        (pos31 && pos32 && pos33)) {
        return true
    } else {
        return false
    }
}

function activarFichas() {
    for (const pos of arrPos) {
        pos.addEventListener("click",jugarO)
    }
}

function desactivarFichas() {
    for (const pos of arrPos) {
        pos.removeEventListener("click",jugarO)
    }
}

function obtenerPosDisp() {
    arrPosDisp = []
    for (const pos of arrPos) {
        if (!pos.classList.contains(O) && !pos.classList.contains(X)) {
            arrPosDisp.push(pos)
        }
    }
    return arrPosDisp
}

function obtenerPosCritica(ficha) {
    // CAPTAR POSICIONES
    const pos11 = document.querySelector("#pos11")
    const pos12 = document.querySelector("#pos12")
    const pos13 = document.querySelector("#pos13")
    const pos21 = document.querySelector("#pos21")
    const pos22 = document.querySelector("#pos22")
    const pos23 = document.querySelector("#pos23")
    const pos31 = document.querySelector("#pos31")
    const pos32 = document.querySelector("#pos32")
    const pos33 = document.querySelector("#pos33")

    arrPosCriticas = []

    // HORIZONTALES
    if (pos11.classList.contains(ficha) && pos12.classList.contains(ficha)) { arrPosCriticas.push(pos13) }
    if (pos12.classList.contains(ficha) && pos13.classList.contains(ficha)) { arrPosCriticas.push(pos11) }
    if (pos11.classList.contains(ficha) && pos13.classList.contains(ficha)) { arrPosCriticas.push(pos12) }

    if (pos21.classList.contains(ficha) && pos22.classList.contains(ficha)) { arrPosCriticas.push(pos23) }
    if (pos22.classList.contains(ficha) && pos23.classList.contains(ficha)) { arrPosCriticas.push(pos21) }
    if (pos21.classList.contains(ficha) && pos23.classList.contains(ficha)) { arrPosCriticas.push(pos22) }

    if (pos31.classList.contains(ficha) && pos32.classList.contains(ficha)) { arrPosCriticas.push(pos33) }
    if (pos32.classList.contains(ficha) && pos33.classList.contains(ficha)) { arrPosCriticas.push(pos31) }
    if (pos31.classList.contains(ficha) && pos33.classList.contains(ficha)) { arrPosCriticas.push(pos32) }

    // VERTICALES
    if (pos11.classList.contains(ficha) && pos21.classList.contains(ficha)) { arrPosCriticas.push(pos31) }
    if (pos21.classList.contains(ficha) && pos31.classList.contains(ficha)) { arrPosCriticas.push(pos11) }
    if (pos11.classList.contains(ficha) && pos31.classList.contains(ficha)) { arrPosCriticas.push(pos21) }

    if (pos12.classList.contains(ficha) && pos22.classList.contains(ficha)) { arrPosCriticas.push(pos32) }
    if (pos22.classList.contains(ficha) && pos32.classList.contains(ficha)) { arrPosCriticas.push(pos12) }
    if (pos12.classList.contains(ficha) && pos32.classList.contains(ficha)) { arrPosCriticas.push(pos22) }

    if (pos13.classList.contains(ficha) && pos23.classList.contains(ficha)) { arrPosCriticas.push(pos33) }
    if (pos23.classList.contains(ficha) && pos33.classList.contains(ficha)) { arrPosCriticas.push(pos13) }
    if (pos13.classList.contains(ficha) && pos33.classList.contains(ficha)) { arrPosCriticas.push(pos23) }

    // DIAGONALES
    if (pos11.classList.contains(ficha) && pos22.classList.contains(ficha)) { arrPosCriticas.push(pos33) }
    if (pos22.classList.contains(ficha) && pos33.classList.contains(ficha)) { arrPosCriticas.push(pos11) }
    if (pos11.classList.contains(ficha) && pos33.classList.contains(ficha)) { arrPosCriticas.push(pos22) }

    if (pos13.classList.contains(ficha) && pos22.classList.contains(ficha)) { arrPosCriticas.push(pos31) }
    if (pos22.classList.contains(ficha) && pos31.classList.contains(ficha)) { arrPosCriticas.push(pos13) }
    if (pos13.classList.contains(ficha) && pos31.classList.contains(ficha)) { arrPosCriticas.push(pos22) }

    // RESPONDER
    return arrPosCriticas
}

function obtenerSegundaPos(ficha) {
    // CAPTAR POSICIONES
    const pos11 = document.querySelector("#pos11")
    const pos12 = document.querySelector("#pos12")
    const pos13 = document.querySelector("#pos13")
    const pos21 = document.querySelector("#pos21")
    const pos22 = document.querySelector("#pos22")
    const pos23 = document.querySelector("#pos23")
    const pos31 = document.querySelector("#pos31")
    const pos32 = document.querySelector("#pos32")
    const pos33 = document.querySelector("#pos33")

    arrSegundaPos = []

    if (pos11.classList.contains(ficha)) { arrSegundaPos.push(pos33,pos22,pos13,pos31,pos12,pos21) }
    if (pos12.classList.contains(ficha)) { arrSegundaPos.push(pos22,pos32,pos11,pos13) }
    if (pos13.classList.contains(ficha)) { arrSegundaPos.push(pos31,pos22,pos11,pos33,pos12,pos23) }
    
    if (pos21.classList.contains(ficha)) { arrSegundaPos.push(pos22,pos23,pos11,pos31) }
    if (pos22.classList.contains(ficha)) { arrSegundaPos.push(pos11,pos13,pos31,pos33,pos12,pos23,pos32,pos21) }
    if (pos23.classList.contains(ficha)) { arrSegundaPos.push(pos22,pos21,pos31,pos13) }
    
    if (pos31.classList.contains(ficha)) { arrSegundaPos.push(pos13,pos22,pos11,pos33,pos21,pos32) }
    if (pos32.classList.contains(ficha)) { arrSegundaPos.push(pos22,pos12,pos31,pos33) }
    if (pos33.classList.contains(ficha)) { arrSegundaPos.push(pos11,pos22,pos13,pos31,pos23,pos32) }

    return arrSegundaPos
}