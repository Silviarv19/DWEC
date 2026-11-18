const formulario = document.querySelector("#formulario-notas");
const vistaPrevia = document.querySelector("#vista-previa");
const tabla = document.querySelector("#tabla");
const thead = tabla.querySelector("thead");
const tbody = tabla.querySelector("tbody");
const resumen = document.querySelector("#resumen");

const alumnos = [];
let siguienteId = 1;

let columnaOrden = "";
let direccion = 1;

formulario.elements.nota.addEventListener("input", (evento) => {
    const valor = evento.target.value;

    if (valor === "") {
        vistaPrevia.textContent = "";
        return;
    }

    const nota = evento.target.valueAsNumber;

    vistaPrevia.textContent = nota >= 5 ? "Aprobado" : "Suspenso";
});

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const campos = formulario.elements;
    const alumno = campos.alumno.value.trim();
    const nota = campos.nota.valueAsNumber;

    alumnos.push({
        id: siguienteId++,
        alumno,
        nota
    });

    formulario.reset();
    vistaPrevia.textContent = "";
    campos.alumno.focus();

    pintar();
});

function pintar() {
    tbody.innerHTML = alumnos.map(alumno => `
        <tr data-id="${alumno.id}">
            <td>${alumno.alumno}</td>
            <td class="${alumno.nota >= 5 ? "aprobado" : "suspenso"}">
                ${alumno.nota.toFixed(1)}
            </td>
            <td>
                <button type="button" data-accion="borrar">Borrar</button>
            </td>
        </tr>
    `).join("");

    pintarResumen();
}

tbody.addEventListener("click", (evento) => {
    const boton = evento.target.closest('button[data-accion="borrar"]');

    if (!boton || !tbody.contains(boton)) return;

    const fila = boton.closest("tr");
    const id = Number(fila.dataset.id);

    const restantes = alumnos.filter(alumno => alumno.id !== id);

    alumnos.length = 0;
    alumnos.push(...restantes);

    pintar();
});

function pintarResumen() {
    if (alumnos.length === 0) {
        resumen.textContent = "Sin alumnos";
        return;
    }

    const suma = alumnos.reduce(
        (acumulado, alumno) => acumulado + alumno.nota,
        0
    );

    const media = suma / alumnos.length;

    const mejor = alumnos.reduce(
        (anterior, actual) =>
            actual.nota > anterior.nota ? actual : anterior
    );

    const aprobados = alumnos.filter(
        alumno => alumno.nota >= 5
    ).length;

    const apruebanTodos = alumnos.every(
        alumno => alumno.nota >= 5
    );

    resumen.textContent =
        `Nota media: ${media.toFixed(2)} | ` +
        `Mejor alumno: ${mejor.alumno} (${mejor.nota.toFixed(1)}) | ` +
        `Aprobados: ${aprobados} | ` +
        `¿Aprueban todos?: ${apruebanTodos ? "Sí" : "No"}`;
}

thead.addEventListener("click", (evento) => {
    const th = evento.target.closest("th[data-orden]");

    if (!th || !thead.contains(th)) return;

    const columna = th.dataset.orden;

    if (columna === columnaOrden) {
        direccion *= -1;
    } else {
        columnaOrden = columna;
        direccion = 1;
    }

    alumnos.sort((a, b) => {
        let resultado;

        if (columna === "alumno") {
            resultado = a.alumno.localeCompare(b.alumno);
        } else {
            resultado = a.nota - b.nota;
        }

        return resultado * direccion;
    });

    pintar();
});

pintar();
