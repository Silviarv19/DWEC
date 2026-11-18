const formulario = document.querySelector("#formulario-compra");
const lista = document.querySelector("#lista");
const total = document.querySelector("#total");
const buscador = document.querySelector("#buscador");

const productos = [];
let siguienteId = 1;

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const campos = formulario.elements;
    const nombre = campos.producto.value.trim();
    const precio = campos.precio.valueAsNumber;
    const unidades = campos.unidades.valueAsNumber;

    const existente = productos.find(
        producto => producto.nombre.toLowerCase() === nombre.toLowerCase()
    );

    if (existente) {
        existente.unidades += unidades;
    } else {
        productos.push({
            id: siguienteId++,
            nombre,
            precio,
            unidades
        });
    }

    formulario.reset();
    campos.producto.focus();

    pintar();
});

function pintar() {
    const busqueda = buscador.value.trim().toLowerCase();

    const filtrados = productos.filter(
        producto => producto.nombre.toLowerCase().includes(busqueda)
    );

    lista.innerHTML = filtrados.map(producto => `
        <li data-id="${producto.id}">
            ${producto.nombre} -
            ${producto.precio.toFixed(2)} € x ${producto.unidades}
            = ${(producto.precio * producto.unidades).toFixed(2)} €
            <button type="button" data-accion="restar">-</button>
            <button type="button" data-accion="sumar">+</button>
            <button type="button" data-accion="borrar">Borrar</button>
        </li>
    `).join("");

    const importeTotal = productos.reduce(
        (acumulado, producto) =>
            acumulado + producto.precio * producto.unidades,
        0
    );

    total.textContent = `Total: ${importeTotal.toFixed(2)} €`;
}

lista.addEventListener("click", (evento) => {
    const boton = evento.target.closest("button[data-accion]");

    if (!boton || !lista.contains(boton)) return;

    const elemento = boton.closest("li");
    const id = Number(elemento.dataset.id);

    const producto = productos.find(
        producto => producto.id === id
    );

    if (!producto) return;

    const acciones = {
        sumar: () => {
            producto.unidades++;
        },
        restar: () => {
            if (producto.unidades > 1) {
                producto.unidades--;
            }
        },
        borrar: () => {
            const indice = productos.findIndex(
                producto => producto.id === id
            );

            if (indice !== -1) {
                productos.splice(indice, 1);
            }
        }
    };

    const accion = boton.dataset.accion;
    acciones[accion]?.();

    pintar();
});

buscador.addEventListener("input", pintar);

formulario.addEventListener("focusin", (evento) => {
    evento.target.classList.add("activo");
});

formulario.addEventListener("focusout", (evento) => {
    evento.target.classList.remove("activo");
});

pintar();
