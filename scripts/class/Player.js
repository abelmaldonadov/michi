class Player
{
    constructor(name,tipo,ficha) {
        this.name = name
        this.tipo = tipo
        this.ficha = ficha
        this.winText = `${name} a ganado`
    }
    
    getName() {
        return this.name
    }
    getTipo() {
        return this.tipo
    }
    getFicha() {
        return this.ficha
    }
    getWinText() {
        return this.winText
    }
}