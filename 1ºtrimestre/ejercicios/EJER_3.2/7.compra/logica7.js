function anadirAlCarrito(boton) {
    const producto = boton.parentNode;
    const copia = producto.cloneNode(true);
    const carrito = document.querySelector("#carrito");

    const botonAnadir = copia.querySelector("button");
    botonAnadir.remove();

    const botonQuitar = document.createElement("button");
    botonQuitar.textContent = "Quitar";

    botonQuitar.onclick = function() {
        botonQuitar.parentNode.remove();
        calcularTotal();
    };

    copia.appendChild(botonQuitar);
    carrito.appendChild(copia);

    calcularTotal();
}

function calcularTotal() {
    const productos = document.querySelectorAll("#carrito li");
    let total = 0;

    productos.forEach(producto => {
        total = total + Number(producto.dataset.price);
    });

    document.querySelector("#total").textContent = total;
}