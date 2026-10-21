const usuarios = [
    {nombre: "Ana", edad: 25},
    {nombre: "Luis", edad: 30}
];

function crearTabla(usuarios) {
    const tabla = document.createElement("table");
    const fragmento = document.createDocumentFragment();

    usuarios.forEach(usuario => {
        const fila = document.createElement("tr");

        const celdaNombre = document.createElement("td");
        celdaNombre.textContent = usuario.nombre;

        const celdaEdad = document.createElement("td");
        celdaEdad.textContent = usuario.edad;

        fila.appendChild(celdaNombre);
        fila.appendChild(celdaEdad);

        fragmento.appendChild(fila);
    });

    tabla.appendChild(fragmento);

    const contenedor = document.querySelector("#contenedor-tabla");
    contenedor.appendChild(tabla);
}

crearTabla(usuarios);