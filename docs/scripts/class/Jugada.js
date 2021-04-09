class Jugada
{
    constructor(player, oponente) {
        this.player = player
        this.oponente = oponente
    }

    jugarBoot(arrPosDisp) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let primeraOpc = this.obtenerPrimeraOpc(arrPosDisp)
                let segundaOpc = this.obtenerSegundaOpc(arrPosDisp)
                let terceraOpc = this.obtenerTerceraOpc(arrPosDisp)

                if (primeraOpc) {
                    primeraOpc.classList.add(this.player.getFicha())
                    console.log("primera")
                    resolve()
                    return
                }
                if (segundaOpc) {
                    segundaOpc.classList.add(this.player.getFicha())
                    console.log("segunda")
                    resolve()
                    return
                }
                if (terceraOpc) {
                    terceraOpc.classList.add(this.player.getFicha())
                    console.log("tercera")
                    resolve()
                    return
                }
                
                this.jugarAleatorio(arrPosDisp)
                resolve()
            }, T)
        })
    }

    jugarHuman(posSel) {
        if (!posSel.classList.contains(O) &&  !posSel.classList.contains(X)) {
            posSel.classList.add(this.player.getFicha())
            this.desactivarFichas()
            return true
        } else {
            return false
        }
    }

    activarFichas() {
        for (const pos of arrPos) {
            pos.addEventListener("click",jugarHumano)
        }
    }
    
    desactivarFichas() {
        for (const pos of arrPos) {
            pos.removeEventListener("click",jugarHumano)
        }
    }

    // TIPOS DE JUGADAS BOOT

    obtenerPrimeraOpc(arrPosDisp) {
        // GANAR CON EL ULTIMO MOVIMIENTO
        let arrPosDeseables = []

        // HORIZONTALES
        if (this.ocupado(0) && this.ocupado(1)) { arrPosDeseables.push(arrPos[2]) }
        if (this.ocupado(1) && this.ocupado(2)) { arrPosDeseables.push(arrPos[0]) }
        if (this.ocupado(0) && this.ocupado(2)) { arrPosDeseables.push(arrPos[1]) }

        if (this.ocupado(3) && this.ocupado(4)) { arrPosDeseables.push(arrPos[5]) }
        if (this.ocupado(4) && this.ocupado(5)) { arrPosDeseables.push(arrPos[3]) }
        if (this.ocupado(3) && this.ocupado(5)) { arrPosDeseables.push(arrPos[4]) }

        if (this.ocupado(6) && this.ocupado(7)) { arrPosDeseables.push(arrPos[8]) }
        if (this.ocupado(7) && this.ocupado(8)) { arrPosDeseables.push(arrPos[6]) }
        if (this.ocupado(6) && this.ocupado(8)) { arrPosDeseables.push(arrPos[7]) }

        // VERTICALES
        if (this.ocupado(0) && this.ocupado(3)) { arrPosDeseables.push(arrPos[6]) }
        if (this.ocupado(3) && this.ocupado(6)) { arrPosDeseables.push(arrPos[0]) }
        if (this.ocupado(0) && this.ocupado(6)) { arrPosDeseables.push(arrPos[3]) }

        if (this.ocupado(1) && this.ocupado(4)) { arrPosDeseables.push(arrPos[7]) }
        if (this.ocupado(4) && this.ocupado(7)) { arrPosDeseables.push(arrPos[1]) }
        if (this.ocupado(1) && this.ocupado(7)) { arrPosDeseables.push(arrPos[4]) }

        if (this.ocupado(2) && this.ocupado(5)) { arrPosDeseables.push(arrPos[8]) }
        if (this.ocupado(5) && this.ocupado(8)) { arrPosDeseables.push(arrPos[2]) }
        if (this.ocupado(2) && this.ocupado(8)) { arrPosDeseables.push(arrPos[5]) }

        // DIAGONALES
        if (this.ocupado(0) && this.ocupado(4)) { arrPosDeseables.push(arrPos[8]) }
        if (this.ocupado(4) && this.ocupado(8)) { arrPosDeseables.push(arrPos[0]) }
        if (this.ocupado(0) && this.ocupado(8)) { arrPosDeseables.push(arrPos[4]) }

        if (this.ocupado(2) && this.ocupado(4)) { arrPosDeseables.push(arrPos[6]) }
        if (this.ocupado(4) && this.ocupado(6)) { arrPosDeseables.push(arrPos[2]) }
        if (this.ocupado(2) && this.ocupado(6)) { arrPosDeseables.push(arrPos[4]) }

        if (arrPosDeseables.length > 0) {
            for (const posDes of arrPosDeseables) {
                for (const posDis of arrPosDisp) {
                    if (posDes === posDis) {
                        return posDis
                    }
                }
            }
        }
        return false
    }

    obtenerSegundaOpc(arrPosDisp) {
        // EVITAR QUE EL OPONENTE GANE
        let arrPosDeseables = []

        // HORIZONTALES
        if (this.ocupadoOponente(0) && this.ocupadoOponente(1)) { arrPosDeseables.push(arrPos[2]) }
        if (this.ocupadoOponente(1) && this.ocupadoOponente(2)) { arrPosDeseables.push(arrPos[0]) }
        if (this.ocupadoOponente(0) && this.ocupadoOponente(2)) { arrPosDeseables.push(arrPos[1]) }

        if (this.ocupadoOponente(3) && this.ocupadoOponente(4)) { arrPosDeseables.push(arrPos[5]) }
        if (this.ocupadoOponente(4) && this.ocupadoOponente(5)) { arrPosDeseables.push(arrPos[3]) }
        if (this.ocupadoOponente(3) && this.ocupadoOponente(5)) { arrPosDeseables.push(arrPos[4]) }

        if (this.ocupadoOponente(6) && this.ocupadoOponente(7)) { arrPosDeseables.push(arrPos[8]) }
        if (this.ocupadoOponente(7) && this.ocupadoOponente(8)) { arrPosDeseables.push(arrPos[6]) }
        if (this.ocupadoOponente(6) && this.ocupadoOponente(8)) { arrPosDeseables.push(arrPos[7]) }

        // VERTICALES
        if (this.ocupadoOponente(0) && this.ocupadoOponente(3)) { arrPosDeseables.push(arrPos[6]) }
        if (this.ocupadoOponente(3) && this.ocupadoOponente(6)) { arrPosDeseables.push(arrPos[0]) }
        if (this.ocupadoOponente(0) && this.ocupadoOponente(6)) { arrPosDeseables.push(arrPos[3]) }

        if (this.ocupadoOponente(1) && this.ocupadoOponente(4)) { arrPosDeseables.push(arrPos[7]) }
        if (this.ocupadoOponente(4) && this.ocupadoOponente(7)) { arrPosDeseables.push(arrPos[1]) }
        if (this.ocupadoOponente(1) && this.ocupadoOponente(7)) { arrPosDeseables.push(arrPos[4]) }

        if (this.ocupadoOponente(2) && this.ocupadoOponente(5)) { arrPosDeseables.push(arrPos[8]) }
        if (this.ocupadoOponente(5) && this.ocupadoOponente(8)) { arrPosDeseables.push(arrPos[2]) }
        if (this.ocupadoOponente(2) && this.ocupadoOponente(8)) { arrPosDeseables.push(arrPos[5]) }

        // DIAGONALES
        if (this.ocupadoOponente(0) && this.ocupadoOponente(4)) { arrPosDeseables.push(arrPos[8]) }
        if (this.ocupadoOponente(4) && this.ocupadoOponente(8)) { arrPosDeseables.push(arrPos[0]) }
        if (this.ocupadoOponente(0) && this.ocupadoOponente(8)) { arrPosDeseables.push(arrPos[4]) }

        if (this.ocupadoOponente(2) && this.ocupadoOponente(4)) { arrPosDeseables.push(arrPos[6]) }
        if (this.ocupadoOponente(4) && this.ocupadoOponente(6)) { arrPosDeseables.push(arrPos[2]) }
        if (this.ocupadoOponente(2) && this.ocupadoOponente(6)) { arrPosDeseables.push(arrPos[4]) }

        if (arrPosDeseables.length > 0) {
            for (const posDes of arrPosDeseables) {
                for (const posDis of arrPosDisp) {
                    if (posDes === posDis) {
                        return posDis
                    }
                }
            }
        }
        return false
    }

    obtenerTerceraOpc(arrPosDisp) {
        // JUGAR EN POSICIONES INICIALES ESTRATÉGICAS
        let arrPosDeseables = [arrPos[4],arrPos[0],arrPos[2],arrPos[6],arrPos[8]]
        for (const posDes of arrPosDeseables) {
            for (const posDis of arrPosDisp) {
                if (posDes === posDis) {
                    return posDis
                }
            }
        }
        return false
    }

    jugarAleatorio(arrPosDisp) {
        let posRand = Math.random() * 100
        posRand = posRand.toFixed(0) % arrPosDisp.length
        arrPosDisp[posRand].classList.add(this.player.getFicha())
    }

    ocupado(i) {
        return arrPos[i].classList.contains(this.player.getFicha())
    }

    ocupadoOponente(i) {
        return arrPos[i].classList.contains(this.oponente.getFicha())
    }
}