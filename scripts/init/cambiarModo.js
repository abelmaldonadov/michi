let modo1 = document.getElementById("p1VSp2")
let modo2 = document.getElementById("p1VSboot")
modo1.addEventListener("change",cambiarModoJuego)
modo2.addEventListener("change",cambiarModoJuego)

function cambiarModoJuego() {
    if (modo1.checked) {
        document.getElementById("player2").disabled = false
    } else {
        document.getElementById("player2").disabled = true
    }
}