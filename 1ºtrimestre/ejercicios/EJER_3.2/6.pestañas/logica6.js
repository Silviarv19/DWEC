const botones = document.querySelector("#botones");

botones.addEventListener("click", function(evento) {
    if (evento.target.tagName === "BUTTON") {
        const contenidos = document.querySelectorAll(".contenido");

        contenidos.forEach(contenido => {
            contenido.classList.add("oculto");
        });

        const id = evento.target.dataset.id;
        const contenidoMostrar = document.querySelector("#" + id);

        contenidoMostrar.classList.remove("oculto");
    }
});