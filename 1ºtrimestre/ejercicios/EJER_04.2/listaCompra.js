
const formulario = document.getElementById("formulario-compra")
const buscador = document.getElementById("buscador")
const lista = document.getElementById("lista")
const total = document.getElementById("total")

let productos = []
let siguienteId = 1

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault()

    const nombre = formulario.elements.producto.value
    const precio = formulario.elements.precio.valueAsNumber
    const unidades = formulario.elements.unidades.valueAsNumber

    const existente = productos.find(
        producto => producto.nombre.toLowerCase() === nombre.toLowerCase()
    )

    if(existente){
        existente.unidades += unidades
    }else {
        productos.push({
            id: siguienteId,
            nombre: nombre,
            precio: precio,
            unidades: unidades
        })
        siguienteId++
    }

    formulario.reset()
    formulario.elements.producto.focus()
})

const pintar = () => {
    const elementos = productos.map(producto => `
        <li>
            ${producto.nombre} - ${producto.precio} € x ${producto.unidades}
            <button data-accion="restar" data-id="${producto.id}">-</button>
            <button data-accion="sumar" data-id="${producto.id}">+</button>
            <button data-accion="borrar" data-id="${producto.id}">Borrar</button>


        </li>
    `)
    lista.innerHTML = elementos.join("")
}

lista.addEventListener("click", (evento) => {
    const boton = evento.target.closest("button")

    if(!boton) return

    const accion = boton.dataset.accion
    const id = Number(boton.dataset.id)

    const acciones = {
        sumar: () => {
            const producto = productos.find(pintar.id === id)
            producto.unidades++
        },

        restar: () => {
        const producto = productos.find(p => p.id === id);

             if (producto.unidades > 1) {
         producto.unidades--;
            }
        }, 

        borrar: () => {
        productos = productos.filter(p => p.id !== id);
    }

        
    } 

acciones[accion]()
pintar()
})

const suma = productos.reduce((acumulador, producto) => {
    return acumulador + producto.precio * producto.unidades;
}, 0);

total.textContent = `Total: ${suma.toFixed(2)} €`;