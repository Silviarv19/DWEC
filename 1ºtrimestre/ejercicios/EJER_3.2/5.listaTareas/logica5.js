function anadirTarea() {
    const input = document.querySelector("#tarea");
    const lista = document.querySelector("#lista-tareas");

    if (input.value != "") {
        const tarea = document.createElement("li");
        tarea.textContent = input.value;

        const boton = document.createElement("button");
        boton.textContent = "Eliminar";

        boton.onclick = function() {
            boton.parentNode.remove();
        };

        tarea.appendChild(boton);
        lista.appendChild(tarea);

        input.value = "";
    }
}