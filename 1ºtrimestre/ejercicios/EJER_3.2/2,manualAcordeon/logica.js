function ocultarTodasLasRespuestas() {
    const respuestas = document.querySelectorAll("p");

    respuestas.forEach(respuesta => {
        respuesta.classList.add("oculto");
    });
}

function revelarRespuesta(pregunta) {
    ocultarTodasLasRespuestas();

    const respuesta = pregunta.nextElementSibling;
    respuesta.classList.remove("oculto");
}