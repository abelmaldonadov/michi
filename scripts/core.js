const HUMAN = "Humano"
const BOOT = "Boot"

const O = "fichaO"
const X = "fichaX"
const T = 500

const GANADOR = "Has ganado"
const PERDEDOR = "Has perdido"
const EMPATE = "Tenemos un empate"

// ESTABLECER JUGADORES
const PLAYER_1 = new Player("Jugador 1",HUMAN,O)
const PLAYER_2 = new Player("Jugador 2",BOOT,X)

// CREAR PARTIDA
const PARTIDA = new Partida(PLAYER_1,PLAYER_2)

document.querySelector("#start").addEventListener("click",iniciarPartida)
const arrPos = document.querySelectorAll(".ficha")

function iniciarPartida() {
    PARTIDA.limpiarTablero()
    continuarPartida()
}

async function continuarPartida() {
    if (PARTIDA.getTurno().getTipo() == HUMAN) {
        const JUGADA = new Jugada(PARTIDA.getTurno(),PARTIDA.getOponente())
        JUGADA.activarFichas()
    } else {
        const JUGADA = new Jugada(PARTIDA.getTurno(),PARTIDA.getOponente())
        await JUGADA.jugarBoot(obtenerPosDisp())

        let ganador = PARTIDA.evaluarGanador()
        if (ganador) {
            ALERT.showAlert(PARTIDA.getTurno().getName())
            return
        }
        if (obtenerPosDisp().length == 0) {
            ALERT.showAlert(EMPATE)
            return
        }
        PARTIDA.siguienteTurno()
        continuarPartida()
    }
}

function obtenerPosDisp() {
    let arrPosDisp = []
    for (const pos of arrPos) {
        if (!pos.classList.contains(O) && !pos.classList.contains(X)) {
            arrPosDisp.push(pos)
        }
    }
    return arrPosDisp
}

function jugarHuman(e) {
    let posSel = e.target
    const JUGADA = new Jugada(PARTIDA.getTurno(),PARTIDA.getOponente())
    JUGADA.jugarHuman(posSel)
    
    let ganador = PARTIDA.evaluarGanador()
    if (ganador) {
        ALERT.showAlert(PARTIDA.getTurno().getName())
        return
    }
    if (obtenerPosDisp().length == 0) {
        ALERT.showAlert(EMPATE)
        return
    }
    PARTIDA.siguienteTurno()
    continuarPartida()
}