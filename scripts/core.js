document.querySelector("#start").addEventListener("click",start)
const arrPos = document.querySelectorAll(".ficha")

const O = "fichaO"
const X = "fichaX"
const t = 500

const GANADOR = "Has ganado"
const PERDEDOR = "Has perdido"
const EMPATE = "tenemos un empate"

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
            showAlert(GANADOR)
        } else {
            if (obtenerPosDisp().length > 0) {
                // SEGUIR JUGANDO
                jugarX()
            } else {
                showAlert(EMPATE)
            }
        }
    }
}

async function jugarX() {
    const jugarX = new Promise ((resolve) => {
        setTimeout(() => {
            // JUGADA DE LA COMPUTADORA
            arrPosDisp = obtenerPosDisp()
            let posRand = Math.random() * 100
            posRand = posRand.toFixed(0) % arrPosDisp.length
            arrPosDisp[posRand].classList.add(X)

            if (evaluarGanador(X)) {
                // HA GANADO X
                showAlert(PERDEDOR)
            } else {
                if (obtenerPosDisp().length > 0) {
                    // SEGUIR JUGANDO
                    activarFichas()
                } else {
                    showAlert(EMPATE)
                }
            }
            resolve
        }, t);
    })
    await jugarX
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

function showAlert(tipo) {
    let texto
    switch (tipo) {
        case GANADOR:
            texto = GANADOR
            break
            
        case PERDEDOR:
            texto = PERDEDOR
            break
                
        case EMPATE:
            texto = EMPATE
            break
    }
    document.querySelector(".alert_body").innerHTML = `<div><p>${texto}</p></div>`
    document.querySelector(".alert").classList.remove("hidden")
    document.querySelector(".alert_footer #ok").addEventListener("click",hideAlert)
}

function hideAlert() {
    document.querySelector(".alert").classList.add("hidden")
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