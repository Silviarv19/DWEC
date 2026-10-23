function generarInformeDeValidacion() {
    const nombre = document.querySelector("#nombre").value;
    const email = document.querySelector("#email").value;
    const informe = document.querySelector("#informe-errores");

    informe.innerHTML = "";

    if (nombre.length <= 3) {
        const error = document.createElement("p");
        error.textContent = "El nombre es incorrecto";
        informe.appendChild(error);
    }

    if (!email.includes("@")) {
        const error = document.createElement("p");
        error.textContent = "El email es incorrecto";
        informe.appendChild(error);
    }

    if (nombre.length > 3 && email.includes("@")) {
        const mensaje = document.createElement("p");
        mensaje.textContent = "Formulario válido";
        informe.appendChild(mensaje);
    }
}