const formData = document.getElementById("formDataPartida")
formData.addEventListener("submit",saveData)

function saveData(e) {
    e.preventDefault()
    const form = new FormData(formData)
    
    localStorage.setItem("modo",form.get("modo"))
    localStorage.setItem("nombre",form.get("nombre"))
    localStorage.setItem("ficha",form.get("ficha"))
    
    location.href = "nuevaPartida.html"
}