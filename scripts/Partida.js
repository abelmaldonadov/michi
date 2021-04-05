class Partida
{
    constructor(player_1,player_2) {
        this.player_1 = player_1
        this.player_2 = player_2
        this.turno = player_1
        this.oponente = player_2
    }

    limpiarTablero() {
        for (const pos of arrPos) {
            pos.classList.remove(O)
            pos.classList.remove(X)
        }
    }

    siguienteTurno() {
        if (this.turno == this.player_1) {
            this.turno = this.player_2
            this.oponente = this.player_1
        } else if (this.turno == this.player_2) {
            this.turno = this.player_1
            this.oponente = this.player_2
        }
    }

    evaluarGanador() {
        // EVALUAR SI GANÓ O
        if ((this.ocupado(arrPos[0]) && this.ocupado(arrPos[1]) && this.ocupado(arrPos[2])) ||
            (this.ocupado(arrPos[3]) && this.ocupado(arrPos[4]) && this.ocupado(arrPos[5])) ||
            (this.ocupado(arrPos[6]) && this.ocupado(arrPos[7]) && this.ocupado(arrPos[8])) ||

            (this.ocupado(arrPos[0]) && this.ocupado(arrPos[3]) && this.ocupado(arrPos[6])) ||
            (this.ocupado(arrPos[1]) && this.ocupado(arrPos[4]) && this.ocupado(arrPos[7])) ||
            (this.ocupado(arrPos[2]) && this.ocupado(arrPos[5]) && this.ocupado(arrPos[8])) ||
            
            (this.ocupado(arrPos[0]) && this.ocupado(arrPos[4]) && this.ocupado(arrPos[8])) ||
            (this.ocupado(arrPos[2]) && this.ocupado(arrPos[4]) && this.ocupado(arrPos[6]))) {
            return this.turno
        } else {
            return false
        }
    }

    ocupado(pos) {
        return pos.classList.contains(this.turno.getFicha())
    }

    getTurno() {
        return this.turno
    }

    getOponente() {
        return this.oponente
    }
}