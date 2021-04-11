const formData = document.getElementById("formDataPartida")
formData.addEventListener("submit",saveData)

function saveData(e) {
    e.preventDefault()
    const form = new FormData(formData)

    localStorage.clear()

    if (form.get("modo") == 1) {
        localStorage.setItem("modo",form.get("modo"))
        localStorage.setItem("name1",form.get("name1"))
        localStorage.setItem("name2",form.get("name2"))
    } else {
        localStorage.setItem("modo",form.get("modo"))
        localStorage.setItem("name1",form.get("name1"))
        localStorage.setItem("name2","Boot")
    }
    
    location.href = "nuevaPartida.html"
}