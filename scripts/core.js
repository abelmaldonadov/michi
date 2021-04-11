const modo = localStorage.getItem("modo")
const name1 = localStorage.getItem("name1")
const name2 = localStorage.getItem("name2")

const HUMAN = "Humano"
const BOOT = "Boot"

const O = "fichaO"
const X = "fichaX"
const T = 500

const EMPATE = "Tenemos un empate"

// ESTABLECER JUGADORES
const PLAYER_1 = new Player(
    name1,
    HUMAN,
    O
)
const PLAYER_2 = new Player(
    name2,
    (modo == 1)?HUMAN:BOOT,
    X
)

// CREAR PARTIDA
const PARTIDA = new Partida(PLAYER_1,PLAYER_2)

document.querySelector("#start").addEventListener("click",iniciarPartida)
const arrPos = document.querySelectorAll(".ficha")

function iniciarPartida() {
    validarLocalStorange()
    PARTIDA.limpiarTablero()
    PARTIDA.siguienteTurno()
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
            ALERT.showAlert(PARTIDA.getTurno().getWinText())
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

function jugarHumano(e) {
    let posSel = e.target
    const JUGADA = new Jugada(PARTIDA.getTurno(),PARTIDA.getOponente())
    if (JUGADA.jugarHuman(posSel)) {
        let ganador = PARTIDA.evaluarGanador()
        if (ganador) {
            ALERT.showAlert(PARTIDA.getTurno().getWinText())
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

function validarLocalStorange() {
    if (modo == null) {
        location.href = "index.html"
    }
}